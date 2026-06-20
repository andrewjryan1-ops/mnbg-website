/* MN Bookkeeping Guy — site interactions */
(function () {
  "use strict";

  // Mobile nav toggle
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      links.classList.toggle("open");
      var expanded = links.classList.contains("open");
      toggle.setAttribute("aria-expanded", expanded ? "true" : "false");
    });
  }

  // Mobile dropdown expand (tap the toggle within a dropdown li)
  document.querySelectorAll(".nav-links .dropdown-toggle").forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      if (window.matchMedia("(max-width: 760px)").matches) {
        e.preventDefault();
        var li = btn.closest("li");
        if (li) li.classList.toggle("open");
      }
    });
  });

  // Reveal on scroll
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  }

  // Contact form — visual only (no backend wired yet)
  var form = document.querySelector("#contact-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var note = document.querySelector("#form-status");
      if (note) {
        note.textContent = "Thanks! This form is not yet connected to a backend — we'll wire up email delivery before launch. For now, please reach us using the contact details listed.";
        note.style.display = "block";
      }
      form.reset();
    });
  }

  // Footer year
  var y = document.querySelector("#year");
  if (y) y.textContent = new Date().getFullYear();
})();
