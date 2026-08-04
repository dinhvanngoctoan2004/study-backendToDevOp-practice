import { Router } from 'express';
import { loginSchema } from '../schemas/validation.js';
import { validate } from '../middlewares/validate.js';

const router: Router = Router();

router.post('/login', validate(loginSchema), (_req, _res) => {
  ////
});

export default router;
