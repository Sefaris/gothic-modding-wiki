---
sidebar_position: 1
title: Tekstury
description: Ogólne informacje o teksturach w ZenGin.
---

# Tekstury

Tekstury to obrazy wyświetlane na modelach 3D oraz w interfejsie 2D gry. ZenGin używa własnego formatu tekstur `.TEX` (zCTexture), który jest kontenerem na dane tekstury w jednym z dostępnych formatów (np. DXT1, DXT3, DXT5 itp.).

## Podstawy

Wszystkie utworzone tekstury muszą znajdować się w katalogu `_WORK\DATA\TEXTURES\`. Skompilowane pliki `.TEX` są zapisywane w podkatalogu `_COMPILED\`.

- **Wymiary**: Tekstury muszą mieć wymiary będące potęgą liczby 2 (np. 64, 128, 256, 512, 1024, 2048, 4096).
- **Proporcje**: Preferowane są tekstury kwadratowe dla łatwiejszego generowania mipmap.
- **Maksymalna rozdzielczość**: Zaleca się nie używać tekstur większych niż 4096x4096px.
- **Nazewnictwo**: Unikaj przyrostków takich jak `_V0`, `_A1`, ponieważ są one zarezerwowane dla [multitekstur](./multitextures.md).

:::tip
Narzędzia do pracy z teksturami (konwersja, podgląd) zostały opisane w dziale [zTEXiPy](/pl/docs/tools/ztexipy).
:::



## Mipmapy

[Mipmapy](https://pl.wikipedia.org/wiki/Mipmapping) to wstępnie wygenerowane wersje tekstur o różnych poziomach szczegółowości. Służą do poprawy wydajności renderowania i redukcji artefaktów (migotania) na obiektach znajdujących się daleko od kamery.

Gdy silnik konwertuje teksturę, automatycznie generuje dla niej mipmapy.

## Kompilacja przez silnik

Domyślnie pliki `.tga` znajdujące się w katalogu tekstur są automatycznie konwertowane na pliki `.TEX` przez silnik, gdy:
1. Pojawią się w grze po raz pierwszy.
2. Gra zostanie uruchomiona z parametrem `-convertall`.

### Głębia kolorów

Tekstury są domyślnie kompilowane z głębią kolorów odpowiadającą zazwyczaj kompresji DXT. Aby wymusić na silniku konwersję z konkretną jakością, można użyć nazw katalogów lub przyrostków w nazwie pliku:

- `_16BIT`: Wymusza kompilację 16-bitową.
- `_32BIT`: Wymusza kompilację 32-bitową.

Przykład: `_WORK\DATA\TEXTURES\SKY\NOMIP_16BIT\CLOUDS.TGA`

### Wyłączanie mipmap (NOMIP)

Jeśli ścieżka tekstury zawiera katalog `nomip` (wielkość liter nie ma znaczenia), mipmapy nie zostaną wygenerowane.

- **Zastosowanie**: Elementy interfejsu (UI), tekstury nieba lub bardzo małe tekstury, gdzie mipmapy powodują rozmycie lub są zbędne.
- **Przykład**: `_WORK\DATA\TEXTURES\EFFECTS\NOMIP\LIGHTNING.TGA`
