---
sidebar_position: 2
title: "Ikarus"
description: "Overview of the Ikarus library that extends Daedalus capabilities."
---

# Ikarus

**Ikarus** is a scripting library for Daedalus created by **Sektenspinner** (with contributions from Gottfried, mud-freak, and Neconspictor). It breaks through the limitations of standard Daedalus by providing:

- **Direct memory access** to the Gothic engine (read/write)
- **Engine class access** - `oCGame`, `oCNpc`, `zCWorld`, `zCParser`, and many more
- **Calling C++ engine functions** from Daedalus
- **Floating-point arithmetic** (IEEE 754) - standard Daedalus only supports `int`
- **Loops** (`while`/`end`, `repeat`/`end`) - absent in standard Daedalus
- **INI file read/write** (Gothic.ini, [Mod].ini)
- **Key input detection** (keyboard and mouse)
- **String manipulation functions** (`STR_Len`, `STR_IndexOf`, `STR_Split`, and more)
- **Loading external DLL libraries**

:::info
Ikarus is required by the **LeGo** library and most advanced Gothic mods. Without Ikarus, a modder is limited to standard Daedalus capabilities only.
:::

---

## Installation

### Required Files

The Ikarus package consists of:

1. **Constants** - `Ikarus_Const_G2.d` (or `Ikarus_Const_G1.d` for Gothic I)
2. **Engine classes** - `EngineClasses_G2/*.d` (or `EngineClasses_G1/*.d`)
3. **Ikarus core** - `Ikarus.d` (identical for G1 and G2)
4. **Float support** (optional) - `float.d`

### Gothic.src Integration

Ikarus files must be added to `Gothic.src` **after** `CLASSES.D` and **before** any scripts that use them:

```
_INTERN\CONSTANTS.D
_INTERN\CLASSES.D

Ikarus\Ikarus_Const_G2.d
Ikarus\EngineClasses_G2\*.d
Ikarus\Ikarus.d
Ikarus\float.d

AI\AI_INTERN\AI_CONSTANTS.D
...
```

---

## Initialization

### MEM_InitAll()

The main Ikarus initialization function. Must be called before using any library functions.

```daedalus
func void INIT_GLOBAL()
{
    Game_InitGerman();
    MEM_InitAll();
    // ... rest of code
};
```

`MEM_InitAll()` performs the following operations:

- Locates Daedalus parser structures in memory
- Initializes the label and jump system
- Sets up global engine instances (`MEM_Game`, `MEM_World`, etc.)
- Enables `_@()`, `_@s()`, `_@f()` operators
- Initializes the assembler subsystem
- Enables `repeat`/`end` loops

:::tip
Multiple calls to `MEM_InitAll()` are safe - Ikarus checks if it has already been initialized.
:::

---

## Memory Read and Write

Ikarus core functions provide direct access to engine memory:

```daedalus
// Reading
var int value;
value = MEM_ReadInt(address);           // read 4 bytes as int
var string text;
text = MEM_ReadString(address);         // read string

// Writing
MEM_WriteInt(address, 42);              // write int at address
MEM_WriteString(address, "test");       // write string

// Bytes
var int byte;
byte = MEM_ReadByte(address);           // read 1 byte
MEM_WriteByte(address, 255);            // write 1 byte
```

### Memory Arrays

```daedalus
// Read/write arrays in memory (offset is in elements, not bytes)
var int elem;
elem = MEM_ReadIntArray(arrayAddress, 3);          // 4th element
MEM_WriteIntArray(arrayAddress, 3, newValue);      // write 4th element
```

---

## Instances and Pointers

### Pointer → Instance Conversion

One of Ikarus's most powerful features is converting raw memory pointers to Daedalus instances:

```daedalus
// _^() - convert pointer to instance (alias for MEM_PtrToInst)
var oCNpc npcInMemory;
npcInMemory = _^(npcAddress);

// Now you can read engine class fields:
var int hp;
hp = npcInMemory.attribute[ATR_HITPOINTS];
```

### Instance → Pointer Conversion

```daedalus
var int address;
address = MEM_InstToPtr(self);    // NPC address in memory
```

### Address Operators

```daedalus
var int addrInt;
addrInt = _@(myVariable);      // address of int variable

var int addrStr;
addrStr = _@s(myString);       // address of string variable

var int addrFloat;
addrFloat = _@f(myFloat);      // address of float variable
```

### Example - Reading the Name of the Focused Object

```daedalus
func void ShowFocus()
{
    var oCNpc player;
    player = Hlp_GetNpc(PC_HERO);

    if (!player.focus_vob) { return; };

    var zCVob myFocus;
    myFocus = _^(player.focus_vob);
    Print(myFocus._zCObject_objectName);
};
```

---

## Global Engine Instances

After calling `MEM_InitAll()`, instances representing key engine objects are available:

| Instance            | Class                     | Description                 |
| ------------------- | ------------------------- | --------------------------- |
| `MEM_Game`          | `oCGame`                  | Current game session        |
| `MEM_World`         | `oWorld`                  | Current world               |
| `MEM_Timer`         | `zCTimer`                 | Engine timer (frame timing) |
| `MEM_WorldTimer`    | `oCWorldTimer`            | In-game time (day/hour)     |
| `MEM_Vobtree`       | `zCTree`                  | Root of vob tree            |
| `MEM_InfoMan`       | `oCInfoManager`           | Dialog manager              |
| `MEM_Waynet`        | `zCWaynet`                | Waypoint network            |
| `MEM_Camera`        | `zCCamera`                | Camera                      |
| `MEM_SkyController` | `zCSkyController_Outdoor` | Sky/weather controller      |
| `MEM_Parser`        | `zCParser`                | Daedalus parser (VM)        |
| `MEM_SpawnManager`  | `oCSpawnManager`          | NPC spawn manager           |

```daedalus
// Example - reading current in-game hour
var int hour;
hour = MEM_WorldTimer.worldTime_hour;
```

---

## Parser Symbol Lookup

Ikarus allows dynamically searching for symbols (functions, instances, variables) by name:

```daedalus
// Find symbol index (-1 if not found)
var int idx;
idx = MEM_FindParserSymbol("PC_HERO");

// Find pointer to zCPar_Symbol structure (0 if not found)
var int symPtr;
symPtr = MEM_GetParserSymbol("DIA_Fred_Hallo");
```

---

## Dynamic Function Calling

### Calling Daedalus Functions

```daedalus
// By name
MEM_CallByString("MY_FUNCTION");

// By symbol ID
var int id;
id = MEM_GetFuncID(MyFunction);
MEM_CallByID(id);

// With parameters
MEM_PushIntParam(42);
MEM_PushStringParam("test");
MEM_CallByString("MY_FUNCTION");

// Getting the result
var int result;
result = MEM_PopIntResult();
```

### Function Replacement

```daedalus
// Replace function implementation - all calls to f1 now execute f2
MEM_ReplaceFunc(OldFunction, NewFunction);
```

### Calling C++ Engine Functions

```daedalus
// Example - calling oCNpc::SetAsPlayer from Daedalus
func void SetAsPlayer(var C_NPC slf)
{
    const int oCNpc__SetAsPlayer = 7612064; // memory address (0x7426A0)

    CALL__thiscall(MEM_InstToPtr(slf), oCNpc__SetAsPlayer);
};
```

C++ calling conventions:

| Function                        | Convention                     |
| ------------------------------- | ------------------------------ |
| `CALL__thiscall(this, adr)`     | C++ class method (most common) |
| `CALL__stdcall(adr)`            | Standard Windows convention    |
| `CALL__cdecl(adr)`              | C convention                   |
| `CALL__fastcall(ecx, edx, adr)` | Fast convention                |

Push parameters before calling:

```daedalus
CALL_IntParam(42);
CALL_PtrParam(objectAddress);
CALL_zStringPtrParam("text");
CALL__thiscall(thisPtr, functionAddress);
var int result;
result = CALL_RetValAsInt();
```

---

## INI File Read/Write

```daedalus
// Read from Gothic.ini
var string resolution;
resolution = MEM_GetGothOpt("VIDEO", "zVidResFullscreenX");

// Read from [Mod].ini
var string option;
option = MEM_GetModOpt("MYSECTION", "MyOption");

// Check if section/option exists
if (MEM_GothOptExists("VIDEO", "zVidResFullscreenX"))
{
    // option exists
};

// Write to Gothic.ini (saved to disk when Gothic exits)
MEM_SetGothOpt("VIDEO", "zVidResFullscreenX", "1920");
```

---

## Key Input Detection

```daedalus
// Check if a key is pressed
if (MEM_KeyPressed(KEY_SPACE))
{
    Print("Space pressed!");
};

// More precise key state
var int state;
state = MEM_KeyState(KEY_F1);

if (state == KEY_PRESSED)   { /* just pressed */  };
if (state == KEY_HOLD)      { /* held down */     };
if (state == KEY_RELEASED)  { /* just released */ };

// Read key assignment from Gothic.ini
var int inventoryKey;
inventoryKey = MEM_GetKey("keyInventory");
```

Key states:

| Constant       | Meaning                      |
| -------------- | ---------------------------- |
| `KEY_UP`       | Not pressed, was not pressed |
| `KEY_PRESSED`  | Just pressed (new frame)     |
| `KEY_HOLD`     | Held (subsequent frames)     |
| `KEY_RELEASED` | Just released                |

---

## Loops

Standard Daedalus has no loops. Ikarus adds them through parser hacking.

### while / end

```daedalus
var int i;
i = 0;
while(i < 10);
    Print(IntToString(i));
    i += 1;
end;
```

### repeat / end

A loop that iterates a variable from 0 to n-1:

```daedalus
repeat(i, 10); var int i;
    Print(IntToString(i));   // prints 0, 1, 2, ..., 9
end;
```

### Loop Control

```daedalus
const int break    = -42;   // break out of loop
const int continue = -23;   // skip to next iteration

while(i < 100);
    i += 1;
    if (i == 5)  { continue; };  // skip rest, next iteration
    if (i == 50) { break; };     // end loop
end;
```

### Labels and Jumps (Low-Level)

```daedalus
MEM_InitLabels();

var int label;
label = MEM_StackPos.position;     // save position
// ... code ...
MEM_StackPos.position = label;     // jump back (infinite loop!)
```

---

## String Operations

Ikarus extends the poor string capabilities of Daedalus:

```daedalus
var int length;
length = STR_Len("Hello");                        // 5

var string fragment;
fragment = STR_SubStr("Hello World", 6, 5);         // "World"
fragment = STR_Prefix("Hello World", 5);             // "Hello"

var int position;
position = STR_IndexOf("Hello World", "World");       // 6
position = STR_IndexOf("Hello World", "xyz");         // -1

// String splitting
var int parts;
parts = STR_SplitCount("a;b;c", ";");               // 3
var string elem;
elem = STR_Split("a;b;c", ";", 1);                   // "b"

// String → int conversion
var int number;
number = STR_ToInt("42");                             // 42

// Upper/lower case
var string upper;
upper = STR_Upper("hello");                            // "HELLO"
var string lower;
lower = STR_Lower("HELLO");                            // "hello"

// Single characters
var int ascii;
ascii = STR_GetCharAt("ABC", 0);                      // 65 (ASCII 'A')
var string ch;
ch = STR_FromChar(65);                                 // "A"
```

---

## Floating-Point Arithmetic (float.d)

Standard Daedalus doesn't support float operations. Ikarus emulates them by storing IEEE 754 values as `int`:

### Constants

```daedalus
const int FLOATNULL = 0;            // 0.0
const int FLOATEINS = 1065353216;    // 1.0
const int FLOATHALB = 1056964608;    // 0.5
const int PI        = 1078530011;    // 3.14159...
```

### Conversion

```daedalus
var int f;
f = mkf(42);                 // int → float (42 → 42.0)

var int n;
n = truncf(f);               // float → int (truncate)
n = roundf(f);               // float → int (round)
```

### Arithmetic Operations

```daedalus
var int a; a = mkf(10);      // 10.0
var int b; b = mkf(3);       // 3.0

var int sum;     sum     = addf(a, b);   // 13.0
var int diff;    diff    = subf(a, b);   // 7.0
var int product; product = mulf(a, b);   // 30.0
var int quotient; quotient = divf(a, b); // 3.333...
var int neg;     neg     = negf(a);      // -10.0
var int abs;     abs     = absf(neg);    // 10.0

// Fraction
var int half;
half = fracf(1, 2);                      // 0.5

// Square and square root
var int squared; squared = sqrf(a);       // 100.0
var int root;    root    = sqrtf(a);      // 3.162...
```

### Comparisons

```daedalus
if (lf(a, b))  { /* a < b  */ };
if (lef(a, b)) { /* a <= b */ };
if (gf(a, b))  { /* a > b  */ };
if (gef(a, b)) { /* a >= b */ };
```

### Display

```daedalus
var string text;
text = toStringf(quotient);   // "3.333..."
Print(text);
```

---

## Memory Management

```daedalus
// Memory allocation
var int buffer;
buffer = MEM_Alloc(256);          // allocate 256 bytes

// Use the buffer...
MEM_WriteInt(buffer, 42);

// Free memory
MEM_Free(buffer);

// Copy memory
MEM_CopyBytes(source, destination, byteCount);

// Compare memory
var int equal;
equal = MEM_CompareBytes(ptr1, ptr2, byteCount);  // 0 = different, 1 = identical
```

---

## Vob Search

```daedalus
// Find vob by name
var int vobPtr;
vobPtr = MEM_SearchVobByName("ITMW_1H_SWORD_01");

if (vobPtr)
{
    var zCVob myVob;
    myVob = _^(vobPtr);
    Print(myVob._zCObject_objectName);
};

// Insert new vob
var int newVob;
newVob = MEM_InsertVob("ItMw_1h_Sword_01.3ds", "FP_ITEM_01");

// Delete vob
MEM_DeleteVob(vobPtr);

// Type checking
if (Hlp_Is_oCNpc(ptr))       { /* it's an NPC */       };
if (Hlp_Is_oCItem(ptr))      { /* it's an item */      };
if (Hlp_Is_oCMobContainer(ptr)) { /* it's a chest */ };
```

---

## Logging and Debugging

```daedalus
// Send message to zSpy
MEM_Info("Info: everything OK");
MEM_Warn("Warning: something is wrong");
MEM_Error("Error: critical problem!");

// Daedalus stack trace
MEM_PrintStackTrace();

// Performance measurement
var int time;
time = MEM_BenchmarkMS(MyFunction);   // time in milliseconds
```

---

## Loading DLL Libraries

```daedalus
// Load a DLL library
var int hDll;
hDll = LoadLibrary("MyDll.dll");

// Get function address
var int funcAddress;
funcAddress = GetProcAddress(hDll, "MyFunction");
```

---

## Assembly (ASM)

Ikarus enables generating and executing x86 machine code directly from Daedalus:

```daedalus
ASM_Open(64);                  // start 64-byte buffer
ASM_1(133);                    // push EBP
ASM_1(137); ASM_1(229);       // mov EBP, ESP
// ... machine instructions ...
ASM_1(195);                    // ret
var int code;
code = ASM_Close();            // finish, return pointer
ASM_Run(code);                 // execute code
```

:::danger
Using ASM requires advanced knowledge of x86 architecture and Gothic engine memory. Errors can cause an immediate game crash.
:::

---

## Compatibility: Gothic I vs Gothic II

Ikarus was originally created for **Gothic II** but also works with **Gothic I** (version 1.08k_mod).

| Aspect            | Gothic I            | Gothic II           |
| ----------------- | ------------------- | ------------------- |
| Constants file    | `Ikarus_Const_G1.d` | `Ikarus_Const_G2.d` |
| Engine classes    | `EngineClasses_G1/` | `EngineClasses_G2/` |
| Core (`Ikarus.d`) | Same file           | Same file           |
| `float.d`         | Same file           | Same file           |
| Memory addresses  | Different addresses | Different addresses |

Ikarus automatically detects the game version and selects appropriate addresses via the `MEMINT_SwitchG1G2()` function.

:::warning
Some engine classes for Gothic I have "unverified" status (e.g., `zCMenuItem`, `oCAIHuman`). Use them with caution.
:::

---

## LeGo - Ikarus Extension

**LeGo** is a script package built **on top of Ikarus**, created by **Lehona** and the Gothic community. Requires Ikarus ≥ 1.2.0.

### Initialization

```daedalus
func void INIT_GLOBAL()
{
    // LeGo_Init calls MEM_InitAll() automatically
    LeGo_Init(LeGo_All);
    // or selectively:
    // LeGo_Init(LeGo_FrameFunctions | LeGo_Bars | LeGo_HookEngine);
};
```

### Main LeGo Modules

| Module              | Description                                          |
| ------------------- | ---------------------------------------------------- |
| **HookEngine**      | Hook C++ engine functions from Daedalus              |
| **FrameFunctions**  | Call functions every frame                           |
| **Bars**            | Custom status bars (HP, mana, custom)                |
| **Cursor**          | Mouse cursor support                                 |
| **Buttons**         | Clickable UI buttons                                 |
| **Trialoge**        | Multi-person dialogs (more than 2 people)            |
| **Dialoggestures**  | Animations during dialogs                            |
| **Saves**           | Save/load custom data (survives save/load)           |
| **PermMem**         | Persistent memory (survives save/load)               |
| **Anim8**           | Value animation/tweening                             |
| **View**            | Custom view elements                                 |
| **Sprite**          | 2D sprite rendering                                  |
| **Draw3D**          | 3D drawing primitives                                |
| **Random**          | Better random number generator                       |
| **Bloodsplats**     | Blood splatter effects                               |
| **ConsoleCommands** | Custom console commands                              |
| **Buffs**           | Buff/debuff system                                   |
| **EventHandler**    | Event system                                         |
| **Timer**           | Timer utilities                                      |
| **Gamestate**       | Game state tracking (new game / load / level change) |

:::tip
Learn more about LeGo from the [official LeGo documentation](https://lego.worldofgothic.de/) or from the source code on GitHub.
:::
