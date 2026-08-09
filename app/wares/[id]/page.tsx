import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Product } from '@/types';
import { supabase } from '@/lib/supabase/supabase';

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

  return (
    <main className="max-w-5xl mx-auto px-4 py-8">
      <Link href="/" className="text-sm text-gray-500 hover:text-black">
        ← Back to shop
      </Link>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="w-full aspect-square bg-gray-100 rounded-lg overflow-hidden">
          {product.image_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              No image
            </div>
          )}
        </div>

        <div>
          <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>
          <p className="text-xl font-semibold text-gray-900 mt-2">
            ${product.price.toFixed(2)}
          </p>
          <p className="text-gray-600 mt-4 leading-relaxed">{product.description}</p>
          <p className="text-sm text-gray-400 mt-4">
            {product.stock > 0 ? `${product.stock} in stock` : 'Currently unavailable'}
          </p>

          {/* <AddToCartSection product={product} /> */}
        </div>
      </div>
    </main>
  );
}



