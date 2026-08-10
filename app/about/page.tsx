import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#1b1625] px-6 py-16 text-amber-100">
      <div className="mx-auto max-w-5xl">

        <section className="text-center">
          <div className="text-6xl">🏰</div>

          <h1 className="mt-6 font-serif text-5xl font-bold text-amber-300">
            About The Arcane Bazaar
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-amber-100/60">
            A gathering place for adventurers, storytellers, and tabletop
            enthusiasts seeking treasures for their next great adventure.
          </p>
        </section>

        <section className="mt-16 rounded-2xl border border-amber-700/40 bg-[#2A2338] p-8 shadow-2xl sm:p-10">
          <div className="text-center">
            <span className="text-4xl">🎯</span>

            <h2 className="mt-4 font-serif text-3xl font-bold text-amber-300">
              Our Mission
            </h2>
          </div>

          <div className="mx-auto mt-8 max-w-3xl space-y-5 text-base leading-8 text-amber-100/70">
            <p>
            The Arcane Bazaar was created from a passion for tabletop adventures and a love for fantasy worlds. 
            Our goal is to provide a welcoming marketplace where players can discover games, accessories, and resources 
            that inspire memorable campaigns. Every visitor becomes part of an ever-growing community of adventurers.
            </p>
          </div>
        </section>

        <section className="mt-10 grid gap-6 sm:grid-cols-2">

          <div className="rounded-2xl border border-amber-700/30 bg-[#2A2338] p-8">
            <div className="text-4xl">🗺️</div>

            <h2 className="mt-5 font-serif text-2xl font-bold text-amber-300">
              Our Vision
            </h2>

            <p className="mt-4 leading-7 text-amber-100/60">
              We envision a welcoming destination where tabletop enthusiasts
              can discover useful resources, find new treasures, and become
              inspired to create their own adventures.
            </p>
          </div>

          <div className="rounded-2xl border border-amber-700/30 bg-[#2A2338] p-8">
            <div className="text-4xl">⚔️</div>

            <h2 className="mt-5 font-serif text-2xl font-bold text-amber-300">
              For Adventurers
            </h2>

            <p className="mt-4 leading-7 text-amber-100/60">
              The Bazaar is built around the tabletop community. We want every
              visitor to find something that adds excitement to their table,
              strengthens their campaign, or sparks their next story.
            </p>
          </div>

        </section>

        <section className="mt-10 rounded-2xl border border-amber-700/30 bg-[#2A2338] p-8 text-center sm:p-10">
          <div className="text-4xl">✨</div>

          <h2 className="mt-4 font-serif text-3xl font-bold text-amber-300">
            What We Believe
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-amber-100/60">
            Tabletop games are more than products on a shelf. They are a way
            to gather people around a table, create stories together, and
            turn imagination into unforgettable adventures.
          </p>

          <p className="mx-auto mt-5 max-w-3xl font-serif text-xl italic text-amber-200/70">
            "Every legend begins with a single step through the Bazaar."
          </p>
        </section>

        <section className="mt-12 text-center">
          <h2 className="font-serif text-3xl font-bold text-amber-300">
            Your Adventure Awaits
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-amber-100/50">
            Explore the Bazaar and discover something worthy of your next
            campaign.
          </p>

          <Link
            href="/"
            className="mt-6 inline-block rounded-lg bg-gradient-to-r from-amber-700 to-amber-500 px-7 py-3 font-semibold text-white transition hover:from-amber-600 hover:to-amber-400"
          >
            Explore the Bazaar →
          </Link>
        </section>

      </div>
    </main>
  );
}

