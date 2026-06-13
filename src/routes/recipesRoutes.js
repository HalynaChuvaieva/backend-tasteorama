import { Router } from 'express';
import { celebrate } from 'celebrate';
import { authenticate } from '../middleware/authenticate.js';
import {
  createRecipe,
  getAllRecipes,
} from '../controllers/recipesController.js';
import {
  createRecipeSchema,
  getAllRecipesSchema,
} from '../validations/recipesValidation.js';
import { getRecipeById } from '../controllers/recipesController.js';
import { recipeIdSchema } from '../validations/recipesValidation.js';
import { upload } from '../middleware/multer.js';
import { parseIngredients } from '../middleware/recipeParse.js';

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

export default router;
