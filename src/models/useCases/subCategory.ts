import { ISubCategory } from '../../types/subCategory';
import SubCategory from '../entities/subCategory';

export const create = async (data: Partial<ISubCategory>) => {
  console.log('🚀 ~ create ~ data:', data);
  try {
    const subCategory = new SubCategory(data);
    return await subCategory.save();
  } catch (error) {
    throw error;
  }
};

export const findAll = async () => {
  try {
    return await SubCategory.find().populate('category');
  } catch (error) {
    throw error;
  }
};

export const findOne = async (query: Partial<ISubCategory>) => {
  try {
    return await SubCategory.findOne(query).populate('category');
  } catch (error) {
    throw error;
  }
};

export const updateOne = async (id: string, data: Partial<ISubCategory>) => {
  try {
    return await SubCategory.updateOne({ _id: id }, data);
  } catch (error) {
    throw error;
  }
};

export const deleteOne = async (id: string) => {
  try {
    return await SubCategory.deleteOne({ _id: id });
  } catch (error) {
    throw error;
  }
};
