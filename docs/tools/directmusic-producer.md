---
sidebar_position: 5
title: "DirectMusic Producer"
description: "Microsoft's authoring tool for creating interactive music in DirectMusic format (SGT, STY, DLS) used by the Gothic engine."
---

# DirectMusic Producer

**DirectMusic Producer** is a music authoring tool created by **Microsoft** as part of the **DirectX SDK**. It is the only tool that can create and edit the DirectMusic files (`.SGT`, `.STY`, `.DLS`) used by the Gothic engine's interactive music system.

:::warning
DirectMusic Producer is a legacy application from the early 2000s. It only runs on **32-bit Windows** or in compatibility mode on modern systems. It can be tricky to set up, but it is the only way to author native Gothic music files.
:::

## How Gothic Uses DirectMusic

Gothic's ZenGin engine uses **Microsoft DirectMusic** to play dynamic, interactive soundtracks. Instead of simply streaming audio files, the music is composed of modular building blocks that the engine combines and transitions between in real time based on gameplay context (exploration, combat, threat, etc.).

The music system is controlled via Daedalus scripts - the `C_MUSICTHEME` class defines which `.sgt` segment to play for each game zone and situation:

```daedalus
instance OWD_Day_Std(C_MUSICTHEME_DEF)
{
    file        = "OWD_DayStd.sgt";
    transType   = TRANSITION_TYPE_FILL;
    transSubType = TRANSITION_SUB_TYPE_MEASURE;
    reverbMix   = -8;
    reverbTime  = 9000;
};
```

:::info
Music files **cannot** be packed into `.vdf` or `.mod` archives. All music files must be placed directly in the `_work/Data/Music/` directory.
:::

## File Types

DirectMusic Producer works with three interconnected file types:

| File   | Type                | Description                                                                                                                         |
| ------ | ------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `.DLS` | Downloadable Sounds | The foundation of the music system. Contains collections of virtual instruments and their wave (audio sample) data.                 |
| `.STY` | Style               | Defines **Bands** (instrument configurations from `.DLS`) and **Patterns** (musical fragments/phrases that can be looped/combined). |
| `.SGT` | Segment             | The final playable track. Connects patterns from styles into a complete piece. This is the file referenced in `C_MUSICTHEME.file`.  |

### How They Relate

```
.DLS (instruments/samples)
  └── referenced by .STY (patterns + band configurations)
        └── referenced by .SGT (final segment = playable track)
              └── referenced by C_MUSICTHEME.file in Daedalus scripts
```

## Getting DirectMusic Producer

DirectMusic Producer was included in older versions of the **DirectX SDK**. The recommended version is from the **DirectX SDK (February 2010)** or earlier releases (DirectX 8.x / 9.x era SDKs).

### Installation Steps

1. Download the **DirectX SDK (June 2010)** - this is the last version available from Microsoft.
   - [Microsoft DirectX SDK (June 2010)](https://www.microsoft.com/en-us/download/details.aspx?id=6812)
2. Install the SDK. DirectMusic Producer is located in:
   ```
   <SDK Install Path>\Utilities\Bin\x86\DMUSProd.exe
   ```
3. On modern Windows (10/11), you may need to:
   - Run `DMUSProd.exe` in **Windows XP SP3 compatibility mode**.
   - Run as **Administrator**.
   - Install the **DirectX 9.0c End-User Runtime** if DirectMusic components are missing.

:::tip
Some modders report better compatibility running DirectMusic Producer inside a **Windows XP virtual machine** (e.g., using VirtualBox). This avoids most compatibility issues with modern Windows.
:::

## Basic Workflow

Creating new music for Gothic involves these general steps:

1. **Create or obtain a `.DLS` file** - this defines the instruments (sounds/samples) your music will use. You can use the default General MIDI DLS that ships with Windows, or create custom instruments.

2. **Create a `.STY` (Style) file** - define a Band (which instruments from the DLS to use and how) and compose Patterns (musical phrases). Each pattern is a fragment that can be looped and layered.

3. **Create a `.SGT` (Segment) file** - arrange patterns from your style into a complete piece. Set the tempo, time signature, and chord progression.

4. **Place the files** in `<Gothic>/Data/Music/` (all three files: `.dls`, `.sty`, `.sgt`).

5. **Reference the `.sgt` file** in a `C_MUSICTHEME` instance in the music scripts (`System/Music/musicinst.d`).

:::tip
For new mods, consider using **[zBassMusic](./zbassmusic.md)** - a modern Union plugin that replaces DirectMusic with standard audio formats (`.mp3`, `.ogg`, `.wav`). It's much easier to work with than DirectMusic Producer.
:::

## External Links

- [GMC - Gothic Music System](https://gothic-modding-community.github.io/gmc/zengin/music/) - Gothic Modding Community documentation on the music system.
- [Microsoft DirectX SDK (June 2010)](https://www.microsoft.com/en-us/download/details.aspx?id=6812) - Last SDK release containing DirectMusic Producer.
