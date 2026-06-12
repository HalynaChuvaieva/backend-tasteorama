import { Router } from 'express';
import { celebrate } from 'celebrate';
import { authenticate } from '../middleware/authenticate.js';
import { getIngredientsSchema } from '../validations/recipesValidation.js';
import { getIngredients } from '../controllers/recipesController.js';

const router = Router();

export default router;
