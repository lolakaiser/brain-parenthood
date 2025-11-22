"use client";

import Link from "next/link";
import { useState, useEffect, useCallback, memo, useMemo } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

type StepType = 'overview' | 'baseline' | 'goals' | 'complete';

// Constants moved outside component for performance
const STEPS = [
  { id: 'overview' as const, label: 'Overview' },
  { id: 'baseline' as const, label: 'Baseline' },
  { id: 'goals' as const, label: 'Goals' },
  { id: 'complete' as const, label: 'Complete' },
];

const GRADIENT_STYLE = 'linear-gradient(135deg, #9333ea 0%, #3b82f6 100%)';

const ACTIVE_STEP_STYLE = {
  filter: 'drop-shadow(0px 0px 2px #9333ea) drop-shadow(0px 0px 4px #3b82f6)',
  fontWeight: '900' as const
};

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

  return (
    <div className="min-h-screen pt-32 bg-[#2D3E50]">
      <div className="mx-auto py-8" style={{ paddingLeft: '8vw', paddingRight: '8vw', maxWidth: '1600px' }}>
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white hover:text-gray-300 font-medium mb-4 transition-colors group"
          >
            <span className="transform group-hover:-translate-x-1 transition-transform">←</span>
            Back to Home
          </Link>
          <div className="flex items-center gap-4 mb-2">
            <h1 className="text-5xl font-extrabold text-white">
              Module 1: Kick Off
            </h1>
          </div>
          <p className="text-xl text-white">
            Week 1 - Establish Your Baseline and Set Goals
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="mb-8 animate-slide-up">
          <div className="flex items-center justify-between mb-2 max-w-3xl mx-auto">
            {STEPS.map((step, index) => (
              <div key={step.id} className="flex items-center flex-1">
                <div className={`flex flex-col items-center w-full transition-all duration-300 ${
                  currentStep === step.id ? 'scale-110' : ''
                }`}>
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-extrabold text-lg
                      transition-all duration-300 shadow-lg bg-[#3A4F63]
                      ${currentStep === step.id
                        ? 'text-white'
                        : STEPS.findIndex(s => s.id === currentStep) > index
                        ? 'text-white'
                        : 'text-gray-400'
                      }`}
                    style={currentStep === step.id ? ACTIVE_STEP_STYLE : undefined}
                  >
                    {index + 1}
                  </div>
                  <span
                    className={`text-xs mt-2 text-center font-bold transition-all duration-300 ${
                      currentStep === step.id
                        ? 'text-white'
                        : STEPS.findIndex(s => s.id === currentStep) > index
                        ? 'text-white'
                        : 'text-gray-400'
                    }`}
                    style={currentStep === step.id ? ACTIVE_STEP_STYLE : undefined}
                  >
                    {step.label}
                  </span>
                </div>
                {index < STEPS.length - 1 && (
                  <div
                    className={`h-1 flex-1 -mt-6 rounded transition-all duration-300 ${
                      STEPS.findIndex(s => s.id === currentStep) > index
                        ? 'bg-white/40'
                        : 'bg-white/20'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="animate-fade-in">
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
    </div>
  );
}

const OverviewStep = memo(function OverviewStep({ onNext }: { onNext: () => void }) {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-[#3A4F63] rounded-3xl shadow-2xl p-12 border border-white/10">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold mb-6 text-white">
            Welcome to Brain Parenthood!
          </h2>
        </div>

        <div className="prose max-w-none mb-8 space-y-6">
          <p className="text-xl text-white leading-relaxed">
            Just like raising a child, developing your team's collective intelligence requires
            patience, structure, and care. This 12-week program will train your team's "brain"
            through psychological resilience training.
          </p>

          <div className="bg-[#2D3E50] rounded-2xl p-8 border border-white/20">
            <h3 className="text-2xl font-bold mb-4 text-[#A78BFA]">What is Brain Parenthood?</h3>
            <p className="text-white leading-relaxed">
              Brain Parenthood is a comprehensive toolkit designed to reduce stress, improve mental
              health, and boost productivity across your entire team. By treating your team's
              development like nurturing a growing mind, you'll build lasting resilience and
              performance improvements.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-[#2D3E50] rounded-2xl p-6 shadow-lg border border-white/20">
              <h4 className="font-bold text-lg mb-3 text-[#FB8989]">Why This Matters</h4>
              <ul className="space-y-3 text-white">
                <li className="flex items-start">
                  <span className="text-[#FB8989] mr-2 text-xl">✓</span>
                  <div>
                    <strong>Reduce Stress:</strong> Lower stress levels lead to better mental health
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-[#FB8989] mr-2 text-xl">✓</span>
                  <div>
                    <strong>Improve Performance:</strong> A resilient team handles challenges effectively
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-[#FB8989] mr-2 text-xl">✓</span>
                  <div>
                    <strong>Track Progress:</strong> Easy to see growth from beginning to end
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-[#2D3E50] rounded-2xl p-6 shadow-lg border border-white/20">
              <h4 className="font-bold text-lg mb-3 text-[#7DD3FC]">Module 1 Objectives</h4>
              <ul className="space-y-3 text-white">
                <li className="flex items-start">
                  <span>Establish baseline of your team's current state</span>
                </li>
                <li className="flex items-start">
                  <span>Set clear, achievable goals for 12 weeks</span>
                </li>
                <li className="flex items-start">
                  <span>Understand Brain Parenthood concepts</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="text-center mt-10">
          <button
            onClick={onNext}
            className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-12 py-5 rounded-2xl font-bold text-lg
                     hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95"
            style={{ background: GRADIENT_STYLE }}
          >
            <span>Continue to Baseline Assessment</span>
            <span className="text-2xl transform group-hover:translate-x-1 transition-transform">→</span>
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
      icon: '😰',
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
      icon: '🧘',
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
      icon: '⚡',
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
      icon: '💬',
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
      icon: '⚖️',
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
      icon: '👥',
      type: 'number' as const,
      placeholder: 'Enter number of team members',
    },
    {
      id: 'primaryChallenges',
      title: 'Primary Challenges',
      description: 'What are the main challenges your team is facing right now?',
      icon: '🎯',
      type: 'textarea' as const,
      placeholder: 'Describe your team\'s challenges in detail...',
    },
  ];

  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      console.log('Baseline data:', formData);
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
    <div className="max-w-3xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-semibold text-[#A78BFA]">Baseline Assessment</span>
          <span className="text-sm font-semibold text-white">
            Question {currentQuestion + 1} of {questions.length}
          </span>
        </div>
        <div className="h-3 bg-white/20 rounded-full overflow-hidden shadow-inner">
          <div
            className="h-full bg-gradient-to-r from-purple-600 to-blue-600 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-[#3A4F63] rounded-3xl shadow-2xl p-10 border border-white/10 min-h-[500px] flex flex-col justify-between animate-slide-up">
        <div>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4 text-white">
              {currentQ.title}
            </h2>
            <p className="text-lg text-gray-300">
              {currentQ.description}
            </p>
          </div>

          <div className="mt-8">
            {currentQ.type === 'slider' && (
              <div className="space-y-6">
                <div className="text-center">
                  <div className="inline-block bg-gradient-to-br from-purple-600 to-blue-600 text-white text-5xl font-bold px-8 py-4 rounded-3xl shadow-xl">
                    {formData[currentQ.id as keyof typeof formData]}
                  </div>
                </div>
                <div className="px-4">
                  <input
                    type="range"
                    min={currentQ.min}
                    max={currentQ.max}
                    value={formData[currentQ.id as keyof typeof formData] as number}
                    onChange={(e) => setFormData({ ...formData, [currentQ.id]: parseInt(e.target.value) })}
                    className="w-full h-3 bg-white/20 rounded-lg appearance-none cursor-pointer slider-thumb"
                  />
                  <div className="flex justify-between mt-3">
                    <span className="text-sm font-medium text-gray-300">{currentQ.minLabel}</span>
                    <span className="text-sm font-medium text-gray-300">{currentQ.maxLabel}</span>
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
                  className="w-48 px-6 py-4 text-2xl text-center bg-[#2D3E50] text-white border-2 border-white/20 rounded-2xl
                           focus:ring-4 focus:ring-purple-500/50 focus:border-purple-500 transition-all shadow-lg placeholder-gray-400"
                  placeholder={currentQ.placeholder}
                />
              </div>
            )}

            {currentQ.type === 'textarea' && (
              <div className="max-w-2xl mx-auto">
                <textarea
                  value={formData[currentQ.id as keyof typeof formData]}
                  onChange={(e) => setFormData({ ...formData, [currentQ.id]: e.target.value })}
                  className="w-full px-6 py-4 text-lg bg-[#2D3E50] text-white border-2 border-white/20 rounded-2xl
                           focus:ring-4 focus:ring-purple-500/50 focus:border-purple-500 transition-all shadow-lg resize-none placeholder-gray-400"
                  rows={6}
                  placeholder={currentQ.placeholder}
                />
              </div>
            )}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center mt-10 pt-8 border-t border-white/10">
          <button
            onClick={handlePrevious}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white
                     transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 group bg-gradient-to-r from-purple-600 to-blue-600"
            style={{ background: 'linear-gradient(135deg, #9333ea 0%, #3b82f6 100%)' }}
          >
            <span className="transform group-hover:-translate-x-1 transition-transform">←</span>
            <span>Back</span>
          </button>
          <button
            onClick={handleNext}
            disabled={!isAnswered()}
            className={`inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white
                     transition-all duration-200 shadow-lg group
                     ${isAnswered()
                       ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 hover:shadow-xl hover:scale-105 active:scale-95'
                       : 'bg-white/10 cursor-not-allowed opacity-50'
                     }`}
            style={isAnswered() ? { background: 'linear-gradient(135deg, #9333ea 0%, #3b82f6 100%)' } : undefined}
          >
            <span>{currentQuestion === questions.length - 1 ? 'Continue' : 'Next'}</span>
            <span className="transform group-hover:translate-x-1 transition-transform">→</span>
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
      icon: '🎯',
      type: 'text' as const,
      placeholder: 'e.g., Reduce team stress level from 7 to 4',
    },
    {
      id: 'productivityGoal',
      title: 'Productivity Goal',
      description: 'How do you want to improve your team\'s productivity?',
      icon: '📈',
      type: 'text' as const,
      placeholder: 'e.g., Increase team productivity by 25%',
    },
    {
      id: 'communicationGoal',
      title: 'Communication Goal',
      description: 'What communication improvements do you want to see?',
      icon: '💡',
      type: 'text' as const,
      placeholder: 'e.g., Establish daily check-ins and weekly retrospectives',
    },
    {
      id: 'personalGoal',
      title: 'Personal Development Goal',
      description: 'What do you personally want to achieve in the next 12 weeks?',
      icon: '⭐',
      type: 'textarea' as const,
      placeholder: 'Describe your personal development goals...',
    },
    {
      id: 'teamGoal',
      title: 'Team Development Goal',
      description: 'What does your team want to achieve together?',
      icon: '🤝',
      type: 'textarea' as const,
      placeholder: 'Describe your team\'s collective goals...',
    },
    {
      id: 'successMetrics',
      title: 'Success Metrics',
      description: 'How will you measure success at the end of 12 weeks?',
      icon: '📊',
      type: 'textarea' as const,
      placeholder: 'Define specific metrics or indicators of success...',
    },
  ];

  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      console.log('Goals data:', goals);
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
    <div className="max-w-3xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-semibold text-[#7DD3FC]">Goal Setting</span>
          <span className="text-sm font-semibold text-white">
            Question {currentQuestion + 1} of {questions.length}
          </span>
        </div>
        <div className="h-3 bg-white/20 rounded-full overflow-hidden shadow-inner">
          <div
            className="h-full bg-gradient-to-r from-purple-600 to-blue-600 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-[#3A4F63] rounded-3xl shadow-2xl p-10 border border-white/10 min-h-[500px] flex flex-col justify-between animate-slide-up">
        <div>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4 text-white">
              {currentQ.title}
            </h2>
            <p className="text-lg text-gray-300">
              {currentQ.description}
            </p>
          </div>

          <div className="mt-8">
            {currentQ.type === 'text' && (
              <div className="max-w-2xl mx-auto">
                <input
                  type="text"
                  value={goals[currentQ.id as keyof typeof goals]}
                  onChange={(e) => setGoals({ ...goals, [currentQ.id]: e.target.value })}
                  className="w-full px-6 py-4 text-lg bg-[#2D3E50] text-white border-2 border-white/20 rounded-2xl
                           focus:ring-4 focus:ring-purple-500/50 focus:border-purple-500 transition-all shadow-lg placeholder-gray-400"
                  placeholder={currentQ.placeholder}
                />
              </div>
            )}

            {currentQ.type === 'textarea' && (
              <div className="max-w-2xl mx-auto">
                <textarea
                  value={goals[currentQ.id as keyof typeof goals]}
                  onChange={(e) => setGoals({ ...goals, [currentQ.id]: e.target.value })}
                  className="w-full px-6 py-4 text-lg bg-[#2D3E50] text-white border-2 border-white/20 rounded-2xl
                           focus:ring-4 focus:ring-purple-500/50 focus:border-purple-500 transition-all shadow-lg resize-none placeholder-gray-400"
                  rows={6}
                  placeholder={currentQ.placeholder}
                />
              </div>
            )}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center mt-10 pt-8 border-t border-white/10">
          <button
            onClick={handlePrevious}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white
                     transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 group bg-gradient-to-r from-purple-600 to-blue-600"
            style={{ background: 'linear-gradient(135deg, #9333ea 0%, #3b82f6 100%)' }}
          >
            <span className="transform group-hover:-translate-x-1 transition-transform">←</span>
            <span>Back</span>
          </button>
          <button
            onClick={handleNext}
            disabled={!isAnswered()}
            className={`inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white
                     transition-all duration-200 shadow-lg group
                     ${isAnswered()
                       ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 hover:shadow-xl hover:scale-105 active:scale-95'
                       : 'bg-white/10 cursor-not-allowed opacity-50'
                     }`}
            style={isAnswered() ? { background: 'linear-gradient(135deg, #9333ea 0%, #3b82f6 100%)' } : undefined}
          >
            <span>{currentQuestion === questions.length - 1 ? 'Complete' : 'Next'}</span>
            <span className="transform group-hover:translate-x-1 transition-transform">→</span>
          </button>
        </div>
      </div>
    </div>
  );
}

function CompleteStep() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-[#3A4F63] rounded-3xl shadow-2xl p-12 border border-white/10 text-center animate-fade-in">
        <h2 className="text-5xl font-bold mb-6 text-white">
          Congratulations!
        </h2>
        <p className="text-xl text-white mb-10 max-w-2xl mx-auto leading-relaxed">
          You've completed Module 1! You've established your baseline and set clear goals for
          your Brain Parenthood journey. Your personalized plan is being generated based on your
          inputs.
        </p>

        <div className="bg-[#2D3E50] rounded-2xl p-8 mb-10 text-left max-w-2xl mx-auto border border-white/20">
          <h3 className="font-bold text-2xl mb-6 text-[#6EE7B7] flex items-center gap-2">
            <span>What's Next?</span>
          </h3>
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3 bg-[#3A4F63] rounded-xl p-4 shadow-md border border-white/10">
              <div>
                <strong className="text-[#A78BFA]">Review your personalized plan</strong>
                <p className="text-sm text-gray-300">Check your dashboard for detailed insights</p>
              </div>
            </li>
            <li className="flex items-start gap-3 bg-[#3A4F63] rounded-xl p-4 shadow-md border border-white/10">
              <div>
                <strong className="text-[#FB8989]">Share your goals with your team</strong>
                <p className="text-sm text-gray-300">Get everyone aligned on the journey ahead</p>
              </div>
            </li>
            <li className="flex items-start gap-3 bg-[#3A4F63] rounded-xl p-4 shadow-md border border-white/10">
              <div>
                <strong className="text-[#7DD3FC]">Prepare for Module 2</strong>
                <p className="text-sm text-gray-300">Mindfulness Foundation (coming soon)</p>
              </div>
            </li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/dashboard"
            className="group inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-10 py-5 rounded-2xl font-bold text-lg
                     hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95"
            style={{ background: 'linear-gradient(135deg, #9333ea 0%, #3b82f6 100%)' }}
          >
            <span>View Dashboard</span>
            <span className="transform group-hover:translate-x-1 transition-transform">→</span>
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-3 px-10 py-5 rounded-2xl font-bold text-lg text-white
                     transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 bg-gradient-to-r from-purple-600 to-blue-600"
            style={{ background: 'linear-gradient(135deg, #9333ea 0%, #3b82f6 100%)' }}
          >
            <span>←</span>
            <span>Back to Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
