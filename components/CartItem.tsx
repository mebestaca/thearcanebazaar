'use client';

import Link from 'next/link';
import type { CartItem as CartItemType } from '@/types';
import { useCartStore } from '@/store/cart-store';

export default function CartItem({ item }: { item: CartItemType }) {
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const { product, quantity } = item;

  return (
    <div className="flex items-center gap-4 py-4 border-b last:border-b-0">
      <Link href={`/wares/${product.id}`} className="shrink-0">
        <div className="w-20 h-20 bg-gray-100 rounded-md overflow-hidden">
          {product.image_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          ) : null}
        </div>
      </Link>

      <div className="flex-1 min-w-0">
        <Link href={`/wares/${product.id}`}>
          <h3 className="font-medium text-gray-900 truncate">{product.name}</h3>
        </Link>
        <p className="text-sm text-gray-500">${product.price.toFixed(2)} each</p>
      </div>

      <div className="flex items-center border rounded-md">
        <button
          onClick={() => updateQuantity(product.id, quantity - 1)}
          className="px-2.5 py-1.5 text-gray-600 hover:bg-gray-100"
          aria-label="Decrease quantity"
        >
          −
        </button>
        <span className="px-3 py-1.5 min-w-8 text-center text-sm">{quantity}</span>
        <button
          onClick={() => updateQuantity(product.id, quantity + 1)}
          className="px-2.5 py-1.5 text-gray-600 hover:bg-gray-100"
          aria-label="Increase quantity"
        >
          +
        </button>
      </div>

      <div className="w-20 text-right font-semibold text-gray-900">
        ${(product.price * quantity).toFixed(2)}
      </div>

      <button
        onClick={() => removeItem(product.id)}
        className="text-sm text-gray-400 hover:text-red-600"
        aria-label={`Remove ${product.name}`}
      >
        Remove
      </button>
    </div>
  );
}
