import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email({ message: 'email không hợp lệ' }),
  password: z.string().min(6, 'mật khẩu tối thiểu phải gồm 6 kí tự'),
});

export type LoginInput = z.infer<typeof loginSchema>;
