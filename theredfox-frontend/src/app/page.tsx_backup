import Navbar from "../components/Navbar"
import ArticleCard from "../components/ArticleCard"
import Link from "next/link"

// Forces Next.js to fetch fresh data on every request
export const revalidate = 0;

/**
 * Fetches paginated articles from the local API
 */
async function getArticles(page: number) {
  try {
    // Calling your updated API with page and limit parameters
    const res = await fetch(`http://127.0.0.1:5000/api/articles?page=${page}&limit=10`, {
      cache: 'no-store'
    });

    if (!res.ok) {
      throw new Error('Failed to fetch articles');
    }

    // Now returns { articles: [], pagination: { totalPages, currentPage, etc. } }
    return res.json();
  } catch (error) {
    console.error("Fetch error:", error);
    return { articles: [], pagination: { totalPages: 0, currentPage: 1 } };
  }
}

export default async function Home({ searchParams }: { searchParams: { page?: string } }) {
  // 1. Get current page from URL or default to 1
  const currentPage = parseInt(searchParams.page || "1");
  
  // 2. Fetch data
  const data = await getArticles(currentPage);
  const articles = data.articles || [];
  const pagination = data.pagination || { totalPages: 1 };

  return (
    <main className="bg-gray-50 min-h-screen">
      <Navbar />

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
        <div className="md:col-span-2 space-y-6">
          <h1 className="text-3xl font-bold text-gray-800">Latest News</h1>

          {articles.length > 0 ? (
            <>
              {/* Article List */}
              <div className="space-y-6">
                {articles.map((a: any) => (
                  <Link key={a.id} href={`/article/${a.slug}`} className="block transition transform hover:-translate-y-1">
                    <ArticleCard
                      title={a.title}
                      image={a.image}
                      category={a.category}
                      excerpt={a.summary || (a.content ? a.content.replace(/<[^>]*>/g, '').substring(0, 150) + "..." : "")}
                    />
                  </Link>
                ))}
              </div>

              {/* Pagination Controls */}
              {pagination.totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 py-10">
                  {/* Previous Button */}
                  {currentPage > 1 && (
                    <Link
                      href={`/?page=${currentPage - 1}`}
                      className="px-4 py-2 bg-white border rounded shadow-sm hover:bg-gray-50 text-sm font-bold transition-colors"
                    >
                      ← Previous
                    </Link>
                  )}

                  {/* Page Numbers */}
                  <div className="flex gap-1">
                    {[...Array(pagination.totalPages)].map((_, i) => {
                      const pageNum = i + 1;
                      
                      // Show current page, first, last, and pages around current
                      if (
                        pagination.totalPages > 7 &&
                        pageNum !== 1 &&
                        pageNum !== pagination.totalPages &&
                        Math.abs(pageNum - currentPage) > 1
                      ) {
                        if (Math.abs(pageNum - currentPage) === 2) return <span key={pageNum} className="px-1 text-gray-400">...</span>;
                        return null;
                      }

                      return (
                        <Link
                          key={pageNum}
                          href={`/?page=${pageNum}`}
                          className={`w-10 h-10 flex items-center justify-center rounded font-bold transition-all ${
                            currentPage === pageNum
                              ? 'bg-red-600 text-white shadow-md'
                              : 'bg-white border text-gray-600 hover:border-red-600 hover:text-red-600'
                          }`}
                        >
                          {pageNum}
                        </Link>
                      );
                    })}
                  </div>

                  {/* Next Button */}
                  {currentPage < pagination.totalPages && (
                    <Link
                      href={`/?page=${currentPage + 1}`}
                      className="px-4 py-2 bg-white border rounded shadow-sm hover:bg-gray-50 text-sm font-bold transition-colors"
                    >
                      Next →
                    </Link>
                  )}
                </div>
              )}
            </>
          ) : (
            <p className="text-gray-500 italic">No news available at the moment.</p>
          )}
        </div>

        {/* Sidebar */}
        <aside className="bg-white p-6 rounded-lg shadow-sm h-fit sticky top-24">
          <h2 className="text-xl font-bold mb-4 border-b pb-2 text-gray-800">Trending</h2>
          <ul className="space-y-4 text-gray-700">
            {articles.slice(0, 5).map((a: any) => (
              <li key={`trend-${a.id}`} className="group">
                <Link href={`/article/${a.slug}`} className="group-hover:text-red-600 transition-colors font-medium leading-snug block">
                  {a.title}
                </Link>
                <span className="text-xs text-gray-400">
                  {new Date(a.published_at || a.created_at).toLocaleDateString()}
                </span>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </main>
  );
}
