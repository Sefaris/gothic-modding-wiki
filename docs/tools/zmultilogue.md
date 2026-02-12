---
sidebar_position: 8
title: zMultilogue
description: A Union plugin that enables multi-NPC dialogues in Gothic.
---

# zMultilogue

**zMultilogue** is a [Union](/docs/general-info/union) plugin created by [muczc1wek](https://github.com/muczc1wek) and [Silver Ore Team](https://github.com/Silver-Ore-Team) that enables dialogues with multiple NPCs simultaneously, without breaking the AI queue. It is a modern replacement for the older Ikarus/LeGo trialogue solutions.

## Features

- **Multi-NPC Dialogues**: Create conversations involving any number of NPCs.
- **No AI Queue Issues**: Designed to work without messing up the AI action queue.
- **Camera Control**: Advanced camera manipulation during dialogues.
- **Item Interaction**: Dialogues can interact with items and mobs.
- **Easy Porting**: Script interface based on the LeGo Trialogue package, making it easy to port existing scripts.
- **Auto-Distance**: Automatically increases dialog-box display distance if the NPC is too far.
- **Easy Scripting**: Provides both a manual interface and an auto-script interface for easy integration.

## Installation

### Prerequisites
- [Union](../general-info/union.md) 1.0m or later.

### Global Installation (For Development)
1. Download the latest `zMultilogue-<version>.vdf` from the [Releases page](https://github.com/Silver-Ore-Team/zMultilogue/releases).
2. Place the file in your `<Gothic>/Data/` directory.

### Mod Installation (For Release)
1. Rename the file to `zMultilogue.mod`.
2. Place it in `<Gothic>/Data/ModVDF/`.
3. Add it to your mod's `.ini` file:
   ```ini
   [FILES]
   VDF=YourMod.mod zMultilogue.mod
   ```

:::info
Since version 0.1.9, you **do not** need to manually add `ZS_MULTILOGUE` to your scripts. The plugin handles this automatically via [zParserExtender](https://gothic-modding-community.github.io/gmc/zengin/scripts/extenders/zparserextender/).
:::

## Configuration (Logging)

You can configure logging levels in `Gothic.ini`:

```ini
[ZMULTILOGUE]
; Logger levels: NONE, FATAL, ERROR, WARN, INFO, DEBUG, TRACE
LoggerLevelUnion=TRACE
LoggerLevelZSpy=TRACE
```
Logs start with the `zMul` prefix.

## Configuration (Logging)

You can configure logging levels in `Gothic.ini`:

```ini
[ZMULTILOGUE]
; Logger levels: NONE, FATAL, ERROR, WARN, INFO, DEBUG, TRACE
LoggerLevelUnion=TRACE
LoggerLevelZSpy=TRACE
```
Logs start with the `zMul` prefix.

## Usage

zMultilogue allows you to start a multi-NPC conversation from a standard dialogue.

### Basic Example

To start a multilogue, you typically use a standard `C_INFO` instance that calls a specific start function.

For detailed scripting documentation, tutorials, and examples, please visit the [official zMultilogue website](https://silver-ore-team.github.io/zMultilogue/).

## External Links

- [Official Website & Documentation](https://silver-ore-team.github.io/zMultilogue/)
- [GitHub Repository](https://github.com/Silver-Ore-Team/zMultilogue)
