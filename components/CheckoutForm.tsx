"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  checkoutSchema,
  CheckoutFormData,
} from "@/lib/supabase/schema";
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
        headers: {
          "Content-Type": "application/json",
        },
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
        throw new Error(
          data.error ?? "Something went wrong"
        );
      }

      window.location.href = data.url;
    } catch (err) {
      setServerError(
        err instanceof Error
          ? err.message
          : "Checkout failed"
      );

      setSubmitting(false);
    }
  };

  const field = (
    name: keyof CheckoutFormData,
    label: string,
    type: string = "text"
  ) => (
    <div>
      <label
        htmlFor={name}
        className="
          mb-2
          block
          text-xs
          font-semibold
          uppercase
          tracking-wider
          text-amber-200/70
        "
      >
        {label}
      </label>

      <input
        id={name}
        type={type}
        {...register(name)}
        className="
          w-full
          rounded-lg
          border
          border-amber-900/40
          bg-[#17121f]
          px-4
          py-3
          text-sm
          text-amber-100
          placeholder:text-amber-100/20
          outline-none
          transition-all
          duration-200
          focus:border-amber-400/70
          focus:bg-[#1b1625]
          focus:ring-2
          focus:ring-amber-400/10
          focus:shadow-[0_0_15px_rgba(251,191,36,0.08)]
        "
      />

      {errors[name] && (
        <p className="mt-2 flex items-center gap-1.5 text-xs text-red-300">
          <span>⚠</span>
          <span>{errors[name]?.message}</span>
        </p>
      )}
    </div>
  );

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
    >

      {/* Personal Information */}
      <div>

        <div className="mb-5 flex items-center gap-3">

          <span className="text-xl text-amber-400">
            🧙
          </span>

          <div>
            <h3 className="font-serif text-lg font-semibold text-amber-200">
              Adventurer Information
            </h3>

            <p className="text-xs text-amber-100/35">
              Information required for your order.
            </p>
          </div>

        </div>

        <div className="space-y-5">
          {field("fullName", "Full name")}
          {field("email", "Email", "email")}
          {field("phone", "Phone", "tel")}
        </div>

      </div>


      {/* Shipping Information */}
      <div className="border-t border-amber-900/20 pt-6">

        <div className="mb-5 flex items-center gap-3">

          <span className="text-xl text-amber-400">
            📜
          </span>

          <div>
            <h3 className="font-serif text-lg font-semibold text-amber-200">
              Delivery Details
            </h3>

            <p className="text-xs text-amber-100/35">
              Where should the merchant send your treasures?
            </p>
          </div>

        </div>

        <div className="space-y-5">

          {field("address", "Address")}

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {field("city", "City")}
            {field("postalCode", "Postal code")}
          </div>

          {field("country", "Country")}

        </div>

      </div>


      {/* Server Error */}
      {serverError && (
        <div
          className="
            rounded-lg
            border
            border-red-900/40
            bg-red-950/30
            px-4
            py-3
            text-sm
            text-red-300
          "
        >
          <div className="flex items-start gap-3">

            <span className="text-base">
              ⚠️
            </span>

            <div>
              <p className="font-medium">
                The merchant could not process your request.
              </p>

              <p className="mt-1 text-red-300/70">
                {serverError}
              </p>
            </div>

          </div>
        </div>
      )}


      {/* Submit */}
      <div className="border-t border-amber-900/20 pt-6">

        <button
          type="submit"
          disabled={submitting || items.length === 0}
          className="
            group
            relative
            w-full
            overflow-hidden
            rounded-lg
            border
            border-amber-300/50
            bg-amber-300
            px-4
            py-3.5
            font-semibold
            text-[#1b1625]
            shadow-[0_0_15px_rgba(251,191,36,0.10)]
            transition-all
            duration-300
            hover:bg-amber-200
            hover:shadow-[0_0_30px_rgba(251,191,36,0.35)]
            disabled:cursor-not-allowed
            disabled:border-amber-900/30
            disabled:bg-amber-900/30
            disabled:text-amber-100/30
            disabled:shadow-none
          "
        >

          {/* Magical Shine */}
          <span
            className="
              pointer-events-none
              absolute
              inset-0
              -translate-x-full
              bg-linear-to-r
              from-transparent
              via-white/20
              to-transparent
              transition-transform
              duration-700
              group-hover:translate-x-full
            "
          />

          <span className="relative flex items-center justify-center gap-2">

            {submitting ? (
              <>
                <span className="animate-spin">
                  ✦
                </span>

                Preparing Your Transaction…
              </>
            ) : (
              <>
                <span>🔮</span>
                Continue to Payment
              </>
            )}

          </span>

        </button>

        <p className="mt-3 text-center text-[11px] text-amber-100/25">
          You will be redirected to our secure payment chamber.
        </p>

      </div>

    </form>
  );
}

