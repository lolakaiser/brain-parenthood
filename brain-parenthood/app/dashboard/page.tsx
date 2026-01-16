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
            <div className="flex items-center gap-3 bg-white px-6 py-4 rounded-2xl border-2 border-success-200 shadow-sm">
              <div className="w-12 h-12 bg-success-100 rounded-2xl flex items-center justify-center">
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
          <div className="bg-white rounded-3xl p-7 border-2 border-neutral-200 shadow-sm">
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
          <div className="bg-white p-7 rounded-3xl border-2 border-primary-200 hover:border-primary-400 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-center gap-4 mb-3">
              <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center shadow-lg">
                <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
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

          <div className="bg-white p-7 rounded-3xl border-2 border-success-200 hover:border-success-400 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-center gap-4 mb-3">
              <div className="w-14 h-14 bg-gradient-to-br from-success-500 to-success-600 rounded-2xl flex items-center justify-center shadow-lg">
                <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
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

          <div className="bg-white p-7 rounded-3xl border-2 border-secondary-200 hover:border-secondary-400 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-center gap-4 mb-3">
              <div className="w-14 h-14 bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-2xl flex items-center justify-center shadow-lg">
                <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
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
        <div className="bg-white rounded-3xl p-8 mb-8 border-2 border-neutral-200 shadow-sm">
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
        <div className="bg-white rounded-3xl p-8 mb-8 border-2 border-neutral-200 shadow-sm">
          <h2 className="text-2xl font-bold text-neutral-900 mb-6">Your Goals</h2>
          <div className="space-y-4">
            <GoalCard icon="🎯" title="Stress Reduction" description={dashboardData.goals.stressReduction} />
            <GoalCard icon="📈" title="Productivity" description={dashboardData.goals.productivityGoal} />
            <GoalCard icon="💬" title="Communication" description={dashboardData.goals.communicationGoal} />
          </div>
        </div>

        {/* All Modules - App-like Grid */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-neutral-900 mb-2">Training Modules</h2>
          <p className="text-neutral-600 mb-8">Your 12-week journey to workplace resilience</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {modules.map((module, index) => {
              const isAvailable = index === 0;
              const isCompleted = dashboardData.completedModules.includes(index + 1);
              return (
                <Link
                  key={index}
                  href={isAvailable ? `/module/${index + 1}` : "#"}
                  className={`group p-6 rounded-3xl border-2 transition-all duration-300 ${
                    isCompleted
                      ? "bg-success-50 border-success-300 hover:border-success-500 hover:shadow-lg hover:-translate-y-1 cursor-pointer"
                      : isAvailable
                      ? "bg-white border-primary-300 hover:border-primary-500 hover:shadow-lg hover:-translate-y-1 cursor-pointer"
                      : "bg-neutral-50 border-neutral-200 opacity-60 cursor-not-allowed"
                  }`}
                >
                  <div className="flex flex-col items-center text-center">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-white font-bold text-2xl mb-4 shadow-lg transition-transform duration-300 group-hover:scale-110 ${
                      isCompleted
                        ? "bg-success-500"
                        : isAvailable
                        ? "bg-primary-600"
                        : "bg-neutral-300"
                    }`}>
                      {isCompleted ? (
                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        index + 1
                      )}
                    </div>
                    <h3 className="font-bold text-neutral-900 text-sm mb-1">
                      {module.title}
                    </h3>
                    <p className="text-xs text-neutral-500 leading-snug">
                      {module.subtitle}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-gradient-to-br from-primary-50 via-white to-calm-50 rounded-3xl p-8 border-2 border-primary-200 shadow-sm">
          <h2 className="text-2xl font-bold text-neutral-900 mb-6">Quick Actions</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-6 bg-white rounded-2xl border-2 border-neutral-200">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-neutral-200 rounded-2xl flex items-center justify-center">
                  <svg className="w-7 h-7 text-neutral-400" fill="currentColor" viewBox="0 0 20 20">
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

            <div className="flex items-center justify-between p-6 bg-white rounded-2xl border-2 border-primary-500 shadow-xl shadow-primary-500/20 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-primary-600 rounded-2xl flex items-center justify-center shadow-lg shadow-primary-500/30">
                  <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
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
    <div className="flex items-start gap-4 p-6 bg-neutral-50 rounded-2xl border-2 border-neutral-200 hover:border-primary-300 transition-all duration-200">
      <div className="text-3xl">{icon}</div>
      <div className="flex-1">
        <div className="font-semibold text-neutral-900 mb-1">{title}</div>
        <div className="text-sm text-neutral-600">{description}</div>
      </div>
    </div>
  );
}

const modules = [
  { title: "Kick Off", subtitle: "Baseline & Goals" },
  { title: "Mindfulness", subtitle: "Focus & Clarity" },
  { title: "Resilience", subtitle: "Stress Management" },
  { title: "Communication", subtitle: "Team Connection" },
  { title: "Boundaries", subtitle: "Work-Life Balance" },
  { title: "Innovation", subtitle: "Creative Thinking" },
  { title: "Conflict", subtitle: "Healthy Resolution" },
  { title: "Leadership", subtitle: "Empowered Teams" },
  { title: "Adaptation", subtitle: "Change Management" },
  { title: "Integration", subtitle: "Daily Practice" },
  { title: "Measurement", subtitle: "Progress Review" },
  { title: "Completion", subtitle: "Sustaining Growth" }
];
