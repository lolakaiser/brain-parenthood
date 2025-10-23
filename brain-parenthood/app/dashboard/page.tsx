"use client";

import Link from "next/link";

export default function DashboardPage() {
  // TODO: Fetch this data from the backend API
  const dashboardData = {
    currentModule: 1,
    completedModules: [1],
    baselineData: {
      teamStressLevel: 7,
      individualStressLevel: 6,
      productivity: 5,
      communication: 6,
      workLifeBalance: 5,
    },
    goals: {
      stressReduction: "Reduce team stress level from 7 to 4",
      productivityGoal: "Increase team productivity by 25%",
      communicationGoal: "Establish daily check-ins and weekly retrospectives",
    },
    teamMembers: 8,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Your Dashboard</h1>

        {/* Progress Overview */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-sm text-gray-600 mb-1">Current Module</div>
            <div className="text-3xl font-bold text-blue-600">
              Module {dashboardData.currentModule}
            </div>
            <div className="text-sm text-gray-500 mt-1">Kick Off</div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-sm text-gray-600 mb-1">Progress</div>
            <div className="text-3xl font-bold text-green-600">
              {dashboardData.completedModules.length}/12
            </div>
            <div className="text-sm text-gray-500 mt-1">Modules Completed</div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-sm text-gray-600 mb-1">Team Size</div>
            <div className="text-3xl font-bold text-purple-600">
              {dashboardData.teamMembers}
            </div>
            <div className="text-sm text-gray-500 mt-1">Team Members</div>
          </div>
        </div>

        {/* Baseline Metrics */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Baseline Metrics</h2>
          <div className="space-y-4">
            <MetricBar
              label="Team Stress Level"
              value={dashboardData.baselineData.teamStressLevel}
              max={10}
              color="red"
            />
            <MetricBar
              label="Individual Stress Level"
              value={dashboardData.baselineData.individualStressLevel}
              max={10}
              color="orange"
            />
            <MetricBar
              label="Team Productivity"
              value={dashboardData.baselineData.productivity}
              max={10}
              color="blue"
            />
            <MetricBar
              label="Communication Quality"
              value={dashboardData.baselineData.communication}
              max={10}
              color="green"
            />
            <MetricBar
              label="Work-Life Balance"
              value={dashboardData.baselineData.workLifeBalance}
              max={10}
              color="purple"
            />
          </div>
        </div>

        {/* Goals */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Your Goals</h2>
          <div className="space-y-4">
            <div className="flex items-start">
              <span className="text-2xl mr-3">🎯</span>
              <div>
                <div className="font-semibold text-gray-900">Stress Reduction</div>
                <div className="text-gray-600">{dashboardData.goals.stressReduction}</div>
              </div>
            </div>
            <div className="flex items-start">
              <span className="text-2xl mr-3">📈</span>
              <div>
                <div className="font-semibold text-gray-900">Productivity</div>
                <div className="text-gray-600">{dashboardData.goals.productivityGoal}</div>
              </div>
            </div>
            <div className="flex items-start">
              <span className="text-2xl mr-3">💬</span>
              <div>
                <div className="font-semibold text-gray-900">Communication</div>
                <div className="text-gray-600">{dashboardData.goals.communicationGoal}</div>
              </div>
            </div>
          </div>
        </div>

        {/* AI Personalized Recommendations */}
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg shadow-md p-8 mb-8 border border-purple-200">
          <div className="flex items-center mb-4">
            <span className="text-2xl mr-3">🤖</span>
            <h2 className="text-2xl font-bold">AI-Powered Recommendations</h2>
          </div>
          <p className="text-gray-700 mb-4">
            Based on your baseline assessment and goals, here are personalized recommendations:
          </p>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="text-purple-600 mr-2">•</span>
              <span>
                Focus on stress reduction techniques in Module 2-3 (Mindfulness Foundation)
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-purple-600 mr-2">•</span>
              <span>
                Schedule daily team check-ins to improve communication quality
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-purple-600 mr-2">•</span>
              <span>
                Consider implementing flexible work hours to improve work-life balance
              </span>
            </li>
          </ul>
          <p className="text-sm text-gray-600 mt-4 italic">
            Note: AI personalization features will be fully implemented in a future update.
          </p>
        </div>

        {/* Next Steps */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold mb-6">Next Steps</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <div className="font-semibold text-gray-900">Module 2: Mindfulness Foundation</div>
                <div className="text-sm text-gray-600">Focus and Clarity (Coming Soon)</div>
              </div>
              <button
                disabled
                className="px-6 py-2 bg-gray-300 text-gray-500 rounded-lg font-semibold cursor-not-allowed"
              >
                Coming Soon
              </button>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <div className="font-semibold text-gray-900">Review Module 1</div>
                <div className="text-sm text-gray-600">Revisit your baseline and goals</div>
              </div>
              <Link
                href="/module/1"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold
                         hover:bg-blue-700 transition-colors duration-200"
              >
                Review
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricBar({
  label,
  value,
  max,
  color,
}: {
  label: string;
  value: number;
  max: number;
  color: string;
}) {
  const percentage = (value / max) * 100;
  const colorClasses: Record<string, string> = {
    red: 'bg-red-500',
    orange: 'bg-orange-500',
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    purple: 'bg-purple-500',
  };

  return (
    <div>
      <div className="flex justify-between mb-2">
        <span className="font-semibold text-gray-900">{label}</span>
        <span className="text-gray-600">
          {value}/{max}
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3">
        <div
          className={`h-3 rounded-full ${colorClasses[color]}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
