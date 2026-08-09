'use client';

import Link from 'next/link';
import { useCartStore } from '@/store/cart-store';
import { useHydrated } from '@/store/use-hydrated';
import CheckoutForm from '@/components/CheckoutForm';

export default function CheckoutPage() {
  const items = useCartStore((s) => s.items);
  const totalPrice = useCartStore((s) => s.getTotalPrice());
  const hydrated = useHydrated();

  if (!hydrated) {
    return <main className="max-w-4xl mx-auto px-4 py-8" />;
  }

  if (items.length === 0) {
    return (
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center border rounded-lg bg-white p-10">
          <p className="text-gray-500 mb-4">Your cart is empty.</p>
          <Link
            href="/"
            className="inline-block bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800"
          >
            Continue shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Checkout</h1>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
        <div className="md:col-span-3 bg-white border rounded-lg p-6">
          <CheckoutForm />
        </div>

        <div className="md:col-span-2">
          <h2 className="font-semibold text-gray-900 mb-3">Order summary</h2>
          <div className="bg-white border rounded-lg p-4 space-y-3">
            {items.map((item) => (
              <div key={item.product.id} className="flex justify-between text-sm">
                <span className="text-gray-600">
                  {item.product.name} × {item.quantity}
                </span>
                <span className="font-medium text-gray-900">
                  ${(item.product.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
            <div className="border-t pt-3 flex justify-between font-semibold text-gray-900">
              <span>Total</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
