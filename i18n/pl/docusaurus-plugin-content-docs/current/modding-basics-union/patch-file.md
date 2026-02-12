---
sidebar_position: 3
title: "Pliki .patch"
description: "Tworzenie i używanie plików .patch Union do manipulacji pamięcią."
---

# Pliki .patch

Pliki `.patch` w Union pozwalają modyfikować pamięć gry (kod, dane) bez konieczności kompilowania pełnego pluginu C++. Są one interpretowane w czasie rzeczywistym przez Union i przydają się do wprowadzania drobnych poprawek, naprawiania błędów lub zmiany domyślnych wartości silnika.

:::info
Pliki patch muszą mieć rozszerzenie `.patch` i znajdować się w katalogu `System/` lub dowolnym innym katalogu monitorowanym przez Union (np. wewnątrz woluminu `.vdf` lub `.mod`).
:::

## Wyłączanie patchy

Możesz zapobiec uruchamianiu określonych patchy lub funkcji używając dyrektywy `#disable`. Ma ona najwyższy priorytet.

```
#disable [NazwaRef]     // Wyłącza konkretny patch po nazwie
#disable [Reference]    // Wyłącza wszystkie operacje na referencjach
#disable [Cast]         // Wyłącza wszystkie operacje rzutowania typów
```

## Bloki silnika

Użyj bloków `#engine`, aby ograniczyć wykonywanie kodu do konkretnych wersji gry lub sum kontrolnych pliku wykonywalnego.

```
#engine [G1, G2A]
    // Kod tutaj uruchomi się tylko na Gothic 1 i Gothic 2 NK
#/engine
```

Obsługiwane tagi: `G1`, `G1A`, `G2`, `G2A`.
Można również podać sumę CRC32: `#engine [0x2BCD7E30]`.
Jeśli blok `#engine` nie zostanie użyty, kod uruchomi się na wszystkich wersjach.

## Bloki patchy

Blok `#patch` definiuje zakres konkretnej modyfikacji.

```
#patch [Nazwa Mojego Patcha]
    // Instrukcje patcha
#/patch
```

Użycie `[GLOBAL DATA]` jako nazwy sprawia, że zdefiniowane zmienne są widoczne we wszystkich innych patchach.

```
#patch [GLOBAL DATA]
    INT GlobalValue = 100
#/patch
```

## Typy danych

Union wspiera kilka podstawowych typów danych do definiowania zmiennych i stałych.

- **INT**: `INT Value = 123` lub `INT Hex = 0x123`
- **FLOAT**: `FLOAT Value = 123.45`
- **BOOL**: `BOOL Flag = true` (lub `1`, `false`, `0`)
- **HEX**: Surowe bajty. Może być ciągiem znaków lub bajtami oddzielonymi spacją.
    - `HEX Bytes = '90 90 90'`
    - `HEX String = "Witaj"`
- **STRING**: `STRING Text = "Witaj Świecie"`

## Referencje (@)

Operator `@` tworzy referencję do adresu pamięci lub ustawienia INI. Przypisanie wartości do referencji modyfikuje wartość pod tym adresem. Automatycznie zdejmuje ochronę pamięci, jeśli jest to konieczne.

### Referencje do pamięci

```
// Zapisz liczbę całkowitą 100 pod adres 0x123456
INT @0x123456 = 100

// Użycie wyrażenia do obliczenia adresu
INT @(0x123456 + 4) = 200
```

### Referencje do INI

Możesz powiązać zmienną z ustawieniem w `SystemPack.ini`.

```
// Linkuje do SystemPack.ini, sekcja [CORE], klucz ShowDebugWindow
INT @SystemPack:Core:ShowDebugWindow = 1
```

## Rzutowanie typów

Union wspiera zarówno niejawne, jak i jawne rzutowanie typów.

### Niejawne
```
INT Value = 5
FLOAT Result = 10.0 + Value * 5.3 // Value jest automatycznie rzutowane na FLOAT
```

### Jawne
```
INT Value = 5
FLOAT Result = 10.0 + FLOAT Value * 5.3
```

### Rzutowanie HEX
Rzutowanie na/z HEX traktuje dane jako surowe bajty.

```
INT Source = 65535
HEX Bytes = HEX Source    // Konwertuje int na surowe bajty
INT Restored = INT Bytes  // Konwertuje bajty z powrotem na int
```

## Warunki

Możesz używać `IF`, `ELSE` i `END` do warunkowego wykonywania kodu. Warunek musi ewaluować do typu `BOOL`.

```
IF BOOL @SystemPack:Core:ShowDebugWindow != true
    MessageBox("Okno debugowania jest wyłączone")
ELSE
    MessageBox("Okno debugowania jest włączone")
END
```

## Strony pamięci

Możesz alokować własne strony pamięci do przechowywania danych lub kodu. Jest to przydatne dla dużych struktur danych lub własnych wstawek kodu (code caves).

```
// Alokacja zdefiniowana przez indeks (musi być > 0)
AllocPage(15, 1024) 

// Użycie
HEX @15x00000000 = '90 90 90 C3'
```

## Statyczne patche

Statyczne patche są zoptymalizowane pod kątem wydajności. Przeznaczone są do prostych nadpisań pamięci, które nie wymagają warunków ani złożonej logiki. Są one cache'owane i nakładane szybciej.

```
#patch static [Szybki Patch]
    HEX @0x007524A6 = 'E9 EB C2 F1 FF'
#/patch
```

## Wstawki asemblerowe

Dla złożonej logiki możesz wstrzykiwać kod asemblera bezpośrednio w przepływ wykonania silnika.

```
#assembler [Adres]
    // Instrukcje asemblera
#/assembler
```

### Przepływ wykonania i Orgcode

Gdy definiujesz wstawkę asemblerową pod adresem, Union wpisuje tam 5-bajtowy skok `JMP` do twojego kodu. Nadpisuje to istniejące instrukcje.
- Aby wykonać nadpisane instrukcje, użyj słowa kluczowego `orgcode`.
- `orgcode` automatycznie przelicza offsety relokacji.
- Jeśli nie użyjesz `orgcode`, oryginalne instrukcje zostaną efektywnie usunięte.

```
#assembler [0x0068CF02]
    // Twój własny kod
    mov eax, 123
    
    // Wykonaj oryginalne instrukcje, które zostały nadpisane przez hook
    orgcode
#/assembler
```

### Częściowe nadpisania (`orgcode +`)

Jeśli 5-bajtowy skok hooka częściowo nadpisuje wiele instrukcji, możesz użyć `orgcode +N`, aby pominąć pierwsze N instrukcji.

```
// Przykład: Pomiń pierwszą nadpisaną instrukcję, wykonaj resztę
orgcode +1
```

### Przekazywanie zmiennych

- **Przekazywanie przez wartość**: Standardowe typy (`INT`, `FLOAT`) są przekazywane przez wartość.
- **Przekazywanie przez adres**: Zmienne `HEX` oraz zmienne zdefiniowane w `[GLOBAL DATA]` są przekazywane przez adres.

```
#patch [Przykład]
    HEX Data = '00 00 00 00'
    
    #assembler [0x123456]
        // Załaduj adres Data do EAX
        lea eax, [$Data]
        orgcode
    #/assembler
#/patch
```

### Ograniczenia

- Adres wstrzyknięcia musi pozwalać na wpisanie 5-bajtowego skoku bez przecinania instrukcji w połowie.
- Nadpisywane bajty nie mogą zawierać celu skoku (etykiety) z innej części kodu, w przeciwnym razie gra ulegnie awarii.
- Jeśli nie podano instrukcji `retn`, wykonanie powraca do pierwszej ważnej instrukcji po wstawce.

## Wbudowane funkcje

Union udostępnia standardową bibliotekę funkcji do użycia w patchach.

### Matematyka
- `Sqrt(value)`: Zwraca pierwiastek kwadratowy liczby.
- `Min(a, b)`: Zwraca mniejszą z dwóch wartości.
- `Max(a, b)`: Zwraca większą z dwóch wartości.
- `Lim(min, value, max)`: Ogranicza wartość do przedziału min i max.

### Pamięć i HEX
- `GetHexSize(value)`: Zwraca rozmiar zmiennej HEX w bajtach.
- `SetHexSize(value, size)`: Ręcznie ustawia rozmiar zmiennej HEX.
- `SetHexAutoSize(value)`: Automatycznie ustala rozmiar zmiennej HEX (zakłada logikę ciągu zakończonego zerem).
- `HexViewBox(ptr, size = auto)`: Wyświetla okno wiadomości ze zrzutem pamięci pod adresem `ptr`.

### Wyszukiwanie i operacje na pamięci
- `FindAndReplace(from, to, start, len)`: Wyszukuje wzorzec bajtowy `from` i zamienia go na `to` w zakresie od `start` do `start+len`.
- `MemSet(start, byte, len)`: Wypełnia `len` bajtów pamięci zaczynając od `start` wartością `byte`.
- `MemCopy(start, dest, len)`: Kopiuje `len` bajtów z `start` do `dest`.
- `GetRefAddress(ref)`: Zwraca adres pamięci zmiennej referencyjnej.
- `JMP(from, to)`: Wpisuje 5-bajtową instrukcję `JMP` pod adresem `from` skaczącą do `to`.
- `CALL(from, to)`: Wpisuje 5-bajtową instrukcję `CALL` pod adresem `from` wywołującą `to`.

### Operacje na plikach
- `RenameFile(oldName, newName)`: Zmienia nazwę pliku.
- `CopyFile(oldName, newName, replace = true)`: Kopiuje plik.
- `MoveFile(oldName, newName)`: Przenosi plik.
- `DeleteFile(fileName)`: Usuwa plik.
- `FileExists(fileName)`: Zwraca `true` jeśli plik istnieje, w przeciwnym razie `false`.

### System i silnik
- `MessageBox(text)`: Wyświetla standardowe okno wiadomości Windows.
- `PrintScreen(text)`: Wypisuje tekst do wewnętrznej konsoli gry (zSpy).
- `GetUnionVersion()`: Zwraca zainstalowany numer wersji Union.
- `GetLanguage()`: Zwraca ID języka Union (1=Rus, 2=Eng, 3=Deu, 4=Pol, ...).
- `Restart()`: Wymusza restart gry.
- `AllocPage(id, size)`: Alokuje stronę pamięci o indeksie `id` (musi być > 0).
- `FreePage(id)`: Zwalnia stronę pamięci o indeksie `id`.
- `FindSteamDirectory()`: Zwraca ścieżkę do katalogu instalacyjnego Steam.
- `GetScreenSizeX()`: Zwraca szerokość ekranu.
- `GetScreenSizeY()`: Zwraca wysokość ekranu.

### Okna i procesy
- `ShowCmd()`: Pokazuje okno konsoli.
- `HideCmd()`: Ukrywa okno konsoli.
- `FindWindowHandle(windowName)`: Zwraca uchwyt HWND okna po jego nazwie.
- `GetProcessID(processName)`: Zwraca PID procesu.
- `StartProcess(path, args, hide)`: Uruchamia zewnętrzny proces.

### Pluginy i pomocnicze
- `LoadPlugins(fileMask)`: Ładuje pluginy pasujące do maski (np. `Shw32.dll` lub `Data\*.dll`).
- `ModuleBase(moduleName)`: Zwraca adres bazowy załadowanego modułu (DLL).
- `ModuleSize(moduleName)`: Zwraca rozmiar załadowanego modułu.
- `OptionDef(section, name, value)`: Definiuje domyślną wartość dla ustawienia INI, jeśli nie istnieje.
- `ShowFunctionList(moduleName)`: Loguje wszystkie wyeksportowane funkcje modułu do zSpy.
- `Concat(str1, str2)`: Łączy dwa ciągi znaków.

### Interfejs zewnętrzny
- `LoadLibrary(libName)`: Ładuje zewnętrzną bibliotekę DLL do procesu.
- `ImportSymbol(moduleName, symbolName)`: Zwraca adres wyeksportowanej funkcji z biblioteki DLL.
- `ExecAsm(hexCode)`: Wykonuje surowy bajtkod asemblera i zwraca wynik rejestru `EAX`.
