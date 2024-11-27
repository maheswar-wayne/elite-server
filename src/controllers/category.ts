/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import * as Category from '../models/useCases/category';
import { successRes } from '../configs/responseConfig';
import { responseCodes } from '../configs/responseCodes';
import { uploadFileToS3 } from '../utils/uploadToS3';

export const create = async (req: Request, res: Response): Promise<any> => {
  try {
    const { name, imgURL } = req.body;
    const isExists = await Category.findOne({ name });
    if (isExists)
      return res.status(200).json(
        successRes({
          statusCode: responseCodes.badRequest,
          message: 'Category already exists'
        })
      );

    const category = await Category.create({ name, imgURL });

    return res.status(200).json(
      successRes({
        statusCode: responseCodes.success,
        message: 'Category created successfully',
        data: category
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
    const categories = await Category.findAll({ limit, page });

    return res.status(200).json(
      successRes({
        statusCode: responseCodes.success,
        message: 'Categories fetched successfully',
        data: categories
      })
    );
  } catch (error) {
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
    const category = await Category.findOne({ _id: id });

    return res.status(200).json(
      successRes({
        statusCode: responseCodes.success,
        message: 'Category fetched successfully',
        data: category
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
    const category = await Category.search({ name }, { limit, page });
    if (!category)
      return res.status(200).json(
        successRes({
          statusCode: responseCodes.notFound,
          message: 'Category not found'
        })
      );
    return res
      .status(200)
      .json(
        successRes({ statusCode: responseCodes.success, message: 'Category found', data: category })
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
    const { id } = req.params;
    const { name, imgURL } = req.body;

    const category = await Category.findOne({ _id: id });
    if (!category)
      return res.status(200).json(
        successRes({
          statusCode: responseCodes.notFound,
          message: 'Category not found'
        })
      );

    const updatedCategory = await Category.updateOne(id, { name, imgURL });

    return res.status(200).json(
      successRes({
        statusCode: responseCodes.success,
        message: 'Category updated successfully',
        data: updatedCategory
      })
    );
  } catch (error) {
    console.log("🚀 ~ update ~ error:", error)
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

    const category = await Category.findOne({ _id: id });
    if (!category)
      return res.status(200).json(
        successRes({
          statusCode: responseCodes.notFound,
          message: 'Category not found'
        })
      );

    await Category.deleteOne(id);

    return res.status(200).json(
      successRes({
        statusCode: responseCodes.success,
        message: 'Category deleted successfully'
      })
    );
  } catch (error) {
    console.log("🚀 ~ deleteOne ~ error:", error)
    return res.status(200).json(
      successRes({
        statusCode: responseCodes.serverError,
        message: 'Internal server error'
      })
    );
  }
};

export const uploadImage = async (req: Request, res: Response): Promise<any> => {
  try {
    const { base64, fileName, format } = req.body;
    const filePath = `images/category/${fileName}`;
    const url = await uploadFileToS3(base64, filePath, fileName, format);

    return res.status(200).json(
      successRes({
        statusCode: responseCodes.success,
        message: 'Image uploaded successfully',
        data: {
          url
        }
      })
    );
  } catch (error) {
    console.log("🚀 ~ uploadImage ~ error:", error)
    return res.status(200).json(
      successRes({
        statusCode: responseCodes.serverError,
        message: 'Internal server error'
      })
    );
  }
};
