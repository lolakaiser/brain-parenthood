import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import User from '@/lib/models/User';

export async function POST(request: Request) {
  try {
    const { email, password, name } = await request.json();

    if (!email || !password || !name) {
      return NextResponse.json(
        { detail: 'Email, password, and name are required' },
        { status: 400 }
      );
    }

    await connectDB();

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return NextResponse.json(
        { detail: 'User already exists' },
        { status: 409 }
      );
    }

    const newUser = await User.create({ email, password, name, isAdmin: false });

    const token = Buffer.from(`${newUser._id}:${newUser.email}:${Date.now()}`).toString('base64');

    return NextResponse.json({
      access_token: token,
      token_type: 'bearer',
      user: {
        id: newUser._id.toString(),
        email: newUser.email,
        name: newUser.name,
        isAdmin: newUser.isAdmin,
      },
    });
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json({ detail: 'Internal server error' }, { status: 500 });
  }
}
