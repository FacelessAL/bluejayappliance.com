import type { Metadata } from 'next';
import Link from 'next/link';
import { getBusiness } from '@/lib/data';
import galleryData from '@/data/gallery.json';
import SchemaMarkup from '@/components/SchemaMarkup';
import Breadcrumbs from '@/components/Breadcrumbs';
import CTABand from '@/components/CTABand';
import GalleryGrid from '@/components/GalleryGrid';

const biz = getBusiness();

const totalImages = Object.values(galleryData).reduce((sum, arr) => sum + (arr as unknown[]).length, 0);

export const metadata: Metadata = {
  title: `Our Work Gallery | ${biz.name} | Appliance Repair Photos`,
  description: `Browse ${totalImages}+ real appliance repair photos from ${biz.name}. See our work on refrigerators, washers, dryers, dishwashers, stoves & ovens across ${biz.serviceAreaName}.`,
  openGraph: {
    title: `Our Work Gallery | ${biz.name}`,
    description: `Browse ${totalImages}+ real appliance repair photos from ${biz.name} across ${biz.serviceAreaName}.`,
  },
  alternates: {
    canonical: `${biz.url}/gallery`,
  },
};

export default function GalleryPage() {
  return (
    <>
      <SchemaMarkup
        type="WebPage"
        pageName={`${biz.name} Work Gallery`}
        pageDescription={`Browse ${totalImages}+ real appliance repair photos from ${biz.name}.`}
        pageUrl={`${biz.url}/gallery`}
        breadcrumbs={[
          { name: 'Home', url: biz.url },
          { name: 'Gallery', url: `${biz.url}/gallery` },
        ]}
      />

      <Breadcrumbs items={[{ label: 'Gallery', href: '/gallery' }]} />

      {/* Hero */}
      <section style={{ backgroundColor: '#0F1B2D', color: '#ffffff', padding: '80px 0 60px' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h1 className="font-[family-name:var(--font-figtree)]" style={{ fontSize: '48px', fontWeight: 800, marginBottom: '16px', lineHeight: '1.1', textTransform: 'uppercase' }}>
            Our Work Gallery
          </h1>
          <p style={{ fontSize: '18px', color: '#d1d5db', maxWidth: '700px', margin: '0 auto 32px', fontFamily: 'var(--font-poppins)', lineHeight: '1.7' }}>
            Browse {totalImages}+ photos of the appliances we repair and service across {biz.serviceAreaName}. From refrigerators and washers to stoves and dishwashers — see the quality of work our customers trust.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '48px', flexWrap: 'wrap' }}>
            <div style={{ textAlign: 'center' }}>
              <div className="font-[family-name:var(--font-figtree)]" style={{ fontSize: '42px', fontWeight: 800, color: '#64B5F6' }}>{totalImages}+</div>
              <div style={{ fontSize: '12px', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '1px', fontFamily: 'var(--font-poppins)', fontWeight: 600 }}>Photos</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div className="font-[family-name:var(--font-figtree)]" style={{ fontSize: '42px', fontWeight: 800, color: '#64B5F6' }}>5</div>
              <div style={{ fontSize: '12px', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '1px', fontFamily: 'var(--font-poppins)', fontWeight: 600 }}>Appliance Types</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div className="font-[family-name:var(--font-figtree)]" style={{ fontSize: '42px', fontWeight: 800, color: '#64B5F6' }}>21</div>
              <div style={{ fontSize: '12px', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '1px', fontFamily: 'var(--font-poppins)', fontWeight: 600 }}>Cities Served</div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Grid with Filters */}
      <section style={{ padding: '48px 0 80px', backgroundColor: '#f9fafb' }}>
        <div className="container">
          <GalleryGrid images={galleryData} />
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ backgroundColor: '#0F1B2D', color: '#ffffff', padding: '80px 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 className="font-[family-name:var(--font-figtree)]" style={{ fontSize: '32px', fontWeight: 800, marginBottom: '16px', textTransform: 'uppercase' }}>
            Need Your Appliance Repaired?
          </h2>
          <p style={{ fontSize: '16px', color: '#d1d5db', maxWidth: '600px', margin: '0 auto 32px', fontFamily: 'var(--font-poppins)', lineHeight: '1.7' }}>
            Whether it&apos;s a refrigerator that stopped cooling, a washer that won&apos;t spin, or a stove that won&apos;t heat — our experienced technicians are ready to help. Same or next-day service available.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <Link
              href={`tel:${biz.phoneRaw}`}
              className="font-[family-name:var(--font-figtree)]"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', backgroundColor: '#1565C0', color: '#ffffff', padding: '14px 32px', borderRadius: '6px', fontWeight: 700, fontSize: '18px', textDecoration: 'none' }}
            >
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              {biz.phone}
            </Link>
            <Link
              href="/contact-us"
              className="font-[family-name:var(--font-figtree)]"
              style={{ display: 'inline-block', border: '2px solid #ffffff', color: '#ffffff', padding: '14px 32px', borderRadius: '6px', fontWeight: 700, fontSize: '18px', textDecoration: 'none' }}
            >
              Get a Free Estimate
            </Link>
          </div>
        </div>
      </section>

      <CTABand />
    </>
  );
}
