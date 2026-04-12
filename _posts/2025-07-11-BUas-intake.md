---
layout: post
title: "Buas intake"
date: 2024-01-01
toc: false
---

<center>
<figure style="text-align: center;">
    <video controls style="border: 1px white solid; max-width: 100%;">
        <source src="/assets/vids/playing.mp4" type="video/mp4"/>
    </video>
    <figcaption><em>doodle jumping</em></figcaption>
</figure>
</center>


## About the Project
My intake assignment for BUas, built before starting the programme. Coming from a background entirely in Unity, this was my first time writing C++. The brief was a game around the theme of "bounce". I built a Doodle Jump-style endless platformer with procedural level generation, object pooling, and a hand-rolled component system.
**Team:** Solo  
**Engine:** Custom template (provided by BUas)  
**Source code:** [GitHub](https://github.com/ChadJoey/BuasIntake) 


---
## Component System

Rather than putting all logic into a single class, I structured the game around entities and components from the start. Each game object holds a list of components and gets its behaviour from whichever ones are attached:

```cpp
player.AddComponent(new TransformComponent(cameraControl));
player.AddComponent(new SpriteComponent(new Surface("assets/doodle/space-doodles.png"), 12));
player.AddComponent(new ColliderComponent(player));
player.AddComponent(new PlayerComponent(sound));
```

The same pattern applies to platforms, breaking platforms, and enemies. This made it straightforward to add new object types by composing existing components rather than duplicating logic, and it meant update and render loops could be written generically against the entity rather than per object type.

---
## Object Pooling

Rather than creating and destroying platforms and enemies as they scroll in and out of view, the game uses a fixed pool of pre-allocated entities. The `ObstacleManager` tracks which objects are active and repositions them above the last active object when they scroll off the bottom of the screen:

```cpp
void ObstacleManager::UpdateObjects()
{
    for (auto& p : ObjectList)
    {
        if (!p.isActive) continue;

        auto* t = p.GetComponent();
        if (t->GetPosition().y >= ScreenHeight)
        {
            if (p.GetComponent())
                p.GetComponent()->Reset();

            MoveObstacle(p,
                { 0, lastActiveObject->GetScreenPos().y - minObjectDist },
                { ScreenWidth - 60, lastActiveObject->GetScreenPos().y - maxObjectDist });
        }
    }
}
```

The density setting controls how many objects from the pool are active at any one time. If the active count drops below the target, the manager enables more objects from the pool and places them. If it exceeds the target, the next repositioned object is deactivated instead:

```cpp
bool ObstacleManager::IncreaseCheck()
{
    return ActiveAmount(ObjectList) <= ObjectDensity;
}

bool ObstacleManager::DecreaseCheck()
{
    return ActiveAmount(ObjectList) > ObjectDensity;
}
```

Three separate managers handle platforms, breaking platforms, and enemies independently, each with its own pool and density parameters.

---
## Level Generation

The game has three level configurations, each defining density and vertical spacing parameters for all three object types. Every 3000 units of height climbed, the game cycles to the next level and passes the new parameters to the managers:

<center>
<figure style="text-align: center;">
    <video controls style="border: 1px white solid; max-width: 100%;">
        <source src="/assets/vids/different-gen.mp4" type="video/mp4"/>
    </video>
    <figcaption><em>doodle jumping with different level generation</em></figcaption>
</figure>
</center>

```cpp
const int levelProgress = static_cast(score) % 3000;

if (levelProgress >= 2900 && hasLevelChanged)
{
    level = ++level % levels.size();
    platformMan->SetParameters(
        levels[level]->platformDensity,
        levels[level]->platformMin,
        levels[level]->platformMax);
    enemyMan->SetParameters(
        levels[level]->enemyDensity,
        levels[level]->enemyMin,
        levels[level]->enemyMax);
    breakingPlatMan->SetParameters(
        levels[level]->brDensity,
        levels[level]->brMin,
        levels[level]->brMax);
}
```

Increasing the spacing between platforms makes the game harder since the player needs to bounce higher and more precisely. Increasing enemy density adds more obstacles to navigate. The three managers respond to the new parameters immediately on the next update cycle, so the difficulty shift is gradual rather than abrupt.

---
## Collision

Collision is written from scratch without any physics library. A `ColliderComponent` is attached to any entity that needs it, with an adjustable offset to tune the hitbox independently of the sprite. The collision check is handled through a standalone function that tests two entities against each other:

```cpp
void Game::CheckCollisions()
{
    for (auto& e : enemies)
        collision::CheckCol(player, e);

    for (auto& p : platforms)
        collision::CheckCol(player, p);

    for (auto& bp : BreakingPlatforms)
        collision::CheckCol(player, bp);
}
```

<center>
<figure style="text-align: center;">
    <video controls style="border: 1px white solid; max-width: 100%;">
        <source src="/assets/vids/dying.mp4" type="video/mp4"/>
    </video>
    <figcaption><em>doodle dying</em></figcaption>
</figure>
</center>

---
## Reflection

For a first attempt at C++ this project covered more ground than I expected. The component system, object pooling, manual collision, and parameter-driven level generation are all patterns I went on to use in more complex forms in later projects. Looking back the code has rough edges, but the underlying approach was sound, and building these things from scratch in an unfamiliar language was a better foundation than I realised at the time.
