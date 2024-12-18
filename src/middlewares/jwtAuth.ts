import { Request, Response, NextFunction } from 'express';
import * as User from '../models/useCases/admin';
import jwt from 'jsonwebtoken';
import { errorRes } from '../configs/responseConfig';
import { responseCodes } from '../configs/responseCodes';
import { IAdmin } from '../types/auth';

const isValidUser = async (userId: string) => {
  const user = await User.findById(userId);

  if (!user) return 'User not found';
  return true;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const authenticateJWT = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      message: 'Authorization header is missing'
    });
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      message: 'Token is missing'
    });
  }

  try {
    const secretKey = process.env.JWT_ACCESS_TOKEN || '';
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const decoded: any = jwt.verify(token, secretKey) as IAdmin;
    console.log('🚀 ~ authenticateJWT ~ decoded:', decoded);

    //@ts-expect-error !! adding REQ.USER to request object
    req.user = decoded;

    const isValid = await isValidUser(decoded._id);
    if (isValid !== true)
      return res.status(200).json(
        errorRes({
          statusCode: responseCodes.unAuthorized,
          message: isValid
        })
      );

    next();
  } catch (err) {
    console.log('🚀 ~ authenticateJWT ~ err:', err);
    return res.status(403).json(
      errorRes({
        statusCode: responseCodes.unAuthorized,
        message: 'Invalid or expired token'
      })
    );
  }
};
