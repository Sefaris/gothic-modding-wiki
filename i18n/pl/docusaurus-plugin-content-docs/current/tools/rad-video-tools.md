---
sidebar_position: 5
title: "RAD Video Tools"
description: "Darmowe narzędzie do konwersji plików wideo do formatu Bink (.BIK) używanego przez silnik Gothica do przerywników filmowych i filmów intro."
---

# RAD Video Tools

**RAD Video Tools** (dawniej znane jako **The RAD Video Tools**) to darmowe narzędzie do konwersji wideo stworzone przez **Epic Games Tools** (wcześniej RAD Game Tools). Pozwala konwertować standardowe pliki wideo do formatu **Bink Video** (`.BIK`) - własnościowego formatu wideo używanego przez silnik Gothica do przerywników filmowych, intr i napisów końcowych.

:::tip
RAD Video Tools to jedyny sposób na tworzenie plików `.BIK` dla Gothica. Możesz przekonwertować dowolny standardowy film (`.avi`, `.mp4`, `.mov`, `.wmv` itp.) do formatu Bink i użyć go jako przerywnik filmowy w swoim modzie.
:::

## Jak Gothic wykorzystuje filmy BIK

Silnik Gothica ZenGin korzysta z kodeku **Bink Video** (od RAD Game Tools) do odtwarzania wszystkich filmów. Wewnętrzna klasa silnika `oCBinkPlayer` obsługuje ładowanie i odtwarzanie plików `.BIK`.

Filmy są odtwarzane ze skryptów Daedalus za pomocą wbudowanych funkcji zewnętrznych `PlayVideo()` i `PlayVideoEx()`:

```daedalus
// Odtwórz prosty przerywnik filmowy
PlayVideo("INTRO.BIK");

// Odtwórz dwa filmy po kolei (np. intro + ekran tytułowy dodatku)
PlayVideo("INTRO.BIK");
PlayVideo("Addon_Title.BIK");
```

### PlayVideo vs PlayVideoEx

Silnik udostępnia dwie funkcje do odtwarzania wideo:

| Funkcja | Sygnatura | Opis |
| --- | --- | --- |
| `PlayVideo` | `PlayVideo(string filename)` | Odtwarza plik wideo. Zwraca `TRUE` w przypadku powodzenia. |
| `PlayVideoEx` | `PlayVideoEx(string filename, int screenBlend, int exitSession)` | Rozszerzona wersja. `screenBlend` włącza efekt zaciemnienia po odtworzeniu. Jeśli `exitSession` wynosi `TRUE`, sesja gry kończy się po filmie (używane dla przerywników końcowych). |

### Gdzie umieszczać pliki wideo

Wszystkie pliki `.BIK` muszą znajdować się w katalogu wideo Gothica:

```
<Gothic>/_work/Data/Video/
```

:::info
Pliki wideo **nie mogą** być pakowane do archiwów `.vdf` ani `.mod`. Muszą istnieć jako luźne pliki w katalogu `Video`.
:::

### Standardowe filmy Gothic 2

Gothic II: Noc Kruka zawiera następujące pliki `.BIK`:

| Plik | Zastosowanie |
| --- | --- |
| `logo1.bik` | Logo wydawcy (odtwarzane przy uruchomieniu) |
| `logo2.bik` | Logo dewelopera (odtwarzane przy uruchomieniu) |
| `intro.bik` | Główny przerywnik wprowadzający |
| `Addon_Title.bik` | Ekran tytułowy Nocy Kruka |
| `credits.bik` | Napisy końcowe (część 1) |
| `credits2.bik` | Napisy końcowe (część 2) |
| `ORCATTACK.BIK` | Przerywnik ataku orków |
| `YOURSHIP.BIK` | Przerywnik ze statkiem |

:::info
Silnik wspiera również filmy specyficzne dla rozdzielczości. Przy otwieraniu pliku np. `INTRO.BIK`, najpierw próbuje wariantów z tagiem rozdzielczości (np. `INTRO1024x768.BIK`, `INTRO800x600.BIK`) pasujących do aktualnej rozdzielczości ekranu, a dopiero potem wraca do pliku bazowego.
:::

### Gdzie filmy są wywoływane w skryptach

Filmy są zazwyczaj wywoływane w trzech miejscach:

1. **Funkcje startowe** (`Startup.d`) - przerywniki intro odtwarzane przy rozpoczęciu nowej gry lub rozpoczęciu rozdziału.
2. **Menu główne** (`Menu_Main.d`) - filmy intro i napisów końcowych wywoływane z pozycji menu.
3. **Zdarzenia fabularne** (`Story/Events/`) - przerywniki w trakcie gry wywoływane przez zdarzenia skryptowe (np. ataki orków, sekwencje ze statkami).

## Instalacja RAD Video Tools

1. Pobierz **RAD Video Tools** z oficjalnej strony:
   - [Pobierz RAD Video Tools](https://www.radgametools.com/bnkdown.htm)
   - Plik do pobrania to archiwum `.7z` z hasłem: `RAD`
2. Rozpakuj archiwum (potrzebujesz [7-Zip](https://www.7-zip.org/) lub kompatybilnego programu).
3. Uruchom `RADTools.exe` - nie wymaga instalacji.

## Konwersja filmów do BIK

### Instrukcja krok po kroku

1. **Uruchom RAD Video Tools** (`RADTools.exe`).
2. **Przejdź do pliku wideo** za pomocą wbudowanej przeglądarki plików.
3. **Wybierz film**, który chcesz przekonwertować i kliknij **"Bink it!"**.
4. **Skonfiguruj ustawienia kompresji:**
   - **Data rate** (przepływność) - kontroluje jakość vs. rozmiar pliku. Dla przerywników Gothica, 1000-3000 kbps jest zazwyczaj wystarczające dla rozdzielczości 640x480.
   - **Frame rate** (klatki na sekundę) - dopasuj do częstotliwości klatek źródłowego wideo (zwykle 25 lub 30 fps).
   - **Audio** - Bink zawiera własny kodek audio. Możesz dostosować kompresję audio lub pozostawić domyślne ustawienia.
   - **Key frame interval** (interwał klatek kluczowych) - niższe wartości dają więcej klatek kluczowych (szybsze przewijanie, ale większe pliki).
5. **Kliknij "Bink"**, aby rozpocząć konwersję.
6. **Umieść wyjściowy plik `.bik`** w `<Gothic>/_work/Data/Video/`.

### Zalecane ustawienia dla Gothica

| Ustawienie | Zalecana wartość |
| --- | --- |
| Rozdzielczość | 640x480 lub 800x600 (dopasuj do rozdzielczości gry) |
| Data rate | 1500 - 3000 kbps |
| Klatki na sekundę | 25 fps |
| Audio | 44100 Hz, stereo |

:::warning
Gothic 1 i Gothic 2 używają **Bink 1** (`.bik`), **nie** Bink 2 (`.bk2`). Upewnij się, że kompresujesz do oryginalnego formatu Bink. RAD Video Tools domyślnie kompresuje do Bink 1.
:::

## Odtwarzanie plików BIK

RAD Video Tools zawiera również wbudowany **Bink Player** do podglądu filmów. Wystarczy dwukrotnie kliknąć plik `.bik` lub wybrać go w RAD Video Tools i nacisnąć **"Play"**.

Podczas odtwarzania w Gothicu gracz może nacisnąć **Escape**, aby pominąć film. Jeśli w pliku INI Gothica włączono `extendedVideoKeys`, dostępne są dodatkowe sterowania:

| Klawisz | Akcja |
| --- | --- |
| **Escape** | Pomiń / anuluj film |
| **Spacja** | Pauza / wznowienie |
| **Strzałka w prawo** | Przewiń o 30 klatek do przodu |
| **Home** | Restart filmu |
| **Góra / Dół** | Regulacja głośności |
| **Q** | Włącz/wyłącz dźwięk |

## Użycie filmu w modzie

### Przykład: Dodanie własnego intra

1. Stwórz lub edytuj film w dowolnym edytorze wideo (np. DaVinci Resolve, Premiere, Shotcut).
2. Wyeksportuj do standardowego formatu (`.avi`, `.mp4`).
3. Przekonwertuj na `.bik` za pomocą RAD Video Tools.
4. Umieść plik `.bik` w `<Gothic>/_work/Data/Video/`.
5. Wywołaj go ze skryptu Daedalus:

```daedalus
// W Startup.d - odtwórz własne intro przy rozpoczęciu nowej gry
func void startup_global()
{
    PlayVideo("MOJ_MOD_INTRO.BIK");
    // ... reszta startupa
};
```

### Przykład: Dodanie przerywnika końcowego

Użyj `PlayVideoEx` z flagą `exitSession`, aby zakończyć grę po filmie:

```daedalus
// Odtwórz przerywnik końcowy i wyjdź do menu głównego
PlayVideoEx("MOJ_MOD_ZAKONCZENIE.BIK", TRUE, TRUE);
```

## Linki zewnętrzne

- [Pobierz RAD Video Tools](https://www.radgametools.com/bnkdown.htm) - Oficjalna strona pobierania.
- [Bink Video](https://www.radgametools.com/bnkmain.htm) - Informacje o kodeku Bink.
- [RAD Video Tools FAQ](https://www.radgametools.com/binkfaq.htm) - Najczęściej zadawane pytania.
