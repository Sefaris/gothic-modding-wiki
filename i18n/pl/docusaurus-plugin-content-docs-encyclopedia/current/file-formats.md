---
sidebar_position: 4
title: "Formaty plików"
description: "Kompletna lista formatów plików i rozszerzeń używanych w moddingu Gothic I/II."
---

# Formaty plików

Ta strona zawiera listę wszystkich formatów plików i rozszerzeń używanych przez silnik **ZenGin** (Gothic I i Gothic II), istotnych z punktu widzenia moddingu.

---

## Skrypty Daedalus

| Rozszerzenie | Opis                                                                                                                                                                                                                                                                                  |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `.d`         | **Plik źródłowy Daedalus.** Główny język skryptowy Gothica. Składnia podobna do C z własnymi konstrukcjami (`instance`, `prototype`, `class`). Służy do definiowania NPC, przedmiotów, dialogów, questów, AI, efektów, menu, dźwięków, muzyki i więcej.                               |
| `.src`       | **Lista kompilacji.** Plik tekstowy zawierający listę plików `.d` (po jednym w linii) w kolejności kompilacji. Obsługuje symbole wieloznaczne (`*.d`). Kluczowe pliki: `Gothic.src`, `Fight.src`, `Camera.src`, `Menu.src`, `Music.src`, `ParticleFX.src`, `SFX.src`, `VisualFX.src`. |
| `.dat`       | **Skompilowany binarny plik Daedalus.** Wynik kompilacji skryptów, odczytywany przez silnik w trakcie gry. Generowane pliki: `Gothic.dat`, `Menu.dat`, `SFX.dat`, `PFX.dat`, `VFX.dat`, `Camera.dat`, `Music.dat`, `Fight.dat`.                                                       |

:::info
Plik `.src` określa **kolejność kompilacji** - symbole muszą być zadeklarowane przed ich użyciem. `Gothic.src` to główny punkt wejścia dla skryptów logiki gry.
:::

---

## Modele 3D i meshe

| Rozszerzenie | Opis                                                                                                                                                                                              |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `.3DS`       | **Mesh 3D Studio Max.** Używany do wizualizacji przedmiotów i obiektów świata. Można importować/eksportować przez [KrxImpExp](/docs/tools/krximpexp). Używany w polu `visual` instancji `C_Item`. |
| `.ASC`       | **Format modeli ASCII.** Format tekstowy dla meshów - edytowalny format pośredni w pipeline'ach modelowania. Import/eksport przez KrxImpExp.                                                      |
| `.MRM`       | **Multi-Resolution Mesh.** Skompilowany (binarny) format meshów, zoptymalizowany do renderowania. Tylko import w KrxImpExp.                                                                       |
| `.MSH`       | **Mesh ZenGin.** Natywny format meshów silnika. Tylko import w KrxImpExp.                                                                                                                         |
| `.MDL`       | **Plik modelu.** Kompletny skompilowany model zawierający mesh i dane szkieletu.                                                                                                                  |
| `.MDM`       | **Model Mesh.** Komponent meshowy modelu (oddzielony od hierarchii).                                                                                                                              |
| `.MDH`       | **Model Hierarchy.** Komponent szkieletu/hierarchii kości modelu.                                                                                                                                 |
| `.MMB`       | **Morph Mesh Binary.** Meshe morph (odkształcenia) twarzy używane do synchronizacji ruchu ust i ekspresji NPC.                                                                                    |

---

## Animacje

| Rozszerzenie | Opis                                                                                                                                                                                                                                 |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `.ASC`       | **Format modeli ASCII.** Również używany do animacji - wyeksportowane animacje szkieletowe przechowywane są w plikach `.ASC`. Import/eksport przez KrxImpExp.                                                                        |
| `.MDS`       | **Model Script.** Plik definicji animacji opisujący nakładki animacyjne (overlay), przejścia i stany. Stosowany przez `Mdl_ApplyOverlayMds()` / `Mdl_SetVisual()`. Przykłady: `HUMANS.MDS`, `Humans_Relaxed.mds`, `HUMANS_FLEE.MDS`. |
| `.MSB`       | **Model Script Binary.** Skompilowana wersja plików `.MDS`.                                                                                                                                                                          |
| `.MAN`       | **Model Animation.** Binarny plik danych animacji dla pojedynczej animacji.                                                                                                                                                          |

---

## Światy

| Rozszerzenie | Opis                                                                                                                                                                                                                                     |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `.ZEN`       | **Plik świata ZenGin.** Zawiera cały świat gry: geometrię, Voby (obiekty wirtualne), waypointy, freepointy, triggery, światła, dźwięki i więcej. Tworzony i edytowany za pomocą edytora **Gothic Spacer**. Można importować w KrxImpExp. |

---

## Tekstury i grafika

| Rozszerzenie | Opis                                                                                                                                                                 |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `.TGA`       | **Tekstura Targa.** Główny źródłowy format tekstur w Gothicu. Używany do wszystkiego: tekstury świata, efekty cząsteczkowe, elementy UI, fonty, lightmapy.           |
| `.TEX`       | **Skompilowana tekstura.** Zoptymalizowana tekstura silnikowa tworzona z plików `.TGA`. Przechowywana w podfolderach `_compiled/` wewnątrz archiwów VDF.             |
| `.FNT`       | **Plik czcionki.** Definicja czcionki bitmapowej mapująca znaki na pozycje w atlasie `.TGA`. Standardowe czcionki: `FONT_OLD_10_WHITE.FNT`, `FONT_OLD_20_WHITE.FNT`. |

---

## Audio

| Rozszerzenie | Opis                                                                                                                                                                                                                |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `.WAV`       | **Plik audio.** Używany do dubbingu, efektów dźwiękowych i części muzyki. Pliki mowy przechowywane w `Data/Sound/Speech/` z nazwami odpowiadającymi identyfikatorom `AI_Output` (np. `DIA_Konrad_Hallo_08_01.WAV`). |
| `.SFX`       | **Definicja efektu dźwiękowego** (w kontekście skryptów - definiowane przez klasę `C_SFX` w `SFX.src`).                                                                                                             |

---

## Muzyka (DirectMusic)

Gothic wykorzystuje system **Microsoft DirectMusic** do dynamicznej, interaktywnej muzyki. Pliki muzyczne przechowywane są w `Data/Music/`.

| Rozszerzenie | Opis                                                                                                                                                                                                                                                                                     |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `.SGT`       | **DirectMusic Segment.** Główny format pliku muzycznego, do którego odwołuje się pole `C_MUSICTHEME.file` w skryptach muzycznych. Zawiera odniesienia do styli, bandów i progresji akordów, które razem tworzą odtwarzalny utwór muzyczny. Przykłady: `OWD_DayStd.sgt`, `nw_dayfgt.sgt`. |
| `.STY`       | **DirectMusic Style.** Definiuje wzorce muzyczne, motywy i wariacje. Style są wykorzystywane przez segmenty `.SGT` i dostarczają właściwe dane nut/rytmu, które DirectMusic odtwarza dynamicznie.                                                                                        |
| `.DLS`       | **Downloadable Sounds (DLS).** Pliki banku instrumentów/sampli używane przez DirectMusic do syntezy dźwięku. Zawierają faktyczne sample instrumentów (dane wavetable) wykorzystywane do odtwarzania muzyki zdefiniowanej w plikach `.SGT` i `.STY`.                                      |

---

## Dane dialogowe

| Rozszerzenie | Opis                                                                                                                                                                                        |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `.BIN`       | **Output Units binary** (`ou.bin`). Skompilowane dane dialogów/przerywników filmowych zawierające mapowania plików głosowych i tekst napisów. Generowane z wywołań `AI_Output` w skryptach. |
| `.CSL`       | **Cutscene Library.** Zawiera definicje przerywników filmowych (cutscen) używane przez `oCsManager` (menedżer przerywników).                                                                |

---

## Archiwa i dystrybucja modów

| Rozszerzenie | Opis                                                                                                                                                                                                                                                                             |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `.VDF`       | **Virtual Disk File.** Format archiwów Gothica do pakowania zasobów gry (meshów, tekstur, światów, dźwięków, skompilowanych skryptów). Standardowe pliki: `Meshes.vdf`, `Textures.vdf`, `Worlds.vdf`, `Anims.vdf`, `Sound.vdf`, `Speech.vdf`. Tworzone za pomocą **GothicVDFS**. |
| `.MOD`       | **Archiwum moda.** Funkcjonalnie identyczne z `.VDF`, używane do dystrybucji modyfikacji. Umieszczane w `Data/modvdf/` i ładowane przez silnik na podstawie linii `VDF=` w pliku `.ini`.                                                                                         |

:::info
Zarówno `.VDF`, jak i `.MOD` używają tego samego formatu wewnętrznego. Silnik ładuje je na podstawie znacznika daty archiwum - nowsze archiwa nadpisują starsze. Dlatego [EGMT](/docs/tools/easy-gothic-mod-translator) zwiększa datę o 1 dzień przy tworzeniu łatek z tłumaczeniem.
:::

---

## Konfiguracja

| Rozszerzenie | Opis                                                                                                                                                                                                                                                                                          |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `.INI`       | **Plik konfiguracyjny.** `Gothic.ini` przechowuje ustawienia silnika (rozdzielczość, klawisze, ścieżki). Pliki `.ini` specyficzne dla modów (np. `MojMod.ini`) definiują kolejność ładowania VDF przez linię `VDF=`. Można je odczytywać/zapisywać z Daedalusa przy użyciu biblioteki Ikarus. |

---

## Zapisy gry

| Rozszerzenie | Opis                                                                                                                                   |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------- |
| `.SAV`       | **Plik zapisu gry.** Zawiera zserializowany stan gry: świat, NPC, przedmioty, postęp questów. Przechowywany w `Saves/savegame[0-20]/`. |

---

## Pluginy Union

| Rozszerzenie | Opis                                                                                                                                                                                     |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `.DLL`       | **Dynamic Link Library.** Pluginy C++ Union kompilowane jako DLL. Instalowane w `System/Autorun/` i ładowane przez runtime Union. Umożliwiają hookowanie i rozszerzanie funkcji silnika. |

---

## Tabela podsumowująca

| Kategoria                | Rozszerzenia                                                   |
| ------------------------ | -------------------------------------------------------------- |
| **Skrypty Daedalus**     | `.d`, `.src`, `.dat`                                           |
| **Modele 3D i meshe**    | `.3DS`, `.ASC`, `.MRM`, `.MSH`, `.MDL`, `.MDM`, `.MDH`, `.MMB` |
| **Animacje**             | `.MDS`, `.MSB`, `.MAN`                                         |
| **Światy**               | `.ZEN`                                                         |
| **Tekstury i grafika**   | `.TGA`, `.TEX`, `.FNT`                                         |
| **Audio**                | `.WAV`                                                         |
| **Muzyka (DirectMusic)** | `.SGT`, `.STY`, `.DLS`                                         |
| **Dane dialogowe**       | `.BIN` (`ou.bin`), `.CSL`                                      |
| **Archiwa**              | `.VDF`, `.MOD`                                                 |
| **Konfiguracja**         | `.INI`                                                         |
| **Zapisy gry**           | `.SAV`                                                         |
| **Pluginy Union**        | `.DLL`                                                         |
