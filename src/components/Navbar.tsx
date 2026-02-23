'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getBusiness, getAllServices } from '@/lib/data';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(66);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const biz = getBusiness();
  const services = getAllServices();
  const pathname = usePathname();

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const header = document.querySelector('header');
    if (header) {
      const update = () => setHeaderHeight(header.offsetHeight);
      update();
      window.addEventListener('resize', update);
      return () => window.removeEventListener('resize', update);
    }
  }, []);

  const isActive = (href: string) => pathname === href;
  const isServicesActive = pathname.startsWith('/services');

  return (
    <>
      <style>{`
        .nm-navbar {
          background-color: #ffffff;
          border-top: 3px solid #1565C0;
        }
        .nm-navbar-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }
        .nm-nav-links {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0;
        }
        .nm-nav-links a,
        .nm-nav-links button.nm-services-trigger {
          color: #0F1B2D;
          font-weight: 500;
          font-size: 14px;
          letter-spacing: 0.025em;
          padding: 15px 14px;
          text-decoration: none;
          transition: color 0.2s;
          background: none;
          border: none;
          cursor: pointer;
          font-family: inherit;
          white-space: nowrap;
        }
        .nm-nav-links a:hover,
        .nm-nav-links button.nm-services-trigger:hover {
          color: #1E88E5;
        }
        .nm-nav-links a.nm-active {
          color: #1565C0;
          border-bottom: 3px solid #1565C0;
        }
        .nm-services-wrap {
          position: relative;
        }
        .nm-services-trigger {
          display: inline-flex;
          align-items: center;
          gap: 5px;
        }
        .nm-services-trigger svg {
          width: 12px;
          height: 12px;
          transition: transform 0.2s;
        }
        .nm-services-trigger.open svg {
          transform: rotate(180deg);
        }
        .nm-services-dropdown {
          position: absolute;
          top: 100%;
          left: 0;
          background: #ffffff;
          border: 1px solid #e5e7eb;
          box-shadow: 0 10px 25px rgba(0,0,0,0.15);
          min-width: 280px;
          z-index: 100;
          padding: 8px 0;
        }
        .nm-services-dropdown a {
          display: block;
          padding: 10px 20px !important;
          color: #0F1B2D !important;
          font-size: 14px !important;
          font-weight: 400 !important;
          border-bottom: 1px solid #f3f4f6;
          transition: color 0.2s, background-color 0.2s;
        }
        .nm-services-dropdown a:hover {
          color: #1E88E5 !important;
          background-color: #f0f7ff;
        }
        .nm-services-dropdown a:first-child {
          color: #1565C0 !important;
          font-weight: 500 !important;
        }
        .nm-call-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background-color: #1565C0;
          color: #ffffff;
          padding: 10px 20px;
          border-radius: 4px;
          font-weight: 700;
          font-size: 14px;
          text-decoration: none;
          white-space: nowrap;
          transition: background-color 0.2s;
          position: absolute;
          right: 1rem;
          border: 2px solid #1565C0;
        }
        .nm-call-btn:hover {
          background-color: #0D47A1;
          border-color: #0D47A1;
        }
        .nm-hamburger {
          display: none;
        }
        @media (max-width: 1023px) {
          .nm-navbar {
            background-color: transparent;
            border-top: none;
            position: absolute;
            top: 0;
            right: 0;
            height: 100%;
            z-index: 10;
          }
          .nm-navbar-inner {
            height: 100%;
            padding: 0;
          }
          .nm-nav-links {
            display: none !important;
          }
          .nm-call-btn {
            display: none !important;
          }
          .nm-hamburger {
            display: flex !important;
            flex-direction: column;
            gap: 6px;
            padding: 12px 16px;
            background: none;
            border: none;
            cursor: pointer;
            height: 100%;
            align-items: center;
            justify-content: center;
          }
          .nm-hamburger span {
            display: block;
            width: 24px;
            height: 2px;
            background: #0F1B2D;
          }
          .nm-mobile-menu {
            position: fixed;
            left: 0;
            right: 0;
            z-index: 9998;
          }
        }
      `}</style>
      <nav className="nm-navbar">
        <div className="nm-navbar-inner">
          {/* Desktop Nav Links */}
          <div className="nm-nav-links">
            <Link href="/" className={isActive('/') ? 'nm-active' : ''}>
              HOME
            </Link>

            {/* Services with dropdown */}
            <div className="nm-services-wrap" ref={dropdownRef}>
              <button
                className={`nm-services-trigger ${servicesOpen ? 'open' : ''} ${isServicesActive ? 'nm-active' : ''}`}
                onClick={() => setServicesOpen(!servicesOpen)}
              >
                SERVICES
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {servicesOpen && (
                <div className="nm-services-dropdown">
                  {services.map((service) => (
                    <Link
                      key={service.slug}
                      href={`/services/${service.slug}`}
                      onClick={() => setServicesOpen(false)}
                    >
                      {service.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link href="/service-area" className={isActive('/service-area') ? 'nm-active' : ''}>
              LOCATIONS
            </Link>
            <Link href="/appliance-rental" className={isActive('/appliance-rental') ? 'nm-active' : ''}>
              APPLIANCE RENTAL
            </Link>
            <Link href="/reviews" className={isActive('/reviews') ? 'nm-active' : ''}>
              REVIEWS
            </Link>
            <Link href="/about-us" className={isActive('/about-us') ? 'nm-active' : ''}>
              ABOUT US
            </Link>
            <Link href="/contact-us" className={isActive('/contact-us') ? 'nm-active' : ''}>
              CONTACT
            </Link>
          </div>

          {/* CALL US button — top right */}
          <Link href={`tel:${biz.phoneRaw}`} className="nm-call-btn">
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            {biz.phone}
          </Link>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="nm-hamburger"
            aria-label="Toggle navigation menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="nm-mobile-menu" style={{ backgroundColor: '#0F1B2D', borderTop: 'none', top: `${headerHeight}px` }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '1rem' }}>
              <Link href="/" style={{ display: 'block', color: '#fff', padding: '12px 8px', borderBottom: '1px solid rgba(255,255,255,0.1)', textDecoration: 'none', fontSize: '14px' }} onClick={() => setIsOpen(false)}>HOME</Link>
              <Link href="/services" style={{ display: 'block', color: '#fff', padding: '12px 8px', borderBottom: '1px solid rgba(255,255,255,0.1)', textDecoration: 'none', fontSize: '14px' }} onClick={() => setIsOpen(false)}>SERVICES</Link>
              <Link href="/service-area" style={{ display: 'block', color: '#fff', padding: '12px 8px', borderBottom: '1px solid rgba(255,255,255,0.1)', textDecoration: 'none', fontSize: '14px' }} onClick={() => setIsOpen(false)}>LOCATIONS</Link>
              <Link href="/appliance-rental" style={{ display: 'block', color: '#fff', padding: '12px 8px', borderBottom: '1px solid rgba(255,255,255,0.1)', textDecoration: 'none', fontSize: '14px' }} onClick={() => setIsOpen(false)}>APPLIANCE RENTAL</Link>
              <Link href="/reviews" style={{ display: 'block', color: '#fff', padding: '12px 8px', borderBottom: '1px solid rgba(255,255,255,0.1)', textDecoration: 'none', fontSize: '14px' }} onClick={() => setIsOpen(false)}>REVIEWS</Link>
              <Link href="/about-us" style={{ display: 'block', color: '#fff', padding: '12px 8px', borderBottom: '1px solid rgba(255,255,255,0.1)', textDecoration: 'none', fontSize: '14px' }} onClick={() => setIsOpen(false)}>ABOUT US</Link>
              <Link href="/contact-us" style={{ display: 'block', color: '#fff', padding: '12px 8px', borderBottom: '1px solid rgba(255,255,255,0.1)', textDecoration: 'none', fontSize: '14px' }} onClick={() => setIsOpen(false)}>CONTACT US</Link>
              <Link href="/gallery" style={{ display: 'block', color: '#fff', padding: '12px 8px', borderBottom: '1px solid rgba(255,255,255,0.1)', textDecoration: 'none', fontSize: '14px' }} onClick={() => setIsOpen(false)}>GALLERY</Link>
              <Link
                href={`tel:${biz.phoneRaw}`}
                style={{ display: 'block', backgroundColor: '#1565C0', color: '#fff', padding: '12px 20px', borderRadius: '4px', fontWeight: 700, fontSize: '14px', textAlign: 'center', marginTop: '8px', textDecoration: 'none' }}
                onClick={() => setIsOpen(false)}
              >
                CALL {biz.phone}
              </Link>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
