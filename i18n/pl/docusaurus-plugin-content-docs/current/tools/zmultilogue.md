---
sidebar_position: 8
title: zMultilogue
description: Wtyczka Union umożliwiająca dialogi z wieloma NPC w Gothic.
---

# zMultilogue

**zMultilogue** to wtyczka [Union](/pl/docs/general-info/union) stworzona przez [muczc1wek](https://github.com/muczc1wek) i [Silver Ore Team](https://github.com/Silver-Ore-Team), umożliwiająca tworzenie dialogów z wieloma NPC jednocześnie, bez przerywania kolejki AI. Jest to nowoczesny zamiennik starszych rozwiązań opartych na pakietach Trialogue dla Ikarus/LeGo.

## Funkcje

- **Dialogi wieloosobowe**: Twórz rozmowy z dowolną liczbą NPC.
- **Bez przerywania AI queue**: Zaprojektowane tak, aby działać bez psucia kolejki akcji AI.
- **Kontrola kamery**: Zaawansowana manipulacja kamerą podczas dialogów.
- **Interakcja z przedmiotami**: Dialogi mogą wchodzić w interakcję z przedmiotami i mobami.
- **Łatwe portowanie**: Interfejs skryptowy oparty na pakiecie LeGo Trialogue, co ułatwia przenoszenie istniejących skryptów.
- **Auto-Dystans**: Automatyczne zwiększanie dystansu wyświetlania okna dialogowego, jeśli NPC jest zbyt daleko.
- **Łatwe skryptowanie**: Oferuje zarówno manualny interfejs, jak i auto-skryptowanie dla łatwej integracji.

## Instalacja

### Wymagania
- [Union](../general-info/union.md) 1.0m lub nowszy.

### Instalacja globalna (dla developerów)
1. Pobierz najnowszy plik `zMultilogue-<wersja>.vdf` ze strony [Releases](https://github.com/Silver-Ore-Team/zMultilogue/releases).
2. Umieść plik w katalogu `<Gothic>/Data/`.

### Instalacja dla modyfikacji (dla wydania)
1. Zmień nazwę pliku na `zMultilogue.mod`.
2. Umieść go w `<Gothic>/Data/ModVDF/`.
3. Dodaj go do pliku `.ini` swojej modyfikacji:
   ```ini
   [FILES]
   VDF=YourMod.mod zMultilogue.mod
   ```

:::info
Od wersji 0.1.9, **nie musisz** ręcznie dodawać `ZS_MULTILOGUE` do swoich skryptów. Wtyczka obsługuje to automatycznie poprzez [zParserExtender](https://gothic-modding-community.github.io/gmc/zengin/scripts/extenders/zparserextender/).
:::

## Konfiguracja (Logowanie)

Możesz skonfigurować poziomy logowania w `Gothic.ini`:

```ini
[ZMULTILOGUE]
; Poziomy logowania: NONE, FATAL, ERROR, WARN, INFO, DEBUG, TRACE
LoggerLevelUnion=TRACE
LoggerLevelZSpy=TRACE
```
Logi zaczynają się od prefiksu `zMul`.

## Użycie

zMultilogue pozwala na rozpoczęcie rozmowy z wieloma NPC ze standardowego dialogu.

### Podstawowy przykład

Aby rozpocząć multilogue, zazwyczaj używasz standardowej instancji `C_INFO`, która wywołuje specyficzną funkcję startową.

Szczegółową dokumentację skryptową, tutoriale i przykłady znajdziesz na [oficjalnej stronie zMultilogue](https://silver-ore-team.github.io/zMultilogue/).

## Linki zewnętrzne

- [Oficjalna strona i dokumentacja](https://silver-ore-team.github.io/zMultilogue/)
- [Repozytorium GitHub](https://github.com/Silver-Ore-Team/zMultilogue)
