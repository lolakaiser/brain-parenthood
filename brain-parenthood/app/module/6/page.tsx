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

export default function Module6Page() {
  const [currentStep, setCurrentStep] = useState<StepType>('overview');
  const { isAuthenticated } = useAuth();
  const moduleId = 6;
  const isCompleted = isModuleCompleted(6);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) { router.push('/login'); }
  }, [isAuthenticated, router]);

  const handleSetStep = useCallback((step: StepType) => { setCurrentStep(step); }, []);

  if (!isAuthenticated) return null;

  const currentStepIndex = STEPS.findIndex(s => s.id === currentStep);

  return (
    <AppLayout>
      <div style={{ background: 'linear-gradient(to right, #4F46E5, #7C3AED, #EC4899)', width: '100%' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 80px' }}>
          <Link href="/modules" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'rgba(255,255,255,0.7)', fontWeight: '500', marginBottom: '24px', textDecoration: 'none', fontSize: '14px' }}>
            ← Back to Modules
          </Link>
          <h1 style={{ fontSize: '36px', fontWeight: 'bold', color: 'white', marginBottom: '8px' }}>Module 6: Stress Management</h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '18px' }}>Week 6 &bull; Relaxation and stress coping strategies</p>
        </div>
      </div>

      <div style={{ backgroundColor: 'white', borderBottom: '1px solid #E5E7EB' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px 80px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            {STEPS.map((step, index) => (
              <div key={step.id} style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: '600', marginBottom: '8px', backgroundColor: index <= currentStepIndex ? '#4F46E5' : '#E5E7EB', color: index <= currentStepIndex ? 'white' : '#6B7280' }}>
                    {index + 1}
                  </div>
                  <span style={{ fontSize: '12px', fontWeight: '500', color: index <= currentStepIndex ? '#111827' : '#9CA3AF' }}>{step.label}</span>
                </div>
                {index < STEPS.length - 1 && (
                  <div style={{ flex: 1, height: '2px', marginTop: '-24px', marginLeft: '8px', marginRight: '8px' }}>
                    <div style={{ height: '100%', backgroundColor: index < currentStepIndex ? '#4F46E5' : '#E5E7EB' }} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ backgroundColor: '#F5F7FA', minHeight: 'calc(100vh - 300px)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 80px' }}>
          {currentStep === 'overview' && <OverviewStep onNext={() => handleSetStep(isCompleted ? 'review' : 'assessment')} isCompleted={isCompleted} />}
          {currentStep === 'assessment' && <AssessmentStep onNext={() => handleSetStep('goals')} onBack={() => handleSetStep('overview')} moduleId={6} />}
          {currentStep === 'goals' && <GoalsStep onNext={() => handleSetStep('review')} onBack={() => handleSetStep('assessment')} moduleId={6} />}
          {currentStep === 'review' && <ReviewStep moduleId={6} onConfirm={() => handleSetStep('complete')} onBack={() => handleSetStep(isCompleted ? 'overview' : 'goals')} isReadOnly={isCompleted} />}
          {currentStep === 'complete' && <CompleteStep moduleId={6} nextModuleId={7} />}
        </div>
      </div>
    </AppLayout>
  );
}

const OverviewStep = memo(function OverviewStep({ onNext, isCompleted }: { onNext: () => void; isCompleted?: boolean }) {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '40px', border: '1px solid #E5E7EB', marginBottom: '40px', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
        <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#111827', marginBottom: '12px' }}>Stress Management</h2>
        <p style={{ fontSize: '16px', color: '#6B7280', marginBottom: '24px', lineHeight: '1.6' }}>Relaxation techniques and practical coping strategies for lasting wellbeing</p>
        <p style={{ fontSize: '15px', color: '#374151', lineHeight: '1.7' }}>
          Stress is inevitable in a startup environment, but chronic unmanaged stress leads to
          burnout, poor health, and diminished performance. This module equips you with proven
          relaxation techniques and a personalised stress management plan so you can recover
          faster, stay focused, and sustain your energy over the long term.
        </p>
      </div>

      <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '40px', border: '1px solid #E5E7EB', marginBottom: '40px', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
        <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#111827', marginBottom: '12px' }}>What You'll Learn</h3>
        <p style={{ fontSize: '15px', color: '#6B7280', lineHeight: '1.7' }}>
          You will learn at least three relaxation techniques — including breathing exercises, progressive
          muscle relaxation, and mindful movement — and identify your personal stress triggers.
          You will leave with a concrete stress relief plan you can implement immediately.
        </p>
      </div>

      <div style={{ display: 'flex', gap: '40px', marginBottom: '40px' }}>
        <div style={{ flex: 1, backgroundColor: 'white', borderRadius: '16px', padding: '40px', border: '1px solid #E5E7EB', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', backgroundColor: '#EEF2FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><span style={{ color: '#4F46E5', fontSize: '16px' }}>⚡</span></div>
            <h4 style={{ fontWeight: '600', color: '#111827', fontSize: '16px' }}>Why This Matters</h4>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[
              { title: 'Chronic Stress Harms Health:', body: 'Long-term stress damages physical and mental wellbeing' },
              { title: 'Relaxation Improves Focus:', body: 'A calmer mind makes sharper decisions' },
              { title: 'Coping Strategies Prevent Burnout:', body: 'Build resilience before you hit the wall' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#4F46E5', marginTop: '8px', flexShrink: 0 }} />
                <p style={{ color: '#374151', fontSize: '14px', lineHeight: '1.6' }}><strong style={{ color: '#111827' }}>{item.title}</strong> {item.body}</p>
              </div>
            ))}
          </div>
        </div>

        <div style={{ flex: 1, backgroundColor: 'white', borderRadius: '16px', padding: '40px', border: '1px solid #E5E7EB', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', backgroundColor: '#EEF2FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><span style={{ color: '#4F46E5', fontSize: '16px' }}>📋</span></div>
            <h4 style={{ fontWeight: '600', color: '#111827', fontSize: '16px' }}>Module 6 Objectives</h4>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[
              'Learn 3+ relaxation techniques you can use immediately',
              'Build a personal stress response plan',
              'Identify and reduce your daily stress triggers',
            ].map((obj, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#9CA3AF', marginTop: '8px', flexShrink: 0 }} />
                <p style={{ color: '#374151', fontSize: '14px', lineHeight: '1.6' }}>{obj}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <button onClick={onNext} style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', background: 'linear-gradient(to right, #4F46E5, #7C3AED)', color: 'white', padding: '16px 40px', borderRadius: '12px', fontWeight: 'bold', fontSize: '18px', border: 'none', cursor: 'pointer' }}>
          {isCompleted ? 'Review Answers' : 'Continue to Assessment'} <span>→</span>
        </button>
      </div>
    </div>
  );
});

const AssessmentStep = memo(function AssessmentStep({ onNext, onBack, moduleId }: { onNext: () => void; onBack: () => void; moduleId: number }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [formData, setFormData] = useState({ stressFrequency: 5, reliefEffectiveness: 5, triggerAwareness: 5, stressRecovery: 5, stressTriggers: '' });

  useEffect(() => {
    const saved = getModuleAnswers(moduleId, 'assessment');
    if (saved) setFormData(prev => ({ ...prev, ...(saved as typeof prev) }));
  }, [moduleId]);

  const questions = [
    { id: 'stressFrequency', title: 'Stress Frequency', description: 'How frequently do you experience significant stress?', type: 'slider' as const, min: 1, max: 10, minLabel: 'Rarely', maxLabel: 'Constantly' },
    { id: 'reliefEffectiveness', title: 'Current Stress Relief', description: 'How effective are your current stress relief methods?', type: 'slider' as const, min: 1, max: 10, minLabel: 'Not Effective', maxLabel: 'Very Effective' },
    { id: 'triggerAwareness', title: 'Trigger Awareness', description: 'How well do you identify what causes your stress?', type: 'slider' as const, min: 1, max: 10, minLabel: 'Not Aware', maxLabel: 'Very Aware' },
    { id: 'stressRecovery', title: 'Recovery After Stress', description: 'How well do you recover after stressful events?', type: 'slider' as const, min: 1, max: 10, minLabel: 'Takes a Long Time', maxLabel: 'Bounce Back Quickly' },
    { id: 'stressTriggers', title: 'Your Top Stress Triggers', description: 'What are your top 3 stress triggers right now?', type: 'textarea' as const, placeholder: 'List your top stress triggers...' },
  ];

  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const sliderValue = formData[currentQ.id as keyof typeof formData] as number;
  const sliderMin = currentQ.min ?? 1;
  const sliderMax = currentQ.max ?? 10;

  const handleNext = () => { const _labeled = questions.map(q => ({ title: q.title, answer: formData[q.id as keyof typeof formData] })); localStorage.setItem(`brainParenthood_module${moduleId}_assessment`, JSON.stringify({ ...formData, _labeled })); if (currentQuestion < questions.length - 1) { setCurrentQuestion(currentQuestion + 1); } else { saveModuleAnswers(moduleId, 'assessment', { ...formData, _labeled }); onNext(); } };
  const handlePrevious = () => { if (currentQuestion > 0) { setCurrentQuestion(currentQuestion - 1); } else { onBack(); } };
  const isAnswered = () => { const v = formData[currentQ.id as keyof typeof formData]; if (currentQ.type === 'slider') return true; return (v as string) !== ''; };

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto' }}>
      <div style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <span style={{ fontSize: '14px', fontWeight: '600', color: '#4F46E5' }}>Assessment</span>
          <span style={{ fontSize: '14px', fontWeight: '500', color: '#6B7280' }}>Question {currentQuestion + 1} of {questions.length}</span>
        </div>
        <div style={{ height: '8px', backgroundColor: '#F3F4F6', borderRadius: '4px', overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${progress}%`, background: 'linear-gradient(to right, #4F46E5, #7C3AED)', borderRadius: '4px', transition: 'width 0.5s ease' }} />
        </div>
      </div>
      <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '40px', border: '1px solid #E5E7EB', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
        <div style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827', marginBottom: '8px' }}>{currentQ.title}</h2>
          <p style={{ color: '#6B7280', fontSize: '15px' }}>{currentQ.description}</p>
        </div>
        <div style={{ marginBottom: '48px' }}>
          {currentQ.type === 'slider' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
                <div style={{ width: '72px', height: '72px', backgroundColor: '#4F46E5', color: 'white', fontSize: '28px', fontWeight: 'bold', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{sliderValue}</div>
              </div>
              <input type="range" min={sliderMin} max={sliderMax} value={sliderValue} onChange={(e) => setFormData({ ...formData, [currentQ.id]: parseInt(e.target.value) })}
                style={{ width: '100%', height: '8px', borderRadius: '4px', appearance: 'none', cursor: 'pointer', accentColor: '#4F46E5', background: `linear-gradient(to right, #4F46E5 0%, #4F46E5 ${((sliderValue - sliderMin) / (sliderMax - sliderMin)) * 100}%, #e5e7eb ${((sliderValue - sliderMin) / (sliderMax - sliderMin)) * 100}%, #e5e7eb 100%)` }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
                <span style={{ fontSize: '13px', color: '#9CA3AF' }}>{currentQ.minLabel}</span>
                <span style={{ fontSize: '13px', color: '#9CA3AF' }}>{currentQ.maxLabel}</span>
              </div>
            </div>
          )}
          {currentQ.type === 'textarea' && (
            <textarea value={formData[currentQ.id as keyof typeof formData] as string} onChange={(e) => setFormData({ ...formData, [currentQ.id]: e.target.value })} placeholder={currentQ.placeholder} rows={5}
              style={{ width: '100%', padding: '16px 20px', fontSize: '15px', color: '#111827', border: '2px solid #E5E7EB', borderRadius: '12px', outline: 'none', resize: 'none', lineHeight: '1.6', boxSizing: 'border-box' }} />
          )}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '24px', borderTop: '1px solid #E5E7EB' }}>
          <button onClick={handlePrevious} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 20px', color: '#374151', fontWeight: '600', borderRadius: '12px', border: 'none', cursor: 'pointer', backgroundColor: 'transparent', fontSize: '15px' }}>← Back</button>
          <button onClick={handleNext} disabled={!isAnswered()} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 32px', borderRadius: '12px', fontWeight: 'bold', fontSize: '16px', border: 'none', cursor: isAnswered() ? 'pointer' : 'not-allowed', background: isAnswered() ? 'linear-gradient(to right, #4F46E5, #7C3AED)' : '#E5E7EB', color: isAnswered() ? 'white' : '#9CA3AF' }}>
            {currentQuestion === questions.length - 1 ? 'Continue' : 'Next'} →
          </button>
        </div>
      </div>
    </div>
  );
});

function GoalsStep({ onNext, onBack, moduleId }: { onNext: () => void; onBack: () => void; moduleId: number }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [goals, setGoals] = useState({ relaxationTechnique: '', triggerReduction: '', stressRoutine: '' });

  useEffect(() => {
    const saved = getModuleAnswers(moduleId, 'goals');
    if (saved) setGoals(prev => ({ ...prev, ...(saved as typeof prev) }));
  }, [moduleId]);

  const questions = [
    { id: 'relaxationTechnique', title: 'Daily Relaxation Technique', description: 'What relaxation technique will you practise daily this week?', type: 'text' as const, placeholder: 'e.g., 4-7-8 breathing for 5 minutes every morning' },
    { id: 'triggerReduction', title: 'Reduce Your Top Trigger', description: 'How will you reduce or address your top stress trigger?', type: 'textarea' as const, placeholder: 'Describe your plan to address this trigger...' },
    { id: 'stressRoutine', title: 'Stress Relief Routine', description: 'What does your weekly stress relief routine look like?', type: 'text' as const, placeholder: 'e.g., 20-minute walk, journalling, and no screens after 9pm' },
  ];

  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleNext = () => { const _labeled = questions.map(q => ({ title: q.title, answer: goals[q.id as keyof typeof goals] })); localStorage.setItem(`brainParenthood_module${moduleId}_goals`, JSON.stringify({ ...goals, _labeled })); if (currentQuestion < questions.length - 1) { setCurrentQuestion(currentQuestion + 1); } else { saveModuleAnswers(moduleId, 'goals', { ...goals, _labeled }); completeModule(moduleId); onNext(); } };
  const handlePrevious = () => { if (currentQuestion > 0) { setCurrentQuestion(currentQuestion - 1); } else { onBack(); } };
  const isAnswered = () => goals[currentQ.id as keyof typeof goals].trim() !== '';

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto' }}>
      <div style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <span style={{ fontSize: '14px', fontWeight: '600', color: '#4F46E5' }}>Goal Setting</span>
          <span style={{ fontSize: '14px', fontWeight: '500', color: '#6B7280' }}>Question {currentQuestion + 1} of {questions.length}</span>
        </div>
        <div style={{ height: '8px', backgroundColor: '#F3F4F6', borderRadius: '4px', overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${progress}%`, background: 'linear-gradient(to right, #4F46E5, #7C3AED)', borderRadius: '4px', transition: 'width 0.5s ease' }} />
        </div>
      </div>
      <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '40px', border: '1px solid #E5E7EB', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
        <div style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827', marginBottom: '8px' }}>{currentQ.title}</h2>
          <p style={{ color: '#6B7280', fontSize: '15px' }}>{currentQ.description}</p>
        </div>
        <div style={{ marginBottom: '48px' }}>
          {currentQ.type === 'text' && (
            <input type="text" value={goals[currentQ.id as keyof typeof goals]} onChange={(e) => setGoals({ ...goals, [currentQ.id]: e.target.value })} placeholder={currentQ.placeholder}
              style={{ width: '100%', padding: '14px 20px', fontSize: '15px', color: '#111827', border: '2px solid #E5E7EB', borderRadius: '12px', outline: 'none', boxSizing: 'border-box' }} />
          )}
          {currentQ.type === 'textarea' && (
            <textarea value={goals[currentQ.id as keyof typeof goals]} onChange={(e) => setGoals({ ...goals, [currentQ.id]: e.target.value })} placeholder={currentQ.placeholder} rows={5}
              style={{ width: '100%', padding: '16px 20px', fontSize: '15px', color: '#111827', border: '2px solid #E5E7EB', borderRadius: '12px', outline: 'none', resize: 'none', lineHeight: '1.6', boxSizing: 'border-box' }} />
          )}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '24px', borderTop: '1px solid #E5E7EB' }}>
          <button onClick={handlePrevious} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 20px', color: '#374151', fontWeight: '600', borderRadius: '12px', border: 'none', cursor: 'pointer', backgroundColor: 'transparent', fontSize: '15px' }}>← Back</button>
          <button onClick={handleNext} disabled={!isAnswered()} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 32px', borderRadius: '12px', fontWeight: 'bold', fontSize: '16px', border: 'none', cursor: isAnswered() ? 'pointer' : 'not-allowed', background: isAnswered() ? 'linear-gradient(to right, #4F46E5, #7C3AED)' : '#E5E7EB', color: isAnswered() ? 'white' : '#9CA3AF' }}>
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
      <div style={{ background: 'linear-gradient(to right, #7C3AED, #DB2777, #F472B6)', borderRadius: '20px', padding: '50px', marginBottom: '40px', textAlign: 'center' }}>
        <div style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.2)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
          <span style={{ color: 'white', fontSize: '24px' }}>✓</span>
        </div>
        <h2 style={{ fontSize: '32px', fontWeight: 'bold', color: 'white', marginBottom: '12px' }}>Module {moduleId} Complete!</h2>
        <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.8)', maxWidth: '500px', margin: '0 auto', lineHeight: '1.6' }}>
          You now have a personal stress management plan. Commit to your daily relaxation practice and watch the difference.
        </p>
      </div>
      <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '40px', border: '1px solid #E5E7EB', marginBottom: '40px' }}>
        <h3 style={{ fontWeight: '600', color: '#111827', fontSize: '20px', marginBottom: '24px' }}>What's Next?</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {[
            { num: '1', title: 'Do your relaxation technique today', desc: 'Start building the daily habit right now' },
            { num: '2', title: 'Track your stress this week', desc: 'Notice which triggers come up and how you respond' },
            { num: '3', title: `Prepare for Module ${nextModuleId}`, desc: 'Parenting' },
          ].map((item) => (
            <div key={item.num} style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '8px', backgroundColor: '#EEF2FF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
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
        <Link href="/dashboard" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 24px', backgroundColor: '#4F46E5', color: 'white', fontWeight: '500', borderRadius: '12px', textDecoration: 'none' }}>View Dashboard →</Link>
        <Link href="/modules" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 24px', backgroundColor: 'transparent', color: '#374151', fontWeight: '500', borderRadius: '12px', textDecoration: 'none', border: '1px solid #E5E7EB' }}>← Browse Modules</Link>
      </div>
    </div>
  );
}
