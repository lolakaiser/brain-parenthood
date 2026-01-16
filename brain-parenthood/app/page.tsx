"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Button from "@/components/ui/Button";
import ProgressBar from "@/components/ui/ProgressBar";

export default function Home() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#fdfcfb]">
      <div className="app-container">
        {/* Hero Section - Text First */}
        <div className="max-w-3xl mx-auto pt-12 mb-16 animate-fade-in">
          <p className="text-label text-neutral-500 uppercase tracking-wide mb-3">12-Week Resilience Program</p>

          <h1 className="font-display text-display-1 md:text-[56px] font-bold text-neutral-800 mb-4 leading-tight">
            Build Resilience Together
          </h1>

          <p className="text-body-lg text-neutral-600 mb-10 leading-relaxed">
            A structured program for workplace teams to develop psychological skills, build trust, and create lasting resilience through science-backed practices.
          </p>

          {/* Single Primary CTA */}
          <div className="flex items-center gap-4">
            <Link href="/module/1">
              <Button variant="primary" size="large">
                Continue Week 1
              </Button>
            </Link>
            <Link href="/dashboard" className="text-body text-primary-600 hover:text-primary-700 font-medium">
              View progress →
            </Link>
          </div>
        </div>

        {/* Program Overview - The Visual Anchor */}
        <div className="max-w-4xl mx-auto mb-20">
          <h2 className="font-display text-heading-2 text-neutral-800 mb-8">Program Overview</h2>

          <div className="bg-white rounded-3xl border-2 border-neutral-200 p-8 shadow-sm">
            <div className="grid md:grid-cols-4 gap-6 mb-8">
              <div>
                <div className="text-caption text-neutral-500 uppercase tracking-wide mb-2">Week 1–3</div>
                <div className="font-display text-lg font-semibold text-neutral-800">Foundations</div>
              </div>
              <div>
                <div className="text-caption text-neutral-500 uppercase tracking-wide mb-2">Week 4–6</div>
                <div className="font-display text-lg font-semibold text-neutral-800">Emotional Regulation</div>
              </div>
              <div>
                <div className="text-caption text-neutral-500 uppercase tracking-wide mb-2">Week 7–9</div>
                <div className="font-display text-lg font-semibold text-neutral-800">Cognitive Resilience</div>
              </div>
              <div>
                <div className="text-caption text-neutral-500 uppercase tracking-wide mb-2">Week 10–12</div>
                <div className="font-display text-lg font-semibold text-neutral-800">Team Integration</div>
              </div>
            </div>

            <div className="border-t border-neutral-200 pt-6 space-y-2">
              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-2"></div>
                <p className="text-body text-neutral-600">Individual practice</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-2"></div>
                <p className="text-body text-neutral-600">Team reflection</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-2"></div>
                <p className="text-body text-neutral-600">Weekly time: 10–15 minutes</p>
              </div>
            </div>
          </div>
        </div>

        {/* Simple Credibility Cards */}
        <div className="max-w-4xl mx-auto mb-24">
          <div className="grid md:grid-cols-3 gap-5">
            <div className="text-left">
              <div className="text-body-lg mb-1">🧠</div>
              <div className="font-medium text-neutral-800 mb-1">Evidence-based psychology</div>
              <div className="text-body-sm text-neutral-600">Techniques from cognitive science and mindfulness research</div>
            </div>
            <div className="text-left">
              <div className="text-body-lg mb-1">👥</div>
              <div className="font-medium text-neutral-800 mb-1">Designed for real teams</div>
              <div className="text-body-sm text-neutral-600">Not another corporate wellness checkbox</div>
            </div>
            <div className="text-left">
              <div className="text-body-lg mb-1">⏱</div>
              <div className="font-medium text-neutral-800 mb-1">Low time commitment</div>
              <div className="text-body-sm text-neutral-600">Fits into actual work schedules</div>
            </div>
          </div>
        </div>

        {/* All Modules - App-like Grid */}
        <section className="mb-20 max-w-5xl mx-auto">
          <h2 className="font-display text-heading-2 text-neutral-800 mb-3">All Modules</h2>
          <p className="text-body text-neutral-600 mb-6">Your 12-week journey to workplace resilience</p>
          <div className="mb-8 bg-white rounded-3xl p-6 border-2 border-neutral-200 shadow-sm">
            <ProgressBar value={1} max={12} showPercentage label="Your progress" variant="gradient" size="md" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {allModules.map((module, index) => {
              const isAvailable = index === 0;
              const isCompleted = false;
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
        </section>

        {/* Simple Footer CTA */}
        <div className="max-w-4xl mx-auto mb-12 text-center">
          <p className="text-body text-neutral-600 mb-4">Ready to begin?</p>
          <Link href="/module/1">
            <Button variant="primary" size="large">
              Start Week 1
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

const modules = [
  {
    week: "Week 1",
    title: "Kick Off",
    description: "Establish baseline metrics, set team goals, and learn core Brain Parenthood concepts",
  },
  {
    week: "Week 2-3",
    title: "Mindfulness Foundation",
    description: "Build individual and team mindfulness practices to improve focus, creativity, and attention",
  },
  {
    week: "Week 4-5",
    title: "Resilience Building",
    description: "Develop cognitive reframing skills, breathing techniques, and personal resilience strategies",
  },
  {
    week: "Week 6-7",
    title: "Communication Skills",
    description: "Practice active communication, establish psychological safety, and create team agreements",
  },
  {
    week: "Week 8-9",
    title: "Applied Innovation",
    description: "Apply learned skills to real challenges through creative problem-solving exercises",
  },
  {
    week: "Week 10-11",
    title: "Progress Measurement",
    description: "Assess progress, conduct team retrospective, and receive personalized coaching",
  },
  {
    week: "Week 12",
    title: "Program Completion",
    description: "Final reflection, celebrate achievements, and create your ongoing resilience plan",
  }
];

const allModules = [
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
