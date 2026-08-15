import { AppError } from '../middlewares/errorHandler.js';
import { Event, type IEvent } from '../models/Event.js';
import type { AddAndEditEvent } from '../schemas/event.validation.js';

export class EventRepository {
  async addNewEvent(input: AddAndEditEvent): Promise<IEvent> {
    try {
      return await Event.create(input);
    } catch (err) {
      if (err instanceof Error && 'code' in err && err.code === 11000)
        throw new AppError(
          409,
          'CONFLICT',
          'The slug already exists; please choose a different slug.',
        );
      throw err;
    }
  }
}

export const eventRepository = new EventRepository();
