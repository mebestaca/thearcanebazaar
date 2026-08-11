'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCartStore } from '@/store/cart-store';
import { useHydrated } from '@/store/use-hydrated';

const NavBar = () => {
  const totalItems = useCartStore((s) => s.getTotalItems());
  const hydrated = useHydrated();
  const pathname = usePathname();

  const links = [
    { href: '/', label: 'Home' },
    { href: '/wares', label: 'Wares' },
    { href: '/relics', label: 'Relics' },
    { href: '/ledger', label: "Merchant's Ledger" },
    { href: '/adventurer', label: 'Adventurer' },
  ];

  return (
    <header
      className="
        sticky
        top-0
        z-50
        border-b
        border-amber-900/30
        bg-[#1b1625]/95
        px-6
        py-4
        text-amber-100
        shadow-[0_4px_20px_rgba(0,0,0,0.2)]
        backdrop-blur-md
      "
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-8">

        {/* =====================================================
            BRAND
            ===================================================== */}

        <Link
          href="/"
          className="
            group
            shrink-0
          "
        >
          <h1
            className="
              font-serif
              text-xl
              font-bold
              tracking-wide
              text-amber-300
              transition-all
              duration-300
              group-hover:text-amber-200
              group-hover:[text-shadow:0_0_15px_rgba(251,191,36,0.45)]
              sm:text-2xl
            "
          >
            The Arcane Bazaar
          </h1>

          <p
            className="
              hidden
              text-xs
              italic
              text-amber-100/40
              transition-colors
              group-hover:text-amber-100/60
              sm:block
            "
          >
            Curios, Relics, and Forgotten Magic
          </p>
        </Link>


        {/* =====================================================
            NAVIGATION
            ===================================================== */}

        <nav className="flex items-center gap-2 text-sm font-medium sm:gap-5">

          {links.map((link) => {
            const isActive =
              link.href === '/'
                ? pathname === '/'
                : pathname.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`
                  group
                  relative
                  hidden
                  px-2
                  py-2
                  transition-all
                  duration-300
                  sm:block
                  ${
                    isActive
                      ? 'text-amber-300'
                      : 'text-amber-100/60 hover:text-amber-200'
                  }
                `}
              >

                {link.label}

                {/* Underline */}
                <span
                  className={`
                    absolute
                    bottom-0
                    left-1/2
                    h-px
                    -translate-x-1/2
                    bg-amber-300
                    transition-all
                    duration-300
                    ${
                      isActive
                        ? 'w-full shadow-[0_0_8px_rgba(251,191,36,0.8)]'
                        : 'w-0 group-hover:w-full group-hover:shadow-[0_0_8px_rgba(251,191,36,0.6)]'
                    }
                  `}
                />

              </Link>
            );
          })}


          {/* =====================================================
              INVENTORY
              ===================================================== */}

          <Link
            href="/inventory"
            className={`
              group
              relative
              flex
              items-center
              gap-2
              px-2
              py-2
              transition-all
              duration-300
              ${
                pathname.startsWith('/inventory')
                  ? 'text-amber-300'
                  : 'text-amber-100/60 hover:text-amber-200'
              }
            `}
          >

            <span>
              Inventory
            </span>


            {/* Item Count */}
            {hydrated && totalItems > 0 && (
              <span
                className="
                  flex
                  min-h-5
                  min-w-5
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-amber-300/40
                  bg-amber-300
                  px-1
                  text-[10px]
                  font-bold
                  text-[#1b1625]
                  shadow-[0_0_10px_rgba(251,191,36,0.35)]
                  transition-all
                  duration-300
                  group-hover:shadow-[0_0_15px_rgba(251,191,36,0.65)]
                "
              >
                {totalItems}
              </span>
            )}


            {/* Underline */}
            <span
              className={`
                absolute
                bottom-0
                left-1/2
                h-px
                -translate-x-1/2
                bg-amber-300
                transition-all
                duration-300
                ${
                  pathname.startsWith('/inventory')
                    ? 'w-full shadow-[0_0_8px_rgba(251,191,36,0.8)]'
                    : 'w-0 group-hover:w-full group-hover:shadow-[0_0_8px_rgba(251,191,36,0.6)]'
                }
              `}
            />

          </Link>

        </nav>

      </div>


      {/* =====================================================
          MOBILE NAV
          ===================================================== */}

      <div className="mx-auto mt-3 flex max-w-6xl gap-2 overflow-x-auto sm:hidden">

        {links.map((link) => {
          const isActive =
            link.href === '/'
              ? pathname === '/'
              : pathname.startsWith(link.href);

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`
                shrink-0
                rounded-full
                border
                px-3
                py-1.5
                text-xs
                transition-all
                ${
                  isActive
                    ? 'border-amber-400/50 bg-amber-300/10 text-amber-300 shadow-[0_0_10px_rgba(251,191,36,0.1)]'
                    : 'border-amber-900/30 text-amber-100/50 hover:border-amber-400/30 hover:text-amber-200'
                }
              `}
            >
              {link.label}
            </Link>
          );
        })}

      </div>

    </header>
  );
};

export default NavBar;

