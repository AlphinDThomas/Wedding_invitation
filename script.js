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
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.25, 1, 0.5, 1)',
      }
    },
  },
};

// Custom Cursor Logic
const initCursor = () => {
  const cursor = document.getElementById("custom-cursor");
  if (!cursor) return;

  document.addEventListener("mousemove", (e) => {
    cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
  });

  const hoverElements = document.querySelectorAll("a, button, input, textarea, label, .gallery-item");
  hoverElements.forEach((el) => {
    el.addEventListener("mouseenter", () => cursor.classList.add("hovering"));
    el.addEventListener("mouseleave", () => cursor.classList.remove("hovering"));
  });
};

// Background Music Toggle Logic
const initMusic = () => {
  const musicBtn = document.getElementById("music-toggle");
  const bgMusic = document.getElementById("bg-music");
  let isPlaying = false;

  if (musicBtn && bgMusic) {
    musicBtn.addEventListener("click", () => {
      if (isPlaying) {
        bgMusic.pause();
        musicBtn.innerHTML = "music_off";
        musicBtn.classList.remove("text-primary");
        musicBtn.classList.add("text-on-surface-variant");
      } else {
        bgMusic.play();
        musicBtn.innerHTML = "music_note";
        musicBtn.classList.add("text-primary");
        musicBtn.classList.remove("text-on-surface-variant");
      }
      isPlaying = !isPlaying;
    });
  }
};

// Magnetic Button Logic
const initMagneticButtons = () => {
  const magnets = document.querySelectorAll(".magnetic");
  
  magnets.forEach((magnet) => {
    magnet.addEventListener("mousemove", (e) => {
      const rect = magnet.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      magnet.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });
    
    magnet.addEventListener("mouseleave", () => {
      magnet.style.transform = "translate(0px, 0px)";
      magnet.style.transition = "transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)";
    });
    
    magnet.addEventListener("mouseenter", () => {
      magnet.style.transition = "none";
    });
  });
};

// Smooth scroll reveal via IntersectionObserver with Stagger support
const initScrollReveal = () => {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  };

  const observer = new IntersectionObserver((entries) => {
    let delay = 0;
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add("active");
        }, delay);
        delay += 100; // Stagger delay
        observer.unobserve(entry.target); // Only reveal once
      }
    });
  }, observerOptions);

  document.querySelectorAll(".reveal-up").forEach((el) => {
    observer.observe(el);
  });
};


// Interactive Fireflies Canvas
const initParticles = () => {
  const canvas = document.getElementById("particles-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  
  let width, height;
  let particles = [];
  
  const resize = () => {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
  };
  
  window.addEventListener("resize", resize);
  resize();
  
  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.size = Math.random() * 2 + 0.5;
      this.speedX = Math.random() * 1 - 0.5;
      this.speedY = Math.random() * -1 - 0.5;
      this.alpha = Math.random() * 0.5 + 0.1;
      this.baseAlpha = this.alpha;
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      
      // Gentle flicker
      this.alpha = this.baseAlpha + Math.sin(Date.now() * 0.003 + this.x) * 0.2;
      
      // Mouse interaction (repel)
      const dx = mouse.x - this.x;
      const dy = mouse.y - this.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 100) {
        this.x -= dx * 0.02;
        this.y -= dy * 0.02;
      }
      
      if (this.y < 0) this.y = height;
      if (this.x < 0) this.x = width;
      if (this.x > width) this.x = 0;
    }
    draw() {
      ctx.fillStyle = `rgba(204, 166, 119, ${Math.max(0, this.alpha)})`;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  
  for (let i = 0; i < 50; i++) {
    particles.push(new Particle());
  }
  
  let mouse = { x: 0, y: 0 };
  window.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });
  
  const animate = () => {
    ctx.clearRect(0, 0, width, height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(animate);
  };
  animate();
};

// Deep Parallax Effect
const initParallax = () => {
  const parallaxImages = document.querySelectorAll(".parallax-img");
  
  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    parallaxImages.forEach(img => {
      const speed = img.getAttribute("data-speed") || 0.15;
      const rect = img.parentElement.getBoundingClientRect();
      const elementCenter = rect.top + rect.height / 2;
      const viewportCenter = window.innerHeight / 2;
      
      // Only parallax when in viewport
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        const distance = elementCenter - viewportCenter;
        img.style.transform = `translateY(${distance * speed}px) scale(1.15)`;
      }
    });
  });
};

// Loading screen hide logic
window.addEventListener("load", () => {
  const loader = document.getElementById("loading-screen");
  if(loader) {
    setTimeout(() => {
      loader.style.opacity = "0";
      setTimeout(() => {
        loader.style.display = "none";
        
        // Initialize other things after loading
        initCursor();
        initMusic();
        initMagneticButtons();
        initScrollReveal();
        initParticles();
        initParallax();
        
        // Trigger hero animations
        document.querySelectorAll("#home .reveal-up").forEach((el, index) => {
          setTimeout(() => {
            el.classList.add("active");
          }, index * 200);
        });
        
      }, 1000);
    }, 1500);
  }
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
