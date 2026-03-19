"use client";

import Link from "next/link";
import { useState, useEffect, useCallback, memo } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import AppLayout from "@/components/AppLayout";
import { saveBaseline, saveGoals, completeModule, getBaseline, getGoals, isModuleCompleted, saveModuleAnswers, getModuleAnswers, type BaselineData, type GoalsData } from "@/lib/storage";
import ReviewStep from "@/components/ReviewStep";

type StepType = 'overview' | 'baseline' | 'goals' | 'review' | 'complete';

const STEPS = [
  { id: 'overview' as const, label: 'Overview' },
  { id: 'baseline' as const, label: 'Assessment' },
  { id: 'goals' as const, label: 'Goals' },
  { id: 'review' as const, label: 'Review' },
  { id: 'complete' as const, label: 'Complete' },
];

export default function Module1Page() {
  const [currentStep, setCurrentStep] = useState<StepType>('overview');
  const { isAuthenticated } = useAuth();
  const isCompleted = isModuleCompleted(1);
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
            href="/dashboard"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              color: 'rgba(255,255,255,0.7)',
              fontWeight: '500',
              marginBottom: '24px',
              textDecoration: 'none',
              fontSize: '14px'
            }}
          >
            ← Back to Dashboard
          </Link>
          <h1 style={{ fontSize: '36px', fontWeight: 'bold', color: 'white', marginBottom: '8px' }}>
            Module 1: Foundation
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '18px' }}>
            Week 1 &bull; Establish baseline and set goals
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
        {currentStep === 'overview' && <OverviewStep onNext={() => handleSetStep(isCompleted ? 'review' : 'baseline')} isCompleted={isCompleted} />}
        {currentStep === 'baseline' && (
          <BaselineStep
            onNext={() => handleSetStep('goals')}
            onBack={() => handleSetStep('overview')}
          />
        )}
        {currentStep === 'goals' && (
          <GoalsStep
            onNext={() => handleSetStep('review')}
            onBack={() => handleSetStep('baseline')}
          />
        )}
        {currentStep === 'review' && <ReviewStep moduleId={1} onConfirm={() => { completeModule(1); handleSetStep('complete'); }} onBack={() => handleSetStep(isCompleted ? 'overview' : 'goals')} isReadOnly={isCompleted} />}
        {currentStep === 'complete' && <CompleteStep />}
      </div>
      </div>
    </AppLayout>
  );
}

const OverviewStep = memo(function OverviewStep({ onNext, isCompleted }: { onNext: () => void; isCompleted?: boolean }) {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      {/* Welcome Card */}
      <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '40px', border: '1px solid #E5E7EB', marginBottom: '40px', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
        <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#111827', marginBottom: '12px' }}>
          Welcome to Brain Parenthood
        </h2>
        <p style={{ fontSize: '16px', color: '#6B7280', marginBottom: '24px', lineHeight: '1.6' }}>
          A 12-week program to build team resilience and performance
        </p>
        <p style={{ fontSize: '15px', color: '#374151', lineHeight: '1.7' }}>
          Just like raising a child, developing your team's collective intelligence requires
          patience, structure, and care. This program will train your team's "brain"
          through psychological resilience training.
        </p>
      </div>

      {/* What is Brain Parenthood Card */}
      <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '40px', border: '1px solid #E5E7EB', marginBottom: '40px', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
        <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#111827', marginBottom: '12px' }}>What is Brain Parenthood?</h3>
        <p style={{ fontSize: '15px', color: '#6B7280', lineHeight: '1.7' }}>
          A comprehensive toolkit designed to reduce stress, improve mental
          health, and boost productivity across your entire team. Build lasting resilience and
          performance improvements through structured development.
        </p>
      </div>

      {/* Two Column Cards */}
      <div style={{ display: 'flex', gap: '40px', marginBottom: '40px' }}>
        {/* Why This Matters */}
        <div style={{ flex: 1, backgroundColor: 'white', borderRadius: '16px', padding: '40px', border: '1px solid #E5E7EB', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              backgroundColor: '#EEF2FF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <span style={{ color: '#4F46E5', fontSize: '16px' }}>⚡</span>
            </div>
            <h4 style={{ fontWeight: '600', color: '#111827', fontSize: '16px' }}>Why This Matters</h4>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#4F46E5', marginTop: '8px', flexShrink: 0 }} />
              <p style={{ color: '#374151', fontSize: '14px', lineHeight: '1.6' }}>
                <strong style={{ color: '#111827' }}>Reduce Stress:</strong> Lower stress levels lead to better mental health
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#4F46E5', marginTop: '8px', flexShrink: 0 }} />
              <p style={{ color: '#374151', fontSize: '14px', lineHeight: '1.6' }}>
                <strong style={{ color: '#111827' }}>Improve Performance:</strong> Resilient teams handle challenges effectively
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#4F46E5', marginTop: '8px', flexShrink: 0 }} />
              <p style={{ color: '#374151', fontSize: '14px', lineHeight: '1.6' }}>
                <strong style={{ color: '#111827' }}>Track Progress:</strong> Measure growth from beginning to end
              </p>
            </div>
          </div>
        </div>

        {/* Module Objectives */}
        <div style={{ flex: 1, backgroundColor: 'white', borderRadius: '16px', padding: '40px', border: '1px solid #E5E7EB', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              backgroundColor: '#EEF2FF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <span style={{ color: '#4F46E5', fontSize: '16px' }}>📋</span>
            </div>
            <h4 style={{ fontWeight: '600', color: '#111827', fontSize: '16px' }}>Module 1 Objectives</h4>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#9CA3AF', marginTop: '8px', flexShrink: 0 }} />
              <p style={{ color: '#374151', fontSize: '14px', lineHeight: '1.6' }}>Establish baseline of your team's current state</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#9CA3AF', marginTop: '8px', flexShrink: 0 }} />
              <p style={{ color: '#374151', fontSize: '14px', lineHeight: '1.6' }}>Set clear, achievable goals for 12 weeks</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#9CA3AF', marginTop: '8px', flexShrink: 0 }} />
              <p style={{ color: '#374151', fontSize: '14px', lineHeight: '1.6' }}>Understand Brain Parenthood concepts</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Button */}
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

  useEffect(() => {
    const saved = getBaseline();
    if (saved) setFormData(prev => ({ ...prev, ...saved }));
  }, []);

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
      const baselineData: BaselineData = {
        teamStressLevel: formData.teamStressLevel,
        individualStressLevel: formData.individualStressLevel,
        productivity: formData.productivity,
        communication: formData.communication,
        workLifeBalance: formData.workLifeBalance,
        teamSize: formData.teamSize,
        primaryChallenges: formData.primaryChallenges,
      };
      const _labeled = questions.map(q => ({ title: q.title, answer: formData[q.id as keyof typeof formData] }));
      localStorage.setItem(`brainParenthood_module1_assessment`, JSON.stringify({ ...formData, _labeled }));
      saveBaseline(baselineData);
      saveModuleAnswers(1, 'assessment', { ...formData, _labeled });
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
    <div style={{ maxWidth: '700px', margin: '0 auto' }}>
      {/* Progress Header */}
      <div style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <span style={{ fontSize: '14px', fontWeight: '600', color: '#4F46E5' }}>Baseline Assessment</span>
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

      {/* Question Card */}
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
                  style={{
                    width: '100%',
                    height: '8px',
                    borderRadius: '4px',
                    appearance: 'none',
                    cursor: 'pointer',
                    accentColor: '#4F46E5',
                    background: `linear-gradient(to right, #4F46E5 0%, #4F46E5 ${((formData[currentQ.id as keyof typeof formData] as number - currentQ.min) / (currentQ.max - currentQ.min)) * 100}%, #e5e7eb ${((formData[currentQ.id as keyof typeof formData] as number - currentQ.min) / (currentQ.max - currentQ.min)) * 100}%, #e5e7eb 100%)`
                  }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
                  <span style={{ fontSize: '13px', color: '#9CA3AF' }}>{currentQ.minLabel}</span>
                  <span style={{ fontSize: '13px', color: '#9CA3AF' }}>{currentQ.maxLabel}</span>
                </div>
              </div>
            </div>
          )}

          {currentQ.type === 'number' && (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <input
                type="number"
                min="1"
                value={formData[currentQ.id as keyof typeof formData]}
                onChange={(e) => setFormData({ ...formData, [currentQ.id]: e.target.value })}
                placeholder={currentQ.placeholder}
                style={{
                  width: '140px',
                  padding: '12px 16px',
                  fontSize: '36px',
                  fontWeight: 'bold',
                  textAlign: 'center',
                  color: '#111827',
                  border: '2px solid #E5E7EB',
                  borderRadius: '12px',
                  outline: 'none',
                }}
              />
            </div>
          )}

          {currentQ.type === 'textarea' && (
            <textarea
              value={formData[currentQ.id as keyof typeof formData]}
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

        {/* Question Number Dots */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', paddingBottom: '24px' }}>
          {questions.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentQuestion(index)}
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                border: 'none',
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: '600',
                backgroundColor: index === currentQuestion ? '#4F46E5' : index < currentQuestion ? '#C7D2FE' : '#F3F4F6',
                color: index === currentQuestion ? 'white' : index < currentQuestion ? '#4F46E5' : '#9CA3AF',
                transition: 'all 0.2s ease',
              }}
            >
              {index + 1}
            </button>
          ))}
        </div>

        {/* Navigation */}
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

  useEffect(() => {
    const saved = getGoals();
    if (saved) setGoals(prev => ({ ...prev, ...saved }));
  }, []);

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
      const goalsData: GoalsData = {
        stressReduction: goals.stressReduction,
        productivityGoal: goals.productivityGoal,
        communicationGoal: goals.communicationGoal,
        personalGoal: goals.personalGoal,
        teamGoal: goals.teamGoal,
        successMetrics: goals.successMetrics,
      };
      const _labeled = questions.map(q => ({ title: q.title, answer: goals[q.id as keyof typeof goals] }));
      localStorage.setItem(`brainParenthood_module1_goals`, JSON.stringify({ ...goals, _labeled }));
      saveGoals(goalsData);
      saveModuleAnswers(1, 'goals', { ...goals, _labeled });
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
      {/* Progress Header */}
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

      {/* Question Card */}
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

        {/* Question Number Dots */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', paddingBottom: '24px' }}>
          {questions.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentQuestion(index)}
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                border: 'none',
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: '600',
                backgroundColor: index === currentQuestion ? '#4F46E5' : index < currentQuestion ? '#C7D2FE' : '#F3F4F6',
                color: index === currentQuestion ? 'white' : index < currentQuestion ? '#4F46E5' : '#9CA3AF',
                transition: 'all 0.2s ease',
              }}
            >
              {index + 1}
            </button>
          ))}
        </div>

        {/* Navigation */}
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

function CompleteStep() {
  return (
    <div style={{ maxWidth: '700px', margin: '0 auto' }}>
      {/* Success Banner */}
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
          Module 1 Complete!
        </h2>
        <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.8)', maxWidth: '500px', margin: '0 auto', lineHeight: '1.6' }}>
          You've established your baseline and set clear goals for your Brain Parenthood journey.
        </p>
      </div>

      {/* What's Next Card */}
      <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '40px', border: '1px solid #E5E7EB', marginBottom: '40px' }}>
        <h3 style={{ fontWeight: '600', color: '#111827', fontSize: '20px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          What's Next?
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {[
            { num: '1', title: 'Review your personalized plan', desc: 'Check your dashboard for detailed insights' },
            { num: '2', title: 'Share goals with your team', desc: 'Get everyone aligned on the journey ahead' },
            { num: '3', title: 'Prepare for Module 2', desc: 'Mindfulness Foundation' },
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

      {/* Action Buttons */}
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
