---
sidebar_position: 1
title: "SpacerNET - Basics"
description: "Gothic modding terminology and basic SpacerNET interface guide."
---

# SpacerNET - Basics

## Gothic Modding Terminology

When working with SpacerNET, you'll encounter various terms specific to Gothic modding:

### World and Location Types

- **ZEN** - Gothic world file format containing geometry and objects of a location
- **Indoor location** - Location without sky (e.g., Old Mine, Temple of the Sleeper)
- **Outdoor location** - Location with open sky (e.g., Khorinis, Valley of Mines)
- **Portals** - Closed geometry volumes (caves, houses) that optimize rendering by not drawing the outside world when inside

### Objects and Visuals

- **Vob** - Any object inside the game or SpacerNET (barrels, grass, doors, stairs, movers, NPCs, items)
- **Visual** - The 3D model of a vob (usually .3DS format, .MDS/.ASC for animated objects)
- **Decal** - Flat texture object (.TGA) used for effects like cobwebs or stains
- **VobTree** - Group of vobs nested within a parent vob, can be saved as separate .ZEN files
- **Bbox** - Bounding box around vobs (red frame) used for collision detection and trigger zones

### Interactive Objects

- **Trigger** - Vob that reacts to the hero or other actions, or is activated by scripts
- **Mover** - Special vob that can move at certain moments (secret walls, platforms)
- **MobInter** - Interactive vob that the hero can use (beds, alchemy tables, book stands)

### Navigation and Positioning

- **WP (Waypoint)** - Navigation points connected in a network for NPC pathfinding and routines
- **FP (Freepoint)** - Additional spawn points for monsters and auxiliary objects near waypoints

### Effects and Sounds

- **PFX (Particles)** - Visual effects for fire, smoke, magic, fog (stored in ParticlesFX.dat)
- **VFX (VisualFX)** - Special objects controlling PFX behavior (spell effects, stored in VisualFX.dat)
- **SFX** - Sound effect objects and their properties (stored in SFX.dat)

:::tip Learning More
For detailed information about indoor/outdoor locations and portals, see: [Indoor/Outdoor Guide](https://worldofplayers.ru/threads/37707/) (Russian)
:::

## First Launch and Interface Setup

After launching SpacerNET for the first time, you'll notice windows are scattered randomly across your screen. Don't worry - window positions are saved when you close SpacerNET normally (but not if you force-close the process).

### Main Interface Elements

- **Top Menu Bar**: Contains all main SpacerNET functions
- **View Menu**: Show/Hide toggles for Vobs, Waynet, and Help vobs
- **Toolbar Icons**: Quick access versions of menu functions

### Window Layout Options

Access these in **View → Positions of windows**:

- **Reset**: Return all windows to default positions
- **Use windows presets #1**: Optimized layout for FullHD (1920×1080)
- **Use windows presets #2**: Optimized layout for QuadHD (2560×1440)

:::tip Window Management
You can freely drag and resize windows to create your own custom layout. Your arrangement will be saved automatically.
:::

### Interface Customization

**Font Settings** (View → Font settings):

- Adjust font size for all windows
- Choose custom fonts
- Reset to default settings

**Icon Scaling** (View → Change icons scale):

- Scale toolbar icons for high-resolution displays
- Adjust from 0.5x to 2.0x scale
- Reset to default (1.0x)

**Language**: Switch between available interface languages

## Camera and Display Settings

Configure camera behavior in **Settings → Camera**.

### Information Display

Press **I** key to toggle on-screen information display (customizable in key settings):

1. **FPS** - Frames per second counter
2. **Triangle count** - Polygons being rendered (DX7 only, shows 0 on DX11)
3. **Camera coordinates** - Current camera position
4. **Vob count** - Number of objects in the world
5. **Waypoint count** - Number of navigation points
6. **Portal info** - Current portal information (if inside one)
7. **Distance to selected vob** - Distance from camera to selected object

### Camera Control Settings

- **Movement speed**: How fast camera moves through the world
- **Rotation speed**: Camera turning speed
- **Rotation smoothing**: Smooth camera rotation transitions

### Rendering Options (DX7 only)

- **World mesh rendering**: Adjust world geometry display
- **Vob rendering**: Control object rendering quality

### Additional Options

- **Preview model rotation speed**: Speed of model rotation in preview windows
- **Hide windows when moving camera**: Auto-hide windows during camera movement (right-click drag)
- **Limit FPS**: Frame rate cap (requires SpacerNET restart)

## Vob Settings

Access vob-specific options in **Settings → Vobs**.

### Movement and Rotation

- **Vob movement speed**: Speed when moving objects with gizmo tools
- **Vob rotation speed**: Speed when rotating objects

### Vob Placement Settings

1. **Insert vob at same height as base vob**: Copies maintain original height
2. **Rotate vob randomly around vertical axis**: Adds random rotation for variety
3. **Use hierarchy when copying**: Include all child objects when copying
4. **Enable Move tool when selecting vob**: Auto-activate move tool on selection
5. **Ground highlighting under vob**: Visual indicator showing surface beneath objects

### Waypoint/Freepoint Orientation

Configure how navigation points orient when placed:

- **No orientation**
- **Away from camera**
- **Towards camera**
- **Random around vertical axis**

## Miscellaneous Settings

Important workflow options in **Settings → Misc**.

### File Management

1. **Add date/time to ZEN filename when saving**: Automatic version tracking
2. **Confirm closing SpacerNET if ZEN is loaded**: Prevent accidental closure
3. **Show full file path in title bar**: Display complete file path

### Auto-positioning and Compilation

4. **Set camera to VOB_SPACER_CAMERA_START after loading**: Auto-navigate to designated start position
5. **Auto-compile world and light after mesh/vob merge**: Streamlined workflow
6. **Auto-compile after loading uncompiled ZEN**: Automatic processing

### World Optimization

7. **Clear visual names for zCVobLevelCompo**: Optimize if world isn't split into parts
8. **Remove all zCVobLevelCompo from world**: Complete removal (irreversible after save)
9. **Ask about polygon sorting for large worlds**: Performance option for 200k+ polygon worlds
10. **Only allow Latin symbols in input**: Recommended for compatibility

:::warning Polygon Sorting
For final release worlds, always enable polygon sorting. Only skip it during development to speed up saves.
:::

## Keyboard Shortcuts

Customize controls in **Settings → Keys**.

### Key Binding Features

- **Custom combinations**: Support for complex shortcuts like Ctrl+Alt+P
- **Right Alt limitation**: Right Alt key not supported
- **Reset option**: Restore all defaults
- **Real-time assignment**: Click any setting and press desired key combination

:::tip Productivity Tip
In many tables and lists, you can copy selected items using the middle mouse button.
:::

## World Menu Functions

Essential world management tools in the **World** menu.

### Light Compilation

**World → Compile light**:

- Compiles lighting for your location
- **Quality settings**: Low quality is usually sufficient and saves file size
- Required when working with lighting (covered in lighting tutorials)

### World Compilation

**World → Compile world**:

- Compiles world after loading mesh and vobs
- **Outdoor**: Open sky locations (Khorinis, Valley of Mines)
- **Indoor**: Enclosed locations without sky (Old Mine, Temples)

### Camera and Time Controls

**World → Camera**:

- Jump camera to specific coordinates
- Quick navigation to zero point

**World → Day time**:

- Set in-game time of day
- **Time freeze**: Stop time progression
- **Specific time**: Enter exact time (e.g., "06 00" for 6 AM)

### Testing and Analysis

**World → Play the hero** (or F5):

- Test your world as the player character
- Limited interaction (no item pickup/use)
- **F1**: Fast flight mode
- **ESC**: Exit hero mode

**World → Analyze waynet**:

- Check navigation network for errors
- Reports connectivity issues

**World → Special functions → Create a list**:

- Generate HTML report of all vobs and visuals
- Identify missing textures (highlighted in red)
- Open report in web browser for review

### Render Modes (DX7 only)

**World → Render mode**:

- Switch between different rendering modes
- Useful for debugging visual issues

## Advanced Configuration

### spacer_net.ini Settings

Advanced users can modify `spacer_net.ini` (when SpacerNET is closed):

| Setting                   | Default | Section    | Description                                                    |
| ------------------------- | ------- | ---------- | -------------------------------------------------------------- |
| `showVisualInfoX`         | 200     | [SPACER]   | X position of vob visual info display                          |
| `showVisualInfoY`         | 2000    | [SPACER]   | Y position of vob visual info display                          |
| `rotModStart`             | 2       | [CONTROLS] | Default rotation mode (0=World, 1=Local, 2=Camera)             |
| `safeOneMode`             | 0       | [SPACER]   | Preserve "One Mode" setting across restarts                    |
| `bShowMobInterSlots`      | 1       | [SPACER]   | Show MobInter slots visually when selected                     |
| `selectVobTab`            | 0       | [SPACER]   | Auto-select appropriate vob tab by type                        |
| `canCompileWorldAgain`    | 0       | [SPACER]   | Allow recompilation of already compiled worlds                 |
| `bAddPlayerForPlugins`    | 0       | [SPACER]   | Initialize player for plugin compatibility (may cause crashes) |
| `bBlockPlayerUseMobInter` | 1       | [SPACER]   | Block player interaction with MobInter in game mode            |
| `bSortMerge`              | 1       | [SPACER]   | Improve polygon sorting during world save                      |
| `bShowBboxModel`          | 1       | [SPACER]   | Show bounding boxes as transparent models, not just lines      |

:::warning Advanced Settings
Only modify INI settings if you understand their purpose. Incorrect values may cause instability.
:::

## Resources

- [SpacerNET Forum Discussion](https://worldofplayers.ru/threads/43464/) (Russian)
- [GothicModKit Downloads](https://www.worldofgothic.de/)
- [Legacy Alt Renderer](https://github.com/SaiyansKing/Gothic-LegacyAltRenderer/releases/) (for graphics issues)

:::tip Need Help?
For additional support and troubleshooting, visit the [SpacerNET forum thread](https://worldofplayers.ru/threads/43464/) where the community actively helps with installation and usage questions.
:::
