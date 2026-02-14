---
sidebar_position: 1
title: "SpacerNET - Podstawy"
description: "Terminologia moddingu Gothic i podstawowy przewodnik po interfejsie SpacerNET."
---

# SpacerNET - Podstawy

## Terminologia moddingu Gothic

Podczas pracy z SpacerNET napotkasz różne terminy specyficzne dla moddingu Gothic:

### Światy i typy lokacji

- **ZEN** - Format pliku świata Gothic zawierający geometrię i obiekty lokacji
- **Lokacja indoor** - Lokacja bez nieba (np. Stara Kopalnia, Świątynia Śpiącego)
- **Lokacja outdoor** - Lokacja z otwartym niebem (np. Khorinis, Dolina Kopalń)
- **Portale** - Zamknięte objętości geometrii (jaskinie, domy) optymalizujące renderowanie przez niewyświetlanie świata zewnętrznego gdy jesteśmy w środku

### Obiekty i wizualne elementy

- **Vob** - Każdy obiekt w grze lub SpacerNET (beczki, trawa, drzwi, schody, movery, NPCs, przedmioty)
- **Visual** - Model 3D voba (zwykle format .3DS, .MDS/.ASC dla animowanych obiektów)
- **Decal** - Płaski obiekt tekstury (.TGA) używany do efektów jak pajęczyny lub plamy
- **VobTree** - Grupa vobów zagnieżdżonych w głównym vobie, może być zapisana jako osobne pliki .ZEN
- **Bbox** - Ramka ograniczająca wokół vobów (czerwona ramka) używana do detekcji kolizji i stref wyzwalania

### Obiekty interaktywne

- **Trigger** - Vob reagujący na bohatera lub inne akcje, lub aktywowany przez skrypty
- **Mover** - Specjalny vob mogący się poruszać w określonych momentach (ukryte ściany, platformy)
- **MobInter** - Interaktywny vob którego bohater może używać (łóżka, stoły alchemiczne, stojaki na książki)

### Nawigacja i pozycjonowanie

- **WP (Waypoint)** - Punkty nawigacyjne połączone w sieć do znajdowania ścieżek i rutyn NPCs
- **FP (Freepoint)** - Dodatkowe punkty pojawiania się potworów i obiekty pomocnicze przy waypointach

### Efekty i dźwięki

- **PFX (Particles)** - Efekty wizualne ognia, dymu, magii, mgły (przechowywane w ParticlesFX.dat)
- **VFX (VisualFX)** - Specjalne obiekty kontrolujące zachowanie PFX (efekty zaklęć, przechowywane w VisualFX.dat)
- **SFX** - Obiekty efektów dźwiękowych i ich właściwości (przechowywane w SFX.dat)

:::tip Dowiedz się więcej
Dla szczegółowych informacji o lokacjach indoor/outdoor i portalach, zobacz: [Przewodnik Indoor/Outdoor](https://worldofplayers.ru/threads/37707/) (rosyjski)
:::

## Pierwsze uruchomienie i konfiguracja interfejsu

Po pierwszym uruchomieniu SpacerNET zauważysz, że okna są chaotycznie rozmieszczone na ekranie. Nie martw się - pozycje okien są zapisywane gdy zamykasz SpacerNET normalnie (ale nie gdy wymuszasz zamknięcie procesu).

### Główne elementy interfejsu

- **Górny pasek menu**: Zawiera wszystkie główne funkcje SpacerNET
- **Menu View**: Przełączniki pokaz/ukryj dla Vobs, Waynet i Help vobs
- **Ikony paska narzędzi**: Szybki dostęp do funkcji menu

### Opcje układu okien

Dostęp przez **View → Positions of windows**:

- **Reset**: Przywrócenie wszystkich okien do pozycji domyślnych
- **Use windows presets #1**: Zoptymalizowany układ dla FullHD (1920×1080)
- **Use windows presets #2**: Zoptymalizowany układ dla QuadHD (2560×1440)

:::tip Zarządzanie oknami
Możesz swobodnie przeciągać i zmieniać rozmiar okien, aby stworzyć własny układ. Twoje ustawienia będą automatycznie zapisane.
:::

### Personalizacja interfejsu

**Ustawienia czcionek** (View → Font settings):

- Dostosuj rozmiar czcionki dla wszystkich okien
- Wybierz własne czcionki
- Przywróć ustawienia domyślne

**Skalowanie ikon** (View → Change icons scale):

- Skaluj ikony paska narzędzi dla wyświetlaczy wysokiej rozdzielczości
- Dostosuj od skali 0.5x do 2.0x
- Przywróć domyślną (1.0x)

**Język**: Przełącz między dostępnymi językami interfejsu

## Ustawienia kamery i wyświetlania

Skonfiguruj zachowanie kamery w **Settings → Camera**.

### Wyświetlanie informacji

Naciśnij klawisz **I**, aby przełączyć wyświetlanie informacji na ekranie (konfigurowalne w ustawieniach klawiszy):

1. **FPS** - Licznik klatek na sekundę
2. **Liczba trójkątów** - Renderowane wielokąty (tylko DX7, pokazuje 0 na DX11)
3. **Współrzędne kamery** - Aktualna pozycja kamery
4. **Liczba vobów** - Liczba obiektów w świecie
5. **Liczba waypointów** - Liczba punktów nawigacyjnych
6. **Info portalu** - Informacje o aktualnym portalu (jeśli jesteś w środku)
7. **Odległość do wybranego voba** - Dystans od kamery do wybranego obiektu

### Ustawienia kontroli kamery

- **Prędkość ruchu**: Jak szybko kamera przemieszcza się przez świat
- **Prędkość obrotu**: Szybkość obracania kamery
- **Wygładzanie obrotu**: Płynne przejścia obrotu kamery

### Opcje renderowania (tylko DX7)

- **Renderowanie mesh świata**: Dostosuj wyświetlanie geometrii świata
- **Renderowanie vobów**: Kontroluj jakość renderowania obiektów

### Dodatkowe opcje

- **Prędkość obrotu modelu podglądu**: Szybkość obracania modelu w oknach podglądu
- **Ukryj okna podczas ruchu kamery**: Auto-ukrywanie okien podczas ruchu kamery (przeciągnij prawym przyciskiem)
- **Ogranicz FPS**: Limit klatek na sekundę (wymaga restartu SpacerNET)

## Ustawienia vobów

Dostęp do opcji specyficznych dla vobów w **Settings → Vobs**.

### Ruch i obrót

- **Prędkość ruchu voba**: Szybkość podczas przemieszczania obiektów narzędziami gizmo
- **Prędkość obrotu voba**: Szybkość podczas obracania obiektów

### Ustawienia umieszczania vobów

1. **Wstaw voba na tej samej wysokości co bazowy vob**: Kopie zachowują oryginalną wysokość
2. **Obróć voba losowo wokół osi pionowej**: Dodaje losowy obrót dla różnorodności
3. **Użyj hierarchii podczas kopiowania**: Dołącz wszystkie obiekty podrzędne podczas kopiowania
4. **Włącz narzędzie Move podczas wybierania voba**: Auto-aktywacja narzędzia ruchu przy zaznaczeniu
5. **Podświetlenie gruntu pod vobem**: Wizualny wskaźnik pokazujący powierzchnię pod obiektami

### Orientacja waypointów/freepointów

Skonfiguruj jak punkty nawigacyjne orientują się podczas umieszczania:

- **Bez orientacji**
- **Od kamery**
- **W stronę kamery**
- **Losowo wokół osi pionowej**

## Ustawienia różne

Ważne opcje przepływu pracy w **Settings → Misc**.

### Zarządzanie plikami

1. **Dodaj datę/czas do nazwy ZEN podczas zapisywania**: Automatyczne śledzenie wersji
2. **Potwierdź zamknięcie SpacerNET jeśli ZEN jest załadowany**: Zapobieganie przypadkowemu zamknięciu
3. **Pokaż pełną ścieżkę pliku w pasku tytułowym**: Wyświetl kompletną ścieżkę pliku

### Auto-pozycjonowanie i kompilacja

4. **Ustaw kamerę na VOB_SPACER_CAMERA_START po załadowaniu**: Auto-nawigacja do wyznaczonej pozycji startowej
5. **Auto-kompiluj świat i światło po połączeniu mesh/vob**: Usprawnienie przepływu pracy
6. **Auto-kompiluj po załadowaniu nieskompilowanego ZEN**: Automatyczne przetwarzanie

### Optymalizacja świata

7. **Wyczyść nazwy wizualne dla zCVobLevelCompo**: Optymalizuj jeśli świat nie jest podzielony na części
8. **Usuń wszystkie zCVobLevelCompo ze świata**: Kompletne usunięcie (nieodwracalne po zapisie)
9. **Zapytaj o sortowanie wielokątów dla dużych światów**: Opcja wydajności dla światów 200k+ wielokątów
10. **Zezwalaj tylko na łacińskie symbole w wprowadzaniu**: Zalecane dla kompatybilności

:::warning Sortowanie wielokątów
Dla finalnych światów zawsze włączaj sortowanie wielokątów. Pomijaj tylko podczas rozwoju, aby przyspieszyć zapisy.
:::

## Skróty klawiaturowe

Dostosuj kontrolę w **Settings → Keys**.

### Funkcje przypisywania klawiszy

- **Własne kombinacje**: Wsparcie dla złożonych skrótów jak Ctrl+Alt+P
- **Ograniczenie prawego Alt**: Prawy klawisz Alt nie jest obsługiwany
- **Opcja reset**: Przywróć wszystkie domyślne
- **Przypisywanie w czasie rzeczywistym**: Kliknij dowolne ustawienie i naciśnij żądaną kombinację klawiszy

:::tip Wskazówka produktywności
W wielu tabelach i listach możesz kopiować wybrane elementy używając środkowego przycisku myszy.
:::

## Funkcje menu World

Podstawowe narzędzia zarządzania światem w menu **World**.

### Kompilacja światła

**World → Compile light**:

- Kompiluje oświetlenie dla twojej lokacji
- **Ustawienia jakości**: Niska jakość jest zazwyczaj wystarczająca i oszczędza rozmiar pliku
- Wymagane podczas pracy z oświetleniem (omówione w tutorialach oświetlenia)

### Kompilacja świata

**World → Compile world**:

- Kompiluje świat po załadowaniu mesh i vobów
- **Outdoor**: Lokacje z otwartym niebem (Khorinis, Dolina Kopalń)
- **Indoor**: Zamknięte lokacje bez nieba (Stara Kopalnia, Świątynie)

### Kontrola kamery i czasu

**World → Camera**:

- Przenieś kamerę do określonych współrzędnych
- Szybka nawigacja do punktu zerowego

**World → Day time**:

- Ustaw porę dnia w grze
- **Zamrożenie czasu**: Zatrzymaj upływ czasu
- **Określony czas**: Wprowadź dokładny czas (np. "06 00" dla 6 rano)

### Testowanie i analiza

**World → Play the hero** (lub F5):

- Testuj swój świat jako postać gracza
- Ograniczona interakcja (brak podnoszenia/używania przedmiotów)
- **F1**: Tryb szybkiego lotu
- **ESC**: Wyjście z trybu bohatera

**World → Analyze waynet**:

- Sprawdź sieć nawigacyjną pod kątem błędów
- Raportuje problemy z łącznością

**World → Special functions → Create a list**:

- Generuj raport HTML wszystkich vobów i wizualnych elementów
- Zidentyfikuj brakujące tekstury (podświetlone na czerwono)
- Otwórz raport w przeglądarce do przeglądu

### Tryby renderowania (tylko DX7)

**World → Render mode**:

- Przełączaj między różnymi trybami renderowania
- Przydatne do debugowania problemów wizualnych

## Zaawansowana konfiguracja

### Ustawienia spacer_net.ini

Zaawansowani użytkownicy mogą modyfikować `spacer_net.ini` (gdy SpacerNET jest zamknięty):

| Ustawienie                | Domyślne | Sekcja     | Opis                                                                       |
| ------------------------- | -------- | ---------- | -------------------------------------------------------------------------- |
| `showVisualInfoX`         | 200      | [SPACER]   | Pozycja X wyświetlania info wizualnych voba                                |
| `showVisualInfoY`         | 2000     | [SPACER]   | Pozycja Y wyświetlania info wizualnych voba                                |
| `rotModStart`             | 2        | [CONTROLS] | Domyślny tryb obrotu (0=Świat, 1=Lokalny, 2=Kamera)                        |
| `safeOneMode`             | 0        | [SPACER]   | Zachowaj ustawienie "One Mode" po restartach                               |
| `bShowMobInterSlots`      | 1        | [SPACER]   | Pokaż sloty MobInter wizualnie gdy zaznaczone                              |
| `selectVobTab`            | 0        | [SPACER]   | Auto-wybierz odpowiednią zakładkę voba według typu                         |
| `canCompileWorldAgain`    | 0        | [SPACER]   | Zezwalaj na rekompilację już skompilowanych światów                        |
| `bAddPlayerForPlugins`    | 0        | [SPACER]   | Inicjalizuj gracza dla kompatybilności z wtyczkami (może powodować crashe) |
| `bBlockPlayerUseMobInter` | 1        | [SPACER]   | Blokuj interakcję gracza z MobInter w trybie gry                           |
| `bSortMerge`              | 1        | [SPACER]   | Ulepsz sortowanie wielokątów podczas zapisu świata                         |
| `bShowBboxModel`          | 1        | [SPACER]   | Pokaż ramki ograniczające jako przezroczyste modele, nie tylko linie       |

:::warning Ustawienia zaawansowane
Modyfikuj ustawienia INI tylko jeśli rozumiesz ich cel. Nieprawidłowe wartości mogą powodować niestabilność.
:::

## Zasoby

- [Dyskusja forum SpacerNET](https://worldofplayers.ru/threads/43464/) (rosyjski)
- [Pobieranie GothicModKit](https://www.worldofgothic.de/)
- [Legacy Alt Renderer](https://github.com/SaiyansKing/Gothic-LegacyAltRenderer/releases/) (do problemów graficznych)

:::tip Potrzebujesz pomocy?
Aby uzyskać dodatkowe wsparcie i rozwiązywanie problemów, odwiedź [wątek forum SpacerNET](https://worldofplayers.ru/threads/43464/), gdzie społeczność aktywnie pomaga z instalacją i pytaniami dotyczącymi użytkowania.
:::
