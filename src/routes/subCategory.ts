import { Router } from 'express';
import * as subCategoryController from '../controllers/subCategory';
import { validateBody } from '../middlewares/validations';
import { subCategoryBodySchema } from '../schema/subCategory';

const router = Router();

router.route('/upload-image').post(subCategoryController.uploadImage);

router.route('/').get(subCategoryController.findAll);
router.route('/search').get(subCategoryController.findByName);
router.route('/:id').get(subCategoryController.findOne);
router.route('/').post(validateBody(subCategoryBodySchema), subCategoryController.create);
router.route('/:id').put(validateBody(subCategoryBodySchema), subCategoryController.update);
router.route('/:id').delete(subCategoryController.deleteOne);

export default router;
