import { Router } from 'express';
import * as subCategoryController from '../controllers/subCategory';
import { validateBody } from '../middlewares/validations';
import { subCategoryBodySchema } from '../schema/subCategory';
import { authenticateJWT } from '../middlewares/jwtAuth';
import { isAdmin } from '../middlewares/isAdmin';

const router = Router();

router.route('/upload-image').post(authenticateJWT, isAdmin, subCategoryController.uploadImage);

router.route('/').get(authenticateJWT, subCategoryController.findAll);
router.route('/search').get(authenticateJWT, subCategoryController.findByName);
router.route('/:id').get(authenticateJWT, subCategoryController.findOne);

router.route('/:id').delete(authenticateJWT, isAdmin, subCategoryController.deleteOne);
router
  .route('/')
  .post(
    authenticateJWT,
    isAdmin,
    validateBody(subCategoryBodySchema),
    subCategoryController.create
  );
router
  .route('/:id')
  .put(authenticateJWT, isAdmin, validateBody(subCategoryBodySchema), subCategoryController.update);

export default router;
