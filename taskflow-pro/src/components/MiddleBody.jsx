import React from "react";

const MiddleBody = () => {
  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col md:flex-row items-center gap-10">

        {/* Left Content */}
        <div className="flex-1 space-y-4">
          <h1 className="text-4xl font-bold text-black leading-tight">
            Business Landing Page
          </h1>
          <p className="text-gray-600 max-w-md">
            Build modern, responsive websites faster using clean UI and simple layouts.
          </p>
          <button className="bg-black text-white px-6 py-2 rounded-md hover:opacity-90 transition">
            More Info
          </button>
        </div>

        {/* Right Image */}
        <div className="flex-1">
          <img
            src="/hero.png"
            alt="Landing Illustration"
            className="w-full max-w-md mx-auto"
          />
        </div>


      </div>
    </section>
  );
};

export default MiddleBody;
