import { useState } from 'react';
import { useCartStore } from '../store/useCartStore';
import { Link } from '@tanstack/react-router';

export default function CheckoutPage() {
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const calculateTotal = () => {
    // Rough simulation since prices are formatted as strings like '$240.00'
    return items.reduce((acc, item) => {
      const priceVal = parseFloat(item.price.replace('$', ''));
      const qty = item.quantity || 1;
      return acc + (isNaN(priceVal) ? 0 : priceVal * qty);
    }, 0).toFixed(2);
  };

  const handleCheckout = (e) => {
    e.preventDefault();
    clearCart();
    setOrderPlaced(true);
  };

  if (orderPlaced) {
    return (
      <div className="pt-32 pb-20 lg:pt-40 lg:pb-28 container-main min-h-[70vh] flex flex-col items-center justify-center text-center">
        <div className="w-20 h-20 bg-primary/20 text-primary rounded-full flex items-center justify-center mb-6">
          <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="font-headline text-4xl font-extrabold tracking-tight text-on-surface mb-4">
          Order Confirmed
        </h1>
        <p className="font-body text-on-surface-variant max-w-md mx-auto mb-8">
          Your gear is on its way. We've sent a confirmation email with your shipping details.
        </p>
        <Link to="/" className="px-8 py-4 rounded-full gradient-cta text-white font-body font-bold hover:shadow-ambient transition-all inline-block">
          Return Home
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="pt-32 pb-20 lg:pt-40 lg:pb-28 container-main min-h-[70vh] flex flex-col items-center justify-center text-center">
        <h1 className="font-headline text-3xl font-extrabold text-on-surface mb-4">Your Cart is Empty</h1>
        <p className="text-on-surface-variant mb-8">Add some gear before heading to checkout.</p>
        <Link to="/" className="px-8 py-3 rounded-full border border-primary text-primary hover:bg-primary/5 transition-colors font-semibold">
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 lg:pt-32 lg:pb-28 min-h-screen">
      <div className="container-main max-w-5xl">
        <h1 className="font-headline text-4xl font-extrabold tracking-[-0.02em] text-on-surface mb-10">
          Checkout
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form */}
          <div>
            <form id="checkout-form" onSubmit={handleCheckout} className="space-y-6">
              <h2 className="font-headline text-xl font-bold border-b border-outline/10 pb-2">Shipping Information</h2>
              <div className="grid grid-cols-2 gap-4">
                <input required type="text" placeholder="First Name" className="w-full bg-surface-container border border-outline/20 py-3 px-4 rounded-md focus:outline-none focus:border-primary" />
                <input required type="text" placeholder="Last Name" className="w-full bg-surface-container border border-outline/20 py-3 px-4 rounded-md focus:outline-none focus:border-primary" />
              </div>
              <input required type="text" placeholder="Address" className="w-full bg-surface-container border border-outline/20 py-3 px-4 rounded-md focus:outline-none focus:border-primary" />
              <div className="grid grid-cols-2 gap-4">
                <input required type="text" placeholder="City" className="w-full bg-surface-container border border-outline/20 py-3 px-4 rounded-md focus:outline-none focus:border-primary" />
                <input required type="text" placeholder="ZIP Code" className="w-full bg-surface-container border border-outline/20 py-3 px-4 rounded-md focus:outline-none focus:border-primary" />
              </div>

              <h2 className="font-headline text-xl font-bold border-b border-outline/10 pb-2 pt-6">Payment Method</h2>
              <input required type="text" placeholder="Card Number" className="w-full bg-surface-container border border-outline/20 py-3 px-4 rounded-md focus:outline-none focus:border-primary" />
              <div className="grid grid-cols-2 gap-4">
                <input required type="text" placeholder="MM/YY" className="w-full bg-surface-container border border-outline/20 py-3 px-4 rounded-md focus:outline-none focus:border-primary" />
                <input required type="text" placeholder="CVC" className="w-full bg-surface-container border border-outline/20 py-3 px-4 rounded-md focus:outline-none focus:border-primary" />
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="bg-surface-container-low p-8 rounded-xl h-fit border border-outline/5">
            <h2 className="font-headline text-2xl font-bold mb-6">Order Summary</h2>
            <div className="space-y-4 mb-6">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between items-center">
                  <div className="flex gap-4 items-center">
                    <img src={item.image} alt={item.name} className="w-16 h-16 rounded-md object-cover bg-surface-container-highest" />
                    <div>
                      <h4 className="font-semibold text-sm">
                        {item.name} {(item.quantity > 1) && <span className="text-primary ml-1">x{item.quantity}</span>}
                      </h4>
                      <p className="text-xs text-on-surface-variant font-medium mt-1">{item.price}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-outline/10 pt-4 mb-8">
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>${calculateTotal()}</span>
              </div>
            </div>
            <button form="checkout-form" type="submit" className="w-full h-14 rounded-full gradient-cta text-white font-body font-bold hover:shadow-ambient transition-all">
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
