---
sidebar_position: 2
title: "Animacje"
description: "Kompletna lista animacji w Gothic II - nakładki MDS, przejścia stanów, animacje postaci i potworów."
---

# Animacje

Animacje w Gothic II są odtwarzane za pomocą funkcji silnika Daedalusa. Dzielą się na kilka kategorii według konwencji nazewnictwa i sposobu użycia.

## Konwencje nazw

| Prefiks | Typ        | Opis                                                                                      |
| ------- | ---------- | ----------------------------------------------------------------------------------------- |
| `T_`    | Transition | Animacja przejścia - jednorazowe przejście między dwoma stanami (np. stanie → siedzenie). |
| `S_`    | State      | Animacja stanu - zapętlona animacja trwającego stanu (np. jedzenie, leżenie).             |
| `R_`    | Random     | Animacja losowa - odtwarzana losowo jako idle (np. drapanie głowy, poruszenie się).       |

## Funkcje odtwarzania animacji

| Funkcja                                               | Opis                                                                          |
| ----------------------------------------------------- | ----------------------------------------------------------------------------- |
| `AI_PlayAni(self, "NAZWA")`                           | Odtwarza animację jednorazowo. NPC musi być w odpowiednim stanie bazowym.     |
| `AI_PlayAniBS(self, "NAZWA", BS_STAN)`                | Odtwarza animację i zmienia body state NPC (np. `BS_SIT`, `BS_LIE`).          |
| `Mdl_ApplyOverlayMds(self, "PLIK.MDS")`               | Nakłada overlay animacyjny - zmienia zestaw animacji NPC (np. chód, postawa). |
| `Mdl_RemoveOverlayMds(self, "PLIK.MDS")`              | Usuwa nałożony overlay.                                                       |
| `Mdl_ApplyOverlayMdsTimed(self, "PLIK.MDS", czas)`    | Nakłada overlay na określony czas (ms).                                       |
| `Mdl_ApplyRandomAni(self, "BAZOWA", "LOSOWA")`        | Rejestruje animację losową odtwarzaną w danym stanie bazowym.                 |
| `Mdl_ApplyRandomAniFreq(self, "BAZOWA", freq)`        | Ustawia częstotliwość (w sekundach) odtwarzania animacji losowych.            |
| `Mdl_StartFaceAni(self, "NAZWA", intensywność, czas)` | Odtwarza animację twarzy (mimika). Czas `-1` = nieskończony.                  |

### Body States

Funkcja `AI_PlayAniBS` wymaga podania stanu ciała:

| Stała                      | Opis                                       |
| -------------------------- | ------------------------------------------ |
| `BS_STAND`                 | Stoi                                       |
| `BS_SIT`                   | Siedzi                                     |
| `BS_LIE`                   | Leży                                       |
| `BS_UNCONSCIOUS`           | Nieprzytomny                               |
| `BS_ITEMINTERACT`          | Interakcja z przedmiotem (jedzenie, picie) |
| `BS_MOBINTERACT_INTERRUPT` | Przerwanie interakcji z mobem              |

---

## Nakładki MDS (Overlays)

Nakładki zmieniają zestaw animacji NPC - wpływają na chód, postawę i zachowanie. Nakładane za pomocą `Mdl_ApplyOverlayMds` w definicji NPC.

### Nakładki osobowości

| Plik MDS               | Opis                                  | Używane dla                                                     |
| ---------------------- | ------------------------------------- | --------------------------------------------------------------- |
| `Humans_Relaxed.mds`   | Rozluźniona postawa, swobodny chód    | Bandyci, najemnicy, piraci, wieśniacy                           |
| `Humans_Militia.mds`   | Postawa wojskowa, pewny chód          | Paladyni, milicja, strażnicy, wojownicy                         |
| `Humans_Mage.mds`      | Postawa maga, powolny chód            | Magowie ognia (KDF), magowie wody (KDW), dementorzy, nowicjusze |
| `Humans_Arrogance.mds` | Arogancka postawa                     | Szlachta, kupcy, niektórzy bandyci (Raven, Bullco)              |
| `Humans_Tired.mds`     | Wyczerpana postawa, przygarbiony chód | Więźniowie, robotnicy, niektórzy wieśniacy                      |
| `Humans_Babe.mds`      | Kobiecy chód i postawa                | Kobiety NPC (obywatelki, prostytutki)                           |

### Nakładki ruchu

| Plik MDS            | Opis                             | Sposób nałożenia                               |
| ------------------- | -------------------------------- | ---------------------------------------------- |
| `HUMANS_FLEE.MDS`   | Przerażony bieg (uciekanie)      | `Mdl_ApplyOverlayMds` / `Mdl_RemoveOverlayMds` |
| `HUMANS_SPRINT.MDS` | Sprint (chwilowe przyspieszenie) | `Mdl_ApplyOverlayMdsTimed` (z timeoutem)       |

### Nakładki szkieletów

| Plik MDS                  | Opis                          |
| ------------------------- | ----------------------------- |
| `humans_skeleton.mds`     | Bazowy overlay dla szkieletów |
| `humans_skeleton_fly.mds` | Latający mag-szkielet         |
| `humans_1hST1.mds`        | Styl walki: miecz jednoręczny |
| `humans_2hST2.mds`        | Styl walki: broń dwuręczna    |
| `humans_BowT1.mds`        | Styl walki: łuk               |
| `humans_CBowT1.mds`       | Styl walki: kusza             |

### Nakładki potworów

| Plik MDS              | Opis                                           |
| --------------------- | ---------------------------------------------- |
| `Golem_Firegolem.mds` | Ognisty golem (overlay na bazowego golema)     |
| `Golem_Icegolem.mds`  | Lodowy golem (overlay na bazowego golema)      |
| `Firewaran.mds`       | Ognisty waran (overlay na bazowego warana)     |
| `Orcbiter.mds`        | Orczy kąsacz (overlay na bazowego ścierwojada) |

---

## Bazowe modele wizualne (Mdl_SetVisual)

Każdy NPC lub potwór ma przypisany bazowy plik `.mds` definiujący jego model i zestaw animacji.

### Ludzie

| Plik MDS     | Opis                       |
| ------------ | -------------------------- |
| `HUMANS.MDS` | Wszyscy ludzie NPC i gracz |

### Potwory

| Plik MDS            | Stworzenie                                                     |
| ------------------- | -------------------------------------------------------------- |
| `Alligator.mds`     | Aligator                                                       |
| `Blattcrawler.mds`  | Liściowy pełzacz                                               |
| `Bloodfly.mds`      | Krwiopijca (Bloodfly)                                          |
| `Crawler.mds`       | Kopalniany pełzacz, Pełzacz-wojownik                           |
| `Demon.mds`         | Demon, Pan Demonów                                             |
| `Draconian.mds`     | Jaszczuroczłek (Draconian)                                     |
| `Dragon.mds`        | Wszystkie smoki (Ognisty, Lodowy, Skalny, Bagienny, Nieumarły) |
| `DragonSnapper.mds` | Smocze szczękacze                                              |
| `FireShadow.mds`    | Ognisty cień                                                   |
| `Giant_Bug.mds`     | Wielki robak                                                   |
| `Giant_Rat.mds`     | Wielki szczur, Wielki pustynny szczur                          |
| `Gobbo.mds`         | Goblin (Zielony, Czarny, Szkielet, Wojownik)                   |
| `Golem.mds`         | Kamienny golem (bazowy)                                        |
| `Harpie.mds`        | Harpia                                                         |
| `Irrlicht.mds`      | Błędny ognik (Wisp)                                            |
| `Keiler.mds`        | Dzik                                                           |
| `Lurker.mds`        | Czarownik (Lurker)                                             |
| `Meatbug.mds`       | Mięsny robak                                                   |
| `Molerat.mds`       | Kretoszczur                                                    |
| `Orc.mds`           | Ork Elitarny, Ork Szaman, Ork Wojownik, Nieumarły Ork          |
| `Razor.mds`         | Żyletka (Razor)                                                |
| `Scavenger.mds`     | Ścierwojad                                                     |
| `ScavengerGL.mds`   | Ścierwojad-demon                                               |
| `Shadow.mds`        | Cienisty, Cienisty Szkielet, Ogar krwi                         |
| `Sheep.mds`         | Owca, Baran                                                    |
| `Snapper.mds`       | Szczękacz                                                      |
| `StoneGuardian.mds` | Kamienny strażnik                                              |
| `StonePuma.mds`     | Kamienna puma                                                  |
| `SwampDrone.mds`    | Bagienny trutnik                                               |
| `SwampGolem.mds`    | Bagienny golem                                                 |
| `Swamprat.mds`      | Bagienny szczur                                                |
| `Swampshark.mds`    | Bagienny rekin                                                 |
| `SwampZombie.mds`   | Bagienny zombie                                                |
| `Swarm.mds`         | Rój                                                            |
| `Troll.mds`         | Troll, Czarny Troll                                            |
| `Waran.mds`         | Waran (bazowy)                                                 |
| `Wolf.mds`          | Wilk, Warg, Lodowy wilk                                        |
| `Zombie.mds`        | Zombie, Bagienne stworzenie                                    |

---

## Animacje przejścia (T\_)

Animacje jednorazowe odtwarzające przejście między dwoma stanami NPC.

### Pozycje strażnika

| Animacja              | Opis                                            |
| --------------------- | ----------------------------------------------- |
| `T_STAND_2_HGUARD`    | Stanie → poza strażnika (ręce na biodrach)      |
| `T_HGUARD_2_STAND`    | Poza strażnika → stanie                         |
| `T_HGUARD_LOOKAROUND` | Rozglądanie się w pozie strażnika               |
| `T_STAND_2_LGUARD`    | Stanie → skrzyżowane ręce                       |
| `T_LGUARD_2_STAND`    | Skrzyżowane ręce → stanie                       |
| `T_LGUARD_SCRATCH`    | Drapanie się (idle ze skrzyżowanymi rękami)     |
| `T_LGUARD_STRETCH`    | Przeciąganie się (idle ze skrzyżowanymi rękami) |
| `T_LGUARD_CHANGELEG`  | Zmiana nogi (idle ze skrzyżowanymi rękami)      |

### Siedzenie

| Animacja               | Opis                                         |
| ---------------------- | -------------------------------------------- |
| `T_STAND_2_SIT`        | Stanie → siedzenie na ziemi                  |
| `T_SIT_2_STAND`        | Siedzenie na ziemi → stanie                  |
| `T_STAND_2_GUARDSLEEP` | Stanie → siedzenie w pozie drzemki strażnika |
| `T_GUARDSLEEP_2_STAND` | Drzemka strażnika → stanie                   |

### Modlitwa

| Animacja         | Opis                                         |
| ---------------- | -------------------------------------------- |
| `T_STAND_2_PRAY` | Stanie → klęczenie/modlitwa                  |
| `T_PRAY_2_STAND` | Modlitwa → stanie                            |
| `T_PRAY_RANDOM`  | Losowa animacja modlitwy (idle na klęczkach) |

### Spanie

| Animacja          | Opis                        |
| ----------------- | --------------------------- |
| `T_STAND_2_SLEEP` | Stanie → leżenie (potwory)  |
| `T_SLEEP_2_STAND` | Leżenie → stanie (potwory)  |
| `T_REST_2_STAND`  | Odpoczynek → stanie (smoki) |

### Jedzenie / picie / palenie

| Animacja              | Opis                                         |
| --------------------- | -------------------------------------------- |
| `T_STAND_2_EAT`       | Stanie → jedzenie z ziemi (potwory)          |
| `T_EAT_2_STAND`       | Jedzenie z ziemi → stanie (potwory)          |
| `T_FOOD_RANDOM_1`     | Jedzenie małego posiłku (jabłko) - wariant 1 |
| `T_FOOD_RANDOM_2`     | Jedzenie małego posiłku (jabłko) - wariant 2 |
| `T_FOODHUGE_RANDOM_1` | Jedzenie dużego posiłku (ser)                |
| `T_MEAT_RANDOM_1`     | Jedzenie mięsa (boczek, baranina)            |
| `T_POTION_RANDOM_1`   | Picie - wariant 1                            |
| `T_POTION_RANDOM_2`   | Picie - wariant 2                            |
| `T_POTION_RANDOM_3`   | Picie - wariant 3                            |
| `T_JOINT_RANDOM_1`    | Palenie skręta                               |

### Taniec

| Animacja     | Opis         |
| ------------ | ------------ |
| `T_DANCE_01` | Styl tańca 1 |
| `T_DANCE_02` | Styl tańca 2 |
| `T_DANCE_03` | Styl tańca 3 |
| `T_DANCE_04` | Styl tańca 4 |
| `T_DANCE_05` | Styl tańca 5 |
| `T_DANCE_06` | Styl tańca 6 |
| `T_DANCE_07` | Styl tańca 7 |
| `T_DANCE_08` | Styl tańca 8 |
| `T_DANCE_09` | Styl tańca 9 |

### Rozmowa / interakcje

| Animacja            | Opis                                      |
| ------------------- | ----------------------------------------- |
| `T_STAND_2_TALK`    | Stanie → poza rozmowy                     |
| `T_TALK_2_STAND`    | Poza rozmowy → stanie                     |
| `T_YES`             | Kiwnięcie głową (tak)                     |
| `T_DONTKNOW`        | Gest „nie wiem"                           |
| `T_WATCHFIGHT_OHNO` | Reakcja obserwatora walki - zdenerwowanie |
| `T_WATCHFIGHT_YEAH` | Reakcja obserwatora walki - radość        |

### Akcje cielesne / prace

| Animacja            | Opis                                 |
| ------------------- | ------------------------------------ |
| `T_STAND_2_PEE`     | Stanie → oddawanie moczu             |
| `T_PEE_2_STAND`     | Oddawanie moczu → stanie             |
| `T_STAND_2_WASH`    | Stanie → mycie/pranie                |
| `T_WASH_2_STAND`    | Mycie → stanie                       |
| `T_PLUNDER`         | Przeszukiwanie / zbieranie           |
| `T_SEARCH`          | Szukanie czegoś                      |
| `T_1HSFREE`         | Ćwiczenie walki mieczem jednoręcznym |
| `T_REPAIR_RANDOM_1` | Losowa animacja naprawy              |

### Magia / ćwiczenia

| Animacja           | Opis                                       |
| ------------------ | ------------------------------------------ |
| `T_PRACTICEMAGIC`  | Ćwiczenie magii - wariant 1                |
| `T_PRACTICEMAGIC2` | Ćwiczenie magii - wariant 2                |
| `T_PRACTICEMAGIC3` | Ćwiczenie magii - wariant 3                |
| `T_PRACTICEMAGIC4` | Ćwiczenie magii - wariant 4                |
| `T_PRACTICEMAGIC5` | Ćwiczenie magii - wariant 5 (rytuał kręgu) |

### Reakcje na trafienie / walka

| Animacja              | Opis                                |
| --------------------- | ----------------------------------- |
| `T_MAGRUN_2_HEASHOOT` | Bieg → trafienie w głowę (padanie)  |
| `T_HEASHOOT_2_STAND`  | Trafienie w głowę → wstanie         |
| `T_DEAD`              | Śmierć (upadek)                     |
| `T_RISE`              | Wstanie z martwych                  |
| `T_DOWN`              | Upadek na ziemię                    |
| `T_WARN`              | Ostrzeżenie / zagrożenie (potwory)  |
| `T_PERCEPTION`        | Percepcja / nasłuchiwanie (potwory) |

### Ofiary zaklęć

| Animacja                          | Zaklęcie                    |
| --------------------------------- | --------------------------- |
| `T_STAND_2_LIGHTNING_VICTIM`      | Porażenie piorunem          |
| `T_STAND_2_SUCKENERGY_VICTIM`     | Wysysanie energii           |
| `T_STAND_2_FREEZE_VICTIM`         | Zamrożenie                  |
| `T_STAND_2_GREENTENTACLEA_VICTIM` | Zielone macki - wariant A   |
| `T_STAND_2_GREENTENTACLEB_VICTIM` | Zielone macki - wariant B   |
| `T_STAND_2_GREENTENTACLEC_VICTIM` | Zielone macki - wariant C   |
| `T_STAND_2_INFLATE_VICTIM`        | Nadmuchanie                 |
| `T_STAND_2_WHIRLWIND_VICTIM`      | Wir powietrzny              |
| `T_STAND_2_SWARM_VICTIM`          | Atak roju                   |
| `T_STAND_2_VICTIM_SLE`            | Magiczny sen                |
| `T_VICTIM_SLE_2_STAND`            | Magiczny sen → przebudzenie |
| `T_STAND_2_FEAR_VICTIM1`          | Magiczny strach - wariant 1 |
| `T_STAND_2_FEAR_VICTIM2`          | Magiczny strach - wariant 2 |
| `T_STAND_2_FEAR_VICTIM3`          | Magiczny strach - wariant 3 |

---

## Animacje stanu (S\_)

Zapętlone animacje utrzymujące NPC w danym stanie.

| Animacja        | Opis                                   |
| --------------- | -------------------------------------- |
| `S_EAT`         | Jedzenie z ziemi (potwory - zapętlone) |
| `S_FIRE_VICTIM` | Płonięcie (ofiara ognia)               |

---

## Animacje losowe (R\_)

Odtwarzane losowo jako idle - dodają życia NPC i potworom.

### Potwory

| Animacja  | Opis                                                    |
| --------- | ------------------------------------------------------- |
| `R_ROAM1` | Losowe poruszenie - wariant 1 (rozglądanie, ruch głową) |
| `R_ROAM2` | Losowe poruszenie - wariant 2                           |
| `R_ROAM3` | Losowe poruszenie - wariant 3                           |

### Ludzie - stanie

| Animacja        | Opis                   |
| --------------- | ---------------------- |
| `R_SCRATCHHEAD` | Drapanie się po głowie |

### Ludzie - siedzenie

| Animacja           | Opis                                           |
| ------------------ | ---------------------------------------------- |
| `R_CHAIR_RANDOM_1` | Losowe poruszenie na krześle/ławce - wariant 1 |
| `R_CHAIR_RANDOM_2` | Losowe poruszenie na krześle/ławce - wariant 2 |
| `R_CHAIR_RANDOM_3` | Losowe poruszenie na krześle/ławce - wariant 3 |
| `R_CHAIR_RANDOM_4` | Losowe poruszenie na krześle/ławce - wariant 4 |

---

## Animacje twarzy

Mimika NPC odtwarzana za pomocą `Mdl_StartFaceAni`:

| Animacja    | Opis                   |
| ----------- | ---------------------- |
| `S_ANGRY`   | Zły wyraz twarzy       |
| `S_NEUTRAL` | Neutralny wyraz twarzy |

:::info
Animacje twarzy przyjmują parametr intensywności (0.0–1.0) i czasu trwania w milisekundach. Wartość `-1` oznacza nieskończony czas - animacja utrzymuje się aż do ręcznego usunięcia lub zmiany stanu.
:::
