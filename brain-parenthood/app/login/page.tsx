"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
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

    if (!username || !password) {
      setError('Please enter both username and password');
      return;
    }

    const result = await login(username, password);
    if (result.success) {
      router.push('/dashboard');
    } else {
      setError(result.error || 'Invalid username or password');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-calm-50 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <div className="inline-block p-4 bg-primary-600 rounded-2xl mb-4 shadow-lg shadow-primary-500/30">
            <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">Brain Parenthood</h1>
          <p className="text-neutral-600">Welcome back to your journey</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-lg border border-neutral-200 shadow-sm p-8">
          <h2 className="text-heading-2 font-semibold text-neutral-900 mb-2 text-center">Sign In</h2>
          <p className="text-body-sm text-neutral-600 text-center mb-8">Continue your resilience training</p>

          {error && (
            <div className="bg-error-50 border border-error-500 text-error-700 px-4 py-3 rounded-lg mb-6">
              <p className="text-body-sm font-medium">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              type="text"
              id="username"
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              fullWidth
            />

            <Input
              type="password"
              id="password"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              fullWidth
            />

            <div className="pt-2">
              <Button type="submit" variant="primary" size="large" fullWidth>
                Sign In
              </Button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-body-sm text-neutral-600">
              Don't have an account?{' '}
              <Link href="/signup" className="text-primary-700 hover:text-primary-600 font-semibold">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
