import { EventRepository, eventRepository } from '../repositories/event.repositories.js';
import type { AddAndEditEvent } from '../schemas/event.validation.js';

export class EventService {
  constructor(private eventRepo: EventRepository = eventRepository) {}

  async addNewEvent(input: AddAndEditEvent) {
    return this.eventRepo.addNewEvent(input);
  }
}

export const eventService = new EventService();
