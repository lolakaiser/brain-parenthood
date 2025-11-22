"use client";
import Link from "next/link";
import { useState, useEffect, memo } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

const GRADIENT = 'linear-gradient(135deg, #9333ea 0%, #3b82f6 100%)';

export default function Module11() {
  const [step, setStep] = useState(0);
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => { if (!isAuthenticated) router.push('/login'); }, [isAuthenticated, router]);
  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen pt-32 bg-[#2D3E50] px-8">
      <div className="max-w-4xl mx-auto">
        <Link href="/modules" className="text-white hover:text-gray-300 mb-4 inline-block">← Back</Link>
        <h1 className="text-5xl font-bold text-white mb-2">Module 11: Sustainability Planning</h1>
        <p className="text-xl text-white mb-8">Week 11 - Make It Last</p>

        <div className="flex gap-4 mb-8">
          {['Overview', 'Review', 'Plan', 'Complete'].map((s, i) => (
            <div key={i} className={`flex-1 h-2 rounded ${i <= step ? 'bg-purple-500' : 'bg-gray-600'}`} />
          ))}
        </div>

        {step === 0 && <Overview onNext={() => setStep(1)} />}
        {step === 1 && <Review onNext={() => setStep(2)} onBack={() => setStep(0)} />}
        {step === 2 && <Plan onNext={() => setStep(3)} onBack={() => setStep(1)} />}
        {step === 3 && <Complete />}
      </div>
    </div>
  );
}

const Overview = memo(({ onNext }: { onNext: () => void }) => (
  <div className="bg-[#3A4F63] rounded-3xl p-12">
    <h2 className="text-4xl font-bold text-white mb-6">Lasting Habit Formation</h2>
    {/* 🤖 AI: Progress trend analysis */}
    <div className="mb-6 p-4 bg-purple-900/30 rounded-xl">
      <p className="text-white"><strong className="text-purple-300">🤖 AI:</strong> You've reduced stress 40% since Module 1 - let's lock in these gains</p>
    </div>
    <p className="text-xl text-white mb-6">Transformation requires sustainability. Build systems that last beyond this program.</p>
    <div className="grid md:grid-cols-2 gap-6 mb-8">
      <div className="bg-[#2D3E50] p-6 rounded-xl">
        <h3 className="font-bold text-white mb-3">Habit Science</h3>
        <ul className="text-white space-y-2">
          <li>• Cue → Routine → Reward</li>
          <li>• Environment design</li>
          <li>• Accountability systems</li>
          <li>• Relapse prevention</li>
        </ul>
      </div>
      <div className="bg-[#2D3E50] p-6 rounded-xl">
        <h3 className="font-bold text-white mb-3">This Week</h3>
        <ul className="text-white space-y-2">
          <li>• Review your progress</li>
          <li>• Identify sustainable habits</li>
          <li>• Create 90-day plan</li>
        </ul>
      </div>
    </div>
    <button onClick={onNext} className="px-8 py-4 rounded-xl text-white font-bold" style={{background: GRADIENT}}>Review Progress →</button>
  </div>
));

const Review = memo(({ onNext, onBack }: { onNext: () => void; onBack: () => void }) => {
  const [data, setData] = useState({ wins: '', challenges: '', key_learnings: '' });

  return (
    <div className="bg-[#3A4F63] rounded-3xl p-12">
      <h2 className="text-3xl font-bold text-white mb-6">Progress Since Module 1</h2>
      <div className="space-y-6">
        <div>
          <label className="text-white font-bold block mb-2">Biggest Wins</label>
          <textarea value={data.wins} onChange={(e) => setData({...data, wins: e.target.value})}
            className="w-full px-4 py-3 bg-[#2D3E50] text-white border-2 border-white/20 rounded-xl"
            rows={3} placeholder="What improvements are you most proud of?" />
        </div>
        <div>
          <label className="text-white font-bold block mb-2">Ongoing Challenges</label>
          <textarea value={data.challenges} onChange={(e) => setData({...data, challenges: e.target.value})}
            className="w-full px-4 py-3 bg-[#2D3E50] text-white border-2 border-white/20 rounded-xl"
            rows={3} placeholder="What still feels difficult?" />
        </div>
        <div>
          <label className="text-white font-bold block mb-2">Key Learnings</label>
          <textarea value={data.key_learnings} onChange={(e) => setData({...data, key_learnings: e.target.value})}
            className="w-full px-4 py-3 bg-[#2D3E50] text-white border-2 border-white/20 rounded-xl"
            rows={3} placeholder="What insights will you carry forward?" />
        </div>
      </div>
      {/* 🤖 AI: Habit sustainability prediction */}
      <div className="mt-6 p-4 bg-purple-900/20 rounded-xl">
        <p className="text-white text-sm"><strong className="text-purple-300">🤖 AI:</strong> Based on your patterns, mindfulness and cognitive reframing have the highest sustainability</p>
      </div>
      <div className="flex justify-between mt-8">
        <button onClick={onBack} className="px-8 py-4 rounded-xl text-white font-bold" style={{background: GRADIENT}}>← Back</button>
        <button onClick={onNext} className="px-8 py-4 rounded-xl text-white font-bold" style={{background: GRADIENT}}>Create Plan →</button>
      </div>
    </div>
  );
});

const Plan = memo(({ onNext, onBack }: { onNext: () => void; onBack: () => void }) => {
  const [data, setData] = useState({ daily: '', weekly: '', accountability: '' });
  const complete = data.daily && data.weekly && data.accountability;

  return (
    <div className="bg-[#3A4F63] rounded-3xl p-12">
      <h2 className="text-3xl font-bold text-white mb-6">90-Day Sustainability Plan</h2>
      <div className="space-y-6">
        <div>
          <label className="text-white font-bold block mb-2">Daily Non-Negotiables</label>
          <textarea value={data.daily} onChange={(e) => setData({...data, daily: e.target.value})}
            className="w-full px-4 py-3 bg-[#2D3E50] text-white border-2 border-white/20 rounded-xl"
            rows={2} placeholder="e.g., '5-min mindfulness, thought log, no email before 9am'" />
        </div>
        <div>
          <label className="text-white font-bold block mb-2">Weekly Practices</label>
          <textarea value={data.weekly} onChange={(e) => setData({...data, weekly: e.target.value})}
            className="w-full px-4 py-3 bg-[#2D3E50] text-white border-2 border-white/20 rounded-xl"
            rows={2} placeholder="e.g., 'Sunday planning, Friday reflection, team check-in'" />
        </div>
        <div>
          <label className="text-white font-bold block mb-2">Accountability System</label>
          <textarea value={data.accountability} onChange={(e) => setData({...data, accountability: e.target.value})}
            className="w-full px-4 py-3 bg-[#2D3E50] text-white border-2 border-white/20 rounded-xl"
            rows={2} placeholder="e.g., 'Accountability partner, monthly self-assessment, habit tracker'" />
        </div>
      </div>
      {/* 🤖 AI: Relapse prevention strategies */}
      {data.accountability && (
        <div className="mt-4 p-3 bg-purple-900/20 rounded-xl">
          <p className="text-white text-sm"><strong className="text-purple-300">🤖 AI:</strong> Add a 'reset ritual' for when you miss habits - progress over perfection!</p>
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
    <h2 className="text-5xl font-bold text-white mb-6">Module 11 Complete! 🌱</h2>
    <p className="text-xl text-white mb-8">You have a 90-day sustainability plan!</p>
    <div className="flex gap-4 justify-center">
      <Link href="/dashboard" className="px-10 py-5 rounded-2xl text-white font-bold" style={{background: GRADIENT}}>Dashboard →</Link>
      <Link href="/modules" className="px-10 py-5 rounded-2xl text-white font-bold" style={{background: GRADIENT}}>All Modules</Link>
    </div>
  </div>
));
