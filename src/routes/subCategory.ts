import { Router } from 'express';
import * as subCategoryController from '../controllers/subCategory';
import { validateBody } from '../middlewares/validations';
import { subCategoryBodySchema } from '../schema/subCategory';
import { authenticateJWT } from '../middlewares/jwtAuth';

const router = Router();

router.route('/upload-image').post(authenticateJWT, subCategoryController.uploadImage);

router.route('/').get(authenticateJWT, subCategoryController.findAll);
router.route('/search').get(authenticateJWT, subCategoryController.findByName);
router.route('/:id').get(authenticateJWT, subCategoryController.findOne);
router.route('/:id').delete(authenticateJWT, subCategoryController.deleteOne);

router
  .route('/')
  .post(authenticateJWT, validateBody(subCategoryBodySchema), subCategoryController.create);
router
  .route('/:id')
  .put(authenticateJWT, validateBody(subCategoryBodySchema), subCategoryController.update);

export default router;
