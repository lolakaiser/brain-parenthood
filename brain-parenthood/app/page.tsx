"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Button from "@/components/ui/Button";

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
    <div className="min-h-screen bg-neutral-50">
      <div className="app-container">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-1.5 mb-6 bg-primary-50 text-primary-700 rounded-full text-label font-medium">
            12-Week Program
          </div>
          <h1 className="text-display-1 font-bold text-neutral-900 mb-4">
            Brain Parenthood
          </h1>
          <p className="text-heading-3 text-neutral-700 mb-3 max-w-3xl mx-auto">
            A Resilience and Performance Toolkit for Startup Teams
          </p>
          <p className="text-body-lg text-neutral-600 max-w-2xl mx-auto">
            Build team resilience through structured psychological training
          </p>
        </div>

        {/* Key Benefits */}
        <div className="grid md:grid-cols-3 gap-6 mb-12 max-w-5xl mx-auto">
          <div className="bg-white p-8 rounded-lg border border-neutral-200 shadow-sm">
            <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-primary-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="text-heading-3 font-semibold text-neutral-900 mb-2">
              Train Your Team's Brain
            </h3>
            <p className="text-body-sm text-neutral-600 leading-relaxed">
              Just like raising a child, develop your team's collective intelligence through
              structured psychological resilience training.
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg border border-neutral-200 shadow-sm">
            <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-primary-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 className="text-heading-3 font-semibold text-neutral-900 mb-2">
              Reduce Stress
            </h3>
            <p className="text-body-sm text-neutral-600 leading-relaxed">
              Improve mental health and productivity by reducing stress across your entire team.
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg border border-neutral-200 shadow-sm">
            <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-primary-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 className="text-heading-3 font-semibold text-neutral-900 mb-2">
              Modular Design
            </h3>
            <p className="text-body-sm text-neutral-600 leading-relaxed">
              Easy to understand, see progress, and track growth from beginning to end through
              12 weekly modules.
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-white p-12 rounded-lg border border-neutral-200 shadow-sm mb-12 max-w-4xl mx-auto text-center">
          <h2 className="text-heading-1 font-bold text-neutral-900 mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-body-lg text-neutral-600 mb-8 max-w-2xl mx-auto">
            Begin with Module 1: Establish your baseline, set goals, and learn the fundamentals
            of Brain Parenthood.
          </p>
          <Link href="/module/1">
            <Button variant="primary" size="large">
              Start Module 1 →
            </Button>
          </Link>
        </div>

        {/* Program Overview */}
        <section className="mb-12">
          <h2 className="text-heading-1 font-bold text-center text-neutral-900 mb-3">
            Your 12-Week Journey
          </h2>
          <p className="text-center text-body-lg text-neutral-600 mb-10 max-w-2xl mx-auto">
            Select any module to begin your resilience training
          </p>

          {/* Module Cards Grid */}
          <div className="module-grid">
            {modules.map((module) => (
              <Link
                key={module.week}
                href={module.week === "Week 1" ? "/module/1" : "#"}
                className={`module-card ${
                  module.week !== "Week 1" ? "opacity-60" : ""
                }`}
              >
                <div>
                  <div className="module-week">
                    {module.week}
                  </div>
                  <h3 className="module-title">
                    {module.title}
                  </h3>
                  <p className="text-body-sm text-neutral-500 font-medium mb-3">
                    {module.subtitle}
                  </p>
                  <p className="text-body-sm text-neutral-600">
                    {module.description}
                  </p>
                </div>
                {module.week === "Week 1" && (
                  <div className="mt-6 pt-6 border-t border-neutral-200">
                    <span className="text-body-sm font-semibold text-primary-700 flex items-center justify-center gap-2">
                      Start Module
                      <span>→</span>
                    </span>
                  </div>
                )}
                {module.week !== "Week 1" && (
                  <div className="mt-6 pt-6 border-t border-neutral-200">
                    <span className="text-body-sm font-semibold text-neutral-400">
                      Coming Soon
                    </span>
                  </div>
                )}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

const modules = [
  {
    week: "Week 1",
    title: "Kick Off",
    subtitle: "Start your journey",
    description: "Establish baseline, set goals, and introduction to Brain Parenthood concepts.",
  },
  {
    week: "Week 2-3",
    title: "Mindfulness",
    subtitle: "2 times a day",
    description: "Focus on individuals and teams with mindfulness practices to improve creativity, focus, and attention.",
  },
  {
    week: "Week 4-5",
    title: "Resilience",
    subtitle: "3 times a week",
    description: "Resilience workshop with cognitive reframing, breathing exercises, and personal/team resilience plans.",
  },
  {
    week: "Week 6-7",
    title: "Communication",
    subtitle: "1 time a day",
    description: "Active communication training, psychological safety rituals, and team agreements.",
  },
  {
    week: "Week 8-9",
    title: "Innovation",
    subtitle: "3 times a day",
    description: "Apply new skills to real challenges with creative brainstorming and adaptability drills.",
  },
  {
    week: "Week 10-11",
    title: "Measurement",
    subtitle: "2 times a week",
    description: "Progress assessment, team retrospective, and personalized coaching.",
  },
  {
    week: "Week 12",
    title: "Wrap-up",
    subtitle: "Final celebration",
    description: "Final reflection, celebrate achievements, and plan for continuous brain parenting.",
  }
];
