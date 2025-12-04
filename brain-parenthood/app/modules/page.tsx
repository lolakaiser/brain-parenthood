"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ModulesPage() {
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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-10 lg:px-12 py-16 pt-28">
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-5 tracking-tight">All Modules</h1>
          <p className="text-lg md:text-xl text-gray-600">
            The complete 12-week Brain Parenthood journey
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {modules.map((module) => (
            <div
              key={module.id}
              className={`bg-white rounded-3xl p-8 border transition-all duration-300 ${
                module.available
                  ? "border-purple-100 hover:border-purple-300 shadow-md hover:shadow-2xl hover:-translate-y-2 cursor-pointer"
                  : "border-gray-200 opacity-55 shadow-sm"
              }`}
            >
              <div className="flex items-start justify-between mb-5">
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">{module.duration}</p>
                  <h2 className="text-2xl font-bold text-gray-900 leading-tight">{module.title}</h2>
                </div>
                {module.completed && (
                  <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1.5 rounded-full">
                    Completed
                  </span>
                )}
              </div>

              <p className="text-gray-600 mb-5 leading-relaxed">{module.description}</p>

              <div className="mb-5">
                <h3 className="font-bold text-sm text-gray-900 mb-3">Key Activities:</h3>
                <ul className="space-y-2">
                  {module.activities.map((activity, index) => (
                    <li key={index} className="text-sm text-gray-600 flex items-start">
                      <span className="text-purple-500 mr-2 mt-0.5">•</span>
                      <span>{activity}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-6">
                <h3 className="font-bold text-sm text-gray-900 mb-3">Expected Outcomes:</h3>
                <ul className="space-y-2">
                  {module.outcomes.map((outcome, index) => (
                    <li key={index} className="text-sm text-gray-600 flex items-start">
                      <span className="text-green-500 mr-2 mt-0.5">✓</span>
                      <span>{outcome}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {module.available ? (
                <Link
                  href={`/module/${module.id}`}
                  className="block w-full text-center bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3.5 rounded-xl
                           font-semibold hover:from-purple-700 hover:to-blue-700 hover:shadow-lg transition-all duration-200"
                >
                  {module.completed ? "Review Module" : "Start Module"}
                </Link>
              ) : (
                <button
                  disabled
                  className="w-full bg-gray-200 text-gray-400 py-3.5 rounded-xl font-semibold
                           cursor-not-allowed"
                >
                  Coming Soon
                </button>
              )}
            </div>
          ))}
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
    description:
      "Establish your baseline, set goals, and get introduced to Brain Parenthood concepts.",
    activities: [
      "Complete baseline assessment",
      "Set individual and team goals",
      "Create personalized action plan",
    ],
    outcomes: [
      "Clear understanding of current state",
      "Defined goals for the 12-week journey",
      "Foundation for personalized plan",
    ],
    available: true,
    completed: false,
  },
  {
    id: 2,
    title: "Module 2: Mindfulness Foundation",
    duration: "Week 2",
    description:
      "Build mindfulness skills to improve focus, creativity, and stress management.",
    activities: [
      "Learn 3 mindfulness techniques",
      "Select your practice approach",
      "Create daily mindfulness routine",
    ],
    outcomes: [
      "Improved focus and attention",
      "Enhanced stress resilience",
      "Daily mindfulness practice",
    ],
    available: true,
    completed: false,
  },
  {
    id: 3,
    title: "Module 3: Cognitive Restructuring",
    duration: "Week 3",
    description:
      "Master cognitive reframing to challenge distorted thinking patterns.",
    activities: [
      "Learn 7 cognitive distortions",
      "Practice ABC thought challenging",
      "Build balanced thinking patterns",
    ],
    outcomes: [
      "Identify thought distortions",
      "Challenge negative thinking",
      "Develop balanced perspectives",
    ],
    available: true,
    completed: false,
  },
  {
    id: 4,
    title: "Module 4: Emotional Intelligence",
    duration: "Week 4",
    description:
      "Develop emotional awareness and regulation skills for better leadership.",
    activities: [
      "Assess your EQ across 4 pillars",
      "Practice emotion labeling",
      "Create EQ development plan",
    ],
    outcomes: [
      "Enhanced self-awareness",
      "Better emotion management",
      "Improved social skills",
    ],
    available: true,
    completed: false,
  },
  {
    id: 5,
    title: "Module 5: Team Dynamics",
    duration: "Week 5",
    description:
      "Build psychological safety and collaboration within your team.",
    activities: [
      "Assess team health metrics",
      "Learn collaboration strategies",
      "Create team agreements",
    ],
    outcomes: [
      "Increased psychological safety",
      "Stronger team collaboration",
      "Clear team norms",
    ],
    available: true,
    completed: false,
  },
  {
    id: 6,
    title: "Module 6: Resilience Building",
    duration: "Week 6",
    description:
      "Develop growth mindset and resilience to bounce back from setbacks.",
    activities: [
      "Assess resilience factors",
      "Practice growth mindset reframing",
      "Build personal resilience plan",
    ],
    outcomes: [
      "Growth mindset development",
      "Increased adaptability",
      "Better stress recovery",
    ],
    available: true,
    completed: false,
  },
  {
    id: 7,
    title: "Module 7: Communication Skills",
    duration: "Week 7",
    description:
      "Master active listening and constructive feedback delivery.",
    activities: [
      "Learn communication models",
      "Practice active listening",
      "Deliver SBI feedback",
    ],
    outcomes: [
      "Enhanced listening skills",
      "Better feedback delivery",
      "Stronger relationships",
    ],
    available: true,
    completed: false,
  },
  {
    id: 8,
    title: "Module 8: Stress Management",
    duration: "Week 8",
    description:
      "Build a personalized stress management toolkit with proven techniques.",
    activities: [
      "Identify stress triggers",
      "Select coping techniques",
      "Create stress management system",
    ],
    outcomes: [
      "Reduced stress levels",
      "Effective coping strategies",
      "Better stress prevention",
    ],
    available: true,
    completed: false,
  },
  {
    id: 9,
    title: "Module 9: Work-Life Integration",
    duration: "Week 9",
    description:
      "Design sustainable work-life integration with clear boundaries.",
    activities: [
      "Assess current integration",
      "Design ideal week structure",
      "Set healthy boundaries",
    ],
    outcomes: [
      "Better energy management",
      "Clear work-life boundaries",
      "Sustainable routines",
    ],
    available: true,
    completed: false,
  },
  {
    id: 10,
    title: "Module 10: Performance Optimization",
    duration: "Week 10",
    description:
      "Access peak performance states and design rituals for consistent flow.",
    activities: [
      "Identify flow triggers",
      "Design performance rituals",
      "Create optimization system",
    ],
    outcomes: [
      "Increased flow states",
      "Better focus and productivity",
      "Optimized performance rituals",
    ],
    available: true,
    completed: false,
  },
  {
    id: 11,
    title: "Module 11: Sustainability Planning",
    duration: "Week 11",
    description:
      "Build lasting habits and create a 90-day sustainability plan.",
    activities: [
      "Review progress since Module 1",
      "Identify sustainable habits",
      "Create 90-day action plan",
    ],
    outcomes: [
      "Lasting habit formation",
      "Accountability systems",
      "Long-term sustainability",
    ],
    available: true,
    completed: false,
  },
  {
    id: 12,
    title: "Module 12: Celebration & Reflection",
    duration: "Week 12",
    description:
      "Celebrate your journey, assess final growth, and set your future vision.",
    activities: [
      "Final assessment vs Module 1",
      "Celebrate wins and growth",
      "Create long-term vision",
    ],
    outcomes: [
      "Complete transformation map",
      "Future growth roadmap",
      "Maintenance plan",
    ],
    available: true,
    completed: false,
  },
];
