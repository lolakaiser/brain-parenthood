"use client";

import { useEffect, useState } from "react";
import { getModuleAnswers, getBaseline, getGoals } from "@/lib/storage";

interface LabeledAnswer {
  title: string;
  answer: string | number;
}

interface ReviewStepProps {
  moduleId: number;
  onConfirm: () => void;
  onBack: () => void;
  isReadOnly?: boolean;
  onEdit?: (section: 'assessment' | 'goals', questionIndex: number) => void;
}

const ASSESSMENT_FIELDS = [
  { id: 'teamStressLevel', title: 'Overall Team Stress Level' },
  { id: 'individualStressLevel', title: 'Your Individual Stress Level' },
  { id: 'productivity', title: 'Team Productivity' },
  { id: 'communication', title: 'Team Communication Quality' },
  { id: 'workLifeBalance', title: 'Work-Life Balance' },
  { id: 'teamSize', title: 'Team Size' },
  { id: 'primaryChallenges', title: 'Primary Challenges' },
];

const GOALS_FIELDS = [
  { id: 'stressReduction', title: 'Stress Reduction Goal' },
  { id: 'productivityGoal', title: 'Productivity Goal' },
  { id: 'communicationGoal', title: 'Communication Goal' },
  { id: 'personalGoal', title: 'Personal Development Goal' },
  { id: 'teamGoal', title: 'Team Development Goal' },
  { id: 'successMetrics', title: 'Success Metrics' },
];

export default function ReviewStep({ moduleId, onConfirm, onBack, isReadOnly, onEdit }: ReviewStepProps) {
  const [assessmentLabeled, setAssessmentLabeled] = useState<LabeledAnswer[]>([]);
  const [goalsLabeled, setGoalsLabeled] = useState<LabeledAnswer[]>([]);

  useEffect(() => {
    const assessmentSaved = getModuleAnswers(moduleId, 'assessment');
    const goalsSaved = getModuleAnswers(moduleId, 'goals');

    // Use _labeled if present, otherwise fall back to raw baseline/goals data
    let aLabeled: LabeledAnswer[] = (assessmentSaved?._labeled as LabeledAnswer[]) || [];
    let gLabeled: LabeledAnswer[] = (goalsSaved?._labeled as LabeledAnswer[]) || [];

    if (aLabeled.length === 0 && moduleId === 1) {
      const baseline = getBaseline();
      if (baseline) {
        aLabeled = ASSESSMENT_FIELDS.map(f => ({
          title: f.title,
          answer: (baseline as unknown as Record<string, string | number>)[f.id] ?? '—',
        }));
      }
    }

    if (gLabeled.length === 0 && moduleId === 1) {
      const goals = getGoals();
      if (goals) {
        gLabeled = GOALS_FIELDS.map(f => ({
          title: f.title,
          answer: (goals as unknown as Record<string, string | number>)[f.id] ?? '—',
        }));
      }
    }

    setAssessmentLabeled(aLabeled);
    setGoalsLabeled(gLabeled);
  }, [moduleId]);

  const editButtonStyle = {
    padding: '4px 10px',
    fontSize: '12px',
    fontWeight: '500' as const,
    color: '#4F46E5',
    backgroundColor: '#EEF2FF',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  };

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
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', paddingBottom: '12px', borderBottom: '1px solid #E5E7EB' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#4F46E5', margin: 0 }}>
              Assessment
            </h3>
            {!isReadOnly && onEdit && (
              <button style={editButtonStyle} onClick={() => onEdit('assessment', 0)}>
                Edit Section
              </button>
            )}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {assessmentLabeled.map((item, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <p style={{ fontSize: '13px', fontWeight: '600', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0 }}>
                    {item.title}
                  </p>
                  {!isReadOnly && onEdit && (
                    <button style={editButtonStyle} onClick={() => onEdit('assessment', i)}>
                      Edit
                    </button>
                  )}
                </div>
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
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', paddingBottom: '12px', borderBottom: '1px solid #E5E7EB' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#7C3AED', margin: 0 }}>
              Your Goals
            </h3>
            {!isReadOnly && onEdit && (
              <button style={editButtonStyle} onClick={() => onEdit('goals', 0)}>
                Edit Section
              </button>
            )}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {goalsLabeled.map((item, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <p style={{ fontSize: '13px', fontWeight: '600', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0 }}>
                    {item.title}
                  </p>
                  {!isReadOnly && onEdit && (
                    <button style={editButtonStyle} onClick={() => onEdit('goals', i)}>
                      Edit
                    </button>
                  )}
                </div>
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
