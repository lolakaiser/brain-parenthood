'use client';

import { useState } from 'react';
import PaymentForm from '@/app/components/PaymentForm';
import { useRouter, useSearchParams } from 'next/navigation';

export default function BuyMeACoffeePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnTo = searchParams.get('from') || '/dashboard';
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);

  const handleSuccess = () => {
    setTimeout(() => router.push(returnTo), 3000);
  };

  const handleError = (error: Error) => {
    console.error('Payment failed:', error);
  };

  const suggestedAmounts = [
    { amount: 5, label: 'One Coffee', icon: '☕' },
    { amount: 10, label: 'Two Coffees', icon: '☕☕' },
    { amount: 25, label: 'Generous', icon: '💜' },
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F5F7FA', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px' }}>
      <div style={{ width: '100%', maxWidth: '460px' }}>

        {/* Back Button */}
        <button
          onClick={() => router.push(returnTo)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            background: 'none',
            border: 'none',
            color: '#6B7280',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer',
            marginBottom: '24px',
            padding: 0,
          }}
        >
          ← Back
        </button>

        {/* Card */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
          border: '1px solid #F0F0F0',
          padding: '40px',
        }}>
          {/* Logo */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/BPlogo2.png" alt="Brain Parenthood Logo" style={{ width: '48px', height: '48px', borderRadius: '10px', objectFit: 'cover', objectPosition: 'center' }} />
          </div>

          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h1 style={{ fontSize: '22px', fontWeight: 'bold', color: '#111827', marginBottom: '8px' }}>Buy Me a Coffee</h1>
            <p style={{ color: '#6B7280', fontSize: '14px', lineHeight: '1.6' }}>
              Support Brain Parenthood and help us keep building tools for startup teams.
            </p>
          </div>

          {/* Suggested Amounts */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginBottom: '28px' }}>
            {suggestedAmounts.map(({ amount, label, icon }) => (
              <button
                key={amount}
                onClick={() => setSelectedAmount(amount)}
                style={{
                  padding: '16px 8px',
                  borderRadius: '12px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  border: selectedAmount === amount ? '2px solid #4F46E5' : '2px solid #E5E7EB',
                  background: selectedAmount === amount ? '#EEF2FF' : 'white',
                  transition: 'all 0.15s',
                }}
              >
                <div style={{ fontSize: '22px', marginBottom: '6px' }}>{icon}</div>
                <div style={{ fontWeight: '700', fontSize: '16px', color: '#111827' }}>${amount}</div>
                <div style={{ fontSize: '11px', color: '#6B7280', marginTop: '2px' }}>{label}</div>
              </button>
            ))}
          </div>

          {/* Payment Form */}
          <div style={{ borderTop: '1px solid #F3F4F6', paddingTop: '24px' }}>
            <PaymentForm
              mode="input"
              amount={selectedAmount || undefined}
              onSuccess={handleSuccess}
              onError={handleError}
              onClose={() => router.push(returnTo)}
            />
          </div>

          {/* Footer */}
          <p style={{ textAlign: 'center', fontSize: '12px', color: '#9CA3AF', marginTop: '20px' }}>
            🔒 Secure payments via Square
          </p>
        </div>
      </div>
    </div>
  );
}
