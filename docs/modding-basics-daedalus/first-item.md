---
sidebar_position: 3
title: "Mój pierwszy przedmiot"
description: "Tworzenie pierwszego przedmiotu w Gothic."
---

# Mój pierwszy przedmiot

W tym poradniku nauczysz się tworzyć przedmioty w języku Daedalus — od miecza, przez mikstury, po jedzenie.

## Klasa C_Item — co definiuje przedmiot?

Każdy przedmiot w Gothic to instancja klasy `C_Item`. Najważniejsze pola:

| Pole | Typ | Opis |
|------|-----|------|
| `name` | `string` | Nazwa wyświetlana w grze |
| `mainflag` | `int` | Główna kategoria (broń, zbroja, mikstura...) |
| `flags` | `int` | Typ szczegółowy (miecz, topór, łuk...) |
| `value` | `int` | Wartość w złocie |
| `visual` | `string` | Model 3D (`*.3DS`) |
| `material` | `int` | Materiał (metal, drewno, szkło...) |
| `damageTotal` | `int` | Łączne obrażenia (broń) |
| `damagetype` | `int` | Typ obrażeń (sieczne, obuchowe...) |
| `range` | `int` | Zasięg broni |
| `protection[]` | `int[]` | Ochrona (zbroje) |
| `cond_atr[]` | `int[]` | Wymagane atrybuty do użycia |
| `cond_value[]` | `int[]` | Wymagane wartości atrybutów |
| `on_state[]` | `func[]` | Funkcje wywoływane przy użyciu |
| `description` | `string` | Opis w menu ekwipunku |
| `TEXT[]` / `COUNT[]` | `string[]`/`int[]` | Linie opisu w tooltipie |

### Kategorie przedmiotów (mainflag)

| Stała | Opis |
|-------|------|
| `ITEM_KAT_NF` | Broń biała (melee) |
| `ITEM_KAT_FF` | Broń dystansowa |
| `ITEM_KAT_ARMOR` | Zbroja |
| `ITEM_KAT_FOOD` | Jedzenie |
| `ITEM_KAT_POTIONS` | Mikstury |
| `ITEM_KAT_DOCS` | Dokumenty |
| `ITEM_KAT_RUNE` | Runy i zwoje |
| `ITEM_KAT_NONE` | Inne (złoto, klucze, mission items) |

## Przykład 1: Broń biała (miecz)

Utwórz plik lub dodaj instancję do `Items/IT_Melee_Weapons.d`:

```daedalus
instance ItMw_Miecz_Konrada (C_Item)
{
    name        = "Miecz Konrada";

    // --- Kategoria ---
    mainflag    = ITEM_KAT_NF;         // broń biała
    flags       = ITEM_SWD;            // miecz jednoręczny
    material    = MAT_METAL;

    // --- Statystyki ---
    damageTotal = 35;                   // 35 pkt obrażeń
    damagetype  = DAM_EDGE;            // obrażenia sieczne
    range       = 100;                  // zasięg ataku

    // --- Wymagania ---
    cond_atr[2]   = ATR_STRENGTH;       // wymaga siły
    cond_value[2] = 20;                 // minimum 20 siły

    // --- Wartość ---
    value       = 250;                  // 250 złota

    // --- Model 3D ---
    visual      = "ItMw_025_1h_sld_sword_01.3DS";

    // --- Tooltip (opis w ekwipunku) ---
    description    = name;
    TEXT[2]  = NAME_Dam_Edge;       COUNT[2] = damageTotal;
    TEXT[3]  = NAME_Str_needed;     COUNT[3] = cond_value[2];
    TEXT[5]  = NAME_Value;          COUNT[5] = value;
};
```

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
    flags     = ITEM_MULTI;             // przedmiot stackowalny

    // --- Wartość i wygląd ---
    value     = 75;
    visual    = "ItPo_Health_01.3ds";
    material  = MAT_GLAS;              // szkło (dźwięk przy podnoszeniu)

    // --- Efekt użycia ---
    on_state[0] = Use_ItPo_Zdrowie_Konrada;
    scemeName   = "POTIONFAST";         // animacja picia
    wear        = WEAR_EFFECT;
    effect      = "SPELLFX_HEALTHPOTION"; // efekt wizualny

    // --- Tooltip ---
    description = name;
    TEXT[1]  = NAME_Bonus_HP;    COUNT[1] = 100;    // +100 HP
    TEXT[5]  = NAME_Value;       COUNT[5] = value;
};

// Funkcja wywoływana po użyciu
func void Use_ItPo_Zdrowie_Konrada ()
{
    Npc_ChangeAttribute (self, ATR_HITPOINTS, 100);   // +100 HP
};
```

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
    scemeName   = "FOOD";               // animacja jedzenia

    description = name;
    TEXT[1]  = NAME_Bonus_HP;    COUNT[1] = 15;
    TEXT[5]  = NAME_Value;       COUNT[5] = value;
};

func void Use_ItFo_Chleb_Konrada ()
{
    Npc_ChangeAttribute (self, ATR_HITPOINTS, 15);
};
```

## Dawanie przedmiotu NPC

Aby NPC miał przedmiot w ekwipunku, użyj w definicji NPC:

```daedalus
// W instancji NPC:
EquipItem (self, ItMw_Miecz_Konrada);              // zakłada (broń/zbroję)
CreateInvItems (self, ItPo_Zdrowie_Konrada, 5);     // 5 mikstur w plecaku
CreateInvItems (self, ItFo_Chleb_Konrada, 3);       // 3 chleby
CreateInvItems (self, ItMi_Gold, 100);               // 100 złota
```

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
