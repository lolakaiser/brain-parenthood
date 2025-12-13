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
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <h1 className="text-heading-1 font-bold text-neutral-900 mb-2">Brain Parenthood</h1>
          <p className="text-body text-neutral-600">Start your resilience journey today</p>
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
