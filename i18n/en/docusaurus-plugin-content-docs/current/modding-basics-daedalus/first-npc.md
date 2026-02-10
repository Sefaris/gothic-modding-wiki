---
sidebar_position: 2
title: "My First NPC"
description: "Creating your first non-player character in Gothic."
---

# My First NPC

In this tutorial you will learn how to create a simple non-player character (NPC) in Daedalus. We will create a farmer who stands in the market and has his own daily routine.

## Prerequisites

Before starting, make sure that:
- You have the Gothic scripts installed (`Scripts/Content/` folder)
- You understand the [script structure](./script-structure.md)
- You know what an instance and prototype are in Daedalus

## The C_NPC Class — What Defines a Character?

Every NPC in Gothic is an **instance** of the `C_NPC` class. The most important fields are:

| Field | Type | Description |
|-------|------|-------------|
| `name` | `string[5]` | NPC name (displayed in game) |
| `guild` | `int` | Guild (e.g., `GIL_MIL` — militia, `GIL_OUT` — guildless) |
| `id` | `int` | Unique NPC identifier |
| `voice` | `int` | Voice number (linked to audio files) |
| `level` | `int` | Character level |
| `attribute[]` | `int[]` | Attributes: HP, mana, strength, dexterity |
| `protection[]` | `int[]` | Protection against damage types |
| `fight_tactic` | `int` | Combat tactic (e.g., `FAI_HUMAN_COWARD`) |
| `daily_routine` | `func` | NPC daily routine function |
| `npctype` | `int` | NPC type (main, friend, enemy) |
| `flags` | `int` | Flags (e.g., `NPC_FLAG_IMMORTAL`) |

## The Npc_Default Prototype

Before creating our own character, we need to understand the **prototype** `Npc_Default`. This is a template that almost all characters in the game inherit from:

```daedalus
prototype Npc_Default (C_NPC)
{
    // Basic attributes
    attribute[ATR_STRENGTH]      = 10;
    attribute[ATR_DEXTERITY]     = 10;
    attribute[ATR_MANA_MAX]      = 10;
    attribute[ATR_MANA]          = 10;
    attribute[ATR_HITPOINTS_MAX] = 40;
    attribute[ATR_HITPOINTS]     = 40;

    // Hit chances (0% — cannot fight with this weapon type)
    HitChance[NPC_TALENT_1H]       = 0;
    HitChance[NPC_TALENT_2H]       = 0;
    HitChance[NPC_TALENT_BOW]      = 0;
    HitChance[NPC_TALENT_CROSSBOW] = 0;

    // Protection (0 — no protection)
    protection[PROT_EDGE]   = 0;
    protection[PROT_BLUNT]  = 0;
    protection[PROT_POINT]  = 0;
    protection[PROT_FIRE]   = 0;
    protection[PROT_MAGIC]  = 0;

    // Default settings
    damagetype   = DAM_BLUNT;
    senses       = SENSE_HEAR | SENSE_SEE;
    senses_range = PERC_DIST_ACTIVE_MAX;
};
```

:::info
The prototype sets **default values**. Each NPC instance can override any of them.
:::

## Creating an NPC Instance

Let's create a farmer named **Konrad**. Create a file `BAU_900_Konrad.d` in the `Story/NPC/` folder:

```daedalus
instance BAU_900_Konrad (Npc_Default)
{
    // --- Basic information ---
    name        = "Konrad";
    guild       = GIL_OUT;              // guildless (farmer)
    id          = 900;                  // unique number
    voice       = 90;                   // voice number
    flags       = 0;                    // 0 = normal, NPC_FLAG_IMMORTAL = immortal
    npctype     = NPCTYPE_MAIN;         // important character

    // --- Attributes ---
    attribute[ATR_STRENGTH]      = 30;
    attribute[ATR_DEXTERITY]     = 15;
    attribute[ATR_HITPOINTS_MAX] = 80;
    attribute[ATR_HITPOINTS]     = 80;
    level                        = 5;

    // --- Combat ---
    fight_tactic = FAI_HUMAN_COWARD;    // flees from combat

    // --- Equipment ---
    EquipItem (self, ItMw_1h_Bau_Axe);     // farmer's axe
    CreateInvItems (self, ItMi_Gold, 25);   // 25 gold coins
    CreateInvItems (self, ItFo_Apple, 3);   // 3 apples

    // --- Appearance ---
    B_SetNpcVisual (self, MALE, "Hum_Head_Bald", Face_N_NormalBart_Senyan, BodyTex_N, ITAR_Bau_L);
    Mdl_SetModelFatness (self, 1);                      // body fat
    Mdl_ApplyOverlayMds (self, "Humans_Relaxed.mds");   // relaxed animation

    // --- Skills ---
    B_GiveNpcTalents (self);
    B_SetFightSkills (self, 15);    // 15% hit chance

    // --- Daily routine ---
    daily_routine = Rtn_Start_900;
};
```

:::tip
Naming convention: `BAU` (Bauer = farmer), `900` (unique ID), `Konrad` (name). In the original Gothic scripts, each guild has its own prefix.
:::

## Daily Routine

Every NPC needs a **daily routine** — a function that defines what they do at each hour:

```daedalus
func void Rtn_Start_900 ()
{
    // From 7:00 to 12:00 — stands by the well
    TA_Stand_ArmsCrossed (07, 00,  12, 00, "NW_CITY_WELL_01");

    // From 12:00 to 13:00 — eats a meal
    TA_Sit_Bench         (12, 00,  13, 00, "NW_CITY_BENCH_01");

    // From 13:00 to 20:00 — works at the farm
    TA_Smalltalk         (13, 00,  20, 00, "NW_FARM1_PATH_01");

    // From 20:00 to 7:00 — sleeps
    TA_Sleep             (20, 00,  07, 00, "NW_FARM1_BED_01");
};
```

:::warning
Waypoints (e.g., `"NW_CITY_WELL_01"`) must exist in the game world (`.zen` file). If you use a non-existent waypoint, the NPC will appear at the `(0, 0, 0)` point.
:::

Available daily routine functions:

| Function | Description |
|----------|-------------|
| `TA_Stand_ArmsCrossed` | Stands with arms crossed |
| `TA_Stand_Guarding` | Stands on guard |
| `TA_Sit_Bench` | Sits on a bench |
| `TA_Sleep` | Sleeps |
| `TA_Smalltalk` | Talks with nearby NPCs |
| `TA_Smith` | Smithing |
| `TA_Eat` | Eats |
| `TA_Practice` | Practices |

## Registration in Gothic.src

For the game to load the new NPC, you need to add the file to `Gothic.src`:

```
Story\NPC\BAU_900_Konrad.d
```

:::danger
File order in `Gothic.src` matters! The NPC must be declared **after** the `Npc_Default` prototype, but **before** dialogs.
:::

## Placing the NPC in the World

To make the NPC appear in the game world, you need to **insert** (spawn) them in the startup function of the corresponding world. In the `Startup.d` file (or the appropriate world file) add:

```daedalus
func void Startup_NewWorld ()
{
    // ... other NPCs ...
    Wld_InsertNpc (BAU_900_Konrad, "NW_CITY_WELL_01");
};
```

`Wld_InsertNpc` inserts the character into the world at the given waypoint. From this moment, the NPC will start following their daily routine.

## Summary

Creating an NPC requires:
1. An **instance** inheriting from `Npc_Default`
2. Setting **attributes** (strength, HP, level)
3. Configuring **appearance** (model, texture, armor)
4. Defining a **daily routine**
5. **Registration** in `Gothic.src`
6. **Inserting** into the world in `Startup.d`
