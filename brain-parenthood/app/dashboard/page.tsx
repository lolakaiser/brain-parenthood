"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
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
    <div className="min-h-screen pt-24 bg-white">
      <div className="mx-auto py-12 px-6 max-w-6xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">Your Dashboard</h1>
        <p className="text-gray-600 mb-10">Track your progress and stay on course</p>

        {/* Progress Overview */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
            <div className="text-sm font-semibold text-gray-600 mb-2">Current Module</div>
            <div className="text-4xl font-bold text-blue-600 mb-1">
              Module {dashboardData.currentModule}
            </div>
            <div className="text-sm text-gray-500">Kick Off</div>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
            <div className="text-sm font-semibold text-gray-600 mb-2">Progress</div>
            <div className="text-4xl font-bold text-green-600 mb-1">
              {dashboardData.completedModules.length}/12
            </div>
            <div className="text-sm text-gray-500">Modules Completed</div>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
            <div className="text-sm font-semibold text-gray-600 mb-2">Team Size</div>
            <div className="text-4xl font-bold text-purple-600 mb-1">
              {dashboardData.teamMembers}
            </div>
            <div className="text-sm text-gray-500">Team Members</div>
          </div>
        </div>

        {/* Baseline Metrics */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Baseline Metrics</h2>
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
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Goals</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="flex-1">
                <div className="font-semibold text-gray-900 mb-1">Stress Reduction</div>
                <div className="text-gray-600 text-sm">{dashboardData.goals.stressReduction}</div>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <div className="flex-1">
                <div className="font-semibold text-gray-900 mb-1">Productivity</div>
                <div className="text-gray-600 text-sm">{dashboardData.goals.productivityGoal}</div>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <div className="flex-1">
                <div className="font-semibold text-gray-900 mb-1">Communication</div>
                <div className="text-gray-600 text-sm">{dashboardData.goals.communicationGoal}</div>
              </div>
            </div>
          </div>
        </div>

        {/* AI Personalized Recommendations */}
        <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl shadow-sm border-2 border-purple-100 p-8 mb-10">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center mr-4">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">AI-Powered Recommendations</h2>
          </div>
          <p className="text-gray-700 mb-4">
            Based on your baseline assessment and goals, here are personalized recommendations:
          </p>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-4 bg-white rounded-xl">
              <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="w-2 h-2 bg-purple-600 rounded-full"></span>
              </div>
              <span className="text-gray-700">
                Focus on stress reduction techniques in Module 2-3 (Mindfulness Foundation)
              </span>
            </div>
            <div className="flex items-start gap-3 p-4 bg-white rounded-xl">
              <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="w-2 h-2 bg-purple-600 rounded-full"></span>
              </div>
              <span className="text-gray-700">
                Schedule daily team check-ins to improve communication quality
              </span>
            </div>
            <div className="flex items-start gap-3 p-4 bg-white rounded-xl">
              <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="w-2 h-2 bg-purple-600 rounded-full"></span>
              </div>
              <span className="text-gray-700">
                Consider implementing flexible work hours to improve work-life balance
              </span>
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-4 italic">
            Note: AI personalization features will be fully implemented in a future update.
          </p>
        </div>

        {/* Next Steps */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Next Steps</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-6 bg-gray-50 rounded-xl border border-gray-200">
              <div>
                <div className="font-semibold text-gray-900 text-lg">Module 2: Mindfulness Foundation</div>
                <div className="text-sm text-gray-600 mt-1">Focus and Clarity (Coming Soon)</div>
              </div>
              <button
                disabled
                className="px-6 py-3 bg-gray-200 text-gray-500 rounded-xl font-semibold cursor-not-allowed"
              >
                Coming Soon
              </button>
            </div>
            <div className="flex items-center justify-between p-6 bg-purple-50 rounded-xl border border-purple-100">
              <div>
                <div className="font-semibold text-gray-900 text-lg">Review Module 1</div>
                <div className="text-sm text-gray-600 mt-1">Revisit your baseline and goals</div>
              </div>
              <Link
                href="/module/1"
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-blue-700 hover:shadow-lg transition-all duration-200"
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
