import type { NextFunction, Request, Response } from 'express';
import { eventService, type EventService } from '../services/event.service.js';

class EventController {
  constructor(private eventServ: EventService = eventService) {}

  async addNewEvent(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const event = req.body;
      const resul = await this.eventServ.addNewEvent(event);
      res.status(201).json({
        status: 'success',
        data: resul,
      });
    } catch (err) {
      next(err);
    }
  }
}

export const eventController = new EventController();
