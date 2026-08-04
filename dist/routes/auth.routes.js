import { Router } from 'express';
import { loginSchema } from '../schemas/validation.js';
import { validate } from '../middlewares/validate.js';
const router = Router();
router.post('/login', validate(loginSchema), (req, res, next) => {
    try {
        res.status(200).json({
            message: 'Login success',
        });
    }
    catch (err) {
        next(err);
    }
});
export default router;
//# sourceMappingURL=auth.routes.js.map