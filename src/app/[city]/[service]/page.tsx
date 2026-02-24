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
  getAllServices,
} from '@/lib/data';
import { linkifyBody } from '@/lib/linkifyPhone';
import ServiceSidebar from '@/components/ServiceSidebar';
import TestimonialSection from '@/components/TestimonialSection';
import SchemaMarkup from '@/components/SchemaMarkup';
import Breadcrumbs from '@/components/Breadcrumbs';

const biz = getBusiness();

function getRelatedServices(currentServiceSlug: string): Array<{slug: string, title: string}> {
  const allServices = getAllServices();
  return allServices
    .filter(s => s.slug !== currentServiceSlug)
    .slice(0, 6); // Show up to 6 related services
}

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
        faqItems={(() => {
          const slc = getServiceLocationContent(location.slug, service.slug);
          return slc?.faq?.map((f: { q: string; a: string }) => ({ question: f.q, answer: f.a })) || [];
        })()}
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
            {(() => {
              const slc = getServiceLocationContent(location.slug, service.slug);
              return slc?.localParagraph || `${biz.shortName} provides professional ${service.title.toLowerCase()} services to homeowners in ${location.fullName}. Call ${biz.phoneCTA} for same or next-day service.`;
            })()}
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
            {/* Main Content — all text pulled from per-page data for uniqueness */}
            {(() => {
              const slContent = getServiceLocationContent(location.slug, service.slug);
              const pageFaqs = slContent?.faq || [];
              return (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
                  {/* Primary content — unique per page */}
                  <div>
                    <h2 className="font-[family-name:var(--font-figtree)]" style={{ fontSize: '24px', fontWeight: 800, color: '#0F1B2D', marginBottom: '16px' }}>
                      {service.title} in {location.fullName}
                    </h2>
                    <p style={{ color: '#4b5563', lineHeight: '1.7', fontFamily: 'var(--font-poppins)', fontSize: '15px', marginBottom: '20px' }}>
                      {slContent?.localParagraph || `${biz.shortName} provides professional ${service.title.toLowerCase()} services to homeowners in ${location.fullName}. Call ${biz.phoneCTA} for same or next-day service.`}
                    </p>

                    {/* Local insights */}
                    {slContent?.localInsights && (
                      <div style={{ backgroundColor: '#f8fafc', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
                        <h3 className="font-[family-name:var(--font-figtree)]" style={{ fontSize: '18px', fontWeight: 700, color: '#0F1B2D', marginBottom: '12px' }}>
                          {service.shortTitle} Considerations for {location.name} Homes
                        </h3>
                        <p style={{ color: '#4b5563', lineHeight: '1.7', fontFamily: 'var(--font-poppins)', fontSize: '15px', margin: 0 }}>
                          {slContent.localInsights}
                        </p>
                      </div>
                    )}

                    {/* Repair tips */}
                    {slContent?.repairTips && (
                      <div style={{ backgroundColor: '#fffbeb', padding: '20px', borderRadius: '8px', marginBottom: '20px', border: '1px solid #fde68a' }}>
                        <h3 className="font-[family-name:var(--font-figtree)]" style={{ fontSize: '18px', fontWeight: 700, color: '#92400e', marginBottom: '12px' }}>
                          Maintenance Tips for {location.name} Residents
                        </h3>
                        <p style={{ color: '#78350f', lineHeight: '1.7', fontFamily: 'var(--font-poppins)', fontSize: '15px', margin: 0 }}>
                          {slContent.repairTips}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Why Choose Us — unique per page */}
                  {slContent?.whyChooseUs && (
                    <div>
                      <h2 className="font-[family-name:var(--font-figtree)]" style={{ fontSize: '24px', fontWeight: 800, color: '#0F1B2D', marginBottom: '16px' }}>
                        Why {location.name} Residents Choose {biz.shortName}
                      </h2>
                      <p style={{ color: '#4b5563', lineHeight: '1.7', fontFamily: 'var(--font-poppins)', fontSize: '15px' }}>
                        {slContent.whyChooseUs}
                      </p>
                    </div>
                  )}

                  {/* Neighborhoods + Service Area — unique per page */}
                  <div>
                    <h2 className="font-[family-name:var(--font-figtree)]" style={{ fontSize: '24px', fontWeight: 800, color: '#0F1B2D', marginBottom: '16px' }}>
                      {service.shortTitle} Service Coverage in {location.name}
                    </h2>
                    {slContent?.serviceAreaDesc && (
                      <p style={{ color: '#4b5563', lineHeight: '1.7', fontFamily: 'var(--font-poppins)', fontSize: '15px', marginBottom: '20px' }}>
                        {slContent.serviceAreaDesc}
                      </p>
                    )}
                    {slContent?.neighborhoodsCovered && slContent.neighborhoodsCovered.length > 0 && (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
                        {slContent.neighborhoodsCovered.map((hood, i) => (
                          <span key={i} style={{ backgroundColor: '#f0f7ff', color: '#1e40af', padding: '6px 14px', borderRadius: '20px', fontSize: '13px', fontWeight: 500, fontFamily: 'var(--font-poppins)', border: '1px solid #bfdbfe' }}>
                            {hood}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Related Services */}
                  <div>
                    <h2 className="font-[family-name:var(--font-figtree)]" style={{ fontSize: '24px', fontWeight: 800, color: '#0F1B2D', marginBottom: '16px' }}>
                      More Appliance Services in {location.name}
                    </h2>
                    <p style={{ color: '#4b5563', lineHeight: '1.7', fontFamily: 'var(--font-poppins)', fontSize: '15px', marginBottom: '16px' }}>
                      Learn more about our <Link href={`/services/${service.slug}`} style={{ color: '#1565C0', fontWeight: 600, textDecoration: 'none' }}>{service.title.toLowerCase()} services</Link> or explore other appliance repair options in {location.name}:
                    </p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
                      {getRelatedServices(service.slug).map((relatedService, i) => (
                        <Link
                          key={i}
                          href={`/${location.slug}/${relatedService.slug}`}
                          style={{ display: 'block', padding: '12px', backgroundColor: '#f8fafc', borderRadius: '6px', textDecoration: 'none', color: '#0F1B2D', fontSize: '14px', fontFamily: 'var(--font-poppins)', fontWeight: 500, transition: 'all 0.2s', border: '1px solid #e2e8f0' }}
                          className="hover:bg-blue-600 hover:text-white hover:border-blue-600"
                        >
                          {relatedService.title} in {location.name}
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* FAQ Section — unique per page when faq data exists */}
                  {pageFaqs.length > 0 && (
                    <div>
                      <h2 className="font-[family-name:var(--font-figtree)]" style={{ fontSize: '24px', fontWeight: 800, color: '#0F1B2D', marginBottom: '16px' }}>
                        {service.title} Questions — {location.name}
                      </h2>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {pageFaqs.map((faq, i) => (
                          <div key={i} style={{ backgroundColor: '#f8fafc', padding: '20px', borderRadius: '8px' }}>
                            <h3 className="font-[family-name:var(--font-figtree)]" style={{ fontSize: '16px', fontWeight: 700, color: '#0F1B2D', marginBottom: '8px' }}>
                              {faq.q}
                            </h3>
                            <p style={{ color: '#4b5563', fontFamily: 'var(--font-poppins)', fontSize: '15px', lineHeight: '1.6', margin: 0 }}>
                              {faq.a}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })()}

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

      <TestimonialSection />
    </>
  );
}
