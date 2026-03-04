"use client";

import Link from "next/link";
import { useState, useEffect, useCallback, memo } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import AppLayout from "@/components/AppLayout";
import { completeModule, saveModuleAnswers, getModuleAnswers, isModuleCompleted } from "@/lib/storage";
import ReviewStep from "@/components/ReviewStep";

type StepType = 'overview' | 'assessment' | 'goals' | 'review' | 'complete';

const STEPS = [
  { id: 'overview' as const, label: 'Overview' },
  { id: 'assessment' as const, label: 'Assessment' },
  { id: 'goals' as const, label: 'Goals' },
  { id: 'review' as const, label: 'Review' },
  { id: 'complete' as const, label: 'Complete' },
];

export default function Module2Page() {
  const [currentStep, setCurrentStep] = useState<StepType>('overview');
  const { isAuthenticated } = useAuth();
  const moduleId = 2;
  const isCompleted = isModuleCompleted(2);
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
    <AppLayout>
      {/* Hero Header */}
      <div style={{ background: 'linear-gradient(to right, #4F46E5, #7C3AED, #EC4899)', width: '100%' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 80px' }}>
          <Link
            href="/modules"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              color: 'rgba(255,255,255,0.7)',
              fontWeight: '500',
              marginBottom: '24px',
              textDecoration: 'none',
              fontSize: '14px',
            }}
          >
            ← Back to Modules
          </Link>
          <h1 style={{ fontSize: '36px', fontWeight: 'bold', color: 'white', marginBottom: '8px' }}>
            Module 2: How to Handle the Tough Stuff
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '18px' }}>
            Week 2 &bull; Coping strategies for difficult situations
          </p>
        </div>
      </div>

      {/* Step Progress Bar */}
      <div style={{ backgroundColor: 'white', borderBottom: '1px solid #E5E7EB' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px 80px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            {STEPS.map((step, index) => (
              <div key={step.id} style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '14px',
                      fontWeight: '600',
                      marginBottom: '8px',
                      backgroundColor: index <= currentStepIndex ? '#4F46E5' : '#E5E7EB',
                      color: index <= currentStepIndex ? 'white' : '#6B7280',
                    }}
                  >
                    {index + 1}
                  </div>
                  <span
                    style={{
                      fontSize: '12px',
                      fontWeight: '500',
                      color: index <= currentStepIndex ? '#111827' : '#9CA3AF',
                    }}
                  >
                    {step.label}
                  </span>
                </div>
                {index < STEPS.length - 1 && (
                  <div style={{ flex: 1, height: '2px', marginTop: '-24px', marginLeft: '8px', marginRight: '8px' }}>
                    <div
                      style={{
                        height: '100%',
                        backgroundColor: index < currentStepIndex ? '#4F46E5' : '#E5E7EB',
                      }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div style={{ backgroundColor: '#F5F7FA', minHeight: 'calc(100vh - 300px)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 80px' }}>
          {currentStep === 'overview' && <OverviewStep onNext={() => handleSetStep(isCompleted ? 'review' : 'assessment')} isCompleted={isCompleted} />}
          {currentStep === 'assessment' && (
            <AssessmentStep
              onNext={() => handleSetStep('goals')}
              onBack={() => handleSetStep('overview')}
              moduleId={2}
            />
          )}
          {currentStep === 'goals' && (
            <GoalsStep
              onNext={() => handleSetStep('review')}
              onBack={() => handleSetStep('assessment')}
              moduleId={2}
            />
          )}
          {currentStep === 'review' && <ReviewStep moduleId={2} onConfirm={() => { completeModule(2); handleSetStep('complete'); }} onBack={() => handleSetStep(isCompleted ? 'overview' : 'goals')} isReadOnly={isCompleted} />}
          {currentStep === 'complete' && <CompleteStep moduleId={2} nextModuleId={3} />}
        </div>
      </div>
    </AppLayout>
  );
}

const OverviewStep = memo(function OverviewStep({ onNext, isCompleted }: { onNext: () => void; isCompleted?: boolean }) {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '40px', border: '1px solid #E5E7EB', marginBottom: '40px', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
        <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#111827', marginBottom: '12px' }}>
          How to Handle the Tough Stuff
        </h2>
        <p style={{ fontSize: '16px', color: '#6B7280', marginBottom: '24px', lineHeight: '1.6' }}>
          Building resilience through conflict, anger, and stress management
        </p>
        <p style={{ fontSize: '15px', color: '#374151', lineHeight: '1.7' }}>
          Startup life is demanding. Conflict, frustration, and unexpected setbacks are unavoidable —
          but how you respond makes all the difference. This module equips you with practical coping
          strategies to handle difficult situations constructively and come out stronger on the other side.
        </p>
      </div>

      <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '40px', border: '1px solid #E5E7EB', marginBottom: '40px', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
        <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#111827', marginBottom: '12px' }}>What You'll Learn</h3>
        <p style={{ fontSize: '15px', color: '#6B7280', lineHeight: '1.7' }}>
          This module explores conflict resolution, anger management, and practical coping techniques.
          You will leave with a personal toolkit for handling workplace stress, managing your own
          emotional responses, and turning difficult interactions into opportunities for growth and understanding.
        </p>
      </div>

      <div style={{ display: 'flex', gap: '40px', marginBottom: '40px' }}>
        <div style={{ flex: 1, backgroundColor: 'white', borderRadius: '16px', padding: '40px', border: '1px solid #E5E7EB', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', backgroundColor: '#EEF2FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: '#4F46E5', fontSize: '16px' }}>⚡</span>
            </div>
            <h4 style={{ fontWeight: '600', color: '#111827', fontSize: '16px' }}>Why This Matters</h4>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#4F46E5', marginTop: '8px', flexShrink: 0 }} />
              <p style={{ color: '#374151', fontSize: '14px', lineHeight: '1.6' }}>
                <strong style={{ color: '#111827' }}>Handle Conflict Constructively:</strong> Turn disagreements into productive dialogue
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#4F46E5', marginTop: '8px', flexShrink: 0 }} />
              <p style={{ color: '#374151', fontSize: '14px', lineHeight: '1.6' }}>
                <strong style={{ color: '#111827' }}>Manage Anger Productively:</strong> Channel strong emotions into positive action
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#4F46E5', marginTop: '8px', flexShrink: 0 }} />
              <p style={{ color: '#374151', fontSize: '14px', lineHeight: '1.6' }}>
                <strong style={{ color: '#111827' }}>Build Stress Resilience:</strong> Recover faster from setbacks and high-pressure periods
              </p>
            </div>
          </div>
        </div>

        <div style={{ flex: 1, backgroundColor: 'white', borderRadius: '16px', padding: '40px', border: '1px solid #E5E7EB', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', backgroundColor: '#EEF2FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: '#4F46E5', fontSize: '16px' }}>📋</span>
            </div>
            <h4 style={{ fontWeight: '600', color: '#111827', fontSize: '16px' }}>Module 2 Objectives</h4>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#9CA3AF', marginTop: '8px', flexShrink: 0 }} />
              <p style={{ color: '#374151', fontSize: '14px', lineHeight: '1.6' }}>Learn conflict resolution techniques you can apply immediately</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#9CA3AF', marginTop: '8px', flexShrink: 0 }} />
              <p style={{ color: '#374151', fontSize: '14px', lineHeight: '1.6' }}>Practice proven anger management strategies</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#9CA3AF', marginTop: '8px', flexShrink: 0 }} />
              <p style={{ color: '#374151', fontSize: '14px', lineHeight: '1.6' }}>Develop a personalised coping toolkit for tough situations</p>
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <button
          onClick={onNext}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px',
            background: 'linear-gradient(to right, #4F46E5, #7C3AED)',
            color: 'white',
            padding: '16px 40px',
            borderRadius: '12px',
            fontWeight: 'bold',
            fontSize: '18px',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          {isCompleted ? 'Review Answers' : 'Continue to Assessment'} <span>→</span>
        </button>
      </div>
    </div>
  );
});

const AssessmentStep = memo(function AssessmentStep({ onNext, onBack, moduleId }: { onNext: () => void; onBack: () => void; moduleId: number }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [formData, setFormData] = useState({
    conflictHandling: 5,
    angerManagement: 5,
    setbackCoping: 5,
    emotionalRegulation: 5,
    toughSituation: '',
  });

  useEffect(() => {
    const saved = getModuleAnswers(moduleId, 'assessment');
    if (saved) setFormData(prev => ({ ...prev, ...(saved as typeof prev) }));
  }, [moduleId]);

  const questions = [
    {
      id: 'conflictHandling',
      title: 'Handling Conflict',
      description: 'How well do you handle conflict when it arises at work?',
      type: 'slider' as const,
      min: 1,
      max: 10,
      minLabel: 'Avoid / Struggle',
      maxLabel: 'Handle With Ease',
    },
    {
      id: 'angerManagement',
      title: 'Managing Anger',
      description: 'How effectively do you manage anger in the moment?',
      type: 'slider' as const,
      min: 1,
      max: 10,
      minLabel: 'Struggle Significantly',
      maxLabel: 'Manage Very Well',
    },
    {
      id: 'setbackCoping',
      title: 'Coping With Setbacks',
      description: 'How do you cope when unexpected setbacks occur?',
      type: 'slider' as const,
      min: 1,
      max: 10,
      minLabel: 'Feel Overwhelmed',
      maxLabel: 'Adapt Quickly',
    },
    {
      id: 'emotionalRegulation',
      title: 'Emotional Regulation Under Stress',
      description: 'Rate your emotional regulation during high-stress situations.',
      type: 'slider' as const,
      min: 1,
      max: 10,
      minLabel: 'Very Reactive',
      maxLabel: 'Very Regulated',
    },
    {
      id: 'toughSituation',
      title: 'A Recent Tough Situation',
      description: 'Describe a recent tough situation you faced at work and how you responded.',
      type: 'textarea' as const,
      placeholder: 'Describe the situation and your response...',
    },
  ];

  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleNext = () => {
    const _labeled = questions.map(q => ({ title: q.title, answer: formData[q.id as keyof typeof formData] }));
    localStorage.setItem(`brainParenthood_module${moduleId}_assessment`, JSON.stringify({ ...formData, _labeled }));
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      saveModuleAnswers(moduleId, 'assessment', { ...formData, _labeled });
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
    return (value as string) !== '';
  };

  const sliderValue = formData[currentQ.id as keyof typeof formData] as number;
  const sliderMin = currentQ.min ?? 1;
  const sliderMax = currentQ.max ?? 10;

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto' }}>
      <div style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <span style={{ fontSize: '14px', fontWeight: '600', color: '#4F46E5' }}>Assessment</span>
          <span style={{ fontSize: '14px', fontWeight: '500', color: '#6B7280' }}>
            Question {currentQuestion + 1} of {questions.length}
          </span>
        </div>
        <div style={{ height: '8px', backgroundColor: '#F3F4F6', borderRadius: '4px', overflow: 'hidden' }}>
          <div
            style={{
              height: '100%',
              width: `${progress}%`,
              background: 'linear-gradient(to right, #4F46E5, #7C3AED)',
              borderRadius: '4px',
              transition: 'width 0.5s ease',
            }}
          />
        </div>
      </div>

      <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '40px', border: '1px solid #E5E7EB', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
        <div style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827', marginBottom: '8px' }}>
            {currentQ.title}
          </h2>
          <p style={{ color: '#6B7280', fontSize: '15px' }}>
            {currentQ.description}
          </p>
        </div>

        <div style={{ marginBottom: '48px' }}>
          {currentQ.type === 'slider' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
                <div style={{
                  width: '72px',
                  height: '72px',
                  backgroundColor: '#4F46E5',
                  color: 'white',
                  fontSize: '28px',
                  fontWeight: 'bold',
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  {sliderValue}
                </div>
              </div>
              <div>
                <input
                  type="range"
                  min={sliderMin}
                  max={sliderMax}
                  value={sliderValue}
                  onChange={(e) => setFormData({ ...formData, [currentQ.id]: parseInt(e.target.value) })}
                  style={{
                    width: '100%',
                    height: '8px',
                    borderRadius: '4px',
                    appearance: 'none',
                    cursor: 'pointer',
                    accentColor: '#4F46E5',
                    background: `linear-gradient(to right, #4F46E5 0%, #4F46E5 ${((sliderValue - sliderMin) / (sliderMax - sliderMin)) * 100}%, #e5e7eb ${((sliderValue - sliderMin) / (sliderMax - sliderMin)) * 100}%, #e5e7eb 100%)`,
                  }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
                  <span style={{ fontSize: '13px', color: '#9CA3AF' }}>{currentQ.minLabel}</span>
                  <span style={{ fontSize: '13px', color: '#9CA3AF' }}>{currentQ.maxLabel}</span>
                </div>
              </div>
            </div>
          )}

          {currentQ.type === 'textarea' && (
            <textarea
              value={formData[currentQ.id as keyof typeof formData] as string}
              onChange={(e) => setFormData({ ...formData, [currentQ.id]: e.target.value })}
              placeholder={currentQ.placeholder}
              rows={5}
              style={{
                width: '100%',
                padding: '16px 20px',
                fontSize: '15px',
                color: '#111827',
                border: '2px solid #E5E7EB',
                borderRadius: '12px',
                outline: 'none',
                resize: 'none',
                lineHeight: '1.6',
                boxSizing: 'border-box',
              }}
            />
          )}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '24px', borderTop: '1px solid #E5E7EB' }}>
          <button
            onClick={handlePrevious}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 20px',
              color: '#374151',
              fontWeight: '600',
              borderRadius: '12px',
              border: 'none',
              cursor: 'pointer',
              backgroundColor: 'transparent',
              fontSize: '15px',
            }}
          >
            ← Back
          </button>
          <button
            onClick={handleNext}
            disabled={!isAnswered()}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '14px 32px',
              borderRadius: '12px',
              fontWeight: 'bold',
              fontSize: '16px',
              border: 'none',
              cursor: isAnswered() ? 'pointer' : 'not-allowed',
              background: isAnswered() ? 'linear-gradient(to right, #4F46E5, #7C3AED)' : '#E5E7EB',
              color: isAnswered() ? 'white' : '#9CA3AF',
            }}
          >
            {currentQuestion === questions.length - 1 ? 'Continue' : 'Next'} →
          </button>
        </div>
      </div>
    </div>
  );
});

function GoalsStep({ onNext, onBack, moduleId }: { onNext: () => void; onBack: () => void; moduleId: number }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [goals, setGoals] = useState({
    conflictApproach: '',
    angerStrategy: '',
    copingTool: '',
  });

  useEffect(() => {
    const saved = getModuleAnswers(moduleId, 'goals');
    if (saved) setGoals(prev => ({ ...prev, ...(saved as typeof prev) }));
  }, [moduleId]);

  const questions = [
    {
      id: 'conflictApproach',
      title: 'Conflict Resolution Approach',
      description: 'What conflict resolution approach will you practise this week?',
      type: 'text' as const,
      placeholder: 'e.g., Pause and listen before responding in disagreements',
    },
    {
      id: 'angerStrategy',
      title: 'Anger Management Strategy',
      description: 'How will you manage anger more effectively going forward?',
      type: 'textarea' as const,
      placeholder: 'Describe the specific strategy you will use...',
    },
    {
      id: 'copingTool',
      title: 'Coping Strategy',
      description: 'What coping strategy will you adopt for tough situations?',
      type: 'text' as const,
      placeholder: 'e.g., Take a 5-minute walk before reacting to stressful news',
    },
  ];

  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleNext = () => {
    const _labeled = questions.map(q => ({ title: q.title, answer: goals[q.id as keyof typeof goals] }));
    localStorage.setItem(`brainParenthood_module${moduleId}_goals`, JSON.stringify({ ...goals, _labeled }));
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      saveModuleAnswers(moduleId, 'goals', { ...goals, _labeled });
      completeModule(moduleId);
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
    <div style={{ maxWidth: '700px', margin: '0 auto' }}>
      <div style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <span style={{ fontSize: '14px', fontWeight: '600', color: '#4F46E5' }}>Goal Setting</span>
          <span style={{ fontSize: '14px', fontWeight: '500', color: '#6B7280' }}>
            Question {currentQuestion + 1} of {questions.length}
          </span>
        </div>
        <div style={{ height: '8px', backgroundColor: '#F3F4F6', borderRadius: '4px', overflow: 'hidden' }}>
          <div
            style={{
              height: '100%',
              width: `${progress}%`,
              background: 'linear-gradient(to right, #4F46E5, #7C3AED)',
              borderRadius: '4px',
              transition: 'width 0.5s ease',
            }}
          />
        </div>
      </div>

      <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '40px', border: '1px solid #E5E7EB', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
        <div style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827', marginBottom: '8px' }}>
            {currentQ.title}
          </h2>
          <p style={{ color: '#6B7280', fontSize: '15px' }}>
            {currentQ.description}
          </p>
        </div>

        <div style={{ marginBottom: '48px' }}>
          {currentQ.type === 'text' && (
            <input
              type="text"
              value={goals[currentQ.id as keyof typeof goals]}
              onChange={(e) => setGoals({ ...goals, [currentQ.id]: e.target.value })}
              placeholder={currentQ.placeholder}
              style={{
                width: '100%',
                padding: '14px 20px',
                fontSize: '15px',
                color: '#111827',
                border: '2px solid #E5E7EB',
                borderRadius: '12px',
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />
          )}

          {currentQ.type === 'textarea' && (
            <textarea
              value={goals[currentQ.id as keyof typeof goals]}
              onChange={(e) => setGoals({ ...goals, [currentQ.id]: e.target.value })}
              placeholder={currentQ.placeholder}
              rows={5}
              style={{
                width: '100%',
                padding: '16px 20px',
                fontSize: '15px',
                color: '#111827',
                border: '2px solid #E5E7EB',
                borderRadius: '12px',
                outline: 'none',
                resize: 'none',
                lineHeight: '1.6',
                boxSizing: 'border-box',
              }}
            />
          )}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '24px', borderTop: '1px solid #E5E7EB' }}>
          <button
            onClick={handlePrevious}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 20px',
              color: '#374151',
              fontWeight: '600',
              borderRadius: '12px',
              border: 'none',
              cursor: 'pointer',
              backgroundColor: 'transparent',
              fontSize: '15px',
            }}
          >
            ← Back
          </button>
          <button
            onClick={handleNext}
            disabled={!isAnswered()}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '14px 32px',
              borderRadius: '12px',
              fontWeight: 'bold',
              fontSize: '16px',
              border: 'none',
              cursor: isAnswered() ? 'pointer' : 'not-allowed',
              background: isAnswered() ? 'linear-gradient(to right, #4F46E5, #7C3AED)' : '#E5E7EB',
              color: isAnswered() ? 'white' : '#9CA3AF',
            }}
          >
            {currentQuestion === questions.length - 1 ? 'Complete' : 'Next'} →
          </button>
        </div>
      </div>
    </div>
  );
}

function CompleteStep({ moduleId, nextModuleId }: { moduleId: number; nextModuleId: number }) {
  return (
    <div style={{ maxWidth: '700px', margin: '0 auto' }}>
      <div style={{
        background: 'linear-gradient(to right, #7C3AED, #DB2777, #F472B6)',
        borderRadius: '20px',
        padding: '50px',
        marginBottom: '40px',
        textAlign: 'center',
      }}>
        <div style={{
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          backgroundColor: 'rgba(255,255,255,0.2)',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '20px',
        }}>
          <span style={{ color: 'white', fontSize: '24px' }}>✓</span>
        </div>
        <h2 style={{ fontSize: '32px', fontWeight: 'bold', color: 'white', marginBottom: '12px' }}>
          Module {moduleId} Complete!
        </h2>
        <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.8)', maxWidth: '500px', margin: '0 auto', lineHeight: '1.6' }}>
          You've built your coping toolkit for conflict, anger, and stress. Keep practising these strategies every day.
        </p>
      </div>

      <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '40px', border: '1px solid #E5E7EB', marginBottom: '40px' }}>
        <h3 style={{ fontWeight: '600', color: '#111827', fontSize: '20px', marginBottom: '24px' }}>
          What's Next?
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {[
            { num: '1', title: 'Practise your coping strategy', desc: 'Apply it the next time a difficult situation arises' },
            { num: '2', title: 'Reflect on your conflict approach', desc: 'Notice how your responses change with intention' },
            { num: '3', title: `Prepare for Module ${nextModuleId}`, desc: 'How to Put Your Best Foot Forward' },
          ].map((item) => (
            <div key={item.num} style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
              <div style={{
                width: '28px',
                height: '28px',
                borderRadius: '8px',
                backgroundColor: '#EEF2FF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}>
                <span style={{ color: '#4F46E5', fontSize: '12px', fontWeight: '600' }}>{item.num}</span>
              </div>
              <div>
                <p style={{ fontWeight: '500', color: '#111827', fontSize: '15px', marginBottom: '2px' }}>{item.title}</p>
                <p style={{ color: '#6B7280', fontSize: '13px' }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
        <Link
          href="/dashboard"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '14px 24px',
            backgroundColor: '#4F46E5',
            color: 'white',
            fontWeight: '500',
            borderRadius: '12px',
            textDecoration: 'none',
          }}
        >
          View Dashboard →
        </Link>
        <Link
          href="/modules"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '14px 24px',
            backgroundColor: 'transparent',
            color: '#374151',
            fontWeight: '500',
            borderRadius: '12px',
            textDecoration: 'none',
            border: '1px solid #E5E7EB',
          }}
        >
          ← Browse Modules
        </Link>
      </div>
    </div>
  );
}
