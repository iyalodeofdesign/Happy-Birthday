"use client";

import React from "react";
import Image from "next/image";
import { WishItem } from "./WishGrid";

interface GallerySectionProps {
  wishes?: WishItem[];
}

const DEFAULT_GALLERY_WISHES: WishItem[] = [
  {
    id: "wish-2",
    sender: "Uncle Dave & Family",
    message: "Temi, you bring so much warmth and light into every room you step into.",
    photoUrl: "/images/11042739-69FF-4947-A5B2-6C70FC82D2F8_1_105_c.jpeg",
  },
  {
    id: "wish-4",
    sender: "Marcus (Tech Team)",
    message: "Happy Birthday Temi! Working alongside you is always a highlight.",
    photoUrl: "/images/42DCFB78-FE64-4617-993C-F853BD135B6B_1_105_c.jpeg",
  },
  {
    id: "wish-6",
    sender: "Tobi & Sade",
    message: "Temi! Another trip around the sun!",
    photoUrl: "/images/80FA9039-13D5-4E5E-BDBE-85D4D41C9A49_1_105_c.jpeg",
  },
];

export default function GallerySection({ wishes = DEFAULT_GALLERY_WISHES }: GallerySectionProps) {
  // Filter wishes to only retrieve items where a photo/image URL exists
  const photoWishes = wishes.filter(
    (wish) => wish.photoUrl || (wish as any).imageUrl
  );

  return (
    <section id="photo-gallery" className="w-full bg-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10">
          <span className="text-xs font-black tracking-widest text-pink-500 uppercase block mb-1">
            MEMORIES &amp; SMILES
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            Celebrating Temi ✨
          </h2>
          <p className="text-gray-400 text-sm sm:text-base mt-1">
            Moments of joy, elegance, and sunshine.
          </p>
        </div>

        {/* Dynamic Grid of User Uploaded Photos */}
        {photoWishes.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {photoWishes.map((item) => {
              const photo = item.photoUrl || (item as any).imageUrl;
              return (
                <div
                  key={item.id}
                  className="relative group aspect-square rounded-2xl overflow-hidden border border-gray-100 shadow-md bg-gray-50 transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
                >
                  <Image
                    src={photo}
                    alt={`Photo memory from ${item.sender} with Temi`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                  />

                  {/* Name Tag Overlay: "{user.name} and Temi" */}
                  <div className="absolute bottom-3 left-3 z-10 bg-black/60 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full border border-white/20 shadow-md pointer-events-none transition-all duration-300 group-hover:bg-black/75">
                    {item.sender} and Temi
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12 border border-dashed border-gray-200 rounded-2xl bg-gray-50/50">
            <p className="text-gray-400 text-sm">No memory photos uploaded yet. Be the first to share a picture with Temi!</p>
          </div>
        )}
      </div>
    </section>
  );
}
