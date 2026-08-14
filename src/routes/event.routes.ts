import { Router } from 'express';
import { validate } from '../middlewares/validate.js';
import { addAndEditEvent } from '../schemas/event.validation.js';
import { eventController } from '../controllers/event.controller.js';

const router: Router = Router();

router.post('/', validate(addAndEditEvent), (req, res, next) => {
  eventController.addNewEvent(req, res, next);
});

export default router;
