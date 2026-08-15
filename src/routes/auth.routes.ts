import { Router } from 'express';
import { loginSchema, registerSchema } from '../schemas/user.validation.js';
import { validate } from '../middlewares/validate.js';
import { authController } from '../controllers/auth.controller.js';

const router: Router = Router();

router.post('/login', validate(loginSchema), (req, res, next) =>
  authController.login(req, res, next),
);

router.post('/register', validate(registerSchema), (req, res, next) =>
  authController.register(req, res, next),
);

export default router;
