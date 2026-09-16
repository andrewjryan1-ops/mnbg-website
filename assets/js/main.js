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

  // Contact form — posts to FormSubmit (AJAX first, native POST as fallback)
  var form = document.querySelector("#contact-form");
  if (form) {
    var note = document.querySelector("#form-status");
    var button = form.querySelector('button[type="submit"]');
    var endpoint = form.getAttribute("action").replace("formsubmit.co/", "formsubmit.co/ajax/");

    function show(msg, cls) {
      if (!note) return;
      note.textContent = msg;
      note.className = "form-note mt-1 " + cls;
      note.style.display = "block";
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      // Minimal validation (the form uses novalidate so we control the messaging)
      var name = form.querySelector("#name");
      var email = form.querySelector("#email");
      if (!name.value.trim() || !email.value.trim() || email.value.indexOf("@") < 1) {
        show("Please add your name and a valid email address so we can reply.", "err");
        (name.value.trim() ? email : name).focus();
        return;
      }
      if (form.querySelector("#_honey") && form.querySelector("#_honey").value) { return; } // bot

      var data = {};
      Array.prototype.forEach.call(form.elements, function (el) {
        if (el.name && el.type !== "submit") data[el.name] = el.value;
      });
      data._replyto = email.value;

      if (button) { button.disabled = true; button.textContent = "Sending…"; }
      show("Sending your message…", "");

      if (!window.fetch) { form.submit(); return; }

      fetch(endpoint, {
        method: "POST",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify(data)
      }).then(function (r) { return r.json().then(function (j) { return { ok: r.ok, body: j }; }); })
        .then(function (res) {
          if (res.ok && (res.body.success === "true" || res.body.success === true)) {
            form.reset();
            show("Thanks! Your message is on its way — we'll get back to you soon.", "ok");
          } else {
            throw new Error((res.body && res.body.message) || "Form service error");
          }
        })
        .catch(function () {
          // Fall back to a regular POST (redirects to /thank-you on success)
          form.submit();
        })
        .finally(function () {
          if (button) { button.disabled = false; button.textContent = "Send message"; }
        });
    });
  }

  // Footer year
  var y = document.querySelector("#year");
  if (y) y.textContent = new Date().getFullYear();
})();
