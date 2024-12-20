import { Router } from 'express';
import * as productController from '../controllers/product';
import { validateBody } from '../middlewares/validations';
import { productBodySchema } from '../schema/product';
import { authenticateJWT } from '../middlewares/jwtAuth';
import { isAdmin } from '../middlewares/isAdmin';

const router = Router();

router.route('/upload-image').post(authenticateJWT, isAdmin, productController.uploadImage);

router.route('/').get(productController.findAll);
router.route('/search').get(productController.findByName);
router.route('/by-subcategory').get(productController.findBySubCategory);
router.route('/by-subcategoryId/:id').get(productController.findBySubCategory);
router.route('/:id').get(productController.findOne);

router
  .route('/')
  .post(authenticateJWT, validateBody(productBodySchema), isAdmin, productController.create);
router
  .route('/:id')
  .put(authenticateJWT, validateBody(productBodySchema), isAdmin, productController.update);
router.route('/:id').delete(authenticateJWT, isAdmin, productController.deleteOne);

export default router;
