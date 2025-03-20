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
        // The filter function should return a boolean
      filter: (page) => true, // Include all pages in the sitemap
      
      // Use the entryLimit option if you want to control the number of entries per sitemap file
      entryLimit: 50000,
      
      // Use serialize to modify the URLs to use hashes instead
      serialize(item) {
        // Create a hash of the original URL
        const urlHash = createHash('md5').update(item.url).digest('hex');
        
        // Replace the original URL with the hashed version
        // Important: Keep the domain but change the path
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
