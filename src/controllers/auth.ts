/**
    @description: This file contains all the controllers for the auth routes
    @author: [maheswar-wayne, sant]
*/

import { Request, Response } from 'express';
import bcrypt from 'bcrypt';

import * as User from '../models/useCases/user';
import { IUser } from '../types/user';
import { successRes } from '../configs/responseConfig';
import { responseCodes } from '../configs/responseCodes';
import { generateAccessToken, generateRefreshToken } from '../utils/generateTokens';

export const register = async (req: Request, res: Response): Promise<any> => {
    try {
        const data: IUser = req.body;
        const userData = await User.findOne(data.email);

        if (!userData)
            return res.status(200).json(
                successRes({
                    statusCode: responseCodes.badRequest,
                    message: 'User already exists',
                })
            );

        data.password = await bcrypt.hash(data.password, 10);
        const user: Partial<IUser> = (await User.create(data)) as IUser;

        user.password = '';
        return res.status(200).json(
            successRes({
                statusCode: responseCodes.success,
                message: 'User registered successfully',
                data: user,
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

export const login = async (req: Request, res: Response): Promise<any> => {
    try {
        const { email, password } = req.body;
        const userData = await User.findOne(email);

        if (!userData)
            return res.status(200).json(
                successRes({
                    statusCode: responseCodes.notFound,
                    message: 'User not found',
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

        await User.updateOne(userData._id, { refreshToken: refreshToken });

        return res.status(200).json(
            successRes({
                statusCode: responseCodes.success,
                message: 'Login successful',
                data: { accessToken, refreshToken, userData },
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
