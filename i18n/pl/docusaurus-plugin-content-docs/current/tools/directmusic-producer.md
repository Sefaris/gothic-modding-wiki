---
sidebar_position: 5
title: "DirectMusic Producer"
description: "Narzędzie Microsoftu do tworzenia interaktywnej muzyki w formacie DirectMusic (SGT, STY, DLS) używanym przez silnik Gothica."
---

# DirectMusic Producer

**DirectMusic Producer** to narzędzie do tworzenia muzyki stworzone przez **Microsoft** jako część **DirectX SDK**. Jest to jedyne narzędzie umożliwiające tworzenie i edycję plików DirectMusic (`.SGT`, `.STY`, `.DLS`) wykorzystywanych przez interaktywny system muzyczny silnika Gothica.

:::warning
DirectMusic Producer to aplikacja z wczesnych lat 2000. Działa tylko na **32-bitowym Windowsie** lub w trybie kompatybilności na nowoczesnych systemach. Konfiguracja może być kłopotliwa, ale jest to jedyny sposób na tworzenie natywnych plików muzycznych Gothica.
:::

## Jak Gothic wykorzystuje DirectMusic

Silnik Gothica ZenGin używa **Microsoft DirectMusic** do odtwarzania dynamicznej, interaktywnej muzyki. Zamiast prostego streamingu plików audio, muzyka składa się z modularnych bloków, które silnik łączy i między którymi przechodzi w czasie rzeczywistym w zależności od kontekstu rozgrywki (eksploracja, walka, zagrożenie itp.).

System muzyczny jest kontrolowany przez skrypty Daedalus - klasa `C_MUSICTHEME` definiuje, który segment `.sgt` odtwarzać dla każdej strefy i sytuacji w grze:

```daedalus
instance OWD_Day_Std(C_MUSICTHEME_DEF)
{
    file        = "OWD_DayStd.sgt";
    transType   = TRANSITION_TYPE_FILL;
    transSubType = TRANSITION_SUB_TYPE_MEASURE;
    reverbMix   = -8;
    reverbTime  = 9000;
};
```

:::info
Pliki muzyczne **nie mogą** być pakowane do archiwów `.vdf` ani `.mod`. Wszystkie pliki muzyczne muszą znajdować się bezpośrednio w katalogu `_work/Data/Music/`.
:::

## Typy plików

DirectMusic Producer operuje na trzech powiązanych ze sobą typach plików:

| Plik   | Typ                 | Opis                                                                                                                                       |
| ------ | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `.DLS` | Downloadable Sounds | Fundament systemu muzycznego. Zawiera kolekcje wirtualnych instrumentów i ich dane falowe (sample audio).                                  |
| `.STY` | Style               | Definiuje **Bandy** (konfiguracje instrumentów z `.DLS`) oraz **Patterny** (fragmenty muzyczne/frazy, które mogą być zapętlane i łączone). |
| `.SGT` | Segment             | Finalny odtwarzalny utwór. Łączy patterny ze stylów w kompletną kompozycję. To ten plik jest wskazywany w `C_MUSICTHEME.file`.             |

### Jak się ze sobą łączą

```
.DLS (instrumenty/sample)
  └── wykorzystywane przez .STY (patterny + konfiguracje bandów)
        └── wykorzystywane przez .SGT (finalny segment = odtwarzalny utwór)
              └── wskazywane przez C_MUSICTHEME.file w skryptach Daedalus
```

## Skąd pobrać DirectMusic Producer

DirectMusic Producer był dołączany do starszych wersji **DirectX SDK**. Zalecana wersja pochodzi z **DirectX SDK (February 2010)** lub wcześniejszych wydań (era DirectX 8.x / 9.x).

### Kroki instalacji

1. Pobierz **DirectX SDK (June 2010)** - to ostatnia wersja dostępna od Microsoftu.
   - [Microsoft DirectX SDK (June 2010)](https://www.microsoft.com/en-us/download/details.aspx?id=6812)
2. Zainstaluj SDK. DirectMusic Producer znajduje się w:
   ```
   <Ścieżka instalacji SDK>\Utilities\Bin\x86\DMUSProd.exe
   ```
3. Na nowoczesnym Windowsie (10/11) może być konieczne:
   - Uruchomienie `DMUSProd.exe` w **trybie kompatybilności z Windows XP SP3**.
   - Uruchomienie jako **Administrator**.
   - Zainstalowanie **DirectX 9.0c End-User Runtime**, jeśli brakuje komponentów DirectMusic.

:::tip
Niektórzy modderzy raportują lepszą kompatybilność uruchamiając DirectMusic Producer w **maszynie wirtualnej z Windows XP** (np. przy użyciu VirtualBox). Pozwala to uniknąć większości problemów z kompatybilnością na nowoczesnym Windowsie.
:::

## Podstawowy workflow

Tworzenie nowej muzyki dla Gothica obejmuje następujące kroki:

1. **Stwórz lub pozyskaj plik `.DLS`** - definiuje instrumenty (dźwięki/sample), których będzie używać Twoja muzyka. Możesz użyć domyślnego General MIDI DLS dołączonego do Windowsa lub stworzyć własne instrumenty.

2. **Stwórz plik `.STY` (Style)** - zdefiniuj Band (które instrumenty z DLS wykorzystać i jak) oraz skomponuj Patterny (frazy muzyczne). Każdy pattern to fragment, który może być zapętlany i nakładany na inne.

3. **Stwórz plik `.SGT` (Segment)** - ułóż patterny ze stylu w kompletny utwór. Ustaw tempo, metrum i progresję akordów.

4. **Umieść pliki** w `<Gothic>/Data/Music/` (wszystkie trzy: `.dls`, `.sty`, `.sgt`).

5. **Odwołaj się do pliku `.sgt`** w instancji `C_MUSICTHEME` w skryptach muzycznych (`System/Music/musicinst.d`).

:::tip
Dla nowych modów rozważ użycie **[zBassMusic](./zbassmusic.md)** - nowoczesnego pluginu Union, który zastępuje DirectMusic standardowymi formatami audio (`.mp3`, `.ogg`, `.wav`). Jest dużo łatwiejszy w obsłudze niż DirectMusic Producer.
:::

## Linki zewnętrzne

- [GMC - System muzyczny Gothica](https://gothic-modding-community.github.io/gmc/zengin/music/) - Dokumentacja Gothic Modding Community dotycząca systemu muzycznego.
- [Microsoft DirectX SDK (June 2010)](https://www.microsoft.com/en-us/download/details.aspx?id=6812) - Ostatnie wydanie SDK zawierające DirectMusic Producer.
