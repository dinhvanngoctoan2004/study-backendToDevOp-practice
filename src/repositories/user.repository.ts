import { AppError } from '../utils/AppError.utils.js';
import { User, type IUser } from '../models/User.models.js';
import type { RegisterSchema } from '@repo/contracts';

export class UserRepository {
  async findByEmail(email: string): Promise<IUser | null> {
    return User.findOne({ email }).select('+password');
  }

  async createUser(input: RegisterSchema): Promise<IUser> {
    try {
      return await User.create(input);
    } catch (err) {
      if (err instanceof Error && 'code' in err && err.code === 11000) {
        throw new AppError(409, 'CONFLICT', 'Account already exists.');
      }
      throw err;
    }
  }

  async findById(userId: string): Promise<IUser | null> {
    return await User.findById(userId);
  }
}

export const userRepository = new UserRepository();
