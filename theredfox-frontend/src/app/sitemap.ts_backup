import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://theredfox.us'

  // Use the env variable OR the local production URL as a fallback
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://theredfox.us/api';

  try {
    const response = await fetch(`${apiUrl}/articles`, {
      next: { revalidate: 3600 } // Cache for 1 hour to keep it fresh
    });

    if (!response.ok) throw new Error('Failed to fetch articles');

    const articles = await response.json();

    // UPDATED: Now mapping to slugs instead of IDs for better SEO
    const articleEntries = articles.map((article: any) => ({
      // Use slug for the URL. If slug is missing, use ID as a fallback.
      url: `${baseUrl}/article/${article.slug || article.id}`,
      lastModified: new Date(article.updated_at || article.created_at),
      changeFrequency: 'daily',
      priority: 0.7,
    }));

    const staticPages = [
      { url: baseUrl, lastModified: new Date(), changeFrequency: 'always', priority: 1 },
      { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
      { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
      { url: `${baseUrl}/privacy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
      { url: `${baseUrl}/terms`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    ];

    return [...staticPages, ...articleEntries];
  } catch (error) {
    console.error("Sitemap build error:", error);
    // Return at least the static pages if the API fetch fails during build
    return [
      { url: baseUrl, lastModified: new Date(), changeFrequency: 'always', priority: 1 },
      { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    ];
  }
}
