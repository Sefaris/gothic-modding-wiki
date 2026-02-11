---
sidebar_position: 1
title: "Rutyny dzienne (TA_)"
description: "Kompletna lista funkcji TA_ - rutyn dziennych NPC w Gothic II. Opis systemu planów dnia, parametrów i przykłady użycia."
---

# Rutyny dzienne (TA\_)

Rutyny dzienne to funkcje Daedalusa zaczynające się od prefiksu `TA_` (niem. _Tagesablauf_ - plan dnia). Definiują one **co NPC robi w danym przedziale czasowym** - gdzie idzie, jaką czynność wykonuje i jak długo.

Wszystkie funkcje `TA_` są zdefiniowane w pliku `Content/AI/Human/TA.d`, a odpowiadające im stany `ZS_` w katalogu `Content/AI/Human/TA_Human/`.

## Jak działa system rutyn

Każda funkcja `TA_` jest wrapperem wokół funkcji silnika `TA_Min`, która rejestruje aktywność NPC w danym przedziale czasu:

```daedalus
func void TA_Sleep(var int start_h, var int start_m, var int stop_h, var int stop_m, var string waypoint)
{
    TA_Min(self, start_h, start_m, stop_h, stop_m, "ZS_GotoBed", waypoint);
};
```

### Parametry

Wszystkie funkcje `TA_` mają identyczną sygnaturę:

| Parametr   | Typ      | Opis                                                      |
| ---------- | -------- | --------------------------------------------------------- |
| `start_h`  | `int`    | Godzina rozpoczęcia (format 24h)                          |
| `start_m`  | `int`    | Minuta rozpoczęcia                                        |
| `stop_h`   | `int`    | Godzina zakończenia                                       |
| `stop_m`   | `int`    | Minuta zakończenia                                        |
| `waypoint` | `string` | Nazwa waypointu (`WP_`) lub freepointu (`FP_`) docelowego |

### Funkcje Rtn\_ (harmonogram dnia)

Rutyny przypisuje się do NPC za pomocą zmiennej `daily_routine` wskazującej na funkcję `Rtn_`:

```daedalus
instance Kowal(Npc_Default)
{
    name        = "Kowal";
    // ...
    daily_routine = Rtn_Start_Kowal;
};

func void Rtn_Start_Kowal()
{
    TA_Smith_Anvil  (08,00, 12,00, "FORGE_KOWAL");
    TA_Stand_Eating (12,00, 13,00, "FP_KOWAL_EAT");
    TA_Smith_Anvil  (13,00, 18,00, "FORGE_KOWAL");
    TA_Smalltalk    (18,00, 20,00, "FP_KOWAL_TALK");
    TA_Sleep        (20,00, 08,00, "BED_KOWAL");
};
```

:::tip
Harmonogram dnia powinien **pokrywać pełne 24 godziny** bez przerw. Jeżeli godzina zakończenia jednej rutyny nie pokrywa się z godziną rozpoczęcia następnej, NPC będzie stał bezczynnie.
:::

:::warning
Godzina zakończenia jednego bloku musi być równa godzinie rozpoczęcia kolejnego. Bloki **nie mogą się nakładać**.
:::

### Stany ZS\_ (Zustand)

Każda rutyna `TA_` odwołuje się do stanu `ZS_` (_Zustand_ - stan), który składa się z trzech funkcji:

1. **`ZS_<Nazwa>()`** - **Inicjalizacja**: NPC idzie do waypointu, przygotowuje przedmioty, ustawia percepcję.
2. **`ZS_<Nazwa>_Loop()`** - **Pętla**: Powtarzane zachowanie (animacje, interakcje z mobami). Zwraca `LOOP_CONTINUE`.
3. **`ZS_<Nazwa>_End()`** - **Zakończenie**: Sprzątanie po zakończeniu bloku czasowego.

### Waypointy i freepointy

- **WP\_ (Waypoint)** - stały, nazwany punkt w świecie gry. NPC podchodzi dokładnie do tego punktu.
- **FP\_ (Freepoint)** - elastyczny punkt w pobliżu waypointu. Wiele stanów `ZS_` samo wyszukuje wolne freepointy w okolicy (np. `Wld_IsFPAvailable(self, "STAND")`).
- **Moby** - interaktywne obiekty świata (np. kowadło, łóżko, ławka), z którymi NPC wchodzi w interakcję za pomocą `AI_UseMob()`.

---

## Lista rutyn ludzi

### Stanie / bezczynność

| Funkcja                  | Stan ZS\_                | FP / Mob     | Opis                                                                                                       |
| ------------------------ | ------------------------ | ------------ | ---------------------------------------------------------------------------------------------------------- |
| `TA_Stand_ArmsCrossed`   | `ZS_Stand_ArmsCrossed`   | FP `"STAND"` | Stoi ze skrzyżowanymi rękami. Losowe animacje: drapanie, przeciąganie, zmiana nogi.                        |
| `TA_Stand_WP`            | `ZS_Stand_WP`            | - (waypoint) | Stoi bezczynnie **dokładnie** przy waypoincie (bez szukania FP). Poza ze skrzyżowanymi rękami + idle.      |
| `TA_Stand_Guarding`      | `ZS_Stand_Guarding`      | FP `"STAND"` | Stoi na warcie - ręce na biodrach, losowo rozgląda się.                                                    |
| `TA_Stand_Sweeping`      | `ZS_Stand_Sweeping`      | FP `"SWEEP"` | Stoi i zamiata miotłą. Tworzy `ItMi_Broom` jeśli nie posiada.                                              |
| `TA_Stand_Dementor`      | `ZS_Stand_Dementor`      | FP `"STAND"` | Poza dementora (szukacza). Niestandardowa percepcja - wyczuwa jak potwór.                                  |
| `TA_Stand_RangerMeeting` | `ZS_Stand_RangerMeeting` | FP `"STAND"` | Spotkanie rangersów. Minimalna percepcja. Lares stoi w pozie strażnika, pozostali ze skrzyżowanymi rękami. |

### Picie

| Funkcja             | Stan ZS\_           | FP / Mob     | Opis                                                                                           |
| ------------------- | ------------------- | ------------ | ---------------------------------------------------------------------------------------------- |
| `TA_Stand_Drinking` | `ZS_Stand_Drinking` | FP `"STAND"` | Stoi i pije alkohol (`ItFo_Booze`). Tworzy przedmiot jeśli nie posiada. Losowe animacje picia. |

### Jedzenie

| Funkcja           | Stan ZS\_         | FP / Mob     | Opis                                                                                                  |
| ----------------- | ----------------- | ------------ | ----------------------------------------------------------------------------------------------------- |
| `TA_Stand_Eating` | `ZS_Stand_Eating` | FP `"STAND"` | Stoi i je losowy posiłek (jabłko, ser, boczek lub baranina). Animacja dopasowana do rodzaju jedzenia. |

### Siedzenie

| Funkcja           | Stan ZS\_         | FP / Mob        | Opis                                                     |
| ----------------- | ----------------- | --------------- | -------------------------------------------------------- |
| `TA_Sit_Bench`    | `ZS_Sit_Bench`    | Mob `"BENCH"`   | Siada na ławce. Losowe animacje ciała na siedząco.       |
| `TA_Sit_Campfire` | `ZS_Sit_Campfire` | FP `"CAMPFIRE"` | Siada na ziemi przy ognisku (brak moba - korzysta z FP). |
| `TA_Sit_Chair`    | `ZS_Sit_Chair`    | Mob `"CHAIR"`   | Siada na krześle. Losowe animacje na siedząco.           |
| `TA_Sit_Throne`   | `ZS_Sit_Throne`   | Mob `"THRONE"`  | Siada na tronie.                                         |

### Spanie

| Funkcja         | Stan ZS\_       | FP / Mob        | Opis                                                                                                     |
| --------------- | --------------- | --------------- | -------------------------------------------------------------------------------------------------------- |
| `TA_Sleep`      | `ZS_GotoBed`    | Mob `"BEDHIGH"` | Idzie do łóżka i śpi. Ograniczona percepcja - reaguje na ciche dźwięki, obrażenia i rozmowę (budzi się). |
| `TA_Sleep_Deep` | `ZS_Sleep_Deep` | Mob `"BEDHIGH"` | Głęboki sen - **nie** reaguje na ciche dźwięki. Tylko obrażenia i rozmowa mogą obudzić.                  |

### Gotowanie

| Funkcja              | Stan ZS\_            | FP / Mob         | Opis                                                                       |
| -------------------- | -------------------- | ---------------- | -------------------------------------------------------------------------- |
| `TA_Cook_Cauldron`   | `ZS_Cook_Cauldron`   | Mob `"CAULDRON"` | Gotuje w kotle. Tworzy `ItMi_Scoop` (chochlę) jeśli nie posiada.           |
| `TA_Cook_Pan`        | `ZS_Cook_Pan`        | Mob `"PAN"`      | Gotuje na patelni. Tworzy surową baraninę; po zakończeniu zjada ugotowaną. |
| `TA_Cook_Stove`      | `ZS_Cook_Stove`      | Mob `"STOVE"`    | Gotuje na piecu. Tworzy surową baraninę jeśli nie posiada.                 |
| `TA_Roast_Scavenger` | `ZS_Roast_Scavenger` | Mob `"BARBQ"`    | Piecze ścierwojada na rożnie.                                              |

### Kowalstwo / rzemiosło

| Funkcja             | Stan ZS\_           | FP / Mob        | Opis                                                                           |
| ------------------- | ------------------- | --------------- | ------------------------------------------------------------------------------ |
| `TA_Smith_Anvil`    | `ZS_Smith_Anvil`    | Mob `"BSANVIL"` | Kuje na kowadle.                                                               |
| `TA_Smith_Cool`     | `ZS_Smith_Cool`     | Mob `"BSCOOL"`  | Chłodzi metal w korytku z wodą.                                                |
| `TA_Smith_Fire`     | `ZS_Smith_Fire`     | Mob `"BSFIRE"`  | Rozgrzewa metal przy ogniu kowalskim.                                          |
| `TA_Smith_Sharp`    | `ZS_Smith_Sharp`    | Mob `"BSSHARP"` | Ostrzy broń na kamieniu szlifierskim.                                          |
| `TA_Make_Rune`      | `ZS_Make_Rune`      | -               | Tworzy runy przy stole runowym.                                                |
| `TA_Potion_Alchemy` | `ZS_Potion_Alchemy` | Mob `"LAB"`     | Warzy mikstury przy stole alchemicznym. Tworzy `ItMi_Flask` jeśli nie posiada. |

### Praca fizyczna

| Funkcja         | Stan ZS\_       | FP / Mob          | Opis                                                                                     |
| --------------- | --------------- | ----------------- | ---------------------------------------------------------------------------------------- |
| `TA_Pick_FP`    | `ZS_Pick_FP`    | FP `"PICK"`       | Zbiera / kopie - porusza się między freepointami `PICK`, co 7s zmienia pozycję.          |
| `TA_Pick_Ore`   | `ZS_Pick_Ore`   | Mob `"ORE"`       | Wydobywa rudę. Tworzy i ekwipuje topór dwuręczny (`ItMw_2h_Axe_L_01`) jeśli nie posiada. |
| `TA_Repair_Hut` | `ZS_Repair_Hut` | Mob `"REPAIR"`    | Naprawia chatę - wbija gwoździe. Losowa animacja naprawy.                                |
| `TA_Sweep_FP`   | `ZS_Sweep_FP`   | FP `"SWEEP"`      | Szoruje szczotką (`ItMi_Brush`) przy freepoincie.                                        |
| `TA_Wash_FP`    | `ZS_Wash_FP`    | FP `"WASH"`       | Pierze / myje przy freepoincie. Animacja klęczenia przy myciu.                           |
| `TA_Rake_FP`    | `ZS_Rake_FP`    | FP `"PICK"`       | Grabi grabiami (`ItMi_Rake`) przy freepoincie.                                           |
| `TA_Saw`        | `ZS_Saw`        | Mob `"BAUMSAEGE"` | Piłuje drewno na pile.                                                                   |
| `TA_Stomp_Herb` | `ZS_Stomp_Herb` | Mob `"HERB"`      | Ugniatia zioła - przygotowanie alchemiczne.                                              |

### Nauka / pisanie

| Funkcja             | Stan ZS\_           | FP / Mob     | Opis                                                                                                |
| ------------------- | ------------------- | ------------ | --------------------------------------------------------------------------------------------------- |
| `TA_Read_Bookstand` | `ZS_Read_Bookstand` | Mob `"BOOK"` | Czyta przy pulpicie.                                                                                |
| `TA_Study_WP`       | `ZS_Study_WP`       | - (waypoint) | Studiuje przy waypoincie - stoi ze skrzyżowanymi rękami i czyta fałszywy zwój (`FakeScroll_Addon`). |

### Rozmowy / interakcje społeczne

| Funkcja        | Stan ZS\_      | FP / Mob         | Opis                                                                        |
| -------------- | -------------- | ---------------- | --------------------------------------------------------------------------- |
| `TA_Smalltalk` | `ZS_Smalltalk` | FP `"SMALLTALK"` | Stoi przy freepoincie i co ~8s rozmawia z pobliskim NPC w tym samym stanie. |

### Modlitwa

| Funkcja              | Stan ZS\_            | FP / Mob      | Opis                                                   |
| -------------------- | -------------------- | ------------- | ------------------------------------------------------ |
| `TA_Pray_Innos`      | `ZS_Pray_Innos`      | Mob `"INNOS"` | Modli się do Innosa przy ołtarzu (interakcja z mobem). |
| `TA_Pray_Innos_FP`   | `ZS_Pray_Innos_FP`   | FP `"PRAY"`   | Klęka i modli się do Innosa przy freepoincie.          |
| `TA_Pray_Sleeper`    | `ZS_Pray_Sleeper`    | Mob `"IDOL"`  | Modli się do Śniącego przy bożku (interakcja z mobem). |
| `TA_Pray_Sleeper_FP` | `ZS_Pray_Sleeper_FP` | FP `"PRAY"`   | Klęka i modli się do Śniącego przy freepoincie.        |

### Przemówienia

| Funkcja              | Stan ZS\_            | FP / Mob | Opis                                                                             |
| -------------------- | -------------------- | -------- | -------------------------------------------------------------------------------- |
| `TA_Preach_Vatras`   | `ZS_Preach_Vatras`   | -        | Wygłasza kazanie w stylu Vatrasa. Cykl 21 kazań, zmiana co ~13s.                 |
| `TA_Announce_Herold` | `ZS_Announce_Herold` | -        | Herold ogłasza wiadomości. Co ~70s przerywa pozę strażnika i wygłasza komunikat. |

### Poruszanie się

| Funkcja            | Stan ZS\_          | FP / Mob     | Opis                                                                                                          |
| ------------------ | ------------------ | ------------ | ------------------------------------------------------------------------------------------------------------- |
| `TA_RunToWP`       | `ZS_RunToWP`       | -            | **Biegnie** do waypointu, potem stoi w pozie strażnika i rozgląda się.                                        |
| `TA_FleeToWp`      | `ZS_FleeToWp`      | -            | **Ucieka** do waypointu (bieg + nakładka animacyjna `HUMANS_FLEE.MDS`).                                       |
| `TA_Follow_Player` | `ZS_Follow_Player` | -            | Podąża za graczem.                                                                                            |
| `TA_Guide_Player`  | `ZS_Guide_Player`  | -            | Prowadzi gracza do celu.                                                                                      |
| `TA_Guard_Passage` | `ZS_Guard_Passage` | -            | Pilnuje przejścia - blokuje drogę graczowi. Percepcja co 0.1s.                                                |
| `TA_Guard_Hammer`  | `ZS_Guard_Hammer`  | FP `"STAND"` | Stoi na warcie. Obsługuje questowy Święty Młot - odkłada go na miejsce jeśli jest blisko klasztornej komnaty. |
| `TA_Circle`        | `ZS_Circle`        | -            | Rytualne zaklęcie kręgu. Efekty zależne od gildi (dementor / KDW / mag).                                      |

### Muzyka / występy

| Funkcja        | Stan ZS\_      | FP / Mob     | Opis                                                                         |
| -------------- | -------------- | ------------ | ---------------------------------------------------------------------------- |
| `TA_Play_Lute` | `ZS_Play_Lute` | FP `"STAND"` | Gra na lutni. Tworzy `ItMi_Lute` jeśli nie posiada.                          |
| `TA_Concert`   | `ZS_Concert`   | -            | Koncert zespołu In Extremo. Każdy członek zespołu ekwipuje swój instrument.  |
| `TA_Dance`     | `ZS_Dance`     | -            | Tańczy losowy styl (9 wariantów: `T_DANCE_01` do `T_DANCE_09`).              |
| `TA_Spit_Fire` | `ZS_Spit_Fire` | FP `"STAND"` | Zieje ogniem (połykacz ognia). Tworzy `ItLsTorchFireSpit` jeśli nie posiada. |

### Trening

| Funkcja             | Stan ZS\_           | FP / Mob     | Opis                                                                                           |
| ------------------- | ------------------- | ------------ | ---------------------------------------------------------------------------------------------- |
| `TA_Practice_Magic` | `ZS_Practice_Magic` | FP `"STAND"` | Ćwiczy magię. Losowe animacje: `T_PRACTICEMAGIC` do `T_PRACTICEMAGIC4`, `R_SCRATCHHEAD`.       |
| `TA_Practice_Sword` | `ZS_Practice_Sword` | -            | Ćwiczy walkę mieczem. Ekwipuje najlepszą broń białą; jeśli nie ma - tworzy `ItMw_1h_Bau_Mace`. |

### Palenie

| Funkcja              | Stan ZS\_            | FP / Mob      | Opis                                                                 |
| -------------------- | -------------------- | ------------- | -------------------------------------------------------------------- |
| `TA_Smoke_Joint`     | `ZS_Smoke_Joint`     | FP `"STAND"`  | Pali skręta (bagienne ziele). Tworzy `ItMi_Joint` jeśli nie posiada. |
| `TA_Smoke_Waterpipe` | `ZS_Smoke_Waterpipe` | Mob `"SMOKE"` | Pali fajkę wodną.                                                    |

### Inne

| Funkcja         | Stan ZS\_       | FP / Mob       | Opis                                                                     |
| --------------- | --------------- | -------------- | ------------------------------------------------------------------------ |
| `TA_Pee`        | `ZS_Pee`        | FP `"PEE"`     | Załatwia potrzebę.                                                       |
| `TA_Ghost`      | `ZS_Ghost`      | -              | Zachowanie ducha - niestandardowa percepcja (tylko rozmowa i obrażenia). |
| `TA_GhostWusel` | `ZS_GhostWusel` | FP `"FP_ROAM"` | Duch wędrujący między freepointami.                                      |

---

## Rutyny potworów

Potwory korzystają z prostszych rutyn zarządzanych przez centralny scheduler `ZS_MM_AllScheduler`, który na podstawie pory dnia kieruje potwora do odpowiedniego stanu.

| Funkcja           | Stan ZS\_         | FP          | Opis                                                                                              |
| ----------------- | ----------------- | ----------- | ------------------------------------------------------------------------------------------------- |
| `TA_Roam`         | `ZS_MM_Rtn_Roam`  | `"FP_ROAM"` | Potwór wędruje między freepointami `FP_ROAM`. Losowy czas oczekiwania (0–5s) w każdym punkcie.    |
| `TA_Rest`         | `ZS_MM_Rtn_Rest`  | `"FP_ROAM"` | Potwór odpoczywa - stoi w miejscu z losowymi animacjami idle.                                     |
| `TA_SleepMonster` | `ZS_MM_Rtn_Sleep` | `"FP_ROAM"` | Potwór śpi (kładzie się). Ograniczona percepcja - ciche dźwięki wrogich gildii budzą go do walki. |
| `TA_Wusel`        | `ZS_MM_Rtn_Wusel` | `"FP_ROAM"` | Potwór **biegiem** kręci się niespokojnie między freepointami (co 1s zmienia punkt).              |

### Specjalne rutyny potworów

| Funkcja                 | Stan ZS\_               | Opis                                                                                       |
| ----------------------- | ----------------------- | ------------------------------------------------------------------------------------------ |
| `TA_MM_Rtn_EatGround`   | `ZS_MM_Rtn_EatGround`   | Potwór je z ziemi - losowe animacje podnoszenia głowy podczas jedzenia.                    |
| `TA_MM_Rtn_DragonRest`  | `ZS_MM_Rtn_DragonRest`  | Smok odpoczywa - **regeneruje HP** (1 HP co 2 ticki) jeśli jest smokiem.                   |
| `TA_MM_Rtn_FollowSheep` | `ZS_MM_Rtn_FollowSheep` | Owca (lub zwierzę) podąża za bohaterem, jeśli jest członkiem drużyny.                      |
| `TA_MM_Rtn_OrcSit`      | `ZS_MM_Rtn_OrcSit`      | Ork siedzi przy ognisku (FP `"FP_CAMPFIRE"`) w pozie snu strażnika.                        |
| `TA_MM_Rtn_Summoned`    | `ZS_MM_Rtn_Summoned`    | Istota przyzwana - podąża za bohaterem, ma ograniczony czas życia (`MONSTER_SUMMON_TIME`). |

---

## Moby - spis obiektów interaktywnych

Rutyny korzystające z mobów wymagają, aby odpowiedni obiekt interaktywny znajdował się w pobliżu waypointu.

| Nazwa moba  | Używany przez               |
| ----------- | --------------------------- |
| `BSANVIL`   | `TA_Smith_Anvil`            |
| `BSCOOL`    | `TA_Smith_Cool`             |
| `BSFIRE`    | `TA_Smith_Fire`             |
| `BSSHARP`   | `TA_Smith_Sharp`            |
| `BARBQ`     | `TA_Roast_Scavenger`        |
| `BAUMSAEGE` | `TA_Saw`                    |
| `BEDHIGH`   | `TA_Sleep`, `TA_Sleep_Deep` |
| `BENCH`     | `TA_Sit_Bench`              |
| `BOOK`      | `TA_Read_Bookstand`         |
| `CAULDRON`  | `TA_Cook_Cauldron`          |
| `CHAIR`     | `TA_Sit_Chair`              |
| `HERB`      | `TA_Stomp_Herb`             |
| `IDOL`      | `TA_Pray_Sleeper`           |
| `INNOS`     | `TA_Pray_Innos`             |
| `LAB`       | `TA_Potion_Alchemy`         |
| `ORE`       | `TA_Pick_Ore`               |
| `PAN`       | `TA_Cook_Pan`               |
| `REPAIR`    | `TA_Repair_Hut`             |
| `SMOKE`     | `TA_Smoke_Waterpipe`        |
| `STOVE`     | `TA_Cook_Stove`             |
| `THRONE`    | `TA_Sit_Throne`             |

## Freepointy - spis typów

| Typ FP        | Używany przez                                                                                                                                                                   |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `CAMPFIRE`    | `TA_Sit_Campfire`                                                                                                                                                               |
| `FP_CAMPFIRE` | `TA_MM_Rtn_OrcSit`                                                                                                                                                              |
| `FP_ROAM`     | `TA_GhostWusel`, `TA_Roam`, `TA_Rest`, `TA_SleepMonster`, `TA_Wusel` i inne rutyny potworów                                                                                     |
| `PEE`         | `TA_Pee`                                                                                                                                                                        |
| `PICK`        | `TA_Pick_FP`, `TA_Rake_FP`                                                                                                                                                      |
| `PRAY`        | `TA_Pray_Innos_FP`, `TA_Pray_Sleeper_FP`                                                                                                                                        |
| `SMALLTALK`   | `TA_Smalltalk`                                                                                                                                                                  |
| `STAND`       | `TA_Stand_ArmsCrossed`, `TA_Stand_Guarding`, `TA_Stand_Drinking`, `TA_Stand_Eating`, `TA_Stand_Dementor`, `TA_Play_Lute`, `TA_Practice_Magic`, `TA_Smoke_Joint`, `TA_Spit_Fire` |
| `SWEEP`       | `TA_Stand_Sweeping`, `TA_Sweep_FP`                                                                                                                                              |
| `WASH`        | `TA_Wash_FP`                                                                                                                                                                    |

---

## Przykład kompletnego planu dnia

```daedalus
// Kowal miejski - pełny dzień
func void Rtn_Start_CitySmith()
{
    TA_Sleep           (22,00, 06,00, "BED_SMITH_01");
    TA_Stand_Eating    (06,00, 07,00, "FP_SMITH_EAT");
    TA_Smith_Fire      (07,00, 08,00, "FORGE_SMITH_01");
    TA_Smith_Anvil     (08,00, 12,00, "FORGE_SMITH_01");
    TA_Smith_Cool      (12,00, 12,30, "FORGE_SMITH_01");
    TA_Stand_Eating    (12,30, 13,00, "FP_SMITH_EAT");
    TA_Smith_Anvil     (13,00, 17,00, "FORGE_SMITH_01");
    TA_Smith_Sharp     (17,00, 18,00, "FORGE_SMITH_01");
    TA_Smalltalk       (18,00, 20,00, "FP_SMITH_TALK");
    TA_Stand_Drinking  (20,00, 22,00, "FP_TAVERN_SMITH");
};
```

:::info
Funkcje `TA_` wywoływane w funkcji `Rtn_` nie muszą być w kolejności chronologicznej - silnik sam sortuje bloki czasowe. Jednak dla czytelności kodu zalecane jest zachowanie porządku.
:::

## Zmiana rutyny w trakcie gry

Możesz dynamicznie zmienić plan dnia NPC za pomocą `Npc_ExchangeRoutine`:

```daedalus
// Zmienia rutynę NPC na nowy harmonogram
Npc_ExchangeRoutine(self, "NIGHT_GUARD");
```

Wymaga to zdefiniowania odpowiedniej funkcji `Rtn_NightGuard_<NPC_ID>()`.

Aby cofnąć zmianę rutyny:

```daedalus
// Przywraca domyślny plan dnia
Npc_ExchangeRoutine(self, "START");
```
