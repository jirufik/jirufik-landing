import { html, raw, jsonLd } from './html.js';
import { SITE_URL, LANGS, LOCALES, DEFAULT_LANG, pagePath } from '../site.js';

// Runs before first paint so the saved / system theme never flashes.
const THEME_BOOT = `(function(){try{var t=localStorage.getItem('jirufik-theme');if(t!=='light'&&t!=='dark')t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';if(t==='dark')document.documentElement.setAttribute('data-theme','dark')}catch(e){}})()`;

/**
 * <head> shared by all pages.
 * @param {object} o
 * @param {string} o.lang
 * @param {string|null} o.page  page id for canonical/hreflang ('home' | 'about'); null for 404
 * @param {string} o.title
 * @param {string} o.description
 * @param {object[]} o.ld        JSON-LD objects
 * @param {string[]} o.css       stylesheets (Vite-processed)
 * @param {string[]} [o.preload] font files to preload
 */
export function head({ lang, page, title, description, ld = [], css = [], preload = [] }) {
  const url = page ? SITE_URL + pagePath(lang, page) : null;
  const ogImage = `${SITE_URL}/images/og/og-${lang}.png`;
  return html`<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${title}</title>
<meta name="description" content="${description}">
<meta name="author" content="Jirufik (Rufus)">
${page ? html`<meta name="robots" content="index, follow, max-image-preview:large">` : html`<meta name="robots" content="noindex">`}
${url ? html`<link rel="canonical" href="${url}">` : ''}
${page
    ? LANGS.map((l) => html`<link rel="alternate" hreflang="${l}" href="${SITE_URL + pagePath(l, page)}">\n`)
    : ''}${page ? html`<link rel="alternate" hreflang="x-default" href="${SITE_URL + pagePath(DEFAULT_LANG, page)}">` : ''}
<link rel="alternate" type="text/plain" title="LLM summary" href="/llms.txt">
<meta property="og:type" content="${page === 'about' ? 'profile' : 'website'}">
<meta property="og:site_name" content="Jirufik">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${description}">
${url ? html`<meta property="og:url" content="${url}">` : ''}
<meta property="og:image" content="${ogImage}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:locale" content="${LOCALES[lang]}">
${LANGS.filter((l) => l !== lang).map((l) => html`<meta property="og:locale:alternate" content="${LOCALES[l]}">\n`)}<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" media="(prefers-color-scheme: light)" content="#ffffff">
<meta name="theme-color" media="(prefers-color-scheme: dark)" content="#181818">
<meta name="color-scheme" content="light dark">
<link rel="icon" href="/favicon.ico" sizes="32x32">
<link rel="icon" href="/images/favicon/jirufik.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/images/favicon/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
${preload.map((f) => html`<link rel="preload" href="${f}" as="font" type="font/woff2" crossorigin>\n`)}<script>${raw(THEME_BOOT)}</script>
${css.map((c) => html`<link rel="stylesheet" href="${c}">\n`)}${ld.map(jsonLd)}`;
}

/** Links to the same page in the other languages. */
export function langSwitch(t, lang, page) {
  return html`<nav class="langs" aria-label="${t.langSwitch}">${LANGS.map((l) =>
    l === lang
      ? html`<span class="lang is-current" aria-current="page" lang="${l}">${l.toUpperCase()}</span>`
      : html`<a class="lang" href="${pagePath(l, page)}" hreflang="${l}" lang="${l}">${l.toUpperCase()}</a>`,
  )}</nav>`;
}
