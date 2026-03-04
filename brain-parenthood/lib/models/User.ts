import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IUser extends Document {
  email: string;
  password: string;
  name: string;
  isAdmin: boolean;
  createdAt: Date;
}

const UserSchema = new Schema<IUser>({
  email:    { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  name:     { type: String, required: true, trim: true },
  isAdmin:  { type: Boolean, default: false },
  createdAt:{ type: Date, default: Date.now },
});

// Prevent model re-compilation during hot reloads
const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;
