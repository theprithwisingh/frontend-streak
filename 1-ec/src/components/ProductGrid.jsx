import ProductCard from './ui/ProductCard'
import { useLabProducts } from '../hooks/useProducts'

function ProductGrid() {
  const { data: products, isLoading } = useLabProducts()

  return (
    <section className="py-20 lg:py-28 bg-surface-container-low">
      <div className="container-main">
        <div className="flex items-end justify-between mb-14">
          <div>
            <span className="label-industrial block mb-3 text-primary">Aero-Kinetic Series</span>
            <h2 className="font-headline text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-[-0.02em] text-on-surface">
              Explore The Lab
            </h2>
          </div>
          <p className="hidden md:block font-body text-sm text-on-surface-variant">
            Displaying 6 of 24 performance iterations
          </p>
        </div>

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
      </div>
    </section>
  )
}

export default ProductGrid
