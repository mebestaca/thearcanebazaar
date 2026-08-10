import { z } from 'zod';

/* LOGIN SCHEMA */
export const loginSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export type LoginFormData = z.infer<typeof loginSchema>;


/* SIGN UP SCHEMA */
export const signupSchema = z.object({
  fullName: z.string().min(5, "Full name must be at least 5 characters"),

  username: z.string().min(3, "Username must be at least 3 characters")
  .regex(/^[a-zA-Z0-9_]+$/, "Username may only contain letters, numbers, and underscores"),

  email: z.string().email("Enter a valid email address"),

  password: z.string().min(8, "Password must be at least 8 characters"),

  confirmPassword: z.string(),
})
.refine((data) => data.password === data.confirmPassword, {
  path: ["confirmPassword"],
  message: "Passwords do not match",
});

export type SignupFormData = z.infer<typeof signupSchema>;


/* CHECKOUT SCHEMA */
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

