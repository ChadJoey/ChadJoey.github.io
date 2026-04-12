---
layout: post
title: "RTS formations"
date: 2024-01-01
toc: false
---

## About the Project

A self-study project exploring RTS movement and formation systems. Units navigate a shared flow field rather than running individual pathfinding, which keeps navigation cheap regardless of unit count. On top of that, a formation system handles how units sort themselves into shapes, with two different assignment algorithms that can be compared directly at runtime.

**Team:** solo      
**Duration** 8 weeks    
**Engine:** Custom engine   
**Play it:**    

---
## Overview
The project is split into three connected systems: a flow field that handles navigation across the grid, an agent system that moves units through it, and a formation system that decides which unit goes where.

---
## Flow Field

Individual pathfinding per unit scales poorly in an RTS, running A* for fifty units every frame is expensive, and agents often end up taking identical paths anyway. A flow field solves this by computing navigation once per destination across the whole grid. Every tile stores a direction vector pointing toward the goal, and any number of agents can read from it without additional pathfinding cost.

```cpp
if (x - 1 >= 0)
    tile.neighbours[1] = field[(x - 1) + y * width];        // left
if (x + 1 < width)
    tile.neighbours[0] = field[(x + 1) + y * width];        // right
if (y - 1 >= 0)
    tile.neighbours[3] = field[x + (y - 1) * width];        // bottom
if (y + 1 < height)
    tile.neighbours[2] = field[x + (y + 1) * width];        // top
if (x - 1 >= 0 && y + 1 < height)
    tile.neighbours[6] = field[(x - 1) + (y + 1) * width];  // top left
if (x + 1 < width && y + 1 < height)
    tile.neighbours[4] = field[(x + 1) + (y + 1) * width];  // top right
if (x - 1 >= 0 && y - 1 >= 0)
    tile.neighbours[5] = field[(x - 1) + (y - 1) * width];  // bottom left
if (x + 1 < width && y - 1 >= 0)
    tile.neighbours[7] = field[(x + 1) + (y - 1) * width];  // bottom right
```

When the player clicks a destination tile, Dijkstra's algorithm floods out from the goal, assigning a cumulative cost to every reachable tile. Tiles with a weight of 255 are treated as impassable walls and are skipped. After costs are assigned, each tile computes a direction vector pointing toward its cheapest neighbour:

```cpp
void FlowField::Dijkstras_Map()
{
    const auto& view = bee::Engine.ECS().Registry.view();
    std::queue frontier;
    std::unordered_set reached;

    Reset_tile_direction();
    for (auto& entity : view)
    {
        auto& tile = view.get(entity);
        if (tile.selected == true)
        {
            frontier.push(entity);
            reached.insert(entity);
        }
        tile.cost = 0;
    }

    while (!frontier.empty())
    {
        entt::entity current = frontier.front();
        frontier.pop();
        auto& current_tile = view.get(current);
        entt::entity stored_tile = entt::null;
        float cheapest_cost = 1000000000;
        int counter = 0;

        for (auto& neighbour : current_tile.neighbours)
        {
            if (reached.find(neighbour) == reached.end())
            {
                if (neighbour == entt::null) continue;
                auto& tile = view.get(neighbour);
                if (tile.weight == 255)
                {
                    reached.insert(neighbour);
                    continue;
                }
                tile.cost = current_tile.cost + tile.weight;
                frontier.push(neighbour);
                reached.insert(neighbour);
                counter++;
                if (counter == 4) break;
            }
        }

        for (auto& neighbour : current_tile.neighbours)
        {
            if (neighbour == entt::null) continue;
            auto& tile = view.get(neighbour);
            if (tile.weight == 255) continue;
            if (tile.cost < cheapest_cost)
            {
                cheapest_cost = tile.cost;
                stored_tile = neighbour;
            }
        }

        if (stored_tile != entt::null && current_tile.selected == false)
        {
            auto& sTile = view.get(stored_tile);
            current_tile.point_direction = Compute_tile_direction(
                {sTile.x, 0, sTile.y},
                {current_tile.x, 0, current_tile.y}
            );
        }
    }
}
```



---
## Agent Movement

Each agent samples the direction vector of whichever tile it is currently standing on. This is done on a throttled interval rather than every frame to keep it cheap. When an agent gets close enough to its target location it switches from following the flow field to steering directly toward the target:

```cpp
void FlowFieldAgent::Update(float dt)
{
    GetTileDirection();
    auto view = bee::Engine.ECS().Registry.view();
    for (auto& agent : view)
    {
        auto& transform = view.get(agent);
        auto& flow_field_agent = view.get(agent);

        glm::vec2 pos = {transform.GetTranslation().x, transform.GetTranslation().z};

        if (glm::distance(pos, flow_field_agent.target_location) < dist
            && flow_field_agent.target_location.x != 0)
        {
            flow_field_agent.rotation = -glm::normalize(
                glm::vec3(pos.x, 0, pos.y) -
                glm::vec3(flow_field_agent.target_location.x, 0, flow_field_agent.target_location.y)
            );
        }

        glm::vec3 desiredVelocity = flow_field_agent.rotation * flow_field_agent.speed;
        glm::vec3 steeringForce = desiredVelocity - flow_field_agent.velocity;
        flow_field_agent.velocity += steeringForce * dt;

        if (glm::distance(pos, flow_field_agent.target_location) <= 0.2f)
        {
            flow_field_agent.velocity = {0, 0, 0};
        }

        flow_field_agent.position += flow_field_agent.velocity * dt;
        transform.SetTranslation(flow_field_agent.position);
    }
}
```

The steering force approach means agents ease into their direction rather than snapping, giving movement a bit more weight.

{% include embed/video.html src='/assets/vids/holy-trinity.mp4' title='agents navigating around tiles' %}

---
## Formation Shapes

Formations are defined as lists of world positions generated around a selected origin tile. Five shapes are supported: a dynamic grid, star, circle, rectangle, and half circle. Each shape generator takes a rotation angle derived from a mouse drag, so the player can orient the formation before placing it.

Below is the dynamic grid formation, which spaces units out in rows and columns with configurable gaps:

```cpp
std::vector Formation_field::Place_unit_cells(float angle)
{
    std::vector targetlist;
    const auto& units = bee::Engine.ECS().Registry.view();
    max_formation_size = (float)units.size();
    glm::vec2 position;

    float offset_multiplier = 0;
    for (int index = 0; (float)index < max_formation_size / units_per_line; index++)
    {
        for (int i = 0; i < (int)units_per_line; i++)
        {
            position = start_position + (tileSize / 2);
            position.y -= (float)(distance_between_lines * tileSize) * i;

            float xOffset = offset_multiplier * (distance_between_units_on_line * tileSize);
            float yOffset = offset_multiplier * (vertical_distance_between_units_on_line * tileSize);

            if (i % 2 != 0)
            {
                position.x -= xOffset - (tileSize / 2);
                position.y -= yOffset - (tileSize / 2);
            }
            else
            {
                position.x += xOffset + (tileSize / 2);
                position.y -= yOffset - (tileSize / 2);
                offset_multiplier++;
            }

            float dx = position.x - start_position.x;
            float dy = position.y - start_position.y;
            float rotatedX = start_position.x + (cos(angle) * dx - sin(angle) * dy);
            float rotatedY = start_position.y + (sin(angle) * dx + cos(angle) * dy);
            targetlist.emplace_back(glm::vec2(rotatedX, rotatedY));
        }
    }
    return targetlist;
}
```

The spacing, number of units per line, and vertical offset are all exposed through an ImGui panel so they can be adjusted at runtime.

{% include embed/video.html src='/assets/vids/presets.mp4' title='agents using different formations' %}
{% include embed/video.html src='/assets/vids/rotation.mp4' title='agents rotating in formation' %}

---
## Unit Assignment

Once formation positions are generated, units need to be assigned to them. The naive approach of each unit claiming its nearest open slot produces crossing paths and looks chaotic. Two proper assignment algorithms handle this instead, switchable at runtime via ImGui.

### Auction Algorithm

The auction algorithm is an iterative approach: each unit bids on the position that gives it the best value, raising the price on that position as it claims it. If the position was already claimed, the displaced unit re-enters the bidding. Running this incrementally across frames rather than all at once keeps the game responsive during assignment:

```cpp
void Formation_field::auction_algorithm(float epsilon)
{
    static std::vector prices(numLocations, 0.0f);
    static std::vector unassignedAgents;

    if (unassignedAgents.empty() && !completed)
    {
        for (int i = 0; i < numLocations; ++i)
        {
            if (locationMatch[i] == -1)
                unassignedAgents.push_back(i);
        }
        if (unassignedAgents.empty())
        {
            completed = true;
            return;
        }
    }

    if (current_agent_index < unassignedAgents.size())
    {
        int agent = unassignedAgents[current_agent_index];
        int bestTask = -1;
        float bestValue = -std::numeric_limits::infinity();
        float secondBestValue = -std::numeric_limits::infinity();

        for (int task = 0; task < numLocations; ++task)
        {
            float value = -distanceMatrix[agent][task] - prices[task];
            if (value > bestValue)
            {
                secondBestValue = bestValue;
                bestValue = value;
                bestTask = task;
            }
            else if (value > secondBestValue)
            {
                secondBestValue = value;
            }
        }

        float bidAmount = bestValue - secondBestValue + epsilon;
        prices[bestTask] += bidAmount;

        int previousAgent = targetMatch[bestTask];
        if (previousAgent != -1)
            locationMatch[previousAgent] = -1;

        locationMatch[agent] = bestTask;
        targetMatch[bestTask] = agent;
        current_agent_index++;
    }
    else
    {
        current_agent_index = 0;
        unassignedAgents.clear();
        for (int i = 0; i < numLocations; ++i)
        {
            if (locationMatch[i] == -1)
                unassignedAgents.push_back(i);
        }
    }
}
```

### Hungarian Algorithm

The Hungarian algorithm finds the globally optimal assignment. The one that minimises total travel distance across all units simultaneously. It's more expensive than the auction approach but guarantees no crossing paths. For small to medium formation sizes the cost is acceptable and the result is visibly cleaner:
```cpp
void Formation_field::augment()
{
    augment_started = true;
    if (maxMatches == numLocations)
    {
        augment_complete = true;
        augment_started = false;
        return;
    }

    int location, target, root = 0;
    std::vector queue(numLocations);
    int writeIdx = 0, readIdx = 0;

    for (location = 0; location < numLocations; ++location)
    {
        if (locationMatch[location] == -1)
        {
            queue[writeIdx++] = root = location;
            previousLocation[location] = -2;
            locationSet[location] = true;
            break;
        }
    }

    for (target = 0; target < numLocations; ++target)
    {
        slack[target] = locationLabels[root] + targetLabels[target] - distanceMatrix[root][target];
        slackLocation[target] = root;
    }

    while (true)
    {
        while (readIdx < writeIdx)
        {
            location = queue[readIdx++];
            for (target = 0; target < numLocations; ++target)
            {
                if (distanceMatrix[location][target] == locationLabels[location] + targetLabels[target]
                    && !targetSet[target])
                {
                    if (targetMatch[target] == -1) break;
                    targetSet[target] = true;
                    queue[writeIdx++] = targetMatch[target];
                    add_to_tree(targetMatch[target], location);
                }
            }
            if (target < numLocations) break;
        }
        if (target < numLocations) break;
        update_labels();
        writeIdx = readIdx = 0;

        for (target = 0; target < numLocations; ++target)
        {
            if (!targetSet[target] && slack[target] == 0.0f)
            {
                if (targetMatch[target] == -1)
                {
                    location = slackLocation[target];
                    break;
                }
                else
                {
                    targetSet[target] = true;
                    if (!locationSet[targetMatch[target]])
                    {
                        queue[writeIdx++] = targetMatch[target];
                        add_to_tree(targetMatch[target], slackLocation[target]);
                    }
                }
            }
        }
        if (target < numLocations) break;
    }

    if (target < numLocations)
    {
        maxMatches++;
        for (int currentLocation = location, currentTarget = target, temp;
             currentLocation != -2;
             currentLocation = previousLocation[currentLocation], currentTarget = temp)
        {
            temp = locationMatch[currentLocation];
            targetMatch[currentTarget] = currentLocation;
            locationMatch[currentLocation] = currentTarget;
        }
    }
}
```
{% include embed/video.html src='/assets/vids/rotating.mp4' title='agents using optimal path' %}

---
## Reflection
Reflection
The most interesting design decision in this project was the unit assignment problem. Getting units into a formation shape is straightforward. Getting them there without crossing paths or producing obviously suboptimal routes requires treating it as a proper assignment problem. Implementing both algorithms back to back made the tradeoff concrete: the auction algorithm is fast and good enough for most cases, while Hungarian is slower but optimal. Having both switchable at runtime made it easy to see exactly where they diverge with larger unit counts and more complex formation shapes.
