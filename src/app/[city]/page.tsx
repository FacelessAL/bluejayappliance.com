import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  getAllLocations,
  getLocationBySlug,
  getAllServices,
  getBusiness,
  isServiceLocationPublished,
} from '@/lib/data';
import TestimonialSection from '@/components/TestimonialSection';
import CTABand from '@/components/CTABand';
import SchemaMarkup from '@/components/SchemaMarkup';
import Breadcrumbs from '@/components/Breadcrumbs';

const biz = getBusiness();

interface PageProps {
  params: Promise<{ city: string }>;
}

export async function generateStaticParams() {
  const locations = getAllLocations();
  return locations.map((loc) => ({ city: loc.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { city } = await params;
  const location = getLocationBySlug(city);
  if (!location) return {};

  return {
    title: location.metaTitle,
    description: location.metaDescription,
    openGraph: {
      title: location.metaTitle,
      description: location.metaDescription,
    },
    alternates: {
      canonical: `${biz.url}/${city}`,
    },
  };
}

export default async function LocationPage({ params }: PageProps) {
  const { city } = await params;
  const location = getLocationBySlug(city);
  if (!location) notFound();

  const services = getAllServices();

  return (
    <>
      <SchemaMarkup
        type="LocalBusiness"
        pageName={`${biz.serviceCategory} in ${location.fullName}`}
        pageDescription={location.metaDescription}
        pageUrl={`${biz.url}/${location.slug}`}
        areaServed={location.name}
        breadcrumbs={[
          { name: 'Home', url: biz.url },
          { name: location.fullName, url: `${biz.url}/${location.slug}` },
        ]}
        faqItems={location.localContent.faqs}
        serviceOfferings={services.map((s) => ({
          name: s.title,
          description: s.heroSubheading,
          url: isServiceLocationPublished(location.slug, s.slug)
            ? `${biz.url}/${location.slug}/${s.slug}`
            : `${biz.url}/services/${s.slug}`,
        }))}
      />

      <Breadcrumbs items={[{ label: `${biz.serviceCategory} in ${location.fullName}`, href: `/${location.slug}` }]} />

      {/* Hero */}
      <section style={{ backgroundColor: '#0F1B2D', color: '#ffffff', padding: '60px 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h1 className="font-[family-name:var(--font-figtree)] heading-hero" style={{ fontWeight: 800, marginBottom: '16px', textTransform: 'uppercase' }}>
            {biz.serviceCategory} in {location.fullName}
          </h1>
          <p style={{ fontSize: '18px', color: '#d1d5db', maxWidth: '700px', margin: '0 auto 32px', fontFamily: 'var(--font-poppins)', lineHeight: '1.7' }}>
            {location.description}
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

      {/* SEO Explainer - Above the fold */}
      <section style={{ padding: '48px 0', backgroundColor: '#ffffff' }}>
        <div className="container">
          <div className="grid-2col" style={{ alignItems: 'center' }}>
            <div>
              <h2 className="font-[family-name:var(--font-figtree)] heading-section" style={{ fontWeight: 800, color: '#0F1B2D', marginBottom: '16px' }}>
                Professional {biz.industryLabel} Services in {location.fullName}
              </h2>
              <p style={{ color: '#4b5563', marginBottom: '16px', lineHeight: '1.7', fontFamily: 'var(--font-poppins)', fontSize: '15px' }}>
                {location.localContent.introParagraph || `Looking for a reliable ${biz.serviceCategory.toLowerCase()} in ${location.name}? ${biz.shortName} is your trusted, locally-operated company serving ${location.fullName} and the surrounding areas. Our licensed professionals deliver fast, reliable service at transparent prices — no hidden fees, ever.`}
              </p>
              <p style={{ color: '#4b5563', lineHeight: '1.7', fontFamily: 'var(--font-poppins)', fontSize: '15px' }}>
                {location.localContent.localExpertise || location.localContent.aboutArea}
              </p>
            </div>
            <div style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '32px', boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }}>
              <h3 className="font-[family-name:var(--font-figtree)]" style={{ fontSize: '20px', fontWeight: 700, color: '#0F1B2D', marginBottom: '20px', borderBottom: '3px solid #1565C0', paddingBottom: '12px' }}>
                Why {location.name} Residents Choose Us
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ backgroundColor: '#1565C0', color: '#ffffff', width: '24px', height: '24px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 700, flexShrink: 0 }}>&#10003;</span>
                  <span style={{ color: '#374151', fontFamily: 'var(--font-poppins)', fontSize: '14px', fontWeight: 500 }}>Same or next-day service available</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ backgroundColor: '#1565C0', color: '#ffffff', width: '24px', height: '24px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 700, flexShrink: 0 }}>&#10003;</span>
                  <span style={{ color: '#374151', fontFamily: 'var(--font-poppins)', fontSize: '14px', fontWeight: 500 }}>Upfront, transparent pricing before work begins</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ backgroundColor: '#1565C0', color: '#ffffff', width: '24px', height: '24px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 700, flexShrink: 0 }}>&#10003;</span>
                  <span style={{ color: '#374151', fontFamily: 'var(--font-poppins)', fontSize: '14px', fontWeight: 500 }}>90-day warranty on parts and labor</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ backgroundColor: '#1565C0', color: '#ffffff', width: '24px', height: '24px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 700, flexShrink: 0 }}>&#10003;</span>
                  <span style={{ color: '#374151', fontFamily: 'var(--font-poppins)', fontSize: '14px', fontWeight: 500 }}>All major appliance brands serviced</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ backgroundColor: '#1565C0', color: '#ffffff', width: '24px', height: '24px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 700, flexShrink: 0 }}>&#10003;</span>
                  <span style={{ color: '#374151', fontFamily: 'var(--font-poppins)', fontSize: '14px', fontWeight: 500 }}>We respect your home — clean, courteous service</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ backgroundColor: '#1565C0', color: '#ffffff', width: '24px', height: '24px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 700, flexShrink: 0 }}>&#10003;</span>
                  <span style={{ color: '#374151', fontFamily: 'var(--font-poppins)', fontSize: '14px', fontWeight: 500 }}>Locally operated from {biz.address.city} — fast response to {location.name}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Services List */}
      <section style={{ padding: '48px 0', backgroundColor: '#f3f4f6' }}>
        <div className="container">
          <h2 className="font-[family-name:var(--font-figtree)]" style={{ fontSize: '28px', fontWeight: 800, textAlign: 'center', color: '#0F1B2D', marginBottom: '12px' }}>
            Our {biz.industryLabel} Services in {location.name}
          </h2>
          <p style={{ textAlign: 'center', color: '#4b5563', marginBottom: '32px', maxWidth: '640px', margin: '0 auto 32px', fontFamily: 'var(--font-poppins)', fontSize: '14px' }}>
            We offer a full range of residential appliance repair services near you throughout {location.fullName}.
          </p>
          <div className="grid-3col">
            {services.map((service) => {
              const published = isServiceLocationPublished(location.slug, service.slug);
              const href = published ? `/${location.slug}/${service.slug}` : `/services/${service.slug}`;
              return (
                <Link
                  key={service.slug}
                  href={href}
                  style={{ display: 'block', backgroundColor: '#ffffff', borderRadius: '8px', padding: '20px 24px', textDecoration: 'none', borderLeft: '4px solid #1565C0', transition: 'box-shadow 0.2s, transform 0.2s', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}
                >
                  <h3 className="font-[family-name:var(--font-figtree)]" style={{ fontSize: '16px', fontWeight: 700, color: '#0F1B2D', marginBottom: '4px' }}>
                    {service.title}
                  </h3>
                  <p style={{ color: '#6b7280', fontSize: '13px', lineHeight: '1.5', fontFamily: 'var(--font-poppins)', margin: 0 }}>
                    {service.heroSubheading.replace(/\.$/, '')} in {location.fullName}.
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section style={{ padding: '48px 0', backgroundColor: '#0F1B2D' }}>
        <div className="container">
          <div className="grid-4col" style={{ textAlign: 'center' }}>
            <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14px' }}>
                <span style={{ color: '#facc15', fontSize: '28px', letterSpacing: '2px' }}>&#9733;&#9733;&#9733;&#9733;&#9733;</span>
              </div>
              <div className="font-[family-name:var(--font-figtree)]" style={{ color: '#ffffff', fontSize: '20px', fontWeight: 800, marginBottom: '4px' }}>{biz.rating} Star Rating</div>
              <div style={{ color: '#9ca3af', fontSize: '13px', fontFamily: 'var(--font-poppins)' }}>Based on {biz.reviewCount}+ Google Reviews</div>
            </div>
            <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14px' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'rgba(21,101,192,0.2)', color: '#64B5F6', fontSize: '24px' }}>&#128737;</span>
              </div>
              <div className="font-[family-name:var(--font-figtree)]" style={{ color: '#ffffff', fontSize: '20px', fontWeight: 800, marginBottom: '4px' }}>Experienced Techs</div>
              <div style={{ color: '#9ca3af', fontSize: '13px', fontFamily: 'var(--font-poppins)' }}>10+ Years of Appliance Repair</div>
            </div>
            <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14px' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'rgba(21,101,192,0.2)', color: '#64B5F6', fontSize: '24px' }}>&#9201;</span>
              </div>
              <div className="font-[family-name:var(--font-figtree)]" style={{ color: '#ffffff', fontSize: '20px', fontWeight: 800, marginBottom: '4px' }}>Same-Day Service</div>
              <div style={{ color: '#9ca3af', fontSize: '13px', fontFamily: 'var(--font-poppins)' }}>Fast Response, Reliable Results</div>
            </div>
            <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14px' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'rgba(21,101,192,0.2)', color: '#64B5F6', fontSize: '24px' }}>&#10004;</span>
              </div>
              <div className="font-[family-name:var(--font-figtree)]" style={{ color: '#ffffff', fontSize: '20px', fontWeight: 800, marginBottom: '4px' }}>90-Day Warranty</div>
              <div style={{ color: '#9ca3af', fontSize: '13px', fontFamily: 'var(--font-poppins)' }}>Parts &amp; Labor Guaranteed</div>
            </div>
          </div>
        </div>
      </section>

      {/* Common Plumbing Issues */}
      <section style={{ padding: '64px 0', backgroundColor: '#ffffff' }}>
        <div className="container">
          <div className="grid-2col" style={{ alignItems: 'start', maxWidth: '1000px', margin: '0 auto' }}>
            <div>
              <h2 className="font-[family-name:var(--font-figtree)] heading-section" style={{ fontWeight: 800, color: '#0F1B2D', marginBottom: '16px' }}>
                Common Appliance Issues in {location.name}
              </h2>
              <p style={{ color: '#4b5563', marginBottom: '20px', lineHeight: '1.7', fontFamily: 'var(--font-poppins)', fontSize: '15px' }}>
                Our team has extensive experience solving the appliance repair challenges specific to {location.fullName} properties:
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {location.localContent.commonIssues.map((issue, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <span style={{ color: '#1565C0', fontWeight: 700, fontSize: '18px', lineHeight: '1.4', flexShrink: 0 }}>&#10003;</span>
                    <span style={{ color: '#4b5563', fontFamily: 'var(--font-poppins)', fontSize: '14px', lineHeight: '1.6' }}>{issue}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="font-[family-name:var(--font-figtree)]" style={{ fontSize: '28px', fontWeight: 800, color: '#0F1B2D', marginBottom: '16px' }}>
                About {location.name}
              </h2>
              <p style={{ color: '#4b5563', marginBottom: '20px', lineHeight: '1.7', fontFamily: 'var(--font-poppins)', fontSize: '15px' }}>
                {location.localContent.localInfo}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section style={{ padding: '64px 0', backgroundColor: '#f3f4f6' }}>
        <div className="container">
          <h2 className="font-[family-name:var(--font-figtree)]" style={{ fontSize: '28px', fontWeight: 800, textAlign: 'center', color: '#0F1B2D', marginBottom: '12px' }}>
            Frequently Asked Questions — {biz.serviceCategory} in {location.name}
          </h2>
          <p style={{ textAlign: 'center', color: '#4b5563', marginBottom: '32px', maxWidth: '640px', margin: '0 auto 32px', fontFamily: 'var(--font-poppins)', fontSize: '14px' }}>
            Have questions about our services in {location.fullName}? Here are answers to the most common questions we hear from {location.name} residents.
          </p>
          <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {location.localContent.faqs.map((faq: { question: string; answer: string }, i: number) => (
              <details
                key={i}
                style={{ backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #e5e7eb', overflow: 'hidden' }}
              >
                <summary
                  className="font-[family-name:var(--font-figtree)]"
                  style={{ padding: '18px 24px', fontSize: '16px', fontWeight: 700, color: '#0F1B2D', cursor: 'pointer', listStyle: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                >
                  {faq.question}
                  <span style={{ color: '#1565C0', fontSize: '20px', fontWeight: 700, marginLeft: '16px', flexShrink: 0 }}>+</span>
                </summary>
                <div style={{ padding: '0 24px 18px', color: '#4b5563', fontSize: '14px', lineHeight: '1.7', fontFamily: 'var(--font-poppins)' }}>
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <CTABand />
      <TestimonialSection />
    </>
  );
}
