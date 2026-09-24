import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://khabr.anasnet.com',
  integrations: [tailwind()],
  output: 'static',
});
