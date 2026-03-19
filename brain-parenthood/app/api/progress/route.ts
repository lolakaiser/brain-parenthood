import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import User from '@/lib/models/User';

function getEmailFromToken(authHeader: string | null): string | null {
  if (!authHeader || !authHeader.startsWith('Bearer ')) return null;
  const token = authHeader.substring(7);
  const decoded = Buffer.from(token, 'base64').toString('utf-8');
  const [, email] = decoded.split(':');
  return email || null;
}

export async function GET(request: Request) {
  try {
    const email = getEmailFromToken(request.headers.get('Authorization'));
    if (!email) return NextResponse.json({ detail: 'Unauthorized' }, { status: 401 });

    await connectDB();
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) return NextResponse.json({ detail: 'User not found' }, { status: 404 });

    return NextResponse.json({
      completedModules: user.moduleProgress?.completedModules || [],
      currentModule: user.moduleProgress?.currentModule || 1,
      lastActivity: user.moduleProgress?.lastActivity || null,
    });
  } catch (error) {
    console.error('Progress GET error:', error);
    return NextResponse.json({ detail: 'Server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const email = getEmailFromToken(request.headers.get('Authorization'));
    if (!email) return NextResponse.json({ detail: 'Unauthorized' }, { status: 401 });

    const body = await request.json();
    const { completedModules, currentModule } = body;

    await connectDB();
    const user = await User.findOneAndUpdate(
      { email: email.toLowerCase() },
      {
        $set: {
          'moduleProgress.completedModules': completedModules,
          'moduleProgress.currentModule': currentModule,
          'moduleProgress.lastActivity': new Date(),
        },
      },
      { new: true }
    );
    if (!user) return NextResponse.json({ detail: 'User not found' }, { status: 404 });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Progress POST error:', error);
    return NextResponse.json({ detail: 'Server error' }, { status: 500 });
  }
}
