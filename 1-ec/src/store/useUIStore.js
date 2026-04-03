import { create } from 'zustand';

export const useUIStore = create((set) => ({
  isMobileMenuOpen: false,
  isSearchOpen: false,
  isCartOpen: false,
  
  toggleMobileMenu: () => set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
  toggleSearch: () => set((state) => ({ isSearchOpen: !state.isSearchOpen })),
  toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
  closeAll: () => set({ isMobileMenuOpen: false, isSearchOpen: false, isCartOpen: false }),
}));
