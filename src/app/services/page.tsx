import type { Metadata } from 'next';
import { getAllServices, getBusiness } from '@/lib/data';
import ServiceCard from '@/components/ServiceCard';
import TestimonialSection from '@/components/TestimonialSection';
import SchemaMarkup from '@/components/SchemaMarkup';
import Breadcrumbs from '@/components/Breadcrumbs';

const biz = getBusiness();

export const metadata: Metadata = {
  title: `${biz.industryLabel} Services ${biz.address.city}, ${biz.address.state} | ${biz.name}`,
  description:
    `Complete ${biz.industryLabel.toLowerCase()} services in ${biz.address.city} and ${biz.serviceAreaName}. Licensed & insured. Call ${biz.phoneSlogan}.`,
  openGraph: {
    title: `${biz.industryLabel} Services ${biz.address.city}, ${biz.address.state} | ${biz.name}`,
    description:
      `Complete ${biz.industryLabel.toLowerCase()} services in ${biz.address.city} and ${biz.serviceAreaName}. Licensed & insured. Call ${biz.phoneSlogan}.`,
  },
  alternates: {
    canonical: `${biz.url}/services`,
  },
};

export default function ServicesPage() {
  const services = getAllServices();

  return (
    <>
      <SchemaMarkup
        type="ServiceIndex"
        pageName={`${biz.industryLabel} Services`}
        pageDescription={`Complete ${biz.industryLabel.toLowerCase()} services in ${biz.address.city} and ${biz.serviceAreaName}.`}
        pageUrl={`${biz.url}/services`}
        breadcrumbs={[
          { name: 'Home', url: biz.url },
          { name: 'Services', url: `${biz.url}/services` },
        ]}
        serviceOfferings={services.map((s) => ({
          name: s.title,
          description: s.heroSubheading,
          url: `${biz.url}/services/${s.slug}`,
        }))}
      />

      <Breadcrumbs items={[{ label: 'Services', href: '/services' }]} />

      {/* Hero */}
      <section style={{ backgroundColor: '#0F1B2D', color: '#ffffff', padding: '60px 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h1 className="font-[family-name:var(--font-figtree)] heading-hero" style={{ fontWeight: 800, marginBottom: '16px', textTransform: 'uppercase' }}>
            Our Services
          </h1>
          <p style={{ fontSize: '18px', color: '#d1d5db', maxWidth: '640px', margin: '0 auto', fontFamily: 'var(--font-poppins)', lineHeight: '1.7' }}>
            {biz.shortName} offers comprehensive {biz.industryLabel.toLowerCase()} services for homes and businesses throughout {biz.serviceAreaName}.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section style={{ padding: '64px 0', backgroundColor: '#ffffff' }}>
        <div className="container">
          <div className="grid-3col" style={{ gap: '24px' }}>
            {services.map((service) => (
              <ServiceCard
                key={service.slug}
                title={service.title}
                shortTitle={service.shortTitle}
                description={service.heroSubheading}
                image={service.image}
                href={`/services/${service.slug}`}
              />
            ))}
          </div>
        </div>
      </section>

      <TestimonialSection />
    </>
  );
}
