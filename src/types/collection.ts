import mongoose from 'mongoose';

export interface ICollection {
  _id?: mongoose.Types.ObjectId | string;
  name: string;
  category: mongoose.Types.ObjectId | string;
  subCategory: mongoose.Types.ObjectId | string;
  imgURL: string;
  imageURL: string;
  createdAt?: Date;
  updatedAt?: Date;
}
