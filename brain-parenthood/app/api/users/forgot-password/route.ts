import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { Resend } from 'resend';
import { connectDB } from '@/lib/mongodb';
import User from '@/lib/models/User';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    if (!email) return NextResponse.json({ detail: 'Email is required' }, { status: 400 });

    await connectDB();
    const user = await User.findOne({ email: email.toLowerCase() });

    // Always return success even if email not found (prevents account enumeration)
    if (!user) {
      return NextResponse.json({ success: true });
    }

    // Generate a secure random token valid for 1 hour
    const token = crypto.randomBytes(32).toString('hex');
    const expiry = new Date(Date.now() + 60 * 60 * 1000);

    await User.findByIdAndUpdate(user._id, {
      resetPasswordToken: token,
      resetPasswordExpiry: expiry,
    });

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const resetLink = `${appUrl}/reset-password?token=${token}`;

    await resend.emails.send({
      from: 'Brain Parenthood <onboarding@resend.dev>',
      to: user.email,
      subject: 'Reset your password',
      html: `
        <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; padding: 40px 24px;">
          <h2 style="color: #111827; margin-bottom: 8px;">Reset your password</h2>
          <p style="color: #6B7280; margin-bottom: 24px;">
            Hi ${user.name}, we received a request to reset your Brain Parenthood password.
            Click the button below to choose a new one. This link expires in 1 hour.
          </p>
          <a href="${resetLink}" style="
            display: inline-block;
            padding: 12px 24px;
            background: linear-gradient(to right, #a78bfa, #818cf8);
            color: white;
            text-decoration: none;
            border-radius: 8px;
            font-weight: 500;
            margin-bottom: 24px;
          ">Reset Password</a>
          <p style="color: #9CA3AF; font-size: 13px;">
            If you didn't request this, you can safely ignore this email.
            Your password won't change until you click the link above.
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Forgot password error:', error);
    return NextResponse.json({ detail: 'Server error' }, { status: 500 });
  }
}
