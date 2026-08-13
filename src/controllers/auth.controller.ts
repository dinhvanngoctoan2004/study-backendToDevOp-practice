import type { NextFunction, Request, Response } from 'express';
import { authService, type AuthService } from '../services/auth.service.js';

class AuthController {
  constructor(private authServ: AuthService = authService) {}

  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const user = req.body;
      const resul = await authService.login(user);
      res.status(200).json({
        status: 'success',
        data: resul,
      });
    } catch (err) {
      next(err);
    }
  }
}

export const authController = new AuthController();
