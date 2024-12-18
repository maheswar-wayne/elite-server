import z from 'zod';

export const adminRegisterSchema = z.object({
  fullname: z.string().min(3).max(20),
  email: z.string().email().min(3).max(50),
  password: z.string().min(3).max(20),
});

export const loginSchema = z.object({
  email: z.string().email().min(3).max(50),
  password: z.string().min(3).max(20),
});
