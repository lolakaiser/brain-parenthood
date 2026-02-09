"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import AppLayout from "@/components/AppLayout";
import { getProgress } from "@/lib/storage";

export default function ModulesPage() {
  const [completedModules, setCompletedModules] = useState<number[]>([]);

  useEffect(() => {
    const progress = getProgress();
    setCompletedModules(progress?.completedModules || []);
  }, []);

  const totalModules = 12;
  const modulesCompleted = completedModules.length;
  const overallProgress = Math.round((modulesCompleted / totalModules) * 100);
  const currentModule = completedModules.length + 1;

  return (
    <AppLayout>
      {/* Hero Header */}
      <div style={{ background: 'linear-gradient(to right, #4F46E5, #7C3AED, #EC4899)', width: '100%' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 80px' }}>
          <h1 style={{ fontSize: '36px', fontWeight: 'bold', color: 'white', marginBottom: '8px' }}>
            Learning Modules
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '18px', marginBottom: '40px' }}>
            Comprehensive modules for personal and professional development
          </p>

          {/* Stats Row */}
          <div style={{ display: 'flex', gap: '24px' }}>
            <div style={{ flex: 1, backgroundColor: 'rgba(67, 56, 202, 0.5)', borderRadius: '12px', padding: '24px' }}>
              <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)', marginBottom: '8px' }}>Total Modules</p>
              <p style={{ fontSize: '32px', fontWeight: 'bold', color: 'white' }}>{totalModules}</p>
            </div>
            <div style={{ flex: 1, backgroundColor: 'rgba(67, 56, 202, 0.5)', borderRadius: '12px', padding: '24px' }}>
              <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)', marginBottom: '8px' }}>Completed</p>
              <p style={{ fontSize: '32px', fontWeight: 'bold', color: 'white' }}>{modulesCompleted}</p>
            </div>
            <div style={{ flex: 1, backgroundColor: 'rgba(67, 56, 202, 0.5)', borderRadius: '12px', padding: '24px' }}>
              <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)', marginBottom: '8px' }}>Progress</p>
              <p style={{ fontSize: '32px', fontWeight: 'bold', color: 'white' }}>{overallProgress}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Module Cards */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 80px' }}>

        {/* Row 1 */}
        <div style={{ display: 'flex', gap: '40px', marginBottom: '40px' }}>
          <ModuleCard module={modules[0]} completedModules={completedModules} currentModule={currentModule} />
          <ModuleCard module={modules[1]} completedModules={completedModules} currentModule={currentModule} />
          <ModuleCard module={modules[2]} completedModules={completedModules} currentModule={currentModule} />
        </div>

        {/* Row 2 */}
        <div style={{ display: 'flex', gap: '40px', marginBottom: '40px' }}>
          <ModuleCard module={modules[3]} completedModules={completedModules} currentModule={currentModule} />
          <ModuleCard module={modules[4]} completedModules={completedModules} currentModule={currentModule} />
          <ModuleCard module={modules[5]} completedModules={completedModules} currentModule={currentModule} />
        </div>

        {/* Row 3 */}
        <div style={{ display: 'flex', gap: '40px', marginBottom: '40px' }}>
          <ModuleCard module={modules[6]} completedModules={completedModules} currentModule={currentModule} />
          <ModuleCard module={modules[7]} completedModules={completedModules} currentModule={currentModule} />
          <ModuleCard module={modules[8]} completedModules={completedModules} currentModule={currentModule} />
        </div>

        {/* Row 4 */}
        <div style={{ display: 'flex', gap: '40px' }}>
          <ModuleCard module={modules[9]} completedModules={completedModules} currentModule={currentModule} />
          <ModuleCard module={modules[10]} completedModules={completedModules} currentModule={currentModule} />
          <ModuleCard module={modules[11]} completedModules={completedModules} currentModule={currentModule} />
        </div>

      </div>
    </AppLayout>
  );
}

function ModuleCard({ module, completedModules, currentModule }: {
  module: typeof modules[0],
  completedModules: number[],
  currentModule: number
}) {
  const isCompleted = completedModules.includes(module.id);
  const isCurrent = module.id === currentModule;
  const isLocked = module.id > currentModule;

  return (
    <div style={{
      flex: 1,
      backgroundColor: 'white',
      borderRadius: '16px',
      padding: '32px',
      border: '1px solid #E5E7EB',
      opacity: isLocked ? 0.5 : 1
    }}>
      {/* Badge & Duration */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <span style={{
          padding: '6px 14px',
          borderRadius: '20px',
          fontSize: '12px',
          fontWeight: '500',
          backgroundColor: isCompleted ? '#DCFCE7' : isCurrent ? '#EEF2FF' : '#F3F4F6',
          color: isCompleted ? '#166534' : isCurrent ? '#4F46E5' : '#4B5563'
        }}>
          Module {module.id}
        </span>
        <span style={{ fontSize: '14px', color: '#9CA3AF' }}>{module.duration}</span>
      </div>

      {/* Title */}
      <h3 style={{ fontWeight: '600', color: '#111827', fontSize: '18px', marginBottom: '12px' }}>
        {module.title}
      </h3>

      {/* Description */}
      <p style={{
        color: '#6B7280',
        fontSize: '14px',
        marginBottom: '32px',
        lineHeight: '1.5',
        minHeight: '63px',
        overflow: 'hidden'
      }}>
        {module.description}
      </p>

      {/* Footer */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: '20px',
        borderTop: '1px solid #F3F4F6'
      }}>
        <span style={{ fontSize: '14px', color: '#9CA3AF' }}>{module.sections} sections</span>
        {!isLocked ? (
          <Link
            href={`/module/${module.id}`}
            style={{
              color: '#4F46E5',
              fontWeight: '500',
              fontSize: '14px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              textDecoration: 'none'
            }}
          >
            {isCompleted ? "Review" : "Start"} →
          </Link>
        ) : (
          <span style={{ color: '#D1D5DB', fontSize: '14px' }}>Locked</span>
        )}
      </div>
    </div>
  );
}

const modules = [
  {
    id: 1,
    title: "The Right Frame of Mind",
    description: "Develop a positive mindset by overcoming negative thought patterns, understanding motivation, and embracing personal accountability.",
    duration: "75 min",
    sections: 6,
  },
  {
    id: 2,
    title: "How to Handle the Tough Stuff",
    description: "Learn comprehensive coping strategies for difficult situations including conflict resolution, anger management, and stress reduction.",
    duration: "90 min",
    sections: 6,
  },
  {
    id: 3,
    title: "How to Put Your Best Foot Forward",
    description: "Master effective communication skills for personal and professional success, including verbal and non-verbal techniques.",
    duration: "85 min",
    sections: 6,
  },
  {
    id: 4,
    title: "The Nuts and Bolts",
    description: "Master practical life skills including money management, time management, and decision making.",
    duration: "50 min",
    sections: 3,
  },
  {
    id: 5,
    title: "Effective Communication",
    description: "Master specific communication techniques including 'I' statements and active listening.",
    duration: "45 min",
    sections: 3,
  },
  {
    id: 6,
    title: "Stress Management",
    description: "Master relaxation techniques and stress coping strategies.",
    duration: "70 min",
    sections: 4,
  },
  {
    id: 7,
    title: "Parenting",
    description: "Guidance for parents on positive parenting techniques and work-life balance.",
    duration: "50 min",
    sections: 3,
  },
  {
    id: 8,
    title: "Positive Attitude",
    description: "Assess and improve your overall outlook on life.",
    duration: "35 min",
    sections: 2,
  },
  {
    id: 9,
    title: "Communication",
    description: "Explore different forms and styles of communication.",
    duration: "60 min",
    sections: 3,
  },
  {
    id: 10,
    title: "Communication Skills Worksheet",
    description: "Practice and apply communication skills through hands-on exercises.",
    duration: "40 min",
    sections: 2,
  },
  {
    id: 11,
    title: "Decision Making",
    description: "Learn structured approaches to making better decisions.",
    duration: "65 min",
    sections: 3,
  },
  {
    id: 12,
    title: "Anger Management",
    description: "Comprehensive anger management and conflict resolution techniques.",
    duration: "70 min",
    sections: 4,
  },
];
