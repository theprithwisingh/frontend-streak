import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      cartCount: 0,
      
      addItem: (product) => {
        set((state) => {
          const existingItemIndex = state.items.findIndex(item => item.id === product.id);
          let newItems;
          if (existingItemIndex >= 0) {
            newItems = [...state.items];
            newItems[existingItemIndex] = { 
               ...newItems[existingItemIndex], 
               quantity: (newItems[existingItemIndex].quantity || 1) + 1 
            };
          } else {
            newItems = [...state.items, { ...product, quantity: 1 }];
          }
          
          const newCount = newItems.reduce((acc, item) => acc + (item.quantity || 1), 0);
          return { items: newItems, cartCount: newCount };
        });
      },

      decreaseQuantity: (id) => {
        set((state) => {
          const itemIndex = state.items.findIndex(item => item.id === id);
          if (itemIndex === -1) return state;

          let newItems = [...state.items];
          if ((newItems[itemIndex].quantity || 1) > 1) {
            newItems[itemIndex] = {
              ...newItems[itemIndex],
              quantity: newItems[itemIndex].quantity - 1
            };
          } else {
            newItems = newItems.filter(i => i.id !== id);
          }
          
          const newCount = newItems.reduce((acc, item) => acc + (item.quantity || 1), 0);
          return { items: newItems, cartCount: newCount };
        });
      },
      
      removeItem: (id) => {
        set((state) => {
          const newItems = state.items.filter((item) => item.id !== id);
          const newCount = newItems.reduce((acc, item) => acc + (item.quantity || 1), 0);
          return { items: newItems, cartCount: newCount };
        });
      },
      
      clearCart: () => {
        set({ items: [], cartCount: 0 });
      },
    }),
    {
      name: 'kinetic-cart', // name of item in the storage (must be unique)
    }
  )
);
