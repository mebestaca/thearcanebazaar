'use client';

import CartItem from '@/components/CartItem';
import { useCartStore } from '@/store/cart-store';
import { useHydrated } from '@/store/use-hydrated';
import Link from 'next/link';

const CartPage = () => {
  const items = useCartStore((s) => s.items);
  const totalPrice = useCartStore((s) => s.getTotalPrice());
  const clearCart = useCartStore((s) => s.clearCart);
  const hydrated = useHydrated();

  return (
    <main className="min-h-screen bg-[#1b1625] text-amber-100">

      {/* Ambient Background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-amber-400/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-5xl px-6 py-12">

        {/* Header */}
        <div className="mb-10">

          <Link
            href="/wares"
            className="mb-5 inline-flex items-center gap-2 text-sm text-amber-100/40 transition-colors hover:text-amber-300"
          >
            <span>←</span>
            <span>Back to the Bazaar</span>
          </Link>

          <div className="flex items-end justify-between gap-6">

            <div>
              <div className="mb-3 flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-amber-400/70">
                <span>⚔</span>
                <span>Adventurer's Inventory</span>
              </div>

              <h1 className="font-serif text-4xl font-bold text-amber-200 sm:text-5xl">
                Your Inventory
              </h1>

              <p className="mt-3 text-amber-100/50">
                Treasures gathered from the Arcane Bazaar.
              </p>
            </div>

            {hydrated && items.length > 0 && (
              <div className="hidden text-right sm:block">
                <p className="text-xs uppercase tracking-wider text-amber-100/30">
                  Items
                </p>

                <p className="font-serif text-2xl font-semibold text-amber-300">
                  {items.length}
                </p>
              </div>
            )}

          </div>
        </div>


        {/* Empty Inventory */}
        {items.length === 0 ? (
          <div className="relative overflow-hidden rounded-2xl border border-amber-900/30 bg-[#211a2c] px-6 py-20 text-center shadow-xl shadow-black/20">

            {/* Glow */}
            <div className="pointer-events-none absolute left-1/2 top-0 h-48 w-48 -translate-x-1/2 rounded-full bg-amber-400/5 blur-3xl" />

            <div className="relative">

              <div className="mb-6 text-6xl">
                🧳
              </div>

              <h2 className="font-serif text-2xl font-semibold text-amber-200">
                Your inventory is empty
              </h2>

              <p className="mx-auto mt-3 max-w-md text-amber-100/50">
                Even the greatest adventurers need supplies.
                Visit the Bazaar and find something worthy of
                your next quest.
              </p>

              <Link
                href="/wares"
                className="
                  mt-8
                  inline-flex
                  items-center
                  gap-2
                  rounded-lg
                  bg-amber-300
                  px-6
                  py-3
                  font-semibold
                  text-[#1b1625]
                  shadow-[0_0_20px_rgba(251,191,36,0.15)]
                  transition-all
                  hover:bg-amber-200
                  hover:shadow-[0_0_25px_rgba(251,191,36,0.35)]
                "
              >
                <span>✦</span>
                Explore the Bazaar
              </Link>

            </div>
          </div>
        ) : (
          <>
            {/* Inventory Items */}
            <div className="overflow-hidden rounded-2xl border border-amber-900/30 bg-[#211a2c] shadow-xl shadow-black/20">

              {/* Inventory Header */}
              <div className="flex items-center justify-between border-b border-amber-900/30 px-6 py-5">

                <div className="flex items-center gap-3">

                  <span className="text-xl text-amber-400">
                    🎒
                  </span>

                  <div>
                    <h2 className="font-serif text-lg font-semibold text-amber-200">
                      Collected Treasures
                    </h2>

                    <p className="text-xs text-amber-100/35">
                      Items currently carried
                    </p>
                  </div>

                </div>

                <span className="text-sm text-amber-100/40">
                  {items.length}{" "}
                  {items.length === 1 ? 'item' : 'items'}
                </span>

              </div>

              {/* Cart Items */}
              <div className="px-4 sm:px-6">
                {items.map((item) => (
                  <CartItem
                    key={item.product.id}
                    item={item}
                  />
                ))}
              </div>

            </div>


            {/* Summary */}
            <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_320px]">

              {/* Continue Shopping */}
              <div className="hidden items-center rounded-xl border border-amber-900/20 bg-[#211a2c]/50 px-6 py-5 lg:flex">

                <div>
                  <p className="font-serif text-lg text-amber-200">
                    Looking for more treasures?
                  </p>

                  <p className="mt-1 text-sm text-amber-100/40">
                    The Bazaar still has plenty of wares waiting to be discovered.
                  </p>
                </div>

                <Link
                  href="/wares"
                  className="ml-auto text-sm font-semibold text-amber-300 transition-colors hover:text-amber-200"
                >
                  Continue Shopping →
                </Link>

              </div>


              {/* Order Summary */}
              <div className="rounded-xl border border-amber-900/30 bg-[#211a2c] p-6 shadow-lg shadow-black/10">

                <div className="mb-5 flex items-center gap-3">

                  <span className="text-xl">
                    🪙
                  </span>

                  <h2 className="font-serif text-lg font-semibold text-amber-200">
                    Merchant's Ledger
                  </h2>

                </div>

                <div className="space-y-3 border-b border-amber-900/20 pb-5">

                  <div className="flex justify-between text-sm">
                    <span className="text-amber-100/40">
                      Treasures
                    </span>

                    <span className="text-amber-100/70">
                      {items.length}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-amber-100/40">
                      Subtotal
                    </span>

                    <span className="text-amber-100/70">
                      ${totalPrice.toFixed(2)}
                    </span>
                  </div>

                </div>

                <div className="mt-5 flex items-end justify-between">

                  <div>
                    <p className="text-xs uppercase tracking-wider text-amber-100/30">
                      Total
                    </p>

                    <p className="mt-1 font-serif text-3xl font-bold text-amber-300">
                      ${totalPrice.toFixed(2)}
                    </p>
                  </div>

                  <span className="text-2xl text-amber-400/40">
                    ✦
                  </span>

                </div>

                {/* Checkout */}
                <Link
                  href="/checkout"
                  className="
                    mt-6
                    block
                    rounded-lg
                    bg-amber-300
                    px-4
                    py-3
                    text-center
                    font-semibold
                    text-[#1b1625]
                    shadow-[0_0_15px_rgba(251,191,36,0.1)]
                    transition-all
                    hover:bg-amber-200
                    hover:shadow-[0_0_25px_rgba(251,191,36,0.35)]
                  "
                >
                  Proceed to Checkout
                </Link>

                {/* Clear Inventory */}
                <button
                  onClick={clearCart}
                  className="
                    mt-4
                    w-full
                    text-sm
                    text-amber-100/25
                    transition-colors
                    hover:text-red-300
                  "
                >
                  Empty Inventory
                </button>

              </div>
            </div>
          </>
        )}

        {/* Decorative Footer */}
        <div className="mt-14 flex items-center gap-4">
          <div className="h-px flex-1 bg-amber-900/20" />

          <span className="text-sm tracking-widest text-amber-400/30">
            ✦ ✦ ✦
          </span>

          <div className="h-px flex-1 bg-amber-900/20" />
        </div>

      </div>
    </main>
  );
};

export default CartPage;
