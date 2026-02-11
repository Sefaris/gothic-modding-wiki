---
sidebar_position: 1
title: "Script Structure Overview"
description: "How scripts are organized in Gothic."
---

# Script Structure Overview

Gothic scripts are divided into two main directories: **Content** (game content) and **System** (engine systems). Each has its own set of `.src` files - special compilation files that define the loading order of scripts.

## .src Files - Compilation

`.src` files are lists of `.d` (Daedalus) files in the order they should be compiled. The Gothic engine reads them from top to bottom:

| File             | Directory  | Description                                                  |
| ---------------- | ---------- | ------------------------------------------------------------ |
| `Gothic.src`     | `Content/` | Main game content compilation (NPCs, items, dialogs, quests) |
| `Fight.src`      | `Content/` | Fight tactics (FAI) compilation                              |
| `Camera.src`     | `System/`  | Camera settings                                              |
| `Menu.src`       | `System/`  | Game menu definitions                                        |
| `Music.src`      | `System/`  | Music instances                                              |
| `ParticleFX.src` | `System/`  | Particle effects                                             |
| `SFX.src`        | `System/`  | Sound effects                                                |
| `VisualFX.src`   | `System/`  | Visual effects (spells, auras)                               |

:::danger
The order of entries in `Gothic.src` is critical! If you reference an instance (e.g., an item in an NPC), it must be defined **earlier** in the `.src` file.
:::

---

## Content - Game Content

The `Content/` directory contains everything that defines the game world: characters, items, dialogs, AI, magic, and quests. It is compiled by `Gothic.src` and `Fight.src`.

```
Content/
├── Gothic.src              ← main compilation file
├── Fight.src               ← fight tactics compilation
│
├── _intern/                ← engine classes and constants
├── AI/                     ← artificial intelligence
├── Items/                  ← items
├── FAI/                    ← fight tactics
├── Story/                  ← story, NPCs, dialogs
├── Cutscene/               ← cutscenes
└── Spine/                  ← Spine platform integration
```

### `_intern/` - Engine Classes and Constants

Contains engine class declarations and global constants. This is the foundation upon which all other scripts are built.

| File          | Description                                                         |
| ------------- | ------------------------------------------------------------------- |
| `Classes.d`   | Engine classes: `C_NPC`, `C_Item`, `C_INFO`, `C_Mission` and others |
| `Constants.d` | Global constants, mission state variables, story variables          |
| `Fight.d`     | Combat system constants                                             |

:::info
Files in `_intern/` are always at the beginning of `Gothic.src` - they define the data types used by the rest of the scripts.
:::

### `AI/` - Artificial Intelligence

Controls the behavior of characters and monsters. Divided into separate subsystems:

```
AI/
├── AI_Intern/          ← AI core
│   ├── AI_Constants.d      ← AI constants (distances, priorities)
│   ├── Externals.d         ← engine function declarations
│   ├── Perception.d        ← reactions to surroundings
│   ├── Focus.d             ← focus settings (what NPCs pay attention to)
│   ├── Species.d           ← species definitions
│   └── BodyStates.d        ← body states (sitting, lying, fighting)
│
├── Human/              ← human behavior
│   ├── B_Human/            ← behavior functions (B_ = Behavior)
│   ├── C_Human/            ← condition functions (C_ = Condition)
│   ├── TA_Human/           ← daily routines (TA = Tagesablauf)
│   └── ZS_Human/           ← state machines (ZS = Zustandsautomat)
│
├── Monster/            ← monster behavior
│   ├── B_Monster/          ← monster behaviors
│   ├── C_Monster/          ← monster conditions
│   ├── RTN_Monster/        ← monster daily routines
│   └── ZS_Monster/         ← monster state machines
│
├── Magic/              ← magic system
│   ├── Spells/             ← spell definitions
│   └── ZS_Magic/           ← spellcasting states
│
└── Test_Skripts/       ← test/debug scripts
```

**Naming conventions in AI:**

- **B\_** (Behavior) - functions that perform actions, e.g., `B_Attack`, `B_Flee`
- **C\_** (Condition) - functions that check conditions, e.g., `C_CanSeeNpc`
- **TA\_** (Tagesablauf) - NPC daily routines
- **ZS\_** (Zustandsautomat) - AI state machines (idle, combat, flee states, etc.)

### `Items/` - Items

All item definitions in the game. Files grouped by type:

| File                  | Description                         |
| --------------------- | ----------------------------------- |
| `IT_Melee_Weapons.d`  | Melee weapons (swords, axes)        |
| `IT_Ranged_Weapons.d` | Ranged weapons (bows, crossbows)    |
| `IT_Armor.d`          | Armor                               |
| `IT_Food.d`           | Food                                |
| `IT_Potions.d`        | Potions                             |
| `IT_Plants.d`         | Plants (alchemical ingredients)     |
| `IT_Runen.d`          | Magic runes                         |
| `IT_Scrolls.d`        | Spell scrolls                       |
| `IT_Ringe.d`          | Rings                               |
| `IT_Amulette.d`       | Amulets                             |
| `IT_Keys.d`           | Keys                                |
| `IT_Misc.d`           | Miscellaneous items (gold, torches) |
| `IT_Written.d`        | Documents, letters, books           |
| `MissionItems_*.d`    | Mission items (per chapter)         |

### `FAI/` - Fight Tactics

Fight AI definitions for different enemy types:

| File                 | Description              |
| -------------------- | ------------------------ |
| `FAI_Human_Normal.d` | Standard human tactic    |
| `FAI_Human_Strong.d` | Strong opponent          |
| `FAI_Human_Master.d` | Combat master            |
| `FAI_Human_Coward.d` | Coward (flees at low HP) |
| `FAI_Wolf.d`         | Wolf                     |
| `FAI_Orc.d`          | Orc                      |
| `FAI_Dragon.d`       | Dragon                   |
| `FAI_Troll.d`        | Troll                    |
| `FAI_Demon.d`        | Demon                    |

:::tip
Fight tactics are assigned to NPCs through the `fight_tactic` field in the `C_NPC` instance.
:::

### `Story/` - Story

The largest and most important directory. Contains NPCs, dialogs, quests, events, and all story-related scripts:

```
Story/
├── Startup.d                   ← World startup functions (NPC spawning)
├── Story_Globals.d             ← Global story variables
├── NPC_Globals.d               ← Global NPC variables
├── SVM.d                       ← Standard Voice Messages (NPC shouts)
├── Text.d                      ← Text constants
├── XP_Constants.d              ← Experience constants
│
├── NPC/                    ← NPC definitions (C_NPC instances)
│   ├── PC_Hero.d               ← Player character
│   ├── VLK_*.d                 ← Citizens
│   ├── MIL_*.d                 ← Militia
│   ├── PAL_*.d                 ← Paladins
│   ├── SLD_*.d                 ← Mercenaries
│   ├── BAU_*.d                 ← Farmers
│   ├── BDT_*.d                 ← Bandits
│   ├── KDF_*.d                 ← Fire mages
│   ├── KDW_*.d                 ← Water mages
│   ├── PIR_*.d                 ← Pirates
│   ├── NOV_*.d                 ← Novices
│   ├── DJG_*.d                 ← Dragon hunters
│   └── Monster/                ← Monster definitions
│
├── NPC_Scripts/            ← NPC helper functions
│   ├── NPC_Default.d           ← Npc_Default prototype
│   ├── B_SetNpcVisual.d        ← Setting appearance
│   ├── B_GiveNpcTalents.d      ← Assigning talents
│   └── B_SetFightSkills.d      ← Setting fight skills
│
├── Dialoge/                ← Dialogs (~1200+ files)
│   ├── DIA_VLK_*.d             ← Citizen dialogs
│   ├── DIA_MIL_*.d             ← Militia dialogs
│   ├── DIA_BAU_*.d             ← Farmer dialogs
│   └── ...                     ← (one file per NPC)
│
├── B_Story/                ← Story functions
│   ├── B_GivePlayerXP.d        ← Giving experience
│   ├── B_LogEntry.d            ← Quest log entry
│   ├── B_Enter_NewWorld.d      ← Entering new world
│   └── B_Kapitelwechsel.d      ← Chapter change
│
├── B_GiveTradeInv/         ← Merchant inventories
│   ├── B_GiveTradeInv.d        ← Main function
│   └── B_GiveTradeInv_*.d      ← Per merchant
│
├── B_Content/              ← Content helper functions
├── B_AssignAmbientInfos/   ← Ambient dialogs
│
├── Dialog_Mobsis/          ← Interactive object dialogs
│   ├── SmithWeapon.d           ← Smithing
│   ├── Potion_Alchemy.d        ← Alchemy
│   ├── cook_s1.d               ← Cooking
│   └── SleepABit.d             ← Sleeping in a bed
│
├── Events/                 ← Story events
│   └── EVT_*.d                 ← Event scripts (battles, cutscenes)
│
├── G_Functions/            ← Global game functions
│   ├── G_PickLock.d            ← Lock picking
│   └── G_CanSteal.d            ← Stealing
│
└── Log_Entries/            ← Quest log
    └── LOG_Constants_*.d       ← Quest log topic constants
```

**NPC naming conventions (prefixes):**

| Prefix | Guild                        |
| ------ | ---------------------------- |
| `PC_`  | Player Character             |
| `VLK_` | Citizen (Volk)               |
| `MIL_` | Militia (Miliz)              |
| `PAL_` | Paladin                      |
| `SLD_` | Mercenary (Söldner)          |
| `BAU_` | Farmer (Bauer)               |
| `BDT_` | Bandit                       |
| `KDF_` | Fire Mage (Kreisfeuer)       |
| `KDW_` | Water Mage (Kreiswasser)     |
| `PIR_` | Pirate                       |
| `NOV_` | Novice (Novize)              |
| `DJG_` | Dragon Hunter (Drachenjäger) |

---

## System - Engine Systems

The `System/` directory contains engine system definitions: menus, camera, music, sound effects, and visual effects. Each subsystem has its own `.src` file.

```
System/
├── Camera.src          ← camera compilation
├── Menu.src            ← menu compilation
├── Music.src           ← music compilation
├── ParticleFX.src      ← particle effects compilation
├── SFX.src             ← sound effects compilation
├── VisualFX.src        ← visual effects compilation
│
├── _intern/            ← system class declarations
├── Camera/             ← camera settings
├── Menu/               ← menu definitions
├── Music/              ← music instances
├── PFX/                ← particle effects
├── SFX/                ← sound effects
└── VisualFX/           ← visual effects
```

### `_intern/` - System Classes

Engine class declarations for individual systems. Analogous to `Content/_intern/`, but for subsystems:

| File           | Description                                       |
| -------------- | ------------------------------------------------- |
| `Camera.d`     | `C_CamSys` class - camera parameters              |
| `Menu.d`       | `C_Menu`, `C_MenuItem` classes - menu definitions |
| `Music.d`      | `C_MusicTheme` class - music themes               |
| `ParticleFX.d` | `C_ParticleFX` class - particle effects           |
| `SFX.d`        | `C_SFX` class - sound effects                     |
| `VisualFX.d`   | `C_VisualFX` class - visual effects               |

### `Camera/` - Camera

Camera instances used in the game:

| File        | Description                                            |
| ----------- | ------------------------------------------------------ |
| `CamInst.d` | Camera definitions: standard, dialog, combat, cutscene |

### `Menu/` - Game Menus

Definitions for all menu screens:

| File                  | Description                         |
| --------------------- | ----------------------------------- |
| `Menu_Main.d`         | Main menu                           |
| `Menu_Status.d`       | Character screen (stats, equipment) |
| `Menu_Log.d`          | Quest log                           |
| `Menu_Opt.d`          | Game options                        |
| `Menu_Opt_Graphics.d` | Graphics options                    |
| `Menu_Opt_Audio.d`    | Audio options                       |
| `Menu_Opt_Controls.d` | Control options                     |
| `Menu_Savegame.d`     | Save/load game                      |
| `Menu_Defines.d`      | Shared constants and definitions    |

### `Music/` - Music

| File          | Description                                                      |
| ------------- | ---------------------------------------------------------------- |
| `MusicInst.d` | Music theme instances (exploration, combat, threat per location) |

### `PFX/` - Particle Effects

| File              | Description                           |
| ----------------- | ------------------------------------- |
| `PfxInst.d`       | General effects (fire, smoke, sparks) |
| `PfxInstEngine.d` | Engine effects                        |
| `PfxInstMagic.d`  | Magic effects (spells, runes)         |

### `SFX/` - Sound Effects

| File              | Description                                 |
| ----------------- | ------------------------------------------- |
| `SfxInst.d`       | Ambient, interface, and object sounds       |
| `SfxInstSpeech.d` | Speech sounds (dialog system configuration) |

### `VisualFX/` - Visual Effects

| File             | Description                        |
| ---------------- | ---------------------------------- |
| `VisualFxInst.d` | Spell visual effects, auras, buffs |

---

## Summary

| Area           | Directory          | Compilation      | Description                                    |
| -------------- | ------------------ | ---------------- | ---------------------------------------------- |
| Engine classes | `Content/_intern/` | `Gothic.src`     | Foundations - C_NPC, C_Item, C_INFO classes... |
| AI             | `Content/AI/`      | `Gothic.src`     | Behaviors, perception, AI states               |
| Items          | `Content/Items/`   | `Gothic.src`     | Weapons, armor, potions, food                  |
| Fight tactics  | `Content/FAI/`     | `Fight.src`      | Fight tactics per enemy type                   |
| Story          | `Content/Story/`   | `Gothic.src`     | NPCs, dialogs, quests, events                  |
| Camera         | `System/Camera/`   | `Camera.src`     | Camera modes                                   |
| Menus          | `System/Menu/`     | `Menu.src`       | Game menu screens                              |
| Music          | `System/Music/`    | `Music.src`      | Music themes                                   |
| Particles      | `System/PFX/`      | `ParticleFX.src` | Particle effects                               |
| Sound          | `System/SFX/`      | `SFX.src`        | Sound effects                                  |
| Visual FX      | `System/VisualFX/` | `VisualFX.src`   | Spell and aura effects                         |
