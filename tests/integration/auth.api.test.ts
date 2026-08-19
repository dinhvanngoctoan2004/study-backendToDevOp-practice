import { describe, it, expect } from '@jest/globals';
import request from 'supertest';
import app from '../../src/app';
import { connectMongo } from '../../src/config/mongo.js';
import mongoose from 'mongoose';

describe('Auth API - Integration Test', () => {
  beforeAll(async () => {
    await connectMongo();
  });
  afterAll(async () => {
    await mongoose.connection.close();
  });

  describe('/api/auth/register - Input Validation', () => {
    it('nên trả về 400 Bad request', async () => {
      const req = await request(app)
        .post('/api/auth/register')
        .send({
          email: '123',
          password: '123456789',
          profile: {
            fullName: 'dinhvanngoctoan',
          },
        });

      expect(req.status).toBe(422);
      expect(req.body).toMatchObject({
        error: {
          code: 'VALIDATION_ERROR',
        },
      });
    });

    it('nên trả về 400 khi mật khẩu không hợp lệ', async () => {
      const req = await request(app)
        .post('/api/auth/register')
        .send({
          email: 'toan@gmail.com',
          password: '1234',
          profile: {
            fullName: 'dinhvanngoctoan',
          },
        });
      expect(req.status).toBe(422);
      expect(req.body).toMatchObject({
        error: {
          code: 'VALIDATION_ERROR',
        },
      });
    });

    it('nên trả về 400 khi thiếu dữ liệu', async () => {
      const req = await request(app).post('/api/auth/register').send({
        email: 'toan@gmail.com',
        password: '1234',
      });

      expect(req.status).toBe(422);
      expect(req.body).toMatchObject({
        error: {
          code: 'VALIDATION_ERROR',
        },
      });
    });

    it('nên trả về 404 khi url không chính xác', async () => {
      const req = await request(app).post('/api/authadsregister').send({
        email: 'toan@gmail.com',
        password: '1234',
      });
      expect(req.status).toBe(404);
      expect(req.body).toMatchObject({
        error: {
          code: 'NOT_FOUND',
          message: 'API not found',
        },
      });
    });

    it('khi tạo tài khoản thành công có trả về token hay không', async () => {
      const req = await request(app)
        .post('/api/auth/register')
        .send({
          email: 'toan123@gmail.com',
          password: '123456789',
          profile: {
            fullName: 'dinhvanngoctoan',
          },
        });

      expect(req.status).toBe(201);
      expect(req.header['set-cookie']).toBeDefined();
    });
  });

  describe('/api/auth/login - Input Validation', () => {
    it('case 1: đăng nhập thành công trả về đủ dữ liệu ', async () => {
      const req = await request(app).post('/api/auth/login').send({
        email: 'toan_benchmark_2@gmail.com',
        password: '123456789',
      });
      expect(req.status).toBe(200);
      expect(req.header['set-cookie']).toBeDefined();
    });
  });
});
