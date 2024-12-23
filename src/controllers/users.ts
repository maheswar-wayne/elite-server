/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { successRes } from '../configs/responseConfig';
import { responseCodes } from '../configs/responseCodes';
import * as User from '../models/useCases/user';

export const updateUserStatus = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const user = await User.findById(id);
    if (!user)
      return res.status(200).json(
        successRes({
          statusCode: responseCodes.notFound,
          message: 'User not found'
        })
      );

    const updatedUser = await User.updateOne(user._id, { status });

    return res.status(200).json(
      successRes({
        statusCode: responseCodes.success,
        message: 'User status updated successfully',
        data: updatedUser
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

export const blockUnblockUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const { isBlocked } = req.body;

    const user = await User.findById(id);
    if (!user)
      return res.status(200).json(
        successRes({
          statusCode: responseCodes.notFound,
          message: 'User not found'
        })
      );

    const updatedUser = await User.updateOne(user._id, { isBlocked });

    return res.status(200).json(
      successRes({
        statusCode: responseCodes.success,
        message: 'User status updated successfully',
        data: updatedUser
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
