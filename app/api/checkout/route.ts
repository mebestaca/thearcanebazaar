import { checkoutRequestSchema } from '@/lib/supabase/schema';
import { supabaseServer } from '@/lib/supabase/supabase-server';
import { NextRequest, NextResponse } from 'next/server';


export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  // Never trust client-side validation alone — re-validate with the same
  // zod schema on the server.
  const parsed = checkoutRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? 'Invalid checkout data' },
      { status: 400 }
    );
  }

  const { form, items } = parsed.data;
  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

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
      total,
      status: 'pending',
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

  return NextResponse.json({ orderId: order.id }, { status: 201 });
}
