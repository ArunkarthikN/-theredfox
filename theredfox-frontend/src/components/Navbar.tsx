"use client"

import { useState } from 'react';
import Link from 'next/link';
import SearchBar from './SearchBar';

/**
 * Updated Navbar for The Red Fox
 * Integrates the SearchBar component while maintaining existing links and styles.
 */
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Technology', href: '/category/technology' },
    { name: 'AI', href: '/category/ai' },
    { name: 'Entertainment', href: '/category/Entertainment', color: 'text-orange-500' },
    { name: 'Business', href: '/category/business' },
    { name: 'World', href: '/category/World' },
    { name: 'Weather', href: '/category/Weather' },
  ];

  return (
    <nav className="w-full border-b bg-white sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4">

        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 shrink-0">
          <img
            src="/logo.png"
            alt="The Red Fox Logo"
            className="h-10 w-auto"
          />
        </Link>

        {/* Desktop Navigation & Search */}
        <div className="hidden lg:flex items-center gap-6">
          <div className="flex items-center gap-5 text-[11px] font-black uppercase tracking-widest text-gray-500">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href} 
                className={`hover:text-red-600 transition-colors ${link.color || ''}`}
              >
                {link.name}
              </Link>
            ))}
          </div>
          
          {/* Search Bar Integration (Desktop) */}
          <div className="pl-4 border-l border-gray-100">
            <SearchBar />
          </div>
        </div>

        {/* Mobile Search & Hamburger */}
        <div className="flex items-center gap-3 lg:hidden">
          <SearchBar />
          
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-900 focus:outline-none p-1"
            aria-label="Toggle Menu"
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
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 flex flex-col font-black uppercase tracking-widest text-xs">
          {navLinks.map((link) => (
            <Link 
              key={link.name}
              href={link.href} 
              onClick={() => setIsOpen(false)} 
              className={`p-4 border-b border-gray-50 hover:bg-gray-50 text-gray-700 ${link.color || ''}`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
