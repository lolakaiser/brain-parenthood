import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import User from '@/lib/models/User';

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ detail: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.substring(7);
    const decoded = Buffer.from(token, 'base64').toString('utf-8');
    const [, email] = decoded.split(':');

    if (!email) {
      return NextResponse.json({ detail: 'Invalid token' }, { status: 401 });
    }

    await connectDB();

    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return NextResponse.json({ detail: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({
      id: user._id.toString(),
      email: user.email,
      name: user.name,
      isAdmin: user.isAdmin,
    });
  } catch (error) {
    console.error('Auth error:', error);
    return NextResponse.json({ detail: 'Unauthorized' }, { status: 401 });
  }
}
