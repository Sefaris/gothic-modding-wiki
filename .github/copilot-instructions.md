# Copilot Instructions – Gothic Modding Wiki

## Opis projektu

Strona dokumentacji poświęcona moddingowi gry **Gothic** (1 & 2), zbudowana na **Docusaurus 3**. Dokumentacja jest dwujęzyczna: **polski** (domyślny) i **angielski**.

## Struktura dokumentacji

Dokumentacja podzielona jest na 5 głównych sekcji:

### 1. Jak zacząć? (`getting-started/`)

- **Pobranie gry ze Steam/GOG** (`download-game.md`) – Skąd pobrać grę, wymagania, różnice między wersjami.
- **Instalacja Visual Studio Code** (`install-vscode.md`) – Instalacja edytora i podstawowa konfiguracja.
- **Instalacja dodatków do VS Code** (`install-vscode-extensions.md`) – Niezbędne rozszerzenia do pracy ze skryptami Gothic.

### 2. Informacje ogólne (`general-info/`)

- **Daedalus** (`daedalus.md`) – Opis języka skryptowego Daedalus używanego w Gothic.
- **Ikarus** (`ikarus.md`) – Opis biblioteki Ikarus rozszerzającej możliwości Daedalusa.
- **Union** (`union.md`) – Opis frameworka Union do tworzenia pluginów C++ dla Gothic.

### 3. Podstawy moddingu – Daedalus (`modding-basics-daedalus/`)

- **Opis struktury skryptów** (`script-structure.md`) – Jak zorganizowane są skrypty w Gothic.
- **Mój pierwszy NPC** (`first-npc.md`) – Tworzenie pierwszej postaci niezależnej.
- **Mój pierwszy przedmiot** (`first-item.md`) – Tworzenie pierwszego przedmiotu.
- **Moje pierwsze zadanie** (`first-quest.md`) – Tworzenie pierwszego questa.

### 4. Podstawy moddingu – Union (`modding-basics-union/`)

- **Jak zacząć?** (`getting-started.md`) – Konfiguracja środowiska do tworzenia pluginów Union.
- **Moja pierwsza wtyczka** (`first-plugin.md`) – Tworzenie pierwszego pluginu Union.

### 5. Źródła i materiały (`resources/`)

- **Źródła i materiały** (`index.md`) – Linki do zasobów, narzędzi, społeczności.

## Lokalizacja (i18n)

- **Polski** (domyślny) → pliki w `docs/`
- **Angielski** → pliki w `i18n/en/docusaurus-plugin-content-docs/current/`

Struktura katalogów i nazwy plików **muszą być identyczne** w obu wersjach językowych. Różni się jedynie treść (tytuły, opisy, zawartość).

### Zasady tworzenia treści

1. **Zawsze twórz oba warianty językowe** – Każdy nowy dokument musi istnieć zarówno w `docs/` (PL) jak i w `i18n/en/docusaurus-plugin-content-docs/current/` (EN).
2. **Zachowaj spójne nazwy plików** – Nazwy plików i folderów używaj w języku angielskim (np. `first-npc.md`, nie `pierwszy-npc.md`).
3. **Front matter** – Każdy dokument `.md` powinien zaczynać się od front matter:
   ```yaml
   ---
   sidebar_position: 1
   title: "Tytuł po polsku"
   description: "Opis po polsku"
   ---
   ```
4. **Kategorie** – Każdy folder sekcji zawiera plik `_category_.json`:
   ```json
   {
     "label": "Nazwa kategorii",
     "position": 1,
     "collapsed": false
   }
   ```
5. **Przykłady kodu** – Kod Daedalus oznaczaj jako ` ```daedalus `, kod C++ (Union) jako ` ```cpp `.
6. **Obrazy** – Przechowuj w `static/img/docs/` z podkatalogami odpowiadającymi sekcjom.

## Technologie w kontekście Gothic Modding

### Daedalus

- Język skryptowy wbudowany w silnik Gothic (ZenGin).
- Pliki z rozszerzeniem `.d`, kompilowane do `.dat`.
- Składnia przypomina C, ale z własnymi typami (`instance`, `prototype`, `class`).
- Główny plik kompilacji: `Gothic.src`.

### Ikarus

- Biblioteka skryptowa Daedalusa autorstwa Sektenspinnera.
- Pozwala na bezpośredni dostęp do pamięci silnika z poziomu Daedalusa.
- Wymaga inicjalizacji w `Startup.d` → `MEM_InitAll()`.
- Często używany razem z biblioteką **LeGo**.

### Union

- Framework C++ do tworzenia pluginów (`.dll`) ładowanych przez silnik Gothic.
- Wymaga Union SDK i Visual Studio (nie VS Code).
- Pluginy instalowane w `<Gothic>/System/Autorun/`.
- Pozwala na przechwytywanie funkcji silnika (hooking) i pełny dostęp do klas silnika.

## Konwencje

- **Styl pisania**: Przyjazny, tutorialowy, krok po kroku.
- **Grupa docelowa**: Początkujący modderzy Gothic.
- **Linki wewnętrzne**: Używaj ścieżek względnych Docusaurus, np. `[tekst](../general-info/daedalus.md)`.
- **Admonitions**: Używaj admonitions Docusaurus (`:::tip`, `:::warning`, `:::info`, `:::danger`).
- **Sidebar**: Autogenerowany z systemu plików (konfiguracja w `sidebars.ts`).
