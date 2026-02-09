"use client";

import AppLayout from "@/components/AppLayout";

export default function AboutPage() {
  return (
    <AppLayout>
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-2">About Brain Parenthood</h1>
          <p className="text-white/80">
            Understanding the program that can help you grow
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-8 space-y-8">
        {/* Welcome Section */}
        <section className="bg-white rounded-2xl p-8 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Welcome to the Brain Parenthood Program</h2>
          <p className="text-gray-600 mb-6">
            Welcome! We're glad you're here. This program is designed to help you make positive changes
            in your life and build resilience for yourself and your team. You'll have the chance to:
          </p>
          <ul className="space-y-3 mb-6">
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-purple-500 mt-2 flex-shrink-0" />
              <span className="text-gray-700">Look at yourself and your life honestly</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-purple-500 mt-2 flex-shrink-0" />
              <span className="text-gray-700">Understand your circumstances better</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-purple-500 mt-2 flex-shrink-0" />
              <span className="text-gray-700">Learn about your behavior and its results</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-purple-500 mt-2 flex-shrink-0" />
              <span className="text-gray-700">Make choices that work for you</span>
            </li>
          </ul>
          <p className="text-purple-600 font-medium">
            The more aware you become of yourself and what influences you, the more control you'll have over your life.
          </p>
        </section>

        {/* How This Program Works */}
        <section className="bg-gray-50 rounded-2xl p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-8 text-center">How This Program Works</h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center">
              {/* [ICON-ASSESS] */}
              <div className="w-20 h-20 rounded-full bg-purple-500 flex items-center justify-center mb-4">
                <span className="text-white text-2xl font-bold">A</span>
              </div>
              <p className="font-semibold text-gray-900">Step 1</p>
              <p className="text-purple-600 font-medium">Assess</p>
              <p className="text-sm text-gray-500 mt-1">Establish your baseline</p>
            </div>

            {/* Arrow */}
            <div className="hidden md:block text-gray-300 text-2xl">&gt;</div>

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center">
              {/* [ICON-LEARN] */}
              <div className="w-20 h-20 rounded-full bg-green-500 flex items-center justify-center mb-4">
                <span className="text-white text-2xl font-bold">L</span>
              </div>
              <p className="font-semibold text-gray-900">Step 2</p>
              <p className="text-green-600 font-medium">Learn</p>
              <p className="text-sm text-gray-500 mt-1">Build resilience skills</p>
            </div>

            {/* Arrow */}
            <div className="hidden md:block text-gray-300 text-2xl">&gt;</div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center">
              {/* [ICON-TRANSFORM] */}
              <div className="w-20 h-20 rounded-full bg-pink-500 flex items-center justify-center mb-4">
                <span className="text-white text-2xl font-bold">T</span>
              </div>
              <p className="font-semibold text-gray-900">Step 3</p>
              <p className="text-pink-600 font-medium">Transform</p>
              <p className="text-sm text-gray-500 mt-1">Apply & grow</p>
            </div>
          </div>
        </section>

        {/* What You'll Gain */}
        <section className="bg-white rounded-2xl p-8 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-6">What You'll Gain from This Program</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Card 1 */}
            <div className="bg-blue-50 rounded-xl p-5 border border-blue-100">
              <div className="flex items-start gap-4">
                {/* [ICON-GAIN-1] */}
                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600 font-bold">1</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Stress Management</h3>
                  <p className="text-sm text-gray-600">Deal with emotional concerns and stress in healthy ways</p>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-green-50 rounded-xl p-5 border border-green-100">
              <div className="flex items-start gap-4">
                {/* [ICON-GAIN-2] */}
                <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-green-600 font-bold">2</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Team Communication</h3>
                  <p className="text-sm text-gray-600">Build stronger connections with your team and colleagues</p>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-purple-50 rounded-xl p-5 border border-purple-100">
              <div className="flex items-start gap-4">
                {/* [ICON-GAIN-3] */}
                <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-purple-600 font-bold">3</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Increased Productivity</h3>
                  <p className="text-sm text-gray-600">Develop focus and efficiency in your daily work</p>
                </div>
              </div>
            </div>

            {/* Card 4 */}
            <div className="bg-pink-50 rounded-xl p-5 border border-pink-100">
              <div className="flex items-start gap-4">
                {/* [ICON-GAIN-4] */}
                <div className="w-10 h-10 rounded-lg bg-pink-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-pink-600 font-bold">4</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Work-Life Balance</h3>
                  <p className="text-sm text-gray-600">Create boundaries and maintain personal well-being</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What You'll Learn */}
        <section className="bg-white rounded-2xl p-8 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-6">What You'll Learn</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50">
              <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
                <svg className="w-4 h-4 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-gray-700">Mindfulness and self-awareness techniques</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50">
              <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
                <svg className="w-4 h-4 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-gray-700">Emotional regulation strategies</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50">
              <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
                <svg className="w-4 h-4 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-gray-700">Effective communication skills</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50">
              <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
                <svg className="w-4 h-4 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-gray-700">Conflict resolution methods</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50">
              <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
                <svg className="w-4 h-4 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-gray-700">Decision making frameworks</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50">
              <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
                <svg className="w-4 h-4 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-gray-700">Resilience building practices</span>
            </div>
          </div>
        </section>

        {/* What to Expect */}
        <section className="bg-white rounded-2xl p-8 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-6">What to Expect</h2>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold">12</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">12 Weekly Modules</h3>
                <p className="text-sm text-gray-600">Structured learning over 12 weeks, each module building on the last</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Interactive Exercises</h3>
                <p className="text-sm text-gray-600">Hands-on activities and worksheets to practice new skills</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Progress Tracking</h3>
                <p className="text-sm text-gray-600">Monitor your growth with baseline assessments and regular check-ins</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-red-500 flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Self-Paced Learning</h3>
                <p className="text-sm text-gray-600">Complete modules at your own pace, on your own schedule</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </AppLayout>
  );
}
