"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import AppLayout from "@/components/AppLayout";
import { ModuleCardColorful } from "@/components/ui/ModuleCard";
import ModuleCard, { ModuleListItem } from "@/components/ui/ModuleCard";
import { getProgress } from "@/lib/storage";

export default function Home() {
  const [completedModules, setCompletedModules] = useState<number[]>([]);

  useEffect(() => {
    const progress = getProgress();
    if (progress?.completedModules) {
      setCompletedModules(progress.completedModules);
    }
  }, []);

  const currentModule = completedModules.length + 1;
  const overallProgress = Math.round((completedModules.length / 12) * 100);

  // Right panel content
  const RightPanel = (
    <div className="space-y-6">
      {/* Continue Module CTA */}
      <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl p-6 text-white">
        <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mb-4">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="font-semibold text-lg mb-1">Continue Learning</h3>
        <p className="text-white/70 text-sm mb-4">Pick up where you left off</p>
        <Link
          href={`/module/${currentModule}`}
          className="inline-flex items-center gap-2 px-4 py-2 bg-white text-blue-600 text-sm font-medium rounded-lg hover:bg-white/90 transition-colors"
        >
          Week {currentModule}
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>

      {/* Storage/Progress Card */}
      <div className="bg-white rounded-2xl p-5 border border-gray-100">
        <div className="flex items-center justify-between mb-3">
          <span className="font-medium text-gray-900">Your progress</span>
          <span className="text-sm font-semibold text-teal-600">{100 - overallProgress}% left</span>
        </div>
        <p className="text-sm text-gray-500 mb-3">{completedModules.length} of 12 modules completed</p>
        <div className="h-2 bg-teal-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-teal-500 to-teal-600 rounded-full transition-all duration-500"
            style={{ width: `${overallProgress}%` }}
          />
        </div>
      </div>

      {/* Quick Access */}
      <div className="bg-white rounded-2xl p-5 border border-gray-100">
        <h3 className="font-medium text-gray-900 mb-4">Quick access</h3>
        <div className="space-y-2">
          <Link
            href="/dashboard"
            className="flex items-center gap-3 p-3 rounded-xl bg-teal-50 hover:bg-teal-100 transition-colors"
          >
            <div className="w-8 h-8 rounded-lg bg-teal-500 flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <span className="text-sm font-medium text-gray-700">View Dashboard</span>
          </Link>
          <Link
            href="/modules"
            className="flex items-center gap-3 p-3 rounded-xl bg-blue-50 hover:bg-blue-100 transition-colors"
          >
            <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <span className="text-sm font-medium text-gray-700">All Modules</span>
          </Link>
          <Link
            href="/module/1"
            className="flex items-center gap-3 p-3 rounded-xl bg-pink-50 hover:bg-pink-100 transition-colors"
          >
            <div className="w-8 h-8 rounded-lg bg-pink-500 flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </div>
            <span className="text-sm font-medium text-gray-700">Review Baseline</span>
          </Link>
        </div>
      </div>

      {/* Add more button */}
      <button className="w-full py-3 border-2 border-dashed border-gray-200 rounded-xl text-sm text-gray-400 hover:border-gray-300 hover:text-gray-500 transition-colors">
        + Add shortcut
      </button>
    </div>
  );

  return (
    <AppLayout rightPanel={RightPanel}>
      {/* Search Bar */}
      <div className="mb-8">
        <div className="relative">
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search modules..."
            className="w-full pl-12 pr-4 py-3 bg-white rounded-xl border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Categories Section - Colorful Cards */}
      <section className="mb-10">
        <h2 className="text-lg font-semibold text-gray-900 mb-5">Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((category, index) => {
            const isAvailable = index === 0 || completedModules.includes(index);
            return (
              <ModuleCardColorful
                key={index}
                moduleNumber={index + 1}
                title={category.title}
                subtitle={category.count}
                status={isAvailable ? (completedModules.includes(index + 1) ? "completed" : index === 0 ? "in-progress" : "available") : "locked"}
                href={isAvailable ? `/module/${index + 1}` : undefined}
              />
            );
          })}
        </div>
      </section>

      {/* Modules Section - White Cards */}
      <section className="mb-10">
        <h2 className="text-lg font-semibold text-gray-900 mb-5">Modules</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {allModules.slice(0, 8).map((module, index) => {
            const moduleNum = index + 1;
            const isCompleted = completedModules.includes(moduleNum);
            const isCurrent = moduleNum === currentModule;
            const isAvailable = moduleNum <= currentModule;

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
                status={status}
                progress={progress}
                href={isAvailable ? `/module/${moduleNum}` : undefined}
              />
            );
          })}
        </div>
      </section>

      {/* Recent Modules - List Style */}
      <section>
        <h2 className="text-lg font-semibold text-gray-900 mb-5">Recent modules</h2>
        <div className="space-y-3">
          {allModules.slice(0, 4).map((module, index) => {
            const moduleNum = index + 1;
            const isCompleted = completedModules.includes(moduleNum);
            const isCurrent = moduleNum === currentModule;
            const isAvailable = moduleNum <= currentModule;

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

const categories = [
  { title: "Foundations", count: "Weeks 1-3" },
  { title: "Regulation", count: "Weeks 4-6" },
  { title: "Resilience", count: "Weeks 7-9" },
  { title: "Integration", count: "Weeks 10-12" },
];

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
