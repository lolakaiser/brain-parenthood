"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getProgress } from "@/lib/storage";
import Button from "@/components/ui/Button";

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

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="app-container">
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <h1 className="text-5xl font-bold text-neutral-900 mb-4">All Modules</h1>
          <p className="text-xl text-neutral-600">
            The complete 12-week Brain Parenthood journey
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {modules.map((module) => {
            const isCompleted = completedModules.includes(module.id);
            const isAvailable = module.id === 1;

            return (
              <div
                key={module.id}
                className={`bg-white rounded-3xl p-8 border-2 transition-all duration-300 ${
                  isAvailable
                    ? "border-primary-300 hover:border-primary-500 hover:shadow-xl hover:-translate-y-1"
                    : "border-neutral-200 opacity-60"
                }`}
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className={`flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold text-lg ${
                    isCompleted ? "bg-success-500" : isAvailable ? "bg-primary-600" : "bg-neutral-300"
                  }`}>
                    {module.id}
                  </div>
                  <div className="flex-1">
                    <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-1">
                      {module.duration}
                    </div>
                    <h2 className="text-xl font-bold text-neutral-900">
                      {module.title}
                    </h2>
                  </div>
                  {isCompleted && (
                    <span className="px-3 py-1 bg-success-100 text-success-700 rounded-full text-xs font-semibold">
                      Done
                    </span>
                  )}
                </div>

                <p className="text-neutral-600 mb-6 leading-relaxed">
                  {module.description}
                </p>

                {isAvailable ? (
                  <Link href={`/module/${module.id}`}>
                    <Button variant="primary" fullWidth className="rounded-2xl">
                      {isCompleted ? "Review Module" : "Start Module"}
                    </Button>
                  </Link>
                ) : (
                  <Button variant="secondary" fullWidth disabled className="rounded-2xl">
                    Coming Soon
                  </Button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

const modules = [
  {
    id: 1,
    title: "Module 1: Kick Off",
    duration: "Week 1",
    description: "Establish your baseline, set goals, and get introduced to Brain Parenthood concepts.",
  },
  {
    id: 2,
    title: "Module 2: Mindfulness Foundation",
    duration: "Week 2",
    description: "Build mindfulness skills to improve focus, creativity, and stress management.",
  },
  {
    id: 3,
    title: "Module 3: Cognitive Restructuring",
    duration: "Week 3",
    description: "Master cognitive reframing to challenge distorted thinking patterns.",
  },
  {
    id: 4,
    title: "Module 4: Emotional Intelligence",
    duration: "Week 4",
    description: "Develop emotional awareness and regulation skills for better leadership.",
  },
  {
    id: 5,
    title: "Module 5: Team Dynamics",
    duration: "Week 5",
    description: "Build psychological safety and collaboration within your team.",
  },
  {
    id: 6,
    title: "Module 6: Resilience Building",
    duration: "Week 6",
    description: "Develop growth mindset and resilience to bounce back from setbacks.",
  },
  {
    id: 7,
    title: "Module 7: Communication Skills",
    duration: "Week 7",
    description: "Master active listening and constructive feedback delivery.",
  },
  {
    id: 8,
    title: "Module 8: Stress Management",
    duration: "Week 8",
    description: "Build a personalized stress management toolkit with proven techniques.",
  },
  {
    id: 9,
    title: "Module 9: Work-Life Integration",
    duration: "Week 9",
    description: "Design sustainable work-life integration with clear boundaries.",
  },
  {
    id: 10,
    title: "Module 10: Performance Optimization",
    duration: "Week 10",
    description: "Access peak performance states and design rituals for consistent flow.",
  },
  {
    id: 11,
    title: "Module 11: Sustainability Planning",
    duration: "Week 11",
    description: "Build lasting habits and create a 90-day sustainability plan.",
  },
  {
    id: 12,
    title: "Module 12: Celebration & Reflection",
    duration: "Week 12",
    description: "Celebrate your journey, assess final growth, and set your future vision.",
  },
];
