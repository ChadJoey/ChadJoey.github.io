---
layout: page
title: CV
icon: fas fa-file-alt
order: 4
toc: false
---

<div class="glow-box">
  <h1>Joey van Haren</h1>
  <p class="cv-tagline">Games Programming student at BUas, specializing in gameplay and AI systems.</p>
  <div class="cv-contact">
    <a href="https://mail.google.com/mail/?view=cm&to=joeyvharen55@gmail.com" target="_blank">joeyvharen55@gmail.com</a>
    <span class="cv-sep">·</span>
    <a href="https://www.linkedin.com/in/joey-van-haren" target="_blank">linkedin.com/in/joey-van-haren</a>
    <span class="cv-sep">·</span>
    <a href="https://github.com/ChadJoey" target="_blank">github.com/ChadJoey</a>
  </div>
</div>

<div class="glow-box">
  <h2>Profile</h2>
  <p class="cv-body">Third-year Games Programming student at Breda University of Applied Sciences, specializing in gameplay and AI systems. I started in web development, moved into game development through an MBO, and did an internship at ChimpWorks Games before enrolling at BUas. Since my second year I have focused on AI programming: building systems that feel responsive and intelligent, from stealth guards and cat AI to Monte Carlo decision making. My goal is to continue growing in that direction and eventually work in the AAA industry.</p>
</div>

<div class="glow-box">
  <h2>Experience</h2>

  <div class="cv-entry">
    <div class="cv-entry-header">
      <div>
        <span class="cv-role">AI Programmer</span>
        <span class="cv-company">· Chasing Whiskers (Student Project, BUas)</span>
      </div>
      <span class="cv-date">2024 – Present</span>
    </div>
    <p class="cv-body">Comedy action game in development for Steam. Responsible for the full cat AI system in Unreal Engine 5.</p>
    <ul class="cv-list">
      <li>Designed and implemented a six-state finite state machine covering roaming, caution, fleeing, hiding, following, and patrolling</li>
      <li>Built Lévy flight movement for naturalistic roaming and directionally biased fleeing</li>
      <li>Integrated Unreal nav links with custom ballistic arc jump physics by reading engine source directly</li>
      <li>Implemented BOIDS-based steering with a settle system for group following behaviour</li>
      <li>Built a hiding spot selection system with probability falloff by distance and movement direction</li>
      <li>Created a custom patrol path editor tool using Unreal's FComponentVisualizer with in-viewport waypoint dragging</li>
      <li>Exposed all parameters through data assets so designers can tune cat types without touching code</li>
    </ul>
  </div>

  <div class="cv-divider"></div>

  <div class="cv-entry">
    <div class="cv-entry-header">
      <div>
        <span class="cv-role">AI & Engine Programmer</span>
        <span class="cv-company">· Firewasp Engine + Nakon (Student Project, BUas)</span>
      </div>
      <span class="cv-date">2024</span>
    </div>
    <p class="cv-body">8-week custom C++ engine sprint followed by an 8-week game built on top of it. Engine was selected as custom tech for the following group project.</p>
    <ul class="cv-list">
      <li>Integrated the Recast/Detour navigation library into the custom engine from source</li>
      <li>Built an agent behaviour API covering vision detection, pathfinding, physics body setup, and combat</li>
      <li>Created a COD Zombies-style demo and a PayDay 2 stealth demo to showcase the system</li>
      <li>Built the interactables system for Nakon: wall buys, perk machines, and enemy power-up drops</li>
      <li>Implemented three enemy variants with per-wave health scaling and head hitbox detection</li>
      <li>Extended crowd navigation with surface clamping to prevent agents drifting off navmesh edges</li>
    </ul>
  </div>

  <div class="cv-divider"></div>

  <div class="cv-entry">
    <div class="cv-entry-header">
      <div>
        <span class="cv-role">Internship – Game Developer</span>
        <span class="cv-company">· ChimpWorks Games</span>
      </div>
      <span class="cv-date">2021</span>
    </div>
    <p class="cv-body">First professional game development experience. Contributed to live projects and gained grounding in studio workflow and tooling.</p>
  </div>

</div>

<div class="glow-box">
  <h2>Projects</h2>

  <div class="cv-entry">
    <div class="cv-entry-header">
      <div>
        <span class="cv-role">Mahjong AI</span>
        <span class="cv-company">· Unreal Engine 5, C++</span>
      </div>
      <span class="cv-date">2024</span>
    </div>
    <ul class="cv-list">
      <li>Built a lookup-table shanten calculator covering standard hands, seven pairs, and thirteen orphans</li>
      <li>Implemented flat Monte Carlo with determinization for decision making under hidden information</li>
      <li>Parallelised simulation across all CPU cores using Unreal's ParallelFor with deterministic per-task seeds</li>
    </ul>
  </div>

  <div class="cv-divider"></div>

  <div class="cv-entry">
    <div class="cv-entry-header">
      <div>
        <span class="cv-role">Godot Behaviour Tree Plugin</span>
        <span class="cv-company">· Godot 4, GDExtension, C++</span>
      </div>
      <span class="cv-date">2024</span>
    </div>
    <ul class="cv-list">
      <li>Built a visual graph editor, runtime execution system, and full set of standard node types as a GDExtension</li>
      <li>Supported both C++ and GDScript for condition and action nodes</li>
      <li>Resolved an undocumented Godot 4.3 serialization bug affecting custom GDExtension resource arrays</li>
    </ul>
  </div>

  <div class="cv-divider"></div>

  <div class="cv-entry">
    <div class="cv-entry-header">
      <div>
        <span class="cv-role">FPS Engine</span>
        <span class="cv-company">· Custom C++ (Firewasp), Team of 6</span>
      </div>
      <span class="cv-date">2024</span>
    </div>
    <ul class="cv-list">
      <li>Integrated Recast/Detour into a custom engine with no documentation, working largely from source</li>
      <li>Built a reusable agent behaviour API with vision frustum, detection meter, pathfinding, and combat</li>
      <li>Shipped a COD Zombies navigation stress test and a full PayDay 2-style stealth demo</li>
      <li>Engine was selected as custom tech for the following year-group project</li>
    </ul>
  </div>

</div>

<div class="glow-box">
  <h2>Education</h2>

  <div class="cv-entry">
    <div class="cv-entry-header">
      <div>
        <span class="cv-role">Game Technologies – Bachelor's Degree</span>
        <span class="cv-company">· Breda University of Applied Sciences (BUas)</span>
      </div>
      <span class="cv-date">2023 – Present</span>
    </div>
  </div>

  <div class="cv-divider"></div>

  <div class="cv-entry">
    <div class="cv-entry-header">
      <div>
        <span class="cv-role">MBO Game Developer</span>
        <span class="cv-company">· Technova College</span>
      </div>
      <span class="cv-date">2018 – 2021</span>
    </div>
  </div>

</div>

<div class="glow-box">
  <h2>Skills</h2>
  <div class="skills-list">
    <span class="skill">C++</span>
    <span class="skill">C#</span>
    <span class="skill">Unreal Engine 5</span>
    <span class="skill">Unity</span>
    <span class="skill">Godot</span>
    <span class="skill">Gameplay AI</span>
    <span class="skill">Finite State Machines</span>
    <span class="skill">Behaviour Trees</span>
    <span class="skill">Monte Carlo</span>
    <span class="skill">Pathfinding</span>
    <span class="skill">Recast / Detour</span>
    <span class="skill">Steering Behaviours</span>
    <span class="skill">BOIDS</span>
    <span class="skill">Flow Fields</span>
    <span class="skill">OpenGL</span>
    <span class="skill">Perforce</span>
    <span class="skill">Git</span>
  </div>
</div>

<style>
.cv-tagline {
  text-align: center;
  color: #999999;
  margin: 0.25rem 0 1rem;
  font-size: 1rem;
}

.cv-contact {
  text-align: center;
  font-size: 0.85rem;
  color: #aaaaaa;
}

.cv-contact a {
  color: #2dd4bf !important;
}

.cv-sep {
  margin: 0 0.6rem;
  color: #444444;
}

.cv-entry {
  margin-bottom: 1.2rem;
}

.cv-entry:last-child {
  margin-bottom: 0;
}

.cv-entry-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 0.3rem;
  margin-bottom: 0.4rem;
}

.cv-role {
  font-weight: bold;
  color: #ffffff;
  font-size: 0.95rem;
}

.cv-company {
  color: #888888;
  font-size: 0.88rem;
}

.cv-date {
  color: #2dd4bf;
  font-size: 0.82rem;
  white-space: nowrap;
}

.cv-body {
  color: #aaaaaa;
  font-size: 0.88rem;
  margin: 0 0 0.5rem;
  line-height: 1.6;
}

.cv-list {
  margin: 0;
  padding-left: 1.2rem;
  color: #aaaaaa;
  font-size: 0.85rem;
  line-height: 1.7;
}

.cv-list li {
  margin-bottom: 0.1rem;
}

.cv-divider {
  border: none;
  border-top: 1px solid #2a2a2a;
  margin: 1.2rem 0;
}
</style>
