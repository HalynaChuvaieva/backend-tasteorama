import { Router } from 'express';
import { celebrate } from 'celebrate';
import { authenticate } from '../middleware/authenticate.js';
import {
  getAllRecipes,
  getRecipeById,
  deleteRecipeFromFavorite,
  getFavoriteRecipes,
  getMyRecipes,
} from '../controllers/recipesController.js';
import {
  getAllRecipesSchema,
  getMyRecipesSchema,
  recipeIdSchema,
} from '../validations/recipesValidation.js';

const router = Router();

router.get('/api/recipes', celebrate(getAllRecipesSchema), getAllRecipes);

router.get('/api/recipes/:recipeId', celebrate(recipeIdSchema), getRecipeById);
router.post(
  '/api/recipes/',
  authenticate,
  upload.single('image'),
  parseIngredients,
  celebrate(createRecipeSchema),
  createRecipe,
);

router.post(
  '/api/recipes/:recipeId/favorite',
  authenticate,
  celebrate(recipeIdSchema),
  addRecipeToFavorites,
);
router.get('/api/recipes/favorites', authenticate, getFavoriteRecipes);

router.get('/api/recipes/:recipeId', celebrate(recipeIdSchema), getRecipeById);

router.delete(
  '/api/recipes/:recipeId/favorite',
  authenticate,
  celebrate(recipeIdSchema),
  deleteRecipeFromFavorite,
);

router.post(
  '/api/recipes/:recipeId/favorite',
  authenticate,
  celebrate(recipeIdSchema),
  addRecipeToFavorites,
);
router.get('/api/recipes/favorites', authenticate, getFavoriteRecipes);

router.get('/api/recipes/:recipeId', celebrate(recipeIdSchema), getRecipeById);

router.delete(
  '/api/recipes/:recipeId/favorite',
  authenticate,
  celebrate(recipeIdSchema),
  deleteRecipeFromFavorite,
);

router.get(
  '/api/my/recipes',
  authenticate,
  celebrate(getMyRecipesSchema),
  getMyRecipes,
);
export default router;
