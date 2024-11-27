import { Router } from 'express';
import * as productController from '../controllers/product';
import { validateBody } from '../middlewares/validations';
import { collectionBodySchema } from '../schema/product';
import { authenticateJWT } from '../middlewares/jwtAuth';

const router = Router();

router.route('/upload-image').post(authenticateJWT, productController.uploadImage);

router.route('/').get(authenticateJWT, productController.findAll);
router.route('/search').get(authenticateJWT, productController.findByName);
router.route('/:id').get(authenticateJWT, productController.findOne);

router
  .route('/')
  .post(authenticateJWT, validateBody(collectionBodySchema), productController.create);
router
  .route('/:id')
  .put(authenticateJWT, validateBody(collectionBodySchema), productController.update);
router.route('/:id').delete(authenticateJWT, productController.deleteOne);

export default router;
