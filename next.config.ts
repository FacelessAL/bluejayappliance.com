import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  async redirects() {
    return [
      // ============================================================
      // WordPress → Next.js migration redirects (301 permanent)
      // Preserves SEO rankings for all indexed URLs
      // ============================================================

      // --- Service parent page ---
      {
        source: "/our-services",
        destination: "/services",
        permanent: true,
      },

      // --- Individual service pages (old WordPress slugs → new) ---
      {
        source: "/our-services/washer-repair",
        destination: "/services/washer-repair",
        permanent: true,
      },
      {
        source: "/our-services/dryer-repair-naperville-il",
        destination: "/naperville-il-appliance-repair/dryer-repair",
        permanent: true,
      },
      {
        source: "/our-services/dishwasher-repair-naperville-il",
        destination: "/naperville-il-appliance-repair/dishwasher-repair",
        permanent: true,
      },
      {
        source: "/our-services/refrigerator-repair-naperville-il",
        destination: "/naperville-il-appliance-repair/refrigerator-and-freezer-repair",
        permanent: true,
      },
      {
        source: "/our-services/stove-oven-range-repair-naperville-il",
        destination: "/naperville-il-appliance-repair/stove-and-oven-repair",
        permanent: true,
      },
      {
        source: "/our-services/garbage-disposal-repair-installation-naperville-il",
        destination: "/naperville-il-appliance-repair/garbage-disposal-repair-and-installation",
        permanent: true,
      },

      // --- Catch-all for any other /our-services/* pages Google may have crawled ---
      {
        source: "/our-services/:slug",
        destination: "/services",
        permanent: true,
      },

      // --- Location pages (old format without state abbreviation) ---
      {
        source: "/plainfield-appliance-repair",
        destination: "/plainfield-il-appliance-repair",
        permanent: true,
      },
      {
        source: "/joliet-appliance-repair",
        destination: "/joliet-il-appliance-repair",
        permanent: true,
      },
      {
        source: "/aurora-appliance-repair",
        destination: "/aurora-il-appliance-repair",
        permanent: true,
      },
      {
        source: "/naperville-appliance-repair",
        destination: "/naperville-il-appliance-repair",
        permanent: true,
      },

      // --- Locations hub page ---
      {
        source: "/locations",
        destination: "/service-area",
        permanent: true,
      },

      // --- Old "-service" suffix URLs (from earlier site version) ---
      {
        source: "/naperville-il-appliance-repair-service",
        destination: "/naperville-il-appliance-repair",
        permanent: true,
      },
      {
        source: "/aurora-il-appliance-repair-service",
        destination: "/aurora-il-appliance-repair",
        permanent: true,
      },
      {
        source: "/joliet-il-appliance-repair-service",
        destination: "/joliet-il-appliance-repair",
        permanent: true,
      },
      {
        source: "/plainfield-il-appliance-repair-service",
        destination: "/plainfield-il-appliance-repair",
        permanent: true,
      },
      // --- KML file from Rank Math local SEO (no page equivalent) ---
      {
        source: "/locations.kml",
        destination: "/service-area",
        permanent: true,
      },

      // --- Removed cities (no longer serviced) → redirect to service area ---
      {
        source: "/elk-grove-village-il-appliance-repair",
        destination: "/service-area",
        permanent: true,
      },
      {
        source: "/elk-grove-village-il-appliance-repair/:service",
        destination: "/service-area",
        permanent: true,
      },
      {
        source: "/roselle-il-appliance-repair",
        destination: "/service-area",
        permanent: true,
      },
      {
        source: "/roselle-il-appliance-repair/:service",
        destination: "/service-area",
        permanent: true,
      },
      {
        source: "/addison-il-appliance-repair",
        destination: "/service-area",
        permanent: true,
      },
      {
        source: "/addison-il-appliance-repair/:service",
        destination: "/service-area",
        permanent: true,
      },
      {
        source: "/glendale-heights-il-appliance-repair",
        destination: "/service-area",
        permanent: true,
      },
      {
        source: "/glendale-heights-il-appliance-repair/:service",
        destination: "/service-area",
        permanent: true,
      },

      // Also handle city/service combos with old -service suffix
      {
        source: "/naperville-il-appliance-repair-service/:service",
        destination: "/naperville-il-appliance-repair/:service",
        permanent: true,
      },
      {
        source: "/aurora-il-appliance-repair-service/:service",
        destination: "/aurora-il-appliance-repair/:service",
        permanent: true,
      },
      {
        source: "/joliet-il-appliance-repair-service/:service",
        destination: "/joliet-il-appliance-repair/:service",
        permanent: true,
      },
      {
        source: "/plainfield-il-appliance-repair-service/:service",
        destination: "/plainfield-il-appliance-repair/:service",
        permanent: true,
      },

      // --- WordPress infrastructure URLs (prevent 404s from crawled WP URLs) ---
      {
        source: "/feed",
        destination: "/",
        permanent: true,
      },
      {
        source: "/feed/:path*",
        destination: "/",
        permanent: true,
      },
      {
        source: "/wp-sitemap.xml",
        destination: "/sitemap.xml",
        permanent: true,
      },
      {
        source: "/wp-sitemap-posts-page-1.xml",
        destination: "/sitemap.xml",
        permanent: true,
      },
      {
        source: "/wp-sitemap-posts-post-1.xml",
        destination: "/sitemap.xml",
        permanent: true,
      },
      {
        source: "/sitemap_index.xml",
        destination: "/sitemap.xml",
        permanent: true,
      },
      {
        source: "/wp-json/:path*",
        destination: "/",
        permanent: true,
      },
      {
        source: "/wp-content/:path*",
        destination: "/",
        permanent: true,
      },
      {
        source: "/wp-includes/:path*",
        destination: "/",
        permanent: true,
      },
      {
        source: "/wp-login.php",
        destination: "/",
        permanent: true,
      },
      {
        source: "/wp-admin/:path*",
        destination: "/",
        permanent: true,
      },
      {
        source: "/xmlrpc.php",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
