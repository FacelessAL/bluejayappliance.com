import { getBusiness } from '@/lib/data';

type SchemaType =
  | 'LocalBusiness'
  | 'Service'
  | 'AboutPage'
  | 'ContactPage'
  | 'WebPage'
  | 'WebSite'
  | 'ServiceIndex';

interface FAQItem {
  question: string;
  answer: string;
}

interface ServiceOffering {
  name: string;
  description: string;
  url: string;
}

interface SchemaMarkupProps {
  type: SchemaType;
  pageName?: string;
  pageDescription?: string;
  pageUrl?: string;
  serviceType?: string;
  areaServed?: string;
  breadcrumbs?: { name: string; url: string }[];
  faqItems?: FAQItem[];
  serviceOfferings?: ServiceOffering[];
}

export default function SchemaMarkup({
  type,
  pageName,
  pageDescription,
  pageUrl,
  serviceType,
  areaServed,
  breadcrumbs,
  faqItems,
  serviceOfferings,
}: SchemaMarkupProps) {
  const biz = getBusiness();
  const schemas: object[] = [];
  const businessId = `${biz.url}/#organization`;
  const localBusinessId = `${biz.url}/#localbusiness`;

  // Organization schema (always present)
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': businessId,
    name: biz.name,
    url: biz.url,
    logo: `${biz.url}/images/logo.webp`,
    telephone: biz.phone,
    email: biz.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: biz.address.street,
      addressLocality: biz.address.city,
      addressRegion: biz.address.state,
      postalCode: biz.address.zip,
      addressCountry: 'US',
    },
    sameAs: [biz.social.facebook, biz.social.linkedin],
  };
  schemas.push(organizationSchema);

  // LocalBusiness schema
  if (type === 'LocalBusiness') {
    const localBusinessSchema: Record<string, unknown> = {
      '@context': 'https://schema.org',
      '@type': biz.schemaType || 'LocalBusiness',
      '@id': localBusinessId,
      name: biz.name,
      url: pageUrl || biz.url,
      telephone: biz.phone,
      email: biz.email,
      image: `${biz.url}/images/logo.webp`,
      description: pageDescription,
      slogan: biz.tagline,
      'license': biz.license,
      hasMap: biz.googleMapsUrl,
      sameAs: [biz.social.facebook, biz.social.linkedin],
      paymentAccepted: 'Cash, Credit Card, Check',
      address: {
        '@type': 'PostalAddress',
        streetAddress: biz.address.street,
        addressLocality: biz.address.city,
        addressRegion: biz.address.state,
        postalCode: biz.address.zip,
        addressCountry: 'US',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: biz.geo.latitude,
        longitude: biz.geo.longitude,
      },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '08:00',
          closes: '17:00',
        },
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Saturday'],
          opens: '08:00',
          closes: '12:00',
        },
      ],
      priceRange: '$$',
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: String(biz.rating),
        reviewCount: String(biz.reviewCount),
        bestRating: '5',
        worstRating: '1',
      },
      review: [
        {
          '@type': 'Review',
          author: { '@type': 'Person', name: 'Nick L.' },
          datePublished: '2025-01-15',
          reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
          reviewBody: 'Very responsive and professional. Jesse was great to work with on our dryer repair. I would highly recommend them for any appliance repairs!',
        },
        {
          '@type': 'Review',
          author: { '@type': 'Person', name: 'Orlando C.' },
          datePublished: '2025-03-22',
          reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
          reviewBody: 'Jesse was absolutely fantastic. He handled my repair with professionalism and honesty, which is rare to find these days. He took the time to explain everything clearly.',
        },
        {
          '@type': 'Review',
          author: { '@type': 'Person', name: 'Clifton B.' },
          datePublished: '2025-05-10',
          reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
          reviewBody: 'Jesse was fantastic!! He correctly diagnosed both my dishwasher and refrigerator. Thanks Blue Jay, my kitchen is whole again!',
        },
      ],
    };

    if (areaServed) {
      localBusinessSchema.areaServed = {
        '@type': 'City',
        name: areaServed,
        containedInPlace: {
          '@type': 'State',
          name: biz.address.state,
        },
      };
    }

    if (serviceOfferings && serviceOfferings.length > 0) {
      localBusinessSchema.hasOfferCatalog = {
        '@type': 'OfferCatalog',
        name: `${biz.industryLabel || 'Our'} Services`,
        itemListElement: serviceOfferings.map((svc) => ({
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: svc.name,
            description: svc.description,
            url: svc.url,
            provider: { '@id': localBusinessId },
          },
        })),
      };
    }

    schemas.push(localBusinessSchema);
  }

  // Service schema
  if (type === 'Service') {
    const serviceSchema = {
      '@context': 'https://schema.org',
      '@type': 'Service',
      serviceType: serviceType || pageName,
      provider: {
        '@type': biz.schemaType || 'LocalBusiness',
        '@id': localBusinessId,
        name: biz.name,
        telephone: biz.phone,
        url: biz.url,
      },
      description: pageDescription,
      ...(areaServed && {
        areaServed: {
          '@type': 'City',
          name: areaServed,
        },
      }),
    };
    schemas.push(serviceSchema);
  }

  // AboutPage, ContactPage, WebPage schemas
  if (type === 'AboutPage' || type === 'ContactPage' || type === 'WebPage') {
    const pageSchema = {
      '@context': 'https://schema.org',
      '@type': type,
      name: pageName,
      description: pageDescription,
      url: pageUrl || biz.url,
    };
    schemas.push(pageSchema);
  }

  // WebSite schema (for homepage - helps with sitelinks search box)
  if (type === 'LocalBusiness') {
    const websiteSchema = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: biz.name,
      url: biz.url,
      potentialAction: {
        '@type': 'SearchAction',
        target: `${biz.url}/services`,
        'query-input': 'required name=search_term_string',
      },
    };
    schemas.push(websiteSchema);
  }

  // ServiceIndex - ItemList schema for services index page
  if (type === 'ServiceIndex' && serviceOfferings && serviceOfferings.length > 0) {
    const itemListSchema = {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: `${biz.industryLabel || 'Our'} Services`,
      description: pageDescription,
      numberOfItems: serviceOfferings.length,
      itemListElement: serviceOfferings.map((svc, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: svc.name,
        url: svc.url,
      })),
    };
    schemas.push(itemListSchema);

    // Also add a WebPage schema for the index
    const pageSchema = {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: pageName,
      description: pageDescription,
      url: pageUrl || biz.url,
    };
    schemas.push(pageSchema);
  }

  // Breadcrumb schema
  if (breadcrumbs && breadcrumbs.length > 0) {
    const breadcrumbSchema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs.map((crumb, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: crumb.name,
        item: crumb.url,
      })),
    };
    schemas.push(breadcrumbSchema);
  }

  // FAQ schema
  if (faqItems && faqItems.length > 0) {
    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqItems.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    };
    schemas.push(faqSchema);
  }

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
