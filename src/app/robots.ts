import type { MetadataRoute } from 'next';
import { getBusiness } from '@/lib/data';

export default function robots(): MetadataRoute.Robots {
  const biz = getBusiness();

  // On non-production (Vercel preview/branch) deploys, block all crawling
  // so preview URLs are never indexed.
  if (process.env.VERCEL_ENV && process.env.VERCEL_ENV !== 'production') {
    return {
      rules: {
        userAgent: '*',
        disallow: '/',
      },
    };
  }

  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${biz.url}/sitemap.xml`,
    host: biz.url,
  };
}
