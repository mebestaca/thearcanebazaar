'use client';

import Link from 'next/link';
import type { Product } from '@/types';
import { useCartStore } from '@/store/cart-store';

export default function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((s) => s.addItem);
  const outOfStock = product.stock <= 0;

  return (
    <div className="border rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow flex flex-col">
      <Link href={`/product/${product.id}`} className="block">
        <div className="w-full h-48 bg-gray-100 overflow-hidden">
          {product.image_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400 text-sm">
              No image
            </div>
          )}
        </div>
      </Link>
      <div className="p-4 flex flex-col flex-1">
        <Link href={`/product/${product.id}`}>
          <h2 className="font-semibold text-gray-900 truncate">{product.name}</h2>
        </Link>
        <p className="text-sm text-gray-500 mt-1 line-clamp-2 flex-1">
          {product.description}
        </p>
        <div className="flex items-center justify-between mt-3">
          <span className="font-bold text-gray-900">${product.price.toFixed(2)}</span>
          <button
            onClick={() => addItem(product, 1)}
            disabled={outOfStock}
            className="bg-black text-white text-sm px-3 py-1.5 rounded-md hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            {outOfStock ? 'Out of stock' : 'Add to cart'}
          </button>
        </div>
      </div>
    </div>
  );
}
