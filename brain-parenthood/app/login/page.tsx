"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!email || !password) {
      setError('Please enter both email and password');
      setIsLoading(false);
      return;
    }

    const result = await login(email, password);
    if (result.success) {
      router.push('/dashboard');
    } else {
      setError(result.error || 'Invalid email or password');
    }
    setIsLoading(false);
  };

  return (
    <div style={{
      minHeight: '100vh',
      width: '100%',
      backgroundColor: '#F5F7FA',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '16px',
    }}>
      {/* Login Card */}
      <div style={{
        width: '100%',
        maxWidth: '420px',
        backgroundColor: 'white',
        borderRadius: '16px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
        border: '1px solid #F0F0F0',
        padding: '40px',
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/BPlogo2.png" alt="Brain Parenthood Logo" style={{ width: '48px', height: '48px', borderRadius: '10px', objectFit: 'cover', objectPosition: "center" }} />
        </div>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <h1 style={{ fontSize: '20px', fontWeight: 'bold', color: '#111827', marginBottom: '4px' }}>Welcome Back</h1>
          <p style={{ color: '#9CA3AF', fontSize: '14px' }}>Sign in to your account</p>
        </div>

        {/* Error Message */}
        {error && (
          <div style={{
            backgroundColor: '#FEF2F2',
            border: '1px solid #FECACA',
            color: '#DC2626',
            padding: '12px 16px',
            borderRadius: '8px',
            marginBottom: '20px',
            fontSize: '14px',
          }}>
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '16px' }}>
            <label htmlFor="email" style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#4B5563', marginBottom: '6px' }}>
              Email or Username
            </label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com or your username"
              style={{
                width: '100%',
                padding: '10px 16px',
                borderRadius: '8px',
                border: '1px solid #E5E7EB',
                outline: 'none',
                fontSize: '14px',
                color: '#111827',
                boxSizing: 'border-box',
              }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <label htmlFor="password" style={{ fontSize: '14px', fontWeight: '500', color: '#4B5563' }}>
                Password
              </label>
              <Link href="/forgot-password" style={{ fontSize: '13px', color: '#4F46E5', textDecoration: 'none' }}>
                Forgot password?
              </Link>
            </div>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              style={{
                width: '100%',
                padding: '10px 16px',
                borderRadius: '8px',
                border: '1px solid #E5E7EB',
                outline: 'none',
                fontSize: '14px',
                color: '#111827',
                boxSizing: 'border-box',
              }}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            style={{
              width: '100%',
              padding: '10px 16px',
              background: 'linear-gradient(to right, #a78bfa, #818cf8)',
              color: 'white',
              fontWeight: '500',
              borderRadius: '8px',
              border: 'none',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              opacity: isLoading ? 0.6 : 1,
              fontSize: '14px',
            }}
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        {/* Links */}
        <div style={{ marginTop: '24px', textAlign: 'center' }}>
          <p style={{ fontSize: '14px', color: '#6B7280', marginBottom: '12px' }}>
            Don&apos;t have an account?{' '}
            <Link href="/signup" style={{ color: '#4F46E5', fontWeight: '500', textDecoration: 'none' }}>
              Sign up
            </Link>
          </p>
          <Link href="/" style={{ fontSize: '14px', color: '#9CA3AF', textDecoration: 'none' }}>
            &#8592; Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
