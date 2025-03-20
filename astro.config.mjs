// @ts-check
import UnoCSS from 'unocss/astro';
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel';

import sitemap from '@astrojs/sitemap';
import { createHash } from 'crypto';

// https://astro.build/config
export default defineConfig({
  integrations: [UnoCSS({
      injectReset: true,
  }), react(), sitemap(
      {
      filter: (page) => true,
      entryLimit: 50000,
      serialize(item) {
        const urlHash = createHash('md5').update(item.url).digest('hex');
        const url = new URL(item.url);
        url.pathname = `/hash/${urlHash}`;
        
        return {
          ...item,
          url: url.toString(),
        };
      },
      
      customPages: [],
      changefreq: 'weekly',
      lastmod: new Date(),
      }
    )],
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
    },
  },
  adapter: vercel(),
  output: 'server',
  site: 'https://croche-frontend-eta.vercel.app',
});
