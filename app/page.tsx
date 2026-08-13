"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/supabase";
import ProductCard from "@/components/ProductCard";
import type { Product } from "@/types";

const categories = [
  {
    id: "caf9cf56-67d0-4376-b00c-9340549eec06",
    name: "Dice",
    icon: "🎲",
    description: "Enchanted dice, dice trays, and rolling accessories.",
  },
  {
    id: "93e2dddf-2c6e-48de-a8e7-ee7ec3e47e52",
    name: "Miniatures",
    icon: "🗿",
    description: "Heroes, monsters, dragons, and entire armies.",
  },
  {
    id: "34fecffd-61c7-4215-a50b-c729170001e0",
    name: "Books",
    icon: "📚",
    description: "Rulebooks, adventures, and campaign settings.",
  },
  {
    id: "e334648f-514d-49e1-9e24-4b9e9a4c875d",
    name: "Terrain",
    icon: "🏰",
    description: "Bring your tabletop battles to life.",
  },
];

const articles = [
  {
    title: "Building Your First D&D Character",
    category: "Guide",
    readTime: "5 min read",
  },
  {
    title: "Top 10 Miniatures for New Players",
    category: "Review",
    readTime: "8 min read",
  },
  {
    title: "What's New in the Bazaar",
    category: "Announcement",
    readTime: "3 min read",
  },
];

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFeatured() {
      setLoading(true);
      const { data, error } = await supabase
        .from("products")
        .select("*, category (name)")
        .order("created_at", { ascending: false })
        .limit(4);

      if (error) {
        console.error("Error fetching featured products:", error.message);
      } else {
        setFeaturedProducts((data ?? []) as Product[]);
      }
      setLoading(false);
    }

    fetchFeatured();
  }, []);

  return (
    <main className="min-h-screen bg-[#1b1625] text-amber-100">
      {/* Hero */}

      <section className="border-b border-amber-900/30">
        <div className="mx-auto flex max-w-6xl flex-col items-center px-6 py-24 text-center">
          <p className="uppercase tracking-[0.4em] text-amber-300">
            Welcome, Traveler
          </p>

          <h1 className="mt-6 text-6xl font-bold text-amber-200">
            The Arcane Bazaar
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-amber-100/70">
            Discover handcrafted miniatures, enchanted dice, legendary
            rulebooks, and forgotten relics from every corner of the realm.
          </p>

          <div className="mt-10 flex gap-4">
            <Link
              href="/wares"
              className="rounded-lg bg-amber-300 px-6 py-3 font-semibold text-[#1b1625] shadow-[0_0_20px_rgba(251,191,36,0.4)] transition-all duration-300 hover:bg-amber-200 hover:shadow-[0_0_45px_rgba(251,191,36,0.7)]"
            >
              Browse Wares
            </Link>

            <Link
              href="/relics"
              className="rounded-lg border border-amber-700 px-6 py-3 transition hover:border-amber-300 hover:text-amber-300"
            >
              View Relics
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}

      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="mb-10 text-3xl font-bold text-amber-300">
          Shop By Category
        </h2>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={`/wares?category=${category.id}`}
              className="block rounded-xl border border-amber-900/30 bg-[#241d31] p-6 transition hover:-translate-y-1 hover:border-amber-400"
            >
              <div className="text-5xl">{category.icon}</div>

              <h3 className="mt-5 text-xl font-semibold text-amber-200">
                {category.name}
              </h3>

              <p className="mt-3 text-sm leading-6 text-amber-100/60">
                {category.description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Wares */}

      <section className="border-y border-amber-900/30 bg-[#211b2d]">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="mb-10 flex items-center justify-between">
            <h2 className="text-3xl font-bold text-amber-300">
              Featured Wares
            </h2>

            <Link
              href="/wares"
              className="text-sm text-amber-300 hover:text-amber-200"
            >
              View All →
            </Link>
          </div>

          {loading ? (
            <div className="flex h-52 items-center justify-center rounded-xl border border-amber-900/30 bg-[#241d31] text-amber-100/40">
              <span className="animate-pulse font-serif text-lg text-amber-200">
                Consulting the merchants...
              </span>
            </div>
          ) : featuredProducts.length === 0 ? (
            <p className="text-amber-100/50">No wares available right now.</p>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Latest Archives */}

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-10 flex items-center justify-between">
          <h2 className="text-3xl font-bold text-amber-300">Latest Archives</h2>

          <Link
            href="/archives"
            className="text-sm text-amber-300 hover:text-amber-200"
          >
            Visit Archives →
          </Link>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {articles.map((article) => (
            <div
              key={article.title}
              className="rounded-xl border border-amber-900/30 bg-[#241d31]"
            >
              <div className="flex h-48 items-center justify-center bg-[#1b1625] text-amber-100/40">
                Article Image
              </div>

              <div className="p-6">
                <span className="text-sm text-amber-300">
                  {article.category}
                </span>

                <h3 className="mt-3 text-xl font-bold text-amber-200">
                  {article.title}
                </h3>

                <p className="mt-3 text-sm text-amber-100/50">
                  {article.readTime}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter */}

      <section className="border-t border-amber-900/30">
        <div className="mx-auto max-w-4xl px-6 py-20 text-center">
          <h2 className="text-4xl font-bold text-amber-200">Join The Guild</h2>

          <p className="mx-auto mt-5 max-w-2xl text-amber-100/70">
            Receive news about new arrivals, legendary relics, exclusive
            discounts, and articles from the Archives.
          </p>

          <div className="mx-auto mt-10 flex max-w-xl gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 rounded-lg border border-amber-900/30 bg-[#241d31] px-4 py-3 text-amber-100 outline-none placeholder:text-amber-100/40 focus:border-amber-400"
            />

            <button className="rounded-lg bg-amber-300 px-6 font-semibold text-[#1b1625] hover:bg-amber-200">
              Join
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
