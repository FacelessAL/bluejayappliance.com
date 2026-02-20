import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getBusiness, getAllLocations } from '@/lib/data';
import TestimonialSection from '@/components/TestimonialSection';
import CTABand from '@/components/CTABand';
import SchemaMarkup from '@/components/SchemaMarkup';
import Breadcrumbs from '@/components/Breadcrumbs';

const biz = getBusiness();

export const metadata: Metadata = {
  title: `About ${biz.name} | ${biz.serviceCategory} ${biz.address.city}, ${biz.address.state}`,
  description:
    `Learn about ${biz.name}, ${biz.address.city}'s trusted appliance repair experts. Family-owned, 10+ years experience, same or next-day service. Call ${biz.phoneSlogan}.`,
  openGraph: {
    title: `About ${biz.name} | ${biz.serviceCategory} ${biz.address.city}, ${biz.address.state}`,
    description:
      `Learn about ${biz.name}, ${biz.address.city}'s trusted appliance repair experts. Family-owned, 10+ years experience, same or next-day service. Call ${biz.phoneSlogan}.`,
  },
  alternates: {
    canonical: `${biz.url}/about-us`,
  },
};

const coreValues = [
  {
    title: 'Honesty',
    description:
      'We provide clear, written estimates before starting any work. No hidden fees, no unnecessary upsells. If a repair isn\'t worth it, we\'ll tell you — and help you find a better solution.',
  },
  {
    title: 'Reliability',
    description:
      'When we say we\'ll be there, we\'ll be there. Our same or next-day service means you won\'t be waiting around with a broken appliance. We show up on time and get the job done right.',
  },
  {
    title: 'Expertise',
    description:
      'With over a decade of hands-on experience, our technicians have seen it all. From refrigerators that stop cooling to washers that quit mid-cycle, we diagnose accurately and repair efficiently.',
  },
  {
    title: 'Respect',
    description:
      'We treat every home like it\'s our own. Our technicians are courteous, clean up after themselves, and take the time to explain what they\'re doing and why. Your comfort matters to us.',
  },
  {
    title: 'Quality',
    description:
      'Every repair is backed by our 90-day warranty on parts and labor. We use quality replacement parts and follow manufacturer guidelines to ensure lasting results.',
  },
  {
    title: 'Community',
    description:
      'As a locally-owned business in Naperville, we\'re invested in the community we serve. We treat every customer like a neighbor because that\'s exactly what you are.',
  },
];

const differentiators = [
  {
    title: 'Family-Owned & Operated',
    description: 'We\'re a local business with 20 years of industry experience, not a national franchise. You\'ll get personalized service from people who care.',
  },
  {
    title: 'Transparent, Upfront Pricing',
    description: 'No surprises on your bill. We provide written estimates before any work begins so you know exactly what to expect.',
  },
  {
    title: '90-Day Parts & Labor Warranty',
    description: 'We stand behind every repair. If something isn\'t right, we\'ll make it right — that\'s our guarantee to you.',
  },
  {
    title: 'Same or Next-Day Service',
    description: 'We understand a broken appliance disrupts your life. That\'s why we offer fast scheduling to get your home back to normal quickly.',
  },
  {
    title: 'All Major Brands Serviced',
    description: 'From Whirlpool and Samsung to LG, GE, and Maytag — our technicians are trained to repair nearly every major appliance brand.',
  },
  {
    title: 'Senior Discount Available',
    description: 'We believe in supporting our community. Ask us about our senior discount when you schedule your next repair.',
  },
];

export default function AboutPage() {
  const locations = getAllLocations();

  return (
    <>
      <SchemaMarkup
        type="AboutPage"
        pageName={`About ${biz.name}`}
        pageDescription={`Family-owned appliance repair company serving ${biz.address.city} and ${biz.serviceAreaName}. 10+ years experience, same or next-day service.`}
        pageUrl={`${biz.url}/about-us`}
        breadcrumbs={[
          { name: 'Home', url: biz.url },
          { name: 'About Us', url: `${biz.url}/about-us` },
        ]}
      />

      <Breadcrumbs items={[{ label: 'About Us', href: '/about-us' }]} />

      {/* Hero */}
      <section style={{ position: 'relative', backgroundColor: '#0F1B2D', color: '#ffffff', padding: '60px 0', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <Image
            src="/images/about-hero.gif"
            alt={`${biz.name} team`}
            fill
            className="object-cover"
            style={{ opacity: 0.3 }}
            priority
            unoptimized
          />
        </div>
        <div className="container" style={{ position: 'relative', textAlign: 'center' }}>
          <h1 className="font-[family-name:var(--font-figtree)] heading-hero" style={{ fontWeight: 800, marginBottom: '16px' }}>
            About Us
          </h1>
        </div>
      </section>

      {/* Meet the Owner + About */}
      <section style={{ padding: '64px 0', backgroundColor: '#ffffff' }}>
        <div className="container">
          <div className="grid-2col" style={{ gap: '48px', alignItems: 'start' }}>
            <div>
              <h2 className="font-[family-name:var(--font-figtree)]" style={{ fontSize: '32px', fontWeight: 800, color: '#0F1B2D', marginBottom: '8px' }}>
                Meet Jesse — Founder &amp; Lead Technician
              </h2>
              <h3 className="font-[family-name:var(--font-figtree)]" style={{ fontSize: '20px', fontWeight: 700, color: '#1565C0', marginBottom: '24px' }}>
                10+ Years of Hands-On Appliance Repair Experience
              </h3>
              <p style={{ color: '#4b5563', marginBottom: '16px', lineHeight: '1.7', fontFamily: 'var(--font-poppins)', fontSize: '15px' }}>
                Jesse is the owner and lead service technician at {biz.shortName}, bringing more than a decade of hands-on experience to every kitchen and laundry room he steps into. Starting out as a helper and working his way up through the trade, Jesse built {biz.shortName} on a simple idea: treat every home like it&apos;s your own and every customer like a neighbor.
              </p>
              <p style={{ color: '#4b5563', marginBottom: '16px', lineHeight: '1.7', fontFamily: 'var(--font-poppins)', fontSize: '15px' }}>
                From refrigerators that suddenly stop cooling to washers that quit mid-cycle, Jesse has seen it all — and knows how stressful a broken appliance can be. He&apos;s known for his calm, friendly approach, clear explanations, and honest recommendations, whether that means a quick repair or letting you know when it&apos;s smarter to replace.
              </p>
              <p style={{ color: '#4b5563', marginBottom: '16px', lineHeight: '1.7', fontFamily: 'var(--font-poppins)', fontSize: '15px' }}>
                As lead tech, he personally trains the team to follow the same standards: show up on time, respect the home, fix it right, and stand behind the work. When Jesse isn&apos;t on the road helping customers, he&apos;s usually with his family or staying updated on the latest appliance technology.
              </p>
              <h3 className="font-[family-name:var(--font-figtree)]" style={{ fontSize: '20px', fontWeight: 700, color: '#0F1B2D', marginBottom: '16px', marginTop: '32px' }}>
                Our Story
              </h3>
              <p style={{ color: '#4b5563', marginBottom: '16px', lineHeight: '1.7', fontFamily: 'var(--font-poppins)', fontSize: '15px' }}>
                {biz.aboutIntro}
              </p>
              <p style={{ color: '#4b5563', lineHeight: '1.7', fontFamily: 'var(--font-poppins)', fontSize: '15px' }}>
                Over the years, we&apos;ve expanded our services, reflecting our commitment to meet the evolving needs of our customers. Each repair job has shaped our expertise, allowing us to tackle challenges with confidence. Today, we are proud to say that our reputation is built on quality workmanship and exceptional customer support. Our goal is not just to fix your appliances — it is to build lasting relationships with every homeowner we serve.
              </p>
            </div>
            <div>
              <Image
                src="/images/about-team.gif"
                alt={`${biz.name} team at work`}
                width={600}
                height={450}
                style={{ borderRadius: '12px', width: '100%', height: 'auto' }}
                unoptimized
              />
              {/* Areas We Serve - under image */}
              <div style={{ marginTop: '32px' }}>
                <h3 className="font-[family-name:var(--font-figtree)]" style={{ fontSize: '20px', fontWeight: 700, color: '#0F1B2D', marginBottom: '8px' }}>
                  Areas We Serve
                </h3>
                <p style={{ color: '#4b5563', marginBottom: '16px', fontFamily: 'var(--font-poppins)', fontSize: '14px', lineHeight: '1.6' }}>
                  Our expert team serves homeowners across:
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  {locations.map((location) => (
                    <Link
                      key={location.slug}
                      href={`/${location.slug}`}
                      style={{ backgroundColor: '#E3F2FD', borderRadius: '8px', padding: '12px', textAlign: 'center', textDecoration: 'none', transition: 'all 0.2s' }}
                    >
                      <span className="font-[family-name:var(--font-figtree)]" style={{ fontWeight: 600, fontSize: '13px', textTransform: 'uppercase', color: '#0F1B2D' }}>
                        {location.fullName}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section style={{ padding: '72px 0', backgroundColor: '#0F1B2D' }}>
        <div className="container">
          <h2 className="font-[family-name:var(--font-figtree)]" style={{ fontSize: '32px', fontWeight: 800, textAlign: 'center', color: '#ffffff', marginBottom: '16px' }}>Our Core Values</h2>
          <p style={{ textAlign: 'center', color: '#9ca3af', marginBottom: '48px', maxWidth: '640px', margin: '0 auto 48px', fontFamily: 'var(--font-poppins)', fontSize: '15px' }}>
            Everything we do is guided by a simple set of principles that put our customers first.
          </p>
          <div className="grid-3col" style={{ gap: '24px' }}>
            {coreValues.map((value, index) => (
              <div key={index} style={{ backgroundColor: 'rgba(255,255,255,0.04)', borderRadius: '12px', padding: '32px', borderTop: '4px solid #1565C0', border: '1px solid rgba(255,255,255,0.08)', borderTopWidth: '4px', borderTopColor: '#1565C0', position: 'relative', overflow: 'hidden' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '14px' }}>
                  <span className="font-[family-name:var(--font-figtree)]" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'rgba(21,101,192,0.2)', color: '#64B5F6', fontSize: '16px', fontWeight: 800, flexShrink: 0 }}>
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 className="font-[family-name:var(--font-figtree)]" style={{ fontWeight: 800, fontSize: '20px', color: '#ffffff', margin: 0 }}>{value.title}</h3>
                </div>
                <p style={{ color: '#9ca3af', fontSize: '14px', lineHeight: '1.7', fontFamily: 'var(--font-poppins)' }}>{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Differentiators */}
      <section style={{ padding: '64px 0', backgroundColor: '#f3f4f6' }}>
        <div className="container">
          <h2 className="font-[family-name:var(--font-figtree)]" style={{ fontSize: '32px', fontWeight: 800, textAlign: 'center', color: '#0F1B2D', marginBottom: '16px' }}>What Sets Us Apart</h2>
          <p style={{ textAlign: 'center', color: '#4b5563', marginBottom: '40px', maxWidth: '700px', margin: '0 auto 40px', fontFamily: 'var(--font-poppins)', fontSize: '15px' }}>
            Here&apos;s why homeowners across {biz.serviceAreaName} trust {biz.shortName} for their appliance repairs:
          </p>
          <div className="grid-3col" style={{ gap: '24px' }}>
            {differentiators.map((item, index) => (
              <div key={index} style={{ backgroundColor: '#ffffff', borderRadius: '12px', padding: '28px', borderLeft: '4px solid #1565C0', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                <h3 className="font-[family-name:var(--font-figtree)]" style={{ fontWeight: 700, fontSize: '18px', color: '#0F1B2D', marginBottom: '8px' }}>{item.title}</h3>
                <p style={{ color: '#4b5563', fontSize: '14px', lineHeight: '1.6', fontFamily: 'var(--font-poppins)' }}>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABand />
      <TestimonialSection />
    </>
  );
}
