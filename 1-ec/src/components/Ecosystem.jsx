import EcosystemCard from './ui/EcosystemCard'

function Ecosystem() {
  return (
    <section className="py-20 lg:py-28">
      <div className="container-main">
        <span className="label-industrial block mb-3 text-primary">The Kinetic Ecosystem</span>
        <h2 className="mb-4 font-headline text-3xl sm:text-4xl font-extrabold tracking-[-0.02em] text-on-surface">
          Complete The Journey
        </h2>
        <p className="mb-12 max-w-lg font-body text-base text-on-surface-variant">
          Engineered pairings for the complete performance journey.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <EcosystemCard
            src="https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&q=80"
            alt="Vortex Windshell jacket"
            name="Vortex Windshell"
            price="$145.00"
          />
          <EcosystemCard
            src="https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?w=400&q=80"
            alt="Strata Performance Socks"
            name="Strata Socks"
            price="$32.00"
          />
          <EcosystemCard
            src="https://images.unsplash.com/photo-1603487742131-4160ec999306?w=400&q=80"
            alt="Apex Recovery Slide"
            name="Apex Recovery Slide"
            price="$85.00"
          />
          <EcosystemCard
            src="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&q=80"
            alt="ISO-Flask insulated bottle"
            name="ISO-Flask 0.75L"
            price="$45.00"
          />
        </div>
      </div>
    </section>
  )
}

export default Ecosystem
