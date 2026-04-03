import { useSearch } from '@tanstack/react-router';
import { useProducts } from '../hooks/useProducts';
import ProductCard from '../components/ui/ProductCard';

export default function SearchPage() {
  const searchParams = useSearch({ strict: false });
  const query = searchParams?.q?.toLowerCase() || '';
  const { data: products, isLoading } = useProducts();

  const filteredProducts = products?.filter(p => 
    p.name.toLowerCase().includes(query) || 
    p.category.toLowerCase().includes(query)
  ) || [];

  return (
    <div className="pt-24 pb-20 lg:pt-32 lg:pb-28">
      <div className="container-main">
        <div className="mb-12 border-b border-outline/10 pb-6">
          <span className="label-industrial block mb-3 text-primary uppercase tracking-widest text-xs font-bold">
            Search Results
          </span>
          <h1 className="font-headline text-4xl sm:text-5xl lg:text-5xl font-extrabold tracking-[-0.02em] text-on-surface">
            "{query}"
          </h1>
          <p className="mt-4 max-w-2xl font-body text-base text-on-surface-variant">
            {filteredProducts.length} {filteredProducts.length === 1 ? 'result' : 'results'} found.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
          {isLoading ? (
            Array(4).fill(0).map((_, i) => (
              <div key={i} className="aspect-[4/3] bg-surface-container-highest animate-pulse rounded-lg" />
            ))
          ) : filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))
          ) : (
            <div className="col-span-full py-10 flex flex-col items-center text-center">
              <div className="text-on-surface-variant mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
              </div>
              <h3 className="font-headline text-2xl font-bold text-on-surface">No results found</h3>
              <p className="font-body text-on-surface-variant mt-2">Try adjusting your search criteria and try again.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
