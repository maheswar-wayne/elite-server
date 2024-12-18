import mongoose from 'mongoose';

export interface IAdmin {
  _id?: mongoose.Types.ObjectId;
  fullname: string;
  email: string;
  password: string;
  role: 'ADMIN' | 'SUPERADMIN';
  isActive: boolean;
  refreshToken?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
