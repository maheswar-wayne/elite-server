import { ICollection } from '../../types/collection';
import Collection from '../entities/collection';

export const create = async (data: Partial<ICollection>) => {
  try {
    const collection = new Collection(data);
    return await collection.save();
  } catch (error) {
    throw error;
  }
};

export const findAll = async () => {
  try {
    return await Collection.find().populate('category').populate('subCategory');
  } catch (error) {
    throw error;
  }
};

export const findOne = async (query: Partial<ICollection>) => {
  try {
    return await Collection.findOne(query).populate('category').populate('subCategory');
  } catch (error) {
    throw error;
  }
};

export const updateOne = async (id: string, data: Partial<ICollection>) => {
  try {
    return await Collection.updateOne({ _id: id }, data);
  } catch (error) {
    throw error;
  }
};

export const deleteOne = async (id: string) => {
  try {
    return await Collection.deleteOne({ _id: id });
  } catch (error) {
    throw error;
  }
};
