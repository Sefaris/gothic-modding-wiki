---
sidebar_position: 3
title: "SpacerNET - Additional Tips & Techniques"
description: "Additional tips, techniques, and workflows for advanced SpacerNET usage."
---

# Additional Tips & Techniques

This guide covers additional techniques, best practices, and specialized workflows for SpacerNET.

## Best Practices for Location Creation

Follow these proven guidelines to avoid common issues:

### 1. Walkable Surfaces as Mesh Geometry

**Always include walkable surfaces in the world mesh**, not as separate vobs:

- Platforms, scaffolding, bridges, stairs
- Mine supports and constructions
- Any surface the player character walks on

**Why:** Prevents player from falling through geometry (though rare). Using mesh geometry provides reliable collision detection.

Example: Mine scaffolding should be part of the location mesh, not individual vobs.

:::tip
If players report "falling through floor" bugs, convert the affected area from vobs to mesh geometry.
:::

### 2. Large Trees and DX11 Shadow Rendering

**Place at least 50% of large trees as mesh geometry** (not vobs):

**The Problem with Vob Trees:**

- DirectX 11 only renders shadows for vobs in camera view
- Trees behind camera don't cast shadows
- Shadows flicker when camera rotates
- Creates unpleasant visual artifacts

**The Solution:**

- Transfer large trees to world mesh
- DX11 renders mesh shadows correctly regardless of camera position
- Shadows remain stable during camera rotation

**Which trees to convert:**

- Large trees that cast prominent shadows
- Trees near frequently visited areas
- Trees along main paths

:::info
Small bushes and grass can remain as vobs - use this technique for large, shadow-casting vegetation only.
:::

### 3. Portal Placement is Mandatory

**Always place portals in houses, caves, and indoor spaces:**

**Why Portals Matter:**

- DirectX 7 requires portals for static lighting to work
- Without portals, interiors appear completely dark on DX7
- Players without DX11 will experience unplayable darkness

**Portal Guidelines:**

- Every building entrance needs a portal
- Cave entrances require portals
- Underground areas must have proper portal systems
- Test on DX7 to verify lighting works correctly

:::warning
Even if you develop with DX11, always test final locations on DX7 to ensure portals work correctly for all players.
:::

---

## Required Vobs for New Locations

Every Gothic location **must** contain these 3 vobs:

### 1. Default Music Zone (`oCZoneMusicDefault`)

Sets background music for the entire world.

**Configuration:**

- See [Music Zones tutorial](./spacer-advanced-world-editing#music-zones-oczonemusic) for setup details
- Choose appropriate music for location atmosphere
- No BBOX sizing required - applies globally

### 2. Default Vob Render Distance (`zCZoneVobFarPlaceDefault`)

Controls how far vobs are visible before being culled.

**Properties:**

- **vobFarPlaneZ**: Render distance in units
- **Recommended values:**
  - Open locations: `7500` - `11000`
  - Closed interiors: `3000` - `5000`
  - Caves/dungeons: `2000` - `4000`

**Configuration:**

1. Insert vob type: `zCZoneVobFarPlaceDefault`
2. Open properties
3. Set `vobFarPlaneZ` value
4. Click Apply

### 3. Default Fog Distance (`zCZoneZFogDefault`)

Controls world fog rendering distance and atmosphere.

**Properties:**

- **fogRangeCenter**: Distance where fog starts in units
- **Recommended values:**
  - Open locations: `10000` - `12000`
  - Forest areas: `6000` - `8000`
  - Caves/dungeons: `2000` - `4000`

**Configuration:**

1. Insert vob type: `zCZoneZFogDefault`
2. Open properties
3. Set `fogRangeCenter` value
4. Configure fog color if desired
5. Click Apply

### Summary

**All three vobs together:**

![Required vobs example - all three types visible in vob list]

:::danger
Locations without these vobs may have rendering glitches, performance issues, or crash the game. Always include all three.
:::

---

## Using DirectX 11 Renderer

SpacerNET supports the DirectX 11 renderer for improved visual quality and performance during world editing.

### Advantages

1. **Stable FPS** - Consistent frame rate regardless of polygon count or location
2. **V-Sync Support** - Better frame limiting and synchronization
3. **Grass Visibility** - Floating grass (not touching ground) is clearly visible for easier cleanup
4. **Extended View Distance** - Draw distance barely impacts FPS with modern GPUs
5. **Visual Enhancements** - Brightness/contrast/HDR mode adjustments

### Disadvantages

1. **Cannot Compile** - DX11 mode cannot compile worlds or lighting
2. **Portal Ignoring** - DX11 doesn't show broken portals; always test on DX7
3. **Vob Placement Only** - Suitable only for placing/editing vobs on existing worlds

### Installation

1. **Download DirectX 11 Renderer**
   - Visit: [GD3D11 Releases](https://github.com/SaiyansKing/GD3D11/releases)
   - Required version: [v17.8-rev'SK6](https://github.com/SaiyansKing/GD3D11/releases/tag/v17.8-rev%27SK6) or newer
   - Download the release archive

2. **Install to Gothic System Folder**
   - Extract all files to `<Gothic>/System/` folder
   - Main file: `ddraw.dll` - this activates DX11 renderer

3. **Toggle DX11 On/Off**
   - **To disable DX11:** Rename `ddraw.dll` to `ddraw.dll.bak` (or any other extension)
   - **To enable DX11:** Rename back to `ddraw.dll`

### Workflow Recommendations

**Use DX11 for:**

- Placing vobs on existing compiled worlds
- Visual quality checking
- Screenshot/video capture
- Large outdoor scene vob placement

**Switch to DX7 for:**

- Loading mesh files
- Compiling worlds
- Compiling lighting
- Portal testing and validation
- Final quality assurance

### Batch File Toggle System

Create two batch files for easy DX version switching:

**dx11_on.bat:**

```batch
@echo off
if exist ddraw.dll.bak (
    ren ddraw.dll.bak ddraw.dll
    echo DX11 enabled
) else (
    echo DX11 already enabled
)
pause
```

**dx11_off.bat:**

```batch
@echo off
if exist ddraw.dll (
    ren ddraw.dll ddraw.dll.bak
    echo DX11 disabled - using DX7
) else (
    echo DX11 already disabled
)
pause
```

Place both files in `<Gothic>/System/` folder. Run the appropriate batch file before launching SpacerNET.

:::tip
Create desktop shortcuts to these batch files for quick switching during development sessions.
:::

---

## Extracting Mesh from ZEN File

Need to edit world geometry but don't have the original Blender/3ds Max project? Extract the mesh directly from the compiled ZEN file.

### Extraction Process

1. **Open Location in SpacerNET**
   - File → Load World
   - Select the `.zen` file you want to extract from

2. **Export Mesh**
   - File → Save MESH
   - Choose filename (e.g., `EXTRACTED_WORLD.MSH`)
   - Save as `.msh` format

3. **Import to Blender**
   - Open Blender (empty project)
   - File → Import → MESH
   - Select saved `.msh` file
   - Mesh appears in Blender scene

### Working with Extracted Meshes

**Polygon Limit Handling:**

- Gothic 3DS format limit: **65,535 polygons per object**
- If world exceeds this, manually split into multiple objects in Blender
- Use Edit Mode → Select sections → Separate (P key) → Selection

**Re-exporting to SpacerNET:**

1. Split large meshes into smaller than 65k polygon chunks
2. Export each as separate `.3ds` file
3. Load all `.3ds` files in SpacerNET as world mesh

### Potential Issues

**Portal Damage:**

- Large worlds may have broken portals after extraction
- Always check portal integrity after re-import
- Manually repair damaged portals in 3D editor

**Material Errors:**

- Some locations import with incorrect materials
- Larger worlds = higher error probability
- Manually verify and fix materials in Blender

**Import Errors:**

- Complex geometry may not import perfectly
- Check for missing polygons, inverted normals
- Compare extracted mesh to original world visually

:::warning
Always keep original source files (Blender/Max projects). Extraction is a fallback method - editing extracted meshes is less reliable than working with original sources.
:::

:::danger
Test extracted and re-imported worlds thoroughly. Portal systems and collision may break during the extraction/re-import cycle.
:::

---

## UV Unwrap Error Detection

SpacerNET v1.29+ includes tools for detecting UV mapping problems in world meshes.

### Activating UV Problem Detection

1. **Enable UV Mode**
   - Click **U icon** in toolbar
   - Separate UV window opens

2. **Enter Polygon Selection**
   - Click **pipette icon** to enter polygon selection mode
   - Allows individual polygon inspection

3. **Find Problem Polygons**
   - In UV window, click **"Find UV problems"** button
   - Problem polygons draw with **red outlines**

### Understanding Results

:::info Important
This tool shows **potential** problems only. Red outlines indicate suspicious UV mapping, but not all flagged polygons are actually broken.
:::

**Check Each Flagged Polygon:**

- Visually inspect in editor
- Look for stretched textures
- Check for warped patterns
- Compare to nearby polygons

### Configuration Options

**Distortion Angle** (default: 35°)

- Lower value = more polygons flagged (stricter)
- Higher value = fewer polygons flagged (more lenient)
- Adjust based on location complexity and quality standards

**Render Distance**

- Controls how far problem polygons are highlighted
- Reduce for performance in large worlds
- Increase for complete visibility

**Other Settings:**

- All options labeled in UV window
- Adjustable in real-time
- Works only after loading ZEN file

### Workflow Tips

1. **Run Check After Import**
   - First action after extracting mesh from ZEN
   - Identifies issues before editing begins

2. **Use Conservative Settings**
   - Start with default 35° distortion angle
   - Adjust only if getting too many false positives

3. **Fix in 3D Editor**
   - Note polygon locations
   - Switch to Blender/Max
   - Re-unwrap problem areas
   - Re-export and verify

:::tip
Run UV check before final world compilation to catch texture issues early.
:::

---

## Creating Location Map in Blender

Generate in-game maps for your custom locations using Blender's rendering system.

### Requirements

- Blender 4.0 or newer
- Completed world mesh
- Basic Blender knowledge

### Step-by-Step Process

#### 1. Render Engine Setup

Set render engine to **Cycles**:

- Top menu → Render Properties
- Render Engine dropdown → **Cycles**

#### 2. Resolution Configuration

**Critical: Use 4:3 aspect ratio** to prevent stretching in Gothic:

- Render Properties → Output
- **Resolution:**
  - Width: `3000` px (recommended)
  - Height: `2250` px (maintains 4:3 ratio)
- Can use other resolutions if 4:3 ratio maintained

#### 3. Lighting Setup

Add **Sun light source**:

1. Add → Light → Sun
2. **Strength:** `3.0` (adjust for brightness preference)
3. **Rotation:** Position for desired shadow direction
   - Use `90°` rotation for shadowless rendering
   - Angle shadows for dramatic effect
4. Position doesn't matter - Sun is directional

#### 4. Camera Configuration

**Add and configure orthographic camera:**

1. **Add Camera**
   - Add → Camera
   - Position above world center

2. **Zero Rotation** (critical!)
   - Transform properties (press N)
   - Rotation X, Y, Z: all `0°`

3. **Camera Type**
   - Camera Properties → Type: **Orthographic**

4. **Orthographic Scale**
   - Adjust until camera frame encompasses entire location
   - Scale value determines map coverage area
   - Frame should fit entire playable area

5. **Camera Height**
   - Position high above location
   - Exact height doesn't matter (orthographic projection)
   - Ensure nothing clips through camera

#### 5. Render Map

**Execute render:**

1. Press **F12** (or Render → Render Image)
2. Wait for render completion
3. **Save image:**
   - Image → Save As
   - **TGA format** for Gothic
   - **PNG format** if editing in Photoshop first

#### 6. Calculate Coordinates

Use online coordinate calculation tool:

- Visit: [Coordinate Calculator](https://onecompiler.com/html/4494hx3m7)
- Click **Run** button (right side)

**Input values:**

- **Scale:** Orthographic Scale from camera
- **X:** Camera X position in Blender (Item properties, press N)
- **Y:** Camera Y position in Blender

**Output:** Four coordinate values for script

#### 7. Implement in Daedalus Script

Add map to game with script:

```daedalus
func void SHOW_MY_LOCATION_MAP() {
    var int Document;

    Document = Doc_CreateMap();
    Doc_SetPages(Document, 1);
    Doc_SetPage(Document, 0, "MAP_MYLOCATION.tga", TRUE); // Your TGA filename
    Doc_SetLevel(Document, "WORLD\\MYLOCATION.zen");      // Path to ZEN file
    Doc_SetLevelCoords(Document, -6262, 49048, 113738, -40952); // Calculated coordinates
    Doc_Show(Document);
};
```

**Coordinate format:** `leftX, topY, rightX, bottomY`

#### 8. Test and Refine

**First compilation:**

- TGA texture compiles on first load (2-5 seconds)
- Check player cursor position
- Verify map boundaries

**Enhancement workflow:**

1. Test compiled map in-game
2. If correct, enhance TGA in image editor:
   - Add alpha channel for torn edges
   - Color correction
   - Artistic touches
   - AI upscaling if desired

**Update texture:**

- Delete compiled `.TEX` file: `Textures\_compiled\MAP_MYLOCATION-C.TEX`
- Replace `MAP_MYLOCATION.TGA` with enhanced version
- Engine recompiles on next load

### Formula Reference

**Coordinate calculation formula:**

```
leftX = camX - (scale / 2)
rightX = camX + (scale / 2)
topY = camY + (scale / 2)
bottomY = camY - (scale / 2)
```

(Handled automatically by online calculator)

:::tip
Save your Blender camera setup. If you update the location later, you can re-render with identical settings for consistent map appearance.
:::

:::info
For multi-level locations (e.g., castle with basement), create separate maps for each level with different camera heights and scales.
:::

---

## Summary

These additional techniques enhance SpacerNET workflows:

- **Best practices** prevent common location bugs
- **Required vobs** ensure proper rendering and atmosphere
- **DirectX 11** improves editing experience with visual enhancements
- **Mesh extraction** enables editing compiled worlds
- **UV detection** identifies texture mapping problems
- **Map creation** generates professional in-game maps

Master these techniques to create polished, professional Gothic locations.
