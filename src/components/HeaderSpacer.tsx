'use client';

import { useEffect } from 'react';

export default function HeaderSpacer() {
  useEffect(() => {
    const header = document.querySelector('header');
    if (!header) return;

    const update = () => {
      const h = header.offsetHeight;
      document.documentElement.style.setProperty('--header-h', `${h}px`);
    };

    update();
    window.addEventListener('resize', update);
    // Also observe for layout changes (e.g. font loading)
    const ro = new ResizeObserver(update);
    ro.observe(header);

    return () => {
      window.removeEventListener('resize', update);
      ro.disconnect();
    };
  }, []);

  return null;
}
