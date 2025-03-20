// @ts-check
import UnoCSS from 'unocss/astro';
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  integrations: [UnoCSS({
      injectReset: true,
  }), react()],
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
    },
  },
  adapter: vercel(),
  output: 'server',
});
