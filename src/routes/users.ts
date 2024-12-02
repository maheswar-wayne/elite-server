import { Router } from 'express';

import { validateBody } from '../middlewares/validations';
import * as userControllers from '../controllers/users';
import { authenticateJWT } from '../middlewares/jwtAuth';
import { blockSchema, statusSchema } from '../schema/users';

const router = Router();

router.route('/').get(authenticateJWT, userControllers.findAllUsers);
router.route('/status/:id').post(validateBody(statusSchema),userControllers.updateUserStatus );
router.route('/block/:id').post(validateBody(blockSchema), userControllers.blockUnblockUser );

export default router;
