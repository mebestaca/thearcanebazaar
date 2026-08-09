"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

const products = [
  {
    id: 1,
    name: "Dragonbone Dice Set",
    category: "Dice",
    rarity: "Rare",
    price: 44.99,
  },
  {
    id: 2,
    name: "Goblin Warband",
    category: "Miniatures",
    rarity: "Common",
    price: 29.99,
  },
  {
    id: 3,
    name: "Dungeon Master's Tome",
    category: "Books",
    rarity: "Epic",
    price: 59.99,
  },
  {
    id: 4,
    name: "Crystal Cavern Terrain",
    category: "Terrain",
    rarity: "Legendary",
    price: 89.99,
  },
  {
    id: 5,
    name: "Elven Dice Tray",
    category: "Accessories",
    rarity: "Uncommon",
    price: 24.99,
  },
  {
    id: 6,
    name: "Lich Miniature",
    category: "Miniatures",
    rarity: "Rare",
    price: 34.99,
  },
  {
    id: 7,
    name: "Potion Tokens",
    category: "Accessories",
    rarity: "Common",
    price: 12.99,
  },
  {
    id: 8,
    name: "Castle Ruins",
    category: "Terrain",
    rarity: "Epic",
    price: 79.99,
  },
];

export default function WaresPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("featured");

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    if (category !== "All") {
      filtered = filtered.filter(
        (product) => product.category === category
      );
    }

    if (search.trim()) {
      filtered = filtered.filter((product) =>
        product.name
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    }

    switch (sort) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;

      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;

      case "name":
        filtered.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        break;
    }

    return filtered;
  }, [search, category, sort]);

  return (
    <main className="min-h-screen bg-[#1b1625] text-amber-100">

      {/* Hero */}

      <section className="border-b border-amber-900/30">

        <div className="mx-auto max-w-7xl px-6 py-16">

          <p className="uppercase tracking-[0.35em] text-amber-300">
            Merchant's Marketplace
          </p>

          <h1 className="mt-4 text-5xl font-bold text-amber-200">
            Browse Wares
          </h1>

          <p className="mt-5 max-w-3xl text-lg text-amber-100/70">
            From enchanted dice to legendary miniatures,
            discover everything required for your next adventure.
          </p>

        </div>

      </section>

      {/* Layout */}

      <section className="mx-auto grid max-w-7xl gap-8 px-6 py-12 lg:grid-cols-[280px_1fr]">

        {/* Sidebar */}

        <aside className="space-y-8 rounded-xl border border-amber-900/30 bg-[#241d31] p-6 h-fit">

          <div>

            <label className="mb-2 block text-sm font-medium text-amber-300">
              Search
            </label>

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search wares..."
              className="w-full rounded-lg border border-amber-900/30 bg-[#1b1625] px-4 py-2 outline-none focus:border-amber-400"
            />

          </div>

          <div>

            <label className="mb-2 block text-sm font-medium text-amber-300">
              Category
            </label>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-lg border border-amber-900/30 bg-[#1b1625] px-4 py-2"
            >
              <option>All</option>
              <option>Dice</option>
              <option>Miniatures</option>
              <option>Books</option>
              <option>Terrain</option>
              <option>Accessories</option>
            </select>

          </div>

          <div>

            <label className="mb-2 block text-sm font-medium text-amber-300">
              Sort By
            </label>

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="w-full rounded-lg border border-amber-900/30 bg-[#1b1625] px-4 py-2"
            >
              <option value="featured">Featured</option>
              <option value="price-low">
                Price: Low to High
              </option>
              <option value="price-high">
                Price: High to Low
              </option>
              <option value="name">
                Name
              </option>
            </select>

          </div>

        </aside>

        {/* Products */}

        <section>

          <div className="mb-8 flex items-center justify-between">

            <h2 className="text-2xl font-bold text-amber-300">
              {filteredProducts.length} Wares Found
            </h2>

          </div>

          <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">

            {filteredProducts.map((product) => (

              <div
                key={product.id}
                className="overflow-hidden rounded-xl border border-amber-900/30 bg-[#241d31] transition hover:-translate-y-1 hover:border-amber-400"
              >

                <div className="flex h-56 items-center justify-center bg-[#1b1625] text-amber-100/40">
                  Product Image
                </div>

                <div className="p-6">

                  <span className="rounded-full border border-amber-700 px-3 py-1 text-xs text-amber-300">
                    {product.rarity}
                  </span>

                  <h3 className="mt-4 text-xl font-semibold">
                    {product.name}
                  </h3>

                  <p className="mt-2 text-sm text-amber-100/60">
                    {product.category}
                  </p>

                  <div className="mt-6 flex items-center justify-between">

                    <span className="text-2xl font-bold text-amber-300">
                      ${product.price}
                    </span>

                    <Link
                      href={`/wares/${product.id}`}
                      className="rounded-lg bg-amber-300 px-4 py-2 font-semibold text-[#1b1625] hover:bg-amber-200"
                    >
                      View
                    </Link>

                  </div>

                </div>

              </div>

            ))}

          </div>

          {/* Pagination */}

          <div className="mt-12 flex justify-center gap-3">

            <button className="rounded-lg border border-amber-700 px-4 py-2 hover:border-amber-300">
              Previous
            </button>

            <button className="rounded-lg bg-amber-300 px-4 py-2 font-semibold text-[#1b1625]">
              1
            </button>

            <button className="rounded-lg border border-amber-700 px-4 py-2 hover:border-amber-300">
              2
            </button>

            <button className="rounded-lg border border-amber-700 px-4 py-2 hover:border-amber-300">
              Next
            </button>

          </div>

        </section>

      </section>

    </main>
  );
}