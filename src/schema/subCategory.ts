import z from 'zod';

export const subCategoryBodySchema = z.object({
  name: z.string().min(2).max(20),
  category: z.string().min(2).max(50),
  imgURL: z.string().min(2).max(150)
});
