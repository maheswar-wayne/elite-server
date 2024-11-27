import { Router } from 'express';

import * as collectionController from '../controllers/collection';
import { validateBody } from '../middlewares/validations';
import { collectionBodySchema } from '../schema/collection';
import { authenticateJWT } from '../middlewares/jwtAuth';

const router = Router();

router.route('/upload-image').post(authenticateJWT, collectionController.uploadImage);

router.route('/').get(authenticateJWT, collectionController.findAll);
router.route('/search').get(authenticateJWT, collectionController.findByName);
router.route('/:id').get(authenticateJWT, collectionController.findOne);

router
  .route('/')
  .post(authenticateJWT, validateBody(collectionBodySchema), collectionController.create);
router
  .route('/:id')
  .put(authenticateJWT, validateBody(collectionBodySchema), collectionController.update);
router.route('/:id').delete(authenticateJWT, collectionController.deleteOne);

export default router;
