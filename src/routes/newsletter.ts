import { Router } from 'express';

import { validateBody } from '../middlewares/validations';
import { whatsappNewsletter, uploadSchema } from '../schema/newsletter';
import * as newsletterController from '../controllers/newsletter';

const router = Router();

router.route('/upload').post(validateBody(uploadSchema), newsletterController.uploadFile);
router.route('/whatsapp').post(validateBody(whatsappNewsletter),newsletterController.sendWhatsappNewsletter);

export default router;
