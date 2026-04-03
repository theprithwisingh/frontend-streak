import { Link } from '@tanstack/react-router'

function DailyCollection() {
  return (
    <section className="py-20 lg:py-28">
      <div className="container-main">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">

          {/* KINETIC FLOW — Daily Utility */}
          <article className="group relative overflow-hidden rounded-lg bg-surface-container-lowest">
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=700&q=80"
                alt="KINETIC FLOW lifestyle shoe"
                className="card-img"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-on-surface/70 via-on-surface/20 to-transparent"></div>
            <div className="absolute inset-x-0 bottom-0 p-8 lg:p-10">
              <span className="label-industrial block mb-2 text-white/70">Daily Utility</span>
              <h3 className="mb-3 font-headline text-2xl lg:text-3xl font-extrabold text-white">KINETIC FLOW</h3>
              <Link to="/product/$productId" params={{ productId: 'daily-kinetic-flow' }} className="inline-flex items-center gap-2 pb-0.5 border-b border-white/50 font-body text-sm font-semibold text-white hover:border-white transition-colors">
                Explore
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>
          </article>

          {/* STEALTH 0X — Night Performance */}
          <article className="group relative overflow-hidden rounded-lg bg-inverse-surface">
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=700&q=80"
                alt="STEALTH 0X night performance shoe"
                className="card-img opacity-80"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface via-inverse-surface/40 to-transparent"></div>
            <div className="absolute inset-x-0 bottom-0 p-8 lg:p-10">
              <span className="label-industrial block mb-2 text-inverse-primary">Night Performance</span>
              <h3 className="mb-3 font-headline text-2xl lg:text-3xl font-extrabold text-inverse-on-surface">STEALTH 0X</h3>
              <Link to="/product/$productId" params={{ productId: 'daily-stealth-0x' }} className="inline-flex items-center gap-2 pb-0.5 border-b border-inverse-on-surface/50 font-body text-sm font-semibold text-inverse-on-surface hover:border-inverse-on-surface transition-colors">
                Discover
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}

export default DailyCollection
