import { NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(request: Request) {
  try {
    const { type, userData } = await request.json();

    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json({ error: 'AI not configured' }, { status: 503 });
    }

    let prompt = '';

    if (type === 'dashboard') {
      const { assessment, goals, userName, completedModules } = userData;
      prompt = `You are a warm, direct resilience coach for early-stage startup founders.
A user named ${userName || 'this founder'} just completed Module 1 of Brain Parenthood, a 12-week resilience program.

Their baseline assessment scores (1-10):
- Team stress level: ${assessment?.teamStressLevel ?? 'N/A'}
- Personal stress level: ${assessment?.individualStressLevel ?? 'N/A'}
- Team productivity: ${assessment?.productivity ?? 'N/A'}
- Team communication: ${assessment?.communication ?? 'N/A'}
- Work-life balance: ${assessment?.workLifeBalance ?? 'N/A'}
- Team size: ${assessment?.teamSize ?? 'N/A'}
- Primary challenges: ${assessment?.primaryChallenges ?? 'N/A'}

Their goals for the 12 weeks:
- Stress reduction: ${goals?.stressReduction ?? 'N/A'}
- Productivity goal: ${goals?.productivityGoal ?? 'N/A'}
- Communication goal: ${goals?.communicationGoal ?? 'N/A'}
- Personal goal: ${goals?.personalGoal ?? 'N/A'}
- Team goal: ${goals?.teamGoal ?? 'N/A'}
- Success metrics: ${goals?.successMetrics ?? 'N/A'}

They have completed ${completedModules?.length ?? 0} of 12 modules.

Write a short, personalized insight (3-4 sentences max) for their dashboard.
- Reference their specific numbers or challenges — make it feel personal, not generic
- Highlight their #1 priority area based on their scores
- Be encouraging but honest
- Do NOT use bullet points, headers, or markdown — just plain flowing text
- Do NOT start with "Great job" or similar generic openers`;
    }

    if (type === 'module_intro') {
      const { moduleId, moduleName, assessment, goals, userName } = userData;
      prompt = `You are a resilience coach for startup founders using the Brain Parenthood program.

User: ${userName || 'this founder'}
About to start: Module ${moduleId} — ${moduleName}

Their baseline scores (1-10):
- Team stress: ${assessment?.teamStressLevel ?? 'N/A'}
- Personal stress: ${assessment?.individualStressLevel ?? 'N/A'}
- Productivity: ${assessment?.productivity ?? 'N/A'}
- Communication: ${assessment?.communication ?? 'N/A'}
- Work-life balance: ${assessment?.workLifeBalance ?? 'N/A'}
- Challenges: ${assessment?.primaryChallenges ?? 'N/A'}

Their goals: ${goals?.personalGoal ?? ''} / ${goals?.teamGoal ?? ''}

Write 2 sentences personalizing why THIS module matters specifically for them based on their scores and challenges. Be concrete, not generic. No markdown, no headers, plain text only.`;
    }

    if (type === 'module_complete') {
      const { moduleId, moduleName, answers, userName } = userData;
      const answerSummary = answers
        ? Object.entries(answers)
            .filter(([k]) => k !== '_labeled')
            .map(([k, v]) => `${k}: ${v}`)
            .join(', ')
        : 'N/A';

      prompt = `You are a resilience coach for startup founders.

${userName || 'This founder'} just completed Module ${moduleId} — ${moduleName}.

Their responses this module: ${answerSummary}

Write a 2-3 sentence personalized completion message that:
- References something specific from their answers
- Gives one concrete next step or thing to watch for this week
- Is warm but not over the top
Plain text only, no markdown, no bullet points.`;
    }

    if (!prompt) {
      return NextResponse.json({ error: 'Unknown insight type' }, { status: 400 });
    }

    const message = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 256,
      messages: [{ role: 'user', content: prompt }],
    });

    const text = message.content[0].type === 'text' ? message.content[0].text : '';

    return NextResponse.json({ insight: text });
  } catch (error) {
    console.error('AI insight error:', error);
    return NextResponse.json({ error: 'Failed to generate insight' }, { status: 500 });
  }
}
