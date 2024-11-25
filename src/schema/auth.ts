import z from 'zod';

export const registerSchema = z.object({
    username: z.string().min(3).max(20),
    email: z.string().email().min(3).max(20),
    password: z.string().min(3).max(20),
});

export const loginSchema = z.object({
    email: z.string().email().min(3).max(20),
    password: z.string().min(3).max(20),
});
