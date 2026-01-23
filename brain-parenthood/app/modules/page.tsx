"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import AppLayout from "@/components/AppLayout";
import ModuleCard from "@/components/ui/ModuleCard";
import { getProgress } from "@/lib/storage";

export default function ModulesPage() {
  const [completedModules, setCompletedModules] = useState<number[]>([]);

  useEffect(() => {
    const progress = getProgress();
    setCompletedModules(progress.completedModules || []);
  }, []);

  const currentModule = completedModules.length + 1;
  const overallProgress = Math.round((completedModules.length / 12) * 100);

  // Right panel content
  const RightPanel = (
    <div className="space-y-6">
      {/* Progress Card */}
      <div className="bg-white rounded-2xl p-5 border border-gray-100">
        <div className="flex items-center justify-between mb-3">
          <span className="font-medium text-gray-900">Program progress</span>
          <span className="text-sm font-semibold text-teal-600">{overallProgress}%</span>
        </div>
        <p className="text-sm text-gray-500 mb-3">{completedModules.length} of 12 modules</p>
        <div className="h-2 bg-teal-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-teal-500 to-teal-600 rounded-full transition-all duration-500"
            style={{ width: `${overallProgress}%` }}
          />
        </div>
      </div>

      {/* Continue CTA */}
      <Link
        href={`/module/${currentModule}`}
        className="block bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-5 text-white hover:shadow-lg transition-shadow"
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold">Continue</h3>
            <p className="text-white/70 text-sm">Week {currentModule}</p>
          </div>
        </div>
      </Link>

      {/* Phase Progress */}
      <div className="bg-white rounded-2xl p-5 border border-gray-100">
        <h3 className="font-medium text-gray-900 mb-4">Phases</h3>
        <div className="space-y-3">
          {phases.map((phase, i) => {
            const phaseModules = [1, 2, 3].map(n => n + i * 3);
            const completed = phaseModules.filter(m => completedModules.includes(m)).length;
            const total = 3;
            return (
              <div key={i} className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-medium ${phase.color}`}>
                  {i + 1}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{phase.title}</p>
                  <p className="text-xs text-gray-400">{completed}/{total} complete</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  return (
    <AppLayout rightPanel={RightPanel}>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">All Modules</h1>
        <p className="text-gray-500">Complete 12-week resilience program</p>
      </div>

      {/* 2-Column Module Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
              status={status}
              progress={progress}
              href={isAvailable ? `/module/${module.id}` : undefined}
            />
          );
        })}
      </div>
    </AppLayout>
  );
}

const phases = [
  { title: "Foundations", color: "bg-teal-500" },
  { title: "Regulation", color: "bg-blue-500" },
  { title: "Resilience", color: "bg-pink-500" },
  { title: "Integration", color: "bg-indigo-500" },
];

const modules = [
  { id: 1, title: "Kick Off", duration: "Week 1" },
  { id: 2, title: "Mindfulness Foundation", duration: "Week 2" },
  { id: 3, title: "Cognitive Restructuring", duration: "Week 3" },
  { id: 4, title: "Emotional Intelligence", duration: "Week 4" },
  { id: 5, title: "Team Dynamics", duration: "Week 5" },
  { id: 6, title: "Resilience Building", duration: "Week 6" },
  { id: 7, title: "Communication Skills", duration: "Week 7" },
  { id: 8, title: "Stress Management", duration: "Week 8" },
  { id: 9, title: "Work-Life Integration", duration: "Week 9" },
  { id: 10, title: "Performance Optimization", duration: "Week 10" },
  { id: 11, title: "Sustainability Planning", duration: "Week 11" },
  { id: 12, title: "Celebration & Reflection", duration: "Week 12" },
];
