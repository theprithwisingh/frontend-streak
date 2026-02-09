import React from "react";
import { useCSSVariable } from "../context/CSSVariablesProvider";

const Navbar = () => {
  const { themeBadalneWalaFunction } = useCSSVariable();

  return (
    // Fix: Use arbitrary values with CSS variables for dynamic theme support
    <nav className="border-b border-[var(--border)] px-6 py-4 bg-[var(--bg)] text-[var(--text)]">
      <div className="max-w-6xl mx-auto flex items-center justify-between">

        {/* Logo */}
        <div className="text-xl font-bold">DevCorp</div>

        {/* Links */}
        <ul className="hidden md:flex gap-6 text-sm font-medium">
          <li className="cursor-pointer hover:underline">Home</li>
          <li className="cursor-pointer hover:underline">Products</li>
          <li className="cursor-pointer hover:underline">Pricing</li>
          <li className="cursor-pointer hover:underline">Contact</li>
        </ul>

        {/* Button */}
        {/* Fix: Use arbitrary values with CSS variables */}
        <button
          onClick={themeBadalneWalaFunction}
          className="bg-[var(--surface)] text-[var(--text)] border border-[var(--border)] px-4 py-2 rounded-md text-sm hover:opacity-80 transition"
        >
          Theme
        </button>

      </div>
    </nav>
  );
};

export default Navbar;
