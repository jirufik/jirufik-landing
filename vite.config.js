import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import { sitePlugin, generatePages } from './src/build/site-plugin.js';

// Pages are rendered from src/ (templates + i18n) into site/ before Vite starts,
// so every URL is plain pre-rendered HTML: crawlers and AI bots see all content
// without running JavaScript.
const pages = await generatePages();

export default defineConfig({
  root: 'site',
  publicDir: resolve(import.meta.dirname, 'public'),
  build: {
    outDir: resolve(import.meta.dirname, 'dist'),
    emptyOutDir: true,
    assetsInlineLimit: 0,
    rollupOptions: {
      input: Object.fromEntries(pages.map((p) => [p.key, resolve(import.meta.dirname, 'site', p.file)])),
    },
  },
  server: {
    port: 4000,
  },
  preview: {
    port: 4001,
  },
  plugins: [sitePlugin()],
});
