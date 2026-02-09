import axios from "axios";
import React, { useEffect, useState } from "react";
import useProduct from "../context/useProduct";

const ProductList = () => {

  const {data, loading, error} = useProduct()


  if(error) return <div>Error...</div>;
  if (loading) return <div>Loading...</div>;

  return (
    <>
    <div>
         {data.map((item) => (
        <div key={item.id}>
          <img src={item.images[0]} alt={item.category} width="150" />
          <div>
            <p>{item.title}</p>
            <p>{item.category}</p>
          </div>
        </div>
      ))}
    </div>
    </>
  )};

export default ProductList;
