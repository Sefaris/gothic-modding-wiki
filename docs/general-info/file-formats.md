---
sidebar_position: 5
title: "File Formats"
description: "Complete reference of file formats and extensions used in Gothic I/II modding."
---

# File Formats

This page lists all file formats and extensions used by the **ZenGin** engine (Gothic I & Gothic II) that are relevant to modding.

---

## Daedalus Scripts

| Extension | Description                                                                                                                                                                                                                                                           |
| --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `.d`      | **Daedalus source file.** The main scripting language of Gothic. C-like syntax with custom constructs (`instance`, `prototype`, `class`). Used to define NPCs, items, dialogs, quests, AI, effects, menus, sounds, music, and more.                                   |
| `.src`    | **Compilation list.** A plain-text file listing `.d` files (one per line) in the order they should be compiled. Supports wildcards (`*.d`). Key files: `Gothic.src`, `Fight.src`, `Camera.src`, `Menu.src`, `Music.src`, `ParticleFX.src`, `SFX.src`, `VisualFX.src`. |
| `.dat`    | **Compiled Daedalus binary.** The output of script compilation, read by the engine at runtime. Generated files: `Gothic.dat`, `Menu.dat`, `SFX.dat`, `PFX.dat`, `VFX.dat`, `Camera.dat`, `Music.dat`, `Fight.dat`.                                                    |

:::info
The `.src` file determines the **compilation order** - symbols must be declared before they are used. `Gothic.src` is the main entry point for game logic scripts.
:::

---

## 3D Models & Meshes

| Extension | Description                                                                                                                                                                              |
| --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `.3DS`    | **3D Studio Max mesh.** Used for item visuals and world objects. Can be imported/exported via [KrxImpExp](./tools/krximpexp.md). Referenced in the `visual` field of `C_Item` instances. |
| `.ASC`    | **ASCII model format.** Text-based format for meshes - the editable intermediate format in model pipelines. Can be imported/exported via KrxImpExp.                                      |
| `.MRM`    | **Multi-Resolution Mesh.** Compiled (binary) mesh format, optimized for rendering. Import-only in KrxImpExp.                                                                             |
| `.MSH`    | **ZenGin mesh.** Engine-native mesh format. Import-only in KrxImpExp.                                                                                                                    |
| `.MDL`    | **Model file.** Complete compiled model containing mesh and skeleton data.                                                                                                               |
| `.MDM`    | **Model Mesh.** Mesh component of a model (separated from hierarchy).                                                                                                                    |
| `.MDH`    | **Model Hierarchy.** Skeleton/bone hierarchy component of a model.                                                                                                                       |
| `.MMB`    | **Morph Mesh Binary.** Facial morph meshes used for NPC lip-sync and expressions.                                                                                                        |

---

## Animations

| Extension | Description                                                                                                                                                                                                                       |
| --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `.ASC`    | **ASCII model format.** Also used for animations - exported skeletal animations are stored in `.ASC` files. Can be imported/exported via KrxImpExp.                                                                               |
| `.MDS`    | **Model Script.** Animation definition file that describes animation overlays, transitions, and states. Applied via `Mdl_ApplyOverlayMds()` / `Mdl_SetVisual()`. Examples: `HUMANS.MDS`, `Humans_Relaxed.mds`, `HUMANS_FLEE.MDS`. |
| `.MSB`    | **Model Script Binary.** Compiled version of `.MDS` files.                                                                                                                                                                        |
| `.MAN`    | **Model Animation.** Binary animation data file for a single animation.                                                                                                                                                           |

---

## Worlds

| Extension | Description                                                                                                                                                                                                                             |
| --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `.ZEN`    | **ZenGin world file.** Contains the entire game world: geometry, Vobs (virtual objects), waypoints, freepoints, triggers, lights, sounds, and more. Created and edited with the **Gothic Spacer** editor. Can be imported in KrxImpExp. |

---

## Textures & Graphics

| Extension | Description                                                                                                                                                     |
| --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `.TGA`    | **Targa texture.** The primary source texture format for Gothic. Used for everything: world textures, particle effects, UI elements, fonts, lightmaps.          |
| `.TEX`    | **Compiled texture.** Engine-optimized compiled texture created from `.TGA` files. Stored in `_compiled/` subfolders inside VDF archives.                       |
| `.FNT`    | **Font file.** Bitmap font definition mapping characters to positions in a `.TGA` font atlas. Standard fonts: `FONT_OLD_10_WHITE.FNT`, `FONT_OLD_20_WHITE.FNT`. |

---

## Audio

| Extension | Description                                                                                                                                                                                             |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `.WAV`    | **Audio file.** Used for voice acting, sound effects, and some music. Speech files are stored in `Data/Sound/Speech/` with names matching `AI_Output` identifiers (e.g., `DIA_Konrad_Hallo_08_01.WAV`). |
| `.SFX`    | **Sound effect definition** (in script context - defined via `C_SFX` class in `SFX.src`).                                                                                                               |

---

## Music (DirectMusic)

Gothic uses the **Microsoft DirectMusic** system for dynamic, interactive music. Music files are stored in `Data/Music/`.

| Extension | Description                                                                                                                                                                                                                                                    |
| --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `.SGT`    | **DirectMusic Segment.** The main music file format referenced by `C_MUSICTHEME.file` in music scripts. Contains references to styles, bands, and chord progressions that together form a playable music piece. Examples: `OWD_DayStd.sgt`, `nw_dayfgt.sgt`. |
| `.STY`    | **DirectMusic Style.** Defines musical patterns, motifs, and variations. Styles are referenced by `.SGT` segments and provide the actual note/rhythm data that DirectMusic plays back dynamically.                                                              |
| `.DLS`    | **Downloadable Sounds (DLS).** Instrument/sample bank files used by DirectMusic for sound synthesis. Contains the actual instrument samples (wavetable data) used to play back music defined in `.SGT` and `.STY` files.                                        |

---

## Dialog Data

| Extension | Description                                                                                                                                                      |
| --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `.BIN`    | **Output Units binary** (`ou.bin`). Compiled dialog/cutscene data containing voice file mappings and subtitle text. Generated from `AI_Output` calls in scripts. |
| `.CSL`    | **Cutscene library.** Contains cutscene definitions used by the `oCsManager` (cutscene manager).                                                                 |

---

## Archives & Mod Distribution

| Extension | Description                                                                                                                                                                                                                                                   |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `.VDF`    | **Virtual Disk File.** Gothic's archive format for packing game assets (meshes, textures, worlds, sounds, compiled scripts). Standard files: `Meshes.vdf`, `Textures.vdf`, `Worlds.vdf`, `Anims.vdf`, `Sound.vdf`, `Speech.vdf`. Created with **GothicVDFS**. |
| `.MOD`    | **Mod archive.** Functionally identical to `.VDF`, used for distributing mods. Placed in `Data/modvdf/` and loaded by the engine via the `.ini` file's `VDF=` line.                                                                                           |

:::info
Both `.VDF` and `.MOD` use the same internal format. The engine loads them based on archive date stamp - newer archives override older ones. That's why [EGMT](./tools/easy-gothic-mod-translator.md) increases the date by 1 day when creating translation patches.
:::

---

## Configuration

| Extension | Description                                                                                                                                                                                                                                                  |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `.INI`    | **Configuration file.** `Gothic.ini` stores engine settings (resolution, keybindings, paths). Mod-specific `.ini` files (e.g., `MyMod.ini`) define the mod's VDF load order via the `VDF=` line. Can be read/written from Daedalus using the Ikarus library. |

---

## Savegames

| Extension | Description                                                                                                                   |
| --------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `.SAV`    | **Savegame file.** Contains the serialized game state: world, NPCs, items, quest progress. Stored in `Saves/savegame[0-20]/`. |

---

## Union Plugins

| Extension | Description                                                                                                                                                                  |
| --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `.DLL`    | **Dynamic Link Library.** Union C++ plugins compiled as DLLs. Installed in `System/Autorun/` and loaded by the Union runtime. Allows hooking and extending engine functions. |

---

## Summary Table

| Category                | Extensions                                                     |
| ----------------------- | -------------------------------------------------------------- |
| **Daedalus scripting**  | `.d`, `.src`, `.dat`                                           |
| **3D models & meshes**  | `.3DS`, `.ASC`, `.MRM`, `.MSH`, `.MDL`, `.MDM`, `.MDH`, `.MMB` |
| **Animations**          | `.MDS`, `.MSB`, `.MAN`                                         |
| **Worlds**              | `.ZEN`                                                         |
| **Textures & graphics** | `.TGA`, `.TEX`, `.FNT`                                         |
| **Audio**               | `.WAV`                                                         |
| **Music (DirectMusic)** | `.SGT`, `.STY`, `.DLS`                                         |
| **Dialog data**         | `.BIN` (`ou.bin`), `.CSL`                                      |
| **Archives**            | `.VDF`, `.MOD`                                                 |
| **Configuration**       | `.INI`                                                         |
| **Savegames**           | `.SAV`                                                         |
| **Union plugins**       | `.DLL`                                                         |
