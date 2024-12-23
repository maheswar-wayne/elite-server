import { ICollection } from '../../types/collection';
import Collection from '../entities/collection';
import SubCategory from '../entities/subCategory';

export const create = async (data: Partial<ICollection>) => {
  const collection = new Collection(data);
  return await collection.save();
};

export const findAll = async ({ limit = 10, page = 1 }: { limit?: number; page?: number }) => {
  return await Collection.find()
    .populate('category')
    .populate('subCategory')
    .limit(limit)
    .skip(page - 1);
};

export const findOne = async (query: Partial<ICollection>) => {
  return await Collection.findOne(query).populate('category').populate('subCategory');
};

export const search = async (
  query: Partial<ICollection>,
  { limit = 10, page = 1 }: { limit?: number; page?: number }
) => {
  const mongoQuery: Record<string, unknown> = {};

  if (query.name) {
    mongoQuery.name = { $regex: `^${query.name}`, $options: 'i' };
  }

  return await Collection.find(mongoQuery)
    .populate('category')
    .populate('subCategory')
    .limit(limit)
    .skip(page - 1);
};

export const findBySubCategory = async (
  query: Partial<ICollection>,
  { limit = 10, page = 1 }: { limit?: number; page?: number }
) => {
  const subCategory: { _id: string } = (await SubCategory.findOne({
    name: query.name
  })) as unknown as { _id: string };
  if (!subCategory) return [];
  return await Collection.find({ subCategory: subCategory._id })
    .populate('category')
    .populate('subCategory')
    .limit(limit)
    .skip(page - 1);
};

export const updateOne = async (id: string, data: Partial<ICollection>) => {
  return await Collection.updateOne({ _id: id }, data);
};

export const deleteOne = async (id: string) => {
  return await Collection.deleteOne({ _id: id });
};
