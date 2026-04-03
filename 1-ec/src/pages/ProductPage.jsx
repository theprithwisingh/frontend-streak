import { useParams } from '@tanstack/react-router';
import { useProductById } from '../hooks/useProducts';
import { useCartStore } from '../store/useCartStore';
import FeaturedProducts from '../components/FeaturedProducts';

function ProductPage() {
  const { productId } = useParams({ strict: false });
  // Pass true ID or fallback to first ID if something is weird
  const { data: product, isLoading } = useProductById(productId);
  const addItem = useCartStore((state) => state.addItem);

  if (isLoading || !product) {
    return (
      <div className="pt-32 pb-20 container-main min-h-screen flex items-center justify-center">
        <p className="font-headline text-2xl animate-pulse">Loading architectural specifications...</p>
      </div>
    );
  }

  return (
    <main className="pt-24 lg:pt-32">
      {/* Product Detail Section mapped from ProductDetail.jsx structure */}
      <section className="py-20 lg:py-28">
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12 lg:gap-16">

            {/* Left — Product Image */}
            <div className="relative">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary-fixed/30 to-transparent"></div>
              <img
                src={product.image}
                alt={product.name}
                className="relative z-10 w-full rounded-2xl object-cover aspect-square"
              />
              {product.badge && (
                <div className={`absolute top-6 right-6 z-20 shadow-ambient-sm px-4 py-2 rounded-full ${product.badgeColor || 'bg-surface-container text-on-surface'}`}>
                  <p className="font-headline text-sm font-bold uppercase tracking-wider">{product.badge}</p>
                </div>
              )}
            </div>

            {/* Right — Specs */}
            <div>
              <span className="label-industrial block mb-3 text-primary">{product.category}</span>
              <h1 className="mb-4 font-headline text-4xl lg:text-5xl font-extrabold tracking-[-0.02em] text-on-surface">
                {product.name}
              </h1>
              
              <p className="font-body text-xl lg:text-3xl font-bold text-primary mb-8">
                {product.price}
              </p>

              {/* Technical Specs Grid */}
              <div className="grid grid-cols-2 gap-x-8 gap-y-6 mb-10">
                <div className="rounded-lg p-5 bg-surface-container-low">
                  <p className="label-industrial mb-1.5 text-outline">Midsole Matrix</p>
                  <p className="font-body text-sm leading-relaxed text-on-surface">Dual-density nitrogen-infused EVA provides 22% more energy return.</p>
                </div>
                <div className="rounded-lg p-5 bg-surface-container-low">
                  <p className="label-industrial mb-1.5 text-outline">Aerogrid Upper</p>
                  <p className="font-body text-sm leading-relaxed text-on-surface">Monofilament mesh for maximum thermal regulation.</p>
                </div>
              </div>



              <button 
                onClick={() => addItem(product)}
                className="inline-flex items-center gap-2.5 px-10 py-4 rounded-xl gradient-cta font-body text-sm font-semibold tracking-wide text-white hover:opacity-90 transition-opacity duration-300 w-full md:w-auto justify-center"
              >
                Add to Bag
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      <FeaturedProducts />
    </main>
  );
}

export default ProductPage;
