"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const isHomeActive = pathname === "/write-a-wish";
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

        {/* Navigation Menu */}
        <nav className="flex items-center gap-6 sm:gap-8">
          <Link
            href="/write-a-wish"
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

      </div>
    </header>
  );
}

