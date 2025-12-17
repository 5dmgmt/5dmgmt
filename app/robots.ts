/**
 * app/robots.ts
 *
 * robots.txt 自動生成
 */

import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/_next/'],
    },
    sitemap: 'https://www.5dmgmt.com/sitemap.xml',
  };
}
