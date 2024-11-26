import mongoose from 'mongoose';

export interface ICategory {
  _id?: mongoose.Types.ObjectId | string;
  imgURL: string;
  name: string;
  imageURL: string;
  createdAt?: Date;
  updatedAt?: Date;
}
