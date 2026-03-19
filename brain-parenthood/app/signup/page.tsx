"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

function checkPassword(password: string) {
  const hasUpper = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[^A-Za-z0-9]/.test(password);
  const isLongEnough = password.length >= 8;
  const criteriaMet = [hasUpper, hasNumber, hasSpecial].filter(Boolean).length;
  return { hasUpper, hasNumber, hasSpecial, isLongEnough, criteriaMet, isValid: isLongEnough && criteriaMet >= 2 };
}

export default function SignupPage() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { signup, isAuthenticated } = useAuth();
  const router = useRouter();

  const pwCheck = checkPassword(password);
  const showRequirements = password.length > 0;

  useEffect(() => {
    if (isAuthenticated) router.push('/dashboard');
  }, [isAuthenticated, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name || !username || !email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (!pwCheck.isValid) {
      setError('Password does not meet the requirements below');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);
    const result = await signup(email, password, name, username);
    if (result.success) {
      router.push('/dashboard');
    } else {
      setError(result.error || 'Account creation failed');
    }
    setIsLoading(false);
  };

  const inputStyle = {
    width: '100%',
    padding: '10px 16px',
    borderRadius: '8px',
    border: '1px solid #E5E7EB',
    outline: 'none',
    fontSize: '14px',
    color: '#111827',
    boxSizing: 'border-box' as const,
  };

  const labelStyle = {
    display: 'block',
    fontSize: '14px',
    fontWeight: '500' as const,
    color: '#4B5563',
    marginBottom: '6px',
  };

  const reqItem = (met: boolean, text: string) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: met ? '#16A34A' : '#6B7280' }}>
      <span style={{ fontSize: '12px' }}>{met ? '✓' : '○'}</span>
      {text}
    </div>
  );

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
          <div style={{
            width: '48px', height: '48px', borderRadius: '10px',
            backgroundColor: '#4F46E5', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 3H8C9.06087 3 10.0783 3.42143 10.8284 4.17157C11.5786 4.92172 12 5.93913 12 7V21C12 20.2044 11.6839 19.4413 11.1213 18.8787C10.5587 18.3161 9.79565 18 9 18H2V3Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M22 3H16C14.9391 3 13.9217 3.42143 13.1716 4.17157C12.4214 4.92172 12 5.93913 12 7V21C12 20.2044 12.3161 19.4413 12.8787 18.8787C13.4413 18.3161 14.2044 18 15 18H22V3Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <h1 style={{ fontSize: '20px', fontWeight: 'bold', color: '#111827', marginBottom: '4px' }}>Create Account</h1>
          <p style={{ color: '#9CA3AF', fontSize: '14px' }}>Start your resilience journey today</p>
        </div>

        {/* Error */}
        {error && (
          <div style={{
            backgroundColor: '#FEF2F2', border: '1px solid #FECACA', color: '#DC2626',
            padding: '12px 16px', borderRadius: '8px', marginBottom: '20px', fontSize: '14px',
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '16px' }}>
            <label htmlFor="name" style={labelStyle}>Full Name</label>
            <input
              type="text" id="name" value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your full name" style={inputStyle}
            />
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label htmlFor="username" style={labelStyle}>Username</label>
            <input
              type="text" id="username" value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Choose a unique username" style={inputStyle}
            />
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label htmlFor="email" style={labelStyle}>Email Address</label>
            <input
              type="email" id="email" value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com" style={inputStyle}
            />
          </div>

          <div style={{ marginBottom: '8px' }}>
            <label htmlFor="password" style={labelStyle}>Password</label>
            <input
              type="password" id="password" value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 8 characters" style={inputStyle}
            />
          </div>

          {/* Password requirements */}
          {showRequirements && (
            <div style={{
              backgroundColor: '#F9FAFB', border: '1px solid #E5E7EB',
              borderRadius: '8px', padding: '12px', marginBottom: '16px',
              display: 'flex', flexDirection: 'column', gap: '6px',
            }}>
              <div style={{ fontSize: '12px', fontWeight: '600', color: '#6B7280', marginBottom: '2px' }}>
                Password requirements — meet at least 2 of the 3 complexity rules:
              </div>
              {reqItem(pwCheck.isLongEnough, 'At least 8 characters')}
              {reqItem(pwCheck.hasUpper, 'Uppercase letter (A–Z)')}
              {reqItem(pwCheck.hasNumber, 'Number (0–9)')}
              {reqItem(pwCheck.hasSpecial, 'Special character (!@#$…)')}
              <div style={{
                marginTop: '4px', fontSize: '12px', fontWeight: '600',
                color: pwCheck.isValid ? '#16A34A' : '#9CA3AF',
              }}>
                {pwCheck.isValid
                  ? '✓ Password meets requirements'
                  : `${pwCheck.isLongEnough ? pwCheck.criteriaMet : 0}/2 complexity rules met`}
              </div>
            </div>
          )}

          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="confirmPassword" style={labelStyle}>Confirm Password</label>
            <input
              type="password" id="confirmPassword" value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter your password" style={inputStyle}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            style={{
              width: '100%', padding: '10px 16px',
              background: 'linear-gradient(to right, #a78bfa, #818cf8)',
              color: 'white', fontWeight: '500', borderRadius: '8px',
              border: 'none', cursor: isLoading ? 'not-allowed' : 'pointer',
              opacity: isLoading ? 0.6 : 1, fontSize: '14px',
            }}
          >
            {isLoading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <div style={{ marginTop: '24px', textAlign: 'center' }}>
          <p style={{ fontSize: '14px', color: '#6B7280', marginBottom: '12px' }}>
            Already have an account?{' '}
            <Link href="/login" style={{ color: '#4F46E5', fontWeight: '500', textDecoration: 'none' }}>
              Sign in
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
