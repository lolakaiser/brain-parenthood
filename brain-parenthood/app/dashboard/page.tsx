"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getBaseline, getGoals, getProgress } from "@/lib/storage";
import Button from "@/components/ui/Button";
import ProgressBar from "@/components/ui/ProgressBar";
import Breadcrumb from "@/components/ui/Breadcrumb";

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
    <div className="min-h-screen bg-[#fdfcfb]">
      <div className="app-container">
        {/* Breadcrumb for orientation */}
        <div className="mb-6">
          <Breadcrumb items={[
            { label: 'Home', href: '/' },
            { label: 'Dashboard' }
          ]} />
        </div>

        {/* Header with team progress indicator */}
        <div className="mb-10 animate-fade-in">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-8">
            <div>
              <h1 className="font-display text-display-2 text-neutral-800 mb-2">Team Progress</h1>
              <p className="text-body-lg text-neutral-600">Your collective resilience journey</p>
            </div>
            <div className="flex items-center gap-3 bg-white px-6 py-4 rounded-xl border-2 border-success-200 shadow-sm">
              <div className="w-12 h-12 bg-success-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-success-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <div className="font-display text-[28px] font-bold text-success-600">{dashboardData.completedModules.length}</div>
                <div className="text-caption text-neutral-600 font-medium uppercase tracking-wide">Modules Complete</div>
              </div>
            </div>
          </div>

          {/* Progress bar with team context */}
          <div className="bg-white rounded-xl p-6 border-2 border-neutral-200 shadow-sm">
            <ProgressBar
              value={dashboardData.completedModules.length}
              max={12}
              showPercentage
              label="Overall Program Progress"
              variant="gradient"
              size="lg"
            />
            <p className="text-body-sm text-neutral-500 mt-3 text-center">
              {dashboardData.teamMembers > 0 && `Your team of ${dashboardData.teamMembers} is building resilience together`}
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-3 gap-5 mb-10 animate-slide-up">
          <div className="bg-white p-6 rounded-xl border-2 border-primary-200 hover:border-primary-400 transition-all duration-200">
            <div className="flex items-center gap-4 mb-3">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div>
                <div className="text-caption text-neutral-600 font-medium uppercase tracking-wide">Current</div>
                <div className="font-display text-[24px] font-bold text-neutral-800">Module {dashboardData.currentModule}</div>
              </div>
            </div>
            <div className="text-body-sm text-neutral-600">Kick Off & Assessment</div>
          </div>

          <div className="bg-white p-6 rounded-xl border-2 border-success-200 hover:border-success-400 transition-all duration-200">
            <div className="flex items-center gap-4 mb-3">
              <div className="w-12 h-12 bg-success-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-success-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <div className="text-caption text-neutral-600 font-medium uppercase tracking-wide">Progress</div>
                <div className="font-display text-[24px] font-bold text-neutral-800">{dashboardData.completedModules.length} of 12</div>
              </div>
            </div>
            <div className="text-body-sm text-neutral-600">{Math.round(progressPercent)}% Complete</div>
          </div>

          <div className="bg-white p-6 rounded-xl border-2 border-secondary-200 hover:border-secondary-400 transition-all duration-200">
            <div className="flex items-center gap-4 mb-3">
              <div className="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-secondary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div>
                <div className="text-caption text-neutral-600 font-medium uppercase tracking-wide">Team</div>
                <div className="font-display text-[24px] font-bold text-neutral-800">{dashboardData.teamMembers || '—'}</div>
              </div>
            </div>
            <div className="text-body-sm text-neutral-600">Members Together</div>
          </div>
        </div>

        {/* Baseline Metrics - Non-judgmental tracking */}
        <div className="bg-white rounded-xl p-8 mb-8 border-2 border-neutral-200 shadow-sm">
          <div className="mb-6">
            <h2 className="font-display text-heading-2 text-neutral-800 mb-2">Your Baseline</h2>
            <p className="text-body text-neutral-600">Starting point for tracking change over time. No scores are "good" or "bad" — this is just where you are.</p>
          </div>
          <div className="space-y-5">
            <MetricBar label="Team Stress" value={dashboardData.baselineData.teamStressLevel} max={10} color="secondary" />
            <MetricBar label="Individual Stress" value={dashboardData.baselineData.individualStressLevel} max={10} color="secondary" />
            <MetricBar label="Productivity Feeling" value={dashboardData.baselineData.productivity} max={10} color="primary" />
            <MetricBar label="Communication Quality" value={dashboardData.baselineData.communication} max={10} color="primary" />
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

function MetricBar({ label, value, max, color }: { label: string; value: number; max: number; color: 'secondary' | 'primary' | 'success'; }) {
  const percentage = (value / max) * 100;
  const colorClasses: Record<string, string> = {
    secondary: 'bg-secondary-500',
    primary: 'bg-primary-500',
    success: 'bg-success-500',
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <span className="font-medium text-neutral-800">{label}</span>
        <span className="text-body-sm text-neutral-600">{value} of {max}</span>
      </div>
      <div className="relative w-full bg-neutral-200 rounded-full h-2.5 overflow-hidden">
        <div className={`h-full rounded-full transition-all duration-300 ${colorClasses[color]}`} style={{ width: `${percentage}%` }} />
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
