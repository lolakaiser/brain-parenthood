import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import User from '@/lib/models/User';
import { getEmailFromToken } from '@/lib/auth';

export async function GET(request: Request) {
  try {
    const email = getEmailFromToken(request.headers.get('Authorization'));
    if (!email) return NextResponse.json({ detail: 'Unauthorized' }, { status: 401 });

    const url = new URL(request.url);
    const moduleId = url.searchParams.get('moduleId');
    const step = url.searchParams.get('step');

    if (!moduleId || !step) {
      return NextResponse.json({ detail: 'Missing moduleId or step' }, { status: 400 });
    }

    await connectDB();
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) return NextResponse.json({ detail: 'User not found' }, { status: 404 });

    const moduleData = user.moduleAnswers?.get(moduleId);
    const answers = moduleData?.[step as 'assessment' | 'goals'] ?? null;

    return NextResponse.json({ answers });
  } catch (error) {
    console.error('Answers GET error:', error);
    return NextResponse.json({ detail: 'Server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const email = getEmailFromToken(request.headers.get('Authorization'));
    if (!email) return NextResponse.json({ detail: 'Unauthorized' }, { status: 401 });

    const body = await request.json();
    const { moduleId, step, answers } = body;

    if (!moduleId || !step || !answers) {
      return NextResponse.json({ detail: 'Missing required fields' }, { status: 400 });
    }

    await connectDB();

    const user = await User.findOneAndUpdate(
      { email: email.toLowerCase() },
      {
        $set: {
          [`moduleAnswers.${moduleId}.${step}`]: answers,
          [`moduleAnswers.${moduleId}.savedAt`]: new Date(),
        },
      },
      { new: true }
    );

    if (!user) return NextResponse.json({ detail: 'User not found' }, { status: 404 });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Answers POST error:', error);
    return NextResponse.json({ detail: 'Server error' }, { status: 500 });
  }
}
