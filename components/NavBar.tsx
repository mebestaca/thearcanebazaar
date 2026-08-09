'use client'

import Link from "next/link";
import { useCartStore } from '@/store/cart-store';

const NavBar = () => {

  const totalItems = useCartStore((s) => s.getTotalItems());

  return (
 <header className="border-b border-amber-900/20 bg-[#1b1625] px-6 py-5 text-amber-100">
  <div className="mx-auto flex max-w-6xl items-center justify-between">

    <div>
      <h1 className="text-2xl font-bold tracking-wide text-amber-300">
        The Arcane Bazaar
      </h1>

      <p className="text-xs italic text-amber-100/60">
        Curios, Relics, and Forgotten Magic
      </p>
    </div>


    <nav className="flex items-center gap-6 text-sm font-medium">
      <Link href="/" className="transition hover:text-amber-300">
        Home
      </Link>

      <Link href="/wares" className="transition hover:text-amber-300">
        Wares
      </Link>

      <Link href="/relics" className="transition hover:text-amber-300">
        Relics
      </Link>

      <Link href="/ledger" className="transition hover:text-amber-300">
        Merchant's Ledger
      </Link>

      <Link href="/adventurer" className="transition hover:text-amber-300">
        Adventurer
      </Link>

      <Link href="/inventory" className="transition hover:text-amber-300">
        <span>Inventory</span>
              <span className="inline-flex items-center justify-center min-w-5 h-5 px-1 rounded-full bg-black text-white text-xs">
                 {totalItems > 0 && (
                    <span className="inline-flex items-center justify-center min-w-5 h-5 px-1 rounded-full bg-black text-white text-xs">
                      {totalItems}
                    </span>
                  )}
              </span>
      </Link>
    </nav>

  </div>
</header>
  );
}

export default NavBar
