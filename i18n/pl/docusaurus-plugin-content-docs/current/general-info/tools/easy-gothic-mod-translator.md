---
sidebar_position: 2
title: "Easy Gothic Mod Translator"
description: "Narzędzie do automatycznego i ręcznego tłumaczenia modów do Gothic I i Gothic II."
---

# Easy Gothic Mod Translator

**Easy Gothic Mod Translator** (EGMT) to narzędzie stworzone przez **Lord Sargona**, które umożliwia tłumaczenie modów do **Gothic I** i **Gothic II** na inne języki. Wspiera zarówno **automatyczne tłumaczenie** (przez Google Translate), jak i **ręczne tłumaczenie** za pomocą baz danych CSV.

:::tip
EGMT to najszybszy sposób na sprawienie, by obcojęzyczny mod do Gothica stał się grywalny — automatyczne tłumaczenie można wygenerować w zaledwie kilka minut.
:::

## Jak to działa

EGMT odczytuje skompilowane pliki skryptów (`gothic.dat`, `menu.dat`, `ou.bin`) z archiwum `.mod` (VDF) moda. Wykorzystuje zaawansowane heurystyki, aby:

- **Zdekompilować** pliki `.dat` i zidentyfikować tłumaczalne ciągi tekstowe (linie dialogowe, nazwy przedmiotów, dziennik zadań, etykiety menu itp.).
- **Odfiltrować** nieprzetłumaczalne wzorce — nazwy waypointów (`WP_XARDAS_01`), wewnętrzne identyfikatory skryptów (`FARM1`), nazwy funkcji i inne ciągi specyficzne dla silnika.
- **Wygenerować plik łatki** `.mod`, który nadpisuje jedynie przetłumaczony tekst, nie ingerując w oryginalny mod.

Narzędzie analizuje wywołania metod, pozycje parametrów i inne cechy kodu, aby precyzyjnie odróżnić tekst do tłumaczenia od wewnętrznych identyfikatorów — jest więc znacznie dokładniejsze niż proste wyciąganie tekstu.

## Funkcje

- Automatyczne tłumaczenie przez **Google Translate**
- Ręczne tłumaczenie za pomocą **eksportu/importu CSV**
- **Bazy CSV** z profesjonalnie przetłumaczonymi standardowymi tekstami gry dla lepszej jakości
- Tworzenie lekkiego **pliku łatki .mod** — nie trzeba modyfikować oryginalnego moda
- Obsługa modów do **Gothic I** i **Gothic II**
- Praca z plikami `gothic.dat`, `menu.dat` i `ou.bin`

## Automatyczne tłumaczenie

### Instrukcja krok po kroku

1. **Pobierz i uruchom** narzędzie (zobacz [Linki](#linki) poniżej).
2. **Wybierz języki** — wskaż język źródłowy moda i język docelowy.
3. **Załaduj bazę CSV** _(opcjonalnie, ale zalecane)_ — jeśli istnieje baza danych dla twojej pary językowej, zaimportuj ją, aby uzyskać lepszą jakość tłumaczenia standardowych terminów gry.
4. **Załaduj plik moda** — kliknij "Load Mod-file", przejdź do `Gothic II/Data/modvdf` i wybierz plik `.mod` moda zawierający skrypty.
5. **Uruchom Google Translate** — poczekaj na zakończenie tłumaczenia, a następnie zapisz bazę danych jako plik `.csv` (np. `nazwamod_pl.csv`).
6. **Wygeneruj łatkę** — kliknij "Translate Mod", zaznacz "patch only", zwiększ datę archiwum o 1 dzień i zapisz plik `.mod` w `Gothic II/Data/modvdf`.
7. **Zarejestruj łatkę** — otwórz plik `.ini` moda w `Gothic II/System` i dopisz nazwę pliku łatki:

```ini
# Przed:
VDF=MOD_XY.mod  MOD_XY_Speech.mod  MOD_XY_Font.mod

# Po:
VDF=MOD_XY.mod  MOD_XY_Speech.mod  MOD_XY_Font.mod  MOD_XY_patch_pl.mod
```

:::warning
Jeśli przetłumaczysz zbyt wiele modów w krótkim czasie, Google może tymczasowo zablokować twój adres IP. W takim przypadku zmień IP lub poczekaj kilka godzin.
:::

## Ręczne tłumaczenie

Jeśli wolisz tłumaczyć ręcznie (lub użyć innego serwisu tłumaczeniowego, np. DeepL):

1. Na etapie Google Translate naciśnij **Skip**.
2. Zaznacz **MT** i naciśnij **Export Database**, aby zapisać plik CSV.
3. Otwórz CSV w edytorze arkuszy (np. [Modern CSV](https://www.moderncsv.com/)).
4. Edytuj ostatnią kolumnę — zastąp nieprzetłumaczone linie swoimi tłumaczeniami.
5. Zapisz CSV i zaimportuj go ponownie w EGMT, aby wygenerować plik łatki `.mod`.

:::info
Nie zostawiaj pustych pól w CSV — puste pola spowodują, że narzędzie użyje oryginalnego (nieprzetłumaczonego) tekstu.
:::

## Bazy CSV

Bazy CSV zawierają profesjonalnie przetłumaczone standardowe teksty gry (nazwy przedmiotów, domyślne dialogi, typowe frazy). Ich użycie zapewnia spójność terminów z podstawowej wersji gry.

Dostępne bazy danych (udostępnione przez społeczność):

**Gothic 1 → angielski:**

- niemiecki → angielski
- polski → angielski
- rosyjski (Snowball) → angielski

**Gothic 2 → angielski:**

- niemiecki → angielski
- polski → angielski

**Gothic 2 → niemiecki:**

- rosyjski → niemiecki
- polski → niemiecki

Bazy CSV i linki do pobrania są dostępne w [wątku na forum World of Players](https://forum.worldofplayers.de/forum/threads/1560238-Easy-Gothic-Mod-Translator-%28-how-to-use-it%29).

## Linki

- [Wątek na World of Players (przewodnik EN)](https://forum.worldofplayers.de/forum/threads/1560238-Easy-Gothic-Mod-Translator-%28-how-to-use-it%29)
- [Strona zasobu na RPG Russia](https://rpgrussia.com/resources/easy-gothic-mod-translator.4116/)
