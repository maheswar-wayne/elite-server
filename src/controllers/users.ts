/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { successRes } from '../configs/responseConfig';
import { responseCodes } from '../configs/responseCodes';
import * as User from '../models/useCases/user';
import bcrypt from 'bcrypt';

export const deleteAdmin = async (req: Request, res: Response) => {
  try {
      const id: string = req.params.id;
      const admin = await User.findById(id);

      if (!admin)
          return res.status(200).json(
              successRes({
                  statusCode: responseCodes.notFound,
                  message: 'Admin not found',
              })
          );

      await User.deleteOne(admin._id);
      return res.status(200).json(
          successRes({
              statusCode: responseCodes.success,
              message: 'Admin deleted successfully',
          })
      );
  } catch (error) {
      console.log('🚀 ~ deleteAdmin ~ error:', error);
      return res.status(200).json(
          successRes({
              statusCode: responseCodes.serverError,
              message: 'Internal server error',
          })
      );
  }
};

export const changePassword = async (req: Request, res: Response) => {
  try {
      const id: string = req.params.id;
      const { password } = req.body;
      const admin = await User.findById(id);

      if (!admin)
          return res.status(200).json(
              successRes({
                  statusCode: responseCodes.notFound,
                  message: 'Admin not found',
              })
          );

      admin.password = await bcrypt.hash(password, 10);
      await User.updateOne(admin._id, { password: admin.password });

      return res.status(200).json(
          successRes({
              statusCode: responseCodes.success,
              message: 'Admin password changed successfully',
          })
      );
  } catch (error) {
      console.log('🚀 ~ changePassword ~ error:', error);
      return res.status(200).json(
          successRes({
              statusCode: responseCodes.serverError,
              message: 'Internal server error',
          })
      );
  }
};

export const findAllUsers = async (req: Request, res: Response): Promise<any> => {
  try {
    const users = await User.findAll();
    return res.status(200).json(
      successRes({
        statusCode: responseCodes.success,
        message: 'Users found successfully',
        data: users
      })
    );
  } catch (error) {
    console.log('🚀 ~ register ~ error:', error);
    return res.status(200).json(
      successRes({
        statusCode: responseCodes.serverError,
        message: 'Internal server error'
      })
    );
  }
};
