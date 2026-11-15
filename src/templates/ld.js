import { SITE_URL, EMAIL, GITHUB, TELEGRAM, pagePath } from '../site.js';
import { skillGroups } from '../data/skills.js';
import { projects } from '../data/projects.js';

const PERSON_ID = `${SITE_URL}/#person`;

export function person(t, lang) {
  return {
    '@type': 'Person',
    '@id': PERSON_ID,
    name: 'Jirufik',
    alternateName: ['Rufus', 'Жируфик', 'Руфус', 'jirufik'],
    url: SITE_URL + pagePath(lang, 'about'),
    image: `${SITE_URL}/images/jirufik-mark.png`,
    jobTitle: t.person.jobTitle,
    description: t.person.description,
    email: `mailto:${EMAIL}`,
    homeLocation: {
      '@type': 'Place',
      address: { '@type': 'PostalAddress', addressLocality: 'Iisalmi', addressCountry: 'FI' },
    },
    knowsLanguage: ['ru', 'en', 'fi'],
    knowsAbout: [
      ...Object.values(t.services),
      'Microservices',
      'Event-driven architecture',
      'Observability',
      'Agentic software development',
      'Computer vision',
      ...skillGroups.flatMap((g) => g.items.map((i) => i.name)),
    ],
    makesOffer: Object.values(t.services).map((name) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name, provider: { '@id': PERSON_ID }, areaServed: 'Worldwide' },
    })),
    sameAs: [GITHUB, TELEGRAM],
  };
}

export function website(t, lang) {
  return {
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: `${SITE_URL}/`,
    name: 'Jirufik',
    alternateName: ['Rufus', 'rufus.pro', 'Jirufik Developer'],
    description: t.home.description,
    inLanguage: lang,
    publisher: { '@id': PERSON_ID },
  };
}

export function homeGraph(t, lang) {
  return {
    '@context': 'https://schema.org',
    '@graph': [website(t, lang), person(t, lang)],
  };
}

export function aboutGraph(t, lang) {
  const url = SITE_URL + pagePath(lang, 'about');
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ProfilePage',
        '@id': `${url}#page`,
        url,
        name: t.about.title,
        description: t.about.description,
        inLanguage: lang,
        isPartOf: { '@id': `${SITE_URL}/#website` },
        mainEntity: { '@id': PERSON_ID },
      },
      person(t, lang),
      {
        '@type': 'ItemList',
        name: t.about.projectsTitle,
        itemListElement: projects.map((p, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          item: {
            '@type': 'SoftwareSourceCode',
            name: p.name,
            description: p.text[lang],
            codeRepository: p.repo,
            programmingLanguage: p.lang,
            ...(p.demo ? { url: p.demo } : {}),
            author: { '@id': PERSON_ID },
          },
        })),
      },
    ],
  };
}
