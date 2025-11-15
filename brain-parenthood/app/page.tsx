"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function getModuleClass(index: number): string {
  const classes = [
    'module-kickoff',
    'module-mindfulness',
    'module-resilience',
    'module-communication',
    'module-innovation',
    'module-measurement',
    'module-wrapup'
  ];
  return classes[index] || '';
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
    <div className="min-h-screen pt-32 bg-[#2D3E50]">
      <div className="mx-auto py-16" style={{ paddingLeft: '8vw', paddingRight: '8vw', maxWidth: '1600px' }}>
        {/* Hero Section */}
        <div className="text-center mb-20 animate-slide-up">
          <h1 className="text-6xl md:text-7xl font-extrabold mb-6 text-white">
            Brain Parenthood
          </h1>
          <p className="text-2xl text-white mb-4 max-w-3xl mx-auto font-medium">
            A 12-Week Resilience and Performance Toolkit for Early-Stage Startups
          </p>
          <p className="text-lg text-white max-w-2xl mx-auto leading-relaxed">
            Train your team's "brain" with psychological resilience training to reduce stress,
            improve mental health, and boost productivity.
          </p>
        </div>

        {/* Key Benefits */}
        <div className="flex flex-row gap-6 mb-20 animate-fade-in max-w-6xl mx-auto">
          <div className="flex-1 bg-[#3A4F63] p-8 rounded-2xl shadow-xl transition-all duration-300 border border-white/10">
            <div className="text-center">
              <h3 className="text-xl font-bold mb-3 text-[#A78BFA]">
                Train Your Team's Brain
              </h3>
              <p className="text-[#A78BFA] text-sm leading-relaxed opacity-90">
                Just like raising a child, develop your team's collective intelligence through
                structured psychological resilience training.
              </p>
            </div>
          </div>

          <div className="flex-1 bg-[#3A4F63] p-8 rounded-2xl shadow-xl transition-all duration-300 border border-white/10">
            <div className="text-center">
              <h3 className="text-xl font-bold mb-3 text-[#FB8989]">
                Reduce Stress
              </h3>
              <p className="text-[#FB8989] text-sm leading-relaxed opacity-90">
                Improve mental health and productivity by reducing stress across your entire team.
              </p>
            </div>
          </div>

          <div className="flex-1 bg-[#3A4F63] p-8 rounded-2xl shadow-xl transition-all duration-300 border border-white/10">
            <div className="text-center">
              <h3 className="text-xl font-bold mb-3 text-[#7DD3FC]">
                Modular Design
              </h3>
              <p className="text-[#7DD3FC] text-sm leading-relaxed opacity-90">
                Easy to understand, see progress, and track growth from beginning to end through
                12 weekly modules.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center relative overflow-hidden bg-[#3A4F63] text-white p-16 rounded-[2.5rem] shadow-2xl mb-20 border border-white/10">
          <div className="relative z-10">
            <h2 className="text-5xl md:text-6xl font-extrabold mb-6 text-white">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl mb-10 max-w-2xl mx-auto leading-relaxed text-white">
              Begin with Module 1: Establish your baseline, set goals, and learn the fundamentals
              of Brain Parenthood.
            </p>
            <Link
              href="/module/1"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold px-12 py-6 rounded-2xl text-lg
                       hover:from-purple-700 hover:to-blue-700 hover:scale-105 active:scale-95 transition-all duration-300 shadow-2xl group"
            >
              <span>Start Module 1</span>
              <span className="text-2xl transform group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>
        </div>

        {/* Program Overview - Responsive Grid */}
        <section className="modules-section mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-3 text-white">
            Your 12-Week Journey
          </h2>
          <p className="text-center text-white mb-12 text-lg max-w-2xl mx-auto">
            Select any module to begin your resilience training
          </p>

          {/* Module Cards Grid */}
          <div className="module-grid">
            {modules.map((module, index) => (
              <Link
                key={module.week}
                href={module.week === "Week 1" ? "/module/1" : "#"}
                className={`module-card ${getModuleClass(index)} ${
                  module.week !== "Week 1" ? "opacity-60 cursor-not-allowed" : ""
                }`}
                style={{
                  animationDelay: `${index * 0.05}s`,
                }}
              >
                <h4 className="module-week">{module.week}</h4>
                <h3 className="module-title">{module.title}</h3>
                <p className="module-subtitle">{module.subtitle}</p>
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
    icon: "🚀",
    title: "Kick Off",
    subtitle: "Start your journey",
    description: "Establish baseline, set goals, and introduction to Brain Parenthood concepts.",
    color: "bg-[#A78BFA]",  // Purple
    textColor: "text-[#5B21B6]"  // Dark Purple
  },
  {
    week: "Week 2-3",
    icon: "🧘",
    title: "Mindfulness",
    subtitle: "2 times a day",
    description: "Focus on individuals and teams with mindfulness practices to improve creativity, focus, and attention.",
    color: "bg-[#FB8989]",  // Coral/Salmon
    textColor: "text-[#991B1B]"  // Dark Red
  },
  {
    week: "Week 4-5",
    icon: "💪",
    title: "Resilience",
    subtitle: "3 times a week",
    description: "Resilience workshop with cognitive reframing, breathing exercises, and personal/team resilience plans.",
    color: "bg-[#FCD34D]",  // Yellow
    textColor: "text-[#854D0E]"  // Dark Yellow/Brown
  },
  {
    week: "Week 6-7",
    icon: "🤝",
    title: "Communication",
    subtitle: "1 time a day",
    description: "Active communication training, psychological safety rituals, and team agreements.",
    color: "bg-[#7DD3FC]",  // Light Blue
    textColor: "text-[#075985]"  // Dark Blue
  },
  {
    week: "Week 8-9",
    icon: "💡",
    title: "Innovation",
    subtitle: "3 times a day",
    description: "Apply new skills to real challenges with creative brainstorming and adaptability drills.",
    color: "bg-[#6EE7B7]",  // Green
    textColor: "text-[#065F46]"  // Dark Green
  },
  {
    week: "Week 10-11",
    icon: "📈",
    title: "Measurement",
    subtitle: "2 times a week",
    description: "Progress assessment, team retrospective, and personalized coaching.",
    color: "bg-[#67E8F9]",  // Teal/Cyan
    textColor: "text-[#164E63]"  // Dark Teal
  },
  {
    week: "Week 12",
    icon: "🎉",
    title: "Wrap-up",
    subtitle: "Final celebration",
    description: "Final reflection, celebrate achievements, and plan for continuous brain parenting.",
    color: "bg-[#818CF8]",  // Indigo
    textColor: "text-[#3730A3]"  // Dark Indigo
  }
];
