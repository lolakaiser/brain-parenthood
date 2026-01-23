"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getProgress } from "@/lib/storage";
import ModuleCard from "@/components/ui/ModuleCard";

export default function ModulesPage() {
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
    setCompletedModules(progress.completedModules || []);
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

        {/* Back Navigation */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-neutral-700 mb-8 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Dashboard
        </Link>

        {/* Header */}
        <header className="mb-12">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="font-display text-3xl font-bold text-neutral-900 mb-2">
                All Modules
              </h1>
              <p className="text-neutral-500">
                Your complete 12-week resilience journey
              </p>
            </div>
            <div className="text-right">
              <span className="text-3xl font-bold text-primary-600">{overallProgress}%</span>
              <p className="text-sm text-neutral-400">complete</p>
            </div>
          </div>
        </header>

        {/* Progress Overview Card */}
        <div className="bg-white rounded-2xl border border-neutral-200 p-6 mb-12 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-medium text-neutral-900">Program Progress</h2>
            <span className="text-sm text-neutral-500">{completedModules.length} of 12 modules</span>
          </div>
          <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary-500 rounded-full transition-all duration-500"
              style={{ width: `${overallProgress}%` }}
            />
          </div>
        </div>

        {/* 2-Column Module Grid - Fixed gap, cards never touch */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {modules.map((module) => {
            const isCompleted = completedModules.includes(module.id);
            const isCurrent = module.id === currentModule;
            const isAvailable = module.id <= currentModule;

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
                key={module.id}
                moduleNumber={module.id}
                title={module.title}
                subtitle={module.duration}
                description={module.description}
                status={status}
                progress={progress}
                href={isAvailable ? `/module/${module.id}` : undefined}
              />
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 pt-8 border-t border-neutral-200 text-center">
          <p className="text-sm text-neutral-500 mb-4">
            Continue your resilience journey
          </p>
          <Link
            href={`/module/${currentModule}`}
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white text-sm font-medium rounded-lg hover:bg-primary-700 transition-colors"
          >
            Continue to Week {currentModule}
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}

const modules = [
  {
    id: 1,
    title: "Kick Off",
    duration: "Week 1",
    description: "Establish your baseline, set goals, and get introduced to program concepts.",
  },
  {
    id: 2,
    title: "Mindfulness Foundation",
    duration: "Week 2",
    description: "Build mindfulness skills to improve focus, creativity, and stress management.",
  },
  {
    id: 3,
    title: "Cognitive Restructuring",
    duration: "Week 3",
    description: "Master cognitive reframing to challenge distorted thinking patterns.",
  },
  {
    id: 4,
    title: "Emotional Intelligence",
    duration: "Week 4",
    description: "Develop emotional awareness and regulation skills for better leadership.",
  },
  {
    id: 5,
    title: "Team Dynamics",
    duration: "Week 5",
    description: "Build psychological safety and collaboration within your team.",
  },
  {
    id: 6,
    title: "Resilience Building",
    duration: "Week 6",
    description: "Develop growth mindset and resilience to bounce back from setbacks.",
  },
  {
    id: 7,
    title: "Communication Skills",
    duration: "Week 7",
    description: "Master active listening and constructive feedback delivery.",
  },
  {
    id: 8,
    title: "Stress Management",
    duration: "Week 8",
    description: "Build a personalized stress management toolkit with proven techniques.",
  },
  {
    id: 9,
    title: "Work-Life Integration",
    duration: "Week 9",
    description: "Design sustainable work-life integration with clear boundaries.",
  },
  {
    id: 10,
    title: "Performance Optimization",
    duration: "Week 10",
    description: "Access peak performance states and design rituals for consistent flow.",
  },
  {
    id: 11,
    title: "Sustainability Planning",
    duration: "Week 11",
    description: "Build lasting habits and create a 90-day sustainability plan.",
  },
  {
    id: 12,
    title: "Celebration & Reflection",
    duration: "Week 12",
    description: "Celebrate your journey, assess final growth, and set your future vision.",
  },
];
