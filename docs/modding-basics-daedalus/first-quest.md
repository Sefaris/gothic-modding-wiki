---
sidebar_position: 4
title: "Moje pierwsze zadanie"
description: "Tworzenie pierwszego questa w Gothic."
---

# Moje pierwsze zadanie

W tym poradniku nauczysz się tworzyć kompletne zadanie (quest) — od rozmowy z NPC, przez dziennik misji, po nagrodę za wykonanie.

## Jak działają questy w Gothic?

System questów w Gothic opiera się na trzech elementach:
1. **Dialogi** (`C_INFO`) — rozmowy z NPC, które rozpoczynają i kończą zadania
2. **Dziennik misji** (Quest Log) — wpisy widoczne dla gracza
3. **Zmienne stanu** — śledzenie postępu zadania

## Klasa C_INFO — dialogi

Każda opcja dialogowa to instancja klasy `C_INFO`:

| Pole | Typ | Opis |
|------|-----|------|
| `npc` | `int` | NPC, z którym rozmawiamy |
| `nr` | `int` | Kolejność wyświetlania (niższy = wyżej) |
| `condition` | `func` | Funkcja warunku — kiedy opcja jest widoczna |
| `information` | `func` | Funkcja wykonywana po wybraniu opcji |
| `permanent` | `int` | `TRUE` = opcja nie znika po użyciu |
| `important` | `int` | `TRUE` = NPC mówi pierwszy (bez wyboru gracza) |
| `description` | `string` | Tekst opcji dialogowej |

## Krok 1: Zmienna stanu misji

Najpierw zdefiniuj zmienną śledzącą postęp questa. Dodaj ją do pliku ze stałymi misji (np. `Log_Constants.d`):

```daedalus
// Stany misji:
// 0             = nie rozpoczęta
// LOG_RUNNING   = w trakcie
// LOG_SUCCESS   = zakończona sukcesem
// LOG_FAILED    = zakończona porażką

var int MIS_Konrad_ZnajdzTopor;

// Nazwa tematu w dzienniku
const string TOPIC_Konrad_ZnajdzTopor = "Topór Konrada";
```

## Krok 2: Przedmiot misyjny

Stwórz przedmiot, który gracz musi znaleźć (w `Items/MissionItems.d`):

```daedalus
instance ItMi_Topor_Konrada (C_Item)
{
    name      = "Stary topór Konrada";
    mainflag  = ITEM_KAT_NONE;
    flags     = ITEM_MISSION;           // przedmiot misyjny
    value     = 0;                      // nie do sprzedania
    visual    = "ItMw_010_1h_misc_axe_01.3DS";
    material  = MAT_WOOD;

    description = name;
    TEXT[5]     = "Przedmiot misyjny";
};
```

:::info
Flaga `ITEM_MISSION` sprawia, że przedmiot nie może być sprzedany ani wyrzucony.
:::

## Krok 3: Dialog — wyjście z rozmowy

Każdy NPC musi mieć opcję **zakończenia rozmowy**. To standardowy element:

```daedalus
// --- Zakończ rozmowę ---
instance DIA_Konrad_EXIT (C_INFO)
{
    npc         = BAU_900_Konrad;
    nr          = 999;                  // na samym dole
    condition   = DIA_Konrad_EXIT_Condition;
    information = DIA_Konrad_EXIT_Info;
    permanent   = TRUE;
    description = DIALOG_ENDE;          // "Koniec"
};

func int DIA_Konrad_EXIT_Condition ()
{
    return TRUE;                        // zawsze widoczny
};

func void DIA_Konrad_EXIT_Info ()
{
    AI_StopProcessInfos (self);         // zamknij okno dialogu
};
```

## Krok 4: Dialog — powitanie (NPC mówi pierwszy)

Gdy gracz podejdzie do Konrada po raz pierwszy:

```daedalus
instance DIA_Konrad_Hallo (C_INFO)
{
    npc         = BAU_900_Konrad;
    nr          = 1;
    condition   = DIA_Konrad_Hallo_Condition;
    information = DIA_Konrad_Hallo_Info;
    permanent   = FALSE;                // tylko raz
    important   = TRUE;                 // NPC mówi pierwszy
};

func int DIA_Konrad_Hallo_Condition ()
{
    // Pokaż tylko jeśli quest nie został jeszcze rozpoczęty
    if (MIS_Konrad_ZnajdzTopor == 0)
    {
        return TRUE;
    };
};

func void DIA_Konrad_Hallo_Info ()
{
    // self = NPC (Konrad), other = gracz
    AI_Output (self, other, "DIA_Konrad_Hallo_01_01"); //Hej, ty tam! Masz chwilę?
    AI_Output (other, self, "DIA_Konrad_Hallo_15_01"); //Czego chcesz?
    AI_Output (self, other, "DIA_Konrad_Hallo_01_02"); //Zgubiłem swój topór gdzieś w lesie. Pomożesz mi go znaleźć?
};
```

:::tip
**Konwencja nazewnictwa audio:** `DIA_Konrad_Hallo_01_01` — `01` = numer głosu NPC, `01` = numer linii. `15` w linii gracza oznacza głos bohatera. Komentarz `//` po `AI_Output` **musi** być w tej samej linii — parser Daedalusa traktuje go jako tekst napisów dialogowych.
:::

## Krok 5: Dialog — przyjęcie zadania

```daedalus
instance DIA_Konrad_Topor (C_INFO)
{
    npc         = BAU_900_Konrad;
    nr          = 5;
    condition   = DIA_Konrad_Topor_Condition;
    information = DIA_Konrad_Topor_Info;
    permanent   = FALSE;
    description = "Pomogę ci znaleźć topór.";
};

func int DIA_Konrad_Topor_Condition ()
{
    if (MIS_Konrad_ZnajdzTopor == 0)
    {
        return TRUE;
    };
};

func void DIA_Konrad_Topor_Info ()
{
    AI_Output (other, self, "DIA_Konrad_Topor_15_01"); //Dobra, poszukam twojego topora.
    AI_Output (self, other, "DIA_Konrad_Topor_01_01"); //Dzięki! Ostatni raz widziałem go koło starej jaskini na północy.

    // === ROZPOCZNIJ QUEST ===
    MIS_Konrad_ZnajdzTopor = LOG_RUNNING;

    // Utwórz temat w dzienniku
    Log_CreateTopic (TOPIC_Konrad_ZnajdzTopor, LOG_MISSION);
    Log_SetTopicStatus (TOPIC_Konrad_ZnajdzTopor, LOG_RUNNING);
    B_LogEntry (TOPIC_Konrad_ZnajdzTopor,
        "Konrad zgubił swój topór w lesie koło starej jaskini na północy. Powinienem go poszukać."
    );

    AI_StopProcessInfos (self);
};
```

### Kluczowe funkcje dziennika:

| Funkcja | Opis |
|---------|------|
| `Log_CreateTopic(topic, LOG_MISSION)` | Tworzy wpis w dzienniku |
| `Log_SetTopicStatus(topic, status)` | Ustawia status: `LOG_RUNNING` / `LOG_SUCCESS` / `LOG_FAILED` |
| `B_LogEntry(topic, tekst)` | Dodaje notatkę do istniejącego wpisu |

## Krok 6: Dialog — oddanie przedmiotu i nagroda

```daedalus
instance DIA_Konrad_Topor_Oddaj (C_INFO)
{
    npc         = BAU_900_Konrad;
    nr          = 10;
    condition   = DIA_Konrad_Topor_Oddaj_Condition;
    information = DIA_Konrad_Topor_Oddaj_Info;
    permanent   = FALSE;
    description = "Mam twój topór.";
};

func int DIA_Konrad_Topor_Oddaj_Condition ()
{
    // Pokaż tylko gdy quest jest aktywny I gracz ma topór
    if (MIS_Konrad_ZnajdzTopor == LOG_RUNNING)
    && (Npc_HasItems (other, ItMi_Topor_Konrada) >= 1)
    {
        return TRUE;
    };
};

func void DIA_Konrad_Topor_Oddaj_Info ()
{
    AI_Output (other, self, "DIA_Konrad_Topor_Oddaj_15_01"); //Mam twój topór. Znalazłem go koło jaskini.

    // Gracz oddaje topór
    B_GiveInvItems (other, self, ItMi_Topor_Konrada, 1);

    AI_Output (self, other, "DIA_Konrad_Topor_Oddaj_01_01"); //Świetnie! Weź to złoto jako podziękowanie.

    // === NAGRODA ===
    CreateInvItems (self, ItMi_Gold, 150);
    B_GiveInvItems (self, other, ItMi_Gold, 150);      // 150 złota
    B_GivePlayerXP (100);                               // 100 pkt doświadczenia

    // === ZAKOŃCZ QUEST ===
    MIS_Konrad_ZnajdzTopor = LOG_SUCCESS;
    B_LogEntry (TOPIC_Konrad_ZnajdzTopor,
        "Odnalazłem topór Konrada i oddałem mu go. W zamian dostałem 150 sztuk złota."
    );

    AI_StopProcessInfos (self);
};
```

## Krok 7: Umieszczenie przedmiotu w świecie

W pliku `Startup.d` (funkcja startowa świata) umieść topór w lokacji:

```daedalus
func void Startup_NewWorld ()
{
    // ... inne elementy ...

    // Umieść topór Konrada przy waypoincie jaskini
    Wld_InsertItem (ItMi_Topor_Konrada, "NW_CAVE_NORTH_01");
};
```

## Pełna struktura plików

Kompletny quest wymaga tych plików:

```
Scripts/Content/
├── _intern/Constants.d          ← zmienna MIS_Konrad_ZnajdzTopor
├── Story/Log_Entries/
│   └── LOG_Constants.d          ← stała TOPIC_Konrad_ZnajdzTopor
├── Items/
│   └── MissionItems.d           ← ItMi_Topor_Konrada
├── Story/NPC/
│   └── BAU_900_Konrad.d         ← definicja NPC
├── Story/Dialoge/
│   └── DIA_BAU_900_Konrad.d     ← wszystkie dialogi
└── Story/Startup.d              ← Wld_InsertNpc + Wld_InsertItem
```

## Podsumowanie

Kompletny quest w Gothic wymaga:
1. **Zmiennej stanu** śledzącej postęp (0 → `LOG_RUNNING` → `LOG_SUCCESS`)
2. **Przedmiotu misyjnego** z flagą `ITEM_MISSION`
3. **Dialogów** z warunkami opartymi o stan questa i posiadane przedmioty
4. **Wpisów w dzienniku** informujących gracza o postępie
5. **Nagrody** (złoto, XP, przedmioty)
6. **Rejestracji** wszystkich plików w `Gothic.src` w odpowiedniej kolejności
