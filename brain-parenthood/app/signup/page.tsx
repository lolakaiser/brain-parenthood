"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

export default function SignupPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const { signup, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!username || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (password.length < 4) {
      setError('Password must be at least 4 characters long');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const result = await signup(username, password, username);
    if (result.success) {
      router.push('/dashboard');
    } else {
      setError(result.error || 'Username already exists');
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
          <p className="text-neutral-600">Start your resilience journey today</p>
        </div>

        {/* Signup Card */}
        <div className="bg-white rounded-lg border border-neutral-200 shadow-sm p-8">
          <h2 className="text-heading-2 font-semibold text-neutral-900 mb-2 text-center">Create Account</h2>
          <p className="text-body-sm text-neutral-600 text-center mb-8">Join thousands improving team resilience</p>

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
              placeholder="Choose a username"
              fullWidth
            />

            <Input
              type="password"
              id="password"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 4 characters"
              fullWidth
            />

            <Input
              type="password"
              id="confirmPassword"
              label="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter your password"
              fullWidth
            />

            <div className="pt-2">
              <Button type="submit" variant="primary" size="large" fullWidth>
                Create Account
              </Button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-body-sm text-neutral-600">
              Already have an account?{' '}
              <Link href="/login" className="text-primary-700 hover:text-primary-600 font-semibold">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
