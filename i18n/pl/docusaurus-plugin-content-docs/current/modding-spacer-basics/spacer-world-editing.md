---
sidebar_position: 2
title: "SpacerNET - Edycja światów"
description: "Kompleksowy poradnik edycji światów Gothica za pomocą SpacerNET - voby, waypoints, triggery, oświetlenie i więcej."
---

# SpacerNET - Edycja światów

Ten poradnik omawia praktyczne aspekty edycji światów w SpacerNET, w tym pracę z obiektami świata (vobami), waypointami, triggerami, kamerami i oświetleniem.

:::info Wymagania wstępne
Przed rozpoczęciem upewnij się, że masz zainstalowany i skonfigurowany SpacerNET. Zobacz [poradnik instalacji SpacerNET](../tools/spacer), aby uzyskać instrukcje konfiguracji.
:::

## Otwieranie i nawigacja po światach

Wszystkie tutoriale będą używać oryginalnych światów gry jako przykładów. Lekcje dotyczące tworzenia światów od podstaw zostaną omówione osobno.

Pliki światów muszą znajdować się w `_work\data\Worlds\` z dowolną ścieżką po tym (tylko łacińskie znaki).

### Otwieranie świata

1. Uruchom SpacerNET - zobaczysz czarne okno
2. Kliknij **File → Open ZEN**
3. Wybierz plik swojego świata (np. `_work\data\Worlds\NewWorld\NewWorld_Part_Xardas_01.zen`)
4. Poczekaj na załadowanie świata

:::warning Brakujące pliki
Jeśli SpacerNET wywala się podczas ładowania, brakuje Ci wymaganych plików zasobów. Upewnij się, że zainstalowałeś ModKit (G2MDK), lub jeśli używasz światów z innych modów, musisz dołączyć ich pliki VDF.
:::

### Nawigacja kamerą

Możesz dostosować sterowanie kamerą w ustawieniach, z wyjątkiem prawego przycisku myszy (PPM).

**Podstawowe poruszanie:**

- **PPM + WASD** - Poruszanie kamerą w poziomie
- **PPM + Spacja** - Poruszanie w górę
- **PPM + X** - Poruszanie w dół
- **Lewy Shift** - Poruszanie szybciej
- **Lewy Ctrl** - Poruszanie wolniej i bardziej precyzyjnie
- **Kółko myszy** - Szybkie poruszanie do przodu w kierunku patrzenia kamery
- **Ruch myszy** - Obracanie kamerą
- **F3** - Ukryj okna interfejsu

:::tip Zachowanie okien
Domyślnie okna znikają podczas ruchu kamery. Możesz zmienić to ustawienie w menu Kamery z poprzednich lekcji.
:::

## Praca z vobami (obiektami)

Voby (obiekty wizualne) są podstawowymi elementami światów Gothica - przedmioty, dekoracje, triggery, światła itp.

### Wymagane okna

Potrzebujesz dwóch aktywnych okien do pracy z vobami:

- **Okno właściwości** - Pokazuje właściwości wybranego voba
- **Lista obiektów** - Wyświetla wszystkie obiekty w świecie

![Wymagane okna](/img/spacer_11.JPG)

### Zaznaczanie i odznaczanie vobów

**Zaznaczanie:**

- **Lewy klik** na voba - Pojawia się czerwona ramka (bbox)
- **Ctrl + Lewy klik** - Wymagane dla niektórych vobów, które nie zaznaczają się normalnie

**Odznaczanie:**

- Kliknij na pustym miejscu w świecie, LUB
- Naciśnij **4**

**Na liście obiektów:**

- **Pojedynczy klik** - Ładuje właściwości voba
- **Podwójny klik** - Fokusuje kamerę na voba

### Przesuwanie vobów

1. Włącz **tryb przesuwania** - Naciśnij **1**
2. Użyj **WASD** do przesunięcia voba w poziomie
3. Użyj **Spacja/X** do przesunięcia voba w górę/w dół
4. **Lewy Shift** - Przesuwaj szybciej
5. **Lewy Ctrl** - Przesuwaj wolniej i bardziej precyzyjnie
6. Naciśnij **5** - Przenieś voba do pozycji kamery
7. **Shift+F** - Upuść voba na powierzchnię (może przejść przez inne voby)

:::info Kolizje
W przeciwieństwie do starego Spacera, nie musisz wyłączać kolizji, aby przesuwać voby - SpacerNET obsługuje to automatycznie!
:::

### Obracanie vobów

1. Włącz **tryb obracania** - Naciśnij **2**
2. Domyślnie obrót jest względem kamery (tryb camera/view)
3. **Shift+T** - Przełączanie trybów obracania (camera/view jest zalecany)
4. Użyj **WASD** do obrócenia obiektu
5. **Q/E** - Obrót wokół osi pionowej (działa również w trybie przesuwania)
6. **Shift+R** - Resetuj obrót voba do domyślnej orientacji

### Kopiowanie i usuwanie vobów

**Usuwanie:**

- Klawisz **Delete** - Usuwa voba ze świata (nie można cofnąć, chyba że przeładujesz)

:::warning Obiekty podrzędne
Jeśli vob zawiera inne voby (dzieci), one również zostaną usunięte. Przykład: Pochodnia zawiera w sobie TORCH_BURN, FIRE_PFX i inne obiekty. Usunięcie pochodni usuwa również wszystkie jej elementy podrzędne.

![Usuwanie vobów](/img/spacer_12.JPG)
:::

**Kopiowanie:**

1. **Ctrl+C** - Oznacz voba do kopiowania
2. **Ctrl+V** - Wklej voba
   - Jeśli żaden vob nie jest zaznaczony - Wkleja globalnie do świata
   - Jeśli vob jest zaznaczony - Wkleja jako dziecko tego voba

**Przenoszenie od rodzica:**

1. Zaznacz voba-dziecko
2. **Ctrl+Z** - Wytnij voba
3. Naciśnij **4**, aby odznaczyć
4. **Ctrl+V** - Wklej do świata (teraz niezależny)

### Inne przydatne skróty

- **Ctrl+R** - Przywróć oryginalną pozycję i obrót voba z momentu załadowania świata
- **M** - Tryb kombinowany (przesuwanie i obracanie jednocześnie z różnymi klawiszami)
- **Shift+H** - Połącz ruch kamery z ruchem voba (rzadko używane)

## Tworzenie nowych vobów

### Tworzenie podstawowych vobów

Otwórz **Okno obiektów** i przejdź do pierwszej zakładki (Wszystkie klasy).

![Tworzenie podstawowych vobów](/img/spacer_13.JPG)

1. Wybierz typ voba - Dla większości obiektów użyj **zCVob** (beczki, stoły, drzewa, trawa)
2. Opcjonalnie: Wprowadź nazwę (wymagane tylko dla unikalnych obiektów, takich jak triggery)
3. Opcjonalnie: Wybierz model 3D (szukaj i naciśnij **Enter**, aby zobaczyć dostępne wizualizacje)
4. Opcjonalnie: Ustaw typ kolizji:
   - **Dynamic collision** - Standardowa kolizja między graczem a obiektem
   - **Static collision** - Używana do sprawdzania kolizji siatki
5. Kliknij **Create**

Nowy vob pojawia się w świecie na pozycji kamery.

:::tip Szybkie tworzenie
Nazwę modelu i kolizję można również ustawić później przez właściwości voba.
:::

### Tworzenie przedmiotów (oCItem)

Przedmioty to specjalne voby zdefiniowane w skryptach. Aby dodać przedmioty, użyj zakładki **Items**.

W przeciwieństwie do zwykłych vobów, przedmioty nie mogą mieć niestandardowych nazw ani wizualizacji - są zdefiniowane w skryptach.

![Tworzenie przedmiotów](/img/spacer_14.JPG)

**Metoda 1: Z listy**

1. Wybierz przedmiot z lewej listy
2. Kliknij **Create Item**

**Metoda 2: Wyszukiwanie**

1. Wprowadź termin wyszukiwania w prawym polu wyszukiwania (np. `itpo_`)
2. Pokazuje pasujące przedmioty według nazwy wizualizacji
3. Kliknij prawy przycisk **Create Item**

**Lokator przedmiotów:**

- Przełącz, aby pokazać ikony wszystkich przedmiotów na mapie
- Przydatne do zobaczenia, jakie przedmioty są gdzie
- Można filtrować według flag i prefiksu nazwy (np. ITPO\_ dla mikstur)
  ![Lokator przedmiotów](/img/spacer_15.JPG)

### Tworzenie vobów z własnym modelem

Aby użyć własnych modeli 3D jako vobów:

1. Utwórz model w Blenderze z odpowiednimi materiałami
2. Przekonwertuj do `.3ds` za pomocą wtyczki kerraxa
3. Umieść plik `.3ds` w `Gothic II\_work\data\Meshes\` (organizuj w podfoldery jak oryginalne modele)
4. W SpacerNET wprowadź nazwę modelu z rozszerzeniem w polu visual: `mymodel.3ds`
5. Kliknij **Create**

:::warning Unikalne nazwy
Nazwy modeli NIE MOGĄ być takie same jak oryginalne modele gry, aby uniknąć konfliktów.
:::

## Wyszukiwanie, usuwanie i zmiana nazw vobów

SpacerNET zapewnia potężne narzędzia do wyszukiwania, masowego usuwania i zmiany nazw vobów w twoim świecie.

### Wyszukiwanie vobów po wizualizacji

Aby znaleźć wszystkie voby z konkretną wizualizacją (np. `OC_PICTURE_V2.3DS`):

1. Otwórz zakładkę **Search** (Wyszukiwanie) w Oknie obiektów
2. Upewnij się, że typ voba jest ustawiony na **zCVob**
3. **Podwójny klik** na polu **visual** (pojawi się czerwony kwadrat - pole jest aktywne)
4. Wprowadź nazwę wizualizacji, której szukasz
5. Kliknij **Search**

Wyniki pojawią się na liście. Możesz klikać na nie, aby przejść do każdego voba.

![Wyszukiwanie vobów](/img/spacer_16.JPG)

**Łączenie kryteriów wyszukiwania:**

Możesz łączyć wiele pól. Na przykład, aby znaleźć voby z wizualizacją `OC_PICTURE_V2.3DS` I nazwą `123`:

1. Podwójny klik na polu **visual**, wpisz `OC_PICTURE_V2.3DS`
2. Podwójny klik na polu **vobName**, wpisz `123`
3. Kliknij **Search**

Znalezione zostaną tylko voby spełniające oba kryteria.

![Wyszukiwanie wielokryterialne](/img/spacer_17.JPG)

### Wyszukiwanie przedmiotów w lokacjach

Aby znaleźć wszystkie złote skrzynie (`ITMI_GOLDCHEST`) w lokacji, włącznie ze skrzyniami:

1. Wybierz typ voba **oCItem**
2. Podwójny klik na polu **itemInstance**
3. Wprowadź nazwę instancji przedmiotu: `ITMI_GOLDCHEST`
4. Włącz opcję wyszukiwania w skrzyniach
5. Kliknij **Search**

Wyniki pokażą wszystkie pasujące przedmioty zarówno w świecie, jak i wewnątrz kontenerów.

![Wyszukiwanie przedmiotów](/img/spacer_18.JPG)

### Zaawansowane opcje wyszukiwania

Dodatkowe warunki wyszukiwania:

1. **Search in base classes** (Szukaj w klasach bazowych) - Czy szukać w klasach dziedziczonych (np. jeśli szukasz MobInter, szukaj też w zCVob)
2. **Use regex** (Użyj wyrażeń regularnych) - Używaj wyrażeń regularnych (dopasowania wzorców) dla pól vobName lub visual
3. **Match vob names** (Dopasuj nazwy vobów) - Znajdź voby z identycznymi nazwami (przydatne do znajdowania duplikatów nazw skrzyń)
   - Wybierz typ voba (np. `oCMobContainer`)
   - Zostaw pola visual/vobName puste
   - Wyniki pokażą wszystkie voby z duplikowanymi nazwami
4. **Has children** (Ma dzieci) - Znajdź voby zawierające inne voby (niekompatybilne z "Match vob names")
5. **Search radius from camera** (Promień wyszukiwania od kamery) - Szukaj tylko w określonym promieniu od aktualnej pozycji kamery zamiast całego świata

### Masowe usuwanie vobów

Aby usunąć wszystkie voby z konkretną wizualizacją (np. `OC_PICTURE_V2.3DS`):

1. Wybierz typ voba **zCVob**
2. Podwójny klik na polu **visual**
3. Wprowadź nazwę wizualizacji
4. Kliknij **Search**
5. Otrzymasz listę pasujących vobów
6. Wybierz tryb **Remove** (Usuń) z menu rozwijanego
7. Przycisk Search zmieni się na **Remove**
8. Kliknij **Remove** i potwierdź

Wszystkie pasujące voby zostaną usunięte. Możesz potem wrócić do trybu **Search**.

### Masowa zmiana nazw vobów

Aby zmienić nazwy wszystkich skrzyń w lokacji według wzorca `NW_CHEST_1` ... `NW_CHEST_N`:

1. Wybierz typ voba **oCMobContainer**
2. Zostaw pola **vobName** i **visual** puste (aby znaleźć wszystkie skrzynie)
3. Kliknij **Search**
4. Pojawi się lista wszystkich skrzyń
5. Wybierz tryb **Rename** (Zmień nazwę) z menu rozwijanego
6. Otworzy się okno zmiany nazw - wybierz opcję 3 (prefiks + numer)
7. Wprowadź prefiks: `NW_`
8. Kliknij **Apply** (okno się zamknie)
9. Kliknij **Rename**

Wszystkie skrzynie zostaną przemianowane od `NW_1` do `NW_16` (lub ilekolwiek zostało znalezionych).

**Inne opcje zmiany nazw:**

- Ustaw pustą nazwę dla wszystkich vobów
- Ustaw identyczną nazwę dla wszystkich vobów

### Dodatkowe tryby

Inne przydatne tryby dostępne po wyszukiwaniu:

1. **Replace with VobTree** (Zamień na VobTree) - Zamienia znalezione voby na VobTree z pliku ZEN (wcześniej przygotowana kolekcja vobów)
2. **Toggle dynamic collision** (Przełącz kolizję dynamiczną) - Zmienia kolizję dynamiczną na przeciwną
   - Przykład: Znajdź wszystkie kamienie bez kolizji, zastosuj tę opcję, a wszystkie będą miały kolizję dynamiczną
3. **Search for unconnected WP** (Szukaj niepołączonych WP) - Znajduje waypointy bez połączeń z innymi waypointami
   - Posiadanie niepołączonych WP nie jest błędem, ale czasami ważne jest to śledzić
4. **Convert** (Konwertuj) - Nie zaimplementowane (nie działa)

## Praca z waypointami i freepointami

Waypoints (WP) i Freepoints (FP) definiują nawigację i pozycje NPC.

### Włączanie widoku waypointów

Upewnij się, że widoczne są voby pomocnicze i siatka waypointów:

- Włącz wyświetlanie **Help-vobs**
- Włącz wyświetlanie **siatki waypointów**

### Tworzenie waypointów (WP)

1. Przejdź do zakładki **WP/FP** w Oknie obiektów
2. Wprowadź nazwę waypointa
3. Kliknij **Create Waypoint**

**Opcje:**

- **Connect to waynet at once** - Nowy WP łączy się z poprzednio zaznaczonym WP
- **Auto-generated name** - Nazwy automatycznie się zwiększają (np. SOME_001, SOME_002)

**Szybkie tworzenie:**

1. Zaznacz istniejący WP
2. Naciśnij **Ctrl+C**
3. Przesuń kamerę do nowej pozycji
4. Naciśnij **F2** - Tworzy połączony WP z automatycznie zwiększoną nazwą

### Łączenie/Rozłączanie waypointów

1. Zaznacz pierwszy WP
2. **Shift + Klik** drugi WP (będzie migać)
3. Naciśnij **3** - Przełącza połączenie między dwoma WP

### Tworzenie freepointów (FP)

Tak samo jak waypoints - użyj przycisku **Create Freepoint** lub **F2** po skopiowaniu FP.

:::warning Obiekty nadrzędne
Przed wstawieniem nowego FP, odznacz wszystkie voby (naciśnij **4**), w przeciwnym razie nowy FP zostanie wstawiony jako dziecko zaznaczonego voba.
:::

**Orientacja:**
Orientacja FP/WP zależy od ustawień w menu konfiguracji.

## Praca z triggerami i moverami

Movery to animowane obiekty, takie jak drzwi, bramy lub platformy ruchome.

### Tworzenie movera

1. Wybierz typ voba **zCMover**
2. Wprowadź unikalną nazwę
3. Wybierz wizualizację (model 3D)
4. Ustaw **Dynamic collision**
5. Kliknij **Create**

### Konfiguracja ruchu movera

Po utworzeniu zaznacz movera i przejdź do zakładki **Triggers**:

1. **New Key** - Tworzy klatkę kluczową w bieżącej pozycji (zaczyna od klucza 0)
2. Przesuń movera do nowej pozycji
3. **New Key** - Tworzy klucz 1
4. Żółta linia pokazuje ścieżkę ruchu

**Nawigacja:**

- Przyciski strzałek - Przechodzenie między kluczami
- **Run** - Uruchom animację movera

### Właściwości movera

1. **Speed** - Prędkość ruchu między kluczami (wyższa = szybciej)
2. **Move behavior** (Zachowanie ruchu):
   - **LINEAR** - Ruch po linii prostej
   - **CURVE** - Lekko zakrzywiona ścieżka
3. **Speed function** (Funkcja prędkości):
   - **CONST** - Stała prędkość
   - **SLOW_START_END** - Przyspieszenie na początku, zwolnienie na końcu
4. **Behavior mode** (Tryb zachowania):
   - **2STATE_TRIGGER_CTRL** - Może być użyty tylko raz
   - **NSTATE_LOOP** - Ciągły automatyczny ruch
   - **2STATE_TOGGLE** - Może być używany wiele razy przez skrypty/triggery
5. **Sound section** - Instancje SFX dla dźwięków ruchu

**Przykładowe dźwięki dla żelaznej bramy:**

- Dźwięk początkowy
- Pętla dźwięku ruchu
- Dźwięk końcowy

**Kolizja statyczna:**
Jeśli sąsiednie voby mają `isStatic = TRUE`, mover zignoruje z nimi kolizję i przejdzie przez nie (przydatna funkcja).

## Praca z kamerami

Kamery tworzą cutscenki lub przeloty kinematograficzne.

### Tworzenie kamery

Przejdź do zakładki **Camera** w Oknie obiektów:

1. Wprowadź nazwę kamery
2. Kliknij **Create**
3. Obiekt kamery pojawia się w świecie

### Konfigurowanie ścieżki kamery

1. Przesuń kamerę do żądanej pozycji
2. **Add a position** - Tworzy klatkę kluczową
3. Powtórz dla każdej pozycji kamery

Klucze są numerowane od 1 do n. Pierwszy klucz ma etykietę **START**, ostatni klucz **END**.

### Testowanie ruchu kamery

1. Ustaw czas odtwarzania (w sekundach)
2. Kliknij **Start** - Kamera leci wzdłuż ścieżki

**Wywoływanie w grze:**

```daedalus
Wld_SendTrigger("EVT_CAM_1");  // Użyj nazwy swojej kamery
```

### Ustawienia czasu kamery

Czas jest ustawiany w dwóch miejscach:

- **Czas okna** (np. 5 sekund) - Do testowania w SpacerNET
- Właściwość **totalTime** - Rzeczywisty czas w grze

Dopasuj te wartości po znalezieniu odpowiedniego czasu w SpacerNET.

### Cele kamery

**Metoda 1: Linia celów**
Dodaj **targets** (punkty, na które kamera patrzy podczas lotu). Czerwone strzałki pokazują kierunek patrzenia kamery.

**Menu prawym przyciskiem:**

- Usuń klucze
- Dodaj klucze między istniejącymi

**Metoda 2: Skupienie na Voba**
Ustaw właściwość `autoCamFocusVobName` na unikalną nazwę voba. Kamera będzie patrzyć na ten vob podczas całego lotu.

### Przydatne właściwości kamery

1. **Auto focus to first key** - Płynne przejście do pierwszej klatki kluczowej (nie natychmiastowe)
2. **Auto focus from last key** - Płynne wyjście z kamery z powrotem do gracza
3. **Player control** - Włącz/wyłącz kontrolę gracza podczas ruchu kamery (zazwyczaj FALSE dla cutscen)

## Tworzenie obiektów interaktywnych

SpacerNET pozwala tworzyć specjalne obiekty interaktywne, takie jak drzwi, łóżka i triggery zmiany lokacji.

### Tworzenie drzwi

Aby stworzyć funkcjonujące drzwi:

1. Wybierz typ voba **oCMobDoor**
2. **Wyłącz** opcję "Search only 3DS" (Szukaj tylko 3DS)
3. Wprowadź nazwę standardowego modelu drzwi (np. wyszukaj modele drzwi)
4. Wybierz z listy
5. Kliknij **Create Vob** (Utwórz voba)

Drzwi zostały utworzone. Nie zapomnij sprawdzić **kolizji dynamicznej**, aby gracz nie mógł przechodzić przez nie.

### Tworzenie łóżka

Aby stworzyć łóżko, z którego mogą korzystać NPC:

1. Wybierz typ voba **oCMobBed**
2. **Wyłącz** opcję "Search only 3DS" (Szukaj tylko 3DS)
3. Wprowadź nazwę standardowego modelu łóżka
4. Wybierz z listy
5. Kliknij **Create Vob** (Utwórz voba)

Łóżko zostało utworzone. Nie zapomnij sprawdzić **kolizji dynamicznej**, aby gracz nie mógł przechodzić przez nie.

:::info Alternatywna metoda
Czasami łóżka tworzy się używając typu **oCMobDoor** (prawdopodobnie po to, aby można było podchodzić do łóżka z obu stron), ale generalnie nie jest to zalecane.
:::

### Tworzenie triggera zmiany lokacji

Aby stworzyć trigger, który przenosi gracza do innej lokacji:

1. Wybierz typ voba **oCTriggerChangeLevel**
2. Włącz **kolizję dynamiczną** (bez tego gracz go nie uruchomi)
3. Upewnij się, że visual jest pusty (wyczyść, jeśli potrzeba)
4. Kliknij **Create Vob** (Utwórz voba)
5. Ustaw właściwość **levelName** na plik świata, który ma zostać załadowany
   - Przykład: `NEWWORLD\NEWWORLD.ZEN` (użyj ukośnika wstecznego `\`)
   - Ścieżka jest względna do `_work\data\Worlds\`
6. Ustaw właściwość **startVobName** na voba, gdzie gracz ma się pojawić
   - Przykład: `FP_ENTER_NEW_FROM_ARENA` (nazwa Freepointu)
7. Użyj **trybu edycji bbox** (naciśnij **6**), aby ustawić rozmiar strefy triggera
   - Czerwone linie pokazują granice strefy
   - Zobacz [tutorial edycji BBOX](https://worldofplayers.ru/threads/43491/) po szczegóły
8. Sprawdź, czy właściwość **respondToPC** jest ustawiona na **TRUE** (reaguje na gracza wchodzącego do strefy)

**Ważne ustawienia właściwości:**

- **respondToPC** = `TRUE` - Trigger aktywuje się, gdy gracz wejdzie
- **respondToNPC** = `FALSE` - Zapobiega aktywacji przez przechodzące NPC/potwory
- **respondToObject** = `FALSE` - Zapobiega aktywacji przez przedmioty (np. strzały)
- **reactToOnDamage** = `FALSE` - Nie aktywuje się od obrażeń
- **reactToOnTrigger** = `TRUE` - Pozwala na aktywację z innego triggera
- **startEnabled** = `TRUE` - Trigger jest aktywny od początku (zawsze używaj TRUE)

:::warning Właściwości triggera
Upewnij się, że ustawisz `respondToNPC` i `respondToObject` na FALSE, w przeciwnym razie trigger może aktywować się, gdy przejdzie przez niego potwór lub gdy wystrzelisz w niego strzałę.
:::

## System oświetlenia

Gothic używa dwóch rodzajów światła:

### Światło statyczne

Wstępnie obliczone tekstury światła (lightmapy) przechowywane w pliku ZEN i nakładane na powierzchnie.

**Gdzie działa:**

- **Lokacje wewnętrzne** - Lokacje bez nieba, całe światło może być statyczne
- **Lokacje zewnętrzne wewnątrz portali** - Jaskinie i budynki
- **Lokacje zewnętrzne (ograniczone)** - Światło statyczne tylko lekko oświetla voby, nie teren

:::warning Ograniczenie zewnętrzne
Nie możesz stworzyć realistycznych pochodni oświetlających ziemię na zewnątrz za pomocą światła statycznego. Użyj zamiast tego światła dynamicznego.
:::

### Światło dynamiczne

Światło w czasie rzeczywistym, które może animować się przez wiele kolorów. Duży wpływ na wydajność na DX7.

**Gdzie działa:**

- Wszędzie, ale wpływa na wydajność
- Wymagane do oświetlenia ziemi na zewnątrz

:::info Renderowanie DX11
Z rendererem DX11 całe światło jest dynamiczne. Nadal wpływa na wydajność (na GPU), więc unikaj umieszczania zbyt wielu dynamicznych świатеł w jednym obszarze.
:::

### Tworzenie vobów światła

Otwórz zakładkę **Light** w Oknie obiektów.

**Interfejs:**

1. Presety (wstępnie skonfigurowane ustawienia światła)
2. Usuń preset
3. Zapisz preset
4. Wybierz typ światła (statyczne/dynamiczne)
5. Utwórz voba światła

### Tworzenie presetu światła

1. Wprowadź nazwę presetu
2. Kliknij **New Preset**
3. Ustaw promień (np. 2000 do testów)
4. Wybierz kolor (podwójne kliknięcie na polu koloru)
5. Wybierz typ światła (statyczne lub dynamiczne)
6. Kliknij **Apply**, aby zapisać preset

### Tworzenie światła z presetu

1. Wybierz swój preset
2. Przesuń się do strefy portalowej (jaskinia/budynek) dla światła statycznego
3. Kliknij **Create LightVob**

**Dla światła statycznego:**
Światło nie będzie widoczne, dopóki go nie skompilujesz.

### Kompilowanie światła statycznego

1. Przejdź do **World → Compile Light**
2. Wybierz jakość:
   - **Low** - Szybka kompilacja
   - **Medium/High** - Lepsza jakość (widoczna głównie na powierzchniach o wysokiej liczbie wielokątów)
3. Włącz **Compile region**, aby skompilować tylko pobliski obszar
4. Poczekaj na kompilację

### Kolory światła dynamicznego

Światła dynamiczne mogą animować się przez wiele kolorów:

1. Utwórz preset z wieloma kolorami
2. Ustaw typ światła na **Dynamic**
3. Zapisz preset
4. Utwórz voba światła
5. Ustaw właściwość `colorAniFps` (np. 1)
   - Wyższe wartości = szybsze przejścia kolorów

### Światło i voby statyczne

Jeśli vob ma `staticVob = True`, rzuci cień, gdy światło statyczne zostanie skompilowane (DX7). Vob blokuje światło, tworząc cień za sobą.

:::tip Ponowna kompilacja
Gdy przesuwasz voby ze statycznym oświetleniem, światło może się "zepsuć". Po prostu przekompiluj całe światło (wyłącz "compile region"), aby to naprawić. Może to potrwać kilka minut w dużych lokacjach.
:::

## Wizualizacja punktów spawnu

Począwszy od wersji 1.18, SpacerNET może wizualizować punkty spawnu potworów.

### Używanie wizualizacji spawnu

Przejdź do zakładki **Spawn** w Oknie obiektów:

1. **Utwórz nowy preset** - Nazwij go według lokacji/rozdziału (np. NEWWORLD_1)
2. **Dodaj funkcje spawnu** - Funkcje skryptowe, które spawnują potwory
   - Uwaga: Warunki skryptowe nie będą się wykonywać - funkcja działa tak, jak jest, używając `Wld_InsertNpc`
3. **Zapisz plik presetów**
4. Ustaw **promień wyświetlania** (np. 12500)
5. Kliknij **Set**, aby zapisać promień
6. Kliknij **Show spawn points**

Nazwy instancji potworów pojawiają się nad punktami spawnu WP/FP.

**Wyczyść wyświetlanie:**
Kliknij **Clear**, aby usunąć znaczniki punktów spawnu.

:::info Ograniczenie NPC
Ta funkcja nie działa dla ludzkich NPC, ponieważ ich pozycje są powiązane z codziennymi rutynami, a nie funkcjami spawnu.
:::

## Tworzenie stref mgły

Strefy mgły dodają atmosferyczną mgiełkę do określonych obszarów.

### Tworzenie strefy mgły

1. Wybierz typ voba **zCZoneFog**
2. Upewnij się, że wizualizacja NIE jest ustawiona
3. Kliknij **Create Vob**
4. Opcjonalnie: Nadaj jej nazwę

### Właściwości mgły

1. **fogRangeCenter** - Odległość, przy której mgła staje się widoczna
   - 1000 = bardzo blisko
   - 10000 = daleka odległość
2. **innerRangePerc** - Gęstość mgły (od 0 do 1, zazwyczaj 0.3-0.7)
3. **fogColor** - Kolor mgły (wartości RGB)
4. **fadeOutSky** - Wpływa na płynność mgły podczas zbliżania się do strefy
5. **overrideColor** - Musi być TRUE, aby `fogColor` działał

### Ustawianie rozmiaru strefy mgły

Użyj **trybu edycji bbox** (naciśnij **6**), aby zmienić rozmiar strefy mgły. Czerwone linie pokazują granice strefy.

Szczegółowe instrukcje edycji bbox znajdziesz w osobnym tutorialu [Edycja BBOX](https://worldofplayers.ru/threads/43491/).

:::warning Różnica DX11
Na rendererze DX11 strefy mgły renderują się nieco inaczej. Właściwość `fogRangeCenter` nie działa tak samo jak na DX7.
:::

## Praca z efektami cząsteczkowymi (PFX)

System efektów cząsteczkowych pozwala tworzyć i edytować efekty wizualne takie jak ogień, dym, iskry i inne elementy atmosferyczne.

### Przeglądanie efektów cząsteczkowych

W Oknie obiektów znajduje się zakładka **Particles** (Efekty), gdzie możesz przeglądać istniejące efekty:

1. **Lewa lista** - Wszystkie dostępne efekty
2. **Prawa lista** - Tylko te efekty, które spełniają warunek wyszukiwania

**Podgląd efektów:**

1. Wybierając obiekt z listy, zobaczysz go na ekranie
2. Możesz edytować wybrany obiekt i od razu widzieć zmiany
3. Kliknij **Create**, aby dodać PFX jako nowy vob bezpośrednio

### Dodawanie PFX jako vobów

Aby dodać efekt cząsteczkowy jako voba:

1. Utwórz voba (dowolnego typu)
2. W polu **visual** dla voba wpisz nazwę efektu + `.PFX`
3. Przykład: `FIRE_MEDIUM.PFX`

Vob będzie teraz wyświetlał efekt cząsteczkowy w świecie.

### Edytor cząstek

Edytor cząstek pozwala modyfikować efekty i natychmiast widzieć zmiany.

:::warning Zmiany nie są zapisywane automatycznie
Edytor cząstek **nie modyfikuje** plików gry (ParticleFX.dat). Wszystkie zmiany zostaną utracone po ponownym uruchomieniu SpacerNET!

Aby zapisać zmiany:

1. Zapisz swój zmodyfikowany efekt do pliku tekstowego
2. Wstaw zmodyfikowany efekt do pliku skryptowego (rozszerzenie `.d` z definicjami PFX)
3. Skompiluj je do pliku `ParticleFX.dat`
4. Efekt zostanie zmieniony (lub dodany jako nowy) przy następnym uruchomieniu SpacerNET
   :::

### Ustawienia edytora cząstek

**Ruch animacji:**
Możesz ustawić ruch efektu zamiast statycznego wyświetlania (np. ruch po okręgu).

**Opcje wyświetlania:**
Na zakładce ustawień możesz skonfigurować preferencje wizualne:

- Wyróżnienie głównych pól kursywą/pogrubieniem
- Dostosowanie ustawień podglądu

:::tip Szybka generacja kluczy
Dla pól takich jak `ppsScaleKeys_s` i `shpScaleKeys_s` możesz użyć szybkiej generacji:

**Przykład:** Aby wygenerować `0.0 0.2 0.4 0.6 0.8 1.0`

- Wpisz: `! 0.0 1.0 0.2`
  - `0.0` - dolna granica
  - `1.0` - górna granica
  - `0.2` - krok

Możesz również odwrócić: `! 1.0 0.0 -0.2` generuje `1.0 0.8 0.6 0.4 0.2 0.0`
:::

## Zapisywanie pracy

### Ważne uwagi

- SpacerNET zachowuje pełną kompatybilność z oryginalnym formatem Spacera ZEN
- Światy działają zarówno w SpacerNET, jak i w oryginalnym Spacerze
- Twój mod **nie potrzebuje Union**, aby uruchomić lokacje
- Union jest wymagany tylko do uruchamiania samego SpacerNET

### Zapisywanie świata

1. **File → Save ZEN**
2. **Zalecane**: Zapisz jako nowy plik zamiast nadpisywać
3. Ścieżka musi być w `_work\data\Worlds\`
4. Nie można zapisywać światów poza folderem Gothica (użyj linków symbolicznych, jeśli potrzeba)

:::warning Nazewnictwo plików
Unikaj używania standardowych nazw światów, takich jak `NEWWORLD.ZEN`, `OLDWORLD.ZEN`, `ADDONWORLD.ZEN`. Dodaj coś dodatkowego, np. `NEWWORLD_10.ZEN`.

Możesz również użyć automatycznego nazywania SpacerNET, jeśli włączysz opcję prefiksu.
:::

## Dodatkowe zasoby

- [Poradnik instalacji SpacerNET](../tools/spacer)
- [Oryginalne rosyjskie tutoriale](https://worldofplayers.ru/forums/1179/) - Sekcja SpacerNET na World of Players
- [Referencja modowania Gothica](https://worldofplayers.ru/threads/39853/) - Kompleksowa dokumentacja techniczna

## Wskazówki i najlepsze praktyki

1. **Zawsze pracuj w osobnej kopii Gothica** dla Spacera, aby uniknąć mieszania z plikami gry
2. **Zapisuj często** pod różnymi nazwami, aby uniknąć utraty pracy
3. **Testuj regularnie w grze**, aby sprawdzić, czy oświetlenie, triggery i kolizje działają poprawnie
4. **Używaj znaczących nazw** dla triggerów, kamer i unikalnych vobów
5. **Organizuj swoje voby** za pomocą listy obiektów i hierarchii
6. **Kompiluj światło w sekcjach** podczas pracy nad dużymi obszarami zewnętrznymi
7. **Przechowuj kopie zapasowe** ważnych plików światów przed większymi zmianami
