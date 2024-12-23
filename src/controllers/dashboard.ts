import { Request, Response } from 'express';
import { successRes } from '../configs/responseConfig';
import { responseCodes } from '../configs/responseCodes';
import * as Category from '../models/useCases/category';
import * as SubCategory from '../models/useCases/subCategory';
import * as Product from '../models/useCases/product';
import * as Customer from '../models/useCases/customer';

export const getDashboardData = async (req: Request, res: Response): Promise<void> => {
    try {
        const dashboardData = {
            categoryCount: await Category.getLength(),
            subCategoryCount: await SubCategory.getLength(),
            productCount: await Product.getLength(),
            customersCount: await Customer.getLength(),
        };

        res.status(200).json(
            successRes({
                statusCode: responseCodes.success,
                message: 'Dashboard data fetched successfully',
                data: dashboardData,
            })
        );
    } catch (error) {
        res.status(500).json(
            successRes({
                statusCode: responseCodes.serverError,
                message: 'Internal server error',
            })
        );
    }
};
