import articles from '@/data/articles.json';

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  published: boolean;
  publishDate: string | null;
  author: string;
  category: string;
  tags: string[];
  metaTitle: string;
  metaDescription: string;
}

export function getAllArticles(): Article[] {
  return articles as Article[];
}

export function getPublishedArticles(): Article[] {
  const now = new Date();
  return (articles as Article[])
    .filter((a) => a.published && a.publishDate && new Date(a.publishDate) <= now)
    .sort((a, b) => new Date(b.publishDate!).getTime() - new Date(a.publishDate!).getTime());
}

export function getArticleBySlug(slug: string): Article | undefined {
  const article = (articles as Article[]).find((a) => a.slug === slug);
  if (!article) return undefined;
  if (!article.published) return undefined;
  if (article.publishDate && new Date(article.publishDate) > new Date()) return undefined;
  return article;
}

export function getPublishedArticleSlugs(): string[] {
  return getPublishedArticles().map((a) => a.slug);
}
