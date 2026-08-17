import { describe, it, expect } from '@jest/globals';
import request from 'supertest';
import app from '../../src/app';
describe('health check api  - intergation Test', () => {
  describe('GET /health', () => {
    it('nên trả về http 200 và status available', async () => {
      const response = await request(app).get('/health');

      expect(response.status).toBe(200);
      expect(response.body).toMatchObject({
        status: 'available',
      });
      expect(response.body).toHaveProperty('uptime');
    });
  });
});
