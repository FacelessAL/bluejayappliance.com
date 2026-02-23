'use client';

import { getBusiness } from '@/lib/data';
import testimonials from '@/data/testimonials.json';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useCallback } from 'react';

function timeAgo(timestamp: number): string {
  const now = Date.now() / 1000;
  const diff = now - timestamp;
  const minutes = Math.floor(diff / 60);
  const hours = Math.floor(diff / 3600);
  const days = Math.floor(diff / 86400);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (years > 0) return years === 1 ? 'a year ago' : `${years} years ago`;
  if (months > 0) return months === 1 ? 'a month ago' : `${months} months ago`;
  if (weeks > 0) return weeks === 1 ? 'a week ago' : `${weeks} weeks ago`;
  if (days > 0) return days === 1 ? 'a day ago' : `${days} days ago`;
  if (hours > 0) return hours === 1 ? 'an hour ago' : `${hours} hours ago`;
  if (minutes > 0) return minutes === 1 ? 'a minute ago' : `${minutes} minutes ago`;
  return 'just now';
}


export default function TestimonialSection() {
  const biz = getBusiness();
  const [currentIndex, setCurrentIndex] = useState(0);
  const reviewUrl = biz.googleMapsUrl || '#';
  const writeReviewUrl = biz.googleReviewUrl || '#';

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const getVisibleReviews = () => {
    const visible = [];
    for (let i = 0; i < 3; i++) {
      visible.push(testimonials[(currentIndex + i) % testimonials.length]);
    }
    return visible;
  };

  return (
    <section style={{ backgroundColor: '#ffffff', padding: '80px 0' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
        {/* Client Testimonials heading */}
        <h2 className="font-[family-name:var(--font-figtree)] heading-xl" style={{ fontWeight: 800, textAlign: 'center', textTransform: 'uppercase', color: '#0F1B2D', marginBottom: '40px' }}>
          Client Testimonials
        </h2>

        {/* Rating summary — centered */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '8px' }}>
            <Image
              src="/images/logo.webp"
              alt={biz.name}
              width={60}
              height={60}
              style={{ height: '40px', width: 'auto' }}
            />
            <div>
              <p style={{ fontWeight: 700, fontSize: '16px', color: '#0F1B2D', margin: 0 }}>{biz.name}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
                <div style={{ display: 'flex', gap: '2px' }}>
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} width="16" height="16" fill="#FBBC05" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span style={{ fontSize: '13px', color: '#6b7280' }}>{biz.reviewCount} Google reviews</span>
              </div>
            </div>
          </div>
          <Link
            href={writeReviewUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{ marginTop: '8px', border: '1px solid #d1d5db', color: '#0F1B2D', padding: '8px 20px', borderRadius: '4px', fontSize: '13px', fontWeight: 500, textDecoration: 'none' }}
          >
            Write a review
          </Link>
        </div>

        {/* Review carousel — full width */}
        <div style={{ position: 'relative', marginBottom: '40px' }}>
            {/* Nav arrows */}
            <button
              onClick={prevSlide}
              aria-label="Previous reviews"
              style={{ position: 'absolute', left: '-20px', top: '50%', transform: 'translateY(-50%)', zIndex: 2, background: 'none', border: 'none', cursor: 'pointer', fontSize: '24px', color: '#9ca3af', padding: '8px' }}
            >
              &#8249;
            </button>
            <button
              onClick={nextSlide}
              aria-label="Next reviews"
              style={{ position: 'absolute', right: '-20px', top: '50%', transform: 'translateY(-50%)', zIndex: 2, background: 'none', border: 'none', cursor: 'pointer', fontSize: '24px', color: '#9ca3af', padding: '8px' }}
            >
              &#8250;
            </button>

            <div className="grid-3col">
              {getVisibleReviews().map((t, i) => (
                <Link
                  key={`${currentIndex}-${i}`}
                  href={reviewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <div style={{ border: '1px solid #e5e7eb', borderRadius: '8px', padding: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', height: '100%', cursor: 'pointer', transition: 'box-shadow 0.2s' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                      <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: t.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '14px', fontWeight: 700, flexShrink: 0 }}>
                        {t.initial}
                      </div>
                      <div style={{ flex: 1 }}>
                        <p style={{ fontWeight: 600, fontSize: '13px', color: '#0F1B2D' }}>{t.name}</p>
                        <p style={{ fontSize: '11px', color: '#9ca3af' }}>{timeAgo(t.timestamp)}</p>
                      </div>
                      <svg width="18" height="18" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                      </svg>
                    </div>
                    <div style={{ display: 'flex', gap: '2px', marginBottom: '8px' }}>
                      {[...Array(5)].map((_, j) => (
                        <svg key={j} width="14" height="14" fill="#FBBC05" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                      ))}
                    </div>
                    <p style={{ fontSize: '13px', color: '#4b5563', lineHeight: '1.5', display: '-webkit-box', WebkitLineClamp: 4, WebkitBoxOrient: 'vertical' as const, overflow: 'hidden' }}>{t.text}</p>
                    <span style={{ fontSize: '12px', color: '#1565C0', fontWeight: 500, marginTop: '8px', display: 'inline-block' }}>
                      Read more
                    </span>
                  </div>
                </Link>
              ))}
            </div>

          {/* Dot indicators */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', marginTop: '16px' }}>
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                aria-label={`Go to review ${i + 1}`}
                style={{
                  width: currentIndex === i ? '24px' : '8px',
                  height: '8px',
                  borderRadius: '4px',
                  backgroundColor: currentIndex === i ? '#1565C0' : '#d1d5db',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  padding: 0,
                }}
              />
            ))}
          </div>
        </div>

        {/* Review platform badges */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '32px' }}>
          <Link href={writeReviewUrl} target="_blank" rel="noopener noreferrer">
            <Image
              src="/images/google-reviews-badge.webp"
              alt="Google Reviews"
              width={200}
              height={100}
              style={{ height: '60px', width: 'auto' }}
            />
          </Link>
          {biz.social.facebook && <Link href={biz.social.facebook} target="_blank" rel="noopener noreferrer">
            <Image
              src="/images/fb-badge.webp"
              alt="Facebook Reviews"
              width={150}
              height={68}
              style={{ height: '60px', width: 'auto' }}
            />
          </Link>}
        </div>
      </div>
    </section>
  );
}
