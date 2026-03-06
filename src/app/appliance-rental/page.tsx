import type { Metadata } from 'next';
import Link from 'next/link';
import { getBusiness } from '@/lib/data';
import SchemaMarkup from '@/components/SchemaMarkup';
import Breadcrumbs from '@/components/Breadcrumbs';
import RentalForm from '@/components/RentalForm';

const biz = getBusiness();

export const metadata: Metadata = {
  title: `Appliance Rental Service | ${biz.name} | ${biz.address.city}, ${biz.address.state}`,
  description: `Affordable appliance rental service in ${biz.address.city}, ${biz.address.state}. Rent washers, dryers, and washer & dryer sets with free delivery, installation, and maintenance included. Call ${biz.phoneSlogan}.`,
  openGraph: {
    title: `Appliance Rental Service | ${biz.name}`,
    description: `Affordable appliance rental in ${biz.address.city}. Free delivery & installation. Maintenance included. Call ${biz.phoneSlogan}.`,
  },
  alternates: {
    canonical: `${biz.url}/appliance-rental`,
  },
};

const packages = [
  {
    name: 'Washer Only',
    price: '$35',
    period: '/mo',
    startCost: '$135 to start (first month + $100 refundable deposit)',
    features: [
      'Top-loading washer',
      'Standard washing capacity',
      'Free delivery & hookup',
      'All maintenance included',
      '$100 deposit refunded when unit returned',
    ],
    popular: false,
  },
  {
    name: 'Washer & Dryer Set',
    price: '$60',
    period: '/mo',
    startCost: '$260 to start (first month + $200 refundable deposit)',
    features: [
      'Top-loading washer + dryer',
      'Free delivery & hookup',
      'All maintenance included',
      'Auto-billing after first month',
      '$100 deposit per unit, refunded on return',
    ],
    popular: true,
  },
  {
    name: 'Dryer Only',
    price: '$35',
    period: '/mo',
    startCost: '$135 to start (first month + $100 refundable deposit)',
    features: [
      'Gas or electric available',
      'Standard drying capacity',
      'Free delivery & hookup',
      'All maintenance included',
      '$100 deposit refunded when unit returned',
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
            Simple, transparent pricing. First month + refundable deposit to start, then auto-billed monthly.
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
                <div style={{ marginBottom: '12px' }}>
                  <span style={{ fontSize: '42px', fontWeight: 800, color: '#1565C0', fontFamily: 'var(--font-figtree)' }}>{pkg.price}</span>
                  <span style={{ fontSize: '16px', color: '#6b7280' }}>{pkg.period}</span>
                </div>
                <p style={{ fontSize: '12px', color: '#6b7280', fontFamily: 'var(--font-poppins)', marginBottom: '20px', lineHeight: '1.4' }}>
                  {pkg.startCost}
                </p>
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

      {/* Renting vs. Owning */}
      <section style={{ backgroundColor: '#f8fafc', padding: '80px 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
          <h2 className="font-[family-name:var(--font-figtree)]" style={{ fontSize: '32px', fontWeight: 800, textTransform: 'uppercase', textAlign: 'center', marginBottom: '8px', color: '#0F1B2D' }}>
            Renting vs. Buying: Why Renting Makes Sense
          </h2>
          <p style={{ fontFamily: 'var(--font-poppins)', fontSize: '16px', color: '#6b7280', textAlign: 'center', marginBottom: '48px', maxWidth: '700px', margin: '0 auto 48px' }}>
            Not everyone needs to own their appliances. Here&apos;s why renting could be the smarter financial move for your situation.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px', maxWidth: '960px', margin: '0 auto' }}>
            <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', padding: '32px', border: '1px solid #e2e8f0' }}>
              <h3 className="font-[family-name:var(--font-figtree)]" style={{ fontSize: '20px', fontWeight: 700, color: '#0F1B2D', marginBottom: '16px' }}>
                The Cost of Buying
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[
                  'A new washer costs $500\u2013$1,200 upfront',
                  'A dryer adds another $400\u2013$1,000',
                  'Delivery and installation fees: $100\u2013$200',
                  'Repairs after warranty expires are on you',
                  'Average appliance lifespan: 8\u201312 years',
                  'Total 10-year cost: $1,500\u2013$3,000+',
                ].map((item, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontFamily: 'var(--font-poppins)', fontSize: '14px', color: '#4b5563', lineHeight: '1.5' }}>
                    <span style={{ color: '#ef4444', fontWeight: 700, fontSize: '16px', flexShrink: 0 }}>&#10005;</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', padding: '32px', border: '2px solid #1565C0', boxShadow: '0 4px 16px rgba(21,101,192,0.1)' }}>
              <h3 className="font-[family-name:var(--font-figtree)]" style={{ fontSize: '20px', fontWeight: 700, color: '#1565C0', marginBottom: '16px' }}>
                The Rental Advantage
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[
                  'As low as $35/month + a $100 refundable deposit per unit',
                  'Free delivery and professional installation',
                  'All maintenance and repairs included',
                  'Upgrade or swap anytime as needs change',
                  'No long-term commitment required',
                  'Predictable monthly expense \u2014 no surprises',
                ].map((item, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontFamily: 'var(--font-poppins)', fontSize: '14px', color: '#4b5563', lineHeight: '1.5' }}>
                    <span style={{ color: '#16a34a', fontWeight: 700, fontSize: '16px', flexShrink: 0 }}>&#10003;</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Who It's For */}
      <section style={{ backgroundColor: '#ffffff', padding: '80px 0' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 2rem' }}>
          <h2 className="font-[family-name:var(--font-figtree)]" style={{ fontSize: '28px', fontWeight: 800, textTransform: 'uppercase', textAlign: 'center', marginBottom: '8px', color: '#0F1B2D' }}>
            Who Is Appliance Rental For?
          </h2>
          <p style={{ fontFamily: 'var(--font-poppins)', fontSize: '16px', color: '#6b7280', textAlign: 'center', marginBottom: '40px', maxWidth: '680px', margin: '0 auto 40px' }}>
            Our rental program is designed for real situations where buying doesn&apos;t make sense.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            {[
              { title: 'Renters & Tenants', desc: 'Your landlord won\'t replace the broken washer? Rent one from us. When your lease ends, we pick it up \u2014 no appliance to move or sell.' },
              { title: 'Tight Budget, Immediate Need', desc: 'When your washer dies and you can\'t afford $800 for a new one, $135 (first month + refundable deposit) gets you a working machine this week instead of $800+ for a new one.' },
              { title: 'Temporary Living Situations', desc: 'Relocating for work, renovating your home, or between permanent housing? Rent appliances for exactly as long as you need them.' },
              { title: 'Landlords & Property Managers', desc: 'Keep rental units move-in ready without buying appliances that tenants abuse. We handle maintenance, you keep tenants happy.' },
              { title: 'First-Time Apartments', desc: 'Moving into your first unfurnished apartment? Renting appliances lets you get settled without draining your savings on day one.' },
              { title: 'Seniors on Fixed Income', desc: 'A predictable $35\u2013$60 monthly expense is easier to budget than a surprise $1,000 appliance purchase. Maintenance is always included.' },
            ].map((item, i) => (
              <div key={i} style={{ backgroundColor: '#f8fafc', borderRadius: '10px', padding: '24px', border: '1px solid #e5e7eb' }}>
                <h3 className="font-[family-name:var(--font-figtree)]" style={{ fontSize: '16px', fontWeight: 700, color: '#0F1B2D', marginBottom: '8px' }}>
                  {item.title}
                </h3>
                <p style={{ fontFamily: 'var(--font-poppins)', fontSize: '14px', color: '#4b5563', lineHeight: '1.6', margin: 0 }}>
                  {item.desc}
                </p>
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

      {/* FAQ */}
      <section style={{ backgroundColor: '#f8fafc', padding: '80px 0' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 2rem' }}>
          <h2 className="font-[family-name:var(--font-figtree)]" style={{ fontSize: '28px', fontWeight: 800, textTransform: 'uppercase', textAlign: 'center', marginBottom: '40px', color: '#0F1B2D' }}>
            Rental FAQ
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { q: 'Is there a minimum rental period?', a: 'No long-term contracts required. We offer flexible month-to-month rental terms. Most customers rent for 6\u201324 months, but you can return the appliance anytime with 30 days notice.' },
              { q: 'What happens if the appliance breaks down?', a: 'We fix it at no cost to you \u2014 that\'s the whole point. Call us and we\'ll send a technician to repair or replace the unit, typically within 24\u201348 hours.' },
              { q: 'Are these used or new appliances?', a: 'We rent professionally refurbished appliances that have been thoroughly inspected, cleaned, and tested by our own technicians. Every unit is guaranteed to perform like new.' },
              { q: 'Do you deliver and install for free?', a: 'Yes. Free delivery, installation, and hookup are included in every rental package. We also remove the unit for free when you\'re done renting.' },
              { q: 'Can I rent if I have bad credit?', a: 'We keep the approval process simple. We work with customers on a case-by-case basis because we believe everyone deserves access to working appliances regardless of credit history.' },
              { q: 'What areas do you deliver to?', a: `We deliver throughout ${biz.serviceAreaName} including Naperville, Aurora, Joliet, Plainfield, Bolingbrook, Downers Grove, Wheaton, and all surrounding communities.` },
            ].map((faq, i) => (
              <details key={i} style={{ backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #e5e7eb', overflow: 'hidden' }}>
                <summary className="font-[family-name:var(--font-figtree)]" style={{ padding: '18px 24px', fontSize: '16px', fontWeight: 700, color: '#0F1B2D', cursor: 'pointer', listStyle: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  {faq.q}
                  <span style={{ color: '#1565C0', fontSize: '20px', fontWeight: 700, marginLeft: '16px', flexShrink: 0 }}>+</span>
                </summary>
                <div style={{ padding: '0 24px 18px', color: '#4b5563', fontSize: '14px', lineHeight: '1.7', fontFamily: 'var(--font-poppins)' }}>
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Rental Inquiry Form */}
      <section id="rental-form" style={{ backgroundColor: '#ffffff', padding: '80px 0' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 2rem' }}>
          <div className="grid-2col" style={{ alignItems: 'start' }}>
            <div>
              <h2 className="font-[family-name:var(--font-figtree)]" style={{ fontSize: '28px', fontWeight: 800, textTransform: 'uppercase', marginBottom: '16px', color: '#0F1B2D' }}>
                Request Rental Info
              </h2>
              <p style={{ fontFamily: 'var(--font-poppins)', fontSize: '15px', color: '#6b7280', marginBottom: '24px', lineHeight: '1.7' }}>
                Fill out the form and we&apos;ll call you back to discuss your rental options, pricing, and delivery schedule. No credit hassles, no hidden fees.
              </p>
              <div style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '24px' }}>
                <RentalForm />
              </div>
            </div>
            <div style={{ position: 'sticky', top: '120px' }}>
              <div style={{ backgroundColor: '#0F1B2D', borderRadius: '12px', padding: '32px', color: '#ffffff', textAlign: 'center', marginBottom: '24px' }}>
                <h3 className="font-[family-name:var(--font-figtree)]" style={{ fontWeight: 700, fontSize: '20px', marginBottom: '8px' }}>
                  Prefer to Call?
                </h3>
                <p style={{ fontSize: '14px', marginBottom: '20px', opacity: 0.8, fontFamily: 'var(--font-poppins)' }}>Talk to us directly about rental options</p>
                <Link
                  href={`tel:${biz.phoneRaw}`}
                  style={{ display: 'block', fontSize: '26px', fontWeight: 800, color: '#ffffff', textDecoration: 'none', marginBottom: '16px', fontFamily: 'var(--font-figtree)' }}
                >
                  {biz.phone}
                </Link>
                <Link
                  href="/contact-us"
                  style={{ display: 'inline-block', backgroundColor: '#1565C0', color: '#ffffff', padding: '12px 28px', borderRadius: '6px', fontWeight: 700, fontSize: '14px', textDecoration: 'none', fontFamily: 'var(--font-figtree)' }}
                >
                  Or Schedule a Repair
                </Link>
              </div>
              <div style={{ backgroundColor: '#f8fafc', borderRadius: '12px', padding: '24px', border: '1px solid #e2e8f0' }}>
                <h4 className="font-[family-name:var(--font-figtree)]" style={{ fontSize: '16px', fontWeight: 700, color: '#0F1B2D', marginBottom: '16px' }}>What&apos;s Included</h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {[
                    'Free delivery & installation',
                    'All maintenance & repairs included',
                    'Free pickup when you\'re done',
                    'No long-term contracts',
                    'Month-to-month flexibility',
                    'Simple approval process',
                  ].map((item, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontFamily: 'var(--font-poppins)', color: '#374151' }}>
                      <span style={{ color: '#16a34a', fontWeight: 700, flexShrink: 0 }}>&#10003;</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
