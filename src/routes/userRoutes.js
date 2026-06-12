import { Router } from 'express';
import { authenticate } from '../middleware/authenticate.js';
import { upload } from '../middleware/multer.js';
import {
  getCurrentUser,
  updateUserAvatar,
} from '../controllers/userController.js';

const router = Router();

router.use('/users', authenticate);

router.patch('/users/me/avatar', upload.single('avatar'), updateUserAvatar);
router.get('/users/me/', getCurrentUser);

export default router;
