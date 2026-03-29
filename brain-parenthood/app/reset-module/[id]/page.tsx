"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function ResetModulePage() {
  const [done, setDone] = useState(false);
  const [moduleNum, setModuleNum] = useState<number | null>(null);
  const [error, setError] = useState(false);
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    const id = Number(params.id);

    if (!id || id < 1 || id > 12) {
      setError(true);
      return;
    }

    setModuleNum(id);

    // Clear this module's answers
    localStorage.removeItem(`brainParenthood_module${id}_assessment`);
    localStorage.removeItem(`brainParenthood_module${id}_goals`);

    // If module 1, also clear baseline and goals
    if (id === 1) {
      localStorage.removeItem('brainParenthood_baseline');
      localStorage.removeItem('brainParenthood_goals');
    }

    // Remove this module from completedModules in progress
    try {
      const raw = localStorage.getItem('brainParenthood_progress');
      const progress = raw ? JSON.parse(raw) : { completedModules: [], currentModule: 1 };
      progress.completedModules = progress.completedModules.filter((m: number) => m !== id);
      if (progress.currentModule > id) {
        progress.currentModule = id;
      }
      localStorage.setItem('brainParenthood_progress', JSON.stringify(progress));

      // Sync to MongoDB
      const token = localStorage.getItem('authToken');
      if (token) {
        fetch('/api/progress', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
          body: JSON.stringify({ completedModules: progress.completedModules, currentModule: progress.currentModule }),
        }).catch(() => {});
      }
    } catch {}

    setDone(true);
    setTimeout(() => router.push(`/module/${id}`), 1500);
  }, [params.id, router]);

  if (error) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', gap: '16px', fontFamily: 'sans-serif' }}>
        <div style={{ fontSize: '48px' }}>✗</div>
        <p style={{ fontSize: '18px', color: '#EF4444', fontWeight: '600' }}>Invalid module number</p>
        <p style={{ color: '#6B7280' }}>Use /reset-module/1 through /reset-module/12</p>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', gap: '16px', fontFamily: 'sans-serif' }}>
      {done ? (
        <>
          <div style={{ fontSize: '48px' }}>✓</div>
          <p style={{ fontSize: '18px', color: '#4F46E5', fontWeight: '600' }}>Module {moduleNum} progress cleared</p>
          <p style={{ color: '#6B7280' }}>Redirecting to Module {moduleNum}…</p>
        </>
      ) : (
        <p style={{ color: '#6B7280' }}>Clearing…</p>
      )}
    </div>
  );
}
