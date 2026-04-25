import Link from 'next/link';
import type { Metadata } from 'next';
import { getBusiness } from '@/lib/data';
import { getPublishedArticles, Article } from '@/lib/articles';
import Breadcrumbs from '@/components/Breadcrumbs';

const biz = getBusiness();

export const metadata: Metadata = {
  title: `Appliance Repair Tips & Guides | ${biz.name}`,
  description: `Expert appliance repair tips, maintenance guides, and local service insights from ${biz.name} in ${biz.address.city}, ${biz.address.state}. Stay informed with our latest articles.`,
  alternates: { canonical: `${biz.url}/resources` },
};

export default function ResourcesPage() {
  const articles = getPublishedArticles();

  return (
    <>
      <Breadcrumbs items={[{ label: 'Resources', href: '/resources' }]} />

      {/* Hero */}
      <section style={{ backgroundColor: '#f8fafc', padding: '48px 20px 40px', textAlign: 'center' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 className="font-[family-name:var(--font-figtree)]" style={{ fontSize: 'clamp(28px, 5vw, 40px)', fontWeight: 800, color: '#0F1B2D', marginBottom: '12px' }}>
            Appliance Repair Tips &amp; Guides
          </h1>
          <p style={{ fontSize: '17px', color: '#6b7280', lineHeight: '1.7', fontFamily: 'var(--font-poppins)' }}>
            Expert advice from {biz.name} to help you keep your home appliances running smoothly.
          </p>
        </div>
      </section>

      {/* Articles Grid */}
      <section style={{ padding: '48px 20px 64px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          {articles.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#9ca3af', fontSize: '16px', fontFamily: 'var(--font-poppins)', padding: '48px 0' }}>
              Articles coming soon — check back shortly!
            </p>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '28px' }}>
              {articles.map((article: Article) => (
                <Link
                  key={article.slug}
                  href={`/resources/${article.slug}`}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <article style={{
                    border: '1px solid #e5e7eb',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    transition: 'box-shadow 0.2s, transform 0.2s',
                    backgroundColor: '#fff',
                  }}
                    className="blog-card"
                  >
                    <div style={{ padding: '24px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                        <span style={{ fontSize: '12px', fontWeight: 600, color: '#1565C0', backgroundColor: '#e3f2fd', padding: '4px 10px', borderRadius: '20px', fontFamily: 'var(--font-figtree)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                          {article.category}
                        </span>
                        {article.publishDate && (
                          <span style={{ fontSize: '12px', color: '#9ca3af', fontFamily: 'var(--font-poppins)' }}>
                            {new Date(article.publishDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </span>
                        )}
                      </div>
                      <h2 className="font-[family-name:var(--font-figtree)]" style={{ fontSize: '19px', fontWeight: 700, color: '#0F1B2D', marginBottom: '10px', lineHeight: '1.35' }}>
                        {article.title}
                      </h2>
                      <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: '1.6', fontFamily: 'var(--font-poppins)', marginBottom: '16px' }}>
                        {article.excerpt}
                      </p>
                      <span style={{ fontSize: '14px', fontWeight: 600, color: '#1565C0', fontFamily: 'var(--font-figtree)' }}>
                        Read More →
                      </span>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
