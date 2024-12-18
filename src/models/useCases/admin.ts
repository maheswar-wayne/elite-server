import mongoose from 'mongoose';
import { IAdmin } from '../../types/auth';
import ADMIN from '../entities/admin';

export const create = async (data: IAdmin) => {
    try {
        const registeredUser = new ADMIN(data);
        return await registeredUser.save();
    } catch (error) {
        throw error;
    }
};

export const findOne = async (email: string) => {
    try {
        return await ADMIN.findOne({ email });
    } catch (error) {
        throw error;
    }
};

export const findById = async (id: string) => {
    try {
        return await ADMIN.findOne({ _id:id });
    } catch (error) {
        throw error;
    }
};

export const updateOne = async (id: mongoose.Types.ObjectId, data: Partial<IAdmin>) => {
    try {
        return await ADMIN.updateOne({ _id: id }, data);
    } catch (error) {
        throw error;
    }
};

export const deleteOne = async (id: mongoose.Types.ObjectId) => {
    try {
        return await ADMIN.deleteOne({ _id: id });
    } catch (error) {
        throw error;
    }
};

export const findAll = async () => {
    try {
        return await ADMIN.find({ role: 'ADMIN' });
    } catch (error) {
        throw error;
    }
};
