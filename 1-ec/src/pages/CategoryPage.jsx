import { useParams } from '@tanstack/react-router';
import { useProducts } from '../hooks/useProducts';
import ProductCard from '../components/ui/ProductCard';
import ArrowIcon from '../components/ui/ArrowIcon';

export default function CategoryPage() {
  const { categoryId } = useParams({ strict: false });
  const { data: products, isLoading } = useProducts();

  // Create a pretty title from the category path parameter
  const title = categoryId 
    ? categoryId.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
    : 'All Products';

  // We pseudo-filter the fake products so each category returns different items.
  const filteredProducts = products ? products.filter((p) => {
    if (!categoryId) return true;
    const cat = categoryId.toLowerCase();
    
    if (cat === 'new-arrivals') return p.badge;
    if (cat === 'performance') return p.category.includes('Response') || p.category.includes('Lab') || p.category.includes('Performance');
    if (cat === 'lifestyle') return p.category.includes('Utility') || p.category.includes('Mesh') || p.category.includes('Kinetic');
    if (cat === 'collections') return p.id % 2 === 0 || p.id.includes('stealth');
    if (cat === 'sustainability') return p.id % 2 !== 0 && !p.id.includes('daily');
    if (cat === 'journal') return p.id === '3' || p.id === 'daily-kinetic-flow'; 
    
    // Default fallback
    return p.category.toLowerCase().includes(cat.replace('-', ' '));
  }) : [];

  return (
    <div className="pt-24 pb-20 lg:pt-32 lg:pb-28">
      <div className="container-main">
        {/* Category Header */}
        <div className="mb-12 border-b border-outline/10 pb-6">
          <span className="label-industrial block mb-3 text-primary uppercase tracking-widest text-xs font-bold">
            Category
          </span>
          <h1 className="font-headline text-4xl sm:text-5xl lg:text-5xl font-extrabold tracking-[-0.02em] text-on-surface">
            {title}
          </h1>
          <p className="mt-4 max-w-2xl font-body text-base text-on-surface-variant">
            Explore the latest advancements in {title.toLowerCase()}. Engineered for precision, crafted for aesthetic.
          </p>
        </div>

        {/* Filters/Sorting Mock */}
        <div className="flex justify-between items-center mb-8 bg-surface-container-low p-4 rounded-xl border border-outline/5">
          <div className="font-body text-sm font-semibold text-on-surface">
            {isLoading ? 0 : filteredProducts.length} Products
          </div>
          <button className="flex items-center gap-2 font-body text-sm font-semibold text-on-surface-variant hover:text-on-surface transition-colors">
            Sort by Featured
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
          {isLoading ? (
            Array(8).fill(0).map((_, i) => (
              <div key={i} className="aspect-[4/3] bg-surface-container-highest animate-pulse rounded-lg" />
            ))
          ) : filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))
          ) : (
            <div className="col-span-full py-10 flex flex-col items-center text-center">
              <p className="font-headline text-2xl font-bold text-on-surface">No products found in this category.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
