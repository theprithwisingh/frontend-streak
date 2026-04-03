import { create } from 'zustand';

export const useNewsletterStore = create((set) => ({
  email: '',
  isSubmitted: false,
  setEmail: (email) => set({ email }),
  submit: () => set({ isSubmitted: true, email: '' }),
}));
