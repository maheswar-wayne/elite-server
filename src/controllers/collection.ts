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
    const subCategories = await Collection.findAll();

    return res.status(200).json(
      successRes({
        statusCode: responseCodes.success,
        message: 'Collections fetched successfully',
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
    const collection = await Collection.findOne({ _id: id });

    return res.status(200).json(
      successRes({
        statusCode: responseCodes.success,
        message: 'Collection fetched successfully',
        data: collection
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
    const collection = await Collection.findOne({ name });

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
    return res.status(200).json(
      successRes({
        statusCode: responseCodes.serverError,
        message: 'Internal server error'
      })
    );
  }
};
