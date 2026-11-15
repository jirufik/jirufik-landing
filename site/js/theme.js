// Theme: the initial value is set by an inline script in <head> (no flash).
// Here we only handle the toggle and follow the system while the user has not chosen.

const KEY = 'jirufik-theme';
const root = document.documentElement;
const media = window.matchMedia('(prefers-color-scheme: dark)');

function saved() {
  try {
    const v = localStorage.getItem(KEY);
    return v === 'light' || v === 'dark' ? v : null;
  } catch {
    return null;
  }
}

function apply(theme) {
  if (theme === 'dark') root.setAttribute('data-theme', 'dark');
  else root.removeAttribute('data-theme');
}

export function initTheme() {
  apply(saved() || (media.matches ? 'dark' : 'light'));

  for (const btn of document.querySelectorAll('.theme-toggle')) {
    btn.addEventListener('click', () => {
      const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      apply(next);
      try {
        localStorage.setItem(KEY, next);
      } catch {
        /* private mode: theme still switches for this page */
      }
    });
  }

  media.addEventListener('change', (e) => {
    if (!saved()) apply(e.matches ? 'dark' : 'light');
  });
}
