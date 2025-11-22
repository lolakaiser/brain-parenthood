"use client";
import Link from "next/link";
import { useState, useEffect, memo } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

const GRADIENT = 'linear-gradient(135deg, #9333ea 0%, #3b82f6 100%)';

export default function Module10() {
  const [step, setStep] = useState(0);
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => { if (!isAuthenticated) router.push('/login'); }, [isAuthenticated, router]);
  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen pt-32 bg-[#2D3E50] px-8">
      <div className="max-w-4xl mx-auto">
        <Link href="/modules" className="text-white hover:text-gray-300 mb-4 inline-block">← Back</Link>
        <h1 className="text-5xl font-bold text-white mb-2">Module 10: Performance Optimization</h1>
        <p className="text-xl text-white mb-8">Week 10 - Achieve Peak States</p>

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
    <h2 className="text-4xl font-bold text-white mb-6">Peak Performance States</h2>
    {/* 🤖 AI: Flow state prediction */}
    <div className="mb-6 p-4 bg-purple-900/30 rounded-xl">
      <p className="text-white"><strong className="text-purple-300">🤖 AI:</strong> You enter flow during coding - replicate those conditions</p>
    </div>
    <p className="text-xl text-white mb-6">Flow is the optimal state where challenge meets skill. Learn to access it on demand.</p>
    <div className="grid md:grid-cols-2 gap-6 mb-8">
      <div className="bg-[#2D3E50] p-6 rounded-xl">
        <h3 className="font-bold text-white mb-3">Flow Conditions</h3>
        <ul className="text-white space-y-2">
          <li>• Clear goals</li>
          <li>• Immediate feedback</li>
          <li>• Challenge-skill balance</li>
          <li>• Deep focus</li>
        </ul>
      </div>
      <div className="bg-[#2D3E50] p-6 rounded-xl">
        <h3 className="font-bold text-white mb-3">This Week</h3>
        <ul className="text-white space-y-2">
          <li>• Identify flow triggers</li>
          <li>• Design performance rituals</li>
          <li>• Create optimization system</li>
        </ul>
      </div>
    </div>
    <button onClick={onNext} className="px-8 py-4 rounded-xl text-white font-bold" style={{background: GRADIENT}}>Find Your Triggers →</button>
  </div>
));

const Assessment = memo(({ onNext, onBack }: { onNext: () => void; onBack: () => void }) => {
  const [triggers, setTriggers] = useState<string[]>([]);
  const options = [
    'Music/Silence',
    'Morning Hours',
    'Deadline Pressure',
    'Solitude',
    'Collaboration',
    'Novel Challenges',
    'Routine Tasks',
    'Physical Activity',
  ];

  const toggle = (item: string) => {
    setTriggers(prev => prev.includes(item) ? prev.filter(t => t !== item) : [...prev, item]);
  };

  return (
    <div className="bg-[#3A4F63] rounded-3xl p-12">
      <h2 className="text-3xl font-bold text-white mb-6">Your Flow Triggers</h2>
      <p className="text-gray-300 mb-6">Select conditions that help you enter flow states</p>
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
      {/* 🤖 AI: Performance pattern analysis */}
      {triggers.length > 0 && (
        <div className="p-4 bg-purple-900/20 rounded-xl mb-6">
          <p className="text-white text-sm"><strong className="text-purple-300">🤖 AI:</strong> Your triggers suggest you're an environmental optimizer - design your workspace</p>
        </div>
      )}
      <div className="flex justify-between">
        <button onClick={onBack} className="px-8 py-4 rounded-xl text-white font-bold" style={{background: GRADIENT}}>← Back</button>
        <button onClick={onNext} disabled={triggers.length === 0} className={`px-8 py-4 rounded-xl text-white font-bold ${triggers.length === 0 && 'opacity-50'}`}
          style={triggers.length > 0 ? {background: GRADIENT} : {}}>Design Rituals →</button>
      </div>
    </div>
  );
});

const Design = memo(({ onNext, onBack }: { onNext: () => void; onBack: () => void }) => {
  const [data, setData] = useState({ morning: '', preWork: '', recovery: '' });
  const complete = data.morning && data.preWork && data.recovery;

  return (
    <div className="bg-[#3A4F63] rounded-3xl p-12">
      <h2 className="text-3xl font-bold text-white mb-6">Performance Rituals</h2>
      <p className="text-gray-300 mb-6">Design rituals to consistently access peak states</p>
      <div className="space-y-6">
        <div>
          <label className="text-white font-bold block mb-2">Morning Activation Ritual</label>
          <textarea value={data.morning} onChange={(e) => setData({...data, morning: e.target.value})}
            className="w-full px-4 py-3 bg-[#2D3E50] text-white border-2 border-white/20 rounded-xl"
            rows={2} placeholder="e.g., 'Cold shower, coffee, review goals'" />
        </div>
        <div>
          <label className="text-white font-bold block mb-2">Pre-Work Focus Ritual</label>
          <textarea value={data.preWork} onChange={(e) => setData({...data, preWork: e.target.value})}
            className="w-full px-4 py-3 bg-[#2D3E50] text-white border-2 border-white/20 rounded-xl"
            rows={2} placeholder="e.g., '5-min breathing, block distractions, timer on'" />
        </div>
        <div>
          <label className="text-white font-bold block mb-2">Recovery Ritual (between sessions)</label>
          <textarea value={data.recovery} onChange={(e) => setData({...data, recovery: e.target.value})}
            className="w-full px-4 py-3 bg-[#2D3E50] text-white border-2 border-white/20 rounded-xl"
            rows={2} placeholder="e.g., '10-min walk, hydrate, stretch'" />
        </div>
      </div>
      {/* 🤖 AI: Ritual customization */}
      {data.preWork && (
        <div className="mt-4 p-3 bg-purple-900/20 rounded-xl">
          <p className="text-white text-sm"><strong className="text-purple-300">🤖 AI:</strong> Great! Add a specific cue (e.g., playlist) to anchor this ritual</p>
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
    <h2 className="text-5xl font-bold text-white mb-6">Module 10 Complete! 🚀</h2>
    <p className="text-xl text-white mb-8">You have a performance optimization system!</p>
    <div className="flex gap-4 justify-center">
      <Link href="/dashboard" className="px-10 py-5 rounded-2xl text-white font-bold" style={{background: GRADIENT}}>Dashboard →</Link>
      <Link href="/modules" className="px-10 py-5 rounded-2xl text-white font-bold" style={{background: GRADIENT}}>All Modules</Link>
    </div>
  </div>
));
