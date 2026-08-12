import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Product } from '@/types';
import { supabase } from '@/lib/supabase/supabase';
import AddToCartSection from '@/components/AddToCartSection';
import Image from 'next/image';

export const revalidate = 0;

async function getProduct(id: string): Promise<Product | null> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !data) return null;

  return data as Product;
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    notFound();
  }

  const outOfStock = product.stock <= 0;

  return (
    <main className="min-h-screen bg-[#1b1625] text-amber-100">

      {/* Ambient Background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-amber-400/5 blur-3xl" />
      </div>

      {/* Page Content */}
      <div className="relative mx-auto max-w-6xl px-6 py-10">

        {/* Breadcrumb */}
        <Link
          href="/wares"
          className="inline-flex items-center gap-2 text-sm text-amber-100/40 transition-colors hover:text-amber-300"
        >
          <span>←</span>
          <span>Back to the Bazaar</span>
        </Link>

        {/* Product */}
        <div className="mt-8 grid gap-12 lg:grid-cols-2">

          {/* =====================================================
              PRODUCT IMAGE
          ===================================================== */}

          <div>

            <div className="group relative">

              {/* Outer Magical Glow */}
              <div className="pointer-events-none absolute -inset-3 rounded-2xl bg-amber-400/10 opacity-60 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />

              {/* Image Frame */}
              <div className="relative aspect-square overflow-hidden rounded-2xl border border-amber-900/40 bg-[#211a2c] shadow-2xl shadow-black/30">

                {product.image_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <Image
                    src={product.image_url}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                ) : (
                  <div className="flex h-full flex-col items-center justify-center text-amber-100/30">
                    <span className="mb-3 text-5xl">
                      ✦
                    </span>

                    <span className="text-sm">
                      No image available
                    </span>
                  </div>
                )}

                {/* Image Glow */}
                <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-[#17121f]/60 via-transparent to-transparent" />

                {/* Product Status */}
                {outOfStock && (
                  <div className="absolute left-5 top-5 rounded-full border border-red-900/50 bg-[#17121f]/90 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-red-300 backdrop-blur-sm">
                    Currently Unavailable
                  </div>
                )}

              </div>
            </div>

            {/* Image Caption */}
            <div className="mt-5 flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-amber-100/25">
              <span className="h-px flex-1 bg-amber-900/20" />
              <span>Arcane Bazaar Collection</span>
              <span className="h-px flex-1 bg-amber-900/20" />
            </div>

          </div>


          {/* =====================================================
              PRODUCT INFORMATION
          ===================================================== */}

          <div className="flex flex-col justify-center">

            {/* Category / Label */}
            <div className="mb-5 flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-amber-400/70">
              <span>✦</span>
              <span>Merchant's Offering</span>
            </div>


            {/* Product Name */}
            <h1 className="font-serif text-4xl font-bold leading-tight text-amber-200 sm:text-5xl">
              {product.name}
            </h1>


            {/* Decorative Divider */}
            <div className="my-6 flex items-center gap-3">
              <div className="h-px w-16 bg-amber-400/50" />

              <span className="text-amber-400">
                ✦
              </span>

              <div className="h-px flex-1 bg-amber-900/30" />
            </div>


            {/* Price */}
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-amber-100/30">
                Merchant's Price
              </p>

              <p className="mt-1 text-3xl font-bold text-amber-300">
                ${product.price.toFixed(2)}
              </p>
            </div>


            {/* Description */}
            <div className="mt-8">
              <h2 className="mb-3 font-serif text-lg font-semibold text-amber-200">
                The Merchant's Description
              </h2>

              <p className="leading-7 text-amber-100/60">
                {product.description}
              </p>
            </div>


            {/* Stock */}
            <div className="mt-6 flex items-center gap-3">

              <span
                className={`h-2.5 w-2.5 rounded-full ${
                  outOfStock
                    ? 'bg-red-400'
                    : 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]'
                }`}
              />

              <p
                className={`text-sm ${
                  outOfStock
                    ? 'text-red-300'
                    : 'text-emerald-300'
                }`}
              >
                {outOfStock
                  ? 'Currently unavailable'
                  : `${product.stock} in stock`}
              </p>

            </div>


            {/* Purchase Panel */}
            <div className="mt-8 rounded-xl border border-amber-900/30 bg-[#211a2c] p-6 shadow-lg shadow-black/10">

              <div className="mb-5 flex items-center gap-3">

                <span className="text-xl">
                  🪙
                </span>

                <div>
                  <p className="font-serif font-semibold text-amber-200">
                    Acquire this Treasure
                  </p>

                  <p className="text-xs text-amber-100/40">
                    Add this item to your adventurer's inventory.
                  </p>
                </div>

              </div>

              <AddToCartSection product={product} />

            </div>


            {/* Trust / Flavor */}
            <div className="mt-6 grid grid-cols-2 gap-3">

              <div className="rounded-lg border border-amber-900/20 bg-[#211a2c]/50 p-4 text-center">
                <div className="mb-1 text-lg">
                  ⚔️
                </div>

                <p className="text-xs text-amber-100/40">
                  Adventurer Approved
                </p>
              </div>

              <div className="rounded-lg border border-amber-900/20 bg-[#211a2c]/50 p-4 text-center">
                <div className="mb-1 text-lg">
                  ✨
                </div>

                <p className="text-xs text-amber-100/40">
                  Guild Certified
                </p>
              </div>

            </div>

          </div>
        </div>


        {/* Bottom Decorative Divider */}
        <div className="mt-16 flex items-center gap-4">
          <div className="h-px flex-1 bg-amber-900/20" />

          <span className="text-sm text-amber-400/40">
            ✦ ✦ ✦
          </span>

          <div className="h-px flex-1 bg-amber-900/20" />
        </div>

      </div>
    </main>
  );
}

