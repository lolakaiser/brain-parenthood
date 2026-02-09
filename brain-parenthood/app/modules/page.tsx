"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import AppLayout from "@/components/AppLayout";
import { getProgress } from "@/lib/storage";

export default function ModulesPage() {
  const [completedModules, setCompletedModules] = useState<number[]>([]);

  useEffect(() => {
    const progress = getProgress();
    setCompletedModules(progress?.completedModules || []);
  }, []);

  const totalModules = 12;
  const modulesCompleted = completedModules.length;
  const overallProgress = Math.round((modulesCompleted / totalModules) * 100);
  const currentModule = completedModules.length + 1;

  return (
    <AppLayout>
      {/* Hero Header with Stats */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-2">Learning Modules</h1>
          <p className="text-white/80 mb-8">
            Comprehensive modules for personal and professional development
          </p>

          {/* Stats in header */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <p className="text-sm text-white/70">Total Modules</p>
              <p className="text-2xl font-bold text-white">{totalModules}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <p className="text-sm text-white/70">Completed</p>
              <p className="text-2xl font-bold text-white">{modulesCompleted}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <p className="text-sm text-white/70">Progress</p>
              <p className="text-2xl font-bold text-white">{overallProgress}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Modules Grid */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((module) => {
            const isCompleted = completedModules.includes(module.id);
            const isCurrent = module.id === currentModule;
            const isLocked = module.id > currentModule;

            return (
              <div
                key={module.id}
                className={`bg-white rounded-2xl p-6 border transition-all ${
                  isLocked
                    ? "border-gray-100 opacity-60"
                    : "border-gray-100 hover:border-purple-200 hover:shadow-lg"
                }`}
              >
                {/* Header Row */}
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    isCompleted
                      ? "bg-green-100 text-green-700"
                      : isCurrent
                      ? "bg-purple-100 text-purple-700"
                      : "bg-gray-100 text-gray-600"
                  }`}>
                    Module {module.id}
                  </span>
                  <span className="text-sm text-gray-400">{module.duration}</span>
                </div>

                {/* Title & Description */}
                <h3 className="font-semibold text-gray-900 text-lg mb-2">{module.title}</h3>
                <p className="text-sm text-gray-500 mb-4 line-clamp-2">{module.description}</p>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                  <span className="text-sm text-gray-400">{module.sections} sections</span>
                  {!isLocked && (
                    <Link
                      href={`/module/${module.id}`}
                      className="text-purple-600 hover:text-purple-700 font-medium text-sm flex items-center gap-1"
                    >
                      {isCompleted ? "Review" : "Start"}
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  )}
                  {isLocked && (
                    <span className="text-gray-400 text-sm">Locked</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AppLayout>
  );
}

const modules = [
  {
    id: 1,
    title: "The Right Frame of Mind",
    description: "Develop a positive mindset by overcoming negative thought patterns, understanding motivation, and embracing personal accountability.",
    duration: "75 min",
    sections: 6,
  },
  {
    id: 2,
    title: "How to Handle the Tough Stuff",
    description: "Learn comprehensive coping strategies for difficult situations including conflict resolution, anger management, stress reduction, and building resilience.",
    duration: "90 min",
    sections: 6,
  },
  {
    id: 3,
    title: "How to Put Your Best Foot Forward",
    description: "Master effective communication skills for personal and professional success, including verbal, non-verbal, and active listening techniques.",
    duration: "85 min",
    sections: 6,
  },
  {
    id: 4,
    title: "The Nuts and Bolts",
    description: "Master practical life skills including money management, time management, and decision making.",
    duration: "50 min",
    sections: 3,
  },
  {
    id: 5,
    title: "Effective Communication",
    description: "Master specific communication techniques including 'I' statements and active listening.",
    duration: "45 min",
    sections: 3,
  },
  {
    id: 6,
    title: "Stress Management",
    description: "Master relaxation techniques and stress coping strategies.",
    duration: "70 min",
    sections: 4,
  },
  {
    id: 7,
    title: "Parenting",
    description: "Guidance for parents on positive parenting techniques and work-life balance.",
    duration: "50 min",
    sections: 3,
  },
  {
    id: 8,
    title: "Positive Attitude",
    description: "Assess and improve your overall outlook on life.",
    duration: "35 min",
    sections: 2,
  },
  {
    id: 9,
    title: "Communication",
    description: "Explore different forms and styles of communication.",
    duration: "60 min",
    sections: 3,
  },
  {
    id: 10,
    title: "Communication Skills Worksheet",
    description: "Practice and apply communication skills through hands-on exercises.",
    duration: "40 min",
    sections: 2,
  },
  {
    id: 11,
    title: "Decision Making",
    description: "Learn structured approaches to making better decisions.",
    duration: "65 min",
    sections: 3,
  },
  {
    id: 12,
    title: "Anger Management",
    description: "Comprehensive anger management and conflict resolution techniques.",
    duration: "70 min",
    sections: 4,
  },
];
