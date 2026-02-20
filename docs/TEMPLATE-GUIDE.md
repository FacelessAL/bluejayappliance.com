# Service Business Website Template Guide

**Purpose:** This document explains how to clone this project, strip all business-specific information, and create a new website for a different service business. This is a reusable template guide — it is NOT specific to Blue Jay Appliance.

---

## Architecture Overview

This template is built on:
- **Next.js 16** (App Router) with static site generation (SSG)
- **Tailwind CSS v4** for utility classes
- **TypeScript** for type safety
- **JSON-driven content** — all business data, services, locations, testimonials live in `src/data/`
- **Vercel** for hosting (can be swapped)

### Key Design Patterns
- **Data-driven pages**: No hardcoded business content in components/pages
- **Published flag system**: Controls which service/location combo pages are live
- **Dynamic sitemap**: Auto-generated from data files
- **Schema markup**: Structured data for SEO, driven by JSON
- **Responsive mobile-first**: Sticky call bar, dynamic header spacing

---

## Step 1: Clone the Repository

```bash
git clone <repo-url> new-business-website
cd new-business-website
npm install
```

---

## Step 2: Replace Business Data

### `src/data/business.json`
Replace ALL fields with the new business info:

```json
{
  "name": "Your Business Name",
  "shortName": "Your Business",
  "phone": "(555) 123-4567",
  "phoneRaw": "5551234567",
  "phoneSlogan": "555-123-4567",
  "email": "info@yourbusiness.com",
  "address": {
    "street": "123 Main St",
    "city": "Your City",
    "state": "ST",
    "zip": "12345",
    "full": "123 Main St, Your City, ST 12345"
  },
  "license": "YOUR_LICENSE_NUMBER",
  "domain": "yourbusiness.com",
  "url": "https://yourbusiness.com",
  "googlePlaceId": "YOUR_GOOGLE_PLACE_ID",
  "googleReviewUrl": "https://search.google.com/local/writereview?placeid=YOUR_PLACE_ID",
  "googleMapsUrl": "https://www.google.com/maps/place/YOUR_BUSINESS",
  "rating": 5.0,
  "reviewCount": 0,
  "social": {
    "facebook": "https://www.facebook.com/yourbusiness",
    "linkedin": "https://www.linkedin.com/company/yourbusiness"
  },
  "geo": {
    "latitude": 0.0,
    "longitude": 0.0
  },
  "openingHours": "Mo-Su 00:00-23:59",
  "description": "Your business description for SEO.",
  "tagline": "Your tagline here!"
}
```

### `src/data/services.json`
Replace with the new business's services. Each service needs:
- `slug` — URL-friendly identifier
- `title` — full display title
- `shortTitle` — abbreviated title for buttons
- `image` — path to service image in `/public/images/`
- `heroSubheading` — short description for cards
- `metaTitle` / `metaDescription` — SEO meta tags
- `contentSections` — page body content

### `src/data/locations.json`
Replace with the new business's service area locations. Each location needs:
- `slug` — URL path (e.g., `your-city-st-plumber`)
- `name`, `state`, `fullName`
- `geo` — latitude/longitude
- `description`, `metaTitle`, `metaDescription`
- `localContent` — common issues, local info, FAQs

### `src/data/service-locations.json`
Create entries for each location × service combination:
- Set `published: false` for all initially
- Add a `localParagraph` with location-specific content
- Publish selectively as content is ready

### `src/data/testimonials.json`
Replace with the new business's actual customer reviews:
```json
[
  {
    "name": "Customer Name",
    "initial": "C",
    "color": "#4285F4",
    "timestamp": 1700000000,
    "text": "Review text here."
  }
]
```

---

## Step 3: Replace Images

All images are in `/public/images/`. Replace:

| File | Purpose |
|---|---|
| `BluejayLogo.webp` | Business logo (used in header, footer, about page) |
| `hero-*.webp` | Homepage hero backgrounds |
| `personal-touch-bg.webp` | Homepage section background |
| `about-*.webp` | About page images |
| `google-reviews-badge.webp` | Google Reviews badge image |
| `fb-badge.webp` | Facebook Reviews badge image |
| Service images | One per service, referenced in `services.json` |

### Favicon
Replace files in the project root `favicon/` directory and run:
```bash
# Copy favicons to the right locations
cp favicon/* public/
cp favicon/favicon.ico src/app/favicon.ico
```

Update `public/site.webmanifest` with the new business name.

---

## Step 4: Update Color Palette

Colors are defined in `src/app/globals.css` under the `@theme` block:

```css
@theme {
  --color-bj-dark: #0F1B2D;    /* Primary dark / navy */
  --color-bj-blue: #1565C0;    /* Primary blue */
  --color-bj-sky: #64B5F6;     /* Sky blue accent */
  --color-bj-light: #E3F2FD;   /* Light blue background */
}
```

Also search for hardcoded hex values in components (inline styles) and update:
- `#0F1B2D` — primary dark
- `#1565C0` — primary blue
- `#64B5F6` — sky blue accent
- `#E3F2FD` — light blue background

---

## Step 5: Update Schema Markup

The `SchemaMarkup.tsx` component auto-generates structured data from `business.json`. However, review these:

1. **`@type`** — Currently set to `Plumber`. Change to match the business type (e.g., `Electrician`, `HVACBusiness`, `RoofingContractor`).
2. **Sample reviews** in the schema (lines ~125-140) — replace with actual reviews.
3. **Payment types** — update `paymentAccepted` if different.

---

## Step 6: Update Legal Pages

- `src/app/privacy-policy/page.tsx` — Update with new business name, address, contact info
- `src/app/terms-of-service/page.tsx` — Update with new business name, SMS consent language if applicable

---

## Step 7: Configure Deployment

### Vercel
```bash
vercel login
vercel link        # Link to a new Vercel project
vercel --prod      # Deploy
```

### Custom Domain (DNS)
1. In Vercel dashboard → Settings → Domains → Add your domain
2. Update DNS records:
   - `A` record → Vercel's IP (shown in dashboard)
   - `CNAME` for `www` → `cname.vercel-dns.com`
3. Vercel auto-provisions SSL

### Google Search Console
1. Verify ownership of the new domain
2. Submit sitemap: `https://yourdomain.com/sitemap.xml`

---

## Step 8: Contact Form Setup

The contact form endpoint is in `src/app/api/contact/route.ts`. Update:
- Email recipient address
- Email sender configuration
- Any API keys for email service (Resend, SendGrid, etc.)

---

## File Structure Reference

```
src/
├── app/
│   ├── [city]/              # Dynamic location pages
│   │   ├── [service]/       # Service + location combo pages
│   │   └── page.tsx         # Location landing page
│   ├── about-us/
│   ├── api/contact/         # Contact form API endpoint
│   ├── contact-us/
│   ├── privacy-policy/
│   ├── service-area/
│   ├── services/
│   │   ├── [slug]/          # Individual service pages
│   │   └── page.tsx         # Services index
│   ├── terms-of-service/
│   ├── globals.css
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Homepage
│   ├── robots.ts
│   └── sitemap.ts           # Auto-generated sitemap
├── components/
│   ├── Breadcrumbs.tsx
│   ├── ContactForm.tsx
│   ├── CTABand.tsx
│   ├── Footer.tsx
│   ├── HeaderSpacer.tsx
│   ├── MobileCallBar.tsx
│   ├── Navbar.tsx
│   ├── SchemaMarkup.tsx
│   ├── ServiceCard.tsx
│   ├── ServiceSidebar.tsx
│   ├── TestimonialSection.tsx
│   └── TopBar.tsx
├── data/                    # ⭐ ALL business content lives here
│   ├── business.json
│   ├── locations.json
│   ├── service-locations.json
│   ├── services.json
│   └── testimonials.json
└── lib/
    └── data.ts              # Data access functions
```

---

## Checklist for New Business Setup

- [ ] Replace `business.json` with new business data
- [ ] Replace `services.json` with new services
- [ ] Replace `locations.json` with new service area
- [ ] Create `service-locations.json` entries (start all unpublished)
- [ ] Replace `testimonials.json` with real reviews
- [ ] Replace all images in `/public/images/`
- [ ] Replace favicon files
- [ ] Update color palette in `globals.css` and inline styles
- [ ] Update `SchemaMarkup.tsx` business type
- [ ] Update privacy policy and terms of service
- [ ] Configure contact form API endpoint
- [ ] Set up Vercel project and custom domain
- [ ] Submit sitemap to Google Search Console
- [ ] Publish first location's service combo pages
- [ ] Verify all pages render correctly
- [ ] Test mobile responsiveness
- [ ] Verify schema markup with Google's Rich Results Test
