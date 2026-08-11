'use client';

import ProductCard from "@/components/ProductCard";
import type { Category, Product } from "@/types";
import { supabase } from "@/lib/supabase/supabase";
import { useEffect, useMemo, useState } from "react";

export default function WaresPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("featured");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      setLoading(true);

      const [productsResult, categoriesResult] = await Promise.all([
        supabase
          .from("products")
          .select("*")
          .order("created_at", { ascending: false }),

        supabase
          .from("category")
          .select("*")
          .order("name", { ascending: true }),
      ]);

      if (productsResult.error) {
        console.error(
          "Error fetching products:",
          productsResult.error.message
        );
      } else {
        setProducts((productsResult.data ?? []) as Product[]);
      }

      if (categoriesResult.error) {
        console.error(
          "Error fetching categories:",
          categoriesResult.error.message
        );
      } else {
        setCategories((categoriesResult.data ?? []) as Category[]);
      }

      setLoading(false);
    }

    getData();
  }, []);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search
    if (search.trim() !== "") {
      const searchTerm = search.toLowerCase().trim();

      result = result.filter((product) => {
        const productName = product.name?.toLowerCase() ?? "";

        return productName.includes(searchTerm);
      });
    }

    // Category
    if (category !== "All") {
      result = result.filter(
        (product) => product.category_id === category
      );
    }

    // Sort
    switch (sort) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;

      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;

      case "name":
        result.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        break;

      case "featured":
      default:
        break;
    }

    return result;
  }, [products, search, category, sort]);

  const hasFilters =
    search !== "" ||
    category !== "All" ||
    sort !== "featured";

  return (
    <main className="min-h-screen bg-[#1b1625] text-amber-100">

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-amber-900/30">
        <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-amber-400/5 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 py-20">
          <div className="max-w-3xl">
            <div className="mb-5 flex items-center gap-3 text-sm uppercase tracking-[0.3em] text-amber-400/80">
              <span>✦</span>
              <span>The Merchant's Marketplace</span>
              <span>✦</span>
            </div>

            <h1 className="font-serif text-5xl font-bold tracking-tight text-amber-200 sm:text-6xl">
              Browse the Wares
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-amber-100/60">
              Step into the Bazaar and discover curious dice,
              legendary miniatures, mysterious board games, and
              other treasures gathered from merchants across the realms.
            </p>

            <div className="mt-8 flex items-center gap-3 text-sm text-amber-100/50">
              <span className="text-amber-400">⚔</span>
              <span>
                Every adventurer deserves the right equipment.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-10 lg:grid-cols-[260px_1fr]">

          {/* Filter Sidebar */}
          <aside className="h-fit rounded-xl border border-amber-900/30 bg-[#211a2c] shadow-xl shadow-black/10">

            {/* Sidebar Header */}
            <div className="border-b border-amber-900/30 px-6 py-5">
              <div className="flex items-center gap-3">
                <span className="text-xl text-amber-400">
                  🧙
                </span>

                <div>
                  <h2 className="font-serif text-lg font-semibold text-amber-200">
                    Merchant's Desk
                  </h2>

                  <p className="text-xs text-amber-100/40">
                    Search the Bazaar
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-7 p-6">

              {/* Search */}
              <div>
                <label
                  htmlFor="search"
                  className="mb-2 block text-xs font-semibold uppercase tracking-wider text-amber-400/80"
                >
                  Search Wares
                </label>

                <div className="relative">
                  <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-amber-100/30">
                    🔎
                  </span>

                  <input
                    id="search"
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Find a treasure..."
                    className="w-full rounded-lg border border-amber-900/40 bg-[#17121f] py-2.5 pl-10 pr-3 text-sm text-amber-100 placeholder:text-amber-100/25 outline-none transition focus:border-amber-400/70 focus:ring-1 focus:ring-amber-400/20"
                  />
                </div>
              </div>

              {/* Category */}
              <div>
                <label
                  htmlFor="category"
                  className="mb-2 block text-xs font-semibold uppercase tracking-wider text-amber-400/80"
                >
                  Category
                </label>

                <select
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full cursor-pointer rounded-lg border border-amber-900/40 bg-[#17121f] px-3 py-2.5 text-sm text-amber-100 outline-none transition focus:border-amber-400/70 focus:ring-1 focus:ring-amber-400/20"
                >
                  <option value="All">All Wares</option>

                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort */}
              <div>
                <label
                  htmlFor="sort"
                  className="mb-2 block text-xs font-semibold uppercase tracking-wider text-amber-400/80"
                >
                  Arrange By
                </label>

                <select
                  id="sort"
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="w-full cursor-pointer rounded-lg border border-amber-900/40 bg-[#17121f] px-3 py-2.5 text-sm text-amber-100 outline-none transition focus:border-amber-400/70 focus:ring-1 focus:ring-amber-400/20"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">
                    Price: Low to High
                  </option>
                  <option value="price-high">
                    Price: High to Low
                  </option>
                  <option value="name">Name</option>
                </select>
              </div>

              {/* Divider */}
              <div className="border-t border-amber-900/20" />

              {/* Current Selection */}
              <div>
                <p className="mb-3 text-xs uppercase tracking-wider text-amber-100/30">
                  Current Selection
                </p>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-amber-100/50">
                      Category
                    </span>

                    <span className="max-w-30 truncate text-right text-amber-200">
                      {category === "All"
                        ? "All"
                        : categories.find(
                            (cat) => cat.id === category
                          )?.name ?? "Selected"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-amber-100/50">
                      Results
                    </span>

                    <span className="text-amber-200">
                      {loading
                        ? "..."
                        : filteredProducts.length}
                    </span>
                  </div>
                </div>
              </div>

              {/* Clear Filters */}
              {hasFilters && (
                <button
                  onClick={() => {
                    setSearch("");
                    setCategory("All");
                    setSort("featured");
                  }}
                  className="w-full rounded-lg border border-amber-700/60 px-4 py-2.5 text-sm font-medium text-amber-300 transition hover:border-amber-400 hover:bg-amber-400/5 hover:text-amber-200"
                >
                  ✦ Clear Selection
                </button>
              )}
            </div>
          </aside>

          {/* Products */}
          <section>

            {/* Results Header */}
            <div className="mb-8 flex flex-col gap-3 border-b border-amber-900/20 pb-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="mb-1 text-xs uppercase tracking-[0.25em] text-amber-400/60">
                  The Collection
                </p>

                <h2 className="font-serif text-3xl font-bold text-amber-200">
                  {loading
                    ? "Consulting the Merchants..."
                    : `${filteredProducts.length} Wares Found`}
                </h2>
              </div>

              {!loading && (
                <p className="text-sm text-amber-100/40">
                  Choose wisely, adventurer.
                </p>
              )}
            </div>

            {/* Loading */}
            {loading && (
              <div className="flex min-h-100 flex-col items-center justify-center rounded-xl border border-amber-900/20 bg-[#211a2c]">
                <div className="mb-5 animate-pulse text-4xl">
                  ✦
                </div>

                <p className="font-serif text-lg text-amber-200">
                  Consulting the merchants...
                </p>

                <p className="mt-2 text-sm text-amber-100/40">
                  The shelves are being prepared.
                </p>
              </div>
            )}

            {/* No Results */}
            {!loading && filteredProducts.length === 0 && (
              <div className="flex min-h-100 flex-col items-center justify-center rounded-xl border border-amber-900/30 bg-[#211a2c] px-6 text-center">
                <div className="mb-5 text-5xl">
                  🕯️
                </div>

                <h3 className="font-serif text-2xl font-semibold text-amber-200">
                  The shelves are bare
                </h3>

                <p className="mt-3 max-w-md text-amber-100/50">
                  No wares match your current search.
                  Perhaps another path through the Bazaar
                  will reveal what you seek.
                </p>

                <button
                  onClick={() => {
                    setSearch("");
                    setCategory("All");
                    setSort("featured");
                  }}
                  className="mt-6 rounded-lg bg-amber-300 px-5 py-2.5 text-sm font-semibold text-[#1b1625] transition hover:bg-amber-200"
                >
                  Return to All Wares
                </button>
              </div>
            )}

            {/* Product Grid */}
            {!loading && filteredProducts.length > 0 && (
              <div className="grid gap-7 sm:grid-cols-2 xl:grid-cols-3">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                  />
                ))}
              </div>
            )}

            {/* Pagination */}
            {!loading && filteredProducts.length > 0 && (
              <div className="mt-14 flex items-center justify-center gap-2">
                <button
                  disabled
                  className="rounded-lg border border-amber-900/30 px-4 py-2 text-sm text-amber-100/20"
                >
                  ← Previous
                </button>

                <button className="rounded-lg bg-amber-300 px-4 py-2 text-sm font-bold text-[#1b1625] shadow-lg shadow-amber-900/10">
                  1
                </button>

                <button className="rounded-lg border border-amber-900/40 px-4 py-2 text-sm text-amber-100/60 transition hover:border-amber-400/60 hover:text-amber-200">
                  2
                </button>

                <button className="rounded-lg border border-amber-900/40 px-4 py-2 text-sm text-amber-100/60 transition hover:border-amber-400/60 hover:text-amber-200">
                  Next →
                </button>
              </div>
            )}
          </section>
        </div>
      </section>
    </main>
  );
}

