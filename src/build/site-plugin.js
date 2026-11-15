import { mkdir, writeFile, readFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';

const ROOT = resolve(import.meta.dirname, '../..');
const SITE = resolve(ROOT, 'site');
const RENDER = resolve(ROOT, 'src/build/render.js');

let textFiles = [];

async function writePages(rendered) {
  for (const page of rendered.pages) {
    const out = resolve(SITE, page.file);
    await mkdir(dirname(out), { recursive: true });
    // Skip unchanged files so Vite's watcher does not trigger needless reloads.
    const prev = await readFile(out, 'utf8').catch(() => null);
    if (prev !== page.html) await writeFile(out, page.html);
  }
  textFiles = rendered.files;
  return rendered.pages;
}

/** Used from vite.config.js before the config is built (input list needs the files). */
export async function generatePages() {
  const { renderSite } = await import(RENDER);
  return writePages(await renderSite());
}

export function sitePlugin() {
  return {
    name: 'jirufik-site',

    configureServer(server) {
      // Re-render pages when content or templates change.
      server.watcher.add(resolve(ROOT, 'src'));
      server.watcher.on('change', async (file) => {
        if (!file.startsWith(resolve(ROOT, 'src'))) return;
        server.moduleGraph.invalidateAll();
        try {
          const { renderSite } = await server.ssrLoadModule(RENDER);
          await writePages(await renderSite());
          server.ws.send({ type: 'full-reload' });
        } catch (err) {
          server.config.logger.error(`[jirufik-site] ${err.stack || err}`);
        }
      });

      // Dev: serve generated text files and mimic nginx (dir slash redirect, 404 page).
      server.middlewares.use(async (req, res, next) => {
        const path = (req.url || '/').split('?')[0];
        const file = textFiles.find((f) => '/' + f.name === path);
        if (file) {
          res.setHeader('Content-Type', file.type);
          res.end(file.content);
          return;
        }
        next();
      });
    },

    generateBundle() {
      for (const f of textFiles) {
        this.emitFile({ type: 'asset', fileName: f.name, source: f.content });
      }
    },
  };
}
