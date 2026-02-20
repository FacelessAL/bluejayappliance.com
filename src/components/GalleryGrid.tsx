'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';

interface GalleryImage {
  filename: string;
  path: string;
  alt: string;
  city: string;
  category: string;
  label: string;
}

interface GalleryGridProps {
  images: Record<string, GalleryImage[]>;
}

const CATEGORIES = [
  { key: 'all', label: 'All Photos' },
  { key: 'refrigerator', label: 'Refrigerator & Freezer' },
  { key: 'stove-oven-range', label: 'Stove, Oven & Range' },
  { key: 'washer', label: 'Washer' },
  { key: 'dryer', label: 'Dryer' },
  { key: 'dishwasher', label: 'Dishwasher' },
];

const ITEMS_PER_PAGE = 24;

export default function GalleryGrid({ images }: GalleryGridProps) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [lightbox, setLightbox] = useState<GalleryImage | null>(null);

  const allImages = useMemo(() => {
    const combined: GalleryImage[] = [];
    for (const cat of Object.keys(images)) {
      combined.push(...images[cat]);
    }
    return combined;
  }, [images]);

  const filtered = useMemo(() => {
    setVisibleCount(ITEMS_PER_PAGE);
    if (activeCategory === 'all') return allImages;
    return allImages.filter((img) => img.category === activeCategory);
  }, [activeCategory, allImages]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  const getCategoryCount = (key: string) => {
    if (key === 'all') return allImages.length;
    return images[key]?.length || 0;
  };

  return (
    <>
      {/* Filter Buttons */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px', marginBottom: '40px' }}>
        {CATEGORIES.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setActiveCategory(cat.key)}
            className="font-[family-name:var(--font-figtree)]"
            style={{
              padding: '10px 20px',
              borderRadius: '50px',
              fontWeight: 700,
              fontSize: '14px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.2s',
              backgroundColor: activeCategory === cat.key ? '#1565C0' : '#e5e7eb',
              color: activeCategory === cat.key ? '#ffffff' : '#374151',
            }}
          >
            {cat.label} ({getCategoryCount(cat.key)})
          </button>
        ))}
      </div>

      {/* Results count */}
      <p style={{ textAlign: 'center', color: '#6b7280', fontSize: '14px', marginBottom: '24px', fontFamily: 'var(--font-poppins)' }}>
        Showing {Math.min(visibleCount, filtered.length)} of {filtered.length} photos
      </p>

      {/* Image Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '16px',
      }}>
        {visible.map((img, i) => (
          <div
            key={`${img.filename}-${i}`}
            onClick={() => setLightbox(img)}
            style={{
              position: 'relative',
              aspectRatio: '4/3',
              overflow: 'hidden',
              borderRadius: '8px',
              cursor: 'pointer',
              backgroundColor: '#f3f4f6',
            }}
            className="group"
          >
            <Image
              src={img.path}
              alt={img.alt}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              loading="lazy"
            />
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
                padding: '24px 12px 12px',
                opacity: 0,
                transition: 'opacity 0.2s',
              }}
              className="group-hover:!opacity-100"
            >
              <span style={{ color: '#ffffff', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                {img.label}
              </span>
              <br />
              <span style={{ color: '#d1d5db', fontSize: '11px' }}>
                {img.city.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}, IL
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Load More */}
      {hasMore && (
        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <button
            onClick={() => setVisibleCount((prev) => prev + ITEMS_PER_PAGE)}
            className="font-[family-name:var(--font-figtree)]"
            style={{
              backgroundColor: '#1565C0',
              color: '#ffffff',
              padding: '14px 36px',
              borderRadius: '4px',
              fontWeight: 700,
              fontSize: '15px',
              textTransform: 'uppercase',
              border: 'none',
              cursor: 'pointer',
              letterSpacing: '0.5px',
            }}
          >
            Load More Photos ({filtered.length - visibleCount} remaining)
          </button>
        </div>
      )}

      {/* Lightbox Modal */}
      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            backgroundColor: 'rgba(0,0,0,0.9)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            cursor: 'pointer',
          }}
        >
          <button
            onClick={() => setLightbox(null)}
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              backgroundColor: 'transparent',
              border: 'none',
              color: '#ffffff',
              fontSize: '36px',
              cursor: 'pointer',
              zIndex: 10000,
              lineHeight: 1,
            }}
            aria-label="Close lightbox"
          >
            &times;
          </button>
          <div style={{ position: 'relative', width: '100%', maxWidth: '900px', aspectRatio: '4/3' }}>
            <Image
              src={lightbox.path}
              alt={lightbox.alt}
              fill
              className="object-contain"
              sizes="90vw"
              priority
            />
          </div>
          <div style={{ position: 'absolute', bottom: '24px', left: 0, right: 0, textAlign: 'center' }}>
            <p style={{ color: '#ffffff', fontSize: '14px', fontWeight: 600 }}>{lightbox.alt}</p>
            <p style={{ color: '#9ca3af', fontSize: '12px', marginTop: '4px' }}>
              {lightbox.label} &bull; {lightbox.city.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}, IL
            </p>
          </div>
        </div>
      )}
    </>
  );
}
