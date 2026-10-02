"use client";

import React, { useState } from "react";
import TemiIntroScreen from "@/components/TemiIntroScreen";
import WishForm from "@/components/WishForm";

export default function Home() {
  // Strict State Control: Gateway defaults to TRUE so intro screen is forced on landing
  const [showIntro, setShowIntro] = useState<boolean>(true);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      {/* 
        Streamlined Direct Flow:
        Clicking "Write Wish" on TemiIntroScreen routes DIRECTLY to WishForm.
      */}
      {showIntro ? (
        <TemiIntroScreen onWriteWishClick={() => setShowIntro(false)} />
      ) : (
        <div className="animate-fade-in py-8 px-4">
          <WishForm onNavigateToCarousel={() => {
            const carousel = document.getElementById("wishes-section");
            if (carousel) carousel.scrollIntoView({ behavior: "smooth" });
          }} />
        </div>
      )}
    </main>
  );
}
