import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Brain Parenthood
          </h1>
          <p className="text-xl text-gray-600 mb-4 max-w-3xl mx-auto">
            A 12-Week Resilience and Performance Toolkit for Early-Stage Startups
          </p>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Train your team's "brain" with psychological resilience training to reduce stress,
            improve mental health, and boost productivity.
          </p>
        </div>

        {/* Key Benefits */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="text-4xl mb-4">🧠</div>
            <h3 className="text-xl font-semibold mb-3">Train Your Team's Brain</h3>
            <p className="text-gray-600">
              Just like raising a child, develop your team's collective intelligence through
              structured psychological resilience training.
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-semibold mb-3">Reduce Stress</h3>
            <p className="text-gray-600">
              Improve mental health and productivity by reducing stress across your entire team.
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-xl font-semibold mb-3">Modular Design</h3>
            <p className="text-gray-600">
              Easy to understand, see progress, and track growth from beginning to end through
              12 weekly modules.
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white p-12 rounded-2xl shadow-xl">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Your Journey?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Begin with Module 1: Establish your baseline, set goals, and learn the fundamentals
            of Brain Parenthood.
          </p>
          <Link
            href="/module/1"
            className="inline-block bg-white text-blue-600 font-semibold px-8 py-4 rounded-lg
                     hover:bg-gray-100 transition-colors duration-200 shadow-lg"
          >
            Start Module 1
          </Link>
        </div>

        {/* Program Overview */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-12">12-Week Program Overview</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((module) => (
              <div
                key={module.week}
                className={`p-6 rounded-lg border-2 ${
                  module.week === "Week 1"
                    ? "bg-blue-50 border-blue-300"
                    : "bg-gray-50 border-gray-200"
                }`}
              >
                <div className="flex items-center mb-3">
                  <span className="text-2xl mr-3">{module.icon}</span>
                  <h3 className="font-bold text-lg">{module.week}</h3>
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">{module.title}</h4>
                <p className="text-sm text-gray-600">{module.description}</p>
                {module.week === "Week 1" && (
                  <Link
                    href="/module/1"
                    className="mt-4 inline-block text-blue-600 font-semibold hover:underline"
                  >
                    Start Now →
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const modules = [
  {
    week: "Week 1",
    icon: "🚀",
    title: "Kick Off",
    description: "Establish baseline, set goals, and introduction to Brain Parenthood concepts."
  },
  {
    week: "Week 2-3",
    icon: "🧘",
    title: "Mindfulness Foundation",
    description: "Focus on individuals and teams with mindfulness practices to improve creativity, focus, and attention."
  },
  {
    week: "Week 4-5",
    icon: "💪",
    title: "Building Resilience",
    description: "Resilience workshop with cognitive reframing, breathing exercises, and personal/team resilience plans."
  },
  {
    week: "Week 6-7",
    icon: "🤝",
    title: "Communication & Trust",
    description: "Active communication training, psychological safety rituals, and team agreements."
  },
  {
    week: "Week 8-9",
    icon: "💡",
    title: "Innovation & Growth",
    description: "Apply new skills to real challenges with creative brainstorming and adaptability drills."
  },
  {
    week: "Week 10-11",
    icon: "📈",
    title: "Measurement & Feedback",
    description: "Progress assessment, team retrospective, and personalized coaching."
  },
  {
    week: "Week 12",
    icon: "🎉",
    title: "Wrap-up & Future",
    description: "Final reflection, celebrate achievements, and plan for continuous brain parenting."
  }
];
