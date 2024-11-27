/**
    @desc This file is to create a the access token and refresh token token required for jwt authorization
    @author [maheswar-wayne]
*/

import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import { IUser } from '../types/user';

dotenv.config();

const JWT_ACCESS_TOKEN: string = process.env.JWT_ACCESS_TOKEN || '';
const JWT_REFRESH_TOKEN: string = process.env.JWT_REFRESH_TOKEN || '';

export const generateAccessToken = async (
  userData: Pick<IUser, '_id' | 'username' | 'email' | 'role'>
) => {
  return jwt.sign(
    {
      _id: userData._id,
      email: userData.email,
      fullName: userData.username,
      role: userData.role
    },
    JWT_ACCESS_TOKEN,
    {
      expiresIn: '15m'
    }
  );
};

export const generateRefreshToken = async (
  userData: Pick<IUser, '_id' | 'username' | 'email' | 'role'>
) => {
  return jwt.sign(
    {
      _id: userData._id,
      email: userData.email,
      fullName: userData.username,
      role: userData.role
    },
    JWT_REFRESH_TOKEN
  );
};

export const verifyAccessToken = async (token: string) => {
  try {
    return jwt.verify(token, JWT_ACCESS_TOKEN);
  } catch (error) {
    console.log('🚀 ~ verifyAccessToken ~ error:', error);
    return false;
  }
};
export const verifyRefreshToken = async (token: string) => {
  try {
    return jwt.verify(token, JWT_REFRESH_TOKEN);
  } catch (error) {
    console.log('🚀 ~ verifyRefreshToken ~ error:', error);
    return false;
  }
};
