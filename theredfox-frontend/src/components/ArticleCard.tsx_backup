type Props = {
  title: string
  excerpt: string
  image?: string    // Added optional image prop
  category?: string // Added optional category prop
}

export default function ArticleCard({ title, excerpt, image, category }: Props) {
  return (
    <div className="bg-white border border-gray-100 rounded-xl p-4 hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row gap-5 group">
      
      {/* --- IMAGE SECTION --- */}
      {image && (
        <div className="w-full md:w-48 h-40 flex-shrink-0 overflow-hidden rounded-lg">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
      )}

      {/* --- CONTENT SECTION --- */}
      <div className="flex flex-col justify-center flex-1">
        {category && (
          <span className="text-[10px] font-black uppercase tracking-widest text-red-600 mb-2">
            {category}
          </span>
        )}
        
        <h2 className="text-xl font-extrabold text-gray-900 group-hover:text-red-600 transition-colors leading-tight">
          {title}
        </h2>
        
        <p className="text-gray-500 mt-2 text-sm line-clamp-2 leading-relaxed">
          {excerpt}
        </p>
        
        <div className="mt-4 flex items-center text-xs font-bold text-gray-400 group-hover:text-red-500 transition-colors">
          READ ARTICLE <span className="ml-1">→</span>
        </div>
      </div>
    </div>
  )
}
