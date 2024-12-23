import { Router } from 'express';
import auth from './auth';
import category from './category';
import subCategory from './subCategory';
import collection from './collection';
import product from './product';
import users from './users';
import customer from './customer';

const router = Router();

router.use('/auth', auth);
router.use('/users', users);
router.use('/category', category);
router.use('/subcategory', subCategory);
router.use('/collection', collection);
router.use('/product', product);
router.use('/customer', customer);

export default router;
