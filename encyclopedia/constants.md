---
sidebar_position: 3
title: "Daedalus Constants"
description: "Complete reference of Daedalus constants - attributes, item categories, guilds, damage types, materials, and more."
---

# Daedalus Constants

This page lists the most important constants defined in the Gothic II scripts (`Constants.d`, `AI_Constants.d`). They are used across NPC definitions, items, dialogs, and AI configuration.

## Attributes (ATR\_)

Used with `attribute[]` array in `C_NPC`.

| Constant             | Value | Description       |
| -------------------- | ----- | ----------------- |
| `ATR_HITPOINTS`      | `0`   | Current health    |
| `ATR_HITPOINTS_MAX`  | `1`   | Maximum health    |
| `ATR_MANA`           | `2`   | Current mana      |
| `ATR_MANA_MAX`       | `3`   | Maximum mana      |
| `ATR_STRENGTH`       | `4`   | Strength          |
| `ATR_DEXTERITY`      | `5`   | Dexterity         |
| `ATR_REGENERATEHP`   | `6`   | HP regeneration   |
| `ATR_REGENERATEMANA` | `7`   | Mana regeneration |
| `ATR_INDEX_MAX`      | `8`   | Total attributes  |

## Item Categories (ITEM_KAT\_)

Used in the `mainflag` field of `C_Item`.

| Constant           | Value     | Description              |
| ------------------ | --------- | ------------------------ |
| `ITEM_KAT_NONE`    | `1`       | Other (keys, gold, misc) |
| `ITEM_KAT_NF`      | `2`       | Melee weapon             |
| `ITEM_KAT_FF`      | `4`       | Ranged weapon            |
| `ITEM_KAT_MUN`     | `8`       | Ammunition               |
| `ITEM_KAT_ARMOR`   | `16`      | Armor                    |
| `ITEM_KAT_FOOD`    | `32`      | Food                     |
| `ITEM_KAT_DOCS`    | `64`      | Documents                |
| `ITEM_KAT_POTIONS` | `128`     | Potions                  |
| `ITEM_KAT_LIGHT`   | `256`     | Light sources            |
| `ITEM_KAT_RUNE`    | `512`     | Runes and scrolls        |
| `ITEM_KAT_MAGIC`   | `1 << 31` | Magic items              |
| `ITEM_KAT_KEYS`    | `1`       | Keys (same as NONE)      |

## Item Flags (ITEM\_)

Used in the `flags` field of `C_Item`. Can be combined with bitwise OR.

### Weapon Types

| Constant        | Bit       | Description |
| --------------- | --------- | ----------- |
| `ITEM_DAG`      | `1 << 13` | Dagger      |
| `ITEM_SWD`      | `1 << 14` | 1H sword    |
| `ITEM_AXE`      | `1 << 15` | 1H axe      |
| `ITEM_2HD_SWD`  | `1 << 16` | 2H sword    |
| `ITEM_2HD_AXE`  | `1 << 17` | 2H axe      |
| `ITEM_SHIELD`   | `1 << 18` | Shield      |
| `ITEM_BOW`      | `1 << 19` | Bow         |
| `ITEM_CROSSBOW` | `1 << 20` | Crossbow    |

### Accessories

| Constant      | Bit       | Description |
| ------------- | --------- | ----------- |
| `ITEM_RING`   | `1 << 11` | Ring        |
| `ITEM_AMULET` | `1 << 22` | Amulet      |
| `ITEM_BELT`   | `1 << 24` | Belt        |

### Behavior Flags

| Constant          | Bit       | Description                        |
| ----------------- | --------- | ---------------------------------- |
| `ITEM_DROPPED`    | `1 << 10` | Item was dropped in world          |
| `ITEM_MISSION`    | `1 << 12` | Mission item (cannot sell or drop) |
| `ITEM_MULTI`      | `1 << 21` | Stackable                          |
| `ITEM_NFOCUS`     | `1 << 23` | Not focusable                      |
| `ITEM_CREATEAMMO` | `1 << 25` | Auto-creates ammo (bow/crossbow)   |
| `ITEM_NSPLIT`     | `1 << 26` | Cannot be split from stack         |
| `ITEM_DRINK`      | `1 << 27` | Drink                              |
| `ITEM_TORCH`      | `1 << 28` | Torch                              |
| `ITEM_THROW`      | `1 << 29` | Throwable                          |
| `ITEM_ACTIVE`     | `1 << 30` | Active (usable item)               |

## Damage Types (DAM\_)

Used in the `damagetype` field. Can be combined with bitwise OR.

| Constant      | Value | Index | Description    |
| ------------- | ----- | ----- | -------------- |
| `DAM_BARRIER` | `1`   | `0`   | Barrier damage |
| `DAM_BLUNT`   | `2`   | `1`   | Blunt damage   |
| `DAM_EDGE`    | `4`   | `2`   | Edge (slash)   |
| `DAM_FIRE`    | `8`   | `3`   | Fire damage    |
| `DAM_FLY`     | `16`  | `4`   | Knockback      |
| `DAM_MAGIC`   | `32`  | `5`   | Magic damage   |
| `DAM_POINT`   | `64`  | `6`   | Point (pierce) |
| `DAM_FALL`    | `128` | `7`   | Fall damage    |

## Protection Types (PROT\_)

Used with `protection[]` array. Indices correspond to `DAM_INDEX_*`.

| Constant       | Index | Description        |
| -------------- | ----- | ------------------ |
| `PROT_BARRIER` | `0`   | Barrier protection |
| `PROT_BLUNT`   | `1`   | Blunt protection   |
| `PROT_EDGE`    | `2`   | Edge protection    |
| `PROT_FIRE`    | `3`   | Fire protection    |
| `PROT_FLY`     | `4`   | Knockback resist   |
| `PROT_MAGIC`   | `5`   | Magic protection   |
| `PROT_POINT`   | `6`   | Point protection   |
| `PROT_FALL`    | `7`   | Fall protection    |

Use `IMMUNE` (`-1`) to make an NPC completely immune to a damage type.

## Guilds (GIL\_)

Used in the `guild` field of `C_NPC`.

### Human Guilds

| Constant     | Value | Description                     |
| ------------ | ----- | ------------------------------- |
| `GIL_NONE`   | `0`   | No guild                        |
| `GIL_PAL`    | `1`   | Paladins (= `GIL_HUMAN`)        |
| `GIL_MIL`    | `2`   | Militia                         |
| `GIL_VLK`    | `3`   | Citizens (Volk)                 |
| `GIL_KDF`    | `4`   | Fire Mages (Kreis des Feuers)   |
| `GIL_NOV`    | `5`   | Novices                         |
| `GIL_DJG`    | `6`   | Dragon Hunters (Drachenjäger)   |
| `GIL_SLD`    | `7`   | Mercenaries (Söldner)           |
| `GIL_BAU`    | `8`   | Farmers (Bauer)                 |
| `GIL_BDT`    | `9`   | Bandits                         |
| `GIL_STRF`   | `10`  | Prisoners (Sträfling)           |
| `GIL_DMT`    | `11`  | Dementors                       |
| `GIL_OUT`    | `12`  | Guildless (Outsider)            |
| `GIL_PIR`    | `13`  | Pirates                         |
| `GIL_KDW`    | `14`  | Water Mages (Kreis des Wassers) |
| `GIL_PUBLIC` | `15`  | Public / generic                |

### Monster Guilds

| Constant            | Value | Description    |
| ------------------- | ----- | -------------- |
| `GIL_MEATBUG`       | `17`  | Meatbug        |
| `GIL_SHEEP`         | `18`  | Sheep          |
| `GIL_GOBBO`         | `19`  | Goblin         |
| `GIL_SCAVENGER`     | `22`  | Scavenger      |
| `GIL_GIANT_RAT`     | `23`  | Giant rat      |
| `GIL_GIANT_BUG`     | `24`  | Giant bug      |
| `GIL_BLOODFLY`      | `25`  | Bloodfly       |
| `GIL_WARAN`         | `26`  | Waran (lizard) |
| `GIL_WOLF`          | `27`  | Wolf           |
| `GIL_MINECRAWLER`   | `29`  | Minecrawler    |
| `GIL_LURKER`        | `30`  | Lurker         |
| `GIL_SKELETON`      | `31`  | Skeleton       |
| `GIL_ZOMBIE`        | `34`  | Zombie         |
| `GIL_SNAPPER`       | `35`  | Snapper        |
| `GIL_SHADOWBEAST`   | `36`  | Shadowbeast    |
| `GIL_HARPY`         | `38`  | Harpy          |
| `GIL_STONEGOLEM`    | `39`  | Stone golem    |
| `GIL_FIREGOLEM`     | `40`  | Fire golem     |
| `GIL_ICEGOLEM`      | `41`  | Ice golem      |
| `GIL_DEMON`         | `43`  | Demon          |
| `GIL_TROLL`         | `45`  | Troll          |
| `GIL_SWAMPSHARK`    | `46`  | Swamp shark    |
| `GIL_DRAGON`        | `47`  | Dragon         |
| `GIL_MOLERAT`       | `48`  | Molerat        |
| `GIL_ALLIGATOR`     | `49`  | Alligator      |
| `GIL_SWAMPGOLEM`    | `50`  | Swamp golem    |
| `GIL_STONEGUARDIAN` | `51`  | Stone guardian |
| `GIL_GARGOYLE`      | `52`  | Gargoyle       |

### Orc Guilds

| Constant           | Value | Description  |
| ------------------ | ----- | ------------ |
| `GIL_ORC`          | `59`  | Orc          |
| `GIL_FRIENDLY_ORC` | `60`  | Friendly orc |
| `GIL_UNDEADORC`    | `61`  | Undead orc   |
| `GIL_DRACONIAN`    | `62`  | Draconian    |

## NPC Flags (NPC_FLAG\_)

Used in the `flags` field of `C_NPC`.

| Constant            | Value | Description         |
| ------------------- | ----- | ------------------- |
| `NPC_FLAG_FRIEND`   | `1`   | Friendly NPC        |
| `NPC_FLAG_IMMORTAL` | `2`   | Immortal NPC        |
| `NPC_FLAG_GHOST`    | `4`   | Ghost (transparent) |

## NPC Types (NPCTYPE\_)

Used in the `npctype` field of `C_NPC`.

| Constant              | Value | Description                 |
| --------------------- | ----- | --------------------------- |
| `NPCTYPE_AMBIENT`     | `0`   | Background NPC              |
| `NPCTYPE_MAIN`        | `1`   | Main/important NPC          |
| `NPCTYPE_FRIEND`      | `2`   | Player's friend             |
| `NPCTYPE_OCAMBIENT`   | `3`   | Old Camp ambient (Gothic I) |
| `NPCTYPE_OCMAIN`      | `4`   | Old Camp main (Gothic I)    |
| `NPCTYPE_BL_AMBIENT`  | `5`   | Bandit camp ambient         |
| `NPCTYPE_TAL_AMBIENT` | `6`   | Valley ambient              |
| `NPCTYPE_BL_MAIN`     | `7`   | Bandit camp main            |

## Fight Tactics (FAI\_)

Used in the `fight_tactic` field of `C_NPC`.

### Human

| Constant           | Value | Description                   |
| ------------------ | ----- | ----------------------------- |
| `FAI_HUMAN_COWARD` | `2`   | Flees from combat             |
| `FAI_HUMAN_NORMAL` | `42`  | Standard combat behavior      |
| `FAI_HUMAN_STRONG` | `3`   | Aggressive, uses combos       |
| `FAI_HUMAN_MASTER` | `4`   | Expert fighter, optimal moves |

### Monster

| Constant             | Value | Description    |
| -------------------- | ----- | -------------- |
| `FAI_NAILED`         | `1`   | Stationary     |
| `FAI_MONSTER_COWARD` | `10`  | Monster flees  |
| `FAI_GOBBO`          | `7`   | Goblin         |
| `FAI_SCAVENGER`      | `15`  | Scavenger      |
| `FAI_GIANT_RAT`      | `11`  | Giant rat      |
| `FAI_GIANT_BUG`      | `31`  | Giant bug      |
| `FAI_BLOODFLY`       | `24`  | Bloodfly       |
| `FAI_WARAN`          | `21`  | Waran          |
| `FAI_WOLF`           | `22`  | Wolf           |
| `FAI_MINECRAWLER`    | `5`   | Minecrawler    |
| `FAI_LURKER`         | `9`   | Lurker         |
| `FAI_ZOMBIE`         | `23`  | Zombie         |
| `FAI_SNAPPER`        | `18`  | Snapper        |
| `FAI_SHADOWBEAST`    | `16`  | Shadowbeast    |
| `FAI_HARPY`          | `36`  | Harpy          |
| `FAI_STONEGOLEM`     | `8`   | Stone golem    |
| `FAI_DEMON`          | `6`   | Demon          |
| `FAI_TROLL`          | `20`  | Troll          |
| `FAI_SWAMPSHARK`     | `19`  | Swamp shark    |
| `FAI_DRAGON`         | `39`  | Dragon         |
| `FAI_MOLERAT`        | `40`  | Molerat        |
| `FAI_ORC`            | `12`  | Orc            |
| `FAI_DRACONIAN`      | `41`  | Draconian      |
| `FAI_ALLIGATOR`      | `43`  | Alligator      |
| `FAI_GARGOYLE`       | `44`  | Gargoyle       |
| `FAI_BEAR`           | `45`  | Bear           |
| `FAI_STONEGUARDIAN`  | `46`  | Stone guardian |

## Materials (MAT\_)

Used in the `material` field of `C_Item`. Affects pickup, drop, and hit sounds.

| Constant      | Value | Description |
| ------------- | ----- | ----------- |
| `MAT_WOOD`    | `0`   | Wood        |
| `MAT_STONE`   | `1`   | Stone       |
| `MAT_METAL`   | `2`   | Metal       |
| `MAT_LEATHER` | `3`   | Leather     |
| `MAT_CLAY`    | `4`   | Clay        |
| `MAT_GLAS`    | `5`   | Glass       |

## Senses (SENSE\_)

Used in the `senses` field of `C_NPC`. Can be combined with bitwise OR.

| Constant      | Value | Description   |
| ------------- | ----- | ------------- |
| `SENSE_SEE`   | `1`   | NPC can see   |
| `SENSE_HEAR`  | `2`   | NPC can hear  |
| `SENSE_SMELL` | `4`   | NPC can smell |

## Talents (NPC_TALENT\_)

Used with `HitChance[]` and `Npc_GetTalent()`/`Npc_SetTalent()`.

| Constant                      | Value | Description       |
| ----------------------------- | ----- | ----------------- |
| `NPC_TALENT_UNKNOWN`          | `0`   | Unknown           |
| `NPC_TALENT_1H`               | `1`   | One-handed weapon |
| `NPC_TALENT_2H`               | `2`   | Two-handed weapon |
| `NPC_TALENT_BOW`              | `3`   | Bow               |
| `NPC_TALENT_CROSSBOW`         | `4`   | Crossbow          |
| `NPC_TALENT_PICKLOCK`         | `5`   | Lockpicking       |
| `NPC_TALENT_MAGE`             | `7`   | Magic circle      |
| `NPC_TALENT_SNEAK`            | `8`   | Sneaking          |
| `NPC_TALENT_REGENERATE`       | `9`   | Regeneration      |
| `NPC_TALENT_FIREMASTER`       | `10`  | Fire mastery      |
| `NPC_TALENT_ACROBAT`          | `11`  | Acrobatics        |
| `NPC_TALENT_PICKPOCKET`       | `12`  | Pickpocket        |
| `NPC_TALENT_SMITH`            | `13`  | Smithing          |
| `NPC_TALENT_RUNES`            | `14`  | Rune crafting     |
| `NPC_TALENT_ALCHEMY`          | `15`  | Alchemy           |
| `NPC_TALENT_TAKEANIMALTROPHY` | `16`  | Skinning/trophy   |
| `NPC_TALENT_FOREIGNLANGUAGE`  | `17`  | Foreign language  |
| `NPC_TALENT_WISPDETECTOR`     | `18`  | Wisp detector     |

## Quest Log

| Constant       | Value | Description        |
| -------------- | ----- | ------------------ |
| `LOG_RUNNING`  | `1`   | Quest in progress  |
| `LOG_SUCCESS`  | `2`   | Quest succeeded    |
| `LOG_FAILED`   | `3`   | Quest failed       |
| `LOG_OBSOLETE` | `4`   | Quest obsolete     |
| `LOG_MISSION`  | `0`   | Mission entry type |
| `LOG_NOTE`     | `1`   | Note entry type    |

## Attitudes (ATT\_)

| Constant       | Value | Description |
| -------------- | ----- | ----------- |
| `ATT_FRIENDLY` | `3`   | Friendly    |
| `ATT_NEUTRAL`  | `2`   | Neutral     |
| `ATT_ANGRY`    | `1`   | Angry       |
| `ATT_HOSTILE`  | `0`   | Hostile     |

## Wear Slots

Used in the `wear` field of `C_Item`.

| Constant      | Value | Description |
| ------------- | ----- | ----------- |
| `WEAR_TORSO`  | `1`   | Torso slot  |
| `WEAR_HEAD`   | `2`   | Head slot   |
| `WEAR_EFFECT` | `16`  | Effect slot |

## Inventory Categories (INV\_)

| Constant     | Value | Description |
| ------------ | ----- | ----------- |
| `INV_WEAPON` | `1`   | Weapons     |
| `INV_ARMOR`  | `2`   | Armors      |
| `INV_RUNE`   | `3`   | Runes       |
| `INV_MAGIC`  | `4`   | Magic items |
| `INV_FOOD`   | `5`   | Food        |
| `INV_POTION` | `6`   | Potions     |
| `INV_DOC`    | `7`   | Documents   |
| `INV_MISC`   | `8`   | Misc items  |

## Perception Distances

| Constant                        | Value  | Description             |
| ------------------------------- | ------ | ----------------------- |
| `PERC_DIST_ACTIVE_MAX`          | `2000` | Default max range       |
| `PERC_DIST_INTERMEDIAT`         | `1000` | Intermediate range      |
| `PERC_DIST_DIALOG`              | `500`  | Dialog range            |
| `PERC_DIST_MONSTER_ACTIVE_MAX`  | `1500` | Monster max range       |
| `PERC_DIST_ORC_ACTIVE_MAX`      | `2500` | Orc max range           |
| `PERC_DIST_DRAGON_ACTIVE_MAX`   | `3500` | Dragon max range        |
| `PERC_DIST_SUMMONED_ACTIVE_MAX` | `2000` | Summoned creature range |

## Movement Modes

| Constant           | Value | Description          |
| ------------------ | ----- | -------------------- |
| `NPC_RUN`          | `0`   | Running              |
| `NPC_WALK`         | `1`   | Walking              |
| `NPC_SNEAK`        | `2`   | Sneaking             |
| `NPC_RUN_WEAPON`   | `128` | Running with weapon  |
| `NPC_WALK_WEAPON`  | `129` | Walking with weapon  |
| `NPC_SNEAK_WEAPON` | `130` | Sneaking with weapon |

## Fight Modes

| Constant      | Value | Description   |
| ------------- | ----- | ------------- |
| `FMODE_NONE`  | `0`   | No weapon     |
| `FMODE_FIST`  | `1`   | Fists         |
| `FMODE_MELEE` | `2`   | Melee weapon  |
| `FMODE_FAR`   | `5`   | Ranged weapon |
| `FMODE_MAGIC` | `7`   | Magic         |
