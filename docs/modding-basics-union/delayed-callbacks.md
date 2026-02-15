---
sidebar_position: 5
title: "Delayed Callbacks"
description: "Creating a delayed callback system in a Union plugin to execute Daedalus functions after a time delay."
---

# Delayed Callbacks

In this tutorial you'll build a **delayed callback system** - a mechanism that lets you schedule Daedalus function calls to execute after a specified time delay. This is useful for timed effects, delayed reactions, scripted sequences, or any gameplay mechanic that needs something to happen "in X seconds."

You'll create a callback object, a manager that ticks through active callbacks each frame, a Daedalus external to schedule them from scripts, and save/load support so pending callbacks survive game saves.

## Prerequisites

- Completed the [My First Plugin](./first-plugin.md) guide
- A working Union project with `Game_Init`, `Game_Loop`, `Game_Exit`, and `Game_DefineExternals` hooks enabled
- Understanding of Daedalus external functions (`parser->DefineExternal`)

---

## How It Works

The system has three parts:

1. **`DelayedCallback`** - a data object storing: which NPC is the context (`self`), how long to wait, and which Daedalus function to call
2. **`CallbackManager`** - holds a list of pending callbacks, advances their timers each frame using `ztimer->frameTimeFloat`, and fires them when the delay expires
3. **A Daedalus external** - `DelayedCall(npc, delay, function)` so scripts can schedule callbacks

```
Daedalus script                    C++ Plugin
     |                                  |
     |  DelayedCall(self, 3.0, MyFunc)  |
     |  ---------------------------->>  |
     |                                  |  Creates DelayedCallback
     |                                  |  Adds to CallbackManager
     |                                  |
     |          (3 seconds pass)        |
     |                                  |
     |                                  |  Timer expires
     |                                  |  Sets SELF = npc
     |  <<----------------------------  |
     |  MyFunc() is called              |
```

---

## Step 1: The DelayedCallback Class

This is a simple data object. It stores everything needed to fire a callback later:

```cpp
namespace GOTHIC_NAMESPACE
{
    class DelayedCallback
    {
    public:
        DelayedCallback(oCNpc* npc, float delay, int funcIndex)
            : npc(npc)
            , delay(delay)
            , funcIndex(funcIndex)
            , elapsedTime(0.0f)
        {
        }

        oCNpc* GetNpc() const { return npc; }
        float GetDelay() const { return delay; }
        int GetFuncIndex() const { return funcIndex; }

        float GetElapsedTime() const { return elapsedTime; }
        void AddElapsedTime(float delta) { elapsedTime += delta; }

        bool IsReady() const { return elapsedTime >= delay; }

    private:
        oCNpc* npc;
        float delay;
        int funcIndex;
        float elapsedTime;
    };
}
```

Key fields:
- `npc` - the NPC that will be set as `self` when the callback fires
- `delay` - how many seconds to wait before firing
- `funcIndex` - the Daedalus function index (obtained via `parser->GetIndex`)
- `elapsedTime` - accumulates frame deltas until it reaches `delay`

---

## Step 2: The CallbackManager

The manager holds a list of pending callbacks and processes them each frame:

```cpp
namespace GOTHIC_NAMESPACE
{
    class CallbackManager
    {
    public:
        ~CallbackManager()
        {
            ClearAll();
        }

        void Add(DelayedCallback* cb)
        {
            callbacks.InsertEnd(cb);
        }

        void ClearAll()
        {
            for (int i = 0; i < callbacks.GetNumInList(); i++)
                delete callbacks[i];

            callbacks.EmptyList();
        }

        void Update()
        {
            // Don't tick during dialogues
            if (!oCInformationManager::GetInformationManager().HasFinished())
                return;

            float deltaTime = ztimer->frameTimeFloat / 1000.0f;

            for (int i = 0; i < callbacks.GetNum(); i++)
            {
                DelayedCallback* cb = callbacks[i];
                cb->AddElapsedTime(deltaTime);

                if (cb->IsReady())
                {
                    FireCallback(cb);

                    callbacks.RemoveIndex(i);
                    delete cb;
                    i--;  // adjust index after removal
                }
            }
        }

    private:
        zCArray<DelayedCallback*> callbacks;

        void FireCallback(DelayedCallback* cb)
        {
            if (cb->GetFuncIndex() == -1)
                return;

            // Save current SELF/OTHER/VICTIM so we don't corrupt game state
            oCNpc* oldSelf = nullptr;
            oCNpc* oldOther = nullptr;
            oCNpc* oldVictim = nullptr;

            zCPar_Symbol* sym = parser->GetSymbol("SELF");
            if (sym) oldSelf = dynamic_cast<oCNpc*>((zCVob*)sym->GetInstanceAdr());

            sym = parser->GetSymbol("OTHER");
            if (sym) oldOther = dynamic_cast<oCNpc*>((zCVob*)sym->GetInstanceAdr());

            sym = parser->GetSymbol("VICTIM");
            if (sym) oldVictim = dynamic_cast<oCNpc*>((zCVob*)sym->GetInstanceAdr());

            // Set SELF to the callback's NPC and call the function
            parser->SetInstance("SELF", cb->GetNpc());
            parser->CallFunc(cb->GetFuncIndex());

            // Restore original parser variables
            parser->SetInstance("SELF", oldSelf);
            parser->SetInstance("OTHER", oldOther);
            parser->SetInstance("VICTIM", oldVictim);
        }
    };

    std::unique_ptr<CallbackManager> callbackManager;
}
```

### Key Details

**Frame delta time:** `ztimer->frameTimeFloat` gives the time since the last frame in milliseconds. Dividing by 1000 converts to seconds, which is the unit we use for delays.

**Dialogue pause:** The `oCInformationManager::HasFinished()` check pauses callback timers during dialogues. Without this, a 5-second callback scheduled right before a dialogue could fire mid-conversation.

:::warning
**Why save and restore parser variables?** The Daedalus parser has global variables `SELF`, `OTHER`, and `VICTIM` that many scripts depend on. When you call `parser->SetInstance("SELF", ...)` to set the callback's NPC, you overwrite whatever was previously stored there. If you don't restore the original values afterward, other scripts running in the same frame will see the wrong `self` - causing bugs ranging from broken AI to crashes.
:::

**Index adjustment:** After removing a callback from the array with `RemoveIndex(i)`, the next element shifts into position `i`. The `i--` ensures we don't skip it.

---

## Step 3: The Daedalus External

Expose the callback system to Daedalus scripts so modders can use it:

```cpp
namespace GOTHIC_NAMESPACE
{
    int Extern_DelayedCall()
    {
        zCParser* par = zCParser::GetParser();

        // Pop parameters in reverse order
        int funcIndex;  par->GetParameter(funcIndex);
        float delay;    par->GetParameter(delay);
        oCNpc* npc;     npc = (oCNpc*)par->GetInstance();

        if (!npc || funcIndex <= 0 || delay <= 0.0f)
        {
            par->SetReturn(0);
            return 0;
        }

        auto* cb = new DelayedCallback(npc, delay, funcIndex);
        callbackManager->Add(cb);

        par->SetReturn(1);
        return 0;
    }

    void Game_DefineExternals()
    {
        parser->DefineExternal("DelayedCall",
            Extern_DelayedCall,
            zPAR_TYPE_INT,          // return type
            zPAR_TYPE_INSTANCE,     // param 1: npc
            zPAR_TYPE_FLOAT,        // param 2: delay in seconds
            zPAR_TYPE_FUNC,         // param 3: function to call
            0                       // end of params
        );
    }
}
```

:::info
The `zPAR_TYPE_FUNC` parameter type passes a Daedalus function reference. On the C++ side, it arrives as an `int` - the function's index in the parser's symbol table. This is the same index you'd get from `parser->GetIndex("FunctionName")`.
:::

### Usage from Daedalus

```daedalus
func void OnPoisonExpire()
{
    // self is automatically set to the NPC passed to DelayedCall
    Npc_ChangeAttribute(self, ATR_HITPOINTS, 50);
    PrintScreen("Poison wore off!", -1, -1, "FONT_OLD_10_WHITE.TGA", -1);
};

func void ApplyPoison(var C_NPC target)
{
    Npc_ChangeAttribute(target, ATR_HITPOINTS, -100);

    // Call OnPoisonExpire with target as self after 10 seconds
    DelayedCall(target, 10.0, OnPoisonExpire);
};
```

---

## Step 4: Wire into Plugin.hpp

```cpp
#define PrintConsole(a) Union::String::Format(a).StdPrintLine();

namespace GOTHIC_NAMESPACE
{
    void Game_Init()
    {
        callbackManager = std::make_unique<CallbackManager>();
        PrintConsole("Delayed Callback system loaded!");
    }

    void Game_Exit()
    {
        callbackManager.reset();
    }

    void Game_Loop()
    {
        if (callbackManager)
            callbackManager->Update();
    }

    void Game_SaveBegin()
    {
        // Clear pending callbacks on save to avoid stale references
        if (callbackManager)
            callbackManager->ClearAll();
    }

    void LoadBegin()
    {
        if (callbackManager)
            callbackManager->ClearAll();
    }

    void Game_LoadBegin_NewGame()      { LoadBegin(); }
    void Game_LoadBegin_SaveGame()     { LoadBegin(); }
    void Game_LoadBegin_ChangeLevel()  { LoadBegin(); }

    // ... other game event functions ...

    void Game_DefineExternals()
    {
        parser->DefineExternal("DelayedCall",
            Extern_DelayedCall,
            zPAR_TYPE_INT,
            zPAR_TYPE_INSTANCE,
            zPAR_TYPE_FLOAT,
            zPAR_TYPE_FUNC,
            0
        );
    }

    // ... hooks ...
}
```

---

## Step 5: Save/Load Support (Optional)

The basic implementation above clears all pending callbacks on save/load. If you want callbacks to **survive saves**, you need to serialize/deserialize them using Gothic's archive system.

### Serialization

```cpp
void CallbackManager::Save(zCArchiver* arc)
{
    int count = callbacks.GetNumInList();
    arc->WriteInt("cb_count", count);

    for (int i = 0; i < count; i++)
    {
        DelayedCallback* cb = callbacks[i];

        if (cb->GetNpc())
        {
            arc->WriteString(
                zSTRING("cb_npc_") + zSTRING(i),
                cb->GetNpc()->GetInstanceName()
            );
        }

        arc->WriteFloat(zSTRING("cb_delay_") + zSTRING(i), cb->GetDelay());
        arc->WriteInt(zSTRING("cb_func_") + zSTRING(i), cb->GetFuncIndex());
    }
}
```

### Deserialization

```cpp
void CallbackManager::Load(zCArchiver* arc)
{
    ClearAll();

    int count;
    arc->ReadInt("cb_count", count);

    for (int i = 0; i < count; i++)
    {
        zSTRING npcName;
        float delay;
        int funcIndex;

        arc->ReadString(zSTRING("cb_npc_") + zSTRING(i), npcName);
        arc->ReadFloat(zSTRING("cb_delay_") + zSTRING(i), delay);
        arc->ReadInt(zSTRING("cb_func_") + zSTRING(i), funcIndex);

        oCNpc* npc = dynamic_cast<oCNpc*>(
            ogame->GetWorld()->SearchVobByName(npcName)
        );

        if (npc)
        {
            auto* cb = new DelayedCallback(npc, delay, funcIndex);
            callbacks.InsertEnd(cb);
        }
    }
}
```

:::tip
The callbacks are saved with the **full delay** (not the remaining time). This means after loading, the timer restarts from zero. If you need the callback to fire with only the remaining time, save `delay - elapsedTime` instead of `delay`.
:::

:::warning
`SearchVobByName` looks up the NPC in the current world. If the NPC doesn't exist (e.g. it was in a different level), the callback is silently dropped. This is intentional - a callback for an NPC that no longer exists would crash when fired.
:::

---

## Complete Example

Here's the full, minimal `Plugin.hpp`:

```cpp
#define PrintConsole(a) Union::String::Format(a).StdPrintLine();

namespace GOTHIC_NAMESPACE
{
    // ===============================
    // Delayed Callback
    // ===============================

    class DelayedCallback
    {
    public:
        DelayedCallback(oCNpc* npc, float delay, int funcIndex)
            : npc(npc), delay(delay), funcIndex(funcIndex), elapsedTime(0.0f)
        {
        }

        oCNpc* GetNpc() const { return npc; }
        float GetDelay() const { return delay; }
        int GetFuncIndex() const { return funcIndex; }
        float GetElapsedTime() const { return elapsedTime; }
        void AddElapsedTime(float delta) { elapsedTime += delta; }
        bool IsReady() const { return elapsedTime >= delay; }

    private:
        oCNpc* npc;
        float delay;
        int funcIndex;
        float elapsedTime;
    };

    // ===============================
    // Callback Manager
    // ===============================

    class CallbackManager
    {
    public:
        ~CallbackManager() { ClearAll(); }

        void Add(DelayedCallback* cb) { callbacks.InsertEnd(cb); }

        void ClearAll()
        {
            for (int i = 0; i < callbacks.GetNumInList(); i++)
                delete callbacks[i];
            callbacks.EmptyList();
        }

        void Update()
        {
            if (!oCInformationManager::GetInformationManager().HasFinished())
                return;

            float deltaTime = ztimer->frameTimeFloat / 1000.0f;

            for (int i = 0; i < callbacks.GetNum(); i++)
            {
                DelayedCallback* cb = callbacks[i];
                cb->AddElapsedTime(deltaTime);

                if (cb->IsReady())
                {
                    FireCallback(cb);
                    callbacks.RemoveIndex(i);
                    delete cb;
                    i--;
                }
            }
        }

    private:
        zCArray<DelayedCallback*> callbacks;

        void FireCallback(DelayedCallback* cb)
        {
            if (cb->GetFuncIndex() == -1) return;

            // Save parser state
            oCNpc* oldSelf = nullptr;
            oCNpc* oldOther = nullptr;
            oCNpc* oldVictim = nullptr;

            zCPar_Symbol* sym = parser->GetSymbol("SELF");
            if (sym) oldSelf = dynamic_cast<oCNpc*>((zCVob*)sym->GetInstanceAdr());
            sym = parser->GetSymbol("OTHER");
            if (sym) oldOther = dynamic_cast<oCNpc*>((zCVob*)sym->GetInstanceAdr());
            sym = parser->GetSymbol("VICTIM");
            if (sym) oldVictim = dynamic_cast<oCNpc*>((zCVob*)sym->GetInstanceAdr());

            // Fire the callback
            parser->SetInstance("SELF", cb->GetNpc());
            parser->CallFunc(cb->GetFuncIndex());

            // Restore parser state
            parser->SetInstance("SELF", oldSelf);
            parser->SetInstance("OTHER", oldOther);
            parser->SetInstance("VICTIM", oldVictim);
        }
    };

    std::unique_ptr<CallbackManager> callbackManager;

    // ===============================
    // Daedalus External
    // ===============================

    int Extern_DelayedCall()
    {
        zCParser* par = zCParser::GetParser();
        int funcIndex;  par->GetParameter(funcIndex);
        float delay;    par->GetParameter(delay);
        oCNpc* npc;     npc = (oCNpc*)par->GetInstance();

        if (!npc || funcIndex <= 0 || delay <= 0.0f)
        {
            par->SetReturn(0);
            return 0;
        }

        callbackManager->Add(new DelayedCallback(npc, delay, funcIndex));
        par->SetReturn(1);
        return 0;
    }

    // ===============================
    // Game Event Functions
    // ===============================

    void Game_EntryPoint() {}

    void Game_Init()
    {
        callbackManager = std::make_unique<CallbackManager>();
        PrintConsole("Delayed Callback system loaded!");
    }

    void Game_Exit()
    {
        callbackManager.reset();
    }

    void Game_PreLoop() {}

    void Game_Loop()
    {
        if (callbackManager)
            callbackManager->Update();
    }

    void Game_PostLoop() {}
    void Game_MenuLoop() {}

    void Game_SaveBegin()
    {
        if (callbackManager)
            callbackManager->ClearAll();
    }

    void Game_SaveEnd() {}

    void LoadBegin()
    {
        if (callbackManager)
            callbackManager->ClearAll();
    }

    void Game_LoadBegin_NewGame()          { LoadBegin(); }
    void Game_LoadEnd_NewGame()            {}
    void Game_LoadBegin_SaveGame()         { LoadBegin(); }
    void Game_LoadEnd_SaveGame()           {}
    void Game_LoadBegin_ChangeLevel()      { LoadBegin(); }
    void Game_LoadEnd_ChangeLevel()        {}
    void Game_LoadBegin_TriggerChangeLevel() {}
    void Game_LoadEnd_TriggerChangeLevel()   {}
    void Game_Pause() {}
    void Game_Unpause() {}

    void Game_DefineExternals()
    {
        parser->DefineExternal("DelayedCall",
            Extern_DelayedCall,
            zPAR_TYPE_INT,
            zPAR_TYPE_INSTANCE,
            zPAR_TYPE_FLOAT,
            zPAR_TYPE_FUNC,
            0
        );
    }

    void Game_ApplySettings() {}

    // ===============================
    // Hooks
    // ===============================

    // oCGame_Init hook
    void __fastcall oCGame_Init(oCGame* self, void* vtable);
    auto Hook_oCGame_Init = Union::CreateHook(
        reinterpret_cast<void*>(zSwitch(0x00636F50, 0x0065D480, 0x006646D0, 0x006C1060)),
        &oCGame_Init, Union::HookType::Hook_Detours
    );
    void __fastcall oCGame_Init(oCGame* self, void* vtable)
    {
        Hook_oCGame_Init(self, vtable);
        Game_Init();
    }

    // Game_Loop hook
    void __fastcall oCAniCtrl_Human_Loop(oCAniCtrl_Human* self, void* vtable);
    auto Hook_oCAniCtrl_Human_Loop = Union::CreateHook(
        reinterpret_cast<void*>(zSwitch(0x00631110, 0x00657500, 0x0065E690, 0x006BAF00)),
        &oCAniCtrl_Human_Loop, Union::HookType::Hook_Detours
    );
    void __fastcall oCAniCtrl_Human_Loop(oCAniCtrl_Human* self, void* vtable)
    {
        Hook_oCAniCtrl_Human_Loop(self, vtable);
        Game_Loop();
    }

    // Game_DefineExternals hook
    void __fastcall oCGame_DefineExternals_Ulfi(oCGame* self, void* vtable, zCParser* parser);
    auto Hook_oCGame_DefineExternals_Ulfi = Union::CreateHook(
        reinterpret_cast<void*>(zSwitch(0x006495B0, 0x006715F0, 0x00677A00, 0x006D4780)),
        &oCGame_DefineExternals_Ulfi, Union::HookType::Hook_Detours
    );
    void __fastcall oCGame_DefineExternals_Ulfi(oCGame* self, void* vtable, zCParser* parser)
    {
        Hook_oCGame_DefineExternals_Ulfi(self, vtable, parser);
        Game_DefineExternals();
    }

    // Game_SaveBegin hook
    void __fastcall oCGame_WriteSavegame(oCGame* self, void* vtable, int slotNr, int b);
    auto Hook_oCGame_WriteSavegame = Union::CreateHook(
        reinterpret_cast<void*>(zSwitch(0x00639700, 0x0065FCC0, 0x00666F20, 0x006C3C10)),
        &oCGame_WriteSavegame, Union::HookType::Hook_Detours
    );
    void __fastcall oCGame_WriteSavegame(oCGame* self, void* vtable, int slotNr, int b)
    {
        Game_SaveBegin();
        Hook_oCGame_WriteSavegame(self, vtable, slotNr, b);
    }
}
```

---

## Use Cases

Here are practical examples of what you can build with delayed callbacks:

### Timed Buff/Debuff

```daedalus
func void RemoveSpeedBuff()
{
    // self is the NPC whose buff expired
    Npc_ChangeAttribute(self, ATR_DEXTERITY, -10);
};

func void ApplySpeedBuff(var C_NPC target)
{
    Npc_ChangeAttribute(target, ATR_DEXTERITY, 10);
    DelayedCall(target, 30.0, RemoveSpeedBuff);  // remove after 30s
};
```

### Delayed Spawning

```daedalus
func void SpawnReinforcements()
{
    Wld_InsertNpc(GRD_233_GUARD, "FP_SPAWN_GUARD_01");
    Wld_InsertNpc(GRD_234_GUARD, "FP_SPAWN_GUARD_02");
};

func void TriggerAlarm()
{
    // Guards arrive 5 seconds after the alarm
    DelayedCall(hero, 5.0, SpawnReinforcements);
};
```

### Chained Sequences

```daedalus
func void ExplosionStep3()
{
    Snd_Play("YOURMOD_COLLAPSE");
};

func void ExplosionStep2()
{
    Snd_Play("YOURMOD_RUMBLE");
    DelayedCall(hero, 2.0, ExplosionStep3);
};

func void StartExplosionSequence()
{
    Snd_Play("YOURMOD_FUSE");
    DelayedCall(hero, 3.0, ExplosionStep2);
};
```

---

## Tips

- **Callback lifetime** - callbacks exist only in memory. If the game crashes or the player quits without saving, pending callbacks are lost. This is expected behavior
- **NPC validity** - the system stores a raw pointer to the NPC. If the NPC is removed from the world (e.g. `Npc_Remove`) before the callback fires, the pointer becomes dangling. For safety, verify the NPC is alive at the start of your callback function
- **Dialogue pausing** - timers are paused during dialogues (`oCInformationManager::HasFinished()` returns `false`). A 5-second callback won't fire mid-conversation even if 5 seconds of real time pass during the dialogue
- **Frame rate independence** - using `ztimer->frameTimeFloat` ensures callbacks fire at approximately the correct real time regardless of frame rate. At 60 FPS each delta is ~16.6 ms; at 30 FPS it's ~33.3 ms, but the accumulated time reaches the target delay either way
- **Multiple callbacks** - you can schedule multiple callbacks for the same NPC or the same function. Each is independent. Scheduling `DelayedCall(self, 1.0, MyFunc)` three times will call `MyFunc` three times after 1 second

---

## Summary

In this tutorial you learned how to:

- Create a delayed callback data class that stores an NPC, delay, and function index
- Build a manager that ticks callbacks using `ztimer->frameTimeFloat` and fires them when ready
- Save and restore `SELF`/`OTHER`/`VICTIM` parser variables to avoid corrupting game state
- Expose the system to Daedalus scripts via `parser->DefineExternal` with `zPAR_TYPE_FUNC`
- Handle save/load cleanup to prevent stale pointer crashes
- Optionally serialize pending callbacks for save game persistence

This pattern is a building block for many gameplay systems - timed buffs, scheduled events, ability cooldowns, delayed AI reactions, and scripted sequences.
