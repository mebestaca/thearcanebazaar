'use client';

import Link from 'next/link';
import type { CartItem as CartItemType } from '@/types';
import { useCartStore } from '@/store/cart-store';
import Image from 'next/image';

export default function CartItem({
  item,
}: {
  item: CartItemType;
}) {
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);

  const { product, quantity } = item;

  return (
    <div
      className="
        group
        flex
        items-center
        gap-4
        border-b
        border-amber-900/20
        py-5
        last:border-b-0
      "
    >

      {/* =====================================================
          PRODUCT IMAGE
          ===================================================== */}

      <Link
        href={`/wares/${product.id}`}
        className="shrink-0"
      >
        <div
          className="
            relative
            h-20
            w-20
            overflow-hidden
            rounded-lg
            border
            border-amber-900/30
            bg-[#17121f]
            transition-all
            duration-300
            group-hover:border-amber-400/50
            group-hover:shadow-[0_0_18px_rgba(251,191,36,0.15)]
          "
        >

          {product.image_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <Image
              src={product.image_url}
              alt={product.name}
              width={78}   
              height={78}
              className="
                h-full
                w-full
                object-cover
                transition-transform
                duration-500
                group-hover:scale-105
              "
            />
          ) : (
            <div className="flex h-full items-center justify-center text-xl text-amber-400/30">
              ✦
            </div>
          )}

          {/* Image Glow */}
          <div
            className="
              pointer-events-none
              absolute
              inset-0
              bg-amber-300/0
              transition-all
              duration-300
              group-hover:bg-amber-300/5
            "
          />

        </div>
      </Link>


      {/* =====================================================
          PRODUCT INFO
          ===================================================== */}

      <div className="min-w-0 flex-1">

        <Link href={`/wares/${product.id}`}>

          <h3
            className="
              truncate
              font-serif
              font-semibold
              text-amber-200
              transition-colors
              hover:text-amber-300
            "
          >
            {product.name}
          </h3>

        </Link>

        <p className="mt-1 text-sm text-amber-100/40">
          ${product.price.toFixed(2)} each
        </p>

      </div>


      {/* =====================================================
          QUANTITY
          ===================================================== */}

      <div
        className="
          flex
          items-center
          overflow-hidden
          rounded-lg
          border
          border-amber-900/40
          bg-[#17121f]
        "
      >

        <button
          onClick={() =>
            updateQuantity(product.id ,Math.max(1, quantity - 1))            
          }
          className="
            px-3
            py-2
            text-amber-100/50
            transition-all
            hover:bg-amber-300/10
            hover:text-amber-300
          "
          aria-label="Decrease quantity"
        >
          −
        </button>

        <span
          className="
            min-w-9
            border-x
            border-amber-900/30
            px-2
            py-2
            text-center
            text-sm
            font-medium
            text-amber-200
          "
        >
          {quantity}
        </span>

        <button
          onClick={() =>
            updateQuantity(product.id,  Math.min(product.stock, quantity + 1))
          }
          className="
            px-3
            py-2
            text-amber-100/50
            transition-all
            hover:bg-amber-300/10
            hover:text-amber-300
          "
          aria-label="Increase quantity"
        >
          +
        </button>

      </div>


      {/* =====================================================
          ITEM TOTAL
          ===================================================== */}

      <div
        className="
          w-24
          text-right
          font-serif
          font-semibold
          text-amber-300
        "
      >
        ${(product.price * quantity).toFixed(2)}
      </div>


      {/* =====================================================
          REMOVE
          ===================================================== */}

      <button
        onClick={() => removeItem(product.id)}
        className="
          rounded-md
          px-2
          py-1
          text-xs
          text-amber-100/25
          transition-all
          hover:bg-red-400/10
          hover:text-red-300
        "
        aria-label={`Remove ${product.name}`}
      >
        Remove
      </button>

    </div>
  );
}

