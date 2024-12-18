/**
    @description: This file contains all the controllers for the auth routes
    @author: [maheswar-wayne, sant]
*/

import { Request, Response } from 'express';
import bcrypt from 'bcrypt';

import * as Admin from '../models/useCases/admin';
import { IAdmin } from '../types/auth';
import { successRes } from '../configs/responseConfig';
import { responseCodes } from '../configs/responseCodes';
import { generateAccessToken, generateRefreshToken } from '../utils/generateTokens';

export const register = async (req: Request, res: Response) => {
    try {
        const data: IAdmin = req.body;
        console.log("🚀 ~ register ~ data:", data)
        const admin = await Admin.findOne(data.email);

        if (admin)
            return res.status(200).json(
                successRes({
                    statusCode: responseCodes.notFound,
                    message: 'Admin already exists',
                })
            );

        data.password = await bcrypt.hash(data.password, 10);
        const user: IAdmin = (await Admin.create(data)) as unknown as IAdmin;

        user.password = '';
        return res.status(200).json(
            successRes({
                statusCode: responseCodes.success,
                message: 'Admin registered successfully',
                data: user,
            })
        );
    } catch (error) {
        console.log('🚀 ~ register ~ error:', error);
        return res.status(200).json(
            successRes({
                statusCode: responseCodes.serverError,
                message: 'Internal server error',
            })
        );
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const userData = await Admin.findOne(email);

        if (!userData)
            return res.status(200).json(
                successRes({
                    statusCode: responseCodes.notFound,
                    message: 'Admin not found',
                })
            );

        const isPasswordMatched = await bcrypt.compare(password, userData.password);

        if (!isPasswordMatched)
            return res.status(200).json(
                successRes({
                    statusCode: responseCodes.unAuthorized,
                    message: 'Invalid password',
                })
            );

        const accessToken = await generateAccessToken(userData);
        const refreshToken = await generateRefreshToken(userData);

        await Admin.updateOne(userData._id, { refreshToken: refreshToken });

        return res.status(200).json(
            successRes({
                statusCode: responseCodes.success,
                message: 'Login successful',
                data: { accessToken, refreshToken, userData },
            })
        );
    } catch (error) {
        console.log('🚀 ~ login ~ error:', error);
        return res.status(200).json(
            successRes({
                statusCode: responseCodes.serverError,
                message: 'Internal server error',
            })
        );
    }
};

export const getAdmins = async (req: Request, res: Response) => {
    try {
        const admins = await Admin.findAll();
        return res.status(200).json(
            successRes({
                statusCode: responseCodes.success,
                message: 'Admins fetched successfully',
                data: admins,
            })
        );
    } catch (error) {
        return res.status(200).json(
            successRes({
                statusCode: responseCodes.serverError,
                message: 'Internal server error',
            })
        );
    }
};

export const deleteAdmin = async (req: Request, res: Response) => {
    try {
        const id: string = req.params.id;
        const admin = await Admin.findById(id);

        if (!admin)
            return res.status(200).json(
                successRes({
                    statusCode: responseCodes.notFound,
                    message: 'Admin not found',
                })
            );

        await Admin.deleteOne(admin._id);
        return res.status(200).json(
            successRes({
                statusCode: responseCodes.success,
                message: 'Admin deleted successfully',
            })
        );
    } catch (error) {
        console.log('🚀 ~ deleteAdmin ~ error:', error);
        return res.status(200).json(
            successRes({
                statusCode: responseCodes.serverError,
                message: 'Internal server error',
            })
        );
    }
};

export const changePassword = async (req: Request, res: Response) => {
    try {
        const id: string = req.params.id;
        const { password } = req.body;
        const admin = await Admin.findById(id);

        if (!admin)
            return res.status(200).json(
                successRes({
                    statusCode: responseCodes.notFound,
                    message: 'Admin not found',
                })
            );

        admin.password = await bcrypt.hash(password, 10);
        await Admin.updateOne(admin._id, { password: admin.password });

        return res.status(200).json(
            successRes({
                statusCode: responseCodes.success,
                message: 'Admin password changed successfully',
            })
        );
    } catch (error) {
        console.log('🚀 ~ changePassword ~ error:', error);
        return res.status(200).json(
            successRes({
                statusCode: responseCodes.serverError,
                message: 'Internal server error',
            })
        );
    }
};
