---
sidebar_position: 3
title: "Union"
description: "Opis frameworka Union do tworzenia pluginów C++ dla Gothic."
---

# Union

**Union** to open-source'owy framework do tworzenia natywnych **pluginów C++** dla Gothic I i Gothic II. Daje bezpośredni dostęp do wewnętrznych mechanizmów silnika **ZenGin** — obiektów gry w pamięci, funkcji silnika, pipeline'u renderowania i wielu innych — umożliwiając modyfikacje daleko wykraczające poza możliwości skryptów Daedalus.

Pluginy Union są kompilowane jako pliki **DLL** i ładowane do procesu gry w trakcie uruchamiania. Mogą hookować praktycznie dowolną funkcję silnika za pomocą biblioteki **Detours**, przechwytywać i modyfikować zachowanie gry, dodawać nowe funkcje zewnętrzne Daedalusa oraz operować na świecie gry na niskim poziomie.

- System budowania: **CMake 3.21+** z generatorem Ninja
- Zalecane IDE: **Visual Studio 2022** (ze wsparciem CMake)
- Standard C++: **C++20**
- Licencja: **BSD 3-Clause**
- Kod źródłowy: [GitLab](https://gitlab.com/union-framework)

---

## Zastosowania

Union jest wykorzystywany tam, gdzie skrypty Daedalus nie wystarczają — na przykład:

- Modyfikowanie zachowania silnika (system walki, AI, renderowanie)
- Dodawanie nowych funkcji na poziomie silnika (nowe efekty cząsteczkowe, elementy UI, obsługa wejścia)
- Naprawianie błędów silnika
- Udostępnianie nowych externali Daedalusa do użytku po stronie skryptów
- Optymalizacja wydajności gry
- Odczyt/zapis własnej konfiguracji z plików `.ini`

---

## Architektura

Union Framework składa się z dwóch głównych komponentów, zarządzanych jako **submoduły Git**:

- [`union-api`](https://gitlab.com/union-framework/union-api) — rdzeń frameworka dostarczający hookowanie, operacje na pamięci, narzędzia do stringów i cykl życia pluginu
- [`gothic-api`](https://gitlab.com/union-framework/gothic-api) — nagłówki silnika ZenGin z definicjami klas i adresami pamięci dla wszystkich czterech wersji gry

---

## Wspierane wersje gry

Union wspiera wszystkie cztery wersje silnika Gothic:

| Define preprocesora  | Namespace             | Wersja gry                     |
| -------------------- | --------------------- | ------------------------------ |
| `__G1`               | `Gothic_I_Classic`    | Gothic I                       |
| `__G1A`              | `Gothic_I_Addon`      | Gothic I Addon                 |
| `__G2`               | `Gothic_II_Classic`   | Gothic II                      |
| `__G2A`              | `Gothic_II_Addon`     | Gothic II: Noc Kruka           |

Pojedynczy projekt pluginu może celować we **wszystkie cztery wersje** jednocześnie. System budowania kompiluje oddzielne ścieżki kodu dla każdej wersji za pomocą define'ów preprocesora, a odpowiednia ścieżka jest aktywowana w runtime na podstawie wykrytej wersji silnika.

---

## Jak działają pluginy

1. Plugin jest kompilowany jako **DLL** (Dynamic Link Library)
2. Plik DLL jest umieszczany w katalogu `System/Autorun/` gry
3. Gdy Gothic się uruchamia, runtime Union ładuje wszystkie pliki DLL z `Autorun/`
4. Plugin rejestruje swoje **funkcje zdarzeń gry** — callbacki wywoływane przez silnik w określonych momentach
5. Hooki przechwytują funkcje silnika pod **znanymi adresami pamięci** — każda wersja gry ma inne adresy dla tej samej funkcji

### Funkcje zdarzeń gry

To główne callbacki, które plugin może zaimplementować. Nie są wywoływane domyślnie — każdy wymaga odkomentowania odpowiedniego hooka (szablon dostarcza je jako zakomentowany kod):

| Funkcja                           | Kiedy jest wywoływana                                   |
| --------------------------------- | ------------------------------------------------------- |
| `Game_EntryPoint`                 | Punkt wejścia Gothic (najwcześniejszy moment)           |
| `Game_Init`                       | Po zainicjalizowaniu plików DAT, świat gotowy           |
| `Game_Exit`                       | Podczas zamykania gry                                   |
| `Game_PreLoop`                    | Przed wyrenderowaniem każdej klatki                     |
| `Game_Loop`                       | Co klatkę (renderowanie głównego świata)                |
| `Game_PostLoop`                   | Po wyrenderowaniu każdej klatki                         |
| `Game_MenuLoop`                   | Co klatkę w menu                                        |
| `Game_SaveBegin` / `Game_SaveEnd` | Gdy rozpoczyna/kończy się zapis                         |
| `Game_LoadBegin_*` / `Game_LoadEnd_*` | Różne scenariusze ładowania (nowa gra, zapis, zmiana poziomu) |
| `Game_Pause` / `Game_Unpause`     | Gdy gra się pauzuje / odpauzowuje                       |
| `Game_DefineExternals`            | Gdy rejestrowane są externale Daedalusa                  |
| `Game_ApplySettings`              | Gdy ustawienia gry są stosowane                          |

### Kompilacja wielogrowa

Plik `Plugin.cpp` używa kompilacji warunkowej, aby skompilować Twój kod oddzielnie dla każdej wersji gry:

```cpp
#ifdef __G1
#define GOTHIC_NAMESPACE Gothic_I_Classic
#define ENGINE Engine_G1
#include "Sources.hpp"
#endif

#ifdef __G2A
#define GOTHIC_NAMESPACE Gothic_II_Addon
#define ENGINE Engine_G2A
#include "Sources.hpp"
#endif
```

Logika pluginu jest pisana wewnątrz namespace'u `GOTHIC_NAMESPACE` w pliku `Plugin.hpp`. Plik `Sources.hpp` includuje `Plugin.hpp`, a to samo źródło jest kompilowane raz dla każdej docelowej wersji gry.

### Hookowanie funkcji silnika

Union korzysta z Microsoft **Detours** do hookowania funkcji silnika. Są dwa typy hooków:

**Pełne hooki** (`Union::CreateHook`) — zastępują całą funkcję silnika Twoją własną implementacją. Możesz wywołać oryginalną funkcję przed lub po swoim kodzie.

Hooki deklaruje się jako metody klasy silnikowej, którą hookujemy. Deklaracja trafia do pliku `.inl` w folderze `userapi/` (np. `userapi/oCGame.inl`):

```cpp
// userapi/oCGame.inl
void UpdatePlayerStatus_Hook();
```

Następnie rejestrujemy i implementujemy hook w kodzie pluginu:

```cpp
auto Hook_oCGame_UpdatePlayerStatus = ::Union::CreateHook(
    reinterpret_cast<void*>(zSwitch(0x00638F90, 0x0065F4E0, 0x00666640, 0x006C3140)),
    &oCGame::UpdatePlayerStatus_Hook,
    ::Union::HookType::Hook_Detours
);

void oCGame::UpdatePlayerStatus_Hook()
{
    // twój kod przed oryginałem
    (this->*Hook_oCGame_UpdatePlayerStatus)(); // wywołaj oryginał
    // twój kod po oryginale
}
```

Składnia `(this->*Hook_Zmienna)(parametry)` wywołuje oryginalną funkcję silnika. Typ hooka `Hook_Detours` korzysta z Microsoft Detours i powinien być zawsze używany — zapewnia kompatybilność z innymi pluginami, w tym tymi zbudowanymi ze starszymi wersjami Union.

**Częściowe hooki** (`Union::CreatePartialHook`) — wstrzykują kod pod konkretnym adresem instrukcji, dając dostęp do rejestrów CPU do niskopoziomowych manipulacji.

Makro `zSwitch(G1, G1A, G2, G2A)` dostarcza różne adresy pamięci dla każdej wersji silnika, używając `0` dla wersji, które nie mają być hookowane.
