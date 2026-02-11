---
sidebar_position: 1
title: "Jak zacząć?"
description: "Konfiguracja środowiska do tworzenia pluginów Union."
---

# Jak zacząć?

W tym przewodniku skonfigurujesz środowisko deweloperskie do tworzenia pluginów Union za pomocą Union Framework — nowoczesnego, opartego na CMake, open-source'owego zestawu narzędzi.

## Wymagania wstępne

Zanim zaczniesz, upewnij się, że masz:

- Podstawową **znajomość C++** (wskaźniki, klasy, dyrektywy preprocesora)
- Działającą instalację **Gothic** lub **Gothic II: Noc Kruka**
- Komputer z **Windowsem** (pluginy Union to biblioteki DLL Win32 x86)

---

## 1. Zainstaluj Visual Studio 2022

Pobierz [Visual Studio 2022 Community](https://visualstudio.microsoft.com/downloads/) (darmowe).

Podczas instalacji zaznacz następujące składniki:

- **Programowanie aplikacji klasycznych w C++** (workload)
- **Narzędzia CMake dla Windows w C++** (składnik indywidualny — domyślnie zawarty w powyższym workloadzie)

:::warning
Upewnij się, że narzędzia CMake są zainstalowane. Visual Studio używa ich do otwierania i budowania projektów opartych na CMake. MinGW **nie jest wspierany** — wymagany jest toolchain MSVC.
:::

## 2. Zainstaluj Git

Pobierz i zainstaluj [Git for Windows](https://git-scm.com/download/win). Domyślne ustawienia są wystarczające.

Zweryfikuj instalację, otwierając terminal i wpisując:

```
git --version
```

---

## 3. Sklonuj szablon pluginu

Otwórz terminal (wiersz poleceń, PowerShell lub Git Bash) i sklonuj szablon pluginu z submodułami:

```
git clone --recursive https://github.com/Patrix9999/union-plugin-template.git MyPlugin
```

:::danger
Flaga `--recursive` jest **wymagana**. Bez niej submoduły `union-api` i `gothic-api` w katalogu `dependencies/` nie zostaną pobrane i projekt się nie skompiluje.

Jeśli już sklonowałeś bez `--recursive`, uruchom:
```
git submodule update --init --recursive
```
:::

---

## 4. Struktura projektu

Po sklonowaniu projekt będzie mieć następującą strukturę:

```
MyPlugin/
├── CMakeLists.txt          # Główna konfiguracja budowania
├── CMakePresets.json        # Presety budowania (G1, G2A, MP, itd.)
├── src/
│   ├── DllMain.cpp          # Punkt wejścia DLL
│   ├── Plugin.cpp           # Dispatcher kompilacji wielogrowej
│   ├── Plugin.hpp           # Funkcje zdarzeń gry (tutaj piszesz swój kod)
│   └── Sources.hpp          # Includuje Plugin.hpp
├── userapi/                 # Własne pliki rozszerzeń .inl dla klas ZenGin
├── vdf/                     # Builder archiwum VDF (do dystrybucji)
├── resources/               # Zasoby informacji o wersji
└── dependencies/
    └── union/
        ├── CMakeLists.txt   # Linkuje union-api i gothic-api
        ├── union-api/       # Submoduł Git — główne API Union
        └── gothic-api/      # Submoduł Git — nagłówki ZenGin
```

Najważniejsze pliki, z którymi będziesz pracować:

| Plik               | Przeznaczenie                                                         |
| ------------------ | --------------------------------------------------------------------- |
| `Plugin.hpp`       | Funkcje zdarzeń gry i logika Twojego pluginu                         |
| `Plugin.cpp`       | Dispatcher kompilacji dla każdej wersji gry (`__G1`, `__G2A` itd.)   |
| `Sources.hpp`      | Punkt wejścia dla include'ów — dodawaj tu swoje dodatkowe pliki `.hpp`|
| `CMakeLists.txt`   | Konfiguracja budowania — nazwa projektu, wersja, standard C++         |
| `CMakePresets.json` | Presety budowania dla każdej wersji gry i typu builda                |

---

## 5. Skonfiguruj projekt

Otwórz `CMakeLists.txt` i zmień nazwę projektu — będzie to nazwa wyjściowego pliku DLL:

```cmake
project(MyPlugin                              # <-- nazwa Twojego pluginu
    DESCRIPTION "Union plugin for Gothic Games"
    VERSION ${PROJECT_VERSION}
)
```

---

## 6. Otwórz w Visual Studio

1. Kliknij prawym przyciskiem myszy folder projektu i wybierz **Otwórz w Visual Studio**, lub:
2. Otwórz Visual Studio 2022, wybierz **Plik → Otwórz → CMake...** i wskaż `CMakeLists.txt`
3. Visual Studio skonfiguruje projekt automatycznie

## 7. Wybierz konfigurację budowania

Na pasku narzędzi użyj dropdownu **Konfiguracje rozwiązania**, aby wybrać preset CMake:

| Preset          | Cel                             | Typ builda |
| --------------- | ------------------------------- | ---------- |
| `G1-Debug`      | Gothic I                        | Debug      |
| `G1-Release`    | Gothic I                        | Release    |
| `G1A-Release`   | Gothic I Addon                  | Release    |
| `G2-Release`    | Gothic II                       | Release    |
| `G2A-Debug`     | Gothic II: Noc Kruka            | Debug      |
| `G2A-Release`   | Gothic II: Noc Kruka            | Release    |
| `MP-Debug`      | Wszystkie wersje naraz          | Debug      |
| `MP-Release`    | Wszystkie wersje naraz          | Release    |

:::tip
Do developmentu używaj presetów **Debug**. Do dystrybucji — **Release**. Preset **MP** (Multi-Platform) kompiluje dla wszystkich czterech wersji gry w jednym buildzie.
:::

## 8. Zbuduj plugin

Wybierz swój plugin z dropdownu **Startup Item**, a następnie naciśnij **Ctrl+Shift+B** lub wybierz **Buduj → Buduj wszystko**.

Skompilowana biblioteka DLL zostanie umieszczona w:
```
MyPlugin/out/build/<nazwa-presetu>/MyPlugin.dll
```

### Budowanie z linii poleceń

Możesz też budować bez otwierania Visual Studio:

```
cmake . --preset G2A-Release
cmake --build --preset G2A-Release
```

---

## 9. Zainstaluj plugin

Skopiuj skompilowaną bibliotekę DLL do instalacji Gothic:

```
<Instalacja Gothic>/System/Autorun/
```

Jeśli katalog `Autorun` nie istnieje, utwórz go.

:::tip
Aby pominąć ręczne kopiowanie, możesz utworzyć **dowiązanie symboliczne** z katalogu wyjściowego do folderu `Autorun` gry. Dzięki temu DLL jest dostępny natychmiast po każdym buildzie.
:::

---

## 10. Włącz konsolę debugowania

Aby widzieć wyjście debugowe z pluginu, włącz okno debugowania Union w `SystemPack.ini` (w katalogu `System/` gry):

```ini
[CORE]
ShowDebugWindow=true
```

Otworzy to osobne okno konsoli przy starcie gry, w którym pojawią się wszystkie wiadomości `StdPrintLine()`.

:::warning
Bez tego ustawienia nie zobaczysz żadnego wyjścia konsolowego z pluginu. Upewnij się, że jest włączone podczas developmentu.
:::

---

## Generowanie archiwum VDF

Szablon może automatycznie budować archiwum `.vdf` zawierające Twój DLL i dodatkowe pliki z katalogu `vdf/`. Kontroluje to opcja `GENERATE_VDF` w `CMakeLists.txt` — jest domyślnie włączona i przydaje się do dystrybucji pluginu jako pojedyncze archiwum.

---

## Podsumowanie

- Zainstaluj **Visual Studio 2022** z C++ i narzędziami CMake oraz **Git**
- Sklonuj [szablon](https://github.com/Patrix9999/union-plugin-template) z flagą `--recursive`
- Skonfiguruj nazwę projektu w `CMakeLists.txt`
- Otwórz w Visual Studio, wybierz preset, buduj przez **Ctrl+Shift+B**
- Umieść DLL w katalogu `System/Autorun/` gry
- Włącz `ShowDebugWindow=true` w `SystemPack.ini`, aby widzieć wyjście debugowe
- Zawsze buduj dla **x86** — Gothic to aplikacja 32-bitowa
