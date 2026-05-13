// Tailwind configuration
tailwind.config = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#cca677", // Soft warm gold
        "on-primary": "#ffffff",
        "primary-container": "#f8ebd8",
        "on-primary-container": "#4a351a",
        secondary: "#dfbaba", // Soft blush pink
        "on-secondary": "#ffffff",
        "secondary-container": "#fceded",
        "on-secondary-container": "#4a2c2c",
        tertiary: "#9eb3aa", // Soft sage green
        "on-tertiary": "#ffffff",
        "tertiary-container": "#e1efeb",
        "on-tertiary-container": "#273b33",
        background: "#fdfdfc", // Soft warm white
        "on-background": "#2c2a28", // Charcoal
        surface: "#ffffff",
        "on-surface": "#2c2a28",
        "surface-variant": "#f4f1ed",
        "on-surface-variant": "#5a5652",
        "surface-container-low": "#fcfbf9",
        "surface-container": "#f6f4f1",
        "surface-dim": "#e6e3e0",
        outline: "#b3aca4",
        "outline-variant": "#e0dcd7",
        "inverse-surface": "#2c2a28",
        "inverse-on-surface": "#f4f1ed",
        "inverse-primary": "#ebd2b4",
      },
      borderRadius: {
        DEFAULT: "0.125rem",
        lg: "0.25rem",
        xl: "0.5rem",
        full: "0.75rem",
      },
      spacing: {
        gutter: "24px",
        "section-gap": "160px",
        "margin-mobile": "24px",
        unit: "8px",
        "margin-desktop": "80px",
        "container-max": "1200px",
      },
      fontFamily: {
        "body-md": ["Montserrat", "sans-serif"],
        "body-lg": ["Montserrat", "sans-serif"],
        "display-lg": ["Playfair Display", "serif"],
        "label-caps": ["Montserrat", "sans-serif"],
        "headline-sm": ["Playfair Display", "serif"],
        "display-lg-mobile": ["Playfair Display", "serif"],
        "headline-md": ["Playfair Display", "serif"],
        "accent-script": ["'Great Vibes'", "cursive"], // New elegant script font
      },
      fontSize: {
        "body-md": ["16px", { lineHeight: "1.6", fontWeight: "400" }],
        "body-lg": [
          "18px",
          { lineHeight: "1.6", letterSpacing: "0.01em", fontWeight: "300" },
        ],
        "display-lg": [
          "64px",
          { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "700" },
        ],
        "label-caps": [
          "12px",
          { lineHeight: "1.0", letterSpacing: "0.2em", fontWeight: "600" },
        ],
        "headline-sm": ["24px", { lineHeight: "1.4", fontWeight: "500" }],
        "display-lg-mobile": ["40px", { lineHeight: "1.2", fontWeight: "700" }],
        "headline-md": ["32px", { lineHeight: "1.3", fontWeight: "600" }],
      },
    },
  },
};

// Loading screen hide logic
window.addEventListener("load", () => {
  const loader = document.getElementById("loading-screen");
  setTimeout(() => {
    loader.style.opacity = "0";
    setTimeout(() => {
      loader.style.display = "none";
    }, 1000);
  }, 1500);
});

// Smooth scroll reveal via IntersectionObserver
const observerOptions = {
  threshold: 0.1,
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("opacity-100", "translate-y-0");
      entry.target.classList.remove("opacity-0", "translate-y-10");
    }
  });
}, observerOptions);

document.querySelectorAll("section > div").forEach((el) => {
  el.classList.add(
    "transition-all",
    "duration-1000",
    "opacity-0",
    "translate-y-10",
  );
  observer.observe(el);
});

// Countdown Timer Logic
const countdown = () => {
  const countDate = new Date("December 12, 2026 10:30:00").getTime();
  const now = new Date().getTime();
  const gap = countDate - now;

  if (gap < 0) {
    document.getElementById("days").innerText = "00";
    document.getElementById("hours").innerText = "00";
    document.getElementById("mins").innerText = "00";
    document.getElementById("secs").innerText = "00";
    return;
  }

  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const d = Math.floor(gap / day);
  const h = Math.floor((gap % day) / hour);
  const m = Math.floor((gap % hour) / minute);
  const s = Math.floor((gap % minute) / second);

  const daysEl = document.getElementById("days");
  const hoursEl = document.getElementById("hours");
  const minsEl = document.getElementById("mins");
  const secsEl = document.getElementById("secs");

  if (daysEl) daysEl.innerText = d < 10 ? "0" + d : d;
  if (hoursEl) hoursEl.innerText = h < 10 ? "0" + h : h;
  if (minsEl) minsEl.innerText = m < 10 ? "0" + m : m;
  if (secsEl) secsEl.innerText = s < 10 ? "0" + s : s;
};

setInterval(countdown, 1000);
countdown(); // initial call
