import { useCartStore } from '../store/useCartStore'

function ProductDetail() {
  const addItem = useCartStore((state) => state.addItem)
  return (
    <section className="py-20 lg:py-28">
      <div className="container-main">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12 lg:gap-16">

          {/* Left — Product Image */}
          <div className="relative">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary-fixed/30 to-transparent"></div>
            <img
              src="https://images.unsplash.com/photo-1556906781-9a412961c28c?w=800&q=80"
              alt="ULTRAVOX-24 marathon shoe closeup"
              className="relative z-10 w-full rounded-2xl object-cover aspect-square"
            />
            <div className="absolute top-6 right-6 z-20 floating-badge shadow-ambient-sm">
              <p className="label-industrial text-outline">Starting at</p>
              <p className="font-headline text-2xl font-bold text-on-surface">$285</p>
            </div>
          </div>

          {/* Right — Specs */}
          <div>
            <span className="label-industrial block mb-3 text-primary">Pro-Level Marathon Engineering</span>
            <h2 className="mb-8 font-headline text-4xl lg:text-5xl font-extrabold tracking-[-0.02em] text-on-surface">
              ULTRAVOX-24
            </h2>

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
              <div className="rounded-lg p-5 bg-surface-container-low">
                <p className="label-industrial mb-1.5 text-outline">Heel Geometry</p>
                <p className="font-body text-sm leading-relaxed text-on-surface">Decoupled crash pad promotes smoother transition.</p>
              </div>
              <div className="rounded-lg p-5 bg-surface-container-low">
                <p className="label-industrial mb-1.5 text-outline">Carbon Plate</p>
                <p className="font-body text-sm leading-relaxed text-on-surface">Full-length 3D molded carbon fiber winglet.</p>
              </div>
            </div>

            {/* Metrics */}
            <div className="flex items-center gap-6 mb-8">
              <div>
                <p className="label-industrial mb-1 text-outline">Weight</p>
                <p className="font-headline text-lg font-bold text-on-surface">198g <span className="text-sm font-normal text-on-surface-variant">/ Size 9</span></p>
              </div>
              <div className="w-px h-10 bg-outline-variant/30"></div>
              <div>
                <p className="label-industrial mb-1 text-outline">Heel-to-Toe Drop</p>
                <p className="font-headline text-lg font-bold text-on-surface">8mm</p>
              </div>
              <div className="w-px h-10 bg-outline-variant/30"></div>
              <div>
                <p className="label-industrial mb-1 text-outline">Intended Use</p>
                <p className="font-headline text-lg font-bold text-primary">Race Day</p>
              </div>
            </div>



            <button onClick={() => addItem({ id: 'promo-1', name: 'ULTRAVOX-24', price: '$285.00', image: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=800&q=80' })} className="inline-flex items-center gap-2.5 px-10 py-4 rounded-xl gradient-cta font-body text-sm font-semibold tracking-wide text-white hover:opacity-90 transition-opacity duration-300">
              Add to Bag — $285.00
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductDetail
