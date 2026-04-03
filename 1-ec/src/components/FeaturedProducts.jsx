import ArrowIcon from './ui/ArrowIcon'
import ProductCard from './ui/ProductCard'
import { useFeaturedProducts } from '../hooks/useProducts'
import { Link } from '@tanstack/react-router'

function FeaturedProducts() {
  const { data: products, isLoading } = useFeaturedProducts()

  return (
    <section className="py-20 lg:py-28 bg-surface-container-low">
      <div className="container-main">
        <div className="flex items-end justify-between mb-14">
          <div>
            <span className="label-industrial block mb-3 text-primary">Featured Drops</span>
            <h2 className="font-headline text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-[-0.02em] text-on-surface">
              Kinetic Pulse
            </h2>
            <p className="mt-3 max-w-xl font-body text-base text-on-surface-variant">
              Our most responsive distance runners ever created.
            </p>
          </div>
          <Link to="/" className="hidden md:inline-flex items-center gap-2 pb-0.5 border-b-2 border-primary font-body text-sm font-semibold text-primary hover:opacity-70 transition-opacity">
            View All Performance
            <ArrowIcon />
          </Link>
        </div>

        {/* Product Grid — 3 cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {isLoading ? (
            Array(3).fill(0).map((_, i) => (
              <div key={i} className="aspect-[4/3] bg-surface-container-highest animate-pulse rounded-lg" />
            ))
          ) : (
            products.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))
          )}
        </div>

        {/* Mobile "View All" */}
        <div className="mt-10 md:hidden text-center">
          <Link to="/" className="inline-flex items-center gap-2 pb-0.5 border-b-2 border-primary font-body text-sm font-semibold text-primary">
            View All Performance
            <ArrowIcon />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default FeaturedProducts
