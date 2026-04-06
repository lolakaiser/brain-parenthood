import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import User from '@/lib/models/User';
import { getEmailFromToken } from '@/lib/auth';

export async function GET(request: Request) {
  try {
    const email = getEmailFromToken(request.headers.get('Authorization'));
    if (!email) return NextResponse.json({ detail: 'Unauthorized' }, { status: 401 });

    await connectDB();
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) return NextResponse.json({ detail: 'User not found' }, { status: 404 });

    const insights: Record<string, { insight: string; savedAt: Date }> = {};
    user.aiInsights?.forEach((value, key) => {
      insights[key] = { insight: value.insight, savedAt: value.savedAt };
    });

    return NextResponse.json({ insights });
  } catch (error) {
    console.error('AI insights GET error:', error);
    return NextResponse.json({ detail: 'Server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const email = getEmailFromToken(request.headers.get('Authorization'));
    if (!email) return NextResponse.json({ detail: 'Unauthorized' }, { status: 401 });

    const { moduleId, insight } = await request.json();
    if (!moduleId || !insight) {
      return NextResponse.json({ detail: 'Missing moduleId or insight' }, { status: 400 });
    }

    await connectDB();
    const key = `module_${moduleId}`;
    await User.findOneAndUpdate(
      { email: email.toLowerCase() },
      {
        $set: {
          [`aiInsights.${key}.insight`]: insight,
          [`aiInsights.${key}.savedAt`]: new Date(),
        },
      }
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('AI insights POST error:', error);
    return NextResponse.json({ detail: 'Server error' }, { status: 500 });
  }
}
