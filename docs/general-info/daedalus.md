---
sidebar_position: 1
title: "Daedalus"
description: "Overview of the Daedalus scripting language used in Gothic."
---

# Daedalus

**Daedalus** is a scripting language built into the **ZenGin** engine - the engine powering Gothic I and Gothic II. It's used to define virtually all game logic: characters, items, dialogs, quests, effects, sounds, AI, and much more.

Daedalus source files have the **`.d`** extension, and compilation files (lists of files to compile) use **`.src`**. After compilation, a binary **`.dat`** file is produced, which is read by the game engine.

:::info
Daedalus is **not** a general-purpose language. It's a domain-specific language designed specifically for Gothic - it has many limitations compared to modern languages, but it perfectly fulfills its role in the context of modding.
:::

---

## Data Types

Daedalus has a very limited type system:

| Type     | Description                      | Example                   |
| -------- | -------------------------------- | ------------------------- |
| `int`    | Integer (32-bit)                 | `var int counter;`        |
| `float`  | Floating-point number            | `var float range;`        |
| `string` | Text string                      | `var string name;`        |
| `void`   | No return value (functions only) | `func void MyFunction()`  |
| `func`   | Function reference               | `var func daily_routine;` |

**There is no `bool` type** - instead, constants `TRUE` (1) and `FALSE` (0) of type `int` are used.

---

## Variables

### Local Variables

Declared inside functions using the `var` keyword:

```daedalus
func string GetName(var int instance)
{
    var string name;
    var int value;
    // ...
    return name;
};
```

### Global Variables

Declared outside functions - accessible from anywhere in the scripts:

```daedalus
var int Chapter;
var int MyQuest_Status;
var string RecipeName;
```

:::warning
Global variables **must be declared before they are used** - the file order in `Gothic.src` matters!
:::

### Constants (`const`)

Immutable values defined with the `const` keyword:

```daedalus
const int    ATR_HITPOINTS     = 0;
const int    ATR_STRENGTH      = 4;
const string FONT_Screen       = "FONT_OLD_20_WHITE.TGA";
const float  NPC_COLLISION_CORRECTION_SCALER = 0.75;
const int    TRUE              = 1;
const int    FALSE             = 0;
```

Constants can reference other constants and use expressions:

```daedalus
const int NPC_FLAG_IMMORTAL = 1 << 1;          // bit shift
const int NPC_FLAG_GHOST    = 1 << 2;
const int DAM_BLUNT         = DAM_BARRIER << 1; // reference to another constant
```

---

## Arrays

Arrays in Daedalus have a **fixed size** specified in square brackets:

```daedalus
var string  name[5];                    // 5 elements
var int     attribute[ATR_INDEX_MAX];   // size from constant (= 8)
var int     aivar[100];                 // 100 AI variables
```

Element access via index:

```daedalus
attribute[ATR_STRENGTH]    = 50;
name[0]                    = "Konrad";
on_state[0]                = UseItPo_Health;
```

Array access via dot notation (on instances):

```daedalus
self.attribute[ATR_STRENGTH]    = 50;
self.attribute[ATR_HITPOINTS]   = 160;
```

:::warning
Dynamic arrays do not exist. Array size must be known at compile time. The Ikarus library works around this limitation through direct memory access.
:::

---

## Operators

### Arithmetic

| Operator | Description        | Example |
| -------- | ------------------ | ------- |
| `+`      | Addition           | `a + b` |
| `-`      | Subtraction        | `a - b` |
| `*`      | Multiplication     | `a * b` |
| `/`      | Division (integer) | `a / b` |
| `%`      | Modulo (remainder) | `a % 5` |

### Assignment and Compound Assignment

| Operator | Description         | Example   |
| -------- | ------------------- | --------- |
| `=`      | Assignment          | `x = 10;` |
| `+=`     | Add and assign      | `x += 5;` |
| `-=`     | Subtract and assign | `x -= 3;` |

### Comparison

| Operator | Description      | Example    |
| -------- | ---------------- | ---------- |
| `==`     | Equal            | `x == 1`   |
| `!=`     | Not equal        | `x != 0`   |
| `>`      | Greater than     | `x > 10`   |
| `<`      | Less than        | `x < 5`    |
| `>=`     | Greater or equal | `x >= 0`   |
| `<=`     | Less or equal    | `x <= 100` |

### Logical

| Operator | Description | Example                  |
| -------- | ----------- | ------------------------ |
| `&&`     | Logical AND | `(x > 0) && (y < 10)`    |
| `\|\|`   | Logical OR  | `(x == 1) \|\| (x == 2)` |
| `!`      | Negation    | `!Npc_IsPlayer(self)`    |

### Bitwise

| Operator | Description | Example                   |
| -------- | ----------- | ------------------------- |
| `&`      | Bitwise AND | `flags & ITEM_SWD`        |
| `\|`     | Bitwise OR  | `SENSE_HEAR \| SENSE_SEE` |
| `<<`     | Left shift  | `1 << 3`                  |

Bitwise operators are commonly used to define flags:

```daedalus
const int ITEM_KAT_NF    = 1 << 1;    // category: melee weapon
const int ITEM_KAT_FF    = 1 << 2;    // category: ranged weapon
const int ITEM_KAT_MUN   = 1 << 3;    // category: ammo
const int ITEM_KAT_MAGIC = 1 << 31;   // category: magic

// Checking a flag:
if (type & ITEM_SWD)
{
    // item is a sword
};
```

---

## Conditional Statements

### if / else if / else

```daedalus
if (type & ITEM_SWD || type & ITEM_AXE)
{
    name = "One-handed weapon";
}
else if (type & ITEM_2HD_SWD || type & ITEM_2HD_AXE)
{
    name = "Two-handed weapon";
}
else
{
    name = "[???]";
};
```

:::danger
Every `if`, `else if`, and `else` block must end with a **semicolon after the closing brace** `};` - this is a Daedalus peculiarity!
:::

### Multi-line Conditions

Daedalus allows writing `&&` and `||` conditions on **new lines** - without parentheses:

```daedalus
if (GanelunDead == TRUE)
&& (RemoveGanelunVarant == FALSE)
{
    B_StartOtherRoutine(PAL_99001_Ganelun, "VERRAT");
    RemoveGanelunVarant = TRUE;
};
```

This is a unique Daedalus syntax feature, commonly found in the original Gothic scripts.

### No switch/case

Daedalus **does not have a `switch/case` statement**. Instead, `if / else if` chains are used:

```daedalus
if (chapter == 1)
{
    // chapter 1 logic
}
else if (chapter == 2)
{
    // chapter 2 logic
}
else if (chapter == 3)
{
    // chapter 3 logic
};
```

---

## Loops

Standard Daedalus **has no loops**. There is no `for`, `while`, or `do/while`.

:::tip
The **Ikarus** library adds `while` and `repeat` loop support through parser hacking. More information on the [Ikarus](./ikarus.md) page.

```daedalus
// while loop (Ikarus)
while(i < 10);
    i += 1;
end;

// repeat loop (LeGo)
repeat(i, 10);
    // code executed 10 times
end;
```

:::

---

## Strings

### Concatenation

**There is no `+` operator for strings.** To join text, use the external function `ConcatStrings()`:

```daedalus
var string text;
text = ConcatStrings("Hello, ", "world!");               // "Hello, world!"
text = ConcatStrings(text, ConcatStrings(" I have ", IntToString(10)));
text = ConcatStrings(text, " gold.");                     // "Hello, world! I have 10 gold."
```

### Comparison

To compare strings, use `Hlp_StrCmp()`:

```daedalus
if (Hlp_StrCmp(option, "yes"))
{
    // option is "yes"
};
```

### Type Conversion

```daedalus
var string s;
s = IntToString(42);     // int → string: "42"
```

:::info
`IntToString()` is the only built-in type conversion. There is no reverse `StringToInt()` in standard Daedalus - the Ikarus library adds it.
:::

---

## Functions

### Function Declaration

Functions are declared with the `func` keyword, specifying return type, name, and parameters:

```daedalus
func void B_SetFightSkills(var C_NPC slf, var int percent)
{
    B_RaiseFightTalent(slf, NPC_TALENT_1H, percent);
    B_RaiseFightTalent(slf, NPC_TALENT_2H, percent);
};
```

```daedalus
func string GetWeaponInfo(var int type, var int range)
{
    var string text;
    text = ConcatStrings("Range: ", IntToString(range));
    return text;
};
```

:::danger
The function body **must** end with a semicolon after the brace: `};`
:::

### Parameters

Parameters must have explicitly declared types:

```daedalus
func void MyFunction(var int a, var string b, var C_NPC npc)
{
    // ...
};
```

### Return Value (`return`)

```daedalus
func int IsPlayerInFight()
{
    var int state;
    state = Npc_GetBodyState(hero);
    if (state == 2)
    {
        return TRUE;
    };
    return FALSE;
};
```

### External Functions (Externals)

These are functions implemented in C++ in the Gothic engine, available to call from Daedalus. They have **no body in scripts** - they are called like regular functions:

```daedalus
// NPC functions
Npc_IsPlayer(self)                         // returns TRUE if the NPC is the player
Npc_HasItems(self, ItPo_Health_01)         // returns the number of ItPo_Health_01 items the NPC has
Npc_KnowsInfo(other, DIA_Fred_Hallo)      // returns TRUE if the NPC has already seen this dialog
Npc_SetTalentSkill(slf, NPC_TALENT_1H, 60) // sets one-handed weapon skill to 60%

// AI functions (queued - execute in order)
AI_Output(self, other, "DIA_Fred_Hallo_15_01")    // NPC says a dialog line (with audio + subtitles)
AI_StopProcessInfos(self)                          // ends the conversation and closes dialog window
AI_StartState(self, ZS_Flee, 0, "")                // switches NPC's AI state to ZS_Flee (fleeing)

// World functions
Wld_InsertNpc(MY_NPC, "WP_SPAWN")         // creates NPC instance and places it at waypoint WP_SPAWN
Wld_InsertItem(ItMw_1h_Sword, "FP_ITEM")  // creates item and places it at freepoint FP_ITEM

// Item/inventory functions
CreateInvItems(self, ItMi_Gold, 100)       // adds 100 gold pieces to NPC's inventory
EquipItem(self, ItMw_1h_Bau_Axe)          // gives the item to NPC (if not in inventory) and equips it

// Model functions
Mdl_SetVisual(slf, "HUMANS.MDS")          // sets the base animation model (skeleton + animations)
Mdl_SetModelFatness(self, 0.5)            // adjusts body fatness (0.0 = normal, negative = thinner)

// Log/mission functions
Log_CreateTopic(TOPIC_MY_QUEST, LOG_MISSION) // creates a new quest entry in the quest log
Log_SetTopicStatus(TOPIC_MY_QUEST, LOG_RUNNING) // marks the quest as active (LOG_SUCCESS = completed)

// Helper functions
Hlp_StrCmp(option, "yes")                 // returns TRUE if both strings are equal
Hlp_GetInstanceID(other)                   // returns the numeric instance ID of the NPC

// Print functions
Print("Text on screen")                    // displays text briefly in the center of the screen
PrintScreen("Text", 50, 50, FONT_Screen, 2) // displays text at position (50%, 50%) for 2 seconds
```

---

## Classes (`class`)

Classes define data structures corresponding to C++ classes in the engine. They contain **only variable declarations** - they have no methods.

Engine classes (e.g., `C_NPC`, `C_Item`, `C_INFO`, `C_Spell`) are predefined and map 1:1 to structures in engine memory. You should not change their field order or add new fields.

### Main Engine Classes

| Class          | Purpose                      |
| -------------- | ---------------------------- |
| `C_NPC`        | Characters (NPCs and player) |
| `C_Item`       | Items                        |
| `C_INFO`       | Dialog entries               |
| `C_Spell`      | Spells                       |
| `C_Mission`    | Missions                     |
| `C_Focus`      | Cursor/targeting settings    |
| `C_FightAI`    | Fight AI moves               |
| `C_SFX`        | Sound effects                |
| `C_ParticleFX` | Particle effects             |
| `C_Menu`       | Menu elements                |
| `C_Menu_Item`  | Menu fields                  |

### C_NPC

The most important class - defines all characters in the game (NPCs and the player).

```daedalus
class C_NPC
{
    var int     id;
    var string  name[5];
    var string  slot;
    var string  effect;
    var int     npcType;
    var int     flags;
    var int     attribute[ATR_INDEX_MAX];
    var int     hitchance[MAX_HITCHANCE];
    var int     protection[PROT_INDEX_MAX];
    var int     damage[DAM_INDEX_MAX];
    var int     damagetype;
    var int     guild;
    var int     level;
    var func    mission[MAX_MISSIONS];
    var int     fight_tactic;
    var int     weapon;
    var int     voice;
    var int     voicePitch;
    var int     bodymass;
    var func    daily_routine;
    var func    start_aistate;
    var string  spawnPoint;
    var int     spawnDelay;
    var int     senses;
    var int     senses_range;
    var int     aivar[100];
    var string  wp;
    var int     exp;
    var int     exp_next;
    var int     lp;
    var int     bodyStateInterruptableOverride;
    var int     noFocus;
};
```

#### C_NPC Fields

| Field                            | Type        | Description                                                                                                                                                                                                                     |
| -------------------------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`                             | `int`       | Unique NPC identifier. Used internally and in save games.                                                                                                                                                                       |
| `name[5]`                        | `string[5]` | NPC name displayed in-game. `name[0]` is the main name. Slots 1-4 can store additional names (e.g. revealed after a quest).                                                                                                     |
| `slot`                           | `string`    | Equipment slot name for attaching the NPC to another object. Rarely used.                                                                                                                                                       |
| `effect`                         | `string`    | Visual effect applied to the NPC (e.g. a magic glow).                                                                                                                                                                           |
| `npcType`                        | `int`       | NPC type. Common values: `NPCTYPE_AMBIENT` (background NPC), `NPCTYPE_MAIN` (important NPC), `NPCTYPE_OCMAIN` (Old Camp main NPC), `NPCTYPE_BL_MAIN` (Bloodwyn main).                                                           |
| `flags`                          | `int`       | NPC flags, combined with `\|`. Values: `NPC_FLAG_FRIEND` (1) - friendly, `NPC_FLAG_IMMORTAL` (2) - cannot die, `NPC_FLAG_GHOST` (4) - ghost (no collision).                                                                     |
| `attribute[8]`                   | `int[8]`    | Character attributes. Indices: `ATR_HITPOINTS` (0), `ATR_HITPOINTS_MAX` (1), `ATR_MANA` (2), `ATR_MANA_MAX` (3), `ATR_STRENGTH` (4), `ATR_DEXTERITY` (5), `ATR_REGENERATEHP` (6), `ATR_REGENERATEMANA` (7).                     |
| `hitchance[5]`                   | `int[5]`    | Hit chance (%) for each weapon type. Indices: `NPC_TALENT_1H` (0 - one-handed), `NPC_TALENT_2H` (1 - two-handed), `NPC_TALENT_BOW` (2), `NPC_TALENT_CROSSBOW` (3).                                                              |
| `protection[8]`                  | `int[8]`    | Protection values per damage type. Indices: `PROT_BARRIER` (0), `PROT_BLUNT` (1), `PROT_EDGE` (2), `PROT_FIRE` (3), `PROT_FLY` (4), `PROT_MAGIC` (5), `PROT_POINT` (6), `PROT_FALL` (7). Use `-1` (`IMMUNE`) for full immunity. |
| `damage[8]`                      | `int[8]`    | Damage values per type (same indices as protection).                                                                                                                                                                            |
| `damagetype`                     | `int`       | Type of damage dealt by bare hands. Values: `DAM_BLUNT`, `DAM_EDGE`, etc.                                                                                                                                                       |
| `guild`                          | `int`       | Guild the NPC belongs to. Examples: `GIL_PAL` (Paladins), `GIL_MIL` (Militia), `GIL_VLK` (Citizens), `GIL_KDF` (Mages), `GIL_SLD` (Mercenaries), `GIL_BAU` (Farmers), `GIL_BDT` (Bandits).                                      |
| `level`                          | `int`       | NPC level - used for experience calculation and display.                                                                                                                                                                        |
| `mission[5]`                     | `func[5]`   | Mission callback functions for different mission states.                                                                                                                                                                        |
| `fight_tactic`                   | `int`       | Fight AI behavior. Set to a `FAI_` constant (e.g. `FAI_HUMAN_COWARD`, `FAI_HUMAN_MASTER`).                                                                                                                                      |
| `weapon`                         | `int`       | Initial weapon state upon entering the world.                                                                                                                                                                                   |
| `voice`                          | `int`       | Voice set index (0-100). Maps to `SVM_<voice>` for standard voice lines and determines `AI_Output` audio file names.                                                                                                            |
| `voicePitch`                     | `int`       | Voice pitch modification. `0` = normal.                                                                                                                                                                                         |
| `bodymass`                       | `int`       | Body mass - affects ragdoll physics when NPC dies.                                                                                                                                                                              |
| `daily_routine`                  | `func`      | Daily routine function called on spawn. Must be a `Rtn_` function (e.g. `Rtn_Start_4401`).                                                                                                                                      |
| `start_aistate`                  | `func`      | Initial AI state function. If set, the NPC starts in this AI state instead of the daily routine.                                                                                                                                |
| `spawnPoint`                     | `string`    | Waypoint where the NPC spawns.                                                                                                                                                                                                  |
| `spawnDelay`                     | `int`       | Delay (in seconds) before the NPC respawns after death. `0` = no respawn.                                                                                                                                                       |
| `senses`                         | `int`       | Which senses the NPC has, combined with `\|`. Values: `SENSE_SEE` (1), `SENSE_HEAR` (2), `SENSE_SMELL` (4).                                                                                                                     |
| `senses_range`                   | `int`       | Maximum perception range in centimeters.                                                                                                                                                                                        |
| `aivar[100]`                     | `int[100]`  | AI variables - general-purpose storage used by AI scripts. Indexed with `AIV_` constants (e.g. `AIV_ATTACKREASON`).                                                                                                             |
| `wp`                             | `string`    | Current waypoint name.                                                                                                                                                                                                          |
| `exp`                            | `int`       | Current experience points.                                                                                                                                                                                                      |
| `exp_next`                       | `int`       | Experience points needed for next level.                                                                                                                                                                                        |
| `lp`                             | `int`       | Available learning points.                                                                                                                                                                                                      |
| `bodyStateInterruptableOverride` | `int`       | If `TRUE`, allows body state interruption.                                                                                                                                                                                      |
| `noFocus`                        | `int`       | If `TRUE`, the player cannot focus (target) this NPC.                                                                                                                                                                           |

### C_Item

Defines all items in the game - weapons, armor, potions, quest items, runes, food, and more.

```daedalus
class C_Item
{
    var int     id;
    var string  name;
    var string  nameID;
    var int     hp;
    var int     hp_max;
    var int     mainflag;
    var int     flags;
    var int     weight;
    var int     value;
    var int     damagetype;
    var int     damagetotal;
    var int     damage[DAM_INDEX_MAX];
    var int     wear;
    var int     protection[PROT_INDEX_MAX];
    var int     nutrition;
    var int     cond_atr[3];
    var int     cond_value[3];
    var int     change_atr[3];
    var int     change_value[3];
    var func    magic;
    var func    on_equip;
    var func    on_unequip;
    var func    on_state[4];
    var func    owner;
    var int     ownerGuild;
    var int     disguiseGuild;
    var string  visual;
    var string  visual_change;
    var string  effect;
    var int     visual_skin;
    var string  scemeName;
    var int     material;
    var int     munition;
    var int     spell;
    var int     range;
    var int     mag_circle;
    var string  description;
    var string  text[6];
    var int     count[6];
    var int     inv_zbias;
    var int     inv_rotx;
    var int     inv_roty;
    var int     inv_rotz;
    var int     inv_animate;
};
```

#### C_Item Fields

| Field             | Type        | Description                                                                                                                                                                                                                                                                                                                              |
| ----------------- | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`              | `int`       | Unique item identifier.                                                                                                                                                                                                                                                                                                                  |
| `name`            | `string`    | Item name displayed in-game.                                                                                                                                                                                                                                                                                                             |
| `nameID`          | `string`    | Internal name identifier.                                                                                                                                                                                                                                                                                                                |
| `hp`              | `int`       | Current hit points of the item (e.g. for destructible items).                                                                                                                                                                                                                                                                            |
| `hp_max`          | `int`       | Maximum hit points of the item.                                                                                                                                                                                                                                                                                                          |
| `mainflag`        | `int`       | Main item category. Values: `ITEM_KAT_NONE` (1), `ITEM_KAT_NF` (melee), `ITEM_KAT_FF` (ranged), `ITEM_KAT_MUN` (ammo), `ITEM_KAT_ARMOR` (armor), `ITEM_KAT_FOOD` (food), `ITEM_KAT_DOCS` (documents), `ITEM_KAT_POTIONS` (potions), `ITEM_KAT_LIGHT` (light sources), `ITEM_KAT_RUNE` (runes), `ITEM_KAT_MAGIC` (magic items).           |
| `flags`           | `int`       | Item sub-type flags, combined with `\|`. Common values: `ITEM_SWD` (sword), `ITEM_AXE` (axe), `ITEM_2HD_SWD` (two-handed sword), `ITEM_2HD_AXE` (two-handed axe), `ITEM_BOW` (bow), `ITEM_CROSSBOW` (crossbow), `ITEM_RING` (ring), `ITEM_AMULET` (amulet), `ITEM_MULTI` (stackable), `ITEM_MISSION` (quest item), `ITEM_TORCH` (torch). |
| `weight`          | `int`       | Item weight (unused by engine, but available for scripts).                                                                                                                                                                                                                                                                               |
| `value`           | `int`       | Item price/value in gold.                                                                                                                                                                                                                                                                                                                |
| `damagetype`      | `int`       | Type of damage the weapon deals. Values: `DAM_BLUNT`, `DAM_EDGE`, `DAM_POINT`, `DAM_FIRE`, `DAM_MAGIC`, etc.                                                                                                                                                                                                                             |
| `damagetotal`     | `int`       | Total damage value of the weapon.                                                                                                                                                                                                                                                                                                        |
| `damage[8]`       | `int[8]`    | Damage split by damage type (same indices as `C_NPC.protection`).                                                                                                                                                                                                                                                                        |
| `wear`            | `int`       | Where the item is worn. Values: `WEAR_TORSO` (1), `WEAR_HEAD` (2), `WEAR_EFFECT` (16).                                                                                                                                                                                                                                                   |
| `protection[8]`   | `int[8]`    | Protection values per damage type when equipped (same indices as `C_NPC.protection`).                                                                                                                                                                                                                                                    |
| `nutrition`       | `int`       | HP restored when eating the item.                                                                                                                                                                                                                                                                                                        |
| `cond_atr[3]`     | `int[3]`    | Required attributes to use the item (ATR\_ constants).                                                                                                                                                                                                                                                                                   |
| `cond_value[3]`   | `int[3]`    | Required attribute values (paired with `cond_atr`).                                                                                                                                                                                                                                                                                      |
| `change_atr[3]`   | `int[3]`    | Attributes changed when the item is equipped (ATR\_ constants).                                                                                                                                                                                                                                                                          |
| `change_value[3]` | `int[3]`    | How much the attributes change (paired with `change_atr`).                                                                                                                                                                                                                                                                               |
| `magic`           | `func`      | Spell function associated with the item (for runes/scrolls).                                                                                                                                                                                                                                                                             |
| `on_equip`        | `func`      | Function called when the item is equipped.                                                                                                                                                                                                                                                                                               |
| `on_unequip`      | `func`      | Function called when the item is unequipped.                                                                                                                                                                                                                                                                                             |
| `on_state[4]`     | `func[4]`   | State functions called when the item is used. `on_state[0]` is the most common - called when eating/drinking.                                                                                                                                                                                                                            |
| `owner`           | `func`      | NPC instance that owns the item. Taking it is considered theft.                                                                                                                                                                                                                                                                          |
| `ownerGuild`      | `int`       | Guild that owns this item. Taking it is theft for that guild's members.                                                                                                                                                                                                                                                                  |
| `disguiseGuild`   | `int`       | Wearing this armor disguises the player as this guild.                                                                                                                                                                                                                                                                                   |
| `visual`          | `string`    | 3D model file name (`.3ds` format).                                                                                                                                                                                                                                                                                                      |
| `visual_change`   | `string`    | Visual applied to the NPC when the item is equipped (for armor - `.asc` file).                                                                                                                                                                                                                                                           |
| `effect`          | `string`    | Visual effect applied when equipped.                                                                                                                                                                                                                                                                                                     |
| `visual_skin`     | `int`       | Texture skin variant index.                                                                                                                                                                                                                                                                                                              |
| `scemeName`       | `string`    | Animation scheme name. Common values: `"POTIONFAST"` (drink quickly), `"YOURSHORT"` (eat), `"YOURSHORT"` (read), `"YOURSHORT"` (use).                                                                                                                                                                                                    |
| `material`        | `int`       | Material type (affects sounds). Values: `MAT_WOOD`, `MAT_STONE`, `MAT_METAL`, `MAT_LEATHER`, `MAT_CLAY`, `MAT_GLAS`.                                                                                                                                                                                                                     |
| `munition`        | `int`       | Ammunition item instance for ranged weapons (e.g. `ItRw_Arrow`).                                                                                                                                                                                                                                                                         |
| `spell`           | `int`       | Spell ID associated with the item (for runes/scrolls).                                                                                                                                                                                                                                                                                   |
| `range`           | `int`       | Weapon range in centimeters.                                                                                                                                                                                                                                                                                                             |
| `mag_circle`      | `int`       | Required magic circle to use the item (for runes).                                                                                                                                                                                                                                                                                       |
| `description`     | `string`    | Description shown in inventory. Usually set to `name`.                                                                                                                                                                                                                                                                                   |
| `text[6]`         | `string[6]` | Six lines of text displayed in the inventory description box (e.g. stat labels).                                                                                                                                                                                                                                                         |
| `count[6]`        | `int[6]`    | Values displayed next to each `text[]` line (e.g. damage numbers).                                                                                                                                                                                                                                                                       |
| `inv_zbias`       | `int`       | Z-depth offset for inventory rendering.                                                                                                                                                                                                                                                                                                  |
| `inv_rotx`        | `int`       | X rotation for inventory display (in degrees).                                                                                                                                                                                                                                                                                           |
| `inv_roty`        | `int`       | Y rotation for inventory display (in degrees).                                                                                                                                                                                                                                                                                           |
| `inv_rotz`        | `int`       | Z rotation for inventory display (in degrees).                                                                                                                                                                                                                                                                                           |
| `inv_animate`     | `int`       | If `TRUE`, the item rotates in inventory.                                                                                                                                                                                                                                                                                                |

### C_Spell

Defines spell behavior and parameters.

```daedalus
class C_Spell
{
    var float   time_per_mana;
    var int     damage_per_level;
    var int     damageType;
    var int     spellType;
    var int     canTurnDuringInvest;
    var int     canChangeTargetDuringInvest;
    var int     isMultiEffect;
    var int     targetCollectAlgo;
    var int     targetCollectType;
    var int     targetCollectRange;
    var int     targetCollectAzi;
    var int     targetCollectElev;
};
```

#### C_Spell Fields

| Field                         | Type    | Description                                                                                                       |
| ----------------------------- | ------- | ----------------------------------------------------------------------------------------------------------------- |
| `time_per_mana`               | `float` | Time (in milliseconds) to invest one mana point during casting. Controls casting speed.                           |
| `damage_per_level`            | `int`   | Additional damage per caster level.                                                                               |
| `damageType`                  | `int`   | Type of damage the spell deals (`DAM_MAGIC`, `DAM_FIRE`, `DAM_FLY`, etc.).                                        |
| `spellType`                   | `int`   | Spell alignment. Values: `SPELL_BAD` (hostile - breaks dialog, triggers combat), `SPELL_GOOD` (friendly/neutral). |
| `canTurnDuringInvest`         | `int`   | If `TRUE`, the caster can rotate during the invest (charging) phase.                                              |
| `canChangeTargetDuringInvest` | `int`   | If `TRUE`, the caster can switch targets during the invest phase.                                                 |
| `isMultiEffect`               | `int`   | If `TRUE`, the spell can hit multiple targets.                                                                    |
| `targetCollectAlgo`           | `int`   | Algorithm for collecting targets (used for multi-target spells).                                                  |
| `targetCollectType`           | `int`   | Type of entities that can be targeted.                                                                            |
| `targetCollectRange`          | `int`   | Maximum range for collecting targets (in centimeters).                                                            |
| `targetCollectAzi`            | `int`   | Azimuth angle for target collection cone (in degrees).                                                            |
| `targetCollectElev`           | `int`   | Elevation angle for target collection cone (in degrees).                                                          |

---

## Prototypes (`prototype`)

A prototype is a **template** based on a class, with pre-filled default values. Instances can inherit from a prototype instead of setting everything from scratch.

```daedalus
prototype Npc_Default(C_NPC)
{
    attribute[ATR_STRENGTH]       = 10;
    attribute[ATR_DEXTERITY]      = 10;
    attribute[ATR_MANA_MAX]       = 10;
    attribute[ATR_MANA]           = 10;
    attribute[ATR_HITPOINTS_MAX]  = 40;
    attribute[ATR_HITPOINTS]      = 40;

    HitChance[NPC_TALENT_1H]     = 0;
    HitChance[NPC_TALENT_2H]     = 0;

    protection[PROT_EDGE]        = 0;
    protection[PROT_BLUNT]       = 0;

    damagetype                    = DAM_BLUNT;
    senses                        = SENSE_HEAR | SENSE_SEE;
    senses_range                  = PERC_DIST_ACTIVE_MAX;
};
```

Prototypes simplify the creation of many similar instances - you only need to override values that differ from the defaults.

### Common Use Cases

#### NPC Prototype (`Npc_Default`)

The most common prototype in Gothic. Almost every NPC instance inherits from it. It sets sensible defaults for attributes, senses, protections, and damage type, so individual NPC definitions only need to specify what's unique: name, guild, visual, AI, and dialogue.

```daedalus
// Every human NPC uses Npc_Default
instance BAU_4401_Fred(Npc_Default)
{
    name      = "Fred";
    guild     = GIL_BAU;
    id        = 4401;
    // ... only unique fields - the rest comes from Npc_Default
};
```

#### Spell Prototype (`C_Spell_Proto`)

Used for all spell definitions. Sets default cast time, damage type, and behavior so individual spells only need to override specific parameters.

```daedalus
prototype C_Spell_Proto(C_Spell)
{
    time_per_mana        = 500;
    damage_per_level     = 1;
    damageType           = DAM_MAGIC;
    spellType            = SPELL_BAD;
    canTurnDuringInvest  = 1;
};

instance Spell_Fireball(C_Spell_Proto)
{
    time_per_mana        = 800;
    damage_per_level     = 15;
    damageType           = DAM_FIRE;
    // spellType, canTurnDuringInvest - inherited from prototype
};
```

#### Item Prototypes

In the original scripts, items are usually created directly from `C_Item` without a prototype. However, creating custom prototypes for items is a useful technique when making a mod with many similar items:

```daedalus
// Custom prototype for one-handed swords
prototype ItMw_1H_Common(C_Item)
{
    mainflag    = ITEM_KAT_NF;
    flags       = ITEM_SWD;
    damagetype  = DAM_EDGE;
    material    = MAT_METAL;
    cond_atr[2] = ATR_STRENGTH;
    wear        = WEAR_TORSO;
    scemeName   = "1HSWORD";
};

instance ItMw_1h_RustySword(ItMw_1H_Common)
{
    name          = "Rusty Sword";
    visual        = "ItMw_010_1h_Sword_short_01.3ds";
    damagetotal   = 15;
    cond_value[2] = 10;
    value         = 30;
    description   = name;
};
```

:::tip
Use prototypes whenever you have **3 or more instances** sharing most of the same field values. It reduces code duplication and makes bulk changes easier - modify the prototype and all inheriting instances update automatically.
:::

---

## Instances (`instance`)

An instance creates a **concrete object** based on a prototype or directly from a class. Unlike classes and prototypes, instances can contain **executable code** (function calls).

### NPC Instance (from prototype)

```daedalus
instance BAU_4410_Klara(Npc_Default)
{
    name      = "Klara";
    guild     = GIL_BAU;
    id        = 4410;
    voice     = 57;
    flags     = 0;
    npctype   = NPCTYPE_MAIN;

    // Function calls - executable code!
    B_SetAttributesToChapter(self, 4);
    B_GiveNpcTalents(self);
    fight_tactic = FAI_HUMAN_COWARD;
    EquipItem(self, ItMw_1h_Bau_Axe);
    B_SetNpcVisual(self, FEMALE, "Hum_Head_Babe5", FaceBabe_N_OldBlonde, BodyTex_N, ITAR_BauBabe_L);
    Mdl_SetModelFatness(self, 0.5);
    B_SetFightSkills(self, 35);
    daily_routine = Rtn_MELCHIORSHAUS_4410;
};
```

### Item Instance (from class)

```daedalus
instance ItPo_Health_01(C_Item)
{
    name       = "Healing Essence";
    mainflag   = ITEM_KAT_POTIONS;
    flags      = ITEM_MULTI;
    value      = 50;
    visual     = "ItPo_Health_01.3ds";
    material   = MAT_GLAS;
    on_state[0] = UseItPo_Health_01;
    scemeName  = "POTIONFAST";
    description = name;
    TEXT[5]    = NAME_Value;
    COUNT[5]   = value;
};
```

### Dialog Instance

```daedalus
instance DIA_Fred_EXIT(C_INFO)
{
    npc         = BAU_4401_Fred;
    nr          = 999;
    condition   = DIA_Fred_EXIT_Condition;
    information = DIA_Fred_EXIT_Info;
    permanent   = TRUE;
    description = DIALOG_ENDE;
};
```

### Global Engine Instances

The Gothic engine defines several special global instances that are always available:

```daedalus
instance self, other(C_NPC);     // current NPC and dialog partner
instance victim(C_NPC);          // victim (in perceptions)
instance item(C_Item);           // current item
instance hero(C_NPC);            // the player - always available
```

| Instance | Description                                                                         |
| -------- | ----------------------------------------------------------------------------------- |
| `self`   | The NPC for which the current script is executing                                   |
| `other`  | The other interaction participant (e.g., in dialog: `self` = NPC, `other` = player) |
| `hero`   | Always points to the player character                                               |
| `victim` | Victim in perception callbacks                                                      |
| `item`   | Set by certain external functions (e.g., `Npc_GetInvItem`)                          |

---

## Comments

Comments are fragments of code ignored by the compiler - they serve as notes for the programmer. Daedalus supports two styles of comments, identical to C/C++.

### Single-line comment (`//`)

Everything after `//` to the end of the line is ignored by the compiler:

```daedalus
// This is a single-line comment
const int ATR_HITPOINTS = 0;    // end-of-line comment
var int myVar;                  // variable description
```

### Multi-line comment (`/* */`)

Everything between `/*` and `*/` is ignored, even across multiple lines:

```daedalus
/*
   This is a
   multi-line comment
*/

/* Single-line block comment */
```

:::warning
Multi-line comments **cannot be nested**. The following code will cause a compilation error:

```daedalus
/* outer comment
    /* inner comment */
   this line will cause an error!
*/
```

:::

:::danger
The `//` comment on the same line as `AI_Output` is a **special case** - the parser treats it as subtitle text, not as a regular comment! See the [Dialog System](#dialog-system---ai_output) section above.
:::

---

## Compilation - Gothic.src

Daedalus files are not compiled individually. The **`Gothic.src`** file (in the `Content/` directory) contains an **ordered list** of all `.d` files to compile:

```
_INTERN\CONSTANTS.D
_INTERN\CLASSES.D
AI\AI_INTERN\AI_CONSTANTS.D
AI\AI_INTERN\BODYSTATES.D
STORY\NPC\BAU_4401_Fred.D
STORY\DIALOGE\DIA_BAU_4401_Fred.D
STORY\Startup.d
```

### Compilation Rules

1. **Order matters** - a symbol must be declared **before** it's used. Constants and classes must be at the top of the list.
2. **`*.d` wildcards** - you can use wildcards: `STORY\NPC\*.D` will include all `.d` files from the folder.
3. **`.src` files as includes** - `Gothic.src` can reference other `.src` files (e.g., `Ikarus\Ikarus.d`).
4. **Compilation output** - the `Gothic.dat` file in the `System/` directory, read by the engine.

---

## Special Syntax Features

### Case Sensitivity - None

Daedalus is **case-insensitive**. The following are equivalent:

```daedalus
const int MY_VALUE = 10;
CONST INT MY_VALUE = 10;
Const Int My_Value = 10;

var string name;
VAR STRING name;

func void MyFunction() {};
FUNC VOID MyFunction() {};
```

In practice, the original scripts freely mix `CONST INT`, `const int`, `VAR INT`, `var int`, `FUNC VOID`, `func void`.

### Semicolons - Everywhere!

One of Daedalus's most distinctive features is the **mandatory semicolon after every code block**, including closing braces:

```daedalus
if (x == 1)
{
    // code
};              // ← semicolon after brace!

func void Foo()
{
    // code
};              // ← semicolon after function!

class C_NPC
{
    var int id;
};              // ← semicolon after class!

prototype Npc_Default(C_NPC)
{
    // ...
};              // ← semicolon after prototype!
```

:::danger
Missing semicolons after `};` is one of the most common beginner mistakes. The compiler will throw an error or - worse - compile the code incorrectly.
:::

### Missing Advanced Constructs

Daedalus **does not have** many constructs found in modern languages:

| What's Missing                | Alternative                              |
| ----------------------------- | ---------------------------------------- |
| Loops (`for`, `while`)        | Ikarus library adds `while` and `repeat` |
| `switch / case`               | `if / else if` chains                    |
| Dynamic arrays                | Ikarus - direct memory access            |
| Pointers                      | Ikarus - `_^()` (address casting)        |
| Structs                       | Only `class`                             |
| Methods in classes            | Standalone functions                     |
| Function overloading          | Unique function names                    |
| Namespaces                    | Naming conventions (prefixes)            |
| String concatenation with `+` | `ConcatStrings()`                        |

---

## Dialog System - AI_Output

Gothic's dialog system is based on the `AI_Output` function and the `C_INFO` class. It has a unique parsing mechanism that differs from anything in standard programming languages.

### C_INFO - Dialog Entry Definition

Each dialog option is an instance of the `C_INFO` class:

```daedalus
instance DIA_Konrad_Hallo(C_INFO)
{
    npc         = BAU_900_Konrad;            // which NPC this dialog belongs to
    nr          = 4;                          // sort order (lower = higher in list)
    condition   = DIA_Konrad_Hallo_Condition; // condition function (TRUE = show option)
    information = DIA_Konrad_Hallo_Info;      // function executed when option is chosen
    permanent   = FALSE;                      // repeatable?
    important   = FALSE;                      // does NPC approach and start talking?
    description = "Hi, how are you?";         // text visible in option list
};
```

| Field         | Description                                                        |
| ------------- | ------------------------------------------------------------------ |
| `npc`         | NPC instance this dialog belongs to                                |
| `nr`          | Sort order - lower number = higher in list. EXIT usually has `999` |
| `condition`   | Function returning `TRUE` if the option should be visible          |
| `information` | Function called when option is selected (AI_Output calls go here)  |
| `permanent`   | `TRUE` = always available, `FALSE` = disappears after use          |
| `important`   | `TRUE` = NPC approaches player and starts conversation             |
| `description` | Text shown in dialog menu                                          |
| `trade`       | `TRUE` = opens trade window                                        |

### AI_Output - NPC Speech Line

```daedalus
func void AI_Output(var C_NPC speaker, var C_NPC listener, var string outputName);
```

This is the core dialog system function. It makes an NPC speak a line with audio and subtitles.

#### Who Speaks - Parameter Order

- **`AI_Output(self, other, "...")`** → the **NPC** speaks (self = NPC, other = player)
- **`AI_Output(other, self, "...")`** → the **player** speaks (other = hero, self = NPC listens)

```daedalus
func void DIA_Konrad_Hallo_Info()
{
    AI_Output(self, other, "DIA_Konrad_Hallo_08_01"); //Hey, good to see you!
    AI_Output(other, self, "DIA_Konrad_Hallo_15_01"); //How have you been?
    AI_Output(self, other, "DIA_Konrad_Hallo_08_02"); //Same as always.
};
```

#### Comment Parsing as Subtitle Text

This is a **unique Daedalus parser feature** - the `//` comment on the same line as `AI_Output` **is not ignored**. The parser treats it as **subtitle text** displayed on screen.

```daedalus
AI_Output(self, other, "DIA_Konrad_Hallo_08_01"); //Hey, good to see you!
//                                                    ^^^^^^^^^^^^^^^^^^^^^^^
//                                                    This comment IS the subtitles!
```

:::danger
The subtitle comment **must** be on the **same line** as the `AI_Output` call. If you move it to the next line - subtitles will be empty.

```daedalus
// ❌ WRONG - subtitles will be empty!
AI_Output(self, other, "DIA_Konrad_Hallo_08_01");
//Hey, good to see you!

// ✅ CORRECT - subtitles work
AI_Output(self, other, "DIA_Konrad_Hallo_08_01"); //Hey, good to see you!
```

:::

#### Output Identifier - Naming Convention

Format: **`DIA_<NPC>_<Topic>_<VoiceNumber>_<LineNumber>`**

Example: `DIA_Konrad_Hallo_08_01`

| Part     | Meaning                                                         |
| -------- | --------------------------------------------------------------- |
| `DIA`    | Prefix - dialog                                                 |
| `Konrad` | NPC name                                                        |
| `Hallo`  | Topic/dialog name                                               |
| `08`     | **Voice number** of the NPC (`voice` field in `C_NPC` instance) |
| `01`     | **Line number** in the dialog (sequential)                      |

The player's voice number is always **`15`**:

```daedalus
AI_Output(self, other, "DIA_Konrad_Hallo_08_01"); //Konrad speaks (voice = 8)
AI_Output(other, self, "DIA_Konrad_Hallo_15_01"); //Player speaks (voice = 15)
```

#### Mapping to WAV Audio File

The output identifier is directly the audio file name:

```
Gothic II/Data/Sound/Speech/DIA_Konrad_Hallo_08_01.WAV
Gothic II/Data/Sound/Speech/DIA_Konrad_Hallo_15_01.WAV
```

If the WAV file doesn't exist, only subtitles are displayed (no audio). Audio is not required when creating a mod.

### Dialog Choices (Info_AddChoice)

For branching dialogs, use `Info_AddChoice` and `Info_ClearChoices`:

```daedalus
func void DIA_Konrad_Offer_Info()
{
    AI_Output(self, other, "DIA_Konrad_Offer_08_01"); //I can help you. What do you need?

    Info_ClearChoices(DIA_Konrad_Offer);   // clear previous options
    Info_AddChoice(DIA_Konrad_Offer, "I need a weapon.", DIA_Konrad_Offer_Weapon);
    Info_AddChoice(DIA_Konrad_Offer, "I need a potion.", DIA_Konrad_Offer_Potion);
    Info_AddChoice(DIA_Konrad_Offer, "I don't need anything.", DIA_Konrad_Offer_Nothing);
};

func void DIA_Konrad_Offer_Weapon()
{
    AI_Output(other, self, "DIA_Konrad_Offer_Weapon_15_01"); //Give me a sword.
    AI_Output(self, other, "DIA_Konrad_Offer_Weapon_08_01"); //Here you go.
    Info_ClearChoices(DIA_Konrad_Offer);   // close choice menu
};
```

### Ending a Dialog

Standard EXIT pattern:

```daedalus
instance DIA_Konrad_EXIT(C_INFO)
{
    npc         = BAU_900_Konrad;
    nr          = 999;                        // always last in list
    condition   = DIA_Konrad_EXIT_Condition;
    information = DIA_Konrad_EXIT_Info;
    permanent   = TRUE;                       // always available
    description = DIALOG_ENDE;                // constant = "END"
};

func int DIA_Konrad_EXIT_Condition() { return TRUE; };

func void DIA_Konrad_EXIT_Info()
{
    AI_StopProcessInfos(self);   // end conversation
};
```

### Checking if a Dialog Was Already Seen

```daedalus
// In another dialog's condition:
func int DIA_Konrad_Continue_Condition()
{
    if (Npc_KnowsInfo(other, DIA_Konrad_Hallo))  // player saw the Hallo dialog?
    {
        return TRUE;
    };
    return FALSE;
};
```

### AI_OutputSVM - Standard Voice Messages

Besides `AI_Output`, there is `AI_OutputSVM` for playing **Standard Voice Messages** (SVM). These are pre-made lines like combat shouts, greetings, warnings:

```daedalus
// NPC says a standard voice line
B_Say(self, other, "$NOTNOW");              // "Leave me alone!"
B_Say(self, other, "$Alarm");               // "ALARM!"
B_Say(self, other, "$HandsOff");            // "Hands off!"
```

Each NPC has a `voice` field in `C_NPC` that points to an SVM set (`SVM_0`, `SVM_1`, ..., `SVM_100`). The `C_SVM` class defines hundreds of standard lines, and each voice set has its own audio files.

`AI_OutputSVM_Overlay` works like `AI_OutputSVM` but is **non-blocking** - it doesn't wait for playback to finish. Used for combat shouts.

---

## Naming Conventions

The original Gothic scripts use prefixes indicating the type and purpose of a symbol:

| Prefix      | Meaning                     | Example                              |
| ----------- | --------------------------- | ------------------------------------ |
| `C_`        | Class                       | `C_NPC`, `C_Item`, `C_INFO`          |
| `B_`        | Basic function (reusable)   | `B_SetFightSkills`, `B_GivePlayerXP` |
| `ZS_`       | AI state (Zustand)          | `ZS_Attack`, `ZS_Flee`, `ZS_Talk`    |
| `TA_`       | Daily routine (Tagesablauf) | `TA_Sleep`, `TA_Cook_Cauldron`       |
| `DIA_`      | Dialog                      | `DIA_Fred_Hallo`                     |
| `IT` / `It` | Item                        | `ItMw_1h_Sword`, `ItPo_Health_01`    |
| `FA_`       | Fight AI instance           | `FA_ENEMY_PREHIT_6`                  |
| `FAI_`      | Fight AI constant           | `FAI_HUMAN_COWARD`                   |
| `GIL_`      | Guild                       | `GIL_PAL`, `GIL_MIL`, `GIL_BAU`      |
| `ATR_`      | Attribute                   | `ATR_STRENGTH`, `ATR_HITPOINTS`      |
| `DAM_`      | Damage type                 | `DAM_BLUNT`, `DAM_EDGE`              |
| `PERC_`     | Perception                  | `PERC_ASSESSENEMY`                   |
| `AIV_`      | AI variable index           | `AIV_ATTACKREASON`                   |
| `Rtn_`      | Daily routine function      | `Rtn_Start_4401`                     |

Following these conventions is not required by the compiler but is **strongly recommended** - it improves readability and is consistent with the original script style.
