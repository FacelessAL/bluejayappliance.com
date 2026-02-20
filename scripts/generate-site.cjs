/**
 * Site Generator Script
 * 
 * Reads intake-config.json and populates the src/data/ JSON files
 * to create a fully configured website from the template.
 * 
 * Usage: npm run generate
 * (or: node scripts/generate-site.cjs)
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const DATA_DIR = path.join(ROOT, 'src', 'data');
const INTAKE_PATH = path.join(ROOT, 'intake-config.json');

// ── Helpers ──────────────────────────────────────────────────────────

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function writeJSON(filename, data) {
  const filePath = path.join(DATA_DIR, filename);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf-8');
  console.log(`  ✓ ${filename}`);
}

// ── Main ─────────────────────────────────────────────────────────────

function main() {
  if (!fs.existsSync(INTAKE_PATH)) {
    console.error('ERROR: intake-config.json not found.');
    console.error('Copy intake-config.example.json to intake-config.json and fill in your business details.');
    process.exit(1);
  }

  const intake = JSON.parse(fs.readFileSync(INTAKE_PATH, 'utf-8'));
  const biz = intake.business;

  console.log(`\nGenerating site for: ${biz.name}`);
  console.log(`Industry: ${biz.industryLabel}`);
  console.log(`Location: ${biz.address.city}, ${biz.address.state}`);
  console.log('');

  // ── 1. business.json ───────────────────────────────────────────────
  writeJSON('business.json', biz);

  // ── 2. services.json ───────────────────────────────────────────────
  const serviceNames = intake.services || getDefaultServices(biz.industry);
  const services = serviceNames.map((name) => {
    const slug = slugify(name);
    return {
      slug,
      title: name,
      shortTitle: name,
      image: `/images/services/${slug}.jpg`,
      metaTitle: `${name} {city} | ${biz.name}`,
      metaDescription: `Professional ${name.toLowerCase()} in {city}. Expert service by ${biz.name}. Licensed & insured. Call ${biz.phoneCTA}.`,
      heroHeading: name,
      heroSubheading: `Professional ${name.toLowerCase()} for residential and commercial clients.`,
      contentSections: [
        {
          heading: `Professional ${name} in {city}`,
          body: `${biz.name} provides expert ${name.toLowerCase()} services to homes and businesses across the {cityFull} area. Our licensed professionals deliver fast, reliable service at transparent prices — no hidden fees, ever. Call ${biz.phoneSlogan} to get started.`,
        },
        {
          heading: `Why Choose ${biz.name}`,
          body: `We're a locally-owned company — not a national franchise. Our professionals are fully licensed, insured, and background-checked. We provide upfront pricing before any work begins and stand behind our work with a satisfaction guarantee.`,
        },
      ],
      schemaType: 'Service',
      schemaServiceType: name,
    };
  });
  writeJSON('services.json', services);

  // ── 3. locations.json ──────────────────────────────────────────────
  const locationInputs = intake.locations || getDefaultLocations();
  const locations = locationInputs.map((loc) => {
    const name = loc.name;
    const state = loc.state || biz.address.state;
    const fullName = `${name}, ${state}`;
    const slug = `${slugify(name)}-${state.toLowerCase()}-${slugify(biz.serviceCategory)}`;

    return {
      slug,
      name,
      state,
      fullName,
      geo: loc.geo || { latitude: 0, longitude: 0 },
      description: `${biz.name} proudly serves ${fullName} with comprehensive ${biz.industryLabel.toLowerCase()} services. Residents and businesses can count on fast response times and expert service from our licensed team.`,
      metaTitle: `${biz.serviceCategory} in ${fullName} | 24/7 Service | ${biz.name}`,
      metaDescription: `Licensed ${biz.serviceCategory.toLowerCase()} in ${fullName}. 24/7 emergency service, residential & commercial. Call ${biz.phoneCTA} for fast, reliable service.`,
      localContent: {
        commonIssues: [
          `Common ${biz.industryLabel.toLowerCase()} issue 1 in ${name}`,
          `Common ${biz.industryLabel.toLowerCase()} issue 2 in ${name}`,
          `Common ${biz.industryLabel.toLowerCase()} issue 3 in ${name}`,
          `Common ${biz.industryLabel.toLowerCase()} issue 4 in ${name}`,
          `Common ${biz.industryLabel.toLowerCase()} issue 5 in ${name}`,
        ],
        localInfo: `Information about ${fullName}. Population, landmarks, notable features, and local characteristics.`,
        aboutArea: `${biz.name} understands the unique challenges in the ${name} area. Our team is familiar with local codes and maintains all required licenses. We provide fast response times throughout ${name}.`,
        faqs: [
          {
            question: `How quickly can you get to my ${name} location in an emergency?`,
            answer: `${biz.name} can typically arrive within 20–45 minutes for emergency calls in ${name}. We're available 24/7, including nights, weekends, and holidays.`,
          },
          {
            question: `Are you licensed to work in ${name}?`,
            answer: `Yes — ${biz.name} holds all required licenses and pulls permits for work that requires them, ensuring your job is done to code.`,
          },
          {
            question: `How much do your services cost in ${name}?`,
            answer: `Costs vary depending on the service. We provide free estimates and upfront pricing before any work begins — no hidden fees or surprise charges.`,
          },
        ],
      },
    };
  });
  writeJSON('locations.json', locations);

  // ── 4. service-locations.json ──────────────────────────────────────
  const serviceLocations = {};
  locations.forEach((loc) => {
    serviceLocations[loc.slug] = {};
    services.forEach((svc) => {
      serviceLocations[loc.slug][svc.slug] = {
        published: true,
        localParagraph: `${biz.name} proudly serves ${loc.fullName} with professional ${svc.title.toLowerCase()} services. Our team understands the unique challenges in the ${loc.name} area and is ready to help. Contact us today for fast, reliable service.`,
      };
    });
  });
  writeJSON('service-locations.json', serviceLocations);

  // ── 5. testimonials.json ───────────────────────────────────────────
  const defaultColors = ['#4285F4', '#0F9D58', '#DB4437', '#F4B400'];
  const testimonials = (intake.testimonials || []).map((t, i) => ({
    name: t.name,
    initial: t.name.charAt(0).toUpperCase(),
    color: t.color || defaultColors[i % defaultColors.length],
    timestamp: Math.floor(Date.now() / 1000) - (i * 86400 * 30),
    text: t.text,
  }));
  writeJSON('testimonials.json', testimonials);

  // ── Summary ────────────────────────────────────────────────────────
  console.log('');
  console.log(`Generated:`);
  console.log(`  - ${services.length} services`);
  console.log(`  - ${locations.length} locations`);
  console.log(`  - ${services.length * locations.length} service-location combos`);
  console.log(`  - ${testimonials.length} testimonials`);
  console.log('');
  console.log('Next steps:');
  console.log('  1. Add your logo as public/images/logo.webp');
  console.log('  2. Add service images to public/images/services/');
  console.log('  3. Add hero background as public/images/hero-bg.webp');
  console.log('  4. Run: npm run dev');
  console.log('  5. Deploy: vercel --prod');
  console.log('');
}

// ── Default fallbacks ────────────────────────────────────────────────

function getDefaultServices(industry) {
  const defaults = {
    plumbing: [
      'Emergency Service', 'Residential Plumbing', 'Commercial Plumbing',
      'Water Heaters', 'Tankless Water Heaters', 'Sewer Line Repair & Replacement',
      'Drain Cleaning', 'Water Line Repair & Replacement', 'Sump Pump',
      'Gas Line Repair & Replacement',
    ],
    hvac: [
      'Emergency HVAC Service', 'AC Repair', 'AC Installation',
      'Heating Repair', 'Furnace Installation', 'Heat Pump Service',
      'Ductwork', 'Indoor Air Quality', 'Thermostat Installation',
      'Preventative Maintenance',
    ],
    electrical: [
      'Emergency Electrical Service', 'Residential Electrical', 'Commercial Electrical',
      'Panel Upgrades', 'Wiring & Rewiring', 'Lighting Installation',
      'Generator Installation', 'Surge Protection', 'EV Charger Installation',
      'Electrical Inspections',
    ],
    roofing: [
      'Emergency Roof Repair', 'Residential Roofing', 'Commercial Roofing',
      'Roof Replacement', 'Roof Inspection', 'Shingle Roofing',
      'Metal Roofing', 'Flat Roofing', 'Gutter Installation',
      'Storm Damage Repair',
    ],
    landscaping: [
      'Lawn Maintenance', 'Landscape Design', 'Tree Service',
      'Hardscaping', 'Irrigation Systems', 'Sod Installation',
      'Mulching & Bed Maintenance', 'Snow Removal', 'Outdoor Lighting',
      'Seasonal Cleanup',
    ],
  };

  return defaults[industry] || [
    'Service 1', 'Service 2', 'Service 3', 'Service 4', 'Service 5',
    'Service 6', 'Service 7', 'Service 8', 'Service 9', 'Service 10',
  ];
}

function getDefaultLocations() {
  return [
    { name: 'City 1', state: 'ST' },
    { name: 'City 2', state: 'ST' },
    { name: 'City 3', state: 'ST' },
    { name: 'City 4', state: 'ST' },
    { name: 'City 5', state: 'ST' },
    { name: 'City 6', state: 'ST' },
    { name: 'City 7', state: 'ST' },
    { name: 'City 8', state: 'ST' },
    { name: 'City 9', state: 'ST' },
    { name: 'City 10', state: 'ST' },
  ];
}

main();
