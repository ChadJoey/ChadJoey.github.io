---
layout: post
title: "Copper Clash"
date: 2024-01-01
toc: false
---

## About the Project

Copper Clash is a last-man-standing racing game made by 13 first-year students at BUas, inspired by the PS2 game Mashed. Up to 4 local players race through a dystopian industrial wasteland, using weapons to eliminate each other rather than just racing to the finish.

**Team:** 13 people (4 programmers, 4 designers, 5 artists)  
**Engine:** Unreal Engine  
**Play it:** [itch.io](https://buas.itch.io/team-pepper)

---

## My Contributions

My two main contributions were the spline-based track tool used by the designers and artists to build the levels, and the checkpoint and lap system.

---

## The Game

![Copper Clash](/assets/img/copper.png)

This was my first team game project and the first time I shipped something made with other people. Working across disciplines with designers and artists throughout the 8 weeks shaped how I approached my work, since the things I built had to actually be useable by others, not just functional.

{% include embed/youtube.html id='XiE5Psd2Xdc' %}


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

Artists wanted smooth transitions between different road surface looks. Vertex painting turned out to be broken for spline meshes in the version of Unreal we were using, so I built a dynamic material instead that blends between two road materials with exposed parameters the artists could tweak per segment. Full material replacement per segment was also supported for cases where the blend options were not enough.

### Performance and Iteration

As the tracks grew larger, real-time mesh generation started to slow down the editor. I moved generation to a manual button trigger instead, which resolved the lag. I also merged the mesh and material controls into a single tool midway through after feedback that juggling two separate tools was slowing the team down.

---

## Checkpoint and Lap System

![Spline points](/assets/img/spline-points.png)

The checkpoint system was built on top of the spline tool, spacing points across the spline and using them to track how far along the track each player was. Using this I was able to track laps and overall race progression.

---

## Reflection

Shipping Copper Clash with a team of 13 was a different experience from anything I had done before. A lot of the work was less about writing code and more about understanding what the people using my tools actually needed, and being willing to revisit things when the answer changed.
