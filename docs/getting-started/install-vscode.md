---
sidebar_position: 2
title: "Installing Visual Studio Code"
description: "How to install Visual Studio Code and configure it for working with Gothic scripts."
---

# Installing Visual Studio Code

**Visual Studio Code** (VS Code) is a free, lightweight code editor from Microsoft. Thanks to extensions, it supports the Daedalus language - syntax highlighting, autocompletion, and code navigation.

:::warning
Don't confuse it with **Visual Studio** (full IDE). Visual Studio Code is a separate, much lighter program.
:::

## Download

1. Go to [https://code.visualstudio.com](https://code.visualstudio.com)
2. Click **Download for Windows** (or the appropriate system)
3. Download the installer (`.exe`)

## Installation

1. Run the downloaded installer
2. Accept the license
3. When selecting additional options, check:
   - **Add "Open with Code" action to file context menu** - lets you open files with right-click
   - **Add "Open with Code" action to directory context menu** - lets you open folders with right-click
   - **Add to PATH** - enables opening VS Code from terminal with the `code` command
4. Click **Install** and wait for completion

## First Launch

After installation, launch VS Code. You'll see a welcome screen with theme and layout configuration options.

## Opening the Scripts Folder

The most convenient way to work is to open the **entire scripts folder** as a workspace:

1. Click **File → Open Folder** (or `Ctrl + K, Ctrl + O`)
2. Navigate to the mod's scripts directory, e.g.:
   ```
   C:\GOG Games\Gothic II Gold\_work\Data\Scripts\
   ```
3. Click **Select Folder**

Now in the side panel (**Explorer**, `Ctrl + Shift + E`) you can see the entire file structure and quickly navigate between scripts.

## Useful Keyboard Shortcuts

| Shortcut           | Action                         |
| ------------------ | ------------------------------ |
| `Ctrl + P`         | Quick open file by name        |
| `Ctrl + Shift + F` | Search in files (grep)         |
| `Ctrl + G`         | Go to line                     |
| `Ctrl + D`         | Select next occurrence of word |
| `Ctrl + Shift + P` | Command palette                |
| `Ctrl + \``        | Open/close terminal            |
| `F12`              | Go to definition               |
| `Shift + F12`      | Find all references            |

## Recommended Settings

For comfortable work with Daedalus scripts, it's worth adding a few settings. Press `Ctrl + ,` to open settings, then click the `{}` icon in the top right corner (opens `settings.json`) and add:

```json
{
  "files.encoding": "windows1250",
  "[daedalus]": {
    "editor.tabSize": 4,
    "editor.insertSpaces": false,
    "editor.semanticHighlighting.enabled": "configuredByTheme",
    "editor.inlayHints.enabled": "offUnlessPressed"
  }
}
```

:::info
Gothic scripts use **Windows-1250** (Central European) encoding - this applies to Polish, German, and English scripts. If you're working with the Russian version of the game, change the encoding to **Windows-1251** (`windows1251`).
:::

## Next Step

After installing VS Code, proceed to [installing extensions](./install-vscode-extensions.md) - add-ons that provide full Daedalus language support.
