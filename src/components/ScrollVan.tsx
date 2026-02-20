'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

export default function ScrollVan() {
  const vanRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    function handleScroll() {
      // Complete effect within ~25% of viewport scroll
      const heroHeight = window.innerHeight * 0.22;
      const scrollY = window.scrollY;
      const progress = Math.min(Math.max(scrollY / heroHeight, 0), 1);
      setScrollProgress(progress);
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Move much more toward center and grow faster
  const translateX = 0 - (scrollProgress * 55); // 0% -> -55%
  const scale = 1.05 + (scrollProgress * 0.4); // 1.05 -> 1.45

  return (
    <div
      ref={vanRef}
      style={{
        position: 'absolute',
        bottom: '0',
        right: '5%',
        zIndex: 20,
        transform: `translateX(${translateX}%) scale(${scale})`,
        transformOrigin: 'bottom right',
        transition: 'transform 0.05s linear',
        width: '450px',
        pointerEvents: 'none',
      }}
      className="hidden lg:block"
    >
      <Image
        src="/images/hero-vehicle.webp"
        alt="Service vehicle"
        width={750}
        height={300}
        style={{ width: '100%', height: 'auto' }}
        priority
      />
    </div>
  );
}
