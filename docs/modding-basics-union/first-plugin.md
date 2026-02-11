---
sidebar_position: 2
title: "My First Plugin"
description: "Creating your first Union plugin for Gothic."
---

# My First Plugin

In this tutorial you'll create a simple Union plugin that prints a message to the debug console, enable the game event hooks, create a custom engine hook, read configuration from an `.ini` file, and define a custom Daedalus external function. By the end, you'll understand the core patterns used in Union plugin development.

## Prerequisites

- Completed the [Getting Started](./getting-started.md) guide
- A working Union project that compiles successfully
- A Gothic installation to test the plugin
- `ShowDebugWindow=true` enabled in `SystemPack.ini` (see [Getting Started](./getting-started.md#10-enable-the-debug-console))

---

## Understanding the Template

The central file of your plugin is `Plugin.hpp` — this is where all your plugin logic goes. It contains a set of **game event functions** — callbacks that the engine invokes at specific moments during gameplay.

Here's what the template's `Plugin.hpp` looks like (simplified):

```cpp
namespace GOTHIC_NAMESPACE
{
    void Game_EntryPoint()
    {
    }

    void Game_Init()
    {
    }

    void Game_Exit()
    {
    }

    void Game_PreLoop()
    {
    }

    void Game_Loop()
    {
    }

    void Game_PostLoop()
    {
    }

    void Game_MenuLoop()
    {
    }

    void Game_SaveBegin()
    {
    }

    void Game_SaveEnd()
    {
    }

    void Game_DefineExternals()
    {
    }

    void Game_ApplySettings()
    {
    }

    // ... hooks (commented out by default) ...
}
```

All your plugin code goes inside the `GOTHIC_NAMESPACE` namespace. This namespace is defined differently for each game version (e.g. `Gothic_I_Classic`, `Gothic_II_Addon`) — the build system handles this automatically.

:::warning
The game event functions are **not called by default**. Each one requires a corresponding **hook** to be uncommented in `Plugin.hpp`. The template provides all hooks as commented-out code — you need to uncomment the ones you want to use. See [Enabling Game Event Hooks](#step-2-enable-game-event-hooks) below.
:::

### Game Event Functions

| Function                          | When it's called                                        |
| --------------------------------- | ------------------------------------------------------- |
| `Game_EntryPoint`                 | Gothic entry point (earliest possible moment)           |
| `Game_Init`                       | After DAT files are initialized, world is ready         |
| `Game_Exit`                       | When the game is shutting down                          |
| `Game_PreLoop`                    | Before each frame is rendered                           |
| `Game_Loop`                       | Every frame (main world render)                         |
| `Game_PostLoop`                   | After each frame is rendered                            |
| `Game_MenuLoop`                   | Every frame while in menu                               |
| `Game_SaveBegin` / `Game_SaveEnd` | When a save starts / completes                          |
| `Game_LoadBegin_*` / `Game_LoadEnd_*` | Various load scenarios (new game, save, change level) |
| `Game_Pause` / `Game_Unpause`     | When the game pauses / unpauses                         |
| `Game_DefineExternals`            | When Daedalus externals are registered                  |
| `Game_ApplySettings`              | When game settings are applied                          |

---

## Step 1: Set Up Console Printing

The simplest way to verify your plugin works is to print a message to the Union debug console. Union Framework uses `StdPrintLine()` for console output.

First, define a convenience macro at the top of your `Plugin.hpp`, before the namespace:

```cpp
#define PrintConsole(a) Union::String::Format(a).StdPrintLine();
```

This macro wraps `Union::String::Format().StdPrintLine()` so you can print messages with a single call.

:::warning
To see console output, you must enable the Union debug window in `SystemPack.ini` (in the game's `System/` directory):

```ini
[CORE]
ShowDebugWindow=true
```

Without this setting, `StdPrintLine()` messages will not be visible.
:::

---

## Step 2: Enable Game Event Hooks

The game event functions in the template are empty stubs — they won't be called unless you **uncomment** their corresponding hooks. The hooks are located at the bottom of `Plugin.hpp` as commented-out code blocks.

To enable `Game_Init`, find this block and **remove the `/*` and `*/`** comment markers:

```cpp
/*void __fastcall oCGame_Init(oCGame* self, void* vtable);
auto Hook_oCGame_Init = Union::CreateHook(reinterpret_cast<void*>(zSwitch(0x00636F50, 0x0065D480, 0x006646D0, 0x006C1060)), &oCGame_Init, Union::HookType::Hook_Detours);
void __fastcall oCGame_Init(oCGame* self, void* vtable)
{
    Hook_oCGame_Init(self, vtable);
    Game_Init();
}*/
```

After uncommenting:

```cpp
void __fastcall oCGame_Init(oCGame* self, void* vtable);
auto Hook_oCGame_Init = Union::CreateHook(reinterpret_cast<void*>(zSwitch(0x00636F50, 0x0065D480, 0x006646D0, 0x006C1060)), &oCGame_Init, Union::HookType::Hook_Detours);
void __fastcall oCGame_Init(oCGame* self, void* vtable)
{
    Hook_oCGame_Init(self, vtable);
    Game_Init();
}
```

This hook intercepts the engine's `oCGame::Init` function. When Gothic calls it, your hook runs instead — it calls the original function first (`Hook_oCGame_Init`), then calls your `Game_Init()` callback.

:::tip
Uncomment only the hooks you actually need. Each hook intercepts an engine function call, so enabling unnecessary hooks adds overhead. For this tutorial, uncomment the `oCGame_Init` hook.
:::

---

## Step 3: Print a Message

Now add the `PrintConsole` macro and a message in `Game_Init`:

```cpp
#define PrintConsole(a) Union::String::Format(a).StdPrintLine();

namespace GOTHIC_NAMESPACE
{
    void Game_Init()
    {
        PrintConsole("Hello from my first Union plugin!");
    }

    // ... rest of the functions remain empty ...

    // Make sure the oCGame_Init hook is uncommented!
    void __fastcall oCGame_Init(oCGame* self, void* vtable);
    auto Hook_oCGame_Init = Union::CreateHook(
        reinterpret_cast<void*>(zSwitch(0x00636F50, 0x0065D480, 0x006646D0, 0x006C1060)),
        &oCGame_Init,
        Union::HookType::Hook_Detours
    );
    void __fastcall oCGame_Init(oCGame* self, void* vtable)
    {
        Hook_oCGame_Init(self, vtable);
        Game_Init();
    }
}
```

### Build and Test

1. Build the plugin (select an appropriate preset, e.g. `G2A-Release`)
2. Make sure the DLL is in the game's `System/Autorun/` directory
3. Make sure `ShowDebugWindow=true` is set in `SystemPack.ini`
4. Launch Gothic II: Night of the Raven
5. The debug console window should open and display: `Hello from my first Union plugin!`

:::tip
If you don't see the message, check that:
- The DLL was compiled for the correct game version
- The DLL is in `System/Autorun/` (not `System/` or another directory)
- `ShowDebugWindow=true` is set in `SystemPack.ini`
- The `oCGame_Init` hook is uncommented
:::

---

## Step 4: Create a Custom Hook

Hooks are the core mechanism of Union plugins — they let you intercept and modify engine function calls. In the previous step you uncommented a built-in template hook. Now let's create a **custom hook** from scratch.

### How Hooks Work

A hook replaces an engine function with your own implementation. Inside your function, you can:

- Run code **before** the original function
- Call the original function
- Run code **after** the original function
- Modify parameters or skip the original entirely

### The userapi/ Folder

To hook an engine class method, you first need to declare your hook function as a member of that class. This is done by creating a `.inl` file in the `userapi/` folder with a name matching the class you're hooking.

For example, to hook a method of `oCGame`, create `userapi/oCGame.inl`:

```cpp
// userapi/oCGame.inl
void UpdatePlayerStatus_Hook();
```

The build system automatically includes these `.inl` files, extending engine classes with your new methods.

### Hook Structure

Every custom hook in Union Framework follows this pattern:

```cpp
// 1. Declare hook in userapi/ClassName.inl:
//    void MethodName_Hook(/* original params */);

// 2. Hook registration with engine address
auto Hook_ClassName_Method = ::Union::CreateHook(
    reinterpret_cast<void*>(zSwitch(G1_addr, G1A_addr, G2_addr, G2A_addr)),
    &ClassName::MethodName_Hook,
    ::Union::HookType::Hook_Detours
);

// 3. Implementation
void ClassName::MethodName_Hook(/* original params */)
{
    // your code before...
    (this->*Hook_ClassName_Method)(/* original params */);  // call original
    // your code after...
}
```

Key points:
- Hooks are **member functions** of the engine class being hooked — `this` gives you direct access to the object's fields and methods
- **`(this->*Hook_Variable)(params)`** calls the original engine function. Always call it unless you intentionally want to skip the original behavior
- **`zSwitch(G1, G1A, G2, G2A)`** provides a different memory address for each engine version. Use `0` for versions you don't want to hook
- Always use **`Hook_Detours`** as the hook type — it ensures compatibility with other plugins, including those built with older Union versions

### Example: Logging Player Status Updates

Create `userapi/oCGame.inl` with the hook declaration:

```cpp
// userapi/oCGame.inl
void UpdatePlayerStatus_Hook();
```

Then add the hook inside the `GOTHIC_NAMESPACE` in `Plugin.hpp`:

```cpp
auto Hook_oCGame_UpdatePlayerStatus = ::Union::CreateHook(
    reinterpret_cast<void*>(zSwitch(0x00638F90, 0x0065F4E0, 0x00666640, 0x006C3140)),
    &oCGame::UpdatePlayerStatus_Hook,
    ::Union::HookType::Hook_Detours
);

void oCGame::UpdatePlayerStatus_Hook()
{
    PrintConsole("Player status is being updated!");
    (this->*Hook_oCGame_UpdatePlayerStatus)();  // call original
}
```

### Example: Modifying Damage

Here's a more practical example — hooking the damage function to double damage dealt by the player. Note the safety checks: `pNpcAttacker` can be `nullptr` (e.g. for fall damage), so you must always verify it before accessing it.

First, create `userapi/oCNpc.inl`:

```cpp
// userapi/oCNpc.inl
void OnDamage_Hit_Hook(oSDamageDescriptor& desc);
```

Then add the hook in `Plugin.hpp`:

```cpp
auto Hook_oCNpc_OnDamage_Hit = ::Union::CreateHook(
    reinterpret_cast<void*>(zSwitch(0x0, 0x0, 0x0, 0x006A28A0)),
    &oCNpc::OnDamage_Hit_Hook,
    ::Union::HookType::Hook_Detours
);

void oCNpc::OnDamage_Hit_Hook(oSDamageDescriptor& desc)
{
    // Check if there is an attacker NPC (e.g. fall damage has no attacker)
    oCNpc* attacker = desc.pNpcAttacker;

    if (attacker && attacker == oCNpc::player)
    {
        // Double damage only when the player is the attacker
        for (int i = 0; i < oEDamageIndex_MAX; i++)
            desc.aryDamage[i] *= 2;

        PrintConsole("Player damage doubled!");
    }

    // Always call the original damage handler
    (this->*Hook_oCNpc_OnDamage_Hit)(desc);
}
```

:::info
The address `0x006A28A0` in this example is for Gothic II: Night of the Raven only (the other three are `0x0`). Finding function addresses requires examining the ZenGin headers in `gothic-api` or using tools like IDA/Ghidra. The template already provides addresses for common hooks.
:::

---

## Step 5: Read Options from .ini Files

Plugins often need configurable settings. You can read values from `.ini` files (like `Gothic.ini`) using the ZenGin `zoptions` API.

```cpp
namespace GOTHIC_NAMESPACE
{
    bool logDamage = false;
    int damageMultiplier = 1;

    void Game_Init()
    {
        // Read settings from Gothic.ini
        // Section: [MYPLUGIN], Key: LogDamage, Default: false
        logDamage = zoptions->ReadBool("MYPLUGIN", "LogDamage", false);

        // Read an integer value
        damageMultiplier = zoptions->ReadInt("MYPLUGIN", "DamageMultiplier", 1);

        PrintConsole("MyPlugin loaded!");
    }

    void Game_ApplySettings()
    {
        // Re-read settings when the user changes options
        logDamage = zoptions->ReadBool("MYPLUGIN", "LogDamage", false);
        damageMultiplier = zoptions->ReadInt("MYPLUGIN", "DamageMultiplier", 1);
    }

    // ... rest of functions
}
```

Users can then add a section to their `Gothic.ini`:

```ini
[MYPLUGIN]
LogDamage=1
DamageMultiplier=2
```

:::tip
Use `Game_ApplySettings()` to re-read settings — it's called when the user applies changes in the options menu, ensuring settings are updated without restarting the game. Remember to uncomment the corresponding `CGameManager_ApplySomeSettings` hook in the template.
:::

---

## Step 6: Define Daedalus Externals

You can expose C++ functions to Daedalus scripts. This lets modders call your plugin's functionality from scripts.

### Defining an External Function

```cpp
namespace GOTHIC_NAMESPACE
{
    // C++ implementation of the external
    int MyPlugin_GetPlayerLevel()
    {
        zCParser* par = zCParser::GetParser();

        oCNpc* player = oCNpc::player;
        if (!player)
        {
            par->SetReturn(0);
            return 0;
        }

        par->SetReturn(player->level);
        return 0;
    }

    void Game_DefineExternals()
    {
        // Register the function so Daedalus can call it
        // Syntax: name, function pointer, return type, [param types...], 0
        parser->DefineExternal("MyPlugin_GetPlayerLevel",
            MyPlugin_GetPlayerLevel,
            zPAR_TYPE_INT,     // return type
            0                  // end of parameter list
        );
    }

    // ... rest of functions
}
```

:::warning
For `Game_DefineExternals()` to be called, you need to uncomment the `oCGame_DefineExternals_Ulfi` hook in the template.
:::

:::info
External functions always return `int` and must end with `return 0;`. To pass a value back to Daedalus, use `par->SetReturn(value)` — never use the C++ `return` statement for the actual return value.
:::

### External with Parameters

```cpp
namespace GOTHIC_NAMESPACE
{
    int MyPlugin_MultiplyDamage()
    {
        zCParser* par = zCParser::GetParser();

        // Pop parameters from the Daedalus stack (in reverse order!)
        int multiplier; par->GetParameter(multiplier);
        int damage;     par->GetParameter(damage);

        par->SetReturn(damage * multiplier);
        return 0;
    }

    void Game_DefineExternals()
    {
        parser->DefineExternal("MyPlugin_MultiplyDamage",
            MyPlugin_MultiplyDamage,
            zPAR_TYPE_INT,      // return type
            zPAR_TYPE_INT,      // param 1: damage
            zPAR_TYPE_INT,      // param 2: multiplier
            0                   // end of parameter list
        );
    }

    // ... rest of functions
}
```

After defining the external, Daedalus scripts can call it:

```daedalus
func int CalculateBoostedDamage(var int baseDamage)
{
    var int result;
    result = MyPlugin_MultiplyDamage(baseDamage, 3);
    return result;
};
```

:::warning
When reading parameters from the Daedalus stack with `GetParameter`, they are popped in **reverse order** — the last parameter in the Daedalus call is the first one you pop in C++.
:::

---

## Putting It All Together

Here's a complete `Plugin.hpp` that combines everything from this tutorial:

```cpp
#define PrintConsole(a) Union::String::Format(a).StdPrintLine();

namespace GOTHIC_NAMESPACE
{
    bool logDamage = false;

    void Game_EntryPoint()
    {
    }

    void Game_Init()
    {
        logDamage = zoptions->ReadBool("MYPLUGIN", "LogDamage", false);
        PrintConsole("MyPlugin loaded!");
    }

    void Game_Exit()
    {
    }

    void Game_PreLoop()
    {
    }

    void Game_Loop()
    {
    }

    void Game_PostLoop()
    {
    }

    void Game_MenuLoop()
    {
    }

    void Game_SaveBegin()
    {
    }

    void Game_SaveEnd()
    {
    }

    void LoadBegin()
    {
    }

    void LoadEnd()
    {
    }

    void Game_LoadBegin_NewGame()
    {
        LoadBegin();
    }

    void Game_LoadEnd_NewGame()
    {
        LoadEnd();
    }

    void Game_LoadBegin_SaveGame()
    {
        LoadBegin();
    }

    void Game_LoadEnd_SaveGame()
    {
        LoadEnd();
    }

    void Game_LoadBegin_ChangeLevel()
    {
        LoadBegin();
    }

    void Game_LoadEnd_ChangeLevel()
    {
        LoadEnd();
    }

    void Game_LoadBegin_TriggerChangeLevel()
    {
    }

    void Game_LoadEnd_TriggerChangeLevel()
    {
    }

    void Game_Pause()
    {
    }

    void Game_Unpause()
    {
    }

    int MyPlugin_GetPlayerLevel()
    {
        zCParser* par = zCParser::GetParser();

        oCNpc* player = oCNpc::player;
        if (!player)
        {
            par->SetReturn(0);
            return 0;
        }

        par->SetReturn(player->level);
        return 0;
    }

    void Game_DefineExternals()
    {
        parser->DefineExternal("MyPlugin_GetPlayerLevel",
            MyPlugin_GetPlayerLevel,
            zPAR_TYPE_INT,
            0
        );
    }

    void Game_ApplySettings()
    {
        logDamage = zoptions->ReadBool("MYPLUGIN", "LogDamage", false);
    }

    // --- Hooks (uncomment the ones you need) ---

    // Game_Init hook
    void __fastcall oCGame_Init(oCGame* self, void* vtable);
    auto Hook_oCGame_Init = Union::CreateHook(reinterpret_cast<void*>(zSwitch(0x00636F50, 0x0065D480, 0x006646D0, 0x006C1060)), &oCGame_Init, Union::HookType::Hook_Detours);
    void __fastcall oCGame_Init(oCGame* self, void* vtable)
    {
        Hook_oCGame_Init(self, vtable);
        Game_Init();
    }

    // Game_DefineExternals hook
    void __fastcall oCGame_DefineExternals_Ulfi(oCGame* self, void* vtable, zCParser* parser);
    auto Hook_oCGame_DefineExternals_Ulfi = Union::CreateHook(reinterpret_cast<void*>(zSwitch(0x006495B0, 0x006715F0, 0x00677A00, 0x006D4780)), &oCGame_DefineExternals_Ulfi, Union::HookType::Hook_Detours);
    void __fastcall oCGame_DefineExternals_Ulfi(oCGame* self, void* vtable, zCParser* parser)
    {
        Hook_oCGame_DefineExternals_Ulfi(self, vtable, parser);
        Game_DefineExternals();
    }

    // Game_ApplySettings hook
    void __fastcall CGameManager_ApplySomeSettings(CGameManager* self, void* vtable);
    auto Hook_CGameManager_ApplySomeSettings = Union::CreateHook(reinterpret_cast<void*>(zSwitch(0x004267C0, 0x004291E0, 0x00427370, 0x004276B0)), &CGameManager_ApplySomeSettings, Union::HookType::Hook_Detours);
    void __fastcall CGameManager_ApplySomeSettings(CGameManager* self, void* vtable)
    {
        Hook_CGameManager_ApplySomeSettings(self, vtable);
        Game_ApplySettings();
    }
}
```

---

## Summary

In this tutorial you learned how to:

- Print messages to the Union debug console using `PrintConsole` (backed by `Union::String::Format().StdPrintLine()`)
- Enable game event hooks by uncommenting them in the template
- Use game event functions (`Game_Init`, `Game_DefineExternals`, `Game_ApplySettings`, etc.)
- Create custom hooks as member functions with `userapi/*.inl` declarations and `::Union::CreateHook`
- Read configuration from `.ini` files using `zoptions`
- Define Daedalus external functions with `parser->DefineExternal` and `par->SetReturn`

These are the foundational building blocks of any Union plugin. From here, you can explore the ZenGin API headers in `gothic-api` to discover which engine classes and functions are available to hook and extend.
