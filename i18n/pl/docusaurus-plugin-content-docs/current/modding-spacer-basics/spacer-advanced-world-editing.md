---
sidebar_position: 3
title: "SpacerNET - Zaawansowana edycja œwiata"
description: "Zaawansowane funkcje i narzêdzia do profesjonalnej edycji œwiatów w SpacerNET."
---

# Zaawansowana edycja œwiata

Ten przewodnik opisuje zaawansowane funkcje SpacerNET, które usprawniaj¹ profesjonalne przep³ywy pracy przy edycji œwiatów.

### Dodatkowe ikony i tryby wyœwietlania

SpacerNET oferuje szereg dodatkowych trybów widoku dostêpnych poprzez ikony w górnej belce menu:

![Dodatkowe ikony i tryby wyœwietlania](/img/spacer_38.jpg)

#### 1. Tryb pokazywania vobów

W³¹cza lub wy³¹cza widocznoœæ wszystkich vobów na scenie. Jest to kopia funkcji z menu **View ? Show ? Vobs**.

- U¿yj tego, aby szybko ukryæ wszystkie obiekty i skupiæ siê tylko na geometrii œwiata
- Przydatne podczas pracy nad samym meshem terenu

#### 2. Tryb pokazywania siatki WayPoint

W³¹cza wyœwietlanie siatki punktów nawigacyjnych (waynet). Jest to kopia funkcji z menu **View ? Show ? Waynet**.

- Pokazuje wszystkie po³¹czenia miêdzy punktami nawigacyjnymi NPC
- Przydatne do debugowania tras patrol i wolnych punktów

#### 3. Tryb pokazywania help-vobów

W³¹cza wyœwietlanie vobów s³u¿ebnych (pomocniczych). Jest to kopia funkcji z menu **View ? Show ? Help vobs**.

- Pokazuje niewidoczne obiekty pomocnicze: FreePoints (FP), WayPoints (WP), Triggery, Zones
- Niezbêdne podczas rozmieszczania punktów nawigacyjnych i stref wyzwalaj¹cych

#### 4. Tryb pokazywania wszystkich BBOX

W³¹cza wyœwietlanie ograniczaj¹cych pude³ek (bounding boxes) dla wszystkich vobów.

- U¿ywany rzadko, g³ównie do debugowania kolizji
- **Uwaga**: Nie dzia³a z renderowaniem DirectX 11

#### 5. Tryb pokazywania niewidocznych vobów

Wyœwietla voby, które maj¹ ustawion¹ w³aœciwoœæ `showVisual = FALSE`.

- Niektóre voby maj¹ model 3D, ale s¹ ustawione jako niewidoczne w grze
- Typowy przypadek: Niewidoczny oCMobInter umieszczony w tym samym miejscu co dekoracyjny model
- Pozwala to na interakcjê gracza z "nowym" modelem, choæ faktycznie u¿ywa niewidocznego obiektu
- Takie obiekty s¹ rysowane jako zielone ramki

#### 6. Alternatywne sterowanie

W³¹cza alternatywny system sterowania vobami:

- Pozwala przesuwaæ voby bezpoœrednio myszk¹
- **Klawisz 1**: Tryb przesuwania (Move)
- **Klawisz 2**: Tryb obracania (Rotate)
- Znacznie przyspiesza rozmieszczanie obiektów

#### 7. Tryb wielokrotnego zaznaczania vobów

Aktywuje tryb zaznaczania wielu vobów jednoczeœnie przez "przeci¹gniêcie" myszk¹:

- **Przeci¹gnij myszk¹** po ekranie, aby zaznaczyæ wszystkie voby w obszarze
- **LSHIFT + przeci¹gniêcie**: Dodaj voby do zaznaczenia
- **LALT + przeci¹gniêcie**: Usuñ voby z zaznaczenia
- **LCTRL + przeci¹gniêcie**: Ignoruj kolizjê i zaznacz wszystkie voby "na wskroœ"

#### 8. Tryb NoGrass

Tymczasowo wy³¹cza widocznoœæ trawy i innych okreœlonych modeli.

- W bazie znajduj¹ siê standardowe nazwy modeli trawy
- Mo¿esz dodaæ w³asne modele do ukrycia

**Dodawanie w³asnych modeli do ukrycia:**

1. Utwórz plik `SpacerNet_HideList.txt` w folderze `System`
2. Dodaj nazwy wizuali modeli (jeden na liniê)
3. Przyk³ad zawartoœci:

```
GRASS_01.3DS
GRASS_02.3DS
BUSH_SMALL.3DS
```

### Okno listy vobów (VobList Window)

Okno listy vobów to potê¿ne narzêdzie do zbierania i zarz¹dzania vobami w okreœlonym obszarze.

#### Zbieranie vobów w promieniu od kamery

Mo¿esz zebraæ wszystkie voby okreœlonego typu w zadanym promieniu od pozycji kamery:

1. **Ustaw promieñ** za pomoc¹ suwaka (wartoœæ w jednostkach - 100 jednostek = 1 metr)
2. **Wybierz typ voba** z listy rozwijanej (np. oCItem, oCMob, zCVobLight)
3. **Naciœnij Search (F1)** aby przeszukaæ obszar
4. **Lista wyników** wyœwietli wszystkie voby spe³niaj¹ce kryteria

![Zbieranie vobów w promieniu od kamery](/img/spacer_39.jpg)

Przyk³ad: Zebranie wszystkich obiektów oCItem w promieniu 9.75 metra (975 jednostek):

- Promieñ: 975
- Typ voba: oCItem
- Wciœnij Search (F1)

#### Praca z list¹ vobów

Po zebraniu vobów do listy mo¿esz:

- **Pojedyncze klikniêcie** na vobie - wyœwietla jego w³aœciwoœci
- **Podwójne klikniêcie** na vobie - przenosi kamerê do tego voba
- **Przycisk Clear** - czyœci listê (voby nie s¹ usuwane ze œwiata)

:::info
Okno VobList jest szczególnie przydatne do znajdowania i edytowania obiektów w gêsto zabudowanych obszarach, gdzie trudno jest klikn¹æ bezpoœrednio na odpowiedni vob.
:::

#### Filtry zaznaczania vobów

![Filtry zaznaczania vobów](/img/spacer_40.jpg)

Filtr zaznaczania pozwala ograniczyæ, które typy vobów mo¿na wybraæ klikniêciem w oknie 3D:

**Przyk³ad u¿ycia:**

Chcesz wybraæ roœlinê (oCItem), ale znajduje siê ona w trawie, która przes³ania zaznaczenie:

1. W oknie VobList wybierz filtr **ITEM** z listy rozwijanej
2. Teraz mo¿esz klikaæ tylko na voby typu oCItem
3. Wszystkie inne typy vobów bêd¹ ignorowane podczas zaznaczania

**Dostêpne filtry:**

- **None** - Brak filtra, wszystkie voby mo¿na zaznaczyæ
- **ITEM** - Tylko oCItem
- **MOB** - Tylko oCMob i oCMobInter
- **LIGHT** - Tylko zCVobLight
- **SOUND** - Tylko zCVobSound
- **TRIGGER** - Tylko triggery
- I wiele innych...

**Powrót do normalnego zaznaczania:**

Wybierz **None** z listy filtrów, aby ponownie móc zaznaczaæ wszystkie typy vobów.

:::tip
Korzystaj z filtrów zaznaczania podczas pracy w obszarach z du¿¹ liczb¹ nak³adaj¹cych siê obiektów, takich jak lasy (drzewa + trawa + kamienie) lub miasta (architektura + dekoracje + œwiat³a).
:::

## Kontenery vobów i zaawansowane zaznaczanie

### System globalnego rodzica

Kontenery vobów pozwalaj¹ organizowaæ obiekty œwiata hierarchicznie:

1. **Utwórz voba kontenera**
   - Typ voba: `zCVob` (podstawowy vob bez wizualu)
   - Nazwij opisowo (np. `OBIEKTY_JASKINI`, `DEKORACJE_MIASTA`)
   - U¿yj W³aœciwoœci ? Ustaw jako Globalny Rodzic

2. **Dodaj obiekty do kontenera**
   - Zaznacz opcjê Globalny Rodzic podczas wstawiania nowych vobów
   - Wszystkie nowe voby automatycznie stan¹ siê dzieæmi aktywnego kontenera
   - Przenoœ ca³e grupy, przesuwaj¹c voba rodzica

3. **Filtry zaznaczania**
   - Filtruj wed³ug typu voba (œwiat³a, dŸwiêki, triggery itp.)
   - Zaznacz wszystkie dzieci kontenera
   - Odwróæ zaznaczenie dla z³o¿onych operacji

:::info
System Globalnego Rodzica jest niezbêdny do organizowania du¿ych lokacji z setkami obiektów.
:::

## Okna informacyjne

### Okno Info (zSPY)

Naciœnij **F2**, aby otworzyæ okno informacyjne pokazuj¹ce statystyki w czasie rzeczywistym:

- **Metryki wydajnoœci**
  - Liczba klatek (FPS)
  - Czas klatki w milisekundach
  - U¿ycie pamiêci
  - Liczba poligonów

- **Statystyki œwiata**
  - Ca³kowita liczba vobów na œwiecie
  - Liczba zaznaczonych vobów
  - Liczba widocznych vobów
  - Informacje o portalach i sektorach

- **Pozycja kamery**
  - Aktualne wspó³rzêdne X, Y, Z
  - K¹ty obrotu kamery
  - Przydatne do dokumentowania lokacji

### Tryb informacji Vob/Model

Naciœnij **klawisz 5**, aby wejœæ w tryb wyœwietlania informacji:

- **NajedŸ na dowolnego voba**, aby zobaczyæ:
  - Nazwê klasy voba
  - Nazwê wizualu/meshu
  - Liczbê poligonów
  - Listê tekstur
  - Pozycjê i obrót
  - Informacje o vobie rodzicu

- **Kliknij na voba**, aby zaznaczyæ i otworzyæ w³aœciwoœci
- **ESC**, aby wyjœæ z trybu informacji

:::tip
U¿ywaj trybu informacji, aby szybko zidentyfikowaæ nienazwane voby lub znaleŸæ, której tekstury u¿ywa konkretny obiekt.
:::

## Zarz¹dzanie kontenerami i skrzyniami

### Tworzenie interaktywnych kontenerów

1. **Wstaw voba kontenera**
   - Typ voba: `oCMobContainer`
   - Wybierz wizual (model skrzyni, beczki, skrzynki)
   - Umieœæ w œwiecie

2. **Skonfiguruj w³aœciwoœci**
   - **focusName**: Nazwa pokazywana, gdy gracz patrzy na obiekt (np. "Drewniana skrzynia")
   - **Locked**: Ustaw mechanizm zamkniêcia
     - `locked`: Wymaga konkretnego klucza
     - `keyInstance`: Nazwa instancji przedmiotu klucza (np. `ITKE_CHEST_01`)
   - **Contents**: Dodaj przedmioty w liœcie oddzielonej przecinkami
     - Format: `NAZWA_INSTANCJI_PRZEDMIOTU:LICZBA`
     - Przyk³ad: `ITFO_APPLE:3,ITMI_GOLD:50,ITAM_RING_01:1`

3. **Specjalne ustawienia**
   - **contains**: Ca³kowita liczba slotów przedmiotów (zazwyczaj 10-20)
   - **useWithItem**: Wymagany przedmiot do otwarcia (np. ³om)
   - **onOpen/onClose**: Funkcja skryptowa do wywo³ania

### Mechanizmy zamkniêcia

- **Zwyk³y zamek**: Ustaw `locked="locked"` + `keyInstance="NAZWA_KLUCZA"`
- **Zamek do wytrychowania**: Ustaw poziom zamka (1-100), pozwala na wytrych
- **Zamek kombinacyjny**: Wymaga konkretnej kombinacji przedmiotów

## System dŸwiêków i muzyki

### Strefy muzyki (oCZoneMusic)

Dodaj muzykê t³a do konkretnych obszarów:

1. **Utwórz strefê muzyki**
   - Typ voba: `oCZoneMusic`
   - Wy³¹cz kolizjê (odznacz CD_DYN)
   - Wstaw voba

2. **Skonfiguruj muzykê**
   - Otwórz okno DŸwiêk/Muzyka
   - Wybierz plik muzyki (np. `OWP_DAY_STD`)
   - Konwencja nazewnictwa muzyki:
     - `LOKACJA_CZAS_STAN`
     - `OWP` = Stary Œwiat
     - `DAY` = Dzieñ
     - `STD` = Standard (nie walka)
     - `FGT` = Muzyka walki

3. **Ustaw nazwê voba**
   - Format: `STREFA_MUZYKI_NAZWA_UTWORU`
   - Przyk³ad: `MOJA_MUZYKA_OWP` odtworzy `OWP_DAY_STD`
   - Kliknij Apply

4. **Zdefiniuj rozmiar strefy**
   - Naciœnij **klawisz 6** dla trybu edycji BBOX
   - Zmieñ rozmiar strefy u¿ywaj¹c WASD, Spacja, X (patrz rozdzia³ edycji BBOX)
   - Muzyka gra tylko gdy gracz jest wewn¹trz tej strefy

### Muzyka domyœlna (oCZoneMusicDefault)

Ustaw muzykê t³a dla ca³ego œwiata:

1. Utwórz typ voba: `oCZoneMusicDefault`
2. Skonfiguruj muzykê tak samo jak oCZoneMusic
3. **Nie trzeba ustawiaæ rozmiaru strefy** - dotyczy ca³ego poziomu
4. Ni¿szy priorytet ni¿ konkretne strefy oCZoneMusic

### Priorytet muzyki

Gdy strefy muzyki siê nak³adaj¹:

- Ustaw wartoœæ **priority** we w³aœciwoœciach
- Wy¿sza liczba = wy¿szy priorytet
- Domyœlny priorytet = 0
- U¿ywaj priorytetów: 0 (domyœlny) ? 1 (wa¿ny) ? 2 (bardzo wa¿ny)

:::warning
Zawsze u¿ywaj przyrostka `_DAY_STD` dla muzyki œwiata. Muzyka `_FGT` jest odtwarzana automatycznie podczas walki.
:::

## Okno sprawdzania b³êdów

Naciœnij **F3**, aby otworzyæ okno sprawdzania b³êdów:

### Kategorie b³êdów

- **Czerwone b³êdy (Krytyczne)**
  - Punkty wêdrówki bez po³¹czeñ
  - Brakuj¹ce tekstury
  - Nieprawid³owe odniesienia do vobów
  - Uszkodzone po³¹czenia portali

- **¯ó³te ostrze¿enia**
  - Sugestie optymalizacji
  - Nietypowe konfiguracje vobów
  - Problemy z wydajnoœci¹

- **Niebieskie informacje**
  - Statystyki i liczniki
  - Wiadomoœci informacyjne

### Czêste b³êdy i rozwi¹zania

| B³¹d                 | Przyczyna                         | Rozwi¹zanie                            |
| -------------------- | --------------------------------- | -------------------------------------- |
| "Waypoint isolated"  | FP niepo³¹czony z sieci¹ wêdrówki | Po³¹cz z innymi punktami wêdrówki      |
| "Texture not found"  | Brakuj¹cy plik tekstury           | Dodaj teksturê lub zast¹p istniej¹c¹   |
| "Vob without visual" | Puste pole wizualu                | Przypisz mesh lub usuñ voba            |
| "Portal open"        | Mesh portalu ma luki              | Popraw geometriê portalu w edytorze 3D |

:::tip
Uruchom sprawdzanie b³êdów przed kompilacj¹ œwiata - naprawienie b³êdów wczeœnie zapobiega crashom gry.
:::

## System katalogu vobów

Dostêp przez **Insert ? Vob Catalog** (lub skrót klawiszowy):

### Funkcje katalogu

1. **Przegl¹daj bibliotekê szablonów vobów**
   - Wstêpnie skonfigurowane voby ze standardowymi ustawieniami
   - Podzielone na kategorie (dekoracje, meble, natura itp.)
   - Podwójne klikniêcie, aby wstawiæ

2. **Zapisz w³asne szablony**
   - Skonfiguruj voba ze wszystkimi w³aœciwoœciami
   - Prawy przycisk ? "Zapisz do katalogu"
   - Nazwij szablon opisowo
   - U¿ywaj ponownie w wielu œwiatach

3. **Import/Export katalogów**
   - Udostêpniaj katalogi miêdzy projektami
   - Twórz kopie zapasowe czêsto u¿ywanych konfiguracji
   - Pliki katalogów przechowywane w: `_work\tools\vob_catalog\`

### Popularne kategorie katalogu

- **Natura**: Drzewa, ska³y, kêpy trawy, krzewy
- **Architektura**: Drzwi, okna, schody, kolumny
- **Oœwietlenie**: Uchwyty na pochodnie, Ÿród³a œwiat³a ze wstêpnie zdefiniowanymi kolorami
- **Interaktywne**: Wstêpnie skonfigurowane skrzynie, dŸwignie, drzwi
- **Efekty**: Emitery cz¹steczek ze standardowymi efektami

## Wybór poligonów i filtr materia³ów

### Tryb wyboru poligonów

Naciœnij **F4**, aby wejœæ w tryb wyboru poligonów:

1. **Zaznacz poligony**
   - Kliknij pojedyncze poligony
   - Shift+Klik dla wielokrotnego zaznaczenia
   - Ctrl+Klik, aby odznaczyæ

2. **Narzêdzia zaznaczania**
   - Zaznacz wed³ug materia³u
   - Zaznacz po³¹czone poligony
   - Rozszerz/zmniejsz zaznaczenie
   - Ró¿ne materia³y z ró¿nymi kolorami

3. **Operacje**
   - Przypisz nowy materia³
   - Usuñ zaznaczone poligony (u¿ywaj ostro¿nie!)
   - Eksportuj zaznaczenie
   - Modyfikuj rozdzielczoœæ lightmapy

### Filtr materia³ów

Filtruj wyœwietlanie œwiata wed³ug typu materia³u:

1. **Otwórz okno filtru materia³ów**
   - Pokazuje wszystkie materia³y u¿yte w œwiecie
   - Checkbox przy ka¿dym materiale

2. **Opcje filtrowania**
   - **Poka¿ tylko**: Wyœwietl tylko zaznaczone materia³y
   - **Ukryj zaznaczone**: Ukryj zaznaczone materia³y
   - **Odwróæ**: Odwróæ widocznoœæ

3. **Przypadki u¿ycia**
   - ZnajdŸ wszystkie u¿ycia konkretnej tekstury
   - Ukryj teren, aby zobaczyæ podziemne struktury
   - Wyizoluj elementy architektoniczne

:::info
Filtr materia³ów nie usuwa geometrii - tylko kontroluje widocznoœæ w edytorze.
:::

## Makra i automatyzacja

Dostêp: **Window ? Macros** lub **Ctrl+M**

### Komendy makr

Zautomatyzuj powtarzalne zadania za pomoc¹ komend makr:

| Komenda       | Sk³adnia                         | Opis                                    |
| ------------- | -------------------------------- | --------------------------------------- |
| RESET         | `RESET`                          | Wyczyœæ œwiat, wróæ do stanu domyœlnego |
| LOAD MESH     | `LOAD MESH nazwa_pliku.3ds`      | Wczytaj konkretny plik meshu            |
| LOAD WORLD    | `LOAD WORLD nazwa_œwiata.zen`    | Wczytaj plik œwiata                     |
| COMPILE WORLD | `COMPILE WORLD nazwa_œwiata.zen` | Kompiluj œwiat z obecnymi ustawieniami  |
| COMPILE LIGHT | `COMPILE LIGHT nazwa_œwiata.zen` | Przekompiluj tylko oœwietlenie          |
| SAVE MESH     | `SAVE MESH nazwa_pliku.3ds`      | Eksportuj jako mesh                     |
| SAVE WORLD    | `SAVE WORLD nazwa_œwiata.zen`    | Zapisz plik œwiata                      |

### Format pliku makra

Makra przechowywane w: `_work\tools\macros_spacernet.txt`

Przyk³ad makra dla automatycznej kompilacji œwiata:

```
LOAD WORLD mojswiat.zen
COMPILE LIGHT mojswiat.zen
COMPILE WORLD mojswiat.zen
SAVE WORLD mojswiat.zen
```

### Uruchamianie makr

1. Utwórz/edytuj `macros_spacernet.txt`
2. Otwórz okno Makr
3. Kliknij "Execute", aby uruchomiæ wszystkie komendy
4. Monitoruj postêp w konsoli

:::warning
Zawsze twórz kopie zapasowe œwiatów przed uruchomieniem makr - b³êdy kompilacji mog¹ uszkodziæ pliki.
:::

## Edycja BBOX / Rozmiar strefy

Naciœnij **klawisz 6**, aby wejœæ w tryb edycji BBOX:

### Sterowanie

**Przesuwanie punktów:**

- **W** - Przesuñ do przodu (Y+)
- **S** - Przesuñ do ty³u (Y-)
- **A** - Przesuñ w lewo (X-)
- **D** - Przesuñ w prawo (X+)
- **Spacja** - Przesuñ w górê (Z+)
- **X** - Przesuñ w dó³ (Z-)

**Wybór punktu:**

- **Klawisz 1** - Wybierz punkt maxs (daleki róg)
- **Klawisz 2** - Wybierz punkt mins (bliski róg)

**Regulacja skali (v1.18+):**

- **Klawisz 3** - Zwiêksz skalê
- **Klawisz 4** - Zmniejsz skalê

### Zastosowania BBOX

- **Strefy muzyki** (`oCZoneMusic`) - Zdefiniuj, gdzie gra muzyka
- **Strefy dŸwiêku** (`oCZoneSound`) - Obszary dŸwiêków otoczenia
- **Strefy triggerów** (`zCTrigger`) - Obszary triggerów skryptowych
- **Strefy mg³y** (`zCZoneZFog`) - Granice efektów mg³y
- **Vob Farplane** - Strefy zasiêgu widoku

### Przyk³ad przep³ywu pracy

1. Utwórz voba strefy (np. `oCZoneMusic`)
2. Naciœnij **klawisz 6**, aby wejœæ w tryb BBOX
3. Naciœnij **klawisz 1**, aby wybraæ maxs (daleki róg)
4. U¿yj **WASD/Spacja/X**, aby ustawiæ pozycjê dalekiego rogu
5. Naciœnij **klawisz 2**, aby wybraæ mins (bliski róg)
6. Ustaw pozycjê bliskiego rogu w ten sam sposób
7. **ESC**, aby wyjœæ z trybu BBOX
8. Wizualizuj strefê jako kolorow¹ nak³adkê pude³ka

:::tip
Rób strefy muzyki nieco wiêksze ni¿ oczekiwano - gracze powinni s³yszeæ muzykê przed wejœciem do zdefiniowanego obszaru dla p³ynnych przejœæ.
:::

## Siewca obiektów - Masowe tworzenie vobów

Dostêp: **Window ? Object Seeder** lub **Insert ? Mass Insert**

Idealny do umieszczania wielu podobnych obiektów (trawa, ska³y, drzewa, gruzy):

### Ustawienia siewcy

1. **Minimalna odleg³oœæ miêdzy vobami**
   - Zapobiega nak³adaniu siê obiektów
   - Mierzone od centrów vobów
   - Ni¿sza wartoœæ = gêstsze rozmieszczenie
   - Typowa: 50-200 jednostek w zale¿noœci od rozmiaru obiektu

2. **Przesuniêcie wertykalne**
   - Wysokoœæ nad powierzchni¹, na której umieœciæ voba
   - Zapobiega "zapadaniu siê" obiektów w ziemiê
   - Dostosuj wizualnie dla ka¿dego typu obiektu
   - Przyk³ad: Trawa = -5, Ska³y = 0, Drzewa = -10

3. **Tryb usuwania**
   - Prze³¹cz na tryb usuwania
   - Kliknij, aby usun¹æ umieszczone obiekty
   - Przydatne do poprawiania b³êdów

4. **Wstaw jako oCItem**
   - Tworzy voby jako typ przedmiotu
   - U¿ywane do umieszczania zbieralnych przedmiotów
   - Zazwyczaj wy³¹czone dla dekoracji

5. **Zabezpiecz lewy przycisk myszy**
   - Zapobiega ci¹g³emu wstawianiu podczas przytrzymania myszy
   - Umieszcza tylko jednego voba na klikniêcie
   - Zalecane: **w³¹czone** w wiêkszoœci przypadków

6. **Dynamiczna kolizja**
   - W³¹cz kolizjê fizyczn¹ dla umieszczonych vobów
   - Zazwyczaj **wy³¹czone** dla statycznych dekoracji
   - W³¹cz dla obiektów fizycznych (beczki, skrzynie)

7. **Losowy obrót wertykalny**
   - Obróæ ka¿dego voba losowo wokó³ osi Z
   - Tworzy naturaln¹ ró¿norodnoœæ
   - Zalecane: **w³¹czone** dla obiektów natury

8. **Prostopadle do poligonu**
   - Wyrównaj voba do normalnej powierzchni
   - Obiekty pod¹¿aj¹ za nachyleniem terenu
   - Przydatne dla trawy, ska³ na wzgórzach

9. **Wstaw do globalnego rodzica**
   - Automatycznie ustaw rodzica dla wszystkich zasianych vobów
   - Organizuj do kontenera vobów
   - Zalecane dla ³atwiejszego zarz¹dzania

10. **Ogólne ustawienia voba**
    - Ustaw wizual, materia³, w³aœciwoœci kolizji
    - Stosowane do wszystkich zasianych obiektów

### Przep³yw pracy siewcy

1. **Przygotuj szablon voba** z ¿¹danym wizualem i ustawieniami
2. **Otwórz okno Object Seeder**
3. **Skonfiguruj parametry zasiewu**
   - Ustaw minimaln¹ odleg³oœæ (np. 100 dla trawy)
   - Ustaw przesuniêcie wertykalne (np. -5)
   - W³¹cz losowy obrót
   - W³¹cz prostopadle do poligonu
4. **Klikaj na teren**, aby umieœciæ obiekty
   - Klikaj wielokrotnie lewym przyciskiem, aby "malowaæ" obiekty
   - Przesuwaj mysz podczas klikania dla pokrycia
5. **Przejrzyj i dostosuj**
   - U¿yj trybu usuwania, aby usun¹æ b³êdy
   - Dostosuj gêstoœæ, zmieniaj¹c minimaln¹ odleg³oœæ

### Przyk³ad: Pole trawy

Ustawienia dla realistycznego pokrycia traw¹:

- Wizual: `OW_NATURE_BUSH_BIG_01.3DS`
- Minimalna odleg³oœæ: `80`
- Przesuniêcie wertykalne: `-5`
- Losowy obrót: **w³¹czony**
- Prostopadle do poligonu: **w³¹czony**
- Zabezpiecz lew¹ mysz: **w³¹czony**
- Wstaw do globalnego rodzica: `POLE_TRAWY_01`

Rezultat: Naturalnie wygl¹daj¹ce pokrycie traw¹ w kilka sekund!

:::warning
Nigdy nie zamykaj okna Object Seeder podczas trybu zasiewu - mo¿e to spowodowaæ niestabilnoœæ edytora. Zawsze najpierw wy³¹cz zasiew.
:::

:::tip
Twórz wiele kontenerów globalnych rodziców dla ró¿nych warstw roœlinnoœci (trawa, krzewy, drzewa), aby osobno zarz¹dzaæ LOD i wydajnoœci¹.
:::

---

## Podsumowanie

Te zaawansowane funkcje przekszta³caj¹ SpacerNET z podstawowego edytora w profesjonalne narzêdzie do budowania œwiatów:

- **Tryby wyœwietlania** optymalizuj¹ przep³yw pracy i wydajnoœæ
- **Kontenery vobów** organizuj¹ z³o¿one sceny
- **Okna informacyjne** dostarczaj¹ niezbêdnych danych debugowania
- **Strefy muzyki** tworz¹ wci¹gaj¹ce krajobrazy dŸwiêkowe
- **Sprawdzanie b³êdów** zapobiega crashom gry
- **Katalog vobów** przyspiesza typowe zadania
- **Filtr materia³ów** izoluje konkretn¹ geometriê
- **Makra** automatyzuj¹ powtarzalne operacje
- **Edycja BBOX** definiuje precyzyjne granice stref
- **Siewca obiektów** umieszcza tysi¹ce obiektów w minuty

Opanuj te narzêdzia, aby pracowaæ szybciej i tworzyæ bardziej szczegó³owe, dopracowane œwiaty Gothica.
