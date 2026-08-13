import { Router } from 'express';
import { loginSchema } from '../schemas/validation.js';
import { validate } from '../middlewares/validate.js';
import { authController } from '../controllers/auth.controller.js';

const router: Router = Router();

router.post('/login', validate(loginSchema), (req, res, next) =>
  authController.login(req, res, next),
);

export default router;
