"use client";
import Link from "next/link";
import { useState, useEffect, memo } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

const GRADIENT = 'linear-gradient(135deg, #9333ea 0%, #3b82f6 100%)';

export default function Module4() {
  const [step, setStep] = useState(0);
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => { if (!isAuthenticated) router.push('/login'); }, [isAuthenticated, router]);
  if (!isAuthenticated) return null;

  const steps = ['Overview', 'Assess', 'Practice', 'Complete'];

  return (
    <div className="min-h-screen pt-32 bg-[#2D3E50] px-8">
      <div className="max-w-4xl mx-auto">
        <Link href="/modules" className="text-white hover:text-gray-300 mb-4 inline-block">← Back to Modules</Link>
        <h1 className="text-5xl font-bold text-white mb-2">Module 4: Emotional Intelligence</h1>
        <p className="text-xl text-white mb-8">Week 4 - Master Your Emotions</p>

        <div className="flex gap-4 mb-8">
          {steps.map((s, i) => (
            <div key={i} className={`flex-1 h-2 rounded ${i <= step ? 'bg-purple-500' : 'bg-gray-600'}`} />
          ))}
        </div>

        {step === 0 && <Overview onNext={() => setStep(1)} />}
        {step === 1 && <Assessment onNext={() => setStep(2)} onBack={() => setStep(0)} />}
        {step === 2 && <Practice onNext={() => setStep(3)} onBack={() => setStep(1)} />}
        {step === 3 && <Complete />}
      </div>
    </div>
  );
}

const Overview = memo(({ onNext }: { onNext: () => void }) => (
  <div className="bg-[#3A4F63] rounded-3xl p-12 border border-white/10">
    <h2 className="text-4xl font-bold text-white mb-6">Welcome to Emotional Intelligence</h2>
    {/* 🤖 AI Integration: Personalized EQ insights based on baseline */}
    <div className="mb-6 p-4 bg-purple-900/30 rounded-xl border border-purple-500/50">
      <p className="text-white"><strong className="text-purple-300">🤖 AI Insight:</strong> Based on your profile, focus on social awareness</p>
    </div>
    <p className="text-xl text-white mb-6">EQ is the ability to understand and manage emotions - yours and others'. High EQ = better leadership, teamwork, and stress management.</p>
    <div className="grid md:grid-cols-2 gap-6 mb-8">
      <div className="bg-[#2D3E50] p-6 rounded-xl">
        <h3 className="font-bold text-white mb-3">4 Pillars of EQ</h3>
        <ul className="text-white space-y-2">
          <li>• Self-Awareness</li>
          <li>• Self-Management</li>
          <li>• Social Awareness</li>
          <li>• Relationship Management</li>
        </ul>
      </div>
      <div className="bg-[#2D3E50] p-6 rounded-xl">
        <h3 className="font-bold text-white mb-3">This Week</h3>
        <ul className="text-white space-y-2">
          <li>• Assess your EQ</li>
          <li>• Practice emotion labeling</li>
          <li>• Create development plan</li>
        </ul>
      </div>
    </div>
    <button onClick={onNext} className="px-8 py-4 rounded-xl text-white font-bold" style={{background: GRADIENT}}>Begin Assessment →</button>
  </div>
));

const Assessment = memo(({ onNext, onBack }: { onNext: () => void; onBack: () => void }) => {
  const [scores, setScores] = useState({ selfAware: 5, selfManage: 5, social: 5, relationships: 5 });

  return (
    <div className="bg-[#3A4F63] rounded-3xl p-12">
      <h2 className="text-3xl font-bold text-white mb-6">Assess Your EQ</h2>
      {Object.entries(scores).map(([key, val]) => (
        <div key={key} className="mb-6 bg-[#2D3E50] p-4 rounded-xl">
          <label className="text-white font-bold block mb-2">{key}: {val}/10</label>
          <input type="range" min="1" max="10" value={val} onChange={(e) => setScores({...scores, [key]: parseInt(e.target.value)})}
            className="w-full h-3 bg-white/20 rounded-lg cursor-pointer" />
        </div>
      ))}
      {/* 🤖 AI: Analyze scores and suggest focus areas */}
      <div className="p-4 bg-purple-900/20 rounded-xl mb-6">
        <p className="text-white text-sm"><strong className="text-purple-300">🤖 AI:</strong> Focus on your lowest scoring area</p>
      </div>
      <div className="flex justify-between">
        <button onClick={onBack} className="px-8 py-4 rounded-xl text-white font-bold" style={{background: GRADIENT}}>← Back</button>
        <button onClick={onNext} className="px-8 py-4 rounded-xl text-white font-bold" style={{background: GRADIENT}}>Practice →</button>
      </div>
    </div>
  );
});

const Practice = memo(({ onNext, onBack }: { onNext: () => void; onBack: () => void }) => {
  const [data, setData] = useState({ emotion: '', trigger: '', response: '' });
  const complete = data.emotion && data.trigger && data.response;

  return (
    <div className="bg-[#3A4F63] rounded-3xl p-12">
      <h2 className="text-3xl font-bold text-white mb-6">Emotion Labeling Practice</h2>
      <div className="space-y-6">
        <div>
          <label className="text-white font-bold block mb-2">Name the Emotion</label>
          <input value={data.emotion} onChange={(e) => setData({...data, emotion: e.target.value})}
            className="w-full px-4 py-3 bg-[#2D3E50] text-white border-2 border-white/20 rounded-xl"
            placeholder="e.g., frustrated, anxious..." />
        </div>
        <div>
          <label className="text-white font-bold block mb-2">What Triggered It?</label>
          <textarea value={data.trigger} onChange={(e) => setData({...data, trigger: e.target.value})}
            className="w-full px-4 py-3 bg-[#2D3E50] text-white border-2 border-white/20 rounded-xl"
            rows={3} placeholder="Describe the situation..." />
        </div>
        <div>
          <label className="text-white font-bold block mb-2">How Did You Respond?</label>
          <textarea value={data.response} onChange={(e) => setData({...data, response: e.target.value})}
            className="w-full px-4 py-3 bg-[#2D3E50] text-white border-2 border-white/20 rounded-xl"
            rows={3} placeholder="Your response..." />
        </div>
      </div>
      <div className="flex justify-between mt-8">
        <button onClick={onBack} className="px-8 py-4 rounded-xl text-white font-bold" style={{background: GRADIENT}}>← Back</button>
        <button onClick={onNext} disabled={!complete} className={`px-8 py-4 rounded-xl text-white font-bold ${!complete && 'opacity-50'}`}
          style={complete ? {background: GRADIENT} : {}}>Complete →</button>
      </div>
    </div>
  );
});

const Complete = memo(() => (
  <div className="bg-[#3A4F63] rounded-3xl p-12 text-center">
    <h2 className="text-5xl font-bold text-white mb-6">Module 4 Complete! 💪</h2>
    <p className="text-xl text-white mb-8">You're developing emotional intelligence - a key to success!</p>
    <div className="flex gap-4 justify-center">
      <Link href="/dashboard" className="px-10 py-5 rounded-2xl text-white font-bold" style={{background: GRADIENT}}>Dashboard →</Link>
      <Link href="/modules" className="px-10 py-5 rounded-2xl text-white font-bold" style={{background: GRADIENT}}>All Modules</Link>
    </div>
  </div>
));
