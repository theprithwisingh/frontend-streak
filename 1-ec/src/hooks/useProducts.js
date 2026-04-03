import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '../lib/api';

// Fallback data mapping if API fails, matching existing UI
export const FALLBACK_PRODUCTS = [
  { id: '1', name: 'VORTEX V-01', price: '$240.00', category: 'Gravity Response', image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&q=80', badge: 'New', badgeColor: 'bg-primary text-on-primary' },
  { id: '2', name: 'NEURON PRO-X', price: '$195.00', category: 'Urban Kinetic', image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&q=80' },
  { id: '3', name: 'STRATA 02', price: '$280.00', category: 'Carbon Lab', image: 'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=600&q=80', badge: 'Limited Drop', badgeColor: 'bg-tertiary text-white' },
  { id: '4', name: 'OSCILLATE C-1', price: '$310.00', category: 'Terrain Response', image: 'https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?w=600&q=80' },
  { id: '5', name: 'MONOLITH TR', price: '$225.00', category: 'Adaptive Mesh', image: 'https://images.unsplash.com/photo-1539185441755-769473a23570?w=600&q=80' },
  { id: '6', name: 'KINETIC FLUX', price: '$180.00', category: 'Carbon Lab', image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=600&q=80', badge: 'Best Seller', badgeColor: 'bg-secondary text-white' },
  { id: 'daily-kinetic-flow', name: 'KINETIC FLOW', price: '$140.00', category: 'Daily Utility', image: 'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=700&q=80' },
  { id: 'daily-stealth-0x', name: 'STEALTH 0X', price: '$185.00', category: 'Night Performance', image: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=700&q=80' },
];

function transformApiData(apiData) {
  if (!Array.isArray(apiData) || apiData.length === 0) return FALLBACK_PRODUCTS;
  
  return apiData.map((item, index) => ({
    id: String(item.id || index),
    name: item.title || item.name || `Model ${index}`,
    price: item.price ? (typeof item.price === 'number' ? `$${item.price.toFixed(2)}` : item.price) : `$${(Math.random()*100 + 100).toFixed(2)}`,
    category: item.category || 'Performance Collection',
    image: item.image || item.imageUrl || FALLBACK_PRODUCTS[index % FALLBACK_PRODUCTS.length].image,
    // Add badges for the first few items randomly just to show UI features
    ...(index === 0 && { badge: 'New', badgeColor: 'bg-primary text-on-primary' }),
    ...(index === 2 && { badge: 'Limited Drop', badgeColor: 'bg-tertiary text-white' }),
    ...(index === 5 && { badge: 'Best Seller', badgeColor: 'bg-secondary text-white' }),
  }));
}

export function useProducts() {
  return useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      try {
        const data = await fetchProducts();
        return transformApiData(data);
      } catch (error) {
        console.warn('API fetch failed, using fallback data:', error);
        return FALLBACK_PRODUCTS;
      }
    },
    initialData: FALLBACK_PRODUCTS, // Ensures UI renders instantly
  });
}

export function useFeaturedProducts() {
  const query = useProducts();
  return {
    ...query,
    data: query.data?.slice(0, 3) || [],
  };
}

export function useLabProducts() {
  const query = useProducts();
  return {
    ...query,
    data: query.data?.slice(3, 6) || [],
  };
}

export function useProductById(id) {
  const query = useProducts();
  return {
    ...query,
    data: query.data?.find(p => p.id === id) || FALLBACK_PRODUCTS.find(p => p.id === id) || FALLBACK_PRODUCTS[0],
  };
}
