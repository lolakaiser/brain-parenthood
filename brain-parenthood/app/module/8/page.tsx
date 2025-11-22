"use client";
import Link from "next/link";
import { useState, useEffect, memo } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

const GRADIENT = 'linear-gradient(135deg, #9333ea 0%, #3b82f6 100%)';

export default function Module8() {
  const [step, setStep] = useState(0);
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => { if (!isAuthenticated) router.push('/login'); }, [isAuthenticated, router]);
  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen pt-32 bg-[#2D3E50] px-8">
      <div className="max-w-4xl mx-auto">
        <Link href="/modules" className="text-white hover:text-gray-300 mb-4 inline-block">← Back</Link>
        <h1 className="text-5xl font-bold text-white mb-2">Module 8: Stress Management</h1>
        <p className="text-xl text-white mb-8">Week 8 - Advanced Coping Techniques</p>

        <div className="flex gap-4 mb-8">
          {['Overview', 'Assess', 'Toolkit', 'Complete'].map((s, i) => (
            <div key={i} className={`flex-1 h-2 rounded ${i <= step ? 'bg-purple-500' : 'bg-gray-600'}`} />
          ))}
        </div>

        {step === 0 && <Overview onNext={() => setStep(1)} />}
        {step === 1 && <Assessment onNext={() => setStep(2)} onBack={() => setStep(0)} />}
        {step === 2 && <Toolkit onNext={() => setStep(3)} onBack={() => setStep(1)} />}
        {step === 3 && <Complete />}
      </div>
    </div>
  );
}

const Overview = memo(({ onNext }: { onNext: () => void }) => (
  <div className="bg-[#3A4F63] rounded-3xl p-12">
    <h2 className="text-4xl font-bold text-white mb-6">Stress Management System</h2>
    {/* 🤖 AI: Stress pattern recognition */}
    <div className="mb-6 p-4 bg-purple-900/30 rounded-xl">
      <p className="text-white"><strong className="text-purple-300">🤖 AI:</strong> Your stress peaks on Monday mornings - let's create a prevention plan</p>
    </div>
    <p className="text-xl text-white mb-6">Understanding stress physiology helps you respond effectively instead of reacting.</p>
    <div className="grid md:grid-cols-2 gap-6 mb-8">
      <div className="bg-[#2D3E50] p-6 rounded-xl">
        <h3 className="font-bold text-white mb-3">Stress Response</h3>
        <ul className="text-white space-y-2">
          <li>• Acute vs Chronic Stress</li>
          <li>• Fight/Flight/Freeze</li>
          <li>• Cortisol & Adrenaline</li>
          <li>• Recovery Importance</li>
        </ul>
      </div>
      <div className="bg-[#2D3E50] p-6 rounded-xl">
        <h3 className="font-bold text-white mb-3">This Week</h3>
        <ul className="text-white space-y-2">
          <li>• Identify stress triggers</li>
          <li>• Build coping toolkit</li>
          <li>• Create management system</li>
        </ul>
      </div>
    </div>
    <button onClick={onNext} className="px-8 py-4 rounded-xl text-white font-bold" style={{background: GRADIENT}}>Identify Triggers →</button>
  </div>
));

const Assessment = memo(({ onNext, onBack }: { onNext: () => void; onBack: () => void }) => {
  const [triggers, setTriggers] = useState<string[]>([]);
  const options = ['Deadlines', 'Conflict', 'Uncertainty', 'Workload', 'Technology', 'Meetings'];

  const toggle = (item: string) => {
    setTriggers(prev => prev.includes(item) ? prev.filter(t => t !== item) : [...prev, item]);
  };

  return (
    <div className="bg-[#3A4F63] rounded-3xl p-12">
      <h2 className="text-3xl font-bold text-white mb-6">Stress Trigger Identification</h2>
      <p className="text-gray-300 mb-6">Select your top stress triggers</p>
      <div className="grid grid-cols-2 gap-4 mb-8">
        {options.map(opt => (
          <button key={opt} onClick={() => toggle(opt)}
            className={`p-4 rounded-xl border-2 transition-all ${
              triggers.includes(opt)
                ? 'bg-purple-600 border-purple-400 text-white'
                : 'bg-[#2D3E50] border-white/20 text-gray-300'
            }`}>
            {opt}
          </button>
        ))}
      </div>
      {/* 🤖 AI: Personalized coping techniques */}
      {triggers.length > 0 && (
        <div className="p-4 bg-purple-900/20 rounded-xl mb-6">
          <p className="text-white text-sm"><strong className="text-purple-300">🤖 AI:</strong> Based on your triggers, I recommend time-blocking and breathing exercises</p>
        </div>
      )}
      <div className="flex justify-between">
        <button onClick={onBack} className="px-8 py-4 rounded-xl text-white font-bold" style={{background: GRADIENT}}>← Back</button>
        <button onClick={onNext} disabled={triggers.length === 0} className={`px-8 py-4 rounded-xl text-white font-bold ${triggers.length === 0 && 'opacity-50'}`}
          style={triggers.length > 0 ? {background: GRADIENT} : {}}>Build Toolkit →</button>
      </div>
    </div>
  );
});

const Toolkit = memo(({ onNext, onBack }: { onNext: () => void; onBack: () => void }) => {
  const [selected, setSelected] = useState<string[]>([]);
  const techniques = [
    { name: '4-7-8 Breathing', desc: 'Inhale 4s, hold 7s, exhale 8s' },
    { name: 'Progressive Relaxation', desc: 'Tense and release muscle groups' },
    { name: '5-4-3-2-1 Grounding', desc: 'Engage all 5 senses to stay present' },
    { name: 'Time Blocking', desc: 'Schedule focused work periods' },
    { name: 'Physical Activity', desc: '10-min walk or stretch breaks' },
    { name: 'Social Support', desc: 'Talk to a trusted colleague' },
  ];

  const toggle = (name: string) => {
    setSelected(prev => prev.includes(name) ? prev.filter(n => n !== name) : [...prev, name]);
  };

  return (
    <div className="bg-[#3A4F63] rounded-3xl p-12">
      <h2 className="text-3xl font-bold text-white mb-6">Your Coping Toolkit</h2>
      <p className="text-gray-300 mb-6">Select 2-3 techniques to practice this week</p>
      <div className="space-y-3 mb-8">
        {techniques.map(tech => (
          <button key={tech.name} onClick={() => toggle(tech.name)}
            className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
              selected.includes(tech.name)
                ? 'bg-purple-600 border-purple-400'
                : 'bg-[#2D3E50] border-white/20'
            }`}>
            <h3 className="font-bold text-white mb-1">{tech.name}</h3>
            <p className="text-gray-300 text-sm">{tech.desc}</p>
          </button>
        ))}
      </div>
      <div className="flex justify-between">
        <button onClick={onBack} className="px-8 py-4 rounded-xl text-white font-bold" style={{background: GRADIENT}}>← Back</button>
        <button onClick={onNext} disabled={selected.length === 0} className={`px-8 py-4 rounded-xl text-white font-bold ${selected.length === 0 && 'opacity-50'}`}
          style={selected.length > 0 ? {background: GRADIENT} : {}}>Complete →</button>
      </div>
    </div>
  );
});

const Complete = memo(() => (
  <div className="bg-[#3A4F63] rounded-3xl p-12 text-center">
    <h2 className="text-5xl font-bold text-white mb-6">Module 8 Complete! 🧘</h2>
    <p className="text-xl text-white mb-8">You have a personalized stress management toolkit!</p>
    <div className="flex gap-4 justify-center">
      <Link href="/dashboard" className="px-10 py-5 rounded-2xl text-white font-bold" style={{background: GRADIENT}}>Dashboard →</Link>
      <Link href="/modules" className="px-10 py-5 rounded-2xl text-white font-bold" style={{background: GRADIENT}}>All Modules</Link>
    </div>
  </div>
));
