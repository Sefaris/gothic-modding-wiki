---
sidebar_position: 7
title: Sound
description: Overview of the Sound system (SFX) in Gothic, file formats, and scripting.
---

# Sound System

The Sound system in Gothic handles sound effects (SFX) such as footsteps, weapon swings, monster cries, and ambient noises. Unlike the [Music](./music.md) system which uses DirectMusic, the SFX system plays standard audio files.

## File Formats

Gothic uses **WAV** files for sound effects.

| Extension | format | Description |
| :--- | :--- | :--- |
| `.wav` | PCM Wave | Standard uncompressed audio. |

### Properties
Original Gothic sound files typically have the following properties:
- **Channels**: Mono (1 channel)
- **Sample Rate**: 44100 Hz (44.1 kHz)
- **Bit Depth**: 16-bit (Gothic 1/2) or ADPCM compressed

:::info
Stereo files and other sample rates might work but can cause issues or 3D positioning problems. Mono is recommended for all spatial sounds.
:::

## File Structure

Sound files are located in `_work/Data/Sound/`:

- `SFX/` - General sound effects (weapons, magic, items).
- `Speech/` - Voice lines (referenced by `AI_Output` in scripts).

## Scripting

Sound effects are defined in Daedalus using the `C_SFX` class. Files defining these instances are typically found in `System/SFX/` (e.g., `SfxInst.d`).

### Class Definition

```daedalus
class C_SFX {
    var string file;             // Filename (e.g. "MySound.wav")
    var int pitchOff;            // Pitch offset (semitones)
    var int pitchVar;            // Pitch variance (random variation)
    var int vol;                 // Volume (0..127)
    var int loop;                // Loop (0=no, 1=yes)
    var int loopStartOffset;     // Loop start point
    var int loopEndOffset;       // Loop end point
    var float reverbLevel;       // Reverb amount
    var string pfxName;          // Associated particle effect name
};
```

### Instance Example

```daedalus
instance Mobs_Blacksmith_Hamm_A0(C_SFX_DEF) {
    file = "Hammer_A0.wav";
    pitchOff = 0;
    pitchVar = 0;
    vol = 127;
    loop = 0;
    loopStartOffset = 0;
    loopEndOffset = 0;
    reverbLevel = 0;
    pfxName = "";
};
```

### Playing Sounds

You can play sounds from scripts using various external functions:

-   **`Wld_PlayEffect(effectName, vob, ...)`**: Plays a visual or sound effect at a specific object's location.
    ```daedalus
    Wld_PlayEffect("spellFX_Fireball", hero, hero, 0, 0, 0, FALSE);
    ```
-   **`Snd_Play(instanceName)`**: Plays a sound as a 2D global sound (UI, menu).
-   **`Snd_Play3D(instanceName, vob)`**: Plays a sound at the location of an object.

## Speech

Dialogue voice lines (`Speech/`) are **not** defined as `C_SFX` instances. They are referenced directly by filename in `AI_Output` commands. See the [Daedalus](/docs/general-info/daedalus#dialog-system---ai_output) documentation for more details.
