import { Router } from 'express';
import * as productController from '../controllers/product';
import { validateBody } from '../middlewares/validations';
import { collectionBodySchema } from '../schema/product';
import { authenticateJWT } from '../middlewares/jwtAuth';
import { isAdmin } from '../middlewares/isAdmin';

const router = Router();

router.route('/upload-image').post(authenticateJWT, isAdmin, productController.uploadImage);

router.route('/').get(productController.findAll);
router.route('/search').get(productController.findByName);
router.route('/by-collection').get(productController.findByCollection);
router.route('/:id').get(productController.findOne);

router
  .route('/')
  .post(authenticateJWT, validateBody(collectionBodySchema), isAdmin, productController.create);
router
  .route('/:id')
  .put(authenticateJWT, validateBody(collectionBodySchema), isAdmin, productController.update);
router.route('/:id').delete(authenticateJWT, isAdmin, productController.deleteOne);

export default router;
