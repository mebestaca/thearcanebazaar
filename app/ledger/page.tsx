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
              <div
                key={order.id}
                className="
                    group
                    rounded-xl
                    border border-amber-900/30
                    bg-[#211a2c]
                    px-6 py-5
                    transition-all duration-300 ease-out
                    hover:border-amber-400/50
                    hover:bg-[#271f34]
                    hover:shadow-[0_0_20px_rgba(251,191,36,0.15)]
                "
              >
                <div className="flex items-center justify-between border-b border-amber-900/20 pb-4">
                  <div>
                    <p className="font-mono text-sm text-amber-300">
                      {order.id}
                    </p>
                    <p className="mt-1 text-xs text-amber-100/40">
                      {new Date(order.created_at).toLocaleString()}
                    </p>
                  </div>

                  <div
                    className="
                      min-w-47.5
                      rounded-lg
                      border border-amber-900/30
                      bg-[#17121f]/70
                      px-4 py-3
                      text-right
                      transition-all duration-300
                      group-hover:border-amber-400/30
                      group-hover:shadow-[0_0_15px_rgba(251,191,36,0.08)]
                    "
                  >
                    <p className="text-[10px] uppercase tracking-[0.2em] text-amber-100/30">
                      Order Value
                    </p>

                    <p className="mt-1 text-sm text-amber-100/60">
                      ${Number(order.subtotal).toFixed(2)}
                    </p>

                    <div className="my-2 border-t border-amber-900/20" />

                    <div className="flex items-center justify-between gap-4">
                      <span className="text-xs text-amber-100/40">
                        Fortune's Favor
                      </span>

                      <span className="font-semibold text-emerald-300">
                        🎲 −{order.dice_roll}%
                      </span>
                    </div>

                    <div className="mt-2 flex items-center justify-between gap-4">
                      <span className="font-serif text-sm text-amber-200">
                        Price Paid
                      </span>

                      <span className="font-serif text-lg font-bold text-amber-300">
                        ${Number(order.total).toFixed(2)}
                      </span>
                    </div>

                    <p className="mt-2 text-[10px] uppercase tracking-wider text-amber-100/30">
                      {order.status}
                    </p>
                  </div>
                </div>

                <div className="mt-4 space-y-3">
                  {order.order_items.map((item) => (
                    <div key={item.id} className="flex items-center gap-3">
                      {item.products?.image_url ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <Image
                          width={78}   
                          height={78}
                          src={item.products.image_url}
                          alt={item.product_name}
                          className="h-12 w-12 rounded-md object-cover"
                        />
                      ) : (
                        <div className="flex h-12 w-12 items-center justify-center rounded-md bg-[#17121f] text-amber-100/20">
                          ✦
                        </div>
                      )}

                      <div className="flex-1">
                        <p className="text-sm text-amber-100">
                          {item.product_name}
                        </p>
                        <p className="text-xs text-amber-100/40">
                          Qty {item.quantity} × ${item.price.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}