import React from 'react';
import Link from "next/link";

const NavBar = () => {
  return (
    <header className="border-b border-gray-200 bg-white px-6 py-4">
      <div className="mx-auto flex max-w-2xl items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-gray-900">The Arcane Bazaar</h1>
          <p className="text-xs text-gray-400">
            Curios, Relics, and Forgotten Magic
          </p>
        </div>

        <nav className="flex items-center font-medium text-gray-900">
          <Link href="/" className="hover:text-blue-600 mr-4">
            Home
          </Link>
          <Link href="/courses" className="hover:text-blue-600">
            Courses
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default NavBar
