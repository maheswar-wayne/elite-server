import { Router } from 'express';

import { validateBody } from '../middlewares/validations';
import * as authController from '../controllers/auth';
import { loginSchema, registerSchema } from '../schema/auth';

const router = Router();

router.route('/register').post(validateBody(registerSchema), authController.register);
router.route('/login').post(validateBody(loginSchema), authController.login);
router.route('/refresh-token').post(authController.getRefreshToken);

export default router;
