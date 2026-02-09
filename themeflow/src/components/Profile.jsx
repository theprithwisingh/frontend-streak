import React from "react";
import { useBasicThemeContext } from "../context/BasiccontextProvider";
//https://dummyimage.com/600x500/ffffff/000000&text=Prithwi
const Profile = () => {
  const { theme, toggleTheme } = useBasicThemeContext();
  return (
    <section
      className={`px-6 py-16 ${theme === "dark" ? "bg-black text-white" : "bg-white text-black"}`}
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div>
          <h1 className="text-4xl font-bold mb-4 text-orange-500">
            Purpose of this website to Learning ThemeChanging Mechanism
          </h1>
          <h2 className="text-3xl font-bold mb-4">
            Experienced Software Engineer
          </h2>
          <p className="text-gray-700 mb-4">
            I am a results-driven software engineer with 4+ years of experience
            building scalable, high-performance web applications using modern
            technologies like React, TypeScript, and Node.js.
          </p>
          <p className="text-gray-700 mb-6">
            I specialize in clean architecture, performance optimization, and
            delivering production-grade systems that solve real business
            problems.
          </p>
          <button
            className={`px-6 py-3 rounded-md transition ${
              theme === "dark"
                ? "bg-white text-black hover:bg-gray-200"
                : "bg-black text-white hover:bg-gray-800"
            }`}
          >
            View Portfolio
          </button>
        </div>

        {/* Right Image */}
        <div className="flex justify-center">
          <img
            src={
              theme === "light"
                ? "https://dummyimage.com/600x500/000/fff&text=Prithwi"
                : "https://dummyimage.com/600x500/ffffff/000000&text=Prithwi"
            }
            alt="Profile"
            className="rounded-lg shadow-lg object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default Profile;
