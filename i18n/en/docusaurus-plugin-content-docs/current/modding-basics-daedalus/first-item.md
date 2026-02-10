---
sidebar_position: 3
title: "My First Item"
description: "Creating your first item in Gothic."
---

# My First Item

In this tutorial you will learn how to create items in Daedalus — from swords, through potions, to food.

## The C_Item Class — What Defines an Item?

Every item in Gothic is an instance of the `C_Item` class. The most important fields are:

| Field | Type | Description |
|-------|------|-------------|
| `name` | `string` | Name displayed in game |
| `mainflag` | `int` | Main category (weapon, armor, potion...) |
| `flags` | `int` | Detailed type (sword, axe, bow...) |
| `value` | `int` | Value in gold |
| `visual` | `string` | 3D model (`*.3DS`) |
| `material` | `int` | Material (metal, wood, glass...) |
| `damageTotal` | `int` | Total damage (weapons) |
| `damagetype` | `int` | Damage type (edge, blunt...) |
| `range` | `int` | Weapon range |
| `protection[]` | `int[]` | Protection (armors) |
| `cond_atr[]` | `int[]` | Required attributes to use |
| `cond_value[]` | `int[]` | Required attribute values |
| `on_state[]` | `func[]` | Functions called on use |
| `description` | `string` | Description in the inventory menu |
| `TEXT[]` / `COUNT[]` | `string[]`/`int[]` | Description lines in tooltip |

### Item Categories (mainflag)

| Constant | Description |
|----------|-------------|
| `ITEM_KAT_NF` | Melee weapon |
| `ITEM_KAT_FF` | Ranged weapon |
| `ITEM_KAT_ARMOR` | Armor |
| `ITEM_KAT_FOOD` | Food |
| `ITEM_KAT_POTIONS` | Potions |
| `ITEM_KAT_DOCS` | Documents |
| `ITEM_KAT_RUNE` | Runes and scrolls |
| `ITEM_KAT_NONE` | Other (gold, keys, mission items) |

## Example 1: Melee Weapon (Sword)

Create a file or add an instance to `Items/IT_Melee_Weapons.d`:

```daedalus
instance ItMw_Miecz_Konrada (C_Item)
{
    name        = "Konrad's Sword";

    // --- Category ---
    mainflag    = ITEM_KAT_NF;         // melee weapon
    flags       = ITEM_SWD;            // one-handed sword
    material    = MAT_METAL;

    // --- Stats ---
    damageTotal = 35;                   // 35 damage points
    damagetype  = DAM_EDGE;            // edge damage
    range       = 100;                  // attack range

    // --- Requirements ---
    cond_atr[2]   = ATR_STRENGTH;       // requires strength
    cond_value[2] = 20;                 // minimum 20 strength

    // --- Value ---
    value       = 250;                  // 250 gold

    // --- 3D Model ---
    visual      = "ItMw_025_1h_sld_sword_01.3DS";

    // --- Tooltip (inventory description) ---
    description    = name;
    TEXT[2]  = NAME_Dam_Edge;       COUNT[2] = damageTotal;
    TEXT[3]  = NAME_Str_needed;     COUNT[3] = cond_value[2];
    TEXT[5]  = NAME_Value;          COUNT[5] = value;
};
```

:::info
The `flags` field determines the weapon type: `ITEM_SWD` (1H sword), `ITEM_AXE` (1H axe), `ITEM_2HD_SWD` (2H sword), `ITEM_2HD_AXE` (2H axe).
:::

## Example 2: Potion

```daedalus
instance ItPo_Zdrowie_Konrada (C_Item)
{
    name      = "Konrad's Health Potion";

    // --- Category ---
    mainflag  = ITEM_KAT_POTIONS;
    flags     = ITEM_MULTI;             // stackable item

    // --- Value and appearance ---
    value     = 75;
    visual    = "ItPo_Health_01.3ds";
    material  = MAT_GLAS;              // glass (pickup sound)

    // --- Use effect ---
    on_state[0] = Use_ItPo_Zdrowie_Konrada;
    scemeName   = "POTIONFAST";         // drinking animation
    wear        = WEAR_EFFECT;
    effect      = "SPELLFX_HEALTHPOTION"; // visual effect

    // --- Tooltip ---
    description = name;
    TEXT[1]  = NAME_Bonus_HP;    COUNT[1] = 100;    // +100 HP
    TEXT[5]  = NAME_Value;       COUNT[5] = value;
};

// Function called after use
func void Use_ItPo_Zdrowie_Konrada ()
{
    Npc_ChangeAttribute (self, ATR_HITPOINTS, 100);   // +100 HP
};
```

:::tip
`ITEM_MULTI` makes items of the same type stack in the inventory (instead of taking up separate slots).
:::

## Example 3: Food

```daedalus
instance ItFo_Chleb_Konrada (C_Item)
{
    name      = "Konrad's Bread";
    mainflag  = ITEM_KAT_FOOD;
    flags     = ITEM_MULTI;
    value     = 10;
    visual    = "ItFo_Bread.3ds";
    material  = MAT_LEATHER;

    on_state[0] = Use_ItFo_Chleb_Konrada;
    scemeName   = "FOOD";               // eating animation

    description = name;
    TEXT[1]  = NAME_Bonus_HP;    COUNT[1] = 15;
    TEXT[5]  = NAME_Value;       COUNT[5] = value;
};

func void Use_ItFo_Chleb_Konrada ()
{
    Npc_ChangeAttribute (self, ATR_HITPOINTS, 15);
};
```

## Giving Items to NPCs

To have an NPC carry an item in their inventory, use in the NPC definition:

```daedalus
// In the NPC instance:
EquipItem (self, ItMw_Miecz_Konrada);              // equips (weapon/armor)
CreateInvItems (self, ItPo_Zdrowie_Konrada, 5);     // 5 potions in backpack
CreateInvItems (self, ItFo_Chleb_Konrada, 3);       // 3 bread loaves
CreateInvItems (self, ItMi_Gold, 100);               // 100 gold
```

:::warning
`EquipItem` automatically **equips** the item (the NPC will hold the weapon or wear the armor). `CreateInvItems` only adds to the inventory.
:::

## Registration in Gothic.src

Add the item files to `Gothic.src` — **before** NPC definitions:

```
Items\IT_Melee_Weapons.d
Items\IT_Potions.d
Items\IT_Food.d
```

## Summary

Creating items requires:
1. An **instance** of the `C_Item` class with appropriate `mainflag` and `flags`
2. Setting **stats** (damage, protection, requirements)
3. Providing a **3D model** (`.3DS`)
4. For usable items — an **on_state function** that modifies attributes
5. A **tooltip** (TEXT/COUNT) to display information in game
6. **Registration** in `Gothic.src`
