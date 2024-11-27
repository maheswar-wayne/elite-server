import { IProduct } from '../../types/product';
import Product from '../entities/product';

export const create = async (data: Partial<IProduct>) => {
  const product = new Product(data);
  return await product.save();
};

export const findAll = async () => {
  return await Product.find().populate('category').populate('subCategory').populate('collection');
};

export const findOne = async (query: Partial<IProduct>) => {
  return await Product.findOne(query).populate('category').populate('subCategory');
};

export const updateOne = async (id: string, data: Partial<IProduct>) => {
  return await Product.updateOne({ _id: id }, data);
};

export const deleteOne = async (id: string) => {
  return await Product.deleteOne({ _id: id });
};
