import { jest, describe, it, expect, beforeEach } from '@jest/globals';
import { EventService } from '../../src/services/event.service';
import { AppError } from '../../src/utils/AppError.utils.js';

describe('Event services', () => {
  let eventService: EventService;

  let mockEventRepo: {
    addNewEvent: jest.Mock<any>;
  };

  beforeEach(() => {
    mockEventRepo = {
      addNewEvent: jest.fn(),
    };
    eventService = new EventService(mockEventRepo as unknown as EventService);
  });

  describe('addNewEvent()', () => {
    it('case 1 trung slug nên ném ra lỗi 409', async () => {
      mockEventRepo.addNewEvent.mockRejectedValue(
        new AppError(409, 'CONFLICT', 'The slug already exists; please choose a different slug.'),
      );

      await expect(
        eventService.addNewEvent({
          title: 'Hội thảo Lập trình Backend và Triển khai DevOps 2026',
          slug: 'hoi-thao-lap-trinh-backend-va-trien-khai-devops-2026',
          organizerId: '66bf1b1a8f1b2c001a654321',
          location: {
            name: 'Trung tâm Đổi mới Sáng tạo Quốc gia',
            address: 'Số 1 Đại lộ Thăng Long, Mễ Trì, Nam Từ Liêm',
            city: 'Hà Nội',
          },
          startTime: new Date('2026-09-20T08:30:00.000Z'),
          endTime: new Date('2026-09-20T17:30:00.000Z'),
          ticketCategories: [
            {
              name: 'Vé Tiêu Chuẩn',
              price: 150000,
              totalQuantity: 200,
              availableQuantity: 200,
            },
            {
              name: 'Vé VIP',
              price: 500000,
              totalQuantity: 50,
              availableQuantity: 50,
            },
          ],
          status: 'draft' as const,
        }),
      ).rejects.toMatchObject({
        statusCode: 409,
        code: 'CONFLICT',
        message: 'The slug already exists; please choose a different slug.',
      });
    });

    it('case 2 tạo event thành công', async () => {
      const fakeData = {
        title: 'Hội thảo Lập trình Backend và Triển khai DevOps 2026',
        slug: 'hoi-thao-lap-trinh-backend-va-trien-khai-devops-2026',
        organizerId: '66bf1b1a8f1b2c001a654321',
        location: {
          name: 'Trung tâm Đổi mới Sáng tạo Quốc gia',
          address: 'Số 1 Đại lộ Thăng Long, Mễ Trì, Nam Từ Liêm',
          city: 'Hà Nội',
        },
        startTime: new Date('2026-09-20T08:30:00.000Z'),
        endTime: new Date('2026-09-20T17:30:00.000Z'),
        ticketCategories: [
          {
            name: 'Vé Tiêu Chuẩn',
            price: 150000,
            totalQuantity: 200,
            availableQuantity: 200,
          },
          {
            name: 'Vé VIP',
            price: 500000,
            totalQuantity: 50,
            availableQuantity: 50,
          },
        ],
        status: 'draft' as const,
      };

      mockEventRepo.addNewEvent.mockResolvedValue(fakeData);
      expect(await eventService.addNewEvent(fakeData)).toMatchObject(fakeData);
    });
  });
});
