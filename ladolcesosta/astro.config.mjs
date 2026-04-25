import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import preact from '@astrojs/preact';

export default defineConfig({
  base: '/',
  output: 'static',
  site: 'https://ladolcesostahome.com',
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
