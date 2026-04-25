import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getBusiness } from '@/lib/data';
import { getArticleBySlug, getPublishedArticleSlugs } from '@/lib/articles';
import Breadcrumbs from '@/components/Breadcrumbs';
import CTABand from '@/components/CTABand';

const biz = getBusiness();

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

      <article style={{ padding: '40px 20px 64px' }}>
        <div style={{ maxWidth: '780px', margin: '0 auto' }}>
          {/* Header */}
          <header style={{ marginBottom: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '12px', fontWeight: 600, color: '#1565C0', backgroundColor: '#e3f2fd', padding: '4px 12px', borderRadius: '20px', fontFamily: 'var(--font-figtree)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                {article.category}
              </span>
              {publishDateFormatted && (
                <span style={{ fontSize: '13px', color: '#9ca3af', fontFamily: 'var(--font-poppins)' }}>
                  {publishDateFormatted}
                </span>
              )}
              <span style={{ fontSize: '13px', color: '#9ca3af', fontFamily: 'var(--font-poppins)' }}>
                · By {article.author}
              </span>
            </div>
            <h1 className="font-[family-name:var(--font-figtree)]" style={{ fontSize: 'clamp(26px, 5vw, 38px)', fontWeight: 800, color: '#0F1B2D', lineHeight: '1.25', marginBottom: '0' }}>
              {article.title}
            </h1>
          </header>

          {/* Body */}
          <div
            className="article-body font-[family-name:var(--font-poppins)]"
            style={{ fontSize: '16px', lineHeight: '1.8', color: '#374151' }}
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* Tags */}
          {article.tags.length > 0 && (
            <div style={{ marginTop: '40px', paddingTop: '24px', borderTop: '1px solid #e5e7eb' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{ fontSize: '12px', color: '#6b7280', backgroundColor: '#f3f4f6', padding: '4px 12px', borderRadius: '20px', fontFamily: 'var(--font-poppins)' }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>

      <CTABand />
    </>
  );
}
