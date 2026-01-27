// pages/ProductDetails.jsx
import React from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { fetchProductById } from "../api/productApi";
import { useCart } from "../context/CartContext";

export default function ProductDetails() {
  const { id } = useParams();
  const { data, loading, error } = useFetch(fetchProductById, id);
  const { dispatch } = useCart();

  if (loading) {
    return <p className="p-4">Loading product…</p>;
  }

  if (error || !data) {
    return (
      <p className="p-4 text-red-600" role="alert">
        Failed to load product details.
      </p>
    );
  }

  return (
    <main className="p-4 flex flex-col md:flex-row gap-6">
      <div className="flex-1 flex items-center justify-center">
        <img
          src={data.thumbnail}
          alt={data.title}
          className="max-h-80 object-contain rounded"
        />
      </div>

      <section className="flex-1 space-y-3">
        <h1 className="text-2xl font-semibold">{data.title}</h1>
        <p className="text-xl font-medium text-green-700">₹ {data.price}</p>
        <p className="text-sm text-gray-700">{data.description}</p>

        <button
          type="button"
          onClick={() => dispatch({ type: "ADD" })}
          className="mt-4 inline-flex items-center justify-center px-4 py-2 rounded bg-orange-500 text-white font-semibold hover:bg-orange-600 transition"
        >
          Add to Cart
        </button>
      </section>
    </main>
  );
}
