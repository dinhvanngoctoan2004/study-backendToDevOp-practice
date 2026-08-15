import { AppError } from '../middlewares/errorHandler.js';
import { User, type IUser } from '../models/User.models.js';
import type { RegisteSchema } from '../schemas/user.validation.js';

export class UserRepository {
  async findByEmail(email: string): Promise<IUser | null> {
    return User.findOne({ email }).select('+password');
  }

  async createUser(input: RegisteSchema): Promise<IUser> {
    try {
      return await User.create(input);
    } catch (err) {
      if (err instanceof Error && 'code' in err && err.code === 11000) {
        throw new AppError(409, 'CONFLICT', 'Account already exists.');
      }
      throw err;
    }
  }
}

export const userRepository = new UserRepository();
