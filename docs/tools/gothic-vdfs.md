---
sidebar_position: 2
title: "GothicVDFS"
description: "The classic tool for viewing, building, and extracting VDF volumes."
---

# GothicVDFS

**GothicVDFS** is the most popular tool for working with VDFS volumes (`.vdf` and `.mod` archives). Created by **NicoDE**, it allows for viewing, extracting, and building these archives.

## Working Areas

The tool is divided into two main working areas: the **Viewer** and the **Builder**.

### Viewer

The **Viewer** allows you to inspect and extract existing VDF archives.

-   **Filename**: Select the path to the `.vdf` or `.mod` file you want to open.
-   **Root Path**: Select the directory where files will be extracted.
-   **Content Information**: Displays the file's comment and timestamp.
    -   *Note*: The timestamp determines the load order of volumes in the game (files with newer timestamps override older ones).

**Extraction Options**:
1.  **Extract Volume**: Extracts the entire archive content to the Root Path.
2.  **Extract Directory**: Extracts only the currently selected folder.
3.  **Extract Selected**: Extracts only the currently selected files.

### Builder

The **Builder** is used to create new VDF archives.

-   **Filename**: Specify the path and name for the new `.vdf` or `.mod` file.
-   **Root Path**: The base directory for the files you want to pack (usually your Gothic directory).
-   **File Lists**:
    -   **Search for**: File masks to include (e.g., `_WORK/Data/Anims/_compiled/*`).
    -   **Exclude**: File masks to exclude from the archive.
    -   **Include**: Explicit list of files to include.

At the bottom, you can **Build Volume** directly or **Save Script** (`.vm`) for future use or batch processing.

## CLI Interface

GothicVDFS includes a command-line interface useful for automation and scripting.

### Build VDF from Script

```bash
GothicVDFS.exe /B script.vm
```

### Extract VDF to Directory

```bash
GothicVDFS.exe /X MySuperMod.mod ./extract_here
```

## Script Reference

VDFS configuration scripts (`.vm`) are simple text files used to define usage rules for the builder.

### Structure

A script is divided into sections marked by headers in square brackets. It must contain at least `[BEGINVDF]` and `[ENDVDF]`.

#### `[BEGINVDF]`
Marks the start of the script and contains properties:
-   `Comment`: Text comment for the volume.
-   `BaseDir`: Root path of local files (relative to the working directory).
-   `VDFName`: Name of the output VDF file.

#### `[FILES]`
List of file masks to include in the archive (relative to `BaseDir`).

#### `[EXCLUDE]`
List of file masks to exclude from the archive.

#### `[INCLUDE]`
List of specific files to always include.

#### `[ENDVDF]`
Marks the end of the script.

### Example Script

```ini
[BEGINVDF]
Comment=My Custom Mod Archive
BaseDir=.
VDFName=MySuperMod.mod
[FILES]
_work/Data/Anims/_compiled/*
_work/Data/Meshes/_compiled/*
_work/Data/Scripts/_compiled/*
[EXCLUDE]
*.wav
[INCLUDE]
this_is_fine.wav
[ENDVDF]
```
