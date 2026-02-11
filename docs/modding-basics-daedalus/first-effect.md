---
sidebar_position: 5
title: "My First Effect"
description: "Creating your first particle effect (PFX) in Gothic."
---

# My First Effect

In this tutorial you will learn how to create particle effects (Particle Effects, PFX) — from simple smoke, through fire, to rain and snow.

## How Do Particle Effects Work?

The PFX system in Gothic emits **particles** (small textured sprites) from an **emitter** with a defined shape. Each particle has its own direction, speed, lifespan, and appearance.

Effects are defined as instances of the `C_ParticleFX` class in files in the `System/PFX/` directory:

| File              | Description                                           |
| ----------------- | ----------------------------------------------------- |
| `PfxInst.d`       | General effects (fire, smoke, sparks, water, weather) |
| `PfxInstEngine.d` | Engine-required effects (blood, dust, water splash)   |
| `PfxInstMagic.d`  | Magic effects (spells, runes, auras)                  |

## The C_ParticleFX Class — Overview

The class has 49 fields divided into 7 categories. You don't need to set them all — fields you don't set will use default values (usually 0 or empty string).

### 1. Emission Rate — How Many Particles and When

| Field              | Type     | Description                               |
| ------------------ | -------- | ----------------------------------------- |
| `ppsValue`         | `float`  | Base particles emitted per second         |
| `ppsScaleKeys_S`   | `string` | Time-varying multipliers, e.g., `"1 2 3"` |
| `ppsIsLooping`     | `int`    | `1` = looping, `0` = one-shot             |
| `ppsIsSmooth`      | `int`    | `1` = smooth interpolation between keys   |
| `ppsFPS`           | `float`  | Key playback speed (frames/sec)           |
| `ppsCreateEm_S`    | `string` | Child effect name (spawned per particle)  |
| `ppsCreateEmDelay` | `float`  | Child effect delay                        |

### 2. Emitter Shape — Where Particles Come From

| Field              | Type     | Description                                                           |
| ------------------ | -------- | --------------------------------------------------------------------- |
| `shpType_S`        | `string` | Shape: `"POINT"`, `"LINE"`, `"BOX"`, `"CIRCLE"`, `"SPHERE"`, `"MESH"` |
| `shpFOR_S`         | `string` | Frame of reference: `"OBJECT"` or `"WORLD"`                           |
| `shpOffsetVec_S`   | `string` | Offset: `"X Y Z"`                                                     |
| `shpDistribType_S` | `string` | Distribution: `"RAND"`, `"UNIFORM"`, `"WALK"`, `"DIR"`                |
| `shpIsVolume`      | `int`    | `1` = emit from volume, `0` = from surface only                       |
| `shpDim_S`         | `string` | Dimensions (shape-dependent)                                          |
| `shpMesh_S`        | `string` | Emitter mesh (when `shpType_S = "MESH"`)                              |
| `shpMeshRender_B`  | `int`    | `1` = render the emitter mesh                                         |

### 3. Direction and Speed

| Field             | Type     | Description                                                  |
| ----------------- | -------- | ------------------------------------------------------------ |
| `dirMode_S`       | `string` | Mode: `"DIR"`, `"TARGET"`, `"MESH_POLY"`, `"RAND"`, `"NONE"` |
| `dirFOR_S`        | `string` | Direction frame of reference                                 |
| `dirAngleHead`    | `float`  | Horizontal rotation angle (°)                                |
| `dirAngleHeadVar` | `float`  | Angle variance (±°)                                          |
| `dirAngleElev`    | `float`  | Elevation angle (°); `90` = up, `-90` = down                 |
| `dirAngleElevVar` | `float`  | Elevation variance (±°)                                      |
| `velAvg`          | `float`  | Average initial velocity                                     |
| `velVar`          | `float`  | Velocity variance (±)                                        |

### 4. Particle Lifespan

| Field        | Type    | Description             |
| ------------ | ------- | ----------------------- |
| `lspPartAvg` | `float` | Average lifespan (ms)   |
| `lspPartVar` | `float` | Lifespan variance (±ms) |

### 5. Flight Behavior

| Field          | Type     | Description                                                    |
| -------------- | -------- | -------------------------------------------------------------- |
| `flyGravity_S` | `string` | Gravity vector: `"X Y Z"`                                      |
| `flyCollDet_B` | `int`    | `0` = no collision, `1` = collisions, `3` = collisions + marks |

### 6. Visualization

| Field                | Type     | Description                                        |
| -------------------- | -------- | -------------------------------------------------- |
| `visName_S`          | `string` | Texture (`.TGA`) or model (`.3DS`)                 |
| `visOrientation_S`   | `string` | Billboard: `"NONE"`, `"VELO"`, `"VELO3D"`, `"VOB"` |
| `visTexIsQuadPoly`   | `int`    | `0` = triangle, `1` = quad mesh                    |
| `visTexAniFPS`       | `float`  | Texture animation FPS                              |
| `visTexAniIsLooping` | `int`    | `0` = once, `1` = loop, `2` = ping-pong            |
| `visTexColorStart_S` | `string` | Start color: `"R G B"` (0–255)                     |
| `visTexColorEnd_S`   | `string` | End color (interpolated over lifespan)             |
| `visSizeStart_S`     | `string` | Start size: `"W H"`                                |
| `visSizeEndScale`    | `float`  | End size multiplier                                |
| `visAlphaFunc_S`     | `string` | Blending: `"BLEND"`, `"ADD"`, `"MUL"`              |
| `visAlphaStart`      | `float`  | Start alpha (0–255)                                |
| `visAlphaEnd`        | `float`  | End alpha (0–255)                                  |

### 7. Additional Effects

| Field             | Type     | Description                                          |
| ----------------- | -------- | ---------------------------------------------------- |
| `trlFadeSpeed`    | `float`  | Trail fade speed                                     |
| `trlTexture_S`    | `string` | Trail texture                                        |
| `trlWidth`        | `float`  | Trail width                                          |
| `mrkFadeSpeed`    | `float`  | Mark (decal) fade speed                              |
| `mrkTexture_S`    | `string` | Mark texture                                         |
| `mrkSize`         | `float`  | Mark size                                            |
| `flockMode`       | `string` | Flocking mode: `"WIND"`                              |
| `flockStrength`   | `float`  | Flocking strength                                    |
| `useEmittersFOR`  | `int`    | `1` = particles follow emitter position              |
| `timeStartEnd_S`  | `string` | Render time window: `"8 22"` (8am–10pm)              |
| `m_bIsAmbientPFX` | `int`    | `1` = ambient effect (can be disabled in gothic.ini) |

---

## Example 1: Simple Smoke

Let's start with something simple — a column of smoke rising upward:

```daedalus
instance PFX_MySmoke (C_ParticleFX)
{
    // --- Emission: 30 particles/sec, continuous ---
    ppsValue        = 30;
    ppsScaleKeys_S  = "1";
    ppsIsLooping    = 1;

    // --- Shape: point ---
    shpType_S       = "POINT";
    shpFOR_S        = "OBJECT";

    // --- Direction: upward with random variance ---
    dirMode_S       = "DIR";
    dirFOR_S        = "OBJECT";
    dirAngleElev    = 90;
    dirAngleElevVar = 15;
    dirAngleHeadVar = 180;
    velAvg          = 0.02;
    velVar          = 0.01;

    // --- Lifespan: 2–3 seconds ---
    lspPartAvg      = 2500;
    lspPartVar      = 500;

    // --- No gravity (smoke rises) ---
    flyGravity_S    = "0 0.0001 0";

    // --- Appearance ---
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

| Field                | Value           | Description                       |
| -------------------- | --------------- | --------------------------------- |
| `ppsValue`           | `30`            | 30 particles per second           |
| `ppsScaleKeys_S`     | `"1"`           | Constant rate (no scaling)        |
| `ppsIsLooping`       | `1`             | Continuous emission               |
| `shpType_S`          | `"POINT"`       | Emits from a single point         |
| `shpFOR_S`           | `"OBJECT"`      | Relative to the emitter object    |
| `dirMode_S`          | `"DIR"`         | Directional emission              |
| `dirFOR_S`           | `"OBJECT"`      | Direction relative to object      |
| `dirAngleElev`       | `90`            | Upward direction                  |
| `dirAngleElevVar`    | `15`            | ±15° random variance              |
| `dirAngleHeadVar`    | `180`           | Full 360° horizontal spread       |
| `velAvg`             | `0.02`          | Slow speed                        |
| `velVar`             | `0.01`          | Slight speed variation            |
| `lspPartAvg`         | `2500`          | Average lifespan 2.5 seconds      |
| `lspPartVar`         | `500`           | ±0.5s lifespan variance           |
| `flyGravity_S`       | `"0 0.0001 0"`  | Slightly upward (smoke rises)     |
| `visName_S`          | `"SMOKE1.TGA"`  | Smoke texture                     |
| `visOrientation_S`   | `"NONE"`        | Billboard facing camera           |
| `visTexColorStart_S` | `"150 150 150"` | Gray at birth                     |
| `visTexColorEnd_S`   | `"80 80 80"`    | Darkens over time                 |
| `visSizeStart_S`     | `"10 10"`       | 10×10 starting size                |
| `visSizeEndScale`    | `5`             | Grows 5×                          |
| `visAlphaFunc_S`     | `"BLEND"`       | Standard blending                 |
| `visAlphaStart`      | `180`           | Semi-transparent at birth         |
| `visAlphaEnd`        | `0`             | Fades out completely              |

:::tip
**`visAlphaFunc_S`** — blending modes:

- `"BLEND"` — classic blending (smoke, fog, dust)
- `"ADD"` — additive (fire, sparks, magic — bright, glowing)
- `"MUL"` — multiplicative (shadows, darkening)
  :::

## Example 2: Campfire

Fire combines fast emission, additive blending, and animated textures:

```daedalus
instance PFX_MyFire (C_ParticleFX)
{
    // --- Emission: lots of particles, continuous ---
    ppsValue        = 80;
    ppsScaleKeys_S  = "1";
    ppsIsLooping    = 1;

    // --- Shape: circle (fire base) ---
    shpType_S       = "CIRCLE";
    shpFOR_S        = "OBJECT";
    shpIsVolume     = 1;
    shpDim_S        = "15";

    // --- Direction: upward ---
    dirMode_S       = "DIR";
    dirFOR_S        = "OBJECT";
    dirAngleElev    = 90;
    dirAngleElevVar = 20;
    dirAngleHeadVar = 180;
    velAvg          = 0.05;
    velVar          = 0.02;

    // --- Lifespan: short (fast fire) ---
    lspPartAvg      = 800;
    lspPartVar      = 200;

    // --- Slight upward gravity (hot air) ---
    flyGravity_S    = "0 0.0003 0";

    // --- Appearance ---
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

| Field                | Value           | Description                       |
| -------------------- | --------------- | --------------------------------- |
| `ppsValue`           | `80`            | 80 particles per second           |
| `ppsScaleKeys_S`     | `"1"`           | Constant rate                     |
| `ppsIsLooping`       | `1`             | Continuous emission               |
| `shpType_S`          | `"CIRCLE"`      | Circular emitter shape            |
| `shpFOR_S`           | `"OBJECT"`      | Relative to the emitter object    |
| `shpIsVolume`        | `1`             | Emits from entire disk area       |
| `shpDim_S`           | `"15"`          | Circle radius 15 units            |
| `dirMode_S`          | `"DIR"`         | Directional emission              |
| `dirFOR_S`           | `"OBJECT"`      | Direction relative to object      |
| `dirAngleElev`       | `90`            | Upward direction                  |
| `dirAngleElevVar`    | `20`            | ±20° random variance              |
| `dirAngleHeadVar`    | `180`           | Full 360° horizontal spread       |
| `velAvg`             | `0.05`          | Moderate speed                    |
| `velVar`             | `0.02`          | Speed variation                   |
| `lspPartAvg`         | `800`           | Short lifespan (0.8s)             |
| `lspPartVar`         | `200`           | ±0.2s variance                    |
| `flyGravity_S`       | `"0 0.0003 0"` | Slight upward pull (hot air)      |
| `visName_S`          | `"FIREFLARE.TGA"` | Fire texture                   |
| `visOrientation_S`   | `"NONE"`        | Billboard facing camera           |
| `visTexAniFPS`       | `8`             | Texture animation speed           |
| `visTexAniIsLooping` | `1`             | Animation loops                   |
| `visTexColorStart_S` | `"255 255 255"` | White (overexposed center)        |
| `visTexColorEnd_S`   | `"255 100 30"`  | Orange (flame edges)              |
| `visSizeStart_S`     | `"5 5"`         | 5×5 starting size                  |
| `visSizeEndScale`    | `4`             | Grows 4×                          |
| `visAlphaFunc_S`     | `"ADD"`         | Additive blending (glowing)       |
| `visAlphaStart`      | `255`           | Fully opaque at birth             |
| `visAlphaEnd`        | `0`             | Fades out completely              |

## Example 3: Sparks

Sparks are small, fast particles with gravity and collisions:

```daedalus
instance PFX_MySparks (C_ParticleFX)
{
    // --- Emission: one-time burst ---
    ppsValue        = 50;
    ppsScaleKeys_S  = "1 0";
    ppsIsLooping    = 0;
    ppsFPS          = 2;

    // --- Shape: point ---
    shpType_S       = "POINT";
    shpFOR_S        = "OBJECT";

    // --- Direction: scatter in all directions ---
    dirMode_S       = "DIR";
    dirFOR_S        = "OBJECT";
    dirAngleHeadVar = 180;
    dirAngleElev    = 45;
    dirAngleElevVar = 45;
    velAvg          = 0.15;
    velVar          = 0.08;

    // --- Lifespan: short ---
    lspPartAvg      = 600;
    lspPartVar      = 300;

    // --- Gravity pulls down ---
    flyGravity_S    = "0 -0.0005 0";
    flyCollDet_B    = 1;

    // --- Appearance: small, bright dots ---
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

| Field                | Value           | Description                       |
| -------------------- | --------------- | --------------------------------- |
| `ppsValue`           | `50`            | 50 particles in burst             |
| `ppsScaleKeys_S`     | `"1 0"`         | Instant burst, then nothing       |
| `ppsIsLooping`       | `0`             | One-shot (not looping)            |
| `ppsFPS`             | `2`             | Scale key playback speed          |
| `shpType_S`          | `"POINT"`       | Emits from a single point         |
| `shpFOR_S`           | `"OBJECT"`      | Relative to the emitter object    |
| `dirMode_S`          | `"DIR"`         | Directional emission              |
| `dirFOR_S`           | `"OBJECT"`      | Direction relative to object      |
| `dirAngleHeadVar`    | `180`           | Full 360° scatter                 |
| `dirAngleElev`       | `45`            | Slightly upward                   |
| `dirAngleElevVar`    | `45`            | Wide vertical variance            |
| `velAvg`             | `0.15`          | Fast speed                        |
| `velVar`             | `0.08`          | High speed variance               |
| `lspPartAvg`         | `600`           | Short lifespan (0.6s)             |
| `lspPartVar`         | `300`           | ±0.3s variance                    |
| `flyGravity_S`       | `"0 -0.0005 0"` | Gravity pulls down                |
| `flyCollDet_B`       | `1`             | Collides with world geometry      |
| `visName_S`          | `"ZFLARE1.TGA"` | Small flare texture               |
| `visOrientation_S`   | `"NONE"`        | Billboard facing camera           |
| `visTexColorStart_S` | `"255 220 100"` | Yellow                            |
| `visTexColorEnd_S`   | `"255 80 20"`   | Dark orange                       |
| `visSizeStart_S`     | `"2 2"`         | 2×2 small size                     |
| `visSizeEndScale`    | `0.5`           | Shrinks to half size              |
| `visAlphaFunc_S`     | `"ADD"`         | Additive blending (glowing)       |
| `visAlphaStart`      | `255`           | Fully opaque at birth             |
| `visAlphaEnd`        | `0`             | Fades out completely              |

## Example 4: Snow

Snow uses a large emitter high above, with slowly falling particles:

```daedalus
instance PFX_MySnow (C_ParticleFX)
{
    // --- Emission: continuous ---
    ppsValue        = 50;
    ppsScaleKeys_S  = "1";
    ppsIsLooping    = 1;

    // --- Shape: large circle high above the player ---
    shpType_S       = "CIRCLE";
    shpFOR_S        = "OBJECT";
    shpOffsetVec_S  = "0 500 0";
    shpIsVolume     = 1;
    shpDim_S        = "300";

    // --- Direction: downward ---
    dirMode_S       = "DIR";
    dirFOR_S        = "OBJECT";
    dirAngleHead    = 20;
    dirAngleHeadVar = 10;
    dirAngleElev    = -89;
    velAvg          = 0.05;
    velVar          = 0.02;

    // --- Lifespan: long ---
    lspPartAvg      = 5000;

    // --- No gravity (constant fall speed) ---
    flyGravity_S    = "0 0 0";

    // --- Appearance: white flakes ---
    visName_S           = "MFX_SLEEP_STAR.TGA";
    visOrientation_S    = "NONE";
    visTexColorStart_S  = "255 255 255";
    visTexColorEnd_S    = "255 255 255";
    visSizeStart_S      = "5 5";
    visSizeEndScale     = 1;
    visAlphaFunc_S      = "ADD";
    visAlphaStart       = 255;
    visAlphaEnd         = 255;

    // --- Ambient effect (can be disabled in options) ---
    m_bIsAmbientPFX     = 1;
};
```

| Field                | Value                    | Description                        |
| -------------------- | ------------------------ | ---------------------------------- |
| `ppsValue`           | `50`                     | 50 particles per second            |
| `ppsScaleKeys_S`     | `"1"`                    | Constant rate                      |
| `ppsIsLooping`       | `1`                      | Continuous emission                |
| `shpType_S`          | `"CIRCLE"`               | Circular emitter shape             |
| `shpFOR_S`           | `"OBJECT"`               | Relative to the emitter object     |
| `shpOffsetVec_S`     | `"0 500 0"`              | 500 units above the emitter        |
| `shpIsVolume`        | `1`                      | Fills entire disk area             |
| `shpDim_S`           | `"300"`                  | Circle radius 300 units            |
| `dirMode_S`          | `"DIR"`                  | Directional emission               |
| `dirFOR_S`           | `"OBJECT"`               | Direction relative to object       |
| `dirAngleHead`       | `20`                     | Slight wind direction              |
| `dirAngleHeadVar`    | `10`                     | ±10° wind variance                  |
| `dirAngleElev`       | `-89`                    | Nearly straight down               |
| `velAvg`             | `0.05`                   | Slow falling speed                 |
| `velVar`             | `0.02`                   | Slight speed variation             |
| `lspPartAvg`         | `5000`                   | Long lifespan (5 seconds)          |
| `flyGravity_S`       | `"0 0 0"`                | No gravity (constant fall speed)   |
| `visName_S`          | `"MFX_SLEEP_STAR.TGA"`   | Snowflake texture                  |
| `visOrientation_S`   | `"NONE"`                 | Billboard facing camera            |
| `visTexColorStart_S` | `"255 255 255"`           | White                              |
| `visTexColorEnd_S`   | `"255 255 255"`           | Stays white                        |
| `visSizeStart_S`     | `"5 5"`                  | 5×5 flake size                      |
| `visSizeEndScale`    | `1`                      | No size change                     |
| `visAlphaFunc_S`     | `"ADD"`                  | Additive blending (bright flakes)  |
| `visAlphaStart`      | `255`                    | Fully visible                      |
| `visAlphaEnd`        | `255`                    | Stays visible (no fade)            |
| `m_bIsAmbientPFX`    | `1`                      | Ambient effect (can disable in options) |

## Example 5: Blood (Child Emitters)

The child emitter system lets you create complex effects. Blood in Gothic consists of two instances — the main one (blood spray) and the child one (ground splat):

```daedalus
// Main effect: blood spray scattering
instance PFX_MyBlood (C_ParticleFX)
{
    ppsValue            = 64;
    ppsCreateEm_S       = "PFX_MyBlood_Splat";

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

// Child effect: ground splat
instance PFX_MyBlood_Splat (C_ParticleFX)
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

**PFX_MyBlood:**

| Field                | Value                 | Description                        |
| -------------------- | --------------------- | ---------------------------------- |
| `ppsValue`           | `64`                  | 64 particles in burst              |
| `ppsCreateEm_S`      | `"PFX_MyBlood_Splat"` | Spawns child effect per particle   |
| `dirMode_S`          | `"DIR"`               | Directional emission               |
| `dirFOR_S`           | `"OBJECT"`            | Direction relative to object       |
| `dirAngleHeadVar`    | `30`                  | ±30° horizontal scatter             |
| `dirAngleElevVar`    | `30`                  | ±30° vertical scatter               |
| `velAvg`             | `0.1`                 | Moderate speed                     |
| `velVar`             | `0.05`                | Speed variation                    |
| `lspPartAvg`         | `750`                 | 0.75s lifespan                     |
| `lspPartVar`         | `550`                 | High lifespan variance             |
| `flyGravity_S`       | `"0 -0.0001 0"`       | Falls downward                     |
| `flyCollDet_B`       | `1`                   | Collides with world geometry       |
| `visName_S`          | `"BLOOD1.TGA"`        | Blood texture                      |
| `visTexColorStart_S` | `"255 255 255"`        | White (preserves texture color)    |
| `visTexColorEnd_S`   | `"255 255 255"`        | No color change                    |
| `visSizeStart_S`     | `"6 6"`               | 6×6 starting size                    |
| `visSizeEndScale`    | `1`                   | No size change                     |
| `visAlphaFunc_S`     | `"BLEND"`             | Standard blending                  |
| `visAlphaStart`      | `255`                 | Fully opaque                       |

**PFX_MyBlood_Splat:**

| Field            | Value                    | Description                     |
| ---------------- | ------------------------ | ------------------------------- |
| `ppsValue`       | `1`                      | Single particle (one splat)     |
| `ppsIsLooping`   | `0`                      | One-shot                        |
| `shpType_S`      | `"POINT"`                | Point emitter                   |
| `dirMode_S`      | `"NONE"`                 | No movement direction           |
| `velAvg`         | `0`                      | Stationary                      |
| `lspPartAvg`     | `3000`                   | Lasts 3 seconds                 |
| `visName_S`      | `"YOURBLOODSPLAT.TGA"`   | Splat texture                   |
| `visSizeStart_S` | `"10 10"`                | 10×10 splat size                  |
| `visSizeEndScale`| `1`                      | No size change                  |
| `visAlphaFunc_S` | `"BLEND"`                | Standard blending               |
| `visAlphaStart`  | `200`                    | Slightly transparent            |
| `visAlphaEnd`    | `0`                      | Fades out completely            |

:::info
**`ppsCreateEm_S`** — each particle from the main emitter becomes a source for a new child effect. This is a powerful tool but expensive — use carefully to avoid overloading the engine.
:::

## Emitter Shapes

| Shape  | `shpType_S` | `shpDim_S`       | Description                                             |
| ------ | ----------- | ---------------- | ------------------------------------------------------- |
| Point  | `"POINT"`   | —                | Emission from a single point                            |
| Line   | `"LINE"`    | `"100"` (length) | Emission along a line                                   |
| Box    | `"BOX"`     | `"W H D"`        | Emission from a rectangular area                        |
| Circle | `"CIRCLE"`  | `"50"` (radius)  | Emission from a circle (or disk when `shpIsVolume = 1`) |
| Sphere | `"SPHERE"`  | `"50"` (radius)  | Emission from a sphere                                  |
| Mesh   | `"MESH"`    | `"250"` (scale)  | Emission from a 3D mesh surface                         |

### shpIsVolume

- `shpIsVolume = 0` — particles appear **on the edge** of the shape (e.g., on the circle circumference)
- `shpIsVolume = 1` — particles appear **inside** the shape (e.g., within the entire circle)

## Particle Orientation

| Mode              | `visOrientation_S` | Description                                              |
| ----------------- | ------------------ | -------------------------------------------------------- |
| Billboard         | `"NONE"`           | Particles always face the camera (default)               |
| Along velocity    | `"VELO"`           | Particles stretched in movement direction (rain, sparks) |
| 3D along velocity | `"VELO3D"`         | Like VELO, but with full 3D rotation                     |
| Object            | `"VOB"`            | Orientation matches the parent object                    |

## Registration in ParticleFX.src

Particle effects have a **separate compilation** from game scripts. Add your file to `System/ParticleFX.src`:

```
_intern\ParticleFx.d
Pfx\PfxInstEngine.d
Pfx\PfxInst.d
Pfx\PfxInstMagic.d
Pfx\MyPfx.d
```

:::warning
PFX effects are **not** compiled by `Gothic.src` — they use their own `ParticleFX.src` file in the `System/` directory.
:::

## Practical Tips

### Performance

- Higher `ppsValue` means more particles = more computation
- `flyCollDet_B` with many particles heavily loads the CPU
- `useEmittersFOR = 1` combined with `flyCollDet_B` is the most expensive combination
- `ppsCreateEm_S` multiplies the number of effects — each particle creates a new emitter

### Debugging

- If the effect is not visible, check that `visAlphaStart` > 0 and `visSizeStart_S` is not too small
- Verify that the texture (`.TGA`) exists in the `Textures/` directory
- Effects with `m_bIsAmbientPFX = 1` can be disabled in game options

### Common Patterns

| Effect     | Key Settings                                         |
| ---------- | ---------------------------------------------------- |
| Smoke      | BLEND, large `visSizeEndScale`, `visAlphaEnd = 0`    |
| Fire       | ADD, animated texture, short `lspPartAvg`            |
| Sparks     | ADD, one-time burst, downward gravity, collisions    |
| Rain/Snow  | Large CIRCLE emitter, Y offset, `dirAngleElev = -89` |
| Blood      | BLEND, gravity, child emitter (splats)               |
| Magic/Aura | ADD, CIRCLE emitter, `useEmittersFOR = 1`            |

## Summary

Creating particle effects requires:

1. An **instance** of the `C_ParticleFX` class with appropriate parameters
2. An **emitter shape** (`shpType_S`) — where particles come from
3. **Direction and speed** — how they move
4. **Visualization** — texture, color, size, blending
5. **Registration** in `ParticleFX.src` (not in `Gothic.src`!)
