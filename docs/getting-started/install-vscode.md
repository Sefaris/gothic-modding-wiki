---
sidebar_position: 2
title: "Instalacja Visual Studio Code"
description: "Jak zainstalować edytor Visual Studio Code i skonfigurować go do pracy ze skryptami Gothic."
---

# Instalacja Visual Studio Code

**Visual Studio Code** (VS Code) to darmowy, lekki edytor kodu od Microsoftu. Dzięki rozszerzeniom obsługuje język Daedalus — kolorowanie składni, autouzupełnianie i nawigację po kodzie.

:::warning
Nie mylić z **Visual Studio** (pełne IDE). Visual Studio Code to oddzielny, znacznie lżejszy program.
:::

## Pobieranie

1. Wejdź na stronę [https://code.visualstudio.com](https://code.visualstudio.com)
2. Kliknij **Download for Windows** (lub odpowiedni system)
3. Pobierz instalator (`.exe`)

## Instalacja

1. Uruchom pobrany instalator
2. Zaakceptuj licencję
3. Przy wyborze opcji dodatkowych zaznacz:
   - **Dodaj akcję "Otwórz za pomocą Code" do menu kontekstowego pliku** — pozwala otwierać pliki prawym przyciskiem myszy
   - **Dodaj akcję "Otwórz za pomocą Code" do menu kontekstowego katalogu** — pozwala otwierać foldery prawym przyciskiem
   - **Dodaj do PATH** — umożliwia otwieranie VS Code z terminala poleceniem `code`
4. Kliknij **Instaluj** i poczekaj na zakończenie

## Pierwsze uruchomienie

Po instalacji uruchom VS Code. Zobaczysz ekran powitalny z opcjami konfiguracji motywu i układu.

### Ustawienie języka polskiego (opcjonalne)

Jeśli chcesz mieć interfejs po polsku:

1. Naciśnij `Ctrl + Shift + P` aby otworzyć paletę poleceń
2. Wpisz **Configure Display Language**
3. Wybierz **Polski** lub kliknij **Install Additional Languages** i zainstaluj pakiet językowy

## Otwarcie folderu ze skryptami

Najwygodniejszy sposób pracy to otworzenie **całego folderu** ze skryptami jako workspace:

1. Kliknij **Plik → Otwórz Folder** (lub `Ctrl + K, Ctrl + O`)
2. Przejdź do katalogu ze skryptami moda, np.:
   ```
   C:\GOG Games\Gothic II Gold\_work\Data\Scripts\
   ```
3. Kliknij **Wybierz folder**

Teraz w panelu bocznym (**Explorer**, `Ctrl + Shift + E`) widzisz całą strukturę plików i możesz szybko nawigować między skryptami.

## Przydatne skróty klawiszowe

| Skrót              | Akcja                              |
| ------------------ | ---------------------------------- |
| `Ctrl + P`         | Szybkie otwieranie pliku po nazwie |
| `Ctrl + Shift + F` | Wyszukiwanie w plikach (grep)      |
| `Ctrl + G`         | Przejdź do linii                   |
| `Ctrl + D`         | Zaznacz następne wystąpienie słowa |
| `Ctrl + Shift + P` | Paleta poleceń                     |
| `Ctrl + \``        | Otwórz/zamknij terminal            |
| `F12`              | Przejdź do definicji               |
| `Shift + F12`      | Znajdź wszystkie referencje        |

## Zalecane ustawienia

Dla wygodnej pracy ze skryptami Daedalus warto dodać kilka ustawień. Naciśnij `Ctrl + ,` aby otworzyć ustawienia, potem kliknij ikonę `{}` w prawym górnym rogu (otworzy `settings.json`) i dodaj:

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
Skrypty Gothic używają kodowania **Windows-1250** (środkowoeuropejskie) — dotyczy to skryptów w języku polskim, niemieckim i angielskim. Jeśli pracujesz z rosyjską wersją gry, zmień kodowanie na **Windows-1251** (`windows1251`).
:::

## Następny krok

Po zainstalowaniu VS Code, przejdź do [instalacji dodatków](./install-vscode-extensions.md) — rozszerzeń dodających pełne wsparcie języka Daedalus.
