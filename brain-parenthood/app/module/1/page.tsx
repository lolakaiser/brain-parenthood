"use client";

import Link from "next/link";
import { useState } from "react";

export default function Module1Page() {
  const [currentStep, setCurrentStep] = useState<'overview' | 'baseline' | 'goals' | 'complete'>('overview');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="text-blue-600 hover:underline mb-4 inline-block">
            ← Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Module 1: Kick Off</h1>
          <p className="text-lg text-gray-600">
            Week 1 - Establish Your Baseline and Set Goals
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center flex-1">
                <div className="flex flex-col items-center w-full">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold
                      ${currentStep === step.id || steps.findIndex(s => s.id === currentStep) > index
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-300 text-gray-600'
                      }`}
                  >
                    {index + 1}
                  </div>
                  <span className="text-xs mt-2 text-center">{step.label}</span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`h-1 flex-1 -mt-6 ${
                      steps.findIndex(s => s.id === currentStep) > index
                        ? 'bg-blue-600'
                        : 'bg-gray-300'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-md p-8">
          {currentStep === 'overview' && <OverviewStep onNext={() => setCurrentStep('baseline')} />}
          {currentStep === 'baseline' && (
            <BaselineStep
              onNext={() => setCurrentStep('goals')}
              onBack={() => setCurrentStep('overview')}
            />
          )}
          {currentStep === 'goals' && (
            <GoalsStep
              onNext={() => setCurrentStep('complete')}
              onBack={() => setCurrentStep('baseline')}
            />
          )}
          {currentStep === 'complete' && <CompleteStep />}
        </div>
      </div>
    </div>
  );
}

const steps = [
  { id: 'overview', label: 'Overview' },
  { id: 'baseline', label: 'Baseline' },
  { id: 'goals', label: 'Goals' },
  { id: 'complete', label: 'Complete' },
];

function OverviewStep({ onNext }: { onNext: () => void }) {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Welcome to Brain Parenthood!</h2>

      <div className="prose max-w-none mb-8">
        <p className="text-lg text-gray-700 mb-4">
          Just like raising a child, developing your team's collective intelligence requires
          patience, structure, and care. This 12-week program will train your team's "brain"
          through psychological resilience training.
        </p>

        <h3 className="text-2xl font-semibold mt-8 mb-4">What is Brain Parenthood?</h3>
        <p className="text-gray-700 mb-4">
          Brain Parenthood is a comprehensive toolkit designed to reduce stress, improve mental
          health, and boost productivity across your entire team. By treating your team's
          development like nurturing a growing mind, you'll build lasting resilience and
          performance improvements.
        </p>

        <h3 className="text-2xl font-semibold mt-8 mb-4">Why This Matters</h3>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>
            <strong>Reduce Stress:</strong> Lower stress levels lead to better mental health
            and increased productivity
          </li>
          <li>
            <strong>Improve Team Performance:</strong> A resilient team handles challenges
            more effectively
          </li>
          <li>
            <strong>Track Progress:</strong> Modular design makes it easy to see growth from
            beginning to end
          </li>
          <li>
            <strong>Sustainable Results:</strong> Build habits that last beyond the 12 weeks
          </li>
        </ul>

        <h3 className="text-2xl font-semibold mt-8 mb-4">Module 1 Objectives</h3>
        <div className="bg-blue-50 border-l-4 border-blue-600 p-6 mb-6">
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">✓</span>
              <span>Establish a baseline understanding of your team's current state</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">✓</span>
              <span>Set clear, achievable goals for the 12-week program</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">✓</span>
              <span>Understand the core concepts of Brain Parenthood</span>
            </li>
          </ul>
        </div>
      </div>

      <button
        onClick={onNext}
        className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold
                 hover:bg-blue-700 transition-colors duration-200"
      >
        Continue to Baseline Assessment
      </button>
    </div>
  );
}

function BaselineStep({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const [formData, setFormData] = useState({
    teamStressLevel: 5,
    individualStressLevel: 5,
    productivity: 5,
    communication: 5,
    workLifeBalance: 5,
    teamSize: '',
    primaryChallenges: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Send to backend API
    console.log('Baseline data:', formData);
    onNext();
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Baseline Assessment</h2>
      <p className="text-gray-700 mb-8">
        This assessment will help us understand your team's current state and create a
        personalized plan for your journey.
      </p>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Team Stress Level */}
        <div>
          <label className="block text-lg font-semibold mb-3">
            Overall Team Stress Level
          </label>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">Low</span>
            <input
              type="range"
              min="1"
              max="10"
              value={formData.teamStressLevel}
              onChange={(e) => setFormData({ ...formData, teamStressLevel: parseInt(e.target.value) })}
              className="flex-1"
            />
            <span className="text-sm text-gray-600">High</span>
            <span className="font-bold text-blue-600 w-8 text-center">
              {formData.teamStressLevel}
            </span>
          </div>
        </div>

        {/* Individual Stress Level */}
        <div>
          <label className="block text-lg font-semibold mb-3">
            Your Individual Stress Level
          </label>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">Low</span>
            <input
              type="range"
              min="1"
              max="10"
              value={formData.individualStressLevel}
              onChange={(e) => setFormData({ ...formData, individualStressLevel: parseInt(e.target.value) })}
              className="flex-1"
            />
            <span className="text-sm text-gray-600">High</span>
            <span className="font-bold text-blue-600 w-8 text-center">
              {formData.individualStressLevel}
            </span>
          </div>
        </div>

        {/* Productivity */}
        <div>
          <label className="block text-lg font-semibold mb-3">
            Team Productivity
          </label>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">Low</span>
            <input
              type="range"
              min="1"
              max="10"
              value={formData.productivity}
              onChange={(e) => setFormData({ ...formData, productivity: parseInt(e.target.value) })}
              className="flex-1"
            />
            <span className="text-sm text-gray-600">High</span>
            <span className="font-bold text-blue-600 w-8 text-center">
              {formData.productivity}
            </span>
          </div>
        </div>

        {/* Communication */}
        <div>
          <label className="block text-lg font-semibold mb-3">
            Team Communication Quality
          </label>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">Poor</span>
            <input
              type="range"
              min="1"
              max="10"
              value={formData.communication}
              onChange={(e) => setFormData({ ...formData, communication: parseInt(e.target.value) })}
              className="flex-1"
            />
            <span className="text-sm text-gray-600">Excellent</span>
            <span className="font-bold text-blue-600 w-8 text-center">
              {formData.communication}
            </span>
          </div>
        </div>

        {/* Work-Life Balance */}
        <div>
          <label className="block text-lg font-semibold mb-3">
            Work-Life Balance
          </label>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">Poor</span>
            <input
              type="range"
              min="1"
              max="10"
              value={formData.workLifeBalance}
              onChange={(e) => setFormData({ ...formData, workLifeBalance: parseInt(e.target.value) })}
              className="flex-1"
            />
            <span className="text-sm text-gray-600">Excellent</span>
            <span className="font-bold text-blue-600 w-8 text-center">
              {formData.workLifeBalance}
            </span>
          </div>
        </div>

        {/* Team Size */}
        <div>
          <label className="block text-lg font-semibold mb-3">
            Team Size
          </label>
          <input
            type="number"
            value={formData.teamSize}
            onChange={(e) => setFormData({ ...formData, teamSize: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2
                     focus:ring-blue-600 focus:border-transparent"
            placeholder="Number of team members"
            required
          />
        </div>

        {/* Primary Challenges */}
        <div>
          <label className="block text-lg font-semibold mb-3">
            What are your team's primary challenges?
          </label>
          <textarea
            value={formData.primaryChallenges}
            onChange={(e) => setFormData({ ...formData, primaryChallenges: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2
                     focus:ring-blue-600 focus:border-transparent"
            rows={4}
            placeholder="Describe the main challenges your team is facing..."
            required
          />
        </div>

        <div className="flex justify-between pt-6">
          <button
            type="button"
            onClick={onBack}
            className="px-6 py-3 border border-gray-300 rounded-lg font-semibold
                     hover:bg-gray-50 transition-colors duration-200"
          >
            Back
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold
                     hover:bg-blue-700 transition-colors duration-200"
          >
            Continue to Goals
          </button>
        </div>
      </form>
    </div>
  );
}

function GoalsStep({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const [goals, setGoals] = useState({
    stressReduction: '',
    productivityGoal: '',
    communicationGoal: '',
    personalGoal: '',
    teamGoal: '',
    successMetrics: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Send to backend API
    console.log('Goals data:', goals);
    onNext();
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Set Your Goals</h2>
      <p className="text-gray-700 mb-8">
        Based on your baseline assessment, let's set specific, achievable goals for the next
        12 weeks. These will guide your personalized Brain Parenthood journey.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-lg font-semibold mb-3">
            Stress Reduction Goal
          </label>
          <input
            type="text"
            value={goals.stressReduction}
            onChange={(e) => setGoals({ ...goals, stressReduction: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2
                     focus:ring-blue-600 focus:border-transparent"
            placeholder="e.g., Reduce team stress level from 7 to 4"
            required
          />
        </div>

        <div>
          <label className="block text-lg font-semibold mb-3">
            Productivity Goal
          </label>
          <input
            type="text"
            value={goals.productivityGoal}
            onChange={(e) => setGoals({ ...goals, productivityGoal: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2
                     focus:ring-blue-600 focus:border-transparent"
            placeholder="e.g., Increase team productivity by 25%"
            required
          />
        </div>

        <div>
          <label className="block text-lg font-semibold mb-3">
            Communication Goal
          </label>
          <input
            type="text"
            value={goals.communicationGoal}
            onChange={(e) => setGoals({ ...goals, communicationGoal: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2
                     focus:ring-blue-600 focus:border-transparent"
            placeholder="e.g., Establish daily check-ins and weekly retrospectives"
            required
          />
        </div>

        <div>
          <label className="block text-lg font-semibold mb-3">
            Personal Development Goal
          </label>
          <textarea
            value={goals.personalGoal}
            onChange={(e) => setGoals({ ...goals, personalGoal: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2
                     focus:ring-blue-600 focus:border-transparent"
            rows={3}
            placeholder="What do you personally want to achieve?"
            required
          />
        </div>

        <div>
          <label className="block text-lg font-semibold mb-3">
            Team Development Goal
          </label>
          <textarea
            value={goals.teamGoal}
            onChange={(e) => setGoals({ ...goals, teamGoal: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2
                     focus:ring-blue-600 focus:border-transparent"
            rows={3}
            placeholder="What does your team want to achieve together?"
            required
          />
        </div>

        <div>
          <label className="block text-lg font-semibold mb-3">
            How Will You Measure Success?
          </label>
          <textarea
            value={goals.successMetrics}
            onChange={(e) => setGoals({ ...goals, successMetrics: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2
                     focus:ring-blue-600 focus:border-transparent"
            rows={3}
            placeholder="Define specific metrics or indicators of success..."
            required
          />
        </div>

        <div className="flex justify-between pt-6">
          <button
            type="button"
            onClick={onBack}
            className="px-6 py-3 border border-gray-300 rounded-lg font-semibold
                     hover:bg-gray-50 transition-colors duration-200"
          >
            Back
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold
                     hover:bg-blue-700 transition-colors duration-200"
          >
            Complete Module 1
          </button>
        </div>
      </form>
    </div>
  );
}

function CompleteStep() {
  return (
    <div className="text-center py-8">
      <div className="text-6xl mb-6">🎉</div>
      <h2 className="text-3xl font-bold mb-4">Congratulations!</h2>
      <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
        You've completed Module 1! You've established your baseline and set clear goals for
        your Brain Parenthood journey. Your personalized plan is being generated based on your
        inputs.
      </p>

      <div className="bg-blue-50 border-l-4 border-blue-600 p-6 mb-8 text-left max-w-2xl mx-auto">
        <h3 className="font-semibold text-lg mb-3">What's Next?</h3>
        <ul className="space-y-2 text-gray-700">
          <li className="flex items-start">
            <span className="text-blue-600 mr-2">→</span>
            <span>Review your personalized plan in the dashboard</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-600 mr-2">→</span>
            <span>Share your goals with your team</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-600 mr-2">→</span>
            <span>Prepare for Module 2: Mindfulness Foundation (coming soon)</span>
          </li>
        </ul>
      </div>

      <div className="space-x-4">
        <Link
          href="/dashboard"
          className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold
                   hover:bg-blue-700 transition-colors duration-200"
        >
          View Dashboard
        </Link>
        <Link
          href="/"
          className="inline-block border border-gray-300 px-8 py-3 rounded-lg font-semibold
                   hover:bg-gray-50 transition-colors duration-200"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
