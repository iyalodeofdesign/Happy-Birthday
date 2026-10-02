"use client";

import React, { useState } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import GallerySection from "@/components/GallerySection";

export interface WishItem {
  id: string;
  name: string;
  message: string;
  date?: string;
  photoUrl?: string;
  loves?: number;
}

const sampleWishes: WishItem[] = [
  {
    id: "1",
    name: "Sarah M.",
    message: "Happy Birthday Temi! 🥳 Wishing you the most incredible year filled with laughter, big wins, and endless joy. So blessed to know you!",
    date: "Today",
    loves: 12,
  },
  {
    id: "2",
    name: "Uncle Dave & Family",
    message: "Temi, you bring so much warmth and light into every room you step into. Hope today is as special as you are! Happy Birthday!",
    photoUrl: "/images/11042739-69FF-4947-A5B2-6C70FC82D2F8_1_105_c.jpeg",
    date: "Today",
    loves: 18,
  },
  {
    id: "3",
    name: "Chidimma",
    message: "To my amazing friend Temi 🎉 Happy Birthday! Thank you for always being there with great advice and the best energy. Cheers to another year of greatness!",
    date: "Yesterday",
    loves: 15,
  },
  {
    id: "4",
    name: "Marcus (Tech Team)",
    message: "Happy Birthday Temi! Working alongside you is always a highlight. Wishing you massive success and happiness in all your upcoming projects!",
    photoUrl: "/images/42DCFB78-FE64-4617-993C-F853BD135B6B_1_105_c.jpeg",
    date: "Yesterday",
    loves: 9,
  },
  {
    id: "5",
    name: "Aunty Grace",
    message: "Happy Birthday Temi ❤️ May this new chapter bring you peace, good health, and all the happiness your heart can hold!",
    date: "2 days ago",
    loves: 14,
  },
  {
    id: "6",
    name: "Tobi & Sade",
    message: "Temi! Another trip around the sun! Hope you get spoiled today and eat plenty of cake 🎂 Keep shining bright!",
    photoUrl: "/images/80FA9039-13D5-4E5E-BDBE-85D4D41C9A49_1_105_c.jpeg",
    date: "2 days ago",
    loves: 21,
  },
  {
    id: "7",
    name: "Daniel & Funmi",
    message: "Wishing you a birthday that is as wonderful, elegant, and vibrant as you are, Temi! Cheers to endless blessings!",
    date: "3 days ago",
    loves: 11,
  },
  {
    id: "8",
    name: "Blessing K.",
    message: "Happy Birthday Temi! May your day be filled with sweet moments, warm smiles, and unforgettable memories with loved ones.",
    date: "3 days ago",
    loves: 8,
  },
  {
    id: "9",
    name: "Alex from Work",
    message: "Temi, your positive spirit and dedication inspire everyone around you. Have a fantastic birthday celebration today!",
    date: "4 days ago",
    loves: 16,
  },
  {
    id: "10",
    name: "Kemi O.",
    message: "Happy Birthday to one of the sweetest souls ever! Temi, keep blooming and spreading love everywhere you go ✨",
    date: "5 days ago",
    loves: 19,
  },
];

export default function WishesPage() {
  // 4. State-Driven Hover Interactions (CRITICAL)
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [wishesList, setWishesList] = useState<WishItem[]>(sampleWishes);

  const handleLoveClick = (id: string) => {
    setWishesList((prev) =>
      prev.map((w) => (w.id === id ? { ...w, loves: (w.loves || 0) + 1 } : w))
    );
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-slate-100 font-sans flex flex-col">
      {/* Navigation Bar */}
      <Navbar />

      {/* 2. Header Section */}
      <section className="w-full max-w-4xl mx-auto text-center pt-16 pb-8 px-4">
        {/* Pill Badge */}
        <div className="inline-block border border-white/20 bg-white/5 backdrop-blur-md rounded-full px-4 py-1.5 text-xs font-semibold text-white/70 tracking-widest uppercase mb-4 shadow-sm">
          Guestbook
        </div>

        {/* Main Heading */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Messages for Temi
        </h1>

        <p className="text-slate-400 text-sm sm:text-base mt-3 max-w-xl mx-auto">
          Hover over any card to illuminate the wish written for Temi.
        </p>
      </section>

      {/* 3. Masonry Grid Layout (CSS Columns) */}
      <section className="w-full py-6">
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6 w-full max-w-7xl mx-auto px-4 mt-4">
          {wishesList.map((wish) => {
            const isHovered = hoveredId === wish.id;
            const isAnotherHovered = hoveredId !== null && !isHovered;

            return (
              <div
                key={wish.id}
                onMouseEnter={() => setHoveredId(wish.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="break-inside-avoid relative group cursor-pointer"
              >
                {/* Card Container */}
                <div
                  className={`rounded-2xl p-6 transition-all duration-500 ease-in-out ${
                    isHovered
                      ? "border border-white/10 bg-white/5 rounded-2xl p-6 shadow-2xl backdrop-blur-md scale-[1.02]"
                      : isAnotherHovered
                      ? "border border-transparent bg-transparent opacity-30"
                      : "border border-transparent bg-transparent"
                  }`}
                >
                  {/* Quote Mark */}
                  <div
                    className={`text-4xl font-serif leading-none mb-3 transition-colors duration-500 ease-in-out ${
                      isHovered ? "text-pink-400" : "text-white/20"
                    }`}
                  >
                    “
                  </div>

                  {/* Optional Memory Photo */}
                  {wish.photoUrl && (
                    <div
                      className={`relative w-full h-44 mb-4 rounded-xl overflow-hidden border transition-all duration-500 ease-in-out ${
                        isHovered
                          ? "opacity-100 border-white/20 shadow-md"
                          : "opacity-30 border-white/5"
                      }`}
                    >
                      <Image
                        src={wish.photoUrl}
                        alt={`Memory photo from ${wish.name}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 350px"
                      />
                    </div>
                  )}

                  {/* Message Text: heavily dimmed (text-white/30) by default, text-white when hovered */}
                  <p
                    className={`text-base sm:text-lg italic leading-relaxed mb-6 transition-colors duration-500 ease-in-out ${
                      isHovered
                        ? "text-white font-medium"
                        : "text-white/30"
                    }`}
                  >
                    "{wish.message}"
                  </p>

                  {/* Card Footer */}
                  <div
                    className={`flex items-center justify-between pt-4 border-t transition-colors duration-500 ease-in-out ${
                      isHovered ? "border-white/15" : "border-white/5"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-500 ease-in-out ${
                          isHovered
                            ? "bg-pink-500 text-white shadow-md"
                            : "bg-white/10 text-white/30"
                        }`}
                      >
                        {wish.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h4
                          className={`font-bold text-sm leading-snug transition-colors duration-500 ease-in-out ${
                            isHovered ? "text-white" : "text-white/30"
                          }`}
                        >
                          {wish.name}
                        </h4>
                        <span
                          className={`text-xs transition-colors duration-500 ease-in-out ${
                            isHovered ? "text-slate-400" : "text-white/20"
                          }`}
                        >
                          {wish.date || "Today"}
                        </span>
                      </div>
                    </div>

                    {/* Love Reaction Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLoveClick(wish.id);
                      }}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-500 ease-in-out ${
                        isHovered
                          ? "bg-pink-500/20 hover:bg-pink-500 text-pink-300 hover:text-white border border-pink-500/40 shadow-sm"
                          : "bg-white/5 text-white/30 border border-white/5"
                      }`}
                    >
                      <span>❤️</span>
                      <span>{wish.loves || 0}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Gallery Showcase */}
      <GallerySection wishes={wishesList.map(w => ({ ...w, sender: w.name }))} />
    </main>
  );
}
