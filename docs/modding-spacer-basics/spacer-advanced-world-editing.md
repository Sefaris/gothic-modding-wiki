---
sidebar_position: 2
title: "SpacerNET - Advanced World Editing"
description: "Advanced features and tools for professional world editing in SpacerNET."
---

# Advanced World Editing

This guide covers advanced SpacerNET features that streamline professional world editing workflows.

## Display Modes and View Options

SpacerNET provides various display modes accessible through the top menu bar:

### Display Mode Toggles

| Icon Position | Function            | Description                             |
| ------------- | ------------------- | --------------------------------------- |
| 1st icon      | Vob Boxes           | Toggle visibility of vob bounding boxes |
| 2nd icon      | Wireframe           | Display world in wireframe mode         |
| 3rd icon      | Lighting            | Toggle lighting display                 |
| 4th icon      | Textures            | Toggle texture display                  |
| 5th icon      | Grid                | Show/hide grid overlay                  |
| 6th icon      | Skybox              | Toggle skybox rendering                 |
| 7th icon      | FPS Counter         | Display frames per second               |
| 8th icon      | Alternative Control | Enable alternative camera controls      |

### Special Display Modes

**Multi-selection Mode**

- Allows selecting multiple vobs simultaneously
- Useful for batch operations
- Toggle via icon or keyboard shortcut

**NoGrass Mode with Custom Hide List**

- Hides grass for better performance
- Supports custom hiding list for specific objects
- Create file: `_work\tools\spacernet_norender.txt`
- Add visual names (one per line) to hide specific models
- Example: Hide all grass models by adding grass visual names

:::tip
Use NoGrass mode when working on terrain or architecture to improve editor performance and visibility.
:::

## Vob Containers and Advanced Selection

### Global Parent System

Vob containers allow organizing world objects hierarchically:

1. **Create Container Vob**
   - Insert vob type: `zCVob` (base vob without visual)
   - Name it descriptively (e.g., `CAVE_OBJECTS`, `TOWN_DECORATIONS`)
   - Use Properties → Set as Global Parent

2. **Add Objects to Container**
   - Select Global Parent checkbox when inserting new vobs
   - All new vobs will automatically be children of the active container
   - Move entire groups by moving the parent vob

3. **Selection Filters**
   - Filter by vob type (lights, sounds, triggers, etc.)
   - Select all children of a container
   - Invert selection for complex operations

:::info
Global Parent system is essential for organizing large locations with hundreds of objects.
:::

## Information Windows

### Info Window (zSPY)

Press **F2** to open the Info Window showing real-time statistics:

- **Performance Metrics**
  - Frame rate (FPS)
  - Frame time in milliseconds
  - Memory usage
  - Polygon count

- **World Statistics**
  - Total vobs in world
  - Selected vobs count
  - Visible vobs count
  - Portals and sectors information

- **Camera Position**
  - Current X, Y, Z coordinates
  - Camera rotation angles
  - Useful for documenting locations

### Vob/Model Info Mode

Press **key 5** to enter info display mode:

- **Hover over any vob** to see:
  - Vob class name
  - Visual/mesh name
  - Number of polygons
  - Texture list
  - Position and rotation
  - Parent vob information

- **Click on vob** to select and open properties
- **ESC** to exit info mode

:::tip
Use Info Mode to quickly identify unnamed vobs or find which texture a specific object uses.
:::

## Container and Chest Management

### Creating Interactive Containers

1. **Insert Container Vob**
   - Vob type: `oCMobContainer`
   - Choose visual (chest, barrel, crate model)
   - Position in world

2. **Configure Properties**
   - **focusName**: Name shown when player looks at it (e.g., "Wooden Chest")
   - **Locked**: Set locking mechanism
     - `locked`: Requires specific key
     - `keyInstance`: Item instance name for key (e.g., `ITKE_CHEST_01`)
   - **Contents**: Add items in comma-separated list
     - Format: `ITEM_INSTANCE_NAME:COUNT`
     - Example: `ITFO_APPLE:3,ITMI_GOLD:50,ITAM_RING_01:1`

3. **Special Settings**
   - **contains**: Total item slots (usually 10-20)
   - **useWithItem**: Required item to open (e.g., crowbar)
   - **onOpen/onClose**: Script function to call

### Locking Mechanisms

- **Simple Lock**: Set `locked="locked"` + `keyInstance="KEY_NAME"`
- **Pickable Lock**: Set lock level (1-100), allows lockpicking
- **Combination Lock**: Requires specific item combination

## Sound and Music System

### Music Zones (oCZoneMusic)

Add background music to specific areas:

1. **Create Music Zone**
   - Vob type: `oCZoneMusic`
   - Disable collision (uncheck CD_DYN)
   - Insert vob

2. **Configure Music**
   - Open Sound/Music window
   - Select music file (e.g., `OWP_DAY_STD`)
   - Music naming convention:
     - `LOCATION_TIME_STATE`
     - `OWP` = Old World
     - `DAY` = Daytime
     - `STD` = Standard (not combat)
     - `FGT` = Fight music

3. **Set Vob Name**
   - Format: `MUSICZONE_TRACKNAME`
   - Example: `MYMUSIC_OWP` will play `OWP_DAY_STD`
   - Click Apply

4. **Define Zone Size**
   - Press **key 6** for BBOX editing mode
   - Resize zone using WASD, Space, X (see BBOX editing section)
   - Music plays only when player is inside this zone

### Default Music (oCZoneMusicDefault)

Set background music for entire world:

1. Create vob type: `oCZoneMusicDefault`
2. Configure music same as oCZoneMusic
3. **No need to set zone size** - applies to entire level
4. Lower priority than specific oCZoneMusic zones

### Music Priority

When music zones overlap:

- Set **priority** value in properties
- Higher number = higher priority
- Default priority = 0
- Use priorities: 0 (default) → 1 (important) → 2 (very important)

:::warning
Always use `_DAY_STD` suffix for world music. `_FGT` music is played automatically during combat.
:::

## Error Checking Window

Press **F3** to open Error Checking window:

### Error Categories

- **Red Errors (Critical)**
  - Waypoints without connections
  - Missing textures
  - Invalid vob references
  - Broken portal connections

- **Yellow Warnings**
  - Optimization suggestions
  - Unusual vob configurations
  - Performance concerns

- **Blue Information**
  - Statistics and counts
  - Informational messages

### Common Errors and Fixes

| Error                | Cause                      | Solution                             |
| -------------------- | -------------------------- | ------------------------------------ |
| "Waypoint isolated"  | FP not connected to waynet | Connect with other waypoints         |
| "Texture not found"  | Missing texture file       | Add texture or replace with existing |
| "Vob without visual" | Empty visual field         | Assign mesh or delete vob            |
| "Portal open"        | Portal mesh has gaps       | Fix portal geometry in 3D editor     |

:::tip
Run error check before compiling world - fixing errors early prevents game crashes.
:::

## Vob Catalog System

Access via **Insert → Vob Catalog** (or keyboard shortcut):

### Catalog Features

1. **Browse Vob Template Library**
   - Pre-configured vobs with common settings
   - Categorized by type (decorations, furniture, nature, etc.)
   - Double-click to insert

2. **Save Custom Templates**
   - Configure vob with all properties
   - Right-click → "Save to Catalog"
   - Name template descriptively
   - Reuse across multiple worlds

3. **Import/Export Catalogs**
   - Share catalogs between projects
   - Backup frequently used configurations
   - Catalog files stored in: `_work\tools\vob_catalog\`

### Popular Catalog Categories

- **Nature**: Trees, rocks, grass patches, bushes
- **Architecture**: Doors, windows, stairs, columns
- **Lighting**: Torch holders, light sources with predefined colors
- **Interactive**: Pre-configured chests, levers, doors
- **Effects**: Particle emitters with common effects

## Polygon Selection and Material Filter

### Polygon Selection Mode

Press **F4** to enter polygon selection mode:

1. **Select Polygons**
   - Click individual polygons
   - Shift+Click for multiple selection
   - Ctrl+Click to deselect

2. **Selection Tools**
   - Select by material
   - Select connected polygons
   - Grow/shrink selection
   - Different materials with different colors

3. **Operations**
   - Assign new material
   - Delete selected polygons (use carefully!)
   - Export selection
   - Modify lightmap resolution

### Material Filter

Filter world display by material type:

1. **Open Material Filter Window**
   - Shows all materials used in world
   - Checkbox next to each material

2. **Filter Options**
   - **Show only**: Display only selected materials
   - **Hide selected**: Hide selected materials
   - **Invert**: Flip visibility

3. **Use Cases**
   - Find all uses of specific texture
   - Hide terrain to see underground structures
   - Isolate architectural elements

:::info
Material filter doesn't delete geometry - it only controls visibility in editor.
:::

## Macros and Automation

Access: **Window → Macros** or **Ctrl+M**

### Macro Commands

Automate repetitive tasks with macro commands:

| Command       | Syntax                        | Description                          |
| ------------- | ----------------------------- | ------------------------------------ |
| RESET         | `RESET`                       | Clear world, return to default state |
| LOAD MESH     | `LOAD MESH filename.3ds`      | Load specific mesh file              |
| LOAD WORLD    | `LOAD WORLD worldname.zen`    | Load world file                      |
| COMPILE WORLD | `COMPILE WORLD worldname.zen` | Compile world with current settings  |
| COMPILE LIGHT | `COMPILE LIGHT worldname.zen` | Recompile only lighting              |
| SAVE MESH     | `SAVE MESH filename.3ds`      | Export as mesh                       |
| SAVE WORLD    | `SAVE WORLD worldname.zen`    | Save world file                      |

### Macro File Format

Macros stored in: `_work\tools\macros_spacernet.txt`

Example macro for automated world compilation:

```
LOAD WORLD myworld.zen
COMPILE LIGHT myworld.zen
COMPILE WORLD myworld.zen
SAVE WORLD myworld.zen
```

### Running Macros

1. Create/edit `macros_spacernet.txt`
2. Open Macros window
3. Click "Execute" to run all commands
4. Monitor progress in console

:::warning
Always backup worlds before running macros - compilation errors can corrupt files.
:::

## BBOX Editing / Zone Sizing

Press **key 6** to enter BBOX editing mode:

### Controls

**Moving Points:**

- **W** - Move forward (Y+)
- **S** - Move backward (Y-)
- **A** - Move left (X-)
- **D** - Move right (X+)
- **Space** - Move up (Z+)
- **X** - Move down (Z-)

**Point Selection:**

- **Key 1** - Select maxs point (far corner)
- **Key 2** - Select mins point (near corner)

**Scale Adjustment (v1.18+):**

- **Key 3** - Increase scale
- **Key 4** - Decrease scale

### BBOX Applications

- **Music Zones** (`oCZoneMusic`) - Define where music plays
- **Sound Zones** (`oCZoneSound`) - Ambient sound areas
- **Trigger Zones** (`zCTrigger`) - Script trigger areas
- **Fog Zones** (`zCZoneZFog`) - Fog effect boundaries
- **Vob Farplane** - View distance zones

### Workflow Example

1. Create zone vob (e.g., `oCZoneMusic`)
2. Press **key 6** to enter BBOX mode
3. Press **key 1** to select maxs (far corner)
4. Use **WASD/Space/X** to position far corner
5. Press **key 2** to select mins (near corner)
6. Position near corner same way
7. **ESC** to exit BBOX mode
8. Visualize zone as colored box overlay

:::tip
Make music zones slightly larger than expected - players should hear music before entering defined area for smooth transitions.
:::

## Object Seeder - Mass Vob Creation

Access: **Window → Object Seeder** or **Insert → Mass Insert**

Perfect for placing many similar objects (grass, rocks, trees, debris):

### Seeder Settings

1. **Minimum Distance Between Vobs**
   - Prevents overlapping objects
   - Measured from vob centers
   - Lower value = denser placement
   - Typical: 50-200 units depending on object size

2. **Vertical Offset**
   - Height above surface to place vob
   - Prevents objects "sinking" into ground
   - Adjust visually per object type
   - Example: Grass = -5, Rocks = 0, Trees = -10

3. **Delete Mode**
   - Switch to removal mode
   - Click to delete placed objects
   - Useful for correcting mistakes

4. **Insert as oCItem**
   - Creates vobs as item type
   - Used for placing collectible items
   - Usually disabled for decorations

5. **Protect Left Mouse Button**
   - Prevents continuous insertion when holding mouse
   - Places only one vob per click
   - Recommended: **enabled** for most cases

6. **Dynamic Collision**
   - Enable physics collision for placed vobs
   - Usually **disabled** for static decorations
   - Enable for physics objects (barrels, crates)

7. **Random Vertical Rotation**
   - Rotate each vob randomly around Z-axis
   - Creates natural variety
   - Recommended: **enabled** for nature objects

8. **Perpendicular to Polygon**
   - Align vob to surface normal
   - Objects follow terrain slope
   - Useful for grass, rocks on hillsides

9. **Insert into Global Parent**
   - Auto-parent all seeded vobs
   - Organize into vob container
   - Recommended for easier management

10. **General Vob Settings**
    - Set visual, material, collision properties
    - Applied to all seeded objects

### Seeder Workflow

1. **Prepare vob template** with desired visual and settings
2. **Open Object Seeder** window
3. **Configure seeding parameters**
   - Set minimum distance (e.g., 100 for grass)
   - Set vertical offset (e.g., -5)
   - Enable random rotation
   - Enable perpendicular to polygon
4. **Click on terrain** to place objects
   - Left-click repeatedly to "paint" objects
   - Move mouse while clicking for coverage
5. **Review and adjust**
   - Use delete mode to remove mistakes
   - Adjust density by changing minimum distance

### Example: Grass Field

Settings for realistic grass coverage:

- Visual: `OW_NATURE_BUSH_BIG_01.3DS`
- Minimum distance: `80`
- Vertical offset: `-5`
- Random rotation: **enabled**
- Perpendicular to polygon: **enabled**
- Protect left mouse: **enabled**
- Insert into global parent: `GRASS_FIELD_01`

Result: Natural-looking grass coverage in seconds!

:::warning
Never close Object Seeder window while in seeding mode - this can cause editor instability. Always disable seeding first.
:::

:::tip
Create multiple global parent containers for different vegetation layers (grass, bushes, trees) to manage LOD and performance separately.
:::

---

## Summary

These advanced features transform SpacerNET from a basic editor into a professional world-building tool:

- **Display modes** optimize workflow and performance
- **Vob containers** organize complex scenes
- **Info windows** provide essential debugging data
- **Music zones** create immersive soundscapes
- **Error checking** prevents game crashes
- **Vob catalog** speeds up common tasks
- **Material filter** isolates specific geometry
- **Macros** automate repetitive operations
- **BBOX editing** defines precise zone boundaries
- **Object seeder** places thousands of objects in minutes

Master these tools to work faster and create more detailed, polished Gothic worlds.
