"use client";

import React, { useState } from "react";
import TemiIntroScreen from "@/components/TemiIntroScreen";
import WishForm from "@/components/WishForm";

export default function Home() {
  // Strict State Control: Gateway defaults to TRUE so intro screen is forced on landing
  const [showIntro, setShowIntro] = useState<boolean>(true);

  return (
    <main className="min-h-screen bg-white text-gray-900 font-sans">
      {/* 
        Streamlined Direct Flow:
        Clicking "Write Wish" on TemiIntroScreen routes DIRECTLY to WishForm.
        Guestbook WishGrid is extracted to dedicated route /wishes.
      */}
      {showIntro ? (
        <TemiIntroScreen onWriteWishClick={() => setShowIntro(false)} />
      ) : (
        <div className="animate-fade-in py-8 px-4 bg-slate-950 min-h-screen">
          <WishForm />
        </div>
      )}
    </main>
  );
}
