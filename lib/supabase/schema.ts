import { z } from 'zod';

export const checkoutSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Enter a valid email address'),
  phone: z.string().min(7, 'Enter a valid phone number'),
  address: z.string().min(5, 'Address must be at least 5 characters'),
  city: z.string().min(2, 'City is required'),
  postalCode: z.string().min(3, 'Postal code is required'),
  country: z.string().min(2, 'Country is required'),
});

export type CheckoutFormData = z.infer<typeof checkoutSchema>;

// Validated on the server inside /api/checkout as well — never trust the client.
export const checkoutRequestSchema = z.object({
  form: checkoutSchema,
  items: z
    .array(
      z.object({
        productId: z.string().uuid(),
        name: z.string(),
        price: z.number().nonnegative(),
        quantity: z.number().int().positive(),
      })
    )
    .min(1, 'Cart is empty'),
});

export type CheckoutRequest = z.infer<typeof checkoutRequestSchema>;
