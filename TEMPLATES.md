# Page Templates Documentation

This document explains how the template-based pages work in the Blue Jay Appliance Next.js site. All template pages are **data-driven** — content comes from JSON files, so adding new locations or services requires zero code changes.

---

## Architecture Overview

```
src/data/
├── business.json          # Company info (NAP, phone, email, social, etc.)
├── services.json          # All services (12 total) with content sections
├── locations.json         # All service areas (8 locations)
└── service-locations.json # Which service+location combos are published
```

```
src/app/
├── page.tsx                        # Homepage (one-off)
├── about-us/page.tsx               # About Us (one-off)
├── contact-us/page.tsx             # Contact Us (one-off)
├── services/page.tsx               # Services listing (one-off)
├── services/[slug]/page.tsx        # Individual service template
├── service-area/page.tsx           # Service area listing (one-off)
├── privacy-policy/page.tsx         # Privacy policy (one-off)
├── [city]/page.tsx                 # Location template
└── [city]/[service]/page.tsx       # Service + Location combo template
```

---

## Template 1: Location Page (`[city]/page.tsx`)

**URL pattern:** `/{location-slug}` (e.g., `/elgin-il-plumber`)

**Data source:** `locations.json`

### What changes per page:
| Element | Source |
|---------|--------|
| Page title / meta | `location.metaTitle`, `location.metaDescription` |
| H1 heading | `"Plumber in {location.fullName}"` |
| Description | `location.description` |
| Schema markup | `LocalBusiness` with `areaServed` |
| Breadcrumbs | `Home > {location.fullName}` |
| Services grid | All services shown; clickable only if `published: true` in `service-locations.json` |

### What stays the same:
- Layout structure (hero → services grid → about section → CTA → testimonials)
- "Why Choose Blue Jay Appliance" boilerplate text (with city name injected)
- CTA buttons, phone number, styling

### To add a new location:
1. Add entry to `src/data/locations.json`
2. Add entry to `src/data/service-locations.json` with desired services set to `published: true`
3. That's it — the page is auto-generated at build time via `generateStaticParams()`

---

## Template 2: Service Page (`services/[slug]/page.tsx`)

**URL pattern:** `/services/{service-slug}` (e.g., `/services/emergency-service`)

**Data source:** `services.json`

### What changes per page:
| Element | Source |
|---------|--------|
| Page title / meta | `service.metaTitle` (with `{city}` replaced by "Elgin, IL") |
| H1 heading | `service.heroHeading` |
| Hero subheading | `service.heroSubheading` |
| Hero background | `service.image` (dimmed to 20% opacity) |
| Content sections | `service.contentSections[]` array of `{heading, body}` |
| Schema markup | `Service` type with `service.schemaServiceType` |
| Breadcrumbs | `Home > Services > {service.title}` |

### What stays the same:
- Layout structure (hero → content + sidebar → location pills → CTA → testimonials)
- Sidebar with service navigation + contact CTA
- Location pills linking to all service areas

### To add a new service:
1. Add entry to `src/data/services.json` with all required fields
2. Add the service slug to each location in `src/data/service-locations.json`
3. Add a service image to `public/images/services/`
4. Auto-generated at build time

---

## Template 3: Service + Location Combo (`[city]/[service]/page.tsx`)

**URL pattern:** `/{location-slug}/{service-slug}` (e.g., `/elgin-il-plumber/emergency-service`)

**Data source:** Both `services.json` and `locations.json`, gated by `service-locations.json`

### What changes per page:
| Element | Source |
|---------|--------|
| Page title / meta | `service.metaTitle` with `{city}` replaced by `location.fullName` |
| H1 heading | `"{service.heroHeading} in {location.name}"` |
| Content sections | Same as service page |
| Location-specific paragraph | Programmatic text with service + location names |
| "Why Choose Us" list | Programmatic with location name injected |
| Schema markup | `Service` type with `areaServed` |
| Breadcrumbs | `Home > {location.fullName} > {service.title}` |
| Sidebar | Shows other services in the same city |

### Publishing system:
Pages are only generated if `service-locations.json` has `published: true` for that combo. The `[city]/page.tsx` shows all services but makes unpublished ones non-clickable (displayed but no link).

### To publish a new combo:
1. In `src/data/service-locations.json`, set the service to `published: true` under the location key
2. Rebuild — the page is auto-generated

---

## Data File Reference

### `services.json` fields:
```json
{
  "slug": "emergency-service",
  "title": "Emergency Service",
  "shortTitle": "Emergency Service",
  "image": "/images/services/emergency-service.jpg",
  "metaTitle": "Appliance Repair Service {city} | Blue Jay Appliance",
  "metaDescription": "Need an emergency plumber in {city}? ...",
  "heroHeading": "Appliance Repair Service",
  "heroSubheading": "When plumbing emergencies strike...",
  "contentSections": [
    { "heading": "Section Title", "body": "Section content..." }
  ],
  "schemaType": "Service",
  "schemaServiceType": "Emergency Plumbing Service"
}
```

### `locations.json` fields:
```json
{
  "slug": "elgin-il-plumber",
  "name": "Elgin",
  "state": "IL",
  "fullName": "Elgin, IL",
  "geo": { "latitude": 42.0354, "longitude": -88.2826 },
  "description": "Blue Jay Appliance proudly serves Naperville, IL...",
  "metaTitle": "Appliance Repair in Naperville, IL | Same-Day Service | Blue Jay Appliance",
  "metaDescription": "Expert appliance repair in Naperville, IL..."
}
```

### `service-locations.json` structure:
```json
{
  "elgin-il-plumber": {
    "emergency-service": { "published": true },
    "residential-plumbing": { "published": true },
    ...
  }
}
```

---

## Programmatic Internal Linking

Each template includes automatic internal links:
- **Service pages** → link to all location pages via location pills
- **Location pages** → link to all service pages (clickable if published)
- **Combo pages** → sidebar links to other services in the same city + "All {City} Services" link
- **Breadcrumbs** → structured navigation on every page
- **Schema markup** → JSON-LD with breadcrumb list on every page

---

## Design Tokens (used across all templates)

| Token | Value | Usage |
|-------|-------|-------|
| bj-blue | `#1565C0` | CTAs, buttons, accents |
| bj-dark | `#0F1B2D` | Backgrounds, headings |
| bj-sky | `#64B5F6` | Highlights, borders, icons |
| bj-light | `#E3F2FD` | Light backgrounds |
| Heading font | Figtree (800 weight) | All h1-h3 |
| Body font | Poppins (400-600) | Paragraphs, labels |
| Hero padding | `60px 0` | All inner page heroes |
| Content padding | `64px 0` | All content sections |
| Max width | `1200px` | Container |
