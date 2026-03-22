/**
 * TC-U001 – Login with valid email and password
 * TC-U002 – Login rejects invalid password
 * TC-U003 – Login with username instead of email
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';

// ── mocks (must be before the route import) ───────────────────────────────────

vi.mock('next/server', () => ({
  NextResponse: {
    json: vi.fn((data: unknown, init?: { status?: number }) => ({
      status: init?.status ?? 200,
      json: async () => data,
      _body: data,
    })),
  },
}));

vi.mock('@/lib/mongodb', () => ({
  connectDB: vi.fn().mockResolvedValue(undefined),
}));

vi.mock('@/lib/models/User', () => ({
  default: {
    findOne: vi.fn(),
  },
}));

vi.mock('bcryptjs', () => ({
  default: {
    compare: vi.fn(),
    hash: vi.fn(),
  },
}));

// ── imports after mocks ───────────────────────────────────────────────────────

import { POST } from '@/app/api/users/login/route';
import User from '@/lib/models/User';
import bcrypt from 'bcryptjs';

// ── helpers ───────────────────────────────────────────────────────────────────

function makeRequest(body: object): Request {
  return { json: async () => body } as Request;
}

const mockUser = {
  _id: '507f1f77bcf86cd799439011',
  email: 'jane@example.com',
  name: 'Jane Doe',
  password: '$2b$12$hashedpassword',
  isAdmin: false,
};

// ── tests ─────────────────────────────────────────────────────────────────────

describe('POST /api/users/login', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // TC-U001
  it('TC-U001: returns 200 and a token when email and password are valid', async () => {
    vi.mocked(User.findOne).mockResolvedValue(mockUser);
    vi.mocked(bcrypt.compare).mockResolvedValue(true as never);

    const res = await POST(makeRequest({ email: 'jane@example.com', password: 'Correct1!' }));

    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body).toHaveProperty('access_token');
    expect(body).toHaveProperty('token_type', 'bearer');
    expect(body.user.email).toBe('jane@example.com');
  });

  // TC-U002
  it('TC-U002: returns 401 when password is incorrect', async () => {
    vi.mocked(User.findOne).mockResolvedValue(mockUser);
    vi.mocked(bcrypt.compare).mockResolvedValue(false as never);

    const res = await POST(makeRequest({ email: 'jane@example.com', password: 'WrongPass1!' }));

    expect(res.status).toBe(401);
    const body = await res.json();
    expect(body.detail).toBe('Invalid credentials');
  });

  // TC-U002 edge: unknown email
  it('TC-U002b: returns 401 when email does not exist', async () => {
    vi.mocked(User.findOne).mockResolvedValue(null);

    const res = await POST(makeRequest({ email: 'nobody@example.com', password: 'Any1pass!' }));

    expect(res.status).toBe(401);
    const body = await res.json();
    expect(body.detail).toBe('Invalid credentials');
  });

  // TC-U003
  it('TC-U003: accepts username (no @ sign) and authenticates successfully', async () => {
    vi.mocked(User.findOne).mockResolvedValue(mockUser);
    vi.mocked(bcrypt.compare).mockResolvedValue(true as never);

    const res = await POST(makeRequest({ email: 'janedoe', password: 'Correct1!' }));

    // findOne should have been called with { username: 'janedoe' } not email
    expect(vi.mocked(User.findOne)).toHaveBeenCalledWith({ username: 'janedoe' });
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body).toHaveProperty('access_token');
  });

  // missing fields
  it('returns 400 when email or password is missing', async () => {
    const res = await POST(makeRequest({ email: 'jane@example.com' }));
    expect(res.status).toBe(400);
  });
});
