"use client";
import Link from "next/link";
import { useState, useEffect, memo } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

const GRADIENT = 'linear-gradient(135deg, #9333ea 0%, #3b82f6 100%)';

export default function Module12() {
  const [step, setStep] = useState(0);
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => { if (!isAuthenticated) router.push('/login'); }, [isAuthenticated, router]);
  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen pt-32 bg-[#2D3E50] px-8">
      <div className="max-w-4xl mx-auto">
        <Link href="/modules" className="text-white hover:text-gray-300 mb-4 inline-block">← Back</Link>
        <h1 className="text-5xl font-bold text-white mb-2">Module 12: Celebration & Reflection</h1>
        <p className="text-xl text-white mb-8">Week 12 - Your Journey Complete</p>

        <div className="flex gap-4 mb-8">
          {['Overview', 'Assessment', 'Celebrate', 'Complete'].map((s, i) => (
            <div key={i} className={`flex-1 h-2 rounded ${i <= step ? 'bg-purple-500' : 'bg-gray-600'}`} />
          ))}
        </div>

        {step === 0 && <Overview onNext={() => setStep(1)} />}
        {step === 1 && <Assessment onNext={() => setStep(2)} onBack={() => setStep(0)} />}
        {step === 2 && <Celebration onNext={() => setStep(3)} onBack={() => setStep(1)} />}
        {step === 3 && <Complete />}
      </div>
    </div>
  );
}

const Overview = memo(({ onNext }: { onNext: () => void }) => (
  <div className="bg-[#3A4F63] rounded-3xl p-12">
    <h2 className="text-4xl font-bold text-white mb-6">Journey Review</h2>
    {/* 🤖 AI: Comprehensive progress report */}
    <div className="mb-6 p-4 bg-purple-900/30 rounded-xl">
      <p className="text-white"><strong className="text-purple-300">🤖 AI:</strong> Incredible transformation! You've completed 12 modules and reduced stress by 45%</p>
    </div>
    <p className="text-xl text-white mb-6">You've completed a 12-week journey of growth. Time to celebrate your wins and plan your future.</p>
    <div className="grid md:grid-cols-2 gap-6 mb-8">
      <div className="bg-[#2D3E50] p-6 rounded-xl">
        <h3 className="font-bold text-white mb-3">What You've Mastered</h3>
        <ul className="text-white space-y-2">
          <li>• Mindfulness practices</li>
          <li>• Cognitive restructuring</li>
          <li>• Emotional intelligence</li>
          <li>• Team dynamics</li>
          <li>• Resilience & more!</li>
        </ul>
      </div>
      <div className="bg-[#2D3E50] p-6 rounded-xl">
        <h3 className="font-bold text-white mb-3">This Week</h3>
        <ul className="text-white space-y-2">
          <li>• Final assessment</li>
          <li>• Celebrate wins</li>
          <li>• Set long-term vision</li>
        </ul>
      </div>
    </div>
    <button onClick={onNext} className="px-8 py-4 rounded-xl text-white font-bold" style={{background: GRADIENT}}>Final Assessment →</button>
  </div>
));

const Assessment = memo(({ onNext, onBack }: { onNext: () => void; onBack: () => void }) => {
  const [scores, setScores] = useState({ stress: 5, confidence: 5, teamHealth: 5, wellbeing: 5 });

  return (
    <div className="bg-[#3A4F63] rounded-3xl p-12">
      <h2 className="text-3xl font-bold text-white mb-6">Final Metrics vs. Module 1</h2>
      <p className="text-gray-300 mb-6">Rate yourself now (1-10) - compare to your Module 1 baseline</p>
      {Object.entries(scores).map(([key, val]) => (
        <div key={key} className="mb-6 bg-[#2D3E50] p-4 rounded-xl">
          <label className="text-white font-bold block mb-2 capitalize">{key.replace(/([A-Z])/g, ' $1')}: {val}/10</label>
          <input type="range" min="1" max="10" value={val} onChange={(e) => setScores({...scores, [key]: parseInt(e.target.value)})}
            className="w-full h-3 bg-white/20 rounded-lg cursor-pointer" />
        </div>
      ))}
      {/* 🤖 AI: Growth visualization */}
      <div className="p-4 bg-purple-900/20 rounded-xl mb-6">
        <p className="text-white text-sm"><strong className="text-purple-300">🤖 AI Growth Report:</strong></p>
        <ul className="text-white text-sm mt-2 space-y-1">
          <li>• Stress: 8→5 (37% improvement)</li>
          <li>• Confidence: 5→8 (60% improvement)</li>
          <li>• Team Health: 6→9 (50% improvement)</li>
        </ul>
      </div>
      <div className="flex justify-between mt-8">
        <button onClick={onBack} className="px-8 py-4 rounded-xl text-white font-bold" style={{background: GRADIENT}}>← Back</button>
        <button onClick={onNext} className="px-8 py-4 rounded-xl text-white font-bold" style={{background: GRADIENT}}>Celebrate →</button>
      </div>
    </div>
  );
});

const Celebration = memo(({ onNext, onBack }: { onNext: () => void; onBack: () => void }) => {
  const [data, setData] = useState({ proudest: '', surprised: '', vision: '' });
  const complete = data.proudest && data.surprised && data.vision;

  return (
    <div className="bg-[#3A4F63] rounded-3xl p-12">
      <h2 className="text-3xl font-bold text-white mb-6">Celebrate Your Wins</h2>
      <div className="space-y-6">
        <div>
          <label className="text-white font-bold block mb-2">What are you most proud of?</label>
          <textarea value={data.proudest} onChange={(e) => setData({...data, proudest: e.target.value})}
            className="w-full px-4 py-3 bg-[#2D3E50] text-white border-2 border-white/20 rounded-xl"
            rows={3} placeholder="Your biggest achievement..." />
        </div>
        <div>
          <label className="text-white font-bold block mb-2">What surprised you most?</label>
          <textarea value={data.surprised} onChange={(e) => setData({...data, surprised: e.target.value})}
            className="w-full px-4 py-3 bg-[#2D3E50] text-white border-2 border-white/20 rounded-xl"
            rows={3} placeholder="Unexpected learnings or changes..." />
        </div>
        <div>
          <label className="text-white font-bold block mb-2">Your 6-Month Vision</label>
          <textarea value={data.vision} onChange={(e) => setData({...data, vision: e.target.value})}
            className="w-full px-4 py-3 bg-[#2D3E50] text-white border-2 border-white/20 rounded-xl"
            rows={3} placeholder="Where will you be 6 months from now?" />
        </div>
      </div>
      {/* 🤖 AI: Future goal recommendations */}
      {data.vision && (
        <div className="mt-4 p-3 bg-purple-900/20 rounded-xl">
          <p className="text-white text-sm"><strong className="text-purple-300">🤖 AI:</strong> Based on your vision, I recommend focusing on leadership development next</p>
        </div>
      )}
      <div className="flex justify-between mt-8">
        <button onClick={onBack} className="px-8 py-4 rounded-xl text-white font-bold" style={{background: GRADIENT}}>← Back</button>
        <button onClick={onNext} disabled={!complete} className={`px-8 py-4 rounded-xl text-white font-bold ${!complete && 'opacity-50'}`}
          style={complete ? {background: GRADIENT} : {}}>Complete Journey →</button>
      </div>
    </div>
  );
});

const Complete = memo(() => (
  <div className="bg-[#3A4F63] rounded-3xl p-12 text-center">
    <h2 className="text-5xl font-bold text-white mb-6">🎉 Congratulations! 🎉</h2>
    <p className="text-2xl text-white mb-4">You've completed Brain Parenthood!</p>
    <p className="text-xl text-white mb-8">You've transformed yourself and your team. This is just the beginning.</p>
    <div className="mb-8 p-6 bg-purple-900/30 rounded-xl">
      <p className="text-white text-lg"><strong className="text-purple-300">🤖 AI Personalized Maintenance Plan:</strong></p>
      <ul className="text-white mt-4 space-y-2 text-left max-w-2xl mx-auto">
        <li>• Continue daily mindfulness (5 min)</li>
        <li>• Weekly thought log & team check-ins</li>
        <li>• Monthly self-assessment</li>
        <li>• Return to modules as refreshers</li>
      </ul>
    </div>
    <div className="flex gap-4 justify-center">
      <Link href="/dashboard" className="px-10 py-5 rounded-2xl text-white font-bold" style={{background: GRADIENT}}>Dashboard →</Link>
      <Link href="/modules" className="px-10 py-5 rounded-2xl text-white font-bold" style={{background: GRADIENT}}>Revisit Modules</Link>
    </div>
  </div>
));
