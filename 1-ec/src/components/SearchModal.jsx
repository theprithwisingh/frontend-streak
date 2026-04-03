import { useUIStore } from '../store/useUIStore';
import { useNavigate } from '@tanstack/react-router';
import { useState } from 'react';

export default function SearchModal() {
  const isSearchOpen = useUIStore((state) => state.isSearchOpen);
  const toggleSearch = useUIStore((state) => state.toggleSearch);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  if (!isSearchOpen) return null;

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      toggleSearch();
      navigate({ to: '/search', search: { q: query.trim() } });
      setQuery('');
    }
  };

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/60 z-[60] backdrop-blur-sm" 
        onClick={toggleSearch}
      />
      <div className="fixed top-0 left-0 w-full bg-surface z-[60] p-6 lg:p-10 shadow-2xl h-80 flex flex-col transform transition-transform duration-300">
        <div className="container-main flex flex-col h-full">
          <div className="flex justify-end mb-4">
            <button onClick={toggleSearch} className="text-on-surface-variant hover:text-on-surface">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="flex-1 flex flex-col justify-center items-center">
            <h2 className="font-headline text-3xl md:text-5xl font-bold tracking-tight text-on-surface w-full max-w-4xl mb-4">
              What are you looking for?
            </h2>
            <form onSubmit={handleSearch} className="w-full max-w-4xl relative">
              <input 
                type="text" 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search Performance, Lifestyle, Collections..." 
                className="w-full bg-transparent border-b-2 border-on-surface/20 py-4 text-xl md:text-2xl font-body text-on-surface focus:outline-none focus:border-primary placeholder-on-surface-variant/50 transition-colors"
                autoFocus
              />
              <button type="submit" className="absolute right-0 top-1/2 -translate-y-1/2 text-primary hover:opacity-70">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
