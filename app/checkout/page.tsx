'use client';

import Link from 'next/link';
import { useCartStore } from '@/store/cart-store';
import { useHydrated } from '@/store/use-hydrated';
import CheckoutForm from '@/components/CheckoutForm';

export default function CheckoutPage() {
  const items = useCartStore((s) => s.items);
  const totalPrice = useCartStore((s) => s.getTotalPrice());
  const hydrated = useHydrated();

  // Prevent hydration mismatch
  if (!hydrated) {
    return (
      <main className="min-h-screen bg-[#1b1625]" />
    );
  }

  // Empty Cart
  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-[#1b1625] text-amber-100">

        <div className="mx-auto max-w-4xl px-6 py-16">

          <div className="relative overflow-hidden rounded-2xl border border-amber-900/30 bg-[#211a2c] px-6 py-20 text-center shadow-xl shadow-black/20">

            {/* Ambient Glow */}
            <div className="pointer-events-none absolute left-1/2 top-0 h-56 w-56 -translate-x-1/2 rounded-full bg-amber-400/5 blur-3xl" />

            <div className="relative">

              <div className="mb-6 text-6xl">
                🧳
              </div>

              <h1 className="font-serif text-3xl font-bold text-amber-200">
                Your Inventory is Empty
              </h1>

              <p className="mx-auto mt-3 max-w-md text-amber-100/50">
                There are no treasures waiting to be purchased.
                Return to the Bazaar and find something worthy
                of your next adventure.
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
                  transition-all
                  hover:bg-amber-200
                  hover:shadow-[0_0_25px_rgba(251,191,36,0.35)]
                "
              >
                <span>✦</span>
                Return to the Bazaar
              </Link>

            </div>
          </div>

        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#1b1625] text-amber-100">

      {/* Ambient Background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-amber-400/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 py-12">

        {/* Header */}
        <div className="mb-10">

          <Link
            href="/inventory"
            className="
              inline-flex
              items-center
              gap-2
              text-sm
              text-amber-100/40
              transition-colors
              hover:text-amber-300
            "
          >
            <span>←</span>
            <span>Return to Inventory</span>
          </Link>

          <div className="mt-6 flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-amber-400/70">
            <span>🪙</span>
            <span>Merchant's Ledger</span>
          </div>

          <h1 className="mt-3 font-serif text-4xl font-bold text-amber-200 sm:text-5xl">
            Complete Your Purchase
          </h1>

          <p className="mt-3 text-amber-100/50">
            Finalize your transaction and prepare your treasures for their journey.
          </p>

        </div>


        {/* Checkout Layout */}
        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">

          {/* =====================================================
              CHECKOUT FORM
          ===================================================== */}

          <div className="rounded-2xl border border-amber-900/30 bg-[#211a2c] p-6 shadow-xl shadow-black/20 sm:p-8">

            <div className="mb-7 flex items-center gap-3 border-b border-amber-900/20 pb-5">

              <span className="text-2xl">
                📜
              </span>

              <div>
                <h2 className="font-serif text-xl font-semibold text-amber-200">
                  Adventurer Details
                </h2>

                <p className="text-xs text-amber-100/35">
                  Tell the merchant where to send your treasures.
                </p>
              </div>

            </div>

            <CheckoutForm />

          </div>


          {/* =====================================================
              ORDER SUMMARY
          ===================================================== */}

          <aside className="h-fit lg:sticky lg:top-28">

            <div className="overflow-hidden rounded-2xl border border-amber-900/30 bg-[#211a2c] shadow-xl shadow-black/20">

              {/* Summary Header */}
              <div className="border-b border-amber-900/20 px-6 py-5">

                <div className="flex items-center gap-3">

                  <span className="text-xl">
                    🎒
                  </span>

                  <div>
                    <h2 className="font-serif text-lg font-semibold text-amber-200">
                      Your Treasures
                    </h2>

                    <p className="text-xs text-amber-100/35">
                      Items being acquired
                    </p>
                  </div>

                </div>

              </div>


              {/* Items */}
              <div className="divide-y divide-amber-900/20 px-6">

                {items.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex justify-between gap-4 py-4"
                  >

                    <div className="min-w-0">

                      <p className="truncate text-sm font-medium text-amber-100/80">
                        {item.product.name}
                      </p>

                      <p className="mt-1 text-xs text-amber-100/35">
                        Quantity: {item.quantity}
                      </p>

                    </div>

                    <span className="shrink-0 text-sm font-medium text-amber-300">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>

                  </div>
                ))}

              </div>


              {/* Total */}
              <div className="border-t border-amber-900/30 bg-[#1d1727] px-6 py-5">

                <div className="flex items-end justify-between">

                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-amber-100/30">
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

              </div>

            </div>


            {/* Secure Transaction */}
            <div className="mt-4 rounded-xl border border-amber-900/20 bg-[#211a2c]/60 p-4 text-center">

              <div className="mb-1 text-lg">
                🔮
              </div>

              <p className="text-xs font-medium text-amber-200/70">
                Secure Merchant Transaction
              </p>

              <p className="mt-1 text-[11px] leading-5 text-amber-100/30">
                Your information is handled with the utmost
                care by the Bazaar's merchant guild.
              </p>

            </div>

          </aside>

        </div>


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
}

