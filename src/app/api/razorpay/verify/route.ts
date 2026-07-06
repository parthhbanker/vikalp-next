import { NextRequest, NextResponse } from 'next/server';
import { createHmac, timingSafeEqual } from 'crypto';
import { appendSheetRow } from '@/lib/google/sheets';

export async function POST(request: NextRequest) {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret) {
    return NextResponse.json(
      { error: 'Razorpay is not configured on this server.' },
      { status: 500 }
    );
  }

  const body = await request.json().catch(() => null);
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body ?? {};

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return NextResponse.json({ error: 'Missing payment details.' }, { status: 400 });
  }

  const expectedSignature = createHmac('sha256', keySecret)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest('hex');

  const expected = Buffer.from(expectedSignature);
  const actual = Buffer.from(String(razorpay_signature));

  const isValid =
    expected.length === actual.length && timingSafeEqual(expected, actual);

  if (!isValid) {
    return NextResponse.json({ error: 'Signature verification failed.' }, { status: 400 });
  }

  // Only now that the payment is verified do we log the donation anywhere of our own.
  // Donor details are pulled back from the order itself (set server-side at creation
  // time), not re-trusted from the client on this call.
  try {
    const orderResponse = await fetch(`https://api.razorpay.com/v1/orders/${razorpay_order_id}`, {
      headers: {
        Authorization: `Basic ${Buffer.from(`${keyId}:${keySecret}`).toString('base64')}`,
      },
    });
    const order = await orderResponse.json();
    const notes = order.notes || {};

    await appendSheetRow([
      new Date().toISOString(),
      notes.donor_name || '',
      notes.donor_email || '',
      notes.donor_phone || '',
      notes.donor_address || '',
      notes.donor_pan || '',
      notes.trees || '',
      order.amount ? (order.amount / 100).toFixed(2) : '',
      razorpay_payment_id,
      razorpay_order_id,
      notes.campaign || '',
    ]);
  } catch (err) {
    // A logging failure must never block a donor's successful payment confirmation —
    // just surface it in server logs so it can be backfilled manually.
    console.error('Failed to log donation to Google Sheet:', err);
  }

  return NextResponse.json({ verified: true });
}
