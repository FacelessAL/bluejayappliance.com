import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
  getAllServices,
  getServiceBySlug,
  getBusiness,
  getAllLocations,
} from '@/lib/data';
import { linkifyBody } from '@/lib/linkifyPhone';
import ServiceSidebar from '@/components/ServiceSidebar';
import TestimonialSection from '@/components/TestimonialSection';
import SchemaMarkup from '@/components/SchemaMarkup';
import Breadcrumbs from '@/components/Breadcrumbs';

const biz = getBusiness();

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const services = getAllServices();
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};

  const title = service.metaTitle.replace('{city}', `${biz.address.city}, ${biz.address.state}`).replace('{businessName}', biz.name).replace('{phoneCTA}', biz.phoneCTA);
  const description = service.metaDescription.replace('{city}', `${biz.address.city}, ${biz.address.state}`).replace('{businessName}', biz.name).replace('{serviceCategory}', biz.serviceCategory).replace('{phoneCTA}', biz.phoneCTA);

  return {
    title,
    description,
    openGraph: { title, description },
    alternates: { canonical: `${biz.url}/services/${slug}` },
  };
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const locations = getAllLocations();

  return (
    <>
      <SchemaMarkup
        type="Service"
        pageName={service.title}
        pageDescription={service.metaDescription.replace('{city}', `${biz.address.city}, ${biz.address.state}`).replace('{businessName}', biz.name).replace('{serviceCategory}', biz.serviceCategory).replace('{phoneCTA}', biz.phoneCTA)}
        pageUrl={`${biz.url}/services/${service.slug}`}
        serviceType={service.schemaServiceType}
        breadcrumbs={[
          { name: 'Home', url: biz.url },
          { name: 'Services', url: `${biz.url}/services` },
          { name: service.title, url: `${biz.url}/services/${service.slug}` },
        ]}
      />

      <Breadcrumbs
        items={[
          { label: 'Services', href: '/services' },
          { label: service.title, href: `/services/${service.slug}` },
        ]}
      />

      {/* Hero */}
      <section style={{ position: 'relative', backgroundColor: '#0F1B2D', color: '#ffffff', padding: '60px 0', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <Image
            src={service.image}
            alt={service.title}
            fill
            className="object-cover"
            style={{ opacity: 0.2 }}
            priority
          />
        </div>
        <div className="container" style={{ position: 'relative', textAlign: 'center' }}>
          <h1 className="font-[family-name:var(--font-figtree)] heading-hero" style={{ fontWeight: 800, marginBottom: '16px', textTransform: 'uppercase' }}>
            {service.heroHeading}
          </h1>
          <p style={{ fontSize: '18px', color: '#d1d5db', maxWidth: '700px', margin: '0 auto 32px', fontFamily: 'var(--font-poppins)', lineHeight: '1.7' }}>
            {service.heroSubheading}
          </p>
          <Link
            href="/contact-us"
            style={{ display: 'inline-block', backgroundColor: '#1565C0', color: '#ffffff', padding: '14px 32px', borderRadius: '4px', fontWeight: 700, fontSize: '16px', textDecoration: 'none', fontFamily: 'var(--font-figtree)', textTransform: 'uppercase', letterSpacing: '0.5px' }}
          >
            Schedule a Repair
          </Link>
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
                    {section.heading.replace(/\{city\}/g, biz.serviceAreaName).replace(/\{cityFull\}/g, biz.serviceAreaName).replace(/\{businessName\}/g, biz.name)}
                  </h2>
                  <p style={{ color: '#4b5563', lineHeight: '1.7', fontFamily: 'var(--font-poppins)', fontSize: '15px' }}>{linkifyBody(section.body.replace(/\{city\}/g, biz.serviceAreaName).replace(/\{cityFull\}/g, biz.serviceAreaName).replace(/\{businessName\}/g, biz.name).replace(/\{phoneSlogan\}/g, biz.phoneSlogan))}</p>
                </div>
              ))}

            </div>

            {/* Sidebar */}
            <div>
              {/* Contact CTA */}
              <div style={{ backgroundColor: '#1565C0', borderRadius: '12px', padding: '28px', color: '#ffffff', textAlign: 'center', marginBottom: '24px' }}>
                <h3 className="font-[family-name:var(--font-figtree)]" style={{ fontWeight: 700, fontSize: '18px', marginBottom: '8px' }}>Need a Repair?</h3>
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

              <ServiceSidebar currentServiceSlug={service.slug} currentServiceTitle={service.title} />
            </div>
          </div>
        </div>
      </section>

      <TestimonialSection />
    </>
  );
}
