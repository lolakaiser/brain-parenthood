import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7);

    // Decode the simple token (in production, validate JWT)
    const decoded = Buffer.from(token, 'base64').toString('utf-8');
    const [id, email] = decoded.split(':');

    if (!id || !email) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }

    // Return user data (in production, fetch from database)
    return NextResponse.json({
      id: parseInt(id),
      email,
      name: email.split('@')[0] // Simple name extraction
    });
  } catch (error) {
    console.error('Auth error:', error);
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }
}
