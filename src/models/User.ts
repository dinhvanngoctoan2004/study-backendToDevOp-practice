import { Schema, Document, model } from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUser extends Document {
  email: string;
  password?: string;
  role: 'customer' | 'organizer' | 'admin';
  profile: {
    fullName: string;
    phone?: string;
    avatar?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, select: false },
    role: { type: String, enum: ['customer', 'organizer', 'admin'], default: 'customer' },
    profile: {
      fullName: { type: String, required: true, trim: true },
      phone: { type: String, trim: true },
      avatar: { type: String },
    },
  },
  { timestamps: true },
);

userSchema.pre('save', async function () {
  if (!this.isModified('password') || !this.password) {
    return;
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

export const User = model<IUser>('User', userSchema);
