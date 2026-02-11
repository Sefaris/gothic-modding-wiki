---
sidebar_position: 2
title: "Mój pierwszy NPC"
description: "Tworzenie pierwszej postaci niezależnej w Gothic."
---

# Mój pierwszy NPC

W tym poradniku nauczysz się tworzyć prostą postać niezależną (NPC) w języku Daedalus. Stworzymy farmera, który stoi na rynku i ma swój dzienny plan zajęć.

## Wymagania wstępne

Przed rozpoczęciem upewnij się, że:

- Masz zainstalowane skrypty Gothic (folder `Scripts/Content/`)
- Rozumiesz [strukturę skryptów](./script-structure.md)
- Wiesz, czym jest instancja i prototyp w Daedalusie

## Klasa C_NPC — co definiuje postać?

Każdy NPC w Gothic jest **instancją** klasy `C_NPC`. Najważniejsze pola tej klasy to:

| Pole            | Typ         | Opis                                                      |
| --------------- | ----------- | --------------------------------------------------------- |
| `name`          | `string[5]` | Imię NPC (wyświetlane w grze)                             |
| `guild`         | `int`       | Gildia (np. `GIL_MIL` — milicja, `GIL_OUT` — bezgildyjny) |
| `id`            | `int`       | Unikalny identyfikator NPC                                |
| `voice`         | `int`       | Numer głosu (powiązany z plikami audio)                   |
| `level`         | `int`       | Poziom postaci                                            |
| `attribute[]`   | `int[]`     | Atrybuty: HP, mana, siła, zręczność                       |
| `protection[]`  | `int[]`     | Ochrona przed typami obrażeń                              |
| `fight_tactic`  | `int`       | Taktyka walki (np. `FAI_HUMAN_COWARD`)                    |
| `daily_routine` | `func`      | Funkcja z dziennym planem NPC                             |
| `npctype`       | `int`       | Typ NPC (główny, przyjaciel, wróg)                        |
| `flags`         | `int`       | Flagi (np. `NPC_FLAG_IMMORTAL`)                           |

## Prototyp Npc_Default

Zanim stworzymy własną postać, musimy rozumieć **prototyp** `Npc_Default`. Jest to szablon, z którego dziedziczą prawie wszystkie postacie w grze:

```daedalus
prototype Npc_Default (C_NPC)
{
    // Podstawowe atrybuty
    attribute[ATR_STRENGTH]      = 10;
    attribute[ATR_DEXTERITY]     = 10;
    attribute[ATR_MANA_MAX]      = 10;
    attribute[ATR_MANA]          = 10;
    attribute[ATR_HITPOINTS_MAX] = 40;
    attribute[ATR_HITPOINTS]     = 40;

    // Szanse trafienia (0% — nie umie walczyć daną bronią)
    HitChance[NPC_TALENT_1H]       = 0;
    HitChance[NPC_TALENT_2H]       = 0;
    HitChance[NPC_TALENT_BOW]      = 0;
    HitChance[NPC_TALENT_CROSSBOW] = 0;

    // Ochrona (0 — brak ochrony)
    protection[PROT_EDGE]   = 0;
    protection[PROT_BLUNT]  = 0;
    protection[PROT_POINT]  = 0;
    protection[PROT_FIRE]   = 0;
    protection[PROT_MAGIC]  = 0;

    // Domyślne ustawienia
    damagetype   = DAM_BLUNT;
    senses       = SENSE_HEAR | SENSE_SEE;
    senses_range = PERC_DIST_ACTIVE_MAX;
};
```

:::info
Prototyp ustawia **domyślne wartości**. Każda instancja NPC może nadpisać dowolne z nich.
:::

## Tworzenie instancji NPC

Stwórzmy farmera o imieniu **Konrad**. Utwórz plik `BAU_900_Konrad.d` w folderze `Story/NPC/`:

```daedalus
instance BAU_900_Konrad (Npc_Default)
{
    // --- Podstawowe informacje ---
    name        = "Konrad";
    guild       = GIL_OUT;
    id          = 900;
    voice       = 90;
    flags       = 0;
    npctype     = NPCTYPE_MAIN;

    // --- Atrybuty ---
    attribute[ATR_STRENGTH]      = 30;
    attribute[ATR_DEXTERITY]     = 15;
    attribute[ATR_HITPOINTS_MAX] = 80;
    attribute[ATR_HITPOINTS]     = 80;
    level                        = 5;

    // --- Walka ---
    fight_tactic = FAI_HUMAN_COWARD;

    // --- Ekwipunek ---
    EquipItem (self, ItMw_1h_Bau_Axe);
    CreateInvItems (self, ItMi_Gold, 25);
    CreateInvItems (self, ItFo_Apple, 3);

    // --- Wygląd ---
    B_SetNpcVisual (self, MALE, "Hum_Head_Bald", Face_N_NormalBart_Senyan, BodyTex_N, ITAR_Bau_L);
    Mdl_SetModelFatness (self, 1);
    Mdl_ApplyOverlayMds (self, "Humans_Relaxed.mds");

    // --- Umiejętności ---
    B_GiveNpcTalents (self);
    B_SetFightSkills (self, 15);

    // --- Plan dnia ---
    daily_routine = Rtn_Start_900;
};
```

| Pole / Wywołanie | Opis |
| ---------------- | ---- |
| `guild = GIL_OUT` | Bezgildyjny (rolnik) |
| `id = 900` | Unikalny numer identyfikacyjny |
| `voice = 90` | Numer głosu (powiązany z plikami audio) |
| `flags = 0` | `0` = normalny, `NPC_FLAG_IMMORTAL` = nieśmiertelny |
| `npctype = NPCTYPE_MAIN` | Ważna postać (związana z questami) |
| `fight_tactic = FAI_HUMAN_COWARD` | Ucieka przed walką |
| `EquipItem(self, ItMw_1h_Bau_Axe)` | Zakłada topór farmera |
| `CreateInvItems(self, ItMi_Gold, 25)` | 25 sztuk złota w ekwipunku |
| `CreateInvItems(self, ItFo_Apple, 3)` | 3 jabłka w ekwipunku |
| `Mdl_SetModelFatness(self, 1)` | Tusza postaci |
| `Mdl_ApplyOverlayMds(self, "Humans_Relaxed.mds")` | Zrelaksowana animacja |
| `B_SetFightSkills(self, 15)` | 15% szans trafienia |

:::tip
Konwencja nazewnictwa: `BAU` (Bauer = farmer), `900` (unikalne ID), `Konrad` (imię). W oryginalnych skryptach Gothic każda gildia ma swój prefix.
:::

## Plan dnia (Daily Routine)

Każdy NPC potrzebuje **planu dnia** — funkcji określającej, co robi o danej godzinie:

```daedalus
func void Rtn_Start_900 ()
{
    // Od 7:00 do 12:00 — stoi przy studni
    TA_Stand_ArmsCrossed (07, 00,  12, 00, "NW_CITY_WELL_01");

    // Od 12:00 do 13:00 — je posiłek
    TA_Sit_Bench         (12, 00,  13, 00, "NW_CITY_BENCH_01");

    // Od 13:00 do 20:00 — pracuje na farmie
    TA_Smalltalk         (13, 00,  20, 00, "NW_FARM1_PATH_01");

    // Od 20:00 do 7:00 — śpi
    TA_Sleep             (20, 00,  07, 00, "NW_FARM1_BED_01");
};
```

:::warning
Waypointy (np. `"NW_CITY_WELL_01"`) muszą istnieć w świecie gry (pliku `.zen`). Jeśli użyjesz nieistniejącego waypointa, NPC pojawi się w punkcie `(0, 0, 0)`.
:::

Dostępne funkcje planu dnia:

| Funkcja                | Opis                         |
| ---------------------- | ---------------------------- |
| `TA_Stand_ArmsCrossed` | Stoi ze skrzyżowanymi rękoma |
| `TA_Stand_Guarding`    | Stoi na straży               |
| `TA_Sit_Bench`         | Siedzi na ławce              |
| `TA_Sleep`             | Śpi                          |
| `TA_Smalltalk`         | Rozmawia z pobliskimi NPC    |
| `TA_Smith`             | Kowalstwo                    |
| `TA_Eat`               | Je                           |
| `TA_Practice`          | Ćwiczy                       |

## Rejestracja w Gothic.src

Aby gra załadowała nowego NPC, musisz dodać plik do `Gothic.src`:

```
Story\NPC\BAU_900_Konrad.d
```

:::danger
Kolejność plików w `Gothic.src` ma znaczenie! NPC musi być zadeklarowany **po** prototypie `Npc_Default`, ale **przed** dialogami.
:::

## Osadzenie NPC w świecie

Aby NPC pojawił się w świecie gry, musisz go **wstawić** (spawn) w funkcji startowej odpowiedniego świata. W pliku `Startup.d` (lub odpowiednim pliku świata) dodaj:

```daedalus
func void Startup_NewWorld ()
{
    // ... inne NPC ...
    Wld_InsertNpc (BAU_900_Konrad, "NW_CITY_WELL_01");
};
```

`Wld_InsertNpc` wstawia postać do świata w podanym waypoinecie. Od tego momentu NPC zacznie wykonywać swój plan dnia.

## Podsumowanie

Utworzenie NPC wymaga:

1. **Instancji** dziedziczącej po `Npc_Default`
2. Ustawienia **atrybutów** (siła, HP, poziom)
3. Konfiguracji **wyglądu** (model, tekstura, zbroja)
4. Zdefiniowania **planu dnia**
5. **Rejestracji** w `Gothic.src`
6. **Wstawienia** do świata w `Startup.d`
