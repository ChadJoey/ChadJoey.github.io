---
layout: post
title: "Copper Clash"
date: 2024-01-01
toc: false
---

{% include embed/youtube.html id='XiE5Psd2Xdc' %}


## About the Project

Copper Clash is a last-man-standing racing game made by 13 first-year students at BUas, inspired by the PS2 game Mashed. Up to 4 local players race through a dystopian industrial wasteland, using weapons to eliminate each other rather than just racing to the finish.

**Team:** 13 people (4 programmers, 4 designers, 5 artists)  
**Engine:** Unreal Engine  
**Play it:** [itch.io](https://buas.itch.io/team-pepper)

---

## My Contributions

My two main contributions were the spline-based track tool used by the designers and artists to build the levels, and the checkpoint and lap system.


---
## Spline Tool

My main contribution was a Blueprint-based tool for building the race tracks. Designers and artists used it throughout the project to lay out and dress the levels.

### Closing the Loop

{% include embed/video.html src='/assets/vids/loop.mp4' title='Closing the spline loop' %}

The base tool we started from had a bug where closing the spline path would not close the extruded mesh along with it. I fixed this by aligning the last point's position and tangents to match the first when the loop is toggled closed.

### Mesh Replacement

![Segment mesh replacement](/assets/img/segments.png)

Designers wanted to swap out road sections for different geometry to create jumps and obstacles. I added per-segment mesh replacement and removal, controlled through a panel in the Unreal editor.

### Material Blending

![Road material transition](/assets/img/material-blend.png)

Artists wanted smooth transitions between different road surface looks. Vertex painting was broken for spline meshes in the Unreal version we were using, so I built a dynamic material instead that blends between two road surfaces with parameters artists could tweak per segment. Full material replacement per segment was also supported for cases where the blend wasn't enough.

### Performance and Iteration

As the tracks grew larger, real-time mesh generation started to slow down the editor. I moved generation to a manual button trigger instead, which resolved the lag. I also merged the mesh and material controls into a single tool midway through after feedback that juggling two separate tools was slowing the team down.

---

## Checkpoint and Lap System

![Spline points](/assets/img/spline-points.png)

The checkpoint system is built on top of the spline tool. Points are distributed across the spline at regular intervals and used to measure each player's progress along the track as a continuous value rather than a discrete checkpoint count. This gave the lap counter and the race position display a consistent source of truth regardless of track shape or length.

---

## Reflection

Copper Clash was the first time I built something that other people depended on daily. The spline tool got used throughout the project by designers and artists who weren't going to read code or file bug reports. If something was confusing or slow they would just work around it. Learning to notice that and respond to it, whether that meant merging two tools into one or moving mesh generation to a manual trigger, was more valuable than any individual technical problem I solved. It shaped how I think about building tools for a team rather than just for myself.
