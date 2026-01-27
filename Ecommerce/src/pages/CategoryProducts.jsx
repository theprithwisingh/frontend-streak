import React from "react";
import { useParams } from "react-router-dom";
import CategoryWiseProduct from "../components/CategoryWiseProduct";

export default function CategoryProducts() {
  const { category } = useParams();

  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold mb-4">{category}</h1>
      <CategoryWiseProduct category={category} />
    </div>
  );
}
