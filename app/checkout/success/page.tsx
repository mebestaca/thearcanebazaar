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

  const savings =
    subtotal !== null && total !== null
      ? Number(subtotal) - Number(total)
      : null;

  return (
    <main className="min-h-screen bg-[#1b1625] px-6 py-16 text-amber-100">
      <ClearCart />

      {/* Ambient glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-20 h-96 w-96 -translate-x-1/2 rounded-full bg-amber-400/4 blur-3xl" />

        <div className="absolute bottom-0 left-1/4 h-64 w-64 rounded-full bg-purple-500/3 blur-3xl" />
      </div>


      <div className="relative mx-auto max-w-3xl">

        {/* HEADER */}
        <div className="mb-8">
          <p className="text-xs uppercase tracking-[0.25em] text-amber-100/30">
            The Arcane Bazaar
          </p>

          <div className="mt-2 flex items-center gap-3">
            <h1 className="font-serif text-3xl font-bold text-amber-300">
              Transaction Recorded
            </h1>

            <span
              className="
                rounded-full
                border border-emerald-400/20
              bg-emerald-400/6
                px-2.5
                py-1
                text-[10px]
                font-medium
                uppercase
                tracking-wider
                text-emerald-300/80
              "
            >
              Complete
            </span>
          </div>

          <p className="mt-2 text-sm text-amber-100/40">
            Your purchase has been entered into the merchant&apos;s ledger.
          </p>
        </div>


        {/* LEDGER CARD */}
        <div
           className="
            overflow-hidden
            rounded-xl
            border border-amber-900/30
            bg-[#211a2c]
            px-6 py-5
            transition-all
            duration-300
            ease-out
            hover:border-amber-400/50
            hover:shadow-[0_0_20px_rgba(251,191,36,0.15)]
          "
        >

          {/* Top bar */}
          <div
            className="
              flex
              items-center
              justify-between
              border-b
              border-amber-900/20
              bg-[#17121f]/30
              px-6
              py-4
            "
          >

            <div className="flex items-center gap-3">
              <span className="text-amber-400/50">
                ✦
              </span>
              <span className="text-xs uppercase tracking-[0.2em] text-amber-100/40">
                Merchant&apos;s Ledger
              </span>
            </div>
            <span className="font-mono text-xs text-amber-100/20">
              ENTRY
            </span>

          </div>


          {/*  ORDER INFORMATION*/}
          <div className="px-6 py-7 sm:px-8">

            {orderId && (
              <div className="mb-8">
                <p className="text-[10px] uppercase tracking-[0.2em] text-amber-100/25">
                  Ledger Reference
                </p>
                <p className="mt-2 break-all font-mono text-sm text-amber-300/80">
                  {orderId}
                </p>
              </div>
            )}


            {/* FORTUNE */}
            {diceRoll !== null && (
              <div
                className="
                  mb-6
                  rounded-lg
                  border border-amber-400/20
                  bg-amber-400/[0.035]
                  px-5
                  py-5
                  transition-all
                  duration-300
                  hover:border-amber-400/35
                  hover:bg-amber-400/5
                  hover:shadow-[0_0_20px_rgba(251,191,36,0.08)]
                "
              >

                <div className="flex items-center justify-between gap-6">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-amber-100/30">
                      Fortune&apos;s Discount
                    </p>

                    <p className="mt-2 text-sm text-amber-100/50">
                      The dice have spoken in your favor.
                    </p>
                  </div>


                  <div className="text-right">
                    <p className="font-serif text-3xl font-bold text-amber-300">
                      {diceRoll}%
                    </p>
                    <p className="mt-1 text-[10px] uppercase tracking-wider text-amber-100/25">
                      Roll: {diceRoll}
                    </p>
                  </div>
                </div>
              </div>
            )}


            {/* PRICE BREAKDOWN */}

            <div>
              <div className="mb-4 flex items-center gap-3">
                <span className="text-[10px] uppercase tracking-[0.2em] text-amber-100/25">
                  Settlement
                </span>
                <div className="h-px flex-1 bg-amber-900/20" />
              </div>


              <div className="space-y-4">
                {subtotal !== null && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-amber-100/45">
                      Order Subtotal
                    </span>

                    <span className="font-mono text-sm text-amber-100/70">
                      ${Number(subtotal).toFixed(2)}
                    </span>
                  </div>
                )}


                {savings !== null && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-amber-100/45">
                      Fortune&apos;s Discount
                    </span>

                    <span className="font-mono text-sm text-emerald-300/80">
                      −${savings.toFixed(2)}
                    </span>
                  </div>
                )}


                <div className="border-t border-amber-900/20 pt-4">
                  <div className="flex items-end justify-between">
                    <span className="font-serif text-base text-amber-200">
                      Total Paid
                    </span>

                    {total !== null && (
                      <span className="font-serif text-2xl font-bold text-amber-300">
                        ${Number(total).toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>


          {/* CONFIRMATION */}
          <div
            className="
              border-t
              border-amber-900/20
              bg-[#17121f]/30
              px-6
              py-6
              sm:px-8
            "
          >

            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-medium text-amber-100/70">
                  Your treasures are secured.
                </p>
                <p className="mt-1 text-xs text-amber-100/30">
                  The merchant guild will prepare your order shortly.
                </p>
              </div>


              <Link
                href="/wares"
                className="
                  group
                  relative
                  inline-flex
                  shrink-0
                  items-center
                  justify-center
                  gap-2
                  overflow-hidden
                  rounded-lg
                  border
                  border-amber-400/30
                  bg-amber-300
                  px-5
                  py-2.5
                  text-sm
                  font-semibold
                  text-[#1b1625]
                  shadow-[0_0_15px_rgba(251,191,36,0.12)]
                  transition-all
                  duration-300
                  hover:bg-amber-200
                  hover:shadow-[0_0_25px_rgba(251,191,36,0.3)]
                "
              >
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
          </div>


          {/* Bottom accent */}
          <div className="h-px bg-linear-to-r` from-transparent via-amber-400/30 to-transparent" />

        </div>


        {/* FOOTER */}

        <div className="mt-8 text-center">
          <p className="text-xs italic text-amber-100/20">
            May your dice roll true and your adventures be legendary.
          </p>
        </div>

      </div>
    </main>
  );
}