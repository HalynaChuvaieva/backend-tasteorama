import { Router } from "express";
import { celebrate } from "celebrate";
import { authenticate } from "../middleware/authenticate.js";
import { getAllRecipes } from "../controllers/recipesController.js";
import { getAllRecipesSchema } from "../validations/recipesValidation.js";
import { getRecipeById } from "../controllers/recipesController.js";
import { recipeIdSchema } from "../validations/recipesValidation.js";

const router = Router();

router.get('/api/recipes', celebrate(getAllRecipesSchema), getAllRecipes);

router.get("/api/recipes/:recipeId", celebrate(recipeIdSchema), getRecipeById);

export default router;
