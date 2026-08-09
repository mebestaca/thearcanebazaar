'use client'
import ProductCard from "@/components/ProductCard";
import type { Category, Product } from '@/types';
import { supabase } from "@/lib/supabase/supabase";
import { useEffect, useMemo, useState } from "react";


// async function getProducts(): Promise<Product[]> {

//   const { data, error } = await supabase
//     .from('products')
//     .select('*')
//     .order('created_at', { ascending: false });

//   if (error) {
//     console.error('Error fetching products:', error.message);
//     return [];
//   }
//   return (data ?? []) as Product[];
// }

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

      console.log("Products:", productsResult.data);
      console.log("Products error:", productsResult.error);

      console.log("Categories:", categoriesResult.data);
      console.log("Category error:", categoriesResult.error);

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
        // Products are already ordered by created_at
        // from Supabase.
        break;
    }

    return result;
  }, [products, search, category, sort]);

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
              id="search"
              type="text"
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

            {/* <select
              id="category"
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
            </select> */}

            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-lg border border-amber-900/30 bg-[#1b1625] px-4 py-2"
            >
              <option value="All">All</option>

              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>

          </div>

          <div>

            <label className="mb-2 block text-sm font-medium text-amber-300">
              Sort By
            </label>

            <select
              id="sort"
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

          {(search !== "" ||
            category !== "All" ||
            sort !== "featured") && (
            <button
              onClick={() => {
                setSearch("");
                setCategory("All");
                setSort("featured");
              }}
              className="w-full rounded-lg border border-amber-700 px-4 py-2 text-sm text-amber-300 transition hover:border-amber-300 hover:text-amber-200"
            >
              Clear Filters
            </button>
          )}

        </aside>

        {/* Products */}

         <section>

          {/* Results Header */}
          <div className="mb-8 flex items-center justify-between">

            <h2 className="text-2xl font-bold text-amber-300">
              {loading
                ? "Loading..."
                : `${filteredProducts.length} Wares Found`}
            </h2>

          </div>

          {/* Loading */}
          {loading && (
            <div className="py-20 text-center text-amber-100/60">
              Loading wares...
            </div>
          )}

          {/* No Results */}
          {!loading && filteredProducts.length === 0 && (
            <div className="rounded-xl border border-amber-900/30 bg-[#241d31] px-6 py-16 text-center">
              <h3 className="text-xl font-semibold text-amber-200">
                No wares found
              </h3>

              <p className="mt-2 text-amber-100/60">
                Try changing your search or category.
              </p>
            </div>
          )}

          {/* Product Grid */}
          {!loading && filteredProducts.length > 0 && (
            <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
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
            <div className="mt-12 flex justify-center gap-3">

              <button
                disabled
                className="rounded-lg border border-amber-700 px-4 py-2 text-amber-100/40"
              >
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
          )}

        </section>

      </section>

    </main>
  );
}