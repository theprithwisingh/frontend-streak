import React from "react";
import { useNavigate } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { fetchProductsByCategory } from "../api/productApi";

export default function CategoryWiseProduct({ category }) {
  const navigate = useNavigate();
  const { data, loading, error } = useFetch(fetchProductsByCategory, category);

  const products = data?.products ?? [];

  if (!category) {
    return null;
  }

  if (loading) {
    return <p className="p-4">Loading products…</p>;
  }

  if (error) {
    return (
      <p className="p-4 text-red-600" role="alert">
        Failed to load products for this category.
      </p>
    );
  }

  if (!products.length) {
    return null;
  }

  return (
    <div className="flex items-stretch gap-4">
      {products.slice(0, 5).map((p) => (
        <button
          key={p.id}
          type="button"
          onClick={() => navigate(`/product/${p.id}`)}
          className="flex flex-col items-start border rounded p-3 hover:shadow transition bg-white text-left min-w-[160px]"
        >
          <img
            src={p.thumbnail}
            alt={p.title}
            className="w-full h-32 object-cover mb-2 rounded"
          />
          <span className="font-medium text-sm line-clamp-2">{p.title}</span>
          <span className="text-sm text-gray-700 mt-1">₹ {p.price}</span>
        </button>
      ))}

      <button
        type="button"
        onClick={() => navigate(`/category/${category}`)}
        className="text-xl px-3 py-2 rounded border self-center hover:bg-gray-100"
        aria-label={`View all products in ${category}`}
      >
        &gt;
      </button>
    </div>
  );
}
