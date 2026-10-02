"use client";

import React, { useState } from "react";
import TemiIntroScreen from "@/components/TemiIntroScreen";
import WishForm from "@/components/WishForm";
import Navbar from "@/components/Navbar";

export default function Home() {
  // Strict State Control: Gateway defaults to TRUE so intro screen is forced on landing
  const [showIntro, setShowIntro] = useState<boolean>(true);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      {/* 
        Streamlined Direct Flow:
        Clicking "Write Wish" on TemiIntroScreen routes DIRECTLY to WishForm.
        Guestbook WishGrid is extracted to dedicated route /wishes.
      */}
      {showIntro ? (
        <TemiIntroScreen onWriteWishClick={() => setShowIntro(false)} />
      ) : (
        <div className="animate-fade-in bg-slate-950 min-h-screen flex flex-col">
          <Navbar />
          <div className="py-8 px-4 flex-1">
            <WishForm />
          </div>
        </div>
      )}
    </main>
  );
}
