---
layout: page
title: Projects
icon: fas fa-gamepad
order: 2
toc: false
---

<style>
.glow-box {
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #2dd4bf;
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 0 18px #2dd4bf55, inset 0 0 18px #2dd4bf11;
}
#main-wrapper .container {
  max-width: 100% !important;
}
.project-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}
.project-card {
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  overflow: hidden;
  background: #0f1e2a;
  border: 1px solid #1e3a4a;
  transition: transform 0.2s, border-color 0.2s;
  text-decoration: none !important;
  color: inherit !important;
}
.project-card:hover {
  transform: translateY(-3px);
  border-color: #2dd4bf;
}
.project-placeholder {
  width: 100%;
  height: 180px;
  background: #1e3a4a;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #2dd4bf88;
  font-size: 0.8rem;
  letter-spacing: 1px;
}
.project-card-img {
  width: 100%;
  height: 180px;
  background-size: cover;
  background-position: center;
  flex-shrink: 0;
}
.project-card-body {
  padding: 1rem;
  flex: 1;
  display: flex;
  flex-direction: column;
}
.project-card-body h3 {
  font-size: 1rem;
  color: #e2e8f0;
  margin: 0 0 0.4rem;
}
.project-card-body p {
  font-size: 0.82rem;
  color: #94a3b8;
  flex: 1;
  margin: 0 0 0.8rem;
}
.project-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.6rem;
  font-size: 0.78rem;
  color: #64748b;
}
.project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-bottom: 0.8rem;
}
.project-tag {
  font-size: 0.7rem;
  padding: 2px 8px;
  border-radius: 999px;
  background: #1e3a4a;
  color: #7dd3fc;
  border: 1px solid #2dd4bf44;
}
.project-link {
  font-size: 0.8rem;
  color: #2dd4bf !important;
  text-decoration: none !important;
  align-self: flex-start;
}
.project-link:hover { text-decoration: underline !important; }

@media (max-width: 768px) {
  .project-grid { grid-template-columns: 1fr; }
}
</style>

<div class="glow-box">
  <div class="project-grid">

<a href="/posts/copper-clash/" class="project-card">
<div class="project-card-img" style="background-image: url('/assets/img/copper.png')"></div>
  <div class="project-card-body">
    <h3>Copper Clash</h3>
    <div class="project-meta">
      <span>👥 13</span>
      <span>1st year</span>
    </div>
    <div class="project-tags">
      <span class="project-tag">Unreal Engine</span>
      <span class="project-tag">Blueprints</span>
      <span class="project-tag">Multiplayer</span>
    </div>
    <p>A chaotic last-man-standing racing game inspired by Mashed. Race through a dystopian industrial wasteland using machine guns, shotguns and landmines to take out up to 3 other local players.</p>
  </div>
</a>


<a href="/posts/godot-behavior-tree-editor/" class="project-card">
<div class="project-card-img" style="background-image: url('/assets/img/behavior-tree-banner.png')"></div>
  <div class="project-card-body">
    <h3>Godot Behavior tree</h3>
    <div class="project-meta">
      <span>👥 solo</span>
      <span>3rd year</span>
    </div>
    <div class="project-tags">
      <span class="project-tag">Godot</span>
      <span class="project-tag">C++</span>
      <span class="project-tag">behavior tree's</span>
    </div>
    <p>A behavior tree plugin for Godot, built as a GDExtension in C++. The plugin adds a visual graph editor to the Godot editor for building and saving behavior trees, a runtime system for executing them, and a set of built-in node types covering the standard behavior tree building blocks.
</p>
  </div>
</a>


<a href="/posts/nakon/" class="project-card">
<div class="project-card-img" style="background-image: url('/assets/img/nakon-banner.png')"></div>
  <div class="project-card-body">
    <h3>Nakon</h3>
    <div class="project-meta">
      <span>👥 12</span>
      <span>2nd year</span>
    </div>
    <div class="project-tags">
      <span class="project-tag">Custom engine</span>
      <span class="project-tag">AI</span>
      <span class="project-tag">Recast Navigation</span>
    </div>
    <p>Nakon is a fast paced FPS, built from the ground up in a custom student made engine, combining interesting visuals with arcade style survival gameplay. It is cross platform with support for PS5.</p>
  </div>
</a>


<a href="/posts/mahjong-ai/" class="project-card">
<div class="project-card-img" style="background-image: url('/assets/img/mahjong-banner.png')"></div>
  <div class="project-card-body">
    <h3>Mahjong AI</h3>
    <div class="project-meta">
      <span>👥 Solo</span>
      <span>3rd year</span>
    </div>
    <div class="project-tags">
      <span class="project-tag">Unreal Engine</span>
      <span class="project-tag">C++</span>
      <span class="project-tag">AI</span>
    </div>
    <p>A personal project where i try to create a mahjong AI that can play against itself</p>
  </div>
</a>

<a href="/posts/rts-formations/" class="project-card">
<div class="project-card-img" style="background-image: url('/assets/img/rts-banner.png')"></div>
  <div class="project-card-body">
    <h3>RTS Formations</h3>
    <div class="project-meta">
      <span>👥 Solo</span>
      <span>2nd year</span>
    </div>
    <div class="project-tags">
      <span class="project-tag">Custom engine</span>
      <span class="project-tag">C++</span>
      <span class="project-tag">RTS</span>
    </div>
    <p>this is a self study project where i explore the workings of RTS formations and grouping. within this project i explore how units move across a field , sort themselfs in formations, and make a dynamic formation that can be tweaked on the fly</p>
  </div>
</a>

<a href="/posts/chasing-whiskers/" class="project-card">
<div class="project-card-img" style="background-image: url('/assets/img/copper.png')"></div>
  <div class="project-card-body">
    <h3>Chasing Whiskers</h3>
    <div class="project-meta">
      <span>👥 24</span>
      <span>3rd year</span>
    </div>
    <div class="project-tags">
      <span class="project-tag">Custom engine</span>
      <span class="project-tag">C++</span>
      <span class="project-tag">RTS</span>
    </div>
    <p>Chasing Whiskers is a fun action adventure where you try to find you're lost cat in the cat dimention after having lost it. in this world a mysterious tanuki helps you find you're cat but he does not work for free.</p>
  </div>
</a>

<a href="/posts/pitfall/" class="project-card">
<div class="project-card-img" style="background-image: url('/assets/img/pitfall-banner.png')"></div>
  <div class="project-card-body">
    <h3>Pitfall</h3>
    <div class="project-meta">
      <span>👥 Solo</span>
      <span>1st year</span>
    </div>
    <div class="project-tags">
      <span class="project-tag">Custom engine</span>
      <span class="project-tag">C++</span>
      <span class="project-tag">Platformer</span>
    </div>
    <p>My first project at BUas, a recreation of the classic Atari game Pitfall built on top of a custom C++ engine.</p>
  </div>
</a>

<a href="/posts/pitfall-3d/" class="project-card">
<div class="project-card-img" style="background-image: url('/assets/img/pitfall-3d-banner.png')"></div>
  <div class="project-card-body">
    <h3>Pitfall 3D</h3>
    <div class="project-meta">
      <span>👥 Solo</span>
      <span>1st year</span>
    </div>
    <div class="project-tags">
      <span class="project-tag">Custom engine</span>
      <span class="project-tag">C++</span>
      <span class="project-tag">OpenGl</span>
    </div>
    <p>My second project at BUas, an endless runner built in a custom 3D engine targeting the Raspberry Pi. Despite the Pitfall name given by the school, the result ended up closer to Temple Run than the classic Atari game.</p>
  </div>
</a>

<a href="/posts/voxel-ray-tracer/" class="project-card">
<div class="project-card-img" style="background-image: url('/assets/img/ray-trace-banner.png')"></div>
  <div class="project-card-body">
    <h3>Voxel Ray Tracer</h3>
    <div class="project-meta">
      <span>👥 Solo</span>
      <span>1st year</span>
    </div>
    <div class="project-tags">
      <span class="project-tag">Custom engine</span>
      <span class="project-tag">C++</span>
      <span class="project-tag">Ray Tracing</span>
    </div>
    <p>A voxel ray tracer built on top of a provided base, with a pong game made inside it that uses ray tracing functionality as a core part of the gameplay.</p>
  </div>
</a>


<a href="/posts/fps-engine/" class="project-card">
<div class="project-card-img" style="background-image: url('/assets/img/fps-engine-banner.png')"></div>
  <div class="project-card-body">
    <h3>FPS engine</h3>
    <div class="project-meta">
      <span>👥 6</span>
      <span>2nd year</span>
    </div>
    <div class="project-tags">
      <span class="project-tag">Custom engine</span>
      <span class="project-tag">C++</span>
      <span class="project-tag">Recast</span>
    </div>
    <p>An 8-week custom C++ engine project built by a team of 6 at BUas, on top of Bee, the university's in-house learning engine which provides a basic set of engine features for students to build upon. The engine, originally developed by team Wasp, was later merged with a graphics team called Firefly and continued as Firewasp. At the end of the block the engine was selected as the custom tech for the next group project.</p>
  </div>
</a>



  </div>
</div>
