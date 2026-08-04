export class AppError extends Error {
    statusCode;
    code;
    constructor(statusCode, code, message) {
        super(message);
        this.statusCode = statusCode;
        this.code = code;
        this.name = 'AppError';
    }
}
export const errorHandler = (err, _req, res, next) => {
    console.error('Error: ', err);
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            error: {
                code: err.code,
                message: err.message,
            },
        });
    }
    if (err instanceof SyntaxError && 'status' in err && err.status === 400 && 'body' in err) {
        return res.status(400).json({
            error: {
                code: 'INVALID_JSON',
                message: 'Dự liệu Json gửi lên không đúng định dạng',
            }
        });
    }
    if (res.headersSent) {
        return next(err);
    }
    return res.status(500).json({
        error: {
            code: 'INTERNAL_ERROR',
            message: 'Lỗi server',
        },
    });
};
export const erro404 = (_req, _res, next) => {
    next(new AppError(404, 'NOT_FOUND', 'Không tìm thấy API'));
};
//# sourceMappingURL=errorHandler.js.map