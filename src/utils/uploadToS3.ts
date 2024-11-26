import { S3Client, PutObjectCommand, PutObjectCommandInput } from '@aws-sdk/client-s3';
import { getContentType } from './getContentType';

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
    console.log('🚀 ~ contentType:', contentType);

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
