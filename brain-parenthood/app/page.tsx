"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Layout from "@/components/Layout";

function getModuleColorClass(colorClass: string): string {
  const colors: Record<string, string> = {
    purple: 'border-purple-200 hover:border-purple-400 hover:shadow-purple-100',
    red: 'border-red-200 hover:border-red-400 hover:shadow-red-100',
    yellow: 'border-yellow-200 hover:border-yellow-400 hover:shadow-yellow-100',
    blue: 'border-blue-200 hover:border-blue-400 hover:shadow-blue-100',
    green: 'border-green-200 hover:border-green-400 hover:shadow-green-100',
    teal: 'border-cyan-200 hover:border-cyan-400 hover:shadow-cyan-100',
    indigo: 'border-indigo-200 hover:border-indigo-400 hover:shadow-indigo-100',
  };
  return colors[colorClass] || colors.purple;
}

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
    <div className="min-h-screen py-12 md:py-20" style={{background: '#F2F2F7'}}>
      {/* Hero Section */}
      <div className="text-center mb-16 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-4" style={{color: '#1C1C1E', letterSpacing: '-0.03em'}}>
            Brain Parenthood
          </h1>
          <p className="text-xl md:text-2xl mb-3 max-w-3xl mx-auto font-medium" style={{color: '#1C1C1E', letterSpacing: '-0.02em'}}>
            A 12-Week Resilience and Performance Toolkit
          </p>
          <p className="text-base md:text-lg max-w-2xl mx-auto leading-relaxed" style={{color: '#3C3C43'}}>
            Build team resilience through structured psychological training
          </p>
        </div>

      {/* Key Benefits */}
      <div className="grid md:grid-cols-3 gap-5 mb-16 max-w-5xl mx-auto">
          <div className="flex-1 bg-white p-8 rounded-3xl shadow-sm transition-all duration-300 border border-gray-200 hover:border-gray-300 hover:shadow-xl hover:-translate-y-1">
            <div className="text-center">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-100 to-purple-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-3 h-3 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2" style={{color: '#1C1C1E', letterSpacing: '-0.02em'}}>
                Train Your Team's Brain
              </h3>
              <p style={{color: '#3C3C43', fontSize: '14px'}} className="leading-relaxed">
                Just like raising a child, develop your team's collective intelligence through
                structured psychological resilience training.
              </p>
            </div>
          </div>

          <div className="flex-1 bg-white p-8 rounded-3xl shadow-sm transition-all duration-300 border border-gray-200 hover:border-gray-300 hover:shadow-xl hover:-translate-y-1">
            <div className="text-center">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-100 to-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-3 h-3 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2" style={{color: '#1C1C1E', letterSpacing: '-0.02em'}}>
                Reduce Stress
              </h3>
              <p style={{color: '#3C3C43', fontSize: '14px'}} className="leading-relaxed">
                Improve mental health and productivity by reducing stress across your entire team.
              </p>
            </div>
          </div>

          <div className="flex-1 bg-white p-8 rounded-3xl shadow-sm transition-all duration-300 border border-gray-200 hover:border-gray-300 hover:shadow-xl hover:-translate-y-1">
            <div className="text-center">
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-100 to-indigo-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-3 h-3 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2" style={{color: '#1C1C1E', letterSpacing: '-0.02em'}}>
                Modular Design
              </h3>
              <p style={{color: '#3C3C43', fontSize: '14px'}} className="leading-relaxed">
                Easy to understand, see progress, and track growth from beginning to end through
                12 weekly modules.
              </p>
            </div>
          </div>
      </div>

      {/* CTA Section */}
      <div className="text-center bg-white p-10 md:p-16 rounded-3xl mb-16 max-w-4xl mx-auto" style={{boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04)'}}>
        <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-5" style={{color: '#1C1C1E', letterSpacing: '-0.03em'}}>
              Ready to Start Your Journey?
            </h2>
            <p className="text-lg mb-10 max-w-2xl mx-auto leading-relaxed" style={{color: '#3C3C43'}}>
              Begin with Module 1: Establish your baseline, set goals, and learn the fundamentals
              of Brain Parenthood.
            </p>
            <Link
              href="/module/1"
              className="inline-flex items-center gap-2 text-white font-semibold px-8 py-4 rounded-xl text-lg hover:scale-102 active:scale-98 transition-all duration-200"
              style={{
                background: '#007AFF',
                boxShadow: '0 4px 16px rgba(0, 122, 255, 0.3)',
                letterSpacing: '-0.022em'
              }}
            >
              <span>Start Module 1</span>
              <span className="text-xl">→</span>
            </Link>
        </div>
      </div>

      {/* Program Overview */}
      <section className="mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-3" style={{color: '#1C1C1E', letterSpacing: '-0.03em'}}>
          Your 12-Week Journey
        </h2>
        <p className="text-center mb-10 text-base md:text-lg max-w-2xl mx-auto" style={{color: '#3C3C43'}}>
          Select any module to begin your resilience training
        </p>

        {/* Module Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {modules.map((module, index) => (
              <Link
                key={module.week}
                href={module.week === "Week 1" ? "/module/1" : "#"}
                className={`group bg-white rounded-3xl p-8 transition-all duration-300 flex flex-col items-center text-center ${
                  module.week !== "Week 1"
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:shadow-2xl hover:-translate-y-1 cursor-pointer"
                }`}
                style={{
                  boxShadow: module.week === "Week 1"
                    ? '0 2px 16px rgba(0, 0, 0, 0.08), 0 1px 4px rgba(0, 0, 0, 0.04)'
                    : '0 1px 8px rgba(0, 0, 0, 0.04)',
                  border: 'none',
                  aspectRatio: '1',
                  minHeight: '280px'
                }}
              >
                <div className="flex flex-col items-center justify-center flex-1 w-full">
                  <div className="text-xs font-bold uppercase tracking-wider mb-3" style={{color: '#8E8E93'}}>
                    {module.week}
                  </div>
                  <h3 className="text-2xl font-bold mb-2 leading-tight" style={{color: '#1C1C1E', letterSpacing: '-0.02em'}}>
                    {module.title}
                  </h3>
                  <p className="font-medium mb-3" style={{fontSize: '14px', color: '#8E8E93'}}>
                    {module.subtitle}
                  </p>
                  <p className="leading-relaxed" style={{fontSize: '13px', color: '#3C3C43', maxWidth: '90%'}}>
                    {module.description}
                  </p>
                </div>
                {module.week === "Week 1" && (
                  <div className="mt-4 pt-4 w-full" style={{borderTop: '0.5px solid rgba(0, 0, 0, 0.08)'}}>
                    <span className="text-sm font-semibold flex items-center justify-center gap-2" style={{color: '#007AFF'}}>
                      Start Module
                      <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                    </span>
                  </div>
                )}
                {module.week !== "Week 1" && (
                  <div className="mt-4 pt-4 w-full" style={{borderTop: '0.5px solid rgba(0, 0, 0, 0.08)'}}>
                    <span className="text-sm font-semibold" style={{color: '#8E8E93'}}>
                      Coming Soon
                    </span>
                  </div>
                )}
              </Link>
            ))}
        </div>
      </section>
    </div>
  );
}

const modules = [
  {
    week: "Week 1",
    title: "Kick Off",
    subtitle: "Start your journey",
    description: "Establish baseline, set goals, and introduction to Brain Parenthood concepts.",
    colorClass: "purple",
  },
  {
    week: "Week 2-3",
    title: "Mindfulness",
    subtitle: "2 times a day",
    description: "Focus on individuals and teams with mindfulness practices to improve creativity, focus, and attention.",
    colorClass: "red",
  },
  {
    week: "Week 4-5",
    title: "Resilience",
    subtitle: "3 times a week",
    description: "Resilience workshop with cognitive reframing, breathing exercises, and personal/team resilience plans.",
    colorClass: "yellow",
  },
  {
    week: "Week 6-7",
    title: "Communication",
    subtitle: "1 time a day",
    description: "Active communication training, psychological safety rituals, and team agreements.",
    colorClass: "blue",
  },
  {
    week: "Week 8-9",
    title: "Innovation",
    subtitle: "3 times a day",
    description: "Apply new skills to real challenges with creative brainstorming and adaptability drills.",
    colorClass: "green",
  },
  {
    week: "Week 10-11",
    title: "Measurement",
    subtitle: "2 times a week",
    description: "Progress assessment, team retrospective, and personalized coaching.",
    colorClass: "teal",
  },
  {
    week: "Week 12",
    title: "Wrap-up",
    subtitle: "Final celebration",
    description: "Final reflection, celebrate achievements, and plan for continuous brain parenting.",
    colorClass: "indigo",
  }
];
