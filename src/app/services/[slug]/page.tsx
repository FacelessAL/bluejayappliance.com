import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
  getAllServices,
  getServiceBySlug,
  getBusiness,
  getAllLocations,
} from '@/lib/data';
import { linkifyBody } from '@/lib/linkifyPhone';
import ServiceSidebar from '@/components/ServiceSidebar';
import TestimonialSection from '@/components/TestimonialSection';
import SchemaMarkup from '@/components/SchemaMarkup';
import Breadcrumbs from '@/components/Breadcrumbs';

const biz = getBusiness();

function getServiceIssues(slug: string): Array<{ issue: string; description: string }> {
  const issues: Record<string, Array<{ issue: string; description: string }>> = {
    'dishwasher-repair': [
      { issue: 'Not Draining', description: 'Water pooling at the bottom after a cycle usually points to a clogged drain hose, faulty drain pump, or blocked air gap. Our technicians identify the exact cause and clear or replace the affected part.' },
      { issue: 'Leaking Water', description: 'Leaks from the door, underneath, or around connections can result from a worn door gasket, cracked hose, or loose fitting. We pinpoint the source and fix it to prevent water damage to your flooring.' },
      { issue: 'Dishes Not Getting Clean', description: 'Poor cleaning performance is often caused by a malfunctioning spray arm, worn wash motor, clogged filter, or faulty detergent dispenser. We restore full cleaning power on the first visit.' },
      { issue: 'Won\'t Start or Complete a Cycle', description: 'If your dishwasher won\'t start, stops mid-cycle, or skips stages, the issue may be the door latch, control board, timer, or thermal fuse. We diagnose and repair all electronic and mechanical start failures.' },
      { issue: 'Unusual Noises', description: 'Grinding, buzzing, or humming sounds during operation can indicate a failing wash motor, damaged impeller, or debris caught in the drain pump. We isolate the noise source and resolve it.' },
      { issue: 'Error Codes', description: 'Modern dishwashers display fault codes to help identify problems. Our technicians are trained on all major brand error code systems and can quickly translate codes into targeted repairs.' },
    ],
    'dryer-repair': [
      { issue: 'Not Heating', description: 'A dryer that tumbles but doesn\'t produce heat is usually caused by a burned-out heating element, faulty thermal fuse, broken gas igniter, or defective thermostat. We carry common replacement parts on our trucks.' },
      { issue: 'Takes Too Long to Dry', description: 'Extended drying times are often the result of a clogged lint filter or exhaust vent, worn drum seals allowing heat to escape, or a failing heating element operating below capacity.' },
      { issue: 'Making Loud Noises', description: 'Banging, squealing, or thumping sounds commonly come from worn drum rollers, a damaged belt, defective idler pulley, or foreign objects caught between the drum and housing.' },
      { issue: 'Won\'t Turn On', description: 'When your dryer is completely unresponsive, the cause is typically a failed start switch, blown thermal fuse, defective door switch, or a power supply issue. We test each component systematically.' },
      { issue: 'Drum Not Spinning', description: 'A dryer that heats but won\'t tumble usually has a broken drive belt, seized drum rollers, or a worn motor coupling. Belt replacement is one of the most common dryer repairs we perform.' },
      { issue: 'Burning Smell', description: 'A burning odor is a serious safety concern often caused by lint buildup inside the cabinet, a slipping belt, or overheating components. We clean, inspect, and repair to eliminate fire risks.' },
    ],
    'washer-repair': [
      { issue: 'Won\'t Drain or Spin', description: 'When water remains in the tub or the spin cycle fails, the culprit is usually a clogged drain pump, faulty lid switch (top-loaders), worn drive coupler, or a failed motor coupling.' },
      { issue: 'Excessive Vibration or Shaking', description: 'Violent shaking during the spin cycle is commonly caused by unbalanced loads, worn shock absorbers or suspension springs, leveling issues, or a damaged tub bearing.' },
      { issue: 'Leaking Water', description: 'Leaks can originate from damaged door boots (front-loaders), cracked tub seals, loose inlet hose connections, or a failing water pump. We trace the leak to its source and fix it.' },
      { issue: 'Won\'t Start', description: 'A completely unresponsive washer may have a failed timer, defective control board, bad lid or door switch, or a power supply problem. Our technicians test each component to find the fault.' },
      { issue: 'Not Filling With Water', description: 'If your washer won\'t fill or fills slowly, common causes include clogged inlet screens, a faulty water inlet valve, low water pressure, or problems with the water level sensor.' },
      { issue: 'Foul Odors', description: 'Musty or mildew smells in front-load washers are usually caused by mold buildup in the door gasket, residue in the tub, or a partially clogged drain. We deep-clean and address the root cause.' },
    ],
    'refrigerator-and-freezer-repair': [
      { issue: 'Not Cooling Properly', description: 'Insufficient cooling can be caused by dirty condenser coils, a malfunctioning compressor, failed evaporator fan, low refrigerant, or a defective thermostat. We diagnose the exact issue and restore proper temperature.' },
      { issue: 'Freezer Not Freezing', description: 'When the freezer can\'t maintain temperature, common causes include a defrost system failure, sealed system leak, faulty evaporator fan, or a stuck defrost timer preventing proper cycling.' },
      { issue: 'Water Leaking', description: 'Interior puddles or water on the floor often result from a clogged defrost drain, cracked drain pan, leaking water supply line, or a failed inlet valve for the ice maker.' },
      { issue: 'Ice Maker Not Working', description: 'Ice maker failures are commonly caused by a frozen water line, faulty inlet valve, defective ice maker module, or temperature issues in the freezer. We repair or replace the affected components.' },
      { issue: 'Strange Noises', description: 'Buzzing, clicking, or rattling sounds may indicate a failing compressor, loose condenser fan, defective evaporator fan motor, or expansion/contraction of internal components.' },
      { issue: 'Frost Buildup', description: 'Excessive frost on the back wall or around the freezer is usually a defrost system problem — the heater, thermostat, or timer may have failed, preventing the automatic defrost cycle.' },
    ],
    'stove-and-oven-repair': [
      { issue: 'Oven Not Heating', description: 'An oven that won\'t reach temperature typically has a burned-out bake or broil element (electric), a faulty gas igniter (gas), a defective oven sensor, or a malfunctioning control board.' },
      { issue: 'Burners Not Igniting', description: 'Gas burners that click but won\'t light or produce a weak flame usually need igniter replacement, gas valve repair, or cleaning of clogged burner ports. We also check gas line connections.' },
      { issue: 'Uneven Heating', description: 'Hot spots or inconsistent baking results often point to a failing oven sensor, malfunctioning convection fan, worn door gasket allowing heat escape, or calibration issues.' },
      { issue: 'Door Won\'t Close Properly', description: 'A misaligned or stuck oven door is commonly caused by bent or broken hinges, a worn door gasket, or a faulty door latch mechanism. Proper sealing is essential for consistent cooking.' },
      { issue: 'Self-Clean Issues', description: 'If the self-clean cycle won\'t start or complete, the cause may be a defective door lock mechanism, failed thermal fuse, or control board malfunction. We repair all self-cleaning system components.' },
      { issue: 'Control Panel Problems', description: 'Unresponsive buttons, flickering displays, or erratic oven behavior often indicate a failing control board, loose wiring, or damaged membrane switch. We replace and reprogram as needed.' },
    ],
    'range-repair': [
      { issue: 'Burners Not Working', description: 'Whether gas or electric, non-functioning burners can be caused by faulty igniters, bad infinite switches, damaged coil elements, or wiring issues. We repair both gas and electric range burners.' },
      { issue: 'Temperature Inaccuracy', description: 'If your range oven runs too hot or too cold, the issue is often a failing oven sensor, miscalibrated thermostat, or control board problem. We recalibrate or replace the affected components.' },
      { issue: 'Gas Ignition Problems', description: 'Repeated clicking, delayed ignition, or gas smell without a flame are serious issues requiring immediate attention. We inspect and repair gas igniters, safety valves, and spark modules.' },
      { issue: 'Electrical Control Issues', description: 'Digital display failures, unresponsive touchpads, or intermittent power problems typically point to a failing control board, damaged wiring harness, or defective clock/timer assembly.' },
      { issue: 'Broiler Not Working', description: 'A non-functioning broiler in a gas range usually means a bad broil igniter or gas valve issue. In electric ranges, it\'s typically a burned-out broil element or wiring fault.' },
      { issue: 'Door or Hinge Problems', description: 'Difficult-to-open range doors, doors that don\'t stay closed, or self-clean lock failures are usually caused by broken hinges, worn springs, or a defective door latch mechanism.' },
    ],
    'garbage-disposal-repair-and-installation': [
      { issue: 'Humming But Not Grinding', description: 'A disposal that hums without grinding is usually jammed. An object may be stuck between the impellers and the shredder ring, or the motor capacitor may have failed. We safely clear jams and restore operation.' },
      { issue: 'Complete Unit Failure', description: 'When the disposal is completely silent, the issue is often a tripped reset button, blown circuit breaker, failed wall switch, or a burned-out motor that needs replacement.' },
      { issue: 'Leaking', description: 'Leaks can occur at the sink flange (top), dishwasher connection (side), or drain pipe (bottom). We identify the exact leak point and re-seal or replace the failing connection.' },
      { issue: 'Loud Grinding Noises', description: 'Metallic or harsh grinding sounds indicate foreign objects inside the unit, worn impellers, or loose mounting hardware causing the unit to vibrate against the sink.' },
      { issue: 'Slow Draining', description: 'Poor drainage through the disposal is usually caused by food buildup in the drain pipe, a partially clogged P-trap, or worn grinding components that can\'t break down food effectively.' },
      { issue: 'New Installation Needed', description: 'Whether you\'re replacing an old unit or installing a disposal for the first time, we handle the complete job — electrical connections, plumbing, mounting hardware, and testing.' },
    ],
  };
  return issues[slug] || [];
}

function getServiceBrands(slug: string): string[] {
  const brands: Record<string, string[]> = {
    'dishwasher-repair': ['Bosch', 'KitchenAid', 'Whirlpool', 'GE', 'Maytag', 'Samsung', 'LG', 'Frigidaire', 'Miele', 'Kenmore', 'Amana', 'Beko'],
    'dryer-repair': ['Whirlpool', 'Maytag', 'Samsung', 'LG', 'GE', 'Kenmore', 'Frigidaire', 'Amana', 'Speed Queen', 'Bosch', 'Electrolux'],
    'washer-repair': ['Whirlpool', 'Maytag', 'Samsung', 'LG', 'GE', 'Kenmore', 'Frigidaire', 'Speed Queen', 'Amana', 'Bosch', 'Electrolux'],
    'refrigerator-and-freezer-repair': ['Whirlpool', 'GE', 'Samsung', 'LG', 'Frigidaire', 'KitchenAid', 'Kenmore', 'Maytag', 'Sub-Zero', 'Viking', 'Thermador', 'Amana'],
    'stove-and-oven-repair': ['GE', 'Whirlpool', 'Samsung', 'LG', 'Frigidaire', 'KitchenAid', 'Maytag', 'Bosch', 'Viking', 'Wolf', 'Thermador', 'Kenmore'],
    'range-repair': ['GE', 'Whirlpool', 'Samsung', 'LG', 'Frigidaire', 'KitchenAid', 'Maytag', 'Bosch', 'Viking', 'Wolf', 'Thermador', 'Kenmore'],
    'garbage-disposal-repair-and-installation': ['InSinkErator', 'Waste King', 'GE', 'KitchenAid', 'Moen', 'Whirlpool', 'Frigidaire', 'Kenmore'],
  };
  return brands[slug] || [];
}

function getServiceProcess(slug: string): Array<{ step: string; detail: string }> {
  const baseProcess = [
    { step: 'Call & Schedule', detail: 'Call us and describe the issue. We\'ll schedule a same or next-day appointment at a time that works for you.' },
    { step: 'Diagnosis', detail: 'Our technician arrives on time, inspects your appliance, and identifies the exact problem. We explain what\'s wrong in plain language.' },
    { step: 'Written Estimate', detail: 'Before any work begins, you receive a clear, written estimate with no hidden fees. You approve the price before we proceed.' },
    { step: 'Expert Repair', detail: 'Our tech completes the repair using quality replacement parts. Most repairs are finished on the first visit.' },
    { step: '90-Day Warranty', detail: 'Every repair is backed by our 90-day warranty on parts and labor. If something isn\'t right, we\'ll make it right.' },
  ];
  return baseProcess;
}

function getServiceFAQs(slug: string): Array<{ question: string; answer: string }> {
  const faqs: Record<string, Array<{ question: string; answer: string }>> = {
    'dishwasher-repair': [
      { question: 'How much does dishwasher repair cost?', answer: 'The cost depends on the specific issue and parts needed. We provide a free, written estimate before any work begins so there are no surprises. Common repairs like replacing a door gasket or drain pump typically cost less than half the price of a new dishwasher.' },
      { question: 'Is it worth repairing an old dishwasher?', answer: 'If your dishwasher is less than 8-10 years old and the repair cost is under half the price of a new unit, repair is generally the smart choice. We\'ll give you an honest recommendation based on the age, condition, and repair cost.' },
      { question: 'What dishwasher brands do you service?', answer: 'We repair all major brands including Bosch, KitchenAid, Whirlpool, GE, Maytag, Samsung, LG, Frigidaire, Miele, Kenmore, and more. Our trucks carry common parts for faster same-day repairs.' },
      { question: 'How long does a dishwasher repair take?', answer: 'Most dishwasher repairs are completed in 1-2 hours on the first visit. If a specialty part needs to be ordered, we\'ll schedule a follow-up as soon as it arrives — typically within 1-3 business days.' },
      { question: 'My dishwasher is leaving a white film on glasses. Can you fix that?', answer: 'Yes. A white film is often caused by hard water deposits, a malfunctioning rinse aid dispenser, or incorrect water temperature. We diagnose the root cause and resolve it so your dishes come out spotless.' },
    ],
    'dryer-repair': [
      { question: 'Why is my dryer not heating?', answer: 'The most common causes are a burned-out heating element (electric dryers), faulty gas igniter (gas dryers), blown thermal fuse, or defective thermostat. Our technicians carry these parts on our trucks for fast same-day repair.' },
      { question: 'How much does dryer repair cost?', answer: 'Repair costs vary depending on the issue. We provide a clear, written estimate before starting work. Most common repairs cost significantly less than buying a new dryer.' },
      { question: 'Do you repair both gas and electric dryers?', answer: 'Yes, we service both gas and electric dryers from all major manufacturers. Our technicians are trained and certified for gas appliance repairs, including igniter and gas valve work.' },
      { question: 'How often should I clean my dryer vent?', answer: 'We recommend professional dryer vent cleaning at least once a year. Clogged vents reduce efficiency, extend drying times, and are a leading cause of house fires. We can inspect your vent during any service call.' },
      { question: 'My dryer is making a loud banging noise. What\'s wrong?', answer: 'Banging or thumping noises are usually caused by worn drum support rollers, a damaged drive belt, or loose baffle/lifters inside the drum. These are straightforward repairs that we handle routinely.' },
    ],
    'washer-repair': [
      { question: 'Why won\'t my washing machine drain?', answer: 'Common causes include a clogged drain pump, kinked drain hose, failed lid switch (top-loaders), or a defective water pump. We diagnose the exact cause and resolve it, usually on the same visit.' },
      { question: 'Is it better to repair or replace a washing machine?', answer: 'If your washer is under 8 years old and the repair is less than 50% of a new unit\'s cost, repair is usually the best value. We give honest recommendations — if replacement makes more sense, we\'ll tell you.' },
      { question: 'Do you repair front-load and top-load washers?', answer: 'Yes, we repair both front-load and top-load washing machines, including high-efficiency (HE) models, stackable units, and compact washers. All major brands serviced.' },
      { question: 'Why does my washer shake violently during the spin cycle?', answer: 'Excessive vibration is typically caused by worn shock absorbers (front-load) or suspension springs (top-load), an unbalanced load, leveling issues, or a damaged tub bearing. We identify and fix the root cause.' },
      { question: 'My front-load washer smells like mildew. Can you fix that?', answer: 'Yes. Mildew odor is usually caused by mold buildup in the door gasket, residual detergent in the outer tub, or a partially clogged drain. We deep-clean affected areas and address the underlying cause to prevent recurrence.' },
    ],
    'refrigerator-and-freezer-repair': [
      { question: 'Why is my refrigerator not cold enough?', answer: 'Insufficient cooling can be caused by dirty condenser coils, a failing compressor, malfunctioning evaporator fan, defective thermostat, or a sealed system refrigerant leak. We diagnose the exact issue and restore proper temperature.' },
      { question: 'How much does refrigerator repair cost?', answer: 'Costs vary based on the issue. Simple fixes like replacing a thermostat or fan motor are very affordable. We provide a detailed written estimate before any work begins — no hidden fees.' },
      { question: 'Do you repair high-end refrigerator brands?', answer: 'Yes, we service all refrigerator brands from standard to luxury models including Sub-Zero, Viking, Thermador, KitchenAid, GE Monogram, and more.' },
      { question: 'My refrigerator is making a loud buzzing noise. Is it serious?', answer: 'A buzzing noise can indicate a failing compressor, loose condenser fan blade, or defective evaporator fan motor. While not always urgent, it\'s best to have it diagnosed promptly before the issue worsens.' },
      { question: 'How long does a refrigerator repair typically take?', answer: 'Most common repairs are completed in 1-2 hours on the first visit. If the compressor or sealed system needs work, it may take longer. We keep you informed throughout the process.' },
    ],
    'stove-and-oven-repair': [
      { question: 'Why won\'t my oven heat up?', answer: 'Common causes include a burned-out bake element (electric), faulty igniter (gas), defective oven sensor, or a malfunctioning control board. We diagnose and repair all oven heating issues.' },
      { question: 'Is it safe to use a gas stove with ignition problems?', answer: 'If you smell gas, stop using the appliance immediately and ventilate the area. For issues like delayed ignition or clicking without lighting, call us for a prompt repair — these are safety concerns that should be addressed quickly.' },
      { question: 'Do you repair glass/ceramic cooktops?', answer: 'Yes, we repair glass and ceramic cooktops including cracked surfaces, faulty burner elements, and touch-control issues. We also service induction cooktops.' },
      { question: 'My oven temperature seems off. Can you fix it?', answer: 'Yes. Temperature inaccuracy is usually caused by a failing oven sensor, miscalibrated thermostat, or worn door gasket allowing heat to escape. We recalibrate or replace components as needed.' },
      { question: 'How much does stove or oven repair cost?', answer: 'Costs depend on the specific issue. Igniter replacements and element swaps are affordable, while control board repairs may cost more. We always provide a written estimate before starting work.' },
    ],
    'range-repair': [
      { question: 'What\'s the difference between a range, stove, and cooktop?', answer: 'A range is a combination unit with both a cooktop and oven. A stove typically refers to the cooktop alone, and a cooktop is built into the countertop. We repair all three types.' },
      { question: 'Do you repair both gas and electric ranges?', answer: 'Yes, we service gas, electric, dual-fuel, and induction ranges from all major manufacturers. Our technicians are certified for gas appliance work.' },
      { question: 'Why does my gas range keep clicking?', answer: 'Continuous clicking after the burner is lit is usually caused by moisture in the igniter, food debris around the burner, or a faulty spark module. We clean, dry, and repair the ignition system.' },
      { question: 'My range oven takes forever to preheat. What\'s wrong?', answer: 'Slow preheating is often caused by a weak bake igniter (gas), failing heating element (electric), worn oven sensor, or heat loss through a damaged door gasket.' },
      { question: 'Can you repair a range with a cracked glass top?', answer: 'We can replace cracked glass cooktops on most range models. We source the correct replacement panel for your specific make and model and install it properly.' },
    ],
    'garbage-disposal-repair-and-installation': [
      { question: 'My garbage disposal is humming but not grinding. What\'s wrong?', answer: 'A humming disposal is usually jammed. An object may be stuck between the impellers and grinding ring. In some cases, the motor capacitor has failed. We safely clear jams and restore operation.' },
      { question: 'Is it better to repair or replace a garbage disposal?', answer: 'Disposals under 7 years old with minor issues (jams, slow grinding) are usually worth repairing. For older units, major motor failures, or persistent leaking, replacement is often more cost-effective. We\'ll advise honestly.' },
      { question: 'How long does garbage disposal installation take?', answer: 'A standard replacement installation takes 1-2 hours. New installations (where no disposal existed) may take slightly longer depending on the plumbing and electrical work required.' },
      { question: 'What size garbage disposal do I need?', answer: 'For most households, a 1/2 HP to 3/4 HP disposal is sufficient. Larger families or heavy cooks may benefit from a 1 HP unit. We can recommend the right size based on your usage.' },
      { question: 'Can I put anything down a garbage disposal?', answer: 'Avoid fibrous foods (celery, artichokes), grease/oil, bones, pasta/rice (they expand), and non-food items. We\'ll share care tips during your service visit to help extend your disposal\'s life.' },
    ],
  };
  return faqs[slug] || [];
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const services = getAllServices();
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};

  const title = service.metaTitle.replace('{city}', `${biz.address.city}, ${biz.address.state}`).replace('{businessName}', biz.name).replace('{phoneCTA}', biz.phoneCTA);
  const description = service.metaDescription.replace('{city}', `${biz.address.city}, ${biz.address.state}`).replace('{businessName}', biz.name).replace('{serviceCategory}', biz.serviceCategory).replace('{phoneCTA}', biz.phoneCTA);

  return {
    title,
    description,
    openGraph: { title, description },
    alternates: { canonical: `${biz.url}/services/${slug}` },
  };
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const locations = getAllLocations();
  const allServices = getAllServices();
  const relatedServices = allServices.filter((s) => s.slug !== service.slug);
  const issues = getServiceIssues(service.slug);
  const brands = getServiceBrands(service.slug);
  const process = getServiceProcess(service.slug);
  const faqs = getServiceFAQs(service.slug);

  return (
    <>
      <SchemaMarkup
        type="Service"
        pageName={service.title}
        pageDescription={service.metaDescription.replace('{city}', `${biz.address.city}, ${biz.address.state}`).replace('{businessName}', biz.name).replace('{serviceCategory}', biz.serviceCategory).replace('{phoneCTA}', biz.phoneCTA)}
        pageUrl={`${biz.url}/services/${service.slug}`}
        serviceType={service.schemaServiceType}
        breadcrumbs={[
          { name: 'Home', url: biz.url },
          { name: 'Services', url: `${biz.url}/services` },
          { name: service.title, url: `${biz.url}/services/${service.slug}` },
        ]}
        faqItems={faqs.map((f) => ({ question: f.question, answer: f.answer }))}
      />

      <Breadcrumbs
        items={[
          { label: 'Services', href: '/services' },
          { label: service.title, href: `/services/${service.slug}` },
        ]}
      />

      {/* Hero */}
      <section style={{ position: 'relative', backgroundColor: '#0F1B2D', color: '#ffffff', padding: '60px 0', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <Image
            src={service.image}
            alt={service.title}
            fill
            className="object-cover"
            style={{ opacity: 0.2 }}
            priority
          />
        </div>
        <div className="container" style={{ position: 'relative', textAlign: 'center' }}>
          <h1 className="font-[family-name:var(--font-figtree)] heading-hero" style={{ fontWeight: 800, marginBottom: '16px', textTransform: 'uppercase' }}>
            {service.heroHeading}
          </h1>
          <p style={{ fontSize: '18px', color: '#d1d5db', maxWidth: '700px', margin: '0 auto 32px', fontFamily: 'var(--font-poppins)', lineHeight: '1.7' }}>
            {service.heroSubheading}
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
              {/* Intro Content Sections */}
              {service.contentSections.map((section, index) => (
                <div key={index}>
                  <h2 className="font-[family-name:var(--font-figtree)]" style={{ fontSize: '24px', fontWeight: 800, color: '#0F1B2D', marginBottom: '16px' }}>
                    {section.heading.replace(/\{city\}/g, biz.serviceAreaName).replace(/\{cityFull\}/g, biz.serviceAreaName).replace(/\{businessName\}/g, biz.name)}
                  </h2>
                  <p style={{ color: '#4b5563', lineHeight: '1.7', fontFamily: 'var(--font-poppins)', fontSize: '15px' }}>
                    {linkifyBody(section.body.replace(/\{city\}/g, biz.serviceAreaName).replace(/\{cityFull\}/g, biz.serviceAreaName).replace(/\{businessName\}/g, biz.name).replace(/\{phoneSlogan\}/g, biz.phoneSlogan))}
                  </p>
                </div>
              ))}

              {/* Common Issues */}
              {issues.length > 0 && (
                <div>
                  <h2 className="font-[family-name:var(--font-figtree)]" style={{ fontSize: '24px', fontWeight: 800, color: '#0F1B2D', marginBottom: '8px' }}>
                    Common {service.title} Problems We Fix
                  </h2>
                  <p style={{ color: '#4b5563', lineHeight: '1.7', fontFamily: 'var(--font-poppins)', fontSize: '15px', marginBottom: '20px' }}>
                    Our technicians have years of experience diagnosing and repairing all types of {service.shortTitle.toLowerCase()} issues. Here are the most common problems we see:
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {issues.map((item, i) => (
                      <div key={i} style={{ backgroundColor: '#f8fafc', padding: '20px', borderRadius: '8px', borderLeft: '4px solid #1565C0' }}>
                        <h3 className="font-[family-name:var(--font-figtree)]" style={{ fontSize: '16px', fontWeight: 700, color: '#0F1B2D', marginBottom: '6px' }}>
                          {item.issue}
                        </h3>
                        <p style={{ color: '#4b5563', fontFamily: 'var(--font-poppins)', fontSize: '14px', lineHeight: '1.6', margin: 0 }}>
                          {item.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Our Repair Process */}
              <div>
                <h2 className="font-[family-name:var(--font-figtree)]" style={{ fontSize: '24px', fontWeight: 800, color: '#0F1B2D', marginBottom: '8px' }}>
                  Our {service.title} Process
                </h2>
                <p style={{ color: '#4b5563', lineHeight: '1.7', fontFamily: 'var(--font-poppins)', fontSize: '15px', marginBottom: '20px' }}>
                  From the moment you call to the completion of your repair, we make the process as simple and stress-free as possible.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {process.map((item, i) => (
                    <div key={i} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                      <div className="font-[family-name:var(--font-figtree)]" style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#1565C0', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '16px', flexShrink: 0 }}>
                        {i + 1}
                      </div>
                      <div>
                        <h3 className="font-[family-name:var(--font-figtree)]" style={{ fontSize: '16px', fontWeight: 700, color: '#0F1B2D', marginBottom: '4px' }}>
                          {item.step}
                        </h3>
                        <p style={{ color: '#4b5563', fontFamily: 'var(--font-poppins)', fontSize: '14px', lineHeight: '1.6', margin: 0 }}>
                          {item.detail}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Brands We Service */}
              {brands.length > 0 && (
                <div>
                  <h2 className="font-[family-name:var(--font-figtree)]" style={{ fontSize: '24px', fontWeight: 800, color: '#0F1B2D', marginBottom: '8px' }}>
                    Brands We Service
                  </h2>
                  <p style={{ color: '#4b5563', lineHeight: '1.7', fontFamily: 'var(--font-poppins)', fontSize: '15px', marginBottom: '20px' }}>
                    Our technicians are trained and equipped to repair {service.shortTitle.toLowerCase()} issues on virtually every brand. Here are some of the manufacturers we work with most frequently:
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                    {brands.map((brand, i) => (
                      <span key={i} style={{ backgroundColor: '#f0f7ff', color: '#1e40af', padding: '8px 16px', borderRadius: '6px', fontSize: '14px', fontWeight: 600, fontFamily: 'var(--font-figtree)', border: '1px solid #bfdbfe' }}>
                        {brand}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Service Area Links */}
              <div>
                <h2 className="font-[family-name:var(--font-figtree)]" style={{ fontSize: '24px', fontWeight: 800, color: '#0F1B2D', marginBottom: '8px' }}>
                  {service.title} Near You
                </h2>
                <p style={{ color: '#4b5563', lineHeight: '1.7', fontFamily: 'var(--font-poppins)', fontSize: '15px', marginBottom: '20px' }}>
                  We provide professional {service.shortTitle.toLowerCase()} services throughout {biz.serviceAreaName}. Find {service.shortTitle.toLowerCase()} in your area:
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '10px' }}>
                  {locations.map((loc) => (
                    <Link
                      key={loc.slug}
                      href={`/${loc.slug}/${service.slug}`}
                      style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 14px', backgroundColor: '#f8fafc', borderRadius: '6px', textDecoration: 'none', border: '1px solid #e2e8f0', fontSize: '14px', fontFamily: 'var(--font-poppins)', color: '#0F1B2D', fontWeight: 500 }}
                      className="hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-colors"
                    >
                      <svg width="14" height="14" fill="#1565C0" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                      </svg>
                      {service.shortTitle} in {loc.name}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Related Services */}
              <div>
                <h2 className="font-[family-name:var(--font-figtree)]" style={{ fontSize: '24px', fontWeight: 800, color: '#0F1B2D', marginBottom: '8px' }}>
                  Other Appliance Repair Services
                </h2>
                <p style={{ color: '#4b5563', lineHeight: '1.7', fontFamily: 'var(--font-poppins)', fontSize: '15px', marginBottom: '20px' }}>
                  Beyond {service.title.toLowerCase()}, {biz.shortName} provides comprehensive appliance repair for all major household appliances.
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '12px' }}>
                  {relatedServices.map((s) => (
                    <Link
                      key={s.slug}
                      href={`/services/${s.slug}`}
                      style={{ display: 'block', padding: '14px', backgroundColor: '#f8fafc', borderRadius: '6px', textDecoration: 'none', color: '#0F1B2D', fontSize: '14px', fontFamily: 'var(--font-poppins)', fontWeight: 600, border: '1px solid #e2e8f0' }}
                      className="hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-colors"
                    >
                      {s.title}
                    </Link>
                  ))}
                </div>
              </div>

              {/* FAQ Section */}
              {faqs.length > 0 && (
                <div>
                  <h2 className="font-[family-name:var(--font-figtree)]" style={{ fontSize: '24px', fontWeight: 800, color: '#0F1B2D', marginBottom: '16px' }}>
                    {service.title} FAQ
                  </h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {faqs.map((faq, i) => (
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
              )}
            </div>

            {/* Sidebar */}
            <div>
              {/* Contact CTA */}
              <div style={{ backgroundColor: '#1565C0', borderRadius: '12px', padding: '28px', color: '#ffffff', textAlign: 'center', marginBottom: '24px' }}>
                <h3 className="font-[family-name:var(--font-figtree)]" style={{ fontWeight: 700, fontSize: '18px', marginBottom: '8px' }}>Need a Repair?</h3>
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

              <ServiceSidebar currentServiceSlug={service.slug} currentServiceTitle={service.title} />
            </div>
          </div>
        </div>
      </section>

      <TestimonialSection />
    </>
  );
}
