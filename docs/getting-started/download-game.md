---
sidebar_position: 1
title: "Downloading the Game from Steam/GOG"
description: "Where to download Gothic, system requirements, and differences between versions."
---

# Downloading the Game from Steam/GOG

To create Gothic modifications, you need the original version of the game. Gothic is available on two digital distribution platforms: **Steam** and **GOG**.

## Which Version?

For modding, **Gothic II: Night of the Raven** is most commonly used - it's the most feature-rich version of the ZenGin engine and has the largest modding community support.

:::tip
If you want to create modifications, choose **Gothic II: Gold Edition** - it includes the base game and the Night of the Raven expansion.
:::

## Steam

1. Open [Steam](https://store.steampowered.com/) and log in to your account
2. Search for **Gothic II: Gold Edition**
3. Purchase and install the game
4. Default installation path: `C:\Program Files (x86)\Steam\steamapps\common\Gothic II`

:::warning
The Steam version may require additional configuration - in some cases the game uses a newer renderer that can cause issues. Make sure the game runs correctly before starting to mod.
:::

## GOG

1. Open [GOG.com](https://www.gog.com/) and log in to your account
2. Search for **Gothic II: Gold Edition**
3. Purchase and install the game using GOG Galaxy or the offline installer
4. Default installation path: `C:\GOG Games\Gothic II Gold`

:::tip
The GOG version is usually a better choice for modding - it has no DRM and is closer to the original game version.
:::

## Directory Structure

After installation, the game directory should look roughly like this:

```
Gothic II/
├── System/             ← EXE files, DLLs, settings
│   ├── Gothic2.exe         ← main game executable
│   ├── Autorun/            ← Union plugins (DLLs)
│   └── ...
├── Data/               ← game data (models, textures, worlds)
│   ├── Meshes.vdf
│   ├── Textures.vdf
│   ├── Worlds.vdf
│   └── ...
├── _work/
│   └── Data/
│       ├── Scripts/    ← Daedalus scripts (we work here!)
│       │   ├── Content/
│       │   └── System/
│       ├── Worlds/     ← world files (.zen)
│       └── ...
└── Saves/              ← save files
```

The most important directory for a modder is **`_work/Data/Scripts/`** - this is where the Daedalus scripts we'll be editing are located.

## Verifying Installation

Before starting work, make sure that:

1. **The game launches** - start the game and check that it runs correctly
2. **You have access to scripts** - check that the `_work/Data/Scripts/Content/` directory exists and contains `.d` and `.src` files
3. **Gothic.src exists** - check that the file `_work/Data/Scripts/Content/Gothic.src` is present

:::info
If the `_work/Data/Scripts/` directory is empty or doesn't exist, you may need to extract scripts from `.vdf` files using **Gothic VDF Tool** or **GothicStarter**.
:::

## Next Step

After installing the game, proceed to [installing Visual Studio Code](./install-vscode.md) - the editor we'll use to write scripts.
