import Link from 'next/link';
import Image from 'next/image';
import { getBusiness, getAllServices, getAllLocations } from '@/lib/data';
import ServiceCard from '@/components/ServiceCard';
import TestimonialSection from '@/components/TestimonialSection';
import CTABand from '@/components/CTABand';
import SchemaMarkup from '@/components/SchemaMarkup';
import ContactForm from '@/components/ContactForm';

export default function Home() {
  const biz = getBusiness();
  const services = getAllServices();
  const locations = getAllLocations();

  return (
    <>
      <SchemaMarkup
        type="LocalBusiness"
        pageName={biz.name}
        pageDescription={biz.description}
        pageUrl={biz.url}
        breadcrumbs={[{ name: 'Home', url: biz.url }]}
        serviceOfferings={services.map((s) => ({
          name: s.title,
          description: s.heroSubheading,
          url: `${biz.url}/services/${s.slug}`,
        }))}
      />

      {/* ===== HERO ===== */}
      <section className="relative min-h-[70vh] md:min-h-[90vh] flex items-end md:items-center overflow-hidden pb-[80px] md:pb-[100px] pt-[160px] lg:pt-[180px] hero-offset">
        <div className="absolute inset-0">
          <Image
            src="/images/hero-bg.webp"
            alt={`${biz.name} - professional appliance repair services in Naperville IL`}
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0" style={{ backgroundColor: 'rgba(15,27,45,0.45)' }} />
        </div>
        <div className="relative z-10 w-full container" style={{ maxWidth: '1200px' }}>
          <div style={{ maxWidth: '680px' }}>
            <div
              className="font-[family-name:var(--font-figtree)]"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(21,101,192,0.85)', color: '#ffffff', padding: '8px 18px', borderRadius: '50px', fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '24px' }}
            >
              <span style={{ fontSize: '16px' }}>&#9733;</span>
              Ask Us About Our Senior Discount!
            </div>
            <h1 className="font-[family-name:var(--font-figtree)]" style={{ fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 800, color: '#ffffff', lineHeight: '1.1', marginBottom: '24px' }}>
              {biz.address.city}&apos;s Local Appliance{' '}
              <br className="hidden md:block" />
              Repair <span style={{ color: '#42A5F5' }}>Experts</span>
            </h1>
            <p className="font-[family-name:var(--font-poppins)]" style={{ fontSize: '16px', color: '#d1d5db', lineHeight: '1.7', marginBottom: '36px', maxWidth: '560px' }}>
              Same or Next Day Service Available. Professional appliance repair services in {biz.address.city}, {biz.address.state}. Your trusted partner for all appliance needs.
            </p>
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <Link
                href={`tel:${biz.phoneRaw}`}
                className="font-[family-name:var(--font-figtree)] hover:bg-gray-100 transition-colors"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', backgroundColor: '#ffffff', color: '#0F1B2D', padding: '14px 28px', borderRadius: '6px', fontWeight: 700, fontSize: '16px', textDecoration: 'none' }}
              >
                <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call Now: {biz.phone}
              </Link>
              <Link
                href="/contact-us"
                className="font-[family-name:var(--font-figtree)] hover:bg-blue-800 transition-colors"
                style={{ display: 'inline-block', backgroundColor: '#1565C0', color: '#ffffff', padding: '14px 28px', borderRadius: '6px', fontWeight: 700, fontSize: '16px', textDecoration: 'none' }}
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== WELCOME / ABOUT INTRO ===== */}
      <section className="bg-white" style={{ padding: '80px 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem', textAlign: 'center' }}>
          <h2 className="font-[family-name:var(--font-figtree)] heading-hero" style={{ fontWeight: 700, textTransform: 'uppercase', marginBottom: '24px', color: '#0F1B2D' }}>
            Welcome to {biz.name}
          </h2>
          <p style={{ maxWidth: '1050px', margin: '0 auto 48px', fontFamily: 'var(--font-poppins)', fontSize: '18px', fontWeight: 500, lineHeight: '31px', color: '#0F1B2D' }}>
            {biz.aboutIntro} Our team of knowledgeable and friendly technicians will start by diagnosing the cause of the problem and put together an honest and written estimate for repair. Our rates are transparent and affordable and we offer a 90 day warranty on all parts and labor.
          </p>
          {/* Featured Services Grid */}
          <div className="grid-4col-icons" style={{ maxWidth: '1000px', margin: '0 auto' }}>
            {services.slice(0, 4).map((service, i) => (
              <Link
                key={i}
                href={`/services/${service.slug}`}
                className="hover:opacity-90 transition-colors"
                style={{ backgroundColor: '#1565C0', padding: '40px 20px', borderRadius: '16px', boxShadow: '2px 2px 22px 0px rgba(0, 0, 0, 0.2)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}
              >
                <span style={{ color: '#fff', fontWeight: 700, fontSize: '20px', textTransform: 'uppercase', fontFamily: 'var(--font-figtree)', textAlign: 'center' }}>{service.shortTitle}</span>
              </Link>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '32px' }}>
            <Link
              href="/services"
              style={{ display: 'inline-block', backgroundColor: '#1565C0', color: '#ffffff', padding: '14px 36px', borderRadius: '4px', fontWeight: 700, fontSize: '15px', textTransform: 'uppercase', textDecoration: 'none', fontFamily: 'var(--font-figtree)', letterSpacing: '0.5px' }}
            >
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* ===== WHY CHOOSE US ===== */}
      <section style={{ position: 'relative', color: '#ffffff', padding: '80px 0', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <Image
            src="/images/hero-overlay.webp"
            alt="Background"
            fill
            style={{ objectFit: 'cover', objectPosition: 'center center' }}
          />
          <div style={{ position: 'absolute', inset: 0, backgroundColor: '#0F1B2DCF' }} />
        </div>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="grid-2col" style={{ gap: '30px', alignItems: 'center' }}>
            <div>
              <h2 className="font-[family-name:var(--font-figtree)] heading-xl" style={{ fontWeight: 700, textTransform: 'uppercase', marginBottom: '24px', color: '#ffffff' }}>
                Why Choose Blue Jay Appliance?
              </h2>
              <ul style={{ fontFamily: 'var(--font-poppins)', color: '#ffffff', lineHeight: '2', fontSize: '16px', fontWeight: 400, marginBottom: '32px', listStyle: 'none', padding: 0 }}>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '12px' }}>
                  <svg width="24" height="24" fill="#64B5F6" viewBox="0 0 24 24" style={{ flexShrink: 0, marginTop: '2px' }}><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                  <span>Experienced &amp; Certified Technicians with years of hands-on experience</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '12px' }}>
                  <svg width="24" height="24" fill="#64B5F6" viewBox="0 0 24 24" style={{ flexShrink: 0, marginTop: '2px' }}><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                  <span>Honest Service &amp; Upfront Pricing — no hidden fees or unnecessary upsells</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '12px' }}>
                  <svg width="24" height="24" fill="#64B5F6" viewBox="0 0 24 24" style={{ flexShrink: 0, marginTop: '2px' }}><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                  <span>Fast Response &amp; Reliable Results — same or next-day service available</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '12px' }}>
                  <svg width="24" height="24" fill="#64B5F6" viewBox="0 0 24 24" style={{ flexShrink: 0, marginTop: '2px' }}><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                  <span>90-Day Warranty on all parts and labor</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <svg width="24" height="24" fill="#64B5F6" viewBox="0 0 24 24" style={{ flexShrink: 0, marginTop: '2px' }}><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                  <span>Local Expertise — we understand the needs of our Naperville community</span>
                </li>
              </ul>
              <Link
                href="/contact-us"
                style={{ display: 'inline-block', backgroundColor: '#1565C0', color: '#ffffff', padding: '12px 25px', borderRadius: '6px', fontWeight: 700, fontSize: '18px', textTransform: 'uppercase', textDecoration: 'none', fontFamily: 'var(--font-figtree)', lineHeight: '1.5em' }}
              >
                Schedule a Repair
              </Link>
            </div>
            <div>
              <Image
                src="/images/about-team.gif"
                alt={`${biz.name} technician`}
                width={800}
                height={600}
                unoptimized
                className="img-responsive-height"
                style={{ width: '100%', height: '612px', objectFit: 'cover', borderRadius: '8px' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ===== OUR SERVICES GRID ===== */}
      <section style={{ backgroundColor: '#0F1B2D', color: '#ffffff', padding: '80px 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
          <h2 className="font-[family-name:var(--font-figtree)] heading-lg" style={{ fontWeight: 700, textTransform: 'uppercase', textAlign: 'center', marginBottom: '16px', color: '#ffffff' }}>
            Our Appliance Repair Services
          </h2>
          <p style={{ fontFamily: 'var(--font-poppins)', fontSize: '18px', fontWeight: 400, lineHeight: '31px', textAlign: 'center', color: '#ffffff', marginBottom: '48px', maxWidth: '1100px', margin: '0 auto 48px auto' }}>
            From washers and dryers to refrigerators and ovens, our expert technicians handle it all. We service nearly all major brand appliances for your home or business, delivering fast and reliable repairs at transparent prices.
          </p>
          {/* Services Grid */}
          <div className="grid-3col" style={{ gap: '10px' }}>
            {services.slice(0, 6).map((service) => (
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
          <div style={{ textAlign: 'center', marginTop: '32px' }}>
            <Link
              href="/services"
              className="hover:bg-white hover:text-bj-dark transition-colors"
              style={{ display: 'inline-block', border: '2px solid #ffffff', color: '#ffffff', padding: '12px 32px', borderRadius: '4px', fontWeight: 700, fontSize: '14px', textTransform: 'uppercase', textDecoration: 'none' }}
            >
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* ===== SAME-DAY SERVICE + SENIOR DISCOUNT ===== */}
      <section style={{ position: 'relative', backgroundColor: '#ffffff', paddingTop: '100px', paddingBottom: '80px' }}>
        {/* Curved divider at top */}
        <div style={{ position: 'absolute', top: '-1px', left: 0, width: '100%', overflow: 'hidden', lineHeight: 0, transform: 'rotate(180deg)' }}>
          <svg viewBox="0 0 1000 100" preserveAspectRatio="none" style={{ display: 'block', width: '100%', height: '80px' }}>
            <path d="M500,97C126.7,96.3,0.8,19.8,0,0v100l1000,0V1C1000,19.4,873.3,97.8,500,97z" fill="#0F1B2D" />
          </svg>
        </div>
        <div className="container" style={{ maxWidth: '1400px' }}>
          <div className="grid-2col" style={{ alignItems: 'center' }}>
            <div>
              <h2 className="font-[family-name:var(--font-figtree)] heading-xl" style={{ fontWeight: 700, textTransform: 'uppercase', marginBottom: '24px', color: '#0F1B2D' }}>
                Same or Next Day Service You Can Count On
              </h2>
              <p style={{ fontFamily: 'var(--font-poppins)', fontSize: '16px', fontWeight: 400, lineHeight: '28px', color: '#333333', marginBottom: '16px' }}>
                We know how stressful a broken appliance can be — that&apos;s why {biz.shortName} offers same or next-day service for most repairs. Our technicians arrive on time, diagnose the issue quickly, and get your appliance back up and running as fast as possible.
              </p>
              <p style={{ fontFamily: 'var(--font-poppins)', fontSize: '16px', fontWeight: 400, lineHeight: '28px', color: '#333333', marginBottom: '16px' }}>
                Every repair comes with a clear, written estimate before we begin — no surprises, no hidden fees. We believe in honest work at fair prices, which is why we&apos;ve earned the trust of homeowners across {biz.serviceAreaName}.
              </p>
              <div style={{ backgroundColor: '#E3F2FD', borderLeft: '4px solid #1565C0', padding: '16px 20px', borderRadius: '0 8px 8px 0', marginBottom: '32px' }}>
                <p style={{ fontFamily: 'var(--font-figtree)', fontWeight: 700, fontSize: '16px', color: '#0D47A1', margin: 0 }}>
                  Ask Us About Our Senior Discount!
                </p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <Link
                  href={`tel:${biz.phoneRaw}`}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', backgroundColor: '#1565C0', color: '#ffffff', padding: '18px 40px', borderRadius: '50px', fontWeight: 700, fontSize: '20px', textDecoration: 'none', fontFamily: 'var(--font-figtree)' }}
                >
                  <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  {biz.phoneCTA}
                </Link>
              </div>
            </div>
            <div className="img-responsive-height" style={{ position: 'relative', height: '650px', overflow: 'hidden', borderRadius: '12px' }}>
              <Image
                src="/images/services/washer-repair.webp"
                alt="Washing machine repair in Naperville IL by Blue Jay Appliance"
                fill
                style={{ objectFit: 'cover', objectPosition: 'center center' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ===== MEET THE OWNER ===== */}
      <section style={{ position: 'relative', overflow: 'hidden', padding: '80px 0' }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <Image
            src="/images/hero-overlay.webp"
            alt="Background"
            fill
            style={{ objectFit: 'cover', objectPosition: 'center center' }}
          />
          <div style={{ position: 'absolute', inset: 0, backgroundColor: '#0F1B2DE6' }} />
        </div>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="grid-2col" style={{ gap: '48px', alignItems: 'center' }}>
            <div>
              <h2 className="font-[family-name:var(--font-figtree)] heading-xl" style={{ fontWeight: 700, textTransform: 'uppercase', marginBottom: '24px', color: '#ffffff' }}>
                Meet Jesse, Your Local Appliance Expert
              </h2>
              <p style={{ fontFamily: 'var(--font-poppins)', fontSize: '16px', fontWeight: 400, lineHeight: '28px', color: '#ffffff', marginBottom: '16px' }}>
                Jesse is the owner and lead service technician at {biz.shortName}, bringing more than a decade of hands-on experience to every kitchen and laundry room he steps into. He built {biz.shortName} on a simple idea: treat every home like it&apos;s your own and every customer like a neighbor.
              </p>
              <p style={{ fontFamily: 'var(--font-poppins)', fontSize: '16px', fontWeight: 400, lineHeight: '28px', color: '#ffffff', marginBottom: '24px' }}>
                He&apos;s known for his calm, friendly approach, clear explanations, and honest recommendations — whether that means a quick repair or letting you know when it&apos;s smarter to replace.
              </p>
              <Link
                href="/about-us"
                style={{ display: 'inline-block', backgroundColor: '#1565C0', color: '#ffffff', padding: '12px 28px', borderRadius: '6px', fontWeight: 700, fontSize: '16px', textTransform: 'uppercase', textDecoration: 'none', fontFamily: 'var(--font-figtree)' }}
              >
                Learn More About Us
              </Link>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Image
                src="/images/about-team.gif"
                alt="Jesse and his family - Blue Jay Appliance Services"
                width={600}
                height={500}
                unoptimized
                style={{ width: '100%', maxWidth: '500px', height: 'auto', borderRadius: '12px', boxShadow: '0 8px 32px rgba(0,0,0,0.3)' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ===== LOGO / WARRANTY SECTION ===== */}
      <section style={{ backgroundColor: '#0D47A1', color: '#ffffff', padding: '80px 0' }}>
        <div className="container" style={{ maxWidth: '1400px' }}>
          <div className="grid-2col" style={{ gap: '48px', alignItems: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Image
                src="/images/logo.webp"
                alt={biz.name}
                width={640}
                height={253}
                style={{ width: '100%', maxWidth: '400px', height: 'auto' }}
              />
            </div>
            <div>
              <h2 className="font-[family-name:var(--font-figtree)] heading-xl" style={{ fontWeight: 700, textTransform: 'uppercase', marginBottom: '24px', color: '#ffffff' }}>
                Quality Workmanship, Guaranteed
              </h2>
              <p style={{ fontFamily: 'var(--font-poppins)', fontSize: '16px', fontWeight: 400, lineHeight: '28px', color: '#ffffff', marginBottom: '32px' }}>
                At {biz.shortName}, we stand behind every repair with a 90-day warranty on parts and labor. Our technicians are trained to follow the highest standards: show up on time, respect your home, fix it right, and stand behind the work. We service nearly all major brand appliances and provide free estimates before any work begins.
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
                <Link
                  href="/contact-us"
                  style={{ display: 'inline-block', backgroundColor: '#ffffff', color: '#0D47A1', padding: '12px 28px', borderRadius: '4px', fontWeight: 700, fontSize: '16px', textDecoration: 'none', fontFamily: 'var(--font-figtree)' }}
                >
                  Get a Free Estimate
                </Link>
                <span style={{ color: '#ffffff', fontSize: '16px' }}>or</span>
                <div>
                  <span style={{ color: '#90CAF9', fontSize: '14px' }}>Need Help? Call Us!</span>
                  <br />
                  <Link href={`tel:${biz.phoneRaw}`} style={{ color: '#ffffff', fontWeight: 700, fontSize: '24px', textDecoration: 'none', fontFamily: 'var(--font-figtree)' }}>
                    {biz.phone}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SERVICE AREA (Map + Locations) ===== */}
      <section style={{ position: 'relative', overflow: 'hidden' }}>
        <div className="grid-2col-map">
          {/* Map side */}
          <div className="map-hide-mobile" style={{ position: 'relative', minHeight: '500px' }}>
            {biz.googleMapsEmbed ? (
              <iframe
                src={biz.googleMapsEmbed}
                width="100%"
                height="100%"
                style={{ border: 0, position: 'absolute', inset: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`${biz.name} Service Area`}
              />
            ) : (
              <div style={{ position: 'absolute', inset: 0, backgroundColor: '#0F1B2D', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9ca3af' }}>
                <p>Service Area Map</p>
              </div>
            )}
          </div>
          {/* Locations side */}
          <div style={{ position: 'relative', color: '#ffffff', padding: '48px' }}>
            <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
              <Image
                src="/images/service-area-overlay.webp"
                alt="Service area background"
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div style={{ position: 'absolute', inset: 0, backgroundColor: '#0F1B2DE6', zIndex: 1 }} />
            <div style={{ position: 'relative', zIndex: 2 }}>
              <h2 className="font-[family-name:var(--font-figtree)] heading-xl" style={{ fontWeight: 700, marginBottom: '8px', color: '#ffffff' }}>Our Service Area</h2>
              <p style={{ fontFamily: 'var(--font-poppins)', fontSize: '14px', color: '#9ca3af', marginBottom: '32px' }}>
                Professional appliance repair across {biz.serviceAreaName}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {locations.map((location) => (
                  <Link
                    key={location.slug}
                    href={`/${location.slug}`}
                    style={{ display: 'flex', alignItems: 'center', gap: '12px', backgroundColor: 'rgba(21,101,192,0.5)', padding: '16px 20px', borderRadius: '8px', textDecoration: 'none', transition: 'background-color 0.3s' }}
                  >
                    <svg width="16" height="16" fill="#64B5F6" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                    <span className="font-[family-name:var(--font-figtree)]" style={{ fontWeight: 600, fontSize: '14px', textTransform: 'uppercase', color: '#ffffff' }}>{location.fullName}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <TestimonialSection />

      {/* ===== CONTACT FORM ===== */}
      <section style={{ backgroundColor: '#0F1B2D', color: '#ffffff', padding: '80px 0' }}>
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12" style={{ alignItems: 'center' }}>
            <div>
              <h2 className="font-[family-name:var(--font-figtree)]" style={{ fontSize: '35px', fontWeight: 800, textTransform: 'uppercase', marginBottom: '24px', lineHeight: '42px', color: '#ffffff' }}>
                Your Trusted Appliance Repair Partner in {biz.address.city}
              </h2>
              <p style={{ fontFamily: 'var(--font-poppins)', fontSize: '16px', lineHeight: '28px', color: '#d1d5db', marginBottom: '16px' }}>
                Looking for a reliable appliance repair service in {biz.address.city}, {biz.address.state}, and the surrounding areas? Look no further than {biz.shortName}. We stand out in the community for our unwavering commitment to excellence, honesty, and integrity in every job we undertake.
              </p>
              <p style={{ fontFamily: 'var(--font-poppins)', fontSize: '16px', lineHeight: '28px', color: '#d1d5db' }}>
                Our team brings a wealth of experience and expertise, ensuring that no appliance issue — big or small — remains unsolved. With {biz.shortName}, you&apos;re choosing a company that values prompt service, transparent pricing, and lasting solutions. We&apos;re not just appliance experts; we&apos;re your neighbors dedicated to keeping your home running smoothly.
              </p>
            </div>
            <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', padding: '32px', color: '#0F1B2D', boxShadow: '0 4px 20px rgba(0,0,0,0.15)' }}>
              <h3 className="font-[family-name:var(--font-figtree)]" style={{ fontSize: '22px', fontWeight: 800, textTransform: 'uppercase', textAlign: 'center', marginBottom: '24px', color: '#0F1B2D' }}>
                Schedule a Repair
              </h3>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA BAND ===== */}
      <CTABand />
    </>
  );
}
