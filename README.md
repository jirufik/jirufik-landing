# rufus.pro

Personal site of Jirufik (Rufus): the hand-drawn home page and an About page in English, Russian and Finnish.

## How it works

Pages are rendered at build time from `src/` into `site/` (plain HTML, no client-side rendering), then Vite bundles them into `dist/`:

- `src/i18n/{en,ru,fi}.js`: all texts (Russian is the reference)
- `src/data/projects.js`, `src/data/skills.js`: projects and the toolbox
- `src/templates/`: home, about, 404, `<head>` with SEO tags and JSON-LD
- `src/build/render.js`: pages plus `robots.txt`, `sitemap.xml`, `llms.txt`, `images/logos.svg`
- `site/css`, `site/js`: styles and the small amount of JS (theme toggle, parallax)

URLs: `/`, `/about/`, `/ru/`, `/ru/about/`, `/fi/`, `/fi/about/`.

## Commands

```sh
npm ci
npm run dev       # http://localhost:4000, re-renders on changes in src/
npm run build     # dist/
docker build -t jirufik-landing . && docker run --rm -p 8088:80 jirufik-landing
```

## Deploy

Hetzner VPS, behind nginx-proxy-manager and Cloudflare:

```sh
git push origin master
ssh hz-vps "/opt/apps/deploy.sh jirufik-landing"
```

Tech logos: [Simple Icons](https://simpleicons.org) (CC0). Font: Jost (SIL OFL 1.1, `public/fonts/OFL.txt`).
