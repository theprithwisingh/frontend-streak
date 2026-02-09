import React from 'react'
import { useBasicThemeContext } from '../context/BasiccontextProvider';
const Footer = () => {
  const { theme, toggleTheme }=useBasicThemeContext();
  return (
    <footer className={`px-6 py-10 border-t ${theme ==="dark" ? "bg-black text-white" : "bg-white text-black"}`}>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Company & Subsidiaries */}
        <div>
          <h3 className="font-semibold text-lg mb-3">Company & Subsidiaries</h3>
          <ul className="space-y-2 text-sm">
            <li>ChatGPT Technologies Pvt Ltd</li>
            <li>OpenMind AI Labs</li>
            <li>NeuralSoft Solutions</li>
            <li>FutureWeb Systems</li>
          </ul>
        </div>

        {/* Useful Links */}
        <div>
          <h3 className="font-semibold text-lg mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>About Us</li>
            <li>Careers</li>
            <li>Blog</li>
            <li>Contact Support</li>
          </ul>
        </div>

        {/* Brand + Address + Socials */}
        <div>
          <h3 className="font-bold text-xl mb-2">DevCorp</h3>
          <p className="text-sm mb-3">Building scalable web platforms worldwide.</p>
          <p className="text-sm leading-relaxed mb-4">
            📍 221B Tech Street, Bengaluru, India <br />
            📧 support@devcorp.io <br />
            ☎️ +91 98765 43210
          </p>

          <ul className="flex gap-4 text-sm font-medium">
            <li className="cursor-pointer hover:underline">Twitter</li>
            <li className="cursor-pointer hover:underline">Facebook</li>
            <li className="cursor-pointer hover:underline">Instagram</li>
            <li className="cursor-pointer hover:underline">LinkedIn</li>
          </ul>
        </div>

      </div>

      <div className="mt-10 border-t pt-4 text-center text-xs text-gray-600">
        © {new Date().getFullYear()} DevCorp. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer
