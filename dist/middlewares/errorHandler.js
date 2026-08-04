export class AppErro extends Error {
    statusCode;
    code;
    constructor(statusCode, code, message) {
        super(message);
        this.statusCode = statusCode;
        this.code = code;
        this.name = 'AppErro';
    }
}
export const erroHandler = (err, _req, res, next) => {
    console.error('Error: ' + err);
    if (err instanceof AppErro) {
        return res.status(err.statusCode).json({
            error: {
                code: err.code,
                message: err.message,
            },
        });
    }
    return res.status(500).json({
        error: {
            code: 'INTERNAL_ERROR',
            message: 'Lỗi server',
        },
    });
};
//# sourceMappingURL=errorHandler.js.map