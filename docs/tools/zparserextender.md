---
title: zParserExtender
description: A Union plugin that extends the capabilities of the Daedalus parser.
sidebar_position: 1
---

# zParserExtender

**zParserExtender** is a plugin for **Union** created by **Gratt** that significantly expands the functionality of the Daedalus scripting language. It adds new syntax features, event handling, and direct access to engine classes, allowing for more complex and dynamic modding capabilities without relying solely on external tools or complex memory hacks. Requires Union 1.0l or higher.

:::info
Since Union 1.0m, **zParserExtender** is fully integrated, so you typically do not need to install it separately if you are using a modern Union version.
:::

## General Functions for Extension and Embedding

### 1. External Functions and Variables

zParserExtender allows for defining external functions and variables that can be shared between scripts or used to interface with the engine more directly.

### 2. WHILE Cycle

The standard Daedalus language only supports `if` / `else` conditionals. zParserExtender adds support for `while` loops, making iteration much easier.

```daedalus
var int value;
value = 10;

while(value > 0) {
    if (value == 8) {
        continue;
    };
    if (value == 2) {
        break;
    };
    value -= 1;
};
```

### 3. Namespaces

Namespaces allow you to organize your code and avoid naming collisions. You can define variables, functions, and even new classes or prototypes within a specific scope. This is not limited to referencing existing symbols; you can create entirely new logic encapsulated within a namespace.

#### Definition

```daedalus
namespace zTestNamespace {
    var int var01;
    func void func01() { };
    
    // You can define new instances or prototypes here too
    prototype MyProto(C_Npc) { ... };
};
```

#### Omission of Namespace specification

You do not need to specify the namespace prefix in the following cases:
1.  **Same Namespace**: When accessing a symbol defined in the same namespace.
2.  **Parent Namespace**: When accessing a symbol defined in a parent namespace (from a nested namespace).
3.  **Using**: When the namespace is included in the `Using` list in the `META` block (see below).

#### Usage in META Block

You can define a default namespace for a script file using the `META` block.

```daedalus
META {
    Namespace = zTestNamespace;
};

var int var01; // Belongs to zTestNamespace
func void func01() { }; // Belongs to zTestNamespace
```

#### Nested Namespaces

```daedalus
META {
    Namespace = zTestNamespace01;
};

namespace zTestNamespace02 {
    namespace Definitions {
        var int var01;
    };
    func void func01() { };
};
```

#### Accessing Members

You can access members of other namespaces using the colon `:` separator.

```daedalus
func event GameInit() {
    // Accessing from global namespace
    zTestNamespace01:func01();
    zTestNamespace02:func01();
    zTestNamespace03:zTestNamespace04:func01();
};
```

#### Relative Access

You can use standard C++-like scope resolution:
-   `func01()`: Current namespace.
-   `:func01()`: Parent namespace (1 level up).
-   `::func01()`: 2 levels up.
-   `:::func01()`: 3 levels up.

### 4. Event Functions

zParserExtender introduces a new keyword `event`. Event functions are special functions that can be called by the engine or other scripts using `Hlp_DoEvent`.

```daedalus
func void GiveXP() {
    Hlp_DoEvent("OnGiveXP");
};

func event OnGiveXP() {
    // This code will be executed when "OnGiveXP" is triggered
};
```

#### GameInit

`GameInit` is a special event that is automatically called when the game initializes. It is useful for initializing your global variables or setting up hooks.

```daedalus
func event GameInit() {
    // Initialization code here
};
```

#### GameLoop

`GameLoop` is a special event called once **every frame** while the world is loaded. It is useful for continuous checks or updates.

```daedalus
func event GameLoop() {
    // Code executed every frame
};
```

### 5. Trigger Functions

Triggers allows you to execute code periodically or after a delay. Use the `zParserExtender` namespace to access these features.

#### Creating a Trigger

-   `AI_StartTriggerScript(funcName, delay)`: Creates a **Global** trigger. It is not bound to any world or NPC and persists across level changes.
-   `AI_StartTriggerScriptEx(funcName, delay, self, other, victim)`: Creates a **Local** trigger if at least one NPC (`self`, `other`, or `victim`) is provided. Local triggers are valid only in the current world. If you need a local trigger without a specific NPC, you can pass `hero` as `self`.

#### C_Trigger Class

The trigger system uses the `C_Trigger` class:

-   `Delay`: Execution interval in milliseconds.
-   `Enabled`: Set to `0` to destroy the trigger.
-   `AIVariables[16]`: Custom data storage for the trigger.

#### Global Trigger Variables

-   `FirstTrigger`: The first trigger in the list.
-   `SelfTrigger`: The current trigger instance (available inside the callback function).

#### Example: Poison Effect

```daedalus
// Create a trigger that calls 'c_loop' every 1000ms (1 second)
var C_Trigger trigger;
trigger = AI_StartTriggerScriptEx("c_loop", 1000, hero, null, null);
trigger.AIVariables[0] = 15; // Total iterations
trigger.AIVariables[1] = 5;  // Damage per tick

func int c_loop() {
    // Check if iterations are finished
    if (SelfTrigger.AIVariables[0] <= 0) {
        return Loop_end;
    };

    // Modify trigger properties
    SelfTrigger.Delay -= 20; // Speed up
    SelfTrigger.AIVariables[0] -= 1; // Decrease counter

    // Apply damage
    self.Attribute[ATR_HITPOINTS] -= SelfTrigger.AIVariables[1];

    return Loop_continue;
};
```

To stop a loop, return `Loop_end`. To continue, return `Loop_continue`.

### 6. Engine Proxy Classes

zParserExtender exposes many internal engine classes to Daedalus, allowing you to manipulate objects directly. These classes typically mirror their C++ counterparts (`zCVob`, `zCVobLight`, etc.).

Common classes available in the `zParserExtender` namespace (or globally if accessing them directly):

-   `C_VOB`: Base class for game objects.
-   `C_VOB_DATA`: Data structure for `zCVob` properties.
-   `C_LIGHT_DATA`: Properties for dynamic lights (`zCVobLight`).
-   `C_MOB_DATA`: Properties for interactive objects (`oCMOB`).
-   `C_MOBINTER_DATA`: Properties for `oCMobInter`.
-   `C_MOBLOCKABLE_DATA`: Properties for lockable objects (`oCMobLockable`).
-   `C_COLOR`: RGBA color structure.
-   `C_POSITION`: XYZ coordinates.

```daedalus
class C_VOB {
    // Base pointer to the game world object
};

class C_COLOR {
    var int R; // Red channel value
    var int G; // Green channel value
    var int B; // Blue channel value
    var int A; // Alpha channel value
};

class C_POSITION {
    var int X; // Coordinate on the X axis
    var int Y; // Coordinate on the Y axis
    var int Z; // Coordinate on the Z axis
};

// The following classes define properties of the C_VOB object or classes inherited from it
class C_VOB_DATA {
    var string Name;              // Object name
    var float VisualAlpha;        // Object transparency (from 0 to 1)
    var int ShowVisual;           // Displays the model
    var int DrawBBox3D;           // Displays object boundaries
    var int VisualAlphaEnabled;   // Enables object transparency
    var int PhysicsEnabled;       // Activates object physics
    var int IgnoredByTraceRay;    // Disables any collisions with the object
    var int CollDetectionStatic;  // Enables collisions with static world polygons
    var int CollDetectionDynamic; // Enables collisions with dynamic world objects
    var int CastDynShadow;        // Displays object shadow
    var int LightColorStatDirty;  // Enables static object lighting
    var int LightColorDynDirty;   // Enables dynamic object lighting
    var int SleepingMode;         // Defines object activity mode (0 - inactive, 1 - active, 2 - AI execution only allowed)
    var int DontWriteIntoArchive; // Prevents saving this object to the .sav file
};

class C_LIGHT_DATA {
    var int R;                // Red light intensity
    var int G;                // Green light intensity
    var int B;                // Blue light intensity
    var int Range;            // Radius
    var int RangeInv;
    var int RangeBackup;
    var int RangeAniActFrame; // Current light animation frame for radius
    var int RangeAniFPS;      // Light animation speed for radius
    var int ColorAniActFrame; // Current light animation frame for color
    var int ColorAniFPS;      // Light animation speed for color
    var int SpotConeAngleDeg; // Angle of the cone light source
    var int IsStatic;         // Is the source static
    var int RangeAniSmooth;   // [UNUSED]
    var int RangeAniLoop;     // [UNUSED]
    var int ColorAniSmooth;   // Enables soft transitions between colors
    var int ColorAniLoop;     // [UNUSED]
    var int IsTurnedOn;       // Is the light source turned on
    var int LightQuality;     // Source quality (during static light compilation) (0 - high, 1 - medium, 2 - low)
    var int LightType;        // Source type (during static light compilation) (0 - point, 1 - cone)
};

class C_MOB_DATA {
    var string VisibleName;   // Name displayed above the object
    var int Hitpoints;        // Amount of 'health'
    var int Damage;           // Damage the object can deal
    var int IsDestroyed;      // Is the object destroyed
    var int Moveable;         // Can the object be moved
    var int Takeable;         // Can the object be taken
    var int FocusOverride;    // Will the object override focus in combat mode
    var int SndMat;           // Object material (0 - wood, 1 - stone, 2 - metal, 3 - leather, 4 - clay, 5 - glass)
    var string VisualDestroyed; // Model when the object is destroyed
    var string OwnerStr;      // Name of the object owner instance
    var string OwnerGuildStr; // Name of the object guild
    var int Owner;            // Owner instance
    var int OwnerGuild;       // Guild instance
    var int FocusNameIndex;   // Script string of the displayed name
};

class C_MOBINTER_DATA {
    var string TriggerTarget; // Name of the object triggered by OnTrigger
    var string UseWithItem;   // Name of the object instance required for interaction
    var string Sceme;         // Name of the scheme corresponding to object and character animations
    var string ConditionFunc; // Script condition under which interaction can be performed
    var string OnStateFuncName; // Template for function names called when object state changes
    var int State;            // Current object state
    var int State_num;        // Number of object states
    var int State_target;     // Target object state
    var int Rewind;           // Prevents object update
    var int MobStateAni;      // Current object animation
    var int NpcStateAni;      // Current character animation
};

class C_MOBLOCKABLE_DATA {
    var int Locked;           // Is the object locked
    var int AutoOpen;         // [UNUSED]
    var int PickLockNr;       // Current lockpick turn number
    var string KeyInstance;   // Name of the key instance for this object
    var string PickLockStr;   // Combination for picking the object ("LRRLR")
};
```

## Injections

zParserExtender allows you to inject code into existing scripts, override functions, and modify instances without altering the original files.

### 1. API Script

The primary method for code injection is using **API Scripts**. These are Daedalus script files (`.d`) placed in the `System\Autorun` directory (or its subdirectories).

-   These scripts are automatically detected and compiled by zParserExtender.
-   They share the global namespace with the game scripts (unless a specific `namespace` is defined).
-   They allow you to add new logic, define new classes, and interact with the game engine without modifying the original `Gothic.dat` or `Menu.dat`.

### 2. Hooks

Hooks allow you to intercept and modify the behavior of existing functions or instances.

#### Function Hooks

You can define a function with the same name as an existing function. zParserExtender will call your function instead. You can then call the original function using the `_Old` suffix.

```daedalus
func void ZS_Attack_Loop() {
    // If enemy is player and has no readied weapon, stop attack
    if (Npc_IsPlayer(other) && !Npc_HasReadiedWeapon(other)) {
        return LOOP_END;
    };

    // Otherwise, call the original function
    return ZS_Attack_Loop_Old();
};
```

#### Instance Hooks

You can also override instances. This is useful for modifying NPC attributes or other object properties.

```daedalus
instance pc_hero(Npc_Default) {
    pc_hero_old(); // Initialize with original data
    name = "Ivan"; // Override name
};
```

### 3. New Dialogs

zParserExtender supports the injection of new dialog instances (`C_INFO`). You can define them in your scripts, and they will be compiled into the game's Output Units (OU). Creates a copy of the OU file if `CompileOU` is enabled in META.

### 4. META Properties

The `META` block at the beginning of your script file defines how zParserExtender processes it.

```daedalus
META {
    Parser = Menu;
    After = TestScript.d, HelpFunctions.d;
    Engine = G2, G2A;
    Mod = GothicGame.mod, LHiver.mod;
    MergeMode = 1;
};
```

**Available Properties:**

-   **Parser**: Specifies the parser (DAT file) the script is intended for (e.g., `Game`, `Menu`, `SFX`, `PFX`, `VFX`, `Camera`, `Music`).
-   **MergeMode**: Defines the override mode.
    -   `0`: Error on override.
    -   `1`: Execute hook on override (default).
-   **Engine**: Comma-separated list of supported engines (e.g., `G1`, `G2`, `G2A`).
-   **NativeWhile**: Enables compilation of `while` loops (`0` = Off, `1` = On). Default is `0` for compatibility.
-   **Namespace**: Default namespace for the file.
-   **Using**: Comma-separated list of namespaces to open for direct access.
-   **Mod**: Comma-separated list of VDF/MOD files required for this script to compile.
-   **After**: Comma-separated list of scripts that should be executed before this one.
-   **CompileDat**: If true, creates a modified copy of the DAT file (`Gothic.Edited.dat`). Default `False`.
-   **CompileOU**: If true, creates a modified copy of the OU file (`OU.Edited.bin`). Default `False`.

### 5. Binding Operators

#### Test-Else (Conditional Compilation)

The `test` operator allows you to compile code conditionally based on the presence of constants, engine versions, or other plugins.

```daedalus
test Steam {
    // Compiled only if "Steam" symbol/condition is present
    var int SteamActive;
    SteamActive = 1;
};

test G2A && Steam {
    // Compiled only for Gothic 2 Addon AND if Steam is present
} else {
    // Alternative code
};
```

#### Extern

The `extern` keyword allows you to declare instances that exist in other scripts or are engine-native but not declared in the current parser, preventing compilation errors.

```daedalus
extern instance PC_Hero(C_Npc);
```

## Other Features

### 1. INI Parameters

Configuration for zParserExtender is found in specified INI file under the `[ZPARSE_EXTENDER]` section.
- `SystemPack.ini` (if the base version of the game was launched, i.e. the Gothic2.exe executable)
- `ModName.ini` (if a modification was launched)

#### List of parameters:

-   **LoadScript**: (Deprecated) Path to the parser script.
-   **MergeMode**: Determines if hooks are executed during injection. Default: `True` (1).
-   **CompileDat**: If enabled, creates a copy of the DAT file modified by injections (`*.Edited.dat`). Default: `False` (0).
-   **CompileOU**: If enabled, creates a copy of the OU file modified by injections (`*.Edited.bin`). Default: `False` (0).
-   **NativeWhile**: Enables compilation of `while` loops. Default: `False` (0).
-   **MessagesLevel**: Controls the verbosity of console messages via Union. Default: `1`.
-   **StringIndexingMode**: Sets the string indexing mode (see below). Default: `-1`.

### 2. MARVIN Console Commands

You can use the console (F2) to manage compiled files and debug.

-   `Parser SaveDat OU`: Compiles `OU.Edited.bin`.
-   `Parser SaveDat [ParserName]`: Compiles the specified DAT file (e.g., `Parser SaveDat Game` -> `Gothic.Edited.dat`, `Parser SaveDat Menu` -> `Menu.Edited.dat`, `SFX`, `PFX`, `VFX`, `Camera`, `Music`).
-   `Parser Export Stringlist`: Exports the string symbol table to `Scripts\Exports\StringList.d`.

### 3. Additional Launch Parameters

You can trigger reparsing via command-line arguments (e.g., in `GothicStarter_mod.exe`).

-   `-zReparse`: Recompiles all DAT and OU files.
-   `-zReparse_OU`: Recompiles `OU.bin`.
-   `-zReparse_Game`: Recompiles `Gothic.dat`.
-   `-zReparse_[ParserName]`: Recompiles the specified DAT file (e.g., `-zReparse_Menu`, `-zReparse_SFX`, `-zReparse_VFX` etc.).

### 4. OU/DAT Compiler

zParserExtender includes a built-in compiler for DAT and OU files with the following characteristics:

1.  **Direct Compilation**: It allows for the direct compilation of Output Units (`OU.bin`) and Scripts (`DAT`) without requiring external tools like GothicSourcer or Redefix.
2.  **Modified Output**: When `CompileDat` or `CompileOU` is active, it generates `*.Edited.dat` or `*.Edited.bin` files, preserving the original files.
3.  **Runtime Support**: The compiler is integrated with the game engine, allowing for on-the-fly compilation and injection of scripts during the loading process.

### 5. String Indexing

Determines how string symbols are indexed in the symbol table. Controlled by `StringIndexingMode`.

-   **Default (-1)**: Uses the `Repair` mode currently.
-   **Disabled (0)**: Do nothing with indices.
-   **TopSymbol (1)**: Finds the highest unnamed string and sets the counter based on it.
-   **Repair (2)**: Repairs string indices by removing duplicates and setting the counter based on the highest unnamed string.

## Appendices

### External Functions

A comprehensive list of functions added by zParserExtender.

#### Helper Functions
- `Hlp_HasFocusVob(npc)`: Checks if NPC has a focus vob.
- `Hlp_GetFocusVob(npc)`: Returns the focus vob.
- `Hlp_GetFocusVobName(npc)`: Returns the name of the focus vob.
- `Hlp_GetStringLength(str)`: Returns string length.
- `IsNAN(value)`: Checks if float is NaN.
- `Hlp_KeyToggled(key)`: Checks if key was just pressed.
- `Hlp_KeyPressed(key)`: Checks if key is pressed.
- `Hlp_LogicalKeyToggled(key)`: Checks if logical key was toggled.
- `Hlp_GameOnPause()`: Checks if game is paused.
- `Hlp_MessageBox(message)`: Shows message box.
- `Hlp_PrintConsole(message)`: Prints to Union console.
- `Hlp_GetSteamPersonalName()`: Returns Steam username.

#### INI Options
- `Hlp_ReadOptionInt/Float/String(...)`: Reads from INI.
- `Hlp_WriteOptionInt/Float/String(...)`: Writes to INI.
- `Hlp_OptionIsExists(...)`: Checks if INI entry exists.

#### World Functions
- `Wld_ChangeLevel(world, waypoint)`: Changes level.
- `Wld_FindVob(vobname)`: Finds vob by name.
- `Wld_PlayEffectVob(...)`: Plays effect on vob.
- `Wld_PlayEffectAt(...)`: Plays effect at coordinates.
- `Wld_ToggleRain(weight, time)`: Toggles rain.
- `Wld_SetWeatherType(type)`: Sets weather (G2/G2A).
- `Wld_GetWeatherType()`: Gets weather (G2/G2A).

#### Model/Animation Functions
- `Mdl_GetAnimationIndex(npc, ani_name)`: Gets animation index.
- `Mdl_GetAnimationName(npc, ani_index)`: Gets animation name.
- `Mdl_AnimationIsExists(...)`: Checks if animation exists.
- `Mdl_AnimationIsActive(...)`: Checks if animation is active.
- `Mdl_SetAllAnimationsFPS(npc, fps)`: Sets FPS for all animations.
- `Mdl_ResetAllAnimationsFPS(npc)`: Resets FPS.
- `Mdl_SetAnimationFPS(npc, ani_index, fps)`: Sets FPS for specific animation.
- `Mdl_ResetAnimationFPS(npc, ani_index)`: Resets FPS for specific animation.
- `Mdl_SetVisible(npc, isVisible)`: Sets model visibility.
- `Mdl_ApplyOverlayMds_AtFirst(mdsName)`: Applies overlay at top of stack.
- `Mdl_SetNpcSpeedMultiplier(npc, mult)`: Sets NPC speed multiplier.
- `Mdl_ResetNpcSpeedMultiplier(npc)`: Resets NPC speed multiplier.

#### NPC Functions
- `Npc_SetAsHero(npc)`: Sets NPC as hero.
- `Npc_OpenInventory(npc)`: Opens inventory.
- `Npc_OpenInventorySteal(npc)`: Opens steal inventory.
- `Npc_OpenInventoryTrade(npc)`: Opens trade inventory.
- `Npc_GetLeft/RightHandItem(npc)`: Gets item in hand.
- `Npc_GetSlotItem(npc, slot)`: Gets item in slot.
- `Npc_PutInSlot(...)`: Puts item in slot.
- `Npc_RemoveFromSlot(...)`: Removes item from slot.

#### Mob Functions
- `Mob_Destroy(object)`: Destroys mob.
- `Mob_RemoveItem(s)(...)`: Removes item from mob.
- `Mob_InsertItem(s)(...)`: Inserts item into mob.
- `Mob_Get/SetLockCombination(...)`: Lock combination.
- `Mob_IsLocked/SetLocked(...)`: Lock state.
- `Mob_Get/SetKeyInstance(...)`: Key instance.

#### Trigger/AI Functions
- `AI_CallScript(func, self, other)`: Calls script via AI queue.
- `AI_StartTriggerScript(func, delay)`: Starts global trigger.
- `AI_StartTriggerScriptEx(func, delay, self, other, victim)`: Starts local trigger.
- `AI_GetTrigger...`: Various functions to get trigger info and next trigger in queue.

#### Parser/Symbol Functions
- `Par_GetParserID(name)`: Gets parser ID.
- `Par_GetSymbolID(parId, name)`: Gets symbol ID.
- `Par_GetSymbolLength(...)`: Gets symbol length.
- `Par_Get/SetSymbolValueInt/Float/String/Instance(...)`: Get/Set symbol values.

#### Casting/Pointer Functions
- `Cast_PointerToInstance(ptr)`: Casts pointer to instance.
- `Cast_InstanceToPointer(inst)`: Casts instance to pointer.
- `Cast_PointerToNpc/Item(...)`: Casts pointer to specific class.
- `Cast_InstanceIsNpc/Item/Mob(...)`: Checks instance type.
- `Cast_GetInstanceIndex(...)`: Gets instance index.
- `Cast_GetClassID(...)`: Gets class ID.
- `Cast_GetVobClassID(object)`: Gets zCObject class ID.
- `Cast_CheckVobClassID(classId, object)`: Checks if object inherits from class ID.

### Key Codes

:::info Key Codes
Standard DirectInput key codes are used (decimal values). Commonly used keys:
- `KEY_Escape`: 1
- `KEY_1`..`KEY_0`: 2..11
- `KEY_Q`..`KEY_P`: 16..25
- `KEY_Return`: 28
- `KEY_LControl`: 29
- `KEY_S`: 31
- `KEY_LShift`: 42
- `KEY_Space`: 57
- `KEY_F1`..`KEY_F12`: 59..88 (approx)
(Refer to standard DirectInput scancode tables for a full list).
:::

### Parser Tags

Tags used in `Parser` property of `META` block:
- `Game`: Gothic.dat
- `SFX`: Sfx.dat
- `PFX`: ParticleFx.dat
- `VFX`: VisualFx.dat
- `Camera`: Camera.dat
- `Menu`: Menu.dat
- `Music`: Music.dat
- `OU`: Output units (compiled separately)

### Engine Tags

Tags used in `Engine` property of `META` block:
- `G1`: Gothic 1 (Classic)
- `G1A`: Gothic 1 (Sequel)
- `G2`: Gothic 2 (Classic)
- `G2A`: Gothic 2 (Night of the Raven)

## Corrections

ZParserExtender also ensures several corrections to the original game engine:

1.  When creating an instance, the `item` global variable is set to the current item.
2.  When calling `on_equip` and `on_unequip`, the `item` global variable is set to the current item.
3.  When loading a DAT file, the plugin restores the symbol hierarchy.
4.  When loading a save game, the plugin skips symbols that do not exist in the scripts.


