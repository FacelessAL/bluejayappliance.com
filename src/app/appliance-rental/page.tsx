import type { Metadata } from 'next';
import Link from 'next/link';
import { getBusiness } from '@/lib/data';
import SchemaMarkup from '@/components/SchemaMarkup';
import Breadcrumbs from '@/components/Breadcrumbs';

const biz = getBusiness();

export const metadata: Metadata = {
  title: `Appliance Rental Service | ${biz.name} | ${biz.address.city}, ${biz.address.state}`,
  description: `Affordable appliance rental service in ${biz.address.city}, ${biz.address.state}. Rent washers, dryers, and washer & dryer sets with free delivery, installation, and maintenance included. Call ${biz.phoneSlogan}.`,
  openGraph: {
    title: `Appliance Rental Service | ${biz.name}`,
    description: `Affordable appliance rental in ${biz.address.city}. Free delivery & installation. Maintenance included. Call ${biz.phoneSlogan}.`,
  },
};

const packages = [
  {
    name: 'Washer Only',
    price: '$35',
    period: '/mo',
    features: [
      'Top-loading washer',
      'Standard washing capacity',
      'Free delivery & installation',
      'Maintenance included',
      'Energy efficient',
    ],
    popular: false,
  },
  {
    name: 'Washer & Dryer Set',
    price: '$60',
    period: '/mo',
    features: [
      'Top-loading washer',
      'Standard washing capacity',
      'Standard capacity dryer',
      'Free delivery & installation',
      'Maintenance included',
    ],
    popular: true,
  },
  {
    name: 'Dryer Only',
    price: '$35',
    period: '/mo',
    features: [
      'Standard drying capacity',
      'Free delivery & installation',
      'Maintenance included',
      'Energy efficient',
      'Quick drying cycles',
    ],
    popular: false,
  },
];

const steps = [
  {
    number: '1',
    title: 'Choose Your Package',
    description: 'Select the rental package that fits your needs — washer, dryer, or both.',
  },
  {
    number: '2',
    title: 'Schedule Delivery',
    description: 'We\'ll deliver and install your appliance at a time that works for you.',
  },
  {
    number: '3',
    title: 'Enjoy Hassle-Free',
    description: 'Use your appliance worry-free. Maintenance and repairs are on us.',
  },
];

export default function ApplianceRentalPage() {
  return (
    <>
      <SchemaMarkup
        type="Service"
        pageName={`Appliance Rental Service | ${biz.name}`}
        pageDescription={`Affordable appliance rental service in ${biz.address.city}. Rent washers, dryers, and sets with free delivery, installation, and maintenance.`}
        pageUrl={`${biz.url}/appliance-rental`}
        breadcrumbs={[
          { name: 'Home', url: biz.url },
          { name: 'Appliance Rental', url: `${biz.url}/appliance-rental` },
        ]}
      />

      <Breadcrumbs items={[{ label: 'Appliance Rental', href: '/appliance-rental' }]} />

      {/* Hero */}
      <section style={{ backgroundColor: '#0F1B2D', color: '#ffffff', padding: '60px 0 50px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
          <h1 className="font-[family-name:var(--font-figtree)]" style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 800, textTransform: 'uppercase', marginBottom: '16px', lineHeight: '1.15' }}>
            Appliance Rental Service
          </h1>
          <p style={{ fontFamily: 'var(--font-poppins)', fontSize: '18px', lineHeight: '1.7', color: '#d1d5db', maxWidth: '700px', marginBottom: '24px' }}>
            Affordable, reliable, and hassle-free appliance rentals for your home. Rent washers, dryers, and more with free delivery, installation, and maintenance included.
          </p>
          <Link
            href={`tel:${biz.phoneRaw}`}
            className="font-[family-name:var(--font-figtree)] hover:bg-blue-800 transition-colors"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', backgroundColor: '#1565C0', color: '#ffffff', padding: '16px 32px', borderRadius: '50px', fontWeight: 700, fontSize: '18px', textDecoration: 'none' }}
          >
            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            Call Now: {biz.phone}
          </Link>
        </div>
      </section>

      {/* Pricing & Packages */}
      <section id="packages" style={{ backgroundColor: '#ffffff', padding: '80px 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
          <h2 className="font-[family-name:var(--font-figtree)]" style={{ fontSize: '32px', fontWeight: 800, textTransform: 'uppercase', textAlign: 'center', marginBottom: '8px', color: '#0F1B2D' }}>
            Pricing &amp; Packages
          </h2>
          <p style={{ fontFamily: 'var(--font-poppins)', fontSize: '16px', color: '#6b7280', textAlign: 'center', marginBottom: '48px' }}>
            Simple, transparent pricing with no hidden fees
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', maxWidth: '960px', margin: '0 auto' }}>
            {packages.map((pkg) => (
              <div
                key={pkg.name}
                style={{
                  border: pkg.popular ? '2px solid #1565C0' : '1px solid #e5e7eb',
                  borderRadius: '12px',
                  padding: '32px 24px',
                  textAlign: 'center',
                  position: 'relative',
                  backgroundColor: '#ffffff',
                  boxShadow: pkg.popular ? '0 4px 20px rgba(21,101,192,0.15)' : '0 2px 8px rgba(0,0,0,0.06)',
                }}
              >
                {pkg.popular && (
                  <div style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', backgroundColor: '#1565C0', color: '#fff', padding: '4px 16px', borderRadius: '20px', fontSize: '12px', fontWeight: 700, fontFamily: 'var(--font-figtree)' }}>
                    MOST POPULAR
                  </div>
                )}
                <h3 className="font-[family-name:var(--font-figtree)]" style={{ fontSize: '20px', fontWeight: 700, color: '#0F1B2D', marginBottom: '16px', textTransform: 'uppercase' }}>
                  {pkg.name}
                </h3>
                <div style={{ marginBottom: '24px' }}>
                  <span style={{ fontSize: '42px', fontWeight: 800, color: '#1565C0', fontFamily: 'var(--font-figtree)' }}>{pkg.price}</span>
                  <span style={{ fontSize: '16px', color: '#6b7280' }}>{pkg.period}</span>
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px', textAlign: 'left' }}>
                  {pkg.features.map((feature, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 0', borderBottom: '1px solid #f3f4f6', fontSize: '14px', color: '#374151', fontFamily: 'var(--font-poppins)' }}>
                      <svg width="16" height="16" fill="#1565C0" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  href={`tel:${biz.phoneRaw}`}
                  className="font-[family-name:var(--font-figtree)] hover:opacity-90 transition-opacity"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    backgroundColor: pkg.popular ? '#1565C0' : '#0F1B2D',
                    color: '#ffffff',
                    padding: '12px 24px',
                    borderRadius: '6px',
                    fontWeight: 700,
                    fontSize: '14px',
                    textDecoration: 'none',
                    textTransform: 'uppercase',
                  }}
                >
                  <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Call to Rent
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section style={{ backgroundColor: '#0F1B2D', color: '#ffffff', padding: '60px 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
          <h2 className="font-[family-name:var(--font-figtree)]" style={{ fontSize: '28px', fontWeight: 800, textTransform: 'uppercase', textAlign: 'center', marginBottom: '40px', color: '#ffffff' }}>
            How It Works
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '32px', maxWidth: '900px', margin: '0 auto' }}>
            {steps.map((step) => (
              <div key={step.number} style={{ textAlign: 'center' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: '#1565C0', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', fontSize: '24px', fontWeight: 800, fontFamily: 'var(--font-figtree)' }}>
                  {step.number}
                </div>
                <h3 className="font-[family-name:var(--font-figtree)]" style={{ fontSize: '18px', fontWeight: 700, marginBottom: '8px', color: '#ffffff' }}>
                  {step.title}
                </h3>
                <p style={{ fontSize: '14px', color: '#9ca3af', lineHeight: '1.6', fontFamily: 'var(--font-poppins)' }}>
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section style={{ backgroundColor: '#ffffff', padding: '80px 0' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto', padding: '0 2rem', textAlign: 'center' }}>
          <h2 className="font-[family-name:var(--font-figtree)]" style={{ fontSize: '28px', fontWeight: 800, textTransform: 'uppercase', marginBottom: '16px', color: '#0F1B2D' }}>
            Ready to Get Started?
          </h2>
          <p style={{ fontFamily: 'var(--font-poppins)', fontSize: '16px', color: '#6b7280', marginBottom: '32px', lineHeight: '1.7' }}>
            Give us a call to discuss your rental needs. We&apos;ll help you pick the right package and schedule a convenient delivery time.
          </p>
          <Link
            href={`tel:${biz.phoneRaw}`}
            className="font-[family-name:var(--font-figtree)] hover:bg-blue-800 transition-colors"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', backgroundColor: '#1565C0', color: '#ffffff', padding: '20px 48px', borderRadius: '50px', fontWeight: 700, fontSize: '22px', textDecoration: 'none' }}
          >
            <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            {biz.phoneCTA}
          </Link>
        </div>
      </section>
    </>
  );
}
