---
layout: post
title: "Voxel ray tracer"
date: 2024-01-01
toc: false
---

## About the Project

A voxel ray tracer built on top of a provided base, with a pong game made inside it that uses ray tracing functionality as a core part of the gameplay.


**Team:** Solo  
**Duration** 8 weeks    
**Engine:** Custom engine     

---

## Overview
The starting point for this project was an engine with a basic ray setup already in place. Everything beyond that was ours to build. The assignment was to make a game within the ray tracer, with the challenge of actually incorporating ray tracing into the game itself for a higher grade.

I extended the renderer with reflective and glossy materials, glass materials for sphere primitives, an HDR skydome, point and spot lights, stochastic lighting, and accumulation to smooth out the noise over time. The source code is no longer available, but the videos below show most of the features in action.

---
## The Game

{% include embed/video.html src='/assets/vids/pong.mp4' title='Pong gameplay' %}
{% include embed/video.html src='/assets/vids/spotlight.mp4' title='Spotlight' %}
{% include embed/video.html src='/assets/vids/stochastic-lighting.mp4' title='Stochastic lighting with accumulation' %}
{% include embed/video.html src='/assets/vids/reflection.mp4' title='Reflective material' %}
{% include embed/video.html src='/assets/vids/glossy-material.mp4' title='Glossy material' %}
{% include embed/video.html src='/assets/vids/accumilation.mp4' title='Glossy material with accumulation' %}
{% include embed/video.html src='/assets/vids/glass-sphere.mp4' title='Glass Sphere' %}

The game is a pong variant where each paddle is a spotlight pointing downward onto the play field. The ball reads the light cast by the spotlights to determine where it should bounce, meaning the ray tracing is directly tied to the game logic rather than just being visual. 


The more interesting constraint on this project was the requirement to incorporate ray tracing into the gameplay itself rather than just using it as a renderer. The spotlight-as-paddle mechanic came from that: the ball reads the actual light cast by the spotlights to determine where it bounces, so the rendering and the game logic share the same data. On the renderer side, building out reflective, glossy, and glass materials, stochastic lighting, and accumulation gave me a solid grounding in how a ray tracer actually works at the implementation level rather than just the concept level.
