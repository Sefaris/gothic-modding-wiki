---
sidebar_position: 7
title: Dźwięk
description: Przegląd systemu dźwięku (SFX) w Gothic, formaty plików i skrypty.
---

# System dźwięku

System dźwięku w Gothic obsługuje efekty dźwiękowe (SFX), takie jak kroki, zamachy bronią, okrzyki potworów i dźwięki otoczenia. W przeciwieństwie do systemu [muzyki](./music.md), który używa DirectMusic, system SFX odtwarza standardowe pliki audio.

## Formaty plików

Gothic używa plików **WAV** dla efektów dźwiękowych.

| Rozszerzenie | Format | Opis |
| :--- | :--- | :--- |
| `.wav` | PCM Wave | Standardowe nieskompresowane audio. |

### Właściwości
Oryginalne pliki dźwiękowe Gothic zazwyczaj mają następujące właściwości:
- **Kanały**: Mono (1 kanał)
- **Częstotliwość próbkowania**: 44100 Hz (44.1 kHz)
- **Głębia bitowa**: 16-bit (Gothic 1/2) lub kompresja ADPCM

:::info
Pliki stereo i inne częstotliwości próbkowania mogą działać, ale mogą powodować problemy lub błędy w pozycjonowaniu 3D. Mono jest zalecane dla wszystkich dźwięków przestrzennych.
:::

## Struktura plików

Pliki dźwiękowe znajdują się w `_work/Data/Sound/`:

- `SFX/` - Ogólne efekty dźwiękowe (broń, magia, przedmioty).
- `Speech/` - Kwestie dialogowe (odwoływane przez `AI_Output` w skryptach).

## Skrypty

Efekty dźwiękowe są definiowane w Daedalusie przy użyciu klasy `C_SFX`. Pliki definiujące te instancje zazwyczaj znajdują się w `System/SFX/` (np. `SfxInst.d`).

### Definicja klasy

```daedalus
class C_SFX {
    var string file;             // Nazwa pliku (np. "MySound.wav")
    var int pitchOff;            // Przesunięcie tonu (półtony)
    var int pitchVar;            // Wariancja tonu (losowa zmienność)
    var int vol;                 // Głośność (0..127)
    var int loop;                // Zapętlenie (0=nie, 1=tak)
    var int loopStartOffset;     // Punkt startu pętli
    var int loopEndOffset;       // Punkt końcowy pętli
    var float reverbLevel;       // Poziom pogłosu
    var string pfxName;          // Nazwa powiązanego efektu cząsteczkowego
};
```

### Przykład instancji

```daedalus
instance Mobs_Blacksmith_Hamm_A0(C_SFX_DEF) {
    file = "Hammer_A0.wav";
    pitchOff = 0;
    pitchVar = 0;
    vol = 127;
    loop = 0;
    loopStartOffset = 0;
    loopEndOffset = 0;
    reverbLevel = 0;
    pfxName = "";
};
```

### Odtwarzanie dźwięków

Możesz odtwarzać dźwięki ze skryptów przy użyciu różnych funkcji zewnętrznych:

-   **`Wld_PlayEffect(effectName, vob, ...)`**: Odtwarza efekt wizualny lub dźwiękowy w lokalizacji określonego obiektu.
    ```daedalus
    Wld_PlayEffect("spellFX_Fireball", hero, hero, 0, 0, 0, FALSE);
    ```
-   **`Snd_Play(instanceName)`**: Odtwarza dźwięk jako dźwięk globalny 2D (UI, menu).
-   **`Snd_Play3D(instanceName, vob)`**: Odtwarza dźwięk w lokalizacji obiektu.

## Mowa (Speech)

Kwestie dialogowe (`Speech/`) **nie** są definiowane jako instancje `C_SFX`. Są odwoływane bezpośrednio przez nazwę pliku w komendach `AI_Output`. Zobacz dokumentację [Daedalus](/pl/docs/general-info/daedalus#system-dialogowy---ai_output) po więcej szczegółów.
