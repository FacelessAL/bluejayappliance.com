import business from '@/data/business.json';
import services from '@/data/services.json';
import locations from '@/data/locations.json';
import serviceLocations from '@/data/service-locations.json';

export type Business = typeof business;
export type Service = (typeof services)[number];
export type Location = (typeof locations)[number];
export type ServiceLocationMap = typeof serviceLocations;

export function getBusiness(): Business {
  return business;
}

export function getAllServices(): Service[] {
  return services;
}

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export function getAllLocations(): Location[] {
  return locations;
}

export function getLocationBySlug(slug: string): Location | undefined {
  return locations.find((l) => l.slug === slug);
}

export function isServiceLocationPublished(
  locationSlug: string,
  serviceSlug: string
): boolean {
  const slMap = serviceLocations as unknown as Record<string, Record<string, { published: boolean }>>;
  const locationData = slMap[locationSlug];
  if (!locationData) return false;
  const serviceData = locationData[serviceSlug];
  if (!serviceData) return false;
  return serviceData.published;
}

export function getPublishedServiceSlugsForLocation(locationSlug: string): string[] {
  const slMap = serviceLocations as unknown as Record<string, Record<string, { published: boolean }>>;
  const locationData = slMap[locationSlug];
  if (!locationData) return [];
  return Object.entries(locationData)
    .filter(([, val]) => val.published)
    .map(([slug]) => slug);
}

export function getAllPublishedServiceLocationPairs(): { locationSlug: string; serviceSlug: string }[] {
  const pairs: { locationSlug: string; serviceSlug: string }[] = [];
  const slMap = serviceLocations as unknown as Record<string, Record<string, { published: boolean }>>;
  for (const [locationSlug, servicesMap] of Object.entries(slMap)) {
    if (locationSlug === '_README') continue;
    for (const [serviceSlug, val] of Object.entries(servicesMap)) {
      if (val.published) {
        pairs.push({ locationSlug, serviceSlug });
      }
    }
  }
  return pairs;
}

export function getServiceLocationContent(
  locationSlug: string,
  serviceSlug: string
): { localParagraph?: string } | undefined {
  const slMap = serviceLocations as unknown as Record<string, Record<string, { published: boolean; localParagraph?: string }>>;
  const locationData = slMap[locationSlug];
  if (!locationData) return undefined;
  return locationData[serviceSlug];
}

export function getLocationSlugs(): string[] {
  return locations.map((l) => l.slug);
}

export function getServiceSlugs(): string[] {
  return services.map((s) => s.slug);
}
