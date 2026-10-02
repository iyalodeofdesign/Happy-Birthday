"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export interface WishItem {
  id: string;
  sender: string;
  message: string;
  photoUrl?: string;
  date?: string;
  loves?: number;
  accentColor?: "pink" | "sky" | "orange";
}

const DEFAULT_WISHES: WishItem[] = [
  {
    id: "1",
    sender: "Sarah M.",
    message: "Happy Birthday Temi! 🥳 Wishing you the most incredible year filled with laughter, big wins, and endless joy. So blessed to know you!",
    date: "Today",
    loves: 8,
    accentColor: "pink"
  },
  {
    id: "2",
    sender: "Uncle Dave & Family",
    message: "Temi, you bring so much warmth and light into every room you step into. Hope today is as special as you are! Happy Birthday!",
    photoUrl: "/images/11042739-69FF-4947-A5B2-6C70FC82D2F8_1_105_c.jpeg",
    date: "Today",
    loves: 12,
    accentColor: "orange"
  },
  {
    id: "3",
    sender: "Chidimma",
    message: "To my amazing friend Temi 🎉 Happy Birthday! Thank you for always being there with great advice and the best energy. Cheers to another year of greatness!",
    date: "Yesterday",
    loves: 15,
    accentColor: "sky"
  },
  {
    id: "4",
    sender: "Marcus (Tech Team)",
    message: "Happy Birthday Temi! Working alongside you is always a highlight. Wishing you massive success and happiness in all your upcoming projects!",
    photoUrl: "/images/42DCFB78-FE64-4617-993C-F853BD135B6B_1_105_c.jpeg",
    date: "Yesterday",
    loves: 6,
    accentColor: "pink"
  },
  {
    id: "5",
    sender: "Aunty Grace",
    message: "Happy Birthday Temi ❤️ May this new chapter bring you peace, good health, and all the happiness your heart can hold!",
    date: "2 days ago",
    loves: 10,
    accentColor: "orange"
  },
  {
    id: "6",
    sender: "Tobi & Sade",
    message: "Temi! Another trip around the sun! Hope you get spoiled today and eat plenty of cake 🎂 Keep shining bright!",
    photoUrl: "/images/80FA9039-13D5-4E5E-BDBE-85D4D41C9A49_1_105_c.jpeg",
    date: "2 days ago",
    loves: 9,
    accentColor: "sky"
  }
];

interface WishGridProps {
  wishes?: WishItem[];
}

export default function WishGrid({ wishes = DEFAULT_WISHES }: WishGridProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [wishList, setWishList] = useState<WishItem[]>(wishes);

  const handleLoveClick = (index: number) => {
    const updated = [...wishList];
    updated[index].loves = (updated[index].loves || 0) + 1;
    setWishList(updated);
  };

  // Accent gradient mapping for Light Ray Effect
  const glowGradients = {
    pink: "from-pink-500/40 via-rose-400/30 to-amber-300/20",
    sky: "from-sky-400/40 via-cyan-300/30 to-indigo-300/20",
    orange: "from-orange-500/40 via-amber-400/30 to-pink-400/20",
  };

  return (
    <section id="wishes-section" className="w-full max-w-7xl mx-auto py-16 px-4 bg-white text-gray-900">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 border-b border-gray-100 pb-6 gap-4">
        <div>
          <span className="text-xs font-black tracking-widest text-pink-500 uppercase block mb-1">
            CELEBRATING TEMI
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            Messages for Temi 💌
          </h2>
          <p className="text-gray-500 text-sm sm:text-base mt-1">
            Hover over any card to illuminate the wish written for Temi.
          </p>
        </div>

        <div className="inline-flex items-center gap-2 bg-slate-50 border border-gray-200 px-4 py-2 rounded-full text-sm font-bold text-gray-700 shadow-sm self-start sm:self-auto">
          <span className="text-pink-500 animate-pulse">❤️</span>
          <span>{wishList.length} wishes for Temi</span>
        </div>
      </div>

      {/* Masonry Layout Grid */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.08 },
          },
        }}
        className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6"
      >
        {wishList.map((wish, index) => {
          const isHovered = hoveredIndex === index;
          const isAnyHovered = hoveredIndex !== null;
          const accent = wish.accentColor || (index % 3 === 0 ? "pink" : index % 3 === 1 ? "sky" : "orange");

          return (
            <motion.div
              key={wish.id || index}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="break-inside-avoid relative group"
            >
              {/* "LIGHT RAY" GLOW EFFECT (Emanates behind card when hovered) */}
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1.15 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className={`absolute -inset-3 rounded-3xl bg-gradient-to-r ${glowGradients[accent]} blur-3xl z-0 pointer-events-none`}
                  />
                )}
              </AnimatePresence>

              {/* CARD CONTENT */}
              <div
                className={`relative z-10 bg-white border rounded-2xl p-6 sm:p-7 transition-all duration-500 ease-out cursor-pointer ${
                  isHovered
                    ? "opacity-100 border-gray-300 shadow-2xl scale-[1.02] translate-y-[-4px]"
                    : isAnyHovered
                    ? "opacity-20 border-gray-100 shadow-none scale-[0.98] blur-[0.4px]"
                    : "opacity-35 border-gray-200 shadow-sm"
                }`}
              >
                {/* Quotation Mark Accent */}
                <div className="text-4xl font-serif text-pink-400 opacity-60 leading-none mb-2">
                  “
                </div>

                {/* Optional Memory Photo */}
                {wish.photoUrl && (
                  <div className="relative w-full h-44 mb-4 rounded-xl overflow-hidden border border-gray-100 shadow-inner">
                    <Image
                      src={wish.photoUrl}
                      alt={`Memory photo from ${wish.sender}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 350px"
                    />
                  </div>
                )}

                {/* Wish Message */}
                <p className={`text-base sm:text-lg italic font-medium leading-relaxed mb-6 transition-colors duration-300 ${
                  isHovered ? "text-gray-900 font-semibold" : "text-gray-400"
                }`}>
                  "{wish.message}"
                </p>

                {/* Card Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-white text-sm shadow-sm ${
                      accent === "pink"
                        ? "bg-pink-500"
                        : accent === "sky"
                        ? "bg-sky-500"
                        : "bg-orange-500"
                    }`}>
                      {wish.sender.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="font-extrabold text-sm text-gray-900 leading-snug">
                        {wish.sender}
                      </h4>
                      <span className="text-xs text-gray-400 font-normal">
                        {wish.date || "Today"}
                      </span>
                    </div>
                  </div>

                  {/* Love Reaction Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLoveClick(index);
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-pink-50 hover:bg-pink-500 text-pink-600 hover:text-white border border-pink-200 text-xs font-bold transition-all transform hover:scale-105 active:scale-95"
                  >
                    <span>❤️</span>
                    <span>{wish.loves || 0}</span>
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
