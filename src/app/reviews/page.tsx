import type { Metadata } from 'next';
import Link from 'next/link';
import { getBusiness } from '@/lib/data';
import testimonials from '@/data/testimonials.json';
import SchemaMarkup from '@/components/SchemaMarkup';
import Breadcrumbs from '@/components/Breadcrumbs';
import ReviewsGrid from '@/components/ReviewsGrid';

const biz = getBusiness();

export const metadata: Metadata = {
  title: `Reviews | ${biz.name} | ${biz.address.city}, ${biz.address.state}`,
  description: `Read reviews from real customers of ${biz.name}. See why homeowners across ${biz.serviceAreaName} trust us for appliance repair. ${biz.rating} stars on Google.`,
  openGraph: {
    title: `Reviews | ${biz.name} | ${biz.address.city}, ${biz.address.state}`,
    description: `Read reviews from real customers of ${biz.name}. See why homeowners across ${biz.serviceAreaName} trust us for appliance repair.`,
  },
  alternates: {
    canonical: `${biz.url}/reviews`,
  },
};

export default function ReviewsPage() {
  return (
    <>
      <SchemaMarkup
        type="WebPage"
        pageName={`${biz.name} Reviews`}
        pageDescription={`Customer reviews for ${biz.name}. ${biz.rating} stars on Google.`}
        pageUrl={`${biz.url}/reviews`}
        breadcrumbs={[
          { name: 'Home', url: biz.url },
          { name: 'Reviews', url: `${biz.url}/reviews` },
        ]}
      />

      <Breadcrumbs items={[{ label: 'Reviews', href: '/reviews' }]} />

      {/* Hero - Dark with stars, stats, badges */}
      <section style={{ backgroundColor: '#0F1B2D', color: '#ffffff', padding: '80px 0 60px' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', marginBottom: '20px' }}>
            {[1, 2, 3, 4, 5].map((star) => (
              <svg key={star} width="36" height="36" viewBox="0 0 24 24" fill="#FBBF24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            ))}
          </div>
          <h1 className="font-[family-name:var(--font-figtree)]" style={{ fontSize: '48px', fontWeight: 800, marginBottom: '16px', lineHeight: '1.1' }}>
            {biz.reviewCount}+ Happy Customers
          </h1>
          <p style={{ fontSize: '18px', color: '#d1d5db', maxWidth: '640px', margin: '0 auto 40px', fontFamily: 'var(--font-poppins)', lineHeight: '1.7' }}>
            Real reviews from real people across our {biz.serviceAreaName} service area
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '48px', flexWrap: 'wrap', marginBottom: '32px' }}>
            <div style={{ textAlign: 'center' }}>
              <div className="font-[family-name:var(--font-figtree)]" style={{ fontSize: '42px', fontWeight: 800, color: '#FBBF24' }}>{biz.rating}</div>
              <div style={{ fontSize: '12px', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '1px', fontFamily: 'var(--font-poppins)', fontWeight: 600 }}>Average Rating</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div className="font-[family-name:var(--font-figtree)]" style={{ fontSize: '42px', fontWeight: 800, color: '#FBBF24' }}>{biz.reviewCount}+</div>
              <div style={{ fontSize: '12px', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '1px', fontFamily: 'var(--font-poppins)', fontWeight: 600 }}>Google Reviews</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div className="font-[family-name:var(--font-figtree)]" style={{ fontSize: '42px', fontWeight: 800, color: '#FBBF24' }}>20+</div>
              <div style={{ fontSize: '12px', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '1px', fontFamily: 'var(--font-poppins)', fontWeight: 600 }}>Cities Served</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div className="font-[family-name:var(--font-figtree)]" style={{ fontSize: '42px', fontWeight: 800, color: '#FBBF24' }}>10+</div>
              <div style={{ fontSize: '12px', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '1px', fontFamily: 'var(--font-poppins)', fontWeight: 600 }}>Years of Service</div>
            </div>
          </div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(255,255,255,0.1)', padding: '10px 20px', borderRadius: '50px', marginBottom: '28px' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            <span style={{ fontSize: '14px', fontWeight: 600, color: '#ffffff' }}>Verified Google Reviews</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <Link
              href={biz.googleReviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-[family-name:var(--font-figtree)]"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: '#DB4437', color: '#ffffff', padding: '12px 28px', borderRadius: '50px', fontWeight: 700, fontSize: '15px', textDecoration: 'none' }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#fff"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#fff"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#fff"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#fff"/>
              </svg>
              Leave a Review
            </Link>
          </div>
          <p style={{ fontSize: '13px', color: '#6b7280', marginTop: '16px', fontFamily: 'var(--font-poppins)' }}>
            Used our services? We&apos;d love to have you on our review wall
          </p>
        </div>
      </section>

      {/* Reviews Grid - lazy loads 10 at a time */}
      <section style={{ padding: '48px 0', backgroundColor: '#f9fafb' }}>
        <div className="container">
          <ReviewsGrid reviews={testimonials} city={biz.address.city} />

          {/* Leave a review CTA */}
          <div style={{ marginTop: '48px', textAlign: 'center', backgroundColor: '#0F1B2D', borderRadius: '16px', padding: '48px 32px' }}>
            <h2 className="font-[family-name:var(--font-figtree)]" style={{ fontSize: '28px', fontWeight: 800, color: '#ffffff', marginBottom: '12px' }}>
              Had a Great Experience?
            </h2>
            <p style={{ fontSize: '15px', color: '#9ca3af', fontFamily: 'var(--font-poppins)', lineHeight: '1.7', maxWidth: '600px', margin: '0 auto 24px' }}>
              We&apos;d love to hear from you! Your feedback helps us continue to improve and helps other homeowners find a trustworthy appliance repair service.
            </p>
            <Link
              href={biz.googleReviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-[family-name:var(--font-figtree)]"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: '#DB4437', color: '#ffffff', padding: '14px 32px', borderRadius: '50px', fontWeight: 700, fontSize: '16px', textDecoration: 'none' }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#fff"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#fff"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#fff"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#fff"/>
              </svg>
              Write a Google Review
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
