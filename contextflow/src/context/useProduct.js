import React, { useContext } from "react";
import { ProductContext } from "./ProductContext";

const useProduct = () => {
  const productsStore  = useContext(ProductContext);//productsStore  variable me ProductContext ka current value useContext hook ke through store ho raha hai.
  if (!productsStore ) throw new Error("useProducts must be used inside ProductProvider");
  return productsStore ;
};

export default useProduct;