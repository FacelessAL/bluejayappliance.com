const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public', 'images');
const servicesDir = path.join(publicDir, 'services');

// Ensure directories exist
if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });
if (!fs.existsSync(servicesDir)) fs.mkdirSync(servicesDir, { recursive: true });

function createPlaceholderSVG(width, height, text, bgColor = '#c41e2f') {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <rect width="${width}" height="${height}" fill="${bgColor}"/>
  <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="16" fill="white" text-anchor="middle" dominant-baseline="middle">${text}</text>
</svg>`;
}

// General images
const generalImages = [
  { name: 'BluejayLogo.webp', w: 200, h: 60, text: 'Blue Jay Appliance Logo' },
  { name: 'hero-bg.webp', w: 1200, h: 600, text: 'Hero Background' },
  { name: 'Bluejay-Van.webp', w: 600, h: 236, text: 'Blue Jay Appliance Van' },
  { name: 'van-animation.gif', w: 600, h: 400, text: 'Van Animation' },
  { name: 'about-hero.gif', w: 1200, h: 600, text: 'About Hero' },
  { name: 'about-team.gif', w: 600, h: 450, text: 'Team Photo' },
];

// Service images
const serviceImages = [
  { name: 'emergency-service.jpg', text: 'Emergency Service' },
  { name: 'residential-plumbing.gif', text: 'Residential Plumbing' },
  { name: 'commercial-plumbing.webp', text: 'Commercial Plumbing' },
  { name: 'water-heaters.webp', text: 'Water Heaters' },
  { name: 'tankless-water-heaters.webp', text: 'Tankless Water Heaters' },
  { name: 'sewer-line-repair.webp', text: 'Sewer Line Repair' },
  { name: 'drain-cleaning.jpg', text: 'Drain Cleaning' },
  { name: 'water-line-repair.webp', text: 'Water Line Repair' },
  { name: 'sump-pump.webp', text: 'Sump Pump' },
  { name: 'gas-line-repair.webp', text: 'Gas Line Repair' },
  { name: 'new-construction.webp', text: 'New Construction' },
  { name: 'sewer-camera-inspection.webp', text: 'Sewer Camera Inspection' },
];

// Create general images as SVG (but with their expected extensions)
generalImages.forEach(({ name, w, h, text }) => {
  const svgName = name.replace(/\.(webp|gif|jpg|png)$/, '.svg');
  const svgPath = path.join(publicDir, svgName);
  fs.writeFileSync(svgPath, createPlaceholderSVG(w, h, text));
  console.log(`Created: images/${svgName}`);
});

// Create service images as SVG
serviceImages.forEach(({ name, text }) => {
  const svgName = name.replace(/\.(webp|gif|jpg|png)$/, '.svg');
  const svgPath = path.join(servicesDir, svgName);
  fs.writeFileSync(svgPath, createPlaceholderSVG(800, 600, text, '#1a1a1a'));
  console.log(`Created: images/services/${svgName}`);
});

console.log('\nPlaceholder images created. Replace these with real images from the WordPress site.');
console.log('Image paths in the data files reference the original extensions (.webp, .gif, .jpg).');
console.log('You will need to download real images and save them with matching filenames.');
