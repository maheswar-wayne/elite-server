import { ICategory } from '../../types/category';
import Category from '../entities/category';

export const create = async (data: Partial<ICategory>) => {
  const category = new Category(data);
  return await category.save();
};

export const findAll = async ({ limit = 10, page = 1 }: { limit?: number; page?: number }) => {
  return await Category.find()
    .limit(limit)
    .skip(page - 1);
};

export const findOne = async (query: Partial<ICategory>) => {
  return await Category.findOne(query);
};

export const search = async (
  query: Partial<ICategory>,
  { limit = 10, page = 1 }: { limit?: number; page?: number }
) => {
  const mongoQuery: Record<string, unknown> = {};

  if (query.name) {
    mongoQuery.name = { $regex: `^${query.name}`, $options: 'i' };
  }

  return await Category.find(mongoQuery)
    .limit(limit)
    .skip((page - 1) * limit);
};

export const updateOne = async (id: string, data: Partial<ICategory>) => {
  return await Category.updateOne({ _id: id }, data);
};

export const deleteOne = async (id: string) => {
  return await Category.deleteOne({ _id: id });
};
