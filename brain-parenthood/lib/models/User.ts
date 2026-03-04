import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IModuleProgress {
  completedModules: number[];
  currentModule: number;
  lastActivity?: Date;
}

export interface IModuleAnswerEntry {
  assessment?: Record<string, unknown>;
  goals?: Record<string, unknown>;
  savedAt?: Date;
}

export interface IUser extends Document {
  email: string;
  password: string;
  name: string;
  isAdmin: boolean;
  createdAt: Date;
  moduleProgress: IModuleProgress;
  moduleAnswers: Map<string, IModuleAnswerEntry>;
}

const UserSchema = new Schema<IUser>({
  email:    { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  name:     { type: String, required: true, trim: true },
  isAdmin:  { type: Boolean, default: false },
  createdAt:{ type: Date, default: Date.now },
  moduleProgress: {
    completedModules: { type: [Number], default: [] },
    currentModule:    { type: Number, default: 1 },
    lastActivity:     { type: Date },
  },
  moduleAnswers: {
    type: Map,
    of: new Schema({
      assessment: { type: Schema.Types.Mixed },
      goals:      { type: Schema.Types.Mixed },
      savedAt:    { type: Date },
    }, { _id: false }),
    default: {},
  },
});

// Prevent model re-compilation during hot reloads
const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;
