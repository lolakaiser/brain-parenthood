import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { connectDB } from '@/lib/mongodb';
import User from '@/lib/models/User';

export async function POST(request: Request) {
  try {
    const { token, password } = await request.json();
    if (!token || !password) {
      return NextResponse.json({ detail: 'Token and password are required' }, { status: 400 });
    }

    // Password validation: 8+ chars, 2 of 3: uppercase, number, special char
    const hasUpper = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[^A-Za-z0-9]/.test(password);
    const criteriaMet = [hasUpper, hasNumber, hasSpecial].filter(Boolean).length;
    if (password.length < 8 || criteriaMet < 2) {
      return NextResponse.json(
        { detail: 'Password must be at least 8 characters and meet 2 of 3 complexity requirements' },
        { status: 400 }
      );
    }

    await connectDB();
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpiry: { $gt: new Date() },
    });

    if (!user) {
      return NextResponse.json(
        { detail: 'This reset link is invalid or has expired. Please request a new one.' },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    await User.findByIdAndUpdate(user._id, {
      password: hashedPassword,
      $unset: { resetPasswordToken: '', resetPasswordExpiry: '' },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Reset password error:', error);
    return NextResponse.json({ detail: 'Server error' }, { status: 500 });
  }
}
