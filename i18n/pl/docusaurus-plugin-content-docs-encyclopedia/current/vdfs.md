---
sidebar_position: 1
---

# VDFS / VDF / MOD

**Virtual Disk File System (VDFS)** to system plików używany przez silnik ZenGin (napędzający Gothic 1/2) do dystrybucji i przechowywania zasobów gry. Pliki korzystające z tego systemu mają zazwyczaj rozszerzenie `.vdf` lub `.mod`.

## Przegląd

VDFS to format kontenera dla struktury plików i katalogów, koncepcyjnie podobny do archiwum `.tar` lub `.zip`, ale bez kompresji (w standardowej formie) i zoptymalizowany pod kątem użycia przez silnik. Pozwala on silnikowi na dostęp do tysięcy pojedynczych zasobów (tekstur, modeli, skryptów) z jednego dużego pliku, co jest bardziej wydajne dla systemu operacyjnego i gry.

### VDF vs MOD

Chociaż oba formaty używają tej samej wewnętrznej struktury, są one traktowane inaczej przez silnik:

*   **VDF (`.vdf`)**:
    *   Przechowywane w katalogu `Data/`.
    *   Ładowane automatycznie przez silnik przy starcie gry.
    *   Kolejność ładowania jest określana przez **sygnaturę czasową** wewnątrz pliku (pliki z nowszą datą nadpisują starsze).
    *   Używane dla głównych zasobów gry.

*   **MOD (`.mod`)**:
    *   Przechowywane w katalogu `Data/ModVDF/`.
    *   Ładowane tylko, jeśli określono to w pliku konfiguracyjnym `.ini` moda.
    *   Używane do modyfikacji, aby oddzielić ich zasoby od podstawowej wersji gry.

## Opis formatu

Format VDF składa się z **Nagłówka** (Header), **Katalogu** (Catalog) i sekcji **Danych** (Data).

:::info
Szczegółową specyfikację techniczną znajdziesz w [dokumentacji ZenKit](https://zk.gothickit.dev/engine/formats/vdf/).
:::

### Nagłówek (Header)

Nagłówek opisuje globalne właściwości pliku VDF. Kluczowe pola to:

*   **Sygnatura (Signature)**: Identyfikuje wersję gry (`PSVDSC_V2.00\r\n\r\n` dla Gothic 1, `PSVDSC_V2.00\n\r\n\r` dla Gothic 2).
*   **Sygnatura czasowa (Timestamp)**: Data w formacie DOS identyfikująca moment utworzenia archiwum. Jest kluczowa dla ustalenia kolejności ładowania (nowsze nadpisują starsze).
*   **Liczba wpisów/plików (Entry/File Counts)**: Ilość wpisów katalogu i plików w archiwum.
*   **Offset katalogu (Catalog Offset)**: Miejsce, w którym zaczyna się katalog plików (prawie zawsze jest to bajt `296`).
*   **Wersja (Version)**: Wersja formatu (zazwyczaj `0x50` dla standardowego VDFS).

### Katalog (Catalog)

Katalog to hierarchiczna lista wszystkich plików i folderów zawartych w VDF. Każdy wpis zawiera:

*   **Nazwę (Name)**: Nazwa pliku (do 64 znaków).
*   **Offset**: Pozycja danych pliku w archiwum.
*   **Rozmiar (Size)**: Rozmiar pliku w bajtach.
*   **Typ (Type)**: Określa, czy wpis jest plikiem, czy katalogiem.
*   **Atrybuty (Attributes)**: Flagi metadanych.

### Dane (Data)

Rzeczywiste, surowe dane plików zawartych w archiwum, przechowywane w jednym ciągu, w miejscach wskazanych przez offsety z katalogu.

## Narzędzia

Do przeglądania i edycji plików VDF/MOD służą różne narzędzia stworzone przez społeczność:

*   [**GothicVDFS**](/pl/docs/tools/gothic-vdfs): Klasyczne, najpopularniejsze narzędzie. Pozwala na podgląd, wypakowywanie i tworzenie woluminów.
*   [**VDFS Tool**](/pl/docs/tools/vdfs-tool): Nowsze narzędzie wspierające funkcje pakietu Union oraz kompresję.
