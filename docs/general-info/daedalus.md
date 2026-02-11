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
Npc_IsPlayer(self)                         // is this the player?
Npc_HasItems(self, ItPo_Health_01)         // does the NPC have the item?
Npc_KnowsInfo(other, DIA_Fred_Hallo)      // does NPC know this info?
Npc_SetTalentSkill(slf, NPC_TALENT_1H, 60)

// AI functions
AI_Output(self, other, "DIA_Fred_Hallo_15_01")    // NPC speech line
AI_StopProcessInfos(self)                          // end dialog
AI_StartState(self, ZS_Flee, 0, "")                // change AI state

// World functions
Wld_InsertNpc(MY_NPC, "WP_SPAWN")         // insert NPC into world
Wld_InsertItem(ItMw_1h_Sword, "FP_ITEM")  // insert item into world

// Item functions
CreateInvItems(self, ItMi_Gold, 100)       // give gold
EquipItem(self, ItMw_1h_Bau_Axe)          // equip item

// Model functions
Mdl_SetVisual(slf, "HUMANS.MDS")
Mdl_SetModelFatness(self, 0.5)

// Log/mission functions
Log_CreateTopic(TOPIC_MY_QUEST, LOG_MISSION)
Log_SetTopicStatus(TOPIC_MY_QUEST, LOG_RUNNING)

// Helper functions
Hlp_StrCmp(option, "yes")                 // compare strings
Hlp_GetInstanceID(other)                   // get instance ID

// Print functions
Print("Text on screen")
PrintScreen("Text", 50, 50, FONT_Screen, 2)
```

---

## Classes (`class`)

Classes define data structures corresponding to C++ classes in the engine. They contain **only variable declarations** - they have no methods.

```daedalus
class C_NPC
{
    var int     id;
    var string  name[5];
    var string  slot;
    var int     npcType;
    var int     flags;
    var int     attribute[ATR_INDEX_MAX];
    var int     HitChance[MAX_HITCHANCE];
    var int     protection[PROT_INDEX_MAX];
    var int     damage[DAM_INDEX_MAX];
    var int     damagetype;
    var int     guild;
    var int     level;
    var func    mission[MAX_MISSIONS];
    var func    daily_routine;
    var int     senses;
    var int     senses_range;
    var int     aivar[100];
    var string  wp;
    var int     exp;
    var int     exp_next;
    var int     lp;
};
```

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

```daedalus
prototype C_Spell_Proto(C_Spell)
{
    time_per_mana        = 500;
    damage_per_level     = 1;
    damageType           = DAM_MAGIC;
    spellType            = SPELL_BAD;
    canTurnDuringInvest  = 1;
};
```

Prototypes simplify the creation of many similar instances - you only need to override values that differ from the defaults.

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

```daedalus
// This is a single-line comment

/*
   This is a
   multi-line comment
*/

const int ATR_HITPOINTS = 0;    // end-of-line comment
```

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
