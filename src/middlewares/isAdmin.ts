import { NextFunction, Response } from 'express';
import { errorRes } from '../configs/responseConfig';
import { responseCodes } from '../configs/responseCodes';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isAdmin = (req: any, res: Response, next: NextFunction): any => {
  if (req?.user.role === 'ADMIN') {
    next();
  } else {
    return res.status(200).send(
      errorRes({
        statusCode: responseCodes.unAuthorized,
        message: 'Unauthorized'
      })
    );
  }
};
