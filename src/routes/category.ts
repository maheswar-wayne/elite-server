import { Router } from 'express';

import * as categoryController from '../controllers/category';
import { validateBody } from '../middlewares/validations';
import { categoryBodySchema } from '../schema/category';
import { authenticateJWT } from '../middlewares/jwtAuth';

const router = Router();

router.route('/upload-image').post(authenticateJWT, categoryController.uploadImage);

router.route('/').get(authenticateJWT, categoryController.findAll);
router.route('/search').get(authenticateJWT, categoryController.findByName);
router.route('/:id').get(authenticateJWT, categoryController.findOne);
router
  .route('/:id')
  .put(authenticateJWT, validateBody(categoryBodySchema), categoryController.update);
router
  .route('/')
  .post(authenticateJWT, validateBody(categoryBodySchema), categoryController.create);
router.route('/:id').delete(authenticateJWT, categoryController.deleteOne);

export default router;
