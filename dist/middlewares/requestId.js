import { randomUUID } from "crypto";
export const requestId = (req, res, next) => {
    const id = req.headers['x-request-id'] || randomUUID();
    req.headers['x-request-id'] = id;
    res.setHeader('x-request-id', id);
    next();
};
//# sourceMappingURL=requestId.js.map