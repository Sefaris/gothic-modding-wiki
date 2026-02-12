---
sidebar_position: 6
title: Music
description: Overview of the Music system in Gothic (DirectMusic), file formats, and scripting.
---

# Music System

Gothic uses **Microsoft DirectMusic** for its interactive soundtrack. Unlike simple audio streaming, DirectMusic allows for dynamic transitions and variations based on the game state (e.g., exploring, combat, or scripted events).

## File Formats

The music system relies on three main file types, which work together to create a dynamic soundtrack:

| Extension | Type | Description |
| :--- | :--- | :--- |
| `.dls` | **Downloadable Sounds** | Contains the instrument samples (wave forms) used by the music. |
| `.sty` | **Style** | Defines the musical structure, including bands (instruments), motifs, and patterns. |
| `.sgt` | **Segment** | The actual playable track that arranges the style patterns into a timeline. THIS is what you reference in scripts. |

:::warning
Music files (`.dls`, `.sty`, `.sgt`) **cannot** be packed into VDF or MOD volumes. They must be present as loose files in the `_work/Data/Music/` directory (and its subdirectories) to be loaded by the engine.
:::

## Tools

### DirectMusic Producer

To create native Gothic music, you need **DirectMusic Producer**, a legacy tool from the DirectX SDK. It allows you to compose adaptive music that reacts to game events.

- [Read more about DirectMusic Producer](/docs/tools/directmusic-producer)

### zBassMusic (Alternative)

For modern modding, you can use the **zBassMusic** Union plugin. It replaces the DirectMusic engine with the BASS audio library, allowing you to use standard audio formats like MP3 and OGG.

- [Read more about zBassMusic](/docs/tools/zbassmusic)

## Scripting

Music in Gothic is controlled via Daedalus scripts. The `C_MUSICTHEME` class defines a music track and its properties.

### Class Definition

```daedalus
class C_MUSICTHEME {
    var string file;           // The .sgt file to play
    var float vol;             // Volume (0.0 to 1.0)
    var int loop;              // Loop the track (1 = yes, 0 = no)
    var float reverbMix;       // Reverb effect mix
    var float reverbTime;      // Reverb duration in ms
    var int transType;         // Transition type (e.g., TRANSITION_TYPE_FILL)
    var int transSubType;      // Transition sub-type (e.g., TRANSITION_SUB_TYPE_MEASURE)
};
```

### Instance Example

Music instances are typically defined in `_work/Data/Scripts/System/Music/MusicInst.d`.

```daedalus
instance SYS_Menu(C_MUSICTHEME_DEF) {
    file = "Gamestart.sgt";
    transType = TRANSITION_TYPE_NONE;
    transSubType = TRANSITION_SUB_TYPE_MEASURE;
};
```

You can then play this instance using the `Wld_PlayGlobalSong(instance)` external or by assigning it to a zone/guild.
