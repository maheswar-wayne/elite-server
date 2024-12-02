import mongoose from 'mongoose';
import { IUser } from '../../types/user';
import USER from '../entities/users';

export const create = async (data: IUser) => {
  const registeredUser = new USER(data);
  return await registeredUser.save();
};

export const findAll = async () => {
  return await USER.find();
};

export const findOne = async (email: string) => {
  return await USER.findOne({ email });
};

export const findById = async (id: string) => {
  return await USER.findOne({ _id:id });
};

export const updateOne = async (id: mongoose.Types.ObjectId, data: Partial<IUser>) => {
  return await USER.updateOne({ _id: id }, data);
};
