'use client';

import React from 'react';
import PaymentForm from '@/app/components/PaymentForm';

interface CoffeeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CoffeeModal({ isOpen, onClose }: CoffeeModalProps) {
  if (!isOpen) return null;

  const handleSuccess = (payment: any) => {
    console.log('Payment successful:', payment);
    // Show success message and close modal after delay
    setTimeout(() => {
      onClose();
    }, 3000);
  };

  const handleError = (error: Error) => {
    console.error('Payment failed:', error);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.75)' }}
      onClick={onClose}
    >
      <div
        className="relative max-w-2xl w-full max-h-[90vh] overflow-y-auto bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 rounded-2xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/80 hover:bg-white text-gray-600 hover:text-gray-800 transition-colors shadow-md"
          aria-label="Close modal"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="p-8">
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
          </div>
        </div>
      </div>
    </div>
  );
}
