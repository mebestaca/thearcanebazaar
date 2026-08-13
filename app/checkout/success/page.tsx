import Link from 'next/link';
import ClearCart from './ClearCart';
import { supabaseServer } from '@/lib/supabase/supabase-server';

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ orderId?: string }>;
}) {
  const { orderId } = await searchParams;

  let diceRoll: number | null = null;
  let subtotal: number | null = null;
  let total: number | null = null;

  if (orderId) {
    const { data } = await supabaseServer
      .from('orders')
      .select('dice_roll, subtotal, total')
      .eq('id', orderId)
      .single();

    if (data) {
      diceRoll = data.dice_roll;
      subtotal = data.subtotal;
      total = data.total;
    }
  }

  return (
    <main className="min-h-screen bg-[#1b1625] text-amber-100">
      <ClearCart/>
      {/* Ambient Magic */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-20 h-96 w-96 -translate-x-1/2 rounded-full bg-amber-400/10 blur-3xl" />
        <div className="absolute left-1/4 top-1/2 h-64 w-64 rounded-full bg-purple-500/5 blur-3xl" />
        <div className="absolute right-1/4 top-1/3 h-64 w-64 rounded-full bg-blue-500/5 blur-3xl" />
      </div>

      {diceRoll !== null && (
        <div className="mx-auto mt-8 max-w-md rounded-xl border border-amber-900/30 bg-[#17121f] px-5 py-4 text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-amber-100/30">
            Fortune's Roll
          </p>
          <p className="mt-2 font-serif text-3xl font-bold text-amber-300">
            You rolled a {diceRoll}
          </p>
          <p className="mt-2 text-sm text-amber-100/60">
            The dice favored you with a {diceRoll}% discount —
            {subtotal !== null && total !== null && (
              <> ${subtotal.toFixed(2)} reduced to <span className="font-semibold text-amber-200">${total.toFixed(2)}</span>.</>
            )}
          </p>
        </div>
      )}

      <div className="relative mx-auto flex min-h-[70vh] max-w-2xl items-center justify-center px-6 py-16">

        <div className="w-full text-center">

          {/* Magical Emblem */}
          <div className="relative mx-auto mb-8 flex h-24 w-24 items-center justify-center">

            {/* Outer Glow */}
            <div className="absolute inset-0 animate-pulse rounded-full bg-amber-400/10 blur-xl" />

            {/* Circle */}
            <div
              className="
                relative
                flex
                h-20
                w-20
                items-center
                justify-center
                rounded-full
                border
                border-amber-400/40
                bg-[#211a2c]
                text-4xl
                shadow-[0_0_30px_rgba(251,191,36,0.2)]
              "
            >
              ✦
            </div>

          </div>


          {/* Success Card */}
          <div
            className="
              overflow-hidden
              rounded-2xl
              border
              border-amber-900/30
              bg-[#211a2c]
              shadow-[0_0_50px_rgba(251,191,36,0.08)]
            "
          >

            {/* Top Decoration */}
            <div className="border-b border-amber-900/20 px-6 py-4">
              <div className="flex items-center justify-center gap-3 text-xs uppercase tracking-[0.3em] text-amber-400/60">
                <span>✦</span>
                <span>Quest Complete</span>
                <span>✦</span>
              </div>
            </div>


            <div className="px-6 py-12 sm:px-10">

              {/* Heading */}
              <h1 className="font-serif text-4xl font-bold text-amber-200 sm:text-5xl">
                Order Placed!
              </h1>

              <p className="mt-5 text-lg leading-relaxed text-amber-100/60">
                Your treasures have been secured.
                <br />
                The merchant guild is preparing your order.
              </p>


              {/* Order Reference */}
              {orderId && (
                <div
                  className="
                    mx-auto
                    mt-8
                    max-w-md
                    rounded-xl
                    border
                    border-amber-900/30
                    bg-[#17121f]
                    px-5
                    py-4
                  "
                >

                  <p className="text-xs uppercase tracking-[0.2em] text-amber-100/30">
                    Order Reference
                  </p>

                  <p className="mt-2 break-all font-mono text-sm text-amber-300">
                    {orderId}
                  </p>

                </div>
              )}


              {/* Message */}
              <div className="mx-auto mt-8 max-w-md">

                <p className="text-sm leading-6 text-amber-100/40">
                  Thank you for shopping at The Arcane Bazaar.
                  Your order has been recorded in our merchant&apos;s
                  ledger and will begin its journey shortly.
                </p>

              </div>


              {/* Continue Shopping */}
              <Link
                href="/wares"
                className="
                  group
                  relative
                  mt-9
                  inline-flex
                  items-center
                  gap-2
                  overflow-hidden
                  rounded-lg
                  border
                  border-amber-300/50
                  bg-amber-300
                  px-7
                  py-3
                  font-semibold
                  text-[#1b1625]
                  shadow-[0_0_18px_rgba(251,191,36,0.15)]
                  transition-all
                  duration-300
                  hover:bg-amber-200
                  hover:shadow-[0_0_30px_rgba(251,191,36,0.35)]
                "
              >

                {/* Magical Shine */}
                <span
                  className="
                    pointer-events-none
                    absolute
                    inset-0
                    -translate-x-full
                    bg-linear-to-r
                    from-transparent
                    via-white/25
                    to-transparent
                    transition-transform
                    duration-700
                    group-hover:translate-x-full
                  "
                />

                <span className="relative">
                  ✦
                </span>

                <span className="relative">
                  Continue Shopping
                </span>

              </Link>

            </div>


            {/* Bottom Decoration */}
            <div className="border-t border-amber-900/20 px-6 py-5">

              <p className="text-xs italic text-amber-100/25">
                May your dice roll true and your adventures be legendary.
              </p>

            </div>

          </div>


          {/* Decorative Divider */}
          <div className="mt-10 flex items-center gap-4">

            <div className="h-px flex-1 bg-amber-900/20" />

            <span className="text-sm tracking-widest text-amber-400/30">
              ✦ ✦ ✦
            </span>

            <div className="h-px flex-1 bg-amber-900/20" />

          </div>

        </div>

      </div>
    </main>
  );
}
