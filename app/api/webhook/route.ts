// src/app/api/webhook/route.ts
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { stripe } from '@/lib/stripe';
import { supabaseServer } from '@/lib/supabase/supabase-server';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const orderId = session.metadata?.order_id;

    if (orderId) {
      const { error: statusError } = await supabaseServer
        .from('orders')
        .update({ status: 'paid' })
        .eq('id', orderId);

      if (statusError) {
        console.error('Failed to mark order paid:', statusError.message);
      }

      const { data: orderItems, error: itemsFetchError } = await supabaseServer
        .from('order_items')
        .select('product_id, quantity')
        .eq('order_id', orderId);

      if (itemsFetchError) {
        console.error('Failed to fetch order items for stock update:', itemsFetchError.message);
      } else {
        for (const item of orderItems ?? []) {
          const { error: stockError } = await supabaseServer.rpc('decrement_stock', {
            p_product_id: item.product_id,
            p_quantity: item.quantity,
          });

          if (stockError) {
            console.error(
              `Failed to decrement stock for product ${item.product_id}:`,
              stockError.message
            );
          }
        }
      }
    }
  }

  if (event.type === 'checkout.session.expired') {
    const session = event.data.object as Stripe.Checkout.Session;
    const orderId = session.metadata?.order_id;

    if (orderId) {
      await supabaseServer.from('orders').update({ status: 'expired' }).eq('id', orderId);
    }
  }

  return NextResponse.json({ received: true });
}