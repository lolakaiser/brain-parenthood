"use client";

import { useState, useEffect } from 'react';

interface AIInsightCardProps {
  type: 'dashboard' | 'module_intro' | 'module_complete';
  userData: Record<string, unknown>;
  title?: string;
}

export default function AIInsightCard({ type, userData, title = 'Your Personalized Insight' }: AIInsightCardProps) {
  const [insight, setInsight] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function fetchInsight() {
      try {
        setLoading(true);
        setError(false);
        const res = await fetch('/api/ai/insight', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ type, userData }),
        });
        if (!res.ok) throw new Error('Failed');
        const data = await res.json();
        if (!cancelled) setInsight(data.insight || '');
      } catch {
        if (!cancelled) setError(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchInsight();
    return () => { cancelled = true; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  if (error) return null;

  return (
    <div style={{
      background: 'linear-gradient(135deg, #EEF2FF 0%, #F5F3FF 100%)',
      borderRadius: '16px',
      padding: '32px 40px',
      border: '1px solid #C7D2FE',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Decorative circle */}
      <div style={{
        position: 'absolute',
        top: '-20px',
        right: '-20px',
        width: '120px',
        height: '120px',
        borderRadius: '50%',
        background: 'rgba(99, 102, 241, 0.08)',
      }} />

      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
        {/* Icon */}
        <div style={{
          width: '40px',
          height: '40px',
          borderRadius: '10px',
          background: 'linear-gradient(to right, #4F46E5, #7C3AED)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" fill="white"/>
          </svg>
        </div>

        <div style={{ flex: 1 }}>
          <p style={{ fontSize: '12px', fontWeight: '600', color: '#6366F1', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>
            {title}
          </p>

          {loading ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[100, 85, 60].map((w, i) => (
                <div key={i} style={{
                  height: '14px',
                  width: `${w}%`,
                  backgroundColor: '#C7D2FE',
                  borderRadius: '7px',
                  animation: 'pulse 1.5s ease-in-out infinite',
                  opacity: 0.6,
                }} />
              ))}
              <style>{`@keyframes pulse { 0%,100%{opacity:.4} 50%{opacity:.8} }`}</style>
            </div>
          ) : (
            <p style={{ fontSize: '15px', color: '#1E1B4B', lineHeight: '1.7', margin: 0 }}>
              {insight}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
