import { checkoutRequestSchema } from '@/lib/supabase/schema';
import { supabaseServer } from '@/lib/supabase/supabase-server';
import { stripe } from '@/lib/stripe';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const parsed = checkoutRequestSchema.safeParse(body);
  if (!parsed.success) {

    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? 'Invalid checkout data' },
      { status: 400 }
    );
  }

  const { form, items, profileId  } = parsed.data;

  const diceRoll = Math.floor(Math.random() * 20) + 1;
  const discountPercent = diceRoll; // 1 roll = 1% off, 20 = 20% off

  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const total = Math.round(subtotal * (1 - discountPercent / 100) * 100) / 100;

  const { data: order, error: orderError } = await supabaseServer
    .from('orders')
    .insert({
      full_name: form.fullName,
      email: form.email,
      phone: form.phone,
      address: form.address,
      city: form.city,
      postal_code: form.postalCode,
      country: form.country,
      subtotal,
      total,
      dice_roll: diceRoll,
      status: 'pending',
      profile_id: profileId ?? null
    })
    .select('id')
    .single();

  if (orderError || !order) {
    console.error('Order insert failed:', orderError?.message);
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
  }

  const orderItems = items.map((i) => ({
    order_id: order.id,
    product_id: i.productId,
    product_name: i.name,
    quantity: i.quantity,
    price: i.price,
  }));

  const { error: itemsError } = await supabaseServer.from('order_items').insert(orderItems);

  if (itemsError) {
    console.error('Order items insert failed:', itemsError.message);
    return NextResponse.json({ error: 'Failed to save order items' }, { status: 500 });
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000/';

  try {

    const coupon = await stripe.coupons.create({
      percent_off: discountPercent,
      duration: 'once',
      name: `d20 Roll: ${diceRoll}`,
    });

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      customer_email: form.email,
      line_items: items.map((i) => ({
        price_data: {
          currency: 'usd',
          product_data: { name: i.name },
          unit_amount: Math.round(i.price * 100),
        },
        quantity: i.quantity,
      })),
      discounts: [{ coupon: coupon.id }],
      metadata: { order_id: order.id },
      success_url: `${siteUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/checkout/cancel`,
    });

    await supabaseServer
      .from('orders')
      .update({ stripe_session_id: session.id })
      .eq('id', order.id);

    return NextResponse.json({ url: session.url, orderId: order.id }, { status: 201 });
  } catch (stripeError) {
    console.error('Stripe session creation failed:', stripeError);
    return NextResponse.json({ error: 'Failed to start payment' }, { status: 500 });
  }
}