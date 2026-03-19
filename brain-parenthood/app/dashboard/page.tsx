"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import AppLayout from "@/components/AppLayout";
import { useAuth } from "@/context/AuthContext";
import { getProgress } from "@/lib/storage";

export default function DashboardPage() {
  const { user } = useAuth();
  const [completedModules, setCompletedModules] = useState<number[]>([]);

  useEffect(() => {
    const progress = getProgress();
    setCompletedModules(progress?.completedModules || []);
  }, []);

  const totalModules = 12;
  const modulesStarted = Math.min(completedModules.length + 1, totalModules);
  const modulesCompleted = completedModules.length;
  const overallProgress = Math.round((modulesCompleted / totalModules) * 100);
  const currentModule = completedModules.length + 1;

  return (
    <AppLayout>
      {/* Hero Header */}
      <div style={{ background: 'linear-gradient(to right, #4F46E5, #7C3AED, #EC4899)', width: '100%' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 80px' }}>
          <h1 style={{ fontSize: '36px', fontWeight: 'bold', color: 'white', marginBottom: '8px' }}>
            Welcome back, {user?.name || "User"}!
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '18px' }}>
            Continue your journey to personal growth
          </p>
        </div>
      </div>

      {/* Content Area */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 80px' }}>

        {/* Stats Row - 3 cards side by side */}
        <div style={{ display: 'flex', gap: '40px', marginBottom: '80px' }}>
          {/* Card 1 */}
          <div style={{ flex: 1, backgroundColor: 'white', borderRadius: '16px', padding: '40px', border: '1px solid #E5E7EB' }}>
            <p style={{ fontSize: '14px', color: '#6B7280', marginBottom: '12px' }}>Modules Started</p>
            <p style={{ fontSize: '42px', fontWeight: 'bold', color: '#111827' }}>{modulesStarted} / {totalModules}</p>
          </div>

          {/* Card 2 */}
          <div style={{ flex: 1, backgroundColor: 'white', borderRadius: '16px', padding: '40px', border: '1px solid #E5E7EB' }}>
            <p style={{ fontSize: '14px', color: '#6B7280', marginBottom: '12px' }}>Modules Completed</p>
            <p style={{ fontSize: '42px', fontWeight: 'bold', color: '#22C55E' }}>{modulesCompleted}</p>
          </div>

          {/* Card 3 */}
          <div style={{ flex: 1, backgroundColor: 'white', borderRadius: '16px', padding: '40px', border: '1px solid #E5E7EB' }}>
            <p style={{ fontSize: '14px', color: '#6B7280', marginBottom: '12px' }}>Overall Progress</p>
            <p style={{ fontSize: '42px', fontWeight: 'bold', color: '#111827', marginBottom: '16px' }}>{overallProgress}%</p>
            <div style={{ height: '8px', backgroundColor: '#F3F4F6', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${overallProgress}%`, backgroundColor: '#D1D5DB', borderRadius: '4px' }} />
            </div>
          </div>
        </div>

        {/* Browse Modules Card */}
        <Link
          href="/modules"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '24px',
            backgroundColor: 'white',
            borderRadius: '16px',
            padding: '40px',
            border: '1px solid #E5E7EB',
            marginBottom: '80px',
            textDecoration: 'none'
          }}
        >
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '16px',
            backgroundColor: '#EEF2FF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}>
            <span style={{ color: '#4F46E5', fontSize: '24px' }}>B</span>
          </div>
          <div>
            <h3 style={{ fontWeight: '600', color: '#111827', fontSize: '20px', marginBottom: '4px' }}>Browse Modules</h3>
            <p style={{ color: '#6B7280' }}>Explore all available learning modules</p>
          </div>
        </Link>

        {/* Interactive Training Card */}
        <Link
          href="/about"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '24px',
            backgroundColor: 'white',
            borderRadius: '16px',
            padding: '40px',
            border: '1px solid #E5E7EB',
            marginBottom: '80px',
            textDecoration: 'none'
          }}
        >
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '16px',
            backgroundColor: '#EEF2FF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}>
            <span style={{ color: '#4F46E5', fontSize: '24px' }}>T</span>
          </div>
          <div>
            <h3 style={{ fontWeight: '600', color: '#111827', fontSize: '20px', marginBottom: '4px' }}>Interactive Training</h3>
            <p style={{ color: '#6B7280' }}>Learn how to use the platform</p>
          </div>
        </Link>

        {/* Continue Learning Card */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          padding: '40px',
          border: '1px solid #E5E7EB'
        }}>
          <h3 style={{ fontWeight: '600', color: '#111827', fontSize: '20px', marginBottom: '8px' }}>Continue Learning</h3>
          <p style={{ color: '#6B7280', marginBottom: '24px' }}>Pick up where you left off</p>
          <Link
            href={`/module/${currentModule}`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '14px 24px',
              backgroundColor: '#4F46E5',
              color: 'white',
              fontWeight: '500',
              borderRadius: '12px',
              textDecoration: 'none'
            }}
          >
            Continue Module
            <span>→</span>
          </Link>
        </div>

      </div>
    </AppLayout>
  );
}
