---
sidebar_position: 3
title: "Stałe Daedalusa"
description: "Kompletna lista stałych Daedalusa — atrybuty, kategorie przedmiotów, gildie, typy obrażeń, materiały i inne."
---

# Stałe Daedalusa

Na tej stronie zebrano najważniejsze stałe zdefiniowane w skryptach Gothic II (`Constants.d`, `AI_Constants.d`). Są one używane w definicjach NPC, przedmiotów, dialogów i konfiguracji AI.

## Atrybuty (ATR\_)

Używane z tablicą `attribute[]` w `C_NPC`.

| Stała                | Wartość | Opis                     |
| -------------------- | ------- | ------------------------ |
| `ATR_HITPOINTS`      | `0`     | Aktualne zdrowie         |
| `ATR_HITPOINTS_MAX`  | `1`     | Maksymalne zdrowie       |
| `ATR_MANA`           | `2`     | Aktualna mana            |
| `ATR_MANA_MAX`       | `3`     | Maksymalna mana          |
| `ATR_STRENGTH`       | `4`     | Siła                     |
| `ATR_DEXTERITY`      | `5`     | Zręczność                |
| `ATR_REGENERATEHP`   | `6`     | Regeneracja HP           |
| `ATR_REGENERATEMANA` | `7`     | Regeneracja many         |
| `ATR_INDEX_MAX`      | `8`     | Łączna liczba atrybutów  |

## Kategorie przedmiotów (ITEM\_KAT\_)

Używane w polu `mainflag` klasy `C_Item`.

| Stała              | Wartość    | Opis                        |
| ------------------ | ---------- | --------------------------- |
| `ITEM_KAT_NONE`    | `1`        | Inne (klucze, złoto, itd.)  |
| `ITEM_KAT_NF`      | `2`        | Broń biała                  |
| `ITEM_KAT_FF`      | `4`        | Broń dystansowa             |
| `ITEM_KAT_MUN`     | `8`        | Amunicja                    |
| `ITEM_KAT_ARMOR`   | `16`       | Zbroja                      |
| `ITEM_KAT_FOOD`    | `32`       | Jedzenie                    |
| `ITEM_KAT_DOCS`    | `64`       | Dokumenty                   |
| `ITEM_KAT_POTIONS` | `128`      | Mikstury                    |
| `ITEM_KAT_LIGHT`   | `256`      | Źródła światła              |
| `ITEM_KAT_RUNE`    | `512`      | Runy i zwoje                |
| `ITEM_KAT_MAGIC`   | `1 << 31`  | Magiczne przedmioty         |
| `ITEM_KAT_KEYS`    | `1`        | Klucze (jak NONE)           |

## Flagi przedmiotów (ITEM\_)

Używane w polu `flags` klasy `C_Item`. Można łączyć operatorem bitowym OR.

### Typy broni

| Stała          | Bit        | Opis           |
| -------------- | ---------- | -------------- |
| `ITEM_DAG`      | `1 << 13`  | Sztylet        |
| `ITEM_SWD`      | `1 << 14`  | Miecz 1H      |
| `ITEM_AXE`      | `1 << 15`  | Topór 1H      |
| `ITEM_2HD_SWD`  | `1 << 16`  | Miecz 2H      |
| `ITEM_2HD_AXE`  | `1 << 17`  | Topór 2H      |
| `ITEM_SHIELD`   | `1 << 18`  | Tarcza         |
| `ITEM_BOW`      | `1 << 19`  | Łuk            |
| `ITEM_CROSSBOW` | `1 << 20`  | Kusza          |

### Akcesoria

| Stała         | Bit       | Opis    |
| ------------- | --------- | ------- |
| `ITEM_RING`    | `1 << 11` | Pierścień |
| `ITEM_AMULET`  | `1 << 22` | Amulet  |
| `ITEM_BELT`    | `1 << 24` | Pas     |

### Flagi zachowania

| Stała            | Bit       | Opis                                   |
| ---------------- | --------- | -------------------------------------- |
| `ITEM_DROPPED`    | `1 << 10` | Przedmiot upuszczony w świecie         |
| `ITEM_MISSION`    | `1 << 12` | Przedmiot misyjny (nie można sprzedać) |
| `ITEM_MULTI`      | `1 << 21` | Stackowalny                            |
| `ITEM_NFOCUS`     | `1 << 23` | Nie można sfokusować                   |
| `ITEM_CREATEAMMO` | `1 << 25` | Auto-tworzenie amunicji                |
| `ITEM_NSPLIT`     | `1 << 26` | Nie można rozdzielić ze stosu          |
| `ITEM_DRINK`      | `1 << 27` | Napój                                  |
| `ITEM_TORCH`      | `1 << 28` | Pochodnia                              |
| `ITEM_THROW`      | `1 << 29` | Przedmiot do rzucania                  |
| `ITEM_ACTIVE`     | `1 << 30` | Aktywny (używalny przedmiot)           |

## Typy obrażeń (DAM\_)

Używane w polu `damagetype`. Można łączyć operatorem bitowym OR.

| Stała         | Wartość | Indeks | Opis                  |
| ------------- | ------- | ------ | --------------------- |
| `DAM_BARRIER`  | `1`     | `0`    | Obrażenia od bariery  |
| `DAM_BLUNT`    | `2`     | `1`    | Obrażenia obuchowe    |
| `DAM_EDGE`     | `4`     | `2`    | Obrażenia sieczne     |
| `DAM_FIRE`     | `8`     | `3`    | Obrażenia od ognia    |
| `DAM_FLY`      | `16`    | `4`    | Odrzut                |
| `DAM_MAGIC`    | `32`    | `5`    | Obrażenia magiczne    |
| `DAM_POINT`    | `64`    | `6`    | Obrażenia kłute       |
| `DAM_FALL`     | `128`   | `7`    | Obrażenia od upadku   |

## Typy ochrony (PROT\_)

Używane z tablicą `protection[]`. Indeksy odpowiadają `DAM_INDEX_*`.

| Stała         | Indeks | Opis                    |
| ------------- | ------ | ----------------------- |
| `PROT_BARRIER` | `0`    | Ochrona przed barierą   |
| `PROT_BLUNT`   | `1`    | Ochrona przed obuchem   |
| `PROT_EDGE`    | `2`    | Ochrona przed cięciem   |
| `PROT_FIRE`    | `3`    | Ochrona przed ogniem    |
| `PROT_FLY`     | `4`    | Odporność na odrzut     |
| `PROT_MAGIC`   | `5`    | Ochrona przed magią     |
| `PROT_POINT`   | `6`    | Ochrona przed kłuciem   |
| `PROT_FALL`    | `7`    | Ochrona przed upadkiem  |

Użyj `IMMUNE` (`-1`), aby NPC był całkowicie odporny na dany typ obrażeń.

## Gildie (GIL\_)

Używane w polu `guild` klasy `C_NPC`.

### Gildie ludzi

| Stała      | Wartość | Opis                            |
| ---------- | ------- | ------------------------------- |
| `GIL_NONE`  | `0`     | Brak gildii                     |
| `GIL_PAL`   | `1`     | Paladyni (= `GIL_HUMAN`)       |
| `GIL_MIL`   | `2`     | Milicja                         |
| `GIL_VLK`   | `3`     | Mieszczanie (Volk)              |
| `GIL_KDF`   | `4`     | Magowie Ognia (Kreis des Feuers) |
| `GIL_NOV`   | `5`     | Nowicjusze                      |
| `GIL_DJG`   | `6`     | Łowcy Smoków (Drachenjäger)    |
| `GIL_SLD`   | `7`     | Najemnicy (Söldner)            |
| `GIL_BAU`   | `8`     | Farmerzy (Bauer)                |
| `GIL_BDT`   | `9`     | Bandyci                         |
| `GIL_STRF`  | `10`    | Więźniowie (Sträfling)         |
| `GIL_DMT`   | `11`    | Dementorzy                      |
| `GIL_OUT`   | `12`    | Bezgildyjni (Outsider)          |
| `GIL_PIR`   | `13`    | Piraci                          |
| `GIL_KDW`   | `14`    | Magowie Wody (Kreis des Wassers) |
| `GIL_PUBLIC` | `15`   | Publiczny / ogólny              |

### Gildie potworów

| Stała                 | Wartość | Opis               |
| --------------------- | ------- | ------------------ |
| `GIL_MEATBUG`          | `17`    | Mięsożuk           |
| `GIL_SHEEP`            | `18`    | Owca               |
| `GIL_GOBBO`            | `19`    | Goblin             |
| `GIL_SCAVENGER`        | `22`    | Padlinożerca       |
| `GIL_GIANT_RAT`        | `23`    | Wielki szczur      |
| `GIL_GIANT_BUG`        | `24`    | Wielki owad        |
| `GIL_BLOODFLY`         | `25`    | Krwiopijca         |
| `GIL_WARAN`            | `26`    | Waran              |
| `GIL_WOLF`             | `27`    | Wilk               |
| `GIL_MINECRAWLER`      | `29`    | Kopacz             |
| `GIL_LURKER`           | `30`    | Czarownik bagien   |
| `GIL_SKELETON`         | `31`    | Szkielet           |
| `GIL_ZOMBIE`           | `34`    | Zombie             |
| `GIL_SNAPPER`          | `35`    | Snapper            |
| `GIL_SHADOWBEAST`      | `36`    | Mroczna bestia     |
| `GIL_HARPY`            | `38`    | Harpia             |
| `GIL_STONEGOLEM`       | `39`    | Kamienny golem     |
| `GIL_FIREGOLEM`        | `40`    | Ognisty golem      |
| `GIL_ICEGOLEM`         | `41`    | Lodowy golem       |
| `GIL_DEMON`            | `43`    | Demon              |
| `GIL_TROLL`            | `45`    | Troll              |
| `GIL_SWAMPSHARK`       | `46`    | Rekin bagienny     |
| `GIL_DRAGON`           | `47`    | Smok               |
| `GIL_MOLERAT`          | `48`    | Kretoszczur        |
| `GIL_ALLIGATOR`        | `49`    | Aligator           |
| `GIL_SWAMPGOLEM`       | `50`    | Bagienny golem     |
| `GIL_STONEGUARDIAN`    | `51`    | Kamienny strażnik  |
| `GIL_GARGOYLE`         | `52`    | Gargulec           |

### Gildie orków

| Stała           | Wartość | Opis            |
| --------------- | ------- | --------------- |
| `GIL_ORC`        | `59`    | Ork             |
| `GIL_FRIENDLY_ORC` | `60` | Przyjazny ork   |
| `GIL_UNDEADORC`  | `61`    | Nieumarły ork   |
| `GIL_DRACONIAN`  | `62`    | Jaszczuroczłek  |

## Flagi NPC (NPC\_FLAG\_)

Używane w polu `flags` klasy `C_NPC`.

| Stała               | Wartość | Opis                    |
| ------------------- | ------- | ----------------------- |
| `NPC_FLAG_FRIEND`    | `1`     | Przyjazny NPC           |
| `NPC_FLAG_IMMORTAL`  | `2`     | Nieśmiertelny NPC       |
| `NPC_FLAG_GHOST`     | `4`     | Duch (przezroczysty)    |

## Typy NPC (NPCTYPE\_)

Używane w polu `npctype` klasy `C_NPC`.

| Stała               | Wartość | Opis                           |
| ------------------- | ------- | ------------------------------ |
| `NPCTYPE_AMBIENT`    | `0`     | NPC w tle                      |
| `NPCTYPE_MAIN`       | `1`     | Główny/ważny NPC               |
| `NPCTYPE_FRIEND`     | `2`     | Przyjaciel gracza              |
| `NPCTYPE_OCAMBIENT`  | `3`     | Stary Obóz — NPC w tle (G1)   |
| `NPCTYPE_OCMAIN`     | `4`     | Stary Obóz — główny NPC (G1)  |
| `NPCTYPE_BL_AMBIENT` | `5`     | Obóz bandytów — NPC w tle     |
| `NPCTYPE_TAL_AMBIENT` | `6`    | Dolina — NPC w tle             |
| `NPCTYPE_BL_MAIN`    | `7`     | Obóz bandytów — główny NPC    |

## Taktyki walki (FAI\_)

Używane w polu `fight_tactic` klasy `C_NPC`.

### Ludzie

| Stała               | Wartość | Opis                          |
| ------------------- | ------- | ----------------------------- |
| `FAI_HUMAN_COWARD`   | `2`     | Ucieka z walki                |
| `FAI_HUMAN_NORMAL`   | `42`    | Standardowe zachowanie        |
| `FAI_HUMAN_STRONG`   | `3`     | Agresywny, używa combo       |
| `FAI_HUMAN_MASTER`   | `4`     | Ekspert, optymalne ruchy      |

### Potwory

| Stała                | Wartość | Opis               |
| -------------------- | ------- | ------------------ |
| `FAI_NAILED`          | `1`     | Stacjonarny        |
| `FAI_MONSTER_COWARD`  | `10`    | Potwór ucieka      |
| `FAI_GOBBO`           | `7`     | Goblin             |
| `FAI_SCAVENGER`       | `15`    | Padlinożerca       |
| `FAI_GIANT_RAT`       | `11`    | Wielki szczur      |
| `FAI_GIANT_BUG`       | `31`    | Wielki owad        |
| `FAI_BLOODFLY`        | `24`    | Krwiopijca         |
| `FAI_WARAN`           | `21`    | Waran              |
| `FAI_WOLF`            | `22`    | Wilk               |
| `FAI_MINECRAWLER`     | `5`     | Kopacz             |
| `FAI_LURKER`          | `9`     | Czarownik bagien   |
| `FAI_ZOMBIE`          | `23`    | Zombie             |
| `FAI_SNAPPER`         | `18`    | Snapper            |
| `FAI_SHADOWBEAST`     | `16`    | Mroczna bestia     |
| `FAI_HARPY`           | `36`    | Harpia             |
| `FAI_STONEGOLEM`      | `8`     | Kamienny golem     |
| `FAI_DEMON`           | `6`     | Demon              |
| `FAI_TROLL`           | `20`    | Troll              |
| `FAI_SWAMPSHARK`      | `19`    | Rekin bagienny     |
| `FAI_DRAGON`          | `39`    | Smok               |
| `FAI_MOLERAT`         | `40`    | Kretoszczur        |
| `FAI_ORC`             | `12`    | Ork                |
| `FAI_DRACONIAN`       | `41`    | Jaszczuroczłek     |
| `FAI_ALLIGATOR`       | `43`    | Aligator           |
| `FAI_GARGOYLE`        | `44`    | Gargulec           |
| `FAI_BEAR`            | `45`    | Niedźwiedź        |
| `FAI_STONEGUARDIAN`   | `46`    | Kamienny strażnik  |

## Materiały (MAT\_)

Używane w polu `material` klasy `C_Item`. Wpływają na dźwięki podnoszenia, upuszczania i trafień.

| Stała         | Wartość | Opis    |
| ------------- | ------- | ------- |
| `MAT_WOOD`     | `0`     | Drewno  |
| `MAT_STONE`    | `1`     | Kamień  |
| `MAT_METAL`    | `2`     | Metal   |
| `MAT_LEATHER`  | `3`     | Skóra   |
| `MAT_CLAY`     | `4`     | Glina   |
| `MAT_GLAS`     | `5`     | Szkło   |

## Zmysły (SENSE\_)

Używane w polu `senses` klasy `C_NPC`. Można łączyć operatorem bitowym OR.

| Stała         | Wartość | Opis              |
| ------------- | ------- | ----------------- |
| `SENSE_SEE`    | `1`     | NPC widzi          |
| `SENSE_HEAR`   | `2`     | NPC słyszy         |
| `SENSE_SMELL`  | `4`     | NPC czuje zapachy  |

## Talenty (NPC\_TALENT\_)

Używane z `HitChance[]` oraz `Npc_GetTalent()`/`Npc_SetTalent()`.

| Stała                        | Wartość | Opis                     |
| ---------------------------- | ------- | ------------------------ |
| `NPC_TALENT_UNKNOWN`          | `0`     | Nieznany                 |
| `NPC_TALENT_1H`               | `1`     | Broń jednoręczna         |
| `NPC_TALENT_2H`               | `2`     | Broń dwuręczna           |
| `NPC_TALENT_BOW`              | `3`     | Łuk                      |
| `NPC_TALENT_CROSSBOW`         | `4`     | Kusza                    |
| `NPC_TALENT_PICKLOCK`         | `5`     | Otwieranie zamków        |
| `NPC_TALENT_MAGE`             | `7`     | Krąg magii               |
| `NPC_TALENT_SNEAK`            | `8`     | Skradanie się            |
| `NPC_TALENT_REGENERATE`       | `9`     | Regeneracja              |
| `NPC_TALENT_FIREMASTER`       | `10`    | Mistrzostwo ognia        |
| `NPC_TALENT_ACROBAT`          | `11`    | Akrobatyka               |
| `NPC_TALENT_PICKPOCKET`       | `12`    | Kieszonkowstwo           |
| `NPC_TALENT_SMITH`            | `13`    | Kowalstwo                |
| `NPC_TALENT_RUNES`            | `14`    | Wytwarzanie run          |
| `NPC_TALENT_ALCHEMY`          | `15`    | Alchemia                 |
| `NPC_TALENT_TAKEANIMALTROPHY` | `16`    | Skórowanie / trofea      |
| `NPC_TALENT_FOREIGNLANGUAGE`  | `17`    | Obcy język               |
| `NPC_TALENT_WISPDETECTOR`     | `18`    | Wykrywanie błędnych ogników |

## Dziennik zadań

| Stała          | Wartość | Opis                |
| -------------- | ------- | ------------------- |
| `LOG_RUNNING`   | `1`     | Zadanie w toku      |
| `LOG_SUCCESS`   | `2`     | Zadanie ukończone   |
| `LOG_FAILED`    | `3`     | Zadanie nieudane    |
| `LOG_OBSOLETE`  | `4`     | Zadanie nieaktualne |
| `LOG_MISSION`   | `0`     | Typ: misja          |
| `LOG_NOTE`      | `1`     | Typ: notatka        |

## Postawy (ATT\_)

| Stała          | Wartość | Opis         |
| -------------- | ------- | ------------ |
| `ATT_FRIENDLY`  | `3`     | Przyjazny    |
| `ATT_NEUTRAL`   | `2`     | Neutralny    |
| `ATT_ANGRY`     | `1`     | Zły          |
| `ATT_HOSTILE`   | `0`     | Wrogi        |

## Sloty noszenia

Używane w polu `wear` klasy `C_Item`.

| Stała         | Wartość | Opis          |
| ------------- | ------- | ------------- |
| `WEAR_TORSO`   | `1`     | Slot tułowia  |
| `WEAR_HEAD`    | `2`     | Slot głowy    |
| `WEAR_EFFECT`  | `16`    | Slot efektu   |

## Kategorie ekwipunku (INV\_)

| Stała       | Wartość | Opis              |
| ----------- | ------- | ----------------- |
| `INV_WEAPON` | `1`     | Bronie            |
| `INV_ARMOR`  | `2`     | Zbroje            |
| `INV_RUNE`   | `3`     | Runy              |
| `INV_MAGIC`  | `4`     | Przedmioty magiczne |
| `INV_FOOD`   | `5`     | Jedzenie          |
| `INV_POTION` | `6`     | Mikstury          |
| `INV_DOC`    | `7`     | Dokumenty         |
| `INV_MISC`   | `8`     | Różne             |

## Zasięgi percepcji

| Stała                           | Wartość | Opis                              |
| ------------------------------- | ------- | --------------------------------- |
| `PERC_DIST_ACTIVE_MAX`           | `2000`  | Domyślny maks. zasięg            |
| `PERC_DIST_INTERMEDIAT`          | `1000`  | Zasięg pośredni                  |
| `PERC_DIST_DIALOG`               | `500`   | Zasięg dialogu                   |
| `PERC_DIST_MONSTER_ACTIVE_MAX`   | `1500`  | Maks. zasięg potworów            |
| `PERC_DIST_ORC_ACTIVE_MAX`       | `2500`  | Maks. zasięg orków               |
| `PERC_DIST_DRAGON_ACTIVE_MAX`    | `3500`  | Maks. zasięg smoków              |
| `PERC_DIST_SUMMONED_ACTIVE_MAX`  | `2000`  | Maks. zasięg przyzwanych stworzeń |

## Tryby ruchu

| Stała                | Wartość | Opis                     |
| ------------------- | ------- | ------------------------ |
| `NPC_RUN`            | `0`     | Bieganie                 |
| `NPC_WALK`           | `1`     | Chodzenie                |
| `NPC_SNEAK`          | `2`     | Skradanie                |
| `NPC_RUN_WEAPON`     | `128`   | Bieganie z bronią        |
| `NPC_WALK_WEAPON`    | `129`   | Chodzenie z bronią       |
| `NPC_SNEAK_WEAPON`   | `130`   | Skradanie z bronią       |

## Tryby walki

| Stała         | Wartość | Opis              |
| ------------- | ------- | ----------------- |
| `FMODE_NONE`   | `0`     | Brak broni         |
| `FMODE_FIST`   | `1`     | Pięści            |
| `FMODE_MELEE`  | `2`     | Broń biała        |
| `FMODE_FAR`    | `5`     | Broń dystansowa   |
| `FMODE_MAGIC`  | `7`     | Magia             |
