# Copilot Instructions – Gothic Modding Wiki

## Project Description

A documentation site dedicated to **Gothic** (1 & 2) game modding, built on **Docusaurus 3**. The documentation is bilingual: **English** (default) and **Polish**.

## Documentation Structure

The documentation is divided into 5 main sections:

### 1. Getting Started (`getting-started/`)

- **Downloading the Game from Steam/GOG** (`download-game.md`) – Where to download the game, system requirements, version differences.
- **Installing Visual Studio Code** (`install-vscode.md`) – Editor installation and basic configuration.
- **Installing VS Code Extensions** (`install-vscode-extensions.md`) – Essential extensions for working with Gothic scripts.

### 2. General Information (`general-info/`)

- **Daedalus** (`daedalus.md`) – Overview of the Daedalus scripting language used in Gothic.
- **Ikarus** (`ikarus.md`) – Overview of the Ikarus library extending Daedalus capabilities.
- **Union** (`union.md`) – Overview of the Union framework for creating C++ plugins for Gothic.

### 3. Modding Basics – Daedalus (`modding-basics-daedalus/`)

- **Script Structure Overview** (`script-structure.md`) – How scripts are organized in Gothic.
- **My First NPC** (`first-npc.md`) – Creating your first non-player character.
- **My First Item** (`first-item.md`) – Creating your first item.
- **My First Quest** (`first-quest.md`) – Creating your first quest.
- **My First Effect** (`first-effect.md`) – Creating your first particle effect (PFX).

### 4. Modding Basics – Union (`modding-basics-union/`)

- **Getting Started** (`getting-started.md`) – Setting up the environment for Union plugin development.
- **My First Plugin** (`first-plugin.md`) – Creating your first Union plugin.

### 5. Resources (`resources/`)

- **Resources** (`index.md`) – Links to tools, assets, and community resources.

### Encyclopedia (separate docs plugin)

- **Daily Routines (TA\_)** (`routines.md`) – Complete list of TA\_ daily routine functions.
- **Animations** (`animations.md`) – Complete list of animations, MDS overlays, state transitions.

## Localization (i18n)

- **English** (default) → files in `docs/` and `encyclopedia/`
- **Polish** → files in `i18n/pl/docusaurus-plugin-content-docs/current/` and `i18n/pl/docusaurus-plugin-content-docs-encyclopedia/current/`

Directory structure and file names **must be identical** in both language versions. Only the content (titles, descriptions, body text) differs.

### UI Translation Files (i18n/pl/)

- `i18n/pl/code.json` – Polish translations for homepage `<Translate>` components and all Docusaurus theme strings.
- `i18n/pl/docusaurus-theme-classic/navbar.json` – Polish translations for navbar labels (e.g. "Getting Started" → "Jak zacząć?").
- `i18n/pl/docusaurus-theme-classic/footer.json` – Polish translations for footer labels.
- `i18n/pl/docusaurus-plugin-content-docs/current.json` – Polish translations for sidebar category labels (e.g. "Installation" → "Instalacja").

### Content Creation Rules

1. **Always create both language variants** – Every new document must exist in `docs/` (EN) and in `i18n/pl/docusaurus-plugin-content-docs/current/` (PL). For encyclopedia docs, use `encyclopedia/` (EN) and `i18n/pl/docusaurus-plugin-content-docs-encyclopedia/current/` (PL).
2. **Use English file names** – File and folder names must always be in English (e.g. `first-npc.md`, not `pierwszy-npc.md`).
3. **Front matter** – Every `.md` document should start with front matter. The default (EN) version:
   ```yaml
   ---
   sidebar_position: 1
   title: "English Title"
   description: "English description."
   ---
   ```
   The Polish (i18n) version uses Polish title and description with the same `sidebar_position`.
4. **Categories** – Each section folder contains a `_category_.json` file:
   ```json
   {
     "label": "Category Name in English",
     "position": 1,
     "collapsed": false
   }
   ```
   Polish `_category_.json` files use Polish labels.
5. **Code examples** – Mark Daedalus code as ` ```daedalus `, C++ (Union) code as ` ```cpp `.
6. **Images** – Store in `static/img/docs/` with subdirectories matching sections.
7. **Hardcoded labels** – All default labels in `docusaurus.config.ts`, `sidebars.ts`, and `src/pages/index.tsx` are in **English**. Polish translations are provided via `i18n/pl/` JSON files.
8. **When adding new navbar/footer/sidebar labels** – Update the corresponding `i18n/pl/` JSON file with the Polish translation. The JSON key must reference the English label text (e.g. `"item.label.Getting Started"`).

## Technologies in Gothic Modding Context

### Daedalus

- Scripting language built into the Gothic engine (ZenGin).
- Files with `.d` extension, compiled to `.dat`.
- Syntax resembles C but with custom types (`instance`, `prototype`, `class`).
- Main compilation file: `Gothic.src`.

### Ikarus

- Daedalus script library by Sektenspinner.
- Provides direct engine memory access from Daedalus.
- Requires initialization in `Startup.d` → `MEM_InitAll()`.
- Often used together with the **LeGo** library.

### Union

- C++ framework for creating plugins (`.dll`) loaded by the Gothic engine.
- Requires Union SDK and Visual Studio (not VS Code).
- Plugins installed in `<Gothic>/System/Autorun/`.
- Allows engine function hooking and full access to engine classes.

## Conventions

- **Writing style**: Friendly, tutorial-like, step by step.
- **Target audience**: Beginner Gothic modders.
- **Internal links**: Use Docusaurus relative paths, e.g. `[text](../general-info/daedalus.md)`.
- **Admonitions**: Use Docusaurus admonitions (`:::tip`, `:::warning`, `:::info`, `:::danger`).
- **Sidebar**: Auto-generated from the file system (configuration in `sidebars.ts`), with category labels translated via `i18n/pl/docusaurus-plugin-content-docs/current.json`.
