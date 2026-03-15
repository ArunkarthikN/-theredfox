import Navbar from "../../components/Navbar";
import ArticleCard from "../../components/ArticleCard";

/**
 * Final Search Results Page for The Red Fox
 * Features:
 * - Next.js 15 Promise-based searchParams support
 * - Dynamic header with match count
 * - Natural title wrapping (no cut-offs)
 * - Fully responsive grid layout
 */

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

async function getSearchResults(query: string) {
  // Points to your Express.js backend
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:5000/api';
  
  try {
    const res = await fetch(`${apiUrl}/articles/search?q=${encodeURIComponent(query)}`, {
      cache: 'no-store'
    });
    
    if (!res.ok) throw new Error('Failed to fetch results');
    
    return res.json();
  } catch (error) {
    console.error("Search fetch error:", error);
    return [];
  }
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  // Await searchParams for Next.js 15 compatibility
  const sParams = await searchParams;
  const query = sParams.q || "";
  
  // Fetch results based on query
  const results = query ? await getSearchResults(query) : [];

  return (
    <main className="bg-white min-h-screen pb-20 text-gray-900">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 md:px-8 mt-12">
        {/* Header Section */}
        <header className="mb-12 border-l-[6px] border-red-600 pl-6 py-2">
          <p className="text-[10px] font-black text-red-600 uppercase tracking-[0.4em] mb-1">
            Search Discovery
          </p>
          <h1 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tighter">
            {query ? (
              <>Found {results.length} stories for <span className="text-red-600">"{query}"</span></>
            ) : (
              "Explore The Red Fox Archive"
            )}
          </h1>
          <div className="h-[1px] w-full bg-gray-100 mt-6"></div>
        </header>

        {/* Results Grid */}
        {results.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
            {results.map((article: any) => (
              <a 
                key={article.id} 
                href={`/article/${article.slug}`}
                className="group flex flex-col h-full bg-white rounded-3xl border border-gray-100/50 hover:shadow-2xl hover:shadow-gray-200/50 transition-all duration-500"
              >
                {/* Thumbnail */}
                <div className="relative aspect-[16/10] overflow-hidden rounded-t-3xl bg-gray-50">
                  <img 
                    src={article.image || '/logo.png'} 
                    alt={article.title}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-red-600 text-white text-[9px] font-black uppercase px-2.5 py-1 rounded-md shadow-lg">
                      {article.category}
                    </span>
                  </div>
                </div>

                {/* Content - Title wrapping fixed here */}
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-[18px] font-black leading-tight text-gray-900 group-hover:text-red-600 transition-colors mb-4">
                    {/* Displaying full title without truncation for better UX */}
                    {article.title}
                  </h3>
                  
                  <p className="text-xs text-gray-500 font-medium leading-relaxed line-clamp-3 mb-6">
                    {article.summary || (article.content ? article.content.replace(/<[^>]*>/g, '').substring(0, 120) + "..." : "No summary available.")}
                  </p>
                  
                  {/* Card Footer */}
                  <div className="mt-auto pt-5 border-t border-gray-50 flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Published</span>
                      <span className="text-[11px] font-bold text-gray-900 uppercase tracking-tight">
                        {new Date(article.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-red-600 text-[10px] font-black uppercase tracking-widest group-hover:gap-3 transition-all">
                      <span>Full Story</span>
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        ) : (
          /* Empty State Section */
          <div className="py-24 px-6 text-center bg-gray-50 rounded-[3rem] border-2 border-dashed border-gray-200 max-w-3xl mx-auto">
            <div className="w-24 h-24 bg-white rounded-full shadow-inner flex items-center justify-center mx-auto mb-8">
              <span className="text-4xl grayscale">🗞️</span>
            </div>
            <h3 className="text-2xl font-black text-gray-900 mb-3">No matching headlines.</h3>
            <p className="text-gray-500 mb-10 font-medium leading-relaxed">
              We couldn't find any articles matching <span className="text-red-600 font-bold italic">"{query}"</span>. <br/>
              Try using different keywords or explore our top categories.
            </p>
            <a 
              href="/" 
              className="inline-block px-12 py-4 bg-red-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-black transition-all shadow-xl shadow-red-600/20 active:scale-95"
            >
              Back to Home
            </a>
          </div>
        )}
      </div>
    </main>
  );
}
