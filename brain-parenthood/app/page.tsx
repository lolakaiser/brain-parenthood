"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ModuleCard from "@/components/ui/ModuleCard";
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
    <div className="min-h-screen bg-neutral-50">
      {/* Page Container with generous padding */}
      <div className="max-w-5xl mx-auto px-8 py-12">

        {/* Header Section */}
        <header className="mb-12">
          <div className="flex items-center gap-4 mb-3">
            <div className="w-12 h-12 rounded-xl bg-primary-600 flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h1 className="font-display text-2xl font-bold text-neutral-900">
                Resilience Program
              </h1>
              <p className="text-sm text-neutral-500">
                12-week workplace resilience training
              </p>
            </div>
          </div>
        </header>

        {/* Progress Overview Card */}
        <div className="bg-white rounded-2xl border border-neutral-200 p-8 mb-12 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-display font-semibold text-lg text-neutral-900 mb-1">
                Your Progress
              </h2>
              <p className="text-sm text-neutral-500">
                {completedModules.length} of 12 modules completed
              </p>
            </div>
            <div className="text-right">
              <span className="text-4xl font-bold text-primary-600">{overallProgress}%</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="h-2 bg-neutral-100 rounded-full overflow-hidden mb-6">
            <div
              className="h-full bg-primary-500 rounded-full transition-all duration-500"
              style={{ width: `${overallProgress}%` }}
            />
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-4">
            <Link
              href={`/module/${currentModule}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary-600 text-white text-sm font-medium rounded-lg hover:bg-primary-700 transition-colors"
            >
              Continue Week {currentModule}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-neutral-700 text-sm font-medium rounded-lg border border-neutral-200 hover:bg-neutral-50 hover:border-neutral-300 transition-colors"
            >
              View Dashboard
            </Link>
          </div>
        </div>

        {/* Modules Section */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-display font-semibold text-xl text-neutral-900 mb-1">
                All Modules
              </h2>
              <p className="text-sm text-neutral-500">
                Complete each module to progress through the program
              </p>
            </div>
            <Link
              href="/modules"
              className="text-sm text-primary-600 hover:text-primary-700 font-medium"
            >
              View all
            </Link>
          </div>

          {/* 2-Column Module Grid - Cards never touch */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

        {/* Footer CTA */}
        <div className="mt-16 pt-8 border-t border-neutral-200 text-center">
          <p className="text-sm text-neutral-500 mb-4">
            Ready to continue building workplace resilience?
          </p>
          <Link
            href={`/module/${currentModule}`}
            className="inline-flex items-center gap-2 px-6 py-3 bg-neutral-900 text-white text-sm font-medium rounded-lg hover:bg-neutral-800 transition-colors"
          >
            Start Week {currentModule}
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}

const allModules = [
  {
    title: "Kick Off",
    subtitle: "Baseline & Goals",
    description: "Establish your baseline metrics and set team goals for the program.",
  },
  {
    title: "Mindfulness",
    subtitle: "Focus & Clarity",
    description: "Build mindfulness skills to improve focus and stress management.",
  },
  {
    title: "Self-Awareness",
    subtitle: "Self-Knowledge",
    description: "Develop deeper understanding of your patterns and triggers.",
  },
  {
    title: "Emotional Regulation",
    subtitle: "Emotional Balance",
    description: "Learn techniques to manage emotional responses effectively.",
  },
  {
    title: "Boundaries",
    subtitle: "Work-Life Balance",
    description: "Establish healthy boundaries between work and personal life.",
  },
  {
    title: "Communication",
    subtitle: "Team Connection",
    description: "Practice active listening and constructive feedback delivery.",
  },
  {
    title: "Resilience",
    subtitle: "Stress Response",
    description: "Develop strategies to bounce back from setbacks.",
  },
  {
    title: "Adaptation",
    subtitle: "Change Skills",
    description: "Build flexibility and adaptability in changing environments.",
  },
  {
    title: "Innovation",
    subtitle: "Creative Thinking",
    description: "Apply learned skills through creative problem-solving exercises.",
  },
  {
    title: "Leadership",
    subtitle: "Empowered Teams",
    description: "Develop leadership skills for building empowered teams.",
  },
  {
    title: "Integration",
    subtitle: "Daily Practice",
    description: "Integrate resilience practices into your daily routine.",
  },
  {
    title: "Completion",
    subtitle: "Sustaining Growth",
    description: "Celebrate achievements and create your ongoing resilience plan.",
  },
];
