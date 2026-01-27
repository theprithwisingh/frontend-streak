import React from "react";
import { FaSearch, FaShoppingCart } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const { state } = useCart();
  const cartCount = state?.count ?? 0;

  return (
    <header className="sticky top-0 z-50 bg-[#2874f0] shadow-sm">
      <div className="max-w-[1240px] mx-auto px-4 h-14 flex items-center gap-6">
        {/* Logo */}
        <div className="text-white text-xl font-bold tracking-tight cursor-pointer whitespace-nowrap">
          Prithwi
        </div>

        {/* Search */}
        <form
          className="flex flex-1 max-w-[620px] bg-white rounded-sm overflow-hidden shadow-sm"
          role="search"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="search"
            placeholder="Search for products, brands and more"
            className="flex-1 px-4 py-2 text-sm text-gray-700 placeholder-gray-400 outline-none"
            aria-label="Search for products, brands and more"
          />
          <button
            type="submit"
            className="px-4 text-[#2874f0] hover:bg-gray-100 transition flex items-center justify-center"
          >
            <FaSearch className="text-sm" aria-hidden="true" />
            <span className="sr-only">Search</span>
          </button>
        </form>

        {/* Right Section */}
        <div className="flex items-center gap-7 text-white text-sm font-medium ml-auto">
          {/* Login */}
          <button
            type="button"
            className="bg-white text-[#2874f0] px-6 py-1.5 rounded-sm font-semibold hover:shadow transition"
          >
            Login
          </button>

          {/* Profile */}
          <button
            type="button"
            className="flex items-center gap-1 hover:text-gray-200 transition"
          >
            <CgProfile className="text-lg" aria-hidden="true" />
            <span>Account</span>
          </button>

          {/* Cart */}
          <button
            type="button"
            className="relative flex items-center gap-1 hover:text-gray-200 transition"
            aria-label={`Cart with ${cartCount} items`}
          >
            <FaShoppingCart className="text-lg" aria-hidden="true" />
            <span>Cart</span>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-red-500 text-[10px] px-1.5 py-0.5 rounded-full font-semibold">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
