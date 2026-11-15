import { initTheme } from './theme.js';

initTheme();

// ========== Corner: language + theme, folded into one round button ==========

const corner = document.querySelector('.corner');
const cornerToggle = corner?.querySelector('.corner-toggle');

if (corner && cornerToggle) {
  const setOpen = (open) => {
    corner.classList.toggle('is-open', open);
    cornerToggle.setAttribute('aria-expanded', String(open));
  };

  cornerToggle.addEventListener('click', () => setOpen(!corner.classList.contains('is-open')));

  document.addEventListener('click', (e) => {
    if (!corner.contains(e.target)) setOpen(false);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && corner.classList.contains('is-open')) {
      setOpen(false);
      cornerToggle.focus();
    }
  });
}

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
