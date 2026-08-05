import type { Request, Response, NextFunction } from 'express';
export declare class AppError extends Error {
    statusCode: number;
    code: string;
    constructor(statusCode: number, code: string, message: string);
}
export declare const errorHandler: (err: Error, _req: Request, res: Response, next: NextFunction) => void | Response<any, Record<string, any>>;
export declare const error404: (_req: Request, _res: Response, next: NextFunction) => void;
//# sourceMappingURL=errorHandler.d.ts.map