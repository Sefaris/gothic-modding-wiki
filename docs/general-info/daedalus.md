---
sidebar_position: 1
title: "Daedalus"
description: "Opis języka skryptowego Daedalus używanego w grze Gothic."
---

# Daedalus

**Daedalus** to język skryptowy wbudowany w silnik **ZenGin** — silnik gier Gothic I i Gothic II. Za jego pomocą definiuje się praktycznie całą logikę gry: postacie, przedmioty, dialogi, zadania, efekty, dźwięki, AI i wiele więcej.

Pliki źródłowe Daedalusa mają rozszerzenie **`.d`**, a pliki kompilacyjne (listy plików do kompilacji) — **`.src`**. Po kompilacji powstaje plik binarny **`.dat`**, który jest odczytywany przez silnik gry.

:::info
Daedalus **nie jest** językiem ogólnego przeznaczenia. To język domenowy zaprojektowany specjalnie pod Gothic — ma wiele ograniczeń w porównaniu z nowoczesnymi językami, ale doskonale spełnia swoją rolę w kontekście moddingu.
:::

---

## Typy danych

Daedalus posiada bardzo ograniczony system typów:

| Typ      | Opis                                        | Przykład                     |
| -------- | ------------------------------------------- | ---------------------------- |
| `int`    | Liczba całkowita (32-bit)                   | `var int licznik;`           |
| `float`  | Liczba zmiennoprzecinkowa                   | `var float zasieg;`          |
| `string` | Łańcuch znaków                              | `var string imie;`           |
| `void`   | Brak wartości zwracanej (tylko w funkcjach) | `func void MojaFunkcja()`    |
| `func`   | Referencja do funkcji                       | `var func codzienna_rutyna;` |

**Nie istnieje typ `bool`** — zamiast niego używa się stałych `TRUE` (1) i `FALSE` (0), które są typu `int`.

---

## Zmienne

### Zmienne lokalne

Deklarowane wewnątrz funkcji za pomocą słowa kluczowego `var`:

```daedalus
func string PobierzNazwe(var int instancja)
{
    var string nazwa;
    var int wartosc;
    // ...
    return nazwa;
};
```

### Zmienne globalne

Deklarowane poza funkcjami — dostępne z dowolnego miejsca w skryptach:

```daedalus
var int Kapitel;
var int MojeZadanie_Status;
var string PrzepiszNazwa;
```

:::warning
Zmienne globalne **muszą być zadeklarowane przed ich użyciem** — kolejność plików w `Gothic.src` ma znaczenie!
:::

### Stałe (`const`)

Wartości niezmienne, definiowane słowem kluczowym `const`:

```daedalus
const int    ATR_HITPOINTS     = 0;
const int    ATR_STRENGTH      = 4;
const string FONT_Screen       = "FONT_OLD_20_WHITE.TGA";
const float  NPC_COLLISION_CORRECTION_SCALER = 0.75;
const int    TRUE              = 1;
const int    FALSE             = 0;
```

Stałe mogą odwoływać się do innych stałych i używać wyrażeń:

```daedalus
const int NPC_FLAG_IMMORTAL = 1 << 1;          // przesunięcie bitowe
const int NPC_FLAG_GHOST    = 1 << 2;
const int DAM_BLUNT         = DAM_BARRIER << 1; // odwołanie do innej stałej
```

---

## Tablice

Tablice w Daedalusie mają **stały rozmiar** określony w nawiasach kwadratowych:

```daedalus
var string  name[5];                    // 5 elementów
var int     attribute[ATR_INDEX_MAX];   // rozmiar ze stałej (= 8)
var int     aivar[100];                 // 100 zmiennych AI
```

Dostęp do elementów przez indeks:

```daedalus
attribute[ATR_STRENGTH]    = 50;
name[0]                    = "Konrad";
on_state[0]                = UseItPo_Health;
```

Dostęp do tablic przez notację z kropką (na instancjach):

```daedalus
self.attribute[ATR_STRENGTH]    = 50;
self.attribute[ATR_HITPOINTS]   = 160;
```

:::warning
Nie istnieją tablice dynamiczne. Rozmiar tablicy musi być znany w czasie kompilacji. Biblioteka Ikarus omija to ograniczenie przez bezpośredni dostęp do pamięci.
:::

---

## Operatory

### Arytmetyczne

| Operator | Opis                        | Przykład |
| -------- | --------------------------- | -------- |
| `+`      | Dodawanie                   | `a + b`  |
| `-`      | Odejmowanie                 | `a - b`  |
| `*`      | Mnożenie                    | `a * b`  |
| `/`      | Dzielenie (całkowite)       | `a / b`  |
| `%`      | Reszta z dzielenia (modulo) | `a % 5`  |

### Przypisanie i przypisanie złożone

| Operator | Opis               | Przykład  |
| -------- | ------------------ | --------- |
| `=`      | Przypisanie        | `x = 10;` |
| `+=`     | Dodaj i przypisz   | `x += 5;` |
| `-=`     | Odejmij i przypisz | `x -= 3;` |

### Porównania

| Operator | Opis               | Przykład   |
| -------- | ------------------ | ---------- |
| `==`     | Równe              | `x == 1`   |
| `!=`     | Różne              | `x != 0`   |
| `>`      | Większe            | `x > 10`   |
| `<`      | Mniejsze           | `x < 5`    |
| `>=`     | Większe lub równe  | `x >= 0`   |
| `<=`     | Mniejsze lub równe | `x <= 100` |

### Logiczne

| Operator | Opis         | Przykład                 |
| -------- | ------------ | ------------------------ |
| `&&`     | Logiczne AND | `(x > 0) && (y < 10)`    |
| `\|\|`   | Logiczne OR  | `(x == 1) \|\| (x == 2)` |
| `!`      | Negacja      | `!Npc_IsPlayer(self)`    |

### Bitowe

| Operator | Opis                | Przykład                  |
| -------- | ------------------- | ------------------------- |
| `&`      | AND bitowe          | `flags & ITEM_SWD`        |
| `\|`     | OR bitowe           | `SENSE_HEAR \| SENSE_SEE` |
| `<<`     | Przesunięcie w lewo | `1 << 3`                  |

Operatory bitowe są często używane do definiowania flag:

```daedalus
const int ITEM_KAT_NF    = 1 << 1;    // kategoria: broń biała
const int ITEM_KAT_FF    = 1 << 2;    // kategoria: broń dystansowa
const int ITEM_KAT_MUN   = 1 << 3;    // kategoria: amunicja
const int ITEM_KAT_MAGIC = 1 << 31;   // kategoria: magia

// Sprawdzanie flagi:
if (type & ITEM_SWD)
{
    // przedmiot jest mieczem
};
```

---

## Instrukcje warunkowe

### if / else if / else

```daedalus
if (type & ITEM_SWD || type & ITEM_AXE)
{
    nazwa = "Broń jednoreczna";
}
else if (type & ITEM_2HD_SWD || type & ITEM_2HD_AXE)
{
    nazwa = "Broń dwureczna";
}
else
{
    nazwa = "[???]";
};
```

:::danger
Każdy blok `if`, `else if` i `else` musi kończyć się **średnikiem po klamrze zamykającej** `};` — to specyfika Daedalusa!
:::

### Warunki wieloliniowe

Daedalus pozwala na pisanie warunków `&&` i `||` w **nowych liniach** — bez nawiasów:

```daedalus
if (GanelunTot == TRUE)
&& (RemoveGanelunVarant == FALSE)
{
    B_StartOtherRoutine(PAL_99001_Ganelun, "VERRAT");
    RemoveGanelunVarant = TRUE;
};
```

Jest to unikalna cecha składni Daedalusa, często spotykana w oryginalnych skryptach Gothic.

### Brak switch/case

W Daedalusie **nie istnieje instrukcja `switch/case`**. Zamiast niej stosuje się łańcuchy `if / else if`:

```daedalus
if (kapitel == 1)
{
    // logika dla rozdziału 1
}
else if (kapitel == 2)
{
    // logika dla rozdziału 2
}
else if (kapitel == 3)
{
    // logika dla rozdziału 3
};
```

---

## Pętle

Standardowy Daedalus **nie posiada pętli**. Nie ma `for`, `while`, ani `do/while`.

:::tip
Biblioteka **Ikarus** dodaje obsługę pętli `while` i `repeat` poprzez hackowanie parsera. Więcej informacji znajdziesz na stronie o [Ikarusie](./ikarus.md).

```daedalus
// Pętla while (Ikarus)
while(i < 10);
    i += 1;
end;

// Pętla repeat (LeGo)
repeat(i, 10);
    // kod wykonywany 10 razy
end;
```

:::

---

## Łańcuchy znaków (stringi)

### Konkatenacja

**Nie ma operatora `+` dla stringów.** Do łączenia tekstu służy funkcja zewnętrzna `ConcatStrings()`:

```daedalus
var string tekst;
tekst = ConcatStrings("Witaj, ", "świecie!");               // "Witaj, świecie!"
tekst = ConcatStrings(tekst, ConcatStrings(" Mam ", IntToString(10)));
tekst = ConcatStrings(tekst, " złota.");                     // "Witaj, świecie! Mam 10 złota."
```

### Porównywanie

Do porównywania stringów służy funkcja `Hlp_StrCmp()`:

```daedalus
if (Hlp_StrCmp(opcja, "tak"))
{
    // opcja to "tak"
};
```

### Konwersja typów

```daedalus
var string s;
s = IntToString(42);     // int → string: "42"
```

:::info
Funkcja `IntToString()` to jedyna wbudowana konwersja typów. Nie istnieje odwrotny `StringToInt()` w standardowym Daedalusie — dodaje go biblioteka Ikarus.
:::

---

## Funkcje

### Deklaracja funkcji

Funkcje deklaruje się słowem kluczowym `func`, podając typ zwracany, nazwę i parametry:

```daedalus
func void B_UstawWalke(var C_NPC slf, var int procent)
{
    B_RaiseFightTalent(slf, NPC_TALENT_1H, procent);
    B_RaiseFightTalent(slf, NPC_TALENT_2H, procent);
};
```

```daedalus
func string PobierzInfoOBroni(var int typ, var int zasieg)
{
    var string tekst;
    tekst = ConcatStrings("Zasieg: ", IntToString(zasieg));
    return tekst;
};
```

:::danger
Ciało funkcji **musi** kończyć się średnikiem po klamrze: `};`
:::

### Parametry

Parametry muszą mieć jawnie podany typ:

```daedalus
func void MojaFunkcja(var int a, var string b, var C_NPC npc)
{
    // ...
};
```

### Wartość zwracana (`return`)

```daedalus
func int CzyGraczWWalce()
{
    var int stan;
    stan = Npc_GetBodyState(hero);
    if (stan == 2)
    {
        return TRUE;
    };
    return FALSE;
};
```

### Funkcje zewnętrzne (externals)

To funkcje zaimplementowane w C++ w silniku Gothic, dostępne do wywołania z Daedalusa. **Nie mają ciała w skryptach** — są wywoływane jak zwykłe funkcje:

```daedalus
// Funkcje NPC
Npc_IsPlayer(self)                         // czy to gracz?
Npc_HasItems(self, ItPo_Health_01)         // czy NPC ma przedmiot?
Npc_KnowsInfo(other, DIA_Fred_Hallo)      // czy zna informację?
Npc_SetTalentSkill(slf, NPC_TALENT_1H, 60)

// Funkcje AI
AI_Output(self, other, "DIA_Fred_Hallo_15_01")    // wypowiedź NPC
AI_StopProcessInfos(self)                          // zakończ dialog
AI_StartState(self, ZS_Flee, 0, "")                // zmień stan AI

// Funkcje świata
Wld_InsertNpc(MOJ_NPC, "WP_SPAWN")        // wstaw NPC do świata
Wld_InsertItem(ItMw_1h_Sword, "FP_ITEM")  // wstaw przedmiot

// Funkcje przedmiotów
CreateInvItems(self, ItMi_Gold, 100)       // daj złoto
EquipItem(self, ItMw_1h_Bau_Axe)          // wyposaż w przedmiot

// Funkcje modelu
Mdl_SetVisual(slf, "HUMANS.MDS")
Mdl_SetModelFatness(self, 0.5)

// Funkcje logów/misji
Log_CreateTopic(TOPIC_MOJ_QUEST, LOG_MISSION)
Log_SetTopicStatus(TOPIC_MOJ_QUEST, LOG_RUNNING)

// Funkcje pomocnicze
Hlp_StrCmp(opcja, "tak")                  // porównaj stringi
Hlp_GetInstanceID(other)                   // pobierz ID instancji

// Funkcje druku
Print("Tekst na ekranie")
PrintScreen("Tekst", 50, 50, FONT_Screen, 2)
```

---

## Klasy (`class`)

Klasy definiują struktury danych odpowiadające klasom C++ w silniku. Zawierają **wyłącznie deklaracje zmiennych** — nie mają metod.

```daedalus
class C_NPC
{
    var int     id;
    var string  name[5];
    var string  slot;
    var int     npcType;
    var int     flags;
    var int     attribute[ATR_INDEX_MAX];
    var int     HitChance[MAX_HITCHANCE];
    var int     protection[PROT_INDEX_MAX];
    var int     damage[DAM_INDEX_MAX];
    var int     damagetype;
    var int     guild;
    var int     level;
    var func    mission[MAX_MISSIONS];
    var func    daily_routine;
    var int     senses;
    var int     senses_range;
    var int     aivar[100];
    var string  wp;
    var int     exp;
    var int     exp_next;
    var int     lp;
};
```

Klasy silnikowe (np. `C_NPC`, `C_Item`, `C_INFO`, `C_Spell`) są predefiniowane i mapują się 1:1 na struktury w pamięci silnika. Nie należy zmieniać ich kolejności pól ani ich dodawać.

### Główne klasy silnikowe

| Klasa          | Przeznaczenie                |
| -------------- | ---------------------------- |
| `C_NPC`        | Postacie (NPC i gracz)       |
| `C_Item`       | Przedmioty                   |
| `C_INFO`       | Wpisy dialogowe              |
| `C_Spell`      | Zaklęcia                     |
| `C_Mission`    | Misje                        |
| `C_Focus`      | Ustawienia kursora/celowania |
| `C_FightAI`    | Ruchy walki AI               |
| `C_SFX`        | Efekty dźwiękowe             |
| `C_ParticleFX` | Efekty cząsteczkowe          |
| `C_Menu`       | Elementy menu                |
| `C_Menu_Item`  | Pola menu                    |

---

## Prototypy (`prototype`)

Prototyp to **szablon** oparty na klasie, z wstępnie wypełnionymi domyślnymi wartościami. Instancje mogą dziedziczyć z prototypu, zamiast ustawiać wszystko od zera.

```daedalus
prototype Npc_Default(C_NPC)
{
    attribute[ATR_STRENGTH]       = 10;
    attribute[ATR_DEXTERITY]      = 10;
    attribute[ATR_MANA_MAX]       = 10;
    attribute[ATR_MANA]           = 10;
    attribute[ATR_HITPOINTS_MAX]  = 40;
    attribute[ATR_HITPOINTS]      = 40;

    HitChance[NPC_TALENT_1H]     = 0;
    HitChance[NPC_TALENT_2H]     = 0;

    protection[PROT_EDGE]        = 0;
    protection[PROT_BLUNT]       = 0;

    damagetype                    = DAM_BLUNT;
    senses                        = SENSE_HEAR | SENSE_SEE;
    senses_range                  = PERC_DIST_ACTIVE_MAX;
};
```

```daedalus
prototype C_Spell_Proto(C_Spell)
{
    time_per_mana        = 500;
    damage_per_level     = 1;
    damageType           = DAM_MAGIC;
    spellType            = SPELL_BAD;
    canTurnDuringInvest  = 1;
};
```

Prototypy upraszczają tworzenie wielu podobnych instancji — wystarczy nadpisać wartości, które różnią się od domyślnych.

---

## Instancje (`instance`)

Instancja tworzy **konkretny obiekt** na podstawie prototypu lub bezpośrednio z klasy. W przeciwieństwie do klas i prototypów, instancje mogą zawierać **kod wykonywalny** (wywołania funkcji).

### Instancja NPC (z prototypu)

```daedalus
instance BAU_4410_Klara(Npc_Default)
{
    name      = "Klara";
    guild     = GIL_BAU;
    id        = 4410;
    voice     = 57;
    flags     = 0;
    npctype   = NPCTYPE_MAIN;

    // Wywołania funkcji — kod wykonywalny!
    B_SetAttributesToChapter(self, 4);
    B_GiveNpcTalents(self);
    fight_tactic = FAI_HUMAN_COWARD;
    EquipItem(self, ItMw_1h_Bau_Axe);
    B_SetNpcVisual(self, FEMALE, "Hum_Head_Babe5", FaceBabe_N_OldBlonde, BodyTex_N, ITAR_BauBabe_L);
    Mdl_SetModelFatness(self, 0.5);
    B_SetFightSkills(self, 35);
    daily_routine = Rtn_MELCHIORSHAUS_4410;
};
```

### Instancja przedmiotu (z klasy)

```daedalus
instance ItPo_Health_01(C_Item)
{
    name       = "Esencja leczenia";
    mainflag   = ITEM_KAT_POTIONS;
    flags      = ITEM_MULTI;
    value      = 50;
    visual     = "ItPo_Health_01.3ds";
    material   = MAT_GLAS;
    on_state[0] = UseItPo_Health_01;
    scemeName  = "POTIONFAST";
    description = name;
    TEXT[5]    = NAME_Value;
    COUNT[5]   = value;
};
```

### Instancja dialogu

```daedalus
instance DIA_Fred_EXIT(C_INFO)
{
    npc         = BAU_4401_Fred;
    nr          = 999;
    condition   = DIA_Fred_EXIT_Condition;
    information = DIA_Fred_EXIT_Info;
    permanent   = TRUE;
    description = DIALOG_ENDE;
};
```

### Globalne instancje silnikowe

Silnik Gothic definiuje kilka specjalnych instancji globalnych, które są zawsze dostępne:

```daedalus
instance self, other(C_NPC);     // aktualny NPC i rozmówca
instance victim(C_NPC);          // ofiara (w percepcjach)
instance item(C_Item);           // aktualny przedmiot
instance hero(C_NPC);            // gracz — zawsze dostępny
```

| Instancja | Opis                                                                      |
| --------- | ------------------------------------------------------------------------- |
| `self`    | NPC, dla którego aktualnie wykonywany jest skrypt                         |
| `other`   | Drugi uczestnik interakcji (np. w dialogu: `self` = NPC, `other` = gracz) |
| `hero`    | Zawsze wskazuje na postać gracza                                          |
| `victim`  | Ofiara w callbackach percepcji                                            |
| `item`    | Ustawiany przez pewne funkcje zewnętrzne (np. `Npc_GetInvItem`)           |

---

## Komentarze

```daedalus
// To jest komentarz jednoliniowy

/*
   To jest komentarz
   wieloliniowy
*/

const int ATR_HITPOINTS = 0;    // komentarz na końcu linii
```

---

## Kompilacja — Gothic.src

Pliki Daedalusa nie są kompilowane pojedynczo. Plik **`Gothic.src`** (w katalogu `Content/`) zawiera **uporządkowaną listę** wszystkich plików `.d` do kompilacji:

```
_INTERN\CONSTANTS.D
_INTERN\CLASSES.D
AI\AI_INTERN\AI_CONSTANTS.D
AI\AI_INTERN\BODYSTATES.D
STORY\NPC\BAU_4401_Fred.D
STORY\DIALOGE\DIA_BAU_4401_Fred.D
STORY\Startup.d
```

### Zasady kompilacji

1. **Kolejność ma znaczenie** — symbol musi być zadeklarowany **przed** jego użyciem. Stałe i klasy muszą być na początku listy.
2. **Wzorce `*.d`** — można użyć wildcarda: `STORY\NPC\*.D` dołączy wszystkie pliki `.d` z folderu.
3. **Pliki `.src` jako inkludy** — `Gothic.src` może odwoływać się do innych plików `.src` (np. `Ikarus\Ikarus.d`).
4. **Wynik kompilacji** — plik `Gothic.dat` w katalogu `System/`, odczytywany przez silnik.

---

## Cechy szczególne składni

### Wielkość liter — bez znaczenia

Daedalus jest **case-insensitive**. Poniższe zapisy są równoważne:

```daedalus
const int MOJ_WARTOSC = 10;
CONST INT MOJ_WARTOSC = 10;
Const Int Moj_Wartosc = 10;

var string imie;
VAR STRING imie;

func void MojaFunkcja() {};
FUNC VOID MojaFunkcja() {};
```

W praktyce w oryginalnych skryptach mieszane są zapisy `CONST INT`, `const int`, `VAR INT`, `var int`, `FUNC VOID`, `func void`.

### Średniki — wszędzie!

Jedną z najbardziej charakterystycznych cech Daedalusa jest **obowiązkowy średnik po każdym bloku kodu**, włącznie z klamrami zamykającymi:

```daedalus
if (x == 1)
{
    // kod
};              // ← średnik po klamrze!

func void Foo()
{
    // kod
};              // ← średnik po funkcji!

class C_NPC
{
    var int id;
};              // ← średnik po klasie!

prototype Npc_Default(C_NPC)
{
    // ...
};              // ← średnik po prototypie!
```

:::danger
Brak średnika po `};` to jeden z najczęstszych błędów początkujących. Kompilator zgłosi błąd lub — co gorsze — skompiluje kod nieprawidłowo.
:::

### Brak zaawansowanych konstrukcji

Daedalus **nie posiada** wielu konstrukcji znanych z nowoczesnych języków:

| Czego brakuje                    | Alternatywa                                 |
| -------------------------------- | ------------------------------------------- |
| Pętle (`for`, `while`)           | Biblioteka Ikarus dodaje `while` i `repeat` |
| `switch / case`                  | Łańcuchy `if / else if`                     |
| Dynamiczne tablice               | Ikarus — dostęp do pamięci                  |
| Wskaźniki                        | Ikarus — `_^()` (kastowanie adresów)        |
| Struktury (`struct`)             | Tylko `class`                               |
| Metody w klasach                 | Wolnostojące funkcje                        |
| Przeciążanie funkcji             | Unikalne nazwy funkcji                      |
| Przestrzenie nazw                | Konwencje nazewnicze (prefiksy)             |
| Łączenie stringów operatorem `+` | `ConcatStrings()`                           |

---

## System dialogowy — AI_Output

System dialogowy w Gothic oparty jest na funkcji `AI_Output` i klasie `C_INFO`. Ma unikalny mechanizm parsowania, który różni się od wszystkiego w standardowych językach programowania.

### C_INFO — definicja wpisu dialogowego

Każda opcja dialogowa to instancja klasy `C_INFO`:

```daedalus
instance DIA_Konrad_Hallo(C_INFO)
{
    npc         = BAU_900_Konrad;            // do którego NPC należy dialog
    nr          = 4;                          // kolejność sortowania (niższy = wyżej)
    condition   = DIA_Konrad_Hallo_Condition; // funkcja warunku (TRUE = pokaż opcję)
    information = DIA_Konrad_Hallo_Info;      // funkcja wykonywana po wybraniu opcji
    permanent   = FALSE;                      // czy powtarzalny
    important   = FALSE;                      // czy NPC sam podchodzi i zaczyna rozmowę
    description = "Cześć, jak się masz?";     // tekst widoczny w liście opcji
};
```

| Pole          | Opis                                                                          |
| ------------- | ----------------------------------------------------------------------------- |
| `npc`         | Instancja NPC, do którego należy dialog                                       |
| `nr`          | Kolejność sortowania — mniejszy numer = wyżej na liście. EXIT ma zwykle `999` |
| `condition`   | Funkcja zwracająca `TRUE` jeśli opcja ma być widoczna                         |
| `information` | Funkcja wywoływana po wybraniu opcji (tu piszemy AI_Output)                   |
| `permanent`   | `TRUE` = opcja dostępna zawsze, `FALSE` = znika po użyciu                     |
| `important`   | `TRUE` = NPC sam podchodzi do gracza i rozpoczyna rozmowę                     |
| `description` | Tekst wyświetlany w menu dialogowym                                           |
| `trade`       | `TRUE` = otwiera okno handlu                                                  |

### AI_Output — wypowiedź NPC

```daedalus
func void AI_Output(var C_NPC speaker, var C_NPC listener, var string outputName);
```

To najważniejsza funkcja systemu dialogowego. Powoduje, że NPC wypowiada kwestię z podkładem audio i napisami.

#### Kto mówi — kolejność parametrów

- **`AI_Output(self, other, "...")`** → mówi **NPC** (self = NPC, other = gracz)
- **`AI_Output(other, self, "...")`** → mówi **gracz** (other = bohater, self = NPC słucha)

```daedalus
func void DIA_Konrad_Hallo_Info()
{
    AI_Output(self, other, "DIA_Konrad_Hallo_08_01"); //Hej, dobrze cię widzieć!
    AI_Output(other, self, "DIA_Konrad_Hallo_15_01"); //Co u ciebie słychać?
    AI_Output(self, other, "DIA_Konrad_Hallo_08_02"); //Wszystko po staremu.
};
```

#### Parsowanie komentarza jako tekstu napisów

To **unikalna cecha parsera Daedalusa** — komentarz `//` w tej samej linii co `AI_Output` **nie jest ignorowany**. Parser traktuje go jako **tekst napisów dialogowych** wyświetlany na ekranie.

```daedalus
AI_Output(self, other, "DIA_Konrad_Hallo_08_01"); //Hej, dobrze cię widzieć!
//                                                    ^^^^^^^^^^^^^^^^^^^^^^^^^^^
//                                                    Ten komentarz to napisy!
```

:::danger
Komentarz z tekstem napisów **musi** być w **tej samej linii** co wywołanie `AI_Output`. Jeśli przeniesiesz go do następnej linii — napisy będą puste.

```daedalus
// ❌ ŹLE — napisy będą puste!
AI_Output(self, other, "DIA_Konrad_Hallo_08_01");
//Hej, dobrze cię widzieć!

// ✅ DOBRZE — napisy działają
AI_Output(self, other, "DIA_Konrad_Hallo_08_01"); //Hej, dobrze cię widzieć!
```

:::

#### Identyfikator outputu — konwencja nazewnictwa

Format: **`DIA_<NPC>_<Temat>_<NrGłosu>_<NrLinii>`**

Przykład: `DIA_Konrad_Hallo_08_01`

| Fragment | Znaczenie                                              |
| -------- | ------------------------------------------------------ |
| `DIA`    | Prefiks — dialog                                       |
| `Konrad` | Nazwa NPC                                              |
| `Hallo`  | Nazwa tematu/dialogu                                   |
| `08`     | **Numer głosu** NPC (pole `voice` w instancji `C_NPC`) |
| `01`     | **Numer linii** w dialogu (sekwencyjny)                |

Dla gracza numer głosu to zawsze **`15`**:

```daedalus
AI_Output(self, other, "DIA_Konrad_Hallo_08_01"); //Konrad mówi (voice = 8)
AI_Output(other, self, "DIA_Konrad_Hallo_15_01"); //Gracz mówi (voice = 15)
```

#### Mapowanie na plik audio WAV

Identyfikator outputu jest bezpośrednio nazwą pliku audio:

```
Gothic II/Data/Sound/Speech/DIA_Konrad_Hallo_08_01.WAV
Gothic II/Data/Sound/Speech/DIA_Konrad_Hallo_15_01.WAV
```

Jeśli plik WAV nie istnieje, wyświetlane są tylko napisy (bez dźwięku). Przy tworzeniu moda audio nie jest wymagane.

### Wybory w dialogu (Info_AddChoice)

Do tworzenia rozgałęzionych dialogów służą `Info_AddChoice` i `Info_ClearChoices`:

```daedalus
func void DIA_Konrad_Oferta_Info()
{
    AI_Output(self, other, "DIA_Konrad_Oferta_08_01"); //Mogę ci pomóc. Czego potrzebujesz?

    Info_ClearChoices(DIA_Konrad_Oferta);   // wyczyść poprzednie opcje
    Info_AddChoice(DIA_Konrad_Oferta, "Potrzebuję broni.", DIA_Konrad_Oferta_Bron);
    Info_AddChoice(DIA_Konrad_Oferta, "Potrzebuję mikstury.", DIA_Konrad_Oferta_Mikstura);
    Info_AddChoice(DIA_Konrad_Oferta, "Niczego nie potrzebuję.", DIA_Konrad_Oferta_Nic);
};

func void DIA_Konrad_Oferta_Bron()
{
    AI_Output(other, self, "DIA_Konrad_Oferta_Bron_15_01"); //Daj mi jakiś miecz.
    AI_Output(self, other, "DIA_Konrad_Oferta_Bron_08_01"); //Proszę bardzo.
    Info_ClearChoices(DIA_Konrad_Oferta);   // zamknij menu wyboru
};
```

### Kończenie dialogu

Standardowy wzorzec EXIT:

```daedalus
instance DIA_Konrad_EXIT(C_INFO)
{
    npc         = BAU_900_Konrad;
    nr          = 999;                        // zawsze ostatni na liście
    condition   = DIA_Konrad_EXIT_Condition;
    information = DIA_Konrad_EXIT_Info;
    permanent   = TRUE;                       // zawsze dostępny
    description = DIALOG_ENDE;                // stała = "KONIEC"
};

func int DIA_Konrad_EXIT_Condition() { return TRUE; };

func void DIA_Konrad_EXIT_Info()
{
    AI_StopProcessInfos(self);   // zakończ rozmowę
};
```

### Sprawdzanie czy dialog był już widziany

```daedalus
// W warunku innego dialogu:
func int DIA_Konrad_Dalej_Condition()
{
    if (Npc_KnowsInfo(other, DIA_Konrad_Hallo))  // gracz widział dialog Hallo?
    {
        return TRUE;
    };
    return FALSE;
};
```

### AI_OutputSVM — standardowe kwestie głosowe

Oprócz `AI_Output` istnieje `AI_OutputSVM` do odtwarzania **standardowych kwestii głosowych** (SVM — Standard Voice Messages). Są to gotowe wypowiedzi typu okrzyki bojowe, pozdrowienia, ostrzeżenia:

```daedalus
// NPC mówi standardową kwestię głosową
B_Say(self, other, "$NOTNOW");              // "Zostaw mnie w spokoju!"
B_Say(self, other, "$Alarm");               // "ALARM!"
B_Say(self, other, "$HandsOff");            // "Ręce przy sobie!"
```

Każdy NPC ma pole `voice` w `C_NPC`, które wskazuje na zestaw SVM (`SVM_0`, `SVM_1`, ..., `SVM_100`). Klasa `C_SVM` definiuje setki standardowych kwestii, a każdy zestaw głosowy ma własne pliki audio.

`AI_OutputSVM_Overlay` działa jak `AI_OutputSVM`, ale jest **nieblokujący** — nie czeka na zakończenie odtwarzania. Używany do okrzyków w walce.

---

## Konwencje nazewnicze

W oryginalnych skryptach Gothic stosowane są prefiksy wskazujące na typ i przeznaczenie symbolu:

| Prefiks     | Znaczenie                    | Przykład                             |
| ----------- | ---------------------------- | ------------------------------------ |
| `C_`        | Klasa                        | `C_NPC`, `C_Item`, `C_INFO`          |
| `B_`        | Funkcja bazowa (reużywalna)  | `B_SetFightSkills`, `B_GivePlayerXP` |
| `ZS_`       | Stan AI (Zustand)            | `ZS_Attack`, `ZS_Flee`, `ZS_Talk`    |
| `TA_`       | Rutyna dzienna (Tagesablauf) | `TA_Sleep`, `TA_Cook_Cauldron`       |
| `DIA_`      | Dialog                       | `DIA_Fred_Hallo`                     |
| `IT` / `It` | Przedmiot (Item)             | `ItMw_1h_Sword`, `ItPo_Health_01`    |
| `FA_`       | Instancja walki AI           | `FA_ENEMY_PREHIT_6`                  |
| `FAI_`      | Stała walki AI               | `FAI_HUMAN_COWARD`                   |
| `GIL_`      | Gildia                       | `GIL_PAL`, `GIL_MIL`, `GIL_BAU`      |
| `ATR_`      | Atrybut                      | `ATR_STRENGTH`, `ATR_HITPOINTS`      |
| `DAM_`      | Typ obrażeń                  | `DAM_BLUNT`, `DAM_EDGE`              |
| `PERC_`     | Percepcja                    | `PERC_ASSESSENEMY`                   |
| `AIV_`      | Indeks zmiennej AI           | `AIV_ATTACKREASON`                   |
| `Rtn_`      | Funkcja rutyny dziennej      | `Rtn_Start_4401`                     |

Przestrzeganie tych konwencji nie jest wymagane przez kompilator, ale **zdecydowanie zalecane** — poprawia czytelność i jest zgodne ze stylem oryginalnych skryptów.
