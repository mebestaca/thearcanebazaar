import Link from "next/link";

export default function RelicsPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#1b1625] px-6 py-20 text-amber-100">

      {/* Ambient Magic */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">

        <div
          className="
            absolute
            left-1/2
            top-1/4
            h-96
            w-96
            -translate-x-1/2
            rounded-full
          bg-amber-400/4.5
            blur-3xl
          "
        />

        <div
          className="
            absolute
            -bottom-32
            left-1/4
            h-72
            w-72
            rounded-full
            bg-purple-500/[0.035]
            blur-3xl
          "
        />

      </div>


      <div className="relative mx-auto flex min-h-[70vh] max-w-3xl items-center justify-center">

        <div className="w-full text-center">


          {/* =====================================================
              HEADER
              ===================================================== */}

          <div className="mb-8 flex items-center justify-center gap-4">

            <div className="h-px w-16 bg-amber-900/30" />

            <span className="text-xs uppercase tracking-[0.3em] text-amber-100/30">
              The Arcane Bazaar
            </span>

            <div className="h-px w-16 bg-amber-900/30" />

          </div>


          {/* =====================================================
              ICON
              ===================================================== */}

          <div className="relative mx-auto mb-8 flex h-24 w-24 items-center justify-center">

            <div
              className="
                absolute
                inset-0
                rounded-full
              bg-amber-400/6
                blur-2xl
              "
            />

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
                border-amber-400/25
                bg-[#211a2c]
                text-3xl
                text-amber-300/70
                shadow-[0_0_25px_rgba(251,191,36,0.08)]
              "
            >
              ✦
            </div>

          </div>


          {/* =====================================================
              TITLE
              ===================================================== */}

          <p className="text-xs uppercase tracking-[0.35em] text-amber-400/50">
            The Relic Vault
          </p>

          <h1 className="mt-4 font-serif text-4xl font-bold text-amber-200 sm:text-5xl">
            Something Ancient Is Stirring
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-amber-100/45">
            The relic vault is still being prepared. Rare artifacts,
            forgotten treasures, and curios of uncertain origin will
            eventually find their way onto these shelves.
          </p>


          {/* =====================================================
              STATUS CARD
              ===================================================== */}

          <div
            className="
              group
              relative
              mx-auto
              mt-10
              max-w-xl
              overflow-hidden
              rounded-xl
              border
              border-amber-900/30
              bg-[#211a2c]
              px-6
              py-6
              text-left

              transition-all
              duration-300
              ease-out

              hover:border-amber-400/50
              hover:bg-[#271f34]
              hover:shadow-[0_0_20px_rgba(251,191,36,0.15)]
            "
          >

            <div className="flex items-start gap-4">

              <div className="mt-1 text-lg text-amber-400/50">
                ◈
              </div>

              <div>

                <p className="text-sm font-medium text-amber-100/70">
                  Vault currently sealed
                </p>

                <p className="mt-2 text-sm leading-6 text-amber-100/35">
                  We are carefully cataloguing what belongs within.
                  This section will expand as the Bazaar grows.
                </p>

              </div>

            </div>

          </div>


          {/* =====================================================
              ACTION
              ===================================================== */}

          <div className="mt-9 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">

            <Link
              href="/wares"
              className="
                group
                relative
                inline-flex
                items-center
                gap-2
                overflow-hidden
                rounded-lg
                border
                border-amber-300/50
                bg-amber-300
                px-6
                py-3
                text-sm
                font-semibold
                text-[#1b1625]

                shadow-[0_0_18px_rgba(251,191,36,0.12)]

                transition-all
                duration-300

                hover:bg-amber-200
                hover:shadow-[0_0_30px_rgba(251,191,36,0.3)]
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
                Browse the Wares
              </span>

            </Link>


            <Link
              href="/"
              className="
                rounded-lg
                border
                border-amber-900/30
                px-6
                py-3
                text-sm
                text-amber-100/50

                transition-all
                duration-300

                hover:border-amber-400/30
                hover:text-amber-200
              "
            >
              Return to Bazaar
            </Link>

          </div>


          {/* =====================================================
              FOOTNOTE
              ===================================================== */}

          <div className="mt-12 flex items-center justify-center gap-4">

            <div className="h-px w-16 bg-amber-900/20" />

            <span className="text-xs tracking-[0.4em] text-amber-400/20">
              ✦ ✦ ✦
            </span>

            <div className="h-px w-16 bg-amber-900/20" />

          </div>

          <p className="mt-5 font-serif text-xs italic text-amber-100/20">
            Some treasures are worth waiting for.
          </p>

        </div>

      </div>

    </main>
  );
}