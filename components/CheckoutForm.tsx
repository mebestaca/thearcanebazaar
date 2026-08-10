"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { checkoutSchema, CheckoutFormData } from "@/lib/supabase/schema";
import { useCartStore } from "@/store/cart-store";

export default function CheckoutForm() {
  const items = useCartStore((state) => state.items);
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
  });

  const onSubmit = async (values: CheckoutFormData) => {
    setSubmitting(true);
    setServerError(null);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((item) => ({
            productId: item.product.id,
            name: item.product.name,
            price: item.product.price,
            quantity: item.quantity,
          })),
          form: values,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error ?? "Something went wrong");
      }

      window.location.href = data.url;
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Checkout failed");
      setSubmitting(false);
    }
  };

  const field = (
    name: keyof CheckoutFormData,
    label: string,
    type: string = "text"
  ) => (
    <div>
      <label className="mb-1 block text-sm font-medium">{label}</label>
      <input
        type={type}
        {...register(name)}
        className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
      />
      {errors[name] && (
        <p className="mt-1 text-sm text-red-600">{errors[name]?.message}</p>
      )}
    </div>
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {field("fullName", "Full name")}
      {field("email", "Email", "email")}
      {field("phone", "Phone", "tel")}
      {field("address", "Address")}
      <div className="grid grid-cols-2 gap-4">
        {field("city", "City")}
        {field("postalCode", "Postal code")}
      </div>
      {field("country", "Country")}

      {serverError && (
        <p className="rounded-md bg-red-50 p-3 text-sm text-red-700">
          {serverError}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting || items.length === 0}
        className="w-full rounded-md bg-blue-600 px-4 py-3 font-medium text-white hover:bg-brand-700 disabled:cursor-not-allowed disabled:bg-gray-300"
      >
        {submitting ? "Redirecting to payment…" : "Pay with Stripe"}
      </button>
    </form>
  );
}
