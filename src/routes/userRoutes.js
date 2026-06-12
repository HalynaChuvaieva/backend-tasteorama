import { Router } from 'express';
import { authenticate } from '../middleware/authenticate.js';
import { upload } from '../middleware/multer.js';
import {
  getCurrentUser,
  updateUserAvatar,
} from '../controllers/userController.js';

const router = Router();

router.patch(
  '/users/me/avatar',
  authenticate,
  upload.single('avatar'),
  updateUserAvatar,
);

router.get('/users/me/', authenticate, getCurrentUser);

export default router;
