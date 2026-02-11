---
sidebar_position: 1
title: zTEXiPy
description: Narzędzie w Pythonie do konwersji tekstur Gothic i Gothic 2 na popularne formaty i odwrotnie.
---

# zTEXiPy

**zTEXiPy** to projekt *open source* napisany w języku Python, wykorzystujący biblioteki Pillow, NumPy, DearPyGui i libsquish do konwersji tekstur z gier **Gothic** i **Gothic 2** (ZenGin) na popularne formaty i odwrotnie.

## Cechy

-   **Szerokie wsparcie formatów**: Konwersja tekstur Gothic i Gothic 2 do różnych formatów, w tym **TGA**, **PNG**, **WEBP**, **JPG**.
-   **Konwersja masowa**: Umożliwia użytkownikom przetwarzanie wielu tekstur jednocześnie.
-   **Wsparcie kompresji**: Obsługuje kompresję do **DXT1 (BC1)**, **DXT3 (BC2)** i **DXT5 (BC3)** (Uwaga: DXT5 nie jest jeszcze natywnie obsługiwany przez ZenGin).
-   **Przyjazny dla użytkownika**: Posiada graficzny interfejs (GUI) ułatwiający obsługę oraz integrację z menu kontekstowym w systemie Windows.

## Instalacja

### Windows (Zalecane)

1.  Pobierz paczkę ze [strony wydań (Releases)](https://gitlab.com/Shoun2137/ztexipy/-/releases).
2.  Rozpakuj paczkę w wybranym miejscu instalacji.
3.  Uruchom `install.cmd` jako zwykły użytkownik.
    -   Skrypt ten wywoła skrypt Powershell, który doda klucze rejestru dla integracji z menu kontekstowym.
    -   Zaakceptuj prośbę o uprawnienia administratora, gdy zostaniesz o to zapytany.
4.  Teraz możesz otwierać tekstury za pomocą prostej przeglądarki, a także będziesz mieć nowe opcje w menu kontekstowym dla różnych popularnych formatów!

### Linux

1.  Uruchom program używając polecenia `zTEXiPy`, aby uzyskać podstawowe informacje o użyciu, lub użyj `-GUI`, aby uruchomić interfejs graficzny.
2.  Integracja z menu kontekstowym nie jest dostępna na Linuxie ze względu na różnorodność menedżerów plików.

## Wymagania

-   **System**: Tylko systemy 64-bitowe.
-   **Python**: 3.12.6 lub nowszy (jeśli uruchamiasz ze źródeł).
-   **Biblioteki**: Pillow, NumPy, DearPyGui, libsquish-bind.

## Użycie

### Tryb GUI

Uruchom aplikację, aby otworzyć graficzny interfejs użytkownika. Możesz przeciągać i upuszczać pliki lub użyć wybieraka plików, aby wybrać tekstury do konwersji.

### Menu Kontekstowe (Windows)

Kliknij prawym przyciskiem myszy na obsługiwany plik tekstury (np. `.tex`, `.tga`, `.png`), aby zobaczyć opcje zTEXiPy dla szybkiej konwersji.

## Linki

-   [Repozytorium GitLab](https://gitlab.com/Shoun2137/ztexipy)
-   [Wydania (Releases)](https://gitlab.com/Shoun2137/ztexipy/-/releases)
-   [Serwer Discord](https://discord.gg/mCpS5b5SUY)
