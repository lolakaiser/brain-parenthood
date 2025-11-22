# Next.js Payment Form Component

A reusable Next.js TypeScript component for processing payments with Square.

## Features

- **Two modes**: Button mode (fixed amount) or Input mode (user enters amount)
- **TypeScript**: Full type safety
- **Client Component**: Uses 'use client' directive for Next.js 13+ App Router
- **Card validation**: Real-time validation via Square SDK
- **Confirmation modal**: Shows amount and card details before processing
- **Success/Error handling**: Built-in UI for payment results
- **Customizable**: Easy to style and modify
- **Secure**: Card data is tokenized by Square, never sent to your server

## Installation

### 1. Copy Files to Your Project

Copy these files to your Next.js project:
```
PaymentForm.tsx
PaymentForm.css
```

Recommended location: `app/components/` or `components/`

### 2. Add Square SDK to Your Layout

Add the Square SDK script to your root layout file (`app/layout.tsx`):

```tsx
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Your App',
  description: 'Your description',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script src="https://web.squarecdn.com/v1/square.js"></script>
      </head>
      <body>{children}</body>
    </html>
  );
}
```

### 3. Set Up Environment Variables

Create or update your `.env.local` file in your Next.js project root:

```bash
NEXT_PUBLIC_SQUARE_APPLICATION_ID=sq0idp-your_app_id_here
NEXT_PUBLIC_SQUARE_LOCATION_ID=your_location_id_here
NEXT_PUBLIC_API_URL=https://your-backend-url.vercel.app
```

**Important**: In Next.js, environment variables must be prefixed with `NEXT_PUBLIC_` to be accessible in client components.

## Usage

### Button Mode (Fixed Amount)

```tsx
'use client';

import PaymentForm from '@/components/PaymentForm';

export default function CheckoutPage() {
  const handleSuccess = (payment: any) => {
    console.log('Payment successful:', payment);
    // Redirect, show confirmation, etc.
  };

  const handleError = (error: Error) => {
    console.error('Payment failed:', error);
  };

  return (
    <div>
      <h1>Checkout</h1>
      <PaymentForm
        amount={99.99}
        mode="button"
        onSuccess={handleSuccess}
        onError={handleError}
      />
    </div>
  );
}
```

### Input Mode (User Enters Amount)

```tsx
'use client';

import PaymentForm from '@/components/PaymentForm';

export default function DonatePage() {
  return (
    <div>
      <h1>Make a Donation</h1>
      <PaymentForm
        mode="input"
        onSuccess={(payment) => console.log('Success:', payment)}
        onError={(error) => console.error('Error:', error)}
      />
    </div>
  );
}
```

### Using in Server Components

If you want to use the payment form in a Server Component page, you need to wrap it:

```tsx
// app/payment/page.tsx (Server Component)
import PaymentWrapper from '@/components/PaymentWrapper';

export default function PaymentPage() {
  return (
    <div>
      <h1>Payment</h1>
      <PaymentWrapper amount={50.00} />
    </div>
  );
}

// components/PaymentWrapper.tsx (Client Component)
'use client';

import PaymentForm from './PaymentForm';

export default function PaymentWrapper({ amount }: { amount: number }) {
  return (
    <PaymentForm
      amount={amount}
      mode="button"
      onSuccess={(payment) => console.log(payment)}
      onError={(error) => console.error(error)}
    />
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `amount` | number | - | Payment amount (required in button mode) |
| `mode` | `'button'` \| `'input'` | `'button'` | Display mode |
| `onSuccess` | `(payment: any) => void` | - | Callback when payment succeeds |
| `onError` | `(error: Error) => void` | - | Callback when payment fails |
| `apiUrl` | string | `process.env.NEXT_PUBLIC_API_URL` | Backend API URL |
| `squareAppId` | string | `process.env.NEXT_PUBLIC_SQUARE_APPLICATION_ID` | Square Application ID |
| `squareLocationId` | string | `process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID` | Square Location ID |

## What You Need from Square

1. Go to **Square Developer Portal**: https://developer.squareup.com/apps
2. Create or select your application
3. Get these credentials:
   - **Application ID** → Use in `NEXT_PUBLIC_SQUARE_APPLICATION_ID`
   - **Location ID** → Use in `NEXT_PUBLIC_SQUARE_LOCATION_ID`

**Note**: You'll also need the Access Token for your backend (not used in frontend).

## Customizing Styles

The component uses `PaymentForm.css` for styling. You can:

1. **Modify the CSS file directly** for global changes
2. **Import into globals.css** and override
3. **Use CSS Modules** by renaming to `PaymentForm.module.css`
4. **Use Tailwind** by replacing CSS classes with Tailwind utilities

### Example: Using Tailwind CSS

Replace the CSS classes in `PaymentForm.tsx` with Tailwind classes:

```tsx
<div className="max-w-md mx-auto p-5">
  <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-md">
    <h2 className="text-2xl font-semibold text-center mb-6">Payment</h2>
    {/* ... rest of component */}
  </div>
</div>
```

## Integration with Next.js Features

### App Router (Next.js 13+)

This component is designed for the App Router and uses the `'use client'` directive.

### Pages Router (Next.js 12 and earlier)

The component works with Pages Router too. Just remove the `'use client'` directive if using Next.js 12.

### API Routes

You can create a Next.js API route as a proxy to Square instead of deploying a separate backend:

```typescript
// app/api/process-payment/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { Client, Environment } from 'square';

const client = new Client({
  accessToken: process.env.SQUARE_ACCESS_TOKEN!,
  environment: Environment.Production,
});

export async function POST(request: NextRequest) {
  try {
    const { sourceId, amount } = await request.json();

    const response = await client.paymentsApi.createPayment({
      sourceId,
      amountMoney: {
        amount: BigInt(Math.round(amount * 100)),
        currency: 'USD',
      },
      locationId: process.env.SQUARE_LOCATION_ID!,
      idempotencyKey: `${sourceId}-${Date.now()}`,
    });

    return NextResponse.json({
      success: true,
      payment: response.result.payment,
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.errors?.[0]?.detail || 'Payment failed',
    }, { status: 400 });
  }
}
```

Then set `NEXT_PUBLIC_API_URL=` (empty or your domain).

## TypeScript Configuration

Make sure your `tsconfig.json` includes:

```json
{
  "compilerOptions": {
    "lib": ["dom", "dom.iterable", "esnext"],
    "jsx": "preserve",
    "strict": true
  }
}
```

## Troubleshooting

### "Square SDK not loaded" error
- Ensure `<script>` tag is in your layout's `<head>`
- Check browser console for script loading errors
- Component retries 50 times before showing error

### TypeScript errors about Window.Square
- The component includes global type declarations
- If you still get errors, add to `global.d.ts`:
```typescript
interface Window {
  Square?: any;
}
```

### Hydration errors
- The component is client-only, make sure it's not being server-rendered
- Ensure `'use client'` directive is at the top of the file

### Environment variables not working
- Must use `NEXT_PUBLIC_` prefix for client components
- Restart dev server after changing `.env.local`
- Check variables are loaded: `console.log(process.env.NEXT_PUBLIC_API_URL)`

### CSS not loading
- Import the CSS file in the component
- Or add to `globals.css`: `@import './components/PaymentForm.css';`

## Test Card Numbers

Use these for testing in Sandbox mode:

- **Visa**: 4111 1111 1111 1111
- **Mastercard**: 5105 1051 0510 5100
- **Discover**: 6011 0000 0000 0004
- **Amex**: 3782 822463 10005

**Expiration**: Any future date
**CVV**: Any 3 digits (4 for Amex)
**ZIP**: Any 5 digits

## Example Project Structure

```
your-nextjs-app/
├── app/
│   ├── layout.tsx              # Add Square SDK here
│   ├── page.tsx                # Use component here
│   ├── components/
│   │   ├── PaymentForm.tsx     # Copy here
│   │   └── PaymentForm.css     # Copy here
│   └── api/
│       └── process-payment/
│           └── route.ts        # Optional: API route
├── .env.local                  # Add credentials
└── tsconfig.json
```

## Support

- Square API Docs: https://developer.squareup.com/docs
- Next.js Docs: https://nextjs.org/docs
