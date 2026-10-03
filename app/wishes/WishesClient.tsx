"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export interface WishItem {
  id: string;
  name: string;
  message: string;
  createdAt?: string | Date;
}

interface WishesClientProps {
  wishes: WishItem[];
  loadError?: boolean;
}

export default function WishesClient({ wishes, loadError }: WishesClientProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const isAnyHovered = hoveredId !== null;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-extrabold tracking-widest text-amber-400 uppercase block mb-2">
            BIRTHDAY WISHES
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Temi's Birthday Wishes ✨
          </h1>
          <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
            All the love, smiles, and heartfelt messages sent to celebrate Temi on her special day.
          </p>
          <div className="mt-6 flex justify-center">
            <Link
              href="/write-a-wish"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-bold text-sm px-6 py-3 rounded-full shadow-lg hover:shadow-rose-500/25 transition-all transform hover:-translate-y-0.5"
            >
              <span>❤️</span>
              <span>Write a Wish for Temi</span>
            </Link>
          </div>
        </div>

        {/* Wishes Masonry Grid */}
        {loadError ? (
          <div role="alert" className="text-center py-16 text-rose-300">
            We couldn’t load the wishes. Please refresh the page and try again.
          </div>
        ) : wishes.length === 0 ? (
          <div className="text-center py-16 bg-slate-900/40 border border-slate-800 rounded-2xl max-w-md mx-auto">
            <span className="text-4xl mb-3 block">💌</span>
            <h3 className="text-lg font-bold text-slate-200">No wishes yet!</h3>
            <p className="text-sm text-slate-400 mt-1 mb-4">Be the very first person to write a wish for Temi.</p>
            <Link
              href="/write-a-wish"
              className="inline-block bg-rose-500 hover:bg-rose-600 text-white font-bold text-sm px-5 py-2.5 rounded-xl transition-all"
            >
              Write Wish
            </Link>
          </div>
        ) : (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {wishes.map((wish) => {
              const isHovered = hoveredId === wish.id;

              return (
                <div
                  key={wish.id}
                  onMouseEnter={() => setHoveredId(wish.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className={`break-inside-avoid rounded-2xl p-6 transition-all duration-300 backdrop-blur-xl border ${
                    isHovered
                      ? "bg-slate-900/95 border-amber-400/60 shadow-2xl shadow-amber-500/15 scale-[1.02] text-white z-20 relative"
                      : isAnyHovered
                      ? "bg-slate-900/30 border-slate-800/40 text-white/30 opacity-40 scale-100"
                      : "bg-slate-900/60 border-slate-800/80 text-slate-300 opacity-90 hover:opacity-100"
                  }`}
                >
                  {/* Message Content */}
                  <p className={`text-base leading-relaxed italic mb-4 transition-colors ${
                    isHovered ? "text-white font-medium" : "text-inherit"
                  }`}>
                    "{wish.message}"
                  </p>

                  {/* Card Footer / Author */}
                  <div className="flex items-center justify-between pt-3 border-t border-slate-800/60 text-xs">
                    <span className={`font-bold tracking-wide transition-colors ${
                      isHovered ? "text-amber-400" : "text-amber-400/70"
                    }`}>
                      — {wish.name}
                    </span>
                    <span className="text-slate-500 font-normal">
                      For Temi ❤️
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
