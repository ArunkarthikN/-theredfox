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
  const totalPages = pagination.totalPages;

  // 3. Logic for Responsive Pagination Numbers (Sliding Window)
  const getVisiblePages = () => {
    const maxVisible = 3; // Show only 3 numbers on mobile
    let start = Math.max(1, currentPage - 1);
    let end = Math.min(totalPages, start + (maxVisible - 1));

    if (end - start < maxVisible - 1) {
      start = Math.max(1, end - (maxVisible - 1));
    }
    
    const pages = [];
    for (let i = start; i <= end; i++) {
      if (i > 0) pages.push(i);
    }
    return pages;
  };

  const visiblePages = getVisiblePages();

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

              {/* RESPONSIVE PAGINATION CONTROLS */}
              {totalPages > 1 && (
                <div className="flex flex-col items-center gap-4 py-10">
                  <div className="flex justify-center items-center gap-2 w-full">
                    
                    {/* Previous Button */}
                    <Link
                      href={currentPage > 1 ? `/?page=${currentPage - 1}` : "#"}
                      className={`px-3 md:px-4 py-2 bg-white border rounded shadow-sm text-sm font-bold transition-colors ${
                        currentPage <= 1 ? 'opacity-30 pointer-events-none' : 'hover:bg-gray-50'
                      }`}
                    >
                      ← <span className="hidden sm:inline">Prev</span>
                    </Link>

                    {/* Dynamic Page Numbers */}
                    <div className="flex gap-1 items-center">
                      {/* Jump to First on Desktop */}
                      {visiblePages[0] > 1 && (
                        <>
                          <Link href="/?page=1" className="w-10 h-10 hidden sm:flex items-center justify-center rounded border bg-white text-sm font-bold text-gray-600 hover:border-red-600">1</Link>
                          <span className="hidden sm:inline px-1 text-gray-400">...</span>
                        </>
                      )}

                      {visiblePages.map((pageNum) => (
                        <Link
                          key={pageNum}
                          href={`/?page=${pageNum}`}
                          className={`w-10 h-10 flex items-center justify-center rounded font-bold transition-all text-sm ${
                            currentPage === pageNum
                              ? 'bg-red-600 text-white shadow-md'
                              : 'bg-white border text-gray-600 hover:border-red-600 hover:text-red-600'
                          }`}
                        >
                          {pageNum}
                        </Link>
                      ))}

                      {/* Jump to Last on Desktop */}
                      {visiblePages[visiblePages.length - 1] < totalPages && (
                        <>
                          <span className="hidden sm:inline px-1 text-gray-400">...</span>
                          <Link href={`/?page=${totalPages}`} className="w-10 h-10 hidden sm:flex items-center justify-center rounded border bg-white text-sm font-bold text-gray-600 hover:border-red-600">{totalPages}</Link>
                        </>
                      )}
                    </div>

                    {/* Next Button */}
                    <Link
                      href={currentPage < totalPages ? `/?page=${currentPage + 1}` : "#"}
                      className={`px-3 md:px-4 py-2 bg-white border rounded shadow-sm text-sm font-bold transition-colors ${
                        currentPage >= totalPages ? 'opacity-30 pointer-events-none' : 'hover:bg-gray-50'
                      }`}
                    >
                      <span className="hidden sm:inline">Next</span> →
                    </Link>
                  </div>
                  
                  {/* Page Status Indicator for Mobile */}
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    Page {currentPage} of {totalPages}
                  </span>
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
