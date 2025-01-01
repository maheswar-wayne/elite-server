import z from 'zod';

export const whatsappNewsletter = z.object({
  desc: z.string().min(3).max(250),
  phoneNumbers: z.array(z.string().min(3).max(20)),
  mediaUrl: z.string().min(3).max(200)
});

export const uploadSchema = z.object({
  base64: z.string().min(3),
  filename: z.string().min(3).max(20),
  format: z.string().min(3).max(20)
});
