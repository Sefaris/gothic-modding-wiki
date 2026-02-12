---
sidebar_position: 4
title: Multitekstury
description: Wykorzystanie sekwencji tekstur do animacji i wariantów skóry ciała.
---

# Multitekstury

Multitekstury w ZenGin są używane do tworzenia animowanych tekstur (takich jak woda czy ogień) lub do obsługi wariantów siatek (takich jak skóry twarzy/ciała) bez konieczności tworzenia osobnych plików modeli.

## Konwencja nazewnictwa

Silnik rozpoznaje multitekstury na podstawie określonych wzorców w nazwie pliku.

Format: `NAZWA_[Litera0][Numer0]_..[LiteraN][NumerN].TGA`

### Animacja (A)

Używane do animowanych tekstur.
- **Klucz**: `A` (Animacja)
- **Konwencja**: `TEXTURE_A0.TGA`, `TEXTURE_A1.TGA`, ... `TEXTURE_A10.TGA`.
- **Użycie**: Silnik cyklicznie wyświetla te tekstury, tworząc animację. Powszechne dla wody, ognia, wodospadów, efektów magicznych.

### Warianty (V i C)

Używane dla tekstur ciała i głowy, aby umożliwić różne skóry na tym samym modelu (meshu).

- **V (Variation)**: Często używane dla wariantu skóry (np. typy twarzy).
- **C (Color/Class)**: Często używane dla odcienia skóry (np. blady, ciemny).

**Przykład**: `HUM_BODY_NAKED_V2_C3.TGA` opisuje teksturę ciała dla wariantu 2 i odcienia skóry 3.

### Użycie w skryptach

W skryptach Daedalus definiujesz, który wariant tekstury ma być użyty na NPC.
Na przykład funkcja `Mdl_SetVisualBody` pozwala przekazać argumenty wersji i koloru, które odpowiadają tym liczbom `V` i `C` w nazwach plików tekstur.

```daedalus
// Mdl_SetVisualBody (entity, bodyMesh, bodyTexVar, skinColor, headMesh, headTexVar, teethTexVar, armorInstance);
Mdl_SetVisualBody (self, "hum_body_Naked0", 2, 3, "Hum_Head_Fighter", 1, 0, -1);
```

W tym przykładzie:
- `bodyTexVar` (2) szuka `_V2` w nazwie tekstury ciała.
- `skinColor` (3) szuka `_C3` w nazwie tekstury ciała.

:::warning Ważne
Te przyrostki (`_V`, `_C`, `_A`) są zarezerwowane. Nie używaj ich na końcu nazw tekstur, chyba że zamierzasz stworzyć multiteksturę. Użycie `MojaTekstura_V1.tga` dla statycznej pojedynczej tekstury może spowodować, że silnik będzie szukał `MojaTekstura_V0.tga` i spowoduje błąd, jeśli jej nie znajdzie.
:::
