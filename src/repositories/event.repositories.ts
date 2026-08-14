import { Event, type IEvent } from '../models/Event.js';
import type { AddAndEditEvent } from '../schemas/event.validation.js';

export class EventRepository {
  async addNewEvent(input: AddAndEditEvent): Promise<IEvent> {
    return Event.create(input);
  }
}

export const eventRepository = new EventRepository();
