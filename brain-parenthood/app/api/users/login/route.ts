import { NextResponse } from 'next/server';

// Simple in-memory user storage (in production, use a database)
const users = new Map<string, { id: number; email: string; password: string; name: string }>();

// Add a default test user
users.set('test@test.com', { id: 1, email: 'test@test.com', password: 'test', name: 'Test User' });

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { detail: 'Email and password are required' },
        { status: 400 }
      );
    }

    const user = users.get(email);

    if (!user || user.password !== password) {
      return NextResponse.json(
        { detail: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Generate a simple token (in production, use JWT)
    const token = Buffer.from(`${user.id}:${user.email}:${Date.now()}`).toString('base64');

    return NextResponse.json({
      access_token: token,
      token_type: "bearer",
      user: {
        id: user.id,
        email: user.email,
        name: user.name
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { detail: 'Internal server error' },
      { status: 500 }
    );
  }
}
