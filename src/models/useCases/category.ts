import { ICategory } from '../../types/category';
import Category from '../entities/category';

export const create = async (data: Partial<ICategory>) => {
  try {
    const category = new Category(data);
    return await category.save();
  } catch (error) {
    throw error;
  }
};

export const findAll = async () => {
  try {
    return await Category.find();
  } catch (error) {
    throw error;
  }
};

export const findOne = async (query: Partial<ICategory>) => {
  try {
    return await Category.findOne(query);
  } catch (error) {
    throw error;
  }
};

export const updateOne = async (id: string, data: Partial<ICategory>) => {
  try {
    return await Category.updateOne({ _id: id }, data);
  } catch (error) {
    throw error;
  }
};

export const deleteOne = async (id: string) => {
  try {
    return await Category.deleteOne({ _id: id });
  } catch (error) {
    throw error;
  }
};
