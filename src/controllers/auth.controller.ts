import type { NextFunction, Request, Response } from 'express';
import { authService, type AuthService } from '../services/auth.service.js';

import { env } from '../config/env.js';

class AuthController {
  constructor(private authServ: AuthService = authService) {}

  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const user = req.body;
      const resul = await this.authServ.login(user);
      res
        .status(200)
        .cookie('access_token', resul.token, {
          httpOnly: true,
          secure: env.NODE_ENV === 'production',
          sameSite: 'lax',
          maxAge: 24 * 60 * 60 * 1000,
        })
        .json({
          status: 'success',
          data: resul,
        });
    } catch (err) {
      next(err);
    }
  }

  async register(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const user = req.body;
      const resul = await this.authServ.register(user);
      res
        .status(201)
        .cookie('access_token', resul.token, {
          httpOnly: true,
          secure: env.NODE_ENV === 'production',
          sameSite: 'lax',
          maxAge: 24 * 60 * 60 * 1000,
        })
        .json({
          status: 'success',
          data: resul,
        });
    } catch (err) {
      next(err);
    }
  }

  async me(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const user = req.user;
      const result = await this.authServ.me(user);
      res.status(200).json({
        status: 'success',
        data: result,
      });
    } catch (err) {
      next(err);
    }
  }

  async logout(_req: Request, res: Response, _next: NextFunction): Promise<void> {
    res.clearCookie('access_token').status(200).json({
      status: 'success',
      data: 'Logged out successfully',
    });
  }
}

export const authController = new AuthController();
