import Navbar from "../components/Navbar"
import ArticleCard from "../components/ArticleCard"
import Link from "next/link"

// This forces Next.js to fetch fresh data on every request
export const revalidate = 0;

async function getArticles() {
  try {
    // We use the internal IP/Port for speed since it's on the same server
    const res = await fetch('http://127.0.0.1:5000/api/articles', {
      cache: 'no-store'
    });

    if (!res.ok) {
      throw new Error('Failed to fetch articles');
    }

    return res.json();
  } catch (error) {
    console.error("Fetch error:", error);
    return [];
  }
}

export default async function Home() {
  const articles = await getArticles();

  return (
    <main className="bg-gray-50 min-h-screen">
      <Navbar/>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
        <div className="md:col-span-2 space-y-6">
          <h1 className="text-3xl font-bold text-gray-800">Latest News</h1>

          {articles.length > 0 ? (
            articles.map((a: any) => (
              <Link key={a.id} href={`/article/${a.slug}`} className="block transition transform hover:-translate-y-1">
                <ArticleCard
                  title={a.title}
                  image={a.image} // Pass the image URL to the card
                  category={a.category} // Pass the category to the card
                  excerpt={a.summary || (a.content ? a.content.replace(/<[^>]*>/g, '').substring(0, 150) + "..." : "")}
                />
              </Link>
            ))
          ) : (
            <p className="text-gray-500 italic">No news available at the moment.</p>
          )}
        </div>

        <aside className="bg-white p-6 rounded-lg shadow-sm h-fit">
          <h2 className="text-xl font-bold mb-4 border-b pb-2">Trending</h2>
          <ul className="space-y-4 text-gray-700">
            {articles.slice(0, 5).map((a: any) => (
              <li key={`trend-${a.id}`} className="group">
                <Link href={`/article/${a.slug}`} className="group-hover:text-red-600 transition-colors font-medium leading-snug block">
                  {a.title}
                </Link>
                <span className="text-xs text-gray-400">
                  {new Date(a.created_at).toLocaleDateString()}
                </span>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </main>
  )
}
