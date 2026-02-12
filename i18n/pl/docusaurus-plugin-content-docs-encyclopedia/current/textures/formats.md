---
sidebar_position: 2
title: Formaty tekstur
description: Szczegóły techniczne formatów tekstur obsługiwanych przez ZenGin.
---

# Formaty tekstur

ZenGin używa wewnętrznego formatu kontenera `.TEX`. Wewnątrz tego kontenera dane tekstury mogą być przechowywane w różnych formatach pikseli.

## Formaty pikseli

Podczas pracy z teksturami w ZenGin zaleca się używanie standardowych formatów skompresowanych, jeśli to możliwe, ze względu na wydajność.

### Kompresja DXT

[DXT](https://en.wikipedia.org/wiki/S3_Texture_Compression) (znane również jako S3TC) to grupa algorytmów stratnej kompresji tekstur.

- **DXT1 (BC1)**:
    - **Zastosowanie**: Tekstury nieprzezroczyste lub z prostą 1-bitową przezroczystością (wycinanie).
    - **Charakterystyka**: Wysoki stopień kompresji (4 bity na piksel).
    - **Uwaga**: Najlepsze dla większości tekstur świata, takich jak ściany, podłoże itp.

- **DXT3 (BC2)**:
    - **Zastosowanie**: Tekstury wymagające jawnej przezroczystości alfa.
    - **Charakterystyka**: Dobre dla ostrych przejść alfa (8 bitów na piksel).
    - **Uwaga**: Często używane dla roślinności lub krat w Gothicu.

- **DXT5 (BC3)**:
    - **Zastosowanie**: Tekstury z płynnymi gradientami alfa.
    - **Charakterystyka**: Lepsza interpolacja alfa niż w DXT3.
    - **Uwaga**: Obsługiwane przez silnik, ale rzadziej używane w oryginalnych zasobach w porównaniu do DXT3.

### Paleta (P8)

Starszy format używający palety 256 kolorów.
- **Charakterystyka**: 8 bitów na piksel (indeks) + dane palety.
- **Uwaga**: Mniej powszechny we współczesnym moddingu, ale obsługiwany ze względów kompatybilności.

### Formaty surowe (Raw)

Nieskompresowane formaty są obsługiwane, ale zajmują znacznie więcej pamięci.

- **RGBA8888 / BGRA8888**: 32-bitowy kolor z kanałem alfa. Wysoka jakość, ale duży rozmiar.
- **RGB888 / BGR888**: 24-bitowy kolor bez kanału alfa.
- **RGB565 / ARGB1555 / ARGB4444**: 16-bitowe formaty kolorów.

:::info Obsługa 32-bit
Aby uzyskać poprawną obsługę wysokiej jakości tekstur 32-bitowych (RGBA8/BGRA8) w grze bez artefaktów wizualnych, zapoznaj się z artykułem [Obsługa Tekstur 32-bitowych](./32bit.md).
:::
