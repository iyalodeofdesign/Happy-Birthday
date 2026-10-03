"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const isHomeActive = pathname === "/";
  const isWishesActive = pathname.startsWith("/wishes");

  return (
    <header className="sticky top-0 z-50 w-full bg-slate-950/90 backdrop-blur-md border-b border-slate-800 text-slate-100 py-3.5 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 font-black text-lg text-slate-100 hover:text-pink-400 transition-colors"
        >
          <span className="text-xl">🎂</span>
          <span>Celebrating Temi</span>
        </Link>

        {/* Center Navigation Menu */}
        <nav className="flex items-center gap-6 sm:gap-8">
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

        {/* Direct Action Button */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-bold text-xs sm:text-sm px-4 py-2 rounded-full shadow-md hover:shadow-rose-500/25 transition-all transform hover:-translate-y-0.5"
          >
            <span>❤️</span>
            <span>Wish Temi</span>
          </Link>
        </div>
      </div>
    </header>
  );
}

