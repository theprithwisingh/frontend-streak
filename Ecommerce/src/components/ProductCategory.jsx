import React from "react";
import { fetchCategories } from "../api/productApi";
import { useFetch } from "../hooks/useFetch";

export default function ProductCategory() {
  const { data, loading, error } = useFetch(fetchCategories);
  const categories = Array.isArray(data) ? data : [];

  if (loading) return <p className="p-4">Loading categories…</p>;
  if (error)
    return (
      <p className="p-4 text-red-600" role="alert">
        Failed to load categories.
      </p>
    );
  if (!categories.length) return null;

  return (
    <section className="w-full p-4" aria-label="Product categories">
      <ul className="flex flex-row gap-4 overflow-x-auto scrollbar-hide">
        {categories.map((cat) => (
          <li
            key={cat.slug} // ✅ stable unique key
            className="bg-[#2874f0] text-white font-bold p-3 text-center whitespace-nowrap flex-shrink-0 min-w-[120px] h-[50px] flex items-center justify-center rounded"
          >
            {cat.name} {/* ✅ render string */}
          </li>
        ))}
      </ul>
    </section>
  );
}
