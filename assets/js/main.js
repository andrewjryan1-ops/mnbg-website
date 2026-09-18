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

  // Dropdowns: tap to expand on mobile, and keep aria-expanded truthful on
  // every device so screen readers announce the open/closed state. On desktop
  // the menu is opened by CSS (:hover / :focus-within), so mirror those here.
  document.querySelectorAll(".nav-links .dropdown-toggle").forEach(function (btn) {
    var li = btn.closest("li");
    if (!li) return;

    function setExpanded(open) { btn.setAttribute("aria-expanded", open ? "true" : "false"); }
    var isMobile = function () { return window.matchMedia("(max-width: 760px)").matches; };

    btn.addEventListener("click", function (e) {
      if (isMobile()) {
        e.preventDefault();
        li.classList.toggle("open");
        setExpanded(li.classList.contains("open"));
      }
    });

    ["mouseenter", "focusin"].forEach(function (ev) {
      li.addEventListener(ev, function () { if (!isMobile()) setExpanded(true); });
    });
    ["mouseleave", "focusout"].forEach(function (ev) {
      li.addEventListener(ev, function () {
        if (isMobile()) return;
        // focusout fires before focus lands on the next element
        setTimeout(function () {
          if (!li.contains(document.activeElement) && !li.matches(":hover")) setExpanded(false);
        }, 0);
      });
    });

    // Escape closes an open menu and returns focus to its toggle
    li.addEventListener("keydown", function (e) {
      if (e.key !== "Escape") return;
      li.classList.remove("open");
      setExpanded(false);
      btn.focus();
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

  // The contact form is now an embedded Microsoft Form (see contact.html), which
  // handles its own validation, submission and confirmation inside the iframe.
  // The FormSubmit AJAX handler that used to live here was removed with it: that
  // service's domain is flagged as phishing by consumer security software, so
  // submissions were being blocked before they ever reached the relay.

  // Footer year
  var y = document.querySelector("#year");
  if (y) y.textContent = new Date().getFullYear();
})();
