---
sidebar_position: 2
title: "Animations"
description: "Complete list of animations in Gothic II — MDS overlays, state transitions, character and monster animations."
---

# Animations

Animations in Gothic II are played using Daedalus engine functions. They are divided into several categories based on naming conventions and usage patterns.

## Naming conventions

| Prefix | Type       | Description                                                                                 |
| ------ | ---------- | ------------------------------------------------------------------------------------------- |
| `T_`   | Transition | Transition animation — a one-shot transition between two states (e.g., standing → sitting). |
| `S_`   | State      | State animation — a looping animation for an ongoing state (e.g., eating, lying down).      |
| `R_`   | Random     | Random animation — played randomly as an idle (e.g., head scratching, shifting weight).     |

## Animation playback functions

| Function                                           | Description                                                                           |
| -------------------------------------------------- | ------------------------------------------------------------------------------------- |
| `AI_PlayAni(self, "NAME")`                         | Plays an animation once. The NPC must be in the appropriate base state.               |
| `AI_PlayAniBS(self, "NAME", BS_STATE)`             | Plays an animation and changes the NPC's body state (e.g., `BS_SIT`, `BS_LIE`).       |
| `Mdl_ApplyOverlayMds(self, "FILE.MDS")`            | Applies an animation overlay — changes the NPC's animation set (e.g., walk, posture). |
| `Mdl_RemoveOverlayMds(self, "FILE.MDS")`           | Removes an applied overlay.                                                           |
| `Mdl_ApplyOverlayMdsTimed(self, "FILE.MDS", time)` | Applies an overlay for a specified duration (ms).                                     |
| `Mdl_ApplyRandomAni(self, "BASE", "RANDOM")`       | Registers a random animation to play during a given base state.                       |
| `Mdl_ApplyRandomAniFreq(self, "BASE", freq)`       | Sets the frequency (in seconds) for random animation playback.                        |
| `Mdl_StartFaceAni(self, "NAME", intensity, time)`  | Plays a facial animation (expression). Time `-1` = infinite.                          |

### Body States

The `AI_PlayAniBS` function requires a body state parameter:

| Constant                   | Description                         |
| -------------------------- | ----------------------------------- |
| `BS_STAND`                 | Standing                            |
| `BS_SIT`                   | Sitting                             |
| `BS_LIE`                   | Lying down                          |
| `BS_UNCONSCIOUS`           | Unconscious                         |
| `BS_ITEMINTERACT`          | Item interaction (eating, drinking) |
| `BS_MOBINTERACT_INTERRUPT` | Mob interaction interrupt           |

---

## MDS Overlays

Overlays change an NPC's animation set — they affect walking, posture, and behavior. Applied via `Mdl_ApplyOverlayMds` in NPC definitions.

### Personality overlays

| MDS File               | Description                      | Used For                                                |
| ---------------------- | -------------------------------- | ------------------------------------------------------- |
| `Humans_Relaxed.mds`   | Relaxed posture, casual walk     | Bandits, mercenaries, pirates, villagers                |
| `Humans_Militia.mds`   | Military posture, confident walk | Paladins, militia, guards, fighters                     |
| `Humans_Mage.mds`      | Mage posture, slow walk          | Fire mages (KDF), water mages (KDW), dementors, novices |
| `Humans_Arrogance.mds` | Arrogant posture                 | Nobles, merchants, some bandits (Raven, Bullco)         |
| `Humans_Tired.mds`     | Exhausted posture, slouched walk | Prisoners, workers, some villagers                      |
| `Humans_Babe.mds`      | Female walk and posture          | Female NPCs (citizens, prostitutes)                     |

### Movement overlays

| MDS File            | Description                    | Application Method                             |
| ------------------- | ------------------------------ | ---------------------------------------------- |
| `HUMANS_FLEE.MDS`   | Frightened run (fleeing)       | `Mdl_ApplyOverlayMds` / `Mdl_RemoveOverlayMds` |
| `HUMANS_SPRINT.MDS` | Sprint (temporary speed boost) | `Mdl_ApplyOverlayMdsTimed` (with timeout)      |

### Skeleton overlays

| MDS File                  | Description                       |
| ------------------------- | --------------------------------- |
| `humans_skeleton.mds`     | Base overlay for skeletons        |
| `humans_skeleton_fly.mds` | Flying skeleton mage              |
| `humans_1hST1.mds`        | Fighting style: one-handed sword  |
| `humans_2hST2.mds`        | Fighting style: two-handed weapon |
| `humans_BowT1.mds`        | Fighting style: bow               |
| `humans_CBowT1.mds`       | Fighting style: crossbow          |

### Monster overlays

| MDS File              | Description                           |
| --------------------- | ------------------------------------- |
| `Golem_Firegolem.mds` | Fire golem (overlay on base golem)    |
| `Golem_Icegolem.mds`  | Ice golem (overlay on base golem)     |
| `Firewaran.mds`       | Fire waran (overlay on base waran)    |
| `Orcbiter.mds`        | Orc biter (overlay on base scavenger) |

---

## Base visual models (Mdl_SetVisual)

Every NPC or monster has an assigned base `.mds` file defining its model and animation set.

### Humans

| MDS File     | Description                             |
| ------------ | --------------------------------------- |
| `HUMANS.MDS` | All human NPCs and the player character |

### Monsters

| MDS File            | Creature                                       |
| ------------------- | ---------------------------------------------- |
| `Alligator.mds`     | Alligator                                      |
| `Blattcrawler.mds`  | Leaf crawler                                   |
| `Bloodfly.mds`      | Bloodfly                                       |
| `Crawler.mds`       | Minecrawler, Minecrawler Warrior               |
| `Demon.mds`         | Demon, Demon Lord                              |
| `Draconian.mds`     | Draconian                                      |
| `Dragon.mds`        | All dragons (Fire, Ice, Rock, Swamp, Undead)   |
| `DragonSnapper.mds` | Dragon Snapper                                 |
| `FireShadow.mds`    | Fire Shadowbeast                               |
| `Giant_Bug.mds`     | Giant Bug                                      |
| `Giant_Rat.mds`     | Giant Rat, Giant Desert Rat                    |
| `Gobbo.mds`         | Goblin (Green, Black, Skeleton, Warrior)       |
| `Golem.mds`         | Stone Golem (base)                             |
| `Harpie.mds`        | Harpy                                          |
| `Irrlicht.mds`      | Wisp                                           |
| `Keiler.mds`        | Boar                                           |
| `Lurker.mds`        | Lurker                                         |
| `Meatbug.mds`       | Meatbug                                        |
| `Molerat.mds`       | Molerat                                        |
| `Orc.mds`           | Orc Elite, Orc Shaman, Orc Warrior, Undead Orc |
| `Razor.mds`         | Razor                                          |
| `Scavenger.mds`     | Scavenger                                      |
| `ScavengerGL.mds`   | Scavenger Demon                                |
| `Shadow.mds`        | Shadowbeast, Shadowbeast Skeleton, Bloodhound  |
| `Sheep.mds`         | Sheep, Ram                                     |
| `Snapper.mds`       | Snapper                                        |
| `StoneGuardian.mds` | Stone Guardian                                 |
| `StonePuma.mds`     | Stone Puma                                     |
| `SwampDrone.mds`    | Swamp Drone                                    |
| `SwampGolem.mds`    | Swamp Golem                                    |
| `Swamprat.mds`      | Swamp Rat                                      |
| `Swampshark.mds`    | Swampshark                                     |
| `SwampZombie.mds`   | Swamp Zombie                                   |
| `Swarm.mds`         | Swarm                                          |
| `Troll.mds`         | Troll, Black Troll                             |
| `Waran.mds`         | Waran (base)                                   |
| `Wolf.mds`          | Wolf, Warg, Ice Wolf                           |
| `Zombie.mds`        | Zombie, Mud creature                           |

---

## Transition animations (T\_)

One-shot animations that play a transition between two NPC states.

### Guard positions

| Animation             | Description                           |
| --------------------- | ------------------------------------- |
| `T_STAND_2_HGUARD`    | Standing → guard pose (hands on hips) |
| `T_HGUARD_2_STAND`    | Guard pose → standing                 |
| `T_HGUARD_LOOKAROUND` | Looking around in guard pose          |
| `T_STAND_2_LGUARD`    | Standing → arms crossed               |
| `T_LGUARD_2_STAND`    | Arms crossed → standing               |
| `T_LGUARD_SCRATCH`    | Scratching (arms-crossed idle)        |
| `T_LGUARD_STRETCH`    | Stretching (arms-crossed idle)        |
| `T_LGUARD_CHANGELEG`  | Shifting weight (arms-crossed idle)   |

### Sitting

| Animation              | Description                         |
| ---------------------- | ----------------------------------- |
| `T_STAND_2_SIT`        | Standing → sitting on the ground    |
| `T_SIT_2_STAND`        | Sitting on the ground → standing    |
| `T_STAND_2_GUARDSLEEP` | Standing → guard-sleep sitting pose |
| `T_GUARDSLEEP_2_STAND` | Guard-sleep → standing              |

### Prayer

| Animation        | Description                             |
| ---------------- | --------------------------------------- |
| `T_STAND_2_PRAY` | Standing → kneeling/praying             |
| `T_PRAY_2_STAND` | Praying → standing                      |
| `T_PRAY_RANDOM`  | Random prayer animation (kneeling idle) |

### Sleeping

| Animation         | Description                      |
| ----------------- | -------------------------------- |
| `T_STAND_2_SLEEP` | Standing → lying down (monsters) |
| `T_SLEEP_2_STAND` | Lying down → standing (monsters) |
| `T_REST_2_STAND`  | Resting → standing (dragons)     |

### Eating / drinking / smoking

| Animation             | Description                                  |
| --------------------- | -------------------------------------------- |
| `T_STAND_2_EAT`       | Standing → eating from the ground (monsters) |
| `T_EAT_2_STAND`       | Eating from the ground → standing (monsters) |
| `T_FOOD_RANDOM_1`     | Eating small food (apple) — variant 1        |
| `T_FOOD_RANDOM_2`     | Eating small food (apple) — variant 2        |
| `T_FOODHUGE_RANDOM_1` | Eating large food (cheese)                   |
| `T_MEAT_RANDOM_1`     | Eating meat (bacon, mutton)                  |
| `T_POTION_RANDOM_1`   | Drinking — variant 1                         |
| `T_POTION_RANDOM_2`   | Drinking — variant 2                         |
| `T_POTION_RANDOM_3`   | Drinking — variant 3                         |
| `T_JOINT_RANDOM_1`    | Smoking a joint                              |

### Dance

| Animation    | Description   |
| ------------ | ------------- |
| `T_DANCE_01` | Dance style 1 |
| `T_DANCE_02` | Dance style 2 |
| `T_DANCE_03` | Dance style 3 |
| `T_DANCE_04` | Dance style 4 |
| `T_DANCE_05` | Dance style 5 |
| `T_DANCE_06` | Dance style 6 |
| `T_DANCE_07` | Dance style 7 |
| `T_DANCE_08` | Dance style 8 |
| `T_DANCE_09` | Dance style 9 |

### Conversation / interactions

| Animation           | Description                           |
| ------------------- | ------------------------------------- |
| `T_STAND_2_TALK`    | Standing → talking pose               |
| `T_TALK_2_STAND`    | Talking pose → standing               |
| `T_YES`             | Nodding (yes)                         |
| `T_DONTKNOW`        | "I don't know" gesture                |
| `T_WATCHFIGHT_OHNO` | Fight spectator reaction — dismay     |
| `T_WATCHFIGHT_YEAH` | Fight spectator reaction — excitement |

### Bodily actions / labor

| Animation           | Description                |
| ------------------- | -------------------------- |
| `T_STAND_2_PEE`     | Standing → urinating       |
| `T_PEE_2_STAND`     | Urinating → standing       |
| `T_STAND_2_WASH`    | Standing → washing/laundry |
| `T_WASH_2_STAND`    | Washing → standing         |
| `T_PLUNDER`         | Looting / picking up       |
| `T_SEARCH`          | Searching for something    |
| `T_1HSFREE`         | One-handed sword practice  |
| `T_REPAIR_RANDOM_1` | Random repair animation    |

### Magic / practice

| Animation          | Description                                |
| ------------------ | ------------------------------------------ |
| `T_PRACTICEMAGIC`  | Magic practice — variant 1                 |
| `T_PRACTICEMAGIC2` | Magic practice — variant 2                 |
| `T_PRACTICEMAGIC3` | Magic practice — variant 3                 |
| `T_PRACTICEMAGIC4` | Magic practice — variant 4                 |
| `T_PRACTICEMAGIC5` | Magic practice — variant 5 (circle ritual) |

### Hit reactions / combat

| Animation             | Description                       |
| --------------------- | --------------------------------- |
| `T_MAGRUN_2_HEASHOOT` | Run → headshot (falling down)     |
| `T_HEASHOOT_2_STAND`  | Headshot → getting up             |
| `T_DEAD`              | Death (collapse)                  |
| `T_RISE`              | Rising from the dead              |
| `T_DOWN`              | Falling to the ground             |
| `T_WARN`              | Warning / threatening (monsters)  |
| `T_PERCEPTION`        | Perception / listening (monsters) |

### Spell victim animations

| Animation                         | Spell                       |
| --------------------------------- | --------------------------- |
| `T_STAND_2_LIGHTNING_VICTIM`      | Lightning strike            |
| `T_STAND_2_SUCKENERGY_VICTIM`     | Energy drain                |
| `T_STAND_2_FREEZE_VICTIM`         | Freeze                      |
| `T_STAND_2_GREENTENTACLEA_VICTIM` | Green tentacles — variant A |
| `T_STAND_2_GREENTENTACLEB_VICTIM` | Green tentacles — variant B |
| `T_STAND_2_GREENTENTACLEC_VICTIM` | Green tentacles — variant C |
| `T_STAND_2_INFLATE_VICTIM`        | Inflate                     |
| `T_STAND_2_WHIRLWIND_VICTIM`      | Whirlwind                   |
| `T_STAND_2_SWARM_VICTIM`          | Swarm attack                |
| `T_STAND_2_VICTIM_SLE`            | Magic sleep                 |
| `T_VICTIM_SLE_2_STAND`            | Magic sleep → waking up     |
| `T_STAND_2_FEAR_VICTIM1`          | Magic fear — variant 1      |
| `T_STAND_2_FEAR_VICTIM2`          | Magic fear — variant 2      |
| `T_STAND_2_FEAR_VICTIM3`          | Magic fear — variant 3      |

---

## State animations (S\_)

Looping animations that keep the NPC in a given state.

| Animation       | Description                                 |
| --------------- | ------------------------------------------- |
| `S_EAT`         | Eating from the ground (monsters — looping) |
| `S_FIRE_VICTIM` | Burning (fire victim)                       |

---

## Random animations (R\_)

Played randomly as idle — they bring NPCs and monsters to life.

### Monsters

| Animation | Description                                                 |
| --------- | ----------------------------------------------------------- |
| `R_ROAM1` | Random movement — variant 1 (looking around, head movement) |
| `R_ROAM2` | Random movement — variant 2                                 |
| `R_ROAM3` | Random movement — variant 3                                 |

### Humans — standing

| Animation       | Description     |
| --------------- | --------------- |
| `R_SCRATCHHEAD` | Head scratching |

### Humans — sitting

| Animation          | Description                             |
| ------------------ | --------------------------------------- |
| `R_CHAIR_RANDOM_1` | Random chair/bench movement — variant 1 |
| `R_CHAIR_RANDOM_2` | Random chair/bench movement — variant 2 |
| `R_CHAIR_RANDOM_3` | Random chair/bench movement — variant 3 |
| `R_CHAIR_RANDOM_4` | Random chair/bench movement — variant 4 |

---

## Facial animations

NPC facial expressions played via `Mdl_StartFaceAni`:

| Animation   | Description               |
| ----------- | ------------------------- |
| `S_ANGRY`   | Angry facial expression   |
| `S_NEUTRAL` | Neutral facial expression |

:::info
Facial animations take an intensity parameter (0.0–1.0) and a duration in milliseconds. A value of `-1` means infinite — the animation persists until manually removed or the state changes.
:::
