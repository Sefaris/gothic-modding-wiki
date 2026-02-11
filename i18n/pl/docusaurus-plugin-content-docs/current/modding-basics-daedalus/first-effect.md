---
sidebar_position: 5
title: "Mój pierwszy efekt"
description: "Tworzenie pierwszego efektu cząsteczkowego (PFX) w Gothic."
---

# Mój pierwszy efekt

W tym poradniku nauczysz się tworzyć efekty cząsteczkowe (Particle Effects, PFX) — od prostego dymu, przez ogień, po deszcz i śnieg.

## Jak działają efekty cząsteczkowe?

System PFX w Gothic emituje **cząsteczki** (małe sprite'y z teksturą) z **emitera** o określonym kształcie. Każda cząsteczka ma swój kierunek, prędkość, czas życia i wygląd.

Efekty definiowane są jako instancje klasy `C_ParticleFX` w plikach w katalogu `System/PFX/`:

| Plik              | Opis                                                  |
| ----------------- | ----------------------------------------------------- |
| `PfxInst.d`       | Efekty ogólne (ogień, dym, iskry, woda, pogoda)       |
| `PfxInstEngine.d` | Efekty wymagane przez silnik (krew, kurz, plusk wody) |
| `PfxInstMagic.d`  | Efekty magiczne (zaklęcia, runy, aury)                |

## Klasa C_ParticleFX — przegląd

Klasa ma 49 pól podzielonych na 7 kategorii. Nie musisz ustawiać wszystkich — pola, których nie ustawisz, przyjmą wartości domyślne (zazwyczaj 0 lub pusty string).

### 1. Emisja — ile cząsteczek i kiedy

| Pole               | Typ      | Opis                                           |
| ------------------ | -------- | ---------------------------------------------- |
| `ppsValue`         | `float`  | Bazowa liczba cząsteczek na sekundę            |
| `ppsScaleKeys_S`   | `string` | Mnożniki rozłożone w czasie, np. `"1 2 3"`     |
| `ppsIsLooping`     | `int`    | `1` = zapętlone, `0` = jednorazowe             |
| `ppsIsSmooth`      | `int`    | `1` = płynna interpolacja między kluczami      |
| `ppsFPS`           | `float`  | Prędkość odtwarzania kluczy (klatki/s)         |
| `ppsCreateEm_S`    | `string` | Nazwa efektu potomnego (spawny per cząsteczka) |
| `ppsCreateEmDelay` | `float`  | Opóźnienie efektu potomnego                    |

### 2. Kształt emitera — skąd lecą cząsteczki

| Pole               | Typ      | Opis                                                                    |
| ------------------ | -------- | ----------------------------------------------------------------------- |
| `shpType_S`        | `string` | Kształt: `"POINT"`, `"LINE"`, `"BOX"`, `"CIRCLE"`, `"SPHERE"`, `"MESH"` |
| `shpFOR_S`         | `string` | Układ odniesienia: `"OBJECT"` lub `"WORLD"`                             |
| `shpOffsetVec_S`   | `string` | Przesunięcie: `"X Y Z"`                                                 |
| `shpDistribType_S` | `string` | Rozkład: `"RAND"`, `"UNIFORM"`, `"WALK"`, `"DIR"`                       |
| `shpIsVolume`      | `int`    | `1` = emisja z objętości, `0` = z powierzchni                           |
| `shpDim_S`         | `string` | Wymiary (zależne od kształtu)                                           |
| `shpMesh_S`        | `string` | Mesh emitera (gdy `shpType_S = "MESH"`)                                 |
| `shpMeshRender_B`  | `int`    | `1` = renderuj mesh emitera                                             |

### 3. Kierunek i prędkość

| Pole              | Typ      | Opis                                                         |
| ----------------- | -------- | ------------------------------------------------------------ |
| `dirMode_S`       | `string` | Tryb: `"DIR"`, `"TARGET"`, `"MESH_POLY"`, `"RAND"`, `"NONE"` |
| `dirFOR_S`        | `string` | Układ odniesienia kierunku                                   |
| `dirAngleHead`    | `float`  | Kąt obrotu poziomego (°)                                     |
| `dirAngleHeadVar` | `float`  | Wariancja kąta (±°)                                          |
| `dirAngleElev`    | `float`  | Kąt elewacji (°); `90` = w górę, `-90` = w dół               |
| `dirAngleElevVar` | `float`  | Wariancja elewacji (±°)                                      |
| `velAvg`          | `float`  | Średnia prędkość początkowa                                  |
| `velVar`          | `float`  | Wariancja prędkości (±)                                      |

### 4. Czas życia cząsteczek

| Pole         | Typ     | Opis                        |
| ------------ | ------- | --------------------------- |
| `lspPartAvg` | `float` | Średni czas życia (ms)      |
| `lspPartVar` | `float` | Wariancja czasu życia (±ms) |

### 5. Zachowanie w locie

| Pole           | Typ      | Opis                                                     |
| -------------- | -------- | -------------------------------------------------------- |
| `flyGravity_S` | `string` | Wektor grawitacji: `"X Y Z"`                             |
| `flyCollDet_B` | `int`    | `0` = brak kolizji, `1` = kolizje, `3` = kolizje + ślady |

### 6. Wizualizacja

| Pole                 | Typ      | Opis                                               |
| -------------------- | -------- | -------------------------------------------------- |
| `visName_S`          | `string` | Tekstura (`.TGA`) lub model (`.3DS`)               |
| `visOrientation_S`   | `string` | Billboard: `"NONE"`, `"VELO"`, `"VELO3D"`, `"VOB"` |
| `visTexIsQuadPoly`   | `int`    | `0` = trójkąt, `1` = kwadrat                       |
| `visTexAniFPS`       | `float`  | FPS animacji tekstury                              |
| `visTexAniIsLooping` | `int`    | `0` = raz, `1` = pętla, `2` = ping-pong            |
| `visTexColorStart_S` | `string` | Kolor początkowy: `"R G B"` (0–255)                |
| `visTexColorEnd_S`   | `string` | Kolor końcowy (interpolacja w czasie życia)        |
| `visSizeStart_S`     | `string` | Rozmiar początkowy: `"W H"`                        |
| `visSizeEndScale`    | `float`  | Mnożnik rozmiaru końcowego                         |
| `visAlphaFunc_S`     | `string` | Blending: `"BLEND"`, `"ADD"`, `"MUL"`              |
| `visAlphaStart`      | `float`  | Przezroczystość początkowa (0–255)                 |
| `visAlphaEnd`        | `float`  | Przezroczystość końcowa (0–255)                    |

### 7. Efekty dodatkowe

| Pole              | Typ      | Opis                                                 |
| ----------------- | -------- | ---------------------------------------------------- |
| `trlFadeSpeed`    | `float`  | Prędkość zanikania śladu (trail)                     |
| `trlTexture_S`    | `string` | Tekstura śladu                                       |
| `trlWidth`        | `float`  | Szerokość śladu                                      |
| `mrkFadeSpeed`    | `float`  | Prędkość zanikania odcisku (mark)                    |
| `mrkTexture_S`    | `string` | Tekstura odcisku                                     |
| `mrkSize`         | `float`  | Rozmiar odcisku                                      |
| `flockMode`       | `string` | Tryb stadny: `"WIND"`                                |
| `flockStrength`   | `float`  | Siła efektu stadnego                                 |
| `useEmittersFOR`  | `int`    | `1` = cząsteczki podążają za emiterem                |
| `timeStartEnd_S`  | `string` | Okno czasowe renderowania: `"8 22"` (8:00–22:00)     |
| `m_bIsAmbientPFX` | `int`    | `1` = efekt ambientowy (można wyłączyć w gothic.ini) |

---

## Przykład 1: Prosty dym

Zacznijmy od czegoś prostego — słup dymu unoszący się w górę:

```daedalus
instance PFX_MojDym (C_ParticleFX)
{
    // --- Emisja: 30 cząsteczek/s, ciągłe ---
    ppsValue        = 30;
    ppsScaleKeys_S  = "1";
    ppsIsLooping    = 1;

    // --- Kształt: punkt ---
    shpType_S       = "POINT";
    shpFOR_S        = "OBJECT";

    // --- Kierunek: w górę z losowym odchyleniem ---
    dirMode_S       = "DIR";
    dirFOR_S        = "OBJECT";
    dirAngleElev    = 90;
    dirAngleElevVar = 15;
    dirAngleHeadVar = 180;
    velAvg          = 0.02;
    velVar          = 0.01;

    // --- Czas życia: 2–3 sekundy ---
    lspPartAvg      = 2500;
    lspPartVar      = 500;

    // --- Brak grawitacji (dym unosi się) ---
    flyGravity_S    = "0 0.0001 0";

    // --- Wygląd ---
    visName_S           = "SMOKE1.TGA";
    visOrientation_S    = "NONE";
    visTexColorStart_S  = "150 150 150";
    visTexColorEnd_S    = "80 80 80";
    visSizeStart_S      = "10 10";
    visSizeEndScale     = 5;
    visAlphaFunc_S      = "BLEND";
    visAlphaStart       = 180;
    visAlphaEnd         = 0;
};
```

| Pole                 | Wartość         | Opis                              |
| -------------------- | --------------- | --------------------------------- |
| `ppsValue`           | `30`            | 30 cząsteczek na sekundę          |
| `ppsScaleKeys_S`     | `"1"`           | Stała emisja (bez skalowania)      |
| `ppsIsLooping`       | `1`             | Ciągła emisja                      |
| `shpType_S`          | `"POINT"`       | Emisja z pojedynczego punktu      |
| `shpFOR_S`           | `"OBJECT"`      | Względem obiektu emitera           |
| `dirMode_S`          | `"DIR"`         | Emisja kierunkowa                 |
| `dirFOR_S`           | `"OBJECT"`      | Kierunek względem obiektu          |
| `dirAngleElev`       | `90`            | Kierunek w górę                   |
| `dirAngleElevVar`    | `15`            | ±15° losowe odchylenie             |
| `dirAngleHeadVar`    | `180`           | Pełny rozrzut 360° na boki         |
| `velAvg`             | `0.02`          | Powolna prędkość                   |
| `velVar`             | `0.01`          | Lekka wariancja prędkości          |
| `lspPartAvg`         | `2500`          | Średni czas życia 2,5 sekundy      |
| `lspPartVar`         | `500`           | ±0,5s wariancja czasu życia        |
| `flyGravity_S`       | `"0 0.0001 0"`  | Lekko w górę (dym unosi się)      |
| `visName_S`          | `"SMOKE1.TGA"`  | Tekstura dymu                     |
| `visOrientation_S`   | `"NONE"`        | Billboard skierowany do kamery    |
| `visTexColorStart_S` | `"150 150 150"` | Szary przy powstaniu              |
| `visTexColorEnd_S`   | `"80 80 80"`    | Ciemniejszy z czasem              |
| `visSizeStart_S`     | `"10 10"`       | Rozmiar początkowy 10×10            |
| `visSizeEndScale`    | `5`             | Rośnie 5×                           |
| `visAlphaFunc_S`     | `"BLEND"`       | Zwykłe przenikanie                 |
| `visAlphaStart`      | `180`           | Półprzezroczyste przy powstaniu    |
| `visAlphaEnd`        | `0`             | Zanika całkowicie                  |

:::tip
**`visAlphaFunc_S`** — tryby blendingu:

- `"BLEND"` — klasyczne przenikanie (dym, mgła, kurz)
- `"ADD"` — addytywne (ogień, iskry, magia — jasne, świecące)
- `"MUL"` — multiplikatywne (cienie, przyciemnianie)
  :::

## Przykład 2: Ognisko

Ogień to połączenie szybkiej emisji, addytywnego blendingu i animowanej tekstury:

```daedalus
instance PFX_MojOgien (C_ParticleFX)
{
    // --- Emisja: dużo cząsteczek, ciągłe ---
    ppsValue        = 80;
    ppsScaleKeys_S  = "1";
    ppsIsLooping    = 1;

    // --- Kształt: koło (baza ogniska) ---
    shpType_S       = "CIRCLE";
    shpFOR_S        = "OBJECT";
    shpIsVolume     = 1;
    shpDim_S        = "15";

    // --- Kierunek: w górę ---
    dirMode_S       = "DIR";
    dirFOR_S        = "OBJECT";
    dirAngleElev    = 90;
    dirAngleElevVar = 20;
    dirAngleHeadVar = 180;
    velAvg          = 0.05;
    velVar          = 0.02;

    // --- Czas życia: krótki (szybki ogień) ---
    lspPartAvg      = 800;
    lspPartVar      = 200;

    // --- Lekka grawitacja w górę (gorące powietrze) ---
    flyGravity_S    = "0 0.0003 0";

    // --- Wygląd ---
    visName_S           = "FIREFLARE.TGA";
    visOrientation_S    = "NONE";
    visTexAniFPS        = 8;
    visTexAniIsLooping  = 1;
    visTexColorStart_S  = "255 255 255";
    visTexColorEnd_S    = "255 100 30";
    visSizeStart_S      = "5 5";
    visSizeEndScale     = 4;
    visAlphaFunc_S      = "ADD";
    visAlphaStart       = 255;
    visAlphaEnd         = 0;
};
```

| Pole                 | Wartość         | Opis                              |
| -------------------- | --------------- | --------------------------------- |
| `ppsValue`           | `80`            | 80 cząsteczek na sekundę          |
| `ppsScaleKeys_S`     | `"1"`           | Stała emisja                       |
| `ppsIsLooping`       | `1`             | Ciągła emisja                      |
| `shpType_S`          | `"CIRCLE"`      | Kołowy kształt emitera             |
| `shpFOR_S`           | `"OBJECT"`      | Względem obiektu emitera           |
| `shpIsVolume`        | `1`             | Emisja z całego dysku              |
| `shpDim_S`           | `"15"`          | Promień koła: 15 jednostek        |
| `dirMode_S`          | `"DIR"`         | Emisja kierunkowa                 |
| `dirFOR_S`           | `"OBJECT"`      | Kierunek względem obiektu          |
| `dirAngleElev`       | `90`            | Kierunek w górę                   |
| `dirAngleElevVar`    | `20`            | ±20° losowe odchylenie             |
| `dirAngleHeadVar`    | `180`           | Pełny rozrzut 360° na boki         |
| `velAvg`             | `0.05`          | Umiarkowana prędkość              |
| `velVar`             | `0.02`          | Wariancja prędkości               |
| `lspPartAvg`         | `800`           | Krótki czas życia (0,8s)            |
| `lspPartVar`         | `200`           | ±0,2s wariancja                    |
| `flyGravity_S`       | `"0 0.0003 0"`  | Lekkie ciągnięcie w górę           |
| `visName_S`          | `"FIREFLARE.TGA"` | Tekstura ognia                 |
| `visOrientation_S`   | `"NONE"`        | Billboard skierowany do kamery    |
| `visTexAniFPS`       | `8`             | Prędkość animacji tekstury        |
| `visTexAniIsLooping` | `1`             | Animacja zapętlona                |
| `visTexColorStart_S` | `"255 255 255"` | Biały (prześwietlony środek)       |
| `visTexColorEnd_S`   | `"255 100 30"`  | Pomarańczowy (krawędzie)           |
| `visSizeStart_S`     | `"5 5"`         | Rozmiar początkowy 5×5             |
| `visSizeEndScale`    | `4`             | Rośnie 4×                          |
| `visAlphaFunc_S`     | `"ADD"`         | Addytywne blending (świecące)      |
| `visAlphaStart`      | `255`           | W pełni widoczne przy powstaniu    |
| `visAlphaEnd`        | `0`             | Zanika całkowicie                  |

## Przykład 3: Iskry

Iskry to małe, szybkie cząsteczki z grawitacją i kolizjami:

```daedalus
instance PFX_MojeIskry (C_ParticleFX)
{
    // --- Emisja: jednorazowy wybuch ---
    ppsValue        = 50;
    ppsScaleKeys_S  = "1 0";
    ppsIsLooping    = 0;
    ppsFPS          = 2;

    // --- Kształt: punkt ---
    shpType_S       = "POINT";
    shpFOR_S        = "OBJECT";

    // --- Kierunek: rozbiegają się we wszystkie strony ---
    dirMode_S       = "DIR";
    dirFOR_S        = "OBJECT";
    dirAngleHeadVar = 180;
    dirAngleElev    = 45;
    dirAngleElevVar = 45;
    velAvg          = 0.15;
    velVar          = 0.08;

    // --- Czas życia: krótki ---
    lspPartAvg      = 600;
    lspPartVar      = 300;

    // --- Grawitacja ciągnie w dół ---
    flyGravity_S    = "0 -0.0005 0";
    flyCollDet_B    = 1;

    // --- Wygląd: małe, jaskrawe punkty ---
    visName_S           = "ZFLARE1.TGA";
    visOrientation_S    = "NONE";
    visTexColorStart_S  = "255 220 100";
    visTexColorEnd_S    = "255 80 20";
    visSizeStart_S      = "2 2";
    visSizeEndScale     = 0.5;
    visAlphaFunc_S      = "ADD";
    visAlphaStart       = 255;
    visAlphaEnd         = 0;
};
```

| Pole                 | Wartość         | Opis                              |
| -------------------- | --------------- | --------------------------------- |
| `ppsValue`           | `50`            | 50 cząsteczek w wybuchu           |
| `ppsScaleKeys_S`     | `"1 0"`         | Natychmiastowy wybuch, potem nic  |
| `ppsIsLooping`       | `0`             | Jednorazowe (bez pętli)           |
| `ppsFPS`             | `2`             | Prędkość odtwarzania kluczy       |
| `shpType_S`          | `"POINT"`       | Emisja z pojedynczego punktu      |
| `shpFOR_S`           | `"OBJECT"`      | Względem obiektu emitera           |
| `dirMode_S`          | `"DIR"`         | Emisja kierunkowa                 |
| `dirFOR_S`           | `"OBJECT"`      | Kierunek względem obiektu          |
| `dirAngleHeadVar`    | `180`           | Pełny rozrzut 360°                 |
| `dirAngleElev`       | `45`            | Lekko w górę                      |
| `dirAngleElevVar`    | `45`            | Duży rozrzut pionowy               |
| `velAvg`             | `0.15`          | Szybkie                           |
| `velVar`             | `0.08`          | Duża wariancja prędkości           |
| `lspPartAvg`         | `600`           | Krótki czas życia (0,6s)            |
| `lspPartVar`         | `300`           | ±0,3s wariancja                    |
| `flyGravity_S`       | `"0 -0.0005 0"` | Grawitacja ciągnie w dół            |
| `flyCollDet_B`       | `1`             | Kolizje z geometrią świata        |
| `visName_S`          | `"ZFLARE1.TGA"` | Tekstura małego błysku             |
| `visOrientation_S`   | `"NONE"`        | Billboard skierowany do kamery    |
| `visTexColorStart_S` | `"255 220 100"` | Żółty                              |
| `visTexColorEnd_S`   | `"255 80 20"`   | Ciemny pomarańcz                  |
| `visSizeStart_S`     | `"2 2"`         | Mały rozmiar 2×2                    |
| `visSizeEndScale`    | `0.5`           | Zmniejszają się do połowy          |
| `visAlphaFunc_S`     | `"ADD"`         | Addytywne blending (świecące)      |
| `visAlphaStart`      | `255`           | W pełni widoczne przy powstaniu    |
| `visAlphaEnd`        | `0`             | Zanikają całkowicie                |

## Przykład 4: Śnieg

Śnieg to duży emiter na dużej wysokości, wolno opadające cząsteczki:

```daedalus
instance PFX_MojSnieg (C_ParticleFX)
{
    // --- Emisja: ciągła ---
    ppsValue        = 50;
    ppsScaleKeys_S  = "1";
    ppsIsLooping    = 1;

    // --- Kształt: duży okrąg wysoko nad graczem ---
    shpType_S       = "CIRCLE";
    shpFOR_S        = "OBJECT";
    shpOffsetVec_S  = "0 500 0";
    shpIsVolume     = 1;
    shpDim_S        = "300";

    // --- Kierunek: w dół ---
    dirMode_S       = "DIR";
    dirFOR_S        = "OBJECT";
    dirAngleHead    = 20;
    dirAngleHeadVar = 10;
    dirAngleElev    = -89;
    velAvg          = 0.05;
    velVar          = 0.02;

    // --- Czas życia: długi ---
    lspPartAvg      = 5000;

    // --- Brak grawitacji (stała prędkość opadania) ---
    flyGravity_S    = "0 0 0";

    // --- Wygląd: białe płatki ---
    visName_S           = "MFX_SLEEP_STAR.TGA";
    visOrientation_S    = "NONE";
    visTexColorStart_S  = "255 255 255";
    visTexColorEnd_S    = "255 255 255";
    visSizeStart_S      = "5 5";
    visSizeEndScale     = 1;
    visAlphaFunc_S      = "ADD";
    visAlphaStart       = 255;
    visAlphaEnd         = 255;

    // --- Efekt ambientowy (gracz może wyłączyć w opcjach) ---
    m_bIsAmbientPFX     = 1;
};
```

| Pole                 | Wartość                  | Opis                                      |
| -------------------- | ------------------------ | ----------------------------------------- |
| `ppsValue`           | `50`                     | 50 cząsteczek na sekundę                  |
| `ppsScaleKeys_S`     | `"1"`                    | Stała emisja                               |
| `ppsIsLooping`       | `1`                      | Ciągła emisja                              |
| `shpType_S`          | `"CIRCLE"`               | Kołowy kształt emitera                     |
| `shpFOR_S`           | `"OBJECT"`               | Względem obiektu emitera                   |
| `shpOffsetVec_S`     | `"0 500 0"`              | 500 jednostek nad emiterem                |
| `shpIsVolume`        | `1`                      | Emisja z całego dysku                      |
| `shpDim_S`           | `"300"`                  | Promień okręgu: 300 jednostek             |
| `dirMode_S`          | `"DIR"`                  | Emisja kierunkowa                         |
| `dirFOR_S`           | `"OBJECT"`               | Kierunek względem obiektu                  |
| `dirAngleHead`       | `20`                     | Lekki wiatr boczny                        |
| `dirAngleHeadVar`    | `10`                     | ±10° wariancja wiatru                      |
| `dirAngleElev`       | `-89`                    | Prawie prosto w dół                       |
| `velAvg`             | `0.05`                   | Powolna prędkość opadania               |
| `velVar`             | `0.02`                   | Lekka wariancja prędkości                 |
| `lspPartAvg`         | `5000`                   | Długi czas życia (5 sekund)                |
| `flyGravity_S`       | `"0 0 0"`                | Brak grawitacji (stała prędkość opadania) |
| `visName_S`          | `"MFX_SLEEP_STAR.TGA"`   | Tekstura płatka śniegu                    |
| `visOrientation_S`   | `"NONE"`                 | Billboard skierowany do kamery            |
| `visTexColorStart_S` | `"255 255 255"`           | Biały                                     |
| `visTexColorEnd_S`   | `"255 255 255"`           | Pozostaje biały                            |
| `visSizeStart_S`     | `"5 5"`                  | Rozmiar płatka 5×5                         |
| `visSizeEndScale`    | `1`                      | Bez zmiany rozmiaru                       |
| `visAlphaFunc_S`     | `"ADD"`                  | Addytywne blending (jasne płatki)         |
| `visAlphaStart`      | `255`                    | W pełni widoczne                           |
| `visAlphaEnd`        | `255`                    | Nie zanikają                               |
| `m_bIsAmbientPFX`    | `1`                      | Efekt ambientowy (można wyłączyć w opcjach) |

## Przykład 5: Krew (efekt potomny)

System potomnych emiterów pozwala tworzyć złożone efekty. Krew w Gothic składa się z dwóch instancji — głównej (bryzy krwi) i potomnej (plamy na podłożu):

```daedalus
// Główny efekt: bryzy krwi rozlatujące się
instance PFX_MojaKrew (C_ParticleFX)
{
    ppsValue            = 64;
    ppsCreateEm_S       = "PFX_MojaKrew_Plama";

    dirMode_S           = "DIR";
    dirFOR_S            = "OBJECT";
    dirAngleHeadVar     = 30;
    dirAngleElevVar     = 30;
    velAvg              = 0.1;
    velVar              = 0.05;

    lspPartAvg          = 750;
    lspPartVar          = 550;

    flyGravity_S        = "0 -0.0001 0";
    flyCollDet_B        = 1;

    visName_S           = "BLOOD1.TGA";
    visTexColorStart_S  = "255 255 255";
    visTexColorEnd_S    = "255 255 255";
    visSizeStart_S      = "6 6";
    visSizeEndScale     = 1;
    visAlphaFunc_S      = "BLEND";
    visAlphaStart       = 255;
};

// Efekt potomny: plama na podłożu
instance PFX_MojaKrew_Plama (C_ParticleFX)
{
    ppsValue            = 1;
    ppsIsLooping        = 0;

    shpType_S           = "POINT";

    dirMode_S           = "NONE";
    velAvg              = 0;

    lspPartAvg          = 3000;

    visName_S           = "YOURBLOODSPLAT.TGA";
    visSizeStart_S      = "10 10";
    visSizeEndScale     = 1;
    visAlphaFunc_S      = "BLEND";
    visAlphaStart       = 200;
    visAlphaEnd         = 0;
};
```

**PFX_MojaKrew:**

| Pole                 | Wartość                | Opis                               |
| -------------------- | ---------------------- | ---------------------------------- |
| `ppsValue`           | `64`                   | 64 cząsteczki w wybuchu            |
| `ppsCreateEm_S`      | `"PFX_MojaKrew_Plama"` | Tworzy efekt potomny na cząsteczkę |
| `dirMode_S`          | `"DIR"`                | Emisja kierunkowa                  |
| `dirFOR_S`           | `"OBJECT"`             | Kierunek względem obiektu           |
| `dirAngleHeadVar`    | `30`                   | ±30° rozrzut poziomy                |
| `dirAngleElevVar`    | `30`                   | ±30° rozrzut pionowy                |
| `velAvg`             | `0.1`                  | Umiarkowana prędkość               |
| `velVar`             | `0.05`                 | Wariancja prędkości                |
| `lspPartAvg`         | `750`                  | Czas życia 0,75s                    |
| `lspPartVar`         | `550`                  | Duża wariancja czasu życia          |
| `flyGravity_S`       | `"0 -0.0001 0"`        | Spada w dół                         |
| `flyCollDet_B`       | `1`                    | Kolizje z geometrią świata         |
| `visName_S`          | `"BLOOD1.TGA"`         | Tekstura krwi                      |
| `visTexColorStart_S` | `"255 255 255"`         | Biały (zachowuje kolor tekstury)    |
| `visTexColorEnd_S`   | `"255 255 255"`         | Bez zmiany koloru                  |
| `visSizeStart_S`     | `"6 6"`                | Rozmiar początkowy 6×6              |
| `visSizeEndScale`    | `1`                    | Bez zmiany rozmiaru                |
| `visAlphaFunc_S`     | `"BLEND"`              | Zwykłe przenikanie                  |
| `visAlphaStart`      | `255`                  | W pełni widoczne                    |

**PFX_MojaKrew_Plama:**

| Pole             | Wartość                  | Opis                          |
| ---------------- | ------------------------ | ----------------------------- |
| `ppsValue`       | `1`                      | Jedna cząsteczka (jedna plama) |
| `ppsIsLooping`   | `0`                      | Jednorazowe                   |
| `shpType_S`      | `"POINT"`                | Emiter punktowy               |
| `dirMode_S`      | `"NONE"`                 | Bez kierunku ruchu            |
| `velAvg`         | `0`                      | Nieruchome                    |
| `lspPartAvg`     | `3000`                   | Trwa 3 sekundy                |
| `visName_S`      | `"YOURBLOODSPLAT.TGA"`   | Tekstura plamy                |
| `visSizeStart_S` | `"10 10"`                | Rozmiar plamy 10×10            |
| `visSizeEndScale`| `1`                      | Bez zmiany rozmiaru           |
| `visAlphaFunc_S` | `"BLEND"`                | Zwykłe przenikanie            |
| `visAlphaStart`  | `200`                    | Lekko przezroczysta           |
| `visAlphaEnd`    | `0`                      | Zanika całkowicie             |

:::info
**`ppsCreateEm_S`** — każda cząsteczka z głównego emitera staje się źródłem nowego efektu potomnego. To potężne narzędzie, ale kosztowne — używaj ostrożnie, by nie obciążyć silnika.
:::

## Kształty emiterów

| Kształt          | `shpType_S` | `shpDim_S`        | Opis                                            |
| ---------------- | ----------- | ----------------- | ----------------------------------------------- |
| Punkt            | `"POINT"`   | —                 | Emisja z jednego punktu                         |
| Linia            | `"LINE"`    | `"100"` (długość) | Emisja wzdłuż linii                             |
| Prostopadłościan | `"BOX"`     | `"W H D"`         | Emisja z prostokątnego obszaru                  |
| Okrąg            | `"CIRCLE"`  | `"50"` (promień)  | Emisja z koła (lub dysku gdy `shpIsVolume = 1`) |
| Sfera            | `"SPHERE"`  | `"50"` (promień)  | Emisja z kuli                                   |
| Mesh             | `"MESH"`    | `"250"` (skala)   | Emisja z powierzchni mesha 3D                   |

### shpIsVolume

- `shpIsVolume = 0` — cząsteczki pojawiają się **na krawędzi** kształtu (np. na obwodzie koła)
- `shpIsVolume = 1` — cząsteczki pojawiają się **wewnątrz** kształtu (np. w całym kole)

## Orientacja cząsteczek

| Tryb                | `visOrientation_S` | Opis                                                     |
| ------------------- | ------------------ | -------------------------------------------------------- |
| Billboard           | `"NONE"`           | Cząsteczki zawsze zwrócone do kamery (domyślne)          |
| Wzdłuż prędkości    | `"VELO"`           | Cząsteczki rozciągnięte w kierunku ruchu (deszcz, iskry) |
| 3D wzdłuż prędkości | `"VELO3D"`         | Jak VELO, ale z pełną rotacją 3D                         |
| Obiekt              | `"VOB"`            | Orientacja zgodna z obiektem nadrzędnym                  |

## Rejestracja w ParticleFX.src

Efekty cząsteczkowe mają **oddzielną kompilację** od skryptów gry. Dodaj swój plik do `System/ParticleFX.src`:

```
_intern\ParticleFx.d
Pfx\PfxInstEngine.d
Pfx\PfxInst.d
Pfx\PfxInstMagic.d
Pfx\MojePfx.d
```

:::warning
Efekty PFX **nie** są kompilowane przez `Gothic.src` — używają własnego pliku `ParticleFX.src` w katalogu `System/`.
:::

## Porady praktyczne

### Wydajność

- Im wyższe `ppsValue`, tym więcej cząsteczek = więcej obliczeń
- `flyCollDet_B` z dużą ilością cząsteczek mocno obciąża CPU
- `useEmittersFOR = 1` wraz z `flyCollDet_B` to najkosztowniejsza kombinacja
- `ppsCreateEm_S` mnoży liczbę efektów — każda cząsteczka tworzy nowy emiter

### Debugowanie

- Jeśli efekt nie jest widoczny, sprawdź czy `visAlphaStart` > 0 i `visSizeStart_S` nie jest za małe
- Sprawdź, czy tekstura (`.TGA`) istnieje w katalogu `Textures/`
- Efekty z `m_bIsAmbientPFX = 1` mogą być wyłączone w opcjach gry

### Częste wzorce

| Efekt        | Kluczowe ustawienia                                  |
| ------------ | ---------------------------------------------------- |
| Dym          | BLEND, duży `visSizeEndScale`, `visAlphaEnd = 0`     |
| Ogień        | ADD, animowana tekstura, krótki `lspPartAvg`         |
| Iskry        | ADD, jednorazowy burst, grawitacja w dół, kolizje    |
| Deszcz/śnieg | Duży emiter CIRCLE, offset w Y, `dirAngleElev = -89` |
| Krew         | BLEND, grawitacja, efekt potomny (plamy)             |
| Magia/aura   | ADD, CIRCLE emiter, `useEmittersFOR = 1`             |

## Podsumowanie

Tworzenie efektów cząsteczkowych wymaga:

1. **Instancji** klasy `C_ParticleFX` z odpowiednimi parametrami
2. **Kształtu emitera** (`shpType_S`) — skąd lecą cząsteczki
3. **Kierunku i prędkości** — jak się poruszają
4. **Wizualizacji** — tekstura, kolor, rozmiar, przenikanie
5. **Rejestracji** w `ParticleFX.src` (nie w `Gothic.src`!)
