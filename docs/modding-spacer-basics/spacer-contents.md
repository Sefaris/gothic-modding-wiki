---
sidebar_position: 0
title: "SpacerNET - Complete Guide"
description: "Comprehensive table of contents for all SpacerNET modding topics and tutorials."
---

# SpacerNET - Complete Guide

This page provides a comprehensive overview of all SpacerNET topics covered in this documentation. Use it as a quick reference to find the information you need.

:::tip Getting Started
Before diving into world editing, make sure you have SpacerNET installed and configured. See the [SpacerNET Installation Guide](../tools/spacer).
:::

---

## Table of Contents

### **1. [Basics](spacer-basics.md)**

#### [Gothic Modding Terminology](spacer-basics.md#gothic-modding-terminology)

- [**World and Location Types**](spacer-basics.md#world-and-location-types) - ZEN files, indoor/outdoor locations, portals
- [**Objects and Visuals**](spacer-basics.md#objects-and-visuals) - Vobs, visuals, decals, VobTree, bounding boxes
- [**Interactive Objects**](spacer-basics.md#interactive-objects) - Triggers, movers, MobInter
- [**Navigation and Positioning**](spacer-basics.md#navigation-and-positioning) - Waypoints (WP), Freepoints (FP)
- [**Effects and Sounds**](spacer-basics.md#effects-and-sounds) - PFX, VFX, SFX

#### [First Launch and Interface Setup](spacer-basics.md#first-launch-and-interface-setup)

- [**Main Interface Elements**](spacer-basics.md#main-interface-elements) - Menu bar, view menu, toolbar
- [**Window Layout Options**](spacer-basics.md#window-layout-options) - Presets for different resolutions
- [**Interface Customization**](spacer-basics.md#interface-customization) - Fonts, icon scaling, language

#### [Camera and Display Settings](spacer-basics.md#camera-and-display-settings)

- [**Information Display**](spacer-basics.md#information-display) - FPS, triangle count, coordinates
- [**Camera Control Settings**](spacer-basics.md#camera-control-settings) - Movement speed, rotation, smoothing
- [**Rendering Options (DX7 only)**](spacer-basics.md#rendering-options-dx7-only) - World mesh, vob rendering
- [**Additional Options**](spacer-basics.md#additional-options) - Model rotation, window hiding, FPS limits

#### [Vob Settings](spacer-basics.md#vob-settings)

- [**Movement and Rotation**](spacer-basics.md#movement-and-rotation) - Speed settings for manipulation
- [**Vob Placement Settings**](spacer-basics.md#vob-placement-settings) - Height, rotation, hierarchy, ground highlighting
- [**Waypoint/Freepoint Orientation**](spacer-basics.md#waypointfreepoint-orientation) - Placement orientation options

#### [Miscellaneous Settings](spacer-basics.md#miscellaneous-settings)

- [**File Management**](spacer-basics.md#file-management) - Filename timestamps, closing confirmations
- [**Auto-positioning and Compilation**](spacer-basics.md#auto-positioning-and-compilation) - Camera auto-positioning, auto-compile
- [**World Optimization**](spacer-basics.md#world-optimization) - VobLevelCompo, polygon sorting, Latin symbols

#### [Keyboard Shortcuts](spacer-basics.md#keyboard-shortcuts)

- [**Key Binding Features**](spacer-basics.md#key-binding-features) - Custom combinations, reset options

#### [World Menu Functions](spacer-basics.md#world-menu-functions)

- [**Light Compilation**](spacer-basics.md#light-compilation) - Quality settings for lighting
- [**World Compilation**](spacer-basics.md#world-compilation) - Outdoor vs indoor compilation
- [**Camera and Time Controls**](spacer-basics.md#camera-and-time-controls) - Camera positioning, time of day
- [**Testing and Analysis**](spacer-basics.md#testing-and-analysis) - Play as hero, waynet analysis, vob lists
- [**Render Modes (DX7 only)**](spacer-basics.md#render-modes-dx7-only) - Different rendering modes

#### [Advanced Configuration](spacer-basics.md#advanced-configuration)

- [**spacer_net.ini Settings**](spacer-basics.md#spacer_netini-settings) - Advanced configuration options

---

### **2. [World Editing](spacer-world-editing.md)**

#### [Opening and Navigating Worlds](spacer-world-editing.md#opening-and-navigating-worlds)

- [**Opening a World**](spacer-world-editing.md#opening-a-world) - File locations, loading process
- [**Camera Navigation**](spacer-world-editing.md#camera-navigation) - Movement controls, speed modifiers

#### [Working with Vobs (Objects)](spacer-world-editing.md#working-with-vobs-objects)

- [**Required Windows**](spacer-world-editing.md#required-windows) - Essential interface windows
- [**Selecting and Deselecting Vobs**](spacer-world-editing.md#selecting-and-deselecting-vobs) - Selection methods
- [**Moving Vobs**](spacer-world-editing.md#moving-vobs) - Move tool, gizmo controls
- [**Rotating Vobs**](spacer-world-editing.md#rotating-vobs) - Rotation modes and controls
- [**Copying and Deleting Vobs**](spacer-world-editing.md#copying-and-deleting-vobs) - Duplication and removal
- [**Other Useful Shortcuts**](spacer-world-editing.md#other-useful-shortcuts) - Focus camera, visibility toggles

#### [Creating New Vobs](spacer-world-editing.md#creating-new-vobs)

- [**Creating Basic Vobs**](spacer-world-editing.md#creating-basic-vobs) - Standard object creation
- [**Creating Items (oCItem)**](spacer-world-editing.md#creating-items-ocitem) - Item placement from scripts
- [**Creating Custom Model Vobs**](spacer-world-editing.md#creating-custom-model-vobs) - Custom 3D model insertion

#### [Searching, Deleting, and Renaming Vobs](spacer-world-editing.md#searching-deleting-and-renaming-vobs)

- [**Searching Vobs by Visual**](spacer-world-editing.md#searching-vobs-by-visual) - Find objects by model
- [**Searching Items in Locations**](spacer-world-editing.md#searching-items-in-locations) - Locate specific items
- [**Advanced Search Options**](spacer-world-editing.md#advanced-search-options) - Filtering and selection
- [**Mass Deleting Vobs**](spacer-world-editing.md#mass-deleting-vobs) - Batch deletion operations
- [**Mass Renaming Vobs**](spacer-world-editing.md#mass-renaming-vobs) - Batch renaming with patterns
- [**Additional Modes**](spacer-world-editing.md#additional-modes) - Replace visuals, rename by type

#### [Working with Waypoints and Freepoints](spacer-world-editing.md#working-with-waypoints-and-freepoints)

- [**Enabling Waypoint View**](spacer-world-editing.md#enabling-waypoint-view) - Visualization toggles
- [**Creating Waypoints (WP)**](spacer-world-editing.md#creating-waypoints-wp) - Navigation point creation
- [**Connecting/Disconnecting Waypoints**](spacer-world-editing.md#connectingdisconnecting-waypoints) - Path network building
- [**Creating Freepoints (FP)**](spacer-world-editing.md#creating-freepoints-fp) - Spawn point creation

#### [Working with Triggers and Movers](spacer-world-editing.md#working-with-triggers-and-movers)

- [**Creating a Mover**](spacer-world-editing.md#creating-a-mover) - Moving platform setup
- [**Setting Up Mover Movement**](spacer-world-editing.md#setting-up-mover-movement) - Keyframe configuration
- [**Mover Properties**](spacer-world-editing.md#mover-properties) - Speed, behavior, sound settings

#### [Working with Cameras](spacer-world-editing.md#working-with-cameras)

- [**Creating a Camera**](spacer-world-editing.md#creating-a-camera) - Camera object creation
- [**Setting Up Camera Path**](spacer-world-editing.md#setting-up-camera-path) - Keyframe-based paths
- [**Testing Camera Movement**](spacer-world-editing.md#testing-camera-movement) - Preview functionality
- [**Camera Time Settings**](spacer-world-editing.md#camera-time-settings) - Duration and timing
- [**Camera Targets**](spacer-world-editing.md#camera-targets) - Target object tracking
- [**Useful Camera Properties**](spacer-world-editing.md#useful-camera-properties) - FOV, loop settings

#### [Creating Interactive Objects](spacer-world-editing.md#creating-interactive-objects)

- [**Creating a Door**](spacer-world-editing.md#creating-a-door) - Interactive door setup
- [**Creating a Bed**](spacer-world-editing.md#creating-a-bed) - Sleep interaction setup
- [**Creating a Level Change Trigger**](spacer-world-editing.md#creating-a-level-change-trigger) - Zone transition triggers

#### [Lighting System](spacer-world-editing.md#lighting-system)

- [**Static Light**](spacer-world-editing.md#static-light) - Baked lighting for meshes
- [**Dynamic Light**](spacer-world-editing.md#dynamic-light) - Real-time lighting for vobs
- [**Creating Light Vobs**](spacer-world-editing.md#creating-light-vobs) - Light source placement
- [**Creating a Light Preset**](spacer-world-editing.md#creating-a-light-preset) - Reusable light templates
- [**Creating Light from Preset**](spacer-world-editing.md#creating-light-from-preset) - Applying presets
- [**Compiling Static Light**](spacer-world-editing.md#compiling-static-light) - Baking process
- [**Dynamic Light Colors**](spacer-world-editing.md#dynamic-light-colors) - Color configuration
- [**Light and Static Vobs**](spacer-world-editing.md#light-and-static-vobs) - Interaction behavior

#### [Spawn Points Visualization](spacer-world-editing.md#spawn-points-visualization)

- [**Using Spawn Visualization**](spacer-world-editing.md#using-spawn-visualization) - Display spawn locations

#### [Creating Fog Zones](spacer-world-editing.md#creating-fog-zones)

- [**Creating a Fog Zone**](spacer-world-editing.md#creating-a-fog-zone) - Atmospheric fog setup
- [**Fog Properties**](spacer-world-editing.md#fog-properties) - Color, density, range
- [**Setting Fog Zone Size**](spacer-world-editing.md#setting-fog-zone-size) - Zone dimensions

#### [Working with Particle Effects (PFX)](spacer-world-editing.md#working-with-particle-effects-pfx)

- [**Viewing Particle Effects**](spacer-world-editing.md#viewing-particle-effects) - Preview window
- [**Adding PFX as Vobs**](spacer-world-editing.md#adding-pfx-as-vobs) - Placing effects in world
- [**Particle Editor**](spacer-world-editing.md#particle-editor) - Creating custom effects
- [**Particle Editor Settings**](spacer-world-editing.md#particle-editor-settings) - Detailed parameters

#### [Saving Your Work](spacer-world-editing.md#saving-your-work)

- [**Important Notes**](spacer-world-editing.md#important-notes) - Save workflow tips
- [**Saving the World**](spacer-world-editing.md#saving-the-world) - Export and compilation

---

### **3. [Advanced World Editing](spacer-advanced-world-editing.md)**

#### [Display Modes and View Options](spacer-advanced-world-editing.md#display-modes-and-view-options)

- [**Display Mode Toggles**](spacer-advanced-world-editing.md#display-mode-toggles) - Wireframe, lighting, textures
- [**Special Display Modes**](spacer-advanced-world-editing.md#special-display-modes) - Multi-selection, NoGrass mode

#### [Vob Containers and Advanced Selection](spacer-advanced-world-editing.md#vob-containers-and-advanced-selection)

- [**Global Parent System**](spacer-advanced-world-editing.md#global-parent-system) - Hierarchical organization
- [**VobTree Management**](spacer-advanced-world-editing.md#vobtree-management) - Nested object groups
- [**Mass Selection Tools**](spacer-advanced-world-editing.md#mass-selection-tools) - Advanced selection methods

#### [Mesh and Geometry Tools](spacer-advanced-world-editing.md#mesh-and-geometry-tools)

- [**Mesh Manipulation**](spacer-advanced-world-editing.md#mesh-manipulation) - Direct mesh editing
- [**Polygon Optimization**](spacer-advanced-world-editing.md#polygon-optimization) - Performance improvement
- [**Collision Detection**](spacer-advanced-world-editing.md#collision-detection) - Testing and debugging

#### [Advanced Lighting Techniques](spacer-advanced-world-editing.md#advanced-lighting-techniques)

- [**Light Mapping**](spacer-advanced-world-editing.md#light-mapping) - Advanced baking techniques
- [**Shadow Quality**](spacer-advanced-world-editing.md#shadow-quality) - Shadow resolution settings
- [**HDR Lighting**](spacer-advanced-world-editing.md#hdr-lighting) - High dynamic range setup

#### [Performance Optimization](spacer-advanced-world-editing.md#performance-optimization)

- [**LOD (Level of Detail)**](spacer-advanced-world-editing.md#lod-level-of-detail) - Distance-based optimization
- [**Occlusion Culling**](spacer-advanced-world-editing.md#occlusion-culling) - Portal-based optimization
- [**Draw Distance Management**](spacer-advanced-world-editing.md#draw-distance-management) - Render distance control

#### [Advanced Scripting Integration](spacer-advanced-world-editing.md#advanced-scripting-integration)

- [**Trigger Scripting**](spacer-advanced-world-editing.md#trigger-scripting) - Custom trigger behavior
- [**Event Systems**](spacer-advanced-world-editing.md#event-systems) - World event management
- [**Dynamic Object Spawning**](spacer-advanced-world-editing.md#dynamic-object-spawning) - Runtime object creation

---

### **4. [Additional Tips & Techniques](spacer-additional.md)**

#### [Best Practices for Location Creation](spacer-additional.md#best-practices-for-location-creation)

- [**Walkable Surfaces as Mesh Geometry**](spacer-additional.md#1-walkable-surfaces-as-mesh-geometry) - Collision best practices
- [**Large Trees and DX11 Shadow Rendering**](spacer-additional.md#2-large-trees-and-dx11-shadow-rendering) - Shadow optimization
- [**Portal Placement is Mandatory**](spacer-additional.md#3-portal-placement-is-mandatory) - Performance requirements

#### [Required Vobs for New Locations](spacer-additional.md#required-vobs-for-new-locations)

- [**Default Music Zone**](spacer-additional.md#1-default-music-zone-ocznzemusicdefault) - Music system configuration
- [**Default Vob Render Distance**](spacer-additional.md#2-default-vob-render-distance-zczonevobfarplacedefault) - Object visibility settings
- [**Default Fog Distance**](spacer-additional.md#3-default-fog-distance-zczonezfogdefault) - Atmospheric settings

#### [Using DirectX 11 Renderer](spacer-additional.md#using-directx-11-renderer)

- [**Advantages**](spacer-additional.md#advantages) - Modern rendering benefits
- [**Disadvantages**](spacer-additional.md#disadvantages) - Limitations and constraints
- [**Installation**](spacer-additional.md#installation) - Setup process
- [**Workflow Recommendations**](spacer-additional.md#workflow-recommendations) - Best practices
- [**Batch File Toggle System**](spacer-additional.md#batch-file-toggle-system) - Quick renderer switching

#### [Extracting Mesh from ZEN File](spacer-additional.md#extracting-mesh-from-zen-file)

- [**Extraction Process**](spacer-additional.md#extraction-process) - Export mesh from world
- [**Working with Extracted Meshes**](spacer-additional.md#working-with-extracted-meshes) - Blender workflow
- [**Potential Issues**](spacer-additional.md#potential-issues) - Troubleshooting tips

#### [UV Unwrap Error Detection](spacer-additional.md#uv-unwrap-error-detection)

- [**Activating UV Problem Detection**](spacer-additional.md#activating-uv-problem-detection) - Enable diagnostic tools
- [**Understanding Results**](spacer-additional.md#understanding-results) - Interpreting error reports
- [**Configuration Options**](spacer-additional.md#configuration-options) - Sensitivity settings
- [**Workflow Tips**](spacer-additional.md#workflow-tips) - Efficient error fixing

#### [Creating Location Map in Blender](spacer-additional.md#creating-location-map-in-blender)

- [**Requirements**](spacer-additional.md#requirements) - Software and plugins needed
- [**Step-by-Step Process**](spacer-additional.md#step-by-step-process):
  1. [Render Engine Setup](spacer-additional.md#1-render-engine-setup)
  2. [Resolution Configuration](spacer-additional.md#2-resolution-configuration)
  3. [Lighting Setup](spacer-additional.md#3-lighting-setup)
  4. [Camera Configuration](spacer-additional.md#4-camera-configuration)
  5. [Render Map](spacer-additional.md#5-render-map)
  6. [Calculate Coordinates](spacer-additional.md#6-calculate-coordinates)
  7. [Implement in Daedalus Script](spacer-additional.md#7-implement-in-daedalus-script)
  8. [Test and Refine](spacer-additional.md#8-test-and-refine)
- [**Formula Reference**](spacer-additional.md#formula-reference) - Coordinate conversion formulas

---

## Related Resources

- **[SpacerNET Installation](../tools/spacer)** - Setup and troubleshooting
- **[Daedalus Scripting](../general-info/daedalus.md)** - Script integration
- **[Ikarus Library](../general-info/ikarus.md)** - Advanced scripting
- **[Union Plugins](../general-info/union.md)** - C++ extensions

---

## Quick Tips

:::tip Best Practices

- Always backup your worlds before major changes
- Test in original Spacer periodically for compatibility
- Use separate Gothic installation for Spacer work
- Enable debug console for detailed error messages
- Save frequently - SpacerNET can be unstable with complex worlds
  :::

:::warning Common Pitfalls

- Don't compile worlds with DX11 enabled
- Always use Latin characters in file paths
- Portal placement is mandatory for performance
- Static light must be recompiled after mesh changes
  :::

---
