import z from 'zod';

export const collectionBodySchema = z.object({
  modelName: z.string().min(2).max(20),
  description: z.string().min(2).max(200),
  material: z.string().min(2).max(50),
  size: z.string().min(2).max(50),
  category: z.string().min(2).max(50),
  subCategory: z.string().min(2).max(50),
  collection: z.string().min(2).max(50),
  imgURL: z.array(z.string().min(2).max(150))
});

export const productImageUploadSchema = z.object({
  productName: z.string().min(2).max(200),
  images: z.array(
    z.object({
      filename: z.string().min(2).max(200),
      base64: z.string().min(2).max(200),
      productName: z.string().min(2).max(200),
      format: z.string().min(2).max(200)
    })
  )
});
