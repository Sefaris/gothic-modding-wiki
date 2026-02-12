---
sidebar_position: 7
title: "RAD Video Tools"
description: "Free tool for converting video files to the Bink (.BIK) format used by the Gothic engine for cutscenes and intro videos."
---

# RAD Video Tools

**RAD Video Tools** (formerly known as **The RAD Video Tools**) is a free video conversion utility by **Epic Games Tools** (previously RAD Game Tools). It allows you to convert standard video files into the **Bink Video** (`.BIK`) format - the proprietary video format used by the Gothic engine for cutscenes, intros, and credits.

:::tip
RAD Video Tools is the only way to create `.BIK` files for Gothic. You can convert any standard video (`.avi`, `.mp4`, `.mov`, `.wmv`, etc.) to Bink format and use it as a cutscene in your mod.
:::

## How Gothic Uses BIK Videos

Gothic's ZenGin engine uses the **Bink Video** codec (by RAD Game Tools) for all full-motion video playback. The engine's internal `oCBinkPlayer` class handles loading and playing `.BIK` files.

Videos are played from Daedalus scripts using the built-in `PlayVideo()` and `PlayVideoEx()` external functions:

```daedalus
// Play a simple cutscene video
PlayVideo("INTRO.BIK");

// Play two videos in sequence (e.g., intro + addon title)
PlayVideo("INTRO.BIK");
PlayVideo("Addon_Title.BIK");
```

### PlayVideo vs PlayVideoEx

The engine provides two functions for video playback:

| Function      | Signature                                                        | Description                                                                                                                                                                       |
| ------------- | ---------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `PlayVideo`   | `PlayVideo(string filename)`                                     | Plays a video file. Returns `TRUE` on success.                                                                                                                                    |
| `PlayVideoEx` | `PlayVideoEx(string filename, int screenBlend, int exitSession)` | Extended version. `screenBlend` enables a black screen fade effect after playback. If `exitSession` is `TRUE`, the game session ends after the video (used for ending cutscenes). |

### Where to Place Video Files

All `.BIK` files must be placed in the Gothic video directory:

```
<Gothic>/_work/Data/Video/
```

:::info
Video files **cannot** be packed into `.vdf` or `.mod` archives. They must exist as loose files in the `Video` directory.
:::

### Standard Gothic 2 Videos

Gothic II: Night of the Raven ships with these `.BIK` files:

| File              | Used for                           |
| ----------------- | ---------------------------------- |
| `logo1.bik`       | Publisher logo (played on startup) |
| `logo2.bik`       | Developer logo (played on startup) |
| `intro.bik`       | Main intro cinematic               |
| `Addon_Title.bik` | Night of the Raven title screen    |
| `credits.bik`     | End credits (part 1)               |
| `credits2.bik`    | End credits (part 2)               |
| `ORCATTACK.BIK`   | Orc attack event cutscene          |
| `YOURSHIP.BIK`    | Ship cutscene                      |

:::info
The engine also supports resolution-specific videos. When opening a file like `INTRO.BIK`, it first tries resolution-tagged variants (e.g., `INTRO1024x768.BIK`, `INTRO800x600.BIK`) matching the current display resolution before falling back to the base file.
:::

### Where Videos Are Called in Scripts

Videos are typically called in three places:

1. **Startup functions** (`Startup.d`) - intro cinematics played when a new game starts or a chapter begins.
2. **Main menu** (`Menu_Main.d`) - intro and credits videos triggered from menu items.
3. **Story events** (`Story/Events/`) - in-game cutscenes triggered by script events (e.g., orc attacks, ship sequences).

## Installing RAD Video Tools

1. Download **RAD Video Tools** from the official website:
   - [Download RAD Video Tools](https://www.radgametools.com/bnkdown.htm)
   - The download is a `.7z` archive with password: `RAD`
2. Extract the archive (you need [7-Zip](https://www.7-zip.org/) or a compatible extractor).
3. Run `RADTools.exe` - no installation required.

## Converting Videos to BIK

### Step-by-Step Guide

1. **Launch RAD Video Tools** (`RADTools.exe`).
2. **Navigate to your video file** using the built-in file browser.
3. **Select the video** you want to convert and click **"Bink it!"**.
4. **Configure compression settings:**
   - **Data rate** - controls quality vs. file size. For Gothic cutscenes, 1000-3000 kbps is typically sufficient for 640x480 resolution.
   - **Frame rate** - match the source video's frame rate (usually 25 or 30 fps).
   - **Audio** - Bink includes its own audio codec. You can adjust audio compression or keep the defaults.
   - **Key frame interval** - lower values produce more key frames (faster seeking but larger files).
5. **Click "Bink"** to start the conversion.
6. **Place the output `.bik` file** in `<Gothic>/_work/Data/Video/`.

### Recommended Settings for Gothic

| Setting    | Recommended value                                   |
| ---------- | --------------------------------------------------- |
| Resolution | 640x480 or 800x600 (match Gothic's game resolution) |
| Data rate  | 1500 - 3000 kbps                                    |
| Frame rate | 25 fps                                              |
| Audio      | 44100 Hz, stereo                                    |

:::warning
Gothic 1 and Gothic 2 use **Bink 1** (`.bik`), **not** Bink 2 (`.bk2`). Make sure you compress to the original Bink format. RAD Video Tools compresses to Bink 1 by default.
:::

## Playing BIK Files

RAD Video Tools also includes a built-in **Bink Player** for previewing your videos. Simply double-click a `.bik` file or select it in RAD Video Tools and press **"Play"**.

During playback in Gothic, the player can press **Escape** to skip the video. If `extendedVideoKeys` is enabled in the Gothic INI file, additional controls are available:

| Key             | Action                 |
| --------------- | ---------------------- |
| **Escape**      | Skip / cancel video    |
| **Space**       | Pause / unpause        |
| **Right Arrow** | Skip forward 30 frames |
| **Home**        | Restart video          |
| **Up / Down**   | Adjust volume          |
| **Q**           | Toggle sound on/off    |

## Using Your Video in a Mod

### Example: Adding a Custom Intro

1. Create or edit your video in any video editor (e.g., DaVinci Resolve, Premiere, Shotcut).
2. Export to a standard format (`.avi`, `.mp4`).
3. Convert to `.bik` using RAD Video Tools.
4. Place the `.bik` file in `<Gothic>/_work/Data/Video/`.
5. Call it from your Daedalus script:

```daedalus
// In Startup.d - play custom intro when starting a new game
func void startup_global()
{
    PlayVideo("MY_MOD_INTRO.BIK");
    // ... rest of startup
};
```

### Example: Adding an Ending Cutscene

Use `PlayVideoEx` with the `exitSession` flag to end the game after the video:

```daedalus
// Play ending cutscene and exit to main menu
PlayVideoEx("MY_MOD_ENDING.BIK", TRUE, TRUE);
```

## External Links

- [RAD Video Tools Download](https://www.radgametools.com/bnkdown.htm) - Official download page.
- [Bink Video](https://www.radgametools.com/bnkmain.htm) - Bink codec information.
- [RAD Video Tools FAQ](https://www.radgametools.com/binkfaq.htm) - Frequently asked questions.
