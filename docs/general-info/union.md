---
sidebar_position: 3
title: "Union"
description: "Overview of the Union framework for creating C++ plugins for Gothic."
---

# Union

**Union** is an open-source framework for creating native **C++ plugins** for Gothic I and Gothic II. It provides direct access to the **ZenGin** engine internals — game objects in memory, engine functions, rendering pipeline, and more — allowing modifications that go far beyond what's possible with Daedalus scripting alone.

Union plugins are compiled as **DLL** files and loaded into the game process at runtime. They can hook virtually any engine function using the **Detours** library, intercept and modify game behavior, add new Daedalus external functions, and interact with the game world at a low level.

- Build system: **CMake 3.21+** with Ninja generator
- Recommended IDE: **Visual Studio 2022** (with CMake support)
- C++ standard: **C++20**
- License: **BSD 3-Clause**
- Source code: [GitLab](https://gitlab.com/union-framework)

---

## Use Cases

Union is used when Daedalus scripting is not sufficient — for example:

- Modifying engine behavior (combat system, AI, rendering)
- Adding new engine-level features (new particle effects, UI elements, input handling)
- Fixing engine bugs
- Exposing new Daedalus externals for script-side use
- Optimizing game performance
- Reading/writing custom configuration from `.ini` files

---

## Architecture

The Union Framework consists of two main components, managed as **Git submodules**:

- [`union-api`](https://gitlab.com/union-framework/union-api) — core framework providing hooking, memory operations, string utilities, and the plugin lifecycle
- [`gothic-api`](https://gitlab.com/union-framework/gothic-api) — ZenGin engine headers with class definitions and memory addresses for all four game versions

---

## Supported Game Versions

Union supports all four versions of the Gothic engine:

| Preprocessor Define | Namespace             | Game Version                   |
| -------------------- | --------------------- | ------------------------------ |
| `__G1`               | `Gothic_I_Classic`    | Gothic I                       |
| `__G1A`              | `Gothic_I_Addon`      | Gothic I Addon                 |
| `__G2`               | `Gothic_II_Classic`   | Gothic II                      |
| `__G2A`              | `Gothic_II_Addon`     | Gothic II: Night of the Raven  |

A single plugin project can target **all four versions** simultaneously. The build system compiles separate code paths for each version using preprocessor defines, and the correct path is activated at runtime based on the detected engine version.

---

## How Plugins Work

1. The plugin is compiled as a **DLL** (Dynamic Link Library)
2. The DLL is placed in the game's `System/Autorun/` directory
3. When Gothic starts, the Union runtime loads all DLLs from `Autorun/`
4. The plugin registers its **game event functions** — callbacks that the engine invokes at specific moments
5. Hooks intercept engine functions at **known memory addresses** — each game version has different addresses for the same function

### Game Event Functions

These are the main callbacks that a plugin can implement. They are not called by default — each one needs a corresponding hook to be enabled (the template provides them as commented-out code):

| Function                          | When it's called                                        |
| --------------------------------- | ------------------------------------------------------- |
| `Game_EntryPoint`                 | Gothic entry point (earliest possible moment)           |
| `Game_Init`                       | After DAT files are initialized, world is ready         |
| `Game_Exit`                       | When the game is shutting down                          |
| `Game_PreLoop`                    | Before each frame is rendered                           |
| `Game_Loop`                       | Every frame (main world render)                         |
| `Game_PostLoop`                   | After each frame is rendered                            |
| `Game_MenuLoop`                   | Every frame while in menu                               |
| `Game_SaveBegin` / `Game_SaveEnd` | When a save starts / completes                          |
| `Game_LoadBegin_*` / `Game_LoadEnd_*` | Various load scenarios (new game, save, change level) |
| `Game_Pause` / `Game_Unpause`     | When the game pauses / unpauses                         |
| `Game_DefineExternals`            | When Daedalus externals are registered                  |
| `Game_ApplySettings`              | When game settings are applied                          |

### Multi-Game Compilation

The `Plugin.cpp` file uses conditional compilation to compile your code separately for each game version:

```cpp
#ifdef __G1
#define GOTHIC_NAMESPACE Gothic_I_Classic
#define ENGINE Engine_G1
#include "Sources.hpp"
#endif

#ifdef __G2A
#define GOTHIC_NAMESPACE Gothic_II_Addon
#define ENGINE Engine_G2A
#include "Sources.hpp"
#endif
```

Your plugin logic is written inside the `GOTHIC_NAMESPACE` namespace in `Plugin.hpp`. The `Sources.hpp` file includes `Plugin.hpp`, and the same source is compiled once for each target game version.

### Hooking Engine Functions

Union uses Microsoft **Detours** to hook engine functions. There are two types of hooks:

**Full hooks** (`Union::CreateHook`) — replace an entire engine function with your own implementation. You can call the original function before or after your code.

Hooks are declared as member functions of the engine class being hooked. The declaration goes in a `.inl` file inside the `userapi/` folder (e.g. `userapi/oCGame.inl`):

```cpp
// userapi/oCGame.inl
void UpdatePlayerStatus_Hook();
```

Then register and implement the hook in your plugin code:

```cpp
auto Hook_oCGame_UpdatePlayerStatus = ::Union::CreateHook(
    reinterpret_cast<void*>(zSwitch(0x00638F90, 0x0065F4E0, 0x00666640, 0x006C3140)),
    &oCGame::UpdatePlayerStatus_Hook,
    ::Union::HookType::Hook_Detours
);

void oCGame::UpdatePlayerStatus_Hook()
{
    // your code before original
    (this->*Hook_oCGame_UpdatePlayerStatus)(); // call original
    // your code after original
}
```

The `(this->*Hook_Variable)(params)` syntax calls the original engine function. The hook type `Hook_Detours` uses Microsoft Detours and should always be used — it ensures compatibility with other plugins, including those built with older Union versions.

**Partial hooks** (`Union::CreatePartialHook`) — inject code at a specific instruction address, giving access to CPU registers for low-level manipulation.

The `zSwitch(G1, G1A, G2, G2A)` macro provides different memory addresses for each engine version, using `0` for versions that should not be hooked.
