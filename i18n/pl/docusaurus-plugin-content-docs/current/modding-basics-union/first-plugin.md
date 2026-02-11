---
sidebar_position: 2
title: "Moja pierwsza wtyczka"
description: "Tworzenie pierwszego pluginu Union dla Gothic."
---

# Moja pierwsza wtyczka

W tym samouczku stworzysz prosty plugin Union, który wypisze wiadomość w konsoli debugowej, włączysz hooki zdarzeń gry, utworzysz własny hook silnika, odczytasz konfigurację z pliku `.ini` oraz zdefiniujesz własną funkcję zewnętrzną Daedalusa. Po zakończeniu będziesz rozumieć kluczowe wzorce wykorzystywane przy tworzeniu pluginów Union.

## Wymagania wstępne

- Ukończony przewodnik [Jak zacząć?](./getting-started.md)
- Działający projekt Union, który się kompiluje
- Instalacja Gothic do testowania pluginu
- `ShowDebugWindow=true` włączone w `SystemPack.ini` (patrz [Jak zacząć?](./getting-started.md#10-włącz-konsolę-debugowania))

---

## Zrozumienie szablonu

Centralnym plikiem Twojego pluginu jest `Plugin.hpp` — to tutaj trafia cała logika pluginu. Zawiera zestaw **funkcji zdarzeń gry** — callbacków wywoływanych przez silnik w określonych momentach rozgrywki.

Tak wygląda `Plugin.hpp` z szablonu (uproszczony):

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

    // ... hooki (domyślnie zakomentowane) ...
}
```

Cały kod pluginu umieszczasz wewnątrz namespace'u `GOTHIC_NAMESPACE`. Ten namespace jest definiowany inaczej dla każdej wersji gry (np. `Gothic_I_Classic`, `Gothic_II_Addon`) — system budowania obsługuje to automatycznie.

:::warning
Funkcje zdarzeń gry **nie są wywoływane domyślnie**. Każda z nich wymaga odkomentowania odpowiedniego **hooka** w `Plugin.hpp`. Szablon dostarcza wszystkie hooki jako zakomentowany kod — musisz odkomentować te, których chcesz używać. Zobacz [Włączanie hooków zdarzeń gry](#krok-2-włącz-hooki-zdarzeń-gry) poniżej.
:::

### Funkcje zdarzeń gry

| Funkcja                           | Kiedy jest wywoływana                                   |
| --------------------------------- | ------------------------------------------------------- |
| `Game_EntryPoint`                 | Punkt wejścia Gothic (najwcześniejszy moment)           |
| `Game_Init`                       | Po zainicjalizowaniu plików DAT, świat gotowy           |
| `Game_Exit`                       | Podczas zamykania gry                                   |
| `Game_PreLoop`                    | Przed wyrenderowaniem każdej klatki                     |
| `Game_Loop`                       | Co klatkę (renderowanie głównego świata)                |
| `Game_PostLoop`                   | Po wyrenderowaniu każdej klatki                         |
| `Game_MenuLoop`                   | Co klatkę w menu                                        |
| `Game_SaveBegin` / `Game_SaveEnd` | Gdy rozpoczyna/kończy się zapis                         |
| `Game_LoadBegin_*` / `Game_LoadEnd_*` | Różne scenariusze ładowania (nowa gra, zapis, zmiana poziomu) |
| `Game_Pause` / `Game_Unpause`     | Gdy gra się pauzuje / odpauzowuje                       |
| `Game_DefineExternals`            | Gdy rejestrowane są externale Daedalusa                  |
| `Game_ApplySettings`              | Gdy ustawienia gry są stosowane                          |

---

## Krok 1: Skonfiguruj wypisywanie do konsoli

Najprostszy sposób na weryfikację, czy plugin działa, to wypisanie wiadomości w konsoli debugowej Union. Union Framework używa `StdPrintLine()` do wypisywania w konsoli.

Na początku zdefiniuj wygodne makro na górze `Plugin.hpp`, przed namespace'em:

```cpp
#define PrintConsole(a) Union::String::Format(a).StdPrintLine();
```

To makro opakowuje `Union::String::Format().StdPrintLine()`, dzięki czemu możesz wypisywać wiadomości jednym wywołaniem.

:::warning
Aby widzieć wyjście konsolowe, musisz włączyć okno debugowania Union w `SystemPack.ini` (w katalogu `System/` gry):

```ini
[CORE]
ShowDebugWindow=true
```

Bez tego ustawienia wiadomości `StdPrintLine()` nie będą widoczne.
:::

---

## Krok 2: Włącz hooki zdarzeń gry

Funkcje zdarzeń gry w szablonie to puste stuby — nie będą wywoływane, dopóki nie **odkomentujesz** odpowiadających im hooków. Hooki znajdują się na dole pliku `Plugin.hpp` jako zakomentowane bloki kodu.

Aby włączyć `Game_Init`, znajdź ten blok i **usuń znaczniki komentarza `/*` i `*/`**:

```cpp
/*void __fastcall oCGame_Init(oCGame* self, void* vtable);
auto Hook_oCGame_Init = Union::CreateHook(reinterpret_cast<void*>(zSwitch(0x00636F50, 0x0065D480, 0x006646D0, 0x006C1060)), &oCGame_Init, Union::HookType::Hook_Detours);
void __fastcall oCGame_Init(oCGame* self, void* vtable)
{
    Hook_oCGame_Init(self, vtable);
    Game_Init();
}*/
```

Po odkomentowaniu:

```cpp
void __fastcall oCGame_Init(oCGame* self, void* vtable);
auto Hook_oCGame_Init = Union::CreateHook(reinterpret_cast<void*>(zSwitch(0x00636F50, 0x0065D480, 0x006646D0, 0x006C1060)), &oCGame_Init, Union::HookType::Hook_Detours);
void __fastcall oCGame_Init(oCGame* self, void* vtable)
{
    Hook_oCGame_Init(self, vtable);
    Game_Init();
}
```

Ten hook przechwytuje funkcję `oCGame::Init` silnika. Gdy Gothic ją wywołuje, zamiast niej uruchamia się Twój hook — najpierw wywołuje oryginalną funkcję (`Hook_oCGame_Init`), a następnie Twój callback `Game_Init()`.

:::tip
Odkomentowuj tylko te hooki, których faktycznie potrzebujesz. Każdy hook przechwytuje wywołanie funkcji silnika, więc włączanie niepotrzebnych hooków dodaje narzut. W tym samouczku odkomentuj hook `oCGame_Init`.
:::

---

## Krok 3: Wypisz wiadomość

Teraz dodaj makro `PrintConsole` i wiadomość w `Game_Init`:

```cpp
#define PrintConsole(a) Union::String::Format(a).StdPrintLine();

namespace GOTHIC_NAMESPACE
{
    void Game_Init()
    {
        PrintConsole("Witaj z mojego pierwszego pluginu Union!");
    }

    // ... reszta funkcji pozostaje pusta ...

    // Upewnij się, że hook oCGame_Init jest odkomentowany!
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

### Zbuduj i przetestuj

1. Zbuduj plugin (wybierz odpowiedni preset, np. `G2A-Release`)
2. Upewnij się, że DLL jest w katalogu `System/Autorun/` gry
3. Upewnij się, że `ShowDebugWindow=true` jest ustawione w `SystemPack.ini`
4. Uruchom Gothic II: Noc Kruka
5. Powinno otworzyć się okno konsoli debugowej z wiadomością: `Witaj z mojego pierwszego pluginu Union!`

:::tip
Jeśli nie widzisz wiadomości, sprawdź czy:
- DLL został skompilowany dla właściwej wersji gry
- DLL jest w `System/Autorun/` (nie w `System/` ani innym katalogu)
- `ShowDebugWindow=true` jest ustawione w `SystemPack.ini`
- Hook `oCGame_Init` jest odkomentowany
:::

---

## Krok 4: Stwórz własny hook

Hooki to kluczowy mechanizm pluginów Union — pozwalają przechwytywać i modyfikować wywołania funkcji silnika. W poprzednim kroku odkomentujesz wbudowany hook z szablonu. Teraz stwórzmy **własny hook** od zera.

### Jak działają hooki

Hook zastępuje funkcję silnika gry Twoją własną implementacją. Wewnątrz swojej funkcji możesz:

- Uruchomić kod **przed** oryginalną funkcją
- Wywołać oryginalną funkcję
- Uruchomić kod **po** oryginalnej funkcji
- Modyfikować parametry lub całkowicie pominąć oryginał

### Folder userapi/

Aby hookować metodę klasy silnikowej, musisz najpierw zadeklarować swoją funkcję hookową jako metodę tej klasy. Robi się to tworząc plik `.inl` w folderze `userapi/` o nazwie odpowiadającej hookowanej klasie.

Na przykład, aby hookować metodę klasy `oCGame`, utwórz `userapi/oCGame.inl`:

```cpp
// userapi/oCGame.inl
void UpdatePlayerStatus_Hook();
```

System budowania automatycznie includuje te pliki `.inl`, rozszerzając klasy silnikowe o Twoje nowe metody.

### Struktura hooka

Każdy własny hook w Union Framework ma następujący wzorzec:

```cpp
// 1. Zadeklaruj hook w userapi/NazwaKlasy.inl:
//    void NazwaMetody_Hook(/* oryginalne parametry */);

// 2. Rejestracja hooka z adresem silnika
auto Hook_NazwaKlasy_Metoda = ::Union::CreateHook(
    reinterpret_cast<void*>(zSwitch(adres_G1, adres_G1A, adres_G2, adres_G2A)),
    &NazwaKlasy::NazwaMetody_Hook,
    ::Union::HookType::Hook_Detours
);

// 3. Implementacja
void NazwaKlasy::NazwaMetody_Hook(/* oryginalne parametry */)
{
    // twój kod przed...
    (this->*Hook_NazwaKlasy_Metoda)(/* oryginalne parametry */);  // wywołaj oryginał
    // twój kod po...
}
```

Kluczowe punkty:
- Hooki to **metody klasy silnikowej**, którą hookujemy — `this` daje bezpośredni dostęp do pól i metod obiektu
- **`(this->*Hook_Zmienna)(parametry)`** wywołuje oryginalną funkcję silnika. Zawsze ją wywołuj, chyba że celowo chcesz pominąć oryginalne zachowanie
- **`zSwitch(G1, G1A, G2, G2A)`** dostarcza inny adres pamięci dla każdej wersji silnika. Użyj `0` dla wersji, których nie chcesz hookować
- Zawsze używaj **`Hook_Detours`** jako typu hooka — zapewnia kompatybilność z innymi pluginami, w tym tymi zbudowanymi ze starszymi wersjami Union

### Przykład: Logowanie aktualizacji statusu gracza

Utwórz `userapi/oCGame.inl` z deklaracją hooka:

```cpp
// userapi/oCGame.inl
void UpdatePlayerStatus_Hook();
```

Następnie dodaj hook wewnątrz `GOTHIC_NAMESPACE` w `Plugin.hpp`:

```cpp
auto Hook_oCGame_UpdatePlayerStatus = ::Union::CreateHook(
    reinterpret_cast<void*>(zSwitch(0x00638F90, 0x0065F4E0, 0x00666640, 0x006C3140)),
    &oCGame::UpdatePlayerStatus_Hook,
    ::Union::HookType::Hook_Detours
);

void oCGame::UpdatePlayerStatus_Hook()
{
    PrintConsole("Status gracza jest aktualizowany!");
    (this->*Hook_oCGame_UpdatePlayerStatus)();  // wywołaj oryginał
}
```

### Przykład: Modyfikowanie obrażeń

Oto bardziej praktyczny przykład — hookowanie funkcji obrażeń, aby podwoić obrażenia zadawane przez gracza. Zwróć uwagę na sprawdzenia bezpieczeństwa: `pNpcAttacker` może być `nullptr` (np. przy obrażeniach od upadku), więc zawsze musisz go zweryfikować przed użyciem.

Najpierw utwórz `userapi/oCNpc.inl`:

```cpp
// userapi/oCNpc.inl
void OnDamage_Hit_Hook(oSDamageDescriptor& desc);
```

Następnie dodaj hook w `Plugin.hpp`:

```cpp
auto Hook_oCNpc_OnDamage_Hit = ::Union::CreateHook(
    reinterpret_cast<void*>(zSwitch(0x0, 0x0, 0x0, 0x006A28A0)),
    &oCNpc::OnDamage_Hit_Hook,
    ::Union::HookType::Hook_Detours
);

void oCNpc::OnDamage_Hit_Hook(oSDamageDescriptor& desc)
{
    // Sprawdź czy jest atakujący NPC (np. obrażenia od upadku nie mają atakującego)
    oCNpc* attacker = desc.pNpcAttacker;

    if (attacker && attacker == oCNpc::player)
    {
        // Podwój obrażenia tylko gdy atakującym jest gracz
        for (int i = 0; i < oEDamageIndex_MAX; i++)
            desc.aryDamage[i] *= 2;

        PrintConsole("Obrażenia gracza podwojone!");
    }

    // Zawsze wywołaj oryginalny handler obrażeń
    (this->*Hook_oCNpc_OnDamage_Hit)(desc);
}
```

:::info
Adres `0x006A28A0` w tym przykładzie dotyczy tylko Gothic II: Noc Kruka (pozostałe trzy to `0x0`). Znajdowanie adresów funkcji wymaga analizy nagłówków ZenGin w `gothic-api` lub użycia narzędzi takich jak IDA/Ghidra. Szablon dostarcza adresy dla najczęściej hookowanych funkcji.
:::

---

## Krok 5: Odczytuj opcje z plików .ini

Pluginy często potrzebują konfigurowalnych ustawień. Możesz odczytywać wartości z plików `.ini` (jak `Gothic.ini`) za pomocą API ZenGin `zoptions`.

```cpp
namespace GOTHIC_NAMESPACE
{
    bool logDamage = false;
    int damageMultiplier = 1;

    void Game_Init()
    {
        // Odczytaj ustawienia z Gothic.ini
        // Sekcja: [MYPLUGIN], Klucz: LogDamage, Domyślnie: false
        logDamage = zoptions->ReadBool("MYPLUGIN", "LogDamage", false);

        // Odczytaj wartość całkowitą
        damageMultiplier = zoptions->ReadInt("MYPLUGIN", "DamageMultiplier", 1);

        PrintConsole("MyPlugin załadowany!");
    }

    void Game_ApplySettings()
    {
        // Ponownie odczytaj ustawienia gdy użytkownik zmieni opcje
        logDamage = zoptions->ReadBool("MYPLUGIN", "LogDamage", false);
        damageMultiplier = zoptions->ReadInt("MYPLUGIN", "DamageMultiplier", 1);
    }

    // ... reszta funkcji
}
```

Użytkownicy mogą wtedy dodać sekcję do swojego `Gothic.ini`:

```ini
[MYPLUGIN]
LogDamage=1
DamageMultiplier=2
```

:::tip
Używaj `Game_ApplySettings()` do ponownego odczytu ustawień — jest wywoływana gdy użytkownik zastosuje zmiany w menu opcji, co zapewnia aktualizację ustawień bez restartowania gry. Pamiętaj o odkomentowaniu odpowiedniego hooka `CGameManager_ApplySomeSettings` w szablonie.
:::

---

## Krok 6: Definiuj externale Daedalusa

Możesz udostępniać funkcje C++ skryptom Daedalusa. To pozwala modderom wywoływać funkcjonalność Twojego pluginu ze skryptów.

### Definiowanie funkcji zewnętrznej

```cpp
namespace GOTHIC_NAMESPACE
{
    // Implementacja externala w C++
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
        // Zarejestruj funkcję, aby Daedalus mógł ją wywoływać
        // Składnia: nazwa, wskaźnik do funkcji, typ zwracany, [typy parametrów...], 0
        parser->DefineExternal("MyPlugin_GetPlayerLevel",
            MyPlugin_GetPlayerLevel,
            zPAR_TYPE_INT,     // typ zwracany
            0                  // koniec listy parametrów
        );
    }

    // ... reszta funkcji
}
```

:::warning
Aby `Game_DefineExternals()` był wywoływany, musisz odkomentować hook `oCGame_DefineExternals_Ulfi` w szablonie.
:::

:::info
Funkcje externali zawsze zwracają `int` i muszą kończyć się `return 0;`. Aby przekazać wartość z powrotem do Daedalusa, użyj `par->SetReturn(wartość)` — nigdy nie używaj instrukcji C++ `return` do zwracania faktycznej wartości.
:::

### External z parametrami

```cpp
namespace GOTHIC_NAMESPACE
{
    int MyPlugin_MultiplyDamage()
    {
        zCParser* par = zCParser::GetParser();

        // Pobierz parametry ze stosu Daedalusa (w odwrotnej kolejności!)
        int multiplier; par->GetParameter(multiplier);
        int damage;     par->GetParameter(damage);

        par->SetReturn(damage * multiplier);
        return 0;
    }

    void Game_DefineExternals()
    {
        parser->DefineExternal("MyPlugin_MultiplyDamage",
            MyPlugin_MultiplyDamage,
            zPAR_TYPE_INT,      // typ zwracany
            zPAR_TYPE_INT,      // param 1: obrażenia
            zPAR_TYPE_INT,      // param 2: mnożnik
            0                   // koniec listy parametrów
        );
    }

    // ... reszta funkcji
}
```

Po zdefiniowaniu externala, skrypty Daedalusa mogą go wywoływać:

```daedalus
func int CalculateBoostedDamage(var int baseDamage)
{
    var int result;
    result = MyPlugin_MultiplyDamage(baseDamage, 3);
    return result;
};
```

:::warning
Przy odczytywaniu parametrów ze stosu Daedalusa przez `GetParameter`, są one zdejmowane w **odwrotnej kolejności** — ostatni parametr w wywołaniu Daedalusa jest pierwszym, który zdejmujesz w C++.
:::

---

## Całość razem

Oto kompletny `Plugin.hpp` łączący wszystko z tego samouczka:

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
        PrintConsole("MyPlugin załadowany!");
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

    // --- Hooki (odkomentuj te, których potrzebujesz) ---

    // Hook Game_Init
    void __fastcall oCGame_Init(oCGame* self, void* vtable);
    auto Hook_oCGame_Init = Union::CreateHook(reinterpret_cast<void*>(zSwitch(0x00636F50, 0x0065D480, 0x006646D0, 0x006C1060)), &oCGame_Init, Union::HookType::Hook_Detours);
    void __fastcall oCGame_Init(oCGame* self, void* vtable)
    {
        Hook_oCGame_Init(self, vtable);
        Game_Init();
    }

    // Hook Game_DefineExternals
    void __fastcall oCGame_DefineExternals_Ulfi(oCGame* self, void* vtable, zCParser* parser);
    auto Hook_oCGame_DefineExternals_Ulfi = Union::CreateHook(reinterpret_cast<void*>(zSwitch(0x006495B0, 0x006715F0, 0x00677A00, 0x006D4780)), &oCGame_DefineExternals_Ulfi, Union::HookType::Hook_Detours);
    void __fastcall oCGame_DefineExternals_Ulfi(oCGame* self, void* vtable, zCParser* parser)
    {
        Hook_oCGame_DefineExternals_Ulfi(self, vtable, parser);
        Game_DefineExternals();
    }

    // Hook Game_ApplySettings
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

## Podsumowanie

W tym samouczku nauczyłeś się:

- Wypisywać wiadomości w konsoli debugowej Union za pomocą `PrintConsole` (opartego na `Union::String::Format().StdPrintLine()`)
- Włączać hooki zdarzeń gry poprzez odkomentowywanie ich w szablonie
- Używać funkcji zdarzeń gry (`Game_Init`, `Game_DefineExternals`, `Game_ApplySettings` itd.)
- Tworzyć własne hooki jako metody klas silnikowych z deklaracjami w `userapi/*.inl` i rejestracją przez `::Union::CreateHook`
- Odczytywać konfigurację z plików `.ini` za pomocą `zoptions`
- Definiować funkcje zewnętrzne Daedalusa za pomocą `parser->DefineExternal` i `par->SetReturn`

To fundamentalne elementy każdego pluginu Union. Stąd możesz eksplorować nagłówki API ZenGin w `gothic-api`, aby odkryć jakie klasy i funkcje silnika są dostępne do hookowania i rozszerzania.
