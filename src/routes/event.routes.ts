import { Router } from 'express';
import { validate } from '../middlewares/validate.js';
import { addAndEditEvent } from '@repo/contracts';
import { eventController } from '../controllers/event.controller.js';
import { jwtValidation } from '../middlewares/jwt.validation.js';
import { rolePermissions } from '../middlewares/role.middleware.js';

const router: Router = Router();

router.post(
  '/',
  jwtValidation,
  rolePermissions('organizer'),
  validate(addAndEditEvent),
  (req, res, next) => {
    eventController.addNewEvent(req, res, next);
  },
);

export default router;
