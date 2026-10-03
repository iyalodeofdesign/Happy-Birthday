"use client";

import React, { useState } from "react";
import Image from "next/image";
import TemiIntroScreen from "@/components/TemiIntroScreen";
import WishForm from "@/components/WishForm";
import Navbar from "@/components/Navbar";

export interface GalleryImage {
  id: string;
  name: string;
  imageUrl: string;
}

interface HomePageClientProps {
  dbImageWishes: GalleryImage[];
}

const DEFAULT_GALLERY: GalleryImage[] = [
  { id: "def-1", name: "Sarah & Friends", imageUrl: "/images/11042739-69FF-4947-A5B2-6C70FC82D2F8_1_105_c.jpeg" },
  { id: "def-2", name: "David M.", imageUrl: "/images/2607889E-EC46-4733-8DC9-AA96E3F67094_1_105_c.jpeg" },
  { id: "def-3", name: "Jessica K.", imageUrl: "/images/42DCFB78-FE64-4617-993C-F853BD135B6B_1_105_c.jpeg" },
  { id: "def-4", name: "Alex P.", imageUrl: "/images/53138422-E9C8-4C8D-89D6-ED45B26769D6_1_105_c.jpeg" },
  { id: "def-5", name: "Uncle John", imageUrl: "/images/80FA9039-13D5-4E5E-BDBE-85D4D41C9A49_1_105_c.jpeg" },
  { id: "def-6", name: "Grace T.", imageUrl: "/images/A59B210F-EF6D-4FC6-8FE8-049ED450C022_1_105_c.jpeg" },
];

export default function HomePageClient({ dbImageWishes }: HomePageClientProps) {
  const [showIntro, setShowIntro] = useState<boolean>(true);

  // Combine database images (where imageUrl != null) with fallback gallery
  const allImages = [...dbImageWishes, ...DEFAULT_GALLERY];

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      {showIntro ? (
        <TemiIntroScreen onWriteWishClick={() => setShowIntro(false)} />
      ) : (
        <div className="animate-fade-in bg-slate-950 min-h-screen flex flex-col">
          <Navbar />
          
          <div className="py-8 px-4 flex-1">
            <WishForm />

            {/* Memories & Smiles - Dynamic Image Gallery */}
            <section id="memories-gallery" className="max-w-7xl mx-auto py-16 px-4 border-t border-slate-800/80 mt-12">
              <div className="text-center max-w-2xl mx-auto mb-12">
                <span className="text-xs font-extrabold tracking-widest text-amber-400 uppercase block mb-1">
                  MEMORIES &amp; SMILES
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                  Celebrating Temi ✨
                </h2>
                <p className="text-slate-400 mt-2 text-base">
                  A photo gallery of special moments shared by everyone who loves Temi.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                {allImages.map((img) => (
                  <div
                    key={img.id}
                    className="group relative h-72 rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/60 shadow-xl transition-all duration-300 hover:scale-[1.02] hover:border-amber-400/50 hover:shadow-2xl hover:shadow-amber-500/10"
                  >
                    <Image
                      src={img.imageUrl}
                      alt={`Memory photo shared by ${img.name}`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                    {/* Dynamic Name Tag Overlay */}
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                      <div className="bg-slate-900/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-slate-700/80 shadow-md">
                        <p className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                          <span>📸</span>
                          <span>{img.name}</span>
                        </p>
                      </div>
                      <span className="text-xs font-semibold text-slate-300 bg-slate-950/70 backdrop-blur-sm px-2.5 py-1 rounded-full border border-slate-800">
                        For Temi ✨
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      )}
    </main>
  );
}
