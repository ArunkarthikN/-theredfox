'use client';

import { useState } from 'react';

/**
 * SearchBar Component for The Red Fox
 * Provides a sleek, responsive input for searching articles.
 */
export default function SearchBar() {
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      // Using window.location to ensure reliable redirection 
      // and avoid potential 'next/navigation' resolution issues.
      window.location.href = `/search?q=${encodeURIComponent(query.trim())}`;
    }
  };

  return (
    <form 
      onSubmit={handleSearch} 
      className="relative flex items-center w-full max-w-[200px] md:max-w-xs transition-all duration-300"
    >
      <div className="relative w-full group">
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full bg-gray-100 border-2 border-transparent rounded-full py-2 px-4 pl-10 text-sm font-medium text-gray-900 placeholder-gray-400 focus:bg-white focus:border-red-600 focus:ring-0 transition-all duration-200 outline-none"
        />
        
        {/* Search Icon */}
        <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
          <svg
            className="h-4 w-4 text-gray-400 group-focus-within:text-red-600 transition-colors duration-200"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        {/* Subtle clear button (optional, visible when typing) */}
        {query && (
          <button
            type="button"
            onClick={() => setQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </button>
        )}
      </div>
    </form>
  );
}
