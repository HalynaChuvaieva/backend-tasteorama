import { Router } from 'express';
import { celebrate } from 'celebrate';
import { authenticate } from '../middleware/authenticate.js';
import { getIngredientsSchema } from '../validations/recipesValidation.js';
import { getIngredients } from '../controllers/recipesController.js';

const router = Router();

router.get('/api/ingredients', celebrate(getIngredientsSchema), getIngredients); // path for a list of all ingredients

export default router;
