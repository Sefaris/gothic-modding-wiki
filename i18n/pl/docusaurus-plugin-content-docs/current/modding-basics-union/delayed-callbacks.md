---
sidebar_position: 5
title: "Opóźnione Callbacki"
description: "Tworzenie systemu opóźnionych callbacków w pluginie Union do wykonywania funkcji Daedalusa po określonym czasie."
---

# Opóźnione Callbacki

W tym poradniku zbudujesz **system opóźnionych callbacków** - mechanizm pozwalający zaplanować wywołanie funkcji Daedalusa po określonym opóźnieniu czasowym. Jest to przydatne do efektów czasowych, opóźnionych reakcji, skryptowanych sekwencji i każdej mechaniki gry, która wymaga żeby coś stało się "za X sekund."

Stworzysz obiekt callbacku, menedżera który przetwarza aktywne callbacki co klatkę, external Daedalusa do planowania ich ze skryptów oraz obsługę zapisu/wczytywania, aby oczekujące callbacki przetrwały zapis gry.

## Wymagania

- Ukończony poradnik [Mój Pierwszy Plugin](./first-plugin.md)
- Działający projekt Union z odkomentowanymi hookami `Game_Init`, `Game_Loop`, `Game_Exit` i `Game_DefineExternals`
- Znajomość zewnętrznych funkcji Daedalusa (`parser->DefineExternal`)

---

## Jak to działa

System składa się z trzech części:

1. **`DelayedCallback`** - obiekt danych przechowujący: który NPC jest kontekstem (`self`), jak długo czekać i którą funkcję Daedalusa wywołać
2. **`CallbackManager`** - trzyma listę oczekujących callbacków, przesuwa ich liczniki co klatkę używając `ztimer->frameTimeFloat` i uruchamia je gdy opóźnienie minie
3. **External Daedalusa** - `DelayedCall(npc, delay, function)` aby skrypty mogły planować callbacki

```
Skrypt Daedalusa                   Plugin C++
     |                                  |
     |  DelayedCall(self, 3.0, MyFunc)  |
     |  ---------------------------->>  |
     |                                  |  Tworzy DelayedCallback
     |                                  |  Dodaje do CallbackManager
     |                                  |
     |          (mija 3 sekundy)        |
     |                                  |
     |                                  |  Czas minął
     |                                  |  Ustawia SELF = npc
     |  <<----------------------------  |
     |  MyFunc() jest wywołana          |
```

---

## Krok 1: Klasa DelayedCallback

To prosty obiekt danych. Przechowuje wszystko co potrzebne do późniejszego wywołania callbacku:

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

Kluczowe pola:
- `npc` - NPC który zostanie ustawiony jako `self` gdy callback się uruchomi
- `delay` - ile sekund czekać przed uruchomieniem
- `funcIndex` - indeks funkcji Daedalusa (uzyskiwany przez `parser->GetIndex`)
- `elapsedTime` - akumuluje delty klatek aż osiągnie `delay`

---

## Krok 2: CallbackManager

Menedżer trzyma listę oczekujących callbacków i przetwarza je co klatkę:

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
            // Nie odliczaj podczas dialogów
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
                    i--;  // skoryguj indeks po usunięciu
                }
            }
        }

    private:
        zCArray<DelayedCallback*> callbacks;

        void FireCallback(DelayedCallback* cb)
        {
            if (cb->GetFuncIndex() == -1)
                return;

            // Zapisz aktualne SELF/OTHER/VICTIM żeby nie zepsuć stanu gry
            oCNpc* oldSelf = nullptr;
            oCNpc* oldOther = nullptr;
            oCNpc* oldVictim = nullptr;

            zCPar_Symbol* sym = parser->GetSymbol("SELF");
            if (sym) oldSelf = dynamic_cast<oCNpc*>((zCVob*)sym->GetInstanceAdr());

            sym = parser->GetSymbol("OTHER");
            if (sym) oldOther = dynamic_cast<oCNpc*>((zCVob*)sym->GetInstanceAdr());

            sym = parser->GetSymbol("VICTIM");
            if (sym) oldVictim = dynamic_cast<oCNpc*>((zCVob*)sym->GetInstanceAdr());

            // Ustaw SELF na NPC callbacku i wywołaj funkcję
            parser->SetInstance("SELF", cb->GetNpc());
            parser->CallFunc(cb->GetFuncIndex());

            // Przywróć oryginalne zmienne parsera
            parser->SetInstance("SELF", oldSelf);
            parser->SetInstance("OTHER", oldOther);
            parser->SetInstance("VICTIM", oldVictim);
        }
    };

    std::unique_ptr<CallbackManager> callbackManager;
}
```

### Kluczowe szczegóły

**Delta czasu klatki:** `ztimer->frameTimeFloat` podaje czas od ostatniej klatki w milisekundach. Dzielenie przez 1000 konwertuje na sekundy, które są jednostką używaną do opóźnień.

**Pauzowanie w dialogach:** Sprawdzenie `oCInformationManager::HasFinished()` wstrzymuje liczniki callbacków podczas dialogów. Bez tego callback z 5-sekundowym opóźnieniem zaplanowany tuż przed dialogiem mógłby się uruchomić w środku rozmowy.

:::warning
**Dlaczego zapisujemy i przywracamy zmienne parsera?** Parser Daedalusa ma globalne zmienne `SELF`, `OTHER` i `VICTIM`, od których zależy wiele skryptów. Gdy wywołujesz `parser->SetInstance("SELF", ...)` aby ustawić NPC callbacku, nadpisujesz to co było tam wcześniej zapisane. Jeśli nie przywrócisz oryginalnych wartości, inne skrypty działające w tej samej klatce zobaczą niewłaściwe `self` - powodując błędy od zepsutego AI po crashe.
:::

**Korekta indeksu:** Po usunięciu callbacku z tablicy przez `RemoveIndex(i)`, następny element przesuwa się na pozycję `i`. `i--` zapewnia że go nie pominiemy.

---

## Krok 3: External Daedalusa

Udostępnij system callbacków skryptom Daedalusa aby mogli go używać:

```cpp
namespace GOTHIC_NAMESPACE
{
    int Extern_DelayedCall()
    {
        zCParser* par = zCParser::GetParser();

        // Pobierz parametry w odwrotnej kolejności
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
            zPAR_TYPE_INT,          // typ zwracany
            zPAR_TYPE_INSTANCE,     // param 1: npc
            zPAR_TYPE_FLOAT,        // param 2: opóźnienie w sekundach
            zPAR_TYPE_FUNC,         // param 3: funkcja do wywołania
            0                       // koniec parametrów
        );
    }
}
```

:::info
Typ parametru `zPAR_TYPE_FUNC` przekazuje referencję do funkcji Daedalusa. Po stronie C++ przychodzi jako `int` - indeks funkcji w tablicy symboli parsera. To ten sam indeks który uzyskałbyś z `parser->GetIndex("NazwaFunkcji")`.
:::

### Użycie z Daedalusa

```daedalus
func void OnPoisonExpire()
{
    // self jest automatycznie ustawiony na NPC przekazanego do DelayedCall
    Npc_ChangeAttribute(self, ATR_HITPOINTS, 50);
    PrintScreen("Trucizna przestała działać!", -1, -1, "FONT_OLD_10_WHITE.TGA", -1);
};

func void ApplyPoison(var C_NPC target)
{
    Npc_ChangeAttribute(target, ATR_HITPOINTS, -100);

    // Wywołaj OnPoisonExpire z target jako self po 10 sekundach
    DelayedCall(target, 10.0, OnPoisonExpire);
};
```

---

## Krok 4: Podłączenie do Plugin.hpp

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
        // Wyczyść oczekujące callbacki przy zapisie
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

    // ... inne funkcje zdarzeń gry ...

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

    // ... hooki ...
}
```

---

## Krok 5: Obsługa zapisu/wczytywania (opcjonalnie)

Podstawowa implementacja powyżej czyści wszystkie oczekujące callbacki przy zapisie/wczytywaniu. Jeśli chcesz żeby callbacki **przetrwały zapisy**, musisz je serializować/deserializować używając systemu archiwów Gothica.

### Serializacja

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

### Deserializacja

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
Callbacki są zapisywane z **pełnym opóźnieniem** (nie pozostałym czasem). Oznacza to że po wczytaniu licznik startuje od zera. Jeśli potrzebujesz żeby callback uruchomił się z pozostałym czasem, zapisz `delay - elapsedTime` zamiast `delay`.
:::

:::warning
`SearchVobByName` szuka NPC w aktualnym świecie. Jeśli NPC nie istnieje (np. był na innym poziomie), callback jest po cichu usuwany. To celowe - callback do NPC który już nie istnieje spowodowałby crash przy uruchomieniu.
:::

---

## Kompletny przykład

Pełny, minimalny `Plugin.hpp`:

```cpp
#define PrintConsole(a) Union::String::Format(a).StdPrintLine();

namespace GOTHIC_NAMESPACE
{
    // ===============================
    // Opóźniony Callback
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
    // Menedżer Callbacków
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

            // Zapisz stan parsera
            oCNpc* oldSelf = nullptr;
            oCNpc* oldOther = nullptr;
            oCNpc* oldVictim = nullptr;

            zCPar_Symbol* sym = parser->GetSymbol("SELF");
            if (sym) oldSelf = dynamic_cast<oCNpc*>((zCVob*)sym->GetInstanceAdr());
            sym = parser->GetSymbol("OTHER");
            if (sym) oldOther = dynamic_cast<oCNpc*>((zCVob*)sym->GetInstanceAdr());
            sym = parser->GetSymbol("VICTIM");
            if (sym) oldVictim = dynamic_cast<oCNpc*>((zCVob*)sym->GetInstanceAdr());

            // Uruchom callback
            parser->SetInstance("SELF", cb->GetNpc());
            parser->CallFunc(cb->GetFuncIndex());

            // Przywróć stan parsera
            parser->SetInstance("SELF", oldSelf);
            parser->SetInstance("OTHER", oldOther);
            parser->SetInstance("VICTIM", oldVictim);
        }
    };

    std::unique_ptr<CallbackManager> callbackManager;

    // ===============================
    // External Daedalusa
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
    // Funkcje zdarzeń gry
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
    // Hooki
    // ===============================

    // Hook oCGame_Init
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

    // Hook Game_Loop
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

    // Hook Game_DefineExternals
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

    // Hook Game_SaveBegin
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

## Zastosowania

Oto praktyczne przykłady tego co możesz zbudować z opóźnionymi callbackami:

### Czasowy Buff/Debuff

```daedalus
func void RemoveSpeedBuff()
{
    // self to NPC którego buff wygasł
    Npc_ChangeAttribute(self, ATR_DEXTERITY, -10);
};

func void ApplySpeedBuff(var C_NPC target)
{
    Npc_ChangeAttribute(target, ATR_DEXTERITY, 10);
    DelayedCall(target, 30.0, RemoveSpeedBuff);  // usuń po 30s
};
```

### Opóźniony Spawn

```daedalus
func void SpawnReinforcements()
{
    Wld_InsertNpc(GRD_233_GUARD, "FP_SPAWN_GUARD_01");
    Wld_InsertNpc(GRD_234_GUARD, "FP_SPAWN_GUARD_02");
};

func void TriggerAlarm()
{
    // Strażnicy przychodzą 5 sekund po alarmie
    DelayedCall(hero, 5.0, SpawnReinforcements);
};
```

### Łańcuchowe Sekwencje

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

## Wskazówki

- **Czas życia callbacków** - callbacki istnieją tylko w pamięci. Jeśli gra ulegnie awarii lub gracz wyjdzie bez zapisywania, oczekujące callbacki są tracone. To oczekiwane zachowanie
- **Ważność NPC** - system przechowuje surowy wskaźnik do NPC. Jeśli NPC zostanie usunięty ze świata (np. `Npc_Remove`) przed uruchomieniem callbacku, wskaźnik staje się wiszący. Dla bezpieczeństwa sprawdzaj czy NPC żyje na początku funkcji callbacku
- **Pauzowanie w dialogach** - liczniki są wstrzymywane podczas dialogów (`oCInformationManager::HasFinished()` zwraca `false`). Callback 5-sekundowy nie uruchomi się w środku rozmowy nawet jeśli 5 sekund czasu rzeczywistego minie podczas dialogu
- **Niezależność od klatek** - używanie `ztimer->frameTimeFloat` zapewnia że callbacki uruchamiają się w mniej więcej poprawnym czasie niezależnie od szybkości klatek. Przy 60 FPS każda delta to ~16.6 ms; przy 30 FPS to ~33.3 ms, ale skumulowany czas w obu przypadkach osiąga docelowe opóźnienie
- **Wiele callbacków** - możesz zaplanować wiele callbacków dla tego samego NPC lub tej samej funkcji. Każdy jest niezależny. Zaplanowanie `DelayedCall(self, 1.0, MyFunc)` trzy razy wywoła `MyFunc` trzy razy po 1 sekundzie

---

## Podsumowanie

W tym poradniku nauczyłeś się:

- Tworzyć klasę danych opóźnionego callbacku przechowującą NPC, opóźnienie i indeks funkcji
- Budować menedżera który odlicza callbacki używając `ztimer->frameTimeFloat` i uruchamia je gdy są gotowe
- Zapisywać i przywracać zmienne parsera `SELF`/`OTHER`/`VICTIM` aby nie zepsuć stanu gry
- Udostępniać system skryptom Daedalusa przez `parser->DefineExternal` z `zPAR_TYPE_FUNC`
- Obsługiwać czyszczenie przy zapisie/wczytywaniu aby zapobiec crashom od wiszących wskaźników
- Opcjonalnie serializować oczekujące callbacki dla trwałości zapisów gry

Ten wzorzec jest fundamentem wielu systemów gry - czasowych buffów, zaplanowanych wydarzeń, cooldownów umiejętności, opóźnionych reakcji AI i skryptowanych sekwencji.
