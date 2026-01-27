// context/ProductContext.jsx
import React from "react";
import { createContext, useContext, useState } from "react";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [productsCache, setProductsCache] = useState({});

  return (
    <ProductContext.Provider value={{ productsCache, setProductsCache }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProductsContext = () => useContext(ProductContext);
