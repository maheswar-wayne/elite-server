/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import * as Collection from '../models/useCases/collection';
import { successRes } from '../configs/responseConfig';
import { responseCodes } from '../configs/responseCodes';
import { uploadFileToS3 } from '../utils/uploadToS3';

export const create = async (req: Request, res: Response): Promise<any> => {
  try {
    const { name, category, subCategory, imgURL } = req.body;
    const isExists = await Collection.findOne({ name });
    if (isExists)
      return res.status(200).json(
        successRes({
          statusCode: responseCodes.badRequest,
          message: 'Collection already exists'
        })
      );

    const collection = await Collection.create({ name, category, imgURL, subCategory });

    return res.status(200).json(
      successRes({
        statusCode: responseCodes.success,
        message: 'Collection created successfully',
        data: collection
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
    const subCategories = await Collection.findAll({ limit, page });

    return res.status(200).json(
      successRes({
        statusCode: responseCodes.success,
        message: 'Collections fetched successfully',
        data: subCategories
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
    const collection = await Collection.findOne({ _id: id });

    return res.status(200).json(
      successRes({
        statusCode: responseCodes.success,
        message: 'Collection fetched successfully',
        data: collection
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

    const collection = await Collection.search({ name }, { limit, page });

    if (!collection)
      return res.status(200).json(
        successRes({
          statusCode: responseCodes.notFound,
          message: 'Collection not found'
        })
      );

    return res.status(200).json(
      successRes({
        statusCode: responseCodes.success,
        message: 'Collection found',
        data: collection
      })
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

export const findBySubCategory = async (req: Request, res: Response): Promise<any> => {
  try {
    const { name, limit, page }: { name: string; limit?: number; page?: number } =
      req.query as unknown as {
        name: string;
        limit?: number;
        page?: number;
      };

    const collection = await Collection.findBySubCategory({ name }, { limit, page });

    if (!collection)
      return res.status(200).json(
        successRes({
          statusCode: responseCodes.notFound,
          message: 'Collection not found'
        })
      );

    return res.status(200).json(
      successRes({
        statusCode: responseCodes.success,
        message: 'Collection found',
        data: collection
      })
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
    const { name, category, subCategory, imgURL } = req.body;

    const collection = await Collection.findOne({ _id: id });
    if (!collection)
      return res.status(200).json(
        successRes({
          statusCode: responseCodes.notFound,
          message: 'Collection not found'
        })
      );

    const updatedCollection = await Collection.updateOne(id, {
      name,
      category,
      subCategory,
      imgURL
    });

    return res.status(200).json(
      successRes({
        statusCode: responseCodes.success,
        message: 'Collection updated successfully',
        data: updatedCollection
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

    const collection = await Collection.findOne({ _id: id });
    if (!collection)
      return res.status(200).json(
        successRes({
          statusCode: responseCodes.notFound,
          message: 'Collection not found'
        })
      );

    await Collection.deleteOne(id);

    return res.status(200).json(
      successRes({
        statusCode: responseCodes.success,
        message: 'Collection deleted successfully'
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

export const uploadImage = async (req: Request, res: Response): Promise<any> => {
  try {
    const { base64, filename, format } = req.body;
    const filePath = `images/collection/${filename}`;
    const url = await uploadFileToS3(base64, filePath, filename, format);

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
    console.log('🚀 ~ uploadImage ~ error:', error);
    return res.status(200).json(
      successRes({
        statusCode: responseCodes.serverError,
        message: 'Internal server error'
      })
    );
  }
};
