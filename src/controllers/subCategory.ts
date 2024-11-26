import { Request, Response } from 'express';
import * as SubCategory from '../models/useCases/subCategory';
import { successRes } from '../configs/responseConfig';
import { responseCodes } from '../configs/responseCodes';
import { uploadFileToS3 } from '../utils/uploadToS3';

export const create = async (req: Request, res: Response): Promise<any> => {
  try {
    const { name, category, imgURL } = req.body;
    const isExists = await SubCategory.findOne({ name });
    if (isExists)
      return res.status(200).json(
        successRes({
          statusCode: responseCodes.badRequest,
          message: 'Sub Category already exists'
        })
      );

    const subCategory = await SubCategory.create({ name, category, imgURL });

    return res.status(200).json(
      successRes({
        statusCode: responseCodes.success,
        message: 'Sub Category created successfully',
        data: subCategory
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

export const findAll = async (req: Request, res: Response): Promise<any> => {
  try {
    const subCategories = await SubCategory.findAll();

    return res.status(200).json(
      successRes({
        statusCode: responseCodes.success,
        message: 'Sub Categories fetched successfully',
        data: subCategories
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
    const subCategory = await SubCategory.findOne({ _id: id });

    return res.status(200).json(
      successRes({
        statusCode: responseCodes.success,
        message: 'Sub Category fetched successfully',
        data: subCategory
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

export const findByName = async (
  req: Request<{}, {}, {}, { name: string }>,
  res: Response
): Promise<any> => {
  try {
    const { name }: { name: string } = req.query;
    const subCategory = await SubCategory.findOne({ name });

    if (!subCategory)
      return res.status(200).json(
        successRes({
          statusCode: responseCodes.notFound,
          message: 'Sub Category not found'
        })
      );

    return res.status(200).json(
      successRes({
        statusCode: responseCodes.success,
        message: 'Sub Category found',
        data: subCategory
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

export const update = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const { name, category, imgURL } = req.body;

    const subCategory = await SubCategory.findOne({ _id: id });
    if (!subCategory)
      return res.status(200).json(
        successRes({
          statusCode: responseCodes.notFound,
          message: 'Sub Category not found'
        })
      );

    const updatedSubCategory = await SubCategory.updateOne(id, { name, category, imgURL });

    return res.status(200).json(
      successRes({
        statusCode: responseCodes.success,
        message: 'SubCategory updated successfully',
        data: updatedSubCategory
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

export const deleteOne = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;

    const subCategory = await SubCategory.findOne({ _id: id });
    if (!subCategory)
      return res.status(200).json(
        successRes({
          statusCode: responseCodes.notFound,
          message: 'Sub Category not found'
        })
      );

    await SubCategory.deleteOne(id);

    return res.status(200).json(
      successRes({
        statusCode: responseCodes.success,
        message: 'Sub Category deleted successfully'
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

export const uploadImage = async (req: Request, res: Response): Promise<any> => {
  try {
    const { base64, filename, format } = req.body;
    const filePath = `images/sub-category/${filename}`;
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
    return res.status(200).json(
      successRes({
        statusCode: responseCodes.serverError,
        message: 'Internal server error'
      })
    );
  }
};
