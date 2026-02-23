'use client';

import Link from 'next/link';
import { getBusiness } from '@/lib/data';

export default function TopBar() {
  const biz = getBusiness();

  return (
    <div className="hidden lg:block" style={{ backgroundColor: '#1565C0' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '36px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {biz.social.facebook && (
            <Link href={biz.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '28px', height: '28px', backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: '4px' }}>
              <svg width="14" height="14" fill="#ffffff" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </Link>
          )}
        </div>
        <Link href={`tel:${biz.phoneRaw}`} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#ffffff', textDecoration: 'none', fontSize: '14px', fontWeight: 600, fontFamily: 'var(--font-figtree)' }}>
          <svg width="14" height="14" fill="none" stroke="#ffffff" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          Call Us: {biz.phone}
        </Link>
      </div>
    </div>
  );
}
