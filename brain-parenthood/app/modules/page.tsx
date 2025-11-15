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
    <div className="min-h-screen pt-32 bg-gray-50">
      <div className="mx-auto py-8" style={{ paddingLeft: '8vw', paddingRight: '8vw', maxWidth: '1600px' }}>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">All Modules</h1>
        <p className="text-lg text-gray-600 mb-12">
          The complete 12-week Brain Parenthood journey
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {modules.map((module) => (
            <div
              key={module.id}
              className={`bg-white rounded-lg shadow-md p-6 border-2 ${
                module.available
                  ? "border-blue-300 hover:border-blue-500 transition-colors"
                  : "border-gray-200"
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <span className="text-3xl mr-3">{module.icon}</span>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{module.title}</h2>
                    <p className="text-sm text-gray-600">{module.duration}</p>
                  </div>
                </div>
                {module.completed && (
                  <span className="bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full">
                    Completed
                  </span>
                )}
              </div>

              <p className="text-gray-700 mb-4">{module.description}</p>

              <div className="mb-4">
                <h3 className="font-semibold text-sm text-gray-900 mb-2">Key Activities:</h3>
                <ul className="space-y-1">
                  {module.activities.map((activity, index) => (
                    <li key={index} className="text-sm text-gray-600 flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span>{activity}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-4">
                <h3 className="font-semibold text-sm text-gray-900 mb-2">Expected Outcomes:</h3>
                <ul className="space-y-1">
                  {module.outcomes.map((outcome, index) => (
                    <li key={index} className="text-sm text-gray-600 flex items-start">
                      <span className="text-green-600 mr-2">✓</span>
                      <span>{outcome}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {module.available ? (
                <Link
                  href={`/module/${module.id}`}
                  className="block w-full text-center bg-blue-600 text-white py-3 rounded-lg
                           font-semibold hover:bg-blue-700 transition-colors duration-200"
                >
                  {module.completed ? "Review Module" : "Start Module"}
                </Link>
              ) : (
                <button
                  disabled
                  className="w-full bg-gray-300 text-gray-500 py-3 rounded-lg font-semibold
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
    icon: "🚀",
    description:
      "Establish your baseline, set goals, and get introduced to Brain Parenthood concepts.",
    activities: [
      "Complete baseline assessment",
      "Set individual and team goals",
      "Learn about Brain Parenthood philosophy",
    ],
    outcomes: [
      "Clear understanding of current state",
      "Defined goals for the 12-week journey",
      "Foundation for personalized plan",
    ],
    available: true,
    completed: true,
  },
  {
    id: 2,
    title: "Module 2: Mindfulness Foundation",
    duration: "Week 2-3",
    icon: "🧘",
    description:
      "Build mindfulness skills for individuals and teams to improve focus, creativity, and attention.",
    activities: [
      "Individual mindfulness practices",
      "Team mindfulness rituals",
      "Daily meditation exercises",
    ],
    outcomes: [
      "Improved focus and attention",
      "Enhanced creativity",
      "Reduced stress levels",
    ],
    available: false,
    completed: false,
  },
  {
    id: 3,
    title: "Module 3: Building Resilience",
    duration: "Week 4-5",
    icon: "💪",
    description:
      "Develop personal and team resilience through workshops and practical exercises.",
    activities: [
      "Resilience workshop",
      "Cognitive reframing techniques",
      "Breathing and relaxation exercises",
      "Personal resilience plans",
    ],
    outcomes: [
      "Better stress management",
      "Increased confidence",
      "Fewer productivity dips",
    ],
    available: false,
    completed: false,
  },
  {
    id: 4,
    title: "Module 4: Communication & Trust",
    duration: "Week 6-7",
    icon: "🤝",
    description:
      "Build psychological safety, improve communication, and strengthen team trust.",
    activities: [
      "Active listening training",
      "Feedback workshops",
      "Conflict resolution exercises",
      "Psychological safety rituals",
    ],
    outcomes: [
      "Improved team communication",
      "Higher psychological safety",
      "Better conflict resolution",
    ],
    available: false,
    completed: false,
  },
  {
    id: 5,
    title: "Module 5: Innovation & Growth",
    duration: "Week 8-9",
    icon: "💡",
    description:
      "Apply growth mindset and innovation skills to real business challenges.",
    activities: [
      "Creative brainstorming sessions",
      "Adaptability drills",
      "Continuous learning culture",
    ],
    outcomes: [
      "Faster problem resolution",
      "More creative solutions",
      "Improved collaboration flow",
    ],
    available: false,
    completed: false,
  },
  {
    id: 6,
    title: "Module 6: Measurement & Feedback",
    duration: "Week 10-11",
    icon: "📈",
    description:
      "Assess progress, gather feedback, and make course corrections.",
    activities: [
      "Progress assessment surveys",
      "Team retrospective",
      "One-on-one coaching sessions",
    ],
    outcomes: [
      "Clear progress metrics",
      "Actionable feedback",
      "Refined approach",
    ],
    available: false,
    completed: false,
  },
  {
    id: 7,
    title: "Module 7: Wrap-up & Future",
    duration: "Week 12",
    icon: "🎉",
    description:
      "Celebrate achievements, reflect on growth, and plan for sustained success.",
    activities: [
      "Final reflection session",
      "Achievement celebration",
      "Continuous improvement plan",
    ],
    outcomes: [
      "Sustainable practices",
      "Long-term toolkit",
      "High team cohesion",
    ],
    available: false,
    completed: false,
  },
];
