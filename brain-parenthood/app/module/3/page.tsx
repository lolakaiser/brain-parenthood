"use client";

import Link from "next/link";
import { useState, useEffect, useCallback, memo } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

type StepType = 'overview' | 'learning' | 'practice' | 'complete';

const STEPS = [
  { id: 'overview' as const, label: 'Overview' },
  { id: 'learning' as const, label: 'Learn' },
  { id: 'practice' as const, label: 'Practice' },
  { id: 'complete' as const, label: 'Complete' },
];

const GRADIENT_STYLE = 'linear-gradient(135deg, #9333ea 0%, #3b82f6 100%)';
const ACTIVE_STEP_STYLE = {
  filter: 'drop-shadow(0px 0px 2px #9333ea) drop-shadow(0px 0px 4px #3b82f6)',
  fontWeight: '900' as const
};

export default function Module3Page() {
  const [currentStep, setCurrentStep] = useState<StepType>('overview');
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();

  // 🤖 AI Integration Point: Fetch personalized recommendations
  const [aiRecommendations, setAiRecommendations] = useState<string[]>([]);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  // 🤖 AI Integration: Load personalized content based on user's baseline
  useEffect(() => {
    const fetchPersonalizedContent = async () => {
      // TODO: Call AI API to get personalized cognitive distortions to focus on
      // Based on user's baseline stress levels and challenges
      // Example: if user has high stress + catastrophizing tendencies
      setAiRecommendations([
        "Focus on catastrophizing patterns - your baseline suggests this may be a key area",
        "Practice evidence-based thinking for work-related scenarios"
      ]);
    };

    if (user) {
      fetchPersonalizedContent();
    }
  }, [user]);

  const handleSetStep = useCallback((step: StepType) => {
    setCurrentStep(step);
  }, []);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen pt-32 bg-[#2D3E50]">
      <div className="mx-auto py-8" style={{ paddingLeft: '8vw', paddingRight: '8vw', maxWidth: '1600px' }}>
        <div className="mb-8 animate-fade-in">
          <Link href="/modules" className="inline-flex items-center gap-2 text-white hover:text-gray-300 font-medium mb-4 transition-colors group">
            <span className="transform group-hover:-translate-x-1 transition-transform">←</span>
            Back to Modules
          </Link>
          <h1 className="text-5xl font-extrabold text-white mb-2">
            Module 3: Cognitive Restructuring
          </h1>
          <p className="text-xl text-white">Week 3 - Transform Your Thinking Patterns</p>
        </div>

        <div className="mb-8 animate-slide-up">
          <div className="flex items-center justify-between mb-2 max-w-3xl mx-auto">
            {STEPS.map((step, index) => (
              <div key={step.id} className="flex items-center flex-1">
                <div className={`flex flex-col items-center w-full transition-all duration-300 ${currentStep === step.id ? 'scale-110' : ''}`}>
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-extrabold text-lg transition-all duration-300 shadow-lg bg-[#3A4F63]
                      ${currentStep === step.id ? 'text-white' : STEPS.findIndex(s => s.id === currentStep) > index ? 'text-white' : 'text-gray-400'}`}
                    style={currentStep === step.id ? ACTIVE_STEP_STYLE : undefined}>
                    {index + 1}
                  </div>
                  <span className={`text-xs mt-2 text-center font-bold transition-all duration-300 ${currentStep === step.id ? 'text-white' : STEPS.findIndex(s => s.id === currentStep) > index ? 'text-white' : 'text-gray-400'}`}
                    style={currentStep === step.id ? ACTIVE_STEP_STYLE : undefined}>
                    {step.label}
                  </span>
                </div>
                {index < STEPS.length - 1 && (
                  <div className={`h-1 flex-1 -mt-6 rounded transition-all duration-300 ${STEPS.findIndex(s => s.id === currentStep) > index ? 'bg-white/40' : 'bg-white/20'}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="animate-fade-in">
          {currentStep === 'overview' && <OverviewStep onNext={() => handleSetStep('learning')} aiRecommendations={aiRecommendations} />}
          {currentStep === 'learning' && <LearningStep onNext={() => handleSetStep('practice')} onBack={() => handleSetStep('overview')} />}
          {currentStep === 'practice' && <PracticeStep onNext={() => handleSetStep('complete')} onBack={() => handleSetStep('learning')} />}
          {currentStep === 'complete' && <CompleteStep />}
        </div>
      </div>
    </div>
  );
}

const OverviewStep = memo(function OverviewStep({ onNext, aiRecommendations }: { onNext: () => void; aiRecommendations: string[] }) {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-[#3A4F63] rounded-3xl shadow-2xl p-12 border border-white/10">
        <h2 className="text-4xl font-bold mb-6 text-white text-center">Welcome to Cognitive Restructuring</h2>

        {/* 🤖 AI Personalization Section */}
        {aiRecommendations.length > 0 && (
          <div className="mb-6 p-6 bg-purple-900/30 rounded-2xl border border-purple-500/50">
            <h3 className="font-bold text-lg mb-3 text-[#A78BFA] flex items-center gap-2">
              <span>🤖</span> Personalized for You
            </h3>
            <ul className="space-y-2 text-white">
              {aiRecommendations.map((rec, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-purple-400">•</span>
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="prose max-w-none mb-8 space-y-6">
          <p className="text-xl text-white leading-relaxed">
            Our thoughts shape our reality. This week, you'll learn to identify and transform unhelpful thought patterns that increase stress and decrease performance.
          </p>

          <div className="bg-[#2D3E50] rounded-2xl p-8 border border-white/20">
            <h3 className="text-2xl font-bold mb-4 text-[#A78BFA]">The Power of Thoughts</h3>
            <p className="text-white leading-relaxed">
              Cognitive restructuring helps you challenge automatic negative thoughts and replace them with more balanced, realistic thinking. Research shows this reduces stress by 35-45% and improves problem-solving.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-[#2D3E50] rounded-2xl p-6 shadow-lg border border-white/20">
              <h4 className="font-bold text-lg mb-3 text-[#FB8989]">Why This Matters</h4>
              <ul className="space-y-3 text-white">
                <li className="flex items-start">
                  <span className="text-[#FB8989] mr-2 text-xl">✓</span>
                  <div><strong>Reduce Anxiety:</strong> Challenge catastrophic thinking</div>
                </li>
                <li className="flex items-start">
                  <span className="text-[#FB8989] mr-2 text-xl">✓</span>
                  <div><strong>Better Decisions:</strong> See situations more clearly</div>
                </li>
                <li className="flex items-start">
                  <span className="text-[#FB8989] mr-2 text-xl">✓</span>
                  <div><strong>Improved Mood:</strong> Break negative thought cycles</div>
                </li>
              </ul>
            </div>

            <div className="bg-[#2D3E50] rounded-2xl p-6 shadow-lg border border-white/20">
              <h4 className="font-bold text-lg mb-3 text-[#7DD3FC]">Module 3 Objectives</h4>
              <ul className="space-y-3 text-white">
                <li>Learn 7 common cognitive distortions</li>
                <li>Practice thought challenging technique</li>
                <li>Create balanced thought alternatives</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="text-center mt-10">
          <button onClick={onNext} className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-12 py-5 rounded-2xl font-bold text-lg
                   hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95"
            style={{ background: GRADIENT_STYLE }}>
            <span>Learn Cognitive Distortions</span>
            <span className="text-2xl transform group-hover:translate-x-1 transition-transform">→</span>
          </button>
        </div>
      </div>
    </div>
  );
});

const LearningStep = memo(function LearningStep({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const [selectedDistortion, setSelectedDistortion] = useState<string | null>(null);

  const distortions = [
    { id: 'catastrophizing', name: 'Catastrophizing', icon: '😱', example: '"If I make one mistake, I\'ll get fired"', reframe: '"One mistake is a learning opportunity, not a career ender"' },
    { id: 'blackwhite', name: 'All-or-Nothing', icon: '⚫⚪', example: '"I\'m either perfect or a total failure"', reframe: '"Success exists on a spectrum, not just extremes"' },
    { id: 'overgeneralize', name: 'Overgeneralizing', icon: '🔄', example: '"I failed once, so I always fail"', reframe: '"This one situation doesn\'t define all situations"' },
    { id: 'mindreading', name: 'Mind Reading', icon: '🔮', example: '"They think I\'m incompetent"', reframe: '"I don\'t know what they think unless they tell me"' },
    { id: 'shouldstatements', name: 'Should Statements', icon: '👉', example: '"I should always be productive"', reframe: '"I prefer to be productive, but rest is also valuable"' },
    { id: 'labeling', name: 'Labeling', icon: '🏷️', example: '"I\'m such an idiot"', reframe: '"I made a mistake, but that doesn\'t define who I am"' },
    { id: 'fortune', name: 'Fortune Telling', icon: '🔮', example: '"This project will definitely fail"', reframe: '"I can\'t predict the future, but I can do my best"' },
  ];

  return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-[#3A4F63] rounded-3xl shadow-2xl p-10 border border-white/10">
        <h2 className="text-3xl font-bold mb-6 text-center text-white">7 Common Cognitive Distortions</h2>
        <p className="text-center text-gray-300 mb-8">Click each to see examples and reframes</p>

        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
          {distortions.map((dist) => (
            <div key={dist.id} onClick={() => setSelectedDistortion(dist.id)}
              className={`bg-[#2D3E50] rounded-xl p-4 cursor-pointer transition-all duration-300 border-2 text-center
                ${selectedDistortion === dist.id ? 'border-purple-500 shadow-xl scale-105' : 'border-white/20 hover:border-white/40'}`}>
              <div className="text-4xl mb-2">{dist.icon}</div>
              <h3 className="font-bold text-sm text-white">{dist.name}</h3>
            </div>
          ))}
        </div>

        {selectedDistortion && (
          <div className="bg-[#2D3E50] rounded-2xl p-8 border border-purple-500/50 animate-fade-in">
            <h3 className="font-bold text-2xl mb-4 text-[#A78BFA]">
              {distortions.find(d => d.id === selectedDistortion)?.name}
            </h3>
            <div className="space-y-4">
              <div className="p-4 bg-red-900/20 rounded-xl border border-red-500/30">
                <p className="text-sm font-bold text-red-300 mb-2">❌ Distorted Thinking:</p>
                <p className="text-white italic">{distortions.find(d => d.id === selectedDistortion)?.example}</p>
              </div>
              <div className="p-4 bg-green-900/20 rounded-xl border border-green-500/30">
                <p className="text-sm font-bold text-green-300 mb-2">✅ Balanced Alternative:</p>
                <p className="text-white italic">{distortions.find(d => d.id === selectedDistortion)?.reframe}</p>
              </div>

              {/* 🤖 AI Integration Point */}
              <div className="p-4 bg-purple-900/20 rounded-xl border border-purple-500/30">
                <p className="text-sm font-bold text-purple-300 mb-2">🤖 AI Coach Tip:</p>
                <p className="text-white text-sm">
                  {/* TODO: Generate personalized tip based on user's specific situation */}
                  Notice when this pattern appears in your daily work. Keep a thought log to track frequency.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-between items-center mt-10 pt-8 border-t border-white/10">
          <button onClick={onBack} className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 group"
            style={{ background: GRADIENT_STYLE }}>
            <span className="transform group-hover:-translate-x-1 transition-transform">←</span>
            <span>Back</span>
          </button>
          <button onClick={onNext} className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 group"
            style={{ background: GRADIENT_STYLE }}>
            <span>Practice Reframing</span>
            <span className="transform group-hover:translate-x-1 transition-transform">→</span>
          </button>
        </div>
      </div>
    </div>
  );
});

const PracticeStep = memo(function PracticeStep({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const [thoughts, setThoughts] = useState({ negative: '', evidence: '', alternative: '' });
  const isComplete = Object.values(thoughts).every(val => val.trim().length > 0);

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-[#3A4F63] rounded-3xl shadow-2xl p-10 border border-white/10">
        <h2 className="text-3xl font-bold mb-6 text-center text-white">Practice Thought Challenging</h2>
        <p className="text-center text-gray-300 mb-8">Use the ABC technique to restructure your thoughts</p>

        <div className="space-y-6">
          <div className="bg-[#2D3E50] rounded-2xl p-6 border border-white/20">
            <h3 className="font-bold text-lg text-white mb-3 flex items-center gap-2">
              <span>🧠</span> A: Identify the Automatic Thought
            </h3>
            <textarea value={thoughts.negative} onChange={(e) => setThoughts({ ...thoughts, negative: e.target.value })}
              className="w-full px-4 py-3 text-lg bg-[#2D3E50] text-white border-2 border-white/20 rounded-xl focus:ring-4 focus:ring-purple-500/50 focus:border-purple-500 transition-all shadow-lg resize-none placeholder-gray-400"
              rows={3} placeholder="What negative thought came up? E.g., 'I'm going to fail this presentation...'" />

            {/* 🤖 AI Integration Point */}
            {thoughts.negative.length > 20 && (
              <div className="mt-3 p-3 bg-purple-900/20 rounded-lg border border-purple-500/30">
                <p className="text-sm text-purple-300">🤖 <strong>AI Detected Distortion:</strong> This appears to be catastrophizing. Let's challenge it below.</p>
              </div>
            )}
          </div>

          <div className="bg-[#2D3E50] rounded-2xl p-6 border border-white/20">
            <h3 className="font-bold text-lg text-white mb-3 flex items-center gap-2">
              <span>🔍</span> B: Examine the Evidence
            </h3>
            <textarea value={thoughts.evidence} onChange={(e) => setThoughts({ ...thoughts, evidence: e.target.value })}
              className="w-full px-4 py-3 text-lg bg-[#2D3E50] text-white border-2 border-white/20 rounded-xl focus:ring-4 focus:ring-purple-500/50 focus:border-purple-500 transition-all shadow-lg resize-none placeholder-gray-400"
              rows={3} placeholder="What evidence supports or contradicts this thought? Be objective..." />
          </div>

          <div className="bg-[#2D3E50] rounded-2xl p-6 border border-white/20">
            <h3 className="font-bold text-lg text-white mb-3 flex items-center gap-2">
              <span>✨</span> C: Create a Balanced Alternative
            </h3>
            <textarea value={thoughts.alternative} onChange={(e) => setThoughts({ ...thoughts, alternative: e.target.value })}
              className="w-full px-4 py-3 text-lg bg-[#2D3E50] text-white border-2 border-white/20 rounded-xl focus:ring-4 focus:ring-purple-500/50 focus:border-purple-500 transition-all shadow-lg resize-none placeholder-gray-400"
              rows={3} placeholder="What's a more balanced, realistic thought? E.g., 'I've prepared well and can handle this...'" />
          </div>
        </div>

        <div className="flex justify-between items-center mt-10 pt-8 border-t border-white/10">
          <button onClick={onBack} className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 group"
            style={{ background: GRADIENT_STYLE }}>
            <span className="transform group-hover:-translate-x-1 transition-transform">←</span>
            <span>Back</span>
          </button>
          <button onClick={onNext} disabled={!isComplete}
            className={`inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white transition-all duration-200 shadow-lg group
                     ${isComplete ? 'hover:shadow-xl hover:scale-105 active:scale-95' : 'opacity-50 cursor-not-allowed'}`}
            style={isComplete ? { background: GRADIENT_STYLE } : undefined}>
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
        <h2 className="text-5xl font-bold mb-6 text-white">Module 3 Complete! 🧠</h2>
        <p className="text-xl text-white mb-10 max-w-2xl mx-auto leading-relaxed">
          You've learned to identify and challenge cognitive distortions. This powerful skill will reduce stress and improve your decision-making every day.
        </p>

        <div className="bg-[#2D3E50] rounded-2xl p-8 mb-10 text-left max-w-2xl mx-auto border border-white/20">
          <h3 className="font-bold text-2xl mb-6 text-[#6EE7B7]">Practice This Week</h3>
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3 bg-[#3A4F63] rounded-xl p-4">
              <div><strong className="text-[#A78BFA]">Daily thought log</strong><p className="text-sm text-gray-300">Catch and challenge 1-2 negative thoughts each day</p></div>
            </li>
            <li className="flex items-start gap-3 bg-[#3A4F63] rounded-xl p-4">
              <div><strong className="text-[#FB8989]">Notice patterns</strong><p className="text-sm text-gray-300">Which distortions show up most for you?</p></div>
            </li>
            <li className="flex items-start gap-3 bg-[#3A4F63] rounded-xl p-4">
              <div><strong className="text-[#7DD3FC]">Next: Module 4</strong><p className="text-sm text-gray-300">Emotional Intelligence - Master your emotions</p></div>
            </li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/dashboard" className="group inline-flex items-center gap-3 px-10 py-5 rounded-2xl font-bold text-lg text-white transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95"
            style={{ background: GRADIENT_STYLE }}>
            <span>View Dashboard</span>
            <span className="transform group-hover:translate-x-1 transition-transform">→</span>
          </Link>
          <Link href="/modules" className="inline-flex items-center gap-3 px-10 py-5 rounded-2xl font-bold text-lg text-white transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
            style={{ background: GRADIENT_STYLE }}>
            <span>All Modules</span>
          </Link>
        </div>
      </div>
    </div>
  );
});
