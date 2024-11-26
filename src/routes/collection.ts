import { Router } from 'express';
import * as collectionController from '../controllers/collection';
import { validateBody } from '../middlewares/validations';
import { collectionBodySchema } from '../schema/collection';

const router = Router();

router.route('/upload-image').post(collectionController.uploadImage);

router.route('/').get(collectionController.findAll);
router.route('/search').get(collectionController.findByName);
router.route('/:id').get(collectionController.findOne);
router.route('/').post(validateBody(collectionBodySchema), collectionController.create);
router.route('/:id').put(validateBody(collectionBodySchema), collectionController.update);
router.route('/:id').delete(collectionController.deleteOne);

export default router;
