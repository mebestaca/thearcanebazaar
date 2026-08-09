import Link from 'next/link';

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ orderId?: string }>;
}) {
  const {orderId} = await searchParams;
  return (
    <main className="max-w-lg mx-auto px-4 py-16 text-center">
      <div className="bg-white border rounded-lg p-10">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Order placed! 🎉</h1>
        <p className="text-gray-500 mb-6">
          Thanks for your order. We&apos;ve saved it to our system and will get it moving soon.
        </p>
        {orderId && (
          <p className="text-sm text-gray-400 mb-6">
            Order reference:{' '}
            <span className="font-mono text-gray-700">{orderId}</span>
          </p>
        )}
        <Link
          href="/"
          className="inline-block bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800"
        >
          Continue shopping
        </Link>
      </div>
    </main>
  );
}
