import type { NextFunction, Request, Response } from 'express';
import { AppError } from '../utils/AppError.utils.js';
export const rolePermissions = (roles: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user.role)) {
      throw new AppError(403, 'FORBIDDEN', 'You do not have permission to perform this action');
    }
    next();
  };
};
