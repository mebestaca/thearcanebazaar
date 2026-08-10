import Link from "next/link";

export default function OurStoryPage() {
  return (
    <main className="min-h-screen bg-[#1B1625] px-6 py-20 text-amber-100">
      <div className="mx-auto max-w-4xl">

        <div className="text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-amber-400">
            Our Story
          </p>

          <h1 className="mt-4 font-serif text-5xl font-bold text-amber-300">
            The Chronicle of the Bazaar
          </h1>

          <p className="mx-auto mt-6 max-w-2xl leading-8 text-amber-100/70">
            Every marketplace has a beginning. Ours began with a passion for
            tabletop adventures and a belief that every player deserves a place
            to discover their next great journey.
          </p>
        </div>

        <section className="mt-16 space-y-16">

          <div>
            <p className="text-sm uppercase tracking-widest text-amber-400">
              Chapter I
            </p>

            <h2 className="mt-2 font-serif text-3xl text-amber-300">
              The First Spark
            </h2>

            <p className="mt-4 leading-8 text-amber-100/70">
              The Arcane Bazaar began with a simple idea: create a place where
              tabletop enthusiasts could discover games, accessories, and
              inspiration in one fantasy-inspired marketplace.
            </p>
          </div>

          <div>
            <p className="text-sm uppercase tracking-widest text-amber-400">
              Chapter II
            </p>

            <h2 className="mt-2 font-serif text-3xl text-amber-300">
              Building the Bazaar
            </h2>

            <p className="mt-4 leading-8 text-amber-100/70">
              Inspired by magical marketplaces found in fantasy worlds, the
              Bazaar became more than a store. It became a place where every
              visitor could discover something worthy of their next adventure.
            </p>
          </div>

          <div>
            <p className="text-sm uppercase tracking-widest text-amber-400">
              Chapter III
            </p>

            <h2 className="mt-2 font-serif text-3xl text-amber-300">
              The Journey Continues
            </h2>

            <p className="mt-4 leading-8 text-amber-100/70">
              Every adventurer who visits the Bazaar becomes part of its story.
              As our collection grows, so does the community that inspires us to
              keep exploring and sharing new adventures.
            </p>
          </div>

        </section>

        <section className="mt-16 rounded-2xl border border-amber-700/30 bg-[#2A2338] p-10 text-center">

          <p className="font-serif text-3xl italic text-amber-300">
            "Every legend begins with a single step through the Bazaar."
          </p>

          <p className="mt-5 text-amber-100/60">
            Thank you for becoming part of our story.
          </p>

          <Link
            href="/"
            className="mt-8 inline-block rounded-lg bg-gradient-to-r from-amber-700 to-amber-500 px-7 py-3 font-semibold text-white transition hover:from-amber-600 hover:to-amber-400"
          >
            Return to the Bazaar →
          </Link>

        </section>

      </div>
    </main>
  );
}