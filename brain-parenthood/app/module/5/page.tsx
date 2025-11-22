"use client";
import Link from "next/link";
import { useState, useEffect, memo } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

const GRADIENT = 'linear-gradient(135deg, #9333ea 0%, #3b82f6 100%)';

export default function Module5() {
  const [step, setStep] = useState(0);
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => { if (!isAuthenticated) router.push('/login'); }, [isAuthenticated, router]);
  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen pt-32 bg-[#2D3E50] px-8">
      <div className="max-w-4xl mx-auto">
        <Link href="/modules" className="text-white hover:text-gray-300 mb-4 inline-block">← Back</Link>
        <h1 className="text-5xl font-bold text-white mb-2">Module 5: Team Dynamics</h1>
        <p className="text-xl text-white mb-8">Week 5 - Build Psychological Safety</p>

        <div className="flex gap-4 mb-8">
          {['Overview', 'Assess', 'Strategies', 'Complete'].map((s, i) => (
            <div key={i} className={`flex-1 h-2 rounded ${i <= step ? 'bg-purple-500' : 'bg-gray-600'}`} />
          ))}
        </div>

        {step === 0 && <Overview onNext={() => setStep(1)} />}
        {step === 1 && <Assessment onNext={() => setStep(2)} onBack={() => setStep(0)} />}
        {step === 2 && <Strategies onNext={() => setStep(3)} onBack={() => setStep(1)} />}
        {step === 3 && <Complete />}
      </div>
    </div>
  );
}

const Overview = memo(({ onNext }: { onNext: () => void }) => (
  <div className="bg-[#3A4F63] rounded-3xl p-12">
    <h2 className="text-4xl font-bold text-white mb-6">Team Dynamics & Psychological Safety</h2>
    {/* 🤖 AI: Team pattern analysis based on collective data */}
    <div className="mb-6 p-4 bg-purple-900/30 rounded-xl">
      <p className="text-white"><strong className="text-purple-300">🤖 AI:</strong> Your team shows strong trust but could improve conflict resolution</p>
    </div>
    <p className="text-xl text-white mb-6">Psychological safety allows team members to take risks, speak up, and innovate without fear.</p>
    <div className="grid md:grid-cols-2 gap-6 mb-8">
      <div className="bg-[#2D3E50] p-6 rounded-xl">
        <h3 className="font-bold text-white mb-3">Key Elements</h3>
        <ul className="text-white space-y-2">
          <li>• Trust & Respect</li>
          <li>• Open Communication</li>
          <li>• Healthy Conflict</li>
          <li>• Shared Goals</li>
        </ul>
      </div>
      <div className="bg-[#2D3E50] p-6 rounded-xl">
        <h3 className="font-bold text-white mb-3">This Week</h3>
        <ul className="text-white space-y-2">
          <li>• Assess team health</li>
          <li>• Learn collaboration strategies</li>
          <li>• Create team agreements</li>
        </ul>
      </div>
    </div>
    <button onClick={onNext} className="px-8 py-4 rounded-xl text-white font-bold" style={{background: GRADIENT}}>Assess Team →</button>
  </div>
));

const Assessment = memo(({ onNext, onBack }: { onNext: () => void; onBack: () => void }) => {
  const [scores, setScores] = useState({ trust: 5, communication: 5, conflict: 5, collaboration: 5 });

  return (
    <div className="bg-[#3A4F63] rounded-3xl p-12">
      <h2 className="text-3xl font-bold text-white mb-6">Team Health Assessment</h2>
      <p className="text-gray-300 mb-6">Rate your team on these dimensions (1-10)</p>
      {Object.entries(scores).map(([key, val]) => (
        <div key={key} className="mb-6 bg-[#2D3E50] p-4 rounded-xl">
          <label className="text-white font-bold block mb-2 capitalize">{key}: {val}/10</label>
          <input type="range" min="1" max="10" value={val} onChange={(e) => setScores({...scores, [key]: parseInt(e.target.value)})}
            className="w-full h-3 bg-white/20 rounded-lg cursor-pointer" />
        </div>
      ))}
      <div className="flex justify-between mt-8">
        <button onClick={onBack} className="px-8 py-4 rounded-xl text-white font-bold" style={{background: GRADIENT}}>← Back</button>
        <button onClick={onNext} className="px-8 py-4 rounded-xl text-white font-bold" style={{background: GRADIENT}}>Learn Strategies →</button>
      </div>
    </div>
  );
});

const Strategies = memo(({ onNext, onBack }: { onNext: () => void; onBack: () => void }) => {
  const [agreement, setAgreement] = useState('');

  return (
    <div className="bg-[#3A4F63] rounded-3xl p-12">
      <h2 className="text-3xl font-bold text-white mb-6">Collaboration Strategies</h2>
      <div className="space-y-4 mb-6">
        <div className="bg-[#2D3E50] p-4 rounded-xl">
          <h3 className="font-bold text-white mb-2">1. Active Listening</h3>
          <p className="text-gray-300">Listen to understand, not to respond. Paraphrase to confirm understanding.</p>
        </div>
        <div className="bg-[#2D3E50] p-4 rounded-xl">
          <h3 className="font-bold text-white mb-2">2. Constructive Feedback</h3>
          <p className="text-gray-300">Use SBI model: Situation, Behavior, Impact. Focus on growth.</p>
        </div>
        <div className="bg-[#2D3E50] p-4 rounded-xl">
          <h3 className="font-bold text-white mb-2">3. Inclusive Decision Making</h3>
          <p className="text-gray-300">Ensure all voices are heard. Use techniques like round-robin sharing.</p>
        </div>
      </div>
      <div className="mb-6">
        <label className="text-white font-bold block mb-2">Create a Team Agreement</label>
        <textarea value={agreement} onChange={(e) => setAgreement(e.target.value)}
          className="w-full px-4 py-3 bg-[#2D3E50] text-white border-2 border-white/20 rounded-xl"
          rows={4} placeholder="E.g., 'We commit to respectful communication, timely responses, and supporting each other...'" />
      </div>
      <div className="flex justify-between">
        <button onClick={onBack} className="px-8 py-4 rounded-xl text-white font-bold" style={{background: GRADIENT}}>← Back</button>
        <button onClick={onNext} disabled={!agreement} className={`px-8 py-4 rounded-xl text-white font-bold ${!agreement && 'opacity-50'}`}
          style={agreement ? {background: GRADIENT} : {}}>Complete →</button>
      </div>
    </div>
  );
});

const Complete = memo(() => (
  <div className="bg-[#3A4F63] rounded-3xl p-12 text-center">
    <h2 className="text-5xl font-bold text-white mb-6">Module 5 Complete! 🤝</h2>
    <p className="text-xl text-white mb-8">You're building a foundation for a high-performing team!</p>
    <div className="flex gap-4 justify-center">
      <Link href="/dashboard" className="px-10 py-5 rounded-2xl text-white font-bold" style={{background: GRADIENT}}>Dashboard →</Link>
      <Link href="/modules" className="px-10 py-5 rounded-2xl text-white font-bold" style={{background: GRADIENT}}>All Modules</Link>
    </div>
  </div>
));
