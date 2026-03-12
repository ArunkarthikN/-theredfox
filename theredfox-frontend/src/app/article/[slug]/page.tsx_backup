import { Metadata } from 'next';
import Navbar from "../../../components/Navbar";
import Link from "next/link";
import { notFound } from "next/navigation";

// --- DYNAMIC SEO METADATA GENERATOR ---
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { slug } = params;
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:5000/api';

  try {
    // Fetch ONLY the specific article by slug
    const res = await fetch(`${apiUrl}/articles/post/${slug}`, { cache: 'no-store' });
    const article = await res.json();

    if (!article || article.error) {
      return { title: 'Article Not Found | The Red Fox' };
    }

    return {
      title: `${article.title} | The Red Fox`,
      description: article.meta_description || article.summary || "Latest news from The Red Fox.",
      openGraph: {
        title: article.title,
        description: article.summary,
        images: [article.image || '/logo.png'],
        type: 'article',
        url: `https://theredfox.us/article/${slug}`,
      },
      twitter: {
        card: 'summary_large_image',
        title: article.title,
        description: article.summary,
        images: [article.image || '/logo.png'],
      }
    };
  } catch (error) {
    return { title: 'The Red Fox News' };
  }
}

// --- MAIN PAGE COMPONENT ---
export default async function ArticleDetail({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:5000/api';

  // Fetch only this specific article
  const res = await fetch(`${apiUrl}/articles/post/${slug}`, { cache: 'no-store' });
  
  if (!res.ok) {
    return notFound(); // Triggers the standard Next.js 404
  }

  const article = await res.json();

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <Navbar />

      <article className="max-w-4xl mx-auto bg-white shadow-md mt-8 p-6 md:p-10 rounded-xl">
        {/* --- HEADER SECTION --- */}
        <header className="mb-8 border-b pb-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              {article.category || 'General'}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight mb-6">
            {article.title}
          </h1>

          <div className="flex items-center text-sm text-gray-500 gap-4">
            <span className="font-medium">
              {new Date(article.published_at || article.created_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
            {article.source && (
              <>
                <span>•</span>
                <a href={article.source_url} target="_blank" rel="noopener noreferrer" className="text-red-600 font-bold hover:underline">
                  Source: {article.source}
                </a>
              </>
            )}
          </div>
        </header>

        {/* --- IMAGE SECTION --- */}
        {article.image && (
          <div className="mb-10 rounded-2xl overflow-hidden shadow-lg border border-gray-100">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-auto object-cover max-h-[500px]"
            />
          </div>
        )}

        {/* --- CONTENT SECTION --- */}
        <div
          className="prose prose-lg prose-red max-w-none text-gray-800 leading-relaxed font-serif"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {/* --- FOOTER SECTION --- */}
        <footer className="mt-12 pt-8 border-t border-gray-100">
          <Link href="/" className="inline-flex items-center text-red-600 font-black text-lg hover:translate-x-[-4px] transition-transform">
            <span className="mr-2 text-2xl">←</span> Back to Latest News
          </Link>
        </footer>
      </article>
    </div>
  );
}
