// Path: ~/theredfox/theredfox-frontend/src/app/sitemap.ts
import { MetadataRoute } from 'next';

// This forces the sitemap to be re-generated on every request
export const revalidate = 3600; // Cache for 1 hour

async function getSitemapArticles() {
  try {
    // We fetch a larger limit to ensure all articles and categories are found
    const res = await fetch('http://127.0.0.1:5000/api/articles?limit=1000', {
      next: { revalidate: 3600 }
    });
    
    if (!res.ok) return [];
    const data = await res.json();
    return data.articles || [];
  } catch (error) {
    console.error("Sitemap fetch error:", error);
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://theredfox.us';
  
  // 1. Fetch all articles from your DB
  const articles = await getSitemapArticles();

  // 2. Map articles to sitemap format
  const articleUrls = articles.map((article: any) => ({
    url: `${baseUrl}/article/${article.slug}`,
    lastModified: new Date(article.published_at || article.created_at),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // 3. Dynamically extract unique categories from articles
  // This ensures that if a new category like "Sports" is added, it shows up automatically.
  const uniqueCategories = Array.from(
    new Set(articles.map((a: any) => a.category?.toLowerCase()).filter(Boolean))
  );

  const categoryUrls = uniqueCategories.map((category) => ({
    url: `${baseUrl}/category/${category}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.8,
  }));

  // 4. Define your truly static pages (Home, About, etc.)
  const basePages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'always' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
  ];

  // Combine everything: Base pages + Dynamic Categories + Articles
  return [...basePages, ...categoryUrls, ...articleUrls];
}
