"use client";

import Link from "next/link";
import { useState, useEffect, useCallback, memo } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { saveBaseline, saveGoals, completeModule, type BaselineData, type GoalsData } from "@/lib/storage";

type StepType = 'overview' | 'baseline' | 'goals' | 'complete';

const STEPS = [
  { id: 'overview' as const, label: 'Overview' },
  { id: 'baseline' as const, label: 'Assessment' },
  { id: 'goals' as const, label: 'Goals' },
  { id: 'complete' as const, label: 'Complete' },
];

export default function Module1Page() {
  const [currentStep, setCurrentStep] = useState<StepType>('overview');
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  const handleSetStep = useCallback((step: StepType) => {
    setCurrentStep(step);
  }, []);

  if (!isAuthenticated) {
    return null;
  }

  const currentStepIndex = STEPS.findIndex(s => s.id === currentStep);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto py-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium mb-6 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link>
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Module 1: Foundation
            </h1>
            <p className="text-lg text-gray-600">
              Week 1 • Establish baseline and set goals
            </p>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto py-5">
          <div className="flex items-center justify-between gap-4">
            {STEPS.map((step, index) => (
              <div key={step.id} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  {/* Step Circle */}
                  <div className="flex items-center justify-center mb-2">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                        index === currentStepIndex
                          ? 'bg-purple-600 text-white'
                          : index < currentStepIndex
                          ? 'bg-purple-600 text-white'
                          : 'bg-gray-200 text-gray-600'
                      }`}
                    >
                      {index + 1}
                    </div>
                  </div>
                  {/* Step Label */}
                  <span
                    className={`text-xs font-medium text-center transition-colors ${
                      index <= currentStepIndex ? 'text-gray-900' : 'text-gray-500'
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
                {/* Connector Line */}
                {index < STEPS.length - 1 && (
                  <div className="flex-1 h-0.5 -mt-6 mx-2">
                    <div
                      className={`h-full transition-all duration-300 ${
                        index < currentStepIndex ? 'bg-purple-600' : 'bg-gray-200'
                      }`}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto py-10">
        {currentStep === 'overview' && <OverviewStep onNext={() => handleSetStep('baseline')} />}
        {currentStep === 'baseline' && (
          <BaselineStep
            onNext={() => handleSetStep('goals')}
            onBack={() => handleSetStep('overview')}
          />
        )}
        {currentStep === 'goals' && (
          <GoalsStep
            onNext={() => handleSetStep('complete')}
            onBack={() => handleSetStep('baseline')}
          />
        )}
        {currentStep === 'complete' && <CompleteStep />}
      </div>
    </div>
  );
}

const OverviewStep = memo(function OverviewStep({ onNext }: { onNext: () => void }) {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-8 md:p-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            Welcome to Brain Parenthood
          </h2>
          <p className="text-lg text-gray-600">
            A 12-week program to build team resilience and performance
          </p>
        </div>

        <div className="prose prose-gray max-w-none mb-10">
          <p className="text-gray-700 leading-relaxed">
            Just like raising a child, developing your team's collective intelligence requires
            patience, structure, and care. This program will train your team's "brain"
            through psychological resilience training.
          </p>
        </div>

        {/* Info Card */}
        <div className="bg-white rounded-2xl p-6 mb-8 border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900 mb-3">What is Brain Parenthood?</h3>
          <p className="text-gray-600 leading-relaxed">
            A comprehensive toolkit designed to reduce stress, improve mental
            health, and boost productivity across your entire team. Build lasting resilience and
            performance improvements through structured development.
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          {/* Why This Matters */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </span>
              Why This Matters
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-gray-700">
                <span className="w-1.5 h-1.5 bg-purple-600 rounded-full mt-2.5 flex-shrink-0"></span>
                <span><strong className="font-medium text-gray-900">Reduce Stress:</strong> Lower stress levels lead to better mental health</span>
              </li>
              <li className="flex items-start gap-3 text-gray-700">
                <span className="w-1.5 h-1.5 bg-purple-600 rounded-full mt-2.5 flex-shrink-0"></span>
                <span><strong className="font-medium text-gray-900">Improve Performance:</strong> Resilient teams handle challenges effectively</span>
              </li>
              <li className="flex items-start gap-3 text-gray-700">
                <span className="w-1.5 h-1.5 bg-purple-600 rounded-full mt-2.5 flex-shrink-0"></span>
                <span><strong className="font-medium text-gray-900">Track Progress:</strong> Measure growth from beginning to end</span>
              </li>
            </ul>
          </div>

          {/* Module Objectives */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </span>
              Module 1 Objectives
            </h4>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                <span>Establish baseline of your team's current state</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                <span>Set clear, achievable goals for 12 weeks</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                <span>Understand Brain Parenthood concepts</span>
              </li>
            </ul>
          </div>
        </div>

        {/* CTA Button */}
        <div className="flex justify-center">
          <button
            onClick={onNext}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-10 py-4 rounded-2xl font-bold transition-all shadow-md hover:shadow-lg text-lg"
          >
            Continue to Assessment
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
});

const BaselineStep = memo(function BaselineStep({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [formData, setFormData] = useState({
    teamStressLevel: 5,
    individualStressLevel: 5,
    productivity: 5,
    communication: 5,
    workLifeBalance: 5,
    teamSize: '',
    primaryChallenges: '',
  });

  const questions = [
    {
      id: 'teamStressLevel',
      title: 'Overall Team Stress Level',
      description: 'How would you rate the overall stress level across your team?',
      type: 'slider' as const,
      min: 1,
      max: 10,
      minLabel: 'Low Stress',
      maxLabel: 'High Stress',
    },
    {
      id: 'individualStressLevel',
      title: 'Your Individual Stress Level',
      description: 'How stressed do you personally feel right now?',
      type: 'slider' as const,
      min: 1,
      max: 10,
      minLabel: 'Very Calm',
      maxLabel: 'Very Stressed',
    },
    {
      id: 'productivity',
      title: 'Team Productivity',
      description: 'How productive is your team currently?',
      type: 'slider' as const,
      min: 1,
      max: 10,
      minLabel: 'Low',
      maxLabel: 'High',
    },
    {
      id: 'communication',
      title: 'Team Communication Quality',
      description: 'How well does your team communicate?',
      type: 'slider' as const,
      min: 1,
      max: 10,
      minLabel: 'Poor',
      maxLabel: 'Excellent',
    },
    {
      id: 'workLifeBalance',
      title: 'Work-Life Balance',
      description: 'How would you rate your team\'s work-life balance?',
      type: 'slider' as const,
      min: 1,
      max: 10,
      minLabel: 'Poor',
      maxLabel: 'Excellent',
    },
    {
      id: 'teamSize',
      title: 'Team Size',
      description: 'How many people are on your team?',
      type: 'number' as const,
      placeholder: 'Enter number',
    },
    {
      id: 'primaryChallenges',
      title: 'Primary Challenges',
      description: 'What are the main challenges your team is facing right now?',
      type: 'textarea' as const,
      placeholder: 'Describe your team\'s challenges...',
    },
  ];

  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Save baseline data to localStorage
      const baselineData: BaselineData = {
        teamStressLevel: formData.teamStressLevel,
        individualStressLevel: formData.individualStressLevel,
        productivity: formData.productivity,
        communication: formData.communication,
        workLifeBalance: formData.workLifeBalance,
        teamSize: formData.teamSize,
        primaryChallenges: formData.primaryChallenges,
      };
      saveBaseline(baselineData);
      console.log('Baseline data saved:', baselineData);
      onNext();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    } else {
      onBack();
    }
  };

  const isAnswered = () => {
    const value = formData[currentQ.id as keyof typeof formData];
    if (currentQ.type === 'slider') return true;
    return value !== '';
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress Header */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm font-semibold text-purple-600">Baseline Assessment</span>
          <span className="text-sm font-medium text-gray-600">
            Question {currentQuestion + 1} of {questions.length}
          </span>
        </div>
        <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-purple-600 to-blue-600 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-8 md:p-10">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {currentQ.title}
          </h2>
          <p className="text-gray-600">
            {currentQ.description}
          </p>
        </div>

        <div className="mb-12">
          {currentQ.type === 'slider' && (
            <div className="space-y-8">
              <div className="flex justify-center">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-purple-600 text-white text-3xl font-bold rounded-3xl">
                  {formData[currentQ.id as keyof typeof formData]}
                </div>
              </div>
              <div>
                <input
                  type="range"
                  min={currentQ.min}
                  max={currentQ.max}
                  value={formData[currentQ.id as keyof typeof formData] as number}
                  onChange={(e) => setFormData({ ...formData, [currentQ.id]: parseInt(e.target.value) })}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                  style={{
                    background: `linear-gradient(to right, #9333ea 0%, #9333ea ${((formData[currentQ.id as keyof typeof formData] as number - currentQ.min) / (currentQ.max - currentQ.min)) * 100}%, #e5e7eb ${((formData[currentQ.id as keyof typeof formData] as number - currentQ.min) / (currentQ.max - currentQ.min)) * 100}%, #e5e7eb 100%)`
                  }}
                />
                <div className="flex justify-between mt-2">
                  <span className="text-sm text-gray-500">{currentQ.minLabel}</span>
                  <span className="text-sm text-gray-500">{currentQ.maxLabel}</span>
                </div>
              </div>
            </div>
          )}

          {currentQ.type === 'number' && (
            <div className="flex justify-center">
              <input
                type="number"
                min="1"
                value={formData[currentQ.id as keyof typeof formData]}
                onChange={(e) => setFormData({ ...formData, [currentQ.id]: e.target.value })}
                className="w-32 px-4 py-3 text-4xl font-bold text-center text-gray-900 bg-white border-2 border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                placeholder={currentQ.placeholder}
              />
            </div>
          )}

          {currentQ.type === 'textarea' && (
            <div className="max-w-2xl mx-auto">
              <textarea
                value={formData[currentQ.id as keyof typeof formData]}
                onChange={(e) => setFormData({ ...formData, [currentQ.id]: e.target.value })}
                className="w-full px-5 py-4 text-base text-gray-900 bg-white border-2 border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                rows={5}
                placeholder={currentQ.placeholder}
              />
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center pt-8 border-t border-gray-200">
          <button
            onClick={handlePrevious}
            className="inline-flex items-center gap-2 px-6 py-3 text-gray-700 hover:text-gray-900 font-semibold transition-colors hover:bg-gray-50 rounded-2xl"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
          <button
            onClick={handleNext}
            disabled={!isAnswered()}
            className={`inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-lg transition-all ${
              isAnswered()
                ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-md hover:shadow-lg'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            {currentQuestion === questions.length - 1 ? 'Continue' : 'Next'}
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
});

function GoalsStep({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [goals, setGoals] = useState({
    stressReduction: '',
    productivityGoal: '',
    communicationGoal: '',
    personalGoal: '',
    teamGoal: '',
    successMetrics: '',
  });

  const questions = [
    {
      id: 'stressReduction',
      title: 'Stress Reduction Goal',
      description: 'What specific stress reduction goal do you want to achieve?',
      type: 'text' as const,
      placeholder: 'e.g., Reduce team stress level from 7 to 4',
    },
    {
      id: 'productivityGoal',
      title: 'Productivity Goal',
      description: 'How do you want to improve your team\'s productivity?',
      type: 'text' as const,
      placeholder: 'e.g., Increase team productivity by 25%',
    },
    {
      id: 'communicationGoal',
      title: 'Communication Goal',
      description: 'What communication improvements do you want to see?',
      type: 'text' as const,
      placeholder: 'e.g., Daily check-ins and weekly retrospectives',
    },
    {
      id: 'personalGoal',
      title: 'Personal Development Goal',
      description: 'What do you personally want to achieve in the next 12 weeks?',
      type: 'textarea' as const,
      placeholder: 'Describe your personal development goals...',
    },
    {
      id: 'teamGoal',
      title: 'Team Development Goal',
      description: 'What does your team want to achieve together?',
      type: 'textarea' as const,
      placeholder: 'Describe your team\'s collective goals...',
    },
    {
      id: 'successMetrics',
      title: 'Success Metrics',
      description: 'How will you measure success at the end of 12 weeks?',
      type: 'textarea' as const,
      placeholder: 'Define specific metrics or indicators...',
    },
  ];

  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Save goals data to localStorage
      const goalsData: GoalsData = {
        stressReduction: goals.stressReduction,
        productivityGoal: goals.productivityGoal,
        communicationGoal: goals.communicationGoal,
        personalGoal: goals.personalGoal,
        teamGoal: goals.teamGoal,
        successMetrics: goals.successMetrics,
      };
      saveGoals(goalsData);
      // Mark Module 1 as complete
      completeModule(1);
      console.log('Goals data saved and Module 1 completed:', goalsData);
      onNext();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    } else {
      onBack();
    }
  };

  const isAnswered = () => {
    const value = goals[currentQ.id as keyof typeof goals];
    return value.trim() !== '';
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress Header */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm font-semibold text-purple-600">Goal Setting</span>
          <span className="text-sm font-medium text-gray-600">
            Question {currentQuestion + 1} of {questions.length}
          </span>
        </div>
        <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-purple-600 to-blue-600 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-8 md:p-10">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {currentQ.title}
          </h2>
          <p className="text-gray-600">
            {currentQ.description}
          </p>
        </div>

        <div className="mb-12">
          {currentQ.type === 'text' && (
            <div className="max-w-xl mx-auto">
              <input
                type="text"
                value={goals[currentQ.id as keyof typeof goals]}
                onChange={(e) => setGoals({ ...goals, [currentQ.id]: e.target.value })}
                className="w-full px-5 py-3 text-base text-gray-900 bg-white border-2 border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                placeholder={currentQ.placeholder}
              />
            </div>
          )}

          {currentQ.type === 'textarea' && (
            <div className="max-w-2xl mx-auto">
              <textarea
                value={goals[currentQ.id as keyof typeof goals]}
                onChange={(e) => setGoals({ ...goals, [currentQ.id]: e.target.value })}
                className="w-full px-5 py-4 text-base text-gray-900 bg-white border-2 border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                rows={5}
                placeholder={currentQ.placeholder}
              />
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center pt-8 border-t border-gray-200">
          <button
            onClick={handlePrevious}
            className="inline-flex items-center gap-2 px-6 py-3 text-gray-700 hover:text-gray-900 font-semibold transition-colors hover:bg-gray-50 rounded-2xl"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
          <button
            onClick={handleNext}
            disabled={!isAnswered()}
            className={`inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-lg transition-all ${
              isAnswered()
                ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-md hover:shadow-lg'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            {currentQuestion === questions.length - 1 ? 'Complete' : 'Next'}
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

function CompleteStep() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-10 text-center">
        {/* Success Icon */}
        <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mb-6">
          <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h2 className="text-3xl font-bold text-gray-900 mb-3">
          Module 1 Complete!
        </h2>
        <p className="text-lg text-gray-600 mb-10 max-w-lg mx-auto">
          You've established your baseline and set clear goals for your Brain Parenthood journey.
        </p>

        {/* Next Steps */}
        <div className="bg-white rounded-2xl p-6 mb-10 text-left border border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            What's Next?
          </h3>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="w-5 h-5 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-purple-600 text-xs font-semibold">1</span>
              </span>
              <div>
                <p className="font-medium text-gray-900">Review your personalized plan</p>
                <p className="text-sm text-gray-600">Check your dashboard for detailed insights</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-5 h-5 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-purple-600 text-xs font-semibold">2</span>
              </span>
              <div>
                <p className="font-medium text-gray-900">Share goals with your team</p>
                <p className="text-sm text-gray-600">Get everyone aligned on the journey ahead</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-5 h-5 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-purple-600 text-xs font-semibold">3</span>
              </span>
              <div>
                <p className="font-medium text-gray-900">Prepare for Module 2</p>
                <p className="text-sm text-gray-600">Mindfulness Foundation</p>
              </div>
            </li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            View Dashboard
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 text-gray-700 hover:text-gray-900 font-semibold transition-colors border border-gray-300 rounded-lg hover:border-gray-400"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
