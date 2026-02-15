---
sidebar_position: 4
title: "Custom Status Bar"
description: "Creating a custom oCViewStatusBar in a Union plugin - a stamina bar example."
---

# Custom Status Bar

In this tutorial you'll create a fully functional **stamina bar** - a new `oCViewStatusBar` that displays alongside the existing HP and Mana bars. You'll learn how the engine's status bar system works, how to position a custom bar relative to existing ones, how to update its value from Daedalus variables, and how to handle visibility, cleanup, and text overlays.

The techniques shown here apply to any custom status bar you might want to create - stamina, experience, shield strength, or anything else.

## Prerequisites

- Completed the [My First Plugin](./first-plugin.md) guide
- A working Union project with the `oCGame_Init`, `Game_Loop`, and `Game_SaveBegin` hooks enabled
- Basic understanding of hooks and the `userapi/` folder
- A texture file for the bar (e.g. `BAR_STAMINA.TGA`) placed in your mod's `Textures` directory

---

## How Status Bars Work in Gothic

Gothic's HUD status bars (HP, Mana, focus, swim) are instances of `oCViewStatusBar`, which inherits from `zCView`. The engine manages them through the `oCGame` object:

```cpp
// Members of oCGame (accessible via the global ogame pointer)
oCViewStatusBar* hpBar;     // Health bar
oCViewStatusBar* manaBar;   // Mana bar
oCViewStatusBar* focusBar;  // Enemy focus bar
oCViewStatusBar* swimBar;   // Swim/dive bar
```

Each `oCViewStatusBar` consists of layered `zCView` elements:

| Layer | Description |
|-------|-------------|
| Background | The bar frame (`BAR_BACK.TGA`) |
| `range_bar` | Shows the maximum range area (`BAR_TEMPMAX.TGA`) |
| `value_bar` | Shows the current value fill (e.g. `BAR_HEALTH.TGA`) |

Key methods you'll use:

| Method | Purpose |
|--------|---------|
| `Init(x, y, scale)` | Initialize the bar at position with scale |
| `SetTextures(back, range, value, "")` | Set the four texture layers |
| `SetMaxRange(min, max)` | Set the total range of the bar |
| `SetRange(min, max)` | Set the visible range |
| `SetValue(val)` | Set the current fill value |
| `SetPos(x, y)` | Set screen position (virtual coordinates) |
| `SetSize(w, h)` | Set bar dimensions |
| `GetPos(x, y)` | Read current position |
| `GetSize(w, h)` | Read current size |

:::info
Gothic uses a **virtual coordinate system** of **8192 x 8192** for screen positions. The point `(0, 0)` is the top-left corner and `(8192, 8192)` is the bottom-right. All `SetPos`, `GetPos`, `SetSize` calls use these virtual coordinates, so your bar positions are resolution-independent.
:::

---

## Step 1: Declare the Hook

To update the bar every frame, you need to hook `oCGame::UpdatePlayerStatus` - this is where the engine updates the HP, Mana, and other status bars. Your custom bar will be updated in the same place.

Create or edit `userapi/oCGame.inl` and add:

```cpp
// userapi/oCGame.inl
void UpdatePlayerStatus_Hook();
```

---

## Step 2: Create the StaminaBar Class

Create a header file for your stamina bar class. In a simple plugin, you can put this directly in `Plugin.hpp`, but separating it into its own file keeps things organized.

```cpp
// StaminaBar.h
namespace GOTHIC_NAMESPACE
{
    class zCStaminaBar
    {
    public:
        void Init();
        void UpdatePosAndSize();
        void UpdateValue();
        void Reset();
        void Loop();

    public:
        oCViewStatusBar* staminaBar = nullptr;

    private:
        zCView* valueView = nullptr;
        bool ShouldHideBar() const;

        void ClearValueView();
    };

    std::unique_ptr<zCStaminaBar> zStaminaBar;
}
```

Key design decisions:
- `staminaBar` is the actual `oCViewStatusBar` instance
- `valueView` is an optional text overlay for displaying numeric values
- `std::unique_ptr` manages the lifetime automatically

---

## Step 3: Implement the Bar

Now implement all the methods. This is the core of the tutorial.

### Init - Creating and Inserting the Bar

```cpp
// StaminaBar.hpp
namespace GOTHIC_NAMESPACE
{
    void zCStaminaBar::Init()
    {
        // Create the bar only once
        if (!staminaBar)
        {
            staminaBar = new oCViewStatusBar();

            if (screen)
            {
                // Insert into the screen to initialize internal structures
                screen->InsertItem(staminaBar, FALSE);

                // Initialize with position (0,0) and scale 1.0
                staminaBar->Init(0, 0, 1.0);

                // Set the bar textures
                staminaBar->SetTextures(
                    "BAR_BACK.TGA",      // background frame
                    "BAR_TEMPMAX.TGA",   // range indicator
                    "BAR_STAMINA.TGA",   // value fill (your custom texture)
                    ""                   // unused 4th slot
                );

                // Calculate position based on existing bars
                UpdatePosAndSize();

                // Remove after init - we'll re-insert each frame
                screen->RemoveItem(staminaBar);
            }
        }

        // Every frame: re-insert, update, and conditionally hide
        if (screen && staminaBar)
        {
            screen->RemoveItem(staminaBar);
            screen->InsertItem(staminaBar, FALSE);

            UpdateValue();

            if (ShouldHideBar())
            {
                screen->RemoveItem(staminaBar);
            }
        }
    }
}
```

:::warning
The pattern of removing and re-inserting the bar each frame may seem unusual, but it's necessary. The engine's `screen->InsertItem` manages the rendering order. Re-inserting ensures the bar stays in the correct layer relative to other HUD elements that may be added or removed dynamically.
:::

### UpdatePosAndSize - Positioning Relative to Other Bars

The stamina bar should align with the HP and Mana bars. The engine doesn't provide a fixed layout - bar positions can vary between mods and screen configurations. This code reads the existing bar positions and calculates where to place the new bar:

```cpp
void zCStaminaBar::UpdatePosAndSize()
{
    if (!ogame || !ogame->hpBar || !ogame->manaBar || !staminaBar)
        return;

    int sizeX, sizeY;
    int posX_HP, posY_HP;
    int posX_Mana, posY_Mana;

    // Read the size and position of existing bars
    ogame->hpBar->GetSize(sizeX, sizeY);
    ogame->hpBar->GetPos(posX_HP, posY_HP);
    ogame->manaBar->GetPos(posX_Mana, posY_Mana);

    // Match the size of the HP bar
    staminaBar->SetSize(sizeX, sizeY);

    if (posX_HP == posX_Mana)
    {
        // Bars are vertically stacked (same X position)
        // Place the stamina bar above the topmost bar
        int verticalOffset = std::abs(posY_HP - posY_Mana);

        if (posY_Mana < posY_HP)
            staminaBar->SetPos(posX_HP, posY_Mana - verticalOffset);
        else
            staminaBar->SetPos(posX_HP, posY_HP - verticalOffset);
    }
    else
    {
        // Bars are side by side - center the stamina bar
        staminaBar->SetPos((8192 / 2) - sizeX / 2, posY_HP);
    }
}
```

:::tip
The value `8192` is the width of the virtual coordinate system. Dividing by 2 gives you the horizontal center of the screen. This is useful for centering elements regardless of the actual screen resolution.
:::

### UpdateValue - Reading the Daedalus Variable

The stamina value comes from a Daedalus script variable. You read it using the parser's symbol table:

```cpp
void zCStaminaBar::UpdateValue()
{
    auto symStamina = parser->GetSymbol("ATR_STAMINA");
    auto symStaminaMax = parser->GetSymbol("ATR_STAMINA_MAX");

    if (!symStamina || !symStaminaMax)
        return;

    int stamina = symStamina->single_intdata;
    int staminaMax = symStaminaMax->single_intdata;

    if (stamina && staminaMax)
    {
        staminaBar->SetValue(stamina);
        staminaBar->SetMaxRange(0, staminaMax);
        staminaBar->SetRange(0, staminaMax);
    }
}
```

### ShouldHideBar - Visibility Logic

The bar should be hidden in certain situations - pause menu, dialogue, diving (which has its own swim bar):

```cpp
bool zCStaminaBar::ShouldHideBar() const
{
    if (!player)
        return true;

    // Hide during pause
    if (ogame->IsOnPause())
        return true;

    // Hide during dialogues
    if (!oCInformationManager::GetInformationManager().HasFinished())
        return true;

    // Hide when inventory is open
    if (player->inventory2.IsOpen())
        return true;

    // Hide while diving (swim bar takes over)
    if (player->GetBodyState() == BS_DIVE)
        return true;

    return false;
}
```

### Reset - Cleanup for Save/Load

When the game saves or loads, you must remove the bar from the screen and destroy it. The hook will recreate it when the game resumes:

```cpp
void zCStaminaBar::Reset()
{
    if (staminaBar)
    {
        screen->RemoveItem(staminaBar);
        staminaBar = nullptr;
    }
}
```

:::danger
Forgetting to reset the bar on save/load can cause crashes. The engine serializes the game state, and dangling pointers to destroyed views will lead to access violations. Always clean up in `Game_SaveBegin` and `LoadBegin`.
:::

---

## Step 4: Display Numeric Values on the Bar

You can overlay text showing the exact values (e.g. "75/100") directly on the bar. This uses a `zCView` inserted as a child of the bar's `range_bar`:

```cpp
void zCStaminaBar::ClearValueView()
{
    delete valueView;
    valueView = nullptr;
}

void zCStaminaBar::Loop()
{
    // Only show values when the bar is visible
    if (!ogame->GetShowPlayerStatus() || !staminaBar)
        return;

    auto symStamina = parser->GetSymbol("ATR_STAMINA");
    auto symStaminaMax = parser->GetSymbol("ATR_STAMINA_MAX");
    if (!symStamina || !symStaminaMax)
        return;

    // Clear previous frame's overlay
    ClearValueView();

    int stamina = symStamina->single_intdata;
    int staminaMax = symStaminaMax->single_intdata;

    zSTRING text = zSTRING{stamina} + "/" + zSTRING{staminaMax};

    // Create a full-screen view as overlay
    valueView = new zCView(0, 0, 8192, 8192);

    if (staminaBar->range_bar)
    {
        // Insert text view into the bar's range area
        staminaBar->range_bar->InsertItem(valueView);

        // Center the text inside the bar
        int textWidth = valueView->FontSize(text);
        int textHeight = valueView->FontY();

        int posX = (8192 - textWidth) / 2;
        int posY = (8192 - textHeight - 50) / 2;

        zCOLOR color = zCOLOR(255, 255, 255, staminaBar->alpha);
        valueView->CreateText(posX, posY, text, 0, color, 0, 1);
    }
}
```

:::tip
The text overlay is recreated every frame (old one deleted, new one created). This is the standard approach in Gothic's rendering system - views used for temporary text are not persistent.
:::

**Alternative: Text above the bar** instead of inside it:

```cpp
// Print text above the bar instead of inside it
int posX, posY;
staminaBar->GetPos(posX, posY);
posY -= 50 + screen->FontY();  // offset above the bar

zSTRING text = zSTRING{stamina} + "/" + zSTRING{staminaMax};
int textLen = screen->FontSize(text);
posX = 4096 - textLen / 2;  // center horizontally

screen->Print(posX, posY, text);
```

---

## Step 5: Wire Everything into Plugin.hpp

Now connect all the pieces in your `Plugin.hpp`:

```cpp
#define PrintConsole(a) Union::String::Format(a).StdPrintLine();

// Include your stamina bar files
#include "StaminaBar.h"
#include "StaminaBar.hpp"

namespace GOTHIC_NAMESPACE
{
    void Game_Init()
    {
        // Create the stamina bar instance
        zStaminaBar = std::make_unique<zCStaminaBar>();
        PrintConsole("Stamina bar plugin loaded!");
    }

    void Game_Exit()
    {
        zStaminaBar.reset();
    }

    void Game_Loop()
    {
        // Update the text overlay each frame
        if (zStaminaBar)
            zStaminaBar->Loop();
    }

    void Game_SaveBegin()
    {
        // Clean up before saving
        if (zStaminaBar)
            zStaminaBar->Reset();
    }

    void LoadBegin()
    {
        // Clean up before loading
        if (zStaminaBar)
            zStaminaBar->Reset();
    }

    void Game_LoadBegin_NewGame()      { LoadBegin(); }
    void Game_LoadBegin_SaveGame()     { LoadBegin(); }
    void Game_LoadBegin_ChangeLevel()  { LoadBegin(); }

    // ... other empty game event functions ...

    // --- Hook: UpdatePlayerStatus ---
    // This is where the engine updates HP/Mana bars.
    // We insert our stamina bar update here.

    auto Hook_oCGame_UpdatePlayerStatus = ::Union::CreateHook(
        reinterpret_cast<void*>(zSwitch(0x00638F90, 0x0065F4E0, 0x00666640, 0x006C3140)),
        &oCGame::UpdatePlayerStatus_Hook,
        ::Union::HookType::Hook_Detours
    );

    void oCGame::UpdatePlayerStatus_Hook()
    {
        // Call the original - this updates HP, Mana, etc.
        (this->*Hook_oCGame_UpdatePlayerStatus)();

        // Now update our custom bar
        zStaminaBar->Init();
    }

    // ... other hooks (oCGame_Init, Game_Loop, etc.) ...
}
```

### Why Hook UpdatePlayerStatus?

The engine calls `oCGame::UpdatePlayerStatus` every frame when the HUD is active. This is where the HP and Mana bars get their values updated and are inserted into the screen. By hooking this function, your stamina bar:

- Updates at the same time as the other bars
- Follows the same visibility rules (hidden during cutscenes, loading screens, etc.)
- Gets the correct rendering order in the HUD layer

---

## Step 6: The Daedalus Side

Your stamina bar reads values from Daedalus variables. You need to define these in your scripts:

```daedalus
// In your Daedalus scripts (e.g. _intern/Constants.d)
var int ATR_STAMINA;
var int ATR_STAMINA_MAX;
```

:::warning
The variable names must match exactly what you pass to `parser->GetSymbol()` in C++. The parser lookup is case-insensitive, but using the exact same casing avoids confusion.
:::

Then manage the stamina value from your game scripts - decrease it on actions, regenerate over time, etc.

---

## Complete Example

Here's the full, minimal `Plugin.hpp` with all pieces assembled:

```cpp
#define PrintConsole(a) Union::String::Format(a).StdPrintLine();

namespace GOTHIC_NAMESPACE
{
    // ===============================
    // Stamina Bar Class
    // ===============================

    class zCStaminaBar
    {
    public:
        oCViewStatusBar* staminaBar = nullptr;

        void Init()
        {
            if (!staminaBar)
            {
                staminaBar = new oCViewStatusBar();
                if (screen)
                {
                    screen->InsertItem(staminaBar, FALSE);
                    staminaBar->Init(0, 0, 1.0);
                    staminaBar->SetTextures("BAR_BACK.TGA", "BAR_TEMPMAX.TGA",
                                            "BAR_STAMINA.TGA", "");
                    UpdatePosAndSize();
                    screen->RemoveItem(staminaBar);
                }
            }

            if (screen && staminaBar)
            {
                screen->RemoveItem(staminaBar);
                screen->InsertItem(staminaBar, FALSE);
                UpdateValue();

                if (ShouldHideBar())
                    screen->RemoveItem(staminaBar);
            }
        }

        void UpdatePosAndSize()
        {
            if (!ogame || !ogame->hpBar || !ogame->manaBar || !staminaBar)
                return;

            int sizeX, sizeY, posX_HP, posY_HP, posX_Mana, posY_Mana;

            ogame->hpBar->GetSize(sizeX, sizeY);
            ogame->hpBar->GetPos(posX_HP, posY_HP);
            ogame->manaBar->GetPos(posX_Mana, posY_Mana);

            staminaBar->SetSize(sizeX, sizeY);

            if (posX_HP == posX_Mana)
            {
                int offset = std::abs(posY_HP - posY_Mana);
                if (posY_Mana < posY_HP)
                    staminaBar->SetPos(posX_HP, posY_Mana - offset);
                else
                    staminaBar->SetPos(posX_HP, posY_HP - offset);
            }
            else
            {
                staminaBar->SetPos((8192 / 2) - sizeX / 2, posY_HP);
            }
        }

        void UpdateValue()
        {
            auto sym = parser->GetSymbol("ATR_STAMINA");
            auto symMax = parser->GetSymbol("ATR_STAMINA_MAX");
            if (!sym || !symMax) return;

            int val = sym->single_intdata;
            int maxVal = symMax->single_intdata;

            if (val && maxVal)
            {
                staminaBar->SetValue(val);
                staminaBar->SetMaxRange(0, maxVal);
                staminaBar->SetRange(0, maxVal);
            }
        }

        void Reset()
        {
            if (staminaBar)
            {
                screen->RemoveItem(staminaBar);
                staminaBar = nullptr;
            }
        }

        void Loop()
        {
            if (!ogame->GetShowPlayerStatus() || !staminaBar)
                return;

            auto sym = parser->GetSymbol("ATR_STAMINA");
            auto symMax = parser->GetSymbol("ATR_STAMINA_MAX");
            if (!sym || !symMax) return;

            delete valueView;
            valueView = nullptr;

            int stamina = sym->single_intdata;
            int staminaMax = symMax->single_intdata;

            zSTRING text = zSTRING{stamina} + "/" + zSTRING{staminaMax};

            valueView = new zCView(0, 0, 8192, 8192);
            if (staminaBar->range_bar)
            {
                staminaBar->range_bar->InsertItem(valueView);
                int tw = valueView->FontSize(text);
                int th = valueView->FontY();
                int px = (8192 - tw) / 2;
                int py = (8192 - th - 50) / 2;
                zCOLOR color(255, 255, 255, staminaBar->alpha);
                valueView->CreateText(px, py, text, 0, color, 0, 1);
            }
        }

    private:
        zCView* valueView = nullptr;

        bool ShouldHideBar() const
        {
            if (!player) return true;
            if (ogame->IsOnPause()) return true;
            if (!oCInformationManager::GetInformationManager().HasFinished()) return true;
            if (player->inventory2.IsOpen()) return true;
            if (player->GetBodyState() == BS_DIVE) return true;
            return false;
        }
    };

    std::unique_ptr<zCStaminaBar> zStaminaBar;

    // ===============================
    // Game Event Functions
    // ===============================

    void Game_EntryPoint() {}

    void Game_Init()
    {
        zStaminaBar = std::make_unique<zCStaminaBar>();
        PrintConsole("Stamina Bar loaded!");
    }

    void Game_Exit()
    {
        zStaminaBar.reset();
    }

    void Game_PreLoop() {}

    void Game_Loop()
    {
        if (zStaminaBar)
            zStaminaBar->Loop();
    }

    void Game_PostLoop() {}
    void Game_MenuLoop() {}

    void Game_SaveBegin()
    {
        if (zStaminaBar)
            zStaminaBar->Reset();
    }

    void Game_SaveEnd() {}

    void LoadBegin()
    {
        if (zStaminaBar)
            zStaminaBar->Reset();
    }

    void Game_LoadBegin_NewGame()          { LoadBegin(); }
    void Game_LoadEnd_NewGame()            {}
    void Game_LoadBegin_SaveGame()         { LoadBegin(); }
    void Game_LoadEnd_SaveGame()           {}
    void Game_LoadBegin_ChangeLevel()      { LoadBegin(); }
    void Game_LoadEnd_ChangeLevel()        {}
    void Game_LoadBegin_TriggerChangeLevel() {}
    void Game_LoadEnd_TriggerChangeLevel()   {}
    void Game_Pause() {}
    void Game_Unpause() {}
    void Game_DefineExternals() {}
    void Game_ApplySettings() {}

    // ===============================
    // Hooks
    // ===============================

    // UpdatePlayerStatus - updates our bar alongside HP/Mana
    auto Hook_oCGame_UpdatePlayerStatus = ::Union::CreateHook(
        reinterpret_cast<void*>(zSwitch(0x00638F90, 0x0065F4E0, 0x00666640, 0x006C3140)),
        &oCGame::UpdatePlayerStatus_Hook,
        ::Union::HookType::Hook_Detours
    );

    void oCGame::UpdatePlayerStatus_Hook()
    {
        (this->*Hook_oCGame_UpdatePlayerStatus)();
        zStaminaBar->Init();
    }

    // oCGame_Init hook
    void __fastcall oCGame_Init(oCGame* self, void* vtable);
    auto Hook_oCGame_Init = Union::CreateHook(
        reinterpret_cast<void*>(zSwitch(0x00636F50, 0x0065D480, 0x006646D0, 0x006C1060)),
        &oCGame_Init, Union::HookType::Hook_Detours
    );
    void __fastcall oCGame_Init(oCGame* self, void* vtable)
    {
        Hook_oCGame_Init(self, vtable);
        Game_Init();
    }

    // Game_Loop hook
    void __fastcall oCAniCtrl_Human_Loop(oCAniCtrl_Human* self, void* vtable);
    auto Hook_oCAniCtrl_Human_Loop = Union::CreateHook(
        reinterpret_cast<void*>(zSwitch(0x00631110, 0x00657500, 0x0065E690, 0x006BAF00)),
        &oCAniCtrl_Human_Loop, Union::HookType::Hook_Detours
    );
    void __fastcall oCAniCtrl_Human_Loop(oCAniCtrl_Human* self, void* vtable)
    {
        Hook_oCAniCtrl_Human_Loop(self, vtable);
        Game_Loop();
    }

    // Game_SaveBegin hook
    void __fastcall oCGame_WriteSavegame(oCGame* self, void* vtable, int slotNr, int b);
    auto Hook_oCGame_WriteSavegame = Union::CreateHook(
        reinterpret_cast<void*>(zSwitch(0x00639700, 0x0065FCC0, 0x00666F20, 0x006C3C10)),
        &oCGame_WriteSavegame, Union::HookType::Hook_Detours
    );
    void __fastcall oCGame_WriteSavegame(oCGame* self, void* vtable, int slotNr, int b)
    {
        Game_SaveBegin();
        Hook_oCGame_WriteSavegame(self, vtable, slotNr, b);
    }
}
```

---

## Tips and Common Pitfalls

### Texture Requirements
- Your bar texture (e.g. `BAR_STAMINA.TGA`) must be a valid TGA file in the game's `Textures` VDF or in a `.mod` file
- Use the same dimensions as the original bar textures (typically 256x64 or similar) for consistent appearance
- The `BAR_BACK.TGA` and `BAR_TEMPMAX.TGA` are reused from the original game - no need to create new ones

### Memory Management
- `oCViewStatusBar` objects created with `new` are managed by you. Always `Reset()` them on save/load
- The `zCView` objects used for text overlays must be deleted each frame before creating new ones, otherwise you'll leak memory

### Positioning
- The virtual coordinate space is 8192x8192. To convert a percentage to virtual coordinates: `pos = (percentage / 100) * 8192`
- `screen->FontY()` returns the current font height in virtual coordinates - useful for offsetting text
- `screen->FontSize(text)` returns the width of a text string in virtual coordinates

### Compatibility
- Use `zSwitch(G1, G1A, G2, G2A)` for all hook addresses to support multiple engine versions. Use `0` for versions you don't support
- Always check for `nullptr` before accessing `ogame`, `player`, `screen`, or any bar pointer
- Other plugins may modify bar positions - read positions dynamically each frame rather than caching them at init

### Debugging
- If the bar doesn't appear, check that `ogame->GetShowPlayerStatus()` returns `true` (it's `false` in cutscenes and menus)
- If the bar appears but shows no fill, verify that your Daedalus variables (`ATR_STAMINA`, `ATR_STAMINA_MAX`) exist and have non-zero values
- Use `PrintConsole` to log variable values during development

---

## Summary

In this tutorial you learned how to:

- Create an `oCViewStatusBar` instance and add it to the game's HUD
- Position it dynamically relative to the existing HP and Mana bars
- Read Daedalus script variables using `parser->GetSymbol()` to update the bar value
- Control bar visibility based on game state (pause, dialogue, diving)
- Overlay text on the bar using child `zCView` objects
- Clean up properly on save/load to prevent crashes
- Hook `oCGame::UpdatePlayerStatus` to synchronize with the engine's bar update cycle

These patterns can be adapted to create any custom status bar - experience, shield, rage, or any other gameplay mechanic you need to visualize.
