import Link from 'next/link';
import { getAllServices, getAllLocations, isServiceLocationPublished } from '@/lib/data';

interface ServiceSidebarProps {
  currentServiceSlug: string;
  currentServiceTitle?: string;
  locationSlug?: string;
  locationName?: string;
}

export default function ServiceSidebar({
  currentServiceSlug,
  currentServiceTitle,
  locationSlug,
  locationName,
}: ServiceSidebarProps) {
  const services = getAllServices();
  const locations = getAllLocations();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Services List */}
      <aside style={{ backgroundColor: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '12px', overflow: 'hidden' }}>
        <div style={{ backgroundColor: '#0F1B2D', padding: '16px 20px' }}>
          <h3 className="font-[family-name:var(--font-figtree)]" style={{ color: '#ffffff', fontSize: '16px', fontWeight: 700, margin: 0 }}>
            {locationName ? `${locationName} Services` : 'Our Services'}
          </h3>
        </div>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {services.map((service) => {
            const isCurrent = service.slug === currentServiceSlug;
            const isPublished = locationSlug
              ? isServiceLocationPublished(locationSlug, service.slug)
              : true;
            const href = locationSlug && isPublished
              ? `/${locationSlug}/${service.slug}`
              : `/services/${service.slug}`;

            return (
              <li key={service.slug} style={{ borderBottom: '1px solid #f3f4f6' }}>
                <Link
                  href={href}
                  className="font-[family-name:var(--font-poppins)]"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '12px 20px',
                    fontSize: '14px',
                    fontWeight: isCurrent ? 600 : 400,
                    color: isCurrent ? '#1565C0' : '#374151',
                    textDecoration: 'none',
                    backgroundColor: isCurrent ? '#E3F2FD' : 'transparent',
                    borderLeft: isCurrent ? '3px solid #1565C0' : '3px solid transparent',
                    transition: 'all 0.15s',
                  }}
                >
                  <span style={{ color: isCurrent ? '#1565C0' : '#64B5F6', fontSize: '10px', flexShrink: 0 }}>&#9654;</span>
                  {service.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </aside>

      {/* Service Areas */}
      <aside style={{ backgroundColor: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '12px', overflow: 'hidden' }}>
        <div style={{ backgroundColor: '#0F1B2D', padding: '16px 20px' }}>
          <h3 className="font-[family-name:var(--font-figtree)]" style={{ color: '#ffffff', fontSize: '16px', fontWeight: 700, margin: 0 }}>
            {currentServiceTitle ? `We Offer ${currentServiceTitle} In:` : 'Areas We Serve'}
          </h3>
        </div>
        <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {locations.map((location) => {
            const isCurrentLocation = locationSlug === location.slug;
            const comboPublished = isServiceLocationPublished(location.slug, currentServiceSlug);
            const locationHref = comboPublished
              ? `/${location.slug}/${currentServiceSlug}`
              : `/${location.slug}`;
            return (
              <Link
                key={location.slug}
                href={locationHref}
                className="font-[family-name:var(--font-poppins)]"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 12px',
                  fontSize: '13px',
                  fontWeight: isCurrentLocation ? 600 : 400,
                  color: isCurrentLocation ? '#1565C0' : '#374151',
                  textDecoration: 'none',
                  backgroundColor: isCurrentLocation ? '#E3F2FD' : '#f9fafb',
                  borderRadius: '6px',
                  transition: 'all 0.15s',
                }}
              >
                <span style={{ color: '#64B5F6', fontSize: '8px', flexShrink: 0 }}>&#9679;</span>
                {location.fullName}
              </Link>
            );
          })}
        </div>
      </aside>
    </div>
  );
}
