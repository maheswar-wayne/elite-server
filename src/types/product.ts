import mongoose from 'mongoose';

export interface IProduct {
  _id?: mongoose.Types.ObjectId | string;
  modelName: string;
  category: mongoose.Types.ObjectId | string;
  subCategory: mongoose.Types.ObjectId | string;
  description: string;
  material: string;
  color: string[];
  size: string;
  imgURL: string[];
  imageURL: string;
  createdAt?: Date;
  updatedAt?: Date;
}
