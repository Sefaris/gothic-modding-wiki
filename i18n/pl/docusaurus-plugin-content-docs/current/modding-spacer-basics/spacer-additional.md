---
sidebar_position: 4
title: "SpacerNET - Dodatkowe wskazówki i techniki"
description: "Dodatkowe wskazówki, techniki i przepływy pracy dla zaawansowanego użycia SpacerNET."
---

# Dodatkowe wskazówki i techniki

Ten przewodnik omawia dodatkowe techniki, najlepsze praktyki i specjalistyczne przepływy pracy dla SpacerNET.

## Najlepsze praktyki tworzenia lokacji

Postępuj zgodnie z tymi sprawdzonymi wytycznymi, aby uniknąć typowych problemów:

### 1. Powierzchnie do chodzenia jako geometria meshu

**Zawsze uwzględniaj powierzchnie do chodzenia w meshu świata**, a nie jako osobne voby:

- Platformy, rusztowania, mosty, schody
- Konstrukcje kopalnianych podpór
- Każda powierzchnia, po której chodzi postać gracza

**Dlaczego:** Zapobiega przechodzeniu gracza przez geometrię (choć rzadkie). Używanie geometrii meshu zapewnia niezawodną detekcję kolizji.

Przykład: Rusztowania w kopalni powinny być częścią meshu lokacji, a nie pojedynczymi vobami.

:::tip
Jeśli gracze zgłaszają błędy "wpadania w podłogę", przekonwertuj dotknięty obszar z vobów na geometrię meshu.
:::

### 2. Duże drzewa i renderowanie cieni w DX11

**Umieść przynajmniej 50% dużych drzew jako geometrię meshu** (nie voby):

**Problem z drzewami jako voby:**

- DirectX 11 renderuje cienie tylko dla vobów w widoku kamery
- Drzewa za kamerą nie rzucają cieni
- Cienie migają podczas obracania kamery
- Tworzy nieprzyjemne artefakty wizualne

**Rozwiązanie:**

- Przenieś duże drzewa do meshu świata
- DX11 renderuje cienie meshu poprawnie niezależnie od pozycji kamery
- Cienie pozostają stabilne podczas obrotu kamery

**Które drzewa konwertować:**

- Duże drzewa rzucające wyraźne cienie
- Drzewa w pobliżu często odwiedzanych obszarów
- Drzewa wzdłuż głównych ścieżek

:::info
Małe krzewy i trawa mogą pozostać jako voby - używaj tej techniki tylko dla dużej, cieniującej roślinności.
:::

### 3. Umieszczanie portali jest obowiązkowe

**Zawsze umieszczaj portale w domach, jaskiniach i przestrzeniach wewnętrznych:**

**Dlaczego portale są ważne:**

- DirectX 7 wymaga portali do działania statycznego oświetlenia
- Bez portali wnętrza wyglądają całkowicie ciemno na DX7
- Gracze bez DX11 doświadczą niegrywalnej ciemności

**Wytyczne dotyczące portali:**

- Każde wejście do budynku wymaga portalu
- Wejścia do jaskiń wymagają portali
- Obszary podziemne muszą mieć odpowiednie systemy portali
- Testuj na DX7, aby sprawdzić, czy oświetlenie działa poprawnie

:::warning
Nawet jeśli rozwijasz z DX11, zawsze testuj finalne lokacje na DX7, aby upewnić się, że portale działają poprawnie dla wszystkich graczy.
:::

---

## Wymagane voby dla nowych lokacji

Każda lokacja Gothica **musi** zawierać te 3 voby:

### 1. Domyślna strefa muzyki (`oCZoneMusicDefault`)

Ustawia muzykę tła dla całego świata.

**Konfiguracja:**

- Zobacz [tutorial stref muzyki](./spacer-advanced-world-editing#strefy-muzyki-oczonemusic) dla szczegółów konfiguracji
- Wybierz odpowiednią muzykę dla atmosfery lokacji
- Nie wymaga rozmiaru BBOX - działa globalnie

### 2. Domyślna odległość renderowania vobów (`zCZoneVobFarPlaceDefault`)

Kontroluje, jak daleko voby są widoczne przed ich ukryciem.

**Właściwości:**

- **vobFarPlaneZ**: Odległość renderowania w jednostkach
- **Zalecane wartości:**
  - Otwarte lokacje: `7500` - `11000`
  - Zamknięte wnętrza: `3000` - `5000`
  - Jaskinie/lochy: `2000` - `4000`

**Konfiguracja:**

1. Wstaw typ voba: `zCZoneVobFarPlaceDefault`
2. Otwórz właściwości
3. Ustaw wartość `vobFarPlaneZ`
4. Kliknij Apply

### 3. Domyślna odległość mgły (`zCZoneZFogDefault`)

Kontroluje odległość renderowania mgły świata i atmosferę.

**Właściwości:**

- **fogRangeCenter**: Odległość, gdzie zaczyna się mgła w jednostkach
- **Zalecane wartości:**
  - Otwarte lokacje: `10000` - `12000`
  - Obszary leśne: `6000` - `8000`
  - Jaskinie/lochy: `2000` - `4000`

**Konfiguracja:**

1. Wstaw typ voba: `zCZoneZFogDefault`
2. Otwórz właściwości
3. Ustaw wartość `fogRangeCenter`
4. Skonfiguruj kolor mgły, jeśli potrzeba
5. Kliknij Apply

### Podsumowanie

**Wszystkie trzy voby razem:**

![Przykład wymaganych vobów - wszystkie trzy typy widoczne na liście vobów]

:::danger
Lokacje bez tych vobów mogą mieć błędy renderowania, problemy z wydajnością lub crashować grę. Zawsze uwzględniaj wszystkie trzy.
:::

---

## Używanie renderera DirectX 11

SpacerNET obsługuje renderer DirectX 11 dla poprawionej jakości wizualnej i wydajności podczas edycji świata.

### Zalety

1. **Stabilne FPS** - Konsekwentna liczba klatek niezależnie od liczby poligonów czy lokacji
2. **Wsparcie V-Sync** - Lepsze ograniczanie klatek i synchronizacja
3. **Widoczność trawy** - Unosząca się trawa (nie dotykająca ziemi) jest wyraźnie widoczna dla łatwiejszego czyszczenia
4. **Rozszerzona odległość widoku** - Zasięg rysowania prawie nie wpływa na FPS z nowoczesnymi GPU
5. **Ulepszenia wizualne** - Regulacje jasności/kontrastu/trybu HDR

### Wady

1. **Nie można kompilować** - Tryb DX11 nie może kompilować światów ani oświetlenia
2. **Ignorowanie portali** - DX11 nie pokazuje uszkodzonych portali; zawsze testuj na DX7
3. **Tylko umieszczanie vobów** - Nadaje się tylko do umieszczania/edycji vobów na istniejących światach

### Instalacja

1. **Pobierz renderer DirectX 11**
   - Odwiedź: [GD3D11 Releases](https://github.com/SaiyansKing/GD3D11/releases)
   - Wymagana wersja: [v17.8-rev'SK6](https://github.com/SaiyansKing/GD3D11/releases/tag/v17.8-rev%27SK6) lub nowsza
   - Pobierz archiwum wydania

2. **Zainstaluj do folderu Gothic System**
   - Wypakuj wszystkie pliki do folderu `<Gothic>/System/`
   - Główny plik: `ddraw.dll` - aktywuje renderer DX11

3. **Przełączanie DX11 Włącz/Wyłącz**
   - **Aby wyłączyć DX11:** Zmień nazwę `ddraw.dll` na `ddraw.dll.bak` (lub inne rozszerzenie)
   - **Aby włączyć DX11:** Zmień nazwę z powrotem na `ddraw.dll`

### Zalecenia dotyczące przepływu pracy

**Używaj DX11 do:**

- Umieszczania vobów na istniejących skompilowanych światach
- Sprawdzania jakości wizualnej
- Przechwytywania zrzutów ekranu/wideo
- Umieszczania vobów w dużych scenach zewnętrznych

**Przełącz się na DX7 do:**

- Ładowania plików meshu
- Kompilowania światów
- Kompilowania oświetlenia
- Testowania i walidacji portali
- Ostatecznej kontroli jakości

### System przełączania plików wsadowych

Utwórz dwa pliki wsadowe dla łatwego przełączania wersji DX:

**dx11_on.bat:**

```batch
@echo off
if exist ddraw.dll.bak (
    ren ddraw.dll.bak ddraw.dll
    echo DX11 wlaczony
) else (
    echo DX11 juz wlaczony
)
pause
```

**dx11_off.bat:**

```batch
@echo off
if exist ddraw.dll (
    ren ddraw.dll ddraw.dll.bak
    echo DX11 wylaczony - uzywam DX7
) else (
    echo DX11 juz wylaczony
)
pause
```

Umieść oba pliki w folderze `<Gothic>/System/`. Uruchom odpowiedni plik wsadowy przed uruchomieniem SpacerNET.

:::tip
Utwórz skróty na pulpicie do tych plików wsadowych dla szybkiego przełączania podczas sesji deweloperskich.
:::

---

## Wyciąganie meshu z pliku ZEN

Potrzebujesz edytować geometrię świata, ale nie masz oryginalnego projektu Blender/3ds Max? Wyciągnij mesh bezpośrednio ze skompilowanego pliku ZEN.

### Proces wyciągania

1. **Otwórz lokację w SpacerNET**
   - File → Load World
   - Wybierz plik `.zen`, z którego chcesz wyciągnąć

2. **Eksportuj mesh**
   - File → Save MESH
   - Wybierz nazwę pliku (np. `WYCIAGNIETY_SWIAT.MSH`)
   - Zapisz w formacie `.msh`

3. **Importuj do Blendera**
   - Otwórz Blender (pusty projekt)
   - File → Import → MESH
   - Wybierz zapisany plik `.msh`
   - Mesh pojawia się na scenie Blendera

### Praca z wyciągniętymi meshami

**Obsługa limitu poligonów:**

- Limit formatu Gothic 3DS: **65 535 poligonów na obiekt**
- Jeśli świat przekracza to, ręcznie podziel na wiele obiektów w Blenderze
- Użyj Tryb edycji → Zaznacz sekcje → Separate (klawisz P) → Selection

**Ponowny eksport do SpacerNET:**

1. Podziel duże meshe na kawałki mniejsze niż 65k poligonów
2. Eksportuj każdy jako osobny plik `.3ds`
3. Wczytaj wszystkie pliki `.3ds` w SpacerNET jako mesh świata

### Potencjalne problemy

**Uszkodzenia portali:**

- Duże światy mogą mieć uszkodzone portale po wyciągnięciu
- Zawsze sprawdzaj integralność portali po ponownym imporcie
- Ręcznie napraw uszkodzone portale w edytorze 3D

**Błędy materiałów:**

- Niektóre lokacje importują się z niepoprawnymi materiałami
- Większe światy = wyższe prawdopodobieństwo błędów
- Ręcznie zweryfikuj i napraw materiały w Blenderze

**Błędy importu:**

- Złożona geometria może nie zaimportować się idealnie
- Sprawdź brakujące poligony, odwrócone normalne
- Porównaj wyciągnięty mesh z oryginalnym światem wizualnie

:::warning
Zawsze zachowuj oryginalne pliki źródłowe (projekty Blender/Max). Wyciąganie to metoda zapasowa - edycja wyciągniętych meshów jest mniej niezawodna niż praca z oryginalnymi źródłami.
:::

:::danger
Dokładnie testuj wyciągnięte i ponownie zaimportowane światy. Systemy portali i kolizje mogą ulec uszkodzeniu podczas cyklu wyciągania/ponownego importu.
:::

---

## Wykrywanie błędów rozwinięcia UV

SpacerNET v1.29+ zawiera narzędzia do wykrywania problemów z mapowaniem UV w meshach świata.

### Aktywowanie wykrywania problemów UV

1. **Włącz tryb UV**
   - Kliknij **ikonę U** na pasku narzędzi
   - Otwiera się osobne okno UV

2. **Wejdź w wybór poligonów**
   - Kliknij **ikonę pipetki**, aby wejść w tryb wyboru poligonów
   - Pozwala na inspekcję poszczególnych poligonów

3. **Znajdź problematyczne poligony**
   - W oknie UV kliknij przycisk **"Find UV problems"**
   - Problematyczne poligony rysowane są z **czerwonymi konturami**

### Rozumienie wyników

:::info Ważne
To narzędzie pokazuje **potencjalne** problemy tylko. Czerwone kontury wskazują podejrzane mapowanie UV, ale nie wszystkie oflagowane poligony są faktycznie uszkodzone.
:::

**Sprawdź każdy oflagowany poligon:**

- Wizualnie sprawdź w edytorze
- Szukaj rozciągniętych tekstur
- Sprawdź wypaczone wzory
- Porównaj z sąsiednimi poligonami

### Opcje konfiguracji

**Kąt zniekształcenia** (domyślnie: 35°)

- Niższa wartość = więcej oflagowanych poligonów (bardziej restrykcyjne)
- Wyższa wartość = mniej oflagowanych poligonów (bardziej pobłażliwe)
- Dostosuj w oparciu o złożoność lokacji i standardy jakości

**Odległość renderowania**

- Kontroluje, jak daleko podświetlane są problematyczne poligony
- Zmniejsz dla wydajności w dużych światach
- Zwiększ dla pełnej widoczności

**Inne ustawienia:**

- Wszystkie opcje oznaczone w oknie UV
- Regulowane w czasie rzeczywistym
- Działa tylko po wczytaniu pliku ZEN

### Wskazówki dotyczące przepływu pracy

1. **Uruchom sprawdzanie po imporcie**
   - Pierwsza akcja po wyciągnięciu meshu z ZEN
   - Identyfikuje problemy przed rozpoczęciem edycji

2. **Używaj konserwatywnych ustawień**
   - Zacznij od domyślnego kąta zniekształcenia 35°
   - Dostosuj tylko, jeśli otrzymujesz zbyt wiele fałszywych alarmów

3. **Napraw w edytorze 3D**
   - Zanotuj lokalizacje poligonów
   - Przełącz się na Blender/Max
   - Ponownie rozwiń problematyczne obszary
   - Ponownie wyeksportuj i zweryfikuj

:::tip
Uruchom sprawdzanie UV przed finalną kompilacją świata, aby wcześnie wykryć problemy z teksturami.
:::

---

## Tworzenie mapy lokacji w Blenderze

Generuj mapy w grze dla swoich niestandardowych lokacji używając systemu renderowania Blendera.

### Wymagania

- Blender 4.0 lub nowszy
- Ukończony mesh świata
- Podstawowa wiedza o Blenderze

### Proces krok po kroku

#### 1. Konfiguracja silnika renderowania

Ustaw silnik renderowania na **Cycles**:

- Górne menu → Render Properties
- Dropdown Render Engine → **Cycles**

#### 2. Konfiguracja rozdzielczości

**Krytyczne: Użyj stosunku 4:3**, aby zapobiec rozciąganiu w Gothicu:

- Render Properties → Output
- **Rozdzielczość:**
  - Szerokość: `3000` px (zalecane)
  - Wysokość: `2250` px (zachowuje stosunek 4:3)
- Można używać innych rozdzielczości, jeśli zachowany jest stosunek 4:3

#### 3. Konfiguracja oświetlenia

Dodaj **źródło światła Sun**:

1. Add → Light → Sun
2. **Siła:** `3.0` (dostosuj dla preferowanej jasności)
3. **Obrót:** Ustaw dla pożądanego kierunku cienia
   - Użyj `90°` obrotu dla renderowania bez cieni
   - Kątuj cienie dla dramatycznego efektu
4. Pozycja nie ma znaczenia - Sun jest kierunkowe

#### 4. Konfiguracja kamery

**Dodaj i skonfiguruj kamerę ortograficzną:**

1. **Dodaj kamerę**
   - Add → Camera
   - Umieść nad środkiem świata

2. **Zerowy obrót** (krytyczne!)
   - Właściwości Transform (naciśnij N)
   - Obrót X, Y, Z: wszystkie `0°`

3. **Typ kamery**
   - Camera Properties → Type: **Orthographic**

4. **Skala ortograficzna**
   - Dostosuj, aż ramka kamery obejmie całą lokację
   - Wartość skali określa obszar pokrycia mapy
   - Ramka powinna pasować do całego grywalnego obszaru

5. **Wysokość kamery**
   - Umieść wysoko nad lokacją
   - Dokładna wysokość nie ma znaczenia (projekcja ortograficzna)
   - Upewnij się, że nic nie przechodzi przez kamerę

#### 5. Renderuj mapę

**Wykonaj render:**

1. Naciśnij **F12** (lub Render → Render Image)
2. Poczekaj na zakończenie renderowania
3. **Zapisz obraz:**
   - Image → Save As
   - **Format TGA** dla Gothica
   - **Format PNG**, jeśli najpierw edytujesz w Photoshopie

#### 6. Oblicz współrzędne

Użyj narzędzia online do obliczania współrzędnych:

- Odwiedź: [Kalkulator współrzędnych](https://onecompiler.com/html/4494hx3m7)
- Kliknij przycisk **Run** (po prawej stronie)

**Wartości wejściowe:**

- **Scale:** Skala ortograficzna z kamery
- **X:** Pozycja kamery X w Blenderze (właściwości Item, naciśnij N)
- **Y:** Pozycja kamery Y w Blenderze

**Wyjście:** Cztery wartości współrzędnych dla skryptu

#### 7. Implementacja w skrypcie Daedalus

Dodaj mapę do gry za pomocą skryptu:

```daedalus
func void POKAZ_MAPA_MOJEJ_LOKACJI() {
    var int Document;

    Document = Doc_CreateMap();
    Doc_SetPages(Document, 1);
    Doc_SetPage(Document, 0, "MAP_MOJALOKACJA.tga", TRUE); // Twoja nazwa pliku TGA
    Doc_SetLevel(Document, "WORLD\\MOJALOKACJA.zen");      // Ścieżka do pliku ZEN
    Doc_SetLevelCoords(Document, -6262, 49048, 113738, -40952); // Obliczone współrzędne
    Doc_Show(Document);
};
```

**Format współrzędnych:** `lewyX, górnyY, prawyX, dolnyY`

#### 8. Testuj i dopracuj

**Pierwsza kompilacja:**

- Tekstura TGA kompiluje się przy pierwszym wczytaniu (2-5 sekund)
- Sprawdź pozycję kursora gracza
- Zweryfikuj granice mapy

**Przepływ pracy udoskonalania:**

1. Testuj skompilowaną mapę w grze
2. Jeśli poprawna, ulepsz TGA w edytorze obrazów:
   - Dodaj kanał alfa dla podartych krawędzi
   - Korekcja kolorów
   - Artystyczne akcenty
   - Upscaling AI, jeśli pożądany

**Aktualizuj teksturę:**

- Usuń skompilowany plik `.TEX`: `Textures\_compiled\MAP_MOJALOKACJA-C.TEX`
- Zamień `MAP_MOJALOKACJA.TGA` na ulepszoną wersję
- Silnik ponownie kompiluje przy następnym wczytaniu

### Odniesienie do formuły

**Formuła obliczania współrzędnych:**

```
lewyX = camX - (skala / 2)
prawyX = camX + (skala / 2)
górnyY = camY + (skala / 2)
dolnyY = camY - (skala / 2)
```

(Obsługiwane automatycznie przez kalkulator online)

:::tip
Zapisz konfigurację kamery w Blenderze. Jeśli później zaktualizujesz lokację, możesz ponownie renderować z identycznymi ustawieniami dla spójnego wyglądu mapy.
:::

:::info
Dla lokacji wielopoziomowych (np. zamek z piwnicą), utwórz osobne mapy dla każdego poziomu z różnymi wysokościami i skalami kamery.
:::

---

## Podsumowanie

Te dodatkowe techniki ulepszają przepływy pracy SpacerNET:

- **Najlepsze praktyki** zapobiegają typowym błędom lokacji
- **Wymagane voby** zapewniają odpowiednie renderowanie i atmosferę
- **DirectX 11** poprawia doświadczenie edycji wizualną poprawą
- **Wyciąganie meshu** umożliwia edycję skompilowanych światów
- **Wykrywanie UV** identyfikuje problemy z mapowaniem tekstur
- **Tworzenie mapy** generuje profesjonalne mapy w grze

Opanuj te techniki, aby tworzyć dopracowane, profesjonalne lokacje Gothica.
