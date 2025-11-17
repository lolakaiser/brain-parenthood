import { NextRequest, NextResponse } from 'next/server';
import { Client, Environment } from 'square';
import { randomUUID } from 'crypto';

// Initialize Square client
const client = new Client({
  accessToken: process.env.SQUARE_ACCESS_TOKEN!,
  environment: process.env.SQUARE_ENVIRONMENT === 'production'
    ? Environment.Production
    : Environment.Sandbox,
});

export async function POST(request: NextRequest) {
  try {
    const { sourceId, amount } = await request.json();

    // Validate input
    if (!sourceId || !amount) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: sourceId and amount' },
        { status: 400 }
      );
    }

    if (amount <= 0) {
      return NextResponse.json(
        { success: false, error: 'Amount must be greater than 0' },
        { status: 400 }
      );
    }

    // Check if required environment variables are set
    if (!process.env.SQUARE_ACCESS_TOKEN || !process.env.SQUARE_LOCATION_ID) {
      console.error('Missing Square credentials in environment variables');
      return NextResponse.json(
        { success: false, error: 'Payment system is not configured. Please contact support.' },
        { status: 500 }
      );
    }

    // Convert amount to cents (Square requires amount in smallest currency unit)
    const amountInCents = Math.round(amount * 100);

    // Create payment
    const response = await client.paymentsApi.createPayment({
      sourceId,
      amountMoney: {
        amount: BigInt(amountInCents),
        currency: 'USD',
      },
      locationId: process.env.SQUARE_LOCATION_ID!,
      idempotencyKey: randomUUID(), // Unique key to prevent duplicate payments
    });

    return NextResponse.json({
      success: true,
      payment: {
        id: response.result.payment?.id,
        status: response.result.payment?.status,
        amount: amount,
        createdAt: response.result.payment?.createdAt,
      },
    });
  } catch (error: any) {
    console.error('Payment processing error:', error);

    // Handle Square API errors
    if (error.errors && Array.isArray(error.errors)) {
      const errorMessage = error.errors
        .map((err: any) => err.detail || err.message)
        .join(', ');

      return NextResponse.json(
        { success: false, error: errorMessage },
        { status: 400 }
      );
    }

    // Handle other errors
    return NextResponse.json(
      {
        success: false,
        error: 'An unexpected error occurred while processing your payment. Please try again.'
      },
      { status: 500 }
    );
  }
}
