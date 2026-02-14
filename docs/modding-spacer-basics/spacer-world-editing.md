---
sidebar_position: 1
title: "SpacerNET - World Editing"
description: "Comprehensive guide to editing Gothic worlds using SpacerNET - vobs, waypoints, triggers, lighting and more."
---

# SpacerNET - World Editing

This tutorial covers the practical aspects of world editing in SpacerNET, including working with world objects (vobs), waypoints, triggers, cameras, and lighting.

:::info Prerequisites
Before starting, make sure you have SpacerNET installed and configured. See the [SpacerNET installation guide](../tools/spacer) for setup instructions.
:::

## Opening and Navigating Worlds

All tutorials will use the original game worlds as examples. Lessons on creating worlds from scratch will be covered separately.

World files must be located in `_work\data\Worlds\` with any path after that (Latin characters only).

### Opening a World

1. Launch SpacerNET - you'll see a black window
2. Click **File ? Open ZEN**
3. Select your world file (e.g., `_work\data\Worlds\NewWorld\NewWorld_Part_Xardas_01.zen`)
4. Wait for the world to load

:::warning Missing Files
If SpacerNET crashes during load, you're missing required resource files. Make sure you've installed ModKit (G2MDK), or if using worlds from other mods, you need to attach their VDF files.
:::

### Camera Navigation

You can customize camera controls in the settings, except for right mouse button (RMB).

**Basic Movement:**

- **RMB + WASD** - Move camera horizontally
- **RMB + Space** - Move up
- **RMB + X** - Move down
- **Left Shift** - Move faster
- **Left Ctrl** - Move slower and more precisely
- **Mouse Wheel** - Move forward quickly in camera direction
- **Mouse Movement** - Rotate camera
- **F3** - Hide interface windows

:::tip Window Behavior
By default, windows disappear during camera movement. You can change this setting in the Camera menu from previous lessons.
:::

## Working with Vobs (Objects)

Vobs (visual objects) are the building blocks of Gothic worlds - items, decorations, triggers, lights, etc.

### Required Windows

You need two windows active for working with vobs:

- **Properties Window** - Shows selected vob's properties
- **Object List Window** - Lists all objects in the world

### Selecting and Deselecting Vobs

**Selecting:**

- **Left Click** on a vob - Red bounding box (bbox) appears
- **Ctrl + Left Click** - Required for some vobs that don't select normally

**Deselecting:**

- Click on empty space in the world, OR
- Press **4**

**In Object List:**

- **Single click** - Loads vob properties
- **Double click** - Focuses camera on the vob

### Moving Vobs

1. Enable **Move mode** - Press **1**
2. Use **WASD** to move the vob horizontally
3. Use **Space/X** to move vob up/down
4. **Left Shift** - Move faster
5. **Left Ctrl** - Move slower and more precisely
6. Press **5** - Move vob to camera position
7. **Shift+F** - Drop vob to surface (may clip through other vobs)

:::info Collision
Unlike the old Spacer, you don't need to disable collision to move vobs - SpacerNET handles this automatically!
:::

### Rotating Vobs

1. Enable **Rotation mode** - Press **2**
2. By default, rotation is relative to camera (camera/view mode)
3. **Shift+T** - Toggle rotation modes (camera/view is recommended)
4. Use **WASD** to rotate the object
5. **Q/E** - Rotate around vertical axis (works in move mode too)
6. **Shift+R** - Reset vob rotation to default orientation

### Copying and Deleting Vobs

**Deleting:**

- **Delete** key - Removes vob from world (cannot be undone except by reloading)

:::warning Child Objects
If a vob contains other vobs (children), they will also be deleted. Example: A candle contains a FIRE_COMPLETE_A0.TGA decal. Deleting the candle removes the fire decal too.
:::

**Copying:**

1. **Ctrl+C** - Mark vob for copying
2. **Ctrl+V** - Paste vob
   - If no vob is selected - Pastes globally into world
   - If a vob is selected - Pastes as child of that vob

**Moving from Parent:**

1. Select child vob
2. **Ctrl+Z** - Cut vob
3. Press **4** to deselect
4. **Ctrl+V** - Paste into world (now independent)

### Other Useful Shortcuts

- **Ctrl+R** - Restore vob's original position and rotation from when world was loaded
- **M** - Combined mode (move and rotate simultaneously with different keys)
- **Shift+H** - Link camera movement to vob movement (rarely used)

## Creating New Vobs

### Creating Basic Vobs

Open the **Objects Window** and go to the first tab (All classes).

1. Select vob type - For most objects, use **zCVob** (barrels, tables, trees, grass)
2. Optional: Enter a name (required only for unique objects like triggers)
3. Optional: Choose a 3D model (search and press **Enter** to see available visuals)
4. Optional: Set collision type:
   - **Dynamic collision** - Standard collision between player and object
   - **Static collision** - Used for mesh collision checks
5. Click **Create**

The new vob appears in the world at camera position.

:::tip Quick Creation
Model name and collision can also be set later through vob properties.
:::

### Creating Items (oCItem)

Items are special vobs defined in scripts. To add items, use the **Items** tab.

Unlike regular vobs, items cannot have custom names or visuals - they're defined in scripts.

**Method 1: From List**

1. Select item from left list
2. Click **Create Item**

**Method 2: Search**

1. Enter search term in right search box (e.g., `itpo_`)
2. Shows matching items by visual name
3. Click right **Create Item** button

**Item Locator:**

- Toggle to show icons for all items on map
- Useful for seeing what items are where
- Can filter by flags and name prefix (e.g., ITPO\_ for potions)

### Creating Custom Model Vobs

To use your own 3D models as vobs:

1. Create model in Blender with proper materials
2. Convert to `.3ds` using kerrax's plugin
3. Place `.3ds` file in `Gothic II\_work\data\Meshes\` (organize in subfolders like original meshes)
4. In SpacerNET, enter model name with extension in visual field: `mymodel.3ds`
5. Click **Create**

:::warning Unique Names
Model names must NOT match original game models to avoid conflicts.
:::

## Searching, Deleting, and Renaming Vobs

SpacerNET provides powerful tools for searching, mass deleting, and renaming vobs in your world.

### Searching Vobs by Visual

To find all vobs with a specific visual (e.g., `NW_CAVEWEBS_V201.3DS`):

1. Open the **Search** tab in the Objects Window
2. Make sure vob type is set to **zCVob**
3. **Double-click** the **visual** field (red square appears - field is active)
4. Enter the visual name you're looking for
5. Click **Search**

Results appear in the list. You can click on them to navigate to each vob.

**Combining Search Criteria:**

You can combine multiple fields. For example, to find vobs with visual `NW_CAVEWEBS_V201.3DS` AND name `123`:

1. Double-click **visual** field, enter `NW_CAVEWEBS_V201.3DS`
2. Double-click **vobName** field, enter `123`
3. Click **Search**

Only vobs matching both criteria will be found.

### Searching Items in Locations

To find all gold coins (`ITMI_GOLD`) in a location, including chests:

1. Select vob type **oCItem**
2. Double-click **vobName** field
3. Enter item instance name: `ITMI_GOLD`
4. Enable option to search in chests
5. Click **Search**

Results show all matching items both in the world and inside containers.

### Advanced Search Options

Additional search conditions:

1. **Search in base classes** - Whether to search in inherited classes (e.g., if searching MobInter, also search in zCVob)
2. **Use regex** - Use regular expressions (pattern matching) for vobName or visual fields
3. **Match vob names** - Find vobs with identical names (useful for finding duplicate chest names)
   - Select vob type (e.g., `oCMobContainer`)
   - Leave visual/vobName fields empty
   - Results show all vobs with duplicate names
4. **Has children** - Find vobs that contain other vobs (not compatible with "Match vob names")
5. **Search radius from camera** - Search only within specified radius from current camera position instead of entire world

### Mass Deleting Vobs

To delete all vobs with a specific visual (e.g., `NW_HARBOUR_BARRELGROUP_01.3DS`):

1. Select vob type **zCVob**
2. Double-click **visual** field
3. Enter the visual name
4. Click **Search**
5. You'll get a list of matching vobs
6. Select **Remove** mode from the dropdown menu
7. Search button changes to **Remove** button
8. Click **Remove** and confirm

All matching vobs are deleted. You can return to **Search** mode afterwards.

### Mass Renaming Vobs

To rename all chests in a location with pattern `NW_CHEST_1` ... `NW_CHEST_N`:

1. Select vob type **oCMobContainer**
2. Leave **vobName** and **visual** fields empty (to find all chests)
3. Click **Search**
4. List of all chests appears
5. Select **Rename** mode from dropdown
6. Rename window opens - select option 3 (prefix + number)
7. Enter prefix: `NW_`
8. Click **Apply** (window closes)
9. Click **Rename**

All chests are renamed from `NW_1` to `NW_16` (or however many were found).

**Other renaming options:**

- Set empty name for all vobs
- Set identical name for all vobs

### Additional Modes

Other useful modes available after searching:

1. **Replace with VobTree** - Replaces found vobs with a VobTree from a ZEN file (pre-made vob collection)
2. **Toggle dynamic collision** - Changes dynamic collision to opposite state
   - Example: Find all stones without collision, apply this option, and they'll all have dynamic collision
3. **Search for unconnected WP** - Finds waypoints without connections to other waypoints
   - Having unconnected WP is not an error, but sometimes important to track
4. **Convert** - Not implemented (doesn't work)

## Working with Waypoints and Freepoints

Waypoints (WP) and Freepoints (FP) define NPC navigation and positions.

### Enabling Waypoint View

Make sure helper vobs and waypoint grid are visible:

- Enable **Help-vobs** display
- Enable **Waypoint grid** display

### Creating Waypoints (WP)

1. Go to **WP/FP** tab in Objects Window
2. Enter waypoint name
3. Click **Create Waypoint**

**Options:**

- **Connect to waynet at once** - New WP connects to previously selected WP
- **Auto-generated name** - Names increment automatically (e.g., SOME_001, SOME_002)

**Quick Creation:**

1. Select existing WP
2. Press **Ctrl+C**
3. Move camera to new position
4. Press **F2** - Creates connected WP with auto-incremented name

### Connecting/Disconnecting Waypoints

1. Select first WP
2. **Shift + Click** second WP (it will blink)
3. Press **3** - Toggles connection between the two WPs

### Creating Freepoints (FP)

Same as waypoints - use **Create Freepoint** button or **F2** after copying an FP.

:::warning Parent Objects
Before inserting a new FP, deselect any vobs (press **4**), otherwise the new FP will be inserted as a child of the selected vob.
:::

**Orientation:**
FP/WP orientation depends on settings in the configuration menu.

## Working with Triggers and Movers

Movers are animated objects like doors, gates, or moving platforms.

### Creating a Mover

1. Select vob type **zCMover**
2. Enter unique name
3. Choose visual (3D model)
4. Set **Dynamic collision**
5. Click **Create**

### Setting Up Mover Movement

Once created, select the mover and go to the **Triggers** tab:

1. **New Key** - Creates a keyframe at current position (starts at key 0)
2. Move the mover to a new position
3. **New Key** - Creates key 1
4. Yellow line shows movement path

**Navigation:**

- Arrow buttons - Move between keys
- **Run** - Start mover animation

### Mover Properties

1. **Speed** - Movement speed between keys (higher = faster)
2. **Move behavior**:
   - **LINEAR** - Straight line movement
   - **CURVE** - Slightly curved path
3. **Speed function**:
   - **CONST** - Constant speed
   - **SLOW_START_END** - Accelerate at start, decelerate at end
4. **Behavior mode**:
   - **2STATE_TRIGGER_CTRL** - Can be used only once
   - **NSTATE_LOOP** - Continuously moves automatically
   - **2STATE_TOGGLE** - Can be used multiple times via scripts/triggers
5. **Sound section** - SFX instances for movement sounds

**Example sounds for iron gate:**

- Start sound
- Movement loop sound
- End sound

**Static collision:**
If neighboring vobs have `isStatic = TRUE`, the mover will ignore collision with them and pass through (useful feature).

## Working with Cameras

Cameras create cutscenes or cinematic camera flybys.

### Creating a Camera

Go to **Camera** tab in Objects Window:

1. Enter camera name
2. Click **Create**
3. A camera object appears in the world

### Setting Up Camera Path

1. Fly camera to desired position
2. **Add a position** - Creates a keyframe
3. Repeat for each camera position

Keys are numbered 1 to n. First key is labeled **START**, last key is **END**.

### Testing Camera Movement

1. Set playback time (in seconds)
2. Click **Start** - Camera flies along the path

**Triggering in-game:**

```daedalus
Wld_SendTrigger("EVT_CAM_1");  // Use your camera's name
```

### Camera Time Settings

Time is set in two places:

- **Window time** (e.g., 5 seconds) - For testing in SpacerNET
- **totalTime** property - Actual time in-game

Match these values after finding the right timing in SpacerNET.

### Camera Targets

**Method 1: Target Line**
Add **targets** (points the camera looks at during flight). Red arrows show camera look direction.

**Right-click menu:**

- Delete keys
- Add keys between existing ones

**Method 2: Focus on Vob**
Set `autoCamFocusVobName` property to a vob's unique name. Camera will look at that vob during the entire flight.

### Useful Camera Properties

1. **Auto focus to first key** - Smooth transition to first keyframe (not instant)
2. **Auto focus from last key** - Smooth exit from camera back to player
3. **Player control** - Enable/disable player control during camera movement (usually FALSE for cutscenes)

## Creating Interactive Objects

SpacerNET allows you to create special interactive objects like doors, beds, and level change triggers.

### Creating a Door

To create a functioning door:

1. Select vob type **oCMobDoor**
2. **Disable** the "Search only 3DS" option
3. Enter a standard door model name (e.g., search for door models)
4. Choose from the list
5. Click **Create Vob**

The door is created. Don't forget to check **dynamic collision** so the player cannot walk through it.

### Creating a Bed

To create a bed that NPCs can use:

1. Select vob type **oCMobBed**
2. **Disable** the "Search only 3DS" option
3. Enter a standard bed model name
4. Choose from the list
5. Click **Create Vob**

The bed is created. Don't forget to check **dynamic collision** so the player cannot walk through it.

:::info Alternative Method
Sometimes beds are created using **oCMobDoor** type (apparently to allow approaching the bed from both sides), but this is generally not recommended.
:::

### Creating a Level Change Trigger

To create a trigger that transports the player to another location:

1. Select vob type **oCTriggerChangeLevel**
2. Enable **dynamic collision** (without this, the player won't trigger it)
3. Make sure visual is empty (clear it if needed)
4. Click **Create Vob**
5. Set the **levelName** property to the world file that should be loaded
   - Example: `NEWWORLD\NEWWORLD.ZEN` (use backslash `\`)
   - The path is relative to `_work\data\Worlds\`
6. Set the **startVobName** property to the vob where the player should appear
   - Example: `FP_ENTER_NEW_FROM_ARENA` (a Freepoint name)
7. Use **bbox edit mode** (press **6**) to set the trigger zone size
   - Red lines show the zone boundaries
   - See [BBOX Editing tutorial](https://worldofplayers.ru/threads/43491/) for details
8. Verify that **respondToPC** is set to **TRUE** (reacts to player entering the zone)

**Important property settings:**

- **respondToPC** = `TRUE` - Trigger activates when player enters
- **respondToNPC** = `FALSE` - Prevents activation by passing NPCs/monsters
- **respondToObject** = `FALSE` - Prevents activation by items (e.g., arrows)
- **reactToOnDamage** = `FALSE` - Doesn't activate from damage
- **reactToOnTrigger** = `TRUE` - Allows activation from another trigger
- **startEnabled** = `TRUE` - Trigger is active from the start (always use TRUE)

:::warning Trigger Properties
Make sure to set `respondToNPC` and `respondToObject` to FALSE, otherwise the trigger may activate when a monster walks through or when you shoot an arrow into it.
:::

## Lighting System

Gothic uses two types of light:

### Static Light

Pre-calculated light textures (lightmaps) stored in the ZEN file and overlaid on surfaces.

**Where it works:**

- **Indoor locations** - Locations without sky, all light can be static
- **Outdoor locations inside portals** - Caves and buildings
- **Outdoor locations (limited)** - Static light only slightly illuminates vobs, not terrain

:::warning Outdoor Limitation
You cannot create realistic torches that light the ground outdoors using static light. Use dynamic light instead.
:::

### Dynamic Light

Real-time light that can animate through multiple colors. Heavy performance impact on DX7.

**Where it works:**

- Anywhere, but affects performance
- Required for outdoor ground lighting

:::info DX11 Rendering
With DX11 renderer, all light is dynamic. It still impacts performance (on GPU), so avoid placing too many dynamic lights in one area.
:::

### Creating Light Vobs

Open **Light** tab in Objects Window.

**Interface:**

1. Presets (pre-configured light settings)
2. Delete preset
3. Save preset
4. Select light type (static/dynamic)
5. Create light vob

### Creating a Light Preset

1. Enter preset name
2. Click **New Preset**
3. Set radius (e.g., 2000 for testing)
4. Choose color (double-click color box)
5. Select light type (static or dynamic)
6. Click **Apply** to save preset

### Creating Light from Preset

1. Select your preset
2. Fly to a portal zone (cave/building) for static light
3. Click **Create LightVob**

**For static light:**
The light won't be visible until you compile it.

### Compiling Static Light

1. Go to **World ? Compile Light**
2. Select quality:
   - **Low** - Fast compilation
   - **Medium/High** - Better quality (visible mainly on high-poly surfaces)
3. Enable **Compile region** to compile only nearby area
4. Wait for compilation

### Dynamic Light Colors

Dynamic lights can animate through multiple colors:

1. Create preset with multiple colors
2. Set light type to **Dynamic**
3. Save preset
4. Create light vob
5. Set `colorAniFps` property (e.g., 1)
   - Higher values = faster color transitions

### Light and Static Vobs

If a vob has `staticVob = True`, it will cast shadows when static light is compiled (DX7). The vob blocks light, creating a shadow behind it.

:::tip Recompiling
When you move vobs with static lighting, the light can "break". Simply recompile all light (disable "compile region") to fix it. This may take a few minutes in large locations.
:::

## Spawn Points Visualization

Starting from version 1.18, SpacerNET can visualize monster spawn points.

### Using Spawn Visualization

Go to **Spawn** tab in Objects Window:

1. **Create new preset** - Name it after location/chapter (e.g., NEWWORLD_1)
2. **Add spawn functions** - Script functions that spawn monsters
   - Note: Script conditions won't execute - function runs as-is using `Wld_InsertNpc`
3. **Save presets file**
4. Set **display radius** (e.g., 12500)
5. Click **Set** to save radius
6. Click **Show spawn points**

Monster instance names appear above WP/FP spawn points.

**Clear display:**
Click **Clear** to remove spawn point markers.

:::info NPC Limitation
This feature doesn't work for human NPCs, as their positions are tied to daily routines, not spawn functions.
:::

## Creating Fog Zones

Fog zones add atmospheric haze to specific areas.

### Creating a Fog Zone

1. Select vob type **zCZoneFog**
2. Make sure visual is NOT set
3. Click **Create Vob**
4. Optional: Give it a name

### Fog Properties

1. **fogRangeCenter** - Distance at which fog becomes visible
   - 1000 = very close
   - 10000 = far distance
2. **innerRangePerc** - Fog density (0 to 1, typically 0.3-0.7)
3. **fogColor** - Fog color (RGB values)
4. **fadeOutSky** - Affects fog smoothness when approaching zone
5. **overrideColor** - Must be TRUE for `fogColor` to work

### Setting Fog Zone Size

Use **bbox editing mode** (press **6**) to resize the fog zone. Red lines show zone boundaries.

For detailed bbox editing instructions, see the separate tutorial on [Editing BBOX](https://worldofplayers.ru/threads/43491/).

:::warning DX11 Difference
On DX11 renderer, fog zones render slightly differently. The `fogRangeCenter` property doesn't work the same way as on DX7.
:::

## Working with Particle Effects (PFX)

The Particle Effects system allows you to create and edit visual effects like fire, smoke, sparks, and other atmospheric elements.

### Viewing Particle Effects

In the Object Window, there is a **Particles** tab where you can browse existing effects:

1. **Left list** - All available effects
2. **Right list** - Only effects matching the search condition

**Previewing effects:**

1. Select an effect in the list to see it on screen
2. You can edit the selected effect and see changes in real-time
3. Click **Create** to add the PFX as a new vob directly

### Adding PFX as Vobs

To add a particle effect as a vob:

1. Create a vob (any type)
2. In the vob's **visual** property, enter the effect name + `.PFX`
3. Example: `FIRE_MEDIUM.PFX`

The vob will now display the particle effect in the world.

### Particle Editor

The Particle Editor allows you to modify effects and see changes immediately.

:::warning Changes Are Not Saved Automatically
The Particle Editor **does not modify** game files (ParticleFX.dat). All changes will be lost after restarting SpacerNET!

To save your changes:

1. Save your modified effect to a text file
2. Insert the modified effect into your script file (`.d` extension with PFX definitions)
3. Compile them into `ParticleFX.dat`
4. The effect will be changed (or added as new) on the next SpacerNET launch
   :::

### Particle Editor Settings

**Animation Movement:**
You can set the effect to move instead of staying static (e.g., moving in a circle).

**Display Options:**
On the settings tab, you can configure visual preferences:

- Highlight main fields with italic/bold font
- Adjust preview settings

:::tip Quick Key Generation
For fields like `ppsScaleKeys_s` and `shpScaleKeys_s`, you can use quick generation:

**Example:** To generate `0.0 0.2 0.4 0.6 0.8 1.0`

- Enter: `! 0.0 1.0 0.2`
  - `0.0` - lower bound
  - `1.0` - upper bound
  - `0.2` - step

You can also reverse: `! 1.0 0.0 -0.2` generates `1.0 0.8 0.6 0.4 0.2 0.0`
:::

## Saving Your Work

### Important Notes

- SpacerNET maintains full compatibility with original Spacer ZEN format
- Worlds work in both SpacerNET and original Spacer
- Your mod **does not need Union** to run the locations
- Union is only required for running SpacerNET itself

### Saving the World

1. **File ? Save ZEN**
2. **Recommended**: Save as a new file instead of overwriting
3. Path must be in `_work\data\Worlds\`
4. Cannot save worlds outside Gothic folder (use symbolic links if needed)

:::warning File Naming
Avoid using standard world names like `NEWWORLD.ZEN`, `OLDWORLD.ZEN`, `ADDONWORLD.ZEN`. Add something extra like `NEWWORLD_10.ZEN`.

You can also use SpacerNET's automatic naming if you enable the prefix option.
:::

## Additional Resources

- [SpacerNET Installation Guide](../tools/spacer)
- [Original Russian Tutorials](https://worldofplayers.ru/forums/1179/) - SpacerNET section on World of Players
- [Gothic Modding Reference](https://worldofplayers.ru/threads/39853/) - Comprehensive technical reference

## Tips and Best Practices

1. **Always work in a separate Gothic copy** for Spacer to avoid mixing with gameplay files
2. **Save frequently** under different names to avoid losing work
3. **Test in-game regularly** to verify lighting, triggers, and collision work correctly
4. **Use meaningful names** for triggers, cameras, and unique vobs
5. **Organize your vobs** using the object list and hierarchy
6. **Compile light in sections** when working on large outdoor areas
7. **Keep backup copies** of important world files before major changes
