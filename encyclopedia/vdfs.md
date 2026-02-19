---
sidebar_position: 1
---

# VDFS / VDF / MOD

The **Virtual Disk File System (VDFS)** is the file system used by the ZenGin (the engine behind Gothic 1/2) to distribute and store game assets. Files using this system typically have the `.vdf` or `.mod` extension.

## Overview

VDFS is a container format for a file/directory structure, conceptually similar to a `.tar` or `.zip` file, but without compression (in its standard form) and optimized for the engine's usage. It allows the engine to access thousands of individual assets (textures, models, scripts) from a single large file, which is more efficient for the operating system and the game.

### VDF vs MOD

While both use the same internal format, they are treated differently by the engine:

*   **VDF (`.vdf`)**:
    *   Stored in the `Data/` directory.
    *   Loaded automatically by the engine on startup.
    *   Load order is determined by the **timestamp** inside the file (files with newer timestamps override older ones).
    *   Used for the main game assets.

*   **MOD (`.mod`)**:
    *   Stored in the `Data/ModVDF/` directory.
    *   Loaded only if specified in the `.ini` file configuration for the mod.
    *   Used for modifications to separate their assets from the base game.

## Format Description

The VDF format consists of a **Header**, a **Catalog**, and the **Data** section.

:::info
For a detailed technical specification, check the [ZenKit documentation](https://zk.gothickit.dev/engine/formats/vdf/).
:::

### Header

The header describes the VDF file's global properties. Key fields include:

*   **Signature**: Identifies the game version (`PSVDSC_V2.00\r\n\r\n` for Gothic 1, `PSVDSC_V2.00\n\r\n\r` for Gothic 2).
*   **Timestamp**: A DOS-format date identifying when the archive was created. This is crucial for load order.
*   **Entry/File Counts**: Number of entries and files in the archive.
*   **Catalog Offset**: Where the file catalog begins (almost always `296` bytes).
*   **Version**: Format version (typically `0x50` for VDFS).

### Catalog

The catalog is a hierarchical list of all files and directories within the VDF. Each entry contains:

*   **Name**: Filename (up to 64 chars).
*   **Offset**: Position of the file data in the archive.
*   **Size**: Size of the file in bytes.
*   **Type**: Whether it is a file or a directory.
*   **Attributes**: Metadata flags.

### Data

The actual raw data of the files contained in the archive, stored contiguously as pointed to by the catalog offsets.

## Tools

Visual viewing and editing of VDF/MOD files can be done with various community tools:

*   [**GothicVDFS**](/docs/tools/gothic-vdfs): The classic, most popular tool. Allows viewing, extracting, and building volumes.
*   [**VDFS Tool**](/docs/tools/vdfs-tool): A newer tool supporting Union features and compression.
