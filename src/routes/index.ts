import { Router } from 'express';
import auth from './auth';
import category from './category';
import subCategory from './subCategory';
import product from './product';
import users from './users';
import customer from './customer';
import dashboard from './dashboard';
import newsletter from './newsletter';

const router = Router();

router.use('/auth', auth);
router.use('/users', users);
router.use('/category', category);
router.use('/dashboard', dashboard);
router.use('/subcategory', subCategory);
router.use('/product', product);
router.use('/customer', customer);
router.use('/newsletter', newsletter);

export default router;
