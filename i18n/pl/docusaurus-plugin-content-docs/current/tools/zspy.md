---
title: zSpy
description: Narzędzie debugujące wyświetlające operacje silnika podczas działania Gothic lub Spacer.
sidebar_position: 11
---

# zSpy

**zSpy** to narzędzie debugujące, które wyświetla większość operacji wykonywanych przez silnik podczas działania gry **Gothic** lub edytora **Spacer**.

:::warning
zSpy musi zostać uruchomiony **przed** startem gry Gothic lub edytora Spacer, aby program mógł go wykryć.
- W **Gothic I** czasem trzeba zrobić to ręcznie.
- W **Gothic II** zajmuje się tym `GothicStarter_mod.exe`.
:::

Aby móc śledzić komunikaty w zSpy, Gothic powinien być uruchomiony w **trybie okienkowym**.
- Odpowiednią opcję startową można znaleźć w `GothicStarter_mod.exe`.
- Wewnątrz gry, gdy aktywny jest **Marvin mode**, można w każdej chwili przełączać się między trybem okienkowym a pełnoekranowym klawiszem `F3`.

## Poziom logowania (Log Level)

Za pomocą parametru `-zlog:` w GothicStarterze można określić, jak wiele komunikatów zSpy będzie wypisywał. Wartość może być liczbą od **-1** do **9** (np. `-zlog:5`).

- **-1**: Wyłącz wszystkie komunikaty (oprócz błędów krytycznych).
- **0**: Pokazuje tylko ostrzeżenia, błędy i błędy krytyczne.
- **1 - 9**: Wyświetlaj więcej informacji. Każda informacja ma swój priorytet.
    - Jeśli wybierzesz **1**, program wyświetli tylko komunikaty z priorytetem `<= 1`.
    - Jeśli wybierzesz **5**, wyświetli tylko priorytet `<= 5`.
    - Jeśli wybierzesz **9**, wyświetli prawie wszystko, co silnik może wygenerować.

:::tip
Do ogólnego debugowania zalecaną wartością jest **5**.
:::

## Wyjście (Output)

zSpy wydaje swoje raporty w następującej formie:

`Time Type Priority User Message ... <filename, #line>`

**Przykład:**
`00:21 Info:  3 B:     GOTHIC: Exiting game ... .... <oGameManager.cpp,#617>`

### Time (Czas)
Czas, który upłynął od startu `Gothic.exe`.

### Type (Typ)
Typ komunikatu. Wyróżnia się następujące typy wiadomości:

- **Fatal**: Błąd krytyczny powodujący zamknięcie aplikacji.
- **Fault**: Prosty błąd, który nie spowoduje zatrzymania aplikacji, ale mogą wystąpić problemy z wyświetlaniem lub wydajnością.
- **Warn**: Ostrzeżenie o możliwych konsekwencjach. Błąd, który następuje wkrótce potem, może mieć z tym coś wspólnego.
- **Info**: Ogólne informacje o postępie programu.

### Priority (Priorytet)
Poziom priorytetu wiadomości. Wiadomości o niższym priorytecie (wyższym numerze) mogą zostać wyłączone przez [Poziom logowania](#poziom-logowania-log-level).

### User (Użytkownik)
ID użytkownika - litera zdefiniowana przez każdego twórcę silnika, aby wyróżnić jego logi:

- **D**: Dieter
- **U**: Ulf
- **B**: Bert
- **C**: Carsten
- **A**: Andre
- **X**: Kurt

### Message (Wiadomość)
Najważniejsza część. Wiadomość, która zawiera:
- Symbol reprezentujący moduł programu (np. `MDL` = modele 3D, `PAR` = Parser itp.).
- Treść wiadomości dla użytkownika.

## Konfiguracja

W zSpy można dostosować czcionkę i jej kolor w zależności od typu wiadomości.
Dodatkowo można skonfigurować opcje logowania:
- Filtrowanie różnych wiadomości (Info, Warn, Fault, Fatal).
- Automatyczne pokazywanie/ukrywanie zSpy przy starcie/zatrzymaniu Gothic.
- Zapisywanie logu do oddzielnego pliku.

## Komendy konsoli

Możesz używać komendy `zerr` w konsoli (F2) do sterowania zSpy w czasie rzeczywistym.

### zerr level

Ustawia poziom szczegółowości logowania.

```
zerr level <#>
```

- `<#>`: Maksymalny priorytet wiadomości. Zobacz [Poziom logowania](#poziom-logowania-log-level).

### zerr searchspy

Łączy zSpy z Gothicem. Przydatne, gdy uruchomisz zSpy, gdy gra jest już uruchomiona.

```
zerr searchspy
```

### zerr authors

Ustawia filtr, aby wyświetlać tylko wiadomości jednego autora.

```
zerr authors <litera>
```

- `<litera>`: Jedna z liter wymienionych w sekcji [Użytkownik](#user-użytkownik).

### zerr rem

Wstawia uwagę (linię oddzielającą) do logu, co jest przydatne do oznaczania konkretnych zdarzeń podczas debugowania.

```
zerr rem
```

**Przykładowe wyjście:**
```
00:46 Info:  3 B:     OPT: Blood-Details: Value=2 .... <oGameManager.cpp,#1302>
00:57 ---------------
00:57 ---------------
01:01 Info:  3 B:     GMAN: Leaving Menu-Section .... <oGameManager.cpp,#1537>
```

### zerr status

Wyświetla bieżący status zSpy w konsoli.

```
zerr status
```
