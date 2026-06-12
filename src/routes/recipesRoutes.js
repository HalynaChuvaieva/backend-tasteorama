import { Router } from 'express';
import { celebrate } from 'celebrate';
import { authenticate } from '../middleware/authenticate.js';
import {
  getAllRecipes,
  getRecipeById,
  addRecipeToFavorites,
} from '../controllers/recipesController.js';
import { getAllRecipesSchema } from '../validations/recipesValidation.js';
import { recipeIdSchema } from '../validations/recipesValidation.js';

const router = Router();

router.get('/api/recipes', celebrate(getAllRecipesSchema), getAllRecipes);

router.get('/api/recipes/:recipeId', celebrate(recipeIdSchema), getRecipeById);

router.post(
  '/api/recipes/:recipeId/favorite',
  authenticate,
  celebrate(recipeIdSchema),
  addRecipeToFavorites,
);

export default router;
