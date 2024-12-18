import { Router } from 'express';
import { validateBody } from '../middlewares/validations';
import * as adminController from '../controllers/admin';
import { adminRegisterSchema, loginSchema } from '../schema/admin';

const router = Router();

// Wrapping the async handlers to ensure correct return types
const asyncHandler = (fn: any) => {
    return (req: any, res: any, next: any) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};

router
    .route('/admin/register')
    .post(validateBody(adminRegisterSchema), asyncHandler(adminController.register));

router
    .route('/admin/login')
    .post(validateBody(loginSchema), asyncHandler(adminController.login));

export default router;
