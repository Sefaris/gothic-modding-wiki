---
sidebar_position: 1
title: "Opis struktury skryptów"
description: "Jak zorganizowane są skrypty w grze Gothic."
---

# Opis struktury skryptów

Skrypty Gothic podzielone są na dwa główne katalogi: **Content** (treść gry) i **System** (systemy silnika). Każdy z nich posiada własny zestaw plików `.src` - specjalnych plików kompilacji, które określają kolejność ładowania skryptów.

## Pliki .src - kompilacja

Pliki `.src` to listy plików `.d` (Daedalus) w kolejności, w jakiej mają być skompilowane. Silnik Gothic czyta je od góry do dołu:

| Plik             | Katalog    | Opis                                                            |
| ---------------- | ---------- | --------------------------------------------------------------- |
| `Gothic.src`     | `Content/` | Główna kompilacja treści gry (NPC, przedmioty, dialogi, questy) |
| `Fight.src`      | `Content/` | Kompilacja taktyk walki (FAI)                                   |
| `Camera.src`     | `System/`  | Ustawienia kamery                                               |
| `Menu.src`       | `System/`  | Definicje menu gry                                              |
| `Music.src`      | `System/`  | Instancje muzyki                                                |
| `ParticleFX.src` | `System/`  | Efekty cząsteczkowe                                             |
| `SFX.src`        | `System/`  | Efekty dźwiękowe                                                |
| `VisualFX.src`   | `System/`  | Efekty wizualne (czary, aury)                                   |

:::danger
Kolejność wpisów w `Gothic.src` jest krytyczna! Jeśli odwołujesz się do instancji (np. przedmiotu w NPC), musi być ona zdefiniowana **wcześniej** w pliku `.src`.
:::

---

## Content - treść gry

Katalog `Content/` zawiera wszystko, co definiuje świat gry: postacie, przedmioty, dialogi, AI, magię i questy. Jest kompilowany przez `Gothic.src` i `Fight.src`.

```
Content/
├── Gothic.src              ← główny plik kompilacji
├── Fight.src               ← kompilacja taktyk walki
│
├── _intern/                ← klasy i stałe silnika
├── AI/                     ← sztuczna inteligencja
├── Items/                  ← przedmioty
├── FAI/                    ← taktyki walki
├── Story/                  ← fabuła, NPC, dialogi
├── Cutscene/               ← przerywniki filmowe
└── Spine/                  ← integracja z platformą Spine
```

### `_intern/` - klasy i stałe silnika

Zawiera deklaracje klas silnika oraz stałe globalne. To fundament, na którym opierają się wszystkie inne skrypty.

| Plik          | Opis                                                           |
| ------------- | -------------------------------------------------------------- |
| `Classes.d`   | Klasy silnika: `C_NPC`, `C_Item`, `C_INFO`, `C_Mission` i inne |
| `Constants.d` | Stałe globalne, zmienne stanu misji, zmienne fabuły            |
| `Fight.d`     | Stałe systemu walki                                            |

:::info
Pliki w `_intern/` są zawsze na początku `Gothic.src` - definiują typy danych, z których korzysta reszta skryptów.
:::

### `AI/` - sztuczna inteligencja

Kontroluje zachowanie postaci i potworów. Podzielony na osobne podsystemy:

```
AI/
├── AI_Intern/          ← rdzeń AI
│   ├── AI_Constants.d      ← stałe AI (dystanse, priorytety)
│   ├── Externals.d         ← deklaracje funkcji silnika
│   ├── Perception.d        ← reakcje na otoczenie
│   ├── Focus.d             ← ustawienia focusu (na co NPC zwraca uwagę)
│   ├── Species.d           ← definicje gatunków
│   └── BodyStates.d        ← stany ciała (siedzi, leży, walczy)
│
├── Human/              ← zachowanie ludzi
│   ├── B_Human/            ← funkcje zachowań (B_ = Behavior)
│   ├── C_Human/            ← funkcje warunków (C_ = Condition)
│   ├── TA_Human/           ← daily routines (TA = Tagesablauf)
│   └── ZS_Human/           ← automaty stanów (ZS = Zustandsautomat)
│
├── Monster/            ← zachowanie potworów
│   ├── B_Monster/          ← zachowania potworów
│   ├── C_Monster/          ← warunki potworów
│   ├── RTN_Monster/        ← plany dnia potworów
│   └── ZS_Monster/         ← automaty stanów potworów
│
├── Magic/              ← system magii
│   ├── Spells/             ← definicje zaklęć
│   └── ZS_Magic/           ← stany rzucania czarów
│
└── Test_Skripts/       ← skrypty testowe/debugowe
```

**Konwencje nazewnicze w AI:**

- **B\_** (Behavior) - funkcje wykonujące akcje, np. `B_Attack`, `B_Flee`
- **C\_** (Condition) - funkcje sprawdzające warunki, np. `C_CanSeeNpc`
- **TA\_** (Tagesablauf) - plany dnia NPC
- **ZS\_** (Zustandsautomat) - automaty stanów AI (stan bezczynności, walki, ucieczki itp.)

### `Items/` - przedmioty

Wszystkie definicje przedmiotów w grze. Pliki pogrupowane według typu:

| Plik                  | Opis                                |
| --------------------- | ----------------------------------- |
| `IT_Melee_Weapons.d`  | Broń biała (miecze, topory)         |
| `IT_Ranged_Weapons.d` | Broń dystansowa (łuki, kusze)       |
| `IT_Armor.d`          | Zbroje                              |
| `IT_Food.d`           | Jedzenie                            |
| `IT_Potions.d`        | Mikstury                            |
| `IT_Plants.d`         | Rośliny (składniki alchemiczne)     |
| `IT_Runen.d`          | Runy magiczne                       |
| `IT_Scrolls.d`        | Zwoje zaklęć                        |
| `IT_Ringe.d`          | Pierścienie                         |
| `IT_Amulette.d`       | Amulety                             |
| `IT_Keys.d`           | Klucze                              |
| `IT_Misc.d`           | Przedmioty różne (złoto, pochodnie) |
| `IT_Written.d`        | Dokumenty, listy, księgi            |
| `MissionItems_*.d`    | Przedmioty misyjne (per rozdział)   |

### `FAI/` - taktyki walki

Definicje taktyk walki (Fight AI) dla różnych typów przeciwników:

| Plik                 | Opis                           |
| -------------------- | ------------------------------ |
| `FAI_Human_Normal.d` | Standardowa taktyka ludzka     |
| `FAI_Human_Strong.d` | Silny przeciwnik               |
| `FAI_Human_Master.d` | Mistrz walki                   |
| `FAI_Human_Coward.d` | Tchórz (ucieka przy niskim HP) |
| `FAI_Wolf.d`         | Wilk                           |
| `FAI_Orc.d`          | Ork                            |
| `FAI_Dragon.d`       | Smok                           |
| `FAI_Troll.d`        | Troll                          |
| `FAI_Demon.d`        | Demon                          |

:::tip
Taktyki walki są przypisywane do NPC przez pole `fight_tactic` w instancji `C_NPC`.
:::

### `Story/` - fabuła

Największy i najważniejszy katalog. Zawiera NPC, dialogi, questy, eventy i wszelkie skrypty fabularne:

```
Story/
├── Startup.d                   ← Funkcje startowe światów (spawn NPC)
├── Story_Globals.d             ← Zmienne globalne fabuły
├── NPC_Globals.d               ← Zmienne globalne NPC
├── SVM.d                       ← Standard Voice Messages (okrzyki NPC)
├── Text.d                      ← Stałe tekstowe
├── XP_Constants.d              ← Stałe doświadczenia
│
├── NPC/                    ← Definicje NPC (instancje C_NPC)
│   ├── PC_Hero.d               ← Postać gracza
│   ├── VLK_*.d                 ← Mieszczanie
│   ├── MIL_*.d                 ← Milicjanci
│   ├── PAL_*.d                 ← Paladyni
│   ├── SLD_*.d                 ← Najemnicy
│   ├── BAU_*.d                 ← Farmerzy
│   ├── BDT_*.d                 ← Bandyci
│   ├── KDF_*.d                 ← Magowie ognia
│   ├── KDW_*.d                 ← Magowie wody
│   ├── PIR_*.d                 ← Piraci
│   ├── NOV_*.d                 ← Nowicjusze
│   ├── DJG_*.d                 ← Łowcy smoków
│   └── Monster/                ← Definicje potworów
│
├── NPC_Scripts/            ← Funkcje pomocnicze NPC
│   ├── NPC_Default.d           ← Prototyp Npc_Default
│   ├── B_SetNpcVisual.d        ← Ustawianie wyglądu
│   ├── B_GiveNpcTalents.d      ← Przydzielanie umiejętności
│   └── B_SetFightSkills.d      ← Ustawianie umiejętności walki
│
├── Dialoge/                ← Dialogi (~1200+ plików)
│   ├── DIA_VLK_*.d             ← Dialogi mieszczan
│   ├── DIA_MIL_*.d             ← Dialogi milicjantów
│   ├── DIA_BAU_*.d             ← Dialogi farmerów
│   └── ...                     ← (plik per NPC)
│
├── B_Story/                ← Funkcje fabularne
│   ├── B_GivePlayerXP.d        ← Dawanie doświadczenia
│   ├── B_LogEntry.d            ← Wpis do dziennika
│   ├── B_Enter_NewWorld.d      ← Wejście do nowego świata
│   └── B_Kapitelwechsel.d      ← Zmiana rozdziału
│
├── B_GiveTradeInv/         ← Ekwipunek handlarzy
│   ├── B_GiveTradeInv.d        ← Główna funkcja
│   └── B_GiveTradeInv_*.d      ← Per handlarz
│
├── B_Content/              ← Funkcje pomocnicze treści
├── B_AssignAmbientInfos/   ← Dialogi tła (ambientowe)
│
├── Dialog_Mobsis/          ← Interakcje z obiektami
│   ├── SmithWeapon.d           ← Kowalstwo
│   ├── Potion_Alchemy.d        ← Alchemia
│   ├── cook_s1.d               ← Gotowanie
│   └── SleepABit.d             ← Spanie w łóżku
│
├── Events/                 ← Eventy fabularne
│   └── EVT_*.d                 ← Skrypty eventowe (bitwy, cutscenki)
│
├── G_Functions/            ← Funkcje globalne gry
│   ├── G_PickLock.d            ← Otwieranie zamków
│   └── G_CanSteal.d            ← Kradzież
│
└── Log_Entries/            ← Dziennik questów
    └── LOG_Constants_*.d       ← Stałe tematów dziennika
```

**Konwencje nazewnicze NPC (prefixy):**

| Prefix | Gildia                      |
| ------ | --------------------------- |
| `PC_`  | Gracz (Player Character)    |
| `VLK_` | Mieszczanin (Volk)          |
| `MIL_` | Milicjant (Miliz)           |
| `PAL_` | Paladyn                     |
| `SLD_` | Najemnik (Söldner)          |
| `BAU_` | Farmer (Bauer)              |
| `BDT_` | Bandyta (Bandit)            |
| `KDF_` | Mag ognia (Kreisfeuer)      |
| `KDW_` | Mag wody (Kreiswasser)      |
| `PIR_` | Pirat                       |
| `NOV_` | Nowicjusz (Novize)          |
| `DJG_` | Łowca smoków (Drachenjäger) |

---

## System - systemy silnika

Katalog `System/` zawiera definicje systemów silnika: menu, kamery, muzyki, efektów dźwiękowych i wizualnych. Każdy podsystem ma własny plik `.src`.

```
System/
├── Camera.src          ← kompilacja kamery
├── Menu.src            ← kompilacja menu
├── Music.src           ← kompilacja muzyki
├── ParticleFX.src      ← kompilacja efektów cząsteczkowych
├── SFX.src             ← kompilacja efektów dźwiękowych
├── VisualFX.src        ← kompilacja efektów wizualnych
│
├── _intern/            ← deklaracje klas systemowych
├── Camera/             ← ustawienia kamery
├── Menu/               ← definicje menu
├── Music/              ← instancje muzyki
├── PFX/                ← efekty cząsteczkowe
├── SFX/                ← efekty dźwiękowe
└── VisualFX/           ← efekty wizualne
```

### `_intern/` - klasy systemowe

Deklaracje klas silnika dla poszczególnych systemów. Analogicznie do `Content/_intern/`, ale dla podsystemów:

| Plik           | Opis                                          |
| -------------- | --------------------------------------------- |
| `Camera.d`     | Klasa `C_CamSys` - parametry kamery           |
| `Menu.d`       | Klasy `C_Menu`, `C_MenuItem` - definicje menu |
| `Music.d`      | Klasa `C_MusicTheme` - motywy muzyczne        |
| `ParticleFX.d` | Klasa `C_ParticleFX` - efekty cząsteczkowe    |
| `SFX.d`        | Klasa `C_SFX` - efekty dźwiękowe              |
| `VisualFX.d`   | Klasa `C_VisualFX` - efekty wizualne          |

### `Camera/` - kamera

Instancje kamer używanych w grze:

| Plik        | Opis                                                      |
| ----------- | --------------------------------------------------------- |
| `CamInst.d` | Definicje kamer: standardowa, dialogowa, walki, cutscenki |

### `Menu/` - menu gry

Definicje wszystkich ekranów menu:

| Plik                  | Opis                                  |
| --------------------- | ------------------------------------- |
| `Menu_Main.d`         | Menu główne                           |
| `Menu_Status.d`       | Ekran postaci (statystyki, ekwipunek) |
| `Menu_Log.d`          | Dziennik questów                      |
| `Menu_Opt.d`          | Opcje gry                             |
| `Menu_Opt_Graphics.d` | Opcje grafiki                         |
| `Menu_Opt_Audio.d`    | Opcje dźwięku                         |
| `Menu_Opt_Controls.d` | Opcje sterowania                      |
| `Menu_Savegame.d`     | Zapis/odczyt gry                      |
| `Menu_Defines.d`      | Stałe i definicje wspólne             |

### `Music/` - muzyka

| Plik          | Opis                                                                      |
| ------------- | ------------------------------------------------------------------------- |
| `MusicInst.d` | Instancje motywów muzycznych (eksploracja, walka, zagrożenie per lokacja) |

### `PFX/` - efekty cząsteczkowe

| Plik              | Opis                              |
| ----------------- | --------------------------------- |
| `PfxInst.d`       | Efekty ogólne (ogień, dym, iskry) |
| `PfxInstEngine.d` | Efekty silnikowe                  |
| `PfxInstMagic.d`  | Efekty magiczne (zaklęcia, runy)  |

### `SFX/` - efekty dźwiękowe

| Plik              | Opis                                         |
| ----------------- | -------------------------------------------- |
| `SfxInst.d`       | Dźwięki otoczenia, interfejsu, obiektów      |
| `SfxInstSpeech.d` | Dźwięki mowy (konfiguracja systemu dialogów) |

### `VisualFX/` - efekty wizualne

| Plik             | Opis                               |
| ---------------- | ---------------------------------- |
| `VisualFxInst.d` | Efekty wizualne zaklęć, aur, buffy |

---

## Podsumowanie

| Obszar          | Katalog            | Kompilacja       | Opis                                        |
| --------------- | ------------------ | ---------------- | ------------------------------------------- |
| Klasy silnika   | `Content/_intern/` | `Gothic.src`     | Fundamenty - klasy C_NPC, C_Item, C_INFO... |
| AI              | `Content/AI/`      | `Gothic.src`     | Zachowania, percepcja, stany AI             |
| Przedmioty      | `Content/Items/`   | `Gothic.src`     | Bronie, zbroje, mikstury, jedzenie          |
| Taktyki walki   | `Content/FAI/`     | `Fight.src`      | Taktyki walki per typ wroga                 |
| Fabuła          | `Content/Story/`   | `Gothic.src`     | NPC, dialogi, questy, eventy                |
| Kamera          | `System/Camera/`   | `Camera.src`     | Tryby kamery                                |
| Menu            | `System/Menu/`     | `Menu.src`       | Ekrany menu gry                             |
| Muzyka          | `System/Music/`    | `Music.src`      | Motywy muzyczne                             |
| Cząsteczki      | `System/PFX/`      | `ParticleFX.src` | Efekty cząsteczkowe                         |
| Dźwięk          | `System/SFX/`      | `SFX.src`        | Efekty dźwiękowe                            |
| Efekty wizualne | `System/VisualFX/` | `VisualFX.src`   | Efekty zaklęć i aur                         |
