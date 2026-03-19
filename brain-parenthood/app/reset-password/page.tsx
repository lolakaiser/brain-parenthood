"use client";

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

function checkPassword(password: string) {
  const hasUpper = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[^A-Za-z0-9]/.test(password);
  const isLongEnough = password.length >= 8;
  const criteriaMet = [hasUpper, hasNumber, hasSpecial].filter(Boolean).length;
  return { hasUpper, hasNumber, hasSpecial, isLongEnough, criteriaMet, isValid: isLongEnough && criteriaMet >= 2 };
}

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get('token');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const pwCheck = checkPassword(password);

  useEffect(() => {
    if (!token) setStatus('error');
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!pwCheck.isValid) {
      setErrorMsg('Password does not meet the requirements');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match');
      return;
    }

    setStatus('loading');
    try {
      const res = await fetch('/api/users/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus('success');
        setTimeout(() => router.push('/login'), 3000);
      } else {
        setErrorMsg(data.detail || 'Something went wrong. Please try again.');
        setStatus('error');
      }
    } catch {
      setErrorMsg('Network error. Please check your connection.');
      setStatus('error');
    }
  };

  const inputStyle = {
    width: '100%', padding: '10px 16px', borderRadius: '8px',
    border: '1px solid #E5E7EB', outline: 'none', fontSize: '14px',
    color: '#111827', boxSizing: 'border-box' as const,
  };

  const reqItem = (met: boolean, text: string) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: met ? '#16A34A' : '#6B7280' }}>
      <span style={{ fontSize: '12px' }}>{met ? '✓' : '○'}</span>
      {text}
    </div>
  );

  return (
    <div style={{
      minHeight: '100vh', width: '100%', backgroundColor: '#F5F7FA',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px',
    }}>
      <div style={{
        width: '100%', maxWidth: '420px', backgroundColor: 'white',
        borderRadius: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
        border: '1px solid #F0F0F0', padding: '40px',
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
          <div style={{
            width: '48px', height: '48px', borderRadius: '10px',
            backgroundColor: '#4F46E5', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M2 3H8C9.06087 3 10.0783 3.42143 10.8284 4.17157C11.5786 4.92172 12 5.93913 12 7V21C12 20.2044 11.6839 19.4413 11.1213 18.8787C10.5587 18.3161 9.79565 18 9 18H2V3Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M22 3H16C14.9391 3 13.9217 3.42143 13.1716 4.17157C12.4214 4.92172 12 5.93913 12 7V21C12 20.2044 12.3161 19.4413 12.8787 18.8787C13.4413 18.3161 14.2044 18 15 18H22V3Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        {status === 'success' ? (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>✅</div>
            <h1 style={{ fontSize: '20px', fontWeight: 'bold', color: '#111827', marginBottom: '8px' }}>Password reset!</h1>
            <p style={{ color: '#6B7280', fontSize: '14px', marginBottom: '24px' }}>
              Your password has been updated. Redirecting you to sign in...
            </p>
            <Link href="/login" style={{ color: '#4F46E5', fontSize: '14px', fontWeight: '500', textDecoration: 'none' }}>
              Sign in now
            </Link>
          </div>
        ) : !token ? (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>⚠️</div>
            <h1 style={{ fontSize: '20px', fontWeight: 'bold', color: '#111827', marginBottom: '8px' }}>Invalid link</h1>
            <p style={{ color: '#6B7280', fontSize: '14px', marginBottom: '24px' }}>
              This reset link is missing or invalid. Please request a new one.
            </p>
            <Link href="/forgot-password" style={{ color: '#4F46E5', fontSize: '14px', fontWeight: '500', textDecoration: 'none' }}>
              Request new link
            </Link>
          </div>
        ) : (
          <>
            <div style={{ textAlign: 'center', marginBottom: '28px' }}>
              <h1 style={{ fontSize: '20px', fontWeight: 'bold', color: '#111827', marginBottom: '4px' }}>Set new password</h1>
              <p style={{ color: '#9CA3AF', fontSize: '14px' }}>Choose a strong password for your account</p>
            </div>

            {errorMsg && (
              <div style={{
                backgroundColor: '#FEF2F2', border: '1px solid #FECACA', color: '#DC2626',
                padding: '12px 16px', borderRadius: '8px', marginBottom: '20px', fontSize: '14px',
              }}>
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '8px' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#4B5563', marginBottom: '6px' }}>
                  New Password
                </label>
                <input
                  type="password" value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 8 characters" style={inputStyle}
                />
              </div>

              {password.length > 0 && (
                <div style={{
                  backgroundColor: '#F9FAFB', border: '1px solid #E5E7EB',
                  borderRadius: '8px', padding: '12px', marginBottom: '16px',
                  display: 'flex', flexDirection: 'column', gap: '6px',
                }}>
                  <div style={{ fontSize: '12px', fontWeight: '600', color: '#6B7280', marginBottom: '2px' }}>
                    Meet at least 2 of the 3 complexity rules:
                  </div>
                  {reqItem(pwCheck.isLongEnough, 'At least 8 characters')}
                  {reqItem(pwCheck.hasUpper, 'Uppercase letter (A–Z)')}
                  {reqItem(pwCheck.hasNumber, 'Number (0–9)')}
                  {reqItem(pwCheck.hasSpecial, 'Special character (!@#$…)')}
                  <div style={{ marginTop: '4px', fontSize: '12px', fontWeight: '600', color: pwCheck.isValid ? '#16A34A' : '#9CA3AF' }}>
                    {pwCheck.isValid ? '✓ Password meets requirements' : `${pwCheck.isLongEnough ? pwCheck.criteriaMet : 0}/2 complexity rules met`}
                  </div>
                </div>
              )}

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#4B5563', marginBottom: '6px' }}>
                  Confirm Password
                </label>
                <input
                  type="password" value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter your password" style={inputStyle}
                />
              </div>

              <button
                type="submit" disabled={status === 'loading'}
                style={{
                  width: '100%', padding: '10px 16px',
                  background: 'linear-gradient(to right, #a78bfa, #818cf8)',
                  color: 'white', fontWeight: '500', borderRadius: '8px',
                  border: 'none', cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                  opacity: status === 'loading' ? 0.6 : 1, fontSize: '14px',
                }}
              >
                {status === 'loading' ? 'Updating...' : 'Update Password'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense>
      <ResetPasswordForm />
    </Suspense>
  );
}
