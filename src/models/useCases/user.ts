import mongoose from 'mongoose';
import { IUser } from '../../types/user';
import USER from '../entities/users';

export const create = async (data: IUser) => {
  try {
    const registeredUser = new USER(data);
    return await registeredUser.save();
  } catch (error) {
    throw error;
  }
};

export const findOne = async (email: string) => {
  try {
    return await USER.findOne({ email });
  } catch (error) {
    throw error;
  }
};

export const updateOne = async (id: mongoose.Types.ObjectId, data: Partial<IUser>) => {
  try {
    return await USER.updateOne({ _id: id }, data);
  } catch (error) {
    throw error;
  }
};
