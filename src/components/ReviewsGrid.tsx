'use client';

import { useState, useEffect, useRef } from 'react';

interface Review {
  name: string;
  initial: string;
  color: string;
  timestamp: number;
  text: string;
}

function StarRating({ rating, size = 16 }: { rating: number; size?: number }) {
  return (
    <div style={{ display: 'flex', gap: '2px' }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill={star <= rating ? '#FBBF24' : '#D1D5DB'}
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

function getReviewMonth(timestamp: number): string {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

const REVIEWS_PER_PAGE = 10;

export default function ReviewsGrid({ reviews, city }: { reviews: Review[]; city: string }) {
  const [visibleCount, setVisibleCount] = useState(REVIEWS_PER_PAGE);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sentinelRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && visibleCount < reviews.length) {
          setVisibleCount((prev) => Math.min(prev + REVIEWS_PER_PAGE, reviews.length));
        }
      },
      { rootMargin: '200px' }
    );

    observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [visibleCount, reviews.length]);

  const visibleReviews = reviews.slice(0, visibleCount);
  const hasMore = visibleCount < reviews.length;

  return (
    <>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
        {visibleReviews.map((review, index) => (
          <div
            key={index}
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '12px',
              padding: '24px',
              boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
              display: 'flex',
              flexDirection: 'column',
              opacity: 0,
              animation: 'fadeInUp 0.4s ease forwards',
              animationDelay: `${(index % REVIEWS_PER_PAGE) * 0.05}s`,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '50%', backgroundColor: review.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ fontSize: '18px', fontWeight: 700, color: '#ffffff', fontFamily: 'var(--font-figtree)' }}>
                  {review.initial}
                </span>
              </div>
              <div style={{ flex: 1 }}>
                <p className="font-[family-name:var(--font-figtree)]" style={{ fontWeight: 700, color: '#0F1B2D', fontSize: '15px', margin: 0 }}>
                  {review.name}
                </p>
                <p style={{ fontSize: '12px', color: '#9ca3af', fontFamily: 'var(--font-poppins)', margin: 0 }}>
                  {getReviewMonth(review.timestamp)} &middot; {city}
                </p>
              </div>
            </div>
            <StarRating rating={5} size={16} />
            <p style={{ color: '#4b5563', fontSize: '14px', lineHeight: '1.7', fontFamily: 'var(--font-poppins)', marginTop: '10px', flex: 1 }}>
              &ldquo;{review.text}&rdquo;
            </p>
          </div>
        ))}
      </div>

      {hasMore && (
        <div ref={sentinelRef} style={{ textAlign: 'center', padding: '32px 0' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#6b7280', fontSize: '14px', fontFamily: 'var(--font-poppins)' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ animation: 'spin 1s linear infinite' }}>
              <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
            </svg>
            Loading more reviews...
          </div>
        </div>
      )}

      {!hasMore && reviews.length > REVIEWS_PER_PAGE && (
        <p style={{ textAlign: 'center', color: '#9ca3af', fontSize: '14px', fontFamily: 'var(--font-poppins)', padding: '24px 0' }}>
          Showing all {reviews.length} reviews
        </p>
      )}

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
}
