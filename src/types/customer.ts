import mongoose from 'mongoose';

export interface ICustomer {
    _id?:mongoose.Types.ObjectId | string;
    name: string;
    email: string;
    mobile: string;
    address: string;
    postal: string;
    createdAt?: Date;
    updatedAt?: Date;
}
