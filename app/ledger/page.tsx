"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/supabase";
import { useAuthStore } from "@/store/auth-store";
import { Order } from "@/types";
import Image from "next/image";

export default function LedgerPage() {
  const router = useRouter();
  const { userId, profile, loading: authLoading } = useAuthStore();
  const [ orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading) return;

    if (!userId) {
      router.replace("/adventurer");
      return;
    }

    async function fetchOrders() {
      setLoading(true);

      const { data, error } = await supabase
        .from("orders")
        .select(
          `
          *,
          order_items (
            id,
            product_id,
            product_name,
            quantity,
            price,
            products ( image_url )
          )
        `
        )
        .eq("profile_id", profile?.id)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Failed to fetch orders:", error.message);
      } else {
        setOrders((data ?? []) as Order[]);
      }

      setLoading(false);
    }

    fetchOrders();
  }, [authLoading, userId, profile?.id, router]);

  if (authLoading || loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#1b1625] text-amber-100/50">
        Loading your orders…
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#1b1625] px-6 py-16 text-amber-100">
      <div className="mx-auto max-w-3xl">
        <h1 className="font-serif text-3xl font-bold text-amber-300">
          Your Orders
        </h1>

        {orders.length === 0 ? (
          <p className="mt-6 text-amber-100/50">
            No orders yet — your quest log is empty.
          </p>
        ) : (
          <div className="mt-8 space-y-6">
            {orders.map((order) => (
              <article
                key={order.id}
                className="
                  group
                  overflow-hidden
                  rounded-2xl
                  border border-amber-900/30
                  bg-[#211a2c]
                  shadow-[0_8px_30px_rgba(0,0,0,0.15)]
                  transition-all duration-300
                  hover:-translate-y-1
                  hover:border-amber-500/40
                  hover:shadow-[0_12px_40px_rgba(251,191,36,0.10)]
                "
              >
                {/* Order Header */}
                <div
                  className="
                    flex
                    flex-col
                    gap-4
                    border-b border-amber-900/20
                    px-6 py-5
                    sm:flex-row
                    sm:items-center
                    sm:justify-between
                  "
                >
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs uppercase tracking-[0.18em] text-amber-100/35">
                        Order
                      </span>

                      <span className="h-px w-6 bg-amber-900/40" />

                      <span className="font-mono text-sm text-amber-300">
                        {order.id}
                      </span>
                    </div>

                    <p className="mt-2 text-xs text-amber-100/35">
                      {new Date(order.created_at).toLocaleString()}
                    </p>
                  </div>

                  <span
                    className="
                      w-fit
                      rounded-full
                      border border-amber-400/20
                      bg-amber-300/5
                      px-3 py-1
                      text-[10px]
                      font-medium
                      uppercase
                      tracking-[0.16em]
                      text-amber-300/70
                    "
                  >
                    {order.status}
                  </span>
                </div>

                {/* Items */}
                <div className="px-6 py-5">
                  <div className="mb-4 flex items-center gap-3">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-amber-100/30">
                      Acquired Wares
                    </span>

                    <div className="h-px flex-1 bg-amber-900/20" />
                  </div>

                  <div className="space-y-1">
                    {order.order_items.map((item) => (
                      <div
                        key={item.id}
                        className="
                          flex
                          items-center
                          gap-4
                          rounded-lg
                          px-2 py-3
                          transition-colors duration-200
                          hover:bg-[#17121f]/50
                        "
                      >
                        {item.products?.image_url ? (
                          <Image
                            width={64}
                            height={64}
                            src={item.products.image_url}
                            alt={item.product_name}
                            className="
                              h-14
                              w-14
                              shrink-0
                              rounded-lg
                              border border-amber-900/30
                              object-cover
                              transition-all duration-300
                              group-hover:border-amber-800/40
                            "
                          />
                        ) : (
                          <div
                            className="
                              flex
                              h-14
                              w-14
                              shrink-0
                              items-center
                              justify-center
                              rounded-lg
                              border border-amber-900/20
                              bg-[#17121f]
                              text-amber-100/20
                            "
                          >
                            ✦
                          </div>
                        )}

                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium text-amber-100/90">
                            {item.product_name}
                          </p>

                          <p className="mt-1 text-xs text-amber-100/35">
                            Quantity {item.quantity}
                          </p>
                        </div>

                        <div className="shrink-0 text-right">
                          <p className="text-sm font-medium text-amber-100/80">
                            ${(Number(item.price) * item.quantity).toFixed(2)}
                          </p>

                          <p className="mt-1 text-xs text-amber-100/30">
                            ${Number(item.price).toFixed(2)} each
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Summary */}
                <div className="border-t border-amber-900/20 bg-[#17121f]/35 px-6 py-5">
                  <div className="ml-auto max-w-sm space-y-3">

                    <div className="flex justify-between text-sm">
                      <span className="text-amber-100/40">
                        Subtotal
                      </span>

                      <span className="text-amber-100/70">
                        ${Number(order.subtotal).toFixed(2)}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-2 text-amber-100/40">
                        <span>Fortune's Favor</span>

                        <span className="text-sm">
                          🎲
                        </span>
                      </span>

                      <span className="font-medium text-emerald-400">
                        −{order.dice_roll}%
                      </span>
                    </div>

                    <div className="my-3 border-t border-amber-900/20" />

                    <div className="flex items-end justify-between">
                      <span className="font-serif text-sm text-amber-200">
                        Price Paid
                      </span>

                      <span className="font-serif text-2xl font-bold text-amber-300">
                        ${Number(order.total).toFixed(2)}
                      </span>
                    </div>

                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}