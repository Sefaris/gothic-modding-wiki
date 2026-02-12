---
sidebar_position: 2
title: Texture Formats
description: Technical details about texture formats supported by ZenGin.
---

# Texture Formats

ZenGin uses the internal `.TEX` container format. Inside this container, texture data can be stored in various pixel formats.

## Pixel Formats

When working with textures in ZenGin, it is recommended to use standard compressed formats if possible for performance.

### DXT Compression

[DXT](https://en.wikipedia.org/wiki/S3_Texture_Compression) (also known as S3TC) is a group of lossy texture compression algorithms.

- **DXT1 (BC1)**: 
    - **Use for**: Opaque textures or textures with simple 1-bit alpha (cutout transparency).
    - **Characteristics**: High compression ratio (4 bits per pixel).
    - **Note**: Best for most world textures like walls, ground, etc.

- **DXT3 (BC2)**:
    - **Use for**: Textures requiring explicit alpha transparency.
    - **Characteristics**: Good for sharp alpha transitions (8 bits per pixel).
    - **Note**: Often used for foliage or grates in Gothic.

- **DXT5 (BC3)**:
    - **Use for**: Textures with smooth alpha gradients.
    - **Characteristics**: Better alpha interpolation than DXT3.
    - **Note**: Supported by the engine but less commonly used in original assets compared to DXT3.

### Palette (P8)

An older format using a 256-color palette.
- **Characteristics**: 8 bits per pixel (index) + palette data.
- **Note**: Less common in modern modding but supported for legacy reasons.

### Raw Formats

Uncompressed formats are supported but take up significantly more memory.

- **RGBA8888 / BGRA8888**: 32-bit color with alpha. High quality but large size.
- **RGB888 / BGR888**: 24-bit color without alpha.
- **RGB565 / ARGB1555 / ARGB4444**: 16-bit color formats.

:::info 32-bit Support
For proper support of high-quality 32-bit textures (RGBA8/BGRA8) in-game without visual artifacts, see the [32-bit Texture Support](./32bit.md) article.
:::
