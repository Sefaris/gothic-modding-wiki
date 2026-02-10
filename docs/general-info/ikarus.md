---
sidebar_position: 2
title: "Ikarus"
description: "Opis biblioteki Ikarus rozszerzającej możliwości języka Daedalus."
---

# Ikarus

**Ikarus** to biblioteka skryptowa dla Daedalusa stworzona przez **Sektenspinnera** (z udziałem Gottfrieda, mud-freaka i Neconspictora). Pozwala przełamać ograniczenia standardowego Daedalusa, udostępniając:

- **Bezpośredni dostęp do pamięci** silnika Gothic (odczyt/zapis)
- **Dostęp do klas silnikowych** — `oCGame`, `oCNpc`, `zCWorld`, `zCParser` i wiele innych
- **Wywoływanie funkcji C++ silnika** z poziomu Daedalusa
- **Arytmetykę zmiennoprzecinkową** (IEEE 754) — standardowy Daedalus obsługuje tylko `int`
- **Pętle** (`while`/`end`, `repeat`/`end`) — nieobecne w standardowym Daedalusie
- **Odczyt/zapis plików INI** (Gothic.ini, [Mod].ini)
- **Detekcję klawiszy** (klawiatura i mysz)
- **Funkcje operacji na stringach** (`STR_Len`, `STR_IndexOf`, `STR_Split` i inne)
- **Ładowanie zewnętrznych bibliotek DLL**

:::info
Ikarus jest wymagany przez bibliotekę **LeGo** oraz większość zaawansowanych modów Gothic. Bez Ikarusa modder jest ograniczony wyłącznie do standardowych możliwości Daedalusa.
:::

---

## Instalacja

### Wymagane pliki

Pakiet Ikarus składa się z:

1. **Stałe** — `Ikarus_Const_G2.d` (lub `Ikarus_Const_G1.d` dla Gothic I)
2. **Klasy silnikowe** — `EngineClasses_G2/*.d` (lub `EngineClasses_G1/*.d`)
3. **Rdzeń Ikarusa** — `Ikarus.d` (identyczny dla G1 i G2)
4. **Obsługa floatów** (opcjonalnie) — `float.d`

### Integracja z Gothic.src

Pliki Ikarusa muszą być dodane do `Gothic.src` **po** `CLASSES.D` i **przed** skryptami, które z nich korzystają:

```
_INTERN\CONSTANTS.D
_INTERN\CLASSES.D

Ikarus\Ikarus_Const_G2.d
Ikarus\EngineClasses_G2\*.d
Ikarus\Ikarus.d
Ikarus\float.d

AI\AI_INTERN\AI_CONSTANTS.D
...
```

---

## Inicjalizacja

### MEM_InitAll()

Główna funkcja inicjalizacji Ikarusa. Musi być wywołana zanim użyje się jakichkolwiek funkcji biblioteki.

```daedalus
func void INIT_GLOBAL()
{
    Game_InitGerman();
    MEM_InitAll();
    // ... reszta kodu
};
```

`MEM_InitAll()` wykonuje następujące operacje:

- Lokalizuje struktury parsera Daedalusa w pamięci
- Inicjalizuje system etykiet i skoków
- Ustawia globalne instancje silnikowe (`MEM_Game`, `MEM_World` itd.)
- Włącza operatory `_@()`, `_@s()`, `_@f()`
- Inicjalizuje podsystem assemblerowy
- Włącza pętle `repeat`/`end`

:::tip
Wielokrotne wywołanie `MEM_InitAll()` jest bezpieczne — Ikarus sprawdza, czy już został zainicjalizowany.
:::

---

## Odczyt i zapis pamięci

Podstawowe funkcje Ikarusa umożliwiają bezpośredni dostęp do pamięci silnika:

```daedalus
// Odczyt
var int wartosc;
wartosc = MEM_ReadInt(adres);           // odczytaj 4 bajty jako int
var string tekst;
tekst = MEM_ReadString(adres);          // odczytaj string

// Zapis
MEM_WriteInt(adres, 42);               // zapisz int pod adresem
MEM_WriteString(adres, "test");         // zapisz string

// Bajty
var int bajt;
bajt = MEM_ReadByte(adres);            // odczytaj 1 bajt
MEM_WriteByte(adres, 255);             // zapisz 1 bajt
```

### Tablice w pamięci

```daedalus
// Odczyt/zapis tablic w pamięci (offset w elementach, nie w bajtach)
var int elem;
elem = MEM_ReadIntArray(tablicaAdres, 3);          // 4. element
MEM_WriteIntArray(tablicaAdres, 3, nowaWartosc);   // zapisz 4. element
```

---

## Instancje i wskaźniki

### Konwersja wskaźnik → instancja

Jedną z najpotężniejszych możliwości Ikarusa jest konwersja surowych wskaźników pamięci na instancje Daedalusa:

```daedalus
// _^() — konwertuj wskaźnik na instancję (alias MEM_PtrToInst)
var oCNpc npcWPamieci;
npcWPamieci = _^(adresNpc);

// Teraz możesz odczytywać pola klasy silnikowej:
var int hp;
hp = npcWPamieci.attribute[ATR_HITPOINTS];
```

### Konwersja instancja → wskaźnik

```daedalus
var int adres;
adres = MEM_InstToPtr(self);    // adres NPC w pamięci
```

### Operatory adresów

```daedalus
var int adrInt;
adrInt = _@(mojaZmienna);      // adres zmiennej int

var int adrStr;
adrStr = _@s(mojString);       // adres zmiennej string

var int adrFloat;
adrFloat = _@f(mojFloat);      // adres zmiennej float
```

### Przykład — odczyt nazwy obiektu w focusie

```daedalus
func void PokazFocus()
{
    var oCNpc gracz;
    gracz = Hlp_GetNpc(PC_HERO);

    if (!gracz.focus_vob) { return; };

    var zCVob mojFocus;
    mojFocus = _^(gracz.focus_vob);
    Print(mojFocus._zCObject_objectName);
};
```

---

## Globalne instancje silnikowe

Po wywołaniu `MEM_InitAll()` dostępne są instancje reprezentujące kluczowe obiekty silnika:

| Instancja           | Klasa                     | Opis                        |
| ------------------- | ------------------------- | --------------------------- |
| `MEM_Game`          | `oCGame`                  | Bieżąca sesja gry           |
| `MEM_World`         | `oWorld`                  | Bieżący świat               |
| `MEM_Timer`         | `zCTimer`                 | Timer silnika (czas klatki) |
| `MEM_WorldTimer`    | `oCWorldTimer`            | Czas w grze (dzień/godzina) |
| `MEM_Vobtree`       | `zCTree`                  | Korzeń drzewa vobów         |
| `MEM_InfoMan`       | `oCInfoManager`           | Menedżer dialogów           |
| `MEM_Waynet`        | `zCWaynet`                | Sieć waypointów             |
| `MEM_Camera`        | `zCCamera`                | Kamera                      |
| `MEM_SkyController` | `zCSkyController_Outdoor` | Kontroler nieba/pogody      |
| `MEM_Parser`        | `zCParser`                | Parser Daedalusa (VM)       |
| `MEM_SpawnManager`  | `oCSpawnManager`          | Menedżer spawnowania NPC    |

```daedalus
// Przykład — odczyt aktualnej godziny w grze
var int godzina;
godzina = MEM_WorldTimer.worldTime_hour;
```

---

## Wyszukiwanie symboli parsera

Ikarus pozwala dynamicznie wyszukiwać symbole (funkcje, instancje, zmienne) po nazwie:

```daedalus
// Znajdź indeks symbolu (-1 jeśli nie istnieje)
var int idx;
idx = MEM_FindParserSymbol("PC_HERO");

// Znajdź wskaźnik do struktury zCPar_Symbol (0 jeśli nie istnieje)
var int symPtr;
symPtr = MEM_GetParserSymbol("DIA_Fred_Hallo");
```

---

## Dynamiczne wywoływanie funkcji

### Wywołanie funkcji Daedalusa

```daedalus
// Po nazwie
MEM_CallByString("MOJA_FUNKCJA");

// Po ID symbolu
var int id;
id = MEM_GetFuncID(MojaFunkcja);
MEM_CallByID(id);

// Z parametrami
MEM_PushIntParam(42);
MEM_PushStringParam("test");
MEM_CallByString("MOJA_FUNKCJA");

// Pobranie wyniku
var int wynik;
wynik = MEM_PopIntResult();
```

### Podmiana funkcji

```daedalus
// Zamień implementację funkcji — wszystkie wywołania f1 teraz wykonują f2
MEM_ReplaceFunc(StaraFunkcja, NowaFunkcja);
```

### Wywoływanie funkcji C++ silnika

```daedalus
// Przykład — wywołanie oCNpc::SetAsPlayer z poziomu Daedalusa
func void SetAsPlayer(var C_NPC slf)
{
    const int oCNpc__SetAsPlayer = 7612064; // adres w pamięci (0x7426A0)

    CALL__thiscall(MEM_InstToPtr(slf), oCNpc__SetAsPlayer);
};
```

Konwencje wywołań C++:

| Funkcja                         | Konwencja                      |
| ------------------------------- | ------------------------------ |
| `CALL__thiscall(this, adr)`     | Metoda klasy C++ (najczęstsza) |
| `CALL__stdcall(adr)`            | Standardowa konwencja Windows  |
| `CALL__cdecl(adr)`              | Konwencja C                    |
| `CALL__fastcall(ecx, edx, adr)` | Konwencja szybka               |

Przed wywołaniem można przekazać parametry:

```daedalus
CALL_IntParam(42);
CALL_PtrParam(adresObiektu);
CALL_zStringPtrParam("tekst");
CALL__thiscall(thisPtr, adresFunkcji);
var int wynik;
wynik = CALL_RetValAsInt();
```

---

## Odczyt/zapis plików INI

```daedalus
// Odczyt z Gothic.ini
var string rozdzielczosc;
rozdzielczosc = MEM_GetGothOpt("VIDEO", "zVidResFullscreenX");

// Odczyt z [Mod].ini
var string opcja;
opcja = MEM_GetModOpt("MOJASEKCJA", "MojaOpcja");

// Sprawdzenie czy sekcja/opcja istnieje
if (MEM_GothOptExists("VIDEO", "zVidResFullscreenX"))
{
    // opcja istnieje
};

// Zapis do Gothic.ini (zapisywany na dysk przy wyjściu z gry)
MEM_SetGothOpt("VIDEO", "zVidResFullscreenX", "1920");
```

---

## Detekcja klawiszy

```daedalus
// Sprawdzenie czy klawisz jest wciśnięty
if (MEM_KeyPressed(KEY_SPACE))
{
    Print("Spacja wciśnięta!");
};

// Dokładniejszy stan klawisza
var int stan;
stan = MEM_KeyState(KEY_F1);

if (stan == KEY_PRESSED)   { /* właśnie wciśnięty */ };
if (stan == KEY_HOLD)      { /* trzymany */          };
if (stan == KEY_RELEASED)  { /* właśnie puszczony */  };

// Odczyt przypisania klawisza z Gothic.ini
var int klawiszInwentarza;
klawiszInwentarza = MEM_GetKey("keyInventory");
```

Stany klawiszy:

| Stała          | Znaczenie                        |
| -------------- | -------------------------------- |
| `KEY_UP`       | Nie wciśnięty, nie był wciśnięty |
| `KEY_PRESSED`  | Właśnie wciśnięty (nowa klatka)  |
| `KEY_HOLD`     | Trzymany (kolejne klatki)        |
| `KEY_RELEASED` | Właśnie puszczony                |

---

## Pętle

Standardowy Daedalus nie posiada pętli. Ikarus dodaje je przez hackowanie parsera.

### while / end

```daedalus
var int i;
i = 0;
while(i < 10);
    Print(IntToString(i));
    i += 1;
end;
```

### repeat / end

Pętla iterująca zmienną od 0 do n-1:

```daedalus
repeat(i, 10); var int i;
    Print(IntToString(i));   // wypisze 0, 1, 2, ..., 9
end;
```

### Sterowanie pętlą

```daedalus
const int break    = -42;   // przerwij pętlę
const int continue = -23;   // przejdź do następnej iteracji

while(i < 100);
    i += 1;
    if (i == 5)  { continue; };  // pomiń resztę, następna iteracja
    if (i == 50) { break; };     // zakończ pętlę
end;
```

### Etykiety i skoki (niskopoziomowe)

```daedalus
MEM_InitLabels();

var int etykieta;
etykieta = MEM_StackPos.position;     // zapamiętaj pozycję
// ... kod ...
MEM_StackPos.position = etykieta;     // skocz z powrotem (nieskonczona pętla!)
```

---

## Operacje na stringach

Ikarus rozszerza ubogie możliwości stringów w Daedalusie:

```daedalus
var int dlugosc;
dlugosc = STR_Len("Hello");                        // 5

var string fragment;
fragment = STR_SubStr("Hello World", 6, 5);         // "World"
fragment = STR_Prefix("Hello World", 5);             // "Hello"

var int pozycja;
pozycja = STR_IndexOf("Hello World", "World");       // 6
pozycja = STR_IndexOf("Hello World", "xyz");         // -1

// Podział stringa
var int czesci;
czesci = STR_SplitCount("a;b;c", ";");               // 3
var string elem;
elem = STR_Split("a;b;c", ";", 1);                   // "b"

// Konwersja string → int
var int liczba;
liczba = STR_ToInt("42");                             // 42

// Wielkie/małe litery
var string duze;
duze = STR_Upper("hello");                            // "HELLO"
var string male;
male = STR_Lower("HELLO");                            // "hello"

// Pojedyncze znaki
var int ascii;
ascii = STR_GetCharAt("ABC", 0);                      // 65 (ASCII 'A')
var string znak;
znak = STR_FromChar(65);                               // "A"
```

---

## Arytmetyka zmiennoprzecinkowa (float.d)

Standardowy Daedalus nie obsługuje operacji na `float`. Ikarus emuluje je, przechowując wartości IEEE 754 jako `int`:

### Stałe

```daedalus
const int FLOATNULL = 0;            // 0.0
const int FLOATEINS = 1065353216;    // 1.0
const int FLOATHALB = 1056964608;    // 0.5
const int PI        = 1078530011;    // 3.14159...
```

### Konwersja

```daedalus
var int f;
f = mkf(42);                 // int → float (42 → 42.0)

var int n;
n = truncf(f);               // float → int (obcięcie)
n = roundf(f);               // float → int (zaokrąglenie)
```

### Operacje arytmetyczne

```daedalus
var int a; a = mkf(10);      // 10.0
var int b; b = mkf(3);       // 3.0

var int suma;    suma    = addf(a, b);   // 13.0
var int roznica; roznica = subf(a, b);   // 7.0
var int iloczyn; iloczyn = mulf(a, b);   // 30.0
var int iloraz;  iloraz  = divf(a, b);   // 3.333...
var int ujemne;  ujemne  = negf(a);      // -10.0
var int bezwzgl; bezwzgl = absf(ujemne); // 10.0

// Ułamek
var int polowa;
polowa = fracf(1, 2);                    // 0.5

// Potęga i pierwiastek
var int kwadrat;    kwadrat    = sqrf(a);       // 100.0
var int pierwiastek; pierwiastek = sqrtf(a);    // 3.162...
```

### Porównania

```daedalus
if (lf(a, b))  { /* a < b  */ };
if (lef(a, b)) { /* a <= b */ };
if (gf(a, b))  { /* a > b  */ };
if (gef(a, b)) { /* a >= b */ };
```

### Wyświetlanie

```daedalus
var string tekst;
tekst = toStringf(iloraz);   // "3.333..."
Print(tekst);
```

---

## Zarządzanie pamięcią

```daedalus
// Alokacja pamięci
var int bufor;
bufor = MEM_Alloc(256);          // alokuj 256 bajtów

// Użycie bufora...
MEM_WriteInt(bufor, 42);

// Zwolnienie pamięci
MEM_Free(bufor);

// Kopiowanie pamięci
MEM_CopyBytes(zrodlo, cel, iloscBajtow);

// Porównywanie pamięci
var int rowne;
rowne = MEM_CompareBytes(ptr1, ptr2, iloscBajtow);  // 0 = różne, 1 = identyczne
```

---

## Wyszukiwanie vobów

```daedalus
// Znajdź vob po nazwie
var int vobPtr;
vobPtr = MEM_SearchVobByName("ITMW_1H_SWORD_01");

if (vobPtr)
{
    var zCVob mojVob;
    mojVob = _^(vobPtr);
    Print(mojVob._zCObject_objectName);
};

// Wstaw nowy vob
var int nowyVob;
nowyVob = MEM_InsertVob("ItMw_1h_Sword_01.3ds", "FP_ITEM_01");

// Usuń vob
MEM_DeleteVob(vobPtr);

// Sprawdzanie typu
if (Hlp_Is_oCNpc(ptr))       { /* to NPC */       };
if (Hlp_Is_oCItem(ptr))      { /* to przedmiot */ };
if (Hlp_Is_oCMobContainer(ptr)) { /* to skrzynia */ };
```

---

## Logowanie i debugowanie

```daedalus
// Wyślij wiadomość do zSpy
MEM_Info("Informacja: wszystko OK");
MEM_Warn("Ostrzeżenie: coś jest nie tak");
MEM_Error("Błąd: krytyczny problem!");

// Stack trace Daedalusa
MEM_PrintStackTrace();

// Pomiar wydajności
var int czas;
czas = MEM_BenchmarkMS(MojaFunkcja);   // czas w milisekundach
```

---

## Ładowanie bibliotek DLL

```daedalus
// Załaduj bibliotekę DLL
var int hDll;
hDll = LoadLibrary("MojaDll.dll");

// Pobierz adres funkcji
var int adresFunkcji;
adresFunkcji = GetProcAddress(hDll, "MojaFunkcja");
```

---

## Assembler (ASM)

Ikarus umożliwia generowanie i wykonywanie kodu maszynowego x86 bezpośrednio z Daedalusa:

```daedalus
ASM_Open(64);                  // rozpocznij bufor 64 bajty
ASM_1(133);                    // push EBP
ASM_1(137); ASM_1(229);       // mov EBP, ESP
// ... instrukcje maszynowe ...
ASM_1(195);                    // ret
var int kod;
kod = ASM_Close();             // zakończ, zwróć wskaźnik
ASM_Run(kod);                  // wykonaj kod
```

:::danger
Używanie ASM wymaga zaawansowanej wiedzy o architekturze x86 i pamięci silnika Gothic. Błędy mogą spowodować natychmiastowy crash gry.
:::

---

## Kompatybilność: Gothic I vs Gothic II

Ikarus został pierwotnie stworzony dla **Gothic II**, ale działa również z **Gothic I** (wersja 1.08k_mod).

| Aspekt             | Gothic I            | Gothic II           |
| ------------------ | ------------------- | ------------------- |
| Plik stałych       | `Ikarus_Const_G1.d` | `Ikarus_Const_G2.d` |
| Klasy silnikowe    | `EngineClasses_G1/` | `EngineClasses_G2/` |
| Rdzeń (`Ikarus.d`) | Ten sam plik        | Ten sam plik        |
| `float.d`          | Ten sam plik        | Ten sam plik        |
| Adresy w pamięci   | Inne adresy         | Inne adresy         |

Ikarus automatycznie rozpoznaje wersję gry i dobiera odpowiednie adresy dzięki funkcji `MEMINT_SwitchG1G2()`.

:::warning
Niektóre klasy silnikowe dla Gothic I mają status „niezweryfikowane" (np. `zCMenuItem`, `oCAIHuman`). Korzystaj z nich ostrożnie.
:::

---

## LeGo — rozszerzenie Ikarusa

**LeGo** to pakiet skryptów zbudowany **na bazie Ikarusa**, stworzony przez **Lehonę** i społeczność Gothic. Wymaga Ikarusa ≥ 1.2.0.

### Inicjalizacja

```daedalus
func void INIT_GLOBAL()
{
    // LeGo_Init wywołuje MEM_InitAll() automatycznie
    LeGo_Init(LeGo_All);
    // lub selektywnie:
    // LeGo_Init(LeGo_FrameFunctions | LeGo_Bars | LeGo_HookEngine);
};
```

### Główne moduły LeGo

| Moduł               | Opis                                                   |
| ------------------- | ------------------------------------------------------ |
| **HookEngine**      | Hookowanie funkcji silnika C++ z poziomu Daedalusa     |
| **FrameFunctions**  | Wywoływanie funkcji co klatkę                          |
| **Bars**            | Własne paski statusu (HP, mana, niestandardowe)        |
| **Cursor**          | Obsługa kursora myszy                                  |
| **Buttons**         | Klikalne przyciski UI                                  |
| **Trialoge**        | Dialogi wieloosobowe (więcej niż 2 osoby)              |
| **Dialoggestures**  | Animacje podczas dialogów                              |
| **Saves**           | Zapis/odczyt własnych danych (przetrwanie save/load)   |
| **PermMem**         | Trwała pamięć (przetrwanie save/load)                  |
| **Anim8**           | Animacja/tweening wartości                             |
| **View**            | Niestandardowe elementy widoku                         |
| **Sprite**          | Renderowanie sprite'ów 2D                              |
| **Draw3D**          | Rysowanie prymitywów 3D                                |
| **Random**          | Lepszy generator liczb losowych                        |
| **Bloodsplats**     | Efekty rozbryzgu krwi                                  |
| **ConsoleCommands** | Własne komendy konsoli                                 |
| **Buffs**           | System buffów/debuffów                                 |
| **EventHandler**    | System zdarzeń                                         |
| **Timer**           | Narzędzia do timerów                                   |
| **Gamestate**       | Śledzenie stanu gry (nowa gra / load / zmiana poziomu) |

:::tip
Więcej o LeGo dowiesz się z [oficjalnej dokumentacji LeGo](https://lego.worldofgothic.de/) lub z kodu źródłowego na GitHubie.
:::
