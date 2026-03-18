import React from "react";
import { usePersistentTheme } from "../context/PersistentThemeOSSystemProvider.jsx";

// https://dummyimage.com/600x500/ffffff/000000&text=Prithwi
const Profile = () => {
  const { theme } = usePersistentTheme();

  return (
    // Use CSS variables for dynamic theme support
    <section className="px-6 py-16 bg-[var(--bg)] text-[var(--text)]">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div>
          <h1 className="text-4xl font-bold mb-4 text-orange-500">
            Purpose of this website to Learning ThemeChanging Mechanism
          </h1>
          <h2 className="text-3xl font-bold mb-4">
            Experienced Software Engineer
          </h2>

          <p className="opacity-80 mb-4">
            I am a results-driven software engineer with 4+ years of experience
            building scalable, high-performance web applications using modern
            technologies like React, TypeScript, and Node.js.
          </p>
          <p className="bg-[var(--surface)] text-[var(--text)] opacity-80 mb-6 rounded-md p-3">
            I specialize in clean architecture, performance optimization, and
            delivering production-grade systems that solve real business
            problems.
          </p>

          <div className="flex items-center gap-4">
            <button
              className="bg-[var(--surface)] text-[var(--text)] border border-[var(--border)] px-4 py-2 rounded-md text-sm hover:opacity-80 transition"
            >
              View Portfolio
            </button>
            <span className="text-xs opacity-70">
              Current theme: <strong>{theme}</strong>
            </span>
          </div>
        </div>

        {/* Right Image */}
        <div className="flex justify-center">
          <img
            src="https://dummyimage.com/600x500/000/FF6900&text=Prithwi"
            alt="Profile"
            className="rounded-lg shadow-lg object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default Profile;
