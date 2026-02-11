---
sidebar_position: 3
title: "Mój pierwszy przedmiot"
description: "Tworzenie pierwszego przedmiotu w Gothic."
---

# Mój pierwszy przedmiot

W tym poradniku nauczysz się tworzyć przedmioty w języku Daedalus — od miecza, przez mikstury, po jedzenie.

## Klasa C_Item — co definiuje przedmiot?

Każdy przedmiot w Gothic to instancja klasy `C_Item`. Najważniejsze pola:

| Pole                 | Typ                | Opis                                         |
| -------------------- | ------------------ | -------------------------------------------- |
| `name`               | `string`           | Nazwa wyświetlana w grze                     |
| `mainflag`           | `int`              | Główna kategoria (broń, zbroja, mikstura...) |
| `flags`              | `int`              | Typ szczegółowy (miecz, topór, łuk...)       |
| `value`              | `int`              | Wartość w złocie                             |
| `visual`             | `string`           | Model 3D (`*.3DS`)                           |
| `material`           | `int`              | Materiał (metal, drewno, szkło...)           |
| `damageTotal`        | `int`              | Łączne obrażenia (broń)                      |
| `damagetype`         | `int`              | Typ obrażeń (sieczne, obuchowe...)           |
| `range`              | `int`              | Zasięg broni                                 |
| `protection[]`       | `int[]`            | Ochrona (zbroje)                             |
| `cond_atr[]`         | `int[]`            | Wymagane atrybuty do użycia                  |
| `cond_value[]`       | `int[]`            | Wymagane wartości atrybutów                  |
| `on_state[]`         | `func[]`           | Funkcje wywoływane przy użyciu               |
| `description`        | `string`           | Opis w menu ekwipunku                        |
| `TEXT[]` / `COUNT[]` | `string[]`/`int[]` | Linie opisu w tooltipie                      |

### Kategorie przedmiotów (mainflag)

| Stała              | Opis                                |
| ------------------ | ----------------------------------- |
| `ITEM_KAT_NF`      | Broń biała (melee)                  |
| `ITEM_KAT_FF`      | Broń dystansowa                     |
| `ITEM_KAT_ARMOR`   | Zbroja                              |
| `ITEM_KAT_FOOD`    | Jedzenie                            |
| `ITEM_KAT_POTIONS` | Mikstury                            |
| `ITEM_KAT_DOCS`    | Dokumenty                           |
| `ITEM_KAT_RUNE`    | Runy i zwoje                        |
| `ITEM_KAT_NONE`    | Inne (złoto, klucze, mission items) |

## Przykład 1: Broń biała (miecz)

Utwórz plik lub dodaj instancję do `Items/IT_Melee_Weapons.d`:

```daedalus
instance ItMw_Miecz_Konrada (C_Item)
{
    name        = "Miecz Konrada";

    // --- Kategoria ---
    mainflag    = ITEM_KAT_NF;
    flags       = ITEM_SWD;
    material    = MAT_METAL;

    // --- Statystyki ---
    damageTotal = 35;
    damagetype  = DAM_EDGE;
    range       = 100;

    // --- Wymagania ---
    cond_atr[2]   = ATR_STRENGTH;
    cond_value[2] = 20;

    // --- Wartość ---
    value       = 250;

    // --- Model 3D ---
    visual      = "ItMw_025_1h_sld_sword_01.3DS";

    // --- Tooltip (opis w ekwipunku) ---
    description    = name;
    TEXT[2]  = NAME_Dam_Edge;       COUNT[2] = damageTotal;
    TEXT[3]  = NAME_Str_needed;     COUNT[3] = cond_value[2];
    TEXT[5]  = NAME_Value;          COUNT[5] = value;
};
```

| Pole            | Wartość                          | Opis                             |
| --------------- | -------------------------------- | -------------------------------- |
| `name`          | `"Miecz Konrada"`                | Nazwa wyświetlana w grze          |
| `mainflag`      | `ITEM_KAT_NF`                   | Kategoria: broń biała            |
| `flags`         | `ITEM_SWD`                       | Miecz jednoręczny                |
| `material`      | `MAT_METAL`                      | Metal (wpływa na dźwięk)         |
| `damageTotal`   | `35`                             | 35 punktów obrażeń               |
| `damagetype`    | `DAM_EDGE`                       | Obrażenia sieczne                 |
| `range`         | `100`                            | Zasięg ataku w jednostkach        |
| `cond_atr[2]`   | `ATR_STRENGTH`                   | Wymaga atrybutu siły             |
| `cond_value[2]` | `20`                             | Minimum 20 siły do użycia        |
| `value`         | `250`                            | Wartość 250 złota                |
| `visual`        | `"ItMw_025_1h_sld_sword_01.3DS"` | Plik modelu 3D                   |
| `description`   | `name`                           | Nagłówek tooltipa = nazwa itemu   |
| `TEXT/COUNT`    | —                                | Linie tooltipa w ekwipunku       |

:::info
Pole `flags` określa typ broni: `ITEM_SWD` (miecz 1H), `ITEM_AXE` (topór 1H), `ITEM_2HD_SWD` (miecz 2H), `ITEM_2HD_AXE` (topór 2H).
:::

## Przykład 2: Mikstura

```daedalus
instance ItPo_Zdrowie_Konrada (C_Item)
{
    name      = "Mikstura zdrowia Konrada";

    // --- Kategoria ---
    mainflag  = ITEM_KAT_POTIONS;
    flags     = ITEM_MULTI;

    // --- Wartość i wygląd ---
    value     = 75;
    visual    = "ItPo_Health_01.3ds";
    material  = MAT_GLAS;

    // --- Efekt użycia ---
    on_state[0] = Use_ItPo_Zdrowie_Konrada;
    scemeName   = "POTIONFAST";
    wear        = WEAR_EFFECT;
    effect      = "SPELLFX_HEALTHPOTION";

    // --- Tooltip ---
    description = name;
    TEXT[1]  = NAME_Bonus_HP;    COUNT[1] = 100;
    TEXT[5]  = NAME_Value;       COUNT[5] = value;
};

func void Use_ItPo_Zdrowie_Konrada ()
{
    Npc_ChangeAttribute (self, ATR_HITPOINTS, 100);
};
```

| Pole                                            | Wartość                  | Opis                             |
| ----------------------------------------------- | ------------------------ | -------------------------------- |
| `name`                                          | `"Mikstura zdrowia Konrada"` | Nazwa wyświetlana w grze     |
| `mainflag`                                      | `ITEM_KAT_POTIONS`       | Kategoria: mikstury              |
| `flags`                                         | `ITEM_MULTI`             | Przedmiot stackowalny            |
| `value`                                         | `75`                     | Wartość 75 złota                 |
| `visual`                                        | `"ItPo_Health_01.3ds"`   | Plik modelu 3D                   |
| `material`                                      | `MAT_GLAS`               | Szkło (dźwięk przy podnoszeniu)   |
| `on_state[0]`                                   | `Use_ItPo_Zdrowie_Konrada` | Funkcja wywoływana przy użyciu |
| `scemeName`                                     | `"POTIONFAST"`           | Animacja picia                   |
| `wear`                                          | `WEAR_EFFECT`            | Włącza efekt wizualny przy użyciu   |
| `effect`                                        | `"SPELLFX_HEALTHPOTION"` | Efekt wizualny odtwarzany przy użyciu |
| `description`                                   | `name`                   | Nagłówek tooltipa = nazwa itemu    |
| `TEXT[1]/COUNT[1]`                              | `+100 HP`                | Tooltip: bonus do zdrowia        |
| `TEXT[5]/COUNT[5]`                              | value                    | Tooltip: wartość przedmiotu       |
| `Npc_ChangeAttribute(self, ATR_HITPOINTS, 100)` | —                        | Przywraca 100 HP przy użyciu      |

:::tip
`ITEM_MULTI` sprawia, że przedmioty tego samego typu stackują się w ekwipunku (zamiast zajmować osobne sloty).
:::

## Przykład 3: Jedzenie

```daedalus
instance ItFo_Chleb_Konrada (C_Item)
{
    name      = "Chleb Konrada";
    mainflag  = ITEM_KAT_FOOD;
    flags     = ITEM_MULTI;
    value     = 10;
    visual    = "ItFo_Bread.3ds";
    material  = MAT_LEATHER;

    on_state[0] = Use_ItFo_Chleb_Konrada;
    scemeName   = "FOOD";

    description = name;
    TEXT[1]  = NAME_Bonus_HP;    COUNT[1] = 15;
    TEXT[5]  = NAME_Value;       COUNT[5] = value;
};

func void Use_ItFo_Chleb_Konrada ()
{
    Npc_ChangeAttribute (self, ATR_HITPOINTS, 15);
};
```

| Pole                                           | Wartość        | Opis                             |
| ---------------------------------------------- | -------------- | -------------------------------- |
| `name`                                         | `"Chleb Konrada"` | Nazwa wyświetlana w grze       |
| `mainflag`                                     | `ITEM_KAT_FOOD` | Kategoria: jedzenie             |
| `flags`                                        | `ITEM_MULTI`   | Przedmiot stackowalny            |
| `value`                                        | `10`           | Wartość 10 złota                  |
| `visual`                                       | `"ItFo_Bread.3ds"` | Plik modelu 3D              |
| `material`                                     | `MAT_LEATHER`  | Materiał (wpływa na dźwięki)      |
| `on_state[0]`                                  | `Use_ItFo_Chleb_Konrada` | Funkcja wywoływana przy użyciu |
| `scemeName`                                    | `"FOOD"`       | Animacja jedzenia                |
| `description`                                  | `name`         | Nagłówek tooltipa = nazwa itemu   |
| `TEXT[1]/COUNT[1]`                             | `+15 HP`       | Tooltip: bonus do zdrowia        |
| `TEXT[5]/COUNT[5]`                             | value          | Tooltip: wartość przedmiotu       |
| `Npc_ChangeAttribute(self, ATR_HITPOINTS, 15)` | —              | Przywraca 15 HP przy użyciu       |

## Dawanie przedmiotu NPC

Aby NPC miał przedmiot w ekwipunku, użyj w definicji NPC:

```daedalus
EquipItem (self, ItMw_Miecz_Konrada);
CreateInvItems (self, ItPo_Zdrowie_Konrada, 5);
CreateInvItems (self, ItFo_Chleb_Konrada, 3);
CreateInvItems (self, ItMi_Gold, 100);
```

| Wywołanie                                       | Opis                            |
| ----------------------------------------------- | ------------------------------- |
| `EquipItem(self, ItMw_Miecz_Konrada)`           | Zakłada przedmiot (broń/zbroję) |
| `CreateInvItems(self, ItPo_Zdrowie_Konrada, 5)` | 5 mikstur w plecaku             |
| `CreateInvItems(self, ItFo_Chleb_Konrada, 3)`   | 3 chleby w plecaku              |
| `CreateInvItems(self, ItMi_Gold, 100)`          | 100 sztuk złota                 |

:::warning
`EquipItem` automatycznie **zakłada** przedmiot (NPC będzie trzymał broń lub nosił zbroję). `CreateInvItems` tylko dodaje do ekwipunku.
:::

## Rejestracja w Gothic.src

Dodaj plik z przedmiotami do `Gothic.src` — **przed** definicjami NPC:

```
Items\IT_Melee_Weapons.d
Items\IT_Potions.d
Items\IT_Food.d
```

## Podsumowanie

Tworzenie przedmiotów wymaga:

1. **Instancji** klasy `C_Item` z odpowiednim `mainflag` i `flags`
2. Ustawienia **statystyk** (obrażenia, ochrona, wymagania)
3. Podania **modelu 3D** (`.3DS`)
4. Dla przedmiotów używalnych — **funkcji on_state** zmieniającej atrybuty
5. **Tooltipa** (TEXT/COUNT) do wyświetlania informacji w grze
6. **Rejestracji** w `Gothic.src`
