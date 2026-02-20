# Site Template Generator

A Next.js website template that generates complete, SEO-optimized websites from a simple JSON intake form. Supports any service-based industry with dynamic service pages, location pages, and service/location combo pages.

## Quick Start

### 1. Install dependencies

```bash
npm install
```

### 2. Create your intake config

```bash
cp intake-config.example.json intake-config.json
```

Edit `intake-config.json` with your business details:

- **business** — Name, phone, email, address, license, social links, Google Maps embed, brand colors, etc.
- **services** — Array of service names (up to 10). If omitted, defaults are provided per industry.
- **locations** — Array of `{ name, state }` objects (up to 10). If omitted, you'll need to add them manually.
- **testimonials** — Array of `{ name, text, color }` objects.

### 3. Generate the site data

```bash
npm run generate
```

This reads `intake-config.json` and writes:
- `src/data/business.json`
- `src/data/services.json`
- `src/data/locations.json`
- `src/data/service-locations.json`
- `src/data/testimonials.json`

### 4. Add your images

Place these in `public/images/`:

| File | Description |
|------|-------------|
| `logo.webp` | Business logo (used in header, footer, about page) |
| `logo-icon.webp` | Small logo/icon variant (footer pre-band) |
| `hero-bg.webp` | Homepage hero background |
| `hero-overlay.webp` | Overlay background used in multiple sections |
| `about-hero.gif` | About page hero image |
| `about-team.gif` | Team photo for about page |
| `favicon-32x32.png` | Favicon 32x32 |
| `favicon-16x16.png` | Favicon 16x16 |
| `apple-touch-icon.png` | Apple touch icon 180x180 |
| `google-reviews-badge.webp` | Google reviews badge |
| `google-reviews-badge-small.webp` | Small Google reviews badge (topbar) |
| `fb-badge.webp` | Facebook reviews badge |
| `review-stars.webp` | Star rating image |
| `service-area-overlay.webp` | Service area section background |
| `images/services/*.jpg` | Service images (named by slug, e.g. `emergency-service.jpg`) |

### 5. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 6. Deploy to Vercel

```bash
npx vercel --prod
```

Or connect your Git repository to Vercel for automatic deployments.

## What Gets Generated

For a business with 10 services and 10 locations, the template generates:

| Page Type | Count | Example URL |
|-----------|-------|-------------|
| Homepage | 1 | `/` |
| About Us | 1 | `/about-us` |
| Contact Us | 1 | `/contact-us` |
| Service Area | 1 | `/service-area` |
| Services Index | 1 | `/services` |
| Service Pages | 10 | `/services/emergency-service` |
| Location Pages | 10 | `/springfield-il-plumber` |
| Service+Location | 100 | `/springfield-il-plumber/emergency-service` |
| **Total** | **125** | |

All pages include:
- Dynamic meta titles and descriptions
- JSON-LD structured data (Schema.org)
- Automatic sitemap.xml generation
- robots.txt
- FAQ sections with schema markup
- Responsive design (mobile, tablet, desktop)

## Supported Industries

The generator includes default service lists for:
- **Plumbing** — Emergency, residential, commercial, water heaters, etc.
- **HVAC** — AC repair, heating, ductwork, air quality, etc.
- **Electrical** — Panel upgrades, wiring, generators, EV chargers, etc.
- **Roofing** — Roof repair, replacement, shingles, metal, gutters, etc.
- **Landscaping** — Lawn care, design, tree service, irrigation, etc.

For any other industry, provide your own service list in the intake config.

## Project Structure

```
├── intake-config.json          # Your business data (input)
├── intake-config.example.json  # Example intake config
├── scripts/
│   └── generate-site.cjs       # Site generator script
├── src/
│   ├── app/                    # Next.js pages
│   │   ├── page.tsx            # Homepage
│   │   ├── layout.tsx          # Root layout
│   │   ├── sitemap.ts          # Dynamic sitemap
│   │   ├── robots.ts           # robots.txt
│   │   ├── about-us/
│   │   ├── contact-us/
│   │   ├── services/
│   │   ├── service-area/
│   │   ├── [city]/             # Dynamic location pages
│   │   └── [city]/[service]/   # Dynamic combo pages
│   ├── components/             # Reusable UI components
│   ├── data/                   # Generated JSON data files
│   └── lib/                    # Data layer and utilities
└── public/                     # Static assets and images
```

## Tech Stack

- **Next.js 16** with App Router
- **React 19**
- **TypeScript**
- **Tailwind CSS 4**
- **Vercel** for deployment
