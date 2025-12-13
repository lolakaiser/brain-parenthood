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
    <div className="min-h-screen bg-white">
      <div className="app-container">
        {/* Hero Section */}
        <div className="text-center mb-20 max-w-4xl mx-auto pt-12">
          <div className="inline-block px-5 py-2 mb-8 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold">
            12-Week Resilience Program
          </div>

          <h1 className="text-6xl font-bold text-neutral-900 mb-6 leading-tight">
            Build Unshakeable Team Resilience
          </h1>

          <p className="text-xl text-neutral-600 mb-4 leading-relaxed max-w-3xl mx-auto">
            Transform your startup team with science-backed psychological training designed for high-performance environments
          </p>

          <div className="flex items-center justify-center gap-4 mt-10">
            <Link href="/module/1">
              <Button variant="primary" size="large" className="px-10 py-4 text-lg rounded-2xl">
                Start Training
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button variant="secondary" size="large" className="px-10 py-4 text-lg rounded-2xl">
                View Dashboard
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mb-24">
          <h2 className="text-4xl font-bold text-neutral-900 text-center mb-16">
            Why Brain Parenthood Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-gradient-to-br from-primary-50 to-white p-10 rounded-3xl border border-primary-200">
              <h3 className="text-2xl font-bold text-neutral-900 mb-4">
                Structured Training
              </h3>
              <p className="text-neutral-600 text-lg leading-relaxed">
                12 weekly modules that progressively build your team's psychological resilience and performance capabilities
              </p>
            </div>

            <div className="bg-gradient-to-br from-calm-50 to-white p-10 rounded-3xl border border-calm-200">
              <h3 className="text-2xl font-bold text-neutral-900 mb-4">
                Science-Backed Methods
              </h3>
              <p className="text-neutral-600 text-lg leading-relaxed">
                Evidence-based techniques from cognitive psychology, mindfulness research, and organizational behavior
              </p>
            </div>

            <div className="bg-gradient-to-br from-success-50 to-white p-10 rounded-3xl border border-success-200">
              <h3 className="text-2xl font-bold text-neutral-900 mb-4">
                Measurable Results
              </h3>
              <p className="text-neutral-600 text-lg leading-relaxed">
                Track progress through baseline assessments, weekly metrics, and clear milestones throughout the program
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-gradient-to-br from-neutral-50 to-white rounded-3xl p-12 mb-24 max-w-4xl mx-auto border border-neutral-200">
          <div className="grid grid-cols-3 gap-12 text-center">
            <div>
              <div className="text-5xl font-bold text-primary-700 mb-3">12</div>
              <div className="text-neutral-600 font-medium">Weeks of Training</div>
            </div>
            <div className="border-l border-r border-neutral-200">
              <div className="text-5xl font-bold text-success-500 mb-3">5-10</div>
              <div className="text-neutral-600 font-medium">Minutes Per Day</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-calm-500 mb-3">100%</div>
              <div className="text-neutral-600 font-medium">Team Focused</div>
            </div>
          </div>
        </div>

        {/* Program Overview */}
        <section className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-neutral-900 mb-4">
              Your Learning Path
            </h2>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
              Each module builds on the previous one, creating lasting behavioral change
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6 max-w-5xl mx-auto">
            {modules.map((module, index) => {
              const isAvailable = module.week === "Week 1";
              return (
                <Link
                  key={module.week}
                  href={isAvailable ? "/module/1" : "#"}
                  className={`group p-8 rounded-3xl border-2 transition-all duration-300 ${
                    isAvailable
                      ? "bg-white border-primary-300 hover:border-primary-500 hover:shadow-xl hover:-translate-y-1 cursor-pointer"
                      : "bg-neutral-50 border-neutral-200 opacity-60 cursor-not-allowed"
                  }`}
                >
                  <div className="flex items-start gap-5">
                    <div className={`flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center text-white font-bold text-xl ${
                      isAvailable ? "bg-success-500" : "bg-neutral-300"
                    }`}>
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2">
                        {module.week}
                      </div>
                      <h3 className="text-2xl font-bold text-neutral-900 mb-3">
                        {module.title}
                      </h3>
                      <p className="text-neutral-600 leading-relaxed">
                        {module.description}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* CTA */}
        <div className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-3xl p-16 text-center text-white mb-12">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Build Team Resilience?
          </h2>
          <p className="text-xl text-primary-100 mb-10 max-w-2xl mx-auto">
            Start with Module 1 today and begin your team's transformation
          </p>
          <Link href="/module/1">
            <Button variant="secondary" size="large" className="px-12 py-5 text-lg rounded-2xl bg-white text-primary-700 hover:bg-primary-50">
              Begin Module 1
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
