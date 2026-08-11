import Link from "next/link";
import { XCircle } from "lucide-react";

export default function CheckoutCancelPage() {
  return (
    <main className="min-h-screen bg-[#1b1625] text-amber-100">

      {/* Ambient Background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-20 h-96 w-96 -translate-x-1/2 rounded-full bg-red-500/5 blur-3xl" />
        <div className="absolute left-1/4 top-1/2 h-64 w-64 rounded-full bg-purple-500/5 blur-3xl" />
      </div>


      <div className="relative mx-auto flex min-h-[70vh] max-w-2xl items-center justify-center px-6 py-16">

        <div className="w-full text-center">

          {/* Cancelled Emblem */}
          <div className="relative mx-auto mb-8 flex h-24 w-24 items-center justify-center">

            {/* Glow */}
            <div className="absolute inset-0 rounded-full bg-red-400/10 blur-2xl" />

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
                border-red-400/30
                bg-[#211a2c]
                shadow-[0_0_30px_rgba(248,113,113,0.12)]
              "
            >
              <XCircle className="h-11 w-11 text-red-400/80" />
            </div>

          </div>


          {/* Main Card */}
          <div
            className="
              overflow-hidden
              rounded-2xl
              border
              border-amber-900/30
              bg-[#211a2c]
              shadow-[0_0_50px_rgba(0,0,0,0.2)]
            "
          >

            {/* Header */}
            <div className="border-b border-amber-900/20 px-6 py-4">

              <div className="flex items-center justify-center gap-3 text-xs uppercase tracking-[0.3em] text-red-300/60">
                <span>✦</span>
                <span>Transaction Interrupted</span>
                <span>✦</span>
              </div>

            </div>


            {/* Content */}
            <div className="px-6 py-12 sm:px-10">

              <h1 className="font-serif text-4xl font-bold text-amber-200 sm:text-5xl">
                Payment Cancelled
              </h1>

              <p className="mx-auto mt-5 max-w-md text-lg leading-relaxed text-amber-100/60">
                The transaction was abandoned before
                the final incantation was completed.
              </p>


              {/* Status */}
              <div
                className="
                  mx-auto
                  mt-8
                  max-w-md
                  rounded-xl
                  border
                  border-red-900/30
                  bg-red-950/20
                  px-5
                  py-4
                "
              >

                <div className="flex items-center justify-center gap-2 text-sm font-medium text-red-300">
                  <XCircle className="h-4 w-4" />
                  <span>No charge was made</span>
                </div>

                <p className="mt-2 text-xs leading-5 text-red-200/40">
                  Your treasures remain safely stored in your
                  inventory. Nothing has been lost.
                </p>

              </div>


              {/* Actions */}
              <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">

                <Link
                  href="/inventory"
                  className="
                    group
                    relative
                    overflow-hidden
                    rounded-lg
                    border
                    border-amber-300/50
                    bg-amber-300
                    px-7
                    py-3
                    font-semibold
                    text-[#1b1625]
                    shadow-[0_0_18px_rgba(251,191,36,0.12)]
                    transition-all
                    duration-300
                    hover:bg-amber-200
                    hover:shadow-[0_0_30px_rgba(251,191,36,0.35)]
                  "
                >

                  {/* Shine */}
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
                    🎒 Return to Inventory
                  </span>

                </Link>


                <Link
                  href="/wares"
                  className="
                    rounded-lg
                    border
                    border-amber-900/40
                    bg-[#17121f]
                    px-7
                    py-3
                    font-medium
                    text-amber-200/70
                    transition-all
                    hover:border-amber-400/40
                    hover:text-amber-200
                    hover:shadow-[0_0_20px_rgba(251,191,36,0.08)]
                  "
                >
                  Browse More Wares
                </Link>

              </div>

            </div>


            {/* Footer */}
            <div className="border-t border-amber-900/20 px-6 py-5">

              <p className="text-xs italic text-amber-100/25">
                The Bazaar keeps your treasures safe until you&apos;re ready.
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

