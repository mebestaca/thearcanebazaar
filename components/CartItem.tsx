'use client';

import Link from 'next/link';
import type { CartItem as CartItemType } from '@/types';

export default function CartItem({ item }: { item: CartItemType }) {


  return (
    <div className="flex items-center gap-4 py-4 border-b last:border-b-0">
      CartItem
    </div>
  );
}
