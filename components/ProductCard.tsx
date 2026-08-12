'use client';

import Link from 'next/link';
import type { CSSProperties } from 'react';
import type { Product } from '@/types';
import { useCartStore } from '@/store/cart-store';
import { useState } from 'react';
import Image from 'next/image';

const glowColors = [
  'rgba(251, 191, 36, 0.30)',  // Gold
  'rgba(168, 85, 247, 0.30)',  // Arcane Purple
  'rgba(59, 130, 246, 0.30)',  // Sapphire Blue
  'rgba(34, 197, 94, 0.25)',   // Emerald Green
  'rgba(239, 68, 68, 0.25)',   // Crimson
];

export default function ProductCard({
  product,
}: {
  product: Product;
}) {
  const addItem = useCartStore((s) => s.addItem);
  const outOfStock = product.stock <= 0;

  // Pick a random magical aura when the card is created.
  const [glowColor] = useState(
    () => glowColors[Math.floor(Math.random() * glowColors.length)]
  );

  const glowStyle = {
    '--glow-color': glowColor,
  } as CSSProperties;

  return (
    <div
      style={glowStyle}
      className="
        group
        relative
        flex
        flex-col
        overflow-hidden
        rounded-xl
        border
        border-amber-900/30
        bg-[#211a2c]
        shadow-lg
        shadow-black/20
        transition-all
        duration-300
        hover:-translate-y-2
        hover:border-(--glow-color)
        hover:shadow-[0_0_35px_var(--glow-color)]
      "
    >
      {/* Magical Glow Behind Card */}
      <div
        className="
          pointer-events-none
          absolute
          -inset-1
          -z-10
          rounded-xl
          opacity-0
          blur-xl
          transition-opacity
          duration-500
          group-hover:opacity-100
        "
        style={{
          background: glowColor,
        }}
      />

      {/* Product Image */}
      <Link
        href={`/wares/${product.id}`}
        className="block"
      >
        <div className="relative h-56 w-full overflow-hidden bg-[#17121f]">

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
                transition-all
                duration-500
                group-hover:scale-105
                group-hover:brightness-110
              "
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-amber-100/30">
              <div className="text-center">
                <div className="mb-2 text-3xl">
                  ✦
                </div>

                <p>No image available</p>
              </div>
            </div>
          )}

          {/* Magical Image Aura */}
          <div
            className="
              pointer-events-none
              absolute
              inset-0
              opacity-0
              transition-opacity
              duration-500
              group-hover:opacity-100
            "
            style={{
              background: `radial-gradient(
                circle at center,
                ${glowColor},
                transparent 65%
              )`,
            }}
          />

          {/* Bottom Image Fade */}
          <div
            className="
              pointer-events-none
              absolute
              inset-x-0
              bottom-0
              h-24
              bg-linear-to-t
              from-[#211a2c]
              to-transparent
            "
          />

          {/* Out of Stock */}
          {outOfStock && (
            <div className="absolute left-3 top-3 rounded-full border border-red-900/40 bg-[#17121f]/90 px-3 py-1 text-xs font-semibold text-red-300 backdrop-blur-sm">
              Out of Stock
            </div>
          )}

          {/* Magical Rune */}
          <div
            className="
              pointer-events-none
              absolute
              right-4
              top-4
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-full
              border
              border-transparent
              text-amber-300
              opacity-0
              transition-all
              duration-500
              group-hover:rotate-12
              group-hover:border-amber-300/40
              group-hover:bg-amber-300/10
              group-hover:opacity-100
            "
            style={{
              boxShadow: `0 0 15px ${glowColor}`,
            }}
          >
            ✦
          </div>
        </div>
      </Link>

      {/* Product Details */}
      <div className="flex flex-1 flex-col p-5">

        {/* Product Name */}
        <Link href={`/wares/${product.id}`}>
          <h2
            className="
              font-serif
              text-xl
              font-semibold
              text-amber-200
              transition-all
              duration-300
              group-hover:text-amber-300
            "
            style={{
              textShadow: `0 0 0 transparent`,
            }}
          >
            {product.name}
          </h2>
        </Link>

        {/* Decorative Divider */}
        <div className="my-3 flex items-center gap-2">

          <div
            className="
              h-px
              flex-1
              bg-amber-900/30
              transition-all
              duration-500
              group-hover:bg-(--glow-color)
            "
          />

          <span
            className="
              text-xs
              text-amber-500/50
              transition-all
              duration-500
              group-hover:text-amber-300
            "
            style={{
              textShadow: `0 0 10px ${glowColor}`,
            }}
          >
            ✦
          </span>

          <div
            className="
              h-px
              flex-1
              bg-amber-900/30
              transition-all
              duration-500
              group-hover:bg-(--glow-color)
            "
          />

        </div>

        {/* Description */}
        <p className="line-clamp-2 flex-1 text-sm leading-6 text-amber-100/50">
          {product.description}
        </p>

        {/* Price & Cart */}
        <div className="mt-5 flex items-center justify-between gap-3">

          <div>
            <p className="mb-0.5 text-[10px] uppercase tracking-wider text-amber-100/30">
              Merchant's Price
            </p>

            <span
              className="
                text-lg
                font-bold
                text-amber-300
                transition-all
                duration-300
              "
              style={{
                textShadow: `0 0 0 transparent`,
              }}
            >
              ${product.price.toFixed(2)}
            </span>
          </div>

          <button
            onClick={() => addItem(product, 1)}
            disabled={outOfStock}
            className="
              rounded-lg
              border
              border-amber-700/60
              bg-amber-400/5
              px-3.5
              py-2
              text-sm
              font-semibold
              text-amber-300
              transition-all
              duration-300
              hover:border-amber-300
              hover:bg-amber-300
              hover:text-[#1b1625]
              disabled:cursor-not-allowed
              disabled:border-amber-900/30
              disabled:bg-transparent
              disabled:text-amber-100/20
            "
            style={{
              ['--button-glow' as string]: glowColor,
            }}
          >
            {outOfStock ? 'Unavailable' : 'Add to Cart'}
          </button>

        </div>
      </div>
    </div>
  );
}

