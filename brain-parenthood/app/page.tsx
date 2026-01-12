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
        {/* Hero Section */}
        <div className="text-center mb-20 max-w-4xl mx-auto pt-12 animate-fade-in">
          <div className="inline-flex items-center px-4 py-2 mb-6 bg-primary-50 text-primary-700 rounded-full text-label font-medium border border-primary-200">
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            12-Week Resilience Program
          </div>

          <h1 className="font-display text-display-1 md:text-[56px] font-bold text-neutral-800 mb-6 leading-tight">
            Build Resilience Together
          </h1>

          <p className="text-body-lg text-neutral-600 mb-8 leading-relaxed max-w-2xl mx-auto">
            A structured program for workplace teams to develop psychological skills, build trust, and create lasting resilience through science-backed practices
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
            <Link href="/module/1">
              <Button variant="primary" size="large" className="min-w-[200px]">
                Start Module 1
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button variant="secondary" size="large" className="min-w-[200px]">
                View Progress
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mb-24 animate-slide-up">
          <h2 className="font-display text-heading-1 text-neutral-800 text-center mb-4">
            Why This Works
          </h2>
          <p className="text-body-lg text-neutral-600 text-center mb-12 max-w-2xl mx-auto">
            Designed for teams who need psychological skills, not corporate wellness theater
          </p>
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <div className="bg-white p-6 rounded-xl border-2 border-primary-200 hover:border-primary-400 transition-all duration-200 hover:shadow-md">
              <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <h3 className="font-display text-heading-3 text-neutral-800 mb-2">
                Structured & Manageable
              </h3>
              <p className="text-body text-neutral-600 leading-relaxed">
                12 weekly modules, 5-10 minutes per day. Designed to fit into busy schedules without overwhelming teams
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border-2 border-success-200 hover:border-success-400 transition-all duration-200 hover:shadow-md">
              <div className="w-10 h-10 rounded-lg bg-success-100 flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-success-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-display text-heading-3 text-neutral-800 mb-2">
                Science-Backed
              </h3>
              <p className="text-body text-neutral-600 leading-relaxed">
                Techniques from cognitive psychology, mindfulness research, and organizational behavior studies
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border-2 border-secondary-200 hover:border-secondary-400 transition-all duration-200 hover:shadow-md">
              <div className="w-10 h-10 rounded-lg bg-secondary-100 flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-secondary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                </svg>
              </div>
              <h3 className="font-display text-heading-3 text-neutral-800 mb-2">
                Track Progress
              </h3>
              <p className="text-body text-neutral-600 leading-relaxed">
                Baseline assessments, weekly check-ins, and clear milestones show how skills develop over time
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-white rounded-xl p-8 mb-24 max-w-4xl mx-auto border-2 border-neutral-200 shadow-sm">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="font-display text-[40px] font-bold text-primary-600 mb-1">12</div>
              <div className="text-body text-neutral-600 font-medium">Weeks</div>
              <div className="text-body-sm text-neutral-500 mt-1">Progressive training</div>
            </div>
            <div className="md:border-l md:border-r border-neutral-200">
              <div className="font-display text-[40px] font-bold text-secondary-600 mb-1">5-10</div>
              <div className="text-body text-neutral-600 font-medium">Min/Day</div>
              <div className="text-body-sm text-neutral-500 mt-1">Low time commitment</div>
            </div>
            <div>
              <div className="font-display text-[40px] font-bold text-success-600 mb-1">100%</div>
              <div className="text-body text-neutral-600 font-medium">Team</div>
              <div className="text-body-sm text-neutral-500 mt-1">Collective growth</div>
            </div>
          </div>
        </div>

        {/* Program Overview */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="font-display text-heading-1 text-neutral-800 mb-4">
              Your 12-Week Journey
            </h2>
            <p className="text-body-lg text-neutral-600 max-w-2xl mx-auto">
              Each module builds on the last. Progress at your own pace, together as a team
            </p>
          </div>

          <div className="mb-8 max-w-5xl mx-auto">
            <ProgressBar value={1} max={12} showPercentage label="Program Progress" variant="gradient" size="md" />
          </div>

          <div className="grid md:grid-cols-2 gap-4 max-w-5xl mx-auto">
            {modules.map((module, index) => {
              const isAvailable = module.week === "Week 1";
              const isCompleted = false; // Would come from user progress data
              return (
                <Link
                  key={module.week}
                  href={isAvailable ? "/module/1" : "#"}
                  className={`group p-5 rounded-xl border-2 transition-all duration-200 ${
                    isAvailable
                      ? "bg-white border-primary-300 hover:border-primary-500 hover:shadow-md hover:-translate-y-1 cursor-pointer"
                      : "bg-neutral-50 border-neutral-200 opacity-60 cursor-not-allowed"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center text-white font-display font-bold text-base ${
                      isCompleted ? "bg-success-500" : isAvailable ? "bg-primary-500" : "bg-neutral-300"
                    }`}>
                      {isCompleted ? (
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        index + 1
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="text-caption font-semibold text-neutral-500 uppercase tracking-wider mb-1">
                        {module.week}
                      </div>
                      <h3 className="font-display text-[18px] font-semibold text-neutral-800 mb-1.5 leading-snug">
                        {module.title}
                      </h3>
                      <p className="text-body-sm text-neutral-600 leading-relaxed">
                        {module.description}
                      </p>
                      {!isAvailable && (
                        <div className="mt-2 inline-flex items-center text-caption text-neutral-500">
                          <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                          </svg>
                          Unlocks after previous module
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* CTA */}
        <div className="bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl p-12 md:p-16 text-center text-white mb-12 shadow-lg">
          <h2 className="font-display text-heading-1 md:text-display-2 mb-4">
            Ready to Start?
          </h2>
          <p className="text-body-lg text-primary-100 mb-8 max-w-xl mx-auto">
            Module 1 is available now. Begin your team's resilience journey today
          </p>
          <Link href="/module/1">
            <Button variant="secondary" size="large" className="bg-white text-primary-700 hover:bg-neutral-50 border-white">
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
