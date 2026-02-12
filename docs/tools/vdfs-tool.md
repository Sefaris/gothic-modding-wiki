---
sidebar_position: 4
title: "VDFS Tool"
description: "A modern tool for creating, modifying, and compressing VDF volumes with Union support."
---

# VDFS Tool

**VDFS Tool** is a modern utility for working with Gothic VDFS volumes (`.vdf` and `.mod` files). Developed by **Gratt**, it supports advanced features introduced by the **Union** team, such as ZIP compression and extended timestamps, alongside standard volume operations.

## Features

- **Read, create, and modify** VDF volumes
- **Volume compression** (ZIP algorithm)
- **Volume optimization** (deduplication)
- **Extended timestamp** support (up to year 2107)
- **Explorer-style navigation** (search, copy, paste)
- **Drag & Drop** support
- **Direct file opening** without extraction
- **One-click content updates**

## Volume Compression

The tool allows you to compress volumes using the classic **zlib** (ZIP) algorithm. This significantly reduces the size of mod files.

To use compressed volumes, the game **must have Union installed**. Union includes a special `ZippedStream` interface in `vdfs32g.dll` that allows the engine to decompress data chunks in real-time without performance loss.

:::warning
Compressed `.mod` and `.vdf` archives will **NOT** work without [Union](../general-info/union.md). Ensure your users have Union installed if you distribute compressed mods.
:::

## Volume Optimization

The **Optimization** feature scans the volume for files with identical content. If duplicates are found, they are combined to reference a single data source within the archive, reducing the overall file size.

## Extended Timestamp

Standard VDFS timestamps have limitations. The VDFS Tool supports an extended timestamp format that allows for:
- Dates up to the year **2107**
- **31** days per month
- **16** months per year
- **31** hours per day / **61** minutes per hour / **62** seconds per minute (useful for internal logic or versioning)

## Interface & Workflow

### File Explorer
The interface mimics Windows Explorer, supporting standard operations like copying, pasting, renaming, and searching files within the volume.

### Drag & Drop
You can drag files from Windows Explorer into the VDFS Tool to add them, or drag files out of the tool to extract them.

:::info
For Drag & Drop to work, both VDFS Tool and Windows Explorer must run with the same privileges. If you run VDFS Tool as Administrator, Drag & Drop from a standard Explorer window may not work.
:::

### Direct File Opening
You can double-click any file inside a volume to open it with its associated default application, without needing to manually extract it first.

### One-Click Update
Use the shortcut `Ctrl + U` to trigger the **One-Click Update**. The program compares files in the volume with their loose counterparts in the game directories. If newer versions of the files exist on the disk, the volume is automatically updated with the fresh content upon saving.

## Download & Links

- [**World of Players Thread (RU)**](https://worldofplayers.ru/threads/42314/) – Original release and discussion.
- [**GitHub Repository**](https://github.com/Gratt-5r2/gothic-fix-archive/tree/main/utilities) – Source for updates and downloads.
