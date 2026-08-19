import { EventRepository, eventRepository } from '../repositories/event.repositories.js';
import type { AddAndEditEvent } from '@repo/contracts';

export class EventService {
  constructor(private eventRepo: EventRepository = eventRepository) {}

  async addNewEvent(input: AddAndEditEvent) {
    return this.eventRepo.addNewEvent(input);
  }
}

export const eventService = new EventService();
