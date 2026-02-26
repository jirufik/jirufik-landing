// ========== Theme Toggle ==========

const THEME_KEY = 'jirufik-theme';

function getPreferredTheme() {
  const saved = localStorage.getItem(THEME_KEY);
  if (saved) return saved;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyTheme(theme) {
  if (theme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
  } else {
    document.documentElement.removeAttribute('data-theme');
  }
  localStorage.setItem(THEME_KEY, theme);
}

function toggleTheme() {
  const current = document.documentElement.hasAttribute('data-theme') ? 'dark' : 'light';
  applyTheme(current === 'dark' ? 'light' : 'dark');
}

// Apply theme immediately (before DOMContentLoaded to avoid flash)
applyTheme(getPreferredTheme());

document.querySelector('.theme-toggle')?.addEventListener('click', toggleTheme);

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
  if (!localStorage.getItem(THEME_KEY)) {
    applyTheme(e.matches ? 'dark' : 'light');
  }
});

// ========== Parallax ==========

const layers = [
  { el: document.querySelector('.parallax-body'), multiplier: -0.1 },
  { el: document.querySelector('.parallax-outer'), multiplier: 0.02, unit: '%', initial: 70 },
  { el: document.querySelector('.parallax-inner'), multiplier: 0.3 },
];

let parallaxX = 0; // -1 to 1
let rafPending = false;

function updateParallax() {
  rafPending = false;
  for (const layer of layers) {
    if (!layer.el) continue;
    const offset = parallaxX * layer.multiplier * 100;
    if (layer.unit === '%') {
      layer.el.style.backgroundPositionX = `${(layer.initial || 0) + offset}%`;
    } else {
      layer.el.style.backgroundPositionX = `${offset}px`;
    }
  }
}

function scheduleParallax() {
  if (!rafPending) {
    rafPending = true;
    requestAnimationFrame(updateParallax);
  }
}

// Mouse parallax (desktop only — mobile uses CSS auto-drift)
if (window.matchMedia('(hover: hover)').matches) {
  document.addEventListener('mousemove', (e) => {
    parallaxX = (e.clientX / window.innerWidth - 0.5) * 2;
    scheduleParallax();
  });
}
