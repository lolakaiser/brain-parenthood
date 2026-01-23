"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getBaseline, getGoals, getProgress } from "@/lib/storage";
import ModuleCard from "@/components/ui/ModuleCard";

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
    <div className="min-h-screen bg-neutral-50">
      {/* Page Container with generous padding */}
      <div className="max-w-5xl mx-auto px-8 py-12">

        {/* Back Navigation */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-neutral-700 mb-8 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Home
        </Link>

        {/* Header */}
        <header className="mb-12">
          <div className="flex items-center gap-4 mb-3">
            <div className="w-12 h-12 rounded-xl bg-success-600 flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div>
              <h1 className="font-display text-2xl font-bold text-neutral-900">
                Progress Dashboard
              </h1>
              <p className="text-sm text-neutral-500">
                Track your team's resilience journey
              </p>
            </div>
          </div>
        </header>

        {/* Stats Cards - 2x2 Grid */}
        <div className="grid grid-cols-2 gap-6 mb-12">
          <StatCard
            label="Progress"
            value={`${progressPercent}%`}
            subtext="of program complete"
            icon={
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            }
          />
          <StatCard
            label="Completed"
            value={dashboardData.completedModules.length.toString()}
            subtext="of 12 modules"
            icon={
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
          />
          <StatCard
            label="Current Week"
            value={`Week ${dashboardData.currentModule}`}
            subtext="in progress"
            icon={
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
          />
          <StatCard
            label="Team Size"
            value={dashboardData.teamMembers > 0 ? dashboardData.teamMembers.toString() : "—"}
            subtext="members"
            icon={
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            }
          />
        </div>

        {/* Baseline & Goals - 2 Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* Baseline Metrics Card */}
          <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-neutral-100 flex items-center justify-center">
                <svg className="w-5 h-5 text-neutral-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <h2 className="font-semibold text-neutral-900">Baseline Metrics</h2>
                <p className="text-xs text-neutral-500">Your starting point</p>
              </div>
            </div>
            <div className="space-y-4">
              <MetricBar label="Team Stress" value={dashboardData.baselineData.teamStressLevel} max={10} />
              <MetricBar label="Individual Stress" value={dashboardData.baselineData.individualStressLevel} max={10} />
              <MetricBar label="Productivity" value={dashboardData.baselineData.productivity} max={10} />
              <MetricBar label="Communication" value={dashboardData.baselineData.communication} max={10} />
              <MetricBar label="Work-Life Balance" value={dashboardData.baselineData.workLifeBalance} max={10} />
            </div>
          </div>

          {/* Goals Card */}
          <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-neutral-100 flex items-center justify-center">
                <svg className="w-5 h-5 text-neutral-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <div>
                <h2 className="font-semibold text-neutral-900">Your Goals</h2>
                <p className="text-xs text-neutral-500">What you're working toward</p>
              </div>
            </div>
            <div className="space-y-4">
              <GoalItem
                title="Stress Reduction"
                description={dashboardData.goals.stressReduction}
              />
              <GoalItem
                title="Productivity"
                description={dashboardData.goals.productivityGoal}
              />
              <GoalItem
                title="Communication"
                description={dashboardData.goals.communicationGoal}
              />
            </div>
          </div>
        </div>

        {/* Module Grid - 2 Column */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-display font-semibold text-xl text-neutral-900 mb-1">
                All Modules
              </h2>
              <p className="text-sm text-neutral-500">
                Your 12-week journey
              </p>
            </div>
            <Link
              href="/modules"
              className="text-sm text-primary-600 hover:text-primary-700 font-medium"
            >
              View all
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                <ModuleCard
                  key={moduleNum}
                  moduleNumber={moduleNum}
                  title={module.title}
                  subtitle={module.subtitle}
                  description={module.description}
                  status={status}
                  progress={progress}
                  href={isAvailable ? `/module/${moduleNum}` : undefined}
                />
              );
            })}
          </div>
        </section>

        {/* Quick Actions */}
        <section className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-sm">
          <h2 className="font-semibold text-neutral-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              className="flex items-center gap-4 p-4 rounded-xl border border-neutral-200 bg-white hover:bg-neutral-50 transition-colors"
            >
              <div className="w-10 h-10 rounded-lg bg-neutral-200 flex items-center justify-center">
                <svg className="w-5 h-5 text-neutral-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
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

function StatCard({
  label,
  value,
  subtext,
  icon,
}: {
  label: string;
  value: string;
  subtext: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-lg bg-neutral-100 flex items-center justify-center text-neutral-600">
          {icon}
        </div>
        <span className="text-sm font-medium text-neutral-500">{label}</span>
      </div>
      <p className="text-3xl font-bold text-neutral-900 mb-1">{value}</p>
      <p className="text-sm text-neutral-400">{subtext}</p>
    </div>
  );
}

function MetricBar({ label, value, max }: { label: string; value: number; max: number }) {
  const percentage = (value / max) * 100;

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-neutral-700">{label}</span>
        <span className="text-xs text-neutral-500">{value}/{max}</span>
      </div>
      <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-primary-500 rounded-full transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

function GoalItem({ title, description }: { title: string; description: string }) {
  return (
    <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-100">
      <p className="font-medium text-neutral-900 text-sm mb-1">{title}</p>
      <p className="text-xs text-neutral-500 leading-relaxed">{description}</p>
    </div>
  );
}

const allModules = [
  {
    title: "Kick Off",
    subtitle: "Baseline & Goals",
    description: "Establish your baseline metrics and set team goals.",
  },
  {
    title: "Mindfulness",
    subtitle: "Focus & Clarity",
    description: "Build mindfulness skills for better focus.",
  },
  {
    title: "Self-Awareness",
    subtitle: "Self-Knowledge",
    description: "Develop understanding of your patterns.",
  },
  {
    title: "Emotional Regulation",
    subtitle: "Emotional Balance",
    description: "Learn to manage emotional responses.",
  },
  {
    title: "Boundaries",
    subtitle: "Work-Life Balance",
    description: "Establish healthy work-life boundaries.",
  },
  {
    title: "Communication",
    subtitle: "Team Connection",
    description: "Practice active listening and feedback.",
  },
  {
    title: "Resilience",
    subtitle: "Stress Response",
    description: "Develop strategies to bounce back.",
  },
  {
    title: "Adaptation",
    subtitle: "Change Skills",
    description: "Build flexibility in changing environments.",
  },
  {
    title: "Innovation",
    subtitle: "Creative Thinking",
    description: "Apply skills through problem-solving.",
  },
  {
    title: "Leadership",
    subtitle: "Empowered Teams",
    description: "Develop skills for empowered teams.",
  },
  {
    title: "Integration",
    subtitle: "Daily Practice",
    description: "Integrate practices into daily routine.",
  },
  {
    title: "Completion",
    subtitle: "Sustaining Growth",
    description: "Create your ongoing resilience plan.",
  },
];
