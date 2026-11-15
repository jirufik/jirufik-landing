import { initTheme } from './theme.js';

initTheme();

// Sticky section navigation: highlight the section being read.
const head = document.querySelector('.site-head');
const navList = document.querySelector('.sections ul');
const links = new Map([...document.querySelectorAll('.sections a[data-nav]')].map((a) => [a.dataset.nav, a]));
const sections = [...document.querySelectorAll('[data-section]')];

if (head && navList && sections.length) {
  const root = document.documentElement;
  let current = null;
  let pending = false;

  const setHeadHeight = () => root.style.setProperty('--head-h', `${head.offsetHeight}px`);

  const setActive = (id) => {
    if (id === current) return;
    current = id;
    for (const [key, a] of links) {
      const on = key === id;
      a.classList.toggle('is-active', on);
      if (on) a.setAttribute('aria-current', 'location');
      else a.removeAttribute('aria-current');
    }
    // Keep the active item visible in the sideways-scrolling row (phones).
    const a = links.get(id);
    if (a) {
      const left = a.offsetLeft - navList.offsetLeft;
      if (left < navList.scrollLeft || left + a.offsetWidth > navList.scrollLeft + navList.clientWidth) {
        navList.scrollTo({ left: Math.max(0, left - 16), behavior: 'smooth' });
      }
    }
  };

  const toTop = document.querySelector('.to-top');
  if (toTop) {
    toTop.hidden = false;
    toTop.addEventListener('click', () => {
      const smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      window.scrollTo({ top: 0, behavior: smooth ? 'smooth' : 'auto' });
      // Drop the #section from the address bar so a reload starts at the top too.
      history.replaceState(null, '', location.pathname + location.search);
      document.querySelector('.brand')?.focus({ preventScroll: true });
    });
  }

  const update = () => {
    pending = false;
    head.classList.toggle('is-stuck', window.scrollY > 4);
    toTop?.classList.toggle('is-visible', window.scrollY > window.innerHeight * 0.6);
    const line = head.offsetHeight + window.innerHeight * 0.3;
    let id = null;
    for (const s of sections) {
      if (s.getBoundingClientRect().top <= line) id = s.dataset.section;
    }
    // At the very bottom the last section wins even if it is short.
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
      id = sections[sections.length - 1].dataset.section;
    }
    setActive(id);
  };

  const schedule = () => {
    if (!pending) {
      pending = true;
      requestAnimationFrame(update);
    }
  };

  setHeadHeight();
  update();
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', () => {
    setHeadHeight();
    schedule();
  });
}
