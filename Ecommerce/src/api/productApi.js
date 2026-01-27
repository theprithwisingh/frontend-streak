// api/productApi.js

const handleResponse = async (res) => {
  if (!res.ok) {
    const message = `Request failed with status ${res.status}`;
    throw new Error(message);
  }
  return res.json();
};

export const fetchCategories = async () => {
  const res = await fetch("https://dummyjson.com/products/categories");
  return handleResponse(res);
};

export const fetchProductsByCategory = async (category) => {
  const res = await fetch(
    `https://dummyjson.com/products/category/${encodeURIComponent(category)}`
  );
  return handleResponse(res);
};

export const fetchProductById = async (id) => {
  const res = await fetch(`https://dummyjson.com/products/${encodeURIComponent(id)}`);
  return handleResponse(res);
};
