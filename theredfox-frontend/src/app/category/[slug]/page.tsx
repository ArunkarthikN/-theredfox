import Navbar from "../../../components/Navbar";
import ArticleCard from "../../../components/ArticleCard";
import Link from "next/link";

// Define the shape of the params and searchParams for TypeScript
interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;

  if (slug === 'technology') {
    return {
      title: "Latest Technology News - The Red Fox",
      description: "Stay updated with the latest technological breakthroughs. From Silicon Valley shifts to global software innovations, The Red Fox Technology category provides the news and insights you need to stay ahead.",
    };
  }

  // Default metadata for other categories
  const capitalized = slug.charAt(0).toUpperCase() + slug.slice(1);
  return {
    title: `${capitalized} News - The Red Fox`,
    description: `Stay updated with the latest breakthroughs and essential updates in the world of ${slug.toLowerCase()}.`,
  };
}

// Forces fresh data on every request
export const revalidate = 0;

async function getCategoryData(category: string, page = 1) {
  try {
    const res = await fetch(`http://127.0.0.1:5000/api/articles?category=${category}&page=${page}&limit=10`, {
      cache: 'no-store'
    });

    if (!res.ok) throw new Error('Failed to fetch articles');
    return res.json();
  } catch (error) {
    console.error("Fetch error:", error);
    return { articles: [], pagination: { totalArticles: 0, totalPages: 1 } };
  }
}

export default async function CategoryPage({ params, searchParams }: PageProps) {
  // Await params and searchParams as per Next.js 15 requirements
  const { slug } = await params;
  const sParams = await searchParams;
  const currentPage = parseInt(sParams.page || "1");

  // Format display name
  const categoryName = slug.charAt(0).toUpperCase() + slug.slice(1);

  // Fetch the data
  const data = await getCategoryData(slug, currentPage);

  const articles = data.articles || [];
  const totalCount = data.pagination?.totalArticles || 0;
  const totalPages = data.pagination?.totalPages || 1;

  return (
    <main className="bg-gray-50 min-h-screen pb-10 text-gray-900">
      <Navbar />

      <div className="max-w-6xl mx-auto p-6">
        <header className="flex items-baseline gap-3 mb-8 border-l-4 border-red-600 pl-4">
          <h1 className="text-3xl font-bold capitalize text-gray-900 tracking-tight">
            {categoryName} News
          </h1>
          <span className="text-lg font-medium text-gray-400">
            ({totalCount})
          </span>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {articles.length > 0 ? (
              <>
                <div className="space-y-6">
                  {articles.map((a: any) => (
                    <Link
                      key={a.id}
                      href={`/article/${a.slug}`}
                      className="block transition transform hover:-translate-y-1"
                    >
                      <ArticleCard
                        title={a.title}
                        image={a.image}
                        category={a.category}
                        excerpt={a.summary || (a.content ? a.content.replace(/<[^>]*>/g, '').substring(0, 160) + "..." : "")}
                      />
                    </Link>
                  ))}
                </div>

                {totalPages > 1 && (
                  <div className="flex justify-center gap-2 py-10">
                    {currentPage > 1 && (
                      <Link href={`/category/${slug}?page=${currentPage - 1}`} className="px-4 py-2 bg-white border rounded text-sm font-bold">
                        ← Previous
                      </Link>
                    )}
                    {currentPage < totalPages && (
                      <Link href={`/category/${slug}?page=${currentPage + 1}`} className="px-4 py-2 bg-white border rounded text-sm font-bold">
                        Next →
                      </Link>
                    )}
                  </div>
                )}
              </>
            ) : (
              <div className="bg-white p-12 rounded-2xl border-2 border-dashed border-gray-200 text-center">
                <p className="text-gray-500 italic">No articles found in {categoryName} yet.</p>
                <Link href="/" className="text-red-600 font-bold mt-4 block">← Back to Home</Link>
              </div>
            )}
          </div>

          <aside className="hidden lg:block">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-24">
              <h2 className="font-extrabold text-xl mb-4 border-b pb-2 uppercase">About {categoryName}</h2>
              <p className="text-sm text-gray-600 leading-relaxed mb-6">
                Stay updated with the latest breakthroughs and essential updates in the world of {slug.toLowerCase()}.
              </p>

              <div className="pt-4 border-t border-gray-50 flex justify-between text-xs font-bold text-gray-400 uppercase tracking-widest">
                <span>Total Stories</span>
                <span className="text-red-600 text-base">{totalCount}</span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
