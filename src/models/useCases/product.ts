import { IProduct } from '../../types/product';
import Product from '../entities/product';
import SubCategory from '../entities/subCategory';

export const create = async (data: Partial<IProduct>) => {
  const product = new Product(data);
  return await product.save();
};

export const findAll = async ({ limit = 10, page = 1 }: { limit?: number; page?: number }) => {
  return await Product.find()
    .populate('category')
    .populate('subCategory')
    .limit(limit)
    .skip(page - 1);
};

export const findOne = async (query: Partial<IProduct>) => {
  return await Product.find(query)
    .populate('category')
    .populate('subCategory')
};

export const search = async (query: Partial<IProduct>, { limit = 10, page = 1 }) => {
  const mongoQuery: Record<string, unknown> = {};

  if (query.modelName) {
    mongoQuery.modelName = { $regex: `^${query.modelName}`, $options: 'i' };
  }

  return await Product.find(mongoQuery)
    .populate('category')
    .populate('subCategory')
    .limit(limit)
    .skip(page - 1);
};
export const findBySubCategory = async (
  query: Partial<IProduct>,
  { limit = 10, page = 1 }: { limit?: number; page?: number }
) => {
  const subCategory: { _id: string } = (await SubCategory.findOne({
    name: query.modelName
  })) as unknown as { _id: string };
  if (!subCategory) return [];
  return await Product.find({ subCategory: subCategory._id })
    .populate('category')
    .populate('subCategory')
    .limit(limit)
    .skip(page - 1);
};

export const findBySubCategoryId = async (query: Partial<IProduct>) => {
  return await Product.find({ 'subCategory._id': query.subCategory }).populate('subcategory');
};
export const updateOne = async (id: string, data: Partial<IProduct>) => {
  return await Product.updateOne({ _id: id }, data);
};

export const deleteOne = async (id: string) => {
  return await Product.deleteOne({ _id: id });
};

export const getLength = async () => {
  try {
      return await Product.countDocuments();
  } catch (error) {
      throw error;
  }
};