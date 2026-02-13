---
sidebar_position: 1
title: "Daedalus"
description: "Opis języka skryptowego Daedalus używanego w grze Gothic."
---

# Daedalus

**Daedalus** to język skryptowy wbudowany w silnik **ZenGin** - silnik gier Gothic I i Gothic II. Za jego pomocą definiuje się praktycznie całą logikę gry: postacie, przedmioty, dialogi, zadania, efekty, dźwięki, AI i wiele więcej.

Pliki źródłowe Daedalusa mają rozszerzenie **`.d`**, a pliki kompilacyjne (listy plików do kompilacji) - **`.src`**. Po kompilacji powstaje plik binarny **`.dat`**, który jest odczytywany przez silnik gry.

:::info
Daedalus **nie jest** językiem ogólnego przeznaczenia. To język domenowy zaprojektowany specjalnie pod Gothic - ma wiele ograniczeń w porównaniu z nowoczesnymi językami, ale doskonale spełnia swoją rolę w kontekście moddingu.
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

**Nie istnieje typ `bool`** - zamiast niego używa się stałych `TRUE` (1) i `FALSE` (0), które są typu `int`.

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

Deklarowane poza funkcjami - dostępne z dowolnego miejsca w skryptach:

```daedalus
var int Kapitel;
var int MojeZadanie_Status;
var string PrzepiszNazwa;
```

:::warning
Zmienne globalne **muszą być zadeklarowane przed ich użyciem** - kolejność plików w `Gothic.src` ma znaczenie!
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
Każdy blok `if`, `else if` i `else` musi kończyć się **średnikiem po klamrze zamykającej** `};` - to specyfika Daedalusa!
:::

### Warunki wieloliniowe

Daedalus pozwala na pisanie warunków `&&` i `||` w **nowych liniach** - bez nawiasów:

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
Funkcja `IntToString()` to jedyna wbudowana konwersja typów. Nie istnieje odwrotny `StringToInt()` w standardowym Daedalusie - dodaje go biblioteka Ikarus.
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

To funkcje zaimplementowane w C++ w silniku Gothic, dostępne do wywołania z Daedalusa. **Nie mają ciała w skryptach** - są wywoływane jak zwykłe funkcje:

```daedalus
// Funkcje NPC
Npc_IsPlayer(self)                         // zwraca TRUE jeśli NPC jest graczem
Npc_HasItems(self, ItPo_Health_01)         // zwraca ilość przedmiotów ItPo_Health_01 u NPC
Npc_KnowsInfo(other, DIA_Fred_Hallo)      // zwraca TRUE jeśli NPC widział już ten dialog
Npc_SetTalentSkill(slf, NPC_TALENT_1H, 60) // ustawia umiejętność broni jednoręcznej na 60%

// Funkcje AI (kolejkowane - wykonują się po kolei)
AI_Output(self, other, "DIA_Fred_Hallo_15_01")    // NPC wypowiada kwestie dialogową (audio + napisy)
AI_StopProcessInfos(self)                          // kończy rozmowę i zamyka okno dialogowe
AI_StartState(self, ZS_Flee, 0, "")                // przełącza stan AI NPC na ZS_Flee (ucieczka)

// Funkcje świata
Wld_InsertNpc(MOJ_NPC, "WP_SPAWN")        // tworzy instancję NPC i umieszcza ją na waypoincie WP_SPAWN
Wld_InsertItem(ItMw_1h_Sword, "FP_ITEM")  // tworzy przedmiot i umieszcza go na freepoincie FP_ITEM

// Funkcje przedmiotów/ekwipunku
CreateInvItems(self, ItMi_Gold, 100)       // dodaje 100 sztuk złota do ekwipunku NPC
EquipItem(self, ItMw_1h_Bau_Axe)          // daje przedmiot NPC (jeśli go nie ma) i zakłada go

// Funkcje modelu
Mdl_SetVisual(slf, "HUMANS.MDS")          // ustawia bazowy model animacji (szkielet + animacje)
Mdl_SetModelFatness(self, 0.5)            // zmienia grubość ciała (0.0 = normalna, ujemna = chudsza)

// Funkcje logów/misji
Log_CreateTopic(TOPIC_MOJ_QUEST, LOG_MISSION) // tworzy nowy wpis questa w dzienniku
Log_SetTopicStatus(TOPIC_MOJ_QUEST, LOG_RUNNING) // oznacza quest jako aktywny (LOG_SUCCESS = ukończony)

// Funkcje pomocnicze
Hlp_StrCmp(opcja, "tak")                  // zwraca TRUE jeśli oba stringi są równe
Hlp_GetInstanceID(other)                   // zwraca numeryczny ID instancji NPC

// Funkcje druku
Print("Tekst na ekranie")                  // wyświetla tekst na chwilę na środku ekranu
PrintScreen("Tekst", 50, 50, FONT_Screen, 2) // wyświetla tekst na pozycji (50%, 50%) przez 2 sekundy
```

---

## Klasy (`class`)

Klasy definiują struktury danych odpowiadające klasom C++ w silniku. Zawierają **wyłącznie deklaracje zmiennych** - nie mają metod.

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

### C_NPC

Najważniejsza klasa - definiuje wszystkie postacie w grze (NPC i gracza).

```daedalus
class C_NPC
{
    var int     id;
    var string  name[5];
    var string  slot;
    var string  effect;
    var int     npcType;
    var int     flags;
    var int     attribute[ATR_INDEX_MAX];
    var int     hitchance[MAX_HITCHANCE];
    var int     protection[PROT_INDEX_MAX];
    var int     damage[DAM_INDEX_MAX];
    var int     damagetype;
    var int     guild;
    var int     level;
    var func    mission[MAX_MISSIONS];
    var int     fight_tactic;
    var int     weapon;
    var int     voice;
    var int     voicePitch;
    var int     bodymass;
    var func    daily_routine;
    var func    start_aistate;
    var string  spawnPoint;
    var int     spawnDelay;
    var int     senses;
    var int     senses_range;
    var int     aivar[100];
    var string  wp;
    var int     exp;
    var int     exp_next;
    var int     lp;
    var int     bodyStateInterruptableOverride;
    var int     noFocus;
};
```

#### Pola C_NPC

| Pole                             | Typ         | Opis                                                                                                                                                                                                                                         |
| -------------------------------- | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`                             | `int`       | Unikalny identyfikator NPC. Używany wewnętrznie i w zapisach gry.                                                                                                                                                                            |
| `name[5]`                        | `string[5]` | Nazwa NPC wyświetlana w grze. `name[0]` to nazwa główna. Sloty 1-4 mogą przechowywać dodatkowe nazwy (np. ujawnione po queście).                                                                                                             |
| `slot`                           | `string`    | Nazwa slotu do przymocowania NPC do innego obiektu. Rzadko używane.                                                                                                                                                                          |
| `effect`                         | `string`    | Efekt wizualny nałożony na NPC (np. magiczna poświata).                                                                                                                                                                                      |
| `npcType`                        | `int`       | Typ NPC. Popularne wartości: `NPCTYPE_AMBIENT` (NPC tła), `NPCTYPE_MAIN` (ważny NPC), `NPCTYPE_OCMAIN` (główny NPC Starego Obozu), `NPCTYPE_BL_MAIN` (główny NPC Bloodwyna).                                                                 |
| `flags`                          | `int`       | Flagi NPC, łączone operatorem `\|`. Wartości: `NPC_FLAG_FRIEND` (1) - przyjazny, `NPC_FLAG_IMMORTAL` (2) - nieśmiertelny, `NPC_FLAG_GHOST` (4) - duch (brak kolizji).                                                                        |
| `attribute[8]`                   | `int[8]`    | Atrybuty postaci. Indeksy: `ATR_HITPOINTS` (0), `ATR_HITPOINTS_MAX` (1), `ATR_MANA` (2), `ATR_MANA_MAX` (3), `ATR_STRENGTH` (4), `ATR_DEXTERITY` (5), `ATR_REGENERATEHP` (6), `ATR_REGENERATEMANA` (7).                                      |
| `hitchance[5]`                   | `int[5]`    | Szansa trafienia (%) dla każdego typu broni. Indeksy: `NPC_TALENT_1H` (0 - jednoręczna), `NPC_TALENT_2H` (1 - dwuręczna), `NPC_TALENT_BOW` (2), `NPC_TALENT_CROSSBOW` (3).                                                                   |
| `protection[8]`                  | `int[8]`    | Wartości ochrony dla każdego typu obrażeń. Indeksy: `PROT_BARRIER` (0), `PROT_BLUNT` (1), `PROT_EDGE` (2), `PROT_FIRE` (3), `PROT_FLY` (4), `PROT_MAGIC` (5), `PROT_POINT` (6), `PROT_FALL` (7). Użyj `-1` (`IMMUNE`) dla pełnej odporności. |
| `damage[8]`                      | `int[8]`    | Wartości obrażeń dla każdego typu (te same indeksy co ochrona).                                                                                                                                                                              |
| `damagetype`                     | `int`       | Typ obrażeń zadawanych gołymi rękami. Wartości: `DAM_BLUNT`, `DAM_EDGE`, itp.                                                                                                                                                                |
| `guild`                          | `int`       | Gildia, do której należy NPC. Przykłady: `GIL_PAL` (Paladyni), `GIL_MIL` (Milicja), `GIL_VLK` (Mieszczanie), `GIL_KDF` (Magowie), `GIL_SLD` (Najemnicy), `GIL_BAU` (Chłopi), `GIL_BDT` (Bandyci).                                            |
| `level`                          | `int`       | Poziom NPC - używany do obliczania doświadczenia i wyświetlania.                                                                                                                                                                             |
| `mission[5]`                     | `func[5]`   | Funkcje zwrotne misji dla różnych stanów misji.                                                                                                                                                                                              |
| `fight_tactic`                   | `int`       | Zachowanie AI w walce. Ustawiane na stałą `FAI_` (np. `FAI_HUMAN_COWARD`, `FAI_HUMAN_MASTER`).                                                                                                                                               |
| `weapon`                         | `int`       | Początkowy stan broni po wejściu do świata.                                                                                                                                                                                                  |
| `voice`                          | `int`       | Indeks zestawu głosu (0-100). Mapuje się na `SVM_<voice>` dla standardowych linii głosowych i określa nazwy plików audio `AI_Output`.                                                                                                        |
| `voicePitch`                     | `int`       | Modyfikacja wysokości głosu. `0` = normalny.                                                                                                                                                                                                 |
| `bodymass`                       | `int`       | Masa ciała - wpływa na fizykę ragdoll po śmierci NPC.                                                                                                                                                                                        |
| `daily_routine`                  | `func`      | Funkcja dziennej rutyny wywoływana przy spawnie. Musi być funkcją `Rtn_` (np. `Rtn_Start_4401`).                                                                                                                                             |
| `start_aistate`                  | `func`      | Początkowa funkcja stanu AI. Jeśli ustawiona, NPC startuje w tym stanie zamiast dziennej rutyny.                                                                                                                                             |
| `spawnPoint`                     | `string`    | Waypoint, w którym NPC się pojawia.                                                                                                                                                                                                          |
| `spawnDelay`                     | `int`       | Opóźnienie (w sekundach) przed ponownym pojawieniem się NPC po śmierci. `0` = brak respawnu.                                                                                                                                                 |
| `senses`                         | `int`       | Zmysły NPC, łączone operatorem `\|`. Wartości: `SENSE_SEE` (1), `SENSE_HEAR` (2), `SENSE_SMELL` (4).                                                                                                                                         |
| `senses_range`                   | `int`       | Maksymalny zasięg percepcji w centymetrach.                                                                                                                                                                                                  |
| `aivar[100]`                     | `int[100]`  | Zmienne AI - ogólnego przeznaczenia, używane przez skrypty AI. Indeksowane stałymi `AIV_` (np. `AIV_ATTACKREASON`).                                                                                                                          |
| `wp`                             | `string`    | Nazwa aktualnego waypointa.                                                                                                                                                                                                                  |
| `exp`                            | `int`       | Aktualne punkty doświadczenia.                                                                                                                                                                                                               |
| `exp_next`                       | `int`       | Punkty doświadczenia potrzebne do następnego poziomu.                                                                                                                                                                                        |
| `lp`                             | `int`       | Dostępne punkty nauki.                                                                                                                                                                                                                       |
| `bodyStateInterruptableOverride` | `int`       | Jeśli `TRUE`, pozwala na przerwanie stanu ciała.                                                                                                                                                                                             |
| `noFocus`                        | `int`       | Jeśli `TRUE`, gracz nie może zfokusować (wycelować w) tego NPC.                                                                                                                                                                              |

### C_Item

Definiuje wszystkie przedmioty w grze - bronie, zbroje, mikstury, przedmioty questowe, runy, jedzenie i więcej.

```daedalus
class C_Item
{
    var int     id;
    var string  name;
    var string  nameID;
    var int     hp;
    var int     hp_max;
    var int     mainflag;
    var int     flags;
    var int     weight;
    var int     value;
    var int     damagetype;
    var int     damagetotal;
    var int     damage[DAM_INDEX_MAX];
    var int     wear;
    var int     protection[PROT_INDEX_MAX];
    var int     nutrition;
    var int     cond_atr[3];
    var int     cond_value[3];
    var int     change_atr[3];
    var int     change_value[3];
    var func    magic;
    var func    on_equip;
    var func    on_unequip;
    var func    on_state[4];
    var func    owner;
    var int     ownerGuild;
    var int     disguiseGuild;
    var string  visual;
    var string  visual_change;
    var string  effect;
    var int     visual_skin;
    var string  scemeName;
    var int     material;
    var int     munition;
    var int     spell;
    var int     range;
    var int     mag_circle;
    var string  description;
    var string  text[6];
    var int     count[6];
    var int     inv_zbias;
    var int     inv_rotx;
    var int     inv_roty;
    var int     inv_rotz;
    var int     inv_animate;
};
```

#### Pola C_Item

| Pole              | Typ         | Opis                                                                                                                                                                                                                                                                                                                                                                      |
| ----------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`              | `int`       | Unikalny identyfikator przedmiotu.                                                                                                                                                                                                                                                                                                                                        |
| `name`            | `string`    | Nazwa przedmiotu wyświetlana w grze.                                                                                                                                                                                                                                                                                                                                      |
| `nameID`          | `string`    | Wewnętrzny identyfikator nazwy.                                                                                                                                                                                                                                                                                                                                           |
| `hp`              | `int`       | Aktualne punkty wytrzymałości przedmiotu (np. dla niszczalnych przedmiotów).                                                                                                                                                                                                                                                                                              |
| `hp_max`          | `int`       | Maksymalne punkty wytrzymałości przedmiotu.                                                                                                                                                                                                                                                                                                                               |
| `mainflag`        | `int`       | Główna kategoria przedmiotu. Wartości: `ITEM_KAT_NONE` (1), `ITEM_KAT_NF` (broń biała), `ITEM_KAT_FF` (broń dystansowa), `ITEM_KAT_MUN` (amunicja), `ITEM_KAT_ARMOR` (zbroja), `ITEM_KAT_FOOD` (jedzenie), `ITEM_KAT_DOCS` (dokumenty), `ITEM_KAT_POTIONS` (mikstury), `ITEM_KAT_LIGHT` (źródła światła), `ITEM_KAT_RUNE` (runy), `ITEM_KAT_MAGIC` (magiczne przedmioty). |
| `flags`           | `int`       | Flagi podtypu przedmiotu, łączone operatorem `\|`. Popularne wartości: `ITEM_SWD` (miecz), `ITEM_AXE` (topór), `ITEM_2HD_SWD` (miecz dwuręczny), `ITEM_2HD_AXE` (topór dwuręczny), `ITEM_BOW` (łuk), `ITEM_CROSSBOW` (kusza), `ITEM_RING` (pierścień), `ITEM_AMULET` (amulet), `ITEM_MULTI` (stackowalny), `ITEM_MISSION` (przedmiot questowy), `ITEM_TORCH` (pochodnia). |
| `weight`          | `int`       | Waga przedmiotu (nieużywana przez silnik, ale dostępna w skryptach).                                                                                                                                                                                                                                                                                                      |
| `value`           | `int`       | Cena/wartość przedmiotu w złocie.                                                                                                                                                                                                                                                                                                                                         |
| `damagetype`      | `int`       | Typ obrażeń zadawanych przez broń. Wartości: `DAM_BLUNT`, `DAM_EDGE`, `DAM_POINT`, `DAM_FIRE`, `DAM_MAGIC`, itp.                                                                                                                                                                                                                                                          |
| `damagetotal`     | `int`       | Całkowita wartość obrażeń broni.                                                                                                                                                                                                                                                                                                                                          |
| `damage[8]`       | `int[8]`    | Obrażenia podzielone na typy (te same indeksy co `C_NPC.protection`).                                                                                                                                                                                                                                                                                                     |
| `wear`            | `int`       | Gdzie przedmiot jest noszony. Wartości: `WEAR_TORSO` (1), `WEAR_HEAD` (2), `WEAR_EFFECT` (16).                                                                                                                                                                                                                                                                            |
| `protection[8]`   | `int[8]`    | Wartości ochrony dla każdego typu obrażeń po założeniu (te same indeksy co `C_NPC.protection`).                                                                                                                                                                                                                                                                           |
| `nutrition`       | `int`       | Ilość HP przywracanych po zjedzeniu przedmiotu.                                                                                                                                                                                                                                                                                                                           |
| `cond_atr[3]`     | `int[3]`    | Wymagane atrybuty do użycia przedmiotu (stałe ATR\_).                                                                                                                                                                                                                                                                                                                     |
| `cond_value[3]`   | `int[3]`    | Wymagane wartości atrybutów (sparowane z `cond_atr`).                                                                                                                                                                                                                                                                                                                     |
| `change_atr[3]`   | `int[3]`    | Atrybuty zmieniane po założeniu przedmiotu (stałe ATR\_).                                                                                                                                                                                                                                                                                                                 |
| `change_value[3]` | `int[3]`    | O ile zmieniają się atrybuty (sparowane z `change_atr`).                                                                                                                                                                                                                                                                                                                  |
| `magic`           | `func`      | Funkcja zaklęcia powiązanego z przedmiotem (dla run/zwojów).                                                                                                                                                                                                                                                                                                              |
| `on_equip`        | `func`      | Funkcja wywoływana po założeniu przedmiotu.                                                                                                                                                                                                                                                                                                                               |
| `on_unequip`      | `func`      | Funkcja wywoływana po zdjęciu przedmiotu.                                                                                                                                                                                                                                                                                                                                 |
| `on_state[4]`     | `func[4]`   | Funkcje stanów wywoływane przy użyciu przedmiotu. `on_state[0]` jest najczęstsza - wywoływana przy jedzeniu/piciu.                                                                                                                                                                                                                                                        |
| `owner`           | `func`      | Instancja NPC, który jest właścicielem przedmiotu. Zabranie go jest kradzieżą.                                                                                                                                                                                                                                                                                            |
| `ownerGuild`      | `int`       | Gildia będąca właścicielem przedmiotu. Zabranie go jest kradzieżą wobec członków tej gildii.                                                                                                                                                                                                                                                                              |
| `disguiseGuild`   | `int`       | Noszenie tej zbroi przebraza gracza za członka tej gildii.                                                                                                                                                                                                                                                                                                                |
| `visual`          | `string`    | Nazwa pliku modelu 3D (format `.3ds`).                                                                                                                                                                                                                                                                                                                                    |
| `visual_change`   | `string`    | Wizual nakładany na NPC po założeniu przedmiotu (dla zbroi - plik `.asc`).                                                                                                                                                                                                                                                                                                |
| `effect`          | `string`    | Efekt wizualny nakładany po założeniu.                                                                                                                                                                                                                                                                                                                                    |
| `visual_skin`     | `int`       | Indeks wariantu tekstury.                                                                                                                                                                                                                                                                                                                                                 |
| `scemeName`       | `string`    | Nazwa schematu animacji. Popularne wartości: `"POTIONFAST"` (szybkie picie), `"YOURSHORT"` (jedzenie), `"YOURSHORT"` (czytanie), `"YOURSHORT"` (użycie).                                                                                                                                                                                                                  |
| `material`        | `int`       | Typ materiału (wpływa na dźwięki). Wartości: `MAT_WOOD`, `MAT_STONE`, `MAT_METAL`, `MAT_LEATHER`, `MAT_CLAY`, `MAT_GLAS`.                                                                                                                                                                                                                                                 |
| `munition`        | `int`       | Instancja przedmiotu amunicji dla broni dystansowej (np. `ItRw_Arrow`).                                                                                                                                                                                                                                                                                                   |
| `spell`           | `int`       | ID zaklęcia powiązanego z przedmiotem (dla run/zwojów).                                                                                                                                                                                                                                                                                                                   |
| `range`           | `int`       | Zasięg broni w centymetrach.                                                                                                                                                                                                                                                                                                                                              |
| `mag_circle`      | `int`       | Wymagany krąg magii do użycia przedmiotu (dla run).                                                                                                                                                                                                                                                                                                                       |
| `description`     | `string`    | Opis wyświetlany w ekwipunku. Zwykle ustawiony na `name`.                                                                                                                                                                                                                                                                                                                 |
| `text[6]`         | `string[6]` | Sześć linii tekstu wyświetlanych w oknie opisu w ekwipunku (np. etykiety statystyk).                                                                                                                                                                                                                                                                                      |
| `count[6]`        | `int[6]`    | Wartości wyświetlane obok każdej linii `text[]` (np. liczby obrażeń).                                                                                                                                                                                                                                                                                                     |
| `inv_zbias`       | `int`       | Przesunięcie głębi Z dla renderowania w ekwipunku.                                                                                                                                                                                                                                                                                                                        |
| `inv_rotx`        | `int`       | Rotacja X dla wyświetlania w ekwipunku (w stopniach).                                                                                                                                                                                                                                                                                                                     |
| `inv_roty`        | `int`       | Rotacja Y dla wyświetlania w ekwipunku (w stopniach).                                                                                                                                                                                                                                                                                                                     |
| `inv_rotz`        | `int`       | Rotacja Z dla wyświetlania w ekwipunku (w stopniach).                                                                                                                                                                                                                                                                                                                     |
| `inv_animate`     | `int`       | Jeśli `TRUE`, przedmiot obraca się w ekwipunku.                                                                                                                                                                                                                                                                                                                           |

### C_Spell

Definiuje zachowanie i parametry zaklęć.

```daedalus
class C_Spell
{
    var float   time_per_mana;
    var int     damage_per_level;
    var int     damageType;
    var int     spellType;
    var int     canTurnDuringInvest;
    var int     canChangeTargetDuringInvest;
    var int     isMultiEffect;
    var int     targetCollectAlgo;
    var int     targetCollectType;
    var int     targetCollectRange;
    var int     targetCollectAzi;
    var int     targetCollectElev;
};
```

#### Pola C_Spell

| Pole                          | Typ     | Opis                                                                                                                      |
| ----------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------- |
| `time_per_mana`               | `float` | Czas (w milisekundach) potrzebny na zainwestowanie jednego punktu many. Kontroluje szybkość rzucania.                     |
| `damage_per_level`            | `int`   | Dodatkowe obrażenia za poziom rzucającego.                                                                                |
| `damageType`                  | `int`   | Typ obrażeń zadawanych przez zaklęcie (`DAM_MAGIC`, `DAM_FIRE`, `DAM_FLY`, itp.).                                         |
| `spellType`                   | `int`   | Charakter zaklęcia. Wartości: `SPELL_BAD` (wrogie - przerywa dialog, wywołuje walkę), `SPELL_GOOD` (przyjazne/neutralne). |
| `canTurnDuringInvest`         | `int`   | Jeśli `TRUE`, rzucający może się obracać w fazie inwestowania (ładowania).                                                |
| `canChangeTargetDuringInvest` | `int`   | Jeśli `TRUE`, rzucający może zmienić cel w fazie inwestowania.                                                            |
| `isMultiEffect`               | `int`   | Jeśli `TRUE`, zaklęcie może trafić wiele celów.                                                                           |
| `targetCollectAlgo`           | `int`   | Algorytm zbierania celów (używany dla zaklęć wielocelowych).                                                              |
| `targetCollectType`           | `int`   | Typ obiektów, które mogą być celowane.                                                                                    |
| `targetCollectRange`          | `int`   | Maksymalny zasięg zbierania celów (w centymetrach).                                                                       |
| `targetCollectAzi`            | `int`   | Kąt azymutu dla stożka zbierania celów (w stopniach).                                                                     |
| `targetCollectElev`           | `int`   | Kąt elewacji dla stożka zbierania celów (w stopniach).                                                                    |

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

Prototypy upraszczają tworzenie wielu podobnych instancji - wystarczy nadpisać wartości, które różnią się od domyślnych.

### Najczęstsze przypadki użycia

#### Prototyp NPC (`Npc_Default`)

Najczęściej spotykany prototyp w Gothic. Praktycznie każda instancja NPC dziedziczy z niego. Ustawia rozsądne domyślne wartości atrybutów, zmysłów, ochrony i typu obrażeń, więc indywidualne definicje NPC muszą określić tylko to, co unikalne: imię, gildię, wygląd, AI i dialogi.

```daedalus
// Każdy ludzki NPC używa Npc_Default
instance BAU_4401_Fred(Npc_Default)
{
    name      = "Fred";
    guild     = GIL_BAU;
    id        = 4401;
    // ... tylko unikalne pola - reszta pochodzi z Npc_Default
};
```

#### Prototyp zaklęcia (`C_Spell_Proto`)

Używany dla wszystkich definicji zaklęć. Ustawia domyślny czas rzucania, typ obrażeń i zachowanie, więc poszczególne zaklęcia muszą nadpisać tylko konkretne parametry.

```daedalus
prototype C_Spell_Proto(C_Spell)
{
    time_per_mana        = 500;
    damage_per_level     = 1;
    damageType           = DAM_MAGIC;
    spellType            = SPELL_BAD;
    canTurnDuringInvest  = 1;
};

instance Spell_Fireball(C_Spell_Proto)
{
    time_per_mana        = 800;
    damage_per_level     = 15;
    damageType           = DAM_FIRE;
    // spellType, canTurnDuringInvest - odziedziczone z prototypu
};
```

#### Prototypy przedmiotów

W oryginalnych skryptach przedmioty są zwykle tworzone bezpośrednio z `C_Item`, bez prototypu. Jednak tworzenie własnych prototypów dla przedmiotów jest przydatną techniką przy tworzeniu moda z wieloma podobnymi przedmiotami:

```daedalus
// Własny prototyp dla mieczy jednoręcznych
prototype ItMw_1H_Common(C_Item)
{
    mainflag    = ITEM_KAT_NF;
    flags       = ITEM_SWD;
    damagetype  = DAM_EDGE;
    material    = MAT_METAL;
    cond_atr[2] = ATR_STRENGTH;
    wear        = WEAR_TORSO;
    scemeName   = "1HSWORD";
};

instance ItMw_1h_RustySword(ItMw_1H_Common)
{
    name          = "Zardzewialy miecz";
    visual        = "ItMw_010_1h_Sword_short_01.3ds";
    damagetotal   = 15;
    cond_value[2] = 10;
    value         = 30;
    description   = name;
};
```

:::tip
Używaj prototypów zawsze, gdy masz **3 lub więcej instancji** dzielących większość tych samych wartości pól. Redukuje to duplikację kodu i ułatwia masowe zmiany - zmodyfikuj prototyp, a wszystkie dziedziczące instancje zaktualizują się automatycznie.
:::

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

    // Wywołania funkcji - kod wykonywalny!
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
instance hero(C_NPC);            // gracz - zawsze dostępny
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

Komentarze to fragmenty kodu ignorowane przez kompilator - służą jako notatki dla programisty. Daedalus obsługuje dwa style komentarzy, identyczne jak w C/C++.

### Komentarz jednoliniowy (`//`)

Wszystko po `//` do końca linii jest ignorowane przez kompilator:

```daedalus
// To jest komentarz jednoliniowy
const int ATR_HITPOINTS = 0;    // komentarz na końcu linii
var int mojaZmienna;            // opis zmiennej
```

### Komentarz wieloliniowy (`/* */`)

Wszystko pomiędzy `/*` a `*/` jest ignorowane, nawet jeśli obejmuje wiele linii:

```daedalus
/*
   To jest komentarz
   wieloliniowy
*/

/* Jednoliniowy komentarz blokowy */
```

:::warning
Komentarze wieloliniowe **nie mogą być zagnieżdżone**. Poniższy kod spowoduje błąd kompilacji:

```daedalus
/* zewnętrzny komentarz
    /* wewnętrzny komentarz */
   ta linia spowoduje błąd!
*/
```

:::

:::danger
Komentarz `//` w tej samej linii co `AI_Output` to **przypadek specjalny** - parser traktuje go jako tekst napisów dialogowych, a nie jako zwykły komentarz! Zobacz sekcję [System dialogowy](#system-dialogowy---ai_output) powyżej.
:::

---

## Kompilacja - Gothic.src

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

1. **Kolejność ma znaczenie** - symbol musi być zadeklarowany **przed** jego użyciem. Stałe i klasy muszą być na początku listy.
2. **Wzorce `*.d`** - można użyć wildcarda: `STORY\NPC\*.D` dołączy wszystkie pliki `.d` z folderu.
3. **Pliki `.src` jako inkludy** - `Gothic.src` może odwoływać się do innych plików `.src` (np. `Ikarus\Ikarus.d`).
4. **Wynik kompilacji** - plik `Gothic.dat` w katalogu `System/`, odczytywany przez silnik.

---

## Cechy szczególne składni

### Wielkość liter - bez znaczenia

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

### Średniki - wszędzie!

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
Brak średnika po `};` to jeden z najczęstszych błędów początkujących. Kompilator zgłosi błąd lub - co gorsze - skompiluje kod nieprawidłowo.
:::

### Brak zaawansowanych konstrukcji

Daedalus **nie posiada** wielu konstrukcji znanych z nowoczesnych języków:

| Czego brakuje                    | Alternatywa                                 |
| -------------------------------- | ------------------------------------------- |
| Pętle (`for`, `while`)           | Biblioteka Ikarus dodaje `while` i `repeat` |
| `switch / case`                  | Łańcuchy `if / else if`                     |
| Dynamiczne tablice               | Ikarus - dostęp do pamięci                  |
| Wskaźniki                        | Ikarus - `_^()` (kastowanie adresów)        |
| Struktury (`struct`)             | Tylko `class`                               |
| Metody w klasach                 | Wolnostojące funkcje                        |
| Przeciążanie funkcji             | Unikalne nazwy funkcji                      |
| Przestrzenie nazw                | Konwencje nazewnicze (prefiksy)             |
| Łączenie stringów operatorem `+` | `ConcatStrings()`                           |

---

## System dialogowy - AI_Output

System dialogowy w Gothic oparty jest na funkcji `AI_Output` i klasie `C_INFO`. Ma unikalny mechanizm parsowania, który różni się od wszystkiego w standardowych językach programowania.

### C_INFO - definicja wpisu dialogowego

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
| `nr`          | Kolejność sortowania - mniejszy numer = wyżej na liście. EXIT ma zwykle `999` |
| `condition`   | Funkcja zwracająca `TRUE` jeśli opcja ma być widoczna                         |
| `information` | Funkcja wywoływana po wybraniu opcji (tu piszemy AI_Output)                   |
| `permanent`   | `TRUE` = opcja dostępna zawsze, `FALSE` = znika po użyciu                     |
| `important`   | `TRUE` = NPC sam podchodzi do gracza i rozpoczyna rozmowę                     |
| `description` | Tekst wyświetlany w menu dialogowym                                           |
| `trade`       | `TRUE` = otwiera okno handlu                                                  |

### AI_Output - wypowiedź NPC

```daedalus
func void AI_Output(var C_NPC speaker, var C_NPC listener, var string outputName);
```

To najważniejsza funkcja systemu dialogowego. Powoduje, że NPC wypowiada kwestię z podkładem audio i napisami.

#### Kto mówi - kolejność parametrów

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

To **unikalna cecha parsera Daedalusa** - komentarz `//` w tej samej linii co `AI_Output` **nie jest ignorowany**. Parser traktuje go jako **tekst napisów dialogowych** wyświetlany na ekranie.

```daedalus
AI_Output(self, other, "DIA_Konrad_Hallo_08_01"); //Hej, dobrze cię widzieć!
//                                                    ^^^^^^^^^^^^^^^^^^^^^^^^^^^
//                                                    Ten komentarz to napisy!
```

:::danger
Komentarz z tekstem napisów **musi** być w **tej samej linii** co wywołanie `AI_Output`. Jeśli przeniesiesz go do następnej linii - napisy będą puste.

```daedalus
// ❌ ŹLE - napisy będą puste!
AI_Output(self, other, "DIA_Konrad_Hallo_08_01");
//Hej, dobrze cię widzieć!

// ✅ DOBRZE - napisy działają
AI_Output(self, other, "DIA_Konrad_Hallo_08_01"); //Hej, dobrze cię widzieć!
```

:::

#### Identyfikator outputu - konwencja nazewnictwa

Format: **`DIA_<NPC>_<Temat>_<NrGłosu>_<NrLinii>`**

Przykład: `DIA_Konrad_Hallo_08_01`

| Fragment | Znaczenie                                              |
| -------- | ------------------------------------------------------ |
| `DIA`    | Prefiks - dialog                                       |
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

### AI_OutputSVM - standardowe kwestie głosowe

Oprócz `AI_Output` istnieje `AI_OutputSVM` do odtwarzania **standardowych kwestii głosowych** (SVM - Standard Voice Messages). Są to gotowe wypowiedzi typu okrzyki bojowe, pozdrowienia, ostrzeżenia:

```daedalus
// NPC mówi standardową kwestię głosową
B_Say(self, other, "$NOTNOW");              // "Zostaw mnie w spokoju!"
B_Say(self, other, "$Alarm");               // "ALARM!"
B_Say(self, other, "$HandsOff");            // "Ręce przy sobie!"
```

Każdy NPC ma pole `voice` w `C_NPC`, które wskazuje na zestaw SVM (`SVM_0`, `SVM_1`, ..., `SVM_100`). Klasa `C_SVM` definiuje setki standardowych kwestii, a każdy zestaw głosowy ma własne pliki audio.

`AI_OutputSVM_Overlay` działa jak `AI_OutputSVM`, ale jest **nieblokujący** - nie czeka na zakończenie odtwarzania. Używany do okrzyków w walce.

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

Przestrzeganie tych konwencji nie jest wymagane przez kompilator, ale **zdecydowanie zalecane** - poprawia czytelność i jest zgodne ze stylem oryginalnych skryptów.
