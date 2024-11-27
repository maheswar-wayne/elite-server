import { Router } from 'express';
import * as productController from '../controllers/product';
import { validateBody } from '../middlewares/validations';
import { collectionBodySchema } from '../schema/product';

const router = Router();

router.route('/upload-image').post(productController.uploadImage);

router.route('/').get(productController.findAll);
router.route('/search').get(productController.findByName);
router.route('/:id').get(productController.findOne);
router.route('/').post(validateBody(collectionBodySchema), productController.create);
router.route('/:id').put(validateBody(collectionBodySchema), productController.update);
router.route('/:id').delete(productController.deleteOne);

export default router;
