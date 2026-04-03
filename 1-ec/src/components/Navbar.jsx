import { Link } from '@tanstack/react-router'
import { useCartStore } from '../store/useCartStore'
import { useUIStore } from '../store/useUIStore'

function Navbar() {
  const cartCount = useCartStore((state) => state.cartCount)
  const isMobileMenuOpen = useUIStore((state) => state.isMobileMenuOpen)
  const toggleMobileMenu = useUIStore((state) => state.toggleMobileMenu)
  const toggleSearch = useUIStore((state) => state.toggleSearch)
  const toggleCart = useUIStore((state) => state.toggleCart)

  return (
    <nav className="glass-nav fixed inset-x-0 top-0 z-50 ghost-border">
      <div className="container-main flex items-center justify-between h-16 lg:h-20">

        {/* Logo */}
        <Link to="/" className="font-headline text-xl lg:text-2xl font-extrabold tracking-[-0.03em] text-on-surface">
          KINETIC
        </Link>

        {/* Nav Links */}
        <div className="hidden lg:flex items-center gap-8">
          <Link to="/category/new-arrivals" className="nav-link">New Arrivals</Link>
          <Link to="/category/performance" className="nav-link">Performance</Link>
          <Link to="/category/lifestyle" className="nav-link">Lifestyle</Link>
          <Link to="/category/collections" className="nav-link">Collections</Link>
          <Link to="/category/sustainability" className="nav-link">Sustainability</Link>
          <Link to="/category/journal" className="nav-link">Journal</Link>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-5">
          {/* Search */}
          <svg onClick={toggleSearch} className="w-5 h-5 cursor-pointer text-on-surface-variant hover:text-on-surface transition-colors" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
          {/* Cart */}
          <div className="relative" onClick={toggleCart}>
            <svg className="w-5 h-5 cursor-pointer text-on-surface-variant hover:text-on-surface transition-colors" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2.5 flex items-center justify-center w-4.5 h-4.5 rounded-full gradient-cta text-[10px] font-bold text-white shadow-ambient-sm">
                {cartCount}
              </span>
            )}
          </div>
          {/* Mobile menu */}
          <svg onClick={toggleMobileMenu} className={`w-6 h-6 cursor-pointer lg:hidden transition-transform ${isMobileMenuOpen ? 'rotate-90 text-primary' : 'text-on-surface'}`} fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
