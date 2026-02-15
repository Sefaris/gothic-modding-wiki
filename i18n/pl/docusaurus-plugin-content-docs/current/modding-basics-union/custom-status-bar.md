---
sidebar_position: 4
title: "Wlasny Status Bar"
description: "Tworzenie wlasnego oCViewStatusBar w pluginie Union - przyklad paska wytrzymalosci."
---

# Wlasny Status Bar

W tym poradniku stworzysz w pelni funkcjonalny **pasek wytrzymalosci** - nowy `oCViewStatusBar`, ktory wyswietla sie obok istniejacych paskow HP i Many. Nauczysz sie, jak dziala system paskow statusu w silniku, jak pozycjonowac wlasny pasek wzgledem istniejacych, jak aktualizowac jego wartosc ze zmiennych Daedalusa oraz jak obslugiwac widocznosc, czyszczenie i nakladki tekstowe.

Techniki pokazane tutaj mozna zastosowac do dowolnego wlasnego paska - wytrzymalosci, doswiadczenia, tarczy, lub czegokolwiek innego.

## Wymagania

- Ukonczony poradnik [Moj Pierwszy Plugin](./first-plugin.md)
- Dzialajacy projekt Union z odkomentowanymi hookami `oCGame_Init`, `Game_Loop` i `Game_SaveBegin`
- Podstawowa znajomosc hookow i folderu `userapi/`
- Plik tekstury paska (np. `BAR_STAMINA.TGA`) umieszczony w katalogu `Textures` twojego moda

---

## Jak dzialaja paski statusu w Gothicu

Paski statusu HUD w Gothicu (HP, Mana, focus, plywanie) to instancje `oCViewStatusBar`, ktory dziedziczy po `zCView`. Silnik zarzadza nimi przez obiekt `oCGame`:

```cpp
// Skladowe oCGame (dostepne przez globalny wskaznik ogame)
oCViewStatusBar* hpBar;     // Pasek zdrowia
oCViewStatusBar* manaBar;   // Pasek many
oCViewStatusBar* focusBar;  // Pasek fokusu wroga
oCViewStatusBar* swimBar;   // Pasek plywania/nurkowania
```

Kazdy `oCViewStatusBar` sklada sie z warstw `zCView`:

| Warstwa | Opis |
|---------|------|
| Tlo | Ramka paska (`BAR_BACK.TGA`) |
| `range_bar` | Pokazuje zakres maksymalny (`BAR_TEMPMAX.TGA`) |
| `value_bar` | Pokazuje aktualne wypelnienie (`BAR_HEALTH.TGA` itp.) |

Kluczowe metody, z ktorych bedziesz korzystac:

| Metoda | Zastosowanie |
|--------|-------------|
| `Init(x, y, scale)` | Inicjalizacja paska na pozycji ze skala |
| `SetTextures(back, range, value, "")` | Ustawienie czterech warstw tekstur |
| `SetMaxRange(min, max)` | Ustawienie calkowitego zakresu paska |
| `SetRange(min, max)` | Ustawienie widocznego zakresu |
| `SetValue(val)` | Ustawienie aktualnego wypelnienia |
| `SetPos(x, y)` | Ustawienie pozycji na ekranie (wsp. wirtualne) |
| `SetSize(w, h)` | Ustawienie wymiarow paska |
| `GetPos(x, y)` | Odczyt aktualnej pozycji |
| `GetSize(w, h)` | Odczyt aktualnego rozmiaru |

:::info
Gothic uzywa **wirtualnego systemu wspolrzednych** o rozmiarze **8192 x 8192** dla pozycji na ekranie. Punkt `(0, 0)` to lewy gorny rog, a `(8192, 8192)` to prawy dolny rog. Wszystkie wywolania `SetPos`, `GetPos`, `SetSize` uzywaja tych wirtualnych wspolrzednych, wiec pozycje paskow sa niezalezne od rozdzielczosci.
:::

---

## Krok 1: Deklaracja hooka

Aby aktualizowac pasek co klatke, musisz polaczyc sie z `oCGame::UpdatePlayerStatus` - to tutaj silnik aktualizuje paski HP, Many i innych statusow. Twoj wlasny pasek bedzie aktualizowany w tym samym miejscu.

Stworz lub edytuj `userapi/oCGame.inl` i dodaj:

```cpp
// userapi/oCGame.inl
void UpdatePlayerStatus_Hook();
```

---

## Krok 2: Stworzenie klasy StaminaBar

Stworz plik naglowkowy dla klasy paska wytrzymalosci. W prostym pluginie mozesz umiescic to bezposrednio w `Plugin.hpp`, ale separowanie do osobnego pliku utrzymuje lad w projekcie.

```cpp
// StaminaBar.h
namespace GOTHIC_NAMESPACE
{
    class zCStaminaBar
    {
    public:
        void Init();
        void UpdatePosAndSize();
        void UpdateValue();
        void Reset();
        void Loop();

    public:
        oCViewStatusBar* staminaBar = nullptr;

    private:
        zCView* valueView = nullptr;
        bool ShouldHideBar() const;

        void ClearValueView();
    };

    std::unique_ptr<zCStaminaBar> zStaminaBar;
}
```

Kluczowe decyzje projektowe:
- `staminaBar` to wlasciwa instancja `oCViewStatusBar`
- `valueView` to opcjonalna nakladka tekstowa do wyswietlania wartosci liczbowych
- `std::unique_ptr` automatycznie zarzadza czasem zycia obiektu

---

## Krok 3: Implementacja paska

Teraz zaimplementuj wszystkie metody. To sedno poradnika.

### Init - tworzenie i wstawianie paska

```cpp
// StaminaBar.hpp
namespace GOTHIC_NAMESPACE
{
    void zCStaminaBar::Init()
    {
        // Stworz pasek tylko raz
        if (!staminaBar)
        {
            staminaBar = new oCViewStatusBar();

            if (screen)
            {
                // Wstaw na ekran aby zainicjalizowac wewnetrzne struktury
                screen->InsertItem(staminaBar, FALSE);

                // Inicjalizuj na pozycji (0,0) ze skala 1.0
                staminaBar->Init(0, 0, 1.0);

                // Ustaw tekstury paska
                staminaBar->SetTextures(
                    "BAR_BACK.TGA",      // ramka tla
                    "BAR_TEMPMAX.TGA",   // wskaznik zakresu
                    "BAR_STAMINA.TGA",   // wypelnienie (twoja wlasna tekstura)
                    ""                   // nieuzywany 4. slot
                );

                // Oblicz pozycje na podstawie istniejacych paskow
                UpdatePosAndSize();

                // Usun po inicjalizacji - bedziemy wstawiac co klatke
                screen->RemoveItem(staminaBar);
            }
        }

        // Co klatke: wstaw ponownie, zaktualizuj i warunkowo ukryj
        if (screen && staminaBar)
        {
            screen->RemoveItem(staminaBar);
            screen->InsertItem(staminaBar, FALSE);

            UpdateValue();

            if (ShouldHideBar())
            {
                screen->RemoveItem(staminaBar);
            }
        }
    }
}
```

:::warning
Wzorzec usuwania i ponownego wstawiania paska co klatke moze wydawac sie dziwny, ale jest konieczny. `screen->InsertItem` silnika zarzadza kolejnoscia renderowania. Ponowne wstawianie zapewnia, ze pasek pozostaje we wlasciwej warstwie wzgledem innych elementow HUD, ktore moga byc dynamicznie dodawane lub usuwane.
:::

### UpdatePosAndSize - pozycjonowanie wzgledem istniejacych paskow

Pasek wytrzymalosci powinien byc wyrownany z paskami HP i Many. Silnik nie oferuje ukladu stalego - pozycje paskow moga sie roznic miedzy modami i konfiguracjami ekranu. Ten kod odczytuje pozycje istniejacych paskow i oblicza, gdzie umiescic nowy:

```cpp
void zCStaminaBar::UpdatePosAndSize()
{
    if (!ogame || !ogame->hpBar || !ogame->manaBar || !staminaBar)
        return;

    int sizeX, sizeY;
    int posX_HP, posY_HP;
    int posX_Mana, posY_Mana;

    // Odczytaj rozmiar i pozycje istniejacych paskow
    ogame->hpBar->GetSize(sizeX, sizeY);
    ogame->hpBar->GetPos(posX_HP, posY_HP);
    ogame->manaBar->GetPos(posX_Mana, posY_Mana);

    // Dopasuj rozmiar do paska HP
    staminaBar->SetSize(sizeX, sizeY);

    if (posX_HP == posX_Mana)
    {
        // Paski ustawione pionowo (ta sama pozycja X)
        // Umiesc pasek wytrzymalosci nad najwyzszym paskiem
        int verticalOffset = std::abs(posY_HP - posY_Mana);

        if (posY_Mana < posY_HP)
            staminaBar->SetPos(posX_HP, posY_Mana - verticalOffset);
        else
            staminaBar->SetPos(posX_HP, posY_HP - verticalOffset);
    }
    else
    {
        // Paski obok siebie - wycentruj pasek wytrzymalosci
        staminaBar->SetPos((8192 / 2) - sizeX / 2, posY_HP);
    }
}
```

:::tip
Wartosc `8192` to szerokosc wirtualnego systemu wspolrzednych. Podzielenie przez 2 daje srodek ekranu w poziomie. To przydatne do centrowania elementow niezaleznie od faktycznej rozdzielczosci ekranu.
:::

### UpdateValue - odczyt zmiennej Daedalusa

Wartosc wytrzymalosci pochodzi ze zmiennej skryptowej Daedalusa. Odczytujesz ja przez tablice symboli parsera:

```cpp
void zCStaminaBar::UpdateValue()
{
    auto symStamina = parser->GetSymbol("ATR_STAMINA");
    auto symStaminaMax = parser->GetSymbol("ATR_STAMINA_MAX");

    if (!symStamina || !symStaminaMax)
        return;

    int stamina = symStamina->single_intdata;
    int staminaMax = symStaminaMax->single_intdata;

    if (stamina && staminaMax)
    {
        staminaBar->SetValue(stamina);
        staminaBar->SetMaxRange(0, staminaMax);
        staminaBar->SetRange(0, staminaMax);
    }
}
```

### ShouldHideBar - logika widocznosci

Pasek powinien byc ukryty w okreslonych sytuacjach - menu pauzy, dialog, nurkowanie (ktore ma wlasny pasek plywania):

```cpp
bool zCStaminaBar::ShouldHideBar() const
{
    if (!player)
        return true;

    // Ukryj podczas pauzy
    if (ogame->IsOnPause())
        return true;

    // Ukryj podczas dialogow
    if (!oCInformationManager::GetInformationManager().HasFinished())
        return true;

    // Ukryj gdy ekwipunek jest otwarty
    if (player->inventory2.IsOpen())
        return true;

    // Ukryj podczas nurkowania (pasek plywania przejmuje)
    if (player->GetBodyState() == BS_DIVE)
        return true;

    return false;
}
```

### Reset - czyszczenie przy zapisie/wczytywaniu

Gdy gra zapisuje lub wczytuje stan, musisz usunac pasek z ekranu i go zniszczyc. Hook odtworzy go, gdy gra wznowi dzialanie:

```cpp
void zCStaminaBar::Reset()
{
    if (staminaBar)
    {
        screen->RemoveItem(staminaBar);
        staminaBar = nullptr;
    }
}
```

:::danger
Zapomnienie o zresetowaniu paska przy zapisie/wczytywaniu moze powodowac crashe. Silnik serializuje stan gry, a wiszace wskazniki do zniszczonych widokow doprowadza do naruszen dostepu do pamieci. Zawsze czyszcz w `Game_SaveBegin` i `LoadBegin`.
:::

---

## Krok 4: Wyswietlanie wartosci liczbowych na pasku

Mozesz nalozyc tekst pokazujacy dokladne wartosci (np. "75/100") bezposrednio na pasek. Wykorzystuje to `zCView` wstawiony jako dziecko `range_bar` paska:

```cpp
void zCStaminaBar::ClearValueView()
{
    delete valueView;
    valueView = nullptr;
}

void zCStaminaBar::Loop()
{
    // Pokazuj wartosci tylko gdy pasek jest widoczny
    if (!ogame->GetShowPlayerStatus() || !staminaBar)
        return;

    auto symStamina = parser->GetSymbol("ATR_STAMINA");
    auto symStaminaMax = parser->GetSymbol("ATR_STAMINA_MAX");
    if (!symStamina || !symStaminaMax)
        return;

    // Wyczysc nakladke z poprzedniej klatki
    ClearValueView();

    int stamina = symStamina->single_intdata;
    int staminaMax = symStaminaMax->single_intdata;

    zSTRING text = zSTRING{stamina} + "/" + zSTRING{staminaMax};

    // Stworz pelnoekranowy widok jako nakladke
    valueView = new zCView(0, 0, 8192, 8192);

    if (staminaBar->range_bar)
    {
        // Wstaw widok tekstu do obszaru range paska
        staminaBar->range_bar->InsertItem(valueView);

        // Wycentruj tekst wewnatrz paska
        int textWidth = valueView->FontSize(text);
        int textHeight = valueView->FontY();

        int posX = (8192 - textWidth) / 2;
        int posY = (8192 - textHeight - 50) / 2;

        zCOLOR color = zCOLOR(255, 255, 255, staminaBar->alpha);
        valueView->CreateText(posX, posY, text, 0, color, 0, 1);
    }
}
```

:::tip
Nakladka tekstowa jest tworzona od nowa co klatke (stara usuwana, nowa tworzona). To standardowe podejscie w systemie renderowania Gothica - widoki uzywane do tymczasowego tekstu nie sa trwale.
:::

**Alternatywa: tekst nad paskiem** zamiast wewnatrz niego:

```cpp
// Wydrukuj tekst nad paskiem zamiast wewnatrz
int posX, posY;
staminaBar->GetPos(posX, posY);
posY -= 50 + screen->FontY();  // przesuniecie nad pasek

zSTRING text = zSTRING{stamina} + "/" + zSTRING{staminaMax};
int textLen = screen->FontSize(text);
posX = 4096 - textLen / 2;  // wycentruj w poziomie

screen->Print(posX, posY, text);
```

---

## Krok 5: Podlaczenie do Plugin.hpp

Teraz polacz wszystkie elementy w swoim `Plugin.hpp`:

```cpp
#define PrintConsole(a) Union::String::Format(a).StdPrintLine();

// Dolacz pliki paska wytrzymalosci
#include "StaminaBar.h"
#include "StaminaBar.hpp"

namespace GOTHIC_NAMESPACE
{
    void Game_Init()
    {
        // Stworz instancje paska wytrzymalosci
        zStaminaBar = std::make_unique<zCStaminaBar>();
        PrintConsole("Stamina bar plugin loaded!");
    }

    void Game_Exit()
    {
        zStaminaBar.reset();
    }

    void Game_Loop()
    {
        // Aktualizuj nakladke tekstowa co klatke
        if (zStaminaBar)
            zStaminaBar->Loop();
    }

    void Game_SaveBegin()
    {
        // Wyczysc przed zapisem
        if (zStaminaBar)
            zStaminaBar->Reset();
    }

    void LoadBegin()
    {
        // Wyczysc przed wczytywaniem
        if (zStaminaBar)
            zStaminaBar->Reset();
    }

    void Game_LoadBegin_NewGame()      { LoadBegin(); }
    void Game_LoadBegin_SaveGame()     { LoadBegin(); }
    void Game_LoadBegin_ChangeLevel()  { LoadBegin(); }

    // ... inne puste funkcje zdarzen gry ...

    // --- Hook: UpdatePlayerStatus ---
    // Tutaj silnik aktualizuje paski HP/Many.
    // Wstawiamy aktualizacje naszego paska wytrzymalosci.

    auto Hook_oCGame_UpdatePlayerStatus = ::Union::CreateHook(
        reinterpret_cast<void*>(zSwitch(0x00638F90, 0x0065F4E0, 0x00666640, 0x006C3140)),
        &oCGame::UpdatePlayerStatus_Hook,
        ::Union::HookType::Hook_Detours
    );

    void oCGame::UpdatePlayerStatus_Hook()
    {
        // Wywolaj oryginal - aktualizuje HP, Mane itd.
        (this->*Hook_oCGame_UpdatePlayerStatus)();

        // Teraz zaktualizuj nasz wlasny pasek
        zStaminaBar->Init();
    }

    // ... inne hooki (oCGame_Init, Game_Loop itd.) ...
}
```

### Dlaczego hook na UpdatePlayerStatus?

Silnik wywoluje `oCGame::UpdatePlayerStatus` co klatke, gdy HUD jest aktywny. Tutaj paski HP i Many otrzymuja zaktualizowane wartosci i sa wstawiane na ekran. Podlaczajac sie do tej funkcji, twoj pasek wytrzymalosci:

- Aktualizuje sie w tym samym czasie co inne paski
- Stosuje te same zasady widocznosci (ukryty podczas przerywnikow, ekranow ladowania itp.)
- Otrzymuje prawidlowa kolejnosc renderowania w warstwie HUD

---

## Krok 6: Strona Daedalusa

Twoj pasek wytrzymalosci odczytuje wartosci ze zmiennych Daedalusa. Musisz je zdefiniowac w swoich skryptach:

```daedalus
// W twoich skryptach Daedalusa (np. _intern/Constants.d)
var int ATR_STAMINA;
var int ATR_STAMINA_MAX;
```

:::warning
Nazwy zmiennych musza dokladnie pasowac do tego, co przekazujesz do `parser->GetSymbol()` w C++. Wyszukiwanie parsera nie rozroznia wielkosci liter, ale uzywanie dokladnie tej samej pisowni zapobiega nieporozumieniom.
:::

Nastepnie zarzadzaj wartoscia wytrzymalosci ze swoich skryptow gry - zmniejszaj ja przy akcjach, regeneruj w czasie itp.

---

## Kompletny przyklad

Pelny, minimalny `Plugin.hpp` z wszystkimi elementami:

```cpp
#define PrintConsole(a) Union::String::Format(a).StdPrintLine();

namespace GOTHIC_NAMESPACE
{
    // ===============================
    // Klasa paska wytrzymalosci
    // ===============================

    class zCStaminaBar
    {
    public:
        oCViewStatusBar* staminaBar = nullptr;

        void Init()
        {
            if (!staminaBar)
            {
                staminaBar = new oCViewStatusBar();
                if (screen)
                {
                    screen->InsertItem(staminaBar, FALSE);
                    staminaBar->Init(0, 0, 1.0);
                    staminaBar->SetTextures("BAR_BACK.TGA", "BAR_TEMPMAX.TGA",
                                            "BAR_STAMINA.TGA", "");
                    UpdatePosAndSize();
                    screen->RemoveItem(staminaBar);
                }
            }

            if (screen && staminaBar)
            {
                screen->RemoveItem(staminaBar);
                screen->InsertItem(staminaBar, FALSE);
                UpdateValue();

                if (ShouldHideBar())
                    screen->RemoveItem(staminaBar);
            }
        }

        void UpdatePosAndSize()
        {
            if (!ogame || !ogame->hpBar || !ogame->manaBar || !staminaBar)
                return;

            int sizeX, sizeY, posX_HP, posY_HP, posX_Mana, posY_Mana;

            ogame->hpBar->GetSize(sizeX, sizeY);
            ogame->hpBar->GetPos(posX_HP, posY_HP);
            ogame->manaBar->GetPos(posX_Mana, posY_Mana);

            staminaBar->SetSize(sizeX, sizeY);

            if (posX_HP == posX_Mana)
            {
                int offset = std::abs(posY_HP - posY_Mana);
                if (posY_Mana < posY_HP)
                    staminaBar->SetPos(posX_HP, posY_Mana - offset);
                else
                    staminaBar->SetPos(posX_HP, posY_HP - offset);
            }
            else
            {
                staminaBar->SetPos((8192 / 2) - sizeX / 2, posY_HP);
            }
        }

        void UpdateValue()
        {
            auto sym = parser->GetSymbol("ATR_STAMINA");
            auto symMax = parser->GetSymbol("ATR_STAMINA_MAX");
            if (!sym || !symMax) return;

            int val = sym->single_intdata;
            int maxVal = symMax->single_intdata;

            if (val && maxVal)
            {
                staminaBar->SetValue(val);
                staminaBar->SetMaxRange(0, maxVal);
                staminaBar->SetRange(0, maxVal);
            }
        }

        void Reset()
        {
            if (staminaBar)
            {
                screen->RemoveItem(staminaBar);
                staminaBar = nullptr;
            }
        }

        void Loop()
        {
            if (!ogame->GetShowPlayerStatus() || !staminaBar)
                return;

            auto sym = parser->GetSymbol("ATR_STAMINA");
            auto symMax = parser->GetSymbol("ATR_STAMINA_MAX");
            if (!sym || !symMax) return;

            delete valueView;
            valueView = nullptr;

            int stamina = sym->single_intdata;
            int staminaMax = symMax->single_intdata;

            zSTRING text = zSTRING{stamina} + "/" + zSTRING{staminaMax};

            valueView = new zCView(0, 0, 8192, 8192);
            if (staminaBar->range_bar)
            {
                staminaBar->range_bar->InsertItem(valueView);
                int tw = valueView->FontSize(text);
                int th = valueView->FontY();
                int px = (8192 - tw) / 2;
                int py = (8192 - th - 50) / 2;
                zCOLOR color(255, 255, 255, staminaBar->alpha);
                valueView->CreateText(px, py, text, 0, color, 0, 1);
            }
        }

    private:
        zCView* valueView = nullptr;

        bool ShouldHideBar() const
        {
            if (!player) return true;
            if (ogame->IsOnPause()) return true;
            if (!oCInformationManager::GetInformationManager().HasFinished()) return true;
            if (player->inventory2.IsOpen()) return true;
            if (player->GetBodyState() == BS_DIVE) return true;
            return false;
        }
    };

    std::unique_ptr<zCStaminaBar> zStaminaBar;

    // ===============================
    // Funkcje zdarzen gry
    // ===============================

    void Game_EntryPoint() {}

    void Game_Init()
    {
        zStaminaBar = std::make_unique<zCStaminaBar>();
        PrintConsole("Stamina Bar loaded!");
    }

    void Game_Exit()
    {
        zStaminaBar.reset();
    }

    void Game_PreLoop() {}

    void Game_Loop()
    {
        if (zStaminaBar)
            zStaminaBar->Loop();
    }

    void Game_PostLoop() {}
    void Game_MenuLoop() {}

    void Game_SaveBegin()
    {
        if (zStaminaBar)
            zStaminaBar->Reset();
    }

    void Game_SaveEnd() {}

    void LoadBegin()
    {
        if (zStaminaBar)
            zStaminaBar->Reset();
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
    void Game_DefineExternals() {}
    void Game_ApplySettings() {}

    // ===============================
    // Hooki
    // ===============================

    // UpdatePlayerStatus - aktualizuje nasz pasek razem z HP/Mana
    auto Hook_oCGame_UpdatePlayerStatus = ::Union::CreateHook(
        reinterpret_cast<void*>(zSwitch(0x00638F90, 0x0065F4E0, 0x00666640, 0x006C3140)),
        &oCGame::UpdatePlayerStatus_Hook,
        ::Union::HookType::Hook_Detours
    );

    void oCGame::UpdatePlayerStatus_Hook()
    {
        (this->*Hook_oCGame_UpdatePlayerStatus)();
        zStaminaBar->Init();
    }

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

## Wskazowki i typowe pulapki

### Wymagania tekstur
- Twoja tekstura paska (np. `BAR_STAMINA.TGA`) musi byc poprawnym plikiem TGA w VDF gry lub w pliku `.mod`
- Uzywaj tych samych wymiarow co oryginalne tekstury paskow (zwykle 256x64 lub podobne) dla spojnego wygladu
- `BAR_BACK.TGA` i `BAR_TEMPMAX.TGA` sa uzywane z oryginalnej gry - nie musisz tworzyc nowych

### Zarzadzanie pamiecia
- Obiekty `oCViewStatusBar` tworzone operatorem `new` sa zarzadzane przez ciebie. Zawsze wykonuj `Reset()` przy zapisie/wczytywaniu
- Obiekty `zCView` uzywane do nakladek tekstowych musza byc usuwane co klatke przed utworzeniem nowych, inaczej bedziesz miec wycieki pamieci

### Pozycjonowanie
- Wirtualna przestrzen wspolrzednych to 8192x8192. Aby przeliczyc procent na wirtualne wspolrzedne: `pos = (procent / 100) * 8192`
- `screen->FontY()` zwraca aktualna wysokosc czcionki we wspolrzednych wirtualnych - przydatne do przesuwania tekstu
- `screen->FontSize(text)` zwraca szerokosc ciagu tekstu we wspolrzednych wirtualnych

### Kompatybilnosc
- Uzywaj `zSwitch(G1, G1A, G2, G2A)` dla wszystkich adresow hookow, aby wspierac rozne wersje silnika. Uzyj `0` dla wersji, ktorych nie wspierasz
- Zawsze sprawdzaj `nullptr` przed dostepem do `ogame`, `player`, `screen` lub jakiegokolwiek wskaznika na pasek
- Inne pluginy moga zmieniac pozycje paskow - odczytuj pozycje dynamicznie co klatke zamiast cache'owac je przy inicjalizacji

### Debugowanie
- Jesli pasek sie nie pojawia, sprawdz czy `ogame->GetShowPlayerStatus()` zwraca `true` (zwraca `false` w przerywnikach i menu)
- Jesli pasek pojawia sie ale nie ma wypelnienia, zweryfikuj czy twoje zmienne Daedalusa (`ATR_STAMINA`, `ATR_STAMINA_MAX`) istnieja i maja niezerowe wartosci
- Uzywaj `PrintConsole` do logowania wartosci zmiennych podczas tworzenia pluginu

---

## Podsumowanie

W tym poradniku nauczyles sie:

- Tworzyc instancje `oCViewStatusBar` i dodawac ja do HUD gry
- Pozycjonowac ja dynamicznie wzgledem istniejacych paskow HP i Many
- Odczytywac zmienne skryptowe Daedalusa za pomoca `parser->GetSymbol()` do aktualizacji wartosci paska
- Kontrolowac widocznosc paska na podstawie stanu gry (pauza, dialog, nurkowanie)
- Nakladac tekst na pasek za pomoca podrzednych obiektow `zCView`
- Prawidlowo czyscic przy zapisie/wczytywaniu aby zapobiec crashom
- Podlaczac sie do `oCGame::UpdatePlayerStatus` aby synchronizowac z cyklem aktualizacji paskow silnika

Te wzorce mozna zaadaptowac do tworzenia dowolnego wlasnego paska statusu - doswiadczenia, tarczy, wscieklosci, lub dowolnej innej mechaniki gry, ktora chcesz zwizualizowac.
