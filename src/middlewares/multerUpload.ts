import multer from 'multer';
import { s3Storage } from '../utils/uploadToS3';

export const uploadFile = multer({
  storage: s3Storage,
//   fileFilter: (req, file, callback) => {
//     sanitizeFile(file, callback);
//   },
  limits: {
    fileSize: 1024 * 1024 * 2 // 2mb file size
  }
});
