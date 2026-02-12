---
sidebar_position: 4
title: Multitextures
description: Using texture sequences for animations and body skin variations.
---

# Multitextures

Multitextures in ZenGin are used to create animated textures (like water or fire) or to handle variations of meshes (like face/body skins) without needing separate mesh files.

## Naming Convention

The engine recognizes multitextures based on specific naming patterns in the filename.

Format: `NAME_[Letter0][Number0]_..[LetterN][NumberN].TGA`

### Animation (A)

Used for animated textures.
- **Key**: `A` (Animation)
- **Convention**: `TEXTURE_A0.TGA`, `TEXTURE_A1.TGA`, ... `TEXTURE_A10.TGA`.
- **Usage**: The engine cycles through these textures to create an animation. Common for water, fire, waterfalls, magic effects.

### Variations (V and C)

Used for body and head textures to allow different skins on the same mesh.

- **V (Variation)**: Often used for skin variation (e.g., face types).
- **C (Color/Class)**: Often used for skin tone (e.g., pale, dark).

**Example**: `HUM_BODY_NAKED_V2_C3.TGA` describes a body texture for variant 2 and skin tone 3.

### Script usage

In Daedalus scripts, you define which texture variation to use on an NPC.
For example, `Mdl_SetVisualBody` allows you to pass version and color arguments which correspond to these `V` and `C` numbers in the texture filenames.

```daedalus
// Mdl_SetVisualBody (entity, bodyMesh, bodyTexVar, skinColor, headMesh, headTexVar, teethTexVar, armorInstance);
Mdl_SetVisualBody (self, "hum_body_Naked0", 2, 3, "Hum_Head_Fighter", 1, 0, -1);
```

In this example:
- `bodyTexVar` (2) looks for `_V2` in the body texture name.
- `skinColor` (3) looks for `_C3` in the body texture name.

:::warning Important
These suffixes (`_V`, `_C`, `_A`) are reserved. Do not use them at the end of your texture names unless you intend to create a multitexture. Using `MyTexture_V1.tga` for a static single texture can cause the engine to search for `MyTexture_V0.tga` and crash or error if not found.
:::
