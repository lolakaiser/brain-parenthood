import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { connectDB } from '@/lib/mongodb';
import User from '@/lib/models/User';

export async function POST(request: Request) {
  try {
    const { email, password, name, username } = await request.json();

    if (!email || !password || !name || !username) {
      return NextResponse.json(
        { detail: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { detail: 'Please enter a valid email address' },
        { status: 400 }
      );
    }

    // Password validation: 8+ chars, 2 of 3: uppercase, number, special char
    const hasUpper = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[^A-Za-z0-9]/.test(password);
    const criteriaMet = [hasUpper, hasNumber, hasSpecial].filter(Boolean).length;
    if (password.length < 8 || criteriaMet < 2) {
      return NextResponse.json(
        { detail: 'Password must be at least 8 characters and meet 2 of 3 complexity requirements (uppercase letter, number, special character)' },
        { status: 400 }
      );
    }

    await connectDB();

    const existingEmail = await User.findOne({ email: email.toLowerCase() });
    if (existingEmail) {
      return NextResponse.json({ detail: 'It looks like you already have an account with this email. Please sign in instead.' }, { status: 409 });
    }

    const existingUsername = await User.findOne({ username: username.trim() });
    if (existingUsername) {
      return NextResponse.json({ detail: 'That username is already taken' }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await User.create({ email, password: hashedPassword, name, username: username.trim(), isAdmin: false });

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
