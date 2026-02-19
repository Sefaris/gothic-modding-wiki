---
sidebar_position: 2
title: "GothicVDFS"
description: "Klasyczne narzędzie do przeglądania, tworzenia i wypakowywania woluminów VDF."
---

# GothicVDFS

**GothicVDFS** to najpopularniejsze narzędzie do pracy z woluminami VDFS (archiwami `.vdf` i `.mod`). Stworzone przez **NicoDE**, pozwala na podgląd, wypakowywanie oraz tworzenie tych archiwów.

## Obszary robocze

Narzędzie jest podzielone na dwa główne obszary robocze: **Przeglądarkę (Viewer)** i **Konstruktora (Builder)**.

### Przeglądarka (Viewer)

**Przeglądarka** pozwala na inspekcję i wypakowywanie istniejących archiwów VDF.

-   **Nazwa pliku (Filename)**: Wybierz ścieżkę do pliku `.vdf` lub `.mod`, który chcesz otworzyć.
-   **Ścieżka główna (Root Path)**: Wybierz katalog, do którego pliki zostaną wypakowane.
-   **Informacje o zawartości**: Wyświetla komentarz pliku i sygnaturę czasową.
    -   *Uwaga*: Sygnatura czasowa określa kolejność ładowania woluminów w grze (pliki z nowszą datą nadpisują starsze).

**Opcje wypakowywania**:
1.  **Wypakuj wolumin (Extract Volume)**: Wypakowuje całą zawartość archiwum do Ścieżki głównej.
2.  **Wypakuj katalog (Extract Directory)**: Wypakowuje tylko aktualnie wybrany folder.
3.  **Wypakuj wybrane (Extract Selected)**: Wypakowuje tylko aktualnie wybrane pliki.

### Konstruktor (Builder)

**Konstruktor** służy do tworzenia nowych archiwów VDF.

-   **Nazwa pliku (Filename)**: Określ ścieżkę i nazwę dla nowego pliku `.vdf` lub `.mod`.
-   **Ścieżka główna (Root Path)**: Katalog bazowy dla plików, które chcesz spakować (zazwyczaj twój katalog Gothic).
-   **Listy plików**:
    -   **Szukaj (Search for)**: Maski plików do uwzględnienia (np. `_WORK/Data/Anims/_compiled/*`).
    -   **Wyklucz (Exclude)**: Maski plików do wykluczenia z archiwum.
    -   **Dołącz (Include)**: Jawna lista plików do zawsze uwzględnienia.

Na dole możesz kliknąć **Zbuduj wolumin (Build Volume)** bezpośrednio lub **Zapisz skrypt (Save Script)** (`.vm`) do późniejszego użycia lub automatyzacji.

## Interfejs linii poleceń (CLI)

GothicVDFS zawiera interfejs wiersza poleceń przydatny do automatyzacji i skryptowania.

### Zbuduj VDF ze skryptu

```bash
GothicVDFS.exe /B script.vm
```

### Wypakuj VDF do katalogu

```bash
GothicVDFS.exe /X MySuperMod.mod ./extract_here
```

## Opis skryptów

Skrypty konfiguracyjne VDFS (`.vm`) to proste pliki tekstowe używane do definiowania reguł dla konstruktora.

### Struktura

Skrypt jest podzielony na sekcje oznaczone nagłówkami w nawiasach kwadratowych. Musi zawierać przynajmniej `[BEGINVDF]` i `[ENDVDF]`.

#### `[BEGINVDF]`
Oznacza początek skryptu i zawiera właściwości:
-   `Comment`: Komentarz tekstowy dla woluminu.
-   `BaseDir`: Ścieżka główna plików lokalnych (względem katalogu roboczego).
-   `VDFName`: Nazwa pliku wyjściowego VDF.

#### `[FILES]`
Lista masek plików do uwzględnienia w archiwum (względem `BaseDir`).

#### `[EXCLUDE]`
Lista masek plików do wykluczenia z archiwum.

#### `[INCLUDE]`
Lista konkretnych plików do zawsze uwzględnienia.

#### `[ENDVDF]`
Oznacza koniec skryptu.

### Przykładowy skrypt

```ini
[BEGINVDF]
Comment=Moje Wlasne Archiwum Moda
BaseDir=.
VDFName=MySuperMod.mod
[FILES]
_work/Data/Anims/_compiled/*
_work/Data/Meshes/_compiled/*
_work/Data/Scripts/_compiled/*
[EXCLUDE]
*.wav
[INCLUDE]
this_is_fine.wav
[ENDVDF]
```
