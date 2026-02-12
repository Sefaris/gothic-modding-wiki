---
sidebar_position: 1
title: Textures
description: General information about textures in ZenGin.
---

# Textures

Textures are pictures that get projected onto 3D models and on a 2D user interface in the game. ZenGin uses its own texture format `.TEX` (zCTexture), which is a container for texture data in one of the available formats (like DXT1, DXT3, DXT5, etc.).

## Basics

All created textures must be located in the `_WORK\DATA\TEXTURES\` directory. The compiled `.TEX` files are saved in the `_COMPILED\` subdirectory.

- **Dimensions**: Textures must have dimensions that are powers of 2 (e.g., 64, 128, 256, 512, 1024, 2048, 4096).
- **Aspect Ratio**: Square textures are preferred for easier mipmap generation, though not strictly required.
- **Max Resolution**: It is recommended not to use textures larger than 4096x4096px.
- **Naming**: Avoid suffixes like `_V0`, `_A1` as these are reserved for [multitextures](./multitextures.md).

:::tip
For tools to work with textures (like converting, viewing), check out [zTEXiPy](/docs/tools/ztexipy).
:::


## Mipmaps

[Mipmaps](https://en.wikipedia.org/wiki/Mipmap) are pre-generated versions of textures at different levels of detail (LOD). They are used to improve rendering performance and reduce aliasing artifacts (shimmering) on objects far away from the camera. 

When the engine converts a texture, it automatically generates mipmaps.

## Engine Compilation

By default, `.tga` files located in the textures directory are automatically converted to `.TEX` files by the engine when:
1. They appear in the game for the first time.
2. The game is started with the `-convertall` parameter.

### Color Depth

Textures are compiled by default with a color depth of 16 bits per pixel (specifically usually DXT1 or similar compression, effectively 4 bits/pixel, but "16-bit" often refers to the source quality target or interim format in old documentation).

To force the engine to convert textures with a specific quality, you can use directory keys or filename suffixes:

- `_16BIT`: Forces 16-bit compilation.
- `_32BIT`: Forces 32-bit compilation (uncompressed or high quality).

Example: `_WORK\DATA\TEXTURES\SKY\NOMIP_16BIT\CLOUDS.TGA`

### Disabling Mipmaps (NOMIP)

If a texture path contains the directory `nomip` (case insensitive), mipmaps will not be generated for that texture.

- **Use case**: UI elements, sky textures, or very small textures where mipmaps causes blurriness or are unnecessary.
- **Example**: `_WORK\DATA\TEXTURES\EFFECTS\NOMIP\LIGHTNING.TGA`
