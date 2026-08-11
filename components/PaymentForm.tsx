'use client';

import { useEffect, useState } from 'react';
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

function CheckoutInner() {
  const stripe = useStripe();
  const elements = useElements();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setIsSubmitting(true);
    setError(null);

    const { error: stripeError } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/checkout/success`,
      },
    });

    if (stripeError) {
      setError(stripeError.message ?? 'Payment failed.');
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">

      {/* Payment Details */}
      <div>

        <div className="mb-4 flex items-center gap-3">
          <span className="text-xl text-amber-400">
            💳
          </span>

          <div>
            <h3 className="font-serif text-lg font-semibold text-amber-200">
              Payment Details
            </h3>

            <p className="text-xs text-amber-100/35">
              Complete your transaction with the merchant guild.
            </p>
          </div>
        </div>

        {/* Stripe Payment Element */}
        <div
          className="
            rounded-xl
            border
            border-amber-900/30
            bg-[#1b1625]
            p-4
            shadow-inner
            shadow-black/20
          "
        >
          <PaymentElement
            options={{
              layout: 'tabs',
            }}
          />
        </div>

      </div>


      {/* Error */}
      {error && (
        <div
          className="
            rounded-lg
            border
            border-red-900/40
            bg-red-950/30
            px-4
            py-3
            text-sm
            text-red-300
          "
        >
          <div className="flex items-start gap-3">
            <span>⚠️</span>

            <div>
              <p className="font-medium">
                The transaction could not be completed.
              </p>

              <p className="mt-1 text-red-300/70">
                {error}
              </p>
            </div>
          </div>
        </div>
      )}


      {/* Payment Button */}
      <button
        type="submit"
        disabled={!stripe || isSubmitting}
        className="
          group
          relative
          w-full
          overflow-hidden
          rounded-lg
          border
          border-amber-300/50
          bg-amber-300
          px-4
          py-3.5
          font-semibold
          text-[#1b1625]
          shadow-[0_0_15px_rgba(251,191,36,0.10)]
          transition-all
          duration-300
          hover:bg-amber-200
          hover:shadow-[0_0_30px_rgba(251,191,36,0.35)]
          disabled:cursor-not-allowed
          disabled:border-amber-900/30
          disabled:bg-amber-900/30
          disabled:text-amber-100/30
          disabled:shadow-none
        "
      >
        {/* Button Glow */}
        <span
          className="
            pointer-events-none
            absolute
            inset-0
            -translate-x-full
            bg-linear-to-r
            from-transparent
            via-white/20
            to-transparent
            transition-transform
            duration-700
            group-hover:translate-x-full
          "
        />

        <span className="relative flex items-center justify-center gap-2">
          {isSubmitting ? (
            <>
              <span className="animate-spin">
                ✦
              </span>

              Processing Transaction…
            </>
          ) : (
            <>
              <span>🪙</span>
              Complete Purchase
            </>
          )}
        </span>
      </button>


      {/* Security Notice */}
      <div className="flex items-center justify-center gap-2 text-center text-[11px] text-amber-100/25">
        <span>🔮</span>

        <span>
          Payments securely processed by the merchant guild.
        </span>
      </div>

    </form>
  );
}


export default function PaymentForm({
  amount,
}: {
  amount: number;
}) {
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function createPaymentIntent() {
      try {
        const response = await fetch(
          '/api/create-payment-intent',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ amount }),
          }
        );

        const data = await response.json();

        if (!cancelled) {
          setClientSecret(data.clientSecret);
        }
      } catch (error) {
        console.error(
          'Failed to create payment intent:',
          error
        );
      }
    }

    createPaymentIntent();

    return () => {
      cancelled = true;
    };
  }, [amount]);


  {/* Loading */}
  if (!clientSecret) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-center">

        <div className="mb-4 animate-pulse text-3xl text-amber-400">
          ✦
        </div>

        <p className="text-sm text-amber-100/50">
          Preparing the merchant's payment ledger…
        </p>

      </div>
    );
  }


  return (
    <Elements
      stripe={stripePromise}
      options={{
        clientSecret,
        appearance: {
          theme: 'night',

          variables: {
            colorPrimary: '#fbbf24',
            colorBackground: '#1b1625',
            colorText: '#fef3c7',
            colorTextSecondary: '#a8a29e',
            colorTextPlaceholder: '#78716c',
            colorDanger: '#f87171',
            fontFamily: 'system-ui, sans-serif',
            borderRadius: '8px',
          },

          rules: {
            '.Input': {
              border: '1px solid rgba(146, 64, 14, 0.35)',
              backgroundColor: '#17121f',
              boxShadow: 'none',
            },

            '.Input:focus': {
              border: '1px solid rgba(251, 191, 36, 0.7)',
              boxShadow:
                '0 0 12px rgba(251, 191, 36, 0.15)',
            },

            '.Label': {
              color: '#fde68a',
            },

            '.Tab': {
              backgroundColor: '#211a2c',
              border: '1px solid rgba(146, 64, 14, 0.25)',
            },

            '.Tab:hover': {
              backgroundColor: '#2a2138',
            },

            '.Tab--selected': {
              backgroundColor: '#2a2138',
              borderColor: 'rgba(251, 191, 36, 0.55)',
              boxShadow:
                '0 0 12px rgba(251, 191, 36, 0.12)',
            },
          },
        },
      }}
    >
      <CheckoutInner />
    </Elements>
  );
}

