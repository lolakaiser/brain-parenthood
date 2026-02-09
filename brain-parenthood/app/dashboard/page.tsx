"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import AppLayout from "@/components/AppLayout";
import { useAuth } from "@/context/AuthContext";
import { getProgress } from "@/lib/storage";

export default function DashboardPage() {
  const { user } = useAuth();
  const [completedModules, setCompletedModules] = useState<number[]>([]);

  useEffect(() => {
    const progress = getProgress();
    setCompletedModules(progress?.completedModules || []);
  }, []);

  const totalModules = 12;
  const modulesStarted = Math.min(completedModules.length + 1, totalModules);
  const modulesCompleted = completedModules.length;
  const overallProgress = Math.round((modulesCompleted / totalModules) * 100);
  const currentModule = completedModules.length + 1;

  return (
    <AppLayout>
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-2">
            Welcome back, {user?.name || "User"}!
          </h1>
          <p className="text-white/80">
            Continue your journey to personal growth
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 border border-gray-100">
            <p className="text-sm text-gray-500 mb-1">Modules Started</p>
            <p className="text-3xl font-bold text-gray-900">
              {modulesStarted} / {totalModules}
            </p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-100">
            <p className="text-sm text-gray-500 mb-1">Modules Completed</p>
            <p className="text-3xl font-bold text-green-600">{modulesCompleted}</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-100">
            <p className="text-sm text-gray-500 mb-1">Overall Progress</p>
            <p className="text-3xl font-bold text-gray-900">{overallProgress}%</p>
            <div className="mt-2 h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500"
                style={{ width: `${overallProgress}%` }}
              />
            </div>
          </div>
        </div>

        {/* New to Platform Banner */}
        <div className="bg-gradient-to-r from-purple-600 via-pink-500 to-pink-400 rounded-2xl p-8 mb-8 relative overflow-hidden">
          {/* Decorative shape */}
          <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-20">
            <div className="absolute right-8 top-1/2 -translate-y-1/2 w-48 h-48 bg-white/30 rounded-3xl transform rotate-12" />
          </div>

          <div className="relative z-10">
            <div className="flex items-start gap-4">
              {/* [ICON-WELCOME] */}
              <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                <span className="text-white text-2xl">W</span>
              </div>
              <div>
                <h2 className="text-xl font-bold text-white mb-2">New to the Platform?</h2>
                <p className="text-white/80 mb-4 max-w-xl">
                  Take our interactive training module to learn how to use all the features!
                  Practice with sample exercises before starting the real modules.
                </p>
                <div className="flex gap-3">
                  <Link
                    href="/modules"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-purple-600 font-medium rounded-xl hover:bg-white/90 transition-all"
                  >
                    <span>Start Training Module</span>
                  </Link>
                  <button className="px-5 py-2.5 bg-white/20 text-white font-medium rounded-xl hover:bg-white/30 transition-all">
                    Maybe Later
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Link
            href="/modules"
            className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-purple-200 hover:shadow-lg transition-all flex items-center gap-4"
          >
            {/* [ICON-BROWSE] */}
            <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center flex-shrink-0">
              <span className="text-purple-600 text-xl font-bold">M</span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Browse Modules</h3>
              <p className="text-sm text-gray-500">Explore all available learning modules</p>
            </div>
          </Link>

          <Link
            href="/about"
            className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-purple-200 hover:shadow-lg transition-all flex items-center gap-4"
          >
            {/* [ICON-TRAINING] */}
            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
              <span className="text-blue-600 text-xl font-bold">T</span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Learn About the Program</h3>
              <p className="text-sm text-gray-500">Understand how Brain Parenthood works</p>
            </div>
          </Link>
        </div>

        {/* Continue Learning Section */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100">
          <h3 className="font-semibold text-gray-900 mb-2">Continue Learning</h3>
          <p className="text-sm text-gray-500 mb-4">Pick up where you left off</p>
          <Link
            href={`/module/${currentModule}`}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all"
          >
            Continue Module
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </AppLayout>
  );
}
