import multer from 'multer';
import { s3Storage } from '../utils/uploadToS3';

export const uploadFile = multer({
  storage: s3Storage,
  limits: {
    fileSize: 1024 * 1024 * 10
  }
});
