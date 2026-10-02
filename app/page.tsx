"use client";

import React, { useState } from "react";
import TemiIntroScreen from "@/components/TemiIntroScreen";
import WishForm from "@/components/WishForm";
import Navbar from "@/components/Navbar";

export default function Home() {
  const [showIntro, setShowIntro] = useState<boolean>(true);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 font-sans">
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
