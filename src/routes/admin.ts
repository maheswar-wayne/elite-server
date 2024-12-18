import { Router } from 'express';
import * as adminController from '../controllers/admin';

// Utility function to wrap async handlers
const asyncHandler = (fn: any) => {
    return (req: any, res: any, next: any) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};

const router = Router();

// Wrap all async route handlers with asyncHandler
router.route('/').get(asyncHandler(adminController.getAdmins));
router.route('/:id').delete(asyncHandler(adminController.deleteAdmin));
router
    .route('/change-password/:id')
    .post(asyncHandler(adminController.changePassword));

export default router;
