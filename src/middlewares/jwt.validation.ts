import type { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt.utils.js';
import { AppError } from '../utils/AppError.utils.js';

export const jwtValidation = (req: Request, res: Response, next: NextFunction) => {
  let token = req.cookies?.access_token;

  if (!token && req.headers.authorization?.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    throw new AppError(401, 'UNAUTHORIZED', 'Access token is missing. Please log in.');
  }

  try {
    const payload = verifyToken(token);
    req.user = payload;
    next();
  } catch (err) {
    next(err);
  }
};
