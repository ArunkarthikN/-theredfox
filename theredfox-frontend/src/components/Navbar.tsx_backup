"use client"

import { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full border-b bg-white sticky top-0 z-50 shadow-sm">
      <div className="max-w-6xl mx-auto flex justify-between items-center p-4">
        
	{/* Logo */}
	<Link href="/" className="flex items-center space-x-2">
  	<img 
    	src="/logo.png" 
    	alt="The Red Fox Logo" 
    	className="h-10 w-auto" // Adjust h-10 to make it larger or smaller
  	/>
	</Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-5 text-[11px] font-black uppercase tracking-widest text-gray-500">
          <Link href="/" className="hover:text-red-600 transition-colors">Home</Link>
          <Link href="/category/technology" className="hover:text-red-600 transition-colors">Technology</Link>
          <Link href="/category/ai" className="hover:text-red-600 transition-colors">AI</Link>
          <Link href="/category/crypto" className="hover:text-red-600 transition-colors text-orange-500">Crypto</Link>
          <Link href="/category/business" className="hover:text-red-600 transition-colors">Business</Link>
          <Link href="/category/sports" className="hover:text-red-600 transition-colors">Sports</Link>
          <Link href="/category/Finance" className="hover:text-red-600 transition-colors">Finance</Link>
         </div>

        {/* Mobile Hamburger Icon */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-900 focus:outline-none p-1"
        >
          {isOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 flex flex-col font-black uppercase tracking-widest text-xs">
          <Link href="/" onClick={() => setIsOpen(false)} className="p-4 border-b border-gray-50 hover:bg-gray-50 text-gray-700">Home</Link>
          <Link href="/category/technology" onClick={() => setIsOpen(false)} className="p-4 border-b border-gray-50 hover:bg-gray-50 text-gray-700">Technology</Link>
          <Link href="/category/ai" onClick={() => setIsOpen(false)} className="p-4 border-b border-gray-50 hover:bg-gray-50 text-gray-700">AI</Link>
          <Link href="/category/crypto" onClick={() => setIsOpen(false)} className="p-4 border-b border-gray-50 hover:bg-gray-50 text-gray-700 text-orange-500">Crypto</Link>
          <Link href="/category/business" onClick={() => setIsOpen(false)} className="p-4 border-b border-gray-50 hover:bg-gray-50 text-gray-700">Business</Link>
          <Link href="/category/sports" onClick={() => setIsOpen(false)} className="p-4 hover:bg-gray-50 text-gray-700">Sports</Link>
        </div>
      )}
    </nav>
  );
}
