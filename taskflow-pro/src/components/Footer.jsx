import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-[#D3D3D3]">
      <div className="flex flex-col md:flex-row items-center justify-between px-6 py-6 gap-4">

        {/* Brand */}
        <div className="text-black font-semibold text-lg">
          Prithwi
        </div>

        {/* Menu */}
        <div className="flex gap-5 text-sm text-black">
          <a href="#" className="hover:underline">Home</a>
          <a href="#" className="hover:underline">About</a>
          <a href="#" className="hover:underline">Services</a>
          <a href="#" className="hover:underline">Contact</a>
        </div>

        {/* Social */}
        <div className="flex gap-4 text-black text-sm">
          <a href="#" className="hover:underline">GitHub</a>
          <a href="#" className="hover:underline">Twitter</a>
          <a href="#" className="hover:underline">LinkedIn</a>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
