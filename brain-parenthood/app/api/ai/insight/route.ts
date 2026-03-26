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
      const { assessment, goals, userName, completedModules, moduleHistory } = userData;
      const modulesCount = completedModules?.length ?? 0;

      // Build a brief summary of completed module goals if available
      let moduleSummary = '';
      if (moduleHistory && Object.keys(moduleHistory).length > 0) {
        moduleSummary = '\n\nWhat they\'ve worked on in completed modules:\n' +
          Object.entries(moduleHistory as Record<string, Record<string, string>>)
            .map(([id, data]) => `- Module ${id}: ${Object.values(data).filter(Boolean).slice(0, 2).join('; ')}`)
            .join('\n');
      }

      prompt = `You are a warm, direct resilience coach for early-stage startup founders.
${userName || 'This founder'} is on their Brain Parenthood resilience journey — they have completed ${modulesCount} of 12 modules.

Their baseline assessment scores (1-10):
- Team stress level: ${assessment?.teamStressLevel ?? 'N/A'}
- Personal stress level: ${assessment?.individualStressLevel ?? 'N/A'}
- Team productivity: ${assessment?.productivity ?? 'N/A'}
- Team communication: ${assessment?.communication ?? 'N/A'}
- Work-life balance: ${assessment?.workLifeBalance ?? 'N/A'}
- Primary challenges: ${assessment?.primaryChallenges ?? 'N/A'}

Their 12-week goals:
- Stress reduction: ${goals?.stressReduction ?? 'N/A'}
- Personal goal: ${goals?.personalGoal ?? 'N/A'}
- Team goal: ${goals?.teamGoal ?? 'N/A'}
- Success metrics: ${goals?.successMetrics ?? 'N/A'}${moduleSummary}

Write a short, personalized insight (3-4 sentences) for their dashboard that reflects where they are RIGHT NOW in their journey.
- If they've completed multiple modules, acknowledge their progress and point to what's ahead
- Reference their specific scores or challenges — make it feel personal
- Give one concrete focus or action for this week based on their data
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
      const { moduleId, moduleName, answers, userName, baseline, userGoals, priorModuleGoals } = userData;

      // Format current module answers (skip internal fields)
      const answerSummary = answers
        ? (answers._labeled as Array<{title: string; answer: string | number}>)
            ?.map((item: {title: string; answer: string | number}) => `${item.title}: ${item.answer}`)
            .join('\n') ||
          Object.entries(answers as Record<string, unknown>)
            .filter(([k]) => !['_labeled', 'savedAt'].includes(k))
            .map(([k, v]) => `${k}: ${v}`)
            .join('\n')
        : 'N/A';

      // Build prior modules context
      let priorContext = '';
      if (priorModuleGoals && Object.keys(priorModuleGoals).length > 0) {
        priorContext = '\n\nWhat they committed to in prior modules:\n' +
          Object.entries(priorModuleGoals as Record<string, Record<string, unknown>>)
            .map(([id, goals]) => {
              const labeled = (goals as Record<string, unknown>)._labeled as Array<{title: string; answer: string}> | undefined;
              const summary = labeled
                ? labeled.map(l => l.answer).filter(Boolean).slice(0, 2).join('; ')
                : Object.values(goals).filter(v => typeof v === 'string' && v.length > 0).slice(0, 2).join('; ');
              return `- Module ${id}: ${summary}`;
            })
            .join('\n');
      }

      const baselineContext = baseline
        ? `\nBaseline scores: stress ${baseline.teamStressLevel ?? 'N/A'}/10, productivity ${baseline.productivity ?? 'N/A'}/10, communication ${baseline.communication ?? 'N/A'}/10`
        : '';

      prompt = `You are a resilience coach for startup founders.

${userName || 'This founder'} just completed Module ${moduleId} — ${moduleName}.${baselineContext}${priorContext}

Their responses this module:
${answerSummary}

Write a 2-3 sentence personalized completion message that:
- References something specific from their answers in this module
- If they have prior module history, acknowledge their progress and connect it to what they've been building
- Gives one concrete next step to apply this week
- Is warm but not over the top
Plain text only, no markdown, no bullet points.`;
    }

    if (!prompt) {
      return NextResponse.json({ error: 'Unknown insight type' }, { status: 400 });
    }

    const message = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 300,
      messages: [{ role: 'user', content: prompt }],
    });

    const text = message.content[0].type === 'text' ? message.content[0].text : '';

    return NextResponse.json({ insight: text });
  } catch (error) {
    console.error('AI insight error:', error);
    return NextResponse.json({ error: 'Failed to generate insight' }, { status: 500 });
  }
}
