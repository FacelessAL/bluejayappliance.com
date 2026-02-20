'use client';

import Link from 'next/link';
import Image from 'next/image';
import { getBusiness } from '@/lib/data';

export default function TopBar() {
  const biz = getBusiness();

  return (
    <div className="bg-bj-dark text-white topbar-mobile-bg">
      <div className="container flex items-center justify-between py-2 lg:py-5 gap-8">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0 topbar-logo">
          <Image
            src="/images/logo.webp"
            alt={biz.name}
            width={320}
            height={126}
            className="w-auto"
            style={{ height: '100px' }}
            priority
          />
        </Link>

        {/* Review badges + Same-Day Service + Phone — desktop only */}
        <div className="hidden lg:flex items-center gap-8 xl:gap-12">
          {/* Review Us + Stars + Google */}
          <div className="flex items-center gap-3">
            <div className="flex flex-col items-center gap-1">
              <span className="text-[16px] font-bold uppercase font-[family-name:var(--font-figtree)]">Review us</span>
              <Image src="/images/review-stars.webp" alt="5 star reviews" width={178} height={34} className="w-[100px] h-auto" />
            </div>
            {(biz.googleProfileUrl || biz.googleReviewUrl) && (
              <Link href={biz.googleProfileUrl || biz.googleReviewUrl} target="_blank" rel="noopener noreferrer">
                <Image src="/images/google-reviews-badge-small.webp" alt={`${biz.name} Reviews Badge`} width={110} height={46} className="w-[70px] h-auto" />
              </Link>
            )}
            {biz.social.facebook && (
              <Link href={biz.social.facebook} target="_blank" rel="noopener noreferrer">
                <Image src="/images/fb-badge.webp" alt="Facebook Reviews" width={110} height={54} className="w-[70px] h-auto" />
              </Link>
            )}
          </div>

          {/* Same-Day Service */}
          <Link href="/contact-us" className="flex items-center gap-3">
            <div style={{ width: '50px', height: '50px', borderRadius: '8px', backgroundColor: '#1E88E5', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg width="28" height="28" fill="none" stroke="#ffffff" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="leading-tight">
              <span className="block text-[14px] font-semibold uppercase font-[family-name:var(--font-figtree)]">SAME OR NEXT DAY</span>
              <span className="block text-[17px] font-semibold" style={{ color: '#64B5F6' }}>SERVICE AVAILABLE</span>
            </div>
          </Link>

          {/* Call Us Now */}
          <Link href={`tel:${biz.phoneRaw}`} className="flex items-center gap-3">
            <div style={{ width: '50px', height: '50px', borderRadius: '8px', backgroundColor: '#1E88E5', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg width="28" height="28" fill="none" stroke="#ffffff" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <div className="leading-tight">
              <span className="block text-[14px] font-semibold uppercase font-[family-name:var(--font-figtree)]">CALL US NOW</span>
              <span className="block text-[17px] font-semibold">{biz.phone}</span>
            </div>
          </Link>
        </div>

        {/* Mobile: hidden — sticky bottom bar handles call CTA */}
      </div>
    </div>
  );
}
