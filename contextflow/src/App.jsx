import React from 'react'
import Navbar from './components/Navbar'
import ProductList from './components/ProductList'
import { ProductProvider } from './context/ProductContext'

const App = () => {
  return (
    <>
      <ProductProvider>
       <Navbar/>
       <ProductList/>
      </ProductProvider>
    </>
  )
}
export default App;
