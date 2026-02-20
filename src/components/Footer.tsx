import Link from 'next/link';
import Image from 'next/image';
import { getBusiness } from '@/lib/data';

export default function Footer() {
  const biz = getBusiness();

  return (
    <footer style={{ backgroundColor: '#0F1B2D', color: '#ffffff' }}>
      {/* Pre-Footer Band */}
      <div style={{ borderTop: '3px solid #1565C0', borderBottom: '3px solid #1565C0', overflow: 'visible' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 2rem', textAlign: 'center' }}>
          <h2 className="font-[family-name:var(--font-figtree)]" style={{ fontSize: '28px', fontWeight: 800, color: '#64B5F6', textTransform: 'uppercase', marginBottom: '8px', lineHeight: '1.2' }}>
            {biz.name}
          </h2>
          <p style={{ fontSize: '14px', color: '#ffffff', fontFamily: 'var(--font-poppins)', lineHeight: '1.6', fontStyle: 'italic' }}>
            We strive to exceed your expectations, ensuring that each client receives top-tier service at a reasonable cost
          </p>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '48px 2rem' }}>
        <div className="grid-4col" style={{ gap: '32px' }}>
          {/* Column 1: Logo + License + Button */}
          <div>
            <Image
              src="/images/logo.webp"
              alt={biz.name}
              width={200}
              height={60}
              style={{ height: '70px', width: 'auto', marginBottom: '12px' }}
            />
            {biz.license && (
              <p style={{ fontSize: '14px', color: '#9ca3af', fontFamily: 'var(--font-poppins)', fontWeight: 600 }}>
                {biz.licenseLabel ? `${biz.licenseLabel} # ` : 'LICENSE # '}{biz.license}
              </p>
            )}
          </div>

          {/* Column 2: Services / Contact Info */}
          <div>
            <h3 className="font-[family-name:var(--font-figtree)]" style={{ fontSize: '14px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '16px', color: '#ffffff' }}>
              Contact Info
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px', overflowWrap: 'break-word', wordBreak: 'break-word' }}>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13px', color: '#d1d5db', fontFamily: 'var(--font-poppins)' }}>
                <svg width="14" height="14" fill="#64B5F6" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                {biz.address.full}
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13px', fontFamily: 'var(--font-poppins)' }}>
                <svg width="14" height="14" fill="none" stroke="#64B5F6" viewBox="0 0 24 24" style={{ flexShrink: 0, marginTop: '3px' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <Link href={`tel:${biz.phoneRaw}`} style={{ color: '#d1d5db', textDecoration: 'none' }}>
                  {biz.phoneSlogan}
                </Link>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13px', fontFamily: 'var(--font-poppins)' }}>
                <svg width="14" height="14" fill="none" stroke="#64B5F6" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <Link href={`mailto:${biz.email}`} style={{ color: '#d1d5db', textDecoration: 'none', overflowWrap: 'break-word', wordBreak: 'break-all' }}>
                  {biz.email}
                </Link>
              </li>
            </ul>
            {/* Social Icons */}
            <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
              {biz.social.facebook && (
                <Link
                  href={biz.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  style={{ width: '32px', height: '32px', borderRadius: '4px', backgroundColor: '#1e2040', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}
                >
                  <svg width="16" height="16" fill="#ffffff" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </Link>
              )}
              {biz.social.linkedin && (
                <Link
                  href={biz.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  style={{ width: '32px', height: '32px', borderRadius: '4px', backgroundColor: '#1e2040', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}
                >
                  <svg width="16" height="16" fill="#ffffff" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </Link>
              )}
            </div>
          </div>

          {/* Column 3: Quick Links */}
          <div>
            <h3 className="font-[family-name:var(--font-figtree)]" style={{ fontSize: '14px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '16px', color: '#ffffff' }}>
              Quick Links
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { href: '/', label: 'Home' },
                { href: '/about-us', label: 'About Us' },
                { href: '/services', label: 'Services' },
                { href: '/service-area', label: 'Service Area' },
                { href: '/contact-us', label: 'Contact Us' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#d1d5db', textDecoration: 'none', fontSize: '13px', fontFamily: 'var(--font-poppins)' }}>
                    <span style={{ color: '#64B5F6', fontSize: '14px' }}>›</span> {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Find Us (Interactive Map) */}
          <div>
            <h3 className="font-[family-name:var(--font-figtree)]" style={{ fontSize: '14px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '16px', color: '#ffffff' }}>
              Find Us
            </h3>
            <div style={{ borderRadius: '4px', overflow: 'hidden' }}>
              {biz.googleMapsEmbed ? (
                <iframe
                  src={biz.googleMapsEmbed}
                  width="100%"
                  height="180"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={biz.name}
                />
              ) : (
                <div style={{ height: '180px', backgroundColor: '#1e2040', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9ca3af', fontSize: '13px' }}>
                  <p>{biz.address.full}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div style={{ borderTop: '1px solid #1a2a42', padding: '16px 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
          <p style={{ fontSize: '12px', color: '#9ca3af', fontFamily: 'var(--font-poppins)' }}>
            &copy; {new Date().getFullYear()} All rights reserved. {biz.name}.
          </p>
          <div style={{ display: 'flex', gap: '16px' }}>
            <Link href="/privacy-policy" style={{ fontSize: '12px', color: '#9ca3af', textDecoration: 'none', fontFamily: 'var(--font-poppins)' }}>
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" style={{ fontSize: '12px', color: '#9ca3af', textDecoration: 'none', fontFamily: 'var(--font-poppins)' }}>
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
