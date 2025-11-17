'use client';

import React from 'react';
import PaymentForm from '@/app/components/PaymentForm';
import { useRouter } from 'next/navigation';

export default function BuyMeACoffeePage() {
  const router = useRouter();

  const handleSuccess = (payment: any) => {
    console.log('Payment successful:', payment);
    // You can add additional success handling here, such as:
    // - Sending a thank you email
    // - Logging the donation
    // - Showing a custom thank you message
  };

  const handleError = (error: Error) => {
    console.error('Payment failed:', error);
    // You can add additional error handling here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            ☕ Buy Me a Coffee
          </h1>
          <p className="text-lg text-gray-600 mb-2">
            Support the Brain Parenthood project
          </p>
          <p className="text-gray-500">
            Your contribution helps us continue building resources for startup founders and their mental health.
          </p>
        </div>

        {/* Suggested Amounts */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Suggested Amounts
          </h2>
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="text-center p-4 bg-purple-50 rounded-lg border-2 border-purple-200">
              <div className="text-2xl mb-1">☕</div>
              <div className="font-semibold text-gray-800">$5</div>
              <div className="text-sm text-gray-600">One Coffee</div>
            </div>
            <div className="text-center p-4 bg-pink-50 rounded-lg border-2 border-pink-200">
              <div className="text-2xl mb-1">☕☕</div>
              <div className="font-semibold text-gray-800">$10</div>
              <div className="text-sm text-gray-600">Two Coffees</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg border-2 border-orange-200">
              <div className="text-2xl mb-1">☕☕☕</div>
              <div className="font-semibold text-gray-800">$25</div>
              <div className="text-sm text-gray-600">Generous Support</div>
            </div>
          </div>
          <p className="text-sm text-gray-500 text-center">
            Or enter any amount below that feels right to you
          </p>
        </div>

        {/* Payment Form */}
        <PaymentForm
          mode="input"
          onSuccess={handleSuccess}
          onError={handleError}
        />

        {/* Footer Note */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            All donations are processed securely through Square. Your support is greatly appreciated! 💜
          </p>
          <button
            onClick={() => router.push('/')}
            className="mt-4 text-purple-600 hover:text-purple-800 font-medium"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
