"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  const isHomeActive = pathname === "/" || pathname === "/write-a-wish";
  const isWishesActive = pathname.startsWith("/wishes");

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-slate-950/90 backdrop-blur-md border-b border-slate-800 text-slate-100 py-3.5 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link
          href="/"
          onClick={closeMenu}
          className="flex items-center gap-2 font-black text-lg text-slate-100 hover:text-pink-400 transition-colors"
        >
          <span className="text-xl">🎂</span>
          <span>Celebrating Temi</span>
        </Link>

        {/* Desktop Navigation Menu (md and up) */}
        <nav className="hidden md:flex items-center gap-6 sm:gap-8">
          <Link
            href="/"
            className={`py-1 text-sm font-bold transition-all relative ${
              isHomeActive
                ? "text-white border-b-2 border-pink-500"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Write a Wish
          </Link>
          <Link
            href="/wishes"
            className={`py-1 text-sm font-bold transition-all relative ${
              isWishesActive
                ? "text-white border-b-2 border-pink-500"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Temi's Wishes ✨
          </Link>
        </nav>

        {/* Mobile Hamburger Menu Toggle Button (md and down) */}
        <button
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          className="md:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-pink-500/50 transition-colors"
          aria-label="Toggle Navigation Menu"
        >
          {isMobileMenuOpen ? (
            /* Close X Icon */
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            /* Hamburger Menu Icon */
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-slate-950/95 backdrop-blur-xl border-b border-slate-800 py-4 px-6 shadow-2xl flex flex-col space-y-3 z-50">
          <Link
            href="/"
            onClick={closeMenu}
            className={`py-2 text-base font-bold transition-all ${
              isHomeActive
                ? "text-white font-extrabold border-l-4 border-pink-500 pl-3"
                : "text-slate-400 hover:text-white pl-3"
            }`}
          >
            Write a Wish
          </Link>
          <Link
            href="/wishes"
            onClick={closeMenu}
            className={`py-2 text-base font-bold transition-all ${
              isWishesActive
                ? "text-white font-extrabold border-l-4 border-pink-500 pl-3"
                : "text-slate-400 hover:text-white pl-3"
            }`}
          >
            Temi's Wishes ✨
          </Link>
        </div>
      )}
    </header>
  );
}
