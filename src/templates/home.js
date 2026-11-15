import { html, toString } from './html.js';
import { head, langSwitch } from './layout.js';
import { icon } from './icons.js';
import { homeGraph } from './ld.js';
import { projects } from '../data/projects.js';
import { EMAIL, pagePath } from '../site.js';

// The home page keeps its original look: hand-drawn sky, clouds, the Jirufik
// logo and a row of project icons. The logo now leads to the About page.
export function homePage(t, lang) {
  const footerLinks = projects.map((p) => {
    const href = p.demo || p.repo;
    return html`<a href="${href}" class="footer-link" title="${p.name}" aria-label="${p.name}" target="_blank" rel="noopener">
      <img src="${p.icon}" alt="" width="50" height="50" decoding="async">
    </a>`;
  });

  return '<!doctype html>\n' + toString(html`<html lang="${lang}">
<head>
${head({
  lang,
  page: 'home',
  title: t.home.title,
  description: t.home.description,
  ld: [homeGraph(t, lang)],
  css: ['/css/home.css'],
})}
</head>
<body>
  <div class="scene">
    <div class="parallax-layer parallax-body" aria-hidden="true"></div>
    <div class="parallax-layer parallax-outer" aria-hidden="true"></div>
    <div class="parallax-layer parallax-inner" aria-hidden="true"></div>

    <div class="cloud-layer cloud-far" aria-hidden="true"><div class="cloud-strip"></div></div>
    <div class="cloud-layer cloud-near" aria-hidden="true"><div class="cloud-strip"></div></div>
    <div class="cloud-layer cloud-near-alt" aria-hidden="true"><div class="cloud-strip"></div></div>

    <main class="content">
      <h1 class="title">${t.home.heading}</h1>
      <div class="logo">
        <a href="${pagePath(lang, 'about')}" aria-label="${t.home.logoLabel}">
          <img src="/images/Jirufik7_300.png" alt="Jirufik" width="300" height="351" fetchpriority="high">
        </a>
      </div>
    </main>

    <footer class="footer">
      ${footerLinks}
      <a href="mailto:${EMAIL}" class="footer-link" title="${EMAIL}" aria-label="${t.home.emailLabel}">
        <img src="/images/email.png" alt="" width="50" height="50" decoding="async">
      </a>
    </footer>
  </div>

  <div class="corner">
    ${langSwitch(t, lang, 'home')}
    <button class="theme-toggle" type="button" aria-label="${t.themeToggle}">
      ${icon('sun', 'theme-icon theme-icon--light')}${icon('moon', 'theme-icon theme-icon--dark')}
    </button>
  </div>

  <script type="module" src="/js/home.js"></script>
</body>
</html>
`);
}
