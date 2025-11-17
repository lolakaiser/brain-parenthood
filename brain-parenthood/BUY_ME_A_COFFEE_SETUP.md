# Buy Me a Coffee - Setup Guide

This guide will help you set up the "Buy Me a Coffee" payment feature using Square.

## Overview

The Buy Me a Coffee feature allows visitors to support your Brain Parenthood project with donations of any amount. It uses:
- **Square** for secure payment processing
- **Next.js API Routes** for backend payment handling
- **React components** for a beautiful, responsive UI

## File Structure

```
brain-parenthood/
├── app/
│   ├── components/
│   │   ├── PaymentForm.tsx       # Reusable payment form component
│   │   └── PaymentForm.css       # Payment form styles
│   ├── buy-me-a-coffee/
│   │   └── page.tsx              # Buy Me a Coffee page
│   └── api/
│       └── process-payment/
│           └── route.ts          # API endpoint for payment processing
├── .env.local                     # Your local environment variables (DO NOT commit)
└── .env.local.example            # Template for environment variables
```

## Setup Instructions

### Step 1: Get Square Credentials

1. Go to [Square Developer Portal](https://developer.squareup.com/apps)
2. Sign in or create a Square account
3. Create a new application or select an existing one
4. Get the following credentials:
   - **Application ID** (from Credentials page)
   - **Access Token** (from Credentials page)
   - **Location ID** (from Locations page)

### Step 2: Configure Environment Variables

1. Open the `.env.local` file in the `brain-parenthood` directory
2. Replace the placeholder values with your Square credentials:

```bash
# Square Application ID (for frontend - publicly visible)
NEXT_PUBLIC_SQUARE_APPLICATION_ID=sandbox-sq0idb-YOUR_ACTUAL_APPLICATION_ID

# Square Location ID (for frontend - publicly visible)
NEXT_PUBLIC_SQUARE_LOCATION_ID=YOUR_ACTUAL_LOCATION_ID

# Square Access Token (KEEP SECRET - server-side only)
SQUARE_ACCESS_TOKEN=YOUR_ACTUAL_ACCESS_TOKEN

# Square Environment
SQUARE_ENVIRONMENT=sandbox  # Use 'production' for live payments
```

**Important Notes:**
- Use **Sandbox** credentials for testing
- Use **Production** credentials only when you're ready to accept real payments
- **Never commit** your `.env.local` file to version control
- The Access Token should **never** be exposed to the frontend

### Step 3: Install Dependencies

The Square SDK has already been installed. If you need to reinstall:

```bash
cd brain-parenthood
npm install square
```

### Step 4: Start the Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:3000`

### Step 5: Test the Payment Flow

1. Navigate to `http://localhost:3000/buy-me-a-coffee`
2. Enter a test amount
3. Use Square test card numbers:

**Test Card Numbers (Sandbox Mode):**
- **Visa:** 4111 1111 1111 1111
- **Mastercard:** 5105 1051 0510 5100
- **Discover:** 6011 0000 0000 0004
- **Amex:** 3782 822463 10005

**Test Details:**
- **Expiration:** Any future date (e.g., 12/25)
- **CVV:** Any 3 digits (4 for Amex)
- **ZIP:** Any 5 digits (e.g., 12345)

### Step 6: Go Live

When you're ready to accept real payments:

1. Switch to **Production** credentials in Square Developer Portal
2. Update `.env.local`:
   ```bash
   SQUARE_ENVIRONMENT=production
   NEXT_PUBLIC_SQUARE_APPLICATION_ID=sq0idp-YOUR_PRODUCTION_APP_ID
   NEXT_PUBLIC_SQUARE_LOCATION_ID=YOUR_PRODUCTION_LOCATION_ID
   SQUARE_ACCESS_TOKEN=YOUR_PRODUCTION_ACCESS_TOKEN
   ```
3. Test thoroughly with real test payments
4. Deploy your app

## Features

### User Features
- Enter any donation amount
- Suggested amounts ($5, $10, $25)
- Secure card payment with Square
- Confirmation modal before payment
- Success/error feedback
- Mobile-responsive design

### Technical Features
- Client-side card tokenization (card data never touches your server)
- Server-side payment processing
- Error handling and validation
- Idempotency keys to prevent duplicate payments
- TypeScript for type safety

## Customization

### Change Suggested Amounts

Edit `app/buy-me-a-coffee/page.tsx`:

```tsx
<div className="grid grid-cols-3 gap-4 mb-4">
  <div className="text-center p-4 bg-purple-50 rounded-lg border-2 border-purple-200">
    <div className="text-2xl mb-1">☕</div>
    <div className="font-semibold text-gray-800">$5</div>  {/* Change this */}
    <div className="text-sm text-gray-600">One Coffee</div>
  </div>
  {/* ... more amounts */}
</div>
```

### Change Colors and Styling

The page uses Tailwind CSS. Edit the className properties in:
- `app/buy-me-a-coffee/page.tsx` - Main page styling
- `app/components/PaymentForm.css` - Payment form styling

### Add Success Callback

Edit the `handleSuccess` function in `app/buy-me-a-coffee/page.tsx`:

```tsx
const handleSuccess = (payment: any) => {
  console.log('Payment successful:', payment);

  // Add your custom logic here:
  // - Send thank you email
  // - Log to analytics
  // - Show custom message
  // - Redirect to thank you page
};
```

## Adding to Navigation

To add a link to the Buy Me a Coffee page in your navigation:

1. Open `components/Navigation.tsx` (or wherever your nav is)
2. Add a link:

```tsx
<Link href="/buy-me-a-coffee">
  ☕ Support Us
</Link>
```

## Troubleshooting

### "Square SDK not loaded" error
- Check that the Square script is in `app/layout.tsx`
- Check browser console for script loading errors
- Wait a few seconds - the component retries loading

### "Payment system is not configured" error
- Verify all environment variables are set in `.env.local`
- Restart the dev server after changing `.env.local`
- Check that variables have `NEXT_PUBLIC_` prefix for frontend variables

### Payment fails in production
- Verify you're using **production** credentials, not sandbox
- Check that your Square account is fully activated
- Verify the Location ID matches your production location

### Environment variables not working
- Must use `NEXT_PUBLIC_` prefix for client-side variables
- Restart dev server after changing `.env.local`
- Check variables are loaded: `console.log(process.env.NEXT_PUBLIC_SQUARE_APPLICATION_ID)`

## Security Best Practices

1. **Never commit** `.env.local` to version control (already in `.gitignore`)
2. **Never expose** `SQUARE_ACCESS_TOKEN` to the frontend
3. Use **environment variables** for all sensitive data
4. Always test in **Sandbox mode** before going live
5. Use **HTTPS** in production
6. Regularly **rotate** your access tokens

## Square Documentation

- [Square Developer Portal](https://developer.squareup.com/)
- [Square Payments API](https://developer.squareup.com/docs/payments-api/overview)
- [Square Web Payments SDK](https://developer.squareup.com/docs/web-payments/overview)
- [Testing Payments](https://developer.squareup.com/docs/testing/test-values)

## Support

If you encounter issues:
1. Check the browser console for errors
2. Check the server logs in the terminal
3. Verify your Square credentials
4. Check Square Developer Dashboard for payment status
5. Review Square API error messages

## Additional Features to Consider

- **Recurring donations** - Set up subscription payments
- **Donation tiers** - Different rewards for different amounts
- **Thank you page** - Redirect to a custom thank you page
- **Email notifications** - Send receipts and thank you emails
- **Donation tracking** - Log donations to a database
- **Donor wall** - Show list of supporters (with permission)

---

Built with ❤️ for Brain Parenthood
