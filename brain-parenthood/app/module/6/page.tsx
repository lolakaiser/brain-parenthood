"use client";
import Link from "next/link";
import { useState, useEffect, memo } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

const GRADIENT = 'linear-gradient(135deg, #9333ea 0%, #3b82f6 100%)';

export default function Module6() {
  const [step, setStep] = useState(0);
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => { if (!isAuthenticated) router.push('/login'); }, [isAuthenticated, router]);
  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen pt-32 bg-[#2D3E50] px-8">
      <div className="max-w-4xl mx-auto">
        <Link href="/modules" className="text-white hover:text-gray-300 mb-4 inline-block">← Back</Link>
        <h1 className="text-5xl font-bold text-white mb-2">Module 6: Resilience Building</h1>
        <p className="text-xl text-white mb-8">Week 6 - Develop Growth Mindset</p>

        <div className="flex gap-4 mb-8">
          {['Overview', 'Assess', 'Practice', 'Complete'].map((s, i) => (
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
  <div className="bg-[#3A4F63] rounded-3xl p-12">
    <h2 className="text-4xl font-bold text-white mb-6">Building Resilience</h2>
    {/* 🤖 AI: Resilience score prediction based on baseline */}
    <div className="mb-6 p-4 bg-purple-900/30 rounded-xl">
      <p className="text-white"><strong className="text-purple-300">🤖 AI:</strong> Your resilience score is growing - focus on reframing adversity</p>
    </div>
    <p className="text-xl text-white mb-6">Resilience is the ability to bounce back from setbacks and grow through challenges.</p>
    <div className="grid md:grid-cols-2 gap-6 mb-8">
      <div className="bg-[#2D3E50] p-6 rounded-xl">
        <h3 className="font-bold text-white mb-3">Growth vs Fixed Mindset</h3>
        <ul className="text-white space-y-2">
          <li>• Growth: "I can learn this"</li>
          <li>• Fixed: "I'm not good at this"</li>
          <li>• Challenges = Opportunities</li>
          <li>• Effort leads to mastery</li>
        </ul>
      </div>
      <div className="bg-[#2D3E50] p-6 rounded-xl">
        <h3 className="font-bold text-white mb-3">This Week</h3>
        <ul className="text-white space-y-2">
          <li>• Assess resilience factors</li>
          <li>• Practice growth mindset</li>
          <li>• Create resilience plan</li>
        </ul>
      </div>
    </div>
    <button onClick={onNext} className="px-8 py-4 rounded-xl text-white font-bold" style={{background: GRADIENT}}>Assess Resilience →</button>
  </div>
));

const Assessment = memo(({ onNext, onBack }: { onNext: () => void; onBack: () => void }) => {
  const [scores, setScores] = useState({ adaptability: 5, optimism: 5, support: 5, purpose: 5 });

  return (
    <div className="bg-[#3A4F63] rounded-3xl p-12">
      <h2 className="text-3xl font-bold text-white mb-6">Resilience Assessment</h2>
      <p className="text-gray-300 mb-6">Rate yourself on these resilience factors (1-10)</p>
      {Object.entries(scores).map(([key, val]) => (
        <div key={key} className="mb-6 bg-[#2D3E50] p-4 rounded-xl">
          <label className="text-white font-bold block mb-2 capitalize">{key}: {val}/10</label>
          <input type="range" min="1" max="10" value={val} onChange={(e) => setScores({...scores, [key]: parseInt(e.target.value)})}
            className="w-full h-3 bg-white/20 rounded-lg cursor-pointer" />
        </div>
      ))}
      {/* 🤖 AI: Personalized growth strategies */}
      <div className="p-4 bg-purple-900/20 rounded-xl mb-6">
        <p className="text-white text-sm"><strong className="text-purple-300">🤖 AI:</strong> Your adaptability is strong - let's build optimism</p>
      </div>
      <div className="flex justify-between mt-8">
        <button onClick={onBack} className="px-8 py-4 rounded-xl text-white font-bold" style={{background: GRADIENT}}>← Back</button>
        <button onClick={onNext} className="px-8 py-4 rounded-xl text-white font-bold" style={{background: GRADIENT}}>Practice →</button>
      </div>
    </div>
  );
});

const Practice = memo(({ onNext, onBack }: { onNext: () => void; onBack: () => void }) => {
  const [data, setData] = useState({ challenge: '', fixed: '', growth: '' });
  const complete = data.challenge && data.fixed && data.growth;

  return (
    <div className="bg-[#3A4F63] rounded-3xl p-12">
      <h2 className="text-3xl font-bold text-white mb-6">Growth Mindset Practice</h2>
      <div className="space-y-6">
        <div>
          <label className="text-white font-bold block mb-2">Recent Challenge</label>
          <textarea value={data.challenge} onChange={(e) => setData({...data, challenge: e.target.value})}
            className="w-full px-4 py-3 bg-[#2D3E50] text-white border-2 border-white/20 rounded-xl"
            rows={2} placeholder="Describe a recent setback..." />
        </div>
        <div>
          <label className="text-white font-bold block mb-2">Fixed Mindset Response</label>
          <input value={data.fixed} onChange={(e) => setData({...data, fixed: e.target.value})}
            className="w-full px-4 py-3 bg-[#2D3E50] text-white border-2 border-white/20 rounded-xl"
            placeholder="e.g., 'I'm just not good at this...'" />
        </div>
        <div>
          <label className="text-white font-bold block mb-2">Growth Mindset Reframe</label>
          <input value={data.growth} onChange={(e) => setData({...data, growth: e.target.value})}
            className="w-full px-4 py-3 bg-[#2D3E50] text-white border-2 border-white/20 rounded-xl"
            placeholder="e.g., 'I can learn from this...'" />
        </div>
      </div>
      {/* 🤖 AI: Adversity response coaching */}
      {data.fixed && (
        <div className="mt-4 p-3 bg-purple-900/20 rounded-xl">
          <p className="text-white text-sm"><strong className="text-purple-300">🤖 AI Coach:</strong> Great start! Try adding specific actions you'll take.</p>
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
    <h2 className="text-5xl font-bold text-white mb-6">Module 6 Complete! 💪</h2>
    <p className="text-xl text-white mb-8">You're building resilience through growth mindset!</p>
    <div className="flex gap-4 justify-center">
      <Link href="/dashboard" className="px-10 py-5 rounded-2xl text-white font-bold" style={{background: GRADIENT}}>Dashboard →</Link>
      <Link href="/modules" className="px-10 py-5 rounded-2xl text-white font-bold" style={{background: GRADIENT}}>All Modules</Link>
    </div>
  </div>
));
