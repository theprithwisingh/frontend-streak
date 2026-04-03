import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import FeaturedProducts from '../components/FeaturedProducts'
import EditorialQuote from '../components/EditorialQuote'
import DailyCollection from '../components/DailyCollection'
import ProductGrid from '../components/ProductGrid'
import ProductDetail from '../components/ProductDetail'
import Sustainability from '../components/Sustainability'
import Ecosystem from '../components/Ecosystem'
import Newsletter from '../components/Newsletter'
import Footer from '../components/Footer'

function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <FeaturedProducts />
      <EditorialQuote />
      <DailyCollection />
      <ProductGrid />
      <ProductDetail />
      <Sustainability />
      <Ecosystem />
      <Newsletter />
    </div>
  )
}

export default Home
