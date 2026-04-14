---
layout: page
title: CV
icon: fas fa-file-alt
order: 3
toc: false
---

<div class="glow-box">
  <div class="cv-download-bar">
    <a href="/assets/pdf/JoeyVanHaren-CV.pdf" download class="cv-btn">⬇ Download PDF</a>
    <a href="/assets/pdf/JoeyVanHaren-CV.pdf" target="_blank" class="cv-btn cv-btn-outline">Open in new tab</a>
  </div>
  <div class="cv-preview">
    <iframe src="/assets/pdf/JoeyVanHaren-CV.pdf" width="100%" height="900px" style="border: none;"></iframe>
  </div>
</div>

<style>
.cv-download-bar {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.cv-btn {
  padding: 0.5rem 1.4rem;
  border-radius: 8px;
  font-size: 0.88rem;
  text-decoration: none !important;
  background: #2dd4bf;
  color: #0a0a0a !important;
  font-weight: bold;
  transition: opacity 0.2s;
}

.cv-btn:hover {
  opacity: 0.85;
}

.cv-btn-outline {
  background: transparent;
  color: #2dd4bf !important;
  border: 1px solid #2dd4bf;
}

.cv-btn-outline:hover {
  background: #2dd4bf22;
  opacity: 1;
}

.cv-preview {
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #2dd4bf44;
}

@media (max-width: 768px) {
  .cv-preview iframe {
    height: 500px;
  }
}
</style>
