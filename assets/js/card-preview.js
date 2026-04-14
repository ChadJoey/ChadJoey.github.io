document.addEventListener("DOMContentLoaded", function () {
  const cards = document.querySelectorAll("[data-video]");

  cards.forEach(function (card) {
    var video = null;

    card.addEventListener("mouseenter", function () {
      var src = card.getAttribute("data-video");
      if (!src) return;

      video = document.createElement("video");
      video.src = src;
      video.className = "card-video-preview";
      video.autoplay = true;
      video.muted = true;
      video.loop = true;
      video.playsInline = true;

      card.insertBefore(video, card.firstChild);

      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          video.classList.add("visible");
        });
      });
    });

    card.addEventListener("mouseleave", function () {
      if (!video) return;
      video.classList.remove("visible");
      var v = video;
      video = null;
      setTimeout(function () {
        v.pause();
        if (v.parentNode) v.parentNode.removeChild(v);
      }, 300);
    });
  });
});
