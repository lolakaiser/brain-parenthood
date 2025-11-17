'use client';

import React, { useState } from 'react';
import PaymentForm from '@/app/components/PaymentForm';

interface CoffeeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CoffeeModal({ isOpen, onClose }: CoffeeModalProps) {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);

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

  const suggestedAmounts = [
    { amount: 5, label: 'Coffee', icon: '☕' },
    { amount: 10, label: 'Two Coffees', icon: '☕☕' },
    { amount: 25, label: 'Generous', icon: '💜' },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        backdropFilter: 'blur(4px)'
      }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md max-h-[85vh] overflow-y-auto rounded-2xl shadow-2xl animate-fade-in"
        style={{
          background: '#242F3D',
          border: '1px solid rgba(255, 255, 255, 0.15)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center rounded-full transition-all"
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
            color: '#ffffff',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
          }}
          aria-label="Close modal"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="p-6 sm:p-8">
          {/* Header Section */}
          <div className="text-center mb-6">
            <div className="text-5xl mb-3">☕</div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-2" style={{ color: '#ffffff' }}>
              Buy Me a Coffee
            </h1>
            <p className="text-sm sm:text-base" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
              Support Brain Parenthood and help founders build resilience
            </p>
          </div>

          {/* Suggested Amounts */}
          <div className="mb-6">
            <p className="text-sm font-semibold mb-3" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
              Choose an amount:
            </p>
            <div className="grid grid-cols-3 gap-3">
              {suggestedAmounts.map(({ amount, label, icon }) => (
                <button
                  key={amount}
                  onClick={() => setSelectedAmount(amount)}
                  className="p-4 rounded-xl text-center transition-all transform hover:scale-105"
                  style={{
                    background: selectedAmount === amount
                      ? 'linear-gradient(135deg, #9333ea 0%, #3b82f6 100%)'
                      : 'rgba(255, 255, 255, 0.08)',
                    border: selectedAmount === amount
                      ? '2px solid rgba(147, 51, 234, 0.5)'
                      : '2px solid rgba(255, 255, 255, 0.1)',
                    color: '#ffffff',
                  }}
                >
                  <div className="text-2xl mb-1">{icon}</div>
                  <div className="font-bold text-lg">${amount}</div>
                  <div className="text-xs opacity-80">{label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Payment Form */}
          <div className="bg-[#2D3E50] rounded-xl p-4 border border-white/10">
            <PaymentForm
              mode="input"
              amount={selectedAmount || undefined}
              onSuccess={handleSuccess}
              onError={handleError}
            />
          </div>

          {/* Footer Note */}
          <div className="mt-4 text-center">
            <p className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
              Secure payments via Square 🔒
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
