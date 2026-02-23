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

// Helper functions for enhanced content
function getServiceSpecificIssues(serviceSlug: string): string[] {
  const issues: Record<string, string[]> = {
    'dishwasher-repair': [
      'Dishwasher not draining properly',
      'Leaking water from door or bottom',
      'Dishes not getting clean',
      'Unusual noises during operation',
      'Dishwasher won\'t start or complete cycle',
      'Error codes on display panel',
    ],
    'dryer-repair': [
      'Dryer not heating or taking too long to dry',
      'Loud banging or squealing noises',
      'Dryer won\'t turn on or stops mid-cycle',
      'Drum not spinning properly',
      'Lint trap or vent blockage issues',
      'Burning smell during operation',
    ],
    'washer-repair': [
      'Washer won\'t drain or spin',
      'Excessive vibration or shaking',
      'Leaking from bottom or door',
      'Won\'t start or stops during cycle',
      'Error codes or flashing lights',
      'Unusual noises during wash or spin',
    ],
    'refrigerator-and-freezer-repair': [
      'Refrigerator not cooling properly',
      'Freezer frosting up or not freezing',
      'Water leaking inside or on floor',
      'Ice maker not working or making strange noises',
      'Loud buzzing or clicking sounds',
      'Temperature fluctuation issues',
    ],
    'stove-and-oven-repair': [
      'Oven not heating to correct temperature',
      'Burners not igniting or heating unevenly',
      'Oven door not closing properly',
      'Gas smell or carbon monoxide concerns',
      'Self-cleaning function not working',
      'Digital controls or display issues',
    ],
    'range-repair': [
      'Range burners not working properly',
      'Oven temperature inaccurate',
      'Gas ignition problems',
      'Electrical control panel issues',
      'Broiler not functioning',
      'Timer or clock not working',
    ],
    'garbage-disposal-repair-and-installation': [
      'Disposal humming but not grinding',
      'Complete unit failure or jammed',
      'Leaking from disposal unit',
      'Loud metallic grinding noises',
      'Reset button keeps tripping',
      'Need new installation or replacement',
    ],
  };
  return issues[serviceSlug] || ['General performance issues', 'Mechanical failures', 'Electrical problems', 'Wear and tear concerns'];
}

function getRelatedServices(currentServiceSlug: string): Array<{slug: string, title: string}> {
  const allServices = getAllServices();
  return allServices
    .filter(s => s.slug !== currentServiceSlug)
    .slice(0, 6); // Show up to 6 related services
}

function getServiceFAQs(serviceSlug: string, locationName: string): Array<{question: string, answer: string}> {
  const baseFAQs: Record<string, Array<{question: string, answer: string}>> = {
    'dishwasher-repair': [
      {
        question: `How quickly can you repair my dishwasher in ${locationName}?`,
        answer: `We offer same or next-day service throughout ${locationName}. Most dishwasher repairs can be completed on the first visit, as our trucks are stocked with common parts for major brands.`,
      },
      {
        question: 'What brands of dishwashers do you repair?',
        answer: 'We repair all major dishwasher brands including Bosch, KitchenAid, Whirlpool, GE, Maytag, Samsung, LG, and more. Our technicians are certified to work on both standard and high-end models.',
      },
      {
        question: 'Is it worth repairing an older dishwasher?',
        answer: 'Generally, if your dishwasher is less than 8-10 years old and the repair cost is less than half the price of a new unit, repair is worth it. We provide honest assessments to help you make the best decision.',
      },
    ],
    'dryer-repair': [
      {
        question: `Why is my dryer taking so long to dry clothes in ${locationName}?`,
        answer: `Common causes include lint buildup in the vent system, a faulty heating element, or a broken thermostat. Our ${locationName} technicians can diagnose and fix these issues quickly, often on the same day.`,
      },
      {
        question: 'Do you repair both gas and electric dryers?',
        answer: 'Yes, we service both gas and electric dryers from all major manufacturers. Our technicians are properly trained and certified for gas appliance repairs.',
      },
      {
        question: 'How often should dryer vents be cleaned?',
        answer: 'We recommend cleaning dryer vents at least once a year, or more frequently if you do multiple loads daily. Clogged vents are a fire hazard and reduce efficiency.',
      },
    ],
    'washer-repair': [
      {
        question: `What causes washing machines to leak in ${locationName} homes?`,
        answer: 'Common causes include damaged door seals, loose hose connections, or faulty water pumps. Our technicians in the area see these issues regularly and can typically fix them on the first visit.',
      },
      {
        question: 'Is it better to repair or replace a washing machine?',
        answer: 'If your washer is under 8 years old and the repair is less than 50% of a new unit\'s cost, repair is usually economical. We provide transparent pricing to help you decide.',
      },
      {
        question: 'Do you work on front-load and top-load washers?',
        answer: 'Yes, we repair both front-load and top-load washing machines, including high-efficiency (HE) models and stackable units.',
      },
    ],
    'refrigerator-and-freezer-repair': [
      {
        question: `Why is my refrigerator not cooling properly in ${locationName}?`,
        answer: 'This could be due to a faulty compressor, dirty condenser coils, malfunctioning thermostat, or sealed system leak. Our technicians can diagnose the issue and often repair it the same day.',
      },
      {
        question: 'How long does a refrigerator repair typically take?',
        answer: 'Most common refrigerator repairs can be completed in 1-2 hours. If we need to order special parts, we\'ll schedule a follow-up visit as soon as the part arrives.',
      },
      {
        question: 'Do you repair high-end refrigerator brands?',
        answer: 'Yes, we service all refrigerator brands from basic to luxury models including Sub-Zero, Viking, Thermador, KitchenAid, and more.',
      },
    ],
    'stove-and-oven-repair': [
      {
        question: `Is it safe to use a gas stove that\'s having problems?`,
        answer: 'If you smell gas or suspect a carbon monoxide issue, stop using the appliance immediately and call us. For other issues like uneven heating or ignition problems, we can typically repair them safely.',
      },
      {
        question: `How quickly can you fix my oven in ${locationName}?`,
        answer: 'We offer same-day service for oven repairs throughout the area. Common issues like faulty heating elements or temperature sensors can often be fixed on the first visit.',
      },
      {
        question: 'Do you repair glass cooktops?',
        answer: 'Yes, we repair glass/ceramic cooktops including cracked surfaces, faulty burners, and control issues. We also handle gas cooktop repairs.',
      },
    ],
    'range-repair': [
      {
        question: 'What\'s the difference between a stove and a range?',
        answer: 'A range combines a cooktop and oven in one unit, while a stove typically refers to just the cooktop. We repair both standalone cooktops and complete range units.',
      },
      {
        question: `Do you offer emergency range repair in ${locationName}?`,
        answer: 'Yes, we provide emergency repair services for ranges throughout the area. Call us and we\'ll prioritize your service call, especially for gas range issues.',
      },
      {
        question: 'How do I know if my range\'s control board is bad?',
        answer: 'Signs include the display not working, buttons not responding, or the unit not heating properly. Our technicians can test and replace control boards.',
      },
    ],
    'garbage-disposal-repair-and-installation': [
      {
        question: `Can you repair any brand of garbage disposal in ${locationName}?`,
        answer: 'We repair all major disposal brands including Insinkerator, Waste King, GE, KitchenAid, and more. If your unit is beyond repair, we also handle full replacements.',
      },
      {
        question: 'Is it better to repair or replace a garbage disposal?',
        answer: 'If your disposal is under 7 years old and the repair cost is less than $150-200, repair is usually worthwhile. For older units or major failures, replacement might be more cost-effective.',
      },
      {
        question: 'How long does garbage disposal installation take?',
        answer: 'Typical installation takes 1-2 hours. We handle all plumbing and electrical connections, and we\'ll clean up the work area before leaving.',
      },
    ],
  };
  
  return baseFAQs[serviceSlug] || [
    {
      question: `How quickly can you provide service in ${locationName}?`,
      answer: `We offer same or next-day service throughout ${locationName} and the surrounding area. Call us to schedule an appointment at your convenience.`,
    },
    {
      question: 'Are your technicians licensed and insured?',
      answer: 'Yes, all our technicians are fully licensed, insured, and background-checked. We also provide a 90-day warranty on all parts and labor.',
    },
    {
      question: 'Do you provide free estimates?',
      answer: 'Yes, we provide free, no-obligation estimates before any work begins. Our pricing is transparent with no hidden fees.',
    },
  ];
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
            {service.heroSubheading} Serving {location.fullName} and surrounding areas.
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
            {/* Main Content */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
              {service.contentSections.map((section, index) => (
                <div key={index}>
                  <h2 className="font-[family-name:var(--font-figtree)]" style={{ fontSize: '24px', fontWeight: 800, color: '#0F1B2D', marginBottom: '16px' }}>
                    {section.heading.replace(/\{city\}/g, location.name).replace(/\{cityFull\}/g, location.fullName)}
                  </h2>
                  <p style={{ color: '#4b5563', lineHeight: '1.7', fontFamily: 'var(--font-poppins)', fontSize: '15px' }}>{linkifyBody(section.body.replace(/\{city\}/g, location.name).replace(/\{cityFull\}/g, location.fullName))}</p>
                </div>
              ))}

              {/* Location-specific content */}
              {(() => {
                const slContent = getServiceLocationContent(location.slug, service.slug);
                return (
                  <div>
                    <h2 className="font-[family-name:var(--font-figtree)]" style={{ fontSize: '24px', fontWeight: 800, color: '#0F1B2D', marginBottom: '16px' }}>
                      Expert {service.title} Services in {location.fullName}
                    </h2>
                    <p style={{ color: '#4b5563', lineHeight: '1.7', fontFamily: 'var(--font-poppins)', fontSize: '15px', marginBottom: '20px' }}>
                      {slContent?.localParagraph || `${biz.shortName} is proud to offer professional ${service.title.toLowerCase()} services to homeowners and businesses in ${location.fullName}. Our team of licensed, insured professionals understands the unique challenges that ${location.name} properties face, from older homes in historic districts to modern appliances in new developments. We bring years of local experience to every job, ensuring we understand the specific needs of ${location.name} residents.`}
                    </p>

                    {/* Local insights about appliance + city factors */}
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

                    {/* Neighborhoods covered */}
                    {slContent?.neighborhoodsCovered && slContent.neighborhoodsCovered.length > 0 && (
                      <div style={{ marginBottom: '20px' }}>
                        <h3 className="font-[family-name:var(--font-figtree)]" style={{ fontSize: '18px', fontWeight: 700, color: '#0F1B2D', marginBottom: '12px' }}>
                          {location.name} Neighborhoods We Serve
                        </h3>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                          {slContent.neighborhoodsCovered.map((hood, i) => (
                            <span key={i} style={{ backgroundColor: '#f0f7ff', color: '#1e40af', padding: '6px 14px', borderRadius: '20px', fontSize: '13px', fontWeight: 500, fontFamily: 'var(--font-poppins)', border: '1px solid #bfdbfe' }}>
                              {hood}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Fallback neighborhood section if no specific neighborhoods */}
                    {(!slContent?.neighborhoodsCovered || slContent.neighborhoodsCovered.length === 0) && (
                      <div style={{ backgroundColor: '#f8fafc', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
                        <h3 className="font-[family-name:var(--font-figtree)]" style={{ fontSize: '18px', fontWeight: 700, color: '#0F1B2D', marginBottom: '12px' }}>
                          Serving All {location.fullName} Neighborhoods
                        </h3>
                        <p style={{ color: '#4b5563', lineHeight: '1.7', fontFamily: 'var(--font-poppins)', fontSize: '15px', margin: 0 }}>
                          From downtown {location.name} to the surrounding communities, our technicians provide prompt, reliable service throughout the entire area. We&apos;re familiar with local housing stock, common appliance issues in the region, and the specific needs of {location.name} homeowners.
                        </p>
                      </div>
                    )}

                    {/* Common issues specific to service type */}
                    <div>
                      <h3 className="font-[family-name:var(--font-figtree)]" style={{ fontSize: '18px', fontWeight: 700, color: '#0F1B2D', marginBottom: '12px' }}>
                        Common {service.shortTitle} Issues We Fix in {location.name}
                      </h3>
                      <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 20px 0', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px' }}>
                        {getServiceSpecificIssues(service.slug).map((issue, i) => (
                          <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                            <span style={{ color: '#1565C0', fontSize: '16px', marginTop: '2px' }}>•</span>
                            <span style={{ color: '#4b5563', fontFamily: 'var(--font-poppins)', fontSize: '15px', lineHeight: '1.5' }}>{issue}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })()}

              {/* Why Choose Us for this location */}
              <div>
                <h2 className="font-[family-name:var(--font-figtree)]" style={{ fontSize: '24px', fontWeight: 800, color: '#0F1B2D', marginBottom: '16px' }}>
                  Why {location.name} Homeowners Trust {biz.shortName}
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '20px' }}>
                  <div>
                    <h3 className="font-[family-name:var(--font-figtree)]" style={{ fontSize: '16px', fontWeight: 700, color: '#1565C0', marginBottom: '8px' }}>
                      Local Experts
                    </h3>
                    <p style={{ color: '#4b5563', fontFamily: 'var(--font-poppins)', fontSize: '15px', lineHeight: '1.5', margin: 0 }}>
                      Our technicians live and work in the {location.name} area. We understand local housing, appliance brands common in the region, and the unique challenges of {location.fullName}'s climate and water conditions.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-[family-name:var(--font-figtree)]" style={{ fontSize: '16px', fontWeight: 700, color: '#1565C0', marginBottom: '8px' }}>
                      Prompt Service
                    </h3>
                    <p style={{ color: '#4b5563', fontFamily: 'var(--font-poppins)', fontSize: '15px', lineHeight: '1.5', margin: 0 }}>
                      Same or next-day service throughout {location.fullName}. Our local presence means we can respond quickly to emergency calls and minimize your downtime.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-[family-name:var(--font-figtree)]" style={{ fontSize: '16px', fontWeight: 700, color: '#1565C0', marginBottom: '8px' }}>
                      Transparent Pricing
                    </h3>
                    <p style={{ color: '#4b5563', fontFamily: 'var(--font-poppins)', fontSize: '15px', lineHeight: '1.5', margin: 0 }}>
                      No hidden fees or surprise charges. We provide detailed, written estimates before any work begins and explain all costs upfront.
                    </p>
                  </div>
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {[
                    '90-day warranty on all parts and labor',
                    'Licensed, insured, and background-checked technicians',
                    `Serving all of ${location.fullName} and surrounding communities`,
                    'Emergency service available',
                    'Fully stocked trucks for most repairs on first visit',
                  ].map((item, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                      <span style={{ color: '#1565C0', fontWeight: 700, fontSize: '18px', lineHeight: '1.4' }}>✓</span>
                      <span style={{ color: '#4b5563', fontFamily: 'var(--font-poppins)', fontSize: '15px', lineHeight: '1.6' }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Service Area Coverage */}
              <div>
                <h2 className="font-[family-name:var(--font-figtree)]" style={{ fontSize: '24px', fontWeight: 800, color: '#0F1B2D', marginBottom: '16px' }}>
                  Our {location.fullName} Service Area
                </h2>
                <p style={{ color: '#4b5563', lineHeight: '1.7', fontFamily: 'var(--font-poppins)', fontSize: '15px', marginBottom: '20px' }}>
                  {biz.shortName} provides comprehensive {service.title.toLowerCase()} services throughout {location.fullName} and nearby communities. Whether you're in the heart of {location.name} or in the surrounding suburbs, our team is ready to help.
                </p>
                <div style={{ backgroundColor: '#f0f7ff', padding: '20px', borderRadius: '8px', border: '1px solid #bfdbfe' }}>
                  <p style={{ color: '#1e40af', fontFamily: 'var(--font-poppins)', fontSize: '15px', lineHeight: '1.6', margin: 0, fontWeight: 500 }}>
                    <strong>Service Radius:</strong> We typically serve within a 30-mile radius of {location.name}, ensuring prompt response times for all your {service.shortTitle.toLowerCase()} needs.
                  </p>
                </div>
              </div>

              {/* Related Services */}
              <div>
                <h2 className="font-[family-name:var(--font-figtree)]" style={{ fontSize: '24px', fontWeight: 800, color: '#0F1B2D', marginBottom: '16px' }}>
                  Other Services We Offer in {location.name}
                </h2>
                <p style={{ color: '#4b5563', lineHeight: '1.7', fontFamily: 'var(--font-poppins)', fontSize: '15px', marginBottom: '20px' }}>
                  Beyond {service.title.toLowerCase()}, {biz.shortName} provides comprehensive appliance repair services throughout {location.fullName}. Our technicians are trained to handle all major household appliances.
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
                  {getRelatedServices(service.slug).map((relatedService, i) => (
                    <Link
                      key={i}
                      href={`/${location.slug}/${relatedService.slug}`}
                      style={{ display: 'block', padding: '12px', backgroundColor: '#f8fafc', borderRadius: '6px', textDecoration: 'none', color: '#0F1B2D', fontSize: '14px', fontFamily: 'var(--font-poppins)', fontWeight: 500, transition: 'all 0.2s', border: '1px solid #e2e8f0' }}
                      className="hover:bg-blue-600 hover:text-white hover:border-blue-600"
                    >
                      {relatedService.title}
                    </Link>
                  ))}
                </div>
              </div>

              {/* FAQ Section */}
              <div>
                <h2 className="font-[family-name:var(--font-figtree)]" style={{ fontSize: '24px', fontWeight: 800, color: '#0F1B2D', marginBottom: '16px' }}>
                  Frequently Asked Questions - {service.title} in {location.name}
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {getServiceFAQs(service.slug, location.name).map((faq, i) => (
                    <div key={i} style={{ backgroundColor: '#f8fafc', padding: '20px', borderRadius: '8px' }}>
                      <h3 className="font-[family-name:var(--font-figtree)]" style={{ fontSize: '16px', fontWeight: 700, color: '#0F1B2D', marginBottom: '8px' }}>
                        {faq.question}
                      </h3>
                      <p style={{ color: '#4b5563', fontFamily: 'var(--font-poppins)', fontSize: '15px', lineHeight: '1.6', margin: 0 }}>
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

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
