'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { getBusiness, getAllServices } from '@/lib/data';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [locationsOpen, setLocationsOpen] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(66);
  const servicesRef = useRef<HTMLDivElement>(null);
  const locationsRef = useRef<HTMLDivElement>(null);
  const biz = getBusiness();
  const services = getAllServices();
  const pathname = usePathname();

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (servicesRef.current && !servicesRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
      if (locationsRef.current && !locationsRef.current.contains(e.target as Node)) {
        setLocationsOpen(false);
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
          border-bottom: 1px solid #e5e7eb;
        }
        .nm-navbar-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .nm-logo {
          flex-shrink: 0;
        }
        .nm-logo img {
          height: 60px;
          width: auto;
        }
        .nm-nav-links {
          display: flex;
          align-items: center;
          gap: 0;
          margin-left: auto;
        }
        .nm-nav-links a,
        .nm-nav-links button.nm-dropdown-trigger {
          color: #0F1B2D;
          font-weight: 500;
          font-size: 14px;
          padding: 22px 14px;
          text-decoration: none;
          transition: color 0.2s;
          background: none;
          border: none;
          cursor: pointer;
          font-family: var(--font-poppins);
          white-space: nowrap;
        }
        .nm-nav-links a:hover,
        .nm-nav-links button.nm-dropdown-trigger:hover {
          color: #1565C0;
        }
        .nm-nav-links a.nm-active {
          color: #1565C0;
          border-bottom: 3px solid #1565C0;
        }
        .nm-dropdown-wrap {
          position: relative;
        }
        .nm-dropdown-trigger {
          display: inline-flex;
          align-items: center;
          gap: 5px;
        }
        .nm-dropdown-trigger svg {
          width: 10px;
          height: 10px;
          transition: transform 0.2s;
        }
        .nm-dropdown-trigger.open svg {
          transform: rotate(180deg);
        }
        .nm-dropdown-menu {
          position: absolute;
          top: 100%;
          left: 0;
          background: #ffffff;
          border: 1px solid #e5e7eb;
          box-shadow: 0 10px 25px rgba(0,0,0,0.12);
          min-width: 260px;
          z-index: 100;
          padding: 8px 0;
        }
        .nm-dropdown-menu a {
          display: block;
          padding: 10px 20px !important;
          color: #0F1B2D !important;
          font-size: 14px !important;
          font-weight: 400 !important;
          border-bottom: 1px solid #f3f4f6;
          transition: color 0.2s, background-color 0.2s;
        }
        .nm-dropdown-menu a:hover {
          color: #1565C0 !important;
          background-color: #f0f7ff;
        }
        .nm-hamburger {
          display: none;
        }
        @media (max-width: 1023px) {
          .nm-navbar-inner {
            padding: 0 1rem;
          }
          .nm-logo img {
            height: 50px;
          }
          .nm-nav-links {
            display: none !important;
          }
          .nm-hamburger {
            display: flex !important;
            flex-direction: column;
            gap: 5px;
            padding: 10px;
            background: none;
            border: none;
            cursor: pointer;
            align-items: center;
            justify-content: center;
          }
          .nm-hamburger span {
            display: block;
            width: 22px;
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
          {/* Logo */}
          <Link href="/" className="nm-logo">
            <Image
              src="/images/logo.webp"
              alt={biz.name}
              width={320}
              height={126}
              style={{ height: '60px', width: 'auto' }}
              priority
            />
          </Link>

          {/* Desktop Nav Links */}
          <div className="nm-nav-links">
            <Link href="/" className={isActive('/') ? 'nm-active' : ''}>
              Home
            </Link>

            {/* Services with dropdown */}
            <div className="nm-dropdown-wrap" ref={servicesRef}>
              <button
                className={`nm-dropdown-trigger ${servicesOpen ? 'open' : ''} ${isServicesActive ? 'nm-active' : ''}`}
                onClick={() => { setServicesOpen(!servicesOpen); setLocationsOpen(false); }}
              >
                Services
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {servicesOpen && (
                <div className="nm-dropdown-menu">
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

            {/* Locations with dropdown */}
            <div className="nm-dropdown-wrap" ref={locationsRef}>
              <button
                className={`nm-dropdown-trigger ${locationsOpen ? 'open' : ''} ${isActive('/service-area') ? 'nm-active' : ''}`}
                onClick={() => { setLocationsOpen(!locationsOpen); setServicesOpen(false); }}
              >
                Locations
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {locationsOpen && (
                <div className="nm-dropdown-menu">
                  <Link href="/service-area" onClick={() => setLocationsOpen(false)}>All Locations</Link>
                  <Link href="/aurora" onClick={() => setLocationsOpen(false)}>Aurora</Link>
                  <Link href="/joliet" onClick={() => setLocationsOpen(false)}>Joliet</Link>
                  <Link href="/" onClick={() => setLocationsOpen(false)}>Naperville</Link>
                  <Link href="/plainfield" onClick={() => setLocationsOpen(false)}>Plainfield</Link>
                </div>
              )}
            </div>

            <Link href="/appliance-rental" className={isActive('/appliance-rental') ? 'nm-active' : ''}>
              Appliance Rental
            </Link>
            <Link href="/reviews" className={isActive('/reviews') ? 'nm-active' : ''}>
              Reviews
            </Link>
            <Link href="/blog" className={pathname.startsWith('/blog') ? 'nm-active' : ''}>
              Blog
            </Link>
            <Link href="/about-us" className={isActive('/about-us') ? 'nm-active' : ''}>
              About Us
            </Link>
            <Link href="/contact-us" className={isActive('/contact-us') ? 'nm-active' : ''}>
              Contact
            </Link>
          </div>

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
              <Link href="/" style={{ display: 'block', color: '#fff', padding: '12px 8px', borderBottom: '1px solid rgba(255,255,255,0.1)', textDecoration: 'none', fontSize: '14px' }} onClick={() => setIsOpen(false)}>Home</Link>
              <Link href="/services" style={{ display: 'block', color: '#fff', padding: '12px 8px', borderBottom: '1px solid rgba(255,255,255,0.1)', textDecoration: 'none', fontSize: '14px' }} onClick={() => setIsOpen(false)}>Services</Link>
              <Link href="/service-area" style={{ display: 'block', color: '#fff', padding: '12px 8px', borderBottom: '1px solid rgba(255,255,255,0.1)', textDecoration: 'none', fontSize: '14px' }} onClick={() => setIsOpen(false)}>Locations</Link>
              <Link href="/appliance-rental" style={{ display: 'block', color: '#fff', padding: '12px 8px', borderBottom: '1px solid rgba(255,255,255,0.1)', textDecoration: 'none', fontSize: '14px' }} onClick={() => setIsOpen(false)}>Appliance Rental</Link>
              <Link href="/reviews" style={{ display: 'block', color: '#fff', padding: '12px 8px', borderBottom: '1px solid rgba(255,255,255,0.1)', textDecoration: 'none', fontSize: '14px' }} onClick={() => setIsOpen(false)}>Reviews</Link>
              <Link href="/blog" style={{ display: 'block', color: '#fff', padding: '12px 8px', borderBottom: '1px solid rgba(255,255,255,0.1)', textDecoration: 'none', fontSize: '14px' }} onClick={() => setIsOpen(false)}>Blog</Link>
              <Link href="/about-us" style={{ display: 'block', color: '#fff', padding: '12px 8px', borderBottom: '1px solid rgba(255,255,255,0.1)', textDecoration: 'none', fontSize: '14px' }} onClick={() => setIsOpen(false)}>About Us</Link>
              <Link href="/contact-us" style={{ display: 'block', color: '#fff', padding: '12px 8px', borderBottom: '1px solid rgba(255,255,255,0.1)', textDecoration: 'none', fontSize: '14px' }} onClick={() => setIsOpen(false)}>Contact</Link>
              <Link href="/gallery" style={{ display: 'block', color: '#fff', padding: '12px 8px', borderBottom: '1px solid rgba(255,255,255,0.1)', textDecoration: 'none', fontSize: '14px' }} onClick={() => setIsOpen(false)}>Gallery</Link>
              <Link
                href={`tel:${biz.phoneRaw}`}
                style={{ display: 'block', backgroundColor: '#1565C0', color: '#fff', padding: '12px 20px', borderRadius: '4px', fontWeight: 700, fontSize: '14px', textAlign: 'center', marginTop: '8px', textDecoration: 'none' }}
                onClick={() => setIsOpen(false)}
              >
                Call {biz.phone}
              </Link>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
