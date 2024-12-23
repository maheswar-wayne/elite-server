/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import * as Customer from '../models/useCases/customer';
import { successRes } from '../configs/responseConfig';
import { responseCodes } from '../configs/responseCodes';

export const create = async (req: Request, res: Response): Promise<any> => {
    try {
        const { name, email, mobile, address, postal } = req.body;
        const isExists = await Customer.findOne({ email });
        if (isExists)
            return res.status(200).json(
                successRes({
                    statusCode: responseCodes.badRequest,
                    message: 'Customer already exists'
                })
            );

        const customer = await Customer.create({ name, email, mobile, address, postal });

        return res.status(200).json(
            successRes({
                statusCode: responseCodes.success,
                message: 'Customer created successfully',
                data: customer
            })
        );
    } catch (error) {
        console.log('🚀 ~ create ~ error:', error);
        return res.status(200).json(
            successRes({
                statusCode: responseCodes.serverError,
                message: 'Internal server error'
            })
        );
    }
};

export const findAll = async (req: Request, res: Response): Promise<any> => {
    try {
        const { limit, page }: { limit?: number; page?: number } = req.query;
        const customers = await Customer.findAll({ limit, page });

        return res.status(200).json(
            successRes({
                statusCode: responseCodes.success,
                message: 'Customers fetched successfully',
                data: customers
            })
        );
    } catch (error) {
        console.log('🚀 ~ findAll ~ error:', error);
        return res.status(200).json(
            successRes({
                statusCode: responseCodes.serverError,
                message: 'Internal server error'
            })
        );
    }
};

export const findOne = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params;
        const customer = await Customer.findOne({ _id: id });

        return res.status(200).json(
            successRes({
                statusCode: responseCodes.success,
                message: 'Customer fetched successfully',
                data: customer
            })
        );
    } catch (error) {
        console.log('🚀 ~ findOne ~ error:', error);
        return res.status(200).json(
            successRes({
                statusCode: responseCodes.serverError,
                message: 'Internal server error'
            })
        );
    }
};

export const findByName = async (req: Request, res: Response): Promise<any> => {
    try {
        const { name, limit, page }: { name: string; limit?: number; page?: number } =
            req.query as unknown as {
                name: string;
                limit?: number;
                page?: number;
            };
        const customer = await Customer.search({ name }, { limit, page });
        if (!customer)
            return res.status(200).json(
                successRes({
                    statusCode: responseCodes.notFound,
                    message: 'Customer not found'
                })
            );
        return res
            .status(200)
            .json(
                successRes({ statusCode: responseCodes.success, message: 'Customer found', data: customer })
            );
    } catch (error) {
        console.log('🚀 ~ findByName ~ error:', error);
        return res.status(200).json(
            successRes({
                statusCode: responseCodes.serverError,
                message: 'Internal server error'
            })
        );
    }
};

export const update = async (req: Request, res: Response): Promise<any> => {
    try {
        const id: string = req.params.id;
        const { name, email, mobile, address, postal } = req.body;

        const customer = await Customer.findOne({ _id: id });
        if (!customer)
            return res.status(200).json(
                successRes({
                    statusCode: responseCodes.notFound,
                    message: 'Customer not found'
                })
            );

        const updatedCustomer = await Customer.updateOne(customer._id, { name, email, mobile, address, postal });

        return res.status(200).json(
            successRes({
                statusCode: responseCodes.success,
                message: 'Customer updated successfully',
                data: updatedCustomer
            })
        );
    } catch (error) {
        console.log('🚀 ~ update ~ error:', error);
        return res.status(200).json(
            successRes({
                statusCode: responseCodes.serverError,
                message: 'Internal server error'
            })
        );
    }
};

export const deleteOne = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params;

        const customer = await Customer.findOne({ _id: id });
        if (!customer)
            return res.status(200).json(
                successRes({
                    statusCode: responseCodes.notFound,
                    message: 'Customer not found'
                })
            );

        await Customer.deleteOne(id);

        return res.status(200).json(
            successRes({
                statusCode: responseCodes.success,
                message: 'Customer deleted successfully'
            })
        );
    } catch (error) {
        console.log('🚀 ~ deleteOne ~ error:', error);
        return res.status(200).json(
            successRes({
                statusCode: responseCodes.serverError,
                message: 'Internal server error'
            })
        );
    }
};


