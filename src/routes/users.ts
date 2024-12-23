import { Router } from 'express';

import * as userControllers from '../controllers/users';
import { authenticateJWT } from '../middlewares/jwtAuth';

const router = Router();
const asyncHandler = (fn: any) => {
    return (req: any, res: any, next: any) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};

router.route('/').get(authenticateJWT, userControllers.findAllUsers);

router.route('/:id').delete(asyncHandler(userControllers.deleteAdmin));
router
    .route('/change-password/:id')
    .post(asyncHandler(userControllers.changePassword));
export default router;
