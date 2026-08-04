import type { Request, Response, NextFunction } from 'express';
export declare class AppError extends Error {
    statusCode: number;
    code: string;
    constructor(statusCode: number, code: string, message: string);
}
export declare const errorHandler: (err: Error, _req: Request, res: Response, _next: NextFunction) => Response<any, Record<string, any>>;
//# sourceMappingURL=errorHandler.d.ts.map