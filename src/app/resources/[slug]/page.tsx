import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { getBusiness, getAllServices } from '@/lib/data';
import { getArticleBySlug, getPublishedArticleSlugs, getPublishedArticles } from '@/lib/articles';
import Breadcrumbs from '@/components/Breadcrumbs';
import CTABand from '@/components/CTABand';

const biz = getBusiness();
const services = getAllServices();

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getPublishedArticleSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};

  return {
    title: article.metaTitle,
    description: article.metaDescription,
    alternates: { canonical: `${biz.url}/resources/${slug}` },
    openGraph: {
      title: article.metaTitle,
      description: article.metaDescription,
      type: 'article',
      publishedTime: article.publishDate || undefined,
      authors: [article.author],
    },
  };
}

export default async function ResourceArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const allPublished = getPublishedArticles();
  const relatedArticles = allPublished.filter(a => a.slug !== slug).slice(0, 4);

  const publishDateFormatted = article.publishDate
    ? new Date(article.publishDate).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : '';

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.metaDescription,
    author: { '@type': 'Organization', name: biz.name },
    publisher: {
      '@type': 'Organization',
      name: biz.name,
      logo: { '@type': 'ImageObject', url: `${biz.url}/images/logo.webp` },
    },
    datePublished: article.publishDate,
    mainEntityOfPage: `${biz.url}/resources/${slug}`,
  };

  const sidebarCard: React.CSSProperties = {
    backgroundColor: '#fff',
    border: '1px solid #e5e7eb',
    borderRadius: '12px',
    padding: '24px',
    marginBottom: '20px',
  };
  const sidebarTitle: React.CSSProperties = {
    fontSize: '16px',
    fontWeight: 700,
    color: '#0F1B2D',
    marginBottom: '16px',
    fontFamily: 'var(--font-figtree)',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <Breadcrumbs items={[
        { label: 'Resources', href: '/resources' },
        { label: article.title, href: `/resources/${slug}` },
      ]} />

      {/* Article Header - Full Width */}
      <div style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e5e7eb', padding: '36px 20px 32px' }}>
        <div style={{ maxWidth: '1140px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '12px', fontWeight: 600, color: '#1565C0', backgroundColor: '#e3f2fd', padding: '5px 14px', borderRadius: '20px', fontFamily: 'var(--font-figtree)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              {article.category}
            </span>
            {publishDateFormatted && (
              <span style={{ fontSize: '13px', color: '#6b7280', fontFamily: 'var(--font-poppins)' }}>
                {publishDateFormatted}
              </span>
            )}
            <span style={{ fontSize: '13px', color: '#6b7280', fontFamily: 'var(--font-poppins)' }}>
              · By {article.author}
            </span>
          </div>
          <h1 className="font-[family-name:var(--font-figtree)]" style={{ fontSize: 'clamp(26px, 5vw, 38px)', fontWeight: 800, color: '#0F1B2D', lineHeight: '1.2', margin: 0 }}>
            {article.title}
          </h1>
          <p style={{ fontSize: '17px', color: '#6b7280', lineHeight: '1.6', fontFamily: 'var(--font-poppins)', marginTop: '12px', marginBottom: 0 }}>
            {article.excerpt}
          </p>
        </div>
      </div>

      {/* Main Content + Sidebar */}
      <div style={{ maxWidth: '1140px', margin: '0 auto', padding: '40px 20px 64px', display: 'grid', gridTemplateColumns: '1fr 340px', gap: '40px' }} className="article-layout">
        {/* Left: Article Body */}
        <article>
          <div
            className="article-body font-[family-name:var(--font-poppins)]"
            style={{ fontSize: '16px', lineHeight: '1.85', color: '#374151' }}
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* Tags */}
          {article.tags.length > 0 && (
            <div style={{ marginTop: '40px', paddingTop: '24px', borderTop: '1px solid #e5e7eb' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{ fontSize: '12px', color: '#6b7280', backgroundColor: '#f3f4f6', padding: '5px 14px', borderRadius: '20px', fontFamily: 'var(--font-poppins)' }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </article>

        {/* Right: Sidebar */}
        <aside className="article-sidebar">
          {/* Request Service CTA */}
          <div style={{ ...sidebarCard, backgroundColor: '#0F1B2D', border: 'none', textAlign: 'center' }}>
            <div style={{ fontSize: '20px', fontWeight: 800, color: '#fff', marginBottom: '8px', fontFamily: 'var(--font-figtree)' }}>
              Need Appliance Help?
            </div>
            <p style={{ fontSize: '14px', color: '#94a3b8', lineHeight: '1.6', fontFamily: 'var(--font-poppins)', marginBottom: '18px' }}>
              Same-day &amp; next-day service available throughout DuPage &amp; Will County
            </p>
            <Link
              href="/contact-us"
              style={{ display: 'block', backgroundColor: '#1565C0', color: '#fff', padding: '14px 20px', borderRadius: '8px', fontWeight: 700, fontSize: '15px', textDecoration: 'none', fontFamily: 'var(--font-figtree)', transition: 'background-color 0.2s', textAlign: 'center' }}
            >
              Request Service →
            </Link>
            <Link
              href={`tel:${biz.phoneRaw}`}
              style={{ display: 'block', color: '#64B5F6', fontSize: '14px', fontWeight: 600, marginTop: '12px', textDecoration: 'none', fontFamily: 'var(--font-poppins)' }}
            >
              Or call {biz.phone}
            </Link>
          </div>

          {/* Company Info */}
          <div style={sidebarCard}>
            <div style={sidebarTitle}>
              <svg width="18" height="18" fill="none" stroke="#1565C0" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              {biz.name}
            </div>
            <div style={{ fontSize: '14px', color: '#6b7280', fontFamily: 'var(--font-poppins)', lineHeight: '1.7' }}>
              <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
                <svg width="16" height="16" fill="none" stroke="#9ca3af" strokeWidth="2" viewBox="0 0 24 24" style={{ flexShrink: 0, marginTop: '3px' }}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                <span>{biz.address.full}</span>
              </div>
              <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
                <svg width="16" height="16" fill="none" stroke="#9ca3af" strokeWidth="2" viewBox="0 0 24 24" style={{ flexShrink: 0, marginTop: '3px' }}><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.362 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.574 2.81.7A2 2 0 0122 16.92z"/></svg>
                <Link href={`tel:${biz.phoneRaw}`} style={{ color: '#1565C0', textDecoration: 'none', fontWeight: 600 }}>{biz.phone}</Link>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <svg width="16" height="16" fill="none" stroke="#9ca3af" strokeWidth="2" viewBox="0 0 24 24" style={{ flexShrink: 0, marginTop: '3px' }}><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                <span>Mon–Sat: 8AM–7PM</span>
              </div>
            </div>
            <div style={{ marginTop: '14px', paddingTop: '14px', borderTop: '1px solid #f3f4f6' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div style={{ display: 'flex', gap: '2px' }}>
                  {[1,2,3,4,5].map(i => (
                    <svg key={i} width="14" height="14" fill="#facc15" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                  ))}
                </div>
                <span style={{ fontSize: '13px', fontWeight: 600, color: '#0F1B2D' }}>5.0</span>
                <span style={{ fontSize: '12px', color: '#9ca3af' }}>on Google</span>
              </div>
            </div>
          </div>

          {/* Our Services */}
          <div style={sidebarCard}>
            <div style={sidebarTitle}>
              <svg width="18" height="18" fill="none" stroke="#1565C0" strokeWidth="2" viewBox="0 0 24 24"><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/></svg>
              Our Services
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
              {services.map((s) => (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  style={{ fontSize: '14px', color: '#374151', textDecoration: 'none', padding: '9px 0', borderBottom: '1px solid #f3f4f6', fontFamily: 'var(--font-poppins)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', transition: 'color 0.2s' }}
                >
                  <span>{s.title}</span>
                  <svg width="14" height="14" fill="none" stroke="#9ca3af" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6"/></svg>
                </Link>
              ))}
            </div>
          </div>

          {/* Related Articles */}
          {relatedArticles.length > 0 && (
            <div style={sidebarCard}>
              <div style={sidebarTitle}>
                <svg width="18" height="18" fill="none" stroke="#1565C0" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></svg>
                Related Articles
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                {relatedArticles.map((a) => (
                  <Link
                    key={a.slug}
                    href={`/resources/${a.slug}`}
                    style={{ fontSize: '14px', color: '#374151', textDecoration: 'none', padding: '10px 0', borderBottom: '1px solid #f3f4f6', fontFamily: 'var(--font-poppins)', lineHeight: '1.4', transition: 'color 0.2s' }}
                  >
                    {a.title}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Warranty Badge */}
          <div style={{ ...sidebarCard, background: 'linear-gradient(135deg, #e3f2fd 0%, #f0f7ff 100%)', border: '2px solid #1565C0', textAlign: 'center' }}>
            <div style={{ fontSize: '32px', marginBottom: '4px' }}>🛡️</div>
            <div style={{ fontSize: '18px', fontWeight: 800, color: '#0F1B2D', fontFamily: 'var(--font-figtree)', marginBottom: '6px' }}>
              90-Day Warranty
            </div>
            <p style={{ fontSize: '13px', color: '#6b7280', lineHeight: '1.5', fontFamily: 'var(--font-poppins)', margin: 0 }}>
              Every repair backed by our 90-day warranty on all parts &amp; labor
            </p>
          </div>
        </aside>
      </div>

      <CTABand />
    </>
  );
}
