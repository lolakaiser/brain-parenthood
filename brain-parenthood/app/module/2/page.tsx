"use client";

import Link from "next/link";
import { useState, useEffect, useCallback, memo } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

type StepType = 'overview' | 'practice' | 'reflection' | 'complete';

const STEPS = [
  { id: 'overview' as const, label: 'Overview' },
  { id: 'practice' as const, label: 'Practice' },
  { id: 'reflection' as const, label: 'Reflection' },
  { id: 'complete' as const, label: 'Complete' },
];

const GRADIENT_STYLE = 'linear-gradient(135deg, #9333ea 0%, #3b82f6 100%)';

const ACTIVE_STEP_STYLE = {
  filter: 'drop-shadow(0px 0px 2px #9333ea) drop-shadow(0px 0px 4px #3b82f6)',
  fontWeight: '900' as const
};

export default function Module2Page() {
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
            href="/modules"
            className="inline-flex items-center gap-2 text-white hover:text-gray-300 font-medium mb-4 transition-colors group"
          >
            <span className="transform group-hover:-translate-x-1 transition-transform">←</span>
            Back to Modules
          </Link>
          <div className="flex items-center gap-4 mb-2">
            <h1 className="text-5xl font-extrabold text-white">
              Module 2: Mindfulness Foundation
            </h1>
          </div>
          <p className="text-xl text-white">
            Week 2 - Build Your Mindfulness Practice
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
          {currentStep === 'overview' && <OverviewStep onNext={() => handleSetStep('practice')} />}
          {currentStep === 'practice' && (
            <PracticeStep
              onNext={() => handleSetStep('reflection')}
              onBack={() => handleSetStep('overview')}
            />
          )}
          {currentStep === 'reflection' && (
            <ReflectionStep
              onNext={() => handleSetStep('complete')}
              onBack={() => handleSetStep('practice')}
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
            Welcome to Mindfulness Foundation
          </h2>
        </div>

        <div className="prose max-w-none mb-8 space-y-6">
          <p className="text-xl text-white leading-relaxed">
            Mindfulness is the foundation of resilience. This week, you'll learn practical
            techniques to stay present, reduce stress, and improve focus through mindful awareness.
          </p>

          <div className="bg-[#2D3E50] rounded-2xl p-8 border border-white/20">
            <h3 className="text-2xl font-bold mb-4 text-[#A78BFA]">What is Mindfulness?</h3>
            <p className="text-white leading-relaxed">
              Mindfulness is the practice of purposefully focusing your attention on the present moment
              and accepting it without judgment. Research shows that regular mindfulness practice
              reduces stress by 30-40% and improves cognitive function.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-[#2D3E50] rounded-2xl p-6 shadow-lg border border-white/20">
              <h4 className="font-bold text-lg mb-3 text-[#FB8989]">Benefits of Mindfulness</h4>
              <ul className="space-y-3 text-white">
                <li className="flex items-start">
                  <span className="text-[#FB8989] mr-2 text-xl">✓</span>
                  <div>
                    <strong>Reduced Stress:</strong> Lower cortisol levels and anxiety
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-[#FB8989] mr-2 text-xl">✓</span>
                  <div>
                    <strong>Better Focus:</strong> Improved concentration and productivity
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-[#FB8989] mr-2 text-xl">✓</span>
                  <div>
                    <strong>Emotional Balance:</strong> Greater self-awareness and regulation
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-[#2D3E50] rounded-2xl p-6 shadow-lg border border-white/20">
              <h4 className="font-bold text-lg mb-3 text-[#7DD3FC]">Module 2 Objectives</h4>
              <ul className="space-y-3 text-white">
                <li className="flex items-start">
                  <span>Learn 3 core mindfulness techniques</span>
                </li>
                <li className="flex items-start">
                  <span>Practice daily 5-minute mindfulness</span>
                </li>
                <li className="flex items-start">
                  <span>Reflect on your present-moment awareness</span>
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
            <span>Begin Mindfulness Practice</span>
            <span className="text-2xl transform group-hover:translate-x-1 transition-transform">→</span>
          </button>
        </div>
      </div>
    </div>
  );
});

const PracticeStep = memo(function PracticeStep({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const [selectedTechnique, setSelectedTechnique] = useState<string | null>(null);

  const techniques = [
    {
      id: 'breath',
      title: 'Breath Awareness',
      description: 'Focus on your breath as an anchor to the present moment',
      steps: [
        'Find a comfortable seated position',
        'Close your eyes or soften your gaze',
        'Notice your natural breath - don\'t force it',
        'Count 10 breaths, noting "in" and "out"',
        'When your mind wanders, gently return to the breath'
      ]
    },
    {
      id: 'body',
      title: 'Body Scan',
      description: 'Systematically relax your body from head to toe',
      steps: [
        'Lie down or sit comfortably',
        'Start with your toes - notice sensations',
        'Slowly move attention up: feet, legs, torso',
        'Continue to arms, neck, and head',
        'Release tension as you go'
      ]
    },
    {
      id: 'observation',
      title: 'Mindful Observation',
      description: 'Practice focused attention on a single object',
      steps: [
        'Choose an object (plant, art, your hand)',
        'Observe it as if seeing it for the first time',
        'Notice colors, textures, shadows, details',
        'When thoughts arise, acknowledge and return',
        'Continue for 5 minutes'
      ]
    }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-[#3A4F63] rounded-3xl shadow-2xl p-10 border border-white/10">
        <h2 className="text-3xl font-bold mb-6 text-center text-white">
          Choose Your Mindfulness Practice
        </h2>
        <p className="text-center text-gray-300 mb-8">
          Select a technique to learn and practice this week
        </p>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {techniques.map((technique) => (
            <div
              key={technique.id}
              onClick={() => setSelectedTechnique(technique.id)}
              className={`bg-[#2D3E50] rounded-2xl p-6 cursor-pointer transition-all duration-300 border-2
                ${selectedTechnique === technique.id
                  ? 'border-purple-500 shadow-xl scale-105'
                  : 'border-white/20 hover:border-white/40 hover:scale-102'
                }`}
            >
              <h3 className="font-bold text-xl mb-4 text-white text-center">{technique.title}</h3>
              <p className="text-gray-300 text-sm text-center">{technique.description}</p>
            </div>
          ))}
        </div>

        {selectedTechnique && (
          <div className="bg-[#2D3E50] rounded-2xl p-8 border border-purple-500/50 animate-fade-in">
            <h3 className="font-bold text-2xl mb-4 text-[#A78BFA]">
              {techniques.find(t => t.id === selectedTechnique)?.title} - Step by Step
            </h3>
            <ol className="space-y-3 text-white">
              {techniques.find(t => t.id === selectedTechnique)?.steps.map((step, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                    {index + 1}
                  </span>
                  <span className="pt-1">{step}</span>
                </li>
              ))}
            </ol>
            <div className="mt-6 p-4 bg-purple-900/30 rounded-xl border border-purple-500/30">
              <p className="text-white text-sm">
                <strong className="text-[#A78BFA]">Pro Tip:</strong> Practice this technique for 5 minutes daily.
                Set a timer and create a consistent time and place for your practice.
              </p>
            </div>
          </div>
        )}

        <div className="flex justify-between items-center mt-10 pt-8 border-t border-white/10">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white
                     transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 group bg-gradient-to-r from-purple-600 to-blue-600"
            style={{ background: GRADIENT_STYLE }}
          >
            <span className="transform group-hover:-translate-x-1 transition-transform">←</span>
            <span>Back</span>
          </button>
          <button
            onClick={onNext}
            disabled={!selectedTechnique}
            className={`inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white
                     transition-all duration-200 shadow-lg group
                     ${selectedTechnique
                       ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 hover:shadow-xl hover:scale-105 active:scale-95'
                       : 'bg-white/10 cursor-not-allowed opacity-50'
                     }`}
            style={selectedTechnique ? { background: GRADIENT_STYLE } : undefined}
          >
            <span>Continue to Reflection</span>
            <span className="transform group-hover:translate-x-1 transition-transform">→</span>
          </button>
        </div>
      </div>
    </div>
  );
});

const ReflectionStep = memo(function ReflectionStep({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const [reflection, setReflection] = useState({
    experience: '',
    challenges: '',
    commitment: ''
  });

  const questions = [
    {
      id: 'experience',
      title: 'How was your mindfulness practice?',
      placeholder: 'Describe your experience with the technique you chose...',
      icon: '💭'
    },
    {
      id: 'challenges',
      title: 'What challenges did you notice?',
      placeholder: 'E.g., wandering thoughts, physical discomfort, time constraints...',
      icon: '🤔'
    },
    {
      id: 'commitment',
      title: 'How will you practice daily this week?',
      placeholder: 'E.g., 5 minutes each morning before work, during lunch break...',
      icon: '📅'
    }
  ];

  const isComplete = Object.values(reflection).every(val => val.trim().length > 0);

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-[#3A4F63] rounded-3xl shadow-2xl p-10 border border-white/10">
        <h2 className="text-3xl font-bold mb-6 text-center text-white">
          Reflect on Your Practice
        </h2>
        <p className="text-center text-gray-300 mb-8">
          Reflection deepens learning and builds commitment
        </p>

        <div className="space-y-6">
          {questions.map((question) => (
            <div key={question.id} className="bg-[#2D3E50] rounded-2xl p-6 border border-white/20">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">{question.icon}</span>
                <h3 className="font-bold text-lg text-white">{question.title}</h3>
              </div>
              <textarea
                value={reflection[question.id as keyof typeof reflection]}
                onChange={(e) => setReflection({ ...reflection, [question.id]: e.target.value })}
                className="w-full px-4 py-3 text-lg bg-[#2D3E50] text-white border-2 border-white/20 rounded-xl
                         focus:ring-4 focus:ring-purple-500/50 focus:border-purple-500 transition-all shadow-lg resize-none placeholder-gray-400"
                rows={4}
                placeholder={question.placeholder}
              />
            </div>
          ))}
        </div>

        <div className="mt-8 p-6 bg-purple-900/20 rounded-2xl border border-purple-500/30">
          <h4 className="font-bold text-lg mb-3 text-[#A78BFA]">Weekly Practice Goal</h4>
          <p className="text-white">
            Commit to practicing your chosen mindfulness technique for at least 5 minutes daily.
            Consistency is more important than duration. Track your practice and notice the changes!
          </p>
        </div>

        <div className="flex justify-between items-center mt-10 pt-8 border-t border-white/10">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white
                     transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 group bg-gradient-to-r from-purple-600 to-blue-600"
            style={{ background: GRADIENT_STYLE }}
          >
            <span className="transform group-hover:-translate-x-1 transition-transform">←</span>
            <span>Back</span>
          </button>
          <button
            onClick={onNext}
            disabled={!isComplete}
            className={`inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white
                     transition-all duration-200 shadow-lg group
                     ${isComplete
                       ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 hover:shadow-xl hover:scale-105 active:scale-95'
                       : 'bg-white/10 cursor-not-allowed opacity-50'
                     }`}
            style={isComplete ? { background: GRADIENT_STYLE } : undefined}
          >
            <span>Complete Module</span>
            <span className="transform group-hover:translate-x-1 transition-transform">→</span>
          </button>
        </div>
      </div>
    </div>
  );
});

const CompleteStep = memo(function CompleteStep() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-[#3A4F63] rounded-3xl shadow-2xl p-12 border border-white/10 text-center animate-fade-in">
        <h2 className="text-5xl font-bold mb-6 text-white">
          Module 2 Complete! 🧘
        </h2>
        <p className="text-xl text-white mb-10 max-w-2xl mx-auto leading-relaxed">
          You've taken an important step in building your mindfulness foundation. Remember,
          the benefits of mindfulness grow with consistent daily practice.
        </p>

        <div className="bg-[#2D3E50] rounded-2xl p-8 mb-10 text-left max-w-2xl mx-auto border border-white/20">
          <h3 className="font-bold text-2xl mb-6 text-[#6EE7B7] flex items-center gap-2">
            <span>Continue Your Journey</span>
          </h3>
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3 bg-[#3A4F63] rounded-xl p-4 shadow-md border border-white/10">
              <div>
                <strong className="text-[#A78BFA]">Practice daily</strong>
                <p className="text-sm text-gray-300">5 minutes minimum - consistency builds the habit</p>
              </div>
            </li>
            <li className="flex items-start gap-3 bg-[#3A4F63] rounded-xl p-4 shadow-md border border-white/10">
              <div>
                <strong className="text-[#FB8989]">Track your progress</strong>
                <p className="text-sm text-gray-300">Notice how mindfulness affects your stress and focus</p>
              </div>
            </li>
            <li className="flex items-start gap-3 bg-[#3A4F63] rounded-xl p-4 shadow-md border border-white/10">
              <div>
                <strong className="text-[#7DD3FC]">Move to Module 3</strong>
                <p className="text-sm text-gray-300">Cognitive Restructuring - Transform your thinking patterns</p>
              </div>
            </li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/dashboard"
            className="group inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-10 py-5 rounded-2xl font-bold text-lg
                     hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95"
            style={{ background: GRADIENT_STYLE }}
          >
            <span>View Dashboard</span>
            <span className="transform group-hover:translate-x-1 transition-transform">→</span>
          </Link>
          <Link
            href="/modules"
            className="inline-flex items-center gap-3 px-10 py-5 rounded-2xl font-bold text-lg text-white
                     transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 bg-gradient-to-r from-purple-600 to-blue-600"
            style={{ background: GRADIENT_STYLE }}
          >
            <span>All Modules</span>
          </Link>
        </div>
      </div>
    </div>
  );
});
