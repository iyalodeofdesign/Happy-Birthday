"use client";

import React from "react";
import Link from "next/link";
import WishGrid from "@/components/WishGrid";

export default function WishesPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900 font-sans">
      {/* Top Header Bar for Wishes Page */}
      <header className="border-b border-gray-100 bg-white/80 backdrop-blur-md sticky top-0 z-50 py-4 px-6 flex items-center justify-between max-w-7xl mx-auto">
        <Link
          href="/"
          className="flex items-center gap-2 font-extrabold text-lg text-gray-900 hover:opacity-80 transition-opacity"
        >
          <span className="text-xl">🎂</span>
          <span>Celebrating Temi</span>
        </Link>

        <Link
          href="/"
          className="inline-flex items-center gap-1.5 bg-pink-50 hover:bg-pink-100 text-pink-600 border border-pink-200 px-4 py-2 rounded-full text-sm font-bold transition-all shadow-sm"
        >
          <span>✍️</span>
          <span>Write a Wish for Temi</span>
        </Link>
      </header>

      {/* Guestbook Section */}
      <div className="py-4">
        <WishGrid />
      </div>
    </main>
  );
}
