---
sidebar_position: 1
title: "Pobranie gry ze Steam/GOG"
description: "Skąd pobrać grę Gothic, wymagania systemowe i różnice między wersjami."
---

# Pobranie gry ze Steam/GOG

Aby tworzyć modyfikacje do Gothic, potrzebujesz oryginalnej wersji gry. Gothic dostępny jest na dwóch platformach cyfrowej dystrybucji: **Steam** i **GOG**.

## Która wersja gry?

Modowanie w Daedalusie jest możliwe dla dwóch gier: **Gothic I** oraz **Gothic II: Noc Kruka**. Obie działają na silniku ZenGin i mają bardzo podobny system skryptowy - różnice między nimi są niewielkie.

Na tym wiki skupiamy się na **Gothic II: Noc Kruka** - oferuje nieco bardziej rozwiniętą wersję silnika, posiada największe wsparcie społeczności modderskiej i zawiera wszystko, co Gothic I.

:::tip
Wybierz **Gothic II: Złotą Edycję** (Gold Edition) - zawiera podstawkę oraz dodatek Noc Kruka w jednym pakiecie.
:::

## Steam

1. Otwórz stronę [Gothic II: Gold Edition](https://store.steampowered.com/app/39510/Gothic_II_Gold_Edition/) na Steam
2. Kup i zainstaluj grę
3. Domyślna ścieżka instalacji: `C:\Program Files (x86)\Steam\steamapps\common\Gothic II`

## GOG

1. Otwórz stronę [Gothic II: Gold Edition](https://www.gog.com/en/game/gothic_2_gold_edition) na GOG
2. Kup i zainstaluj grę za pomocą GOG Galaxy lub instalatora offline
3. Domyślna ścieżka instalacji: `C:\GOG Games\Gothic II Gold`

:::tip
Wersja GOG jest zazwyczaj lepszym wyborem do moddingu - nie posiada DRM i jest bliższa oryginalnej wersji gry.
:::

## Struktura katalogów

Po instalacji, katalog gry powinien wyglądać mniej więcej tak:

```
Gothic II/
├── System/             ← pliki EXE, DLL, ustawienia
│   ├── Gothic2.exe         ← główny plik gry
│   ├── Autorun/            ← pluginy Union (DLL)
│   └── ...
├── Data/               ← dane gry (modele, tekstury, światy)
│   ├── Meshes.vdf
│   ├── Textures.vdf
│   ├── Worlds.vdf
│   └── ...
├── _work/
│   └── Data/
│       ├── Scripts/    ← skrypty Daedalus (tu pracujemy!)
│       │   ├── Content/
│       │   └── System/
│       ├── Worlds/     ← pliki światów (.zen)
│       └── ...
└── Saves/              ← stany zapisu
```

Najważniejszy katalog dla moddera to **`_work/Data/Scripts/`** - tutaj znajdują się skrypty Daedalus, które będziemy edytować.

## Weryfikacja instalacji

Przed rozpoczęciem pracy upewnij się, że:

1. **Gra się uruchamia** - włącz grę i sprawdź, czy działa poprawnie
2. **Masz dostęp do skryptów** - sprawdź, czy katalog `_work/Data/Scripts/Content/` istnieje i zawiera pliki `.d` oraz `.src`
3. **Gothic.src istnieje** - sprawdź, czy plik `_work/Data/Scripts/Content/Gothic.src` jest obecny

:::info
Jeśli katalog `_work/Data/Scripts/` jest pusty lub nie istnieje, może być konieczne wypakowanie skryptów z plików `.vdf` za pomocą narzędzia **Gothic VDF Tool** lub **GothicStarter**.
:::

## Następny krok

Po zainstalowaniu gry, przejdź do [instalacji Visual Studio Code](./install-vscode.md) - edytora, w którym będziemy pisać skrypty.
