'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import './Navbar.css';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { title: 'Doctors', href: '/doctors' },
    { title: 'Labs', href: '/labs' },
    { title: 'Hospitals', href: '/hospital' },
    { title: 'Pharmacy', href: '/pharmacy' },
    { title: 'Sustain Health', href: '/shop' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 navbar-glass h-20 flex items-center">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Desktop Layout */}
        <div className="hidden md:flex items-center justify-between">

          {/* Left: Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <Image src="/logo.png" alt="Healthezy" width={40} height={40} className="w-10 h-10 object-contain" />
            <span className="text-2xl font-bold text-[#0e5c63]">Healthezy</span>
          </Link>

          <div className="flex items-center gap-6 lg:gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.title}
                href={link.href}
                className="text-gray-600 hover:text-[#0e5c63] font-medium text-[15px] transition-colors whitespace-nowrap"
              >
                {link.title}
              </Link>
            ))}
          </div>

          <div className="shrink-0 flex items-center gap-3">
            <Link
              href="/login"
              className="text-[#0f5c62] hover:bg-[#0f5c62] hover:text-white border border-[#0f5c62] px-6 py-2.5 rounded-lg font-medium transition-colors text-sm"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="bg-[#0f5c62] hover:bg-[#0a454a] text-white px-6 py-2.5 rounded-lg font-medium transition-colors text-sm"
            >
              Signup
            </Link>
          </div>
        </div>
        <div className="flex md:hidden items-center justify-between w-full">
          <button
            className="p-2 -ml-2 text-[#0f5c62]"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

          <Link href="/" className="flex items-center gap-1.5 flex-1 justify-center min-w-0 px-2">
            <Image src="/logo.png" alt="Healthezy" width={32} height={32} className="w-8 h-8 object-contain shrink-0" />
            <span className="text-lg font-bold text-[#0e5c63] truncate">Healthezy</span>
          </Link>

          <div className="flex items-center gap-2">
            <Link
              href="/login"
              className="text-[#0f5c62] hover:bg-[#0f5c62] hover:text-white border border-[#0f5c62] px-3 py-2 rounded-lg font-medium transition-colors text-xs whitespace-nowrap"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="bg-[#0f5c62] hover:bg-[#0a454a] text-white px-3 py-2 rounded-lg font-medium transition-colors text-xs whitespace-nowrap"
            >
              Signup
            </Link>
          </div>

        </div>

        {isMenuOpen && (
          <div className="md:hidden absolute top-20 left-0 right-0 bg-white border-b border-gray-100 shadow-lg py-4 px-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.title}
                href={link.href}
                className="text-gray-700 hover:text-[#0e5c63] font-medium py-2 border-b border-gray-50 last:border-0"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.title}
              </Link>
            ))}
          </div>
        )}

      </div>
    </nav>
  );
}
