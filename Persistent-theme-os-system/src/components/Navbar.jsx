import React from "react";
import { usePersistentTheme } from "../context/PersistentThemeOSSystemProvider.jsx";

const Navbar = () => {
  const { theme, toggleTheme } = usePersistentTheme();

  return (
    // Use CSS variables for dynamic theme support
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

        {/* Theme Toggle Button */}
        <button
          type="button"
          onClick={toggleTheme}
          className="border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] px-4 py-2 rounded-md text-sm hover:opacity-80 transition"
        >
          {theme === "dark" ? "Switch to Light" : "Switch to Dark"}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
