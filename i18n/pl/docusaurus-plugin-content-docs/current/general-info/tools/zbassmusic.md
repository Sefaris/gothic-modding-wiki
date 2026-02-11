---
sidebar_position: 4
title: "zBassMusic"
description: "Nowoczesny plugin Union zastępujący system DirectMusic w Gothicu biblioteką BASS, umożliwiając użycie formatów MP3, OGG, WAV i innych."
---

# zBassMusic

**zBassMusic** to nowoczesny system muzyczny dla gier Gothic, oparty na [bibliotece audio BASS](https://www.un4seen.com/). Zastępuje natywne odtwarzanie **DirectMusic** silnika własną implementacją, pozwalając modderom używać standardowych formatów audio zamiast przestarzałych plików `.SGT`/`.STY`/`.DLS`.

Plugin jest rozwijany przez **Silver Ore Team** (tehe) i wymaga [Uniona](../../general-info/union.md).

:::tip
zBassMusic to zalecany sposób na dodanie własnej muzyki do nowych modów - możesz używać standardowych plików `.mp3`, `.ogg` czy `.wav` bez konieczności nauki [DirectMusic Producera](./directmusic-producer.md).
:::

## Funkcje

- **Standardowe formaty audio** - odtwarzanie muzyki z plików `.mp3`, `.ogg`, `.wav`, `.flac` i innych popularnych formatów zamiast własnościowych plików `.sgt` DirectMusic.
- **Obsługa archiwów VDF/MOD** - pliki muzyczne mogą być pakowane do archiwów `.vdf`/`.mod`. Natywne pliki DirectMusic muszą być umieszczone jako luźne pliki w katalogu `Data/Music/`.
- **Płynne cross-fady** - alternatywny system harmonogramowania i przejść wspierający płynne przenikanie między motywami.
- **Skryptowalny** - udostępnia interfejs skryptowy Daedalus do kontrolowania systemu muzycznego.
- **Wsteczna kompatybilność** - oryginalna muzyka `.sgt` nadal działa. Gdy motyw odwołuje się do pliku `.sgt`, zBassMusic przekierowuje odtwarzanie do oryginalnego systemu DirectMusic.
- **Bezproblemowa zamiana** - istniejące definicje `C_MUSICTHEME` działają od razu. Wystarczy zmienić pole `file` na wskazujące na plik audio.

## Instalacja

1. Zainstaluj [Uniona](../../general-info/union.md), jeśli jeszcze go nie masz.
2. Pobierz najnowsze wydanie z [wydań zBassMusic na GitHubie](https://github.com/Silver-Ore-Team/zBassMusic/releases).
3. Umieść DLL pluginu w `<Gothic>/System/Autorun/`.

## Podstawowe użycie

Zamień pole `file` w instancjach `C_MUSICTHEME` na wskazujące na standardowy plik audio zamiast pliku `.sgt`:

```daedalus
instance OWD_Day_Std(C_MUSICTHEME_DEF)
{
    file        = "OWD_DayStd.mp3";   // było: "OWD_DayStd.sgt"
    transType   = TRANSITION_TYPE_FILL;
    transSubType = TRANSITION_SUB_TYPE_MEASURE;
    reverbMix   = -8;
    reverbTime  = 9000;
};
```

Umieść plik audio w `<Gothic>/Data/Music/` lub wewnątrz archiwum `.vdf`/`.mod`.

:::info
Pełny poradnik konfiguracji, ustawienia przejść i zaawansowane funkcje znajdziesz w oficjalnym [poradniku użytkownika zBassMusic](https://silver-ore-team.github.io/zBassMusic/user-guide/).
:::

## Porównanie z DirectMusic

| Cecha                            | DirectMusic (natywny)         | zBassMusic                            |
| -------------------------------- | ----------------------------- | ------------------------------------- |
| **Formaty audio**                | `.SGT`, `.STY`, `.DLS`        | `.mp3`, `.ogg`, `.wav`, `.flac`       |
| **Narzędzie autorskie**          | DirectMusic Producer (legacy) | Dowolny edytor audio / DAW            |
| **Obsługa archiwów VDF/MOD**     | Nie (tylko luźne pliki)       | Tak                                   |
| **Przejścia cross-fade**         | Zarządzane przez silnik       | Własne, płynne cross-fady             |
| **Dynamiczna muzyka (patterny)** | Tak (natywnie)                | Własny system harmonogramowania       |
| **Interfejs skryptowy**          | Tylko `C_MUSICTHEME`          | `C_MUSICTHEME` + rozszerzony Daedalus |
| **Wymaga Uniona**                | Nie                           | Tak                                   |

## Linki zewnętrzne

- [Dokumentacja zBassMusic](https://silver-ore-team.github.io/zBassMusic/) - Pełna oficjalna dokumentacja i poradnik użytkownika.
- [zBassMusic GitHub](https://github.com/Silver-Ore-Team/zBassMusic) - Kod źródłowy i wydania.
- [GMC - zBassMusic](https://gothic-modding-community.github.io/gmc/zengin/union/plugins/zbassmusic/) - Strona Gothic Modding Community.
- [Biblioteka BASS](https://www.un4seen.com/) - Bazowa biblioteka audio od un4seen.
