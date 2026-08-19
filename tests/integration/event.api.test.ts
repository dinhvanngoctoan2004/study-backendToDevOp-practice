import { describe, it, expect } from '@jest/globals';
import request from 'supertest';
import app from '../../src/app';
import { error } from 'node:console';

describe('Event API - Integration Test', () => {
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2YTg1YzI5M2ZjOTZkZjQ1YjhhNjI4ZjYiLCJyb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE3ODcxNTEwMTIsImV4cCI6MTc4NzIzNzQxMn0.-PqzwQtX3HCNKfpw1jKVigHILF36FRHIJo42WwIbVu4';

  describe('/ api tạo event - Input Validation', () => {
    it('case 1: organizerId không hợp lệ trả về mã lỗi 422 ', async () => {
      const req = await request(app)
        .post('/api/events/')
        .set('Cookie', [`access_token=${token}`])
        .send({
          title: 'Hội thảo Lập trình Backend và Triển khai DevOps 2026',
          slug: 'hoi-thao-lap-trinh-backend-va-trien-khai-devops-2026',
          organizerId: '66bf1b1a8f1b2',
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
        });

      expect(req.status).toBe(422);
      expect(req.body).toHaveProperty('error');
    });

    it('case 2:  thiếu dữ liệu trả về mã lỗi 422 ', async () => {
      const req = await request(app)
        .post('/api/events/')
        .set('Cookie', [`access_token=${token}`])
        .send({
          title: 'Hội thảo Lập trình Backend và Triển khai DevOps 2026',
          slug: 'hoi-thao-lap-trinh-backend-va-trien-khai-devops-2026',
          organizerId: '66bf1b1a8f1b2',
          location: {
            name: 'Trung tâm Đổi mới Sáng tạo Quốc gia',
            address: 'Số 1 Đại lộ Thăng Long, Mễ Trì, Nam Từ Liêm',
            city: 'Hà Nội',
          },

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
        });

      expect(req.status).toBe(422);
      expect(req.body).toHaveProperty('error');
    });

    it('case 3: startTime bắt đầu muộn hơn endTime - trả về mã lỗi 422 ', async () => {
      const req = await request(app)
        .post('/api/events/')
        .set('Cookie', [`access_token=${token}`])
        .send({
          title: 'Hội thảo Lập trình Backend và Triển khai DevOps 2026',
          slug: 'hoi-thao-lap-trinh-backend-va-trien-khai-devops-2026',
          organizerId: '66bf1b1a8f1b2',
          location: {
            name: 'Trung tâm Đổi mới Sáng tạo Quốc gia',
            address: 'Số 1 Đại lộ Thăng Long, Mễ Trì, Nam Từ Liêm',
            city: 'Hà Nội',
          },
          startTime: new Date('2026-09-21T08:30:00.000Z'),
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
        });

      expect(req.status).toBe(422);
      expect(req.body).toHaveProperty('error');
    });

    it('case 4: availableQuantity > totalQuantity - trả về mã lỗi 422 ', async () => {
      const req = await request(app)
        .post('/api/events/')
        .set('Cookie', [`access_token=${token}`])
        .send({
          title: 'Hội thảo Lập trình Backend và Triển khai DevOps 2026',
          slug: 'hoi-thao-lap-trinh-backend-va-trien-khai-devops-2026',
          organizerId: '66bf1b1a8f1b2',
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
              availableQuantity: 250,
            },
            {
              name: 'Vé VIP',
              price: 500000,
              totalQuantity: 50,
              availableQuantity: 50,
            },
          ],
          status: 'draft' as const,
        });

      expect(req.status).toBe(422);
      expect(req.body).toHaveProperty('error');
    });

    it('case 5: availableQuantity < 0 - trả về mã lỗi 422 ', async () => {
      const req = await request(app)
        .post('/api/events/')
        .set('Cookie', [`access_token=${token}`])
        .send({
          title: 'Hội thảo Lập trình Backend và Triển khai DevOps 2026',
          slug: 'hoi-thao-lap-trinh-backend-va-trien-khai-devops-2026',
          organizerId: '66bf1b1a8f1b2',
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
              availableQuantity: -1,
            },
            {
              name: 'Vé VIP',
              price: 500000,
              totalQuantity: 50,
              availableQuantity: 50,
            },
          ],
          status: 'draft' as const,
        });

      expect(req.status).toBe(422);
      expect(req.body).toHaveProperty('error');
    });

    it('case 6: totalQuantity < 1 - trả về mã lỗi 422 ', async () => {
      const req = await request(app)
        .post('/api/events/')
        .set('Cookie', [`access_token=${token}`])
        .send({
          title: 'Hội thảo Lập trình Backend và Triển khai DevOps 2026',
          slug: 'hoi-thao-lap-trinh-backend-va-trien-khai-devops-2026',
          organizerId: '66bf1b1a8f1b2',
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
              totalQuantity: 0,
              availableQuantity: 0,
            },
            {
              name: 'Vé VIP',
              price: 500000,
              totalQuantity: 50,
              availableQuantity: 50,
            },
          ],
          status: 'draft' as const,
        });

      expect(req.status).toBe(422);
      expect(req.body).toHaveProperty('error');
    });

    it('case 7: không kèm token trả về lỗi 401', async () => {
      const req = await request(app)
        .post('/api/events/')
        .send({
          title: 'Hội thảo Lập trình Backend và Triển khai DevOps 2026',
          slug: 'hoi-thao-lap-trinh-backend-va-trien-khai-devops-2026',
          organizerId: '66bf1b1a8f1b2',
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
              availableQuantity: -1,
            },
            {
              name: 'Vé VIP',
              price: 500000,
              totalQuantity: 50,
              availableQuantity: 50,
            },
          ],
          status: 'draft' as const,
        });

      expect(req.status).toBe(401);
      expect(req.body).toHaveProperty('error');
    });
  });
});
