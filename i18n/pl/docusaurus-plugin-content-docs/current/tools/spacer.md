---
sidebar_position: 20
title: "SpacerNET - Instalacja i konfiguracja"
description: "Ulepszony edytor Światów do moddingu Gothic - nowoczesny zamiennik oryginalnego Spacer."
---

# SpacerNET - Instalacja i konfiguracja

SpacerNET to ulepszony edytor światów do moddingu Gothic, który służy jako nowoczesny zamiennik oryginalnego narzędzia Spacer. Zachowuje pełną kompatybilność z formatem plików ZEN Gothic, jednocześnie zapewniając ulepszoną funkcjonalność i stabilność.

## Czym jest SpacerNET?

SpacerNET to wtyczka oparta na Union, która rozszerza i ulepsza oryginalny Gothic Spacer (edytor światów). Kluczowe funkcje obejmują:

- **Pełna kompatybilność** z oryginalnymi plikami ZEN Spacer
- **Zwiększona stabilność** i wydajność
- **Nowoczesne ulepszenia interfejsu**
- **Kompatybilność krzyżowa** - światy można otwierać zarówno w SpacerNET jak i oryginalnym Spacer
- **Brak zmian formatu** - twój mod nie potrzebuje Union do uruchamiania stworzonych światów

:::info Uwaga o kompatybilności
SpacerNET nie zmienia formatu światów Gothic (ZEN). Jest w pełni kompatybilny z oryginalnym Spacer, co oznacza, że pliki światów można otwierać i modyfikować w obu narzędziach.
:::

## Wymagania systemowe

- **Gothic 1** lub **Gothic 2: Noc Kruka** (zalecana wersja Steam)
- **Oddzielna kopia gry** do pracy z Spacer (zalecane, aby uniknąć mieszania z plikami rozgrywki)
- **GothicModKit** do wypakowywania zasobów
- **Union 1.0m** framework
- **PlayerKit** do obsługi Union

## Przewodnik instalacji

### Krok 1: Przygotuj instalację Gothic

1. Zainstaluj Gothic 2: Noc Kruka lub Gothic 1 (wersja Steam)
2. Rozważ użycie oddzielnej kopii do pracy z Spacer, aby uniknąć konfliktów

### Krok 2: Zainstaluj wymagane narzędzia

#### Instalacja GothicModKit

- **Dla Gothic 1**: Pobierz [G1 MDK](https://www.worldofgothic.de/dl/download_28.htm)
- **Dla Gothic 2**:
  - Pobierz [G2 MDK 2.6](https://www.worldofgothic.de/dl/download_94.htm)
  - Następnie zainstaluj [G2 MDK 2.6a](https://www.worldofgothic.de/dl/download_99.htm) na wierzch

#### Instalacja PlayerKit i Union

3. Pobierz i zainstaluj **PlayerKit**: [Bezpośredni link](https://drive.google.com/file/d/1HujF5KCAKlvqL5Qi8EtiT8GsG5WDpDf2/view)
4. Pobierz i zainstaluj **Union 1.0m**: [Bezpośredni link](https://drive.google.com/file/d/1AkU5qvxIx7zc3kdpGAwlgA-2WiGS7sU5/view)

### Krok 3: Zainstaluj SpacerNET

1. **Konfiguracja folderu system**:
   - Umieść `spacer_net.ini` i `SpacerNET.ico` w folderze `system`
   - To trzeba zrobić tylko raz

2. **Instalacja moda**:
   - Umieść `SpacerNET.mod` w folderze `Data/ModVDF`
   - Przy aktualizacji, po prostu zastąp ten plik

### Krok 4: Konfiguracja początkowa

1. **Uruchom Gothic raz** aby zainicjalizować pliki INI
2. **Uruchom SpacerNET** przez `GothicStarter.exe` i wybierz SpacerNET
3. **Włącz konsolę debugowania** (zalecane):
   - Otwórz `systempack.ini`
   - Ustaw `ShowDebugWindow = true`

## Rozwiązywanie problemów

### Menu nie reaguje

**Problem**: Po załadowaniu SpacerNET menu są nieaktywne i nic nie reaguje na kliknięcia.

**Rozwiązanie**: Ręcznie ustaw rozdzielczość ekranu w `gothic.ini` (gdy SpacerNET jest zamknięty):

```ini
zVidResFullscreenX=1920
zVidResFullscreenY=1080
```

### Czarny ekran przy starcie

**Problem**: SpacerNET pokazuje tylko czarne okno po załadowaniu.

**Rozwiązanie**: Usuń renderer DX11, który może powodować konflikt:

- Usuń `ddraw.dll` z folderu system, LUB
- Zainstaluj DX11 specjalnie dla Spacer

:::warning Ograniczenie DX11
Nie możesz kompilować światów i oświetlenia z włączonym DX11. Usuń go podczas pracy z SpacerNET.
:::

### Kamera się nie porusza

**Problem**: Prawy przycisk myszy nie porusza/obraca kamerą.

**Rozwiązanie**:

1. Uruchom grę raz (do głównego menu)
2. Wyjdź z gry, aby `systempack.ini` zapisał niezbędne ustawienia
3. Kamera powinna działać normalnie po tym

### Crashe podczas ładowania świata

**Problem**: SpacerNET crashuje podczas ładowania świata.

**Możliwe przyczyny i rozwiązania**:

- **Skrypty Lego/Ikarus**: Wyłącz "Wyłącz muzykę podczas ładowania" w ustawieniach dźwięku
- **Brakujące zasoby**: Upewnij się, że wszystkie wymagane modele i animacje są obecne
- **Konflikty wtyczek Union**: Inne wtyczki Union/Ninja mogą przeszkadzać

### Zarządzanie konfliktami wtyczek Union

Jeśli twój mod używa innych wtyczek Union, które przeszkadzają SpacerNET:

1. Otwórz `spacernet.ini` w folderze system
2. Dodaj konfliktujące wtyczki do listy wykluczeń
3. Użyj formatu określonego w INI do wykluczeń wtyczek

## Dobre praktyki

- **Regularnie twórz kopie zapasowe** swoich światów podczas pracy z SpacerNET
- **Używaj oddzielnej instalacji Gothic** do pracy z Spacer
- **Testuj światy w oryginalnym Spacer** okresowo, aby zapewnić kompatybilność
- **Minimalizuj wtyczki Union** podczas używania SpacerNET, aby uniknąć konfliktów
- **Monitoruj konsolę debugowania** w poszukiwaniu ważnych informacji i komunikatów błędów

:::tip Następne kroki
Dla szczegółowej terminologii SpacerNET i podstaw interfejsu, zobacz przewodnik [Podstawy Spacera](../modding-spacer-basics/spacer-basics.md).
:::

## Zasoby

- [Dyskusja forum SpacerNET](https://worldofplayers.ru/threads/43464/) (rosyjski)
- [Pobieranie GothicModKit](https://www.worldofgothic.de/)
- [Legacy Alt Renderer](https://github.com/SaiyansKing/Gothic-LegacyAltRenderer/releases/) (do problemów graficznych)

:::tip Potrzebujesz pomocy?
Aby uzyskać dodatkowe wsparcie i rozwiązywanie problemów, odwiedź [wątek forum SpacerNET](https://worldofplayers.ru/threads/43464/), gdzie społeczność aktywnie pomaga z instalacją i pytaniami dotyczącymi użytkowania.
:::
