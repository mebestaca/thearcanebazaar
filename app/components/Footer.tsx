import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="border-t border-amber-900/30 bg-[#1b1625] px-6 py-12 text-amber-100">

      <div className="mx-auto max-w-6xl">

        {/* Brand */}
        <div className="mb-10 text-center">
          <h2 className="font-serif text-3xl font-bold text-amber-300">
            The Arcane Bazaar
          </h2>

          <p className="mt-2 italic text-amber-100/60">
            Ancient treasures. Forgotten relics.
            <br />
            New adventures waiting to be discovered.
          </p>
        </div>


        {/* Footer Links */}
        <div className="grid gap-8 border-t border-amber-900/30 pt-8 sm:grid-cols-3">

          {/* Bazaar */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-amber-300">
              🏰 The Bazaar
            </h3>

            <ul className="space-y-2 text-sm text-amber-100/70">
              <li>
                <Link 
                  href="/about"
                  className="transition hover:text-amber-300"
                >
                  About Us
                </Link>
              </li>

              <li>
                <Link 
                  href="/archives"
                  className="transition hover:text-amber-300"
                >
                  Our Story
                </Link>
              </li>

              <li>
                <Link 
                  href="/merchants"
                  className="transition hover:text-amber-300"
                >
                  Our Merchants
                </Link>
              </li>
            </ul>
          </div>


          {/* Customer Services */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-amber-300">
              🪄 Customer Services
            </h3>

            <ul className="space-y-2 text-sm text-amber-100/70">
              <li>
                <Link
                  href="/ledger"
                  className="transition hover:text-amber-300"
                >
                  Merchant's Ledger
                </Link>
              </li>

              <li>
                <Link
                  href="/shipping"
                  className="transition hover:text-amber-300"
                >
                  Shipping Charms
                </Link>
              </li>

              <li>
                <Link
                  href="/returns"
                  className="transition hover:text-amber-300"
                >
                  Return Policy
                </Link>
              </li>

              <li>
                <Link
                  href="/contact"
                  className="transition hover:text-amber-300"
                >
                  Contact the Guild
                </Link>
              </li>
            </ul>
          </div>


          {/* Adventurer */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-amber-300">
              ⚔️ Adventurer Resources
            </h3>

            <ul className="space-y-2 text-sm text-amber-100/70">
              <li>
                <Link
                  href="/guides"
                  className="transition hover:text-amber-300"
                >
                  Beginner's Guide
                </Link>
              </li>

              <li>
                <Link
                  href="/resources"
                  className="transition hover:text-amber-300"
                >
                  Tabletop Resources
                </Link>
              </li>

              <li>
                <Link
                  href="/community"
                  className="transition hover:text-amber-300"
                >
                  Community
                </Link>
              </li>
            </ul>
          </div>

        </div>


        {/* Bottom */}
        <div className="mt-10 border-t border-amber-900/30 pt-6 text-center text-sm text-amber-100/50">

          <p>
            © 2026 The Arcane Bazaar
          </p>

          <p className="mt-2 italic text-amber-100/50">
            Side effects may include: uncontrollable curiosity,
            excessive dice collection, and summoning creatures you cannot dismiss.
            Magic is not for everyone.
          </p>

        </div>

      </div>

    </footer>
  );
};

export default Footer;