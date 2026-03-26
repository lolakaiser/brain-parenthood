"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ResetModulePage() {
  const [done, setDone] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const keys = [
      'brainParenthood_progress',
      'brainParenthood_baseline',
      'brainParenthood_goals',
      'brainParenthood_module1_assessment',
      'brainParenthood_module1_goals',
    ];
    keys.forEach(k => localStorage.removeItem(k));
    setDone(true);
    setTimeout(() => router.push('/module/1'), 1500);
  }, [router]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', gap: '16px', fontFamily: 'sans-serif' }}>
      {done ? (
        <>
          <div style={{ fontSize: '48px' }}>✓</div>
          <p style={{ fontSize: '18px', color: '#4F46E5', fontWeight: '600' }}>Module 1 progress cleared</p>
          <p style={{ color: '#6B7280' }}>Redirecting to Module 1…</p>
        </>
      ) : (
        <p style={{ color: '#6B7280' }}>Clearing…</p>
      )}
    </div>
  );
}
