import type { Request, Response, NextFunction } from 'express';
import { logger } from '../config/logger.js';

export class AppError extends Error {
  constructor(
    public statusCode: number,
    public code: string,
    message: string,
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export const errorHandler = (err: Error, _req: Request, res: Response, next: NextFunction) => {
  logger.error(err);

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      error: {
        code: err.code,
        message: err.message,
      },
    });
  }

  if(err instanceof SyntaxError && 'status' in err && (err as any).status === 400 && 'body' in err){
    return res.status(400).json({
      error: {
        code: 'INVALID_JSON',
        message: 'Dự liệu Json gửi lên không đúng định dạng',
      }
    })
  }

  if(res.headersSent){return next(err)}

  return res.status(500).json({
    error: {
      code: 'INTERNAL_ERROR',
      message: 'Lỗi server',
    },
  });
};

export const error404 = (_req:Request, _res:Response, next:NextFunction)=>{
  next(new AppError(404, 'NOT_FOUND', 'Không tìm thấy API'))
}