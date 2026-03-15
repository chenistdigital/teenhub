// Unlock challenge content on hackathon start: 21 March 2026, 14:00 EET
(function () {
  var unlock = new Date("2026-03-21T14:00:00+02:00");

  function update() {
    var now = new Date();
    var locked = document.querySelectorAll(".gated");
    var placeholders = document.querySelectorAll(".gated-placeholder");

    if (now >= unlock) {
      locked.forEach(function (el) { el.style.display = ""; });
      placeholders.forEach(function (el) { el.style.display = "none"; });
      return;
    }

    locked.forEach(function (el) { el.style.display = "none"; });
    placeholders.forEach(function (el) { el.style.display = ""; });

    // Live countdown
    var diff = unlock - now;
    var days = Math.floor(diff / 86400000);
    var hours = Math.floor((diff % 86400000) / 3600000);
    var mins = Math.floor((diff % 3600000) / 60000);
    var secs = Math.floor((diff % 60000) / 1000);

    document.querySelectorAll(".countdown").forEach(function (el) {
      el.innerHTML =
        "<span>" + days + "<small>zile</small></span>" +
        "<span>" + hours + "<small>ore</small></span>" +
        "<span>" + mins + "<small>min</small></span>" +
        "<span>" + secs + "<small>sec</small></span>";
    });
  }

  update();
  setInterval(update, 1000);
})();

// Scroll reveal animation
(function () {
  var sections = document.querySelectorAll(
    "section.level2, .stats-row, .gallery, .dark-section, .cta-section, .domain-intro, .form-section"
  );

  sections.forEach(function (el) {
    el.classList.add("reveal");
  });

  function checkReveal() {
    var trigger = window.innerHeight * 0.88;
    sections.forEach(function (el) {
      if (el.getBoundingClientRect().top < trigger) {
        el.classList.add("visible");
      }
    });
  }

  checkReveal();
  window.addEventListener("scroll", checkReveal, { passive: true });
})();

// Lazy loading for gallery images
(function () {
  document.querySelectorAll(".gallery img").forEach(function (img) {
    img.setAttribute("loading", "lazy");
  });
})();

// Animated counter for stats
(function () {
  var animated = false;
  var statsRow = document.querySelector(".stats-row");
  if (!statsRow) return;

  function animateCounters() {
    if (animated) return;
    var rect = statsRow.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.85) {
      animated = true;
      document.querySelectorAll(".stat-number p").forEach(function (el) {
        var text = el.textContent.trim();
        var match = text.match(/^(\d+)/);
        if (!match) return;
        var target = parseInt(match[1], 10);
        var suffix = text.replace(/^\d+/, "");
        var duration = 1200;
        var start = performance.now();
        function step(now) {
          var progress = Math.min((now - start) / duration, 1);
          var eased = 1 - Math.pow(1 - progress, 3);
          var current = Math.round(target * eased);
          el.textContent = current + suffix;
          if (progress < 1) requestAnimationFrame(step);
        }
        el.textContent = "0" + suffix;
        requestAnimationFrame(step);
      });
    }
  }

  animateCounters();
  window.addEventListener("scroll", animateCounters, { passive: true });
})();
