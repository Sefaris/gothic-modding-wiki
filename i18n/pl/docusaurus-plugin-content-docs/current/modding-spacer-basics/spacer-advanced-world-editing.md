---
sidebar_position: 3
title: "SpacerNET - Zaawansowana edycja świata"
description: "Zaawansowane funkcje i narzędzia do profesjonalnej edycji światów w SpacerNET."
---

# Zaawansowana edycja świata

Ten przewodnik opisuje zaawansowane funkcje SpacerNET, które usprawniają profesjonalne przepływy pracy przy edycji światów.

## Tryby wyświetlania i opcje widoku

SpacerNET udostępnia różne tryby wyświetlania dostępne przez górną belkę menu:

### Przełączniki trybów wyświetlania

| Pozycja ikony | Funkcja                 | Opis                                        |
| ------------- | ----------------------- | ------------------------------------------- |
| 1. ikona      | Ramki Vobów             | Przełącz widoczność ramek otaczających voby |
| 2. ikona      | Wireframe               | Wyświetl świat w trybie siatki              |
| 3. ikona      | Oświetlenie             | Przełącz wyświetlanie oświetlenia           |
| 4. ikona      | Tekstury                | Przełącz wyświetlanie tekstur               |
| 5. ikona      | Siatka                  | Pokaż/ukryj nakładkę siatki                 |
| 6. ikona      | Skybox                  | Przełącz renderowanie skybox                |
| 7. ikona      | Licznik FPS             | Wyświetl liczbę klatek na sekundę           |
| 8. ikona      | Alternatywne sterowanie | Włącz alternatywne sterowanie kamerą        |

### Specjalne tryby wyświetlania

**Tryb wielokrotnego zaznaczania**

- Pozwala zaznaczać wiele vobów jednocześnie
- Przydatne do operacji wsadowych
- Przełączanie przez ikonę lub skrót klawiszowy

**Tryb NoGrass z własną listą ukrywania**

- Ukrywa trawę dla lepszej wydajności
- Obsługuje własną listę ukrywania dla konkretnych obiektów
- Utwórz plik: `_work\tools\spacernet_norender.txt`
- Dodaj nazwy wizuali (jedna na linię), aby ukryć konkretne modele
- Przykład: Ukryj wszystkie modele trawy, dodając nazwy wizuali trawy

:::tip
Używaj trybu NoGrass podczas pracy nad terenem lub architekturą, aby poprawić wydajność i widoczność w edytorze.
:::

## Kontenery vobów i zaawansowane zaznaczanie

### System globalnego rodzica

Kontenery vobów pozwalają organizować obiekty świata hierarchicznie:

1. **Utwórz voba kontenera**
   - Typ voba: `zCVob` (podstawowy vob bez wizualu)
   - Nazwij opisowo (np. `OBIEKTY_JASKINI`, `DEKORACJE_MIASTA`)
   - Użyj Właściwości → Ustaw jako Globalny Rodzic

2. **Dodaj obiekty do kontenera**
   - Zaznacz opcję Globalny Rodzic podczas wstawiania nowych vobów
   - Wszystkie nowe voby automatycznie staną się dziećmi aktywnego kontenera
   - Przenoś całe grupy, przesuwając voba rodzica

3. **Filtry zaznaczania**
   - Filtruj według typu voba (światła, dźwięki, triggery itp.)
   - Zaznacz wszystkie dzieci kontenera
   - Odwróć zaznaczenie dla złożonych operacji

:::info
System Globalnego Rodzica jest niezbędny do organizowania dużych lokacji z setkami obiektów.
:::

## Okna informacyjne

### Okno Info (zSPY)

Naciśnij **F2**, aby otworzyć okno informacyjne pokazujące statystyki w czasie rzeczywistym:

- **Metryki wydajności**
  - Liczba klatek (FPS)
  - Czas klatki w milisekundach
  - Użycie pamięci
  - Liczba poligonów

- **Statystyki świata**
  - Całkowita liczba vobów na świecie
  - Liczba zaznaczonych vobów
  - Liczba widocznych vobów
  - Informacje o portalach i sektorach

- **Pozycja kamery**
  - Aktualne współrzędne X, Y, Z
  - Kąty obrotu kamery
  - Przydatne do dokumentowania lokacji

### Tryb informacji Vob/Model

Naciśnij **klawisz 5**, aby wejść w tryb wyświetlania informacji:

- **Najedź na dowolnego voba**, aby zobaczyć:
  - Nazwę klasy voba
  - Nazwę wizualu/meshu
  - Liczbę poligonów
  - Listę tekstur
  - Pozycję i obrót
  - Informacje o vobie rodzicu

- **Kliknij na voba**, aby zaznaczyć i otworzyć właściwości
- **ESC**, aby wyjść z trybu informacji

:::tip
Używaj trybu informacji, aby szybko zidentyfikować nienazwane voby lub znaleźć, której tekstury używa konkretny obiekt.
:::

## Zarządzanie kontenerami i skrzyniami

### Tworzenie interaktywnych kontenerów

1. **Wstaw voba kontenera**
   - Typ voba: `oCMobContainer`
   - Wybierz wizual (model skrzyni, beczki, skrzynki)
   - Umieść w świecie

2. **Skonfiguruj właściwości**
   - **focusName**: Nazwa pokazywana, gdy gracz patrzy na obiekt (np. "Drewniana skrzynia")
   - **Locked**: Ustaw mechanizm zamknięcia
     - `locked`: Wymaga konkretnego klucza
     - `keyInstance`: Nazwa instancji przedmiotu klucza (np. `ITKE_CHEST_01`)
   - **Contents**: Dodaj przedmioty w liście oddzielonej przecinkami
     - Format: `NAZWA_INSTANCJI_PRZEDMIOTU:LICZBA`
     - Przykład: `ITFO_APPLE:3,ITMI_GOLD:50,ITAM_RING_01:1`

3. **Specjalne ustawienia**
   - **contains**: Całkowita liczba slotów przedmiotów (zazwyczaj 10-20)
   - **useWithItem**: Wymagany przedmiot do otwarcia (np. łom)
   - **onOpen/onClose**: Funkcja skryptowa do wywołania

### Mechanizmy zamknięcia

- **Zwykły zamek**: Ustaw `locked="locked"` + `keyInstance="NAZWA_KLUCZA"`
- **Zamek do wytrychowania**: Ustaw poziom zamka (1-100), pozwala na wytrych
- **Zamek kombinacyjny**: Wymaga konkretnej kombinacji przedmiotów

## System dźwięków i muzyki

### Strefy muzyki (oCZoneMusic)

Dodaj muzykę tła do konkretnych obszarów:

1. **Utwórz strefę muzyki**
   - Typ voba: `oCZoneMusic`
   - Wyłącz kolizję (odznacz CD_DYN)
   - Wstaw voba

2. **Skonfiguruj muzykę**
   - Otwórz okno Dźwięk/Muzyka
   - Wybierz plik muzyki (np. `OWP_DAY_STD`)
   - Konwencja nazewnictwa muzyki:
     - `LOKACJA_CZAS_STAN`
     - `OWP` = Stary Świat
     - `DAY` = Dzień
     - `STD` = Standard (nie walka)
     - `FGT` = Muzyka walki

3. **Ustaw nazwę voba**
   - Format: `STREFA_MUZYKI_NAZWA_UTWORU`
   - Przykład: `MOJA_MUZYKA_OWP` odtworzy `OWP_DAY_STD`
   - Kliknij Apply

4. **Zdefiniuj rozmiar strefy**
   - Naciśnij **klawisz 6** dla trybu edycji BBOX
   - Zmień rozmiar strefy używając WASD, Spacja, X (patrz rozdział edycji BBOX)
   - Muzyka gra tylko gdy gracz jest wewnątrz tej strefy

### Muzyka domyślna (oCZoneMusicDefault)

Ustaw muzykę tła dla całego świata:

1. Utwórz typ voba: `oCZoneMusicDefault`
2. Skonfiguruj muzykę tak samo jak oCZoneMusic
3. **Nie trzeba ustawiać rozmiaru strefy** - dotyczy całego poziomu
4. Niższy priorytet niż konkretne strefy oCZoneMusic

### Priorytet muzyki

Gdy strefy muzyki się nakładają:

- Ustaw wartość **priority** we właściwościach
- Wyższa liczba = wyższy priorytet
- Domyślny priorytet = 0
- Używaj priorytetów: 0 (domyślny) → 1 (ważny) → 2 (bardzo ważny)

:::warning
Zawsze używaj przyrostka `_DAY_STD` dla muzyki świata. Muzyka `_FGT` jest odtwarzana automatycznie podczas walki.
:::

## Okno sprawdzania błędów

Naciśnij **F3**, aby otworzyć okno sprawdzania błędów:

### Kategorie błędów

- **Czerwone błędy (Krytyczne)**
  - Punkty wędrówki bez połączeń
  - Brakujące tekstury
  - Nieprawidłowe odniesienia do vobów
  - Uszkodzone połączenia portali

- **Żółte ostrzeżenia**
  - Sugestie optymalizacji
  - Nietypowe konfiguracje vobów
  - Problemy z wydajnością

- **Niebieskie informacje**
  - Statystyki i liczniki
  - Wiadomości informacyjne

### Częste błędy i rozwiązania

| Błąd                 | Przyczyna                         | Rozwiązanie                            |
| -------------------- | --------------------------------- | -------------------------------------- |
| "Waypoint isolated"  | FP niepołączony z siecią wędrówki | Połącz z innymi punktami wędrówki      |
| "Texture not found"  | Brakujący plik tekstury           | Dodaj teksturę lub zastąp istniejącą   |
| "Vob without visual" | Puste pole wizualu                | Przypisz mesh lub usuń voba            |
| "Portal open"        | Mesh portalu ma luki              | Popraw geometrię portalu w edytorze 3D |

:::tip
Uruchom sprawdzanie błędów przed kompilacją świata - naprawienie błędów wcześnie zapobiega crashom gry.
:::

## System katalogu vobów

Dostęp przez **Insert → Vob Catalog** (lub skrót klawiszowy):

### Funkcje katalogu

1. **Przeglądaj bibliotekę szablonów vobów**
   - Wstępnie skonfigurowane voby ze standardowymi ustawieniami
   - Podzielone na kategorie (dekoracje, meble, natura itp.)
   - Podwójne kliknięcie, aby wstawić

2. **Zapisz własne szablony**
   - Skonfiguruj voba ze wszystkimi właściwościami
   - Prawy przycisk → "Zapisz do katalogu"
   - Nazwij szablon opisowo
   - Używaj ponownie w wielu światach

3. **Import/Export katalogów**
   - Udostępniaj katalogi między projektami
   - Twórz kopie zapasowe często używanych konfiguracji
   - Pliki katalogów przechowywane w: `_work\tools\vob_catalog\`

### Popularne kategorie katalogu

- **Natura**: Drzewa, skały, kępy trawy, krzewy
- **Architektura**: Drzwi, okna, schody, kolumny
- **Oświetlenie**: Uchwyty na pochodnie, źródła światła ze wstępnie zdefiniowanymi kolorami
- **Interaktywne**: Wstępnie skonfigurowane skrzynie, dźwignie, drzwi
- **Efekty**: Emitery cząsteczek ze standardowymi efektami

## Wybór poligonów i filtr materiałów

### Tryb wyboru poligonów

Naciśnij **F4**, aby wejść w tryb wyboru poligonów:

1. **Zaznacz poligony**
   - Kliknij pojedyncze poligony
   - Shift+Klik dla wielokrotnego zaznaczenia
   - Ctrl+Klik, aby odznaczyć

2. **Narzędzia zaznaczania**
   - Zaznacz według materiału
   - Zaznacz połączone poligony
   - Rozszerz/zmniejsz zaznaczenie
   - Różne materiały z różnymi kolorami

3. **Operacje**
   - Przypisz nowy materiał
   - Usuń zaznaczone poligony (używaj ostrożnie!)
   - Eksportuj zaznaczenie
   - Modyfikuj rozdzielczość lightmapy

### Filtr materiałów

Filtruj wyświetlanie świata według typu materiału:

1. **Otwórz okno filtru materiałów**
   - Pokazuje wszystkie materiały użyte w świecie
   - Checkbox przy każdym materiale

2. **Opcje filtrowania**
   - **Pokaż tylko**: Wyświetl tylko zaznaczone materiały
   - **Ukryj zaznaczone**: Ukryj zaznaczone materiały
   - **Odwróć**: Odwróć widoczność

3. **Przypadki użycia**
   - Znajdź wszystkie użycia konkretnej tekstury
   - Ukryj teren, aby zobaczyć podziemne struktury
   - Wyizoluj elementy architektoniczne

:::info
Filtr materiałów nie usuwa geometrii - tylko kontroluje widoczność w edytorze.
:::

## Makra i automatyzacja

Dostęp: **Window → Macros** lub **Ctrl+M**

### Komendy makr

Zautomatyzuj powtarzalne zadania za pomocą komend makr:

| Komenda       | Składnia                         | Opis                                    |
| ------------- | -------------------------------- | --------------------------------------- |
| RESET         | `RESET`                          | Wyczyść świat, wróć do stanu domyślnego |
| LOAD MESH     | `LOAD MESH nazwa_pliku.3ds`      | Wczytaj konkretny plik meshu            |
| LOAD WORLD    | `LOAD WORLD nazwa_świata.zen`    | Wczytaj plik świata                     |
| COMPILE WORLD | `COMPILE WORLD nazwa_świata.zen` | Kompiluj świat z obecnymi ustawieniami  |
| COMPILE LIGHT | `COMPILE LIGHT nazwa_świata.zen` | Przekompiluj tylko oświetlenie          |
| SAVE MESH     | `SAVE MESH nazwa_pliku.3ds`      | Eksportuj jako mesh                     |
| SAVE WORLD    | `SAVE WORLD nazwa_świata.zen`    | Zapisz plik świata                      |

### Format pliku makra

Makra przechowywane w: `_work\tools\macros_spacernet.txt`

Przykład makra dla automatycznej kompilacji świata:

```
LOAD WORLD mojswiat.zen
COMPILE LIGHT mojswiat.zen
COMPILE WORLD mojswiat.zen
SAVE WORLD mojswiat.zen
```

### Uruchamianie makr

1. Utwórz/edytuj `macros_spacernet.txt`
2. Otwórz okno Makr
3. Kliknij "Execute", aby uruchomić wszystkie komendy
4. Monitoruj postęp w konsoli

:::warning
Zawsze twórz kopie zapasowe światów przed uruchomieniem makr - błędy kompilacji mogą uszkodzić pliki.
:::

## Edycja BBOX / Rozmiar strefy

Naciśnij **klawisz 6**, aby wejść w tryb edycji BBOX:

### Sterowanie

**Przesuwanie punktów:**

- **W** - Przesuń do przodu (Y+)
- **S** - Przesuń do tyłu (Y-)
- **A** - Przesuń w lewo (X-)
- **D** - Przesuń w prawo (X+)
- **Spacja** - Przesuń w górę (Z+)
- **X** - Przesuń w dół (Z-)

**Wybór punktu:**

- **Klawisz 1** - Wybierz punkt maxs (daleki róg)
- **Klawisz 2** - Wybierz punkt mins (bliski róg)

**Regulacja skali (v1.18+):**

- **Klawisz 3** - Zwiększ skalę
- **Klawisz 4** - Zmniejsz skalę

### Zastosowania BBOX

- **Strefy muzyki** (`oCZoneMusic`) - Zdefiniuj, gdzie gra muzyka
- **Strefy dźwięku** (`oCZoneSound`) - Obszary dźwięków otoczenia
- **Strefy triggerów** (`zCTrigger`) - Obszary triggerów skryptowych
- **Strefy mgły** (`zCZoneZFog`) - Granice efektów mgły
- **Vob Farplane** - Strefy zasięgu widoku

### Przykład przepływu pracy

1. Utwórz voba strefy (np. `oCZoneMusic`)
2. Naciśnij **klawisz 6**, aby wejść w tryb BBOX
3. Naciśnij **klawisz 1**, aby wybrać maxs (daleki róg)
4. Użyj **WASD/Spacja/X**, aby ustawić pozycję dalekiego rogu
5. Naciśnij **klawisz 2**, aby wybrać mins (bliski róg)
6. Ustaw pozycję bliskiego rogu w ten sam sposób
7. **ESC**, aby wyjść z trybu BBOX
8. Wizualizuj strefę jako kolorową nakładkę pudełka

:::tip
Rób strefy muzyki nieco większe niż oczekiwano - gracze powinni słyszeć muzykę przed wejściem do zdefiniowanego obszaru dla płynnych przejść.
:::

## Siewca obiektów - Masowe tworzenie vobów

Dostęp: **Window → Object Seeder** lub **Insert → Mass Insert**

Idealny do umieszczania wielu podobnych obiektów (trawa, skały, drzewa, gruzy):

### Ustawienia siewcy

1. **Minimalna odległość między vobami**
   - Zapobiega nakładaniu się obiektów
   - Mierzone od centrów vobów
   - Niższa wartość = gęstsze rozmieszczenie
   - Typowa: 50-200 jednostek w zależności od rozmiaru obiektu

2. **Przesunięcie wertykalne**
   - Wysokość nad powierzchnią, na której umieścić voba
   - Zapobiega "zapadaniu się" obiektów w ziemię
   - Dostosuj wizualnie dla każdego typu obiektu
   - Przykład: Trawa = -5, Skały = 0, Drzewa = -10

3. **Tryb usuwania**
   - Przełącz na tryb usuwania
   - Kliknij, aby usunąć umieszczone obiekty
   - Przydatne do poprawiania błędów

4. **Wstaw jako oCItem**
   - Tworzy voby jako typ przedmiotu
   - Używane do umieszczania zbieralnych przedmiotów
   - Zazwyczaj wyłączone dla dekoracji

5. **Zabezpiecz lewy przycisk myszy**
   - Zapobiega ciągłemu wstawianiu podczas przytrzymania myszy
   - Umieszcza tylko jednego voba na kliknięcie
   - Zalecane: **włączone** w większości przypadków

6. **Dynamiczna kolizja**
   - Włącz kolizję fizyczną dla umieszczonych vobów
   - Zazwyczaj **wyłączone** dla statycznych dekoracji
   - Włącz dla obiektów fizycznych (beczki, skrzynie)

7. **Losowy obrót wertykalny**
   - Obróć każdego voba losowo wokół osi Z
   - Tworzy naturalną różnorodność
   - Zalecane: **włączone** dla obiektów natury

8. **Prostopadle do poligonu**
   - Wyrównaj voba do normalnej powierzchni
   - Obiekty podążają za nachyleniem terenu
   - Przydatne dla trawy, skał na wzgórzach

9. **Wstaw do globalnego rodzica**
   - Automatycznie ustaw rodzica dla wszystkich zasianych vobów
   - Organizuj do kontenera vobów
   - Zalecane dla łatwiejszego zarządzania

10. **Ogólne ustawienia voba**
    - Ustaw wizual, materiał, właściwości kolizji
    - Stosowane do wszystkich zasianych obiektów

### Przepływ pracy siewcy

1. **Przygotuj szablon voba** z żądanym wizualem i ustawieniami
2. **Otwórz okno Object Seeder**
3. **Skonfiguruj parametry zasiewu**
   - Ustaw minimalną odległość (np. 100 dla trawy)
   - Ustaw przesunięcie wertykalne (np. -5)
   - Włącz losowy obrót
   - Włącz prostopadle do poligonu
4. **Klikaj na teren**, aby umieścić obiekty
   - Klikaj wielokrotnie lewym przyciskiem, aby "malować" obiekty
   - Przesuwaj mysz podczas klikania dla pokrycia
5. **Przejrzyj i dostosuj**
   - Użyj trybu usuwania, aby usunąć błędy
   - Dostosuj gęstość, zmieniając minimalną odległość

### Przykład: Pole trawy

Ustawienia dla realistycznego pokrycia trawą:

- Wizual: `OW_NATURE_BUSH_BIG_01.3DS`
- Minimalna odległość: `80`
- Przesunięcie wertykalne: `-5`
- Losowy obrót: **włączony**
- Prostopadle do poligonu: **włączony**
- Zabezpiecz lewą mysz: **włączony**
- Wstaw do globalnego rodzica: `POLE_TRAWY_01`

Rezultat: Naturalnie wyglądające pokrycie trawą w kilka sekund!

:::warning
Nigdy nie zamykaj okna Object Seeder podczas trybu zasiewu - może to spowodować niestabilność edytora. Zawsze najpierw wyłącz zasiew.
:::

:::tip
Twórz wiele kontenerów globalnych rodziców dla różnych warstw roślinności (trawa, krzewy, drzewa), aby osobno zarządzać LOD i wydajnością.
:::

---

## Podsumowanie

Te zaawansowane funkcje przekształcają SpacerNET z podstawowego edytora w profesjonalne narzędzie do budowania światów:

- **Tryby wyświetlania** optymalizują przepływ pracy i wydajność
- **Kontenery vobów** organizują złożone sceny
- **Okna informacyjne** dostarczają niezbędnych danych debugowania
- **Strefy muzyki** tworzą wciągające krajobrazy dźwiękowe
- **Sprawdzanie błędów** zapobiega crashom gry
- **Katalog vobów** przyspiesza typowe zadania
- **Filtr materiałów** izoluje konkretną geometrię
- **Makra** automatyzują powtarzalne operacje
- **Edycja BBOX** definiuje precyzyjne granice stref
- **Siewca obiektów** umieszcza tysiące obiektów w minuty

Opanuj te narzędzia, aby pracować szybciej i tworzyć bardziej szczegółowe, dopracowane światy Gothica.
