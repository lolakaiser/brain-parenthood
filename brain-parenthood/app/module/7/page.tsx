"use client";
import Link from "next/link";
import { useState, useEffect, memo } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

const GRADIENT = 'linear-gradient(135deg, #9333ea 0%, #3b82f6 100%)';

export default function Module7() {
  const [step, setStep] = useState(0);
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => { if (!isAuthenticated) router.push('/login'); }, [isAuthenticated, router]);
  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen pt-32 bg-[#2D3E50] px-8">
      <div className="max-w-4xl mx-auto">
        <Link href="/modules" className="text-white hover:text-gray-300 mb-4 inline-block">← Back</Link>
        <h1 className="text-5xl font-bold text-white mb-2">Module 7: Communication Skills</h1>
        <p className="text-xl text-white mb-8">Week 7 - Master Active Listening</p>

        <div className="flex gap-4 mb-8">
          {['Overview', 'Learn', 'Practice', 'Complete'].map((s, i) => (
            <div key={i} className={`flex-1 h-2 rounded ${i <= step ? 'bg-purple-500' : 'bg-gray-600'}`} />
          ))}
        </div>

        {step === 0 && <Overview onNext={() => setStep(1)} />}
        {step === 1 && <Learning onNext={() => setStep(2)} onBack={() => setStep(0)} />}
        {step === 2 && <Practice onNext={() => setStep(3)} onBack={() => setStep(1)} />}
        {step === 3 && <Complete />}
      </div>
    </div>
  );
}

const Overview = memo(({ onNext }: { onNext: () => void }) => (
  <div className="bg-[#3A4F63] rounded-3xl p-12">
    <h2 className="text-4xl font-bold text-white mb-6">Communication Excellence</h2>
    {/* 🤖 AI: Communication style analysis */}
    <div className="mb-6 p-4 bg-purple-900/30 rounded-xl">
      <p className="text-white"><strong className="text-purple-300">🤖 AI:</strong> Your communication style is direct - practice more active listening</p>
    </div>
    <p className="text-xl text-white mb-6">Effective communication builds trust, resolves conflicts, and strengthens relationships.</p>
    <div className="grid md:grid-cols-2 gap-6 mb-8">
      <div className="bg-[#2D3E50] p-6 rounded-xl">
        <h3 className="font-bold text-white mb-3">Key Skills</h3>
        <ul className="text-white space-y-2">
          <li>• Active Listening</li>
          <li>• Nonverbal Awareness</li>
          <li>• Clear Expression</li>
          <li>• Constructive Feedback</li>
        </ul>
      </div>
      <div className="bg-[#2D3E50] p-6 rounded-xl">
        <h3 className="font-bold text-white mb-3">This Week</h3>
        <ul className="text-white space-y-2">
          <li>• Learn communication models</li>
          <li>• Practice active listening</li>
          <li>• Deliver feedback effectively</li>
        </ul>
      </div>
    </div>
    <button onClick={onNext} className="px-8 py-4 rounded-xl text-white font-bold" style={{background: GRADIENT}}>Learn Techniques →</button>
  </div>
));

const Learning = memo(({ onNext, onBack }: { onNext: () => void; onBack: () => void }) => (
  <div className="bg-[#3A4F63] rounded-3xl p-12">
    <h2 className="text-3xl font-bold text-white mb-6">Active Listening Techniques</h2>
    <div className="space-y-4 mb-8">
      <div className="bg-[#2D3E50] p-4 rounded-xl">
        <h3 className="font-bold text-white mb-2">1. Reflective Listening</h3>
        <p className="text-gray-300">Paraphrase what you heard: "So what I'm hearing is..."</p>
      </div>
      <div className="bg-[#2D3E50] p-4 rounded-xl">
        <h3 className="font-bold text-white mb-2">2. Ask Open Questions</h3>
        <p className="text-gray-300">Use "what" and "how" instead of "why" to explore deeper.</p>
      </div>
      <div className="bg-[#2D3E50] p-4 rounded-xl">
        <h3 className="font-bold text-white mb-2">3. Validate Emotions</h3>
        <p className="text-gray-300">"That sounds frustrating" - acknowledge their feelings.</p>
      </div>
      <div className="bg-[#2D3E50] p-4 rounded-xl">
        <h3 className="font-bold text-white mb-2">4. Nonverbal Cues</h3>
        <p className="text-gray-300">Eye contact, nodding, open posture show engagement.</p>
      </div>
    </div>
    <div className="flex justify-between">
      <button onClick={onBack} className="px-8 py-4 rounded-xl text-white font-bold" style={{background: GRADIENT}}>← Back</button>
      <button onClick={onNext} className="px-8 py-4 rounded-xl text-white font-bold" style={{background: GRADIENT}}>Practice →</button>
    </div>
  </div>
));

const Practice = memo(({ onNext, onBack }: { onNext: () => void; onBack: () => void }) => {
  const [data, setData] = useState({ situation: '', feedback: '', approach: '' });
  const complete = data.situation && data.feedback && data.approach;

  return (
    <div className="bg-[#3A4F63] rounded-3xl p-12">
      <h2 className="text-3xl font-bold text-white mb-6">Feedback Delivery Practice</h2>
      <p className="text-gray-300 mb-6">Use the SBI model: Situation, Behavior, Impact</p>
      <div className="space-y-6">
        <div>
          <label className="text-white font-bold block mb-2">Situation (When/where)</label>
          <input value={data.situation} onChange={(e) => setData({...data, situation: e.target.value})}
            className="w-full px-4 py-3 bg-[#2D3E50] text-white border-2 border-white/20 rounded-xl"
            placeholder="e.g., 'In yesterday's meeting...'" />
        </div>
        <div>
          <label className="text-white font-bold block mb-2">Behavior (What happened)</label>
          <textarea value={data.feedback} onChange={(e) => setData({...data, feedback: e.target.value})}
            className="w-full px-4 py-3 bg-[#2D3E50] text-white border-2 border-white/20 rounded-xl"
            rows={3} placeholder="Observable actions, not judgments..." />
        </div>
        <div>
          <label className="text-white font-bold block mb-2">Impact (The effect)</label>
          <textarea value={data.approach} onChange={(e) => setData({...data, approach: e.target.value})}
            className="w-full px-4 py-3 bg-[#2D3E50] text-white border-2 border-white/20 rounded-xl"
            rows={2} placeholder="How it affected you/the team..." />
        </div>
      </div>
      {/* 🤖 AI: Feedback improvement suggestions */}
      {data.feedback.length > 20 && (
        <div className="mt-4 p-3 bg-purple-900/20 rounded-xl">
          <p className="text-white text-sm"><strong className="text-purple-300">🤖 AI:</strong> Good! Make it more specific by adding the exact words used.</p>
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
    <h2 className="text-5xl font-bold text-white mb-6">Module 7 Complete! 🗣️</h2>
    <p className="text-xl text-white mb-8">You're mastering communication skills!</p>
    <div className="flex gap-4 justify-center">
      <Link href="/dashboard" className="px-10 py-5 rounded-2xl text-white font-bold" style={{background: GRADIENT}}>Dashboard →</Link>
      <Link href="/modules" className="px-10 py-5 rounded-2xl text-white font-bold" style={{background: GRADIENT}}>All Modules</Link>
    </div>
  </div>
));
