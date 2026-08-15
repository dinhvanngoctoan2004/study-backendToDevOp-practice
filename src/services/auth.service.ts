import bcrypt from 'bcrypt';
import { AppError } from '../middlewares/errorHandler.js';
import { userRepository, type UserRepository } from '../repositories/user.repository.js';
import type { LoginInput, RegisterSchema } from '../schemas/user.validation.js';

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
    return safeUser;
  }

  async register(input: RegisterSchema) {
    const result = await this.userRepo.createUser(input);
    const { password: _password, ...safeUser } = result.toObject();
    return safeUser;
  }
}

export const authService = new AuthService();
