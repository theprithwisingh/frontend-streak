import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#172337] text-gray-300 mt-16 fixed bottom-0 left-0 right-0">
      <div className="max-w-[1240px] mx-auto px-4 py-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8">

        {/* About */}
        <div>
          <p className="text-xs uppercase tracking-wider text-gray-400 mb-3">
            About
          </p>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer">Contact Us</li>
            <li className="hover:text-white cursor-pointer">About Us</li>
            <li className="hover:text-white cursor-pointer">Careers</li>
            <li className="hover:text-white cursor-pointer">Press</li>
          </ul>
        </div>

        {/* Help */}
        <div>
          <p className="text-xs uppercase tracking-wider text-gray-400 mb-3">
            Help
          </p>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer">Payments</li>
            <li className="hover:text-white cursor-pointer">Shipping</li>
            <li className="hover:text-white cursor-pointer">Cancellation & Returns</li>
            <li className="hover:text-white cursor-pointer">FAQ</li>
          </ul>
        </div>

        {/* Policy */}
        <div>
          <p className="text-xs uppercase tracking-wider text-gray-400 mb-3">
            Policy
          </p>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer">Return Policy</li>
            <li className="hover:text-white cursor-pointer">Terms of Use</li>
            <li className="hover:text-white cursor-pointer">Security</li>
            <li className="hover:text-white cursor-pointer">Privacy</li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <p className="text-xs uppercase tracking-wider text-gray-400 mb-3">
            Social
          </p>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer">Facebook</li>
            <li className="hover:text-white cursor-pointer">Twitter</li>
            <li className="hover:text-white cursor-pointer">YouTube</li>
          </ul>
        </div>

        {/* Address */}
        <div className="text-sm leading-relaxed text-gray-400">
          <p className="text-xs uppercase tracking-wider text-gray-400 mb-3">
            Mail Us
          </p>
          <p>
            Prithwi Pvt Ltd,<br />
            Tech Park Road,<br />
            Bengaluru, Karnataka,<br />
            India - 560103
          </p>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700">
        <div className="max-w-[1240px] mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-400">
          <p>© {new Date().getFullYear()} Prithwi. All rights reserved.</p>
          <p>India</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
