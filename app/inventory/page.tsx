'use client'
import CartItem from '@/components/CartItem';
import { useCartStore } from '@/store/cart-store';
import Link from 'next/link';

const CartPage = () => {

  const items = useCartStore((s) => s.items);
  const totalPrice = useCartStore((s) => s.getTotalPrice());
  const clearCart = useCartStore((s) => s.clearCart);

  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Your Inventory</h1>

      {items.length === 0 ? (
      <div className="text-center border rounded-lg bg-white p-10">
          <p className="text-gray-500 mb-4">Your inventory is empty.</p>
          <Link
            href="/"
            className="inline-block bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800"
          >
            Explore the Bazaar
          </Link>
        </div>
      ) : (
        <>
          <div className="bg-white border rounded-lg px-4">
            {items.map((item) => (
              <CartItem key={item.product.id} item={item} />
            ))}
          </div>

          <div className="mt-6 flex items-center justify-between">
            <button
              onClick={clearCart}
              className="text-sm text-gray-400 hover:text-red-600"
            >
              Clear cart
            </button>
            <div className="text-right">
              <p className="text-sm text-gray-500">Total</p>
              <p className="text-2xl font-bold text-gray-900">${totalPrice.toFixed(2)}</p>
            </div>
          </div>

          <Link
            href="/checkout"
            className="mt-6 block text-center bg-black text-white py-3 rounded-md hover:bg-gray-800 transition-colors"
          >
            Proceed to checkout
          </Link>
        </>
      )}
    </main>
  )
}

export default CartPage

