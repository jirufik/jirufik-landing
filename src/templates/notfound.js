import { html, toString } from './html.js';
import { head } from './layout.js';
import { mark } from './icons.js';
import { LANGS, pagePath } from '../site.js';

/** One 404 page for all languages: short text in each, links to every home page. */
export function notFoundPage(i18n) {
  const en = i18n.en;
  return '<!doctype html>\n' + toString(html`<html lang="en">
<head>
${head({
  lang: 'en',
  page: null,
  title: `404: ${en.notFound.title}`,
  description: en.notFound.text,
  css: ['/css/about.css'],
  preload: ['/fonts/jost-latin.woff2'],
})}
</head>
<body class="about notfound">
<main class="wrap nf">
  <a href="/" aria-label="Jirufik">${mark('mark--nf')}</a>
  <h1>404</h1>
  ${LANGS.map((l) => {
    const t = i18n[l].notFound;
    return html`<div class="nf-lang" lang="${l}">
      <h2>${t.title}</h2>
      <p>${t.text} <a href="${pagePath(l, 'home')}">${t.back}</a></p>
    </div>`;
  })}
</main>
<script type="module" src="/js/about.js"></script>
</body>
</html>
`);
}
