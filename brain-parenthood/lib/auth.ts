import crypto from 'crypto';

const TOKEN_SECRET = process.env.TOKEN_SECRET || 'change-this-secret-in-production';
const TOKEN_EXPIRY_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

interface TokenPayload {
  userId: string;
  email: string;
  iat: number;
  exp: number;
}

export function generateToken(userId: string, email: string): string {
  const payload: TokenPayload = {
    userId,
    email,
    iat: Date.now(),
    exp: Date.now() + TOKEN_EXPIRY_MS,
  };
  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString('base64');
  const signature = crypto
    .createHmac('sha256', TOKEN_SECRET)
    .update(encodedPayload)
    .digest('hex');
  return `${encodedPayload}.${signature}`;
}

export function verifyToken(token: string): TokenPayload {
  const dotIndex = token.lastIndexOf('.');
  if (dotIndex === -1) throw new Error('Invalid token format');

  const encodedPayload = token.substring(0, dotIndex);
  const signature = token.substring(dotIndex + 1);

  const expectedSig = crypto
    .createHmac('sha256', TOKEN_SECRET)
    .update(encodedPayload)
    .digest('hex');

  // Constant-time comparison prevents timing attacks
  const sigBuffer = Buffer.from(signature.padEnd(64, '0'), 'hex');
  const expectedBuffer = Buffer.from(expectedSig, 'hex');
  if (sigBuffer.length !== expectedBuffer.length || !crypto.timingSafeEqual(sigBuffer, expectedBuffer)) {
    throw new Error('Invalid token signature');
  }

  const payload: TokenPayload = JSON.parse(Buffer.from(encodedPayload, 'base64').toString());
  if (payload.exp < Date.now()) throw new Error('Token expired');

  return payload;
}

export function getEmailFromToken(authHeader: string | null): string | null {
  if (!authHeader || !authHeader.startsWith('Bearer ')) return null;
  try {
    return verifyToken(authHeader.substring(7)).email;
  } catch {
    return null;
  }
}

export function hashResetToken(token: string): string {
  return crypto.createHash('sha256').update(token).digest('hex');
}
