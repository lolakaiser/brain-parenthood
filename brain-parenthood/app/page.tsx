"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ModuleCardCompact } from "@/components/ui/ModuleCard";
import { getProgress } from "@/lib/storage";

export default function Home() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [completedModules, setCompletedModules] = useState<number[]>([]);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    const progress = getProgress();
    if (progress?.completedModules) {
      setCompletedModules(progress.completedModules);
    }
  }, []);

  if (!isAuthenticated) {
    return null;
  }

  const currentModule = completedModules.length + 1;
  const overallProgress = Math.round((completedModules.length / 12) * 100);

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <div className="max-w-6xl mx-auto px-6 py-10">

        {/* Dashboard Header - Notion Style */}
        <header className="mb-10 animate-fade-in">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h1 className="font-display text-2xl font-bold text-neutral-800">
              Resilience Program
            </h1>
          </div>
          <p className="text-neutral-500 text-sm ml-[52px]">
            Your 12-week journey to workplace wellbeing
          </p>
        </header>

        {/* Quick Actions Bar */}
        <div className="flex flex-wrap items-center gap-3 mb-8">
          <Link
            href={`/module/${currentModule}`}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary-600 text-white text-sm font-medium rounded-xl hover:bg-primary-700 transition-colors shadow-sm"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Continue Week {currentModule}
          </Link>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-white text-neutral-700 text-sm font-medium rounded-xl border border-neutral-200 hover:bg-neutral-50 hover:border-neutral-300 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            View Progress
          </Link>
        </div>

        {/* Overall Progress Card - Notion Style */}
        <div className="bg-white rounded-2xl border border-neutral-200 p-6 mb-10 shadow-card hover:shadow-card-hover transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-display font-semibold text-neutral-900 mb-1">Your Journey</h2>
              <p className="text-sm text-neutral-500">{completedModules.length} of 12 modules completed</p>
            </div>
            <div className="text-right">
              <span className="text-3xl font-bold text-primary-600">{overallProgress}%</span>
              <p className="text-xs text-neutral-400">complete</p>
            </div>
          </div>

          {/* Segmented Progress Bar */}
          <div className="flex gap-1">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className={`h-2 flex-1 rounded-full transition-colors ${
                  completedModules.includes(i + 1)
                    ? "bg-success-500"
                    : i + 1 === currentModule
                    ? "bg-primary-400"
                    : "bg-neutral-100"
                }`}
              />
            ))}
          </div>

          {/* Phase Indicators */}
          <div className="grid grid-cols-4 gap-4 mt-6 pt-4 border-t border-neutral-100">
            {phases.map((phase, i) => (
              <div key={i} className="text-center">
                <p className="text-xs text-neutral-400 mb-1">{phase.weeks}</p>
                <p className="text-sm font-medium text-neutral-700">{phase.title}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Module Grid - App Launcher Style */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-lg font-semibold text-neutral-800">All Modules</h2>
            <span className="text-sm text-neutral-400">{completedModules.length}/12 complete</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {allModules.map((module, index) => {
              const moduleNum = index + 1;
              const isCompleted = completedModules.includes(moduleNum);
              const isCurrent = moduleNum === currentModule;
              const isAvailable = moduleNum <= currentModule;

              let status: "completed" | "in-progress" | "available" | "locked";
              if (isCompleted) status = "completed";
              else if (isCurrent) status = "in-progress";
              else if (isAvailable) status = "available";
              else status = "locked";

              // Calculate individual module progress
              let progress = 0;
              if (isCompleted) progress = 100;
              else if (isCurrent) progress = 25; // Started but not complete

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

        {/* Info Cards Row - Notion Style */}
        <section className="grid md:grid-cols-3 gap-4 mb-12">
          <InfoCard
            icon={
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            }
            title="Evidence-Based"
            description="Techniques from cognitive science and mindfulness research"
            color="primary"
          />
          <InfoCard
            icon={
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            }
            title="Team Focused"
            description="Designed for real workplace teams, not just individuals"
            color="secondary"
          />
          <InfoCard
            icon={
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
            title="10-15 min/week"
            description="Fits into actual work schedules without overwhelming"
            color="success"
          />
        </section>

        {/* Bottom CTA */}
        <footer className="text-center py-8 border-t border-neutral-100">
          <p className="text-sm text-neutral-500 mb-4">Ready to continue your resilience journey?</p>
          <Link
            href={`/module/${currentModule}`}
            className="inline-flex items-center gap-2 px-6 py-3 bg-neutral-900 text-white text-sm font-medium rounded-xl hover:bg-neutral-800 transition-colors"
          >
            Start Week {currentModule}
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </footer>
      </div>
    </div>
  );
}

// Info Card Component
function InfoCard({
  icon,
  title,
  description,
  color,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: "primary" | "secondary" | "success";
}) {
  const colorStyles = {
    primary: "bg-primary-50 text-primary-600",
    secondary: "bg-secondary-50 text-secondary-600",
    success: "bg-success-50 text-success-600",
  };

  return (
    <div className="bg-white rounded-2xl border border-neutral-200 p-5 hover:shadow-card-hover transition-shadow">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${colorStyles[color]}`}>
        {icon}
      </div>
      <h3 className="font-medium text-neutral-900 mb-1">{title}</h3>
      <p className="text-sm text-neutral-500 leading-relaxed">{description}</p>
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
