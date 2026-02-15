---
sidebar_position: 20
title: "SpacerNET - Installation and Setup"
description: "Enhanced world editor for Gothic modding - modern replacement for the original Spacer."
---

# SpacerNET - Installation and Setup

SpacerNET is an enhanced world editor for Gothic modding that serves as a modern replacement for the original Spacer tool. It maintains full compatibility with Gothic's ZEN file format while providing improved functionality and stability.

## What is SpacerNET?

SpacerNET is a Union-based plugin that extends and improves the original Gothic Spacer (world editor). Key features include:

- **Full compatibility** with original Spacer ZEN files
- **Enhanced stability** and performance
- **Modern interface improvements**
- **Cross-compatibility** - worlds can be opened in both SpacerNET and original Spacer
- **No format changes** - your mod doesn't need Union to run the created worlds

:::info Compatibility Note
SpacerNET does not change Gothic's world format (ZEN). It's fully compatible with the original Spacer, meaning world files can be opened and modified in both tools.
:::

## System Requirements

- **Gothic 1** or **Gothic 2: Night of the Raven** (Steam version recommended)
- **Separate game copy** for Spacer work (recommended to avoid mixing with gameplay files)
- **GothicModKit** for resource extraction
- **Union 1.0m** framework
- **PlayerKit** for Union support

## Installation Guide

### Step 1: Prepare Gothic Installation

1. Install Gothic 2: Night of the Raven or Gothic 1 (Steam version)
2. Consider using a separate copy for Spacer work to avoid conflicts

### Step 2: Install Required Tools

#### GothicModKit Installation

- **For Gothic 1**: Download [G1 MDK](https://www.worldofgothic.de/dl/download_28.htm)
- **For Gothic 2**:
  - Download [G2 MDK 2.6](https://www.worldofgothic.de/dl/download_94.htm)
  - Then install [G2 MDK 2.6a](https://www.worldofgothic.de/dl/download_99.htm) on top

#### PlayerKit and Union Installation

3. Download and install **PlayerKit**: [Direct Link](https://drive.google.com/file/d/1HujF5KCAKlvqL5Qi8EtiT8GsG5WDpDf2/view)
4. Download and install **Union 1.0m**: [Direct Link](https://drive.google.com/file/d/1AkU5qvxIx7zc3kdpGAwlgA-2WiGS7sU5/view)

### Step 3: Install SpacerNET

1. **System folder setup**:
   - Place `spacer_net.ini` and `SpacerNET.ico` in the `system` folder
   - This only needs to be done once

2. **Mod installation**:
   - Place `SpacerNET.mod` in `Data/ModVDF` folder
   - When updating, simply replace this file

### Step 4: Initial Configuration

1. **Run Gothic once** to initialize INI files
2. **Launch SpacerNET** through `GothicStarter.exe` and select SpacerNET
3. **Enable debug console** (recommended):
   - Open `systempack.ini`
   - Set `ShowDebugWindow = true`

## Troubleshooting

### Menu Not Responding

**Problem**: After loading SpacerNET, menus are inactive and nothing responds to clicks.

**Solution**: Manually set screen resolution in `gothic.ini` (when SpacerNET is closed):

```ini
zVidResFullscreenX=1920
zVidResFullscreenY=1080
```

### Black Screen on Startup

**Problem**: SpacerNET shows only a black window after loading.

**Solution**: Remove DX11 renderer that may conflict:

- Delete `ddraw.dll` from the system folder, OR
- Install DX11 specifically for Spacer

:::warning DX11 Limitation
You cannot compile worlds and lighting with DX11 enabled. Remove it when working with SpacerNET.
:::

### Camera Not Moving

**Problem**: Right mouse button doesn't move/rotate the camera.

**Solution**:

1. Launch the game once (until main menu)
2. Exit the game to let `systempack.ini` write necessary settings
3. Camera should work normally afterwards

### World Loading Crashes

**Problem**: SpacerNET crashes when loading a world.

**Possible causes and solutions**:

- **Lego/Ikarus scripts**: Disable "Turn off music when loading" in sound settings
- **Missing assets**: Ensure all required models and animations are present
- **Union plugin conflicts**: Other Union/Ninja plugins may interfere

### Managing Union Plugin Conflicts

If your mod uses other Union plugins that interfere with SpacerNET:

1. Open `spacernet.ini` in the system folder
2. Add conflicting plugins to the exclusion list
3. Use the format specified in the INI for plugin exclusions

![exclusions](/img/spacer_1.JPG)

## Best Practices

- **Backup your worlds** regularly when working with SpacerNET
- **Use separate Gothic installation** for Spacer work
- **Test worlds in original Spacer** periodically to ensure compatibility
- **Keep Union plugins minimal** when using SpacerNET to avoid conflicts
- **Monitor the debug console** for important information and error messages

:::tip Next Steps
For detailed SpacerNET terminology and interface basics, see the [Spacer Basics](../modding-spacer-basics/spacer-basics.md) guide.
:::

## Resources

- [SpacerNET Forum Discussion](https://worldofplayers.ru/threads/43464/) (Russian)
- [GothicModKit Downloads](https://www.worldofgothic.de/)
- [Legacy Alt Renderer](https://github.com/SaiyansKing/Gothic-LegacyAltRenderer/releases/) (for graphics issues)

:::tip Need Help?
For additional support and troubleshooting, visit the [SpacerNET forum thread](https://worldofplayers.ru/threads/43464/) where the community actively helps with installation and usage questions.
:::
