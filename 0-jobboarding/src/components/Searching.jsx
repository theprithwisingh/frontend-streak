import React, { useState, useEffect } from "react";

const Searching = ({ onSearch }) => {
  const [value, setValue] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(value);
    }, 500); // debounce delay

    return () => clearTimeout(timer);
  }, [value, onSearch]);

  return (
    <input
      type="text"
      placeholder="Search jobs..."
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className="w-full rounded-xl border border-gray-300 px-4 py-2 text-sm text-gray-900 placeholder-gray-400 shadow-sm focus:border-black focus:ring-2 focus:ring-black/10 outline-none transition-colors"
    />
  );
};

export default Searching;