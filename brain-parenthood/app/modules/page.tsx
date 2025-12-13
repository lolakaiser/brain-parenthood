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
    <div className="min-h-screen py-12 md:py-20" style={{background: '#F2F2F7'}}>
      <div className="mb-12 text-center max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{color: '#1C1C1E', letterSpacing: '-0.03em'}}>All Modules</h1>
        <p className="text-lg" style={{color: '#3C3C43'}}>
          The complete 12-week Brain Parenthood journey
        </p>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {modules.map((module) => (
            <div
              key={module.id}
              className={`bg-white rounded-3xl p-8 transition-all duration-300 flex flex-col items-center text-center ${
                module.available
                  ? "hover:shadow-2xl hover:-translate-y-1 cursor-pointer"
                  : "opacity-50"
              }`}
              style={{
                boxShadow: module.available
                  ? '0 2px 16px rgba(0, 0, 0, 0.08), 0 1px 4px rgba(0, 0, 0, 0.04)'
                  : '0 1px 8px rgba(0, 0, 0, 0.04)',
                border: 'none',
                minHeight: '360px'
              }}
            >
              <div className="flex flex-col items-center justify-start flex-1 w-full mb-4">
                <div className="flex items-center justify-between w-full mb-4">
                  <p className="text-xs font-bold uppercase tracking-wider mx-auto" style={{color: '#8E8E93'}}>{module.duration}</p>
                  {module.completed && (
                    <span className="text-xs font-semibold px-3 py-1.5 rounded-full absolute top-8 right-8" style={{background: '#34C759', color: 'white'}}>
                      Completed
                    </span>
                  )}
                </div>
                <h2 className="text-xl font-bold leading-tight mb-3" style={{color: '#1C1C1E', letterSpacing: '-0.02em'}}>{module.title}</h2>
                <p className="mb-4 leading-relaxed" style={{color: '#3C3C43', fontSize: '13px'}}>{module.description}</p>

                <div className="mb-4 w-full">
                  <h3 className="font-bold mb-2" style={{fontSize: '13px', color: '#1C1C1E'}}>Key Activities:</h3>
                  <ul className="space-y-1.5">
                    {module.activities.map((activity, index) => (
                      <li key={index} className="flex items-start justify-center" style={{fontSize: '12px', color: '#3C3C43'}}>
                        <span className="mr-1.5 mt-0.5" style={{color: '#007AFF'}}>•</span>
                        <span>{activity}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-4 w-full">
                  <h3 className="font-bold mb-2" style={{fontSize: '13px', color: '#1C1C1E'}}>Expected Outcomes:</h3>
                  <ul className="space-y-1.5">
                    {module.outcomes.map((outcome, index) => (
                      <li key={index} className="flex items-start justify-center" style={{fontSize: '12px', color: '#3C3C43'}}>
                        <span className="mr-1.5 mt-0.5" style={{color: '#34C759'}}>✓</span>
                        <span>{outcome}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {module.available ? (
                <Link
                  href={`/module/${module.id}`}
                  className="block w-full text-center text-white py-3 rounded-xl font-semibold transition-all duration-200 hover:scale-102 active:scale-98"
                  style={{
                    background: '#007AFF',
                    boxShadow: '0 2px 8px rgba(0, 122, 255, 0.25)',
                    fontSize: '15px',
                    letterSpacing: '-0.022em'
                  }}
                >
                  {module.completed ? "Review Module" : "Start Module"}
                </Link>
              ) : (
                <button
                  disabled
                  className="w-full py-3 rounded-xl font-semibold cursor-not-allowed"
                  style={{
                    background: '#F2F2F7',
                    color: '#8E8E93',
                    fontSize: '15px'
                  }}
                >
                  Coming Soon
                </button>
              )}
            </div>
          ))}
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
