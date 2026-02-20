import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
  getAllPublishedServiceLocationPairs,
  getLocationBySlug,
  getServiceBySlug,
  getBusiness,
  isServiceLocationPublished,
  getServiceLocationContent,
} from '@/lib/data';
import { linkifyBody } from '@/lib/linkifyPhone';
import ServiceSidebar from '@/components/ServiceSidebar';
import TestimonialSection from '@/components/TestimonialSection';
import CTABand from '@/components/CTABand';
import SchemaMarkup from '@/components/SchemaMarkup';
import Breadcrumbs from '@/components/Breadcrumbs';

const biz = getBusiness();

interface PageProps {
  params: Promise<{ city: string; service: string }>;
}

export async function generateStaticParams() {
  const pairs = getAllPublishedServiceLocationPairs();
  return pairs.map((pair) => ({
    city: pair.locationSlug,
    service: pair.serviceSlug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { city, service: serviceSlug } = await params;
  const location = getLocationBySlug(city);
  const service = getServiceBySlug(serviceSlug);
  if (!location || !service) return {};

  const title = service.metaTitle.replace('{city}', location.fullName);
  const description = service.metaDescription.replace('{city}', location.fullName);

  return {
    title,
    description,
    openGraph: { title, description },
    alternates: { canonical: `${biz.url}/${city}/${serviceSlug}` },
  };
}

export default async function ServiceLocationPage({ params }: PageProps) {
  const { city, service: serviceSlug } = await params;

  const location = getLocationBySlug(city);
  const service = getServiceBySlug(serviceSlug);

  if (!location || !service) notFound();
  if (!isServiceLocationPublished(city, serviceSlug)) notFound();

  return (
    <>
      <SchemaMarkup
        type="Service"
        pageName={`${service.title} in ${location.fullName}`}
        pageDescription={service.metaDescription.replace('{city}', location.fullName)}
        pageUrl={`${biz.url}/${location.slug}/${service.slug}`}
        serviceType={service.schemaServiceType}
        areaServed={location.name}
        breadcrumbs={[
          { name: 'Home', url: biz.url },
          { name: location.fullName, url: `${biz.url}/${location.slug}` },
          {
            name: service.title,
            url: `${biz.url}/${location.slug}/${service.slug}`,
          },
        ]}
      />

      <Breadcrumbs
        items={[
          { label: `${biz.serviceCategory} in ${location.fullName}`, href: `/${location.slug}` },
          { label: service.title, href: `/${location.slug}/${service.slug}` },
        ]}
      />

      {/* Hero */}
      <section style={{ position: 'relative', backgroundColor: '#0F1B2D', color: '#ffffff', padding: '60px 0', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <Image
            src={service.image}
            alt={`${service.title} in ${location.fullName}`}
            fill
            className="object-cover"
            style={{ opacity: 0.2 }}
            priority
          />
        </div>
        <div className="container" style={{ position: 'relative', textAlign: 'center' }}>
          <h1 className="font-[family-name:var(--font-figtree)] heading-hero" style={{ fontWeight: 800, marginBottom: '16px', textTransform: 'uppercase' }}>
            {service.heroHeading} in {location.name}
          </h1>
          <p style={{ fontSize: '18px', color: '#d1d5db', maxWidth: '700px', margin: '0 auto 32px', fontFamily: 'var(--font-poppins)', lineHeight: '1.7' }}>
            {service.heroSubheading} Serving {location.fullName} and surrounding areas.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <Link
              href="/contact-us"
              style={{ backgroundColor: '#1565C0', color: '#ffffff', padding: '14px 32px', borderRadius: '4px', fontWeight: 700, fontSize: '16px', textDecoration: 'none', fontFamily: 'var(--font-figtree)', textTransform: 'uppercase', letterSpacing: '0.5px' }}
            >
              Schedule a Repair
            </Link>
            <Link
              href={`tel:${biz.phoneRaw}`}
              style={{ border: '2px solid #ffffff', color: '#ffffff', padding: '14px 32px', borderRadius: '4px', fontWeight: 700, fontSize: '16px', textDecoration: 'none', fontFamily: 'var(--font-figtree)', textTransform: 'uppercase', letterSpacing: '0.5px' }}
            >
              Call {biz.phone}
            </Link>
          </div>
        </div>
      </section>

      {/* Content + Sidebar */}
      <section style={{ padding: '64px 0', backgroundColor: '#ffffff' }}>
        <div className="container">
          <div className="grid-sidebar">
            {/* Main Content */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
              {service.contentSections.map((section, index) => (
                <div key={index}>
                  <h2 className="font-[family-name:var(--font-figtree)]" style={{ fontSize: '24px', fontWeight: 800, color: '#0F1B2D', marginBottom: '16px' }}>
                    {section.heading.replace(/\{city\}/g, location.name).replace(/\{cityFull\}/g, location.fullName)}
                  </h2>
                  <p style={{ color: '#4b5563', lineHeight: '1.7', fontFamily: 'var(--font-poppins)', fontSize: '15px' }}>{linkifyBody(section.body.replace(/\{city\}/g, location.name).replace(/\{cityFull\}/g, location.fullName))}</p>
                </div>
              ))}

              {/* Location-specific content */}
              <div>
                <h2 className="font-[family-name:var(--font-figtree)]" style={{ fontSize: '24px', fontWeight: 800, color: '#0F1B2D', marginBottom: '16px' }}>
                  {service.title} in {location.fullName}
                </h2>
                <p style={{ color: '#4b5563', lineHeight: '1.7', fontFamily: 'var(--font-poppins)', fontSize: '15px' }}>
                  {getServiceLocationContent(location.slug, service.slug)?.localParagraph || `${biz.shortName} is proud to offer professional ${service.title.toLowerCase()} services to homeowners and businesses in ${location.fullName}. Our team of licensed, insured professionals understands the unique challenges that ${location.name} properties face, and we're equipped to handle them all. Whether you need routine maintenance, emergency repairs, or a complete system overhaul, we deliver the same exceptional quality and service that has made us ${biz.serviceAreaName}'s trusted partner.`}
                </p>
              </div>

              {/* Why Choose Us for this location */}
              <div>
                <h2 className="font-[family-name:var(--font-figtree)]" style={{ fontSize: '24px', fontWeight: 800, color: '#0F1B2D', marginBottom: '16px' }}>
                  Why Choose {biz.shortName} in {location.name}?
                </h2>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {[
                    `Experienced technicians serving ${location.fullName}`,
                    `Same or next-day service available`,
                    'Transparent, upfront pricing with no hidden fees',
                    '90-day warranty on all parts and labor',
                    `Fast response times to ${location.name} and surrounding areas`,
                  ].map((item, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                      <span style={{ color: '#1565C0', fontWeight: 700, fontSize: '18px', lineHeight: '1.4' }}>✓</span>
                      <span style={{ color: '#4b5563', fontFamily: 'var(--font-poppins)', fontSize: '15px', lineHeight: '1.6' }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Sidebar - shows other services in this same city */}
            <div>
              {/* Contact CTA */}
              <div style={{ backgroundColor: '#1565C0', borderRadius: '12px', padding: '28px', color: '#ffffff', textAlign: 'center', marginBottom: '24px' }}>
                <h3 className="font-[family-name:var(--font-figtree)]" style={{ fontWeight: 700, fontSize: '18px', marginBottom: '8px' }}>
                  Need {service.shortTitle} in {location.name}?
                </h3>
                <p style={{ fontSize: '14px', marginBottom: '16px', opacity: 0.9, fontFamily: 'var(--font-poppins)' }}>Same or next-day service available</p>
                <Link
                  href={`tel:${biz.phoneRaw}`}
                  style={{ display: 'block', fontSize: '24px', fontWeight: 800, color: '#ffffff', textDecoration: 'none', marginBottom: '12px', fontFamily: 'var(--font-figtree)' }}
                >
                  {biz.phone}
                </Link>
                <Link
                  href="/contact-us"
                  style={{ display: 'inline-block', backgroundColor: '#ffffff', color: '#1565C0', padding: '10px 24px', borderRadius: '4px', fontWeight: 700, fontSize: '14px', textDecoration: 'none', fontFamily: 'var(--font-figtree)' }}
                >
                  Schedule Service
                </Link>
              </div>

              <ServiceSidebar
                currentServiceSlug={service.slug}
                currentServiceTitle={service.title}
                locationSlug={location.slug}
                locationName={location.name}
              />
            </div>
          </div>
        </div>
      </section>

      <CTABand serviceName={service.shortTitle} />
      <TestimonialSection />
    </>
  );
}
