---
sidebar_position: 6
title: "zBassMusic"
description: "A modern Union plugin replacing Gothic's DirectMusic system with the BASS library, enabling MP3, OGG, WAV and other standard audio formats."
---

# zBassMusic

**zBassMusic** is a modern music system for Gothic games built on the [BASS audio library](https://www.un4seen.com/). It replaces the engine's native **DirectMusic** playback with a custom implementation, allowing modders to use standard audio formats instead of the legacy `.SGT`/`.STY`/`.DLS` files.

The plugin is developed by the **Silver Ore Team** (tehe) and requires [Union](../general-info/union.md).

:::tip
zBassMusic is the recommended way to add custom music to new mods - you can use standard `.mp3`, `.ogg` or `.wav` files without needing to learn [DirectMusic Producer](./directmusic-producer.md).
:::

## Features

- **Standard audio formats** - play music from `.mp3`, `.ogg`, `.wav`, `.flac` and other common formats instead of DirectMusic's proprietary `.sgt` files.
- **VDF/MOD archive support** - music files can be packed into `.vdf`/`.mod` archives. Native DirectMusic files must be placed as loose files in the `Data/Music/` directory.
- **Smooth cross-fades** - alternative scheduling and transition systems that support smooth cross-fades between themes.
- **Scriptable** - provides a Daedalus script interface for controlling the music system.
- **Backward compatible** - original `.sgt` music still works. When a theme references an `.sgt` file, zBassMusic redirects playback to the original DirectMusic system.
- **Drop-in replacement** - existing `C_MUSICTHEME` definitions work out of the box. Just change the `file` field to point to your audio file.

## Installation

1. Install [Union](../general-info/union.md) if you haven't already.
2. Download the latest release from the [zBassMusic GitHub releases](https://github.com/Silver-Ore-Team/zBassMusic/releases).
3. Place the plugin DLL in `<Gothic>/System/Autorun/`.

## Basic Usage

Replace the `file` field in your `C_MUSICTHEME` instances to point to a standard audio file instead of an `.sgt` file:

```daedalus
instance OWD_Day_Std(C_MUSICTHEME_DEF)
{
    file        = "OWD_DayStd.mp3";   // was: "OWD_DayStd.sgt"
    transType   = TRANSITION_TYPE_FILL;
    transSubType = TRANSITION_SUB_TYPE_MEASURE;
    reverbMix   = -8;
    reverbTime  = 9000;
};
```

Place your audio file in `<Gothic>/Data/Music/` or inside a `.vdf`/`.mod` archive.

:::info
For a complete setup guide, transitions configuration, and advanced features, see the official [zBassMusic User Guide](https://silver-ore-team.github.io/zBassMusic/user-guide/).
:::

## Comparison with DirectMusic

| Feature                      | DirectMusic (native)          | zBassMusic                         |
| ---------------------------- | ----------------------------- | ---------------------------------- |
| **Audio formats**            | `.SGT`, `.STY`, `.DLS`        | `.mp3`, `.ogg`, `.wav`, `.flac`    |
| **Authoring tool**           | DirectMusic Producer (legacy) | Any audio editor / DAW             |
| **VDF/MOD archive support**  | No (loose files only)         | Yes                                |
| **Cross-fade transitions**   | Engine-managed                | Custom, smooth cross-fades         |
| **Dynamic music (patterns)** | Yes (native)                  | Custom scheduling system           |
| **Script interface**         | `C_MUSICTHEME` only           | `C_MUSICTHEME` + extended Daedalus |
| **Requires Union**           | No                            | Yes                                |

## External Links

- [zBassMusic Documentation](https://silver-ore-team.github.io/zBassMusic/) - Full official documentation and user guide.
- [zBassMusic GitHub](https://github.com/Silver-Ore-Team/zBassMusic) - Source code and releases.
- [GMC - zBassMusic](https://gothic-modding-community.github.io/gmc/zengin/union/plugins/zbassmusic/) - Gothic Modding Community page.
- [BASS Library](https://www.un4seen.com/) - The underlying audio library by un4seen.
