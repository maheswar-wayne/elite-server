import { Router } from 'express';
import auth from './auth';
import category from './category';
import subCategory from './subCategory';

const router = Router();

router.use('/auth', auth);
router.use('/category', category);
router.use('/subcategory', subCategory);

export default router;
