import Link from "next/link";
import { XCircle } from "lucide-react";

export default function CheckoutCancelPage() {
  return (
    <div className="mx-auto max-w-md py-16 text-center">
      <XCircle className="mx-auto h-14 w-14 text-red-400" />
      <h1 className="mt-4 text-2xl font-bold">Payment cancelled</h1>
      <p className="mt-2 text-gray-500">
        No charge was made. Your cart is still saved.
      </p>
      <Link
        href="/inventory"
        className="mt-6 inline-block rounded-md bg-brand-600 px-4 py-2 font-medium text-white hover:bg-brand-700"
      >
        Back to cart
      </Link>
    </div>
  );
}
