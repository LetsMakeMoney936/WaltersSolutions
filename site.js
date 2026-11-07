// Walter's Mobile Solutions: page behavior (menu, fade-ins, service details, form helpers)
(function () {
  "use strict";

  // ---- Mobile menu ----
  var navToggle = document.getElementById("navToggle");
  var navMobile = document.getElementById("navMobile");

  function setNav(open) {
    if (!navMobile || !navToggle) return;
    navMobile.classList.toggle("is-open", open);
    navToggle.setAttribute("aria-expanded", String(open));
  }

  if (navToggle && navMobile) {
    navToggle.addEventListener("click", function () {
      setNav(!navMobile.classList.contains("is-open"));
    });
    navMobile.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () { setNav(false); });
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") setNav(false);
    });
  }

  // ---- Fade sections in as they scroll into view ----
  // "reveal-ready" switches off the CSS safety net that shows sections if this file fails to load.
  document.documentElement.classList.add("reveal-ready");
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var revealObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { revealObs.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("visible"); });
  }

  // ---- Service cards: show one card's details at a time ----
  var serviceCards = document.querySelectorAll(".service-card");

  function setCard(card, open) {
    card.classList.toggle("active", open);
    var btn = card.querySelector(".service-toggle");
    if (btn) btn.setAttribute("aria-expanded", String(open));
  }

  serviceCards.forEach(function (card) {
    // The "Details" button handles keyboard and screen readers;
    // its click bubbles up here, so tapping anywhere on the card works too.
    card.addEventListener("click", function () {
      var wasOpen = card.classList.contains("active");
      serviceCards.forEach(function (c) { setCard(c, false); });
      if (!wasOpen) setCard(card, true);
    });
  });

  // ---- Footer year ----
  var yearSpan = document.getElementById("year");
  if (yearSpan) yearSpan.textContent = String(new Date().getFullYear());

  // ---- Preferred date can't be in the past ----
  var dateInput = document.getElementById("preferredDate");
  if (dateInput) {
    var now = new Date();
    var pad = function (n) { return (n < 10 ? "0" : "") + n; };
    dateInput.min = now.getFullYear() + "-" + pad(now.getMonth() + 1) + "-" + pad(now.getDate());
  }

  // ---- Floating Call button: only show when no other call option is on screen ----
  var floating = document.querySelector(".call-floating");
  var watch = [document.querySelector(".hero-ctas"), document.getElementById("contact")].filter(Boolean);
  if (floating && watch.length && "IntersectionObserver" in window) {
    var onScreen = new Set();
    var callObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) onScreen.add(entry.target);
        else onScreen.delete(entry.target);
      });
      floating.classList.toggle("is-visible", onScreen.size === 0);
    }, { rootMargin: "-110px 0px 0px 0px" }); // ignore what's tucked under the sticky header
    watch.forEach(function (el) { callObs.observe(el); });
  } else if (floating) {
    floating.classList.add("is-visible");
  }
})();
