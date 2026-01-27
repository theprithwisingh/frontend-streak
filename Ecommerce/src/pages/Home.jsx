import React from 'react'
import Carousel from '../components/Carousel'
import CategoryWiseProduct from '../components/CategoryWiseProduct'

const Home = () => {
    return (
        <>
            <Navbar />
            <CategoriesBar />
            <Carousel />
            <CategoryWiseProduct category="smartphones" />
            <CategoryWiseProduct category="laptops" />
            <Footer />

        </>
    )
}

export default Home