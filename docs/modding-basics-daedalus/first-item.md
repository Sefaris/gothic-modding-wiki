---
sidebar_position: 3
title: "My First Item"
description: "Creating your first item in Gothic."
---

# My First Item

In this tutorial you will learn how to create items in Daedalus — from swords, through potions, to food.

## The C_Item Class — What Defines an Item?

Every item in Gothic is an instance of the `C_Item` class. The most important fields are:

| Field                | Type               | Description                              |
| -------------------- | ------------------ | ---------------------------------------- |
| `name`               | `string`           | Name displayed in game                   |
| `mainflag`           | `int`              | Main category (weapon, armor, potion...) |
| `flags`              | `int`              | Detailed type (sword, axe, bow...)       |
| `value`              | `int`              | Value in gold                            |
| `visual`             | `string`           | 3D model (`*.3DS`)                       |
| `material`           | `int`              | Material (metal, wood, glass...)         |
| `damageTotal`        | `int`              | Total damage (weapons)                   |
| `damagetype`         | `int`              | Damage type (edge, blunt...)             |
| `range`              | `int`              | Weapon range                             |
| `protection[]`       | `int[]`            | Protection (armors)                      |
| `cond_atr[]`         | `int[]`            | Required attributes to use               |
| `cond_value[]`       | `int[]`            | Required attribute values                |
| `on_state[]`         | `func[]`           | Functions called on use                  |
| `description`        | `string`           | Description in the inventory menu        |
| `TEXT[]` / `COUNT[]` | `string[]`/`int[]` | Description lines in tooltip             |

### Item Categories (mainflag)

| Constant           | Description                       |
| ------------------ | --------------------------------- |
| `ITEM_KAT_NF`      | Melee weapon                      |
| `ITEM_KAT_FF`      | Ranged weapon                     |
| `ITEM_KAT_ARMOR`   | Armor                             |
| `ITEM_KAT_FOOD`    | Food                              |
| `ITEM_KAT_POTIONS` | Potions                           |
| `ITEM_KAT_DOCS`    | Documents                         |
| `ITEM_KAT_RUNE`    | Runes and scrolls                 |
| `ITEM_KAT_NONE`    | Other (gold, keys, mission items) |

## Example 1: Melee Weapon (Sword)

Create a file or add an instance to `Items/IT_Melee_Weapons.d`:

```daedalus
instance ItMw_Miecz_Konrada (C_Item)
{
    name        = "Konrad's Sword";

    mainflag    = ITEM_KAT_NF;
    flags       = ITEM_SWD;
    material    = MAT_METAL;

    damageTotal = 35;
    damagetype  = DAM_EDGE;
    range       = 100;

    cond_atr[2]   = ATR_STRENGTH;
    cond_value[2] = 20;

    value       = 250;

    visual      = "ItMw_025_1h_sld_sword_01.3DS";

    description    = name;
    TEXT[2]  = NAME_Dam_Edge;       COUNT[2] = damageTotal;
    TEXT[3]  = NAME_Str_needed;     COUNT[3] = cond_value[2];
    TEXT[5]  = NAME_Value;          COUNT[5] = value;
};
```

| Field           | Value                            | Description                      |
| --------------- | -------------------------------- | -------------------------------- |
| `name`          | `"Konrad's Sword"`               | Item name displayed in game      |
| `mainflag`      | `ITEM_KAT_NF`                    | Melee weapon category            |
| `flags`         | `ITEM_SWD`                       | One-handed sword                 |
| `material`      | `MAT_METAL`                      | Metal (affects pickup/hit sound) |
| `damageTotal`   | `35`                             | 35 damage points                 |
| `damagetype`    | `DAM_EDGE`                       | Edge (slashing) damage           |
| `range`         | `100`                            | Attack range in units            |
| `cond_atr[2]`   | `ATR_STRENGTH`                   | Requires strength attribute      |
| `cond_value[2]` | `20`                             | Minimum 20 strength to use       |
| `value`         | `250`                            | Worth 250 gold                   |
| `visual`        | `"ItMw_025_1h_sld_sword_01.3DS"` | 3D model file                    |
| `description`   | `name`                           | Tooltip header = item name       |
| `TEXT/COUNT`    | —                                | Tooltip lines shown in inventory |

:::info
The `flags` field determines the weapon type: `ITEM_SWD` (1H sword), `ITEM_AXE` (1H axe), `ITEM_2HD_SWD` (2H sword), `ITEM_2HD_AXE` (2H axe).
:::

## Example 2: Potion

```daedalus
instance ItPo_Zdrowie_Konrada (C_Item)
{
    name      = "Konrad's Health Potion";

    mainflag  = ITEM_KAT_POTIONS;
    flags     = ITEM_MULTI;

    value     = 75;
    visual    = "ItPo_Health_01.3ds";
    material  = MAT_GLAS;

    on_state[0] = Use_ItPo_Zdrowie_Konrada;
    scemeName   = "POTIONFAST";
    wear        = WEAR_EFFECT;
    effect      = "SPELLFX_HEALTHPOTION";

    description = name;
    TEXT[1]  = NAME_Bonus_HP;    COUNT[1] = 100;
    TEXT[5]  = NAME_Value;       COUNT[5] = value;
};

func void Use_ItPo_Zdrowie_Konrada ()
{
    Npc_ChangeAttribute (self, ATR_HITPOINTS, 100);
};
```

| Field                                           | Value                      | Description                       |
| ----------------------------------------------- | -------------------------- | --------------------------------- |
| `name`                                          | `"Konrad's Health Potion"` | Item name displayed in game       |
| `mainflag`                                      | `ITEM_KAT_POTIONS`         | Potion category                   |
| `flags`                                         | `ITEM_MULTI`               | Stackable item                    |
| `value`                                         | `75`                       | Worth 75 gold                     |
| `visual`                                        | `"ItPo_Health_01.3ds"`     | 3D model file                     |
| `material`                                      | `MAT_GLAS`                 | Glass (affects pickup sound)      |
| `on_state[0]`                                   | `Use_ItPo_Zdrowie_Konrada` | Function called when item is used |
| `scemeName`                                     | `"POTIONFAST"`             | Drinking animation                |
| `wear`                                          | `WEAR_EFFECT`              | Enables visual effect on use      |
| `effect`                                        | `"SPELLFX_HEALTHPOTION"`   | Visual effect played on use       |
| `description`                                   | `name`                     | Tooltip header = item name        |
| `TEXT[1]/COUNT[1]`                              | `+100 HP`                  | Tooltip: health bonus             |
| `TEXT[5]/COUNT[5]`                              | value                      | Tooltip: item value               |
| `Npc_ChangeAttribute(self, ATR_HITPOINTS, 100)` | —                          | Restores 100 HP on use            |

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

| Field                                          | Value                    | Description                 |
| ---------------------------------------------- | ------------------------ | --------------------------- |
| `name`                                         | `"Konrad's Bread"`       | Item name displayed in game |
| `mainflag`                                     | `ITEM_KAT_FOOD`          | Food category               |
| `flags`                                        | `ITEM_MULTI`             | Stackable item              |
| `value`                                        | `10`                     | Worth 10 gold               |
| `visual`                                       | `"ItFo_Bread.3ds"`       | 3D model file               |
| `material`                                     | `MAT_LEATHER`            | Material (affects sounds)   |
| `on_state[0]`                                  | `Use_ItFo_Chleb_Konrada` | Function called on use      |
| `scemeName`                                    | `"FOOD"`                 | Eating animation            |
| `description`                                  | `name`                   | Tooltip header = item name  |
| `TEXT[1]/COUNT[1]`                             | `+15 HP`                 | Tooltip: health bonus       |
| `TEXT[5]/COUNT[5]`                             | value                    | Tooltip: item value         |
| `Npc_ChangeAttribute(self, ATR_HITPOINTS, 15)` | —                        | Restores 15 HP on use       |

## Giving Items to NPCs

To have an NPC carry an item in their inventory, use in the NPC definition:

```daedalus
EquipItem (self, ItMw_Miecz_Konrada);
CreateInvItems (self, ItPo_Zdrowie_Konrada, 5);
CreateInvItems (self, ItFo_Chleb_Konrada, 3);
CreateInvItems (self, ItMi_Gold, 100);
```

| Call                                            | Description                    |
| ----------------------------------------------- | ------------------------------ |
| `EquipItem(self, ItMw_Miecz_Konrada)`           | Equips the item (weapon/armor) |
| `CreateInvItems(self, ItPo_Zdrowie_Konrada, 5)` | 5 potions in backpack          |
| `CreateInvItems(self, ItFo_Chleb_Konrada, 3)`   | 3 bread loaves in backpack     |
| `CreateInvItems(self, ItMi_Gold, 100)`          | 100 gold                       |

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
