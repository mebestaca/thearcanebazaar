import ProductCard from "@/components/ProductCard";
import type { Product } from '@/types';
import { supabase } from "@/lib/supabase/supabase";


async function getProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching products:', error.message);
    return [];
  }
  return (data ?? []) as Product[];
}

export default async function WaresPage() {

  const products = await getProducts();
  

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
              placeholder="Search wares..."
              className="w-full rounded-lg border border-amber-900/30 bg-[#1b1625] px-4 py-2 outline-none focus:border-amber-400"
            />

          </div>

          <div>

            <label className="mb-2 block text-sm font-medium text-amber-300">
              Category
            </label>

            <select
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

            {/* <h2 className="text-2xl font-bold text-amber-300">
              {filteredProducts.length} Wares Found
            </h2> */}

          </div>

          <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
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