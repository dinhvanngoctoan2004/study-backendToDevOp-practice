import { AppError } from '../../src/utils/AppError.utils.js';
import { UserRepository } from '../../src/repositories/user.repository.js';
import { AuthService } from '../../src/services/auth.service.js';
import { jest, describe, it, expect, beforeEach } from '@jest/globals';
import bcrypt from 'bcrypt';

describe('AuthService', () => {
  let authService: AuthService;

  // 1. Khai báo mock repository chứa các hàm jest.Mock
  let mockUserRepo: {
    findByEmail: jest.Mock<any>;
    createUser: jest.Mock<any>;
  };

  beforeEach(() => {
    // 2. Khởi tạo các hàm mock
    mockUserRepo = {
      findByEmail: jest.fn(),
      createUser: jest.fn(),
    };

    // 3. Inject mock vào AuthService
    authService = new AuthService(mockUserRepo as unknown as UserRepository);
  });

  describe('login()', () => {
    it('nên ném lỗi 401 khi không tìm thấy user theo email', async () => {
      // Gọi trực tiếp .mockResolvedValue() cực kỳ ngắn gọn
      mockUserRepo.findByEmail.mockResolvedValue(null);

      await expect(
        authService.login({ email: 'notfound@gmail.com', password: 'password123' }),
      ).rejects.toThrow(AppError);
    });

    it('nên ném lỗi 401 khi mật khẩu không chính xác', async () => {
      const fakeUser = {
        _id: 'user123',
        email: 'test@gmail.com',
        password: '$2b$10$fakehashpassword',
        toObject: () => ({
          _id: 'user123',
          email: 'test@gmail.com',
          password: '$2b$10$fakehashpassword',
        }),
      };
      mockUserRepo.findByEmail.mockResolvedValue(fakeUser);
      jest.spyOn(bcrypt, 'compare').mockImplementation(async () => false);

      await expect(
        authService.login({ email: 'test@gmail.com', password: 'wrongpassword' }),
      ).rejects.toThrow(AppError);
    });

    it('nên trả về safeUser khi đăng nhập thành công', async () => {
      const fakeUser = {
        _id: 'user123',
        email: 'test@gmail.com',
        password: '$2b$10$fakehashpassword',
        role: 'customer',
        toObject: () => ({
          _id: 'user123',
          email: 'test@gmail.com',
          password: '$2b$10$fakehashpassword',
          role: 'customer',
        }),
      };

      mockUserRepo.findByEmail.mockResolvedValue(fakeUser);
      jest.spyOn(bcrypt, 'compare').mockImplementation(async () => true);

      const result = await authService.login({
        email: 'test@gmail.com',
        password: 'correctpassword',
      });

      expect(result).toHaveProperty('safeUser');
      expect(result).toHaveProperty('token');
      expect(result.safeUser).not.toHaveProperty('password');
    });
  });

  describe('register()', () => {
    it('bị từ chối do tài khoản đã tồn tại', async () => {
      mockUserRepo.createUser.mockRejectedValue(
        new AppError(409, 'CONFLICT', 'Account already exists.'),
      );
      await expect(
        authService.register({
          email: 'test@gmail.com',
          password: 'test123',
          profile: {
            fullName: 'toan',
            phone: '0123456789',
          },
        }),
      ).rejects.toMatchObject({
        statusCode: 409,
        code: 'CONFLICT',
        message: 'Account already exists.',
      });
    });

    it('tạo tài khoản thành công', async () => {
      const fakeData = {
        email: 'test@gmail.com',
        password: 'test123',
        profile: {
          fullName: 'toan',
          phone: '0123456789',
        },
        toObject: () => ({
          _id: 'user123',
          email: 'test@gmail.com',
          password: '$2b$10$hashedpassword',
          profile: {
            fullName: 'toan',
            phone: '0123456789',
          },
        }),
      };

      mockUserRepo.createUser.mockResolvedValue(fakeData);

      const result = await authService.register(fakeData);
      expect(result).toHaveProperty('safeUser');
      expect(result).toHaveProperty('token');
      expect(result.safeUser).toMatchObject({
        email: 'test@gmail.com',
        profile: {
          fullName: 'toan',
          phone: '0123456789',
        },
      });

      expect(result).not.toHaveProperty('password');
    });
  });
});
