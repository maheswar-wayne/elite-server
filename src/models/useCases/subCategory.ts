import { ISubCategory } from '../../types/subCategory';
import SubCategory from '../entities/subCategory';
import Category from '../entities/category';

export const create = async (data: Partial<ISubCategory>) => {
  const subCategory = new SubCategory(data);
  return await subCategory.save();
};

export const findAll = async ({ limit = 10, page = 1 }: { limit?: number; page?: number }) => {
  return await SubCategory.find()
    .populate('category')
    .limit(limit)
    .skip(page - 1);
};

export const findOne = async (query: Partial<ISubCategory>) => {
  return await SubCategory.findOne(query).populate('category');
};

export const search = async (
  query: Partial<ISubCategory>,
  { limit = 10, page = 1 }: { limit?: number; page?: number }
) => {
  const mongoQuery: Record<string, unknown> = {};

  if (query.name) {
    mongoQuery.name = { $regex: `^${query.name}`, $options: 'i' };
  }

  return await SubCategory.find(mongoQuery)
    .populate('category')
    .limit(limit)
    .skip(page - 1);
};

export const findByCategory = async (
  query: Partial<ISubCategory>,
  { limit = 10, page = 1 }: { limit?: number; page?: number }
) => {
  const category = await Category.findOne({ name: query.name });

  if (!category) return [];

  return await SubCategory.find({ category: category._id })
    .populate('category')
    .limit(limit)
    .skip(page - 1);
};

export const updateOne = async (id: string, data: Partial<ISubCategory>) => {
  return await SubCategory.updateOne({ _id: id }, data);
};

export const deleteOne = async (id: string) => {
  return await SubCategory.deleteOne({ _id: id });
};
