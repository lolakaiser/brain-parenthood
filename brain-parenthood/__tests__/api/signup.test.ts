/**
 * TC-U004 – Signup creates a new user account
 * TC-U005 – Signup rejects duplicate email
 * TC-U006 – Password strength validation (2-of-3 rule)
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';

// ── mocks ─────────────────────────────────────────────────────────────────────

vi.mock('next/server', () => ({
  NextResponse: {
    json: vi.fn((data: unknown, init?: { status?: number }) => ({
      status: init?.status ?? 200,
      json: async () => data,
    })),
  },
}));

vi.mock('@/lib/mongodb', () => ({
  connectDB: vi.fn().mockResolvedValue(undefined),
}));

vi.mock('@/lib/models/User', () => ({
  default: {
    findOne: vi.fn(),
    create: vi.fn(),
  },
}));

vi.mock('bcryptjs', () => ({
  default: {
    hash: vi.fn().mockResolvedValue('$2b$12$mockhash'),
    compare: vi.fn(),
  },
}));

// ── imports after mocks ───────────────────────────────────────────────────────

import { POST } from '@/app/api/users/signup/route';
import User from '@/lib/models/User';

// ── helpers ───────────────────────────────────────────────────────────────────

function makeRequest(body: object): Request {
  return { json: async () => body } as Request;
}

const validPayload = {
  email: 'newuser@example.com',
  password: 'Secure1!',
  name: 'New User',
  username: 'newuser',
};

const createdUser = {
  _id: '507f1f77bcf86cd799439022',
  email: 'newuser@example.com',
  name: 'New User',
  isAdmin: false,
};

// ── tests ─────────────────────────────────────────────────────────────────────

describe('POST /api/users/signup', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // TC-U004
  it('TC-U004: creates account and returns token for valid new user', async () => {
    vi.mocked(User.findOne).mockResolvedValue(null); // no existing email or username
    vi.mocked(User.create).mockResolvedValue(createdUser as never);

    const res = await POST(makeRequest(validPayload));

    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body).toHaveProperty('access_token');
    expect(body.user.email).toBe('newuser@example.com');
  });

  // TC-U005
  it('TC-U005: returns 409 when email already exists', async () => {
    // first findOne (email check) returns an existing user
    vi.mocked(User.findOne).mockResolvedValueOnce({ _id: 'existing' } as never);

    const res = await POST(makeRequest(validPayload));

    expect(res.status).toBe(409);
    const body = await res.json();
    expect(body.detail).toMatch(/already have an account/i);
  });

  it('TC-U005b: returns 409 when username is already taken', async () => {
    vi.mocked(User.findOne)
      .mockResolvedValueOnce(null)                       // email check → free
      .mockResolvedValueOnce({ _id: 'existing' } as never); // username check → taken

    const res = await POST(makeRequest(validPayload));

    expect(res.status).toBe(409);
    const body = await res.json();
    expect(body.detail).toMatch(/username is already taken/i);
  });

  // TC-U006 – password too short
  it('TC-U006a: rejects password shorter than 8 characters', async () => {
    const res = await POST(makeRequest({ ...validPayload, password: 'Ab1!' }));
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.detail).toMatch(/at least 8 characters/i);
  });

  // TC-U006 – only 1 of 3 criteria (just a number, no uppercase or special)
  it('TC-U006b: rejects password that meets fewer than 2 complexity criteria', async () => {
    const res = await POST(makeRequest({ ...validPayload, password: 'alllower1' }));
    // has number (1) but no uppercase and no special → criteriaMet = 1 < 2
    expect(res.status).toBe(400);
  });

  // TC-U006 – valid: uppercase + number (2 of 3)
  it('TC-U006c: accepts password with uppercase + number (2 of 3 criteria)', async () => {
    vi.mocked(User.findOne).mockResolvedValue(null);
    vi.mocked(User.create).mockResolvedValue(createdUser as never);

    const res = await POST(makeRequest({ ...validPayload, password: 'SecurePass1' }));
    expect(res.status).toBe(200);
  });

  // TC-U006 – valid: number + special (2 of 3)
  it('TC-U006d: accepts password with number + special char (2 of 3 criteria)', async () => {
    vi.mocked(User.findOne).mockResolvedValue(null);
    vi.mocked(User.create).mockResolvedValue(createdUser as never);

    const res = await POST(makeRequest({ ...validPayload, password: 'password1!' }));
    expect(res.status).toBe(200);
  });

  // invalid email format
  it('returns 400 for invalid email format', async () => {
    const res = await POST(makeRequest({ ...validPayload, email: 'notanemail' }));
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.detail).toMatch(/valid email/i);
  });

  // missing fields
  it('returns 400 when any required field is missing', async () => {
    const res = await POST(makeRequest({ email: 'a@b.com', password: 'Secure1!' }));
    expect(res.status).toBe(400);
  });
});
