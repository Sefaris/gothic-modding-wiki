---
sidebar_position: 1
title: "KrxImpExp"
description: "Dodatek do Blendera umożliwiający import i eksport modeli 3D z Gothic I i Gothic II."
---

# KrxImpExp

**KrxImpExp** (Kerrax Import Export) to otwartoźródłowy **dodatek do Blendera**, który dodaje obsługę importu i eksportu formatów modeli 3D używanych przez silnik **ZenGin** w Gothic I i Gothic II.

Oryginalny KrxImpExp został stworzony przez **Kerraxa** dla starszych edytorów 3D. Obecna wersja, utrzymywana przez **Patrix9999** i wspierana przez Gothic Modding Community, została przeniesiona na nowoczesne API Blendera (2.80+) i działa na **Windowsie**, **Linuxie** i **macOS**.

:::tip
KrxImpExp to podstawowe narzędzie dla każdego, kto chce tworzyć lub modyfikować modele 3D, światy czy animacje do Gothica.
:::

## Obsługiwane formaty

| Format | Import | Eksport | Opis                                      |
| ------ | :----: | :-----: | ----------------------------------------- |
| `.3DS` |   ✅   |   ✅    | Format meshów 3D Studio Max               |
| `.ASC` |   ✅   |   ✅    | Format modeli ASCII (meshe i animacje)    |
| `.MRM` |   ✅   |   ❌    | Multi-resolution mesh (skompilowany mesh) |
| `.MSH` |   ✅   |   ❌    | Format meshów ZenGin                      |
| `.ZEN` |   ✅   |   ❌    | Plik świata ZenGin                        |

## Wspierane wersje Blendera

KrxImpExp wspiera Blendera od wersji **2.80** do **4.0** (64-bit). Jeśli pojawi się nowsza wersja Blendera, warto ją wypróbować — feedback od społeczności pomaga utrzymać kompatybilność.

## Instalacja

### 1. Pobierz dodatek

Pobierz najnowszą wersję z gałęzi **dev** (zalecane):

👉 [Pobierz KrxImpExp (ZIP z gałęzi dev)](https://gitlab.com/Patrix9999/krximpexp/-/archive/dev/krximpexp-dev.zip)

### 2. Przygotuj folder skryptów (zalecana metoda)

1. Stwórz folder `scripts` w dowolnym miejscu na dysku (np. w folderze Dokumenty).
2. Wewnątrz niego stwórz podfolder `addons`.
3. Rozpakuj pobrane archiwum ZIP do folderu `addons`.

### 3. Skonfiguruj Blendera

1. Otwórz Blendera → **Edit** → **Preferences** → **File Paths**.
2. W sekcji **Data** → **Scripts** wskaż folder `scripts`, który utworzyłeś.
3. Otwórz menu (☰) i kliknij **Save Preferences**.
4. **Zrestartuj Blendera.**

### 4. Włącz dodatek

1. Otwórz Blendera → **Edit** → **Preferences** → **Add-ons**.
2. Wyszukaj **KrxImpExp**.
3. Włącz dodatek, klikając pole wyboru (checkbox).
4. Rozwiń wpis dodatku i naciśnij **Install KrxImpExp**, aby zainstalować wymagane zależności.

:::info
Dodatek wykorzystuje bibliotekę [DearPy GUI](https://github.com/hoffstadt/DearPyGui) do nowoczesnego interfejsu. Zostanie ona zainstalowana automatycznie po naciśnięciu przycisku **Install KrxImpExp** — może to wymagać dostępu do internetu.
:::

## Użycie

Po zainstalowaniu dodatku, formaty Gothica będą dostępne w menu **File** → **Import** / **Export** w Blenderze.

### Import świata ZEN

1. Przejdź do **File** → **Import** → **ZEN (Gothic World)**.
2. Wybierz plik `.zen` z instalacji Gothica (np. `NEWWORLD.ZEN`).
3. Geometria świata zostanie zaimportowana do sceny Blendera.

### Eksport modelu ASC

1. Zaznacz mesh, który chcesz wyeksportować.
2. Przejdź do **File** → **Export** → **ASC (Gothic ASCII Model)**.
3. Wybierz lokalizację i wyeksportuj.

## Linki

- [Repozytorium GitLab (gałąź dev)](https://gitlab.com/Patrix9999/krximpexp/-/tree/dev)
- [Oryginalny KrxImpExp (SourceForge)](http://krximpexp.sourceforge.net/)
- [Serwer Discord GMC](https://discord.gg/wbsVaE9mCn)
