---
sidebar_position: 6
title: Muzyka
description: Przegląd systemu muzyki w Gothic (DirectMusic), formaty plików i skrypty.
---

# System muzyki

Gothic używa **Microsoft DirectMusic** do swojej interaktywnej ścieżki dźwiękowej. W przeciwieństwie do prostego strumieniowania audio, DirectMusic pozwala na dynamiczne przejścia i wariacje oparte na stanie gry (np. eksploracja, walka, czy zdarzenia skryptowe).

## Formaty plików

System muzyczny polega na trzech głównych typach plików, które współpracują ze sobą tworząc dynamiczną ścieżkę dźwiękową:

| Rozszerzenie | Typ | Opis |
| :--- | :--- | :--- |
| `.dls` | **Downloadable Sounds** | Zawiera próbki instrumentów (formy falowe/wave) używane przez muzykę. |
| `.sty` | **Style** | Definiuje strukturę muzyczną, w tym zespoły (instrumenty), motywy i wzorce (patterns). |
| `.sgt` | **Segment** | Właściwy utwór do odtwarzania, który układa wzorce stylu na osi czasu. TO jest plik, do którego odwołujesz się w skryptach. |

:::warning
Pliki muzyczne (`.dls`, `.sty`, `.sgt`) **nie mogą** być pakowane do woluminów VDF lub MOD. Muszą być obecne jako luźne pliki w katalogu `_work/Data/Music/` (i jego podkatalogach), aby mogły być załadowane przez silnik.
:::

## Narzędzia

### DirectMusic Producer

Aby stworzyć natywną muzykę do Gothica, potrzebujesz **DirectMusic Producer**, starszego narzędzia z pakietu DirectX SDK. Pozwala ono komponować adaptacyjną muzykę, która reaguje na zdarzenia w grze.

- [Czytaj więcej o DirectMusic Producer](/pl/docs/tools/directmusic-producer)

### zBassMusic (Alternatywa)

Dla nowoczesnego moddingu, możesz użyć wtyczki Union **zBassMusic**. Zastępuje ona silnik DirectMusic biblioteką audio BASS, pozwalając na używanie standardowych formatów audio takich jak MP3 i OGG.

- [Czytaj więcej o zBassMusic](/pl/docs/tools/zbassmusic)

## Skrypty

Muzyka w Gothicu jest kontrolowana przez skrypty Daedalus. Klasa `C_MUSICTHEME` definiuje utwór muzyczny i jego właściwości.

### Definicja klasy

```daedalus
class C_MUSICTHEME {
    var string file;           // Plik .sgt do odtworzenia
    var float vol;             // Głośność (0.0 do 1.0)
    var int loop;              // Zapętl utwór (1 = tak, 0 = nie)
    var float reverbMix;       // Mix efektu pogłosu (reverb)
    var float reverbTime;      // Czas trwania pogłosu w ms
    var int transType;         // Typ przejścia (np. TRANSITION_TYPE_FILL)
    var int transSubType;      // Podtyp przejścia (np. TRANSITION_SUB_TYPE_MEASURE)
};
```

### Przykład instancji

Instancje muzyki są zazwyczaj definiowane w `_work/Data/Scripts/System/Music/MusicInst.d`.

```daedalus
instance SYS_Menu(C_MUSICTHEME_DEF) {
    file = "Gamestart.sgt";
    transType = TRANSITION_TYPE_NONE;
    transSubType = TRANSITION_SUB_TYPE_MEASURE;
};
```

Możesz następnie odtworzyć tę instancję używając zewnętrznej funkcji `Wld_PlayGlobalSong(instance)` lub przypisując ją do strefy/gildii.
