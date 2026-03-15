// Unlock challenge content on hackathon start: 21 March 2026, 14:00 EET
(function () {
  var unlock = new Date("2026-03-21T14:00:00+02:00");
  var now = new Date();
  var locked = document.querySelectorAll(".gated");
  var placeholders = document.querySelectorAll(".gated-placeholder");

  if (now >= unlock) {
    locked.forEach(function (el) { el.style.display = ""; });
    placeholders.forEach(function (el) { el.style.display = "none"; });
  } else {
    locked.forEach(function (el) { el.style.display = "none"; });
    placeholders.forEach(function (el) { el.style.display = ""; });
  }
})();
