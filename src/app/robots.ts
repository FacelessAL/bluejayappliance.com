import type { MetadataRoute } from 'next';
import { getBusiness } from '@/lib/data';

export default function robots(): MetadataRoute.Robots {
  const biz = getBusiness();

  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${biz.url}/sitemap.xml`,
  };
}
