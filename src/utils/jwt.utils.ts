import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { AppError } from './AppError.utils.js';

export interface TokenPayload {
  userId: string;
  role: string;
}

export const generateToken = (userData: TokenPayload) => {
  const signature = jwt.sign(userData, env.JWT_KEY, {
    expiresIn: env.JWT_EXPIRES_IN as any,
  });
  return signature;
};

export const verifyToken = (token: string): TokenPayload => {
  try {
    return jwt.verify(token, env.JWT_KEY) as TokenPayload;
  } catch (err: any) {
    throw new AppError(401, err.name, err.message);
  }
};
