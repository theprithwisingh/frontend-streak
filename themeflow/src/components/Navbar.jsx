import React, { useEffect } from "react";
import { useBasicThemeContext } from "../context/BasiccontextProvider";

const Navbar = () => {
   const { theme, toggleTheme }=useBasicThemeContext();
   
   useEffect(()=>{
    document.documentElement.classList=theme;
   },[theme])

    return (
    <nav className={`border-b px-6 py-4 ${
        theme === "dark" ? "bg-black text-white" : "bg-white text-black"
      }`}>
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
        <button
        onClick={toggleTheme}
        className="bg-black text-white px-4 py-2 rounded-md text-sm hover:bg-gray-800 transition">
          Theme
        </button>

      </div>
    </nav>
  );
};

export default Navbar;
