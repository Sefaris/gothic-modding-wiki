---
sidebar_position: 3
title: "Patch Files"
description: "Creating and using Union .patch files for memory manipulation."
---

# Patch Files

Union `.patch` files allow you to modify the game's memory (code, data) without compiling a full C++ plugin. They are interpreted at runtime by Union and are useful for small tweaks, fixing bugs, or changing engine default values.

:::info
Patch files must have the `.patch` extension and are placed in the `System/` directory or any other directory monitored by Union (e.g., inside a `.vdf` or `.mod` volume).
:::

## Disabling Patches

You can prevent specific patches or features from running using the `#disable` directive. This has the highest priority.

```
#disable [RefName]      // Disables a specific patch by name
#disable [Reference]    // Disables all operations with references
#disable [Cast]         // Disables all type casting operations
```

## Engine Blocks

Use `#engine` blocks to limit execution to specific game versions or executable checksums.

```
#engine [G1, G2A]
    // Code here runs only on Gothic 1 and Gothic 2 NotR
#/engine
```

Supported tags: `G1`, `G1A`, `G2`, `G2A`.
You can also specify a CRC32 checksum: `#engine [0x2BCD7E30]`.
If no `#engine` block is used, the code runs for all versions.

## Patch Blocks

The `#patch` block defines the scope of a specific patch modification.

```
#patch [My Patch Name]
    // Patch instructions
#/patch
```

Using `[GLOBAL DATA]` as the name makes defined variables visible across all other patches.

```
#patch [GLOBAL DATA]
    INT GlobalValue = 100
#/patch
```

## Data Types

Union supports several basic data types for defining variables and constants.

- **INT**: `INT Value = 123` or `INT Hex = 0x123`
- **FLOAT**: `FLOAT Value = 123.45`
- **BOOL**: `BOOL Flag = true` (or `1`, `false`, `0`)
- **HEX**: Raw bytes. Can be a string or space-separated bytes.
    - `HEX Bytes = '90 90 90'`
    - `HEX String = "Hello"`
- **STRING**: `STRING Text = "Hello World"`

## References (`@`)

The `@` operator creates a reference to a memory address or an INI setting. Assigning to a reference modifies the value at that address. It automatically unprotects memory if needed.

### Memory References

```
// Write integer 100 to address 0x123456
INT @0x123456 = 100

// Using an expression for address calculation
INT @(0x123456 + 4) = 200
```

### INI References

You can bind a variable to a `SystemPack.ini` setting.

```
// Links to SystemPack.ini, section [CORE], key ShowDebugWindow
INT @SystemPack:Core:ShowDebugWindow = 1
```

## Type Casting

Union supports both implicit and explicit casting.

### Implicit
```
INT Value = 5
FLOAT Result = 10.0 + Value * 5.3 // Value is automatically cast to FLOAT
```

### Explicit
```
INT Value = 5
FLOAT Result = 10.0 + FLOAT Value * 5.3
```

### HEX Casting
Casting to/from HEX treats the data as raw bytes.

```
INT Source = 65535
HEX Bytes = HEX Source    // Converts int to raw bytes
INT Restored = INT Bytes  // Converts bytes back to int
```

## Conditionals

You can use `IF`, `ELSE`, and `END` to execute code conditionally. The condition must evaluate to a `BOOL`.

```
IF BOOL @SystemPack:Core:ShowDebugWindow != true
    MessageBox("Debug window is disabled")
ELSE
    MessageBox("Debug window is enabled")
END
```

## Memory Pages

You can allocate custom memory pages to store data or code. This is useful for large data structures or custom code caves.

```
// Allocate defined by index (must be > 0)
AllocPage(15, 1024) 

// Usage
HEX @15x00000000 = '90 90 90 C3'
```

## Static Patches

Static patches are optimized for performance. They are intended for simple memory overwrites that do not require conditions or complex logic. They are cached and applied faster.

```
#patch static [Fast Patch]
    HEX @0x007524A6 = 'E9 EB C2 F1 FF'
#/patch
```

## Assembler Inserts

For complex logic, you can inject assembly code code directly into the engine's execution flow.

```
#assembler [Address]
    // Assembly instructions
#/assembler
```

### Execution Flow & Orgcode

When you define an assembler insert at an address, Union writes a 5-byte `JMP` to your code. This overwrites existing instructions.
- To execute the overwritten instructions, use the `orgcode` keyword.
- `orgcode` automatically recalculates offsets for relocation.
- If you don't use `orgcode`, the original instructions are effectively deleted.

```
#assembler [0x0068CF02]
    // Your custom code
    mov eax, 123
    
    // Execute the original instructions that were overwritten by the hook
    orgcode
#/assembler
```

### Partial Overwrites (`orgcode +`)

If the 5-byte hook jump partially overwrites multiple instructions, you can use `orgcode +N` to skip the first N instructions.

```
// Example: Skip the first overwritten instruction, execute the rest
orgcode +1
```

### Variable Passing

- **Value Passing**: Standard types (`INT`, `FLOAT`) are passed by value.
- **Address Passing**: `HEX` variables and variables defined in `[GLOBAL DATA]` are passed by address.

```
#patch [Example]
    HEX Data = '00 00 00 00'
    
    #assembler [0x123456]
        // Load address of Data into EAX
        lea eax, [$Data]
        orgcode
    #/assembler
#/patch
```

### Constraints

- The injection address must allow a 5-byte jump without splitting an instruction in the middle.
- The overwritten bytes must not contain a jump target (label) from another part of the code, or the game will crash.
- If no `retn` is provided, execution returns valid instruction after the insert.

## Built-in Functions

Union provides a standard library of functions usable within patches.

### Math
- `Sqrt(value)`: Returns the square root of a number.
- `Min(a, b)`: Returns the smaller of two values.
- `Max(a, b)`: Returns the larger of two values.
- `Lim(min, value, max)`: Clamps a value between min and max.

### Memory & HEX
- `GetHexSize(value)`: Returns the size of a HEX variable in bytes.
- `SetHexSize(value, size)`: Manually sets the size of a HEX variable.
- `SetHexAutoSize(value)`: Automatically determines the size of a HEX variable (assumes null-terminated string logic).
- `HexViewBox(ptr, size = auto)`: Displays a message box with a hex dump of the memory at `ptr`.

### Search & Memory Ops
- `FindAndReplace(from, to, start, len)`: Searches for a byte pattern `from` and replaces it with `to` within the range `start` to `start+len`.
- `MemSet(start, byte, len)`: Fills `len` bytes of memory starting at `start` with the value `byte`.
- `MemCopy(start, dest, len)`: Copies `len` bytes from `start` to `dest`.
- `GetRefAddress(ref)`: Returns the memory address of a reference variable.
- `JMP(from, to)`: Writes a 5-byte `JMP` instruction at `from` jumping to `to`.
- `CALL(from, to)`: Writes a 5-byte `CALL` instruction at `from` calling `to`.

### Files
- `RenameFile(oldName, newName)`: Renames a file.
- `CopyFile(oldName, newName, replace = true)`: Copies a file.
- `MoveFile(oldName, newName)`: Moves a file.
- `DeleteFile(fileName)`: Deletes a file.
- `FileExists(fileName)`: Returns `true` if the file exists, `false` otherwise.

### System & Engine
- `MessageBox(text)`: Displays a standard Windows message box.
- `PrintScreen(text)`: Prints text to the game's internal console (zSpy).
- `GetUnionVersion()`: Returns the installed Union version number.
- `GetLanguage()`: Returns the Union language ID (1=Rus, 2=Eng, 3=Deu, 4=Pol, ...).
- `Restart()`: Triggers a game restart.
- `AllocPage(id, size)`: Allocates a memory page with index `id` (must be > 0).
- `FreePage(id)`: Frees the memory page with index `id`.
- `FindSteamDirectory()`: Returns the path to the Steam installation directory.
- `GetScreenSizeX()`: Returns the screen width.
- `GetScreenSizeY()`: Returns the screen height.

### Windows & Process
- `ShowCmd()`: Shows the console window.
- `HideCmd()`: Hides the console window.
- `FindWindowHandle(windowName)`: Returns the HWND of a window by its name.
- `GetProcessID(processName)`: Returns the PID of a process.
- `StartProcess(path, args, hide)`: Starts an external process.

### Plugins & Helpers
- `LoadPlugins(fileMask)`: Loads plugins matching the mask (e.g., `Shw32.dll` or `Data\*.dll`).
- `ModuleBase(moduleName)`: Returns the base address of a loaded module (DLL).
- `ModuleSize(moduleName)`: Returns the size of a loaded module.
- `OptionDef(section, name, value)`: Defines a default value for an INI setting if it doesn't exist.
- `ShowFunctionList(moduleName)`: Logs all exported functions of a module to zSpy.
- `Concat(str1, str2)`: Concatenates two strings.

### External Interface
- `LoadLibrary(libName)`: Loads an external DLL into the process.
- `ImportSymbol(moduleName, symbolName)`: Returns the address of an exported function from a DLL.
- `ExecAsm(hexCode)`: Executes raw assembly bytecode and returns the result of the `EAX` register.
