import Link from 'next/link';

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      style={{ backgroundColor: '#f3f4f6', borderBottom: '1px solid #e5e7eb', padding: '14px 0' }}
    >
      <div className="container">
        <ol style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', listStyle: 'none', margin: 0, padding: 0 }}>
          <li>
            <Link
              href="/"
              className="font-[family-name:var(--font-poppins)]"
              style={{ color: '#6b7280', fontSize: '14px', textDecoration: 'none', transition: 'color 0.2s' }}
            >
              Home
            </Link>
          </li>
          {items.map((item, index) => (
            <li key={index} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: '#9ca3af', fontSize: '12px' }}>›</span>
              {index === items.length - 1 ? (
                <span
                  className="font-[family-name:var(--font-poppins)]"
                  style={{ color: '#0F1B2D', fontSize: '14px', fontWeight: 600 }}
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="font-[family-name:var(--font-poppins)]"
                  style={{ color: '#6b7280', fontSize: '14px', textDecoration: 'none', transition: 'color 0.2s' }}
                >
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}
