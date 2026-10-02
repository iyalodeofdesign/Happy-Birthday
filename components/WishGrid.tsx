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
}

const DEFAULT_WISHES: WishItem[] = [
  {
    id: "wish-1",
    sender: "Sarah M.",
    message: "Happy Birthday Temi! 🥳 Wishing you the most incredible year filled with laughter, big wins, and endless joy. So blessed to know you!",
    date: "Today",
    loves: 8,
  },
  {
    id: "wish-2",
    sender: "Uncle Dave & Family",
    message: "Temi, you bring so much warmth and light into every room you step into. Hope today is as special as you are! Happy Birthday!",
    photoUrl: "/images/11042739-69FF-4947-A5B2-6C70FC82D2F8_1_105_c.jpeg",
    date: "Today",
    loves: 12,
  },
  {
    id: "wish-3",
    sender: "Chidimma",
    message: "To my amazing friend Temi 🎉 Happy Birthday! Thank you for always being there with great advice and the best energy. Cheers to another year of greatness!",
    date: "Yesterday",
    loves: 15,
  },
  {
    id: "wish-4",
    sender: "Marcus (Tech Team)",
    message: "Happy Birthday Temi! Working alongside you is always a highlight. Wishing you massive success and happiness in all your upcoming projects!",
    photoUrl: "/images/42DCFB78-FE64-4617-993C-F853BD135B6B_1_105_c.jpeg",
    date: "Yesterday",
    loves: 6,
  },
  {
    id: "wish-5",
    sender: "Aunty Grace",
    message: "Happy Birthday Temi ❤️ May this new chapter bring you peace, good health, and all the happiness your heart can hold!",
    date: "2 days ago",
    loves: 10,
  },
  {
    id: "wish-6",
    sender: "Tobi & Sade",
    message: "Temi! Another trip around the sun! Hope you get spoiled today and eat plenty of cake 🎂 Keep shining bright!",
    photoUrl: "/images/80FA9039-13D5-4E5E-BDBE-85D4D41C9A49_1_105_c.jpeg",
    date: "2 days ago",
    loves: 9,
  },
];

interface WishGridProps {
  wishes?: WishItem[];
}

export default function WishGrid({ wishes = DEFAULT_WISHES }: WishGridProps) {
  // 2. STATE-DRIVEN HOVER LOGIC (CRITICAL)
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [wishList, setWishList] = useState<WishItem[]>(wishes);

  const handleLoveClick = (id: string) => {
    setWishList((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, loves: (item.loves || 0) + 1 } : item
      )
    );
  };

  return (
    <section id="wishes-section" className="w-full bg-white text-gray-900 min-h-screen py-16">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-4 mb-12 flex flex-col sm:flex-row sm:items-end justify-between border-b border-gray-100 pb-6 gap-4">
        <div>
          <span className="text-xs font-black tracking-widest text-pink-500 uppercase block mb-1">
            CELEBRATING TEMI
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            Messages for Temi 💌
          </h2>
          <p className="text-gray-400 text-sm sm:text-base mt-1">
            Hover over any card to illuminate the wish written for Temi.
          </p>
        </div>

        <div className="inline-flex items-center gap-2 bg-slate-50 border border-gray-200 px-4 py-2 rounded-full text-sm font-bold text-gray-700 shadow-sm self-start sm:self-auto">
          <span className="text-pink-500 animate-pulse">❤️</span>
          <span>{wishList.length} wishes for Temi</span>
        </div>
      </div>

      {/* 1. STRUCTURAL LOGIC (True Masonry CSS Columns) */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 },
          },
        }}
        className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6 max-w-7xl mx-auto p-4"
      >
        {wishList.map((item) => {
          // Hover State Evaluation
          const isHovered = hoveredId === item.id;
          const isAnotherHovered = hoveredId !== null && !isHovered;

          return (
            <motion.div
              key={item.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
              }}
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="break-inside-avoid relative"
            >
              {/* 3. THE "LIGHT RAY" GLOW EFFECT (Light Theme Background Div Behind Card z-[-1]) */}
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 0.6, scale: 1.05 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="absolute -inset-4 bg-gradient-to-r from-pink-300 via-orange-300 to-sky-300 blur-[40px] opacity-60 transition-opacity duration-500 rounded-3xl z-[-1] pointer-events-none"
                  />
                )}
              </AnimatePresence>

              {/* CARD CONTAINER (relative z-10 with solid white background for sharp text) */}
              <div
                className={`relative z-10 bg-white border rounded-2xl p-6 sm:p-7 transition-all duration-500 ease-out ${
                  isHovered
                    ? "opacity-100 border-pink-200 shadow-2xl scale-[1.02] translate-y-[-2px]"
                    : isAnotherHovered
                    ? "opacity-20 border-gray-100 shadow-none scale-[0.98]"
                    : "opacity-100 border-gray-200 shadow-sm"
                }`}
              >
                {/* Quotation Icon */}
                <div
                  className={`text-4xl font-serif leading-none mb-2 transition-colors duration-500 ${
                    isHovered ? "text-pink-500 opacity-90" : "text-gray-200"
                  }`}
                >
                  “
                </div>

                {/* Optional Memory Photo */}
                {item.photoUrl && (
                  <div
                    className={`relative w-full h-44 mb-4 rounded-xl overflow-hidden border transition-all duration-500 ${
                      isHovered
                        ? "opacity-100 border-pink-100"
                        : "opacity-40 border-gray-100"
                    }`}
                  >
                    <Image
                      src={item.photoUrl}
                      alt={`Memory photo from ${item.sender}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 350px"
                    />
                  </div>
                )}

                {/* Wish Message Text: text-gray-200 by default (faint), text-gray-900 when hovered */}
                <p
                  className={`text-base sm:text-lg italic font-medium leading-relaxed mb-6 transition-colors duration-500 ${
                    isHovered ? "text-gray-900 font-semibold" : "text-gray-200"
                  }`}
                >
                  "{item.message}"
                </p>

                {/* Card Footer */}
                <div
                  className={`flex items-center justify-between pt-4 border-t transition-colors duration-500 ${
                    isHovered ? "border-gray-100" : "border-gray-100/50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-500 ${
                        isHovered
                          ? "bg-pink-500 text-white shadow-md"
                          : "bg-gray-100 text-gray-300"
                      }`}
                    >
                      {item.sender.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h4
                        className={`font-extrabold text-sm leading-snug transition-colors duration-500 ${
                          isHovered ? "text-gray-900" : "text-gray-200"
                        }`}
                      >
                        {item.sender}
                      </h4>
                      <span
                        className={`text-xs transition-colors duration-500 ${
                          isHovered ? "text-gray-400" : "text-gray-200"
                        }`}
                      >
                        {item.date || "Today"}
                      </span>
                    </div>
                  </div>

                  {/* Love Reaction Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLoveClick(item.id);
                    }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-500 ${
                      isHovered
                        ? "bg-pink-50 hover:bg-pink-500 text-pink-600 hover:text-white border border-pink-200 shadow-sm"
                        : "bg-gray-50 text-gray-300 border border-gray-100"
                    }`}
                  >
                    <span>❤️</span>
                    <span>{item.loves || 0}</span>
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
