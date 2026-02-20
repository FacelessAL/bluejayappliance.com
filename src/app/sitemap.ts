import type { MetadataRoute } from 'next';
import {
  getBusiness,
  getAllServices,
  getAllLocations,
  getAllPublishedServiceLocationPairs,
} from '@/lib/data';

export default function sitemap(): MetadataRoute.Sitemap {
  const biz = getBusiness();
  const baseUrl = biz.url;
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about-us`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact-us`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/service-area`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/gallery`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/reviews`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms-of-service`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  // General service pages (always in sitemap)
  const servicePages: MetadataRoute.Sitemap = getAllServices().map((service) => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // Location landing pages (always in sitemap)
  const locationPages: MetadataRoute.Sitemap = getAllLocations().map((location) => ({
    url: `${baseUrl}/${location.slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // Service-location pages (ONLY published ones appear in sitemap)
  const serviceLocationPages: MetadataRoute.Sitemap = getAllPublishedServiceLocationPairs().map(
    (pair) => ({
      url: `${baseUrl}/${pair.locationSlug}/${pair.serviceSlug}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })
  );

  return [
    ...staticPages,
    ...servicePages,
    ...locationPages,
    ...serviceLocationPages,
  ];
}
