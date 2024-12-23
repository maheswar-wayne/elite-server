import z from 'zod';

export const collectionBodySchema = z.object({
  name: z.string().min(2).max(20),
  category: z.string().min(2).max(50),
  subCategory: z.string().min(2).max(50),
  imgURL: z.string().min(2).max(150)
});
