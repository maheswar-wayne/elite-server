import { Router } from 'express';
import { getDashboardData } from '../controllers/dashboard';

const router = Router();

router.route('/').get(getDashboardData);

export default router;
