/**
 * TC-U007 – Forgot-password sends reset email (or silently succeeds for unknown email)
 * TC-U008 – Reset password with a valid token succeeds
 * TC-U009 – Reset password with an expired/invalid token is rejected
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
    findByIdAndUpdate: vi.fn().mockResolvedValue({}),
  },
}));

vi.mock('bcryptjs', () => ({
  default: {
    hash: vi.fn().mockResolvedValue('$2b$12$mockhash'),
    compare: vi.fn(),
  },
}));

vi.mock('resend', () => ({
  Resend: class {
    emails = {
      send: vi.fn().mockResolvedValue({ data: { id: 'mock-email-id' }, error: null }),
    };
  },
}));

// ── imports after mocks ───────────────────────────────────────────────────────

import { POST as forgotPassword } from '@/app/api/users/forgot-password/route';
import { POST as resetPassword } from '@/app/api/users/reset-password/route';
import User from '@/lib/models/User';

// ── helpers ───────────────────────────────────────────────────────────────────

function makeRequest(body: object): Request {
  return { json: async () => body } as Request;
}

const registeredUser = {
  _id: '507f1f77bcf86cd799439033',
  email: 'jane@example.com',
  name: 'Jane Doe',
  password: '$2b$12$hashedpassword',
};

// ── forgot-password tests ─────────────────────────────────────────────────────

describe('POST /api/users/forgot-password', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.NEXT_PUBLIC_APP_URL = 'http://localhost:3000';
  });

  // TC-U007: registered email triggers token generation and email dispatch
  it('TC-U007a: returns 200 and sends reset email for a registered email', async () => {
    vi.mocked(User.findOne).mockResolvedValue(registeredUser);

    const res = await forgotPassword(makeRequest({ email: 'jane@example.com' }));

    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.success).toBe(true);
    // token must have been saved to DB
    expect(vi.mocked(User.findByIdAndUpdate)).toHaveBeenCalledWith(
      registeredUser._id,
      expect.objectContaining({
        resetPasswordToken: expect.any(String),
        resetPasswordExpiry: expect.any(Date),
      })
    );
  });

  // TC-U007: unknown email still returns 200 (prevents account enumeration)
  it('TC-U007b: returns 200 even when email is not registered (prevents enumeration)', async () => {
    vi.mocked(User.findOne).mockResolvedValue(null);

    const res = await forgotPassword(makeRequest({ email: 'ghost@example.com' }));

    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.success).toBe(true);
    // no DB update should have been made
    expect(vi.mocked(User.findByIdAndUpdate)).not.toHaveBeenCalled();
  });

  it('returns 400 when email field is missing', async () => {
    const res = await forgotPassword(makeRequest({}));
    expect(res.status).toBe(400);
  });
});

// ── reset-password tests ──────────────────────────────────────────────────────

describe('POST /api/users/reset-password', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // TC-U008: valid token + strong password → success
  it('TC-U008: resets password successfully with a valid token', async () => {
    vi.mocked(User.findOne).mockResolvedValue({
      ...registeredUser,
      resetPasswordToken: 'validtoken123',
      resetPasswordExpiry: new Date(Date.now() + 30 * 60 * 1000), // 30 min from now
    });

    const res = await resetPassword(makeRequest({ token: 'validtoken123', password: 'NewPass1!' }));

    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.success).toBe(true);
    // password should be updated and token fields unset
    expect(vi.mocked(User.findByIdAndUpdate)).toHaveBeenCalledWith(
      registeredUser._id,
      expect.objectContaining({
        password: expect.stringContaining('$2b$'),
        $unset: { resetPasswordToken: '', resetPasswordExpiry: '' },
      })
    );
  });

  // TC-U009: expired/invalid token → 400
  it('TC-U009: rejects an expired or invalid reset token', async () => {
    // findOne returns null because the query filters by expiry > now
    vi.mocked(User.findOne).mockResolvedValue(null);

    const res = await resetPassword(makeRequest({ token: 'expiredtoken', password: 'NewPass1!' }));

    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.detail).toMatch(/invalid or has expired/i);
  });

  // weak password on reset
  it('returns 400 when new password is too weak during reset', async () => {
    const res = await resetPassword(makeRequest({ token: 'anytoken', password: 'weak' }));
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.detail).toMatch(/at least 8 characters/i);
  });

  // missing token or password
  it('returns 400 when token or password is missing', async () => {
    const res = await resetPassword(makeRequest({ token: 'tok' }));
    expect(res.status).toBe(400);
  });
});
