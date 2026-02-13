---
title: zParserExtender
description: Wtyczka do union rozszerzająca możliwości parsera Daedalusa.
sidebar_position: 9
---

# zParserExtender

**zParserExtender** to wtyczka dla **Union** stworzona przez **Gratta**, która znacząco rozszerza funkcjonalność języka skryptowego Daedalus. Dodaje ona nowe funkcje składni, obsługę zdarzeń oraz bezpośredni dostęp do klas silnika, co pozwala na tworzenie bardziej złożonych i dynamicznych modyfikacji bez polegania wyłącznie na zewnętrznych narzędziach czy skomplikowanych hackach pamięci. Wymaga Uniona w wersji 1.0l lub nowszej.

:::info
Od wersji Union 1.0m, **zParserExtender** jest w pełni zintegrowany, więc zazwyczaj nie musisz instalować go oddzielnie, jeśli używasz nowoczesnej wersji Union.
:::

## Ogólne funkcje rozszerzania i osadzania

### 1. Zewnętrzne funkcje i zmienne

zParserExtender umożliwia definiowanie zewnętrznych funkcji i zmiennych, które mogą być współdzielone między skryptami lub używane do bardziej bezpośredniej interakcji z silnikiem.

### 2. Pętla WHILE

Standardowy język Daedalus obsługuje tylko instrukcje warunkowe `if` / `else`. zParserExtender dodaje obsługę pętli `while`, co znacznie ułatwia iterację.

```daedalus
var int value;
value = 10;

while(value > 0) {
    if (value == 8) {
        continue;
    };
    if (value == 2) {
        break;
    };
    value -= 1;
};
```

### 3. Przestrzenie nazw (Namespaces)

Przestrzenie nazw pozwalają organizować kod i unikać kolizji nazw. Możesz definiować zmienne, funkcje, a nawet nowe klasy czy prototypy w określonym zakresie. Nie ogranicza się to tylko do odwoływania się do istniejących symboli; możesz tworzyć całkowicie nową logikę zamkniętą w przestrzeni nazw.

#### Definicja

```daedalus
namespace zTestNamespace {
    var int var01;
    func void func01() { };
    
    // Tutaj możesz też definiować nowe instancje lub prototypy
    prototype MyProto(C_Npc) { ... };
};
```

#### Pominięcie specyfikacji przestrzeni nazw

Nie musisz podawać prefiksu przestrzeni nazw w następujących przypadkach:
1.  **Ta sama przestrzeń nazw**: Gdy odwołujesz się do symbolu zdefiniowanego w tej samej przestrzeni nazw.
2.  **Przestrzeń nadrzędna**: Gdy odwołujesz się do symbolu zdefiniowanego w przestrzeni nadrzędnej (z zagnieżdżonej przestrzeni).
3.  **Using**: Gdy przestrzeń nazw jest zawarta na liście `Using` w bloku `META` (patrz niżej).

#### Użycie w bloku META

Możesz zdefiniować domyślną przestrzeń nazw dla pliku skryptu za pomocą bloku `META`.

```daedalus
META {
    Namespace = zTestNamespace;
};

var int var01; // Należy do zTestNamespace
func void func01() { }; // Należy do zTestNamespace
```

#### Zagnieżdżone przestrzenie nazw

```daedalus
META {
    Namespace = zTestNamespace01;
};

namespace zTestNamespace02 {
    namespace Definitions {
        var int var01;
    };
    func void func01() { };
};
```

#### Dostęp do składowych

Możesz uzyskać dostęp do składowych innych przestrzeni nazw za pomocą separatora dwukropka `:`.

```daedalus
func event GameInit() {
    // Dostęp z globalnej przestrzeni nazw
    zTestNamespace01:func01();
    zTestNamespace02:func01();
    zTestNamespace03:zTestNamespace04:func01();
};
```

#### Względny dostęp

Możesz używać standardowej rozdzielczości zakresu podobnej do C++:
-   `func01()`: Bieżąca przestrzeń nazw.
-   `:func01()`: Przestrzeń nadrzędna (1 poziom wyżej).
-   `::func01()`: 2 poziomy wyżej.
-   `:::func01()`: 3 poziomy wyżej.

### 4. Funkcje zdarzeń (Events)

zParserExtender wprowadza nowe słowo kluczowe `event`. Funkcje zdarzeń to specjalne funkcje, które mogą być wywoływane przez silnik lub inne skrypty za pomocą `Hlp_DoEvent`.

```daedalus
func void GiveXP() {
    Hlp_DoEvent("OnGiveXP");
};

func event OnGiveXP() {
    // Ten kod zostanie wykonany po wywołaniu zdarzenia "OnGiveXP"
};
```

#### GameInit

`GameInit` to specjalne zdarzenie, które jest automatycznie wywoływane podczas inicjalizacji gry. Jest przydatne do inicjalizowania zmiennych globalnych lub ustawiania hooków.

```daedalus
func event GameInit() {
    // Kod inicjalizacyjny
};
```

#### GameLoop

`GameLoop` to specjalne zdarzenie wywoływane raz na **każdą klatkę**, gdy świat jest załadowany. Jest przydatne do ciągłego sprawdzania warunków lub aktualizacji.

```daedalus
func event GameLoop() {
    // Kod wykonywany co klatkę
};
```

### 5. Funkcje wyzwalaczy (Triggers)

Wyzwalacze pozwalają na wykonywanie kodu okresowo lub po opóźnieniu. Użyj przestrzeni nazw `zParserExtender`, aby uzyskać dostęp do tych funkcji.

#### Tworzenie wyzwalacza

-   `AI_StartTriggerScript(funcName, delay)`: Tworzy **globalny** wyzwalacz. Nie jest on przypisany do żadnego świata ani NPC i działa pomiędzy zmianami poziomów.
-   `AI_StartTriggerScriptEx(funcName, delay, self, other, victim)`: Tworzy **lokalny** wyzwalacz, jeśli podano przynajmniej jednego NPC (`self`, `other` lub `victim`). Lokalne wyzwalacze są ważne tylko w bieżącym świecie. Jeśli potrzebujesz lokalnego wyzwalacza bez konkretnego NPC, możesz przekazać `hero` jako `self`.

#### Klasa C_Trigger

System wyzwalaczy używa klasy `C_Trigger`:

-   `Delay`: Interwał wykonania w milisekundach.
-   `Enabled`: Ustaw na `0`, aby zniszczyć wyzwalacz.
-   `AIVariables[16]`: Przechowywanie niestandardowych danych dla wyzwalacza.

#### Globalne zmienne wyzwalaczy

-   `FirstTrigger`: Pierwszy wyzwalacz na liście.
-   `SelfTrigger`: Bieżąca instancja wyzwalacza (dostępna wewnątrz funkcji zwrotnej).

#### Przykład: Efekt trucizny

```daedalus
// Utwórz wyzwalacz, który wywołuje 'c_loop' co 1000ms (1 sekunda)
var C_Trigger trigger;
trigger = AI_StartTriggerScriptEx("c_loop", 1000, hero, null, null);
trigger.AIVariables[0] = 15; // Całkowita liczba iteracji
trigger.AIVariables[1] = 5;  // Obrażenia na tik

func int c_loop() {
    // Sprawdź, czy iteracje się skończyły
    if (SelfTrigger.AIVariables[0] <= 0) {
        return Loop_end;
    };

    // Modyfikuj właściwości wyzwalacza
    SelfTrigger.Delay -= 20; // Przyspiesz
    SelfTrigger.AIVariables[0] -= 1; // Zmniejsz licznik

    // Zadaj obrażenia
    self.Attribute[ATR_HITPOINTS] -= SelfTrigger.AIVariables[1];

    return Loop_continue;
};
```

Aby zatrzymać pętlę, zwróć `Loop_end`. Aby kontynuować, zwróć `Loop_continue`.

### 6. Klasy proxy silnika

zParserExtender udostępnia wiele wewnętrznych klas silnika dla Daedalusa, co pozwala na bezpośrednią manipulację obiektami. Klasy te zazwyczaj odzwierciedlają ich odpowiedniki w C++ (`zCVob`, `zCVobLight`, itp.).

Popularne klasy dostępne w przestrzeni nazw `zParserExtender` (lub globalnie, jeśli dostęp jest bezpośredni):

-   `C_VOB`: Klasa bazowa dla obiektów gry.
-   `C_VOB_DATA`: Struktura danych dla właściwości `zCVob`.
-   `C_LIGHT_DATA`: Właściwości dla dynamicznych świateł (`zCVobLight`).
-   `C_MOB_DATA`: Właściwości dla obiektów interaktywnych (`oCMOB`).
-   `C_MOBINTER_DATA`: Właściwości dla `oCMobInter`.
-   `C_MOBLOCKABLE_DATA`: Właściwości dla obiektów zamykanych (`oCMobLockable`).
-   `C_COLOR`: Struktura koloru RGBA.
-   `C_POSITION`: Współrzędne XYZ.

```daedalus
class C_VOB {
    // Wskaźnik bazowy na obiekt świata gry
};

class C_COLOR {
    var int R; // Wartość kanału czerwonego
    var int G; // Wartość kanału zielonego
    var int B; // Wartość kanału niebieskiego
    var int A; // Wartość kanału alfa
};

class C_POSITION {
    var int X; // Współrzędna na osi X
    var int Y; // Współrzędna na osi Y
    var int Z; // Współrzędna na osi Z
};

// Poniższe klasy definiują właściwości obiektu C_VOB lub klas po nim dziedziczących
class C_VOB_DATA {
    var string Name;              // Nazwa obiektu
    var float VisualAlpha;        // Przezroczystość obiektu (od 0 do 1)
    var int ShowVisual;           // Wyświetla model
    var int DrawBBox3D;           // Wyświetla granice obiektu
    var int VisualAlphaEnabled;   // Włącza przezroczystość obiektu
    var int PhysicsEnabled;       // Aktywuje fizykę obiektu
    var int IgnoredByTraceRay;    // Wyłącza wszelkie kolizje z obiektem
    var int CollDetectionStatic;  // Włącza kolizje ze statycznymi wielokątami świata
    var int CollDetectionDynamic; // Włącza kolizje z dynamicznymi obiektami świata
    var int CastDynShadow;        // Wyświetla cień obiektu
    var int LightColorStatDirty;  // Włącza statyczne oświetlenie obiektu
    var int LightColorDynDirty;   // Włącza dynamiczne oświetlenie obiektu
    var int SleepingMode;         // Definiuje tryb aktywności obiektu (0 - nieaktywny, 1 - aktywny, 2 - dozwolone tylko wykonywanie AI)
    var int DontWriteIntoArchive; // Zapobiega zapisywaniu tego obiektu do pliku .sav
};

class C_LIGHT_DATA {
    var int R;                // Intensywność czerwonego światła
    var int G;                // Intensywność zielonego światła
    var int B;                // Intensywność niebieskiego światła
    var int Range;            // Promień
    var int RangeInv;
    var int RangeBackup;
    var int RangeAniActFrame; // Bieżąca klatka animacji światła dla promienia
    var int RangeAniFPS;      // Prędkość animacji światła dla promienia
    var int ColorAniActFrame; // Bieżąca klatka animacji światła dla koloru
    var int ColorAniFPS;      // Prędkość animacji światła dla koloru
    var int SpotConeAngleDeg; // Kąt stożka źródła światła
    var int IsStatic;         // Czy źródło jest statyczne
    var int RangeAniSmooth;   // [NIEUŻYWANE]
    var int RangeAniLoop;     // [NIEUŻYWANE]
    var int ColorAniSmooth;   // Włącza miękkie przejścia między kolorami
    var int ColorAniLoop;     // [NIEUŻYWANE]
    var int IsTurnedOn;       // Czy źródło światła jest włączone
    var int LightQuality;     // Jakość źródła (podczas statycznej kompilacji światła) (0 - wysoka, 1 - średnia, 2 - niska)
    var int LightType;        // Typ źródła (podczas statycznej kompilacji światła) (0 - punktowe, 1 - stożkowe)
};

class C_MOB_DATA {
    var string VisibleName;   // Nazwa wyświetlana nad obiektem
    var int Hitpoints;        // Ilość 'zdrowia'
    var int Damage;           // Obrażenia jakie obiekt może zadać
    var int IsDestroyed;      // Czy obiekt jest zniszczony
    var int Moveable;         // Czy obiekt może być przesuwany
    var int Takeable;         // Czy obiekt może być zabrany
    var int FocusOverride;    // Czy obiekt nadpisze funkcję celowania w trybie walki
    var int SndMat;           // Materiał obiektu (0 - drewno, 1 - kamień, 2 - metal, 3 - skóra, 4 - glina, 5 - szkło)
    var string VisualDestroyed; // Model po zniszczeniu obiektu
    var string OwnerStr;      // Nazwa instancji właściciela obiektu
    var string OwnerGuildStr; // Nazwa gildii obiektu
    var int Owner;            // Instancja właściciela
    var int OwnerGuild;       // Instancja gildii
    var int FocusNameIndex;   // Skryptowy ciąg wyświetlanej nazwy
};

class C_MOBINTER_DATA {
    var string TriggerTarget; // Nazwa obiektu wyzwalanego przez OnTrigger
    var string UseWithItem;   // Nazwa instancji obiektu wymagana do interakcji
    var string Sceme;         // Nazwa schematu odpowiadająca animacjom obiektu i postaci
    var string ConditionFunc; // Warunek skryptowy, pod którym interakcja może zostać wykonana
    var string OnStateFuncName; // Szablon nazw funkcji wywoływanych przy zmianie stanu obiektu
    var int State;            // Bieżący stan obiektu
    var int State_num;        // Liczba stanów obiektu
    var int State_target;     // Docelowy stan obiektu
    var int Rewind;           // Zapobiega aktualizacji obiektu
    var int MobStateAni;      // Bieżąca animacja obiektu
    var int NpcStateAni;      // Bieżąca animacja postaci
};

class C_MOBLOCKABLE_DATA {
    var int Locked;           // Czy obiekt jest zamknięty
    var int AutoOpen;         // [NIEUŻYWANE]
    var int PickLockNr;       // Bieżący numer obrotu wytrychem
    var string KeyInstance;   // Nazwa instancji klucza dla tego obiektu
    var string PickLockStr;   // Kombinacja do otwarcia obiektu ("LRRLR")
};
```

## Iniekcje

zParserExtender pozwala na wstrzykiwanie kodu do istniejących skryptów, nadpisywanie funkcji i modyfikowanie instancji bez zmiany oryginalnych plików.

### 1. Skrypt API (API Script)

Podstawową metodą wstrzykiwania kodu jest użycie **Skryptów API**. Są to pliki skryptów Daedalus (`.d`) umieszczone w katalogu `System\Autorun` (lub jego podkatalogach).

-   Skrypty te są automatycznie wykrywane i kompilowane przez zParserExtender.
-   Współdzielą globalną przestrzeń nazw ze skryptami gry (chyba że zdefiniowano konkretną `namespace`).
-   Pozwalają dodawać nową logikę, definiować nowe klasy i wchodzić w interakcję z silnikiem gry bez modyfikowania oryginalnych plików `Gothic.dat` lub `Menu.dat`.

### 2. Haki (Hooks)

Haki pozwalają przechwytywać i modyfikować zachowanie istniejących funkcji lub instancji.

#### Haki funkcji

Możesz zdefiniować funkcję o tej samej nazwie co istniejąca funkcja. zParserExtender wywoła twoją funkcję zamiast oryginału. Możesz następnie wywołać oryginalną funkcję używając przyrostka `_Old`.

```daedalus
func void ZS_Attack_Loop() {
    // Jeśli wróg jest graczem i nie ma wyciągniętej broni, przerwij atak
    if (Npc_IsPlayer(other) && !Npc_HasReadiedWeapon(other)) {
        return LOOP_END;
    };

    // W przeciwnym razie wywołaj oryginalną funkcję
    return ZS_Attack_Loop_Old();
};
```

#### Haki instancji

Możesz również nadpisywać instancje. Jest to przydatne do modyfikowania atrybutów NPC lub właściwości innych obiektów.

```daedalus
instance pc_hero(Npc_Default) {
    pc_hero_old(); // Zainicjuj oryginalnymi danymi
    name = "Ivan"; // Nadpisz imię
};
```

### 3. Nowe dialogi

zParserExtender obsługuje wstrzykiwanie nowych instancji dialogów (`C_INFO`). Możesz je zdefiniować w swoich skryptach, a zostaną one skompilowane do jednostek wyjściowych gry (OU - Output Units). Tworzy kopię pliku OU, jeśli w META włączono opcję `CompileOU`.

### 4. Właściwości META

Blok `META` na początku pliku skryptu definiuje, jak zParserExtender go przetwarza.

```daedalus
META {
    Parser = Menu;
    After = TestScript.d, HelpFunctions.d;
    Engine = G2, G2A;
    Mod = GothicGame.mod, LHiver.mod;
    MergeMode = 1;
};
```

**Dostępne właściwości:**

-   **Parser**: Określa parser (plik DAT), dla którego przeznaczony jest skrypt (np. `Game`, `Menu`, `SFX`, `PFX`, `VFX`, `Camera`, `Music`).
-   **MergeMode**: Definiuje tryb nadpisywania.
    -   `0`: Błąd przy nadpisywaniu.
    -   `1`: Wykonaj hak przy nadpisywaniu (domyślne).
-   **Engine**: Lista oddzielonych przecinkami obsługiwanych silników (np. `G1`, `G2`, `G2A`).
-   **NativeWhile**: Włącza kompilację pętli `while` (`0` = Wył., `1` = Wł.). Domyślnie `0` dla zachowania kompatybilności.
-   **Namespace**: Domyślna przestrzeń nazw dla pliku.
-   **Using**: Lista oddzielonych przecinkami przestrzeni nazw do otwarcia dla bezpośredniego dostępu.
-   **Mod**: Lista oddzielonych przecinkami plików VDF/MOD wymaganych do skompilowania tego skryptu.
-   **After**: Lista oddzielonych przecinkami skryptów, które powinny zostać wykonane przed tym skryptem.
-   **CompileDat**: Jeśli true, tworzy zmodyfikowaną kopię pliku DAT (`Gothic.Edited.dat`). Domyślnie `False`.
-   **CompileOU**: Jeśli true, tworzy zmodyfikowaną kopię pliku OU (`OU.Edited.bin`). Domyślnie `False`.

### 5. Operatory wiązania

#### Test-Else (Kompilacja warunkowa)

Operator `test` pozwala na warunkową kompilację kodu w zależności od obecności stałych, wersji silnika lub innych wtyczek.

```daedalus
test Steam {
    // Kompilowane tylko jeśli symbol/warunek "Steam" jest obecny
    var int SteamActive;
    SteamActive = 1;
};

test G2A && Steam {
    // Kompilowane tylko dla Gothic 2 Noc Kruka ORAZ jeśli Steam jest obecny
} else {
    // Alternatywny kod
};
```

#### Extern

Słowo kluczowe `extern` pozwala deklarować instancje, które istnieją w innych skryptach lub są natywne dla silnika, ale nie zostały zadeklarowane w bieżącym parserze, zapobiegając błędom kompilacji.

```daedalus
extern instance PC_Hero(C_Npc);
```

## Inne funkcje

### 1. Parametry INI

Konfiguracja zParserExtender znajduje się w określonym pliku INI w sekcji `[ZPARSE_EXTENDER]`:
- `SystemPack.ini` (jeżeli uruchomiliśmy podstawową wersję gry tzn. plik wykonywalny Gothic2.exe)
- `NazwaModa.ini` (jeżeli uruchomiliśmy modyfikację)

#### Spis parametrów:

-   **LoadScript**: (Przestarzałe) Ścieżka do skryptu parsera.
-   **MergeMode**: Określa, czy haki są wykonywane podczas iniekcji. Domyślnie: `True` (1).
-   **CompileDat**: Jeśli włączone, tworzy kopię pliku DAT zmodyfikowaną przez iniekcje (`*.Edited.dat`). Domyślnie: `False` (0).
-   **CompileOU**: Jeśli włączone, tworzy kopię pliku OU zmodyfikowaną przez iniekcje (`*.Edited.bin`). Domyślnie: `False` (0).
-   **NativeWhile**: Włącza kompilację pętli `while`. Domyślnie: `False` (0).
-   **MessagesLevel**: Kontroluje poziom szczegółowości komunikatów konsoli przez Union. Domyślnie: `1`.
-   **StringIndexingMode**: Ustawia tryb indeksowania ciągów (patrz niżej). Domyślnie: `-1`.

### 2. Polecenia konsoli MARVIN

Możesz używać konsoli (F2) do zarządzania skompilowanymi plikami i debugowania.

-   `Parser SaveDat OU`: Kompiluje `OU.Edited.bin`.
-   `Parser SaveDat [NazwaParsera]`: Kompiluje określony plik DAT (np. `Parser SaveDat Game` -> `Gothic.Edited.dat`, `Parser SaveDat Menu` -> `Menu.Edited.dat`, `SFX`, `PFX`, `VFX`, `Camera`, `Music`).
-   `Parser Export Stringlist`: Eksportuje tablicę symboli ciągów do `Scripts\Exports\StringList.d`.

### 3. Dodatkowe parametry uruchomieniowe

Możesz wymusić ponowną kompilację za pomocą argumentów wiersza poleceń (np. w `GothicStarter_mod.exe`).

-   `-zReparse`: Ponownie kompiluje wszystkie pliki DAT i OU.
-   `-zReparse_OU`: Ponownie kompiluje `OU.bin`.
-   `-zReparse_Game`: Ponownie kompiluje `Gothic.dat`.
-   `-zReparse_[NazwaParsera]`: Ponownie kompiluje określony plik DAT (np. `-zReparse_Menu`, `-zReparse_SFX`, `-zReparse_VFX` itp.).

### 4. Kompilator OU/DAT

zParserExtender zawiera wbudowany kompilator plików DAT i OU o następujących cechach:

1.  **Bezpośrednia kompilacja**: Umożliwia bezpośrednią kompilację jednostek wyjściowych (`OU.bin`) i skryptów (`DAT`) bez potrzeby użycia zewnętrznych narzędzi, takich jak GothicSourcer czy Redefix.
2.  **Zmodyfikowane wyjście**: Gdy `CompileDat` lub `CompileOU` jest aktywne, generuje pliki `*.Edited.dat` lub `*.Edited.bin`, zachowując oryginalne pliki.
3.  **Wsparcie w czasie rzeczywistym**: Kompilator jest zintegrowany z silnikiem gry, co pozwala na kompilację i wstrzykiwanie skryptów "w locie" podczas procesu ładowania.

### 5. Indeksowanie ciągów

Określa, w jaki sposób symbole ciągów są indeksowane w tabeli symboli. Kontrolowane przez `StringIndexingMode`.

-   **Domyślny (-1)**: Obecnie używa trybu `Repair`.
-   **Disabled (0)**: Nic nie robi z indeksami.
-   **TopSymbol (1)**: Znajduje najwyższy nienazwany ciąg i ustawia licznik na jego podstawie.
-   **Repair (2)**: Naprawia indeksy ciągów, usuwając duplikaty i ustawiając licznik na podstawie najwyższego nienazwanego ciągu.

## Załączniki

### Funkcje zewnętrzne

Kompletna lista funkcji dodanych przez zParserExtender.

#### Funkcje pomocnicze
- `Hlp_HasFocusVob(npc)`: Sprawdza, czy NPC ma vob w ognisku.
- `Hlp_GetFocusVob(npc)`: Zwraca vob w ognisku.
- `Hlp_GetFocusVobName(npc)`: Zwraca nazwę voba w ognisku.
- `Hlp_GetStringLength(str)`: Zwraca długość ciągu.
- `IsNAN(value)`: Sprawdza, czy float jest NaN.
- `Hlp_KeyToggled(key)`: Sprawdza, czy klawisz został właśnie naciśnięty.
- `Hlp_KeyPressed(key)`: Sprawdza, czy klawisz jest wciśnięty.
- `Hlp_LogicalKeyToggled(key)`: Sprawdza, czy klawisz logiczny został przełączony.
- `Hlp_GameOnPause()`: Sprawdza, czy gra jest zapauzowana.
- `Hlp_MessageBox(message)`: Pokazuje okno wiadomości.
- `Hlp_PrintConsole(message)`: Drukuje do konsoli Union.
- `Hlp_GetSteamPersonalName()`: Zwraca nazwę użytkownika Steam.

#### Opcje INI
- `Hlp_ReadOptionInt/Float/String(...)`: Czyta z INI.
- `Hlp_WriteOptionInt/Float/String(...)`: Zapisuje do INI.
- `Hlp_OptionIsExists(...)`: Sprawdza, czy wpis INI istnieje.

#### Funkcje świata
- `Wld_ChangeLevel(world, waypoint)`: Zmienia poziom.
- `Wld_FindVob(vobname)`: Znajduje vob po nazwie.
- `Wld_PlayEffectVob(...)`: Odtwarza efekt na vobie.
- `Wld_PlayEffectAt(...)`: Odtwarza efekt na koordynatach.
- `Wld_ToggleRain(weight, time)`: Przełącza deszcz.
- `Wld_SetWeatherType(type)`: Ustawia pogodę (G2/G2A).
- `Wld_GetWeatherType()`: Pobiera pogodę (G2/G2A).

#### Funkcje modelu/animacji
- `Mdl_GetAnimationIndex(npc, ani_name)`: Pobiera indeks animacji.
- `Mdl_GetAnimationName(npc, ani_index)`: Pobiera nazwę animacji.
- `Mdl_AnimationIsExists(...)`: Sprawdza, czy animacja istnieje.
- `Mdl_AnimationIsActive(...)`: Sprawdza, czy animacja jest aktywna.
- `Mdl_SetAllAnimationsFPS(npc, fps)`: Ustawia FPS dla wszystkich animacji.
- `Mdl_ResetAllAnimationsFPS(npc)`: Resetuje FPS.
- `Mdl_SetAnimationFPS(npc, ani_index, fps)`: Ustawia FPS dla konkretnej animacji.
- `Mdl_ResetAnimationFPS(npc, ani_index)`: Resetuje FPS dla konkretnej animacji.
- `Mdl_SetVisible(npc, isVisible)`: Ustawia widoczność modelu.
- `Mdl_ApplyOverlayMds_AtFirst(mdsName)`: Nakłada overlay na górę stosu.
- `Mdl_SetNpcSpeedMultiplier(npc, mult)`: Ustawia mnożnik prędkości NPC.
- `Mdl_ResetNpcSpeedMultiplier(npc)`: Resetuje mnożnik prędkości NPC.

#### Funkcje NPC
- `Npc_SetAsHero(npc)`: Ustawia NPC jako bohatera.
- `Npc_OpenInventory(npc)`: Otwiera ekwipunek.
- `Npc_OpenInventorySteal(npc)`: Otwiera ekwipunek kradzieży.
- `Npc_OpenInventoryTrade(npc)`: Otwiera ekwipunek handlu.
- `Npc_GetLeft/RightHandItem(npc)`: Pobiera przedmiot w ręce.
- `Npc_GetSlotItem(npc, slot)`: Pobiera przedmiot w slocie.
- `Npc_PutInSlot(...)`: Wkłada przedmiot do slotu.
- `Npc_RemoveFromSlot(...)`: Usuwa przedmiot ze slotu.

#### Funkcje mobów
- `Mob_Destroy(object)`: Niszczy moba.
- `Mob_RemoveItem(s)(...)`: Usuwa przedmiot z moba.
- `Mob_InsertItem(s)(...)`: Wkłada przedmiot do moba.
- `Mob_Get/SetLockCombination(...)`: Kombinacja zamka.
- `Mob_IsLocked/SetLocked(...)`: Stan zamka.
- `Mob_Get/SetKeyInstance(...)`: Instancja klucza.

#### Funkcje wyzwalaczy/AI
- `AI_CallScript(func, self, other)`: Wywołuje skrypt przez kolejkę AI.
- `AI_StartTriggerScript(func, delay)`: Uruchamia wyzwalacz globalny.
- `AI_StartTriggerScriptEx(func, delay, self, other, victim)`: Uruchamia wyzwalacz lokalny.
- `AI_GetTrigger...`: Różne funkcje do pobierania info o wyzwalaczu i następnym wyzwalaczu w kolejce.

#### Funkcje parsera/symbolu
- `Par_GetParserID(name)`: Pobiera ID parsera.
- `Par_GetSymbolID(parId, name)`: Pobiera ID symbolu.
- `Par_GetSymbolLength(...)`: Pobiera długość symbolu.
- `Par_Get/SetSymbolValueInt/Float/String/Instance(...)`: Pobiera/Ustawia wartości symboli.

#### Funkcje rzutowania/wskaźników
- `Cast_PointerToInstance(ptr)`: Rzutuje wskaźnik na instancję.
- `Cast_InstanceToPointer(inst)`: Rzutuje instancję na wskaźnik.
- `Cast_PointerToNpc/Item(...)`: Rzutuje wskaźnik na konkretną klasę.
- `Cast_InstanceIsNpc/Item/Mob(...)`: Sprawdza typ instancji.
- `Cast_GetInstanceIndex(...)`: Pobiera indeks instancji.
- `Cast_GetClassID(...)`: Pobiera ID klasy.
- `Cast_GetVobClassID(object)`: Pobiera ID klasy zCObject.
- `Cast_CheckVobClassID(classId, object)`: Sprawdza, czy obiekt dziedziczy po ID klasy.

### Kody klawiszy

Używane są standardowe kody klawiszy DirectInput (wartości dziesiętne). Często używane klawisze:
- `KEY_Escape`: 1
- `KEY_1`..`KEY_0`: 2..11
- `KEY_Q`..`KEY_P`: 16..25
- `KEY_Return`: 28
- `KEY_LControl`: 29
- `KEY_S`: 31
- `KEY_LShift`: 42
- `KEY_Space`: 57
- `KEY_F1`..`KEY_F12`: 59..88 (w przybliżeniu)
(Pełną listę znajdziesz w tabelach scancode DirectInput).

### Tagi parserów

Tagi używane we właściwości `Parser` bloku `META`:
- `Game`: Gothic.dat
- `SFX`: Sfx.dat
- `PFX`: ParticleFx.dat
- `VFX`: VisualFx.dat
- `Camera`: Camera.dat
- `Menu`: Menu.dat
- `Music`: Music.dat
- `OU`: Jednostki wyjściowe (kompilowane osobno)

### Tagi silnika

Tagi używane we właściwości `Engine` bloku `META`:
- `G1`: Gothic 1 (Classic)
- `G1A` : Gothic 1 (Sequel)
- `G2`: Gothic 2 (Classic)
- `G2A`: Gothic 2 (Noc Kruka)

## Poprawki

ZParserExtender zapewnia również kilka poprawek do silnika względem oryginalnej gry:

1.  Podczas tworzenia instancji, do zmiennej globalnej `item` przypisywany jest bieżący przedmiot.
2.  Podczas wywoływania `on_equip` i `on_unequip`, do zmiennej globalnej `item` przypisywany jest bieżący przedmiot.
3.  Podczas ładowania pliku DAT, wtyczka przywraca hierarchię symboli.
4.  Podczas wczytywania zapisu, wtyczka pomija symbole nieistniejące w skryptach.


