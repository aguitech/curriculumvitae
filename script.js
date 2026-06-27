/* Héctor Aguilar · Curriculum — interactions */

(() => {
  "use strict";

  // Year in footer
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ===== Theme toggle =====
  const THEME_KEY = "jarvis-cv-theme";
  const root = document.documentElement;
  const themeBtn = document.getElementById("theme-toggle");

  const setTheme = (t) => {
    root.setAttribute("data-theme", t);
    try { localStorage.setItem(THEME_KEY, t); } catch (_) {}
  };

  // Init from stored preference or system
  let stored = null;
  try { stored = localStorage.getItem(THEME_KEY); } catch (_) {}
  if (stored === "light" || stored === "dark") {
    setTheme(stored);
  } else {
    const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
    root.setAttribute("data-theme", prefersLight ? "light" : "dark");
  }

  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      const current = root.getAttribute("data-theme") || "dark";
      setTheme(current === "dark" ? "light" : "dark");
    });
  }

  // ===== Reveal on scroll (IntersectionObserver) =====
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }

  // ===== Animated counters =====
  const counters = document.querySelectorAll("[data-count]");
  if ("IntersectionObserver" in window) {
    const co = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const el = e.target;
          const target = parseInt(el.getAttribute("data-count") || "0", 10);
          const duration = 1400;
          const start = performance.now();
          const tick = (now) => {
            const elapsed = now - start;
            const t = Math.min(elapsed / duration, 1);
            // easeOutCubic
            const eased = 1 - Math.pow(1 - t, 3);
            el.textContent = Math.round(target * eased).toString();
            if (t < 1) requestAnimationFrame(tick);
            else el.textContent = target.toString();
          };
          requestAnimationFrame(tick);
          co.unobserve(el);
        }
      },
      { threshold: 0.4 }
    );
    counters.forEach((el) => co.observe(el));
  }

  // ===== Smooth active-link highlight on scroll =====
  const navLinks = document.querySelectorAll(".topbar__nav a");
  const sections = Array.from(navLinks)
    .map((a) => document.querySelector(a.getAttribute("href")))
    .filter(Boolean);

  if ("IntersectionObserver" in window && sections.length) {
    const so = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const id = "#" + e.target.id;
          const link = document.querySelector(`.topbar__nav a[href="${id}"]`);
          if (!link) continue;
          if (e.isIntersecting) {
            navLinks.forEach((l) => l.style.color = "");
            link.style.color = "var(--text)";
          }
        }
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach((s) => so.observe(s));
  }

  // ===== Magnetic buttons (subtle) =====
  const magneticBtns = document.querySelectorAll(".btn--primary");
  magneticBtns.forEach((btn) => {
    btn.addEventListener("mousemove", (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.12}px, ${y * 0.18}px)`;
    });
    btn.addEventListener("mouseleave", () => {
      btn.style.transform = "";
    });
  });
})();
