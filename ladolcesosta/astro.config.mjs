import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import preact from '@astrojs/preact';

export default defineConfig({
  output: 'static',
  site: 'https://ladolcesosta.com',
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
