/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import * as Product from '../models/useCases/product';
import { successRes } from '../configs/responseConfig';
import { responseCodes } from '../configs/responseCodes';
import { uploadFileToS3 } from '../utils/uploadToS3';
import { IProduct } from '../types/product';

export const create = async (req: Request, res: Response): Promise<any> => {
  try {
    const productData: IProduct = req.body;
    const isExists = await Product.findOne({ modelName: productData.modelName });
    if (isExists)
      return res.status(200).json(
        successRes({
          statusCode: responseCodes.badRequest,
          message: 'Product already exists'
        })
      );

    const collection = await Product.create(productData);

    return res.status(200).json(
      successRes({
        statusCode: responseCodes.success,
        message: 'Product created successfully',
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
    const subCategories = await Product.findAll({ limit, page });

    return res.status(200).json(
      successRes({
        statusCode: responseCodes.success,
        message: 'Products fetched successfully',
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
    const collection = await Product.findOne({ _id: id });

    return res.status(200).json(
      successRes({
        statusCode: responseCodes.success,
        message: 'Product fetched successfully',
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
    const { limit, page, name }: { limit?: number; page?: number; name: string } =
      req.query as unknown as {
        limit?: number;
        page?: number;
        name: string;
      };
    const collection = await Product.search({ modelName: name }, { limit, page });

    if (!collection)
      return res.status(200).json(
        successRes({
          statusCode: responseCodes.notFound,
          message: 'Product not found'
        })
      );

    return res.status(200).json(
      successRes({
        statusCode: responseCodes.success,
        message: 'Product found',
        data: collection
      })
    );
  } catch (error) {
    console.log('🚀 ~ error:', error);
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
    const productData: IProduct = req.body;

    const collection = await Product.findOne({ _id: id });
    if (!collection)
      return res.status(200).json(
        successRes({
          statusCode: responseCodes.notFound,
          message: 'Product not found'
        })
      );

    const updatedProduct = await Product.updateOne(id, productData);

    return res.status(200).json(
      successRes({
        statusCode: responseCodes.success,
        message: 'Product updated successfully',
        data: updatedProduct
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

    const collection = await Product.findOne({ _id: id });
    if (!collection)
      return res.status(200).json(
        successRes({
          statusCode: responseCodes.notFound,
          message: 'Product not found'
        })
      );

    await Product.deleteOne(id);

    return res.status(200).json(
      successRes({
        statusCode: responseCodes.success,
        message: 'Product deleted successfully'
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
    const productData = req.body;

    const uploadedUrls: string[] = [];

    for (const image of productData.images) {
      const { base64, filename, format } = image;
      const filePath = `images/product/${productData.productName}/${filename}`;
      const url = await uploadFileToS3(base64, filePath, filename, format);
      uploadedUrls.push(url);
    }

    // Respond with success and the uploaded URLs
    return res.status(200).json(
      successRes({
        statusCode: responseCodes.success,
        message: 'Images uploaded successfully',
        data: {
          urls: uploadedUrls
        }
      })
    );
  } catch (error) {
    console.log('🚀 ~ uploadImage ~ error:', error);

    return res.status(500).json(
      successRes({
        statusCode: responseCodes.serverError,
        message: 'Internal server error'
      })
    );
  }
};
