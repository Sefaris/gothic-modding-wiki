---
sidebar_position: 3
title: 32-bit Texture Support
description: How to use high-quality 32-bit textures in Gothic.
---

# 32-bit Texture Support

By default, ZenGin supports compressed DXT1 and DXT3 textures well, but often struggles with high-quality raw formats, leading to visual artifacts or lack of proper alpha channel support in some contexts.

To use high-quality textures with full alpha channels (gradients) without artifacts, a patch is often required.

## The zSurface32 Patch

The **zSurface32 patch** (often included in SystemPack/Union or available as a separate plugin) improves texture quality by adding proper support for:
- `RGBA8888`
- `BGRA8888`
- `ARGB8888`
- `ABGR8888`

It allows for smooth gradients and high-quality UI elements that DXT compression would otherwise distort with banding artifacts.

## Why use 32-bit textures?

1.  **Quality**: No compression artifacts (blockiness).
2.  **Alpha Channel**: Smooth transitions in transparency (gradients), which DXT3 handles poorly (4-bit alpha means only 16 levels of transparency) and DXT5 handles better but still with compression. Raw 32-bit allows 256 levels of transparency with no loss.

**Drawback**: File size. A 32-bit texture is significantly larger than a DXT compressed one (often 4x-8x larger). Use them primarily for UI elements or hero skins/faces where quality is paramount.

## Compilation

ZenGin does not natively compile textures to these formats easily from TGA without specific tools or flags often failing.

**Recommended Workflow:**
1.  Use **[zTEXiPy](/docs/tools/ztexipy)**.
2.  Open your texture.

3.  Choose **Save TEX as...**.
4.  Uncheck **Generate Mipmaps** (if it's for UI).
5.  Set Colorspace to **BGRA8888** (zEnum: 3).
6.  Save.

:::warning Performance
It is advised to use `BGRA8888` for performance reasons, as other color spaces might require additional conversion at runtime by the engine.
:::
