'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Product } from '@/types';
import { useCartStore } from '@/store/cart-store';

export default function AddToCartSection({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((s) => s.addItem);
  const router = useRouter();
  const outOfStock = product.stock <= 0;

  const handleAdd = () => {
    addItem(product, quantity);
    router.push('/inventory');
  };

  return (
    <div className="mt-6 flex items-center gap-4">
      <div className="flex items-center border rounded-md">
        <button
          type="button"
          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          className="px-3 py-2 text-gray-600 hover:bg-gray-100"
          aria-label="Decrease quantity"
        >
          −
        </button>
        <span className="px-4 py-2 min-w-10 text-center">{quantity}</span>
        <button
          type="button"
          onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
          className="px-3 py-2 text-gray-600 hover:bg-gray-100"
          aria-label="Increase quantity"
        >
          +
        </button>
      </div>
      <button
        onClick={handleAdd}
        disabled={outOfStock}
        className="flex-1 bg-black text-white py-2.5 rounded-md hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
      >
        {outOfStock ? 'Out of stock' : 'Add to cart'}
      </button>
    </div>
  );
}
