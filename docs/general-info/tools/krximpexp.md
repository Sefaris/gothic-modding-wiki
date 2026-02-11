---
sidebar_position: 1
title: "KrxImpExp"
description: "Blender add-on for importing and exporting 3D models from Gothic I and Gothic II."
---

# KrxImpExp

**KrxImpExp** (Kerrax Import Export) is an open-source **Blender add-on** that adds support for importing and exporting 3D model formats used by the **ZenGin** engine in Gothic I and Gothic II.

The original KrxImpExp was created by **Kerrax** for older 3D editors. The current version, maintained by **Patrix9999** and supported by the Gothic Modding Community, has been ported to the modern Blender API (2.80+) and works on **Windows**, **Linux**, and **macOS**.

:::tip
KrxImpExp is the go-to tool for anyone who wants to create or modify 3D models, worlds, or animations for Gothic.
:::

## Supported Formats

| Format | Import | Export | Description                              |
| ------ | :----: | :----: | ---------------------------------------- |
| `.3DS` |   ✅   |   ✅   | 3D Studio Max mesh format                |
| `.ASC` |   ✅   |   ✅   | ASCII model format (meshes & animations) |
| `.MRM` |   ✅   |   ❌   | Multi-resolution mesh (compiled mesh)    |
| `.MSH` |   ✅   |   ❌   | ZenGin mesh format                       |
| `.ZEN` |   ✅   |   ❌   | ZenGin world file                        |

## Supported Blender Versions

KrxImpExp supports Blender **2.80** through **4.0** (64-bit). If a newer version of Blender is released, it's worth trying it - community feedback helps keep compatibility up to date.

## Installation

### 1. Download the add-on

Download the latest version from the **dev** branch (recommended):

👉 [Download KrxImpExp (dev branch ZIP)](https://gitlab.com/Patrix9999/krximpexp/-/archive/dev/krximpexp-dev.zip)

### 2. Set up a custom scripts directory (recommended method)

1. Create a `scripts` folder somewhere on your disk (e.g., in your Documents folder).
2. Inside it, create an `addons` subfolder.
3. Extract the downloaded ZIP archive into the `addons` folder.

### 3. Configure Blender

1. Open Blender → **Edit** → **Preferences** → **File Paths**.
2. Under **Data** → **Scripts**, select the `scripts` folder you created.
3. Open the burger menu (☰) and click **Save Preferences**.
4. **Restart Blender.**

### 4. Enable the add-on

1. Open Blender → **Edit** → **Preferences** → **Add-ons**.
2. Search for **KrxImpExp**.
3. Enable it by clicking the checkbox.
4. Expand the add-on entry and press **Install KrxImpExp** to install required dependencies.

:::info
The add-on uses the [DearPy GUI](https://github.com/hoffstadt/DearPyGui) library for its modern UI. It will be installed automatically when you press the **Install KrxImpExp** button - this may require internet access.
:::

## Usage

After installation, you can access KrxImpExp through Blender's **File** → **Import** / **Export** menus. The supported Gothic formats will appear in the file type list.

### Importing a ZEN world

1. Go to **File** → **Import** → **ZEN (Gothic World)**.
2. Select a `.zen` file from your Gothic installation (e.g., `NEWWORLD.ZEN`).
3. The world geometry will be imported into the Blender scene.

### Exporting an ASC model

1. Select the mesh you want to export.
2. Go to **File** → **Export** → **ASC (Gothic ASCII Model)**.
3. Choose the output location and export.

## Links

- [GitLab Repository (dev branch)](https://gitlab.com/Patrix9999/krximpexp/-/tree/dev)
- [Original KrxImpExp (SourceForge)](http://krximpexp.sourceforge.net/)
- [GMC Discord Server](https://discord.gg/wbsVaE9mCn)
