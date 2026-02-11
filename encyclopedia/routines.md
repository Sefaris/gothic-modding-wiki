---
sidebar_position: 1
title: "Daily Routines (TA_)"
description: "Complete list of TA_ functions - NPC daily routines in Gothic II. Description of the schedule system, parameters, and usage examples."
---

# Daily Routines (TA\_)

Daily routines are Daedalus functions prefixed with `TA_` (German _Tagesablauf_ - daily schedule). They define **what an NPC does during a given time slot** - where they go, what activity they perform, and for how long.

All `TA_` functions are defined in `Content/AI/Human/TA.d`, and the corresponding `ZS_` states in `Content/AI/Human/TA_Human/`.

## How the routine system works

Every `TA_` function is a wrapper around the engine function `TA_Min`, which registers an NPC activity for a specific time slot:

```daedalus
func void TA_Sleep(var int start_h, var int start_m, var int stop_h, var int stop_m, var string waypoint)
{
    TA_Min(self, start_h, start_m, stop_h, stop_m, "ZS_GotoBed", waypoint);
};
```

### Parameters

All `TA_` functions share the same signature:

| Parameter  | Type     | Description                                       |
| ---------- | -------- | ------------------------------------------------- |
| `start_h`  | `int`    | Start hour (24h format)                           |
| `start_m`  | `int`    | Start minute                                      |
| `stop_h`   | `int`    | End hour                                          |
| `stop_m`   | `int`    | End minute                                        |
| `waypoint` | `string` | Target waypoint (`WP_`) or freepoint (`FP_`) name |

### Rtn\_ functions (daily schedules)

Routines are assigned to NPCs via the `daily_routine` variable pointing to an `Rtn_` function:

```daedalus
instance Blacksmith(Npc_Default)
{
    name        = "Blacksmith";
    // ...
    daily_routine = Rtn_Start_Blacksmith;
};

func void Rtn_Start_Blacksmith()
{
    TA_Smith_Anvil  (08,00, 12,00, "FORGE_SMITH");
    TA_Stand_Eating (12,00, 13,00, "FP_SMITH_EAT");
    TA_Smith_Anvil  (13,00, 18,00, "FORGE_SMITH");
    TA_Smalltalk    (18,00, 20,00, "FP_SMITH_TALK");
    TA_Sleep        (20,00, 08,00, "BED_SMITH");
};
```

:::tip
A daily schedule should **cover the full 24 hours** without gaps. If the end time of one routine doesn't match the start time of the next, the NPC will stand idle during the gap.
:::

:::warning
The end time of one block must equal the start time of the next block. Blocks **must not overlap**.
:::

### ZS\_ states (Zustand)

Each `TA_` routine references a `ZS_` state (_Zustand_ - state), which consists of three functions:

1. **`ZS_<Name>()`** - **Init**: NPC walks to the waypoint, prepares items, sets perception.
2. **`ZS_<Name>_Loop()`** - **Loop**: Repeated behavior (animations, mob interactions). Returns `LOOP_CONTINUE`.
3. **`ZS_<Name>_End()`** - **End**: Cleanup when the time slot ends.

### Waypoints and freepoints

- **WP\_ (Waypoint)** - a fixed, named point in the game world. The NPC walks exactly to this point.
- **FP\_ (Freepoint)** - a flexible point near a waypoint. Many `ZS_` states automatically search for available freepoints nearby (e.g., `Wld_IsFPAvailable(self, "STAND")`).
- **Mobs** - interactive world objects (e.g., anvil, bed, bench) that the NPC interacts with via `AI_UseMob()`.

---

## Human routine list

### Standing / idle

| Function                 | ZS\_ State               | FP / Mob     | Description                                                                               |
| ------------------------ | ------------------------ | ------------ | ----------------------------------------------------------------------------------------- |
| `TA_Stand_ArmsCrossed`   | `ZS_Stand_ArmsCrossed`   | FP `"STAND"` | Stands with arms crossed. Random idle animations: scratching, stretching, shifting legs.  |
| `TA_Stand_WP`            | `ZS_Stand_WP`            | - (waypoint) | Stands idle **exactly** at the waypoint (no FP search). Arms-crossed pose + idle.         |
| `TA_Stand_Guarding`      | `ZS_Stand_Guarding`      | FP `"STAND"` | Stands on guard - hands on hips, randomly looks around.                                   |
| `TA_Stand_Sweeping`      | `ZS_Stand_Sweeping`      | FP `"SWEEP"` | Stands and sweeps with a broom. Creates `ItMi_Broom` if not owned.                        |
| `TA_Stand_Dementor`      | `ZS_Stand_Dementor`      | FP `"STAND"` | Dementor (Seeker) pose. Non-standard perception - senses like a monster.                  |
| `TA_Stand_RangerMeeting` | `ZS_Stand_RangerMeeting` | FP `"STAND"` | Ranger meeting. Minimal perception. Lares stands in guard pose, others with arms crossed. |

### Drinking

| Function            | ZS\_ State          | FP / Mob     | Description                                                                                    |
| ------------------- | ------------------- | ------------ | ---------------------------------------------------------------------------------------------- |
| `TA_Stand_Drinking` | `ZS_Stand_Drinking` | FP `"STAND"` | Stands and drinks booze (`ItFo_Booze`). Creates item if not owned. Random drinking animations. |

### Eating

| Function          | ZS\_ State        | FP / Mob     | Description                                                                                       |
| ----------------- | ----------------- | ------------ | ------------------------------------------------------------------------------------------------- |
| `TA_Stand_Eating` | `ZS_Stand_Eating` | FP `"STAND"` | Stands and eats a random food (apple, cheese, bacon, or mutton). Animation matches the food type. |

### Sitting

| Function          | ZS\_ State        | FP / Mob        | Description                                          |
| ----------------- | ----------------- | --------------- | ---------------------------------------------------- |
| `TA_Sit_Bench`    | `ZS_Sit_Bench`    | Mob `"BENCH"`   | Sits on a bench. Random sitting idle animations.     |
| `TA_Sit_Campfire` | `ZS_Sit_Campfire` | FP `"CAMPFIRE"` | Sits on the ground at a campfire (no mob - uses FP). |
| `TA_Sit_Chair`    | `ZS_Sit_Chair`    | Mob `"CHAIR"`   | Sits on a chair. Random sitting idle animations.     |
| `TA_Sit_Throne`   | `ZS_Sit_Throne`   | Mob `"THRONE"`  | Sits on a throne.                                    |

### Sleeping

| Function        | ZS\_ State      | FP / Mob        | Description                                                                                       |
| --------------- | --------------- | --------------- | ------------------------------------------------------------------------------------------------- |
| `TA_Sleep`      | `ZS_GotoBed`    | Mob `"BEDHIGH"` | Goes to bed and sleeps. Limited perception - reacts to quiet sounds, damage, and talk (wakes up). |
| `TA_Sleep_Deep` | `ZS_Sleep_Deep` | Mob `"BEDHIGH"` | Deep sleep - does **not** react to quiet sounds. Only damage and talk can wake the NPC.           |

### Cooking

| Function             | ZS\_ State           | FP / Mob         | Description                                                            |
| -------------------- | -------------------- | ---------------- | ---------------------------------------------------------------------- |
| `TA_Cook_Cauldron`   | `ZS_Cook_Cauldron`   | Mob `"CAULDRON"` | Cooks in a cauldron. Creates `ItMi_Scoop` (ladle) if not owned.        |
| `TA_Cook_Pan`        | `ZS_Cook_Pan`        | Mob `"PAN"`      | Cooks in a pan. Creates raw mutton; eats cooked mutton when finishing. |
| `TA_Cook_Stove`      | `ZS_Cook_Stove`      | Mob `"STOVE"`    | Cooks on a stove. Creates raw mutton if not owned.                     |
| `TA_Roast_Scavenger` | `ZS_Roast_Scavenger` | Mob `"BARBQ"`    | Roasts a scavenger on a spit.                                          |

### Smithing / crafting

| Function            | ZS\_ State          | FP / Mob        | Description                                                           |
| ------------------- | ------------------- | --------------- | --------------------------------------------------------------------- |
| `TA_Smith_Anvil`    | `ZS_Smith_Anvil`    | Mob `"BSANVIL"` | Hammers on an anvil.                                                  |
| `TA_Smith_Cool`     | `ZS_Smith_Cool`     | Mob `"BSCOOL"`  | Cools metal in a water trough.                                        |
| `TA_Smith_Fire`     | `ZS_Smith_Fire`     | Mob `"BSFIRE"`  | Heats metal at the forge fire.                                        |
| `TA_Smith_Sharp`    | `ZS_Smith_Sharp`    | Mob `"BSSHARP"` | Sharpens a weapon on a grindstone.                                    |
| `TA_Make_Rune`      | `ZS_Make_Rune`      | -               | Creates runes at a rune table.                                        |
| `TA_Potion_Alchemy` | `ZS_Potion_Alchemy` | Mob `"LAB"`     | Brews potions at an alchemy table. Creates `ItMi_Flask` if not owned. |

### Physical labor

| Function        | ZS\_ State      | FP / Mob          | Description                                                                       |
| --------------- | --------------- | ----------------- | --------------------------------------------------------------------------------- |
| `TA_Pick_FP`    | `ZS_Pick_FP`    | FP `"PICK"`       | Picks / digs - moves between `PICK` freepoints, changes position every ~7s.       |
| `TA_Pick_Ore`   | `ZS_Pick_Ore`   | Mob `"ORE"`       | Mines ore. Creates and equips a two-handed axe (`ItMw_2h_Axe_L_01`) if not owned. |
| `TA_Repair_Hut` | `ZS_Repair_Hut` | Mob `"REPAIR"`    | Repairs a hut - hammers nails. Random repair animation.                           |
| `TA_Sweep_FP`   | `ZS_Sweep_FP`   | FP `"SWEEP"`      | Scrubs with a brush (`ItMi_Brush`) at a freepoint.                                |
| `TA_Wash_FP`    | `ZS_Wash_FP`    | FP `"WASH"`       | Washes / does laundry at a freepoint. Kneeling wash animation.                    |
| `TA_Rake_FP`    | `ZS_Rake_FP`    | FP `"PICK"`       | Rakes with a rake (`ItMi_Rake`) at a freepoint.                                   |
| `TA_Saw`        | `ZS_Saw`        | Mob `"BAUMSAEGE"` | Saws wood on a tree saw.                                                          |
| `TA_Stomp_Herb` | `ZS_Stomp_Herb` | Mob `"HERB"`      | Stomps herbs - alchemy preparation.                                               |

### Study / writing

| Function            | ZS\_ State          | FP / Mob     | Description                                                                                    |
| ------------------- | ------------------- | ------------ | ---------------------------------------------------------------------------------------------- |
| `TA_Read_Bookstand` | `ZS_Read_Bookstand` | Mob `"BOOK"` | Reads at a bookstand.                                                                          |
| `TA_Study_WP`       | `ZS_Study_WP`       | - (waypoint) | Studies at a waypoint - stands with arms crossed and reads a fake scroll (`FakeScroll_Addon`). |

### Social / communication

| Function       | ZS\_ State     | FP / Mob         | Description                                                                    |
| -------------- | -------------- | ---------------- | ------------------------------------------------------------------------------ |
| `TA_Smalltalk` | `ZS_Smalltalk` | FP `"SMALLTALK"` | Stands at a freepoint and every ~8s chats with a nearby NPC in the same state. |

### Prayer

| Function             | ZS\_ State           | FP / Mob      | Description                                        |
| -------------------- | -------------------- | ------------- | -------------------------------------------------- |
| `TA_Pray_Innos`      | `ZS_Pray_Innos`      | Mob `"INNOS"` | Prays to Innos at an altar (mob interaction).      |
| `TA_Pray_Innos_FP`   | `ZS_Pray_Innos_FP`   | FP `"PRAY"`   | Kneels and prays to Innos at a freepoint.          |
| `TA_Pray_Sleeper`    | `ZS_Pray_Sleeper`    | Mob `"IDOL"`  | Prays to the Sleeper at an idol (mob interaction). |
| `TA_Pray_Sleeper_FP` | `ZS_Pray_Sleeper_FP` | FP `"PRAY"`   | Kneels and prays to the Sleeper at a freepoint.    |

### Speeches

| Function             | ZS\_ State           | FP / Mob | Description                                                                        |
| -------------------- | -------------------- | -------- | ---------------------------------------------------------------------------------- |
| `TA_Preach_Vatras`   | `ZS_Preach_Vatras`   | -        | Delivers Vatras-style sermons. Cycles through 21 sermons, changing every ~13s.     |
| `TA_Announce_Herold` | `ZS_Announce_Herold` | -        | Herald makes announcements. Every ~70s interrupts guard pose to deliver a message. |

### Movement

| Function           | ZS\_ State         | FP / Mob     | Description                                                                                       |
| ------------------ | ------------------ | ------------ | ------------------------------------------------------------------------------------------------- |
| `TA_RunToWP`       | `ZS_RunToWP`       | -            | **Runs** to a waypoint, then stands in guard pose looking around.                                 |
| `TA_FleeToWp`      | `ZS_FleeToWp`      | -            | **Flees** to a waypoint (running + `HUMANS_FLEE.MDS` animation overlay).                          |
| `TA_Follow_Player` | `ZS_Follow_Player` | -            | Follows the player.                                                                               |
| `TA_Guide_Player`  | `ZS_Guide_Player`  | -            | Guides the player to a destination.                                                               |
| `TA_Guard_Passage` | `ZS_Guard_Passage` | -            | Guards a passage - blocks the player's path. Perception every 0.1s.                               |
| `TA_Guard_Hammer`  | `ZS_Guard_Hammer`  | FP `"STAND"` | Stands on guard. Handles the quest Holy Hammer - returns it to the monastery if near the sanctum. |
| `TA_Circle`        | `ZS_Circle`        | -            | Ritual circle magic. Effects depend on guild (dementor / KDW / mage).                             |

### Music / performances

| Function       | ZS\_ State     | FP / Mob     | Description                                                            |
| -------------- | -------------- | ------------ | ---------------------------------------------------------------------- |
| `TA_Play_Lute` | `ZS_Play_Lute` | FP `"STAND"` | Plays a lute. Creates `ItMi_Lute` if not owned.                        |
| `TA_Concert`   | `ZS_Concert`   | -            | In Extremo band concert. Each band member equips their instrument.     |
| `TA_Dance`     | `ZS_Dance`     | -            | Dances a random style (9 variants: `T_DANCE_01` through `T_DANCE_09`). |
| `TA_Spit_Fire` | `ZS_Spit_Fire` | FP `"STAND"` | Fire breathing (fire-eater). Creates `ItLsTorchFireSpit` if not owned. |

### Training

| Function            | ZS\_ State          | FP / Mob     | Description                                                                                        |
| ------------------- | ------------------- | ------------ | -------------------------------------------------------------------------------------------------- |
| `TA_Practice_Magic` | `ZS_Practice_Magic` | FP `"STAND"` | Practices magic. Random animations: `T_PRACTICEMAGIC` through `T_PRACTICEMAGIC4`, `R_SCRATCHHEAD`. |
| `TA_Practice_Sword` | `ZS_Practice_Sword` | -            | Practices swordfighting. Equips best melee weapon; if none - creates `ItMw_1h_Bau_Mace`.           |

### Smoking

| Function             | ZS\_ State           | FP / Mob      | Description                                                    |
| -------------------- | -------------------- | ------------- | -------------------------------------------------------------- |
| `TA_Smoke_Joint`     | `ZS_Smoke_Joint`     | FP `"STAND"`  | Smokes a joint (swampweed). Creates `ItMi_Joint` if not owned. |
| `TA_Smoke_Waterpipe` | `ZS_Smoke_Waterpipe` | Mob `"SMOKE"` | Smokes a waterpipe.                                            |

### Miscellaneous

| Function        | ZS\_ State      | FP / Mob       | Description                                                      |
| --------------- | --------------- | -------------- | ---------------------------------------------------------------- |
| `TA_Pee`        | `ZS_Pee`        | FP `"PEE"`     | Relieves themselves.                                             |
| `TA_Ghost`      | `ZS_Ghost`      | -              | Ghost behavior - non-standard perception (only talk and damage). |
| `TA_GhostWusel` | `ZS_GhostWusel` | FP `"FP_ROAM"` | Wandering ghost - moves between freepoints.                      |

---

## Monster routines

Monsters use simpler routines managed by the central scheduler `ZS_MM_AllScheduler`, which routes the monster to the appropriate state based on the time of day.

| Function          | ZS\_ State        | FP          | Description                                                                                          |
| ----------------- | ----------------- | ----------- | ---------------------------------------------------------------------------------------------------- |
| `TA_Roam`         | `ZS_MM_Rtn_Roam`  | `"FP_ROAM"` | Monster roams between `FP_ROAM` freepoints. Random wait time (0–5s) at each point.                   |
| `TA_Rest`         | `ZS_MM_Rtn_Rest`  | `"FP_ROAM"` | Monster rests - stands in place with random idle animations.                                         |
| `TA_SleepMonster` | `ZS_MM_Rtn_Sleep` | `"FP_ROAM"` | Monster sleeps (lies down). Limited perception - quiet sounds from hostile guilds wake it to combat. |
| `TA_Wusel`        | `ZS_MM_Rtn_Wusel` | `"FP_ROAM"` | Monster **runs** restlessly between freepoints (changes point every 1s).                             |

### Special monster routines

| Function                | ZS\_ State              | Description                                                                           |
| ----------------------- | ----------------------- | ------------------------------------------------------------------------------------- |
| `TA_MM_Rtn_EatGround`   | `ZS_MM_Rtn_EatGround`   | Monster eats from the ground - random head-lifting animations while eating.           |
| `TA_MM_Rtn_DragonRest`  | `ZS_MM_Rtn_DragonRest`  | Dragon rests - **regenerates HP** (1 HP every 2 ticks) if it's a dragon.              |
| `TA_MM_Rtn_FollowSheep` | `ZS_MM_Rtn_FollowSheep` | Sheep (or animal) follows the hero if it's a party member.                            |
| `TA_MM_Rtn_OrcSit`      | `ZS_MM_Rtn_OrcSit`      | Orc sits at a campfire (FP `"FP_CAMPFIRE"`) in a guard-sleep pose.                    |
| `TA_MM_Rtn_Summoned`    | `ZS_MM_Rtn_Summoned`    | Summoned creature - follows the hero, has a limited lifetime (`MONSTER_SUMMON_TIME`). |

---

## Mobs - interactive object reference

Routines that use mobs require the corresponding interactive object to be placed near the waypoint.

| Mob Name    | Used By                     |
| ----------- | --------------------------- |
| `BSANVIL`   | `TA_Smith_Anvil`            |
| `BSCOOL`    | `TA_Smith_Cool`             |
| `BSFIRE`    | `TA_Smith_Fire`             |
| `BSSHARP`   | `TA_Smith_Sharp`            |
| `BARBQ`     | `TA_Roast_Scavenger`        |
| `BAUMSAEGE` | `TA_Saw`                    |
| `BEDHIGH`   | `TA_Sleep`, `TA_Sleep_Deep` |
| `BENCH`     | `TA_Sit_Bench`              |
| `BOOK`      | `TA_Read_Bookstand`         |
| `CAULDRON`  | `TA_Cook_Cauldron`          |
| `CHAIR`     | `TA_Sit_Chair`              |
| `HERB`      | `TA_Stomp_Herb`             |
| `IDOL`      | `TA_Pray_Sleeper`           |
| `INNOS`     | `TA_Pray_Innos`             |
| `LAB`       | `TA_Potion_Alchemy`         |
| `ORE`       | `TA_Pick_Ore`               |
| `PAN`       | `TA_Cook_Pan`               |
| `REPAIR`    | `TA_Repair_Hut`             |
| `SMOKE`     | `TA_Smoke_Waterpipe`        |
| `STOVE`     | `TA_Cook_Stove`             |
| `THRONE`    | `TA_Sit_Throne`             |

## Freepoints - type reference

| FP Type       | Used By                                                                                                                                                                         |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `CAMPFIRE`    | `TA_Sit_Campfire`                                                                                                                                                               |
| `FP_CAMPFIRE` | `TA_MM_Rtn_OrcSit`                                                                                                                                                              |
| `FP_ROAM`     | `TA_GhostWusel`, `TA_Roam`, `TA_Rest`, `TA_SleepMonster`, `TA_Wusel` and other monster routines                                                                                 |
| `PEE`         | `TA_Pee`                                                                                                                                                                        |
| `PICK`        | `TA_Pick_FP`, `TA_Rake_FP`                                                                                                                                                      |
| `PRAY`        | `TA_Pray_Innos_FP`, `TA_Pray_Sleeper_FP`                                                                                                                                        |
| `SMALLTALK`   | `TA_Smalltalk`                                                                                                                                                                  |
| `STAND`       | `TA_Stand_ArmsCrossed`, `TA_Stand_Guarding`, `TA_Stand_Drinking`, `TA_Stand_Eating`, `TA_Stand_Dementor`, `TA_Play_Lute`, `TA_Practice_Magic`, `TA_Smoke_Joint`, `TA_Spit_Fire` |
| `SWEEP`       | `TA_Stand_Sweeping`, `TA_Sweep_FP`                                                                                                                                              |
| `WASH`        | `TA_Wash_FP`                                                                                                                                                                    |

---

## Complete daily schedule example

```daedalus
// City blacksmith - full day
func void Rtn_Start_CitySmith()
{
    TA_Sleep           (22,00, 06,00, "BED_SMITH_01");
    TA_Stand_Eating    (06,00, 07,00, "FP_SMITH_EAT");
    TA_Smith_Fire      (07,00, 08,00, "FORGE_SMITH_01");
    TA_Smith_Anvil     (08,00, 12,00, "FORGE_SMITH_01");
    TA_Smith_Cool      (12,00, 12,30, "FORGE_SMITH_01");
    TA_Stand_Eating    (12,30, 13,00, "FP_SMITH_EAT");
    TA_Smith_Anvil     (13,00, 17,00, "FORGE_SMITH_01");
    TA_Smith_Sharp     (17,00, 18,00, "FORGE_SMITH_01");
    TA_Smalltalk       (18,00, 20,00, "FP_SMITH_TALK");
    TA_Stand_Drinking  (20,00, 22,00, "FP_TAVERN_SMITH");
};
```

:::info
`TA_` functions called inside an `Rtn_` function don't need to be in chronological order - the engine sorts the time blocks automatically. However, keeping them in order is recommended for code readability.
:::

## Changing routines at runtime

You can dynamically change an NPC's daily schedule using `Npc_ExchangeRoutine`:

```daedalus
// Changes the NPC's routine to a new schedule
Npc_ExchangeRoutine(self, "NIGHT_GUARD");
```

This requires a corresponding `Rtn_NightGuard_<NPC_ID>()` function to be defined.

To revert to the default routine:

```daedalus
// Restores the default daily schedule
Npc_ExchangeRoutine(self, "START");
```
