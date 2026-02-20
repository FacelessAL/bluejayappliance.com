import Link from 'next/link';
import { getAllLocations, getBusiness } from '@/lib/data';
import type { Metadata } from 'next';
import SchemaMarkup from '@/components/SchemaMarkup';
import Breadcrumbs from '@/components/Breadcrumbs';

const biz = getBusiness();

export const metadata: Metadata = {
  title: `Service Area | ${biz.serviceCategory} Serving ${biz.serviceAreaName} | ${biz.name}`,
  description: `${biz.name} proudly serves ${biz.address.city} and the surrounding ${biz.serviceAreaName} area with professional ${biz.industryLabel.toLowerCase()} services. Find your local ${biz.serviceCategory.toLowerCase()} today.`,
  openGraph: {
    title: `Service Area | ${biz.serviceCategory} Serving ${biz.serviceAreaName} | ${biz.name}`,
    description: `${biz.name} proudly serves ${biz.address.city} and the surrounding ${biz.serviceAreaName} area with professional ${biz.industryLabel.toLowerCase()} services. Find your local ${biz.serviceCategory.toLowerCase()} today.`,
  },
  alternates: {
    canonical: `${biz.url}/service-area`,
  },
};

export default function ServiceAreaPage() {
  const locations = getAllLocations();

  return (
    <>
      <SchemaMarkup
        type="WebPage"
        pageName="Service Area"
        pageDescription={`${biz.name} proudly serves ${biz.address.city} and the surrounding ${biz.serviceAreaName} area with professional ${biz.industryLabel.toLowerCase()} services.`}
        pageUrl={`${biz.url}/service-area`}
        breadcrumbs={[
          { name: 'Home', url: biz.url },
          { name: 'Service Area', url: `${biz.url}/service-area` },
        ]}
      />

      <Breadcrumbs items={[{ label: 'Service Area', href: '/service-area' }]} />

      {/* Hero */}
      <section
        style={{
          backgroundColor: '#0F1B2D',
          color: '#ffffff',
          padding: '60px 0',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 2rem' }}>
          <h1
            className="font-[family-name:var(--font-figtree)] heading-hero"
            style={{
              fontWeight: 800,
              textTransform: 'uppercase',
              marginBottom: '16px',
            }}
          >
            Our Service Area
          </h1>
          <p
            style={{
              fontSize: '18px',
              color: '#d1d5db',
              fontFamily: 'var(--font-poppins)',
              lineHeight: '1.7',
            }}
          >
            {biz.name} proudly provides professional {biz.industryLabel.toLowerCase()} services across the greater {biz.serviceAreaName} area. 
            From emergency repairs to full installations, our licensed team is ready to serve you. The locations listed below are just some of the communities we work in — if you don&apos;t see your area, give us a call at {biz.phone} and we&apos;ll let you know if we can help.
          </p>
        </div>
      </section>

      {/* Map Section */}
      <section style={{ backgroundColor: '#ffffff', padding: '60px 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', marginBottom: '60px' }}>
            {biz.googleMapsEmbed ? (
              <iframe
                src={biz.googleMapsEmbed}
                width="100%"
                height="400"
                style={{ border: 0, display: 'block' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`${biz.name} Service Area`}
              />
            ) : (
              <div style={{ height: '400px', backgroundColor: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9ca3af' }}>
                <p>Service Area Map</p>
              </div>
            )}
          </div>

          {/* Locations Grid */}
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2
              className="font-[family-name:var(--font-figtree)]"
              style={{
                fontSize: '32px',
                fontWeight: 800,
                textTransform: 'uppercase',
                color: '#0F1B2D',
                marginBottom: '12px',
              }}
            >
              Areas We Serve
            </h2>
            <p
              style={{
                fontSize: '16px',
                color: '#6b7280',
                fontFamily: 'var(--font-poppins)',
                maxWidth: '600px',
                margin: '0 auto',
              }}
            >
              Click on any location below to learn more about our services in your area. Don&apos;t see your city? We likely still serve you — call us to find out.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
              gap: '20px',
            }}
          >
            {[...locations].sort((a, b) => a.name.localeCompare(b.name)).map((loc) => (
              <Link
                key={loc.slug}
                href={`/${loc.slug}`}
                style={{
                  display: 'block',
                  backgroundColor: '#ffffff',
                  border: '2px solid #e5e7eb',
                  borderRadius: '12px',
                  padding: '28px 20px',
                  textDecoration: 'none',
                  transition: 'all 0.2s',
                  textAlign: 'center',
                }}
              >
                {/* Location pin icon */}
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    backgroundColor: '#1565C0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 12px',
                  }}
                >
                  <svg width="22" height="22" fill="#ffffff" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                  </svg>
                </div>
                <h3
                  className="font-[family-name:var(--font-figtree)]"
                  style={{
                    fontSize: '18px',
                    fontWeight: 700,
                    color: '#0F1B2D',
                    marginBottom: '8px',
                  }}
                >
                  {loc.fullName}
                </h3>
                <span
                  style={{
                    display: 'inline-block',
                    color: '#1565C0',
                    fontWeight: 700,
                    fontSize: '13px',
                    fontFamily: 'var(--font-figtree)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                  }}
                >
                  View Services &rarr;
                </span>
              </Link>
            ))}
          </div>

          {/* Serve More Areas Note */}
          <div style={{ marginTop: '48px', textAlign: 'center', backgroundColor: '#f9fafb', borderRadius: '12px', padding: '32px', border: '1px solid #e5e7eb' }}>
            <h3 className="font-[family-name:var(--font-figtree)]" style={{ fontSize: '22px', fontWeight: 800, color: '#0F1B2D', marginBottom: '10px' }}>
              Don&apos;t See Your City Listed?
            </h3>
            <p style={{ fontSize: '15px', color: '#4b5563', fontFamily: 'var(--font-poppins)', lineHeight: '1.7', maxWidth: '700px', margin: '0 auto 20px' }}>
              The locations above are not our limitation — {biz.shortName} serves the entire greater {biz.serviceAreaName} area including many communities not listed here. If you&apos;re in the surrounding areas, there&apos;s a good chance we can help. Give us a call and we&apos;ll confirm service availability for your address.
            </p>
            <Link
              href={`tel:${biz.phoneRaw}`}
              className="font-[family-name:var(--font-figtree)]"
              style={{ display: 'inline-block', backgroundColor: '#3498db', color: '#ffffff', padding: '12px 32px', borderRadius: '6px', fontWeight: 700, fontSize: '16px', textDecoration: 'none' }}
            >
              Call {biz.phone}
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        style={{
          backgroundColor: '#1565C0',
          padding: '40px 0',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 2rem' }}>
          <h2
            className="font-[family-name:var(--font-figtree)]"
            style={{
              fontSize: '32px',
              fontWeight: 800,
              color: '#ffffff',
              textTransform: 'uppercase',
              marginBottom: '16px',
            }}
          >
            Need Help Now? Call Us!
          </h2>
          <p
            style={{
              fontSize: '16px',
              color: 'rgba(255,255,255,0.9)',
              fontFamily: 'var(--font-poppins)',
              marginBottom: '24px',
            }}
          >
            Same or next-day appointments available across all service areas.
          </p>
          <Link
            href={`tel:${biz.phoneRaw}`}
            style={{
              display: 'inline-block',
              backgroundColor: '#ffffff',
              color: '#1565C0',
              padding: '16px 40px',
              borderRadius: '4px',
              fontWeight: 800,
              fontSize: '20px',
              textDecoration: 'none',
              fontFamily: 'var(--font-figtree)',
            }}
          >
            {biz.phone}
          </Link>
        </div>
      </section>
    </>
  );
}
