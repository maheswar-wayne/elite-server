import z from 'zod';

export const customerBodySchema = z.object({
    name: z.string().min(3).max(20),
    email: z.string().email().min(3).max(20),
    mobile: z.string().min(3).max(20),
    address: z.string().min(3).max(20),
    postal: z.string().min(3).max(20),
});
