---
sidebar_position: 4
title: "My First Quest"
description: "Creating your first quest in Gothic."
---

# My First Quest

In this tutorial you will learn how to create a complete quest — from talking to an NPC, through the quest log, to receiving a reward.

## How Do Quests Work in Gothic?

The quest system in Gothic is based on three elements:

1. **Dialogs** (`C_INFO`) — conversations with NPCs that start and end quests
2. **Quest Log** — entries visible to the player
3. **State variables** — tracking quest progress

## The C_INFO Class — Dialogs

Each dialog option is an instance of the `C_INFO` class:

| Field         | Type     | Description                                     |
| ------------- | -------- | ----------------------------------------------- |
| `npc`         | `int`    | The NPC we're talking to                        |
| `nr`          | `int`    | Display order (lower = higher)                  |
| `condition`   | `func`   | Condition function — when the option is visible |
| `information` | `func`   | Function executed when the option is selected   |
| `permanent`   | `int`    | `TRUE` = option doesn't disappear after use     |
| `important`   | `int`    | `TRUE` = NPC speaks first (no player choice)    |
| `description` | `string` | Dialog option text                              |

## Step 1: Mission State Variable

First, define a variable to track quest progress. Add it to the mission constants file (e.g., `Log_Constants.d`):

```daedalus
var int MIS_Konrad_FindAxe;

const string TOPIC_Konrad_FindAxe = "Konrad's Axe";
```

| Symbol                 | Description                                                                                                              |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `MIS_Konrad_FindAxe`   | Mission state variable: `0` = not started, `LOG_RUNNING` = in progress, `LOG_SUCCESS` = completed, `LOG_FAILED` = failed |
| `TOPIC_Konrad_FindAxe` | Quest log topic name                                                                                                     |

## Step 2: Mission Item

Create an item that the player needs to find (in `Items/MissionItems.d`):

```daedalus
instance ItMi_Topor_Konrada (C_Item)
{
    name      = "Konrad's Old Axe";
    mainflag  = ITEM_KAT_NONE;
    flags     = ITEM_MISSION;
    value     = 0;
    visual    = "ItMw_010_1h_misc_axe_01.3DS";
    material  = MAT_WOOD;

    description = name;
    TEXT[5]     = "Mission Item";
};
```

| Field   | Value          | Description                              |
| ------- | -------------- | ---------------------------------------- |
| `flags` | `ITEM_MISSION` | Mission item — cannot be sold or dropped |
| `value` | `0`            | Not for sale                             |

:::info
The `ITEM_MISSION` flag prevents the item from being sold or dropped.
:::

## Step 3: Dialog — Exit Conversation

Every NPC must have an **exit conversation** option. This is a standard element:

```daedalus
instance DIA_Konrad_EXIT (C_INFO)
{
    npc         = BAU_900_Konrad;
    nr          = 999;
    condition   = DIA_Konrad_EXIT_Condition;
    information = DIA_Konrad_EXIT_Info;
    permanent   = TRUE;
    description = DIALOG_ENDE;
};

func int DIA_Konrad_EXIT_Condition ()
{
    return TRUE;
};

func void DIA_Konrad_EXIT_Info ()
{
    AI_StopProcessInfos (self);
};
```

| Field / Call                | Description                                  |
| --------------------------- | -------------------------------------------- |
| `nr = 999`                  | Always at the very bottom of the dialog list |
| `DIALOG_ENDE`               | Built-in constant for "End"                  |
| `return TRUE`               | Exit option is always visible                |
| `AI_StopProcessInfos(self)` | Closes the dialog window                     |

## Step 4: Dialog — Greeting (NPC Speaks First)

When the player approaches Konrad for the first time:

````daedalus
instance DIA_Konrad_Hallo (C_INFO)
{
    npc         = BAU_900_Konrad;
    nr          = 1;
    condition   = DIA_Konrad_Hallo_Condition;
    information = DIA_Konrad_Hallo_Info;
    permanent   = FALSE;
    important   = TRUE;
};

| Field | Value | Description |
| ----- | ----- | ----------- |
| `permanent` | `FALSE` | Dialog appears only once |
| `important` | `TRUE` | NPC approaches the player and speaks first |

func int DIA_Konrad_Hallo_Condition ()
{
    // Show only if quest hasn't been started yet
    if (MIS_Konrad_FindAxe == 0)
    {
        return TRUE;
    };
};

```daedalus
func void DIA_Konrad_Hallo_Info ()
{
    AI_Output (self, other, "DIA_Konrad_Hallo_01_01"); //Hey, you there! Got a moment?
    AI_Output (other, self, "DIA_Konrad_Hallo_15_01"); //What do you want?
    AI_Output (self, other, "DIA_Konrad_Hallo_01_02"); //I lost my axe somewhere in the forest. Will you help me find it?
};
````

`self` = NPC (Konrad), `other` = player.

:::tip
**Audio naming convention:** `DIA_Konrad_Hallo_01_01` — `01` = NPC voice number, `01` = line number. `15` in the player's line refers to the hero's voice. The `//` comment after `AI_Output` **must** be on the same line — the Daedalus parser treats it as the dialog subtitle text.
:::

## Step 5: Dialog — Accepting the Quest

```daedalus
instance DIA_Konrad_Topor (C_INFO)
{
    npc         = BAU_900_Konrad;
    nr          = 5;
    condition   = DIA_Konrad_Topor_Condition;
    information = DIA_Konrad_Topor_Info;
    permanent   = FALSE;
    description = "I'll help you find the axe.";
};

func int DIA_Konrad_Topor_Condition ()
{
    if (MIS_Konrad_FindAxe == 0)
    {
        return TRUE;
    };
};

func void DIA_Konrad_Topor_Info ()
{
    AI_Output (other, self, "DIA_Konrad_Topor_15_01"); //Alright, I'll look for your axe.
    AI_Output (self, other, "DIA_Konrad_Topor_01_01"); //Thanks! Last time I saw it near the old cave to the north.

    // === START QUEST ===
    MIS_Konrad_FindAxe = LOG_RUNNING;

    // Create topic in the quest log
    Log_CreateTopic (TOPIC_Konrad_FindAxe, LOG_MISSION);
    Log_SetTopicStatus (TOPIC_Konrad_FindAxe, LOG_RUNNING);
    B_LogEntry (TOPIC_Konrad_FindAxe,
        "Konrad lost his axe in the forest near the old cave to the north. I should look for it."
    );

    AI_StopProcessInfos (self);
};
```

### Key Quest Log Functions:

| Function                              | Description                                               |
| ------------------------------------- | --------------------------------------------------------- |
| `Log_CreateTopic(topic, LOG_MISSION)` | Creates an entry in the quest log                         |
| `Log_SetTopicStatus(topic, status)`   | Sets status: `LOG_RUNNING` / `LOG_SUCCESS` / `LOG_FAILED` |
| `B_LogEntry(topic, text)`             | Adds a note to an existing entry                          |

## Step 6: Dialog — Returning the Item and Reward

```daedalus
instance DIA_Konrad_Topor_Oddaj (C_INFO)
{
    npc         = BAU_900_Konrad;
    nr          = 10;
    condition   = DIA_Konrad_Topor_Oddaj_Condition;
    information = DIA_Konrad_Topor_Oddaj_Info;
    permanent   = FALSE;
    description = "I have your axe.";
};

func int DIA_Konrad_Topor_Oddaj_Condition ()
{
    if (MIS_Konrad_FindAxe == LOG_RUNNING)
    && (Npc_HasItems (other, ItMi_Topor_Konrada) >= 1)
    {
        return TRUE;
    };
};

func void DIA_Konrad_Topor_Oddaj_Info ()
{
    AI_Output (other, self, "DIA_Konrad_Topor_Oddaj_15_01"); //I have your axe. Found it near the cave.

    B_GiveInvItems (other, self, ItMi_Topor_Konrada, 1);

    AI_Output (self, other, "DIA_Konrad_Topor_Oddaj_01_01"); //Great! Take this gold as thanks.

    CreateInvItems (self, ItMi_Gold, 150);
    B_GiveInvItems (self, other, ItMi_Gold, 150);
    B_GivePlayerXP (100);

    MIS_Konrad_FindAxe = LOG_SUCCESS;
    B_LogEntry (TOPIC_Konrad_FindAxe,
        "I found Konrad's axe and returned it to him. In return, I received 150 gold coins."
    );

    AI_StopProcessInfos (self);
};
```

| Call                                                 | Description                         |
| ---------------------------------------------------- | ----------------------------------- |
| `B_GiveInvItems(other, self, ItMi_Topor_Konrada, 1)` | Player gives the axe to Konrad      |
| `B_GiveInvItems(self, other, ItMi_Gold, 150)`        | Konrad gives 150 gold to the player |
| `B_GivePlayerXP(100)`                                | Player receives 100 XP              |
| `MIS_Konrad_FindAxe = LOG_SUCCESS`                   | Marks quest as completed            |

## Step 7: Placing the Item in the World

In the `Startup.d` file (world startup function) place the axe at a location:

```daedalus
func void Startup_NewWorld ()
{
    Wld_InsertItem (ItMi_Topor_Konrada, "NW_CAVE_NORTH_01");
};
```

`Wld_InsertItem` places Konrad's axe at the cave waypoint.

## Complete File Structure

A complete quest requires these files:

```
Scripts/Content/
├── _intern/Constants.d          ← MIS_Konrad_FindAxe variable
├── Story/Log_Entries/
│   └── LOG_Constants.d          ← TOPIC_Konrad_FindAxe constant
├── Items/
│   └── MissionItems.d           ← ItMi_Topor_Konrada
├── Story/NPC/
│   └── BAU_900_Konrad.d         ← NPC definition
├── Story/Dialoge/
│   └── DIA_BAU_900_Konrad.d     ← all dialogs
└── Story/Startup.d              ← Wld_InsertNpc + Wld_InsertItem
```

## Summary

A complete quest in Gothic requires:

1. A **state variable** tracking progress (0 → `LOG_RUNNING` → `LOG_SUCCESS`)
2. A **mission item** with the `ITEM_MISSION` flag
3. **Dialogs** with conditions based on quest state and owned items
4. **Quest log entries** informing the player about progress
5. **Rewards** (gold, XP, items)
6. **Registration** of all files in `Gothic.src` in the correct order
