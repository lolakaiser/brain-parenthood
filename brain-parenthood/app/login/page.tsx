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
    <div className="min-h-screen w-full bg-[#F5F7FA] flex items-center justify-center p-4">
      {/* Login Card */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-gray-100 px-10 py-10">
        {/* Logo */}
        <div className="flex justify-center mb-5">
          <div className="w-12 h-12 rounded-lg bg-[#4F46E5] flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 3H8C9.06087 3 10.0783 3.42143 10.8284 4.17157C11.5786 4.92172 12 5.93913 12 7V21C12 20.2044 11.6839 19.4413 11.1213 18.8787C10.5587 18.3161 9.79565 18 9 18H2V3Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M22 3H16C14.9391 3 13.9217 3.42143 13.1716 4.17157C12.4214 4.92172 12 5.93913 12 7V21C12 20.2044 12.3161 19.4413 12.8787 18.8787C13.4413 18.3161 14.2044 18 15 18H22V3Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-7">
          <h1 className="text-xl font-bold text-gray-900 mb-1">Welcome Back</h1>
          <p className="text-gray-400 text-sm">Sign in to your account</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-5 text-sm">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[#4F46E5] focus:ring-2 focus:ring-[#4F46E5]/20 outline-none transition-all text-gray-900 placeholder-gray-400 text-sm"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-600 mb-1.5">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[#4F46E5] focus:ring-2 focus:ring-[#4F46E5]/20 outline-none transition-all text-gray-900 placeholder-gray-400 text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2.5 px-4 text-white font-medium rounded-lg transition-all disabled:opacity-60 disabled:cursor-not-allowed text-sm"
            style={{ background: 'linear-gradient(to right, #a78bfa, #818cf8)' }}
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        {/* Links */}
        <div className="mt-6 text-center space-y-3">
          <p className="text-sm text-gray-500">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="text-[#4F46E5] hover:text-[#4338CA] font-medium">
              Sign up
            </Link>
          </p>
          <Link href="/" className="block text-sm text-gray-400 hover:text-gray-500">
            &#8592; Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
