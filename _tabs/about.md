---
layout: page
title: About
icon: fas fa-user
order: 1
---

<style>
.glow-box {
  border: 1px solid #2dd4bf;
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 0 18px #2dd4bf55, inset 0 0 18px #2dd4bf11;
}
.glow-box h1, .glow-box h2 { text-align: center; margin-bottom: 1.5rem; }
.bg-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-top: 1rem;
}
a.bg-card {
  display: flex !important;
  flex-direction: column !important;
  border-radius: 10px;
  overflow: hidden;
  background: #0f1e2a;
  border: 1px solid #1e3a4a;
  transition: transform 0.2s, border-color 0.2s;
  text-decoration: none !important;
  color: inherit !important;
}
a.bg-card:hover { transform: translateY(-3px); border-color: #2dd4bf; }
a.bg-card img { width: 100%; height: 160px; object-fit: cover; display: block; }
.bg-card-body { padding: 1rem; text-align: center; }
.bg-card-body h3 { font-size: 0.95rem; color: #e2e8f0; margin: 0 0 0.4rem; }
.bg-card-body p { font-size: 0.8rem; color: #94a3b8; margin: 0 0 0.4rem; }
.bg-card-body span { font-size: 0.8rem; color: #2dd4bf; }
.skills-list { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: 0.5rem; }
.skill {
  background: #1e3a4a;
  color: #7dd3fc;
  border: 1px solid #2dd4bf44;
  border-radius: 6px;
  padding: 4px 12px;
  font-size: 0.85rem;
  font-family: monospace;
}

.bg-card-img {
  width: 100%;
  height: 160px;
  background-size: cover;
  background-position: center;
  display: block;
  flex-shrink: 0;
}

</style>

<div class="glow-box">
  <h1>Who am I?</h1>
  <p>I'm a third-year Games Programming student at Breda University of Applied Sciences (BUas), specializing in gameplay and AI systems. My path into game development wasn't straight — but every step pointed in the same direction.</p>
  <p>I started with a web development course, quickly realized it wasn't for me, and pivoted to a Software Development MBO with a game development specialization. During my internship at Chimp Works Games I got my first real taste of production game development — and it confirmed exactly what I wanted to do.</p>
  <p>That experience drove me to BUas, where I've been pushing my skills further ever since. In my second year I discovered a deep interest in gameplay AI — building systems that feel alive, react intelligently, and make games more engaging. That's the direction I'm headed, with the goal of working in the AAA industry.</p>
</div>

<div class="glow-box">
  <div class="bg-grid">
    <a href="https://www.buas.nl" target="_blank" class="bg-card">
      <div class="bg-card-img" style="background-image: url('/assets/img/Buas.jpg')"></div>
      <div class="bg-card-body">
        <h3>Breda University of Applied Sciences</h3>
        <p>Game Technologies Bachelor's Degree</p>
        <span>2023 – Present</span>
      </div>
    </a>
    <a href="https://www.technova.nl" target="_blank" class="bg-card">
      <div class="bg-card-img" style="background-image: url('/assets/img/Technova.jpg')"></div>
      <div class="bg-card-body">
        <h3>Techova College</h3>
        <p>MBO Game Developer</p>
        <span>2018 – 2021</span>
      </div>
    </a>
    <a href="https://www.chimpworksgames.com" target="_blank" class="bg-card">
      <div class="bg-card-img" style="background-image: url('/assets/img/chimp.jpg')"></div>
      <div class="bg-card-body">
        <h3>Chimp Works Games</h3>
        <p>Internship</p>
        <span>2021 – 2021</span>
      </div>
    </a>
  </div>


</div>

<div class="glow-box">
  <h2>Skills</h2>
  <div class="skills-list">
    <span class="skill">C++</span>
    <span class="skill">C#</span>
    <span class="skill">Unity</span>
    <span class="skill">Unreal Engine</span>
    <span class="skill">Gameplay Systems</span>
    <span class="skill">Turn Based AI</span>
    <span class="skill">Pathfinding</span>
    <span class="skill">Recast</span>
    <span class="skill">Steering Behaviours</span>
  </div>
</div>
