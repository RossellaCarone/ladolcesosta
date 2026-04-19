import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import preact from '@astrojs/preact';

export default defineConfig({
  base: '/ladolcesosta',
  output: 'static',
  site: 'https://rossellacarone.github.io',
  build: {
    assets: 'assets',
  },
  integrations: [tailwind(), preact()],
  vite: {
    server: {
      watch: {
        usePolling: true,
        interval: 500,
      },
    },
  },
});
