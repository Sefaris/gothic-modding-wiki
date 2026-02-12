---
sidebar_position: 3
title: zTEXiPy
description: A Python tool for converting Gothic and Gothic 2 textures to common formats and vice versa.
---

# zTEXiPy

**zTEXiPy** is an open source project written in Python that utilizes the Pillow, NumPy, DearPyGui and libsquish libraries to convert **Gothic** and **Gothic 2** (ZenGin) textures to common formats and vice versa.

## Features

-   **Wide Format Support**: Converts Gothic and Gothic 2 textures to various formats including **TGA**, **PNG**, **WEBP**, **JPG**.
-   **Batch Conversion**: Allows users to batch convert multiple textures at once.
-   **Compression Support**: Supports compression to **DXT1 (BC1)**, **DXT3 (BC2)** and **DXT5 (BC3)** (Note: DXT5 is not supported by ZenGin natively yet).
-   **User Friendly**: Features a GUI for easy usage and context menu integration on Windows.

## Installation

### Windows (Recommended)

1.  Download the package from the [Release Page](https://gitlab.com/Shoun2137/ztexipy/-/releases).
2.  Unpack the package at your chosen installation path.
3.  Run `install.cmd` as a normal user.
    -   This script will invoke a Powershell script to add registry keys for context menu integration.
    -   Accept the administrative privileges prompt when asked.
4.  You can now open textures with a simple viewer, and you will get new context menus for various common formats!

### Linux

1.  Run the program using the commandline `zTEXiPy` for basic usage information or use `-GUI` to launch the graphical interface.
2.  Context menu integration is not available on Linux due to the variety of file managers.

## Requirements

-   **OS**: 64-bit system only.
-   **Python**: 3.12.6 or later (if running from source).
-   **Libraries**: Pillow, NumPy, DearPyGui, libsquish-bind.

## Usage

### GUI Mode

Launch the application to open the Graphical User Interface. You can drag and drop files or use the file picker to select textures for conversion.

### Context Menu (Windows)

Right-click on a supported texture file (e.g., `.tex`, `.tga`, `.png`) to see zTEXiPy options for quick conversion.

## Links

-   [GitLab Repository](https://gitlab.com/Shoun2137/ztexipy)
-   [Releases](https://gitlab.com/Shoun2137/ztexipy/-/releases)
-   [Discord Server](https://discord.gg/mCpS5b5SUY)
