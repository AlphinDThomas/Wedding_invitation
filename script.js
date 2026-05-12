// Tailwind configuration
tailwind.config = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "on-primary-container": "#554300",
        "on-secondary-fixed-variant": "#574144",
        "primary-fixed-dim": "#e9c349",
        "on-error": "#ffffff",
        "outline-variant": "#d0c5af",
        "on-error-container": "#93000a",
        "on-tertiary-container": "#45463d",
        outline: "#7f7663",
        "on-secondary": "#ffffff",
        "secondary-fixed": "#fbdbde",
        "surface-container-low": "#f6f3f2",
        "tertiary-fixed": "#e4e3d7",
        "surface-container-highest": "#e5e2e1",
        "surface-variant": "#e5e2e1",
        surface: "#fcf9f8",
        "inverse-surface": "#313030",
        error: "#ba1a1a",
        "inverse-on-surface": "#f3f0ef",
        "on-surface-variant": "#4d4635",
        "surface-bright": "#fcf9f8",
        tertiary: "#5e5f56",
        "on-primary": "#ffffff",
        primary: "#735c00",
        "tertiary-container": "#b3b3a8",
        "primary-fixed": "#ffe088",
        "secondary-fixed-dim": "#debfc2",
        "surface-tint": "#735c00",
        secondary: "#70585b",
        "secondary-container": "#f8d8db",
        "on-secondary-fixed": "#281719",
        "surface-dim": "#dcd9d9",
        "surface-container-lowest": "#ffffff",
        "on-surface": "#1c1b1b",
        "error-container": "#ffdad6",
        "on-secondary-container": "#755d5f",
        "on-tertiary-fixed-variant": "#46473f",
        "surface-container": "#f0eded",
        "surface-container-high": "#eae7e7",
        "on-tertiary-fixed": "#1b1c15",
        "on-primary-fixed-variant": "#574500",
        "tertiary-fixed-dim": "#c7c7bc",
        "inverse-primary": "#e9c349",
        "on-tertiary": "#ffffff",
        "on-background": "#1c1b1b",
        "primary-container": "#d4af37",
        "on-primary-fixed": "#241a00",
        background: "#fcf9f8",
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
        "body-md": ["Montserrat"],
        "body-lg": ["Montserrat"],
        "display-lg": ["Playfair Display"],
        "label-caps": ["Montserrat"],
        "headline-sm": ["Playfair Display"],
        "display-lg-mobile": ["Playfair Display"],
        "headline-md": ["Playfair Display"],
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
