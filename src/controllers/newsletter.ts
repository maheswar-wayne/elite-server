import { Request, Response } from 'express';
import { successRes } from '../configs/responseConfig';
import { responseCodes } from '../configs/responseCodes';
import { uploadFileToS3 } from '../utils/uploadToS3';
import { sendWhatsappMessage } from '../utils/WhatsappNewsletter';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const sendWhatsappNewsletter = async (req: Request, res: Response): Promise<any> => {
  try {
    const { desc, phoneNumbers, mediaUrl } = req.body;

    phoneNumbers.forEach((element: string) => {
      sendWhatsappMessage({ desc, phoneNumber: element, mediaUrl });
    });
    return res.status(200).json(
      successRes({
        statusCode: responseCodes.success,
        message: 'Newsletter sent successfully'
      })
    );
  } catch (error) {
    console.log('🚀 ~ sendWhatsappNewsletter ~ error:', error);
    return res.status(200).json(
      successRes({
        statusCode: responseCodes.serverError,
        message: 'Internal server error'
      })
    );
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const uploadFile = async (req: Request, res: Response): Promise<any> => {
  try {
    const { base64, format } = req.body;

    const filePath = `newsletter`;
    const url = await uploadFileToS3(base64, filePath, 'newsletter', format);

    // Respond with success and the uploaded URLs
    return res.status(200).json(
      successRes({
        statusCode: responseCodes.success,
        message: 'File uploaded successfully',
        data: {
          url
        }
      })
    );
  } catch (error) {
    console.log('🚀 ~ uploadModel ~ error:', error);

    return res.status(500).json(
      successRes({
        statusCode: responseCodes.serverError,
        message: 'Internal server error'
      })
    );
  }
};
