import bcrypt from 'bcrypt';
import { AppError } from '../middlewares/errorHandler.js';
import { userRepository, type UserRepository } from '../repositories/user.repository.js';
import type { LoginInput, RegisteSchema } from '../schemas/user.validation.js';

export class AuthService {
  constructor(private userRepo: UserRepository = userRepository) {}

  async login(input: LoginInput) {
    const check = await this.userRepo.findByEmail(input.email);

    if (!check) throw new AppError(401, 'UNAUTHORIZED', 'Incorrect login information');

    const check2 = await bcrypt.compare(input.password, check.password!);

    if (!check2) throw new AppError(401, 'UNAUTHORIZED', 'Incorrect login information');

    const { password: _password, ...safeUser } = check.toObject();
    return safeUser;
  }

  async register(input: RegisteSchema) {
    const resul = await this.userRepo.createUser(input);
    const { password: _password, ...safeUser } = resul.toObject();
    return safeUser;
  }
}

export const authService = new AuthService();
