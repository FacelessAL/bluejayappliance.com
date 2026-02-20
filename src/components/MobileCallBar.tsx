'use client';

import Link from 'next/link';
import { getBusiness } from '@/lib/data';

export default function MobileCallBar() {
  const biz = getBusiness();

  return (
    <>
      <style>{`
        .mobile-call-bar {
          display: none;
        }
        @media (max-width: 1023px) {
          .mobile-call-bar {
            display: flex;
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            z-index: 9999;
            background-color: #1565C0;
            padding: 0;
            box-shadow: 0 -2px 10px rgba(0,0,0,0.2);
          }
          .mobile-call-bar a {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            width: 100%;
            padding: 14px 20px;
            color: #ffffff;
            font-weight: 700;
            font-size: 18px;
            text-decoration: none;
            font-family: var(--font-figtree), Arial, sans-serif;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }
          /* Push content above the sticky bar */
          .main-content {
            padding-bottom: 56px;
          }
          footer {
            padding-bottom: 56px;
          }
        }
      `}</style>
      <div className="mobile-call-bar">
        <Link href={`tel:${biz.phoneRaw}`}>
          <svg width="22" height="22" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          Call Now — {biz.phone}
        </Link>
      </div>
    </>
  );
}
