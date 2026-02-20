import type { Metadata } from 'next';
import Link from 'next/link';
import { getBusiness } from '@/lib/data';
import SchemaMarkup from '@/components/SchemaMarkup';
import Breadcrumbs from '@/components/Breadcrumbs';
import ContactForm from '@/components/ContactForm';

const biz = getBusiness();

export const metadata: Metadata = {
  title: `Contact ${biz.name} | Request Service`,
  description:
    `Contact ${biz.name} for ${biz.industryLabel.toLowerCase()} services in ${biz.address.city} and ${biz.serviceAreaName}. Call ${biz.phoneSlogan} or fill out our form for fast, reliable service.`,
  openGraph: {
    title: `Contact ${biz.name} | Request Service`,
    description:
      `Contact ${biz.name} for ${biz.industryLabel.toLowerCase()} services in ${biz.address.city} and ${biz.serviceAreaName}. Call ${biz.phoneSlogan} or fill out our form for fast, reliable service.`,
  },
  alternates: {
    canonical: `${biz.url}/contact-us`,
  },
};

export default function ContactPage() {
  return (
    <>
      <SchemaMarkup
        type="ContactPage"
        pageName="Contact Us"
        pageDescription={`Contact ${biz.name} for ${biz.industryLabel.toLowerCase()} services.`}
        pageUrl={`${biz.url}/contact-us`}
        breadcrumbs={[
          { name: 'Home', url: biz.url },
          { name: 'Contact Us', url: `${biz.url}/contact-us` },
        ]}
      />

      <Breadcrumbs items={[{ label: 'Contact Us', href: '/contact-us' }]} />

      {/* Hero */}
      <section style={{ backgroundColor: '#0F1B2D', color: '#ffffff', padding: '60px 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h1 className="font-[family-name:var(--font-figtree)] heading-hero" style={{ fontWeight: 800, marginBottom: '16px', textTransform: 'uppercase' }}>
            Contact Us
          </h1>
          <p style={{ fontSize: '18px', color: '#d1d5db', maxWidth: '640px', margin: '0 auto', fontFamily: 'var(--font-poppins)', lineHeight: '1.7' }}>
            Ready to schedule a service or have a question? Get in touch with {biz.shortName} today.
          </p>
        </div>
      </section>

      {/* Contact Info + Form */}
      <section style={{ padding: '64px 0', backgroundColor: '#ffffff' }}>
        <div className="container">
          <div className="grid-2col" style={{ gap: '48px' }}>
            {/* Contact Information */}
            <div>
              <h2 className="font-[family-name:var(--font-figtree)]" style={{ fontSize: '28px', fontWeight: 800, color: '#0F1B2D', marginBottom: '32px' }}>Get In Touch</h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {/* Phone */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                  <div style={{ width: '48px', height: '48px', backgroundColor: '#1565C0', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="24" height="24" fill="none" stroke="#ffffff" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-[family-name:var(--font-figtree)]" style={{ fontWeight: 700, color: '#0F1B2D', marginBottom: '4px' }}>Phone</h3>
                    <Link href={`tel:${biz.phoneRaw}`} style={{ color: '#1565C0', fontWeight: 700, fontSize: '18px', textDecoration: 'none' }}>
                      {biz.phone}
                    </Link>
                    <p style={{ fontSize: '13px', color: '#6b7280', fontFamily: 'var(--font-poppins)', marginTop: '2px' }}>Same or Next Day Service Available</p>
                  </div>
                </div>

                {/* Email */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                  <div style={{ width: '48px', height: '48px', backgroundColor: '#1565C0', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="24" height="24" fill="none" stroke="#ffffff" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <h3 className="font-[family-name:var(--font-figtree)]" style={{ fontWeight: 700, color: '#0F1B2D', marginBottom: '4px' }}>Email</h3>
                    <Link href={`mailto:${biz.email}`} style={{ color: '#1565C0', textDecoration: 'none', fontFamily: 'var(--font-poppins)', overflowWrap: 'break-word', wordBreak: 'break-all', display: 'block' }}>
                      {biz.email}
                    </Link>
                  </div>
                </div>

                {/* Address */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                  <div style={{ width: '48px', height: '48px', backgroundColor: '#1565C0', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="24" height="24" fill="none" stroke="#ffffff" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-[family-name:var(--font-figtree)]" style={{ fontWeight: 700, color: '#0F1B2D', marginBottom: '4px' }}>Address</h3>
                    <p style={{ color: '#4b5563', fontFamily: 'var(--font-poppins)' }}>{biz.address.full}</p>
                  </div>
                </div>

                {/* Business Hours */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                  <div style={{ width: '48px', height: '48px', backgroundColor: '#1565C0', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="24" height="24" fill="none" stroke="#ffffff" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-[family-name:var(--font-figtree)]" style={{ fontWeight: 700, color: '#0F1B2D', marginBottom: '4px' }}>Business Hours</h3>
                    <p style={{ color: '#4b5563', fontFamily: 'var(--font-poppins)', fontSize: '14px', lineHeight: '1.8' }}>
                      Mon – Fri: 8:00 AM – 5:00 PM<br />
                      Saturday: 8:00 AM – 12:00 PM<br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>

              {/* Map Embed */}
              <div style={{ marginTop: '32px', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                {biz.googleMapsEmbed ? (
                  <iframe
                    src={biz.googleMapsEmbed}
                    width="100%"
                    height="300"
                    style={{ border: 0, display: 'block' }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={`${biz.name} location`}
                  />
                ) : (
                  <div style={{ height: '300px', backgroundColor: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9ca3af' }}>
                    <p>Map</p>
                  </div>
                )}
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="font-[family-name:var(--font-figtree)]" style={{ fontSize: '28px', fontWeight: 800, color: '#0F1B2D', marginBottom: '32px' }}>Schedule a Repair</h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
