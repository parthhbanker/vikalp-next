import { NextRequest, NextResponse } from 'next/server';
import { createHmac, timingSafeEqual } from 'crypto';

export async function POST(request: NextRequest) {
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keySecret) {
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

  return NextResponse.json({ verified: true });
}
