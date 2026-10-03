"use client";

import React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

// List of Temi's background images with staggered floating parameters
const TEMI_IMAGES = [
  { id: 1, src: "/images/11042739-69FF-4947-A5B2-6C70FC82D2F8_1_105_c.jpeg", alt: "Temi ✨", className: "w-44 h-56 top-[14%] left-[14%] z-10 rotate-[-6deg]", duration: 6.2, delay: 0 },
  { id: 2, src: "/images/2607889E-EC46-4733-8DC9-AA96E3F67094_1_105_c.jpeg", alt: "Temi Photo 2", className: "w-40 h-52 top-[10%] right-[18%] z-10 rotate-[5deg]", duration: 5.4, delay: 0.8 },
  { id: 3, src: "/images/42DCFB78-FE64-4617-993C-F853BD135B6B_1_105_c.jpeg", alt: "Temi Photo 3", className: "w-52 h-64 top-[38%] left-[8%] z-20 rotate-[-3deg]", duration: 7.5, delay: 0.3 },
  { id: 4, src: "/images/53138422-E9C8-4C8D-89D6-ED45B26769D6_1_105_c.jpeg", alt: "Temi Photo 4", className: "w-56 h-[17rem] top-[35%] right-[9%] z-20 rotate-[7deg]", duration: 4.8, delay: 1.2 },
  { id: 5, src: "/images/80FA9039-13D5-4E5E-BDBE-85D4D41C9A49_1_105_c.jpeg", alt: "Joyful Moments ❤️", className: "w-48 h-60 bottom-[12%] left-[22%] z-10 rotate-[4deg]", duration: 8.0, delay: 0.5 },
  { id: 6, src: "/images/A59B210F-EF6D-4FC6-8FE8-049ED450C022_1_105_c.jpeg", alt: "Temi Photo 6", className: "w-44 h-56 bottom-[8%] right-[24%] z-10 rotate-[-7deg]", duration: 6.6, delay: 1.5 },
  { id: 7, src: "/images/B89C2BC9-D924-4EC5-880F-786FDCDED6C1_1_201_a.jpeg", alt: "Temi Photo 7", className: "w-36 h-44 top-[8%] left-[42%] z-0 rotate-[2deg] opacity-90", duration: 5.8, delay: 0.2 },
  { id: 8, src: "/images/C278CF6D-51CB-40EC-8FCF-E539A29FC482_1_105_c.jpeg", alt: "Temi Photo 8", className: "w-40 h-48 bottom-[6%] left-[43%] z-0 rotate-[-4deg] opacity-90", duration: 7.1, delay: 0.9 },
  { id: 9, src: "/images/D901E02F-3D45-4CB4-8788-B054D1A24CB7_1_105_c.jpeg", alt: "Temi Photo 9", className: "w-36 h-44 top-[48%] right-[3%] z-0 rotate-[-8deg] opacity-85", duration: 6.0, delay: 1.1 }
];

interface TemiIntroScreenProps {
  onWriteWishClick?: () => void;
}

export default function TemiIntroScreen({ onWriteWishClick }: TemiIntroScreenProps) {
  const handleWriteWish = () => {
    onWriteWishClick?.();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.5 } }}
        className="fixed inset-0 z-[5000] flex items-center justify-center overflow-hidden"
      >
        {/* Soft Celebratory Mesh Gradient Background */}
        <div 
          className="absolute inset-0 z-0 bg-[radial-gradient(at_15%_15%,rgba(244,63,94,0.45)_0px,transparent_55%),radial-gradient(at_85%_20%,rgba(245,158,11,0.45)_0px,transparent_55%),radial-gradient(at_20%_85%,rgba(168,85,247,0.45)_0px,transparent_55%),radial-gradient(at_80%_80%,rgba(56,189,248,0.45)_0px,transparent_55%),linear-gradient(135deg,#1e1b4b_0%,#4c1d95_50%,#831843_100%)]"
        />

        {/* Dynamic Organic Floating Gallery */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          {TEMI_IMAGES.map((img) => (
            <motion.div
              key={img.id}
              className={`absolute p-2 pb-6 bg-white rounded shadow-2xl ${img.className}`}
              animate={{
                y: [0, -22, 0],
              }}
              transition={{
                duration: img.duration,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut",
                delay: img.delay,
              }}
            >
              <div className="relative w-full h-full overflow-hidden rounded-sm">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 150px, 220px"
                  priority
                />
              </div>
              {img.alt && img.alt.includes("✨") && (
                <span className="absolute bottom-1 left-0 right-0 text-center font-bold text-xs text-slate-800">
                  {img.alt}
                </span>
              )}
            </motion.div>
          ))}
        </div>

        {/* Central Overlay Popup Modal - Strict Gateway */}
        <motion.div
          initial={{ scale: 0.85, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="relative z-30 max-w-md w-[90%] mx-4 bg-white/95 backdrop-blur-md border border-white/80 rounded-2xl p-8 text-center shadow-2xl text-slate-900"
        >
          <div className="text-4xl mb-3 animate-bounce">🎂</div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-3 text-slate-900">
            You Are Here Because Of Temi
          </h1>
          <p className="text-base text-slate-600 mb-8 leading-relaxed font-normal">
            Why Don't You Write Her A Wish To Mark The Beginning Of The Rest Of Her Day
          </p>
          <button
            onClick={handleWriteWish}
            className="w-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-bold text-lg py-3.5 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          >
            Write Wish
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
