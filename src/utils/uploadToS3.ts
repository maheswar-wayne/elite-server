import { S3Client, PutObjectCommand, PutObjectCommandInput } from '@aws-sdk/client-s3';
import multerS3 from 'multer-s3';
import { getContentType } from './getContentType';
import { Request } from 'express';
import path from 'path';

const BUCKET_NAME = process.env.S3_BUCKET!;
const AWS_REGION = process.env.S3_REGION!;
const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID!;
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY!;

// Initialize the S3 client with credentials
const client = new S3Client({
  region: AWS_REGION,
  credentials: {
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY
  }
});

export const uploadFileToS3 = async (
  base64: string,
  filePath: string,
  filename: string,
  format: string = 'png'
) => {
  try {
    const key = `${filePath}/${filename}.${format}`;
    const buffer = Buffer.from(base64, 'base64');
    const contentType = getContentType(format);

    if (!contentType) {
      throw new Error('Invalid file format');
    }

    const params: PutObjectCommandInput = {
      Bucket: BUCKET_NAME,
      Key: key,
      Body: buffer,
      ContentEncoding: 'base64',
      ContentType: contentType
    };

    // Send the PutObjectCommand with the specified parameters
    await client.send(new PutObjectCommand(params));

    return `https://${BUCKET_NAME}.s3.${AWS_REGION}.amazonaws.com/${key}`;
  } catch (error) {
    console.error(error);
    throw new Error('Something went wrong during the upload');
  }
};

export const s3Storage = multerS3({
  s3: client, // s3 instance
  bucket: BUCKET_NAME,
  metadata: (req, file, cb) => {
    cb(null, { fieldname: file.fieldname });
  },
  key: (req: Request, file, cb) => {
    console.log('🚀 ~ key ~ req:', file);
    const fileExtension = path.extname(file.originalname).toLowerCase();
    const allowedExtensions = ['.glb', '.gltf'];
    if (!allowedExtensions.includes(fileExtension)) {
      throw new Error("Unsupported file format. Only '.glb' and '.gltf' are allowed.");
    }
    const fileName = `3D/${req?.query?.productName}/${req?.query?.productName}${fileExtension}`;
    cb(null, fileName);
  }
});
