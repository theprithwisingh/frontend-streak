import { useUIStore } from '../store/useUIStore';
import { useCartStore } from '../store/useCartStore';
import { Link } from '@tanstack/react-router';

export default function CartModal() {
  const isCartOpen = useUIStore((state) => state.isCartOpen);
  const toggleCart = useUIStore((state) => state.toggleCart);
  const items = useCartStore((state) => state.items);
  const addItem = useCartStore((state) => state.addItem);
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);
  const removeItem = useCartStore((state) => state.removeItem);

  if (!isCartOpen) return null;

  const calculateTotal = () => {
    return items.reduce((acc, item) => {
      const priceVal = parseFloat(item.price.replace('$', ''));
      const qty = item.quantity || 1;
      return acc + (isNaN(priceVal) ? 0 : priceVal * qty);
    }, 0).toFixed(2);
  };

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/60 z-[60] backdrop-blur-sm" 
        onClick={toggleCart}
      />
      <div className="fixed top-0 right-0 h-full w-full max-w-sm bg-surface z-[60] shadow-2xl flex flex-col transform transition-transform duration-300">
        <div className="flex items-center justify-between p-6 border-b border-outline/10">
          <h2 className="font-headline text-2xl font-bold tracking-tight text-on-surface">Your Cart</h2>
          <button onClick={toggleCart} className="text-on-surface-variant hover:text-on-surface">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="text-center text-on-surface-variant font-body">Your cart is empty.</div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-4 items-center">
                <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg bg-surface-container" />
                <div className="flex-1">
                  <h3 className="font-headline font-bold text-base text-on-surface">{item.name}</h3>
                  <p className="font-body text-sm text-on-surface-variant">{item.category}</p>
                  <div className="flex items-center gap-4 mt-2">
                    <p className="font-body font-semibold text-primary">
                      ${(parseFloat(item.price.replace('$', '')) * (item.quantity || 1)).toFixed(2)}
                    </p>
                    <div className="flex items-center border border-outline/20 rounded-full overflow-hidden bg-surface-container-highest/20">
                      <button 
                        onClick={() => decreaseQuantity(item.id)}
                        className="px-2.5 py-0.5 text-on-surface-variant hover:text-on-surface hover:bg-outline/5 transition-colors text-sm font-bold"
                      >
                        -
                      </button>
                      <span className="text-xs font-bold w-5 text-center">{item.quantity || 1}</span>
                      <button 
                        onClick={() => addItem(item)}
                        className="px-2.5 py-0.5 text-on-surface-variant hover:text-on-surface hover:bg-outline/5 transition-colors text-sm font-bold"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => removeItem(item.id)}
                  className="text-error hover:opacity-70"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="p-6 border-t border-outline/10 bg-surface-container-low space-y-4">
            <div className="flex justify-between items-center font-headline text-lg font-bold text-on-surface">
              <span>Subtotal</span>
              <span>${calculateTotal()}</span>
            </div>
            <Link 
              to="/checkout" 
              onClick={toggleCart}
              className="w-full h-14 rounded-full gradient-cta text-white font-body font-bold hover:shadow-ambient transition-all flex items-center justify-center"
            >
              Checkout
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
