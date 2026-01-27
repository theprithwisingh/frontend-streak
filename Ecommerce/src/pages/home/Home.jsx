import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Products from "../../components/product/ProductsCard";
import ProductCategory from "../../components/ProductCategory";
import Carousel from "../../components/Carousel";

const Home = () => {
  return (
    <>
      <Navbar />
      <ProductCategory />
      <Carousel />
      <Products />
      <Footer />
    </>
  )
}

export default Home