import mongoose from 'mongoose';
import { ICustomer } from '../../types/customer';
import Customer from '../entities/customer';

export const create = async (data: ICustomer) => {
    try {
        const registeredCustomer = new Customer(data);
        return await registeredCustomer.save();
    } catch (error) {
        throw error;
    }
};

export const findOne = async (query: Partial<ICustomer>) => {
    return await Customer.findOne(query);
  };
export const findAll = async ({ limit = 10, page = 1 }: { limit?: number; page?: number }) => {
    return await Customer.find()
      .limit(limit)
      .skip(page - 1);
  };

  export const search = async (
    query: Partial<ICustomer>,
    { limit = 10, page = 1 }: { limit?: number; page?: number }
  ) => {
    const mongoQuery: Record<string, unknown> = {};
  
    if (query.name) {
      mongoQuery.name = { $regex: `^${query.name}`, $options: 'i' };
    }
  
    return await Customer.find(mongoQuery)
      .limit(limit)
      .skip((page - 1) * limit);
  };
export const updateOne = async (id: mongoose.Types.ObjectId, data: Partial<ICustomer>) => {
    try {
        return await Customer.updateOne({ _id: id }, data);
    } catch (error) {
        throw error;
    }
};

export const deleteOne = async (id: string) => {
    return await Customer.deleteOne({ _id: id });
  };

  export const getLength = async () => {
    try {
        return await Customer.countDocuments();
    } catch (error) {
        throw error;
    }
  };