import { useEffect, useRef, useState } from "react";
import React from "react";



// Using remote placeholder images so we don't depend on missing local assets.
// Replace these URLs with your own local files once they exist.
const images = [
  { id: 1, src: "../assets/adsPoster/1.webp" },
  { id: 2, src: "../assets/adsPoster/2.webp" },
  { id: 3, src: "../assets/adsPoster/3.webp" },
  { id: 4, src: "../assets/adsPoster/4.webp" },
  { id: 5, src: "../assets/adsPoster/5.webp" },
  { id: 6, src: "../assets/adsPoster/6.webp" },
];

const SLIDE_DURATION = 4000; // 4 sec per slide

export default function Carousel() {
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef(null);

  const total = images.length;

  // ---------- Core slide logic ----------
  const next = () => {
    setIndex((prev) => (prev + 1) % total);
    resetProgress();
  };

  const prev = () => {
    setIndex((prev) => (prev - 1 + total) % total);
    resetProgress();
  };

  const resetProgress = () => setProgress(0);

  // ---------- Auto-slide + progress ----------
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          next();
          return 0;
        }
        return p + 100 / (SLIDE_DURATION / 100);
      });
    }, 100);

    return () => clearInterval(intervalRef.current);
  }, [index]);

  return (
    <div className="relative w-full max-w-7xl mx-auto overflow-hidden rounded-xl">
      {/* Image */}
      <img
        src={images[index].src}
        alt="slide"
        className="w-full h-[300px] object-cover transition-all duration-500"
      />

      {/* Left Button */}
      <button
        onClick={prev}
        className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 text-white px-3 py-2 rounded-full hover:bg-black"
      >
        ‹
      </button>

      {/* Right Button */}
      <button
        onClick={next}
        className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 text-white px-3 py-2 rounded-full hover:bg-black"
      >
        ›
      </button>

      {/* Progress Bar */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-[100px] h-1 bg-white/30 rounded overflow-hidden">
        <div
          className="h-full bg-white transition-all duration-100"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
