import Link from "next/link";

export default function OurStoryPage() {
  return (
    <main className="min-h-screen bg-[#1b1625] px-6 py-16 text-amber-100">
      <div className="mx-auto max-w-5xl">

        <section className="text-center">
          <div className="text-6xl">📜</div>

          <h1 className="mt-6 font-serif text-5xl font-bold text-amber-300">
            Our Story
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-amber-100/60">
            Every legend begins with an idea. Every adventure begins with a story.
          </p>
        </section>

        <section className="mt-16 rounded-2xl border border-amber-700/40 bg-[#2A2338] p-8 shadow-2xl sm:p-10">

          <div className="text-center">
            <span className="text-5xl">🏰</span>

            <h2 className="mt-5 font-serif text-3xl font-bold text-amber-300">
              Where the Bazaar Began
            </h2>
          </div>

          <div className="mx-auto mt-8 max-w-3xl space-y-6 text-lg leading-8 text-amber-100/70">

            <p>
              Every memorable tabletop adventure starts with curiosity.
              A forgotten map, a mysterious relic, or a handful of dice can
              become the beginning of an unforgettable journey.
            </p>

            <p>
              The Arcane Bazaar was created from that same spirit of discovery.
              We wanted to build more than an online marketplace—we wanted a
              place where tabletop enthusiasts could explore products,
              discover new resources, and find inspiration for their next
              campaign.
            </p>

            <p>
              Inspired by the bustling magical marketplaces found throughout
              fantasy worlds, the Bazaar is designed to feel like a destination
              where every shelf hides another treasure and every visit offers
              something new to uncover.
            </p>

            <p>
              Whether you're a first-time adventurer searching for your first
              set of dice or a seasoned Game Master expanding an ever-growing
              collection, we believe every item has the potential to become
              part of someone's next great story.
            </p>

            <p>
              Our journey has only just begun, and with every adventurer who
              visits the Bazaar, another chapter is written.
            </p>

          </div>
        </section>

        <section className="mt-10 grid gap-6 md:grid-cols-3">

          <div className="rounded-2xl border border-amber-700/30 bg-[#2A2338] p-6 text-center">
            <div className="text-5xl">🎲</div>

            <h3 className="mt-4 font-serif text-2xl text-amber-300">
              Discover
            </h3>

            <p className="mt-3 text-sm leading-7 text-amber-100/60">
              Explore carefully selected tabletop products and resources that
              inspire unforgettable adventures.
            </p>
          </div>

          <div className="rounded-2xl border border-amber-700/30 bg-[#2A2338] p-6 text-center">
            <div className="text-5xl">🛡️</div>

            <h3 className="mt-4 font-serif text-2xl text-amber-300">
              Create
            </h3>

            <p className="mt-3 text-sm leading-7 text-amber-100/60">
              Build worlds, craft stories, and prepare campaigns that bring
              players together around the table.
            </p>
          </div>

          <div className="rounded-2xl border border-amber-700/30 bg-[#2A2338] p-6 text-center">
            <div className="text-5xl">✨</div>

            <h3 className="mt-4 font-serif text-2xl text-amber-300">
              Adventure
            </h3>

            <p className="mt-3 text-sm leading-7 text-amber-100/60">
              Every purchase, every game, and every campaign becomes another
              chapter in a legendary adventure.
            </p>
          </div>

        </section>

        <section className="mt-12 rounded-2xl border border-amber-700/30 bg-[#2A2338] p-10 text-center">

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