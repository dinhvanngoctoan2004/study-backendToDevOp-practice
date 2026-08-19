import bcrypt from 'bcrypt';
import { AppError } from '../utils/AppError.utils.js';
import { userRepository, type UserRepository } from '../repositories/user.repository.js';
import type { LoginInput, RegisterSchema } from '@repo/contracts';
import { generateToken, type TokenPayload } from '../utils/jwt.utils.js';

export class AuthService {
  constructor(private userRepo: UserRepository = userRepository) {}

  async login(input: LoginInput) {
    const user = await this.userRepo.findByEmail(input.email);

    if (!user || typeof user.password !== 'string') {
      throw new AppError(401, 'UNAUTHORIZED', 'Incorrect login information');
    }

    const isMatch = await bcrypt.compare(input.password, user.password!);

    if (!isMatch) throw new AppError(401, 'UNAUTHORIZED', 'Incorrect login information');

    const { password: _password, ...safeUser } = user.toObject();

    const token = generateToken({ userId: safeUser._id.toString(), role: safeUser.role });

    return { safeUser, token };
  }

  async register(input: RegisterSchema) {
    const result = await this.userRepo.createUser(input);
    const { password: _password, ...safeUser } = result.toObject();
    const token = generateToken({ userId: safeUser._id.toString(), role: safeUser.role });
    return { safeUser, token };
  }

  async me(input: TokenPayload) {
    const { userId, role } = input;
    return await this.userRepo.findById(userId);
  }
}

export const authService = new AuthService();
