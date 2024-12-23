import z from 'zod';

export const statusSchema = z.object({
  status: z.string().min(3).max(20),
});

export const blockSchema = z.object({
    isBlocked: z.boolean(),
});
