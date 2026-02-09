import { createContext } from "react";
import useFetchProducts from "../api/api";

export const ProductContext = createContext(null);

export const ProductProvider = ({ children }) => {
  const productState = useFetchProducts();

  console.log("productState", productState);

  return (
    <ProductContext.Provider value={productState}>
      {children}
    </ProductContext.Provider>
  );
};
