import { Router } from 'express';
import * as categoryController from '../controllers/category';
import { validateBody } from '../middlewares/validations';
import { categoryBodySchema } from '../schema/category';

const router = Router();

router.route('/uploadImage').get(categoryController.uploadImage);

router.route('/').get(categoryController.findAll);
router.route('/search').get(categoryController.findByName);
router.route('/:id').get(categoryController.findOne);
router.route('/:id').put(validateBody(categoryBodySchema), categoryController.update);
router.route('/').post(validateBody(categoryBodySchema), categoryController.create);
router.route('/:id').delete(categoryController.deleteOne);

export default router;
