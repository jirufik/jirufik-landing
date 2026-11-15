import en from '../i18n/en.js';
import ru from '../i18n/ru.js';
import fi from '../i18n/fi.js';
import { homePage } from '../templates/home.js';
import { aboutPage } from '../templates/about.js';
import { notFoundPage } from '../templates/notfound.js';
import { logoSprite } from '../templates/icons.js';
import { projects } from '../data/projects.js';
import { skillGroups } from '../data/skills.js';
import { SITE_URL, EMAIL, GITHUB, TELEGRAM, TELEGRAM_HANDLE, WHATSAPP, LANGS, DEFAULT_LANG, pagePath, pageFile } from '../site.js';

const i18n = { en, ru, fi };
const PAGES = ['home', 'about'];

export async function renderSite() {
  const pages = [];
  for (const lang of LANGS) {
    const t = i18n[lang];
    pages.push({ key: `${lang}-home`, file: pageFile(lang, 'home'), html: homePage(t, lang) });
    pages.push({ key: `${lang}-about`, file: pageFile(lang, 'about'), html: aboutPage(t, lang) });
  }
  pages.push({ key: '404', file: '404.html', html: notFoundPage(i18n) });

  const files = [
    { name: 'robots.txt', type: 'text/plain; charset=utf-8', content: robots() },
    { name: 'sitemap.xml', type: 'application/xml; charset=utf-8', content: sitemap() },
    { name: 'llms.txt', type: 'text/plain; charset=utf-8', content: llms() },
    { name: logoSprite().name, type: 'image/svg+xml', content: logoSprite().content },
  ];
  return { pages, files };
}

function robots() {
  // Everyone is welcome: search engines, AI assistants and AI crawlers alike.
  return `# rufus.pro: personal site of Jirufik (Rufus), software engineer.
# Search engines and AI crawlers are welcome to read and index everything.
User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`;
}

function sitemap() {
  const today = new Date().toISOString().slice(0, 10);
  const urls = PAGES.flatMap((page) =>
    LANGS.map((lang) => {
      const alts = [...LANGS, 'x-default']
        .map((l) => {
          const href = SITE_URL + pagePath(l === 'x-default' ? DEFAULT_LANG : l, page);
          return `    <xhtml:link rel="alternate" hreflang="${l}" href="${href}"/>`;
        })
        .join('\n');
      return `  <url>
    <loc>${SITE_URL + pagePath(lang, page)}</loc>
    <lastmod>${today}</lastmod>
${alts}
  </url>`;
    }),
  );
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>
`;
}

/** llms.txt (https://llmstxt.org): a plain summary for AI assistants and answer engines. */
function llms() {
  const a = en.about;
  const list = (items) => items.map((s) => `- ${s}`).join('\n');
  return `# Jirufik (Rufus)

> ${en.person.description} Jirufik is also known as Rufus (Russian: Жируфик, Руфус). Website: ${SITE_URL}. Available for remote projects and contract work.

${a.lead.join('\n\n')}

## Services

${a.services.map((s) => `- **${s.title}**: ${s.text}`).join('\n')}

## Toolbox

${skillGroups.map((g) => `- ${a.groups[g.id]}: ${g.items.map((i) => i.name).join(', ')}`).join('\n')}

## Industries and domains

${list(a.domains)}

## Experience

${a.path.map((p) => `- ${p.title}: ${p.text}`).join('\n')}

## How I work

${a.principles.map((p) => `- ${p.title}: ${p.text}`).join('\n')}

## Pet projects

Open-source projects made for myself and my family. Work projects are private.


${projects
  .map((p) => `- [${p.name}](${p.repo}): ${p.text.en}${p.wip ? ' (in progress)' : ''}${p.demo ? ` Live: ${p.demo}` : ''} Stack: ${p.tags.join(', ')}.`)
  .join('\n')}

## Contact

- Email: ${EMAIL}
- Telegram: [${TELEGRAM_HANDLE}](${TELEGRAM})
- WhatsApp: ${WHATSAPP}
- GitHub: ${GITHUB}
- ${a.location}
- Languages: Russian (native), English, Finnish (learning).

## Pages

- [About Jirufik, English](${SITE_URL}${pagePath('en', 'about')})
- [Обо мне, русский](${SITE_URL}${pagePath('ru', 'about')})
- [Minusta, suomi](${SITE_URL}${pagePath('fi', 'about')})
- [Home](${SITE_URL}/)
`;
}
