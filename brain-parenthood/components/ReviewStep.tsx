"use client";

import { getModuleAnswers } from "@/lib/storage";

interface LabeledAnswer {
  title: string;
  answer: string | number;
}

interface ReviewStepProps {
  moduleId: number;
  onConfirm: () => void;
  onBack: () => void;
  isReadOnly?: boolean;
}

export default function ReviewStep({ moduleId, onConfirm, onBack, isReadOnly }: ReviewStepProps) {
  const assessmentSaved = getModuleAnswers(moduleId, 'assessment');
  const goalsSaved = getModuleAnswers(moduleId, 'goals');

  const assessmentLabeled = (assessmentSaved?._labeled as LabeledAnswer[]) || [];
  const goalsLabeled = (goalsSaved?._labeled as LabeledAnswer[]) || [];

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '32px 40px', border: '1px solid #E5E7EB', marginBottom: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827', marginBottom: '8px' }}>
          {isReadOnly ? 'Your Answers' : 'Review Your Answers'}
        </h2>
        <p style={{ color: '#6B7280', fontSize: '15px' }}>
          {isReadOnly
            ? 'Your submitted answers are shown below.'
            : 'Please review everything carefully. Once confirmed, your answers cannot be changed.'}
        </p>
      </div>

      {/* Assessment Answers */}
      {assessmentLabeled.length > 0 && (
        <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '32px 40px', border: '1px solid #E5E7EB', marginBottom: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#4F46E5', marginBottom: '24px', paddingBottom: '12px', borderBottom: '1px solid #E5E7EB' }}>
            Assessment
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {assessmentLabeled.map((item, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <p style={{ fontSize: '13px', fontWeight: '600', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {item.title}
                </p>
                <p style={{ fontSize: '15px', color: '#111827', backgroundColor: '#F9FAFB', padding: '12px 16px', borderRadius: '8px', border: '1px solid #E5E7EB' }}>
                  {typeof item.answer === 'number' ? `${item.answer} / 10` : item.answer || '—'}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Goals Answers */}
      {goalsLabeled.length > 0 && (
        <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '32px 40px', border: '1px solid #E5E7EB', marginBottom: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#7C3AED', marginBottom: '24px', paddingBottom: '12px', borderBottom: '1px solid #E5E7EB' }}>
            Your Goals
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {goalsLabeled.map((item, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <p style={{ fontSize: '13px', fontWeight: '600', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {item.title}
                </p>
                <p style={{ fontSize: '15px', color: '#111827', backgroundColor: '#F9FAFB', padding: '12px 16px', borderRadius: '8px', border: '1px solid #E5E7EB' }}>
                  {typeof item.answer === 'number' ? `${item.answer} / 10` : item.answer || '—'}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      {!isReadOnly && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '8px' }}>
          <button
            onClick={onBack}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 20px', color: '#374151', fontWeight: '600', borderRadius: '12px', border: 'none', cursor: 'pointer', backgroundColor: 'transparent', fontSize: '15px' }}
          >
            ← Back
          </button>
          <button
            onClick={onConfirm}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 32px', borderRadius: '12px', fontWeight: 'bold', fontSize: '16px', border: 'none', cursor: 'pointer', background: 'linear-gradient(to right, #4F46E5, #7C3AED)', color: 'white' }}
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
}
