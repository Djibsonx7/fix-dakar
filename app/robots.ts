import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://fix.fenixfuz.com/sitemap.xml',
    host: 'https://fix.fenixfuz.com',
  };
}
