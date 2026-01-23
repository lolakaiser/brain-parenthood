"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getBaseline, getGoals, getProgress } from "@/lib/storage";
import { ModuleCardCompact } from "@/components/ui/ModuleCard";

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

  const progressPercent = Math.round((dashboardData.completedModules.length / 12) * 100);

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Header */}
        <header className="mb-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-neutral-700 mb-6 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>

          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-success-500 to-success-700 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h1 className="font-display text-2xl font-bold text-neutral-800">
              Progress Dashboard
            </h1>
          </div>
          <p className="text-neutral-500 text-sm ml-[52px]">
            Track your team's resilience journey
          </p>
        </header>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <StatCard
            label="Progress"
            value={`${progressPercent}%`}
            subtext="of program"
            color="primary"
          />
          <StatCard
            label="Completed"
            value={dashboardData.completedModules.length.toString()}
            subtext="modules"
            color="success"
          />
          <StatCard
            label="Current"
            value={`Week ${dashboardData.currentModule}`}
            subtext="in progress"
            color="secondary"
          />
          <StatCard
            label="Team Size"
            value={dashboardData.teamMembers > 0 ? dashboardData.teamMembers.toString() : "—"}
            subtext="members"
            color="neutral"
          />
        </div>

        {/* Progress Overview */}
        <div className="bg-white rounded-2xl border border-neutral-200 p-6 mb-10 shadow-card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-semibold text-neutral-900">Program Progress</h2>
            <span className="text-sm text-neutral-500">{dashboardData.completedModules.length}/12 complete</span>
          </div>
          <div className="flex gap-1 mb-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className={`h-3 flex-1 rounded-full transition-colors ${
                  dashboardData.completedModules.includes(i + 1)
                    ? "bg-success-500"
                    : i + 1 === dashboardData.currentModule
                    ? "bg-primary-400"
                    : "bg-neutral-100"
                }`}
              />
            ))}
          </div>
          <div className="grid grid-cols-4 gap-4 pt-4 border-t border-neutral-100">
            {phases.map((phase, i) => (
              <div key={i} className="text-center">
                <p className="text-xs text-neutral-400 mb-1">{phase.weeks}</p>
                <p className="text-sm font-medium text-neutral-700">{phase.title}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-6 mb-10">
          {/* Baseline Metrics */}
          <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-card">
            <div className="flex items-center gap-2 mb-5">
              <svg className="w-5 h-5 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <h2 className="font-display font-semibold text-neutral-900">Baseline Metrics</h2>
            </div>
            <p className="text-sm text-neutral-500 mb-5">Your starting point for tracking progress</p>
            <div className="space-y-4">
              <MetricBar label="Team Stress" value={dashboardData.baselineData.teamStressLevel} max={10} color="secondary" />
              <MetricBar label="Individual Stress" value={dashboardData.baselineData.individualStressLevel} max={10} color="secondary" />
              <MetricBar label="Productivity" value={dashboardData.baselineData.productivity} max={10} color="primary" />
              <MetricBar label="Communication" value={dashboardData.baselineData.communication} max={10} color="primary" />
              <MetricBar label="Work-Life Balance" value={dashboardData.baselineData.workLifeBalance} max={10} color="success" />
            </div>
          </div>

          {/* Goals */}
          <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-card">
            <div className="flex items-center gap-2 mb-5">
              <svg className="w-5 h-5 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
              <h2 className="font-display font-semibold text-neutral-900">Your Goals</h2>
            </div>
            <div className="space-y-4">
              <GoalCard
                icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>}
                title="Stress Reduction"
                description={dashboardData.goals.stressReduction}
                color="secondary"
              />
              <GoalCard
                icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>}
                title="Productivity"
                description={dashboardData.goals.productivityGoal}
                color="primary"
              />
              <GoalCard
                icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>}
                title="Communication"
                description={dashboardData.goals.communicationGoal}
                color="success"
              />
            </div>
          </div>
        </div>

        {/* Module Grid */}
        <section className="mb-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-lg font-semibold text-neutral-800">All Modules</h2>
            <Link href="/modules" className="text-sm text-primary-600 hover:text-primary-700 font-medium">
              View all →
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {allModules.map((module, index) => {
              const moduleNum = index + 1;
              const isCompleted = dashboardData.completedModules.includes(moduleNum);
              const isCurrent = moduleNum === dashboardData.currentModule;
              const isAvailable = moduleNum <= dashboardData.currentModule;

              let status: "completed" | "in-progress" | "available" | "locked";
              if (isCompleted) status = "completed";
              else if (isCurrent) status = "in-progress";
              else if (isAvailable) status = "available";
              else status = "locked";

              let progress = 0;
              if (isCompleted) progress = 100;
              else if (isCurrent) progress = 25;

              return (
                <ModuleCardCompact
                  key={moduleNum}
                  moduleNumber={moduleNum}
                  title={module.title}
                  subtitle={module.subtitle}
                  status={status}
                  progress={progress}
                  href={isAvailable ? `/module/${moduleNum}` : undefined}
                />
              );
            })}
          </div>
        </section>

        {/* Quick Actions */}
        <section className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-card">
          <h2 className="font-display font-semibold text-neutral-900 mb-4">Quick Actions</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <Link
              href={`/module/${dashboardData.currentModule}`}
              className="flex items-center gap-4 p-4 rounded-xl border border-primary-200 bg-primary-50 hover:bg-primary-100 transition-colors"
            >
              <div className="w-10 h-10 rounded-lg bg-primary-600 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="font-medium text-neutral-900">Continue Week {dashboardData.currentModule}</p>
                <p className="text-sm text-neutral-500">Pick up where you left off</p>
              </div>
            </Link>

            <Link
              href="/module/1"
              className="flex items-center gap-4 p-4 rounded-xl border border-neutral-200 bg-neutral-50 hover:bg-neutral-100 transition-colors"
            >
              <div className="w-10 h-10 rounded-lg bg-neutral-600 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <div>
                <p className="font-medium text-neutral-900">Review Baseline</p>
                <p className="text-sm text-neutral-500">Revisit your starting point</p>
              </div>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

function StatCard({ label, value, subtext, color }: { label: string; value: string; subtext: string; color: "primary" | "secondary" | "success" | "neutral" }) {
  const colorStyles = {
    primary: "border-primary-200 bg-primary-50",
    secondary: "border-secondary-200 bg-secondary-50",
    success: "border-success-200 bg-success-50",
    neutral: "border-neutral-200 bg-neutral-50",
  };

  const valueColors = {
    primary: "text-primary-600",
    secondary: "text-secondary-600",
    success: "text-success-600",
    neutral: "text-neutral-600",
  };

  return (
    <div className={`rounded-2xl border p-4 ${colorStyles[color]}`}>
      <p className="text-xs text-neutral-500 mb-1">{label}</p>
      <p className={`text-2xl font-bold ${valueColors[color]}`}>{value}</p>
      <p className="text-xs text-neutral-400">{subtext}</p>
    </div>
  );
}

function MetricBar({ label, value, max, color }: { label: string; value: number; max: number; color: 'secondary' | 'primary' | 'success' }) {
  const percentage = (value / max) * 100;
  const colorClasses = {
    secondary: 'bg-secondary-500',
    primary: 'bg-primary-500',
    success: 'bg-success-500',
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-sm font-medium text-neutral-700">{label}</span>
        <span className="text-xs text-neutral-500">{value}/{max}</span>
      </div>
      <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
        <div className={`h-full rounded-full transition-all duration-500 ${colorClasses[color]}`} style={{ width: `${percentage}%` }} />
      </div>
    </div>
  );
}

function GoalCard({ icon, title, description, color }: { icon: React.ReactNode; title: string; description: string; color: "primary" | "secondary" | "success" }) {
  const colorStyles = {
    primary: "bg-primary-100 text-primary-600",
    secondary: "bg-secondary-100 text-secondary-600",
    success: "bg-success-100 text-success-600",
  };

  return (
    <div className="flex items-start gap-3 p-4 rounded-xl bg-neutral-50 border border-neutral-100">
      <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${colorStyles[color]}`}>
        {icon}
      </div>
      <div className="min-w-0">
        <p className="font-medium text-neutral-900 text-sm mb-0.5">{title}</p>
        <p className="text-xs text-neutral-500 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

const phases = [
  { weeks: "Week 1-3", title: "Foundations" },
  { weeks: "Week 4-6", title: "Regulation" },
  { weeks: "Week 7-9", title: "Resilience" },
  { weeks: "Week 10-12", title: "Integration" },
];

const allModules = [
  { title: "Kick Off", subtitle: "Baseline & Goals" },
  { title: "Mindfulness", subtitle: "Focus & Clarity" },
  { title: "Awareness", subtitle: "Self-Knowledge" },
  { title: "Regulation", subtitle: "Emotional Balance" },
  { title: "Boundaries", subtitle: "Work-Life Balance" },
  { title: "Communication", subtitle: "Team Connection" },
  { title: "Resilience", subtitle: "Stress Response" },
  { title: "Adaptation", subtitle: "Change Skills" },
  { title: "Innovation", subtitle: "Creative Thinking" },
  { title: "Leadership", subtitle: "Empowered Teams" },
  { title: "Integration", subtitle: "Daily Practice" },
  { title: "Completion", subtitle: "Sustaining Growth" },
];
