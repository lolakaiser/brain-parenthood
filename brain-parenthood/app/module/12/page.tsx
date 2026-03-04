"use client";

import Link from "next/link";
import { useState, useEffect, useCallback, memo } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import AppLayout from "@/components/AppLayout";
import { completeModule, saveModuleAnswers } from "@/lib/storage";

type StepType = 'overview' | 'assessment' | 'goals' | 'complete';

const STEPS = [
  { id: 'overview' as const, label: 'Overview' },
  { id: 'assessment' as const, label: 'Assessment' },
  { id: 'goals' as const, label: 'Goals' },
  { id: 'complete' as const, label: 'Complete' },
];

export default function Module12Page() {
  const [currentStep, setCurrentStep] = useState<StepType>('overview');
  const { isAuthenticated } = useAuth();
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
          <h1 style={{ fontSize: '36px', fontWeight: 'bold', color: 'white', marginBottom: '8px' }}>Module 12: Anger Management</h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '18px' }}>Week 12 &bull; Managing anger and resolving conflict</p>
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
          {currentStep === 'overview' && <OverviewStep onNext={() => handleSetStep('assessment')} />}
          {currentStep === 'assessment' && <AssessmentStep onNext={() => handleSetStep('goals')} onBack={() => handleSetStep('overview')} moduleId={12} />}
          {currentStep === 'goals' && <GoalsStep onNext={() => handleSetStep('complete')} onBack={() => handleSetStep('assessment')} moduleId={12} />}
          {currentStep === 'complete' && <CompleteStep moduleId={12} />}
        </div>
      </div>
    </AppLayout>
  );
}

const OverviewStep = memo(function OverviewStep({ onNext }: { onNext: () => void }) {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '40px', border: '1px solid #E5E7EB', marginBottom: '40px', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
        <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#111827', marginBottom: '12px' }}>Anger Management</h2>
        <p style={{ fontSize: '16px', color: '#6B7280', marginBottom: '24px', lineHeight: '1.6' }}>Comprehensive anger management and conflict resolution for lasting change</p>
        <p style={{ fontSize: '15px', color: '#374151', lineHeight: '1.7' }}>
          Anger is a natural human emotion — but when left unmanaged, it can damage relationships,
          derail careers, and undermine the trust you have worked hard to build. This final module
          brings together everything you have learned throughout the programme and applies it to
          one of the most challenging emotional experiences: anger in a high-stakes environment.
          You will leave equipped for lasting emotional regulation.
        </p>
      </div>

      <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '40px', border: '1px solid #E5E7EB', marginBottom: '40px', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
        <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#111827', marginBottom: '12px' }}>What You'll Learn</h3>
        <p style={{ fontSize: '15px', color: '#6B7280', lineHeight: '1.7' }}>
          You will identify your personal anger triggers, learn evidence-based de-escalation
          techniques, and build a concrete conflict resolution plan you can draw on in any
          situation. This is the culmination of 12 weeks of growth — your final commitment to
          being a calmer, more effective, and more resilient leader.
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
              { title: 'Unmanaged Anger Damages Relationships:', body: 'One outburst can undo months of trust-building' },
              { title: 'Conflict Resolution Skills Are Lifelong Assets:', body: 'The ability to navigate conflict constructively is invaluable' },
              { title: 'Emotional Regulation Improves Wellbeing:', body: 'Calmer leaders make better decisions and inspire more confidence' },
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
            <h4 style={{ fontWeight: '600', color: '#111827', fontSize: '16px' }}>Module 12 Objectives</h4>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[
              'Identify your personal anger triggers with precision',
              'Learn and practise de-escalation techniques',
              'Build a personal conflict resolution plan',
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
          Continue to Assessment <span>→</span>
        </button>
      </div>
    </div>
  );
});

const AssessmentStep = memo(function AssessmentStep({ onNext, onBack, moduleId }: { onNext: () => void; onBack: () => void; moduleId: number }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [formData, setFormData] = useState({ angerInMoment: 5, deEscalation: 5, triggerAwareness: 5, constructiveExpression: 5, angerReaction: '' });

  const questions = [
    { id: 'angerInMoment', title: 'Managing Anger in the Moment', description: 'How well do you manage anger when it flares up in the moment?', type: 'slider' as const, min: 1, max: 10, minLabel: 'React Impulsively', maxLabel: 'Stay In Control' },
    { id: 'deEscalation', title: 'De-Escalating Conflict', description: 'How quickly can you de-escalate a conflict situation?', type: 'slider' as const, min: 1, max: 10, minLabel: 'Escalate Further', maxLabel: 'De-escalate Quickly' },
    { id: 'triggerAwareness', title: 'Anger Trigger Awareness', description: 'How aware are you of what specifically triggers your anger?', type: 'slider' as const, min: 1, max: 10, minLabel: 'Not Aware', maxLabel: 'Fully Aware' },
    { id: 'constructiveExpression', title: 'Constructive Expression of Anger', description: 'How constructively do you express anger when you feel it?', type: 'slider' as const, min: 1, max: 10, minLabel: 'Destructively', maxLabel: 'Very Constructively' },
    { id: 'angerReaction', title: 'Your Typical Anger Reaction at Work', description: 'Describe how you typically react when you feel angry at work.', type: 'textarea' as const, placeholder: 'Be honest — what happens in your body, your words, and your behaviour?' },
  ];

  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const sliderValue = formData[currentQ.id as keyof typeof formData] as number;
  const sliderMin = currentQ.min ?? 1;
  const sliderMax = currentQ.max ?? 10;

  const handleNext = () => { if (currentQuestion < questions.length - 1) { setCurrentQuestion(currentQuestion + 1); } else { saveModuleAnswers(moduleId, 'assessment', formData); onNext(); } };
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
  const [goals, setGoals] = useState({ angerTrigger: '', deEscalationTechnique: '', conflictPlan: '' });

  const questions = [
    { id: 'angerTrigger', title: 'Anger Trigger to Work On', description: 'What anger trigger will you focus on managing this week?', type: 'text' as const, placeholder: 'e.g., Feeling ignored in meetings — I will pause and breathe before reacting' },
    { id: 'deEscalationTechnique', title: 'De-Escalation Technique', description: 'What de-escalation technique will you practise this week?', type: 'textarea' as const, placeholder: 'Describe the technique and how you plan to use it in a real situation...' },
    { id: 'conflictPlan', title: 'Next Conflict Resolution Plan', description: 'How will you handle the next conflict constructively?', type: 'text' as const, placeholder: 'e.g., Take a break, name my feelings, use \'I\' statements, seek understanding first' },
  ];

  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleNext = () => { if (currentQuestion < questions.length - 1) { setCurrentQuestion(currentQuestion + 1); } else { saveModuleAnswers(moduleId, 'goals', goals); completeModule(moduleId); onNext(); } };
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

function CompleteStep({ moduleId }: { moduleId: number }) {
  return (
    <div style={{ maxWidth: '700px', margin: '0 auto' }}>
      <div style={{ background: 'linear-gradient(to right, #7C3AED, #DB2777, #F472B6)', borderRadius: '20px', padding: '50px', marginBottom: '40px', textAlign: 'center' }}>
        <div style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.2)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
          <span style={{ color: 'white', fontSize: '24px' }}>✓</span>
        </div>
        <h2 style={{ fontSize: '32px', fontWeight: 'bold', color: 'white', marginBottom: '12px' }}>
          Program Complete!
        </h2>
        <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.8)', maxWidth: '500px', margin: '0 auto', lineHeight: '1.6' }}>
          You have completed all 12 modules of Brain Parenthood. You are a more resilient, self-aware, and effective leader. This is just the beginning.
        </p>
      </div>

      <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '40px', border: '1px solid #E5E7EB', marginBottom: '40px' }}>
        <h3 style={{ fontWeight: '600', color: '#111827', fontSize: '20px', marginBottom: '24px' }}>What's Next?</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {[
            { num: '1', title: 'Reflect on your 12-week journey', desc: 'Look back at where you started and how far you have come' },
            { num: '2', title: 'Share what you have learned', desc: 'Your growth can inspire and support those around you' },
            { num: '3', title: 'Keep the habits alive', desc: 'Return to any module whenever you need a refresher or boost' },
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
