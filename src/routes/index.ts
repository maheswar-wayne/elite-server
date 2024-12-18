import { Router } from 'express';
import auth from './auth';
import category from './category';
import subCategory from './subCategory';
import collection from './collection';
import product from './product';
import admin from './admin';
import customer from './customer';

const router = Router();

router.use('/auth', auth);
router.use('/admin', admin);
router.use('/category', category);
router.use('/subcategory', subCategory);
router.use('/collection', collection);
router.use('/product', product);
router.use('/customer', customer);

export default router;
