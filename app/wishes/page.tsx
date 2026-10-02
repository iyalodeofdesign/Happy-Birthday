"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import WishGrid from "@/components/WishGrid";
import GallerySection from "@/components/GallerySection";

export default function WishesPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      <Navbar />

      {/* Guestbook Section */}
      <div className="py-4">
        <WishGrid />
        <GallerySection />
      </div>
    </main>
  );
}
