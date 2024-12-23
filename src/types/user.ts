import mongoose from 'mongoose';

export interface IUser {
  _id?: mongoose.Types.ObjectId;
  username: string;
  email: string;
  password: string;
  role: 'ADMIN';
  status: 'ACTIVE'; 
  isBlocked: boolean;
  accessToken?: string;
  refreshToken?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
