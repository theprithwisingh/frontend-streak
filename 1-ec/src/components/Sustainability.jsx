function Sustainability() {
  return (
    <section className="py-20 lg:py-28 bg-surface-container-low">
      <div className="container-main">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12 lg:gap-20">

          {/* Left — Content */}
          <div>
            <span className="label-industrial block mb-3 text-primary">Sustainability Lab</span>
            <h2 className="mb-6 font-headline text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight tracking-[-0.02em] text-on-surface">
              Crafted For
              <br />
              The Long Run.
            </h2>
            <p className="mb-10 max-w-lg font-body text-base leading-relaxed text-on-surface-variant">
              Our sustainability commitment is woven into every fiber. Using 100% recycled ocean plastics and carbon-neutral manufacturing, the Kinetic Sustainability Lab is redefining the lifespan of luxury performance.
            </p>

            <div className="space-y-6">
              {/* Bio-Based Polymers */}
              <div className="flex items-start gap-5 rounded-lg p-6 bg-surface-container-lowest">
                <div className="flex items-center justify-center shrink-0 w-12 h-12 rounded-xl bg-primary-fixed">
                  <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
                  </svg>
                </div>
                <div>
                  <h4 className="mb-1 font-headline text-base font-bold text-on-surface">Bio-Based Polymers</h4>
                  <p className="font-body text-sm leading-relaxed text-on-surface-variant">Midsoles derived from sugarcane and algae.</p>
                </div>
              </div>

              {/* Closed Loop */}
              <div className="flex items-start gap-5 rounded-lg p-6 bg-surface-container-lowest">
                <div className="flex items-center justify-center shrink-0 w-12 h-12 rounded-xl bg-primary-fixed">
                  <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3" />
                  </svg>
                </div>
                <div>
                  <h4 className="mb-1 font-headline text-base font-bold text-on-surface">Closed Loop Program</h4>
                  <p className="font-body text-sm leading-relaxed text-on-surface-variant">Send back your worn pairs for full materials reclamation.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right — Image */}
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1604671801908-6f0c6a092c05?w=700&q=80"
              alt="Sustainable shoe materials and recycled textiles"
              className="w-full rounded-2xl object-cover aspect-[3/4]"
            />
            {/* Stats overlay */}
            <div className="absolute inset-x-6 bottom-6 rounded-xl p-6 bg-surface-container-lowest/90 backdrop-blur-md shadow-ambient">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="font-headline text-2xl font-extrabold text-primary">100%</p>
                  <p className="label-industrial mt-1 text-outline">Recycled Plastics</p>
                </div>
                <div>
                  <p className="font-headline text-2xl font-extrabold text-primary">0</p>
                  <p className="label-industrial mt-1 text-outline">Carbon Emissions</p>
                </div>
                <div>
                  <p className="font-headline text-2xl font-extrabold text-primary">5yr</p>
                  <p className="label-industrial mt-1 text-outline">Material Warranty</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Sustainability
