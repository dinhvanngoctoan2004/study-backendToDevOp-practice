import { Router } from 'express';
import { loginSchema, registerSchema } from '@repo/contracts';
import { validate } from '../middlewares/validate.js';
import { authController } from '../controllers/auth.controller.js';
import { jwtValidation } from '../middlewares/jwt.validation.js';
import { authLimiter } from '../middlewares/rateLimiter.middleware.js';

const router: Router = Router();

router.post('/login', authLimiter, validate(loginSchema), (req, res, next) =>
  authController.login(req, res, next),
);

router.post('/register', authLimiter, validate(registerSchema), (req, res, next) =>
  authController.register(req, res, next),
);

router.get('/me', jwtValidation, (req, res, next) => authController.me(req, res, next));

router.post('/logout', (req, res, next) => authController.logout(req, res, next));

export default router;
