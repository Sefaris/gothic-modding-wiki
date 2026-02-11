---
sidebar_position: 2
title: "Easy Gothic Mod Translator"
description: "A tool for automatic and manual translation of Gothic I and Gothic II mods."
---

# Easy Gothic Mod Translator

**Easy Gothic Mod Translator** (EGMT) is a tool created by **Lord Sargon** that allows you to translate **Gothic I** and **Gothic II** mods into other languages. It supports both **automatic translation** (via Google Translate) and **manual translation** using CSV databases.

:::tip
EGMT is the fastest way to make a foreign-language Gothic mod playable — an automatic translation can be generated in just a few minutes.
:::

## How It Works

EGMT reads compiled script files (`gothic.dat`, `menu.dat`, `ou.bin`) from a mod's `.mod` archive (VDF). It uses advanced heuristics to:

- **Decompile** the `.dat` files and identify translatable text strings (dialogue lines, item names, quest logs, menu labels, etc.).
- **Filter out** non-translatable patterns — waypoint names (`WP_XARDAS_01`), script-internal identifiers (`FARM1`), function names, and other engine-specific strings.
- **Generate a patch** `.mod` file that overrides only the translated text, leaving the original mod untouched.

The tool analyzes method calls, parameter positions, and other code characteristics to accurately distinguish translatable text from internal identifiers, making it far more precise than a simple text extraction.

## Features

- Automatic translation via **Google Translate**
- Manual translation workflow via **CSV export/import**
- **Base CSV databases** with professionally translated standard game texts for better quality
- Creates a lightweight **patch .mod file** — no need to modify the original mod
- Supports **Gothic I** and **Gothic II** mods
- Works with `gothic.dat`, `menu.dat`, and `ou.bin`

## Automatic Translation

### Step-by-Step Guide

1. **Download and launch** the tool (see [Links](#links) below).
2. **Choose languages** — select the mod's source language and your target language.
3. **Load a base CSV** _(optional but recommended)_ — if a base database exists for your language pair, import it for better translation quality of standard game terms.
4. **Load the mod file** — click "Load Mod-file", navigate to `Gothic II/Data/modvdf`, and select the mod's `.mod` file containing the scripts.
5. **Run Google Translate** — wait for the translation to complete, then save the database as a `.csv` file (e.g., `modname_en.csv`).
6. **Generate the patch** — click "Translate Mod", check "patch only", increase the archive date by 1 day, and save the `.mod` file to `Gothic II/Data/modvdf`.
7. **Register the patch** — open the mod's `.ini` file in `Gothic II/System` and append the patch file name:

```ini
# Before:
VDF=MOD_XY.mod  MOD_XY_Speech.mod  MOD_XY_Font.mod

# After:
VDF=MOD_XY.mod  MOD_XY_Speech.mod  MOD_XY_Font.mod  MOD_XY_patch_en.mod
```

:::warning
If you translate too many mods in a short time, Google may temporarily block your IP. In that case, change your IP or wait a few hours.
:::

## Manual Translation

If you prefer to translate manually (or use a different translation service like DeepL):

1. During the Google Translate step, press **Skip**.
2. Check **MT** and press **Export Database** to save the CSV file.
3. Open the CSV in a spreadsheet editor (e.g., [Modern CSV](https://www.moderncsv.com/)).
4. Edit the last column — replace untranslated lines with your translations.
5. Save the CSV and re-import it in EGMT to generate the patch `.mod` file.

:::info
Don't leave any field empty in the CSV — empty fields will cause the tool to use the original (untranslated) text.
:::

## Base CSV Databases

Base CSVs contain professionally translated standard game texts (item names, default dialogues, common phrases). Using them ensures that base game terms remain consistent.

Available base databases (provided by the community):

**Gothic 1 → English:**

- German → English
- Polish → English
- Russian (Snowball) → English

**Gothic 2 → English:**

- German → English
- Polish → English

**Gothic 2 → German:**

- Russian → German
- Polish → German

Base CSVs and download links are available in the [World of Players forum thread](https://forum.worldofplayers.de/forum/threads/1560238-Easy-Gothic-Mod-Translator-%28-how-to-use-it%29).

## Links

- [World of Players Forum Thread (EN guide)](https://forum.worldofplayers.de/forum/threads/1560238-Easy-Gothic-Mod-Translator-%28-how-to-use-it%29)
- [RPG Russia Resource Page](https://rpgrussia.com/resources/easy-gothic-mod-translator.4116/)
