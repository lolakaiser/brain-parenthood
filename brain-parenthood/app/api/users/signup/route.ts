import { NextResponse } from 'next/server';

// Simple in-memory user storage (in production, use a database)
// Note: This will reset on server restart - for demo purposes only
const users = new Map<string, { id: number; email: string; password: string; name: string }>();
let nextId = 2;

// Add a default test user
users.set('test@test.com', { id: 1, email: 'test@test.com', password: 'test', name: 'Test User' });

export async function POST(request: Request) {
  try {
    const { email, password, name } = await request.json();

    if (!email || !password || !name) {
      return NextResponse.json(
        { detail: 'Email, password, and name are required' },
        { status: 400 }
      );
    }

    if (users.has(email)) {
      return NextResponse.json(
        { detail: 'User already exists' },
        { status: 409 }
      );
    }

    const newUser = {
      id: nextId++,
      email,
      password, // In production, hash this!
      name
    };

    users.set(email, newUser);

    // Generate a simple token (in production, use JWT)
    const token = Buffer.from(`${newUser.id}:${newUser.email}:${Date.now()}`).toString('base64');

    return NextResponse.json({
      access_token: token,
      token_type: "bearer",
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name
      }
    });
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { detail: 'Internal server error' },
      { status: 500 }
    );
  }
}
