'use client'
import { useCartStore } from '@/store/cart-store';
import Link from 'next/link';
import React from 'react'

const CartPage = () => {

  const items = useCartStore((s) => s.items);
  const totalPrice = useCartStore((s) => s.getTotalPrice());
  const clearCart = useCartStore((s) => s.clearCart);

  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Your Cart</h1>

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
  )
}

export default CartPage

