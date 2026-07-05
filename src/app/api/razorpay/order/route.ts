import { NextRequest, NextResponse } from 'next/server';

const PRICE_PER_TREE_PAISE = 30000; // ₹300 per tree, in paise — kept server-side so the amount can't be tampered with client-side
const MIN_TREES = 1;
const MAX_TREES = 100000;

export async function POST(request: NextRequest) {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret) {
    return NextResponse.json(
      { error: 'Razorpay is not configured on this server.' },
      { status: 500 }
    );
  }

  let trees: unknown;
  try {
    const body = await request.json();
    trees = body?.trees;
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  if (typeof trees !== 'number' || !Number.isInteger(trees) || trees < MIN_TREES || trees > MAX_TREES) {
    return NextResponse.json({ error: 'Invalid tree count.' }, { status: 400 });
  }

  const amount = trees * PRICE_PER_TREE_PAISE;

  const response = await fetch('https://api.razorpay.com/v1/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${Buffer.from(`${keyId}:${keySecret}`).toString('base64')}`,
    },
    body: JSON.stringify({
      amount,
      currency: 'INR',
      receipt: `afforestation_${Date.now()}`,
      notes: {
        campaign: 'afforestation_drive_2026',
        trees: String(trees),
      },
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    console.error('Razorpay order creation failed:', errorBody);
    return NextResponse.json({ error: 'Could not create payment order.' }, { status: 502 });
  }

  const order = await response.json();

  return NextResponse.json({
    keyId,
    orderId: order.id,
    amount: order.amount,
    currency: order.currency,
    trees,
  });
}
