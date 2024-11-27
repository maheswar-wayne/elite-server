import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  userId: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const authenticateJWT = (req: Request, res: Response, next: NextFunction): any => {
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
    const decoded = jwt.verify(token, secretKey) as JwtPayload;
    console.log('🚀 ~ authenticateJWT ~ decoded:', decoded);

    //@ts-expect-error !! adding REQ.USER to request object
    req.user = decoded;

    next();
  } catch (err) {
    console.log('🚀 ~ authenticateJWT ~ err:', err);
    return res.status(403).json({
      message: 'Invalid or expired token'
    });
  }
};
