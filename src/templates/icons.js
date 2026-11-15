import * as si from 'simple-icons';
import { raw } from './html.js';

// The Jirufik mark, traced from the original Inkscape drawing (one continuous line).
export const MARK_PATH =
  'm 27.203007,295.24003 c -26.44409064,0 -47.884225,21.44014 -47.884225,47.88423 0,24.8457 18.9258535,45.26576 43.146468,47.64422 v -36.58649 c -0.05671,-0.0362 -0.113365,-0.0778 -0.168888,-0.11557 l -0.15111,0.21336 -6.995523,10.05328 -6.7999693,-8.52442 -6.8088588,-8.5244 13.8043831,-1.52888 4.808867,-0.52444 c 0.07322,-0.12923 0.149764,-0.26775 0.23111,-0.39112 -1.17887,-0.27903 -2.435335,-0.79815 -3.653317,-1.56443 -3.545783,-2.23081 -5.397037,-5.6588 -4.142204,-7.65331 1.254835,-1.9945 5.147511,-1.80413 8.693295,0.42667 1.656195,1.04199 2.941207,2.33988 3.715538,3.63555 0.06489,-0.0327 0.118704,-0.0694 0.186666,-0.0978 l 10.657728,-13.83106 0.05333,0.0267 c 0.03812,-0.0648 0.07735,-0.1344 0.124447,-0.19555 0.353922,-0.4597 0.882564,-0.70558 1.404423,-0.70223 0.07456,5.8e-4 0.148325,0.0162 0.222226,0.0267 0.26874,0.0382 0.536376,0.14418 0.764455,0.31999 0.72982,0.56263 0.846107,1.62693 0.25777,2.3911 -0.04704,0.0611 -0.116132,0.11554 -0.168888,0.16889 l 0.05333,0.0445 -9.199965,11.96439 c 0.921169,0.34016 1.854415,0.84281 2.74665,1.51999 0.87549,0.66449 1.606511,1.41336 2.168877,2.18665 l 9.182195,-11.91994 0.05332,0.0267 c 0.03812,-0.0647 0.06848,-0.12551 0.115571,-0.18667 0.588337,-0.76417 1.652387,-0.93595 2.382207,-0.37333 0.72982,0.56262 0.855004,1.63582 0.266667,2.39998 -0.04704,0.0611 -0.08946,0.12443 -0.14222,0.17778 l 0.03554,0.0445 -10.559949,13.72438 c 1.603314,0.0458 3.522793,0.66308 5.351084,1.81333 3.54578,2.2308 5.397038,5.64991 4.142199,7.64441 -1.254819,1.99451 -5.138627,1.80414 -8.684406,-0.42666 -2.029798,-1.27705 -3.503587,-2.95494 -4.159971,-4.52444 -0.0964,0.16391 -0.201488,0.32561 -0.311108,0.48 v 38.38202 c 24.220604,-2.37844 43.146469,-22.7985 43.146469,-47.6442 0,-26.44409 -21.440136,-47.88422 -47.884229,-47.88422 z';

/** The mark as inline SVG. `cls` controls size/animation from CSS. */
export function mark(cls = '', title = '') {
  return raw(`<svg class="mark ${cls}" viewBox="-22 293.5 98.2 99" ${
    title ? `role="img" aria-label="${title}"` : 'aria-hidden="true"'
  } focusable="false"><path pathLength="1" d="${MARK_PATH}"/><circle cx="27.84" cy="342.91" r="1.11"/><circle cx="31.24" cy="345.92" r="1.44"/></svg>`);
}

// Line icons (24px grid, stroke) for services and UI.
const LINE = {
  api: '<path d="M8 7 3 12l5 5M16 7l5 5-5 5M13.5 4l-3 16"/>',
  gears:
    '<circle cx="9" cy="9" r="3"/><path d="M9 2v2.2M9 13.8V16M2 9h2.2M13.8 9H16M4 4l1.6 1.6M12.4 12.4 14 14M4 14l1.6-1.6M12.4 5.6 14 4"/><circle cx="17" cy="17" r="2.2"/><path d="M17 12.6v1.6M17 19.8v1.6M12.6 17h1.6M19.8 17h1.6"/>',
  spark:
    '<path d="M12 3c.6 4.6 2.4 6.4 7 7-4.6.6-6.4 2.4-7 7-.6-4.6-2.4-6.4-7-7 4.6-.6 6.4-2.4 7-7Z"/><path d="M19 15.5c.25 1.9 1 2.6 2.5 2.8-1.5.25-2.25 1-2.5 2.7-.25-1.7-1-2.45-2.5-2.7 1.5-.2 2.25-.9 2.5-2.8Z"/>',
  stack:
    '<path d="m12 3 9 4.5-9 4.5-9-4.5L12 3Z"/><path d="m3 12 9 4.5 9-4.5"/><path d="m3 16.5 9 4.5 9-4.5"/>',
  sun: '<circle cx="12" cy="12" r="4.5"/><path d="M12 1.5v2.5M12 20v2.5M1.5 12H4M20 12h2.5M4.6 4.6l1.8 1.8M17.6 17.6l1.8 1.8M4.6 19.4l1.8-1.8M17.6 6.4l1.8-1.8"/>',
  moon: '<path d="M20.5 14.2A8.5 8.5 0 1 1 9.8 3.5a6.8 6.8 0 0 0 10.7 10.7Z"/>',
  mail: '<rect x="3" y="5.5" width="18" height="13" rx="2"/><path d="m3.5 7 8.5 6.5L20.5 7"/>',
  play: '<path d="M8 5.5v13l10.5-6.5L8 5.5Z"/>',
  code: '<path d="M8 7 3 12l5 5M16 7l5 5-5 5"/>',
  up: '<path d="M12 19V5M5.5 11.5 12 5l6.5 6.5"/>',
};

/** Brand glyph (filled, simple-icons) for UI buttons, e.g. Telegram. */
export function brandIcon(slug, cls = 'i') {
  const b = brand(slug);
  return raw(`<svg class="${cls}" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false"><path d="${b.path}"/></svg>`);
}

export function icon(name, cls = 'i') {
  return raw(
    `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${LINE[name]}</svg>`,
  );
}

const brand = (slug) => si[`si${slug.charAt(0).toUpperCase()}${slug.slice(1)}`];

/** Relative luminance of a hex colour (0..1). */
function luminance(hex) {
  const [r, g, b] = [0, 2, 4].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

import { createHash } from 'node:crypto';
import { skillGroups } from '../data/skills.js';


let spriteCache = null;

/** One SVG sprite with every toolbox logo, served as a cacheable file. */
export function logoSprite() {
  if (spriteCache) return spriteCache;
  const symbols = [];
  for (const g of skillGroups) {
    for (const item of g.items) {
      const b = item.icon && brand(item.icon);
      if (item.icon && !b) console.warn(`[icons] no simple-icons logo for "${item.icon}"`);
      if (b) symbols.push(`<symbol id="si-${item.icon}" viewBox="0 0 24 24"><path d="${b.path}"/></symbol>`);
    }
  }
  const content = `<svg xmlns="http://www.w3.org/2000/svg">${symbols.join('')}</svg>\n`;
  const version = createHash('sha256').update(content).digest('hex').slice(0, 10);
  spriteCache = { name: 'images/logos.svg', content, url: `/images/logos.svg?v=${version}` };
  return spriteCache;
}

/** {svg, color} for a toolbox logo, or null if simple-icons has no such logo. */
export function logo(slug) {
  const b = slug && brand(slug);
  if (!b) return null;
  // Near-black and near-white brand colours vanish in one of the themes;
  // those fall back to the accent colour on hover.
  const l = luminance(b.hex);
  const color = l < 0.03 || l > 0.85 ? null : `#${b.hex}`;
  return {
    svg: raw(`<svg class="logo" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><use href="${logoSprite().url}#si-${slug}"/></svg>`),
    color,
  };
}
