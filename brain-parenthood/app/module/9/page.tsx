"use client";
import Link from "next/link";
import { useState, useEffect, memo } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

const GRADIENT = 'linear-gradient(135deg, #9333ea 0%, #3b82f6 100%)';

export default function Module9() {
  const [step, setStep] = useState(0);
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => { if (!isAuthenticated) router.push('/login'); }, [isAuthenticated, router]);
  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen pt-32 bg-[#2D3E50] px-8">
      <div className="max-w-4xl mx-auto">
        <Link href="/modules" className="text-white hover:text-gray-300 mb-4 inline-block">← Back</Link>
        <h1 className="text-5xl font-bold text-white mb-2">Module 9: Work-Life Integration</h1>
        <p className="text-xl text-white mb-8">Week 9 - Design Sustainable Balance</p>

        <div className="flex gap-4 mb-8">
          {['Overview', 'Assess', 'Design', 'Complete'].map((s, i) => (
            <div key={i} className={`flex-1 h-2 rounded ${i <= step ? 'bg-purple-500' : 'bg-gray-600'}`} />
          ))}
        </div>

        {step === 0 && <Overview onNext={() => setStep(1)} />}
        {step === 1 && <Assessment onNext={() => setStep(2)} onBack={() => setStep(0)} />}
        {step === 2 && <Design onNext={() => setStep(3)} onBack={() => setStep(1)} />}
        {step === 3 && <Complete />}
      </div>
    </div>
  );
}

const Overview = memo(({ onNext }: { onNext: () => void }) => (
  <div className="bg-[#3A4F63] rounded-3xl p-12">
    <h2 className="text-4xl font-bold text-white mb-6">Work-Life Integration</h2>
    {/* 🤖 AI: Schedule optimization */}
    <div className="mb-6 p-4 bg-purple-900/30 rounded-xl">
      <p className="text-white"><strong className="text-purple-300">🤖 AI:</strong> You work best 9am-12pm - schedule deep work then</p>
    </div>
    <p className="text-xl text-white mb-6">Move from rigid "balance" to flexible "integration" that fits your life.</p>
    <div className="grid md:grid-cols-2 gap-6 mb-8">
      <div className="bg-[#2D3E50] p-6 rounded-xl">
        <h3 className="font-bold text-white mb-3">Balance vs Integration</h3>
        <ul className="text-white space-y-2">
          <li>• Balance: 50/50 split (rigid)</li>
          <li>• Integration: Flexible flow</li>
          <li>• Energy > Time</li>
          <li>• Clear boundaries</li>
        </ul>
      </div>
      <div className="bg-[#2D3E50] p-6 rounded-xl">
        <h3 className="font-bold text-white mb-3">This Week</h3>
        <ul className="text-white space-y-2">
          <li>• Assess current state</li>
          <li>• Design ideal week</li>
          <li>• Set boundaries</li>
        </ul>
      </div>
    </div>
    <button onClick={onNext} className="px-8 py-4 rounded-xl text-white font-bold" style={{background: GRADIENT}}>Assess Current State →</button>
  </div>
));

const Assessment = memo(({ onNext, onBack }: { onNext: () => void; onBack: () => void }) => {
  const [scores, setScores] = useState({ energy: 5, boundaries: 5, recovery: 5, satisfaction: 5 });

  return (
    <div className="bg-[#3A4F63] rounded-3xl p-12">
      <h2 className="text-3xl font-bold text-white mb-6">Current State Analysis</h2>
      <p className="text-gray-300 mb-6">Rate your current work-life integration (1-10)</p>
      {Object.entries(scores).map(([key, val]) => (
        <div key={key} className="mb-6 bg-[#2D3E50] p-4 rounded-xl">
          <label className="text-white font-bold block mb-2 capitalize">{key}: {val}/10</label>
          <input type="range" min="1" max="10" value={val} onChange={(e) => setScores({...scores, [key]: parseInt(e.target.value)})}
            className="w-full h-3 bg-white/20 rounded-lg cursor-pointer" />
        </div>
      ))}
      {/* 🤖 AI: Energy management coaching */}
      <div className="p-4 bg-purple-900/20 rounded-xl mb-6">
        <p className="text-white text-sm"><strong className="text-purple-300">🤖 AI:</strong> Low recovery score - prioritize sleep and breaks</p>
      </div>
      <div className="flex justify-between mt-8">
        <button onClick={onBack} className="px-8 py-4 rounded-xl text-white font-bold" style={{background: GRADIENT}}>← Back</button>
        <button onClick={onNext} className="px-8 py-4 rounded-xl text-white font-bold" style={{background: GRADIENT}}>Design Ideal Week →</button>
      </div>
    </div>
  );
});

const Design = memo(({ onNext, onBack }: { onNext: () => void; onBack: () => void }) => {
  const [data, setData] = useState({ deepWork: '', boundaries: '', recovery: '' });
  const complete = data.deepWork && data.boundaries && data.recovery;

  return (
    <div className="bg-[#3A4F63] rounded-3xl p-12">
      <h2 className="text-3xl font-bold text-white mb-6">Design Your Ideal Week</h2>
      <div className="space-y-6">
        <div>
          <label className="text-white font-bold block mb-2">Deep Work Blocks (when + what)</label>
          <textarea value={data.deepWork} onChange={(e) => setData({...data, deepWork: e.target.value})}
            className="w-full px-4 py-3 bg-[#2D3E50] text-white border-2 border-white/20 rounded-xl"
            rows={2} placeholder="e.g., 'Mon-Fri 9-11am: strategic work, no meetings'" />
        </div>
        <div>
          <label className="text-white font-bold block mb-2">Boundaries to Set</label>
          <textarea value={data.boundaries} onChange={(e) => setData({...data, boundaries: e.target.value})}
            className="w-full px-4 py-3 bg-[#2D3E50] text-white border-2 border-white/20 rounded-xl"
            rows={2} placeholder="e.g., 'No email after 6pm, no work weekends'" />
        </div>
        <div>
          <label className="text-white font-bold block mb-2">Recovery Rituals</label>
          <textarea value={data.recovery} onChange={(e) => setData({...data, recovery: e.target.value})}
            className="w-full px-4 py-3 bg-[#2D3E50] text-white border-2 border-white/20 rounded-xl"
            rows={2} placeholder="e.g., 'Daily: 30-min walk, Weekly: family dinner'" />
        </div>
      </div>
      {/* 🤖 AI: Boundary suggestions */}
      {data.boundaries && (
        <div className="mt-4 p-3 bg-purple-900/20 rounded-xl">
          <p className="text-white text-sm"><strong className="text-purple-300">🤖 AI:</strong> Consider adding 'no meetings before 10am' to protect morning energy</p>
        </div>
      )}
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
    <h2 className="text-5xl font-bold text-white mb-6">Module 9 Complete! ⚖️</h2>
    <p className="text-xl text-white mb-8">You've designed a sustainable work-life integration!</p>
    <div className="flex gap-4 justify-center">
      <Link href="/dashboard" className="px-10 py-5 rounded-2xl text-white font-bold" style={{background: GRADIENT}}>Dashboard →</Link>
      <Link href="/modules" className="px-10 py-5 rounded-2xl text-white font-bold" style={{background: GRADIENT}}>All Modules</Link>
    </div>
  </div>
));
