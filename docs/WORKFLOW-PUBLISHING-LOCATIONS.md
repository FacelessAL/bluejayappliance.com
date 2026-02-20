# Workflow: Publishing Location Service Pages Live

This document describes how to push specific sets of service/location combo articles live, update the sitemap, and notify Google.

---

## Overview

The site uses a **published flag system** in `src/data/service-locations.json` to control which service/location combo pages appear in the sitemap and are accessible. All **location landing pages** (`/elgin-il-plumber`, `/chicago-il-plumber`, etc.) and **generic service pages** (`/services/emergency-service`, etc.) are always live. Only the **service + location combo pages** (`/elgin-il-plumber/emergency-service`) are gated by the `published` flag.

---

## Step 1: Edit `service-locations.json`

Open `src/data/service-locations.json`. Each location has an object of services with a `published` boolean and a `localParagraph` string.

**To publish a location's service pages**, set `"published": true` for each service under that location:

```json
"schaumburg-il-plumber": {
  "emergency-service": { "published": true, "localParagraph": "..." },
  "residential-plumbing": { "published": true, "localParagraph": "..." },
  ...
}
```

**To unpublish**, set `"published": false`.

You can publish individual services selectively — not all services need to go live at once for a location.

---

## Step 2: Verify the `localParagraph` Content

Each service/location combo should have a unique, location-specific `localParagraph` that mentions local landmarks, neighborhoods, and specifics. Before publishing, verify the content quality.

---

## Step 3: Build and Deploy

```bash
npx next build
vercel --prod --yes
```

The sitemap (`/sitemap.xml`) is **automatically generated** at build time from the `service-locations.json` data. Only published service/location combos appear in the sitemap. No manual sitemap editing is needed.

---

## Step 4: Notify Google of Sitemap Changes

### Option A: Google Search Console (Recommended)

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Select the property for `bluejayappliance.com`
3. Navigate to **Sitemaps** in the left sidebar
4. If not already submitted, add: `https://bluejayappliance.com/sitemap.xml`
5. If already submitted, click the sitemap URL and click **"Resubmit"**
6. Google will recrawl the sitemap and discover the new pages

### Option B: Google Indexing API (Faster, for individual URLs)

For high-priority pages, you can request immediate indexing:

1. In Google Search Console, go to **URL Inspection**
2. Enter the specific URL (e.g., `https://bluejayappliance.com/schaumburg-il-plumber/emergency-service`)
3. Click **"Request Indexing"**
4. Repeat for each new page you want indexed quickly

### Option C: Ping Google (Automated)

After deployment, you can ping Google's sitemap endpoint:

```bash
curl "https://www.google.com/ping?sitemap=https://bluejayappliance.com/sitemap.xml"
```

---

## Step 5: Monitor Indexing

1. In Google Search Console → **Pages**, monitor the "Indexed" vs "Not indexed" counts
2. New pages typically appear in Google within 1-7 days after sitemap resubmission
3. Check **Coverage** for any crawl errors on newly published pages

---

## Quick Reference: Current Published Status

| Location | Slug | Service/Location Combos |
|---|---|---|
| Naperville (HQ) | `naperville-il` | ✅ Published |
| Aurora | `aurora-il` | ✅ Published |
| Joliet | `joliet-il` | ✅ Published |
| Plainfield | `plainfield-il` | ✅ Published |

**Note:** All 8 location landing pages (e.g., `/chicago-il-plumber`) are always live regardless of service combo status. Only the sub-pages (e.g., `/chicago-il-plumber/emergency-service`) are controlled by the published flag.

---

## Recommended Rollout Strategy

1. Start with Naperville (HQ) — all services published
2. Aurora, Joliet, Plainfield — expand as content is ready

For each rollout:
1. Set `published: true` in `service-locations.json`
2. Build and deploy
3. Resubmit sitemap in Google Search Console
4. Request indexing for the highest-priority pages
5. Monitor in Search Console for 1-2 weeks before next rollout

---

## Updating Review Data

Review rating and count are stored in `src/data/business.json`:

```json
{
  "rating": 4.9,
  "reviewCount": 23
}
```

Update these values as new reviews come in. They propagate automatically to:
- Schema markup (all pages)
- Testimonial section
- City page trust badges

Individual testimonials are stored in `src/data/testimonials.json`. Add new reviews there as they come in.
