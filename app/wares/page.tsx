"use client";

import ProductCard from "@/components/ProductCard";
import type { Category, Product } from "@/types";
import { supabase } from "@/lib/supabase/supabase";
import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

export function WaresContent() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const [publisher, setPublisher] = useState(
    searchParams.get("publisher") ?? "All",
  );
  const [playerCount, setPlayerCount] = useState(
    searchParams.get("playerCount") ?? "",
  );
  const [playTime, setPlayTime] = useState(
    searchParams.get("playTime") ?? "All",
  );
  const [minAge, setMinAge] = useState(searchParams.get("minAge") ?? "All");
  const [inStockOnly, setInStockOnly] = useState(
    searchParams.get("inStockOnly") === "true",
  );
  const [search, setSearch] = useState(searchParams.get("search") ?? "");
  const [category, setCategory] = useState(
    searchParams.get("category") ?? "All",
  );
  const [sort, setSort] = useState(searchParams.get("sort") ?? "featured");
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 9;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      setLoading(true);

      const [productsResult, categoriesResult] = await Promise.all([
        supabase
          .from("products")
          .select("*, category (name)")
          .order("created_at", { ascending: false }),

        supabase
          .from("category")
          .select("*")
          .order("name", { ascending: true }),
      ]);

      if (productsResult.error) {
        console.error("Error fetching products:", productsResult.error.message);
      } else {
        setProducts((productsResult.data ?? []) as Product[]);
      }

      if (categoriesResult.error) {
        console.error(
          "Error fetching categories:",
          categoriesResult.error.message,
        );
      } else {
        setCategories((categoriesResult.data ?? []) as Category[]);
      }

      setPage(1);
      setLoading(false);
    }

    getData();
  }, [search, category, sort]);

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
      result = result.filter((product) => product.category_id === category);
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
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;

      case "featured":
      default:
        break;
    }

    // Publisher
    if (publisher !== "All") {
      result = result.filter((product) => product.publisher === publisher);
    }

    // Player count — product must support this many players
    if (playerCount.trim() !== "") {
      const n = Number(playerCount);
      if (!Number.isNaN(n)) {
        result = result.filter((product) => {
          if (
            product.player_count_min == null ||
            product.player_count_max == null
          )
            return false;
          return n >= product.player_count_min && n <= product.player_count_max;
        });
      }
    }

    // Play time
    if (playTime !== "All") {
      result = result.filter((product) => {
        const t = product.play_time_minutes;
        if (t == null) return false;
        if (playTime === "under30") return t < 30;
        if (playTime === "30to60") return t >= 30 && t <= 60;
        if (playTime === "60to90") return t > 60 && t <= 90;
        if (playTime === "90plus") return t > 90;
        return true;
      });
    }

    // Minimum age
    if (minAge !== "All") {
      const n = Number(minAge);
      result = result.filter(
        (product) =>
          product.age_recommendation != null && product.age_recommendation <= n,
      );
    }

    // In stock only
    if (inStockOnly) {
      result = result.filter((product) => product.stock > 0);
    }

    return result;
  }, [
    products,
    search,
    category,
    sort,
    publisher,
    playerCount,
    playTime,
    minAge,
    inStockOnly,
  ]);

  const publishers = useMemo(() => {
    const unique = new Set(products.map((p) => p.publisher).filter(Boolean));
    return Array.from(unique) as string[];
  }, [products]);

  const hasFilters =
    search !== "" ||
    category !== "All" ||
    sort !== "featured" ||
    publisher !== "All" ||
    playerCount !== "" ||
    playTime !== "All" ||
    minAge !== "All" ||
    inStockOnly;

  const totalPages = Math.max(
    1,
    Math.ceil(filteredProducts.length / PAGE_SIZE),
  );
  const paginatedProducts = filteredProducts.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE,
  );

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
              Step into the Bazaar and discover curious dice, legendary
              miniatures, mysterious board games, and other treasures gathered
              from merchants across the realms.
            </p>

            <div className="mt-8 flex items-center gap-3 text-sm text-amber-100/50">
              <span className="text-amber-400">⚔</span>
              <span>Every adventurer deserves the right equipment.</span>
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
                <span className="text-xl text-amber-400">🧙</span>

                <div>
                  <h2 className="font-serif text-lg font-semibold text-amber-200">
                    Merchant's Desk
                  </h2>

                  <p className="text-xs text-amber-100/40">Search the Bazaar</p>
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
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="name">Name</option>
                </select>
              </div>

              {/* Publisher */}
              <div>
                <label
                  htmlFor="publisher"
                  className="mb-2 block text-xs font-semibold uppercase tracking-wider text-amber-400/80"
                >
                  Publisher
                </label>
                <select
                  id="publisher"
                  value={publisher}
                  onChange={(e) => setPublisher(e.target.value)}
                  className="w-full cursor-pointer rounded-lg border border-amber-900/40 bg-[#17121f] px-3 py-2.5 text-sm text-amber-100 outline-none transition focus:border-amber-400/70 focus:ring-1 focus:ring-amber-400/20"
                >
                  <option value="All">All Publishers</option>
                  {publishers.map((pub) => (
                    <option key={pub} value={pub}>
                      {pub}
                    </option>
                  ))}
                </select>
              </div>

              {/* Player Count */}
              <div>
                <label
                  htmlFor="playerCount"
                  className="mb-2 block text-xs font-semibold uppercase tracking-wider text-amber-400/80"
                >
                  Number of Players
                </label>
                <input
                  id="playerCount"
                  type="number"
                  min={1}
                  value={playerCount}
                  onChange={(e) => setPlayerCount(e.target.value)}
                  placeholder="e.g. 4"
                  className="w-full rounded-lg border border-amber-900/40 bg-[#17121f] px-3 py-2.5 text-sm text-amber-100 placeholder:text-amber-100/25 outline-none transition focus:border-amber-400/70 focus:ring-1 focus:ring-amber-400/20"
                />
              </div>

              {/* Play Time */}
              <div>
                <label
                  htmlFor="playTime"
                  className="mb-2 block text-xs font-semibold uppercase tracking-wider text-amber-400/80"
                >
                  Play Time
                </label>
                <select
                  id="playTime"
                  value={playTime}
                  onChange={(e) => setPlayTime(e.target.value)}
                  className="w-full cursor-pointer rounded-lg border border-amber-900/40 bg-[#17121f] px-3 py-2.5 text-sm text-amber-100 outline-none transition focus:border-amber-400/70 focus:ring-1 focus:ring-amber-400/20"
                >
                  <option value="All">Any Length</option>
                  <option value="under30">Under 30 min</option>
                  <option value="30to60">30–60 min</option>
                  <option value="60to90">60–90 min</option>
                  <option value="90plus">90+ min</option>
                </select>
              </div>

              {/* Age Recommendation */}
              <div>
                <label
                  htmlFor="minAge"
                  className="mb-2 block text-xs font-semibold uppercase tracking-wider text-amber-400/80"
                >
                  Age
                </label>
                <select
                  id="minAge"
                  value={minAge}
                  onChange={(e) => setMinAge(e.target.value)}
                  className="w-full cursor-pointer rounded-lg border border-amber-900/40 bg-[#17121f] px-3 py-2.5 text-sm text-amber-100 outline-none transition focus:border-amber-400/70 focus:ring-1 focus:ring-amber-400/20"
                >
                  <option value="All">All Ages</option>
                  <option value="6">6+</option>
                  <option value="8">8+</option>
                  <option value="10">10+</option>
                  <option value="12">12+</option>
                  <option value="16">16+</option>
                  <option value="18">18+</option>
                </select>
              </div>

              {/* In Stock Only */}
              <div className="flex items-center gap-2">
                <input
                  id="inStockOnly"
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="h-4 w-4 rounded border-amber-900/40 bg-[#17121f] text-amber-400 focus:ring-amber-400/20"
                />
                <label
                  htmlFor="inStockOnly"
                  className="text-sm text-amber-100/70"
                >
                  In stock only
                </label>
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
                    <span className="text-amber-100/50">Category</span>

                    <span className="max-w-30 truncate text-right text-amber-200">
                      {category === "All"
                        ? "All"
                        : (categories.find((cat) => cat.id === category)
                            ?.name ?? "Selected")}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-amber-100/50">Results</span>

                    <span className="text-amber-200">
                      {loading ? "..." : filteredProducts.length}
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
                    setPublisher("All");
                    setPlayerCount("");
                    setPlayTime("All");
                    setMinAge("All");
                    setInStockOnly(false);
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
                <div className="mb-5 animate-pulse text-4xl">✦</div>

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
                <div className="mb-5 text-5xl">🕯️</div>

                <h3 className="font-serif text-2xl font-semibold text-amber-200">
                  The shelves are bare
                </h3>

                <p className="mt-3 max-w-md text-amber-100/50">
                  No wares match your current search. Perhaps another path
                  through the Bazaar will reveal what you seek.
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
                {paginatedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}

            {/* Pagination */}
            {!loading && filteredProducts.length > 0 && (
              <div className="mt-14 flex items-center justify-center gap-2">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="rounded-lg border border-amber-900/40 px-4 py-2 text-sm text-amber-100/60 transition hover:border-amber-400/60 hover:text-amber-200 disabled:cursor-not-allowed disabled:border-amber-900/30 disabled:text-amber-100/20 disabled:hover:border-amber-900/30 disabled:hover:text-amber-100/20"
                >
                  ← Previous
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (pageNum) => (
                    <button
                      key={pageNum}
                      onClick={() => setPage(pageNum)}
                      className={
                        pageNum === page
                          ? "rounded-lg bg-amber-300 px-4 py-2 text-sm font-bold text-[#1b1625] shadow-lg shadow-amber-900/10"
                          : "rounded-lg border border-amber-900/40 px-4 py-2 text-sm text-amber-100/60 transition hover:border-amber-400/60 hover:text-amber-200"
                      }
                    >
                      {pageNum}
                    </button>
                  ),
                )}

                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="rounded-lg border border-amber-900/40 px-4 py-2 text-sm text-amber-100/60 transition hover:border-amber-400/60 hover:text-amber-200 disabled:cursor-not-allowed disabled:border-amber-900/30 disabled:text-amber-100/20 disabled:hover:border-amber-900/30 disabled:hover:text-amber-100/20"
                >
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
export default function WaresPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-[#1b1625] text-amber-100 p-12 text-center">
          <p className="font-serif text-lg text-amber-200">
            Loading the Bazaar...
          </p>
        </main>
      }
    >
      <WaresContent />
    </Suspense>
  );
}
