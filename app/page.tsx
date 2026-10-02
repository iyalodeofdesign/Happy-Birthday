"use client";

import React, { useState } from "react";
import TemiIntroScreen from "@/components/TemiIntroScreen";

export default function Home() {
  // Strict State Control: Gateway defaults to TRUE so intro screen is forced on landing
  const [showIntro, setShowIntro] = useState<boolean>(true);

  return (
    <main class="min-h-screen bg-slate-950 text-slate-100 font-sans">
      {/* 
        Strict Conditional Rendering:
        The Intro Screen acts as a strict click-gated barrier.
        Until showIntro is set to false via the "Write Wish" button click,
        only the TemiIntroScreen is rendered.
      */}
      {showIntro ? (
        <TemiIntroScreen onWriteWishClick={() => setShowIntro(false)} />
      ) : (
        <div className="main-landing-phase animate-fade-in">
          {/* Main Birthday Landing Page & Wish Form Flow */}
          <header className="py-6 px-4 text-center bg-purple-900/30 backdrop-blur-md border-b border-purple-500/20">
            <h1 className="text-3xl font-extrabold">Happy Birthday, Temi! 🎂</h1>
            <p className="text-slate-300 mt-2">Welcome to Temi's personal birthday guestbook.</p>
          </header>

          <section id="write-wish" className="max-w-2xl mx-auto py-12 px-4">
            <h2 className="text-2xl font-bold text-center mb-6">Write your wish for Temi ❤️</h2>
            {/* Wish form and guestbook experience */}
          </section>
        </div>
      )}
    </main>
  );
}
