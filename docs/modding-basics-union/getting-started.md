---
sidebar_position: 1
title: "Getting Started"
description: "Setting up the environment for creating Union plugins."
---

# Getting Started

In this guide you'll set up your development environment for creating Union plugins using the Union Framework — a modern, CMake-based, open-source toolkit.

## Prerequisites

Before you begin, make sure you have:

- Basic **C++ knowledge** (pointers, classes, preprocessor directives)
- A working installation of **Gothic** or **Gothic II: Night of the Raven**
- A **Windows** machine (Union plugins are Win32 x86 DLLs)

---

## 1. Install Visual Studio 2022

Download [Visual Studio 2022 Community](https://visualstudio.microsoft.com/downloads/) (free).

During installation, select the following workloads and components:

- **Desktop development with C++** (workload)
- **C++ CMake tools for Windows** (individual component — included by default in the workload above)

:::warning
Make sure CMake tools are installed. Visual Studio uses them to open and build CMake-based projects directly. MinGW is **not supported** — the MSVC toolchain is required.
:::

## 2. Install Git

Download and install [Git for Windows](https://git-scm.com/download/win). Default settings are fine.

Verify the installation by opening a terminal and running:

```
git --version
```

---

## 3. Clone the Plugin Template

Open a terminal (Command Prompt, PowerShell, or Git Bash) and clone the plugin template with submodules:

```
git clone --recursive https://github.com/Patrix9999/union-plugin-template.git MyPlugin
```

:::danger
The `--recursive` flag is **required**. Without it, the `union-api` and `gothic-api` submodules inside `dependencies/` will not be downloaded and the project will not compile.

If you already cloned without `--recursive`, run:
```
git submodule update --init --recursive
```
:::

---

## 4. Project Structure

After cloning, your project will have the following structure:

```
MyPlugin/
├── CMakeLists.txt          # Main build configuration
├── CMakePresets.json        # Build presets (G1, G2A, MP, etc.)
├── src/
│   ├── DllMain.cpp          # DLL entry point
│   ├── Plugin.cpp           # Multi-game compilation dispatcher
│   ├── Plugin.hpp           # Game event functions (your code goes here)
│   └── Sources.hpp          # Includes Plugin.hpp
├── userapi/                 # Custom .inl extension files for ZenGin classes
├── vdf/                     # VDF archive builder (for distribution)
├── resources/               # Version info resources
└── dependencies/
    └── union/
        ├── CMakeLists.txt   # Links union-api and gothic-api
        ├── union-api/       # Git submodule — core Union API
        └── gothic-api/      # Git submodule — ZenGin headers
```

The key files you'll work with:

| File               | Purpose                                                              |
| ------------------ | -------------------------------------------------------------------- |
| `Plugin.hpp`       | Game event functions and your plugin logic                           |
| `Plugin.cpp`       | Dispatches compilation for each game version (`__G1`, `__G2A`, etc.) |
| `Sources.hpp`      | Entry point for includes — add your extra `.hpp` files here          |
| `CMakeLists.txt`   | Build configuration — project name, version, C++ standard            |
| `CMakePresets.json` | Defines build presets for each game version and build type           |

---

## 5. Configure the Project

Open `CMakeLists.txt` and change the project name — this will be the output DLL filename:

```cmake
project(MyPlugin                              # <-- your plugin name
    DESCRIPTION "Union plugin for Gothic Games"
    VERSION ${PROJECT_VERSION}
)
```

---

## 6. Open in Visual Studio

1. Right-click the project folder and select **Open with Visual Studio**, or:
2. Open Visual Studio 2022, select **File → Open → CMake...** and pick `CMakeLists.txt`
3. Visual Studio will configure the project automatically

## 7. Select a Build Configuration

In the toolbar, use the **Solution Configurations** dropdown to select a CMake preset:

| Preset          | Target                          | Build Type |
| --------------- | ------------------------------- | ---------- |
| `G1-Debug`      | Gothic I                        | Debug      |
| `G1-Release`    | Gothic I                        | Release    |
| `G1A-Release`   | Gothic I Addon                  | Release    |
| `G2-Release`    | Gothic II                       | Release    |
| `G2A-Debug`     | Gothic II: Night of the Raven   | Debug      |
| `G2A-Release`   | Gothic II: Night of the Raven   | Release    |
| `MP-Debug`      | All game versions at once       | Debug      |
| `MP-Release`    | All game versions at once       | Release    |

:::tip
For development, use **Debug** presets. For distribution, use **Release**. The **MP** (Multi-Platform) preset compiles for all four game versions in a single build.
:::

## 8. Build the Plugin

Select your plugin from the **Startup Item** dropdown, then press **Ctrl+Shift+B** or select **Build → Build All**.

The compiled DLL will be placed in:
```
MyPlugin/out/build/<preset-name>/MyPlugin.dll
```

### Building from Command Line

You can also build without opening Visual Studio:

```
cmake . --preset G2A-Release
cmake --build --preset G2A-Release
```

---

## 9. Install the Plugin

Copy the compiled DLL to your Gothic installation:

```
<Gothic Installation>/System/Autorun/
```

If the `Autorun` directory doesn't exist, create it.

:::tip
To skip manual copying, you can set the output directory directly in `CMakeLists.txt` so the DLL is built straight into your game's `Autorun` folder:

```cmake
set_target_properties(${CMAKE_PROJECT_NAME} PROPERTIES
    RUNTIME_OUTPUT_DIRECTORY "E:/SteamLibrary/steamapps/common/Gothic II/system/Autorun"
)
```

Replace the path with your actual Gothic installation path. After this, every build will place the DLL directly where the game expects it.
:::

---

## 10. Enable the Debug Console

To see debug output from your plugin, enable the Union debug window in `SystemPack.ini` (located in the game's `System/` directory):

```ini
[CORE]
ShowDebugWindow=true
```

This opens a separate console window when the game starts, where all `StdPrintLine()` messages will appear.

:::warning
Without this setting, you won't see any console output from your plugin. Make sure to enable it during development.
:::

---

## VDF Archive Generation

The template can automatically build a `.vdf` archive containing your DLL and any additional files from the `vdf/` directory. This is controlled by the `GENERATE_VDF` option in `CMakeLists.txt` and is enabled by default — useful for distributing your plugin as a single archive.

---

## Summary

- Install **Visual Studio 2022** with C++ and CMake tools, and **Git**
- Clone the [template](https://github.com/Patrix9999/union-plugin-template) with `--recursive`
- Configure the project name in `CMakeLists.txt`
- Open with Visual Studio, select a preset, build with **Ctrl+Shift+B**
- Place the DLL in the game's `System/Autorun/` directory
- Enable `ShowDebugWindow=true` in `SystemPack.ini` to see debug output
- Always build for **x86** — Gothic is a 32-bit application
