"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface WishFormProps {
  onWishSubmitted?: (newWish: { name: string; message: string; imageUrl?: string }) => void;
  onNavigateToCarousel?: () => void;
}

export default function WishForm({ onWishSubmitted, onNavigateToCarousel }: WishFormProps) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isImageUploading, setIsImageUploading] = useState<boolean>(false);

  // Success Modal & Temi's Message Modal States
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [showThankYouNote, setShowThankYouNote] = useState(false);

  // Handle Image File Selection
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setIsImageUploading(true);

      const reader = new FileReader();

      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setIsImageUploading(false);
      };

      reader.onerror = () => {
        setIsImageUploading(false);
      };

      reader.readAsDataURL(file);
    }
  };

  // Form Submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim() || isImageUploading || isSubmitting) return;

    const wishData = {
      name: name.trim(),
      message: message.trim(),
      imageUrl: imagePreview || undefined,
    };

    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const response = await fetch("/api/wish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(wishData),
      });
      const result = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(result.error || "Your wish could not be saved. Please try again.");
      }
      onWishSubmitted?.(wishData);
      router.refresh();
      setIsSubmitted(true);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Your wish could not be saved. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setName("");
    setMessage("");
    setImageFile(null);
    setImagePreview(null);
    setIsImageUploading(false);
    setIsSubmitted(false);
    setSubmitError(null);
    setShowThankYouNote(false);
  };

  return (
    <section id="write-wish" className="w-full max-w-2xl mx-auto py-12 px-4">
      {!isSubmitted ? (
        <>
          {/* Form Header (Visible only when not yet submitted) */}
          <div className="text-center mb-8">
            <span className="text-xs font-extrabold tracking-widest text-amber-400 uppercase block mb-1">
              MEMORIES AND SMILES
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
              What do you want Temi to know today?
            </h2>
            <p className="text-slate-400 mt-2 text-base font-normal">
              Your message will appear in Temi's Wishes, and your photo will appear in Memories &amp; Smiles.
            </p>
          </div>

          {/* Main Wish Form */}
          <form
            onSubmit={handleSubmit}
            className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-500 to-amber-500" />

            {/* User Name Input */}
            <div className="space-y-2">
              <label htmlFor="user-name" className="block text-sm font-semibold text-slate-200">
                Your Name <span className="text-rose-500">*</span>
              </label>
              <input
                id="user-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Sarah, Uncle Dave, Alex from Work"
                required
                maxLength={50}
                className="w-full bg-slate-950/60 border border-slate-700/80 rounded-xl px-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 transition-all"
              />
            </div>

            {/* User Message Textarea */}
            <div className="space-y-2">
              <label htmlFor="user-message" className="block text-sm font-semibold text-slate-200">
                Your Birthday Wish for Temi <span className="text-rose-500">*</span>
              </label>
              <textarea
                id="user-message"
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write something heartfelt, funny, or encouraging for Temi..."
                required
                maxLength={1000}
                className="w-full bg-slate-950/60 border border-slate-700/80 rounded-xl px-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 transition-all resize-none"
              />
              <div className="text-right text-xs text-slate-500">
                {message.length} / 1000
              </div>
            </div>

            {/* Image Upload Input ("Memories and Smiles") */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-200">
                Add a Memory Photo with Temi <span className="text-slate-500 font-normal">(Optional)</span>
              </label>
              
              <div className={`relative border-2 border-dashed rounded-xl p-4 text-center transition-colors bg-slate-950/40 ${
                isImageUploading ? "border-amber-400/50 bg-amber-500/5" : "border-slate-700 hover:border-amber-400/60 cursor-pointer"
              }`}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  disabled={isImageUploading || isSubmitting}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed z-10"
                />
                {isImageUploading ? (
                  <div className="py-3 flex flex-col items-center">
                    <svg
                      className="animate-spin h-7 w-7 text-amber-400 mb-2"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    <p className="text-sm font-medium text-amber-400">Processing image...</p>
                    <p className="text-xs text-slate-500 mt-1">Converting photo for upload</p>
                  </div>
                ) : imagePreview ? (
                  <div className="flex items-center gap-4 text-left">
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden border border-slate-600 flex-shrink-0">
                      <Image src={imagePreview} alt="Memory Preview" fill className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-slate-200 truncate">{imageFile?.name}</p>
                      <p className="text-xs text-amber-400 mt-1">Photo attached ✨ Click to change</p>
                    </div>
                  </div>
                ) : (
                  <div className="py-3 flex flex-col items-center">
                    <span className="text-2xl mb-1">📸</span>
                    <p className="text-sm font-medium text-slate-300">Upload a picture with Temi</p>
                    <p className="text-xs text-slate-500 mt-1">PNG, JPG, or WEBP up to 10MB</p>
                  </div>
                )}
              </div>
            </div>

            {submitError && (
              <p role="alert" className="text-sm text-rose-400">{submitError}</p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isImageUploading || isSubmitting}
              className="w-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-bold text-lg py-3.5 px-6 rounded-xl shadow-lg hover:shadow-rose-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none flex items-center justify-center gap-2"
            >
              {isImageUploading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>Processing Image...</span>
                </>
              ) : (
                <span>{isSubmitting ? "Saving Wish..." : "Send Wish ❤️"}</span>
              )}
            </button>
          </form>
        </>
      ) : (
        /* SUCCESS POPUP MODAL (Renders ONLY when isSubmitted is true) */
        <div className="fixed inset-0 z-[6000] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
          <div className="bg-slate-900 border border-emerald-500/30 rounded-2xl p-8 max-w-md w-full text-center shadow-2xl space-y-6 relative overflow-hidden animate-scale-up">
            <div className="w-16 h-16 mx-auto bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center text-3xl animate-bounce">
              🎉
            </div>

            <div>
              <h3 className="text-2xl font-extrabold text-emerald-400">
                Your wish has been added!
              </h3>
              <p className="text-slate-300 text-base mt-2 leading-relaxed">
                Temi now has one more reason to smile today. Thank you for sharing your love and memories!
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3 pt-2">
              <Link
                href="/wishes"
                className="w-full bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 text-slate-950 font-bold py-3 px-5 rounded-xl shadow-md transition-all transform hover:-translate-y-0.5 cursor-pointer text-center block"
              >
                💌 Read other wishes
              </Link>

              <button
                onClick={() => setShowThankYouNote(true)}
                className="w-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-semibold py-3 px-5 rounded-xl shadow-md transition-all transform hover:-translate-y-0.5 cursor-pointer"
              >
                ✨ See Temi's message to you
              </button>

              <button
                onClick={resetForm}
                className="w-full bg-slate-800 hover:bg-slate-700 text-slate-100 font-semibold py-3 px-5 rounded-xl border border-slate-700 transition-all cursor-pointer"
              >
                Send Another Wish ❤️
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TEMI'S THANK YOU NOTE MODAL */}
      {showThankYouNote && (
        <div className="fixed inset-0 z-[6500] flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
          <div className="bg-slate-900 border border-amber-500/30 rounded-2xl p-6 sm:p-8 max-w-lg w-full text-center shadow-2xl space-y-6 relative overflow-hidden flex flex-col max-h-[90vh]">
            <div className="text-4xl animate-pulse flex-shrink-0">💖</div>

            <h3 className="text-2xl font-extrabold text-amber-400 flex-shrink-0">
              A Message From Temi ❤️
            </h3>

            <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-5 text-slate-200 text-sm leading-relaxed text-left whitespace-pre-line max-h-[60vh] overflow-y-auto">
{`Thank you for your birthday wish. I'm truly grateful to have you in my life. I know I can be difficult, annoying and impatient, and even with all those "buts," you still ride with me. Thank you for a great 365 days.
The Bible says, "A friend loveth at all times" (Proverbs 17:17). You have shown me exactly what that looks like.  Every time I think, I'll think of you. 

My advice for you is to keep holding on. Life will get better. "Weeping may endure for a night, but joy cometh in the morning" (Psalm 30:5). Some nights feel long, but morning always comes.
Take breaks when you need them. Rest is not quitting. And keep working hard, even when it feels like it isn't paying off. Your harvest is coming, so just keep trying.

There's a saying I love: "Fall seven times, stand up eight." So if you fall, get back up. And when you feel like you can't do it alone, remember "Fear thou not; for I am with thee" (Isaiah 41:10). You are never really alone.

So, i pray for you: 
Lord, I thank You for this person. Thank You for their kindness, their patience with me, and the way they show up even when I am hard to love. Wherever they are today, be their strength when they are tired, their peace when they are anxious, and their hope when the road feels long. Give them rest that restores them, joy that surprises them, and open doors that no one can shut. Let every seed they have sown in tears be reaped in joy. Keep them safe, keep them whole, and let them feel how deeply they are loved.
In Jesus' name, Amen. 🙏🏾`}
            </div>

            <div className="flex flex-col gap-3 flex-shrink-0">
              <button
                onClick={resetForm}
                className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-3 px-5 rounded-xl shadow-md transition-all cursor-pointer"
              >
                Close &amp; Write Another Wish ✨
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
