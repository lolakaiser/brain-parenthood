"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getBaseline, getGoals, getProgress } from "@/lib/storage";
import Button from "@/components/ui/Button";
import Card, { CardBody } from "@/components/ui/Card";

export default function DashboardPage() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [dashboardData, setDashboardData] = useState({
    currentModule: 1,
    completedModules: [] as number[],
    baselineData: {
      teamStressLevel: 5,
      individualStressLevel: 5,
      productivity: 5,
      communication: 5,
      workLifeBalance: 5,
    },
    goals: {
      stressReduction: "Complete Module 1 to set your goals",
      productivityGoal: "Complete Module 1 to set your goals",
      communicationGoal: "Complete Module 1 to set your goals",
    },
    teamMembers: 0,
  });

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  // Load data from localStorage
  useEffect(() => {
    const baseline = getBaseline();
    const goals = getGoals();
    const progress = getProgress();

    if (baseline || goals || progress) {
      setDashboardData({
        currentModule: progress.currentModule || 1,
        completedModules: progress.completedModules || [],
        baselineData: baseline ? {
          teamStressLevel: baseline.teamStressLevel,
          individualStressLevel: baseline.individualStressLevel,
          productivity: baseline.productivity,
          communication: baseline.communication,
          workLifeBalance: baseline.workLifeBalance,
        } : dashboardData.baselineData,
        goals: goals ? {
          stressReduction: goals.stressReduction || "Complete Module 1 to set your goals",
          productivityGoal: goals.productivityGoal || "Complete Module 1 to set your goals",
          communicationGoal: goals.communicationGoal || "Complete Module 1 to set your goals",
        } : dashboardData.goals,
        teamMembers: baseline ? parseInt(baseline.teamSize) || 0 : 0,
      });
    }
  }, []);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="app-container">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-heading-1 font-bold text-neutral-900 mb-2">Dashboard</h1>
          <p className="text-body-lg text-neutral-600">Track your progress and insights</p>
        </div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="text-label font-medium text-neutral-500 uppercase tracking-wide">Current Module</div>
              <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-primary-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
            </div>
            <div className="text-heading-1 font-bold text-neutral-900 mb-1">
              Module {dashboardData.currentModule}
            </div>
            <div className="text-body-sm text-neutral-600">Kick Off</div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="text-label font-medium text-neutral-500 uppercase tracking-wide">Progress</div>
              <div className="w-10 h-10 bg-success-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-success-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div className="text-heading-1 font-bold text-neutral-900 mb-1">
              {dashboardData.completedModules.length}/12
            </div>
            <div className="text-body-sm text-neutral-600">Modules Completed</div>
          </Card>

          <Card className="p-6 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center justify-between mb-4">
              <div className="text-label font-medium text-neutral-500 uppercase tracking-wide">Team Size</div>
              <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-primary-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
            <div className="text-heading-1 font-bold text-neutral-900 mb-1">
              {dashboardData.teamMembers}
            </div>
            <div className="text-body-sm text-neutral-600">Team Members</div>
          </Card>
        </div>

        {/* Baseline Metrics */}
        <Card className="p-8 mb-10">
          <h2 className="text-heading-2 font-semibold text-neutral-900 mb-6">Baseline Metrics</h2>
          <div className="space-y-6">
            <MetricBar
              label="Team Stress Level"
              value={dashboardData.baselineData.teamStressLevel}
              max={10}
              color="error"
            />
            <MetricBar
              label="Individual Stress Level"
              value={dashboardData.baselineData.individualStressLevel}
              max={10}
              color="warning"
            />
            <MetricBar
              label="Team Productivity"
              value={dashboardData.baselineData.productivity}
              max={10}
              color="primary"
            />
            <MetricBar
              label="Communication Quality"
              value={dashboardData.baselineData.communication}
              max={10}
              color="success"
            />
            <MetricBar
              label="Work-Life Balance"
              value={dashboardData.baselineData.workLifeBalance}
              max={10}
              color="primary"
            />
          </div>
        </Card>

        {/* Goals */}
        <Card className="p-8 mb-10">
          <h2 className="text-heading-2 font-semibold text-neutral-900 mb-6">Your Goals</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-5 bg-neutral-50 rounded-lg">
              <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-primary-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="flex-1">
                <div className="font-semibold text-neutral-900 mb-1">Stress Reduction</div>
                <div className="text-body-sm text-neutral-600">{dashboardData.goals.stressReduction}</div>
              </div>
            </div>
            <div className="flex items-start gap-4 p-5 bg-neutral-50 rounded-lg">
              <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-primary-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <div className="flex-1">
                <div className="font-semibold text-neutral-900 mb-1">Productivity</div>
                <div className="text-body-sm text-neutral-600">{dashboardData.goals.productivityGoal}</div>
              </div>
            </div>
            <div className="flex items-start gap-4 p-5 bg-neutral-50 rounded-lg">
              <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-primary-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <div className="flex-1">
                <div className="font-semibold text-neutral-900 mb-1">Communication</div>
                <div className="text-body-sm text-neutral-600">{dashboardData.goals.communicationGoal}</div>
              </div>
            </div>
          </div>
        </Card>

        {/* AI Personalized Recommendations */}
        <Card className="p-8 mb-10 bg-primary-50 border-primary-200">
          <div className="flex items-center mb-5">
            <div className="w-12 h-12 bg-primary-700 rounded-lg flex items-center justify-center mr-4">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h2 className="text-heading-2 font-semibold text-neutral-900">AI-Powered Recommendations</h2>
          </div>
          <p className="text-body text-neutral-700 mb-5">
            Based on your baseline assessment and goals, here are personalized recommendations:
          </p>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-4 bg-white rounded-lg">
              <div className="w-6 h-6 bg-primary-700 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="w-2 h-2 bg-white rounded-full"></span>
              </div>
              <span className="text-body-sm text-neutral-700">
                Focus on stress reduction techniques in Module 2-3 (Mindfulness Foundation)
              </span>
            </div>
            <div className="flex items-start gap-3 p-4 bg-white rounded-lg">
              <div className="w-6 h-6 bg-primary-700 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="w-2 h-2 bg-white rounded-full"></span>
              </div>
              <span className="text-body-sm text-neutral-700">
                Schedule daily team check-ins to improve communication quality
              </span>
            </div>
            <div className="flex items-start gap-3 p-4 bg-white rounded-lg">
              <div className="w-6 h-6 bg-primary-700 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="w-2 h-2 bg-white rounded-full"></span>
              </div>
              <span className="text-body-sm text-neutral-700">
                Consider implementing flexible work hours to improve work-life balance
              </span>
            </div>
          </div>
          <p className="text-body-sm text-neutral-600 mt-4 italic">
            Note: AI personalization features will be fully implemented in a future update.
          </p>
        </Card>

        {/* Next Steps */}
        <Card className="p-8">
          <h2 className="text-heading-2 font-semibold text-neutral-900 mb-6">Next Steps</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-6 bg-neutral-50 rounded-lg border border-neutral-200">
              <div>
                <div className="font-semibold text-neutral-900 text-body-lg">Module 2: Mindfulness Foundation</div>
                <div className="text-body-sm text-neutral-600 mt-1">Focus and Clarity (Coming Soon)</div>
              </div>
              <Button variant="secondary" disabled>
                Coming Soon
              </Button>
            </div>
            <div className="flex items-center justify-between p-6 bg-primary-50 rounded-lg border border-primary-200">
              <div>
                <div className="font-semibold text-neutral-900 text-body-lg">Review Module 1</div>
                <div className="text-body-sm text-neutral-600 mt-1">Revisit your baseline and goals</div>
              </div>
              <Link href="/module/1">
                <Button variant="primary">
                  Review
                </Button>
              </Link>
            </div>
          </div>
        </Card>
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
  color: 'error' | 'warning' | 'primary' | 'success';
}) {
  const percentage = (value / max) * 100;
  const colorClasses: Record<string, string> = {
    error: 'bg-error-500',
    warning: 'bg-warning-500',
    primary: 'bg-primary-700',
    success: 'bg-success-500',
  };

  return (
    <div>
      <div className="flex justify-between mb-2">
        <span className="font-semibold text-neutral-900">{label}</span>
        <span className="text-neutral-600 text-body-sm">
          {value}/{max}
        </span>
      </div>
      <div className="w-full bg-neutral-200 rounded-full h-2">
        <div
          className={`h-2 rounded-full transition-all duration-300 ${colorClasses[color]}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
