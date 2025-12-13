"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getBaseline, getGoals, getProgress } from "@/lib/storage";
import Button from "@/components/ui/Button";

export default function DashboardPage() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [dashboardData, setDashboardData] = useState({
    currentModule: 1,
    completedModules: [] as number[],
    baselineData: {
      teamStressLevel: 5,
      individualStressLevel: 5,
      productivity: 5,
      communication: 5,
      workLifeBalance: 5,
    },
    goals: {
      stressReduction: "Complete Module 1 to set your goals",
      productivityGoal: "Complete Module 1 to set your goals",
      communicationGoal: "Complete Module 1 to set your goals",
    },
    teamMembers: 0,
  });

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    const baseline = getBaseline();
    const goals = getGoals();
    const progress = getProgress();

    if (baseline || goals || progress) {
      setDashboardData({
        currentModule: progress.currentModule || 1,
        completedModules: progress.completedModules || [],
        baselineData: baseline ? {
          teamStressLevel: baseline.teamStressLevel,
          individualStressLevel: baseline.individualStressLevel,
          productivity: baseline.productivity,
          communication: baseline.communication,
          workLifeBalance: baseline.workLifeBalance,
        } : dashboardData.baselineData,
        goals: goals ? {
          stressReduction: goals.stressReduction || "Complete Module 1 to set your goals",
          productivityGoal: goals.productivityGoal || "Complete Module 1 to set your goals",
          communicationGoal: goals.communicationGoal || "Complete Module 1 to set your goals",
        } : dashboardData.goals,
        teamMembers: baseline ? parseInt(baseline.teamSize) || 0 : 0,
      });
    }
  }, []);

  if (!isAuthenticated) {
    return null;
  }

  const progressPercent = (dashboardData.completedModules.length / 12) * 100;

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="app-container">
        {/* Header with Duolingo-style streak */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-neutral-900 mb-2">Your Progress</h1>
              <p className="text-lg text-neutral-600">Keep building your team's resilience</p>
            </div>
            <div className="flex items-center gap-3 bg-gradient-to-r from-warm-50 to-warm-100 px-6 py-4 rounded-2xl border border-warm-200">
              <svg className="w-8 h-8 text-warm-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
              <div>
                <div className="text-2xl font-bold text-warm-600">{dashboardData.completedModules.length}</div>
                <div className="text-xs text-neutral-600 font-medium">Modules Done</div>
              </div>
            </div>
          </div>

          {/* Duolingo-style progress bar */}
          <div className="bg-white rounded-2xl p-6 border border-neutral-200 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold text-neutral-700">Overall Progress</span>
              <span className="text-sm font-bold text-primary-600">{dashboardData.completedModules.length}/12 Modules</span>
            </div>
            <div className="relative w-full bg-neutral-200 rounded-full h-4 overflow-hidden">
              <div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-success-500 to-success-400 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progressPercent}%` }}
              >
                {progressPercent > 0 && (
                  <div className="absolute right-2 top-1/2 -translate-y-1/2">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid - Headspace inspired cards */}
        <div className="grid sm:grid-cols-3 gap-5 mb-10">
          <div className="bg-gradient-to-br from-primary-50 to-white p-6 rounded-2xl border border-primary-200 shadow-sm">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-primary-600 rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/30">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div>
                <div className="text-sm text-neutral-600 font-medium">Current</div>
                <div className="text-2xl font-bold text-neutral-900">Module {dashboardData.currentModule}</div>
              </div>
            </div>
            <div className="text-sm text-neutral-600">Kick Off & Assessment</div>
          </div>

          <div className="bg-gradient-to-br from-success-50 to-white p-6 rounded-2xl border border-success-200 shadow-sm">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-success-500 rounded-xl flex items-center justify-center shadow-lg shadow-success-500/30">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <div className="text-sm text-neutral-600 font-medium">Completed</div>
                <div className="text-2xl font-bold text-neutral-900">{dashboardData.completedModules.length}/12</div>
              </div>
            </div>
            <div className="text-sm text-neutral-600">{Math.round(progressPercent)}% Complete</div>
          </div>

          <div className="bg-gradient-to-br from-calm-50 to-white p-6 rounded-2xl border border-calm-200 shadow-sm">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-calm-500 rounded-xl flex items-center justify-center shadow-lg shadow-calm-500/30">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div>
                <div className="text-sm text-neutral-600 font-medium">Team Size</div>
                <div className="text-2xl font-bold text-neutral-900">{dashboardData.teamMembers}</div>
              </div>
            </div>
            <div className="text-sm text-neutral-600">Members Training</div>
          </div>
        </div>

        {/* Baseline Metrics - Linear style */}
        <div className="bg-white rounded-2xl p-8 mb-8 border border-neutral-200 shadow-sm">
          <h2 className="text-2xl font-bold text-neutral-900 mb-6">Baseline Metrics</h2>
          <div className="space-y-5">
            <MetricBar label="Team Stress Level" value={dashboardData.baselineData.teamStressLevel} max={10} color="warm" />
            <MetricBar label="Individual Stress" value={dashboardData.baselineData.individualStressLevel} max={10} color="warm" />
            <MetricBar label="Productivity" value={dashboardData.baselineData.productivity} max={10} color="primary" />
            <MetricBar label="Communication" value={dashboardData.baselineData.communication} max={10} color="calm" />
            <MetricBar label="Work-Life Balance" value={dashboardData.baselineData.workLifeBalance} max={10} color="success" />
          </div>
        </div>

        {/* Goals */}
        <div className="bg-white rounded-2xl p-8 mb-8 border border-neutral-200 shadow-sm">
          <h2 className="text-2xl font-bold text-neutral-900 mb-6">Your Goals</h2>
          <div className="space-y-4">
            <GoalCard icon="🎯" title="Stress Reduction" description={dashboardData.goals.stressReduction} />
            <GoalCard icon="📈" title="Productivity" description={dashboardData.goals.productivityGoal} />
            <GoalCard icon="💬" title="Communication" description={dashboardData.goals.communicationGoal} />
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-gradient-to-br from-primary-50 via-white to-calm-50 rounded-2xl p-8 border border-primary-200 shadow-sm">
          <h2 className="text-2xl font-bold text-neutral-900 mb-6">Next Steps</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-6 bg-white rounded-xl border border-neutral-200">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-neutral-200 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-neutral-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <div className="font-bold text-neutral-900">Module 2: Mindfulness</div>
                  <div className="text-sm text-neutral-600">Coming Soon</div>
                </div>
              </div>
              <Button variant="secondary" disabled>Locked</Button>
            </div>

            <div className="flex items-center justify-between p-6 bg-white rounded-xl border-2 border-primary-500 shadow-lg shadow-primary-500/20">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary-600 rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/30">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </div>
                <div>
                  <div className="font-bold text-neutral-900">Review Module 1</div>
                  <div className="text-sm text-neutral-600">Revisit your baseline and goals</div>
                </div>
              </div>
              <Link href="/module/1">
                <Button variant="primary">Review</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricBar({ label, value, max, color }: { label: string; value: number; max: number; color: 'warm' | 'primary' | 'calm' | 'success'; }) {
  const percentage = (value / max) * 100;
  const colorClasses: Record<string, string> = {
    warm: 'bg-warm-500',
    primary: 'bg-primary-600',
    calm: 'bg-calm-500',
    success: 'bg-success-500',
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <span className="font-semibold text-neutral-900">{label}</span>
        <span className="text-sm font-bold text-neutral-600">{value}/{max}</span>
      </div>
      <div className="relative w-full bg-neutral-200 rounded-full h-3 overflow-hidden">
        <div className={`h-full rounded-full transition-all duration-500 ${colorClasses[color]}`} style={{ width: `${percentage}%` }} />
      </div>
    </div>
  );
}

function GoalCard({ icon, title, description }: { icon: string; title: string; description: string; }) {
  return (
    <div className="flex items-start gap-4 p-5 bg-neutral-50 rounded-xl border border-neutral-200">
      <div className="text-2xl">{icon}</div>
      <div className="flex-1">
        <div className="font-semibold text-neutral-900 mb-1">{title}</div>
        <div className="text-sm text-neutral-600">{description}</div>
      </div>
    </div>
  );
}
