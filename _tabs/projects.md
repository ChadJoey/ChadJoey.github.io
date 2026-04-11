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
  <div class="project-placeholder">[ image coming soon ]</div>
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
  </div>
</div>
