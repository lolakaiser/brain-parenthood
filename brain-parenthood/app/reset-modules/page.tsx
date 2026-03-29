"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ResetAllModulesPage() {
  const [done, setDone] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Clear baseline and goals
    localStorage.removeItem('brainParenthood_baseline');
    localStorage.removeItem('brainParenthood_goals');
    localStorage.removeItem('brainParenthood_progress');

    // Clear all module answers for modules 1-12
    for (let i = 1; i <= 12; i++) {
      localStorage.removeItem(`brainParenthood_module${i}_assessment`);
      localStorage.removeItem(`brainParenthood_module${i}_goals`);
    }

    // Sync cleared progress to MongoDB
    const token = localStorage.getItem('authToken');
    if (token) {
      fetch('/api/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ completedModules: [], currentModule: 1 }),
      }).catch(() => {});
    }

    setDone(true);
    setTimeout(() => router.push('/module/1'), 1500);
  }, [router]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', gap: '16px', fontFamily: 'sans-serif' }}>
      {done ? (
        <>
          <div style={{ fontSize: '48px' }}>✓</div>
          <p style={{ fontSize: '18px', color: '#4F46E5', fontWeight: '600' }}>All module progress cleared</p>
          <p style={{ color: '#6B7280' }}>Redirecting to Module 1…</p>
        </>
      ) : (
        <p style={{ color: '#6B7280' }}>Clearing…</p>
      )}
    </div>
  );
}
