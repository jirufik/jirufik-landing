import { html, toString } from './html.js';
import { head, langSwitch } from './layout.js';
import { icon, brandIcon, mark, logo } from './icons.js';
import { aboutGraph } from './ld.js';
import { projects } from '../data/projects.js';
import { skillGroups } from '../data/skills.js';
import { EMAIL, GITHUB, TELEGRAM, TELEGRAM_HANDLE, WHATSAPP, pagePath } from '../site.js';

const NAV = ['services', 'toolbox', 'experience', 'approach', 'projects', 'contact'];
const FONTS = ['/fonts/jost-latin.woff2', '/fonts/jost-cyrillic.woff2'];

export function aboutPage(t, lang) {
  const a = t.about;
  const year = new Date().getFullYear();

  const services = a.services.map(
    (s) => html`<li class="service">
      <span class="service-icon">${icon(s.icon)}</span>
      <h3>${s.title}</h3>
      <p>${s.text}</p>
    </li>`,
  );

  const toolbox = skillGroups.map((g) => {
    const items = g.items.map((item) => {
      const l = logo(item.icon);
      return html`<li class="tool${l ? '' : ' tool--text'}"${l?.color ? html` style="--brand:${l.color}"` : ''}>${l ? l.svg : ''}<span>${item.name}</span></li>`;
    });
    return html`<div class="tool-group">
      <h3>${a.groups[g.id]}</h3>
      <ul class="tools">${items}</ul>
    </div>`;
  });

  const path = a.path.map(
    (p) => html`<li class="step">
      <h3>${p.title}</h3>
      <p>${p.text}</p>
    </li>`,
  );

  const principles = a.principles.map(
    (p) => html`<li><h3>${p.title}</h3><p>${p.text}</p></li>`,
  );

  const projectItems = projects.map(
    (p) => html`<li class="project">
      <img class="project-icon" src="${p.icon}" alt="" width="56" height="56" loading="lazy" decoding="async">
      <div class="project-body">
        <h3>${p.name}${p.wip ? html` <span class="badge">${a.wip}</span>` : ''}</h3>
        <p>${p.text[lang]}</p>
        <p class="tags">${p.tags.map((tag) => html`<span>${tag}</span>`)}</p>
        <p class="project-links">
          ${p.demo ? html`<a href="${p.demo}" target="_blank" rel="noopener">${icon('play')}${a.play}<span class="sr"> ${p.name}</span></a>` : ''}
          <a href="${p.repo}" target="_blank" rel="noopener">${icon('code')}${a.code}<span class="sr"> ${p.name}</span></a>
        </p>
      </div>
    </li>`,
  );

  const body = html`<a class="skip" href="#main">${t.skipLink}</a>
<header class="site-head">
<div class="topbar">
  <a class="brand" href="${pagePath(lang, 'home')}">${mark('mark--brand')}<span>jirufik</span></a>
  <div class="topbar-tools">
    ${langSwitch(t, lang, 'about')}
    <button class="theme-toggle" type="button" aria-label="${t.themeToggle}">
      ${icon('sun', 'theme-icon theme-icon--light')}${icon('moon', 'theme-icon theme-icon--dark')}
    </button>
  </div>
</div>
<nav class="sections" aria-label="${a.nav.label}">
  <ul>${NAV.map((id) => html`<li><a href="#${id}" data-nav="${id}">${a.nav[id]}</a></li>`)}</ul>
</nav>
</header>

<main id="main">
  <section class="hero wrap">
    ${mark('mark--hero', 'Jirufik')}
    <div class="hero-text">
      <h1>${a.hello}</h1>
      ${a.lead.map((p, i) => html`<p class="${i === 0 ? 'lead' : ''}">${p}</p>`)}
      <p class="cta">
        <a class="btn btn--main" href="mailto:${EMAIL}">${icon('mail')}${a.ctaWrite}</a>
        <a class="btn" href="${TELEGRAM}" target="_blank" rel="noopener">${brandIcon('telegram')}Telegram</a>
        <a class="btn" href="${WHATSAPP}" target="_blank" rel="noopener">${brandIcon('whatsapp')}WhatsApp</a>
      </p>
      <p class="cta-more"><a href="${GITHUB}" target="_blank" rel="noopener">${icon('code')}${a.ctaGithub}</a></p>
    </div>
  </section>

  <section class="wrap block" aria-labelledby="services" data-section="services">
    <h2 id="services">${a.servicesTitle}</h2>
    <ul class="services">${services}</ul>
  </section>

  <section class="wrap block" aria-labelledby="toolbox" data-section="toolbox">
    <h2 id="toolbox">${a.toolboxTitle}</h2>
    <p class="note">${a.toolboxNote}</p>
    <div class="toolbox">${toolbox}</div>
  </section>

  <section class="wrap block" aria-labelledby="experience" data-section="experience">
    <h2 id="experience">${a.domainsTitle}</h2>
    <ul class="domains">${a.domains.map((d) => html`<li>${d}</li>`)}</ul>
  </section>

  <section class="wrap block" aria-labelledby="path" data-section="experience">
    <h2 id="path">${a.pathTitle}</h2>
    <ul class="path">${path}</ul>
  </section>

  <section class="wrap block" aria-labelledby="approach" data-section="approach">
    <h2 id="approach">${a.principlesTitle}</h2>
    <ul class="principles">${principles}</ul>
  </section>

  <section class="wrap block" aria-labelledby="projects" data-section="projects">
    <h2 id="projects">${a.projectsTitle}</h2>
    <p class="note">${a.projectsNote}</p>
    <ul class="projects">${projectItems}</ul>
  </section>

  <section class="wrap block" aria-labelledby="off">
    <h2 id="off">${a.offTitle}</h2>
    <p class="off">${a.off}</p>
  </section>
</main>

<footer class="city">
  <div class="wrap contact" data-section="contact">
    <h2 id="contact">${a.contactTitle}</h2>
    <p>${a.contactText}</p>
    <p class="contact-links">
      <a class="email" href="mailto:${EMAIL}">${EMAIL}</a>
      <a class="email" href="${TELEGRAM}" target="_blank" rel="noopener">${TELEGRAM_HANDLE}</a>
      <a class="email" href="${WHATSAPP}" target="_blank" rel="noopener">WhatsApp</a>
    </p>
    <p class="where">${a.location}</p>
  </div>
  <picture class="skyline">
    <source type="image/avif" srcset="/images/vedropolis/v-768.avif 768w, /images/vedropolis/v-1280.avif 1280w, /images/vedropolis/v-1920.avif 1920w" sizes="100vw">
    <source type="image/webp" srcset="/images/vedropolis/v-768.webp 768w, /images/vedropolis/v-1280.webp 1280w, /images/vedropolis/v-1920.webp 1920w" sizes="100vw">
    <img src="/images/vedropolis/v-1280.webp" alt="Vedropolis" width="1920" height="453" loading="lazy" decoding="async">
  </picture>
  <p class="studio">© ${year} Jirufik. ${a.footer}</p>
</footer>
<button class="to-top" type="button" aria-label="${a.toTop}" hidden>${icon('up')}</button>
<script type="module" src="/js/about.js"></script>`;

  return '<!doctype html>\n' + toString(html`<html lang="${lang}">
<head>
${head({
  lang,
  page: 'about',
  title: a.title,
  description: a.description,
  ld: [aboutGraph(t, lang)],
  css: ['/css/about.css'],
  preload: lang === 'ru' ? FONTS : FONTS.slice(0, 1),
})}
</head>
<body class="about">
${body}
</body>
</html>
`);
}
