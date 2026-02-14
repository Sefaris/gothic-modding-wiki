# Gothic Modding Wiki

A bilingual (🇬🇧 English / 🇵🇱 Polish) documentation site for **Gothic I** and **Gothic II** modding, built with [Docusaurus 3](https://docusaurus.io/).

## 📖 Contents

| Section               | Description                                                      |
| --------------------- | ---------------------------------------------------------------- |
| **Getting Started**   | Downloading the game, installing VS Code and required extensions |
| **Guides - Daedalus** | Script structure, creating NPCs, items, quests, effects          |
| **Guides - Union**    | Setting up the environment, creating C++ plugins                 |
| **Encyclopedia**      | NPC routines, animations - a complete reference based on G2MDK   |
| **General Info**      | Overview of Daedalus, Ikarus, and Union                          |

## 🛠️ Requirements

- [Node.js](https://nodejs.org/) v20+
- [npm](https://www.npmjs.com/) (bundled with Node.js)

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Development server (English - default)
npm run start

# Development server (Polish)
npm run start:pl
```

The server will start at `http://localhost:3000`. File changes are reflected live.

## 📦 Build

```bash
npm run build
```

Generates static files into `build/` (EN) and `build/pl/` (PL). You can test the build locally:

```bash
npm run serve
```

## 📁 Project Structure

```
├── docs/                  # English documentation (default)
│   ├── getting-started/   #   Getting started guides
│   ├── general-info/      #   General info (Daedalus, Ikarus)
│   ├── modding-basics-daedalus/  #   Daedalus tutorials
│   └── modding-basics-union/     #   Union tutorials
├── encyclopedia/          # English encyclopedia (separate docs instance)
├── i18n/pl/               # Polish translations
│   ├── docusaurus-plugin-content-docs/current/
│   └── docusaurus-plugin-content-docs-encyclopedia/current/
├── src/                   # React components, homepage, CSS
├── static/img/            # Images and static assets
├── docusaurus.config.ts   # Main Docusaurus configuration
├── sidebars.ts            # Documentation sidebars
└── sidebarsEncyclopedia.ts # Encyclopedia sidebar
```

## 🌍 Localization (i18n)

| Language             | Source Path              | URL    |
| -------------------- | ------------------------ | ------ |
| 🇬🇧 English (default) | `docs/`, `encyclopedia/` | `/`    |
| 🇵🇱 Polish            | `i18n/pl/...`            | `/pl/` |

Every new document must exist in both language versions. File and folder names should always be in English.

## 🤝 Contributing

1. Fork the repository
2. Create a branch: `git checkout -b feature/feature-name`
3. Make your changes and commit
4. Open a pull request

### Conventions

- Use ` ```daedalus ` for Daedalus code blocks
- Use ` ```cpp ` for C++ (Union) code blocks
- Use Docusaurus admonitions: `:::tip`, `:::warning`, `:::info`, `:::danger`
- Every `.md` file needs front matter with `sidebar_position`, `title`, `description`

## 📜 License

This project is licensed under the [MIT](LICENSE) license.

---

<div align="center">
  Made with ❤️ for the Gothic Community
</div>
