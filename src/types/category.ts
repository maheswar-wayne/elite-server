import mongoose from 'mongoose';

export interface ICategory {
  _id?: mongoose.Types.ObjectId | string;
  name: string;
  imgURL: string;
  imageURL: string;
  createdAt?: Date;
  updatedAt?: Date;
}
