---
sidebar_position: 3
title: Obsługa tekstur 32-bitowych
description: Jak używać wysokiej jakości tekstur 32-bitowych w Gothicu.
---

# Obsługa tekstur 32-bitowych

Domyślnie ZenGin dobrze obsługuje skompresowane tekstury DXT1 i DXT3, ale często ma problemy z formatami surowymi o wysokiej jakości, co prowadzi do artefaktów wizualnych lub braku poprawnej obsługi kanału alfa w niektórych kontekstach.

Aby używać tekstur wysokiej jakości z pełnym kanałem alfa (gradienty) bez artefaktów, często wymagany jest patch.

## Patch zSurface32

**Patch zSurface32** (często zawarty w SystemPacku/Unionie lub dostępny jako osobna wtyczka) poprawia jakość tekstur poprzez dodanie poprawnej obsługi formatów:
- `RGBA8888`
- `BGRA8888`
- `ARGB8888`
- `ABGR8888`

Pozwala to na uzyskanie płynnych gradientów i wysokiej jakości elementów interfejsu (UI), które kompresja DXT mogłaby zniekształcić artefaktami (banding).

## Dlaczego warto używać tekstur 32-bitowych?

1.  **Jakość**: Brak artefaktów kompresji (bloki).
2.  **Kanał Alfa**: Płynne przejścia przezroczystości (gradienty), z którymi DXT3 radzi sobie słabo (4-bitowy alfa oznacza tylko 16 poziomów przezroczystości), a DXT5 lepiej, ale wciąż z kompresją. Surowy format 32-bitowy pozwala na 256 poziomów przezroczystości bez strat.

**Wada**: Rozmiar pliku. Tekstura 32-bitowa jest znacznie większa niż skompresowana DXT (często 4x-8x większa). Używaj ich głównie do elementów UI lub skórek/twarzy bohatera, gdzie jakość jest najważniejsza.

## Kompilacja

ZenGin domyślnie nie kompiluje łatwo tekstur do tych formatów z plików TGA bez specjalnych narzędzi.

**Zalecany proces:**
1.  Użyj **[zTEXiPy](/pl/docs/tools/ztexipy)**.
2.  Otwórz swoją teksturę.


3.  Wybierz **Save TEX as...**.
4.  Odznacz **Generate Mipmaps** (jeśli to UI).
5.  Ustaw Colorspace na **BGRA8888** (zEnum: 3).
6.  Zapisz.

:::warning Wydajność
Zaleca się używanie formatu `BGRA8888` ze względów wydajnościowych, ponieważ inne przestrzenie barw mogą wymagać dodatkowej konwersji w czasie rzeczywistym przez silnik.
:::
