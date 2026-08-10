import Link from "next/link";

export default function MerchantsPage() {
  return (
    <main className="min-h-screen bg-[#1B1625] px-6 py-20 text-amber-100">
      <div className="mx-auto max-w-6xl">

        <section className="text-center">
          <div className="text-6xl">🏪</div>

          <h1 className="mt-6 font-serif text-5xl font-bold text-amber-300">
            Our Merchants
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-amber-100/60">
            Meet the keepers, crafters, and creators who bring the treasures
            of The Arcane Bazaar to adventurers everywhere.
          </p>
        </section>

        <section className="mt-16 rounded-2xl border border-amber-700/40 bg-[#2A2338] p-8 shadow-2xl sm:p-10">
          <div className="text-center">
            <div className="text-4xl">🧙</div>

            <h2 className="mt-4 font-serif text-3xl font-bold text-amber-300">
              The Merchant Guild
            </h2>

            <p className="mx-auto mt-5 max-w-3xl leading-8 text-amber-100/70">
              The Arcane Bazaar brings together passionate merchants and
              creators who share a love for tabletop adventures. Each merchant
              contributes their own collection of games, accessories, tools,
              and treasures for adventurers to discover.
            </p>
          </div>
        </section>

        <section className="mt-10">
          <div className="text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-amber-400">
              The Guild's Specialties
            </p>

            <h2 className="mt-3 font-serif text-3xl font-bold text-amber-300">
              Treasures From Every Corner
            </h2>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

            <div className="rounded-2xl border border-amber-700/30 bg-[#2A2338] p-7">
              <div className="text-4xl">🎲</div>

              <h3 className="mt-5 font-serif text-xl font-bold text-amber-300">
                Game Keepers
              </h3>

              <p className="mt-3 text-sm leading-7 text-amber-100/60">
                Discover tabletop games, card games, and experiences ready
                to bring players together around the table.
              </p>
            </div>

            <div className="rounded-2xl border border-amber-700/30 bg-[#2A2338] p-7">
              <div className="text-4xl">⚔️</div>

              <h3 className="mt-5 font-serif text-xl font-bold text-amber-300">
                Armory Crafters
              </h3>

              <p className="mt-3 text-sm leading-7 text-amber-100/60">
                Find dice, miniatures, accessories, and useful tools to
                prepare your table for its next adventure.
              </p>
            </div>

            <div className="rounded-2xl border border-amber-700/30 bg-[#2A2338] p-7">
              <div className="text-4xl">📜</div>

              <h3 className="mt-5 font-serif text-xl font-bold text-amber-300">
                Lorekeepers
              </h3>

              <p className="mt-3 text-sm leading-7 text-amber-100/60">
                Explore books, guides, campaign resources, and knowledge
                to help Game Masters and players expand their worlds.
              </p>
            </div>

            <div className="rounded-2xl border border-amber-700/30 bg-[#2A2338] p-7">
              <div className="text-4xl">🪄</div>

              <h3 className="mt-5 font-serif text-xl font-bold text-amber-300">
                Arcane Artisans
              </h3>

              <p className="mt-3 text-sm leading-7 text-amber-100/60">
                Discover handcrafted and fantasy-inspired creations made
                to bring a little more magic to your tabletop.
              </p>
            </div>

          </div>
        </section>

        <section className="mt-10 rounded-2xl border border-amber-700/30 bg-[#2A2338] p-8 sm:p-10">
          <div className="text-center">
            <div className="text-4xl">🤝</div>

            <h2 className="mt-4 font-serif text-3xl font-bold text-amber-300">
              Why Our Merchants Matter
            </h2>

            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-amber-100/60">
              Behind every treasure is someone who helped create, discover,
              or bring it to the table. Our merchants contribute their
              knowledge, creativity, and passion to the tabletop community,
              helping adventurers find something worthy of their next campaign.
            </p>
          </div>
        </section>

        <section className="mt-12 text-center">
          <h2 className="font-serif text-3xl font-bold text-amber-300">
            Discover Their Treasures
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-amber-100/50">
            Explore the Bazaar and discover games, accessories, and resources
            from our growing collection of merchants.
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

