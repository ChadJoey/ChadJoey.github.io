---
layout: post
title: "Godot behavior tree editor"
date: 2024-01-01
toc: false
---

## About the Project

A behavior tree plugin for Godot, built as a GDExtension in C++. The plugin adds a visual graph editor to the Godot editor for building and saving behavior trees, a runtime system for executing them, and a set of built-in node types covering the standard behavior tree building blocks.

**Team:** solo  
**Durations** 14 weeks  
**Engine:** Godot 4 (GDExtension / c++)

---

## Overview

After getting feedback on a previous project that a behavior tree would have been a better fit for AI than a finite state machine, I decided to actually build one. The goal was a plugin that felt native to Godot: trees are saved as Godot resources, the editor lives in the bottom panel, and condition and action nodes can be scripted in GDScript so designers do not need to touch C++.

---
## The Graph Editor

The editor is built on top of Godot's built-in `GraphEdit` node and registers as an editor plugin through the GDExtension API. It lives in the bottom panel and lets you add nodes from a menu, connect them visually, and save and load trees as `.tres` resource files.

<center>
<figure style="text-align: center;">
    <video controls style="border: 1px white solid; max-width: 100%;">
        <source src="/assets/vids/connecting_disconnecting.mp4" type="video/mp4"/>
    </video>
    <figcaption><em>Building a tree in the editor</em></figcaption>
</figure>
</center>

Connections are validated before being accepted. The editor checks that the target node does not already have a parent and that the source slot is not already occupied, preventing invalid tree structures from being built:

```cpp
void BT_GraphEdit::_on_connection_request(const String &from, int from_slot,
                                           const String &to, int to_slot)
{
    if (to_node->parent)
    {
        godot::print_error("node already has a parent");
        return;
    }

    Array connections = graph_edit->get_connection_list();
    for (int j = 0; j < connections.size(); j++)
    {
        Dictionary conn = connections[j];
        if (conn["from_node"] == from_node->get_name() &&
            conn["to_node"] == child->get_name())
        {
            int occupied_slot = conn["from_port"];
            if (occupied_slot == from_slot)
            {
                godot::print_error("Slot already in use by another child");
                return;
            }
        }
    }
    // connect and update parent/child references
}
```

Trees are serialized to a `BT_Tree_Resource` holding a flat list of `BT_node_data` objects, each storing the node type, name, script, editor position, and child IDs. This lets trees be saved as standard Godot `.tres` files and loaded back into either the editor or the runtime without any special handling.

---
## GDScript Integration

Condition and action nodes support both C++ and GDScript. At initialisation, the node checks whether a `condition_to_check()` method exists on the attached script. If it does, calls are routed to GDScript. If not, it falls back to the C++ virtual. This means the same node type works for a C++ programmer extending it natively and a designer writing a quick script without touching the plugin:

```cpp
int BT_ConditionNode::evaluate(float dt)
{
    if (condition_call.is_valid())
    {
        Variant ret = condition_call.callv({ dt });
        return static_cast(ret) ? STATUS_SUCCESS : STATUS_FAILURE;
    }
    else
    {
        bool result = condition_to_check();
        return result ? STATUS_SUCCESS : STATUS_FAILURE;
    }
}
```

---
## The Runtime

At runtime a `BT_Tree` node reads a `BT_Tree_Resource`, reconstructs the tree, and ticks the root node at a configurable rate. The tickrate prevents the tree from running every frame, which is useful for AI where running at 10 ticks per second is often more than sufficient:

```cpp
void BT_Tree::_process(double delta)
{
    if (Engine::get_singleton()->is_editor_hint()) return;

    float ticktime = 1.0f / TickRate;
    timer += delta;
    if (timer >= ticktime)
    {
        timer -= ticktime;
        int int_status = root->_update(delta);
        set_status(static_cast(int_status));
    }
}
```

Tree construction maps node IDs to instances then links children in a second pass, keeping instantiation and wiring separate:

```cpp
void BT_Tree::CreateTree()
{
    HashMap id_to_node;

    for (int i = 0; i < nodes.size(); i++)
    {
        Ref data = nodes[i];
        String type = data->get_node_type();
        BT_Node *node = nullptr;

        if (type == "BT_Graph_SequenceNode")      node = memnew(BT_SequenceNode);
        else if (type == "BT_Graph_SelectorNode")  node = memnew(BT_SelectorNode);
        else if (type == "BT_Graph_ActionNode")    node = memnew(BT_ActionNode);
        else if (type == "BT_Graph_ConditionNode") node = memnew(BT_ConditionNode);
        // ... other types

        node->set_name(data->get_name());
        node->set_script(data->get_script());
        id_to_node[data->get_id()] = node;
    }

    for (int i = 0; i < nodes.size(); i++)
    {
        BT_Node *parent_node = id_to_node[data->get_id()];
        Array children_ids = data->get_children_ids();
        for (int j = 0; j < children_ids.size(); j++)
        {
            BT_Node *child_node = id_to_node[children_ids[j]];
            parent_node->add_child(child_node);
            parent_node->add_bt_child(child_node);
        }
    }
}
```

---
## Node Types

The plugin covers the standard behavior tree building blocks: sequence, selector, parallel, action, condition, invert decorator, repeater decorator, and wait node. Most of these are straightforward to implement once the core update loop is in place. The more interesting design problem came from the parallel node.

### Reactive Nodes and the Parallel Problem

Getting the parallel node working initially went fine, but it exposed a problem with the standard sequence and selector that I had not considered: nodes with memory. A standard sequence remembers which child it was on and resumes from there next tick. This is fine in isolation, but when used inside a parallel node it means a branch can stay in a running state even after the conditions that triggered it have changed.

In the demo below, a timer runs in parallel with a condition check. With standard memory-based nodes, once the sequence begins running the condition branch is not re-evaluated, so the agent never reacts to the player entering its line of sight:

<center>
<figure style="text-align: center;">
    <video controls style="border: 1px white solid; max-width: 100%;">
        <source src="/assets/vids/unreactive.mp4" type="video/mp4"/>
    </video>
    <figcaption><em>Parallel node with memoryful sequence, condition is not re-evaluated</em></figcaption>
</figure>
</center>

The fix was adding reactive variants of the sequence and selector that re-evaluate from the first child every tick instead of resuming. This lets conditions interrupt ongoing behaviour, which is what you need for anything event-driven:

```cpp
int BT_ReactiveSequenceNode::_update(float dt)
{
    for (int i = 0; i < child_nodes.size(); i++)
    {
        BT_Node *child = Object::cast_to(child_nodes[i].operator Object *());
        int status = child->_update(dt);
        if (status != STATUS_SUCCESS) return status;
    }
    return STATUS_SUCCESS;
}
```

<center>
<figure style="text-align: center;">
    <video controls style="border: 1px white solid; max-width: 100%;">
        <source src="/assets/vids/reactive_with_parralel.mp4" type="video/mp4"/>
    </video>
    <figcaption><em>Same tree with reactive sequence, condition interrupts correctly</em></figcaption>
</figure>
</center>

---
## Saving and Loading

Trees are saved and loaded as Godot `.tres` resource files, which keeps them consistent with how Godot handles its own data and avoids writing a custom parser. Getting there was one of the more technically frustrating parts of the project.

The first issue was that Godot's serialization only applies to nodes in the scene tree. Since the behavior tree exists entirely inside the plugin it had to be serialized manually. After figuring that out I also discovered that `.tres` files cannot be saved directly to the `res://` directory, which caused the save signal to get caught in Godot's early warning system without a clear error message. The fix was adding a check that looks for a `behavior_trees/` subfolder and creates it if it does not exist before saving.

Getting a single resource to save was one thing. Getting an array of resources to save was another. Godot has a concept called sub-resources intended for exactly this, but it did not work. TypedArrays did not work. Dictionaries did not work. After trying every approach I could find in the documentation I took it to the Godot Discord, where someone pointed to a forum post that looked promising. That also did not work, but asking for an explanation of what the approach was actually attempting led me to discover that since Godot 4.3 this functionality had been silently broken. Everything I had tried was correct, it just did not work in the engine version I was using, and because custom GDExtension resource serialization is uncommon it had not been widely reported.

The workaround was overriding `_get()`, `_set()`, and `_get_property_list()`, which are the callbacks Godot uses to determine how to handle individual variables during serialization. Overriding them let me define explicitly how the engine should read and write the resource array, which finally made it work:

```cpp
void BT_Tree_Resource::_get_property_list(List<PropertyInfo> *p_list) const
{
    p_list->push_back(PropertyInfo(Variant::OBJECT, "root_node",
        PROPERTY_HINT_RESOURCE_TYPE, "BT_node_data"));
    p_list->push_back(PropertyInfo(Variant::ARRAY, "all_nodes",
        PROPERTY_HINT_ARRAY_TYPE, "Resource/BT_node_data"));
}

bool BT_Tree_Resource::_set(const StringName &p_name, const Variant &p_value)
{
    if (p_name == StringName("all_nodes")) { all_nodes = p_value; return true; }
    if (p_name == StringName("root_node")) { root_node = p_value; return true; }
    return false;
}

bool BT_Tree_Resource::_get(const StringName &p_name, Variant &r_ret) const
{
    if (p_name == StringName("all_nodes")) { r_ret = all_nodes; return true; }
    if (p_name == StringName("root_node")) { r_ret = root_node; return true; }
    return false;
}
```

<center>
<figure style="text-align: center;">
    <video controls style="border: 1px white solid; max-width: 100%;">
        <source src="/assets/vids/save_load.mp4" type="video/mp4"/>
    </video>
    <figcaption><em>Tree being saved and loaded</em></figcaption>
</figure>
</center>
