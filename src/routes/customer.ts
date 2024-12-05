import { Router } from 'express';

import * as customerController from '../controllers/customer';
import { validateBody } from '../middlewares/validations';
import { customerBodySchema } from '../schema/customer';
import { authenticateJWT } from '../middlewares/jwtAuth';
import { isAdmin } from '../middlewares/isAdmin';

const router = Router();



router.route('/').get( customerController.findAll);
router.route('/search').get( customerController.findByName);
router.route('/:id').get( customerController.findOne);

router
  .route('/:id')
  .put(authenticateJWT, validateBody(customerBodySchema), isAdmin, customerController.update);
router
  .route('/')
  .post(authenticateJWT, validateBody(customerBodySchema), isAdmin, customerController.create);
router.route('/:id').delete(authenticateJWT, isAdmin, customerController.deleteOne);

export default router;
