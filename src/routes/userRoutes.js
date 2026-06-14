import { Router } from 'express';
import { authenticate } from '../middleware/authenticate.js';
import { getCurrentUser } from '../controllers/userController.js';

const router = Router();

router.use('/users', authenticate);

router.get('/users/me/', getCurrentUser);

export default router;
