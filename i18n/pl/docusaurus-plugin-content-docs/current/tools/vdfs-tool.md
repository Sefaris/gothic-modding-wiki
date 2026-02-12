---
sidebar_position: 4
title: "VDFS Tool"
description: "Nowoczesne narzędzie do tworzenia, modyfikowania i kompresji wolumenów VDF ze wsparciem dla Union."
---

# VDFS Tool

**VDFS Tool** to nowoczesne narzędzie do pracy z wolumenami Gothic VDFS (pliki `.vdf` i `.mod`). Stworzone przez **Gratta**, wspiera zaawansowane funkcje wprowadzone przez **Union**, takie jak kompresja ZIP i rozszerzone znaczniki czasu, obok standardowych operacji na wolumenach.

## Możliwości

- **Odczyt, tworzenie i modyfikacja** wolumenów VDF
- **Kompresja wolumenów** (algorytm ZIP)
- **Optymalizacja wolumenów** (deduplikacja)
- **Rozszerzone znaczniki czasu** (do roku 2107)
- **Nawigacja w stylu Eksploratora** (wyszukiwanie, kopiowanie, wklejanie)
- **Przeciągnij i upuść** (Drag & Drop)
- **Bezpośrednie otwieranie plików** bez wypakowywania
- **Aktualizacja zawartości jednym kliknięciem**

## Kompresja wolumenów

Narzędzie pozwala kompresować wolumeny przy użyciu klasycznego algorytmu **zlib** (ZIP). Znacząco zmniejsza to rozmiar plików modyfikacji.

Aby gra mogła korzystać ze skompresowanych wolumenów, **musi mieć zainstalowany Union**. Union zawiera specjalny interfejs `ZippedStream` w bibliotece `vdfs32g.dll`, który umożliwia silnikowi dekompresję danych w czasie rzeczywistym bez utraty wydajności.

:::warning
Skompresowane archiwa `.mod` i `.vdf` **NIE** będą działać bez zainstalowanego pakietu [Union](../general-info/union.md). Upewnij się, że użytkownicy twojego moda mają zainstalowany Union, jeśli udostępniasz skompresowane pliki.
:::

## Optymalizacja wolumenów

Funkcja **Optymalizacji** skanuje wolumen w poszukiwaniu plików o identycznej zawartości. Jeśli zostaną znalezione duplikaty, są one łączone tak, aby odwoływały się do pojedynczego źródła danych w archiwum, co zmniejsza całkowity rozmiar pliku.

## Rozszerzone znaczniki czasu

Standardowe znaczniki czasu VDFS mają swoje ograniczenia. VDFS Tool obsługuje rozszerzony format, który pozwala na:
- Daty do roku **2107**
- **31** dni w miesiącu
- **16** miesięcy w roku
- **31** godzin w dobie / **61** minut w godzinie / **62** sekundy w minucie (przydatne do wersjonowania lub logiki wewnętrznej)

## Interfejs i obsługa

### Eksplorator plików
Interfejs naśladuje Eksplorator Windows, obsługując standardowe operacje takie jak kopiowanie, wklejanie, zmiana nazwy i wyszukiwanie plików wewnątrz wolumenu.

### Przeciągnij i upuść (Drag & Drop)
Możesz przeciągać pliki z Eksploratora Windows do VDFS Tool, aby je dodać, lub wyciągać je z narzędzia, aby je wypakować.

:::info
Aby funkcja Drag & Drop działała, VDFS Tool i Eksplorator Windows muszą działać z tymi samymi uprawnieniami. Jeśli uruchomisz VDFS Tool jako Administrator, przeciąganie z „zwykłego” okna Eksploratora może nie działać.
:::

### Bezpośrednie otwieranie plików
Możesz dwukrotnie kliknąć dowolny plik wewnątrz wolumenu, aby otworzyć go w domyślnej aplikacji, bez konieczności wcześniejszego ręcznego wypakowywania.

### Aktualizacja jednym kliknięciem
Użyj skrótu `Ctrl + U`, aby uruchomić **Aktualizację jednym kliknięciem**. Program porównuje pliki w wolumenie z ich odpowiednikami w katalogach gry. Jeśli na dysku istnieją nowsze wersje plików, wolumen zostanie automatycznie zaktualizowany o nową zawartość przy zapisie.

## Pobieranie i linki

- [**Wątek na World of Players (RU)**](https://worldofplayers.ru/threads/42314/) – Oryginalne wydanie i dyskusja.
- [**Repozytorium GitHub**](https://github.com/Gratt-5r2/gothic-fix-archive/tree/main/utilities) – Źródło aktualizacji i plików do pobrania.
