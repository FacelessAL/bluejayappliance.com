const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public', 'images');
const servicesDir = path.join(publicDir, 'services');

if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });
if (!fs.existsSync(servicesDir)) fs.mkdirSync(servicesDir, { recursive: true });

function createPlaceholderSVG(width, height, text, bgColor) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <rect width="${width}" height="${height}" fill="${bgColor}"/>
  <text x="50%" y="50%" font-family="Arial,sans-serif" font-size="18" fill="white" text-anchor="middle" dominant-baseline="middle">${text}</text>
</svg>`;
}

const generalImages = [
  { name: 'NormanLogo.webp', w: 200, h: 60, text: 'LOGO' },
  { name: 'hero-bg.webp', w: 1200, h: 600, text: 'Hero BG' },
  { name: 'Norman-Mech-Van.webp', w: 600, h: 236, text: 'Van' },
  { name: 'van-animation.gif', w: 600, h: 400, text: 'Van Animation' },
  { name: 'about-hero.gif', w: 1200, h: 600, text: 'About Hero' },
  { name: 'about-team.gif', w: 600, h: 450, text: 'Team' },
];

const serviceImages = [
  'emergency-service.jpg',
  'residential-plumbing.gif',
  'commercial-plumbing.webp',
  'water-heaters.webp',
  'tankless-water-heaters.webp',
  'sewer-line-repair.webp',
  'drain-cleaning.jpg',
  'water-line-repair.webp',
  'sump-pump.webp',
  'gas-line-repair.webp',
  'new-construction.webp',
  'sewer-camera-inspection.webp',
];

generalImages.forEach(({ name, w, h, text }) => {
  fs.writeFileSync(path.join(publicDir, name), createPlaceholderSVG(w, h, text, '#c41e2f'));
  console.log('Created images/' + name);
});

serviceImages.forEach((name) => {
  const label = name.replace(/\.[^.]+$/, '').replace(/-/g, ' ');
  fs.writeFileSync(path.join(servicesDir, name), createPlaceholderSVG(800, 600, label, '#1a1a1a'));
  console.log('Created images/services/' + name);
});

console.log('Done. Replace with real images later.');
