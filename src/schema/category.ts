import z from 'zod';

export const categoryBodySchema = z.object({
  name: z.string().min(2).max(20),
  imgURL: z.string().min(2).max(150)
});
