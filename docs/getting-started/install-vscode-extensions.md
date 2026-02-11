---
sidebar_position: 3
title: "Installing VS Code Extensions"
description: "Essential VS Code extensions for working with Gothic scripts."
---

# Installing VS Code Extensions

To work with Daedalus scripts, you need two VS Code extensions:

| Extension                    | Author     | Description                                                          |
| ---------------------------- | ---------- | -------------------------------------------------------------------- |
| **Daedalus**                 | Szymon Żak | Syntax highlighting                                                  |
| **Daedalus Language Server** | kirides    | Autocompletion, Go to Definition, Find References, error diagnostics |

The first one is installed directly from the VS Code Marketplace. The second requires manual installation from a `.vsix` file.

---

## 1. Daedalus - Syntax Highlighting

This extension adds Daedalus language recognition to VS Code - `.d` and `.src` files will have syntax highlighting.

### Installation from Marketplace

1. Open VS Code
2. Click the **Extensions** icon in the sidebar (or press `Ctrl + Shift + X`)
3. In the search field, type **Daedalus**
4. Find the **Daedalus** extension by **Szymon Żak** (`szymonzak.daedalus`)
5. Click **Install**

After installation, VS Code will automatically recognize `.d` files as Daedalus language.

---

## 2. Daedalus Language Server - IntelliSense for Daedalus

This extension is the real game-changer. It adds a **Language Server** that analyzes Gothic scripts and provides:

- **Autocompletion** (IntelliSense) - suggestions for instances, functions, variables while typing
- **Go to Definition** (`F12`) - jump to function, class, or instance definition
- **Find All References** (`Shift + F12`) - find all usages of a symbol
- **Semantic Highlighting** - contextual coloring (distinguishing constants, parameters, local variables, globals)
- **CodeLens** - implementation and reference counts above functions
- **Inlay Hints** - parameter names in function calls
- **Diagnostics** - live error detection in code

### Installation from .vsix File

This extension is not available in the VS Code Marketplace - it needs to be installed manually from a `.vsix` file.

#### Step 1: Download the .vsix File

1. Go to [GitHub Releases - kirides/vscode-daedalus](https://github.com/kirides/vscode-daedalus/releases)
2. At the latest version (e.g., **v0.0.26**), find the **Assets** section
3. Download the `vscode-daedalus-X.X.XX.vsix` file (e.g., `vscode-daedalus-0.0.26.vsix`)

#### Step 2: Install in VS Code

There are two ways:

**Method A - via VS Code interface:**

1. Open VS Code
2. Click the **Extensions** icon (`Ctrl + Shift + X`)
3. Click `...` (three dots) in the top right corner of the extensions panel
4. Select **Install from VSIX...**
5. Point to the downloaded `.vsix` file
6. Click **Install** and wait for completion
7. When prompted, click **Reload**

**Method B - via terminal:**

```bash
code --install-extension path/to/vscode-daedalus-0.0.26.vsix
```

:::tip
After each extension update, you need to download the new `.vsix` file from GitHub and repeat the installation process.
:::

### Language Server Configuration

After installing both extensions, the Language Server automatically looks for a `Gothic.src` file in the opened folder. If you opened the `Scripts/` folder as a workspace - everything should work right away.

Optional settings in `settings.json`:

```json
{
  "daedalusLanguageServer.fileEncoding": "Windows-1250",
  "daedalusLanguageServer.srcFileEncoding": "Windows-1250"
}
```

:::info
If scripts use special characters (which is common in Polish/Czech/German Gothic mods), set the encoding to `Windows-1250` so the Language Server correctly parses files.
:::

---

## Verification

After installing both extensions and opening the scripts folder:

1. **Syntax highlighting** - open any `.d` file, the code should be colorized
2. **Autocompletion** - start typing a function or instance name, suggestions should appear
3. **Go to Definition** - hold `Ctrl` and click on an instance/function name - VS Code should jump to its definition
4. **Diagnostics** - if there's an error in the code (e.g., missing semicolon), VS Code will underline it in red

:::warning
First loading of a large project (e.g., full Gothic II scripts with a mod) may take a few seconds - the Language Server needs to parse all files listed in `Gothic.src`.
:::
