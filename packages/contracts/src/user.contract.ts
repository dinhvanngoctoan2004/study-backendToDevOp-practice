import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email({ message: 'email không hợp lệ' }).trim().toLowerCase(),
  password: z.string().min(6, 'mật khẩu tối thiểu phải gồm 6 kí tự'),
});

export type LoginInput = z.infer<typeof loginSchema>;

const profile = z.object({
  fullName: z.string().trim().min(2, 'Full name must be at least 2 characters long.'),
  phone: z.string().trim().min(10, 'Phone number must be at least 10 digits long.').optional(),
  avatar: z.string().trim().optional(),
});

export const registerSchema = z.object({
  email: z.string().email({ message: 'Invalid email' }).trim().toLowerCase(),
  password: z.string().trim().min(6, 'The password must be at least 6 characters long.'),
  profile: profile,
});

export type RegisterSchema = z.infer<typeof registerSchema>;
