import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync } from 'fs';

// Load .env.local manually
const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = join(__dirname, '..', '.env.local');
const envContent = readFileSync(envPath, 'utf-8');
envContent.split('\n').forEach(line => {
  const [key, ...rest] = line.split('=');
  if (key && !key.startsWith('#') && rest.length) {
    process.env[key.trim()] = rest.join('=').trim();
  }
});

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) { console.error('MONGODB_URI not found'); process.exit(1); }

const UserSchema = new mongoose.Schema({
  email:    { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  name:     { type: String, required: true },
  username: { type: String, required: true, unique: true },
  isAdmin:  { type: Boolean, default: false },
  createdAt:{ type: Date, default: Date.now },
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);

async function seed() {
  await mongoose.connect(MONGODB_URI);
  console.log('Connected to MongoDB');

  // Remove old admin if exists, then create fresh
  await User.deleteOne({ email: 'admin@sensym.ai' });
  await User.deleteOne({ email: 'admin@sensym.com' });
  const hashedPassword = await bcrypt.hash('admin123', 12);
  await User.create({
    email: 'admin@sensym.ai',
    password: hashedPassword,
    name: 'Admin',
    username: 'admin',
    isAdmin: true,
  });

  console.log('✓ Admin account created: admin@sensym.ai / admin123');
  await mongoose.disconnect();
}

seed().catch(e => { console.error(e); process.exit(1); });
