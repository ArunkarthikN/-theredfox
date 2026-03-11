import Navbar from "../../../components/Navbar";
import ArticleCard from "../../../components/ArticleCard";
import Link from "next/link";

async function getCategoryArticles(category: string) {
  try {
    const res = await fetch(`http://127.0.0.1:5000/api/articles?category=${category}`, {
      cache: 'no-store'
    });
    
    if (!res.ok) throw new Error('Failed to fetch articles');
    
    return res.json();
  } catch (error) {
    console.error("Fetch error:", error);
    return [];
  }
}

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const categoryName = params.slug.charAt(0).toUpperCase() + params.slug.slice(1);
  const articles = await getCategoryArticles(categoryName);

  return (
    <main className="bg-gray-50 min-h-screen pb-10 text-gray-900">
      <Navbar />
      
      <div className="max-w-6xl mx-auto p-6">
        <header className="flex items-baseline gap-3 mb-8 border-l-4 border-red-600 pl-4">
          <h1 className="text-3xl font-bold capitalize text-gray-900 tracking-tight">
            {categoryName} News
          </h1>
          <span className="text-lg font-medium text-gray-400">
            ({articles.length})
          </span>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {articles.length > 0 ? (
              articles.map((a: any) => (
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
              ))
            ) : (
              <div className="bg-white p-12 rounded-2xl border-2 border-dashed border-gray-200 text-center">
                <p className="text-gray-500 italic">No articles found in {categoryName} yet.</p>
                <Link href="/" className="text-red-600 font-bold mt-4 block">← Back to Home</Link>
              </div>
            )}
          </div>

          <aside className="hidden lg:block">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-24">
              <h2 className="font-extrabold text-xl mb-4 border-b pb-2">About {categoryName}</h2>
              <p className="text-sm text-gray-600 leading-relaxed mb-6">
                Stay updated with the latest breakthroughs and essential updates in the world of {categoryName.toLowerCase()}.
              </p>
              
              <div className="pt-4 border-t border-gray-50 flex justify-between text-xs font-bold text-gray-400 uppercase tracking-widest">
                <span>Total Stories</span>
                <span className="text-red-600">{articles.length}</span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
