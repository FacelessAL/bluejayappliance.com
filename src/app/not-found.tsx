import Link from 'next/link';
import { getBusiness } from '@/lib/data';

export default function NotFound() {
  const biz = getBusiness();

  return (
    <section style={{ backgroundColor: '#0F1B2D', color: '#ffffff', padding: '100px 0', minHeight: '60vh', display: 'flex', alignItems: 'center' }}>
      <div className="container" style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
        <div className="font-[family-name:var(--font-figtree)]" style={{ fontSize: '120px', fontWeight: 800, color: '#1565C0', lineHeight: '1', marginBottom: '16px' }}>
          404
        </div>
        <h1 className="font-[family-name:var(--font-figtree)]" style={{ fontSize: '28px', fontWeight: 800, marginBottom: '16px', textTransform: 'uppercase' }}>
          Page Not Found
        </h1>
        <p style={{ fontSize: '16px', color: '#9ca3af', fontFamily: 'var(--font-poppins)', lineHeight: '1.7', marginBottom: '32px' }}>
          Sorry, the page you&apos;re looking for doesn&apos;t exist or has been moved. Let us help you find what you need.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center' }}>
          <Link
            href="/"
            className="font-[family-name:var(--font-figtree)]"
            style={{ display: 'inline-block', backgroundColor: '#1565C0', color: '#ffffff', padding: '14px 32px', borderRadius: '6px', fontWeight: 700, fontSize: '16px', textDecoration: 'none' }}
          >
            Go to Homepage
          </Link>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <Link href="/services" style={{ color: '#64B5F6', fontWeight: 600, fontSize: '14px', textDecoration: 'none', fontFamily: 'var(--font-poppins)' }}>
              Our Services
            </Link>
            <Link href="/service-area" style={{ color: '#64B5F6', fontWeight: 600, fontSize: '14px', textDecoration: 'none', fontFamily: 'var(--font-poppins)' }}>
              Service Area
            </Link>
            <Link href="/contact-us" style={{ color: '#64B5F6', fontWeight: 600, fontSize: '14px', textDecoration: 'none', fontFamily: 'var(--font-poppins)' }}>
              Contact Us
            </Link>
          </div>
          <p style={{ fontSize: '14px', color: '#6b7280', fontFamily: 'var(--font-poppins)', marginTop: '16px' }}>
            Need help now? Call{' '}
            <Link href={`tel:${biz.phoneRaw}`} style={{ color: '#64B5F6', fontWeight: 700, textDecoration: 'none' }}>
              {biz.phone}
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
