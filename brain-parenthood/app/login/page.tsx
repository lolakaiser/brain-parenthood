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
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <h1 className="text-heading-1 font-bold text-neutral-900 mb-2">Brain Parenthood</h1>
          <p className="text-body text-neutral-600">Welcome back to your journey</p>
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
