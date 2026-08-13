import { User, type IUser } from '../models/User.js';

export class UserRepository {
  async findByEmail(email: string): Promise<IUser | null> {
    return User.findOne({ email }).select('+password');
  }
}

export const userRepository = new UserRepository();
