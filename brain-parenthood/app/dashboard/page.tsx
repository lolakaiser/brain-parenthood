"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import AppLayout from "@/components/AppLayout";
import { ModuleListItem } from "@/components/ui/ModuleCard";
import { getBaseline, getGoals, getProgress } from "@/lib/storage";

export default function DashboardPage() {
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

  const progressPercent = Math.round((dashboardData.completedModules.length / 12) * 100);

  // Right panel content
  const RightPanel = (
    <div className="space-y-6">
      {/* Goals Card */}
      <div className="bg-white rounded-2xl p-5 border border-gray-100">
        <h3 className="font-medium text-gray-900 mb-4">Your Goals</h3>
        <div className="space-y-3">
          <div className="p-3 rounded-xl bg-teal-50">
            <p className="text-xs text-teal-600 font-medium mb-1">Stress Reduction</p>
            <p className="text-sm text-gray-700">{dashboardData.goals.stressReduction}</p>
          </div>
          <div className="p-3 rounded-xl bg-blue-50">
            <p className="text-xs text-blue-600 font-medium mb-1">Productivity</p>
            <p className="text-sm text-gray-700">{dashboardData.goals.productivityGoal}</p>
          </div>
          <div className="p-3 rounded-xl bg-pink-50">
            <p className="text-xs text-pink-600 font-medium mb-1">Communication</p>
            <p className="text-sm text-gray-700">{dashboardData.goals.communicationGoal}</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl p-5 border border-gray-100">
        <h3 className="font-medium text-gray-900 mb-4">Quick actions</h3>
        <div className="space-y-2">
          <Link
            href={`/module/${dashboardData.currentModule}`}
            className="flex items-center gap-3 p-3 rounded-xl bg-blue-50 hover:bg-blue-100 transition-colors"
          >
            <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              </svg>
            </div>
            <span className="text-sm font-medium text-gray-700">Continue Week {dashboardData.currentModule}</span>
          </Link>
          <Link
            href="/module/1"
            className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
          >
            <div className="w-8 h-8 rounded-lg bg-gray-500 flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </div>
            <span className="text-sm font-medium text-gray-700">Review Baseline</span>
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <AppLayout rightPanel={RightPanel}>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Progress Dashboard</h1>
        <p className="text-gray-500">Track your team's resilience journey</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        <StatCard
          value={`${progressPercent}%`}
          label="Complete"
          color="teal"
        />
        <StatCard
          value={dashboardData.completedModules.length.toString()}
          label="Modules Done"
          color="blue"
        />
        <StatCard
          value={`Week ${dashboardData.currentModule}`}
          label="Current"
          color="pink"
        />
        <StatCard
          value={dashboardData.teamMembers > 0 ? dashboardData.teamMembers.toString() : "—"}
          label="Team Size"
          color="indigo"
        />
      </div>

      {/* Progress Bar */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 mb-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-gray-900">Program Progress</h2>
          <span className="text-sm text-gray-500">{dashboardData.completedModules.length}/12 modules</span>
        </div>
        <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-teal-500 to-blue-500 rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {/* Baseline Metrics */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100">
          <h2 className="font-semibold text-gray-900 mb-5">Baseline Metrics</h2>
          <div className="space-y-4">
            <MetricBar label="Team Stress" value={dashboardData.baselineData.teamStressLevel} max={10} color="pink" />
            <MetricBar label="Individual Stress" value={dashboardData.baselineData.individualStressLevel} max={10} color="pink" />
            <MetricBar label="Productivity" value={dashboardData.baselineData.productivity} max={10} color="teal" />
            <MetricBar label="Communication" value={dashboardData.baselineData.communication} max={10} color="blue" />
            <MetricBar label="Work-Life Balance" value={dashboardData.baselineData.workLifeBalance} max={10} color="indigo" />
          </div>
        </div>

        {/* Team Info */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100">
          <h2 className="font-semibold text-gray-900 mb-5">Team Overview</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50">
              <span className="text-sm text-gray-600">Team Members</span>
              <span className="font-semibold text-gray-900">{dashboardData.teamMembers || "—"}</span>
            </div>
            <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50">
              <span className="text-sm text-gray-600">Weeks Completed</span>
              <span className="font-semibold text-gray-900">{dashboardData.completedModules.length}</span>
            </div>
            <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50">
              <span className="text-sm text-gray-600">Current Week</span>
              <span className="font-semibold text-gray-900">Week {dashboardData.currentModule}</span>
            </div>
            <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50">
              <span className="text-sm text-gray-600">Remaining</span>
              <span className="font-semibold text-gray-900">{12 - dashboardData.completedModules.length} weeks</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <section>
        <h2 className="font-semibold text-gray-900 mb-5">Recent Modules</h2>
        <div className="space-y-3">
          {allModules.slice(0, 4).map((module, index) => {
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
              <ModuleListItem
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
    </AppLayout>
  );
}

function StatCard({ value, label, color }: { value: string; label: string; color: string }) {
  const colorMap: Record<string, string> = {
    teal: "from-teal-500 to-teal-600",
    blue: "from-blue-500 to-blue-600",
    pink: "from-pink-500 to-pink-600",
    indigo: "from-indigo-500 to-indigo-600",
  };

  return (
    <div className={`bg-gradient-to-br ${colorMap[color]} rounded-2xl p-5 text-white`}>
      <p className="text-2xl font-bold mb-1">{value}</p>
      <p className="text-white/70 text-sm">{label}</p>
    </div>
  );
}

function MetricBar({ label, value, max, color }: { label: string; value: number; max: number; color: string }) {
  const percentage = (value / max) * 100;
  const colorMap: Record<string, { bg: string; bar: string }> = {
    teal: { bg: "bg-teal-100", bar: "bg-teal-500" },
    blue: { bg: "bg-blue-100", bar: "bg-blue-500" },
    pink: { bg: "bg-pink-100", bar: "bg-pink-500" },
    indigo: { bg: "bg-indigo-100", bar: "bg-indigo-500" },
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-gray-700">{label}</span>
        <span className="text-xs text-gray-500">{value}/{max}</span>
      </div>
      <div className={`h-2 rounded-full overflow-hidden ${colorMap[color].bg}`}>
        <div
          className={`h-full rounded-full transition-all duration-500 ${colorMap[color].bar}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

const allModules = [
  { title: "Kick Off", subtitle: "Baseline & Goals" },
  { title: "Mindfulness", subtitle: "Focus & Clarity" },
  { title: "Self-Awareness", subtitle: "Self-Knowledge" },
  { title: "Emotional Regulation", subtitle: "Emotional Balance" },
  { title: "Boundaries", subtitle: "Work-Life Balance" },
  { title: "Communication", subtitle: "Team Connection" },
  { title: "Resilience", subtitle: "Stress Response" },
  { title: "Adaptation", subtitle: "Change Skills" },
  { title: "Innovation", subtitle: "Creative Thinking" },
  { title: "Leadership", subtitle: "Empowered Teams" },
  { title: "Integration", subtitle: "Daily Practice" },
  { title: "Completion", subtitle: "Sustaining Growth" },
];
