---
sidebar_position: 3
title: "Instalacja dodatków do Visual Studio Code"
description: "Niezbędne rozszerzenia VS Code do pracy ze skryptami Gothic."
---

# Instalacja dodatków do Visual Studio Code

Do pracy ze skryptami Daedalus potrzebne są dwa rozszerzenia VS Code:

| Rozszerzenie                 | Autor      | Opis                                                                    |
| ---------------------------- | ---------- | ----------------------------------------------------------------------- |
| **Daedalus**                 | Szymon Żak | Kolorowanie składni (syntax highlighting)                               |
| **Daedalus Language Server** | kirides    | Autouzupełnianie, Go to Definition, Find References, diagnostyka błędów |

Pierwsze z nich instaluje się bezpośrednio z Marketplace w VS Code. Drugie wymaga ręcznej instalacji z pliku `.vsix`.

---

## 1. Daedalus — kolorowanie składni

To rozszerzenie dodaje rozpoznawanie języka Daedalus przez VS Code — pliki `.d` i `.src` będą miały kolorowanie składni.

### Instalacja z Marketplace

1. Otwórz VS Code
2. Kliknij ikonę **Rozszerzenia** na pasku bocznym (lub naciśnij `Ctrl + Shift + X`)
3. W polu wyszukiwania wpisz **Daedalus**
4. Znajdź rozszerzenie **Daedalus** od autora **Szymon Żak** (`szymonzak.daedalus`)
5. Kliknij **Zainstaluj**

Po instalacji VS Code automatycznie rozpozna pliki `.d` jako język Daedalus.

---

## 2. Daedalus Language Server — IntelliSense dla Daedalus

To rozszerzenie to prawdziwy game-changer. Dodaje **Language Server** — serwer językowy, który analizuje skrypty Gothic i zapewnia:

- **Autouzupełnianie** (IntelliSense) — podpowiedzi instancji, funkcji, zmiennych podczas pisania
- **Go to Definition** (`F12`) — przejście do definicji funkcji, klasy, instancji
- **Find All References** (`Shift + F12`) — znajdowanie wszystkich użyć symbolu
- **Semantic Highlighting** — kolorowanie kontekstowe (rozróżnianie stałych, parametrów, zmiennych lokalnych, globali)
- **CodeLens** — liczba implementacji i referencji nad funkcjami
- **Inlay Hints** — podpisy parametrów w wywołaniach funkcji
- **Diagnostyka** — wykrywanie błędów w kodzie na żywo

### Instalacja z pliku .vsix

To rozszerzenie nie jest dostępne w Marketplace VS Code — trzeba je zainstalować ręcznie z pliku `.vsix`.

#### Krok 1: Pobierz plik .vsix

1. Wejdź na stronę [GitHub Releases — kirides/vscode-daedalus](https://github.com/kirides/vscode-daedalus/releases)
2. Przy najnowszej wersji (np. **v0.0.26**) znajdź sekcję **Assets**
3. Pobierz plik `vscode-daedalus-X.X.XX.vsix` (np. `vscode-daedalus-0.0.26.vsix`)

#### Krok 2: Zainstaluj w VS Code

Są dwa sposoby:

**Sposób A — przez interfejs VS Code:**

1. Otwórz VS Code
2. Kliknij ikonę **Rozszerzenia** (`Ctrl + Shift + X`)
3. Kliknij `...` (trzy kropki) w prawym górnym rogu panelu rozszerzeń
4. Wybierz **Zainstaluj z pliku VSIX...**
5. Wskaż pobrany plik `.vsix`
6. Kliknij **Zainstaluj** i poczekaj na zakończenie
7. Gdy pojawi się monit, kliknij **Załaduj ponownie** (Reload)

**Sposób B — przez terminal:**

```bash
code --install-extension ścieżka/do/vscode-daedalus-0.0.26.vsix
```

:::tip
Po każdej aktualizacji rozszerzenia musisz pobrać nowy plik `.vsix` z GitHub i powtórzyć proces instalacji.
:::

### Konfiguracja Language Server

Po zainstalowaniu obu rozszerzeń, Language Server automatycznie szuka pliku `Gothic.src` w otwartym folderze. Jeśli otworzyłeś folder `Scripts/` jako workspace — wszystko powinno działać od razu.

Opcjonalne ustawienia w `settings.json`:

```json
{
  "daedalusLanguageServer.fileEncoding": "Windows-1250",
  "daedalusLanguageServer.srcFileEncoding": "Windows-1250"
}
```

:::info
Jeśli skrypty korzystają z polskich znaków (co jest normalne), ustaw kodowanie na `Windows-1250`, aby Language Server prawidłowo parsował pliki.
:::

---

## Weryfikacja

Po zainstalowaniu obu rozszerzeń i otwarciu folderu ze skryptami:

1. **Kolorowanie składni** — otwórz dowolny plik `.d`, kod powinien być kolorowy
2. **Autouzupełnianie** — zacznij pisać nazwę funkcji lub instancji, powinny pojawić się podpowiedzi
3. **Go to Definition** — przytrzymaj `Ctrl` i kliknij na nazwę instancji/funkcji — VS Code powinien przejść do jej definicji
4. **Diagnostyka** — jeśli w kodzie jest błąd (np. brakujący średnik), VS Code podkreśli go na czerwono

:::warning
Pierwsze załadowanie dużego projektu (np. pełnych skryptów Gothic II z modyfikacją) może zająć kilka sekund — Language Server musi sparsować wszystkie pliki wskazane w `Gothic.src`.
:::
