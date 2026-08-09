'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/store/cart-store';
import { CheckoutFormData, checkoutSchema } from '@/lib/supabase/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

const inputClass =
  'w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/80';
const errorClass = 'text-xs text-red-600 mt-1';

export default function CheckoutForm() {
  const items = useCartStore((s) => s.items);
  const clearCart = useCartStore((s) => s.clearCart);
  const router = useRouter();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
  });

  const onSubmit = async (form: CheckoutFormData) => {
    setSubmitError(null);

    if (items.length === 0) {
      setSubmitError('Your cart is empty.');
      return;
    }

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          form,
          items: items.map((i) => ({
            productId: i.product.id,
            name: i.product.name,
            price: i.product.price,
            quantity: i.quantity,
          })),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setSubmitError(data.error ?? 'Something went wrong placing your order.');
        return;
      }

      clearCart();
      router.push(`/checkout/success?orderId=${data.orderId}`);
    } catch (err) {
      setSubmitError('Network error — please try again.' + err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="text-sm font-medium text-gray-700">Full name</label>
        <input {...register('fullName')} className={inputClass} placeholder="Jane Doe" />
        {errors.fullName && <p className={errorClass}>{errors.fullName.message}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-gray-700">Email</label>
          <input
            {...register('email')}
            type="email"
            className={inputClass}
            placeholder="jane@example.com"
          />
          {errors.email && <p className={errorClass}>{errors.email.message}</p>}
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700">Phone</label>
          <input {...register('phone')} className={inputClass} placeholder="+1 555 555 0100" />
          {errors.phone && <p className={errorClass}>{errors.phone.message}</p>}
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700">Address</label>
        <input {...register('address')} className={inputClass} placeholder="123 Main St" />
        {errors.address && <p className={errorClass}>{errors.address.message}</p>}
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="text-sm font-medium text-gray-700">City</label>
          <input {...register('city')} className={inputClass} />
          {errors.city && <p className={errorClass}>{errors.city.message}</p>}
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700">Postal code</label>
          <input {...register('postalCode')} className={inputClass} />
          {errors.postalCode && <p className={errorClass}>{errors.postalCode.message}</p>}
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700">Country</label>
          <input {...register('country')} className={inputClass} />
          {errors.country && <p className={errorClass}>{errors.country.message}</p>}
        </div>
      </div>

      {submitError && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2">
          {submitError}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 disabled:bg-gray-300 transition-colors"
      >
        {isSubmitting ? 'Placing order…' : 'Place order'}
      </button>
    </form>
  );
}
